import React, { useState } from 'react';
import { motion } from 'motion/react';
import { LevelProgressionCard } from './LevelProgressionCard';
import { GlobalFooter } from './GlobalFooter';
import {
  ArrowRight,
  Award,
  CheckCircle2,
  Lock,
  Sparkles,
  Video,
  BookOpen,
  HelpCircle,
  Puzzle,
  Grid,
  Flame,
  Compass,
  Users,
  Coins,
  Tv,
  GraduationCap,
  Target,
  Calendar,
  Filter,
} from 'lucide-react';

interface AchievementsViewProps {
  onClose: () => void;
}

export type AchievementCategory =
  | 'All'
  | 'Watching'
  | 'Learning'
  | 'Activities'
  | 'Consistency'
  | 'Bible Knowledge'
  | 'Community'
  | 'Collections';

export interface AchievementItem {
  id: string;
  category: AchievementCategory;
  categoryLabel: string;
  title: string;
  description: string;
  icon: React.FC<{ className?: string }>;
  currentProgress: number;
  maxProgress: number;
  xpReward: number;
  coinsReward: number;
  status: 'unlocked' | 'locked';
}

export const AchievementsView: React.FC<AchievementsViewProps> = ({ onClose }) => {
  const [selectedCategory, setSelectedCategory] = useState<AchievementCategory>('All');

  const categories: { key: AchievementCategory; label: string; icon: React.FC<{ className?: string }> }[] = [
    { key: 'All', label: 'الكل • All', icon: Filter },
    { key: 'Watching', label: 'المشاهدة • Watching', icon: Video },
    { key: 'Learning', label: 'التعلم • Learning', icon: BookOpen },
    { key: 'Activities', label: 'الأنشطة • Activities', icon: Target },
    { key: 'Consistency', label: 'المواظبة • Consistency', icon: Flame },
    { key: 'Bible Knowledge', label: 'المعرفة الكتابية • Bible Knowledge', icon: GraduationCap },
    { key: 'Community', label: 'المجتمع • Community', icon: Users },
    { key: 'Collections', label: 'المجموعات • Collections', icon: Grid },
  ];

  const achievementsList: AchievementItem[] = [
    // 1. Watching (المشاهدة)
    {
      id: 'ach-watch-1',
      category: 'Watching',
      categoryLabel: 'المشاهدة',
      title: 'مشاهِد شغوف • Seasoned Viewer',
      description: 'شاهد 3 حلقات كاملة من دراسات وتأملات آحاد الصوم المقدس.',
      icon: Video,
      currentProgress: 2,
      maxProgress: 3,
      xpReward: 150,
      coinsReward: 30,
      status: 'locked',
    },
    {
      id: 'ach-watch-2',
      category: 'Watching',
      categoryLabel: 'المشاهدة',
      title: 'راعي المسيرة • Master Viewer',
      description: 'شاهد جميع حلقات الصوم الكبير السبعة بالكامل دون تفويت أي مشهد.',
      icon: Tv,
      currentProgress: 7,
      maxProgress: 7,
      xpReward: 350,
      coinsReward: 80,
      status: 'unlocked',
    },

    // 2. Learning (التعلم)
    {
      id: 'ach-learn-1',
      category: 'Learning',
      categoryLabel: 'التعلم',
      title: 'باحث الحقيقة • Truth Seeker',
      description: 'اقرأ الشواهد الإنجيلية والملاحظات الشاملة لـ 3 حلقات متتالية.',
      icon: BookOpen,
      currentProgress: 3,
      maxProgress: 3,
      xpReward: 100,
      coinsReward: 25,
      status: 'unlocked',
    },
    {
      id: 'ach-learn-2',
      category: 'Learning',
      categoryLabel: 'التعلم',
      title: 'حافظ الآيات • Verse Scholar',
      description: 'تأمل واحفظ الآيات المفتاحية لجميع آحاد الصوم المقدس السبعة.',
      icon: GraduationCap,
      currentProgress: 4,
      maxProgress: 7,
      xpReward: 250,
      coinsReward: 50,
      status: 'locked',
    },

    // 3. Activities (الأنشطة)
    {
      id: 'ach-act-1',
      category: 'Activities',
      categoryLabel: 'الأنشطة',
      title: 'صانع المهارات • Activity Master',
      description: 'أتمم 5 أنشطة تفاعلية متتالية (تحديد، اختيار، ترتيب وألغاز بصرية).',
      icon: Target,
      currentProgress: 5,
      maxProgress: 5,
      xpReward: 200,
      coinsReward: 40,
      status: 'unlocked',
    },
    {
      id: 'ach-act-2',
      category: 'Activities',
      categoryLabel: 'الأنشطة',
      title: 'المفكر الإنجيلي • Practical Disciple',
      description: 'أنجز كافة الأنشطة والتطبيقات العملية الخاصة بالصوم الكبير.',
      icon: Sparkles,
      currentProgress: 6,
      maxProgress: 10,
      xpReward: 300,
      coinsReward: 75,
      status: 'locked',
    },

    // 4. Consistency (المواظبة)
    {
      id: 'ach-con-1',
      category: 'Consistency',
      categoryLabel: 'المواظبة',
      title: 'شعلة الالتزام • 5-Day Streak',
      description: 'حافظ على مواظبة واستكشاف يومي لمدة 5 أيام متتالية في الصوم.',
      icon: Flame,
      currentProgress: 5,
      maxProgress: 5,
      xpReward: 200,
      coinsReward: 50,
      status: 'unlocked',
    },
    {
      id: 'ach-con-2',
      category: 'Consistency',
      categoryLabel: 'المواظبة',
      title: 'المداوم الأسبوعي • Weekly Devotion',
      description: 'واظب على متابعة آحاد الصوم الكبير لمدة 7 أسابيع متتالية.',
      icon: Calendar,
      currentProgress: 5,
      maxProgress: 7,
      xpReward: 350,
      coinsReward: 80,
      status: 'locked',
    },

    // 5. Bible Knowledge (المعرفة الكتابية)
    {
      id: 'ach-bible-1',
      category: 'Bible Knowledge',
      categoryLabel: 'المعرفة الكتابية',
      title: 'علامة الأسفار • Biblical Scholar',
      description: 'أجب بصحة على 10 أسئلة كتابية متقدمة في اختبارات آحاد الصوم.',
      icon: Compass,
      currentProgress: 10,
      maxProgress: 10,
      xpReward: 220,
      coinsReward: 45,
      status: 'unlocked',
    },
    {
      id: 'ach-bible-2',
      category: 'Bible Knowledge',
      categoryLabel: 'المعرفة الكتابية',
      title: 'مفسر الشواهد • Scripture Interpreter',
      description: 'اربط بين النبوات وشواهد العهد القديم بأناجيل آحاد الصوم الكبير.',
      icon: HelpCircle,
      currentProgress: 3,
      maxProgress: 7,
      xpReward: 280,
      coinsReward: 60,
      status: 'locked',
    },

    // 6. Community (المجتمع)
    {
      id: 'ach-comm-1',
      category: 'Community',
      categoryLabel: 'المجتمع',
      title: 'مشجع الإخوة • Community Champion',
      description: 'استعرض لوحة الصدارة وتفاعل مع ترتيب المتصدرين في بودكاست مش مجرد حد.',
      icon: Users,
      currentProgress: 1,
      maxProgress: 1,
      xpReward: 80,
      coinsReward: 15,
      status: 'unlocked',
    },

    // 7. Collections (المجموعات)
    {
      id: 'ach-coll-1',
      category: 'Collections',
      categoryLabel: 'المجموعات',
      title: 'جامع البركات • Blessing Collector',
      description: 'استبدل عملاتك الذهبية باقتناء أول قطعة قبطية مباركة من متجر المكافآت.',
      icon: Grid,
      currentProgress: 1,
      maxProgress: 1,
      xpReward: 150,
      coinsReward: 30,
      status: 'unlocked',
    },
    {
      id: 'ach-coll-2',
      category: 'Collections',
      categoryLabel: 'المجموعات',
      title: 'مقتني الأيقونات • Sacred Art Patron',
      description: 'اجمع 4 أيقونات وكتب قبطية نادرة في مجموعتك الشخصية من المتجر.',
      icon: Award,
      currentProgress: 2,
      maxProgress: 4,
      xpReward: 300,
      coinsReward: 70,
      status: 'locked',
    },
  ];

  const filteredAchievements =
    selectedCategory === 'All'
      ? achievementsList
      : achievementsList.filter((item) => item.category === selectedCategory);

  const unlockedCount = achievementsList.filter((item) => item.status === 'unlocked').length;
  const totalCount = achievementsList.length;

  return (
    <motion.div
      className="fixed inset-0 z-50 overflow-y-auto bg-black/95 backdrop-blur-2xl text-white dir-rtl select-none"
      initial={{ opacity: 0, scale: 0.98, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.98, y: 20 }}
      transition={{ duration: 0.3 }}
    >
      {/* Sticky Header */}
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
          نظام الأوسمة والإنجازات • Achievements System
        </span>
      </div>

      <div className="max-w-5xl mx-auto px-4 py-8 md:py-10 space-y-8">
        {/* Title & Stats Summary */}
        <div className="text-center space-y-3">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs md:text-sm font-tajawal font-bold">
            <Award className="w-4 h-4 text-amber-400" />
            <span>تم فتح {unlockedCount} من أصل {totalCount} وسماً وإنجازاً</span>
          </div>
          <h1 className="text-3xl md:text-5xl font-cairo font-black text-amber-100 tracking-tight">
            نظام الأوسمة والإنجازات المباركة
          </h1>
          <p className="text-sm md:text-base font-tajawal text-amber-200/80 max-w-2xl mx-auto leading-relaxed">
            استعرض كافة إنجازاتك المقسمة بحسب فئات المشاهدة، التعلم، الألغاز، الاختبارات، والمواظبة اليومية.
          </p>
        </div>

        {/* Level Progression & Rank System Component */}
        <LevelProgressionCard />

        {/* Category Filter Pills (8 Categories + All) */}
        <div className="flex items-center gap-2 overflow-x-auto pb-3 pt-1 scrollbar-none border-b border-white/10">
          {categories.map((cat) => {
            const CatIcon = cat.icon;
            const isSelected = selectedCategory === cat.key;
            return (
              <button
                key={cat.key}
                type="button"
                onClick={() => setSelectedCategory(cat.key)}
                className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs font-tajawal font-bold transition-all whitespace-nowrap cursor-pointer ${
                  isSelected
                    ? 'bg-amber-400 text-amber-950 shadow-[0_0_15px_rgba(251,191,36,0.5)] scale-105'
                    : 'bg-zinc-900/80 text-zinc-300 hover:bg-zinc-800 border border-white/10'
                }`}
              >
                <CatIcon className={`w-3.5 h-3.5 ${isSelected ? 'text-amber-950' : 'text-amber-400'}`} />
                <span>{cat.label}</span>
              </button>
            );
          })}
        </div>

        {/* Achievements Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
          {filteredAchievements.map((item) => {
            const Icon = item.icon;
            const isUnlocked = item.status === 'unlocked';
            const progressPercent = Math.round((item.currentProgress / item.maxProgress) * 100);

            return (
              <div
                key={item.id}
                className={`p-6 rounded-3xl border flex flex-col justify-between space-y-4 transition-all duration-300 ${
                  isUnlocked
                    ? 'bg-gradient-to-br from-zinc-900 via-amber-950/20 to-zinc-900 border-amber-500/40 text-amber-100 shadow-[0_0_20px_rgba(251,191,36,0.1)] hover:border-amber-400'
                    : 'bg-zinc-950/80 border-white/10 text-zinc-400 opacity-75 hover:opacity-100 hover:border-white/20'
                }`}
              >
                <div className="space-y-3">
                  {/* Top Header: Icon, Category & Lock Status */}
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0 border ${
                          isUnlocked
                            ? 'bg-gradient-to-tr from-amber-500/30 to-amber-300/30 text-amber-300 border-amber-400/50 shadow-[0_0_15px_rgba(251,191,36,0.3)]'
                            : 'bg-zinc-800 text-zinc-500 border-zinc-700'
                        }`}
                      >
                        <Icon className="w-6 h-6" />
                      </div>

                      <div>
                        <span className="text-[11px] font-tajawal font-extrabold text-amber-400/90 uppercase tracking-wider block">
                          {item.categoryLabel}
                        </span>
                        <h3 className="font-cairo font-bold text-base md:text-lg text-amber-100 leading-tight">
                          {item.title}
                        </h3>
                      </div>
                    </div>

                    {isUnlocked ? (
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-tajawal font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                        <span>مفتوح • Unlocked</span>
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-tajawal font-bold bg-slate-800 text-slate-400 border border-slate-700">
                        <Lock className="w-3.5 h-3.5" />
                        <span>مغلق • Locked</span>
                      </span>
                    )}
                  </div>

                  <p className="font-tajawal text-xs md:text-sm text-zinc-300 leading-relaxed">
                    {item.description}
                  </p>
                </div>

                {/* Progress Bar & Reward Meta Footer */}
                <div className="pt-3 border-t border-white/10 space-y-2">
                  <div className="flex items-center justify-between text-xs font-tajawal">
                    <span className="text-zinc-400 font-bold">
                      التقدم: {item.currentProgress} / {item.maxProgress} ({progressPercent}%)
                    </span>

                    <div className="flex items-center gap-2 font-extrabold">
                      <span className="bg-amber-500/20 text-amber-300 px-2 py-0.5 rounded border border-amber-500/30">
                        +{item.xpReward} XP
                      </span>
                      <span className="bg-amber-400/20 text-amber-200 px-2 py-0.5 rounded border border-amber-400/30 flex items-center gap-1">
                        <Coins className="w-3 h-3 text-amber-400" />
                        +{item.coinsReward}
                      </span>
                    </div>
                  </div>

                  <div className="w-full bg-zinc-800 h-2.5 rounded-full overflow-hidden p-0.5 border border-white/10">
                    <div
                      className={`h-full rounded-full transition-all duration-500 ${
                        isUnlocked
                          ? 'bg-gradient-to-r from-emerald-500 to-amber-300 shadow-[0_0_8px_rgba(16,185,129,0.5)]'
                          : 'bg-amber-500/60'
                      }`}
                      style={{ width: `${progressPercent}%` }}
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer info banner */}
        <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-center space-y-1">
          <p className="font-cairo font-bold text-sm text-amber-200">
            واجهة نظام الأوسمة والإنجازات مكتملة بالكامل (Sprint 8)
          </p>
          <p className="font-tajawal text-xs text-amber-300/70">
            جميع الأوسمة والتقدم ومكافآت XP والعملات الذهبية معروضة بحسب الفئات المطلوبة.
          </p>
        </div>
      </div>

      <GlobalFooter />
    </motion.div>
  );
};
