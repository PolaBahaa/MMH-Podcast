import React from 'react';
import { motion } from 'motion/react';
import {
  Sparkles,
  Coins,
  Target,
  Tv,
  Award,
  Gift,
  TrendingUp,
} from 'lucide-react';
import { USER_ECONOMY_DATA } from '../data/economyData';

interface RewardsSummaryCardProps {
  compact?: boolean;
}

export const RewardsSummaryCard: React.FC<RewardsSummaryCardProps> = ({
  compact = false,
}) => {
  const {
    totalXPEarned,
    totalCoinsEarned,
    activitiesCompleted,
    episodesCompleted,
    totalSundays,
    achievementsEarned,
    totalAchievementsCount,
  } = USER_ECONOMY_DATA;

  // Stat Cards Configuration
  const statCards = [
    {
      id: 'stat-xp',
      labelAr: 'إجمالي نقاط الخبرة',
      labelEn: 'Total XP Earned',
      value: `${totalXPEarned.toLocaleString()} XP`,
      subtitle: 'من المشاهدات والأنشطة والألغاز',
      icon: Sparkles,
      colorTheme: 'emerald',
      bgGlow: 'from-emerald-500/10 via-zinc-900 to-zinc-950',
      borderColor: 'border-emerald-500/30',
      textColor: 'text-emerald-300',
      iconBg: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30',
      badge: '+150 هذا الأسبوع',
    },
    {
      id: 'stat-coins',
      labelAr: 'إجمالي العملات الذهبية',
      labelEn: 'Total Coins Earned',
      value: `${totalCoinsEarned.toLocaleString()} عملة`,
      subtitle: 'رصيد مكتسب للاستبدال بالمتجر',
      icon: Coins,
      colorTheme: 'amber',
      bgGlow: 'from-amber-500/10 via-zinc-900 to-zinc-950',
      borderColor: 'border-amber-500/30',
      textColor: 'text-amber-300',
      iconBg: 'bg-amber-500/20 text-amber-300 border-amber-500/30',
      badge: 'جاهزة للاستبدال 🎁',
    },
    {
      id: 'stat-activities',
      labelAr: 'الأنشطة المكتملة',
      labelEn: 'Activities Completed',
      value: `${activitiesCompleted} نشاطاً`,
      subtitle: 'تفاعلات واختبارات وألغاز بصرية',
      icon: Target,
      colorTheme: 'sky',
      bgGlow: 'from-sky-500/10 via-zinc-900 to-zinc-950',
      borderColor: 'border-sky-500/30',
      textColor: 'text-sky-300',
      iconBg: 'bg-sky-500/20 text-sky-300 border-sky-500/30',
      badge: 'إنجاز ممتاز ⚡',
    },
    {
      id: 'stat-episodes',
      labelAr: 'الحلقات المكتملة',
      labelEn: 'Episodes Completed',
      value: `${episodesCompleted} من ${totalSundays}`,
      subtitle: 'من آحاد الصوم الكبير السبعة',
      icon: Tv,
      colorTheme: 'purple',
      bgGlow: 'from-purple-500/10 via-zinc-900 to-zinc-950',
      borderColor: 'border-purple-500/30',
      textColor: 'text-purple-300',
      iconBg: 'bg-purple-500/20 text-purple-300 border-purple-500/30',
      badge: 'الأحد الحالي جاري 🎬',
    },
    {
      id: 'stat-achievements',
      labelAr: 'الإنجازات المحققة',
      labelEn: 'Achievements Earned',
      value: `${achievementsEarned} من ${totalAchievementsCount}`,
      subtitle: 'شارات ووسامات روحية مكتسبة',
      icon: Award,
      colorTheme: 'orange',
      bgGlow: 'from-orange-500/10 via-zinc-900 to-zinc-950',
      borderColor: 'border-orange-500/30',
      textColor: 'text-orange-300',
      iconBg: 'bg-orange-500/20 text-orange-300 border-orange-500/30',
      badge: '50% مكتمل 🏆',
    },
  ];

  return (
    <div className="relative overflow-hidden rounded-2xl md:rounded-3xl bg-gradient-to-br from-zinc-950 via-zinc-900 to-amber-950/20 border border-amber-500/25 p-4 md:p-6 shadow-[0_8px_32px_rgba(0,0,0,0.5)] text-right dir-rtl select-none space-y-5">
      {/* Background Decorative Glows */}
      <div className="absolute top-0 right-1/4 w-56 h-56 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-56 h-56 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none" />

      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-amber-500/15 pb-4">
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-amber-500 via-amber-400 to-amber-300 text-amber-950 flex items-center justify-center font-cairo font-black text-lg shadow-[0_0_15px_rgba(251,191,36,0.35)]">
            <Gift className="w-5 h-5 text-amber-950" />
          </div>

          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-tajawal text-amber-400/80 font-bold bg-amber-400/10 px-2.5 py-0.5 rounded-full border border-amber-400/20">
                ملخص المكافآت والإحصائيات • Rewards Overview
              </span>
            </div>

            <h3 className="font-cairo font-black text-xl md:text-2xl text-amber-100 flex items-center gap-2 mt-0.5">
              <span>سجل المكافآت والإنجازات</span>
            </h3>
          </div>
        </div>

        <div className="px-3.5 py-1.5 rounded-xl bg-zinc-900/90 border border-amber-500/30 text-amber-300 font-tajawal text-xs font-bold flex items-center gap-1.5 shadow-inner">
          <TrendingUp className="w-4 h-4 text-emerald-400" />
          <span>معدل تفاعل ممتاز</span>
        </div>
      </div>

      {/* Grid of 5 Premium Statistic Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3.5">
        {statCards.map((st, index) => {
          const IconComponent = st.icon;

          return (
            <motion.div
              key={st.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.08, duration: 0.4 }}
              className={`relative overflow-hidden rounded-2xl p-4 bg-gradient-to-br ${st.bgGlow} border ${st.borderColor} space-y-3 shadow-lg group hover:border-amber-400/50 transition-all duration-300`}
            >
              {/* Top Row: Icon & Badge */}
              <div className="flex items-center justify-between">
                <div className={`p-2.5 rounded-xl border ${st.iconBg}`}>
                  <IconComponent className="w-5 h-5" />
                </div>

                <span className="text-[10px] font-tajawal font-bold text-zinc-400 bg-white/5 px-2 py-0.5 rounded-full border border-white/10">
                  {st.badge}
                </span>
              </div>

              {/* Middle: Value & Label */}
              <div className="space-y-1">
                <span className="block text-xs font-tajawal text-zinc-400 font-medium">
                  {st.labelAr}
                </span>
                <span className={`block font-cairo font-black text-2xl ${st.textColor}`}>
                  {st.value}
                </span>
              </div>

              {/* Footer Subtitle */}
              <div className="border-t border-white/5 pt-2">
                <p className="text-[10px] font-tajawal text-zinc-400 truncate">
                  {st.subtitle}
                </p>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};
