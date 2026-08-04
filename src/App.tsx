import React, { useState, useEffect, useCallback, useRef } from 'react';
import { AnimatePresence } from 'motion/react';
import { SCENES } from './data/scenesData';
import { TransitionDirection, SceneData, ActiveSection } from './types';
import { SceneBackground } from './components/SceneBackground';
import { SceneVideo } from './components/SceneVideo';
import { JesusFigure } from './components/JesusFigure';
import { MinimalOverlay } from './components/MinimalOverlay';
import { AudioController } from './components/AudioController';
import { GlobalNavbar } from './components/GlobalNavbar';
import { EpisodeView } from './components/EpisodeView';
import { ActivitiesView } from './components/ActivitiesView';
import { QuizView } from './components/QuizView';
import { PuzzleGamesView } from './components/PuzzleGamesView';
import { CrosswordView } from './components/CrosswordView';
import { RewardStoreView } from './components/RewardStoreView';
import { ProfileView } from './components/ProfileView';
import { MyJourneyView } from './components/MyJourneyView';
import { AchievementsView } from './components/AchievementsView';
import { LeaderboardView } from './components/LeaderboardView';
import { SettingsView } from './components/SettingsView';
import { AuthView } from './components/AuthView';
import { FloatingUserWidget } from './components/FloatingUserWidget';

