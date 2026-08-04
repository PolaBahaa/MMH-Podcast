import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { ArrowRight, Trophy, Crown, Flame, Sparkles, Coins } from 'lucide-react';
import { USER_ECONOMY_DATA } from '../data/economyData';
import { SkeletonBlock } from './SkeletonLoaders';
import { GlobalFooter } from './GlobalFooter';

interface LeaderboardViewProps {
  onClose: () => void;
}

export const LeaderboardView: React.FC<LeaderboardViewProps> = ({ onClose }) => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 450);
    return () => clearTimeout(timer);
  }, []);

  const users = [

    { rank: 1, name: 'خادم الكنيسة', level: 5, xp: '1,250 XP', coins: '320 🪙', streak: '7 أيام', crown: true },
    { rank: 2, name: 'سارة يوسف', level: 4, xp: '1,100 XP', coins: '280 🪙', streak: '6 أيام', crown: false },
    { rank: 3, name: 'ماريو حنا', level: 4, xp: '950 XP', coins: '210 🪙', streak: '5 أيام', crown: false },
    { rank: 4, name: 'أنت (المعلم الروحي)', level: USER_ECONOMY_DATA.level, xp: `${USER_ECONOMY_DATA.currentXP} XP`, coins: `${USER_ECONOMY_DATA.coins} 🪙`, streak: `${USER_ECONOMY_DATA.currentStreak} أيام`, crown: false, isCurrent: true },
    { rank: 5, name: 'بيتر بولس', level: 2, xp: '400 XP', coins: '90 🪙', streak: '3 أيام', crown: false },
  ];

  return (
    <motion.div
      className="fixed inset-0 z-50 overflow-y-auto bg-black/95 backdrop-blur-2xl text-white dir-rtl select-none"
      initial={{ opacity: 0, scale: 0.98, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.98, y: 20 }}
      transition={{ duration: 0.3 }}
    >
      <div className="sticky top-0 z-30 bg-black/80 backdrop-blur-md border-b border-amber-500/20 px-4 py-3.5 md:px-8 flex items-center justify-between">
        <button
          type="button"
          onClick={onClose}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full font-tajawal font-bold text-xs md:text-sm text-amber-200 bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/30 transition-all cursor-pointer"
        >
          <ArrowRight className="w-4 h-4 text-amber-400" />
          <span>العودة • Back</span>
        </button>

        <span className="text-xs md:text-sm font-tajawal font-extrabold text-amber-400 bg-amber-400/10 px-3.5 py-1 rounded-full border border-amber-400/20">
          لوحة الصدارة • Leaderboard
        </span>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-8 space-y-8">
        {isLoading ? (
          <div className="space-y-6">
            <div className="text-center space-y-2 flex flex-col items-center">
              <SkeletonBlock className="h-6 w-48 rounded-full" />
              <SkeletonBlock className="h-10 w-64 rounded-xl" />
              <SkeletonBlock className="h-4 w-80 rounded-md" />
            </div>
            <div className="bg-zinc-900 rounded-2xl border border-white/10 p-4 space-y-3">
              {[1, 2, 3, 4, 5].map((i) => (
                <div key={i} className="flex items-center justify-between p-3 rounded-xl bg-zinc-950/60">
                  <div className="flex items-center gap-4">
                    <SkeletonBlock className="h-6 w-8 rounded-md" />
                    <SkeletonBlock className="h-5 w-32 rounded-md" />
                    <SkeletonBlock className="h-4 w-12 rounded-full" />
                  </div>
                  <div className="flex items-center gap-3">
                    <SkeletonBlock className="h-6 w-20 rounded-full" />
                    <SkeletonBlock className="h-6 w-20 rounded-full" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <>
            <div className="text-center space-y-2">

          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-300 text-xs font-tajawal font-bold">
            <Trophy className="w-4 h-4" />
            <span>ترتيب المشاركين الأسبوعي</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-cairo font-black text-amber-100">
            لوحة ترتيب المتنافسين
          </h1>
          <p className="text-sm md:text-base font-tajawal text-amber-200/80">
            تنافس إيجابي مشجع للمواظبة والنمو الروحي خلال أسابيع الصوم.
          </p>
        </div>

        <div className="bg-zinc-900 rounded-2xl border border-white/10 overflow-hidden divide-y divide-white/5">
          {users.map((u) => (
            <div
              key={u.rank}
              className={`p-4 flex items-center justify-between transition-colors ${
                u.isCurrent ? 'bg-amber-500/15 border-r-4 border-amber-400' : 'hover:bg-white/5'
              }`}
            >
              <div className="flex items-center gap-4">
                <span className="font-cairo font-black text-lg w-8 text-center text-amber-300">
                  #{u.rank}
                </span>
                <div className="flex items-center gap-2">
                  {u.crown && <Crown className="w-4 h-4 text-amber-400" />}
                  <span className={`font-tajawal font-bold text-sm md:text-base ${u.isCurrent ? 'text-amber-300' : 'text-zinc-200'}`}>
                    {u.name}
                  </span>
                  <span className="text-[10px] font-cairo font-bold text-amber-300/80 bg-amber-500/10 px-2 py-0.5 rounded-full border border-amber-500/20">
                    Lvl {u.level}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-3 md:gap-4">
                <span className="text-xs font-tajawal text-orange-400 hidden sm:flex items-center gap-1">
                  <Flame className="w-3.5 h-3.5" /> {u.streak}
                </span>
                <span className="text-xs font-tajawal text-amber-300 flex items-center gap-1 bg-amber-500/10 px-2.5 py-1 rounded-full border border-amber-500/20">
                  <Coins className="w-3.5 h-3.5 text-amber-400" /> {u.coins}
                </span>
                <span className="font-cairo font-bold text-xs md:text-sm text-emerald-300 bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20 flex items-center gap-1">
                  <Sparkles className="w-3.5 h-3.5 text-emerald-400" /> {u.xp}
                </span>
              </div>
            </div>
          ))}
        </div>
          </>
        )}
      </div>

      <GlobalFooter />
    </motion.div>
  );
};
