import React from 'react';
import { motion } from 'motion/react';
import {
  BookOpen,
  CheckSquare,
  Sparkles,
  Coins,
  Award,
  Flame,
  Calendar,
  PieChart,
  Trophy,
  Target,
  X,
} from 'lucide-react';

interface CompactProgressDashboardProps {
  onClose?: () => void;
  isCollapsible?: boolean;
}

interface MetricRingProps {
  percentage: number;
  strokeColor: string;
  glowColor: string;
  icon: React.FC<{ className?: string }>;
  iconColor: string;
  title: string;
  value: string;
  subtext: string;
}

const CircularMetricRing: React.FC<MetricRingProps> = ({
  percentage,
  strokeColor,
  glowColor,
  icon: Icon,
  iconColor,
  title,
  value,
  subtext,
}) => {
  const radius = 30;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (Math.min(100, Math.max(0, percentage)) / 100) * circumference;

  return (
    <div className="p-3.5 rounded-2xl bg-black/50 border border-white/10 hover:border-amber-500/30 transition-all flex flex-col items-center text-center space-y-2 group">
      {/* Circular Progress Indicator */}
      <div className="relative w-20 h-20 flex items-center justify-center">
        <svg className="w-full h-full transform -rotate-90" viewBox="0 0 80 80">
          {/* Track */}
          <circle
            cx="40"
            cy="40"
            r={radius}
            className="stroke-zinc-800"
            strokeWidth="5.5"
            fill="transparent"
          />
          {/* Gradient Ring */}
          <motion.circle
            cx="40"
            cy="40"
            r={radius}
            stroke={strokeColor}
            strokeWidth="5.5"
            strokeDasharray={circumference}
            initial={{ strokeDashoffset: circumference }}
            animate={{ strokeDashoffset }}
            transition={{ duration: 1, ease: 'easeOut' }}
            strokeLinecap="round"
            fill="transparent"
            style={{ filter: `drop-shadow(0 0 6px ${glowColor})` }}
          />
        </svg>

        {/* Inner Content: Icon & Number */}
        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
          <Icon className={`w-4 h-4 mb-0.5 ${iconColor}`} />
          <span className="font-cairo font-black text-xs text-amber-100 group-hover:scale-105 transition-transform">
            {value}
          </span>
        </div>
      </div>

      {/* Label & Subtext */}
      <div>
        <h4 className="font-cairo font-bold text-xs text-amber-100 leading-tight">
          {title}
        </h4>
        <span className="font-tajawal text-[10px] text-zinc-400 block mt-0.5">
          {subtext}
        </span>
      </div>
    </div>
  );
};

export const CompactProgressDashboard: React.FC<CompactProgressDashboardProps> = ({
  onClose,
  isCollapsible = false,
}) => {
  // Placeholder Data for Feature 7
  const progressMetrics = [
    {
      id: 'episodes',
      title: 'الحلقات المكتملة',
      value: '2 / 7',
      subtext: '28% إنجاز الحلقات',
      percentage: 28,
      icon: BookOpen,
      iconColor: 'text-sky-400',
      strokeColor: '#38bdf8', // sky-400
      glowColor: 'rgba(56, 189, 248, 0.4)',
    },
    {
      id: 'activities',
      title: 'الأنشطة المكتملة',
      value: '6 / 16',
      subtext: '38% إنجاز الأنشطة',
      percentage: 38,
      icon: CheckSquare,
      iconColor: 'text-purple-400',
      strokeColor: '#c084fc', // purple-400
      glowColor: 'rgba(192, 132, 252, 0.4)',
    },
    {
      id: 'xp',
      title: 'نقاط الخبرة XP',
      value: '450 XP',
      subtext: '75% للمستوى التالي',
      percentage: 75,
      icon: Sparkles,
      iconColor: 'text-emerald-400',
      strokeColor: '#34d399', // emerald-400
      glowColor: 'rgba(52, 211, 153, 0.4)',
    },
    {
      id: 'coins',
      title: 'العملات الذهبية',
      value: '120 🪙',
      subtext: '60% هدف الجمع',
      percentage: 60,
      icon: Coins,
      iconColor: 'text-amber-400',
      strokeColor: '#fbbf24', // amber-400
      glowColor: 'rgba(251, 191, 36, 0.4)',
    },
    {
      id: 'level',
      title: 'المستوى الحالي',
      value: 'Level 3',
      subtext: 'خادم دراسات الصوم',
      percentage: 60,
      icon: Award,
      iconColor: 'text-indigo-400',
      strokeColor: '#818cf8', // indigo-400
      glowColor: 'rgba(129, 140, 248, 0.4)',
    },
    {
      id: 'streak',
      title: 'السلسلة الحالية',
      value: '5 أيام',
      subtext: '🔥 5/7 أيام متتالية',
      percentage: 71,
      icon: Flame,
      iconColor: 'text-orange-400',
      strokeColor: '#fb923c', // orange-400
      glowColor: 'rgba(251, 146, 60, 0.4)',
    },
    {
      id: 'weekly',
      title: 'الهدف الأسبوعي',
      value: '4 / 5 أيام',
      subtext: '80% مكتمل هذا الأسبوع',
      percentage: 80,
      icon: Calendar,
      iconColor: 'text-teal-400',
      strokeColor: '#2dd4bf', // teal-400
      glowColor: 'rgba(45, 212, 191, 0.4)',
    },
    {
      id: 'season',
      title: 'تقدم الموسم',
      value: '35%',
      subtext: '35% من موسم الصوم الكبير',
      percentage: 35,
      icon: PieChart,
      iconColor: 'text-rose-400',
      strokeColor: '#fb7185', // rose-400
      glowColor: 'rgba(251, 113, 133, 0.4)',
    },
  ];

  return (
    <motion.div
      className="w-full bg-black/70 backdrop-blur-2xl border border-amber-500/30 rounded-3xl p-5 md:p-6 shadow-[0_15px_50px_rgba(0,0,0,0.7)] text-white dir-rtl select-none space-y-4"
      initial={{ opacity: 0, scale: 0.96, y: 15 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.96, y: 15 }}
      transition={{ duration: 0.3 }}
    >
      {/* Dashboard Header */}
      <div className="flex items-center justify-between pb-3 border-b border-white/10">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30 flex items-center justify-center">
            <Trophy className="w-4 h-4 text-amber-400" />
          </div>
          <div>
            <h3 className="font-cairo font-black text-base md:text-lg text-amber-100 leading-tight">
              لوحة الإنجاز والتقدم المصغرة • Progress Dashboard
            </h3>
            <span className="font-tajawal text-xs text-amber-300/70 block">
              متابعة دقيقة لكافة المؤشرات والأهداف الإيمانية والتعليمية
            </span>
          </div>
        </div>

        {onClose && (
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-full bg-white/10 hover:bg-white/20 text-zinc-300 transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Grid of Circular Progress Indicators */}
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3">
        {progressMetrics.map((m) => (
          <CircularMetricRing
            key={m.id}
            percentage={m.percentage}
            strokeColor={m.strokeColor}
            glowColor={m.glowColor}
            icon={m.icon}
            iconColor={m.iconColor}
            title={m.title}
            value={m.value}
            subtext={m.subtext}
          />
        ))}
      </div>
    </motion.div>
  );
};
