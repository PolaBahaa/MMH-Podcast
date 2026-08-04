import React, { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Play,
  Pause,
  Volume2,
  Volume1,
  VolumeX,
  Maximize,
  Minimize,
  Settings,
  RotateCcw,
  RotateCw,
  Check,
} from 'lucide-react';

interface CustomVideoPlayerProps {
  src: string;
  poster?: string;
  autoPlay?: boolean;
  onEnded?: () => void;
  title?: string;
}

const SPEED_OPTIONS = [0.5, 0.75, 1.0, 1.25, 1.5, 2.0];

export const CustomVideoPlayer: React.FC<CustomVideoPlayerProps> = ({
  src,
  poster,
  autoPlay = false,
  onEnded,
  title,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [duration, setDuration] = useState<number>(0);
  const [volume, setVolume] = useState<number>(1);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [playbackSpeed, setPlaybackSpeed] = useState<number>(1.0);
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
  const [showControls, setShowControls] = useState<boolean>(true);
  const [showSpeedMenu, setShowSpeedMenu] = useState<boolean>(false);
  const [isHoveringVolume, setIsHoveringVolume] = useState<boolean>(false);
  const [isSeeking, setIsSeeking] = useState<boolean>(false);

  const controlsTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Auto-hide controls handler
  const resetControlsTimeout = useCallback(() => {
    setShowControls(true);
    if (controlsTimeoutRef.current) {
      clearTimeout(controlsTimeoutRef.current);
    }
    // Only auto-hide if playing and speed menu isn't open
    if (isPlaying && !showSpeedMenu) {
      controlsTimeoutRef.current = setTimeout(() => {
        setShowControls(false);
      }, 2500);
    }
  }, [isPlaying, showSpeedMenu]);

  useEffect(() => {
    resetControlsTimeout();
    return () => {
      if (controlsTimeoutRef.current) clearTimeout(controlsTimeoutRef.current);
    };
  }, [isPlaying, showSpeedMenu, resetControlsTimeout]);

  // Sync video duration & time updates
  const handleTimeUpdate = () => {
    if (videoRef.current && !isSeeking) {
      setCurrentTime(videoRef.current.currentTime);
    }
  };

  const handleLoadedMetadata = () => {
    if (videoRef.current) {
      setDuration(videoRef.current.duration);
    }
  };

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
      setShowControls(true);
    } else {
      videoRef.current.play().then(() => {
        setIsPlaying(true);
        resetControlsTimeout();
      }).catch(() => {});
    }
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const time = parseFloat(e.target.value);
    setCurrentTime(time);
    if (videoRef.current) {
      videoRef.current.currentTime = time;
    }
  };

  const handleSeekStart = () => {
    setIsSeeking(true);
  };

  const handleSeekEnd = () => {
    setIsSeeking(false);
  };

  const toggleMute = () => {
    if (!videoRef.current) return;
    const nextMute = !isMuted;
    setIsMuted(nextMute);
    videoRef.current.muted = nextMute;
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseFloat(e.target.value);
    setVolume(val);
    if (videoRef.current) {
      videoRef.current.volume = val;
      if (val === 0) {
        setIsMuted(true);
        videoRef.current.muted = true;
      } else if (isMuted) {
        setIsMuted(false);
        videoRef.current.muted = false;
      }
    }
  };

  const handleSpeedChange = (speed: number) => {
    setPlaybackSpeed(speed);
    if (videoRef.current) {
      videoRef.current.playbackRate = speed;
    }
    setShowSpeedMenu(false);
  };

  const toggleFullscreen = async () => {
    if (!containerRef.current) return;

    if (!document.fullscreenElement) {
      try {
        await containerRef.current.requestFullscreen();
        setIsFullscreen(true);
      } catch (err) {
        console.error('Fullscreen error:', err);
      }
    } else {
      try {
        await document.exitFullscreen();
        setIsFullscreen(false);
      } catch (err) {
        console.error('Exit fullscreen error:', err);
      }
    }
  };

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
    };
  }, []);

  const skipTime = (seconds: number) => {
    if (!videoRef.current) return;
    videoRef.current.currentTime = Math.min(
      Math.max(videoRef.current.currentTime + seconds, 0),
      duration
    );
    resetControlsTimeout();
  };

  const formatTime = (timeInSeconds: number) => {
    if (isNaN(timeInSeconds)) return '00:00';
    const mins = Math.floor(timeInSeconds / 60);
    const secs = Math.floor(timeInSeconds % 60);
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const progressPercent = duration > 0 ? (currentTime / duration) * 100 : 0;

  return (
    <div
      ref={containerRef}
      onMouseMove={resetControlsTimeout}
      onMouseLeave={() => isPlaying && setShowControls(false)}
      className="relative w-full aspect-video rounded-2xl md:rounded-3xl overflow-hidden bg-black select-none group border border-amber-500/30 shadow-[0_12px_45px_rgba(0,0,0,0.6)]"
    >
      {/* HTML5 Video Element */}
      <video
        ref={videoRef}
        src={src}
        poster={poster}
        autoPlay={autoPlay}
        playsInline
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
        onEnded={() => {
          setIsPlaying(false);
          setShowControls(true);
          if (onEnded) onEnded();
        }}
        onClick={togglePlay}
        className="w-full h-full object-cover cursor-pointer"
      />

      {/* Large Center Play/Pause Overlay Button */}
      <AnimatePresence>
        {(showControls || !isPlaying) && (
          <motion.div
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.85 }}
            transition={{ duration: 0.25 }}
            className="absolute inset-0 flex items-center justify-center pointer-events-none"
          >
            <button
              type="button"
              onClick={togglePlay}
              className="pointer-events-auto w-16 h-16 md:w-20 md:h-20 rounded-full bg-black/50 backdrop-blur-md border border-amber-400/40 text-amber-300 flex items-center justify-center shadow-[0_0_40px_rgba(251,191,36,0.4)] hover:scale-110 hover:bg-black/70 hover:border-amber-400 hover:text-amber-200 transition-all duration-300 active:scale-95 cursor-pointer"
              aria-label={isPlaying ? 'Pause Video' : 'Play Video'}
            >
              {isPlaying ? (
                <Pause className="w-8 h-8 md:w-10 md:h-10 fill-amber-300 text-amber-300" />
              ) : (
                <Play className="w-8 h-8 md:w-10 md:h-10 fill-amber-300 text-amber-300 translate-x-0.5" />
              )}
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Top Title Gradient Overlay */}
      <AnimatePresence>
        {showControls && title && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="absolute top-0 inset-x-0 p-4 md:p-6 bg-gradient-to-b from-black/80 via-black/40 to-transparent pointer-events-none flex items-center justify-between dir-rtl"
          >
            <span className="font-cairo font-bold text-sm md:text-base text-amber-100 tracking-tight drop-shadow-md">
              {title}
            </span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Bottom Cinematic Control Bar */}
      <AnimatePresence>
        {showControls && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            className="absolute bottom-0 inset-x-0 p-3 md:p-5 bg-gradient-to-t from-black/90 via-black/60 to-transparent dir-ltr space-y-2.5"
          >
            {/* Timeline / Seek Bar */}
            <div className="relative flex items-center group/timeline">
              <div className="relative w-full h-1.5 md:h-2 bg-white/20 hover:h-2.5 rounded-full overflow-hidden transition-all duration-200 cursor-pointer">
                {/* Played Progress Bar */}
                <div
                  className="absolute top-0 bottom-0 left-0 bg-gradient-to-r from-amber-500 via-amber-400 to-amber-300 rounded-full shadow-[0_0_12px_rgba(251,191,36,0.8)]"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>

              <input
                type="range"
                min={0}
                max={duration || 100}
                step={0.1}
                value={currentTime}
                onChange={handleSeek}
                onMouseDown={handleSeekStart}
                onMouseUp={handleSeekEnd}
                onTouchStart={handleSeekStart}
                onTouchEnd={handleSeekEnd}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                aria-label="Seek Video Timeline"
              />
            </div>

            {/* Bottom Row Controls */}
            <div className="flex items-center justify-between text-white/90 font-tajawal text-xs md:text-sm">
              {/* Left Group: Play/Pause, Skip 10s, Volume, Time Display */}
              <div className="flex items-center gap-2 md:gap-4">
                {/* Play/Pause Button */}
                <button
                  type="button"
                  onClick={togglePlay}
                  className="p-1.5 md:p-2 rounded-full hover:bg-white/15 text-amber-300 hover:text-amber-200 transition-colors cursor-pointer"
                  aria-label={isPlaying ? 'Pause' : 'Play'}
                >
                  {isPlaying ? (
                    <Pause className="w-5 h-5 md:w-6 md:h-6 fill-amber-300" />
                  ) : (
                    <Play className="w-5 h-5 md:w-6 md:h-6 fill-amber-300 translate-x-0.5" />
                  )}
                </button>

                {/* Rewind 10s */}
                <button
                  type="button"
                  onClick={() => skipTime(-10)}
                  className="p-1.5 rounded-full hover:bg-white/15 text-zinc-300 hover:text-white transition-colors cursor-pointer hidden sm:block"
                  aria-label="Rewind 10 seconds"
                  title="10 ثوانٍ للخلف"
                >
                  <RotateCcw className="w-4 h-4 md:w-5 md:h-5" />
                </button>

                {/* Forward 10s */}
                <button
                  type="button"
                  onClick={() => skipTime(10)}
                  className="p-1.5 rounded-full hover:bg-white/15 text-zinc-300 hover:text-white transition-colors cursor-pointer hidden sm:block"
                  aria-label="Forward 10 seconds"
                  title="10 ثوانٍ للأمام"
                >
                  <RotateCw className="w-4 h-4 md:w-5 md:h-5" />
                </button>

                {/* Volume Slider Group */}
                <div
                  className="relative flex items-center gap-1.5"
                  onMouseEnter={() => setIsHoveringVolume(true)}
                  onMouseLeave={() => setIsHoveringVolume(false)}
                >
                  <button
                    type="button"
                    onClick={toggleMute}
                    className="p-1.5 rounded-full hover:bg-white/15 text-zinc-300 hover:text-amber-300 transition-colors cursor-pointer"
                    aria-label="Toggle Mute"
                  >
                    {isMuted || volume === 0 ? (
                      <VolumeX className="w-5 h-5 text-red-400" />
                    ) : volume < 0.5 ? (
                      <Volume1 className="w-5 h-5" />
                    ) : (
                      <Volume2 className="w-5 h-5" />
                    )}
                  </button>

                  <AnimatePresence>
                    {(isHoveringVolume || isMuted) && (
                      <motion.div
                        initial={{ opacity: 0, width: 0 }}
                        animate={{ opacity: 1, width: 64 }}
                        exit={{ opacity: 0, width: 0 }}
                        transition={{ duration: 0.2 }}
                        className="overflow-hidden flex items-center"
                      >
                        <input
                          type="range"
                          min={0}
                          max={1}
                          step={0.05}
                          value={isMuted ? 0 : volume}
                          onChange={handleVolumeChange}
                          className="w-16 h-1 bg-white/30 accent-amber-400 rounded-lg cursor-pointer"
                          aria-label="Volume Control"
                        />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Time Display: Current / Duration */}
                <div className="font-mono text-xs text-amber-100/80 tracking-wider">
                  <span>{formatTime(currentTime)}</span>
                  <span className="mx-1 text-white/30">/</span>
                  <span className="text-white/60">{formatTime(duration)}</span>
                </div>
              </div>

              {/* Right Group: Playback Speed, Fullscreen */}
              <div className="flex items-center gap-2 md:gap-3">
                {/* Playback Speed Menu */}
                <div className="relative">
                  <button
                    type="button"
                    onClick={() => setShowSpeedMenu(!showSpeedMenu)}
                    className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-white/10 hover:bg-amber-500/20 text-amber-300 text-xs font-semibold border border-amber-500/20 transition-all cursor-pointer"
                    aria-label="Playback Speed Settings"
                  >
                    <Settings className="w-3.5 h-3.5" />
                    <span>{playbackSpeed}x</span>
                  </button>

                  {/* Speed Popup */}
                  <AnimatePresence>
                    {showSpeedMenu && (
                      <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                        transition={{ duration: 0.15 }}
                        className="absolute bottom-full right-0 mb-2 w-28 py-1.5 bg-zinc-900/95 backdrop-blur-xl border border-amber-500/30 rounded-xl shadow-2xl z-30"
                      >
                        <div className="px-3 py-1 text-[10px] font-cairo font-bold text-amber-400 border-b border-white/10 text-right dir-rtl">
                          سرعة التشغيل
                        </div>
                        {SPEED_OPTIONS.map((speed) => (
                          <button
                            key={speed}
                            type="button"
                            onClick={() => handleSpeedChange(speed)}
                            className={`w-full px-3 py-1.5 text-xs text-left flex items-center justify-between hover:bg-amber-500/20 transition-colors cursor-pointer ${
                              playbackSpeed === speed
                                ? 'text-amber-300 font-bold bg-amber-500/10'
                                : 'text-zinc-300'
                            }`}
                          >
                            <span>{speed}x</span>
                            {playbackSpeed === speed && (
                              <Check className="w-3.5 h-3.5 text-amber-400" />
                            )}
                          </button>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Fullscreen Button */}
                <button
                  type="button"
                  onClick={toggleFullscreen}
                  className="p-1.5 rounded-full hover:bg-white/15 text-zinc-300 hover:text-amber-300 transition-colors cursor-pointer"
                  aria-label={isFullscreen ? 'Exit Fullscreen' : 'Enter Fullscreen'}
                >
                  {isFullscreen ? (
                    <Minimize className="w-5 h-5" />
                  ) : (
                    <Maximize className="w-5 h-5" />
                  )}
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
