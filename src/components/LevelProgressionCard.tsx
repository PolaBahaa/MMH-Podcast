import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Trophy,
  Sparkles,
  Compass,
  BookOpen,
  Heart,
  Eye,
  Send,
  GraduationCap,
  ShieldCheck,
  Crown,
  ChevronDown,
  ChevronUp,
  CheckCircle2,
  Lock,
  Zap,
} from 'lucide-react';
import { USER_ECONOMY_DATA, RANKS, RankItem } from '../data/economyData';

interface LevelProgressionCardProps {
  compact?: boolean;
}

export const LevelProgressionCard: React.FC<LevelProgressionCardProps> = ({
  compact = false,
}) => {
  const [showAllRanks, setShowAllRanks] = useState(false);

  const {
    level,
    currentRank,
    nextRank,
    currentXP,
    minXPForLevel,
    maxXPForLevel,
    xpNeededForNextLevel,
  } = USER_ECONOMY_DATA;

  // Calculate percentage within the current level's bracket
  const xpInCurrentBracket = currentXP - minXPForLevel;
  const bracketTotal = maxXPForLevel - minXPForLevel;
  const progressPercent = Math.min(
    100,
    Math.max(0, Math.round((xpInCurrentBracket / bracketTotal) * 100))
  );

  // Helper for Rank Icons
  const getRankIcon = (iconName: string, className: string = 'w-4 h-4') => {
    switch (iconName) {
      case 'Compass':
        return <Compass className={className} />;
      case 'BookOpen':
        return <BookOpen className={className} />;
      case 'Heart':
        return <Heart className={className} />;
      case 'Eye':
        return <Eye className={className} />;
      case 'Send':
        return <Send className={className} />;
      case 'GraduationCap':
        return <GraduationCap className={className} />;
      case 'ShieldCheck':
        return <ShieldCheck className={className} />;
      case 'Crown':
        return <Crown className={className} />;
      default:
        return <Trophy className={className} />;
    }
  };

  return (
    <div className="relative overflow-hidden rounded-2xl md:rounded-3xl bg-gradient-to-br from-zinc-950 via-zinc-900 to-amber-950/30 border border-amber-500/25 p-4 md:p-6 shadow-[0_8px_32px_rgba(0,0,0,0.5)] text-right dir-rtl select-none space-y-5">
      {/* Background Accent glow */}
      <div className="absolute top-0 right-0 w-48 h-48 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-48 h-48 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none" />

      {/* Top Header: Current Level & Current Rank */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-amber-500/15 pb-4">
        <div className="flex items-center gap-3">
          <div className="relative">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-amber-500 via-amber-400 to-amber-300 text-amber-950 flex items-center justify-center font-cairo font-black text-xl shadow-[0_0_20px_rgba(251,191,36,0.35)]">
              {level}
            </div>
            <div className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-emerald-500 text-zinc-950 flex items-center justify-center border-2 border-zinc-950">
              <Sparkles className="w-3 h-3 text-zinc-950 fill-zinc-950" />
            </div>
          </div>

          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-tajawal text-amber-400/80 font-bold bg-amber-400/10 px-2.5 py-0.5 rounded-full border border-amber-400/20">
                المستوى {level} • Level {level}
              </span>
              <span className="text-xs font-tajawal text-emerald-400 font-bold bg-emerald-500/10 px-2.5 py-0.5 rounded-full border border-emerald-500/20">
                الرتبة الحالية
              </span>
            </div>

            <h3 className="font-cairo font-black text-xl md:text-2xl text-amber-100 flex items-center gap-2 mt-0.5">
              <span>{currentRank.titleAr}</span>
              <span className="text-xs font-tajawal font-normal text-amber-300/70">
                ({currentRank.titleEn})
              </span>
            </h3>
          </div>
        </div>

        {/* XP Needed Badge */}
        <div className="p-3 rounded-2xl bg-zinc-900/90 border border-emerald-500/30 flex items-center gap-3 shadow-inner">
          <div className="p-2 rounded-xl bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
            <Zap className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[11px] font-tajawal text-zinc-400 block leading-none">
              المتبقي للمستوى {level + 1}
            </span>
            <span className="font-cairo font-black text-base text-emerald-300 flex items-center gap-1 mt-1">
              {xpNeededForNextLevel} <span className="text-xs font-tajawal text-emerald-400">XP للرتبة التالية</span>
            </span>
          </div>
        </div>
      </div>

      {/* Level XP Progress Bar Section */}
      <div className="space-y-2">
        <div className="flex items-center justify-between text-xs font-tajawal">
          <span className="text-zinc-300 font-bold flex items-center gap-1.5">
            <Sparkles className="w-4 h-4 text-amber-400" />
            <span>تقدم نقاط XP للوصول إلى رتبة ({nextRank.titleAr} - {nextRank.titleEn})</span>
          </span>

          <span className="font-cairo font-black text-amber-300 text-sm">
            {currentXP} / {maxXPForLevel} <span className="text-xs font-tajawal font-normal text-amber-400">XP</span> ({progressPercent}%)
          </span>
        </div>

        {/* Progress Bar Container */}
        <div className="w-full bg-zinc-950 h-3.5 rounded-full p-0.5 border border-white/10 relative overflow-hidden shadow-inner">
          <motion.div
            className="h-full bg-gradient-to-r from-amber-500 via-amber-400 to-emerald-400 rounded-full shadow-[0_0_15px_rgba(251,191,36,0.5)]"
            initial={{ width: 0 }}
            animate={{ width: `${progressPercent}%` }}
            transition={{ duration: 1, ease: 'easeOut' }}
          />
        </div>

        <div className="flex items-center justify-between text-[11px] font-tajawal text-zinc-400">
          <span>الحد الأدنى: {minXPForLevel} XP</span>
          <span>الهدف التالي: {maxXPForLevel} XP</span>
        </div>
      </div>

      {/* Ranks Progression Strip (Ranks 1 to 8) */}
      <div className="space-y-3 pt-2">
        <div className="flex items-center justify-between">
          <h4 className="font-cairo font-black text-sm text-amber-200 flex items-center gap-2">
            <Trophy className="w-4 h-4 text-amber-400" />
            <span>تسلسل الرتب الروحية (8 رتب)</span>
          </h4>

          <button
            type="button"
            onClick={() => setShowAllRanks(!showAllRanks)}
            className="text-xs font-tajawal text-amber-400 hover:text-amber-200 flex items-center gap-1 transition-colors cursor-pointer"
          >
            <span>{showAllRanks ? 'إخفاء التفاصيل' : 'عرض كافة الرتب'}</span>
            {showAllRanks ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
          </button>
        </div>

        {/* Horizontal Mini Rank Badges Strip */}
        <div className="grid grid-cols-4 sm:grid-cols-8 gap-2">
          {RANKS.map((rk) => {
            const isCurrent = rk.level === level;
            const isUnlocked = rk.level <= level;

            return (
              <div
                key={rk.level}
                title={`${rk.titleAr} (${rk.titleEn}) - ${rk.minXP} XP`}
                className={`p-2 rounded-xl border text-center flex flex-col items-center justify-between gap-1 transition-all ${
                  isCurrent
                    ? 'bg-amber-500/20 border-amber-400 text-amber-100 shadow-[0_0_12px_rgba(251,191,36,0.3)]'
                    : isUnlocked
                    ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-200'
                    : 'bg-zinc-900/60 border-white/5 text-zinc-500'
                }`}
              >
                <div className="flex items-center justify-between w-full text-[10px] font-cairo">
                  <span className="font-bold">Lvl {rk.level}</span>
                  {isUnlocked ? (
                    <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                  ) : (
                    <Lock className="w-3 h-3 text-zinc-600" />
                  )}
                </div>

                <div className={`p-1.5 rounded-lg ${isCurrent ? 'text-amber-300' : isUnlocked ? 'text-emerald-400' : 'text-zinc-600'}`}>
                  {getRankIcon(rk.badgeIcon, 'w-4 h-4')}
                </div>

                <div className="text-center w-full">
                  <span className="block font-cairo font-bold text-[11px] truncate leading-tight">
                    {rk.titleAr}
                  </span>
                  <span className="block text-[9px] font-tajawal text-zinc-400 truncate">
                    {rk.titleEn}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Detailed Rank Expandable List */}
        <AnimatePresence>
          {showAllRanks && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="space-y-2 pt-2 border-t border-white/5 overflow-hidden"
            >
              {RANKS.map((rk) => {
                const isCurrent = rk.level === level;
                const isUnlocked = rk.level <= level;

                return (
                  <div
                    key={rk.level}
                    className={`p-3 rounded-xl border flex items-center justify-between gap-3 text-xs font-tajawal transition-all ${
                      isCurrent
                        ? 'bg-amber-500/15 border-amber-500/40 text-amber-100'
                        : isUnlocked
                        ? 'bg-zinc-900/80 border-emerald-500/20 text-zinc-300'
                        : 'bg-zinc-950/50 border-white/5 text-zinc-500'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-8 h-8 rounded-lg flex items-center justify-center border ${
                        isCurrent
                          ? 'bg-amber-400 text-amber-950 border-amber-300'
                          : isUnlocked
                          ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30'
                          : 'bg-zinc-900 text-zinc-600 border-white/5'
                      }`}>
                        {getRankIcon(rk.badgeIcon, 'w-4 h-4')}
                      </div>

                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-cairo font-bold text-sm text-amber-100">
                            المستوى {rk.level}: {rk.titleAr}
                          </span>
                          <span className="text-[11px] text-zinc-400 font-normal">
                            ({rk.titleEn})
                          </span>
                          {isCurrent && (
                            <span className="text-[10px] font-bold text-amber-300 bg-amber-500/20 px-2 py-0.5 rounded-full border border-amber-400/30">
                              رتبتك الحالية
                            </span>
                          )}
                        </div>
                        <p className="text-[11px] text-zinc-400 mt-0.5">
                          {rk.description}
                        </p>
                      </div>
                    </div>

                    <div className="text-left shrink-0">
                      <span className={`font-cairo font-bold block ${isUnlocked ? 'text-amber-300' : 'text-zinc-500'}`}>
                        {rk.minXP} - {rk.maxXP} XP
                      </span>
                      <span className="text-[10px] text-zinc-500 block">
                        {isUnlocked ? 'مفتوح' : 'مغلق'}
                      </span>
                    </div>
                  </div>
                );
              })}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};
