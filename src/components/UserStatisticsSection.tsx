import React, { useState } from 'react';
import { motion } from 'motion/react';
import {
  Tv,
  CheckSquare,
  HelpCircle,
  Grid,
  Brain,
  Coins,
  Award,
  Heart,
  Clock,
  TrendingUp,
  BarChart3,
  Sparkles,
  Zap,
  Target,
  Flame,
  CheckCircle2,
  Calendar,
} from 'lucide-react';

export interface UserStatisticsData {
  episodesWatched: number;
  totalEpisodes: number;
  activitiesCompleted: number;
  totalActivities: number;
  quizzesCompleted: number;
  totalQuizzes: number;
  crosswordCompleted: number;
  totalCrosswords: number;
  memoryChallengesCompleted: number;
  totalMemoryChallenges: number;
  coinsEarned: number;
  xpEarned: number;
  favoriteSundayAr: string;
  favoriteSundayEn: string;
  favoriteSundayIcon?: string;
  learningTimeHours: number;
  learningTimeMinutes: number;
  accuracyRate: number;
}

const DEFAULT_STATS: UserStatisticsData = {
  episodesWatched: 12,
  totalEpisodes: 14,
  activitiesCompleted: 18,
  totalActivities: 24,
  quizzesCompleted: 14,
  totalQuizzes: 16,
  crosswordCompleted: 8,
  totalCrosswords: 10,
  memoryChallengesCompleted: 10,
  totalMemoryChallenges: 12,
  coinsEarned: 1250,
  xpEarned: 2840,
  favoriteSundayAr: 'أحد الكنز (Treasure Sunday)',
  favoriteSundayEn: '1st Sunday of Great Lent',
  favoriteSundayIcon: '👑',
  learningTimeHours: 14,
  learningTimeMinutes: 35,
  accuracyRate: 94,
};

interface UserStatisticsSectionProps {
  stats?: Partial<UserStatisticsData>;
  compact?: boolean;
}

