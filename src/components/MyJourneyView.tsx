import React from 'react';
import { motion } from 'motion/react';
import { CompactProgressDashboard } from './CompactProgressDashboard';
import { JourneyTimelineTracker } from './JourneyTimelineTracker';
import { RewardsSummaryCard } from './RewardsSummaryCard';
import { ActiveSection, SceneData } from '../types';
import { GlobalFooter } from './GlobalFooter';
import {
  Compass,
  X,
  Play,
  Sparkles,
  Coins,
  Flame,
  Award,
  Calendar,
  CheckCircle2,
  Clock,
  ArrowRight,
  Tv,
  ShoppingBag,
  Trophy,
  ChevronRight,
  BookOpen,
} from 'lucide-react';

interface MyJourneyViewProps {
  scene?: SceneData;
  onClose: () => void;
  onNavigate: (section: ActiveSection) => void;
}

export const MyJourneyView: React.FC<MyJourneyViewProps> = ({
  scene,
  onClose,
  onNavigate,
}) => {
  // Journey User Stats
  const userJourneyData = {
    name: 'المعلم الروحي',
    englishName: 'Spiritual Apprentice',
    level: 3,
    levelTitle: 'خادم دراسات الصوم',
    nextLevelTitle: 'سفير الكلمة (المستوى 4)',
    currentXP: 450,
    maxXP: 600,
    coins: 120,
    currentStreak: 5,
    weeklyGoalDays: 4,
    weeklyGoalTarget: 5,
    completedSundays: 2,
    totalSundays: 7,
  };

  // Weekly days status tracker
  const weekDays = [
    { name: 'الأحد', short: 'Sun', active: true },
    { name: 'الإثنين', short: 'Mon', active: true },
    { name: 'الثلاثاء', short: 'Tue', active: true },
    { name: 'الأربعاء', short: 'Wed', active: true },
    { name: 'الخميس', short: 'Thu', active: false },
    { name: 'الجمعة', short: 'Fri', active: false },
    { name: 'السبت', short: 'Sat', active: false },
  ];

  // Recently Watched Episodes Data
  const recentEpisodes = [
    {
      id: 2,
      title: 'أحد التجربة',
      englishTitle: 'Temptation Sunday',
      progress: 65,
      timestamp: '8:15 / 12:30 دقيقة',
      status: 'in_progress',
      timeAgo: 'منذ ساعتين',
      reward: '+150 XP عند الإكمال',
    },
    {
      id: 1,
      title: 'أحد الكنز',
      englishTitle: 'The Treasure Sunday',
      progress: 100,
      timestamp: 'مكتمل بالكامل 12:00 دقيقة',
      status: 'completed',
      timeAgo: 'منذ يومين',
      reward: '+200 XP ممتلكة',
    },
  ];

  return (
    <motion.div
      className="fixed inset-0 z-50 bg-black/90 backdrop-blur-2xl text-white flex flex-col overflow-y-auto dir-rtl select-none"
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.98 }}
      transition={{ duration: 0.3 }}
    >
      {/* Header Bar */}
      <div className="sticky top-0 z-20 bg-black/80 backdrop-blur-md border-b border-white/10 px-4 md:px-8 py-3.5 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-amber-500 via-amber-400 to-amber-300 text-amber-950 flex items-center justify-center font-cairo font-black text-lg shadow-[0_0_15px_rgba(251,191,36,0.5)]">
            <Compass className="w-5 h-5 text-amber-950" />
          </div>
          <div>
            <h1 className="font-cairo font-black text-lg md:text-xl text-amber-100 leading-tight">
              رحلتي الشخصية • My Journey
            </h1>
            <p className="font-tajawal text-xs text-amber-300/70">
              مساحتك الخاصة لمتابعة التقدم الإيماني والدراسي والأهداف اليومية
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={onClose}
          className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-zinc-300 hover:text-white transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Main Content Dashboard Container */}
      <div className="max-w-7xl mx-auto w-full p-4 md:p-8 space-y-6">
        
        {/* 1. Continue Learning Hero Card */}
        <div className="p-5 md:p-6 rounded-3xl bg-gradient-to-r from-amber-500/15 via-zinc-900/90 to-amber-500/15 border border-amber-500/30 space-y-4 shadow-[0_10px_35px_rgba(0,0,0,0.5)]">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2.5">
              <span className="w-3 h-3 rounded-full bg-amber-400 animate-pulse" />
              <h2 className="font-cairo font-black text-lg md:text-xl text-amber-100">
                متابعة التعلم • Continue Learning
              </h2>
              <span className="text-xs font-tajawal text-amber-300/90 bg-amber-500/20 px-3 py-0.5 rounded-full border border-amber-500/30 font-semibold">
                الحلقة 2: أحد التجربة
              </span>
            </div>

            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-tajawal font-extrabold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
                <span>+150 XP مكافأة الإكمال</span>
              </span>

              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-tajawal font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30">
                <Clock className="w-3.5 h-3.5 text-amber-400" />
                <span>4 دقائق متبقية</span>
              </span>
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between items-center text-xs font-tajawal text-amber-200">
              <span className="font-bold">التقدم في مشاهدة الحلقة: 65% (8:15 / 12:30 دقيقة)</span>
              <span className="font-extrabold text-amber-400">65%</span>
            </div>
            <div className="w-full bg-zinc-800/90 h-3 rounded-full overflow-hidden p-0.5 border border-white/10">
              <div
                className="bg-gradient-to-r from-amber-500 via-amber-400 to-amber-300 h-full rounded-full shadow-[0_0_12px_rgba(251,191,36,0.6)]"
                style={{ width: '65%' }}
              />
            </div>
          </div>

          <div className="flex justify-end pt-1">
            <button
              type="button"
              onClick={() => onNavigate('episode')}
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full font-cairo font-bold text-xs md:text-sm text-amber-950 bg-gradient-to-r from-amber-300 via-amber-400 to-amber-500 hover:from-amber-200 hover:to-amber-400 transition-all duration-200 shadow-[0_0_15px_rgba(251,191,36,0.4)] active:scale-95 cursor-pointer"
            >
              <Play className="w-4 h-4 fill-amber-950 text-amber-950" />
              <span>متابعة من حيث توقفت • Continue Episode</span>
            </button>
          </div>
        </div>

        {/* Visual Journey Tracker Timeline (Current Season, Completed, Remaining, Overall Progress) */}
        <JourneyTimelineTracker onNavigate={onNavigate} />

        {/* Compact Rewards Summary Overview */}
        <RewardsSummaryCard />

        {/* 2. Primary Metrics Row: Level, XP, Coins, Current Streak, Weekly Goal */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          
          {/* Current Level Card */}
          <div className="p-4 md:p-5 rounded-2xl bg-zinc-900/80 border border-indigo-500/30 space-y-3 flex flex-col justify-between">
            <div className="flex items-center justify-between">
              <span className="text-xs font-tajawal text-indigo-300/80 font-bold">المستوى الحالي</span>
              <div className="w-8 h-8 rounded-full bg-indigo-500/20 border border-indigo-500/30 flex items-center justify-center">
                <Award className="w-4 h-4 text-indigo-400" />
              </div>
            </div>
            <div>
              <div className="text-2xl font-cairo font-black text-indigo-100">Level {userJourneyData.level}</div>
              <p className="text-xs font-tajawal text-indigo-300 font-semibold mt-0.5">{userJourneyData.levelTitle}</p>
            </div>
            <div className="space-y-1">
              <div className="flex justify-between text-[11px] font-tajawal text-zinc-400">
                <span>التقدم للمستوى 4</span>
                <span className="font-bold text-indigo-300">75%</span>
              </div>
              <div className="w-full bg-zinc-800 h-2 rounded-full overflow-hidden border border-white/10">
                <div className="bg-gradient-to-r from-indigo-500 to-indigo-300 h-full rounded-full" style={{ width: '75%' }} />
              </div>
            </div>
          </div>

          {/* XP Card */}
          <div className="p-4 md:p-5 rounded-2xl bg-zinc-900/80 border border-emerald-500/30 space-y-3 flex flex-col justify-between">
            <div className="flex items-center justify-between">
              <span className="text-xs font-tajawal text-emerald-300/80 font-bold">نقاط الخبرة XP</span>
              <div className="w-8 h-8 rounded-full bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center">
                <Sparkles className="w-4 h-4 text-emerald-400" />
              </div>
            </div>
            <div>
              <div className="text-2xl font-cairo font-black text-emerald-100">{userJourneyData.currentXP} XP</div>
              <p className="text-xs font-tajawal text-emerald-400/80 font-semibold mt-0.5">المركز #4 في لائحة المتصدرين</p>
            </div>
            <button
              type="button"
              onClick={() => onNavigate('achievements')}
              className="text-xs font-tajawal font-bold text-emerald-300 hover:text-emerald-200 flex items-center gap-1 cursor-pointer pt-1"
            >
              <span>سجل النقاط الإنجازات</span>
              <ChevronRight className="w-3.5 h-3.5 rotate-180" />
            </button>
          </div>

          {/* Coins Card */}
          <div className="p-4 md:p-5 rounded-2xl bg-zinc-900/80 border border-amber-500/30 space-y-3 flex flex-col justify-between">
            <div className="flex items-center justify-between">
              <span className="text-xs font-tajawal text-amber-300/80 font-bold">العملات الذهبية</span>
              <div className="w-8 h-8 rounded-full bg-amber-500/20 border border-amber-500/30 flex items-center justify-center">
                <Coins className="w-4 h-4 text-amber-400" />
              </div>
            </div>
            <div>
              <div className="text-2xl font-cairo font-black text-amber-100">{userJourneyData.coins} 🪙</div>
              <p className="text-xs font-tajawal text-amber-400/80 font-semibold mt-0.5">جاهزة للاستبدال بالهدايا</p>
            </div>
            <button
              type="button"
              onClick={() => onNavigate('store')}
              className="text-xs font-tajawal font-bold text-amber-300 hover:text-amber-200 flex items-center gap-1 cursor-pointer pt-1"
            >
              <ShoppingBag className="w-3.5 h-3.5 text-amber-400" />
              <span>زيارة المتجر</span>
            </button>
          </div>

          {/* Current Streak Card */}
          <div className="p-4 md:p-5 rounded-2xl bg-zinc-900/80 border border-orange-500/30 space-y-3 flex flex-col justify-between">
            <div className="flex items-center justify-between">
              <span className="text-xs font-tajawal text-orange-300/80 font-bold">السلسلة الحالية</span>
              <div className="w-8 h-8 rounded-full bg-orange-500/20 border border-orange-500/30 flex items-center justify-center">
                <Flame className="w-4 h-4 text-orange-400" />
              </div>
            </div>
            <div>
              <div className="text-2xl font-cairo font-black text-orange-100">{userJourneyData.currentStreak} أيام 🔥</div>
              <p className="text-xs font-tajawal text-orange-300/80 font-semibold mt-0.5">مواظبة يومية مستمرة</p>
            </div>
            <div className="text-[11px] font-tajawal text-zinc-400 bg-orange-500/10 px-2 py-1 rounded-lg border border-orange-500/20 text-center">
              حماية السلسلة مفعلة 🛡️
            </div>
          </div>

          {/* Weekly Goal Card */}
          <div className="p-4 md:p-5 rounded-2xl bg-zinc-900/80 border border-teal-500/30 space-y-3 flex flex-col justify-between">
            <div className="flex items-center justify-between">
              <span className="text-xs font-tajawal text-teal-300/80 font-bold">الهدف الأسبوعي</span>
              <div className="w-8 h-8 rounded-full bg-teal-500/20 border border-teal-500/30 flex items-center justify-center">
                <Calendar className="w-4 h-4 text-teal-400" />
              </div>
            </div>
            <div>
              <div className="text-2xl font-cairo font-black text-teal-100">
                {userJourneyData.weeklyGoalDays} / {userJourneyData.weeklyGoalTarget} أيام
              </div>
              <p className="text-xs font-tajawal text-teal-300/80 font-semibold mt-0.5">80% من الهدف الأسبوعي</p>
            </div>
            {/* Days Tracker */}
            <div className="flex items-center justify-between gap-1 pt-1">
              {weekDays.map((d, i) => (
                <div
                  key={i}
                  className={`w-5 h-5 rounded-full text-[9px] font-bold flex items-center justify-center ${
                    d.active
                      ? 'bg-teal-400 text-teal-950 shadow-[0_0_8px_rgba(45,212,191,0.5)]'
                      : 'bg-zinc-800 text-zinc-500 border border-white/5'
                  }`}
                  title={d.name}
                >
                  {d.short[0]}
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* 3. Progress Dashboard Section */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="font-cairo font-black text-base md:text-lg text-amber-100 flex items-center gap-2">
              <Trophy className="w-4 h-4 text-amber-400" />
              <span>لوحة التقدم والإنجاز الشاملة • Progress Dashboard</span>
            </h3>
          </div>
          <CompactProgressDashboard />
        </div>

        {/* 4. Recently Watched Episodes Section */}
        <div className="space-y-4 pt-2">
          <div className="flex items-center justify-between">
            <h3 className="font-cairo font-black text-base md:text-lg text-amber-100 flex items-center gap-2">
              <Tv className="w-4 h-4 text-amber-400" />
              <span>الحلقات المشاهدة مؤخراً • Recently Watched Episodes</span>
            </h3>
            <button
              type="button"
              onClick={() => onNavigate('episode')}
              className="text-xs font-tajawal font-bold text-amber-400 hover:text-amber-300 flex items-center gap-1 cursor-pointer"
            >
              <span>عرض جميع الحلقات</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {recentEpisodes.map((ep) => (
              <div
                key={ep.id}
                className="p-4 rounded-2xl bg-zinc-900/90 border border-amber-500/20 hover:border-amber-400/40 transition-all flex flex-col justify-between space-y-3 shadow-md"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-amber-500/20 to-amber-300/10 border border-amber-500/30 flex items-center justify-center text-amber-300 font-cairo font-black text-base">
                      {ep.id}
                    </div>
                    <div>
                      <h4 className="font-cairo font-black text-sm md:text-base text-amber-100 leading-tight">
                        الحلقة {ep.id}: {ep.title}
                      </h4>
                      <span className="text-xs font-tajawal text-zinc-400 block mt-0.5">
                        {ep.englishTitle} • {ep.timeAgo}
                      </span>
                    </div>
                  </div>

                  <span
                    className={`px-2.5 py-0.5 rounded-full text-[11px] font-tajawal font-bold border ${
                      ep.status === 'completed'
                        ? 'bg-emerald-500/15 text-emerald-300 border-emerald-500/30'
                        : 'bg-amber-500/15 text-amber-300 border-amber-500/30'
                    }`}
                  >
                    {ep.status === 'completed' ? 'مكتمل ✓' : 'جاري المشاهدة'}
                  </span>
                </div>

                <div className="space-y-1.5">
                  <div className="flex justify-between text-[11px] font-tajawal text-amber-200/80">
                    <span>{ep.timestamp}</span>
                    <span className="font-bold">{ep.progress}%</span>
                  </div>
                  <div className="w-full bg-zinc-800 h-2 rounded-full overflow-hidden border border-white/10">
                    <div
                      className={`h-full rounded-full ${
                        ep.status === 'completed' ? 'bg-emerald-400' : 'bg-gradient-to-r from-amber-500 to-amber-300'
                      }`}
                      style={{ width: `${ep.progress}%` }}
                    />
                  </div>
                </div>

                <div className="flex items-center justify-between pt-1">
                  <span className="text-[11px] font-tajawal text-zinc-400 flex items-center gap-1">
                    <Sparkles className="w-3 h-3 text-amber-400" />
                    <span>{ep.reward}</span>
                  </span>

                  <button
                    type="button"
                    onClick={() => onNavigate('episode')}
                    className="px-4 py-1.5 rounded-full text-xs font-cairo font-bold text-amber-950 bg-amber-400 hover:bg-amber-300 transition-all cursor-pointer flex items-center gap-1.5"
                  >
                    <Play className="w-3.5 h-3.5 fill-amber-950 text-amber-950" />
                    <span>{ep.status === 'completed' ? 'إعادة المشاهدة' : 'متابعة'}</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

      <GlobalFooter />
    </motion.div>
  );
};
