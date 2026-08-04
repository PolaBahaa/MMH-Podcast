import React from 'react';
import { motion } from 'motion/react';
import {
  Trophy,
  Sparkles,
  Award,
  Coins,
  Target,
  Compass,
  CheckCircle2,
  TrendingUp,
  RotateCcw,
} from 'lucide-react';
import { SceneData } from '../types';
import { SCENES } from '../data/scenesData';

interface EpisodeCompletionViewProps {
  scene: SceneData;
  onStartActivities: () => void;
  onContinueJourney: () => void;
  onReplayEpisode?: () => void;
  onClose?: () => void;
}

export const EpisodeCompletionView: React.FC<EpisodeCompletionViewProps> = ({
  scene,
  onStartActivities,
  onContinueJourney,
  onReplayEpisode,
  onClose,
}) => {
  // Find next recommended episode
  const nextSceneIndex = (scene.episodeNumber % SCENES.length);
  const nextScene = SCENES[nextSceneIndex] || SCENES[0];

  // Placeholder reward values for progression flow
  const xpEarned = 150;
  const coinsEarned = 35;
  const previousProgress = 28;
  const updatedProgress = 42;

  return (
    <motion.div
      className="fixed inset-0 z-50 overflow-y-auto bg-black/95 backdrop-blur-2xl text-white dir-rtl select-none flex items-center justify-center p-4 md:p-8"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="relative w-full max-w-2xl bg-zinc-900/95 border-2 border-amber-500/40 rounded-3xl p-6 md:p-8 shadow-[0_0_60px_rgba(251,191,36,0.25)] space-y-6 md:space-y-8 my-auto">
        {/* Glow ambient background element */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-amber-500/20 rounded-full blur-3xl pointer-events-none" />

        {/* Top Header: Completion Badge & Episode Completed Title */}
        <div className="text-center space-y-3 relative z-10">
          <motion.div
            className="w-20 h-20 md:w-24 md:h-24 mx-auto rounded-full bg-gradient-to-tr from-amber-500 via-amber-400 to-amber-300 text-amber-950 flex items-center justify-center shadow-[0_0_35px_rgba(251,191,36,0.8)] border-4 border-amber-200"
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: 'spring', stiffness: 200, damping: 15, delay: 0.1 }}
          >
            <Trophy className="w-10 h-10 md:w-12 md:h-12" />
          </motion.div>

          <div className="space-y-1">
            <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs md:text-sm font-tajawal font-extrabold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>تم إكتمال الحلقة • Episode Completed</span>
            </span>

            <h2 className="text-2xl md:text-4xl font-cairo font-black text-amber-100 tracking-tight">
              تهانينا! أكملت الحلقة {scene.episodeNumber}
            </h2>
            <p className="text-xs md:text-sm font-tajawal text-amber-200/80">
              {scene.sundayTitle}
            </p>
          </div>
        </div>

        {/* Rewards Earned Grid: XP & Coins */}
        <div className="grid grid-cols-2 gap-4 relative z-10">
          <div className="p-4 md:p-5 rounded-2xl bg-gradient-to-br from-amber-500/10 via-zinc-800 to-zinc-900 border border-amber-500/30 text-center space-y-1">
            <span className="text-xs font-tajawal text-zinc-400 flex items-center justify-center gap-1">
              <Award className="w-4 h-4 text-emerald-400" />
              <span>نقاط الخبرة المكتسبة</span>
            </span>
            <span className="font-cairo font-black text-2xl md:text-3xl text-emerald-400 block">
              +{xpEarned} XP
            </span>
            <span className="text-[10px] font-tajawal text-emerald-300/80">
              XP Earned
            </span>
          </div>

          <div className="p-4 md:p-5 rounded-2xl bg-gradient-to-br from-amber-500/10 via-zinc-800 to-zinc-900 border border-amber-500/30 text-center space-y-1">
            <span className="text-xs font-tajawal text-zinc-400 flex items-center justify-center gap-1">
              <Coins className="w-4 h-4 text-amber-400" />
              <span>العملات المكتسبة</span>
            </span>
            <span className="font-cairo font-black text-2xl md:text-3xl text-amber-300 block">
              +{coinsEarned} 🪙
            </span>
            <span className="text-[10px] font-tajawal text-amber-300/80">
              Coins Earned
            </span>
          </div>
        </div>

        {/* Progress Updated Bar */}
        <div className="p-4 md:p-5 rounded-2xl bg-zinc-950/80 border border-white/10 space-y-3 relative z-10">
          <div className="flex items-center justify-between text-xs md:text-sm font-tajawal font-bold">
            <span className="text-amber-200 flex items-center gap-1.5">
              <TrendingUp className="w-4 h-4 text-amber-400" />
              <span>تم تحديث التقدم العام • Progress Updated</span>
            </span>
            <span className="text-amber-400 font-extrabold">
              {previousProgress}% ➔ {updatedProgress}%
            </span>
          </div>

          <div className="w-full bg-zinc-800 h-3.5 rounded-full overflow-hidden p-0.5 border border-white/10">
            <motion.div
              className="bg-gradient-to-r from-amber-500 via-amber-400 to-amber-300 h-full rounded-full shadow-[0_0_12px_rgba(251,191,36,0.8)]"
              initial={{ width: `${previousProgress}%` }}
              animate={{ width: `${updatedProgress}%` }}
              transition={{ duration: 1, ease: 'easeOut', delay: 0.3 }}
            />
          </div>
          <p className="text-[11px] font-tajawal text-zinc-400 text-center">
            أنت الآن أقرب لإكمال رحلة آحاد الصوم الكبير السبعة!
          </p>
        </div>

        {/* Action Buttons: Continue to Activities, Replay Episode, Continue Journey */}
        <div className="space-y-3 pt-2 relative z-10">
          {/* Action 1: Continue to Activities */}
          <button
            type="button"
            onClick={onStartActivities}
            className="w-full inline-flex items-center justify-center gap-2.5 px-6 py-4 rounded-full font-cairo font-black text-base md:text-lg text-amber-950 bg-gradient-to-r from-amber-300 via-amber-400 to-amber-500 hover:from-amber-200 hover:to-amber-400 transition-all duration-300 shadow-[0_0_25px_rgba(251,191,36,0.5)] hover:scale-[1.01] active:scale-[0.98] cursor-pointer"
          >
            <Target className="w-5 h-5 text-amber-950" />
            <span>المتابعة إلى الأنشطة • Continue to Activities</span>
          </button>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {/* Action 2: Replay Episode */}
            <button
              type="button"
              onClick={onReplayEpisode || onClose}
              className="w-full inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-full font-cairo font-bold text-sm text-amber-200 bg-amber-500/15 hover:bg-amber-500/25 border border-amber-500/35 transition-all duration-200 hover:scale-[1.01] active:scale-[0.98] cursor-pointer"
            >
              <RotateCcw className="w-4 h-4 text-amber-400" />
              <span>إعادة تشغيل الحلقة • Replay Episode</span>
            </button>

            {/* Action 3: Continue Journey */}
            <button
              type="button"
              onClick={onContinueJourney}
              className="w-full inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-full font-cairo font-bold text-sm text-amber-100 bg-zinc-800/90 hover:bg-zinc-700/90 border border-white/15 transition-all duration-200 hover:scale-[1.01] active:scale-[0.98] cursor-pointer"
            >
              <Compass className="w-4 h-4 text-amber-400" />
              <span>متابعة الرحلة • Continue Journey</span>
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