export const UserStatisticsSection: React.FC<UserStatisticsSectionProps> = ({
  stats = DEFAULT_STATS,
  compact = false,
}) => {
  const mergedStats = { ...DEFAULT_STATS, ...stats };
  const [activeTab, setActiveTab] = useState<'all' | 'learning' | 'games'>('all');

  const mainMetrics = [
    {
      id: 'episodes',
      titleAr: 'الحلقات المشاهدة',
      titleEn: 'Episodes Watched',
      value: `${mergedStats.episodesWatched} / ${mergedStats.totalEpisodes}`,
      subtextAr: `نسبة المشاهدة ${Math.round((mergedStats.episodesWatched / mergedStats.totalEpisodes) * 100)}%`,
      icon: Tv,
      color: 'from-amber-500/20 to-amber-600/10 border-amber-500/30 text-amber-300 text-amber-400',
      badgeBg: 'bg-amber-500/20 text-amber-300 border-amber-500/30',
      progress: (mergedStats.episodesWatched / mergedStats.totalEpisodes) * 100,
      category: 'learning',
    },
    {
      id: 'activities',
      titleAr: 'الأنشطة المكتملة',
      titleEn: 'Activities Completed',
      value: `${mergedStats.activitiesCompleted} / ${mergedStats.totalActivities}`,
      subtextAr: `إنجاز ${Math.round((mergedStats.activitiesCompleted / mergedStats.totalActivities) * 100)}% من التمارين`,
      icon: CheckSquare,
      color: 'from-purple-500/20 to-purple-600/10 border-purple-500/30 text-purple-300 text-purple-400',
      badgeBg: 'bg-purple-500/20 text-purple-300 border-purple-500/30',
      progress: (mergedStats.activitiesCompleted / mergedStats.totalActivities) * 100,
      category: 'learning',
    },
    {
      id: 'quizzes',
      titleAr: 'الاختبارات والمسابقات',
      titleEn: 'Quizzes Completed',
      value: `${mergedStats.quizzesCompleted} / ${mergedStats.totalQuizzes}`,
      subtextAr: `نسبة الإجابات الصحيحة ${mergedStats.accuracyRate}%`,
      icon: HelpCircle,
      color: 'from-sky-500/20 to-sky-600/10 border-sky-500/30 text-sky-300 text-sky-400',
      badgeBg: 'bg-sky-500/20 text-sky-300 border-sky-500/30',
      progress: (mergedStats.quizzesCompleted / mergedStats.totalQuizzes) * 100,
      category: 'learning',
    },
    {
      id: 'crosswords',
      titleAr: 'الكلمات المتقاطعة',
      titleEn: 'Crossword Completed',
      value: `${mergedStats.crosswordCompleted} / ${mergedStats.totalCrosswords}`,
      subtextAr: 'شبكات الألغاز القبطية المحلولة',
      icon: Grid,
      color: 'from-emerald-500/20 to-emerald-600/10 border-emerald-500/30 text-emerald-300 text-emerald-400',
      badgeBg: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30',
      progress: (mergedStats.crosswordCompleted / mergedStats.totalCrosswords) * 100,
      category: 'games',
    },
    {
      id: 'memory',
      titleAr: 'تحديات الذاكرة والشواهد',
      titleEn: 'Memory Challenges Completed',
      value: `${mergedStats.memoryChallengesCompleted} / ${mergedStats.totalMemoryChallenges}`,
      subtextAr: 'ربط الآيات بالشواهد بنجاح',
      icon: Brain,
      color: 'from-rose-500/20 to-rose-600/10 border-rose-500/30 text-rose-300 text-rose-400',
      badgeBg: 'bg-rose-500/20 text-rose-300 border-rose-500/30',
      progress: (mergedStats.memoryChallengesCompleted / mergedStats.totalMemoryChallenges) * 100,
      category: 'games',
    },
  ];

  const filteredMetrics =
    activeTab === 'all'
      ? mainMetrics
      : mainMetrics.filter((m) => m.category === activeTab);

  return (
    <div className="space-y-6 dir-rtl select-none">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pb-3 border-b border-amber-500/20">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-amber-500/15 border border-amber-500/30 flex items-center justify-center text-amber-400 shadow-md">
            <BarChart3 className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-cairo font-black text-lg md:text-xl text-amber-100 flex items-center gap-2">
              إحصائيات الإنجاز والتعلم • User Statistics
            </h3>
            <p className="text-xs font-tajawal text-zinc-400">
              سجل شامـل للإنجازات، الأنشطة المكتملة، ووقت التعلم التراكمي
            </p>
          </div>
        </div>

        {/* Filter Tabs */}
        {!compact && (
          <div className="flex items-center p-1 rounded-2xl bg-zinc-950 border border-white/10 self-end sm:self-auto text-xs font-cairo font-bold">
            <button
              type="button"
              onClick={() => setActiveTab('all')}
              className={`px-3 py-1.5 rounded-xl transition-all cursor-pointer ${
                activeTab === 'all'
                  ? 'bg-amber-500 text-amber-950 shadow-md font-black'
                  : 'text-zinc-400 hover:text-amber-200'
              }`}
            >
              الكل • All
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('learning')}
              className={`px-3 py-1.5 rounded-xl transition-all cursor-pointer ${
                activeTab === 'learning'
                  ? 'bg-amber-500 text-amber-950 shadow-md font-black'
                  : 'text-zinc-400 hover:text-amber-200'
              }`}
            >
              المسار والدراسة
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('games')}
              className={`px-3 py-1.5 rounded-xl transition-all cursor-pointer ${
                activeTab === 'games'
                  ? 'bg-amber-500 text-amber-950 shadow-md font-black'
                  : 'text-zinc-400 hover:text-amber-200'
              }`}
            >
              الألعاب والمسابقات
            </button>
          </div>
        )}
      </div>

      {/* Hero Highlight Cards Row (Learning Time, Favorite Sunday, XP, Coins) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* 1. Learning Time */}
        <motion.div
          whileHover={{ y: -3 }}
          className="p-5 rounded-3xl bg-gradient-to-br from-amber-500/15 via-zinc-900 to-zinc-950 border border-amber-500/30 shadow-lg relative overflow-hidden space-y-2"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-tajawal font-bold text-amber-300/80">وقت التعلم الإجمالي</span>
            <div className="w-8 h-8 rounded-xl bg-amber-500/20 border border-amber-500/30 flex items-center justify-center text-amber-400">
              <Clock className="w-4 h-4" />
            </div>
          </div>
          <div className="font-cairo font-black text-2xl text-amber-100 tracking-tight">
            {mergedStats.learningTimeHours}س {mergedStats.learningTimeMinutes}د
          </div>
          <div className="text-[11px] font-tajawal text-zinc-400 flex items-center gap-1">
            <TrendingUp className="w-3.5 h-3.5 text-emerald-400" />
            <span>Learning Time • دراسة تفاعلية</span>
          </div>
        </motion.div>

        {/* 2. Favorite Sunday */}
        <motion.div
          whileHover={{ y: -3 }}
          className="p-5 rounded-3xl bg-gradient-to-br from-rose-500/15 via-zinc-900 to-zinc-950 border border-rose-500/30 shadow-lg relative overflow-hidden space-y-2"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-tajawal font-bold text-rose-300/80">الأحد المفضل لديك</span>
            <div className="w-8 h-8 rounded-xl bg-rose-500/20 border border-rose-500/30 flex items-center justify-center text-rose-400">
              <Heart className="w-4 h-4 fill-rose-500/30" />
            </div>
          </div>
          <div className="font-cairo font-black text-sm sm:text-base text-rose-100 truncate">
            {mergedStats.favoriteSundayIcon} {mergedStats.favoriteSundayAr}
          </div>
          <div className="text-[11px] font-tajawal text-zinc-400 truncate">
            {mergedStats.favoriteSundayEn}
          </div>
        </motion.div>

        {/* 3. XP Earned */}
        <motion.div
          whileHover={{ y: -3 }}
          className="p-5 rounded-3xl bg-gradient-to-br from-emerald-500/15 via-zinc-900 to-zinc-950 border border-emerald-500/30 shadow-lg relative overflow-hidden space-y-2"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-tajawal font-bold text-emerald-300/80">إجمالي نقاط XP</span>
            <div className="w-8 h-8 rounded-xl bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
              <Award className="w-4 h-4" />
            </div>
          </div>
          <div className="font-cairo font-black text-2xl text-emerald-300 tracking-tight">
            {mergedStats.xpEarned.toLocaleString()} XP
          </div>
          <div className="text-[11px] font-tajawal text-zinc-400 flex items-center gap-1">
            <Zap className="w-3.5 h-3.5 text-emerald-400" />
            <span>XP Earned • تقدم روحي</span>
          </div>
        </motion.div>

        {/* 4. Coins Earned */}
        <motion.div
          whileHover={{ y: -3 }}
          className="p-5 rounded-3xl bg-gradient-to-br from-amber-400/15 via-zinc-900 to-zinc-950 border border-amber-400/30 shadow-lg relative overflow-hidden space-y-2"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-tajawal font-bold text-amber-300/80">العملات المكتسبة</span>
            <div className="w-8 h-8 rounded-xl bg-amber-400/20 border border-amber-400/30 flex items-center justify-center text-amber-400">
              <Coins className="w-4 h-4" />
            </div>
          </div>
          <div className="font-cairo font-black text-2xl text-amber-300 tracking-tight flex items-center gap-1.5">
            <span>{mergedStats.coinsEarned.toLocaleString()}</span>
            <span className="text-lg">🪙</span>
          </div>
          <div className="text-[11px] font-tajawal text-zinc-400 flex items-center gap-1">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>Coins Earned • مكافآت المتجر</span>
          </div>
        </motion.div>
      </div>

      {/* Detailed Cards Grid (Episodes, Activities, Quizzes, Crossword, Memory) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredMetrics.map((item) => {
          const ItemIcon = item.icon;
          return (
            <motion.div
              key={item.id}
              whileHover={{ scale: 1.01 }}
              className={`p-5 rounded-3xl bg-gradient-to-br ${item.color} bg-zinc-950 border shadow-md space-y-4 relative overflow-hidden`}
            >
              <div className="flex items-start justify-between">
                <div className="space-y-1">
                  <h4 className="font-cairo font-black text-sm text-amber-100">
                    {item.titleAr}
                  </h4>
                  <span className="text-[11px] font-tajawal text-zinc-400 block">
                    {item.titleEn}
                  </span>
                </div>

                <div className={`w-10 h-10 rounded-2xl flex items-center justify-center border ${item.badgeBg}`}>
                  <ItemIcon className="w-5 h-5" />
                </div>
              </div>

              {/* Big Stat Number */}
              <div className="flex items-baseline justify-between">
                <span className="font-cairo font-black text-2xl text-white tracking-tight">
                  {item.value}
                </span>
                <span className="text-xs font-cairo font-bold text-amber-300">
                  {Math.round(item.progress)}%
                </span>
              </div>

              {/* Progress Bar */}
              <div className="space-y-1">
                <div className="w-full bg-zinc-800/80 h-2 rounded-full overflow-hidden p-0.5 border border-white/5">
                  <motion.div
                    className="h-full bg-gradient-to-r from-amber-400 to-amber-300 rounded-full shadow-[0_0_8px_rgba(251,191,36,0.6)]"
                    initial={{ width: 0 }}
                    animate={{ width: `${item.progress}%` }}
                    transition={{ duration: 0.8, ease: 'easeOut' }}
                  />
                </div>
                <p className="text-[11px] font-tajawal text-zinc-400 pt-0.5">
                  {item.subtextAr}
                </p>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};
