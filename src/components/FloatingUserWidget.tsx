import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { USER_ECONOMY_DATA } from '../data/economyData';
import {
  User,
  Sparkles,
  Coins,
  Flame,
  CheckCircle2,
  ChevronUp,
  ChevronDown,
  Award,
  BookOpen,
} from 'lucide-react';

interface FloatingUserWidgetProps {
  onOpenProfile?: () => void;
}

export const FloatingUserWidget: React.FC<FloatingUserWidgetProps> = ({ onOpenProfile }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  // Platform Economy User Data
  const userData = {
    name: 'المعلم الروحي',
    englishName: 'Spiritual Apprentice',
    level: USER_ECONOMY_DATA.level,
    currentXP: USER_ECONOMY_DATA.currentXP,
    maxXP: USER_ECONOMY_DATA.maxXPForLevel,
    coins: USER_ECONOMY_DATA.coins,
    currentStreak: USER_ECONOMY_DATA.currentStreak,
    completedSundays: USER_ECONOMY_DATA.completedSundays,
    totalSundays: USER_ECONOMY_DATA.totalSundays,
  };

  return (
    <div className="fixed bottom-4 left-4 z-40 pointer-events-auto select-none dir-rtl">
      {/* Floating Card Container */}
      <motion.div
        className="bg-black/20 backdrop-blur-md border border-amber-500/20 rounded-3xl shadow-[0_6px_20px_rgba(0,0,0,0.3)] text-white overflow-hidden transition-all duration-300 hover:border-amber-400/40"
        initial={{ opacity: 0, y: 20, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.4 }}
      >
        {/* Compact Bar / Header */}
        <div className="p-3 md:p-3.5 flex items-center justify-between gap-3 min-w-[280px] sm:min-w-[320px]">
          {/* Avatar & Name & Level */}
          <button
            type="button"
            onClick={onOpenProfile}
            className="flex items-center gap-3 text-right hover:opacity-90 transition-opacity cursor-pointer"
          >
            <div className="relative">
              <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-amber-500 to-amber-300 text-amber-950 flex items-center justify-center font-cairo font-black text-sm shadow-[0_0_15px_rgba(251,191,36,0.6)] border border-amber-200">
                <User className="w-5 h-5 text-amber-950" />
              </div>
              <span className="absolute -bottom-1 -left-1 bg-amber-400 text-amber-950 font-cairo font-black text-[9px] px-1.5 py-0.2 rounded-full border border-amber-100">
                L{userData.level}
              </span>
            </div>

            <div className="flex flex-col">
              <span className="font-cairo font-bold text-xs md:text-sm text-amber-100 leading-tight">
                {userData.name}
              </span>
              <span className="font-tajawal text-[10px] text-amber-400/80 leading-tight">
                المستوى {userData.level} • Level {userData.level}
              </span>
            </div>
          </button>

          {/* Quick Stats Summary Pills */}
          <div className="flex items-center gap-1.5">
            <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-[11px] font-tajawal font-extrabold bg-amber-500/20 text-amber-300 border border-amber-500/30">
              <Coins className="w-3 h-3 text-amber-400" />
              <span>{userData.coins}</span>
            </span>

            <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-[11px] font-tajawal font-extrabold bg-orange-500/20 text-orange-300 border border-orange-500/30">
              <Flame className="w-3 h-3 text-orange-400" />
              <span>{userData.currentStreak}d</span>
            </span>

            {/* Expand / Collapse Toggle Button */}
            <button
              type="button"
              onClick={() => setIsExpanded(!isExpanded)}
              className="p-1.5 rounded-full bg-white/10 hover:bg-white/20 text-amber-300 transition-colors cursor-pointer"
              title={isExpanded ? 'إخفاء التفاصيل' : 'عرض كافة التفاصيل'}
            >
              {isExpanded ? <ChevronDown className="w-4 h-4" /> : <ChevronUp className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {/* Expanded Details Panel */}
        <AnimatePresence>
          {isExpanded && (
            <motion.div
              className="px-4 pb-4 pt-2 border-t border-white/10 space-y-3 bg-black/40 text-right"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              {/* Detailed Metrics Grid */}
              <div className="grid grid-cols-2 gap-2 text-xs font-tajawal pt-1">
                {/* XP */}
                <div className="p-2.5 rounded-xl bg-zinc-900/90 border border-emerald-500/30 flex items-center justify-between">
                  <span className="text-zinc-400 flex items-center gap-1">
                    <Sparkles className="w-3.5 h-3.5 text-emerald-400" /> التعلم (XP)
                  </span>
                  <span className="font-cairo font-bold text-emerald-300">+{userData.currentXP}</span>
                </div>

                {/* Coins */}
                <div className="p-2.5 rounded-xl bg-zinc-900/90 border border-amber-500/30 flex items-center justify-between">
                  <span className="text-zinc-400 flex items-center gap-1">
                    <Coins className="w-3.5 h-3.5 text-amber-400" /> المتجر (Coins)
                  </span>
                  <span className="font-cairo font-bold text-amber-300">{userData.coins} 🪙</span>
                </div>

                {/* Streak */}
                <div className="p-2.5 rounded-xl bg-zinc-900/90 border border-orange-500/30 flex items-center justify-between">
                  <span className="text-zinc-400 flex items-center gap-1">
                    <Flame className="w-3.5 h-3.5 text-orange-400" /> السلسلة
                  </span>
                  <span className="font-cairo font-bold text-orange-400">{userData.currentStreak} أيام 🔥</span>
                </div>

                {/* Completed Sundays */}
                <div className="p-2.5 rounded-xl bg-zinc-900/90 border border-sky-500/30 flex items-center justify-between">
                  <span className="text-zinc-400 flex items-center gap-1">
                    <BookOpen className="w-3.5 h-3.5 text-sky-400" /> الآحاد
                  </span>
                  <span className="font-cairo font-bold text-sky-300">{userData.completedSundays} من {userData.totalSundays}</span>
                </div>
              </div>

              {/* Progress Bar for Sundays */}
              <div className="space-y-1">
                <div className="flex justify-between text-[11px] font-tajawal text-amber-200">
                  <span>التقدم في آحاد الصوم المقدس:</span>
                  <span className="font-bold text-amber-400">
                    {Math.round((userData.completedSundays / userData.totalSundays) * 100)}%
                  </span>
                </div>
                <div className="w-full bg-zinc-800 h-2 rounded-full overflow-hidden border border-white/10">
                  <div
                    className="bg-gradient-to-r from-amber-500 to-amber-300 h-full rounded-full"
                    style={{ width: `${(userData.completedSundays / userData.totalSundays) * 100}%` }}
                  />
                </div>
              </div>

              {/* Open Profile Button */}
              {onOpenProfile && (
                <button
                  type="button"
                  onClick={onOpenProfile}
                  className="w-full py-2 rounded-xl bg-amber-500/20 hover:bg-amber-500/30 border border-amber-500/30 text-amber-200 text-xs font-cairo font-bold transition-all text-center flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <Award className="w-3.5 h-3.5 text-amber-400" />
                  <span>فتح الملف الشخصي الكامل • View Full Profile</span>
                </button>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};
