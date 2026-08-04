import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause } from 'lucide-react';

export const AudioController: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const fadeAnimationRef = useRef<number | null>(null);
  const userPausedRef = useRef(false);

  // Web Audio synth fallback refs
  const audioCtxRef = useRef<AudioContext | null>(null);
  const synthGainRef = useRef<GainNode | null>(null);
  const synthOscsRef = useRef<OscillatorNode[]>([]);
  const isUsingSynthRef = useRef(false);

  const TARGET_VOLUME = 0.2; // 20% max volume
  const FADE_IN_DURATION = 2000; // 2 seconds
  const FADE_OUT_DURATION = 1000; // 1 second

  // Clear any active volume fade animation
  const cancelFadeAnimation = () => {
    if (fadeAnimationRef.current !== null) {
      cancelAnimationFrame(fadeAnimationRef.current);
      fadeAnimationRef.current = null;
    }
  };

  // Web Audio Synth Fallback Initialization
  const startSynthFallback = () => {
    try {
      if (!audioCtxRef.current) {
        const AudioCtx =
          window.AudioContext ||
          (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
        audioCtxRef.current = new AudioCtx();
      }
      const ctx = audioCtxRef.current;
      if (ctx.state === 'suspended') {
        ctx.resume();
      }

      if (!synthGainRef.current) {
        const masterGain = ctx.createGain();
        masterGain.gain.setValueAtTime(0, ctx.currentTime);
        masterGain.connect(ctx.destination);
        synthGainRef.current = masterGain;

        const freqs = [130.81, 196.0, 261.63, 329.63];
        const oscs: OscillatorNode[] = [];

        freqs.forEach((freq, i) => {
          const osc = ctx.createOscillator();
          const lfo = ctx.createOscillator();
          const lfoGain = ctx.createGain();

          osc.type = i % 2 === 0 ? 'sine' : 'triangle';
          osc.frequency.value = freq;

          lfo.frequency.value = 0.1 + i * 0.05;
          lfoGain.gain.value = 0.02;
          lfo.connect(lfoGain);
          lfoGain.connect(osc.frequency);

          osc.connect(masterGain);
          osc.start();
          lfo.start();

          oscs.push(osc, lfo);
        });

        synthOscsRef.current = oscs;
      }

      isUsingSynthRef.current = true;
      // Fade in Web Audio Gain over 2s
      const gain = synthGainRef.current.gain;
      gain.cancelScheduledValues(ctx.currentTime);
      gain.setValueAtTime(gain.value, ctx.currentTime);
      gain.linearRampToValueAtTime(TARGET_VOLUME * 0.4, ctx.currentTime + FADE_IN_DURATION / 1000);
      setIsPlaying(true);
    } catch {
      // Audio Context not available
    }
  };

  const stopSynthFallback = () => {
    if (audioCtxRef.current && synthGainRef.current) {
      const ctx = audioCtxRef.current;
      const gain = synthGainRef.current.gain;
      gain.cancelScheduledValues(ctx.currentTime);
      gain.setValueAtTime(gain.value, ctx.currentTime);
      gain.linearRampToValueAtTime(0, ctx.currentTime + FADE_OUT_DURATION / 1000);

      setTimeout(() => {
        setIsPlaying(false);
      }, FADE_OUT_DURATION);
    }
  };

  // Smooth Fade In (over 2 seconds to 20% volume)
  const fadeIn = () => {
    cancelFadeAnimation();

    if (isUsingSynthRef.current) {
      startSynthFallback();
      return;
    }

    const audio = audioRef.current;
    if (!audio) return;

    audio.volume = 0;
    const playPromise = audio.play();

    if (playPromise !== undefined) {
      playPromise
        .then(() => {
          setIsPlaying(true);
          const startTime = performance.now();
          const startVol = audio.volume;

          const step = (currentTime: number) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / FADE_IN_DURATION, 1);
            audio.volume = startVol + progress * (TARGET_VOLUME - startVol);

            if (progress < 1) {
              fadeAnimationRef.current = requestAnimationFrame(step);
            } else {
              audio.volume = TARGET_VOLUME;
              fadeAnimationRef.current = null;
            }
          };

          fadeAnimationRef.current = requestAnimationFrame(step);
        })
        .catch(() => {
          // If HTML5 Audio fails to play (e.g. file missing or autoplay restriction), fallback to Web Audio Synth
          startSynthFallback();
        });
    }
  };

  // Smooth Fade Out (over 1 second down to 0, then pause)
  const fadeOut = () => {
    cancelFadeAnimation();

    if (isUsingSynthRef.current) {
      stopSynthFallback();
      return;
    }

    const audio = audioRef.current;
    if (!audio || audio.paused) {
      setIsPlaying(false);
      return;
    }

    const startTime = performance.now();
    const startVol = audio.volume;

    const step = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / FADE_OUT_DURATION, 1);
      audio.volume = Math.max(0, startVol * (1 - progress));

      if (progress < 1) {
        fadeAnimationRef.current = requestAnimationFrame(step);
      } else {
        audio.pause();
        audio.volume = 0;
        setIsPlaying(false);
        fadeAnimationRef.current = null;
      }
    };

    fadeAnimationRef.current = requestAnimationFrame(step);
  };

  // Setup HTML5 Audio element
  useEffect(() => {
    // Primary path: /audio/ambient.mp3 (with fallback to /audio/ambient-soundtrack.mp3)
    const audio = new Audio('/audio/ambient.mp3');
    audio.loop = true;
    audio.preload = 'auto';
    audio.volume = 0;
    audioRef.current = audio;

    // Check user preference saved in localStorage
    const savedPref = localStorage.getItem('user_audio_pref');
    if (savedPref === 'paused') {
      userPausedRef.current = true;
    }

    // Error handler: try secondary path or synth fallback if primary audio file fails
    const handleError = () => {
      if (audio.src.includes('/audio/ambient.mp3')) {
        audio.src = '/audio/ambient-soundtrack.mp3';
        audio.load();
      }
    };
    audio.addEventListener('error', handleError);

    return () => {
      cancelFadeAnimation();
      audio.removeEventListener('error', handleError);
      audio.pause();
      audioRef.current = null;

      // Clean synth
      synthOscsRef.current.forEach((osc) => {
        try {
          osc.stop();
          osc.disconnect();
        } catch {}
      });
      if (audioCtxRef.current) {
        try {
          audioCtxRef.current.close();
        } catch {}
      }
    };
  }, []);

  // Global first-interaction listener for Autoplay
  useEffect(() => {
    const handleFirstInteraction = () => {
      if (!hasInteracted) {
        setHasInteracted(true);
        if (!userPausedRef.current && !isPlaying) {
          fadeIn();
        }
      }
    };

    const events = ['pointerdown', 'keydown', 'touchstart'];
    events.forEach((evt) => window.addEventListener(evt, handleFirstInteraction, { once: true }));

    return () => {
      events.forEach((evt) => window.removeEventListener(evt, handleFirstInteraction));
    };
  }, [hasInteracted, isPlaying]);

  // Toggle button handler
  const toggleAudio = () => {
    setHasInteracted(true);
    if (isPlaying) {
      userPausedRef.current = true;
      localStorage.setItem('user_audio_pref', 'paused');
      fadeOut();
    } else {
      userPausedRef.current = false;
      localStorage.setItem('user_audio_pref', 'playing');
      fadeIn();
    }
  };

  return (
    <div className="fixed bottom-5 right-5 z-50 pointer-events-auto select-none">
      <button
        type="button"
        onClick={toggleAudio}
        title={isPlaying ? 'إيقاف الموسيقى (تلاشي هادئ) • Pause Soundtrack' : 'تشغيل الموسيقى الخلفية • Play Soundtrack'}
        aria-label={isPlaying ? 'إيقاف مؤقت للموسيقى' : 'تشغيل الموسيقى الهادئة'}
        className={`relative w-10 h-10 sm:w-11 sm:h-11 rounded-full flex items-center justify-center transition-all duration-300 cursor-pointer active:scale-95 border backdrop-blur-xl ${
          isPlaying
            ? 'bg-amber-500/20 border-amber-500/40 text-amber-300 shadow-[0_0_16px_rgba(251,191,36,0.25)]'
            : 'bg-black/40 hover:bg-black/60 border-white/10 hover:border-amber-400/30 text-amber-200/70 hover:text-amber-200 shadow-[0_4px_20px_rgba(0,0,0,0.4)]'
        }`}
      >
        {isPlaying ? (
          <>
            <Pause className="w-4 h-4 text-amber-300" />
            <span className="absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full bg-amber-400 shadow-[0_0_8px_#f59e0b] animate-pulse" />
          </>
        ) : (
          <Play className="w-4 h-4 text-amber-200/80 ms-0.5" />
        )}
      </button>
    </div>
  );
};
