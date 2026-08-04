import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Play, Target } from 'lucide-react';
import { SceneData, ActiveSection } from '../types';
import { getSundayVerseStyle } from '../utils/sundayTheme';

interface MinimalOverlayProps {
  scene: SceneData;
  isTransitioning?: boolean;
  currentIndex?: number;
  totalScenes?: number;
  activeSection?: ActiveSection;
  onSelectScene?: (index: number) => void;
  onWatchEpisode?: () => void;
  onStartActivities?: () => void;
}

export const MinimalOverlay: React.FC<MinimalOverlayProps> = ({
  scene,
  isTransitioning,
  currentIndex = 0,
  totalScenes = 7,
  activeSection = 'home',
  onSelectScene,
  onWatchEpisode,
  onStartActivities,
}) => {
  const isVisible = !isTransitioning && activeSection === 'home';

  return (
    <div className="absolute inset-0 pointer-events-none z-30 dir-rtl select-none p-4 md:p-8">
      {/* Lower-Right Floating Hero Panel (RTL Primary Focal Area) */}
      <AnimatePresence mode="wait">
        {isVisible && (
          <motion.div
            key={`header-${scene.id}`}
            className="absolute bottom-36 md:bottom-20 right-4 md:right-12 left-4 md:left-auto pointer-events-auto max-w-md md:max-w-xl"
            initial={{ opacity: 0, y: 12, scale: 0.98, filter: 'blur(0px)' }}
            animate={{ opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' }}
            exit={{ opacity: 0, y: -12, scale: 1.04, filter: 'blur(6px)' }}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          >
            {/* Ultra-Compact Floating Hero Card */}
            <div className="w-full bg-black/30 backdrop-blur-xl border border-amber-500/20 rounded-2xl p-5 md:p-6 shadow-[0_12px_35px_rgba(0,0,0,0.5)] hover:border-amber-400/35 transition-all duration-500 ease-out text-right space-y-3">
              
              {/* Subtle Episode Indicator */}
              <div className="flex items-center justify-start">
                <span className="px-2.5 py-0.5 rounded-full font-cairo font-semibold text-[10px] bg-black/40 text-amber-300/90 border border-amber-400/20">
                  حلقة {scene.episodeNumber} • Episode {scene.episodeNumber}
                </span>
              </div>

              {/* Sunday Title (Headline Focal Point) */}
              <h1 className="text-amber-50 text-2xl md:text-3xl font-cairo font-black tracking-tight leading-snug drop-shadow-md">
                {scene.sundayTitle}
              </h1>

              {/* Short Description */}
              <p className="text-zinc-300/85 text-xs font-tajawal font-medium leading-relaxed line-clamp-2">
                {scene.description}
              </p>

              {/* Action Buttons: Watch Episode & Activities */}
              <div className="flex items-center justify-start gap-3 pt-1">
                {/* Watch Episode Button */}
                <button
                  type="button"
                  onClick={onWatchEpisode}
                  className="inline-flex items-center justify-center gap-2 px-5 py-2 rounded-full font-cairo font-bold text-xs text-amber-950 bg-gradient-to-r from-amber-300 via-amber-400 to-amber-500 hover:from-amber-200 hover:to-amber-400 transition-all duration-300 ease-out hover:scale-[1.02] active:scale-[0.98] shadow-[0_0_20px_rgba(251,191,36,0.45)] hover:shadow-[0_0_25px_rgba(251,191,36,0.65)] cursor-pointer"
                >
                  <Play className="w-3.5 h-3.5 fill-amber-950 text-amber-950" />
                  <span>شاهد الحلقة</span>
                </button>

                {/* Activities Button */}
                <button
                  type="button"
                  onClick={onStartActivities}
                  className="inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-full font-cairo font-semibold text-xs text-amber-200/90 bg-white/5 hover:bg-white/10 border border-amber-500/25 hover:border-amber-400/40 transition-all duration-300 ease-out hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
                >
                  <Target className="w-3.5 h-3.5 text-amber-400/80" />
                  <span>الأنشطة</span>
                </button>
              </div>

            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Bible Verse (Lower-Left on Desktop / Lower-Center on Mobile) */}
      <AnimatePresence mode="wait">
        {isVisible && (
          <motion.div
            key={`verse-${scene.id}`}
            className="absolute bottom-10 md:bottom-20 left-4 md:left-12 right-4 md:right-auto pointer-events-auto max-w-md md:max-w-lg"
            initial={{ opacity: 0, y: 12, filter: 'blur(0px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            exit={{ opacity: 0, y: 12, scale: 1.04, filter: 'blur(6px)' }}
            transition={{ duration: 0.55, delay: 0.05, ease: [0.22, 1, 0.36, 1] }}
          >
            {(() => {
              const verseStyle = getSundayVerseStyle(scene.episodeNumber);
              return (
                <div className={`flex flex-col items-start px-6 py-3.5 rounded-2xl border transition-all duration-500 ease-out ${verseStyle.containerClass}`}>
                  <p className={`text-sm md:text-base font-amiri font-bold leading-relaxed text-story-verse mb-0.5 text-right ${verseStyle.textClass}`}>
                    {scene.verse}
                  </p>
                  <span className={`text-[11px] md:text-xs font-tajawal font-semibold tracking-wider text-story-subtitle ${verseStyle.refClass}`}>
                    — {scene.verseRef}
                  </span>
                </div>
              );
            })()}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Storybook Progress Cues at bottom edge */}
      <AnimatePresence>
        {isVisible && (
          <motion.div
            className="absolute bottom-3 left-1/2 -translate-x-1/2 flex items-center gap-2 pointer-events-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.9 }}
            exit={{ opacity: 0, scale: 0.9, y: 8 }}
            transition={{ duration: 0.4, ease: 'easeOut' }}
          >
            {Array.from({ length: totalScenes }).map((_, idx) => (
              <button
                key={idx}
                onClick={() => onSelectScene?.(idx)}
                aria-label={`الانتقال إلى الحلقة ${idx + 1}`}
                className={`transition-all duration-500 ease-out rounded-full cursor-pointer ${
                  idx === currentIndex
                    ? 'w-7 h-2 bg-amber-400 shadow-[0_0_12px_rgba(251,191,36,0.8)]'
                    : 'w-2 h-2 bg-white/40 hover:bg-white/80 hover:scale-125'
                }`}
              />
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};


