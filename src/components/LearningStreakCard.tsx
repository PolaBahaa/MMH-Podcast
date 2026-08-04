import React from 'react';
import { motion } from 'motion/react';
import { Flame, Award, Calendar, Target, CheckCircle2, Circle } from 'lucide-react';
import { USER_ECONOMY_DATA } from '../data/economyData';

export const LearningStreakCard: React.FC = () => {
  const { currentStreak, longestStreak, weeklyGoal, monthlyGoal } = USER_ECONOMY_DATA;

  const weeklyPercent = Math.round(
    (weeklyGoal.currentDays / weeklyGoal.targetDays) * 100
  );
  const monthlyPercent = Math.round(
    (monthlyGoal.currentDays / monthlyGoal.targetDays) * 100
  );

  // Weekly days representation (Sunday to Saturday)
  const weekDays = [
    { dayAr: 'الأحد', dayEn: 'Sun', active: true },
    { dayAr: 'الإثنين', dayEn: 'Mon', active: true },
    { dayAr: 'الثلاثاء', dayEn: 'Tue', active: true },
    { dayAr: 'الأربعاء', dayEn: 'Wed', active: true },
    { dayAr: 'الخميس', dayEn: 'Thu', active: true },
    { dayAr: 'الجمعة', dayEn: 'Fri', active: false },
    { dayAr: 'السبت', dayEn: 'Sat', active: false },
  ];

  return (
    <div className="relative overflow-hidden rounded-2xl md:rounded-3xl bg-gradient-to-br from-zinc-950 via-zinc-900 to-orange-950/20 border border-orange-500/20 p-4 md:p-6 shadow-[0_8px_32px_rgba(0,0,0,0.5)] text-right dir-rtl select-none space-y-5">
      {/* Subtle Background Glow */}
      <div className="absolute top-0 right-1/3 w-48 h-48 bg-orange-500/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/3 w-48 h-48 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />

      {/* Header */}
      <div className="flex items-center justify-between border-b border-orange-500/15 pb-3.5">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-orange-500/15 border border-orange-500/30 text-orange-400 flex items-center justify-center">
            <motion.div
              animate={{ scale: [1, 1.08, 1] }}
              transition={{ repeat: Infinity, duration: 2.5, ease: 'easeInOut' }}
            >
              <Flame className="w-5 h-5 fill-orange-500/20 text-orange-400" />
            </motion.div>
          </div>

          <div>
            <h3 className="font-cairo font-black text-base text-orange-100 flex items-center gap-2">
              <span>سلسلة المواظبة اليومية</span>
              <span className="text-[10px] font-tajawal font-normal text-orange-300/80 bg-orange-500/10 px-2 py-0.5 rounded-full border border-orange-500/20">
                Learning Streak
              </span>
            </h3>
            <p className="font-tajawal text-[11px] text-zinc-400">
              متابعة الاستمرار اليومي والأهداف الأسبوعية والشهرية
            </p>
          </div>
        </div>

        <span className="text-xs font-tajawal text-orange-300/90 font-bold bg-orange-500/10 px-3 py-1 rounded-full border border-orange-500/20">
          {currentStreak} أيام متتالية 🔥
        </span>
      </div>

      {/* 4 Core Streak Metrics Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {/* 1. Current Streak */}
        <div className="p-3.5 rounded-xl bg-zinc-900/90 border border-orange-500/25 space-y-1.5 relative overflow-hidden">
          <div className="flex items-center justify-between text-[11px] font-tajawal text-zinc-400">
            <span className="flex items-center gap-1 font-bold text-orange-300">
              <Flame className="w-3.5 h-3.5 text-orange-400" />
              <span>السلسلة الحالية</span>
            </span>
            <span className="text-[9px] text-orange-400/70">Current</span>
          </div>
          <div className="flex items-baseline justify-between pt-1">
            <span className="text-2xl font-cairo font-black text-orange-200">
              {currentStreak}
            </span>
            <span className="text-xs font-tajawal text-zinc-400">أيام</span>
          </div>
          <p className="text-[10px] font-tajawal text-zinc-400 truncate">
            مواظبة نشطة حالياً
          </p>
        </div>

        {/* 2. Longest Streak */}
        <div className="p-3.5 rounded-xl bg-zinc-900/90 border border-amber-500/25 space-y-1.5 relative overflow-hidden">
          <div className="flex items-center justify-between text-[11px] font-tajawal text-zinc-400">
            <span className="flex items-center gap-1 font-bold text-amber-300">
              <Award className="w-3.5 h-3.5 text-amber-400" />
              <span>أطول سلسلة</span>
            </span>
            <span className="text-[9px] text-amber-400/70">Record</span>
          </div>
          <div className="flex items-baseline justify-between pt-1">
            <span className="text-2xl font-cairo font-black text-amber-200">
              {longestStreak}
            </span>
            <span className="text-xs font-tajawal text-zinc-400">ييوماً</span>
          </div>
          <p className="text-[10px] font-tajawal text-zinc-400 truncate">
            أفضل إنجاز مواظبة
          </p>
        </div>

        {/* 3. Weekly Goal */}
        <div className="p-3.5 rounded-xl bg-zinc-900/90 border border-sky-500/25 space-y-1.5 relative overflow-hidden">
          <div className="flex items-center justify-between text-[11px] font-tajawal text-zinc-400">
            <span className="flex items-center gap-1 font-bold text-sky-300">
              <Calendar className="w-3.5 h-3.5 text-sky-400" />
              <span>الهدف الأسبوعي</span>
            </span>
            <span className="text-[9px] text-sky-400/70">Weekly</span>
          </div>
          <div className="flex items-baseline justify-between pt-1">
            <span className="text-xl font-cairo font-black text-sky-200">
              {weeklyGoal.currentDays} / {weeklyGoal.targetDays}
            </span>
            <span className="text-xs font-tajawal text-sky-300 font-bold">{weeklyPercent}%</span>
          </div>
          <div className="w-full bg-zinc-950 h-1.5 rounded-full overflow-hidden border border-white/5">
            <motion.div
              className="bg-sky-400 h-full rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${weeklyPercent}%` }}
              transition={{ duration: 0.8 }}
            />
          </div>
        </div>

        {/* 4. Monthly Goal */}
        <div className="p-3.5 rounded-xl bg-zinc-900/90 border border-emerald-500/25 space-y-1.5 relative overflow-hidden">
          <div className="flex items-center justify-between text-[11px] font-tajawal text-zinc-400">
            <span className="flex items-center gap-1 font-bold text-emerald-300">
              <Target className="w-3.5 h-3.5 text-emerald-400" />
              <span>الهدف الشهري</span>
            </span>
            <span className="text-[9px] text-emerald-400/70">Monthly</span>
          </div>
          <div className="flex items-baseline justify-between pt-1">
            <span className="text-xl font-cairo font-black text-emerald-200">
              {monthlyGoal.currentDays} / {monthlyGoal.targetDays}
            </span>
            <span className="text-xs font-tajawal text-emerald-300 font-bold">{monthlyPercent}%</span>
          </div>
          <div className="w-full bg-zinc-950 h-1.5 rounded-full overflow-hidden border border-white/5">
            <motion.div
              className="bg-emerald-400 h-full rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${monthlyPercent}%` }}
              transition={{ duration: 0.8 }}
            />
          </div>
        </div>
      </div>

      {/* Subtle Weekly Activity Tracker Bar */}
      <div className="pt-1">
        <div className="flex items-center justify-between text-[11px] font-tajawal text-zinc-400 mb-2">
          <span>سجل هذا الأسبوع (الأحد - السبت)</span>
          <span className="text-orange-300 font-bold">{weeklyGoal.currentDays} أيام مكتملة</span>
        </div>

        <div className="grid grid-cols-7 gap-1.5 text-center">
          {weekDays.map((wd, i) => (
            <div
              key={i}
              className={`p-2 rounded-xl border flex flex-col items-center justify-center gap-1 text-[10px] font-tajawal transition-all ${
                wd.active
                  ? 'bg-orange-500/10 border-orange-500/30 text-orange-200'
                  : 'bg-zinc-900/50 border-white/5 text-zinc-600'
              }`}
            >
              <span className="font-bold">{wd.dayAr}</span>
              {wd.active ? (
                <CheckCircle2 className="w-3.5 h-3.5 text-orange-400" />
              ) : (
                <Circle className="w-3.5 h-3.5 text-zinc-700" />
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