export default function App() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [direction, setDirection] = useState<TransitionDirection>('next');
  const [activeSection, setActiveSection] = useState<ActiveSection>('home');

  const touchStartRef = useRef<{ x: number; y: number } | null>(null);

  const totalScenes = SCENES.length;
  const currentScene = SCENES[currentIndex];

  const triggerTransition = useCallback(
    (dir: TransitionDirection, targetIndex?: number) => {
      if (isTransitioning || activeSection !== 'home') return;

      setIsTransitioning(true);
      setDirection(dir);

      let nextIndex: number;
      if (typeof targetIndex === 'number') {
        nextIndex = targetIndex;
      } else if (dir === 'next') {
        nextIndex = (currentIndex + 1) % totalScenes;
      } else {
        nextIndex = (currentIndex - 1 + totalScenes) % totalScenes;
      }

      setCurrentIndex(nextIndex);

      // Lock input during the smooth cinematic storybook transition
      setTimeout(() => {
        setIsTransitioning(false);
      }, 1400);
    },
    [currentIndex, isTransitioning, activeSection, totalScenes]
  );

  // Mouse wheel scroll handler
  useEffect(() => {
    let lastWheelTime = 0;

    const handleWheel = (e: WheelEvent) => {
      if (activeSection !== 'home') return; // Don't trigger scene change when viewing an overlay view
      e.preventDefault();
      const now = Date.now();
      if (now - lastWheelTime < 800) return; // Debounce fast scroll wheels

      if (Math.abs(e.deltaY) > 18) {
        lastWheelTime = now;
        if (e.deltaY > 0) {
          triggerTransition('next');
        } else {
          triggerTransition('prev');
        }
      }
    };

    window.addEventListener('wheel', handleWheel, { passive: false });
    return () => window.removeEventListener('wheel', handleWheel);
  }, [activeSection, triggerTransition]);

  // Touch swipe handlers
  useEffect(() => {
    const handleTouchStart = (e: TouchEvent) => {
      if (activeSection !== 'home') return;
      if (e.touches.length > 0) {
        touchStartRef.current = {
          x: e.touches[0].clientX,
          y: e.touches[0].clientY,
        };
      }
    };

    const handleTouchEnd = (e: TouchEvent) => {
      if (activeSection !== 'home' || !touchStartRef.current || e.changedTouches.length === 0) return;

      const touchEnd = {
        x: e.changedTouches[0].clientX,
        y: e.changedTouches[0].clientY,
      };

      const deltaX = touchStartRef.current.x - touchEnd.x;
      const deltaY = touchStartRef.current.y - touchEnd.y;

      // Handle swipe in any direction
      if (Math.abs(deltaY) > 40 || Math.abs(deltaX) > 40) {
        if (deltaY > 40 || deltaX > 40) {
          triggerTransition('next');
        } else if (deltaY < -40 || deltaX < -40) {
          triggerTransition('prev');
        }
      }

      touchStartRef.current = null;
    };

    window.addEventListener('touchstart', handleTouchStart, { passive: true });
    window.addEventListener('touchend', handleTouchEnd, { passive: true });

    return () => {
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchend', handleTouchEnd);
    };
  }, [activeSection, triggerTransition]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (activeSection !== 'home') {
        if (e.key === 'Escape') {
          setActiveSection('home');
        }
        return;
      }

      if (['ArrowDown', 'ArrowLeft', 'Space', 'PageDown'].includes(e.code)) {
        e.preventDefault();
        triggerTransition('next');
      } else if (['ArrowUp', 'ArrowRight', 'PageUp'].includes(e.code)) {
        e.preventDefault();
        triggerTransition('prev');
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeSection, triggerTransition]);

  const handleSelectScene = (index: number) => {
    if (index === currentIndex || isTransitioning || activeSection !== 'home') return;
    const dir = index > currentIndex ? 'next' : 'prev';
    triggerTransition(dir, index);
  };

  return (
    <main
      className="relative w-screen h-screen overflow-hidden bg-black select-none dir-rtl touch-none"
      style={{ width: '100vw', height: '100vh' }}
    >
      {/* Background Video Scene Layer */}
      <AnimatePresence mode="sync">
        <SceneVideo
          key={currentScene.id}
          scene={currentScene}
          isTransitioning={isTransitioning}
          direction={direction}
        />
      </AnimatePresence>

      {/* Global Section Navigation Bar */}
      <GlobalNavbar
        activeSection={activeSection}
        onNavigate={(sec) => setActiveSection(sec)}
        currentEpisodeNumber={currentScene.episodeNumber}
      />

      {/* Minimal Overlay: Sunday Title, Bible Verse, Subtitle (Landing Experience) */}
      <MinimalOverlay
        scene={currentScene}
        isTransitioning={isTransitioning}
        currentIndex={currentIndex}
        totalScenes={totalScenes}
        activeSection={activeSection}
        onSelectScene={handleSelectScene}
        onWatchEpisode={() => setActiveSection('episode')}
        onStartActivities={() => setActiveSection('activities')}
      />

      {/* Connected Section Views Architecture */}
      <AnimatePresence>
        {activeSection === 'episode' && (
          <EpisodeView
            scene={currentScene}
            onClose={() => setActiveSection('home')}
            onStartActivities={() => setActiveSection('activities')}
          />
        )}

        {activeSection === 'activities' && (
          <ActivitiesView
            scene={currentScene}
            onClose={() => setActiveSection('home')}
          />
        )}

        {activeSection === 'quiz' && (
          <QuizView
            scene={currentScene}
            onClose={() => setActiveSection('home')}
          />
        )}

        {activeSection === 'puzzle' && (
          <PuzzleGamesView
            scene={currentScene}
            onClose={() => setActiveSection('home')}
          />
        )}

        {activeSection === 'crossword' && (
          <CrosswordView
            scene={currentScene}
            onClose={() => setActiveSection('home')}
          />
        )}

        {activeSection === 'store' && (
          <RewardStoreView
            onClose={() => setActiveSection('home')}
          />
        )}

        {activeSection === 'journey' && (
          <MyJourneyView
            scene={currentScene}
            onClose={() => setActiveSection('home')}
            onNavigate={(sec) => setActiveSection(sec)}
          />
        )}

        {activeSection === 'profile' && (
          <ProfileView
            onClose={() => setActiveSection('home')}
            onNavigate={(sec) => setActiveSection(sec)}
          />
        )}

        {activeSection === 'achievements' && (
          <AchievementsView
            onClose={() => setActiveSection('home')}
          />
        )}

        {activeSection === 'leaderboard' && (
          <LeaderboardView
            onClose={() => setActiveSection('home')}
          />
        )}

        {activeSection === 'settings' && (
          <SettingsView
            onClose={() => setActiveSection('home')}
            onNavigate={(sec) => setActiveSection(sec)}
          />
        )}

        {activeSection === 'auth' && (
          <AuthView
            onClose={() => setActiveSection('home')}
            onLoginSuccess={() => setActiveSection('profile')}
          />
        )}
      </AnimatePresence>

      {/* Ambient Audio Toggle */}
      <AudioController />

      {/* Floating User Widget (Hidden on home page to keep home minimal) */}
      {activeSection !== 'home' && (
        <FloatingUserWidget onOpenProfile={() => setActiveSection('profile')} />
      )}
    </main>
  );
}

