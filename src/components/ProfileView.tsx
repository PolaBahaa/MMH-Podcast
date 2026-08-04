import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { ActiveSection } from '../types';
import { EditProfileModal } from './EditProfileModal';
import { UserStatisticsSection } from './UserStatisticsSection';
import { UserInventorySection } from './UserInventorySection';
import { ProfileSkeleton } from './SkeletonLoaders';
import { GlobalFooter } from './GlobalFooter';

import {
  ArrowRight,
  User,
  Mail,
  Flame,
  Award,
  Coins,
  BookOpen,
  CheckCircle2,
  TrendingUp,
  Calendar,
  Sparkles,
  BarChart3,
  Gift,
  Target,
  Trophy,
  Package,
  Clock,
  ShieldCheck,
  CheckSquare,
  Hash,
  ShoppingBag,
  ExternalLink,
  Edit3,
} from 'lucide-react';

interface ProfileViewProps {
  onClose: () => void;
  onNavigate?: (section: ActiveSection) => void;
}

export const ProfileView: React.FC<ProfileViewProps> = ({ onClose, onNavigate }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 450);
    return () => clearTimeout(timer);
  }, []);


  // User Profile Data
  const userProfile = {
    fullName: 'فادي القمص مرقس • Fady Al-Qommos',
    email: 'fady.alqommos@greatlent2026.org',
    role: 'متابع ملتزم بـ بودكاست مش مجرد حد',
    avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
    currentLevel: 3,
    levelTitle: 'المستوى 3 • خادم دراسات الصوم (Level 3)',
    xp: 450,
    maxXPForLevel: 600,
    coins: 120,
    currentStreak: 5,
    longestStreak: 7,
    completedSundays: 2,
    totalSundays: 7,
    completedActivities: 6,
    totalActivities: 16,
    unlockedAchievementsCount: 5,
    totalAchievementsCount: 12,
  };

  // List of Sundays
  const sundaysList = [
    {
      id: 1,
      titleAr: 'الأحد الأول: أحد الكنز',
      titleEn: 'Treasure Sunday',
      status: 'completed',
      completionPercentage: 100,
      completedDate: '25 يوليو 2026',
    },
    {
      id: 2,
      titleAr: 'الأحد الثاني: أحد التجربة',
      titleEn: 'Sunday of Temptation',
      status: 'completed',
      completionPercentage: 100,
      completedDate: '1 أغسطس 2026',
    },
    {
      id: 3,
      titleAr: 'الأحد الثالث: أحد الابن الضال',
      titleEn: 'Prodigal Son Sunday',
      status: 'in_progress',
      completionPercentage: 65,
      completedDate: 'جاري الدراسة الآن',
    },
    {
      id: 4,
      titleAr: 'الأحد الرابع: أحد السامرية',
      titleEn: 'Samaritan Woman Sunday',
      status: 'locked',
      completionPercentage: 0,
      completedDate: 'مغلق',
    },
    {
      id: 5,
      titleAr: 'الأحد الخامس: أحد المخلوع',
      titleEn: 'Paralyzed Man Sunday',
      status: 'locked',
      completionPercentage: 0,
      completedDate: 'مغلق',
    },
    {
      id: 6,
      titleAr: 'الأحد السادس: أحد المولود أعمى',
      titleEn: 'Blind Man Sunday',
      status: 'locked',
      completionPercentage: 0,
      completedDate: 'مغلق',
    },
    {
      id: 7,
      titleAr: 'الأحد السابع: أحد الشعانين',
      titleEn: 'Palm Sunday',
      status: 'locked',
      completionPercentage: 0,
      completedDate: 'مغلق',
    },
  ];

  // List of Achievements
  const achievements = [
    {
      id: 'ach-1',
      titleAr: 'وسام البداية المباركة',
      titleEn: 'Blessed Start Badge',
      descriptionAr: 'إكمال دراسة وحفظ شواهد الأحد الأول بنجاح.',
      icon: Sparkles,
      unlocked: true,
      unlockedDate: '25 يوليو 2026',
      xpReward: 50,
      colorClass: 'text-amber-400 bg-amber-500/10 border-amber-500/30',
    },
    {
      id: 'ach-2',
      titleAr: 'الشعلة الذهبية',
      titleEn: 'Golden Flame Streak',
      descriptionAr: 'المواظبة على التعلم اليومي لـ 5 أيام متتالية.',
      icon: Flame,
      unlocked: true,
      unlockedDate: '28 يوليو 2026',
      xpReward: 100,
      colorClass: 'text-orange-400 bg-orange-500/10 border-orange-500/30',
    },
    {
      id: 'ach-3',
      titleAr: 'حافظ الشواهد الإنجيلية',
      titleEn: 'Scripture Master',
      descriptionAr: 'إجابة كافة أسئلة الشواهد والآيات بنسبة دقة 100%.',
      icon: BookOpen,
      unlocked: true,
      unlockedDate: '30 يوليو 2026',
      xpReward: 80,
      colorClass: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/30',
    },
    {
      id: 'ach-4',
      titleAr: 'عبقري الكلمات المتقاطعة',
      titleEn: 'Crossword Genius',
      descriptionAr: 'حل شبكة الكلمات المتقاطعة القبطية بدون تلميحات.',
      icon: Target,
      unlocked: true,
      unlockedDate: '2 أغسطس 2026',
      xpReward: 60,
      colorClass: 'text-purple-400 bg-purple-500/10 border-purple-500/30',
    },
    {
      id: 'ach-5',
      titleAr: 'المستبدل الأول',
      titleEn: 'First Redeemer',
      descriptionAr: 'إجراء أول عملية استبدال مقتنيات من متجر المكافآت.',
      icon: ShoppingBag,
      unlocked: true,
      unlockedDate: '3 أغسطس 2026',
      xpReward: 50,
      colorClass: 'text-sky-400 bg-sky-500/10 border-sky-500/30',
    },
    {
      id: 'ach-6',
      titleAr: 'فارس الصوم الكبير',
      titleEn: 'Knight of Great Lent',
      descriptionAr: 'إكمال كافة الآحاد السبعة والأنشطة المرتبطة بها.',
      icon: Trophy,
      unlocked: false,
      unlockedDate: 'قيد التقدم',
      xpReward: 300,
      colorClass: 'text-zinc-600 bg-zinc-900 border-zinc-800',
    },
  ];

  // List of Recent Orders
  const recentOrders = [
    {
      id: 'ord-101',
      orderNumber: '#ORD-2026-9412',
      dateAr: '4 أغسطس 2026 • 10:15 ص',
      productNameAr: 'أجبية القديسين الذهبية (كتاب صلوات السواعي)',
      productImage: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=600&q=80',
      quantity: 1,
      coinsUsed: 350,
      status: 'Pending',
      statusLabelAr: 'قيد الانتظار',
      statusBg: 'bg-amber-500/15 border-amber-500/30 text-amber-300',
    },
    {
      id: 'ord-102',
      orderNumber: '#ORD-2026-8841',
      dateAr: '3 أغسطس 2026 • 04:45 م',
      productNameAr: 'صليب خشب الزيتون المقدس (أورشليم)',
      productImage: 'https://images.unsplash.com/photo-1548625149-fc4a29cf7092?auto=format&fit=crop&w=600&q=80',
      quantity: 2,
      coinsUsed: 240,
      status: 'Approved',
      statusLabelAr: 'تم الاعتماد',
      statusBg: 'bg-blue-500/15 border-blue-500/30 text-blue-300',
    },
    {
      id: 'ord-105',
      orderNumber: '#ORD-2026-4402',
      dateAr: '20 يوليو 2026 • 11:00 ص',
      productNameAr: 'كتاب تجميعي: بستان الرهبان وقصص الآباء',
      productImage: 'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&w=600&q=80',
      quantity: 1,
      coinsUsed: 160,
      status: 'Delivered',
      statusLabelAr: 'تم التسليم',
      statusBg: 'bg-emerald-500/15 border-emerald-500/30 text-emerald-300',
    },
  ];

  return (
    <motion.div
      className="fixed inset-0 z-50 overflow-y-auto bg-black/95 backdrop-blur-2xl text-white dir-rtl select-none"
      initial={{ opacity: 0, scale: 0.98, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.98, y: 20 }}
      transition={{ duration: 0.3 }}
    >
      {/* Sticky Top Header Bar */}
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
          الملف الشخصي الشامل • User Profile
        </span>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-8 md:py-10 space-y-8">
        {isLoading ? (
          <ProfileSkeleton />
        ) : (
          <>
            {/* 1. Main Profile Hero Header */}
            <div className="p-6 md:p-8 rounded-3xl bg-gradient-to-br from-zinc-900 via-amber-950/40 to-zinc-900 border border-amber-500/30 shadow-[0_0_30px_rgba(251,191,36,0.15)] space-y-6 relative overflow-hidden">

          <div className="absolute top-0 left-0 w-64 h-64 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="flex flex-col md:flex-row items-center justify-between gap-6 relative z-10">
            {/* Avatar, Name, Email */}
            <div className="flex flex-col md:flex-row items-center gap-5 text-center md:text-right">
              {/* Avatar Image with Gold Ring */}
              <div className="relative">
                <img
                  src={userProfile.avatarUrl}
                  alt={userProfile.fullName}
                  className="w-20 h-20 md:w-24 md:h-24 rounded-full object-cover border-2 border-amber-400 shadow-[0_0_25px_rgba(251,191,36,0.5)]"
                />
                <span className="absolute -bottom-2 -right-1 bg-gradient-to-r from-amber-400 to-amber-300 text-amber-950 font-cairo font-black text-xs px-2.5 py-0.5 rounded-full border border-amber-200 shadow-md">
                  Lvl {userProfile.currentLevel}
                </span>
              </div>

              <div className="space-y-1">
                <h2 className="text-2xl md:text-3xl font-cairo font-black text-amber-100 tracking-tight">
                  {userProfile.fullName}
                </h2>
                <div className="flex flex-wrap items-center justify-center md:justify-start gap-2 text-xs font-tajawal text-zinc-300">
                  <span className="flex items-center gap-1 text-amber-300/90">
                    <Mail className="w-3.5 h-3.5 text-amber-400" />
                    {userProfile.email}
                  </span>
                  <span className="text-zinc-600">•</span>
                  <span className="text-zinc-400">{userProfile.role}</span>
                </div>
                <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-amber-500/10 border border-amber-500/20 text-xs font-tajawal font-bold text-amber-300 pt-0.5 mt-1">
                  <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                  <span>{userProfile.levelTitle}</span>
                </div>
              </div>
            </div>

            {/* Overall Quick Action buttons */}
            <div className="flex flex-wrap items-center gap-3">
              <button
                type="button"
                onClick={() => setIsEditModalOpen(true)}
                className="px-4 py-2.5 rounded-2xl bg-amber-500 hover:bg-amber-400 text-amber-950 font-cairo font-black text-xs md:text-sm flex items-center gap-2 transition-all cursor-pointer shadow-lg shadow-amber-500/20 active:scale-95"
              >
                <Edit3 className="w-4 h-4" />
                <span>تعديل الملف الشخصي • Edit Profile</span>
              </button>

              {onNavigate && (
                <button
                  type="button"
                  onClick={() => {
                    onClose();
                    onNavigate('store');
                  }}
                  className="px-4 py-2.5 rounded-2xl bg-amber-500/15 hover:bg-amber-500/25 border border-amber-500/30 text-amber-300 font-cairo font-bold text-xs md:text-sm flex items-center gap-2 transition-all cursor-pointer shadow-md active:scale-95"
                >
                  <ShoppingBag className="w-4 h-4 text-amber-400" />
                  <span>متجر المكافآت</span>
                </button>
              )}
            </div>
          </div>

          {/* Level Progress Bar (XP Progress) */}
          <div className="space-y-2 pt-4 border-t border-white/10 relative z-10">
            <div className="flex items-center justify-between text-xs md:text-sm font-tajawal font-bold">
              <span className="text-amber-200 flex items-center gap-1.5">
                <Award className="w-4 h-4 text-amber-400" />
                تقدم نقاط الخبرة الحالية (Current XP):
              </span>
              <span className="text-amber-400 font-cairo font-black">
                {userProfile.xp} / {userProfile.maxXPForLevel} XP ({userProfile.maxXPForLevel - userProfile.xp} XP متبقية للترقية)
              </span>
            </div>
            <div className="w-full bg-zinc-800/90 h-4 rounded-full overflow-hidden p-0.5 border border-white/10">
              <motion.div
                className="bg-gradient-to-r from-amber-500 via-amber-400 to-amber-300 h-full rounded-full shadow-[0_0_12px_rgba(251,191,36,0.8)]"
                initial={{ width: 0 }}
                animate={{ width: `${(userProfile.xp / userProfile.maxXPForLevel) * 100}%` }}
                transition={{ duration: 0.8, ease: 'easeOut' }}
              />
            </div>
          </div>
        </div>

        {/* 2. Key Metrics Grid (All Required Items) */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 md:gap-4">
          {/* Current Level */}
          <div className="p-4 rounded-2xl bg-zinc-900/90 border border-amber-500/30 text-center space-y-1 shadow-md">
            <User className="w-6 h-6 text-amber-400 mx-auto" />
            <span className="text-[11px] font-tajawal text-zinc-400 block">المستوى الحالي</span>
            <span className="font-cairo font-black text-xl text-amber-300 block">
              Level {userProfile.currentLevel}
            </span>
          </div>

          {/* XP */}
          <div className="p-4 rounded-2xl bg-zinc-900/90 border border-emerald-500/30 text-center space-y-1 shadow-md">
            <Award className="w-6 h-6 text-emerald-400 mx-auto" />
            <span className="text-[11px] font-tajawal text-zinc-400 block">نقاط الخبرة XP</span>
            <span className="font-cairo font-black text-xl text-emerald-300 block">
              {userProfile.xp}
            </span>
          </div>

          {/* Coins */}
          <div className="p-4 rounded-2xl bg-zinc-900/90 border border-amber-400/30 text-center space-y-1 shadow-md">
            <Coins className="w-6 h-6 text-amber-400 mx-auto" />
            <span className="text-[11px] font-tajawal text-zinc-400 block">العملات الذهبية</span>
            <span className="font-cairo font-black text-xl text-amber-300 block">
              {userProfile.coins} 🪙
            </span>
          </div>

          {/* Current Streak */}
          <div className="p-4 rounded-2xl bg-zinc-900/90 border border-orange-500/30 text-center space-y-1 shadow-md">
            <Flame className="w-6 h-6 text-orange-400 mx-auto" />
            <span className="text-[11px] font-tajawal text-zinc-400 block">السلسلة الحالية</span>
            <span className="font-cairo font-black text-lg text-orange-400 block">
              {userProfile.currentStreak} أيام 🔥
            </span>
          </div>

          {/* Completed Sundays */}
          <div className="p-4 rounded-2xl bg-zinc-900/90 border border-sky-500/30 text-center space-y-1 shadow-md">
            <BookOpen className="w-6 h-6 text-sky-400 mx-auto" />
            <span className="text-[11px] font-tajawal text-zinc-400 block">الآحاد المكتملة</span>
            <span className="font-cairo font-black text-xl text-sky-300 block">
              {userProfile.completedSundays} / {userProfile.totalSundays}
            </span>
          </div>

          {/* Completed Activities */}
          <div className="p-4 rounded-2xl bg-zinc-900/90 border border-purple-500/30 text-center space-y-1 shadow-md">
            <CheckSquare className="w-6 h-6 text-purple-400 mx-auto" />
            <span className="text-[11px] font-tajawal text-zinc-400 block">الأنشطة المكتملة</span>
            <span className="font-cairo font-black text-xl text-purple-300 block">
              {userProfile.completedActivities} / {userProfile.totalActivities}
            </span>
          </div>
        </div>

        {/* User Statistics Detailed Cards Section */}
        <div className="p-6 rounded-3xl bg-zinc-900/90 border border-amber-500/20 shadow-xl">
          <UserStatisticsSection />
        </div>

        {/* 3. Section: Completed Sundays Progress (الآحاد المكتملة) */}
        <div className="p-6 rounded-3xl bg-zinc-900/90 border border-white/10 space-y-4 shadow-lg">
          <div className="flex items-center justify-between">
            <h3 className="font-cairo font-bold text-lg text-amber-100 flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-amber-400" />
              الآحاد المكتملة ومسار الصوم • Completed Sundays
            </h3>
            <span className="text-xs font-cairo font-bold text-amber-400 bg-amber-500/10 px-3 py-1 rounded-full border border-amber-500/20">
              {userProfile.completedSundays} من {userProfile.totalSundays} آحاد مكتملة
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 pt-1">
            {sundaysList.map((sunday) => (
              <div
                key={sunday.id}
                className={`p-4 rounded-2xl border flex flex-col justify-between space-y-3 transition-all ${
                  sunday.status === 'completed'
                    ? 'bg-amber-500/10 border-amber-500/30 text-amber-100'
                    : sunday.status === 'in_progress'
                    ? 'bg-sky-500/10 border-sky-500/30 text-sky-100'
                    : 'bg-zinc-950/60 border-zinc-800 text-zinc-500'
                }`}
              >
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <h4 className="font-cairo font-extrabold text-sm text-amber-100">
                      {sunday.titleAr}
                    </h4>
                    <span className="text-[11px] font-tajawal text-zinc-400 block">
                      {sunday.titleEn}
                    </span>
                  </div>

                  {sunday.status === 'completed' ? (
                    <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                  ) : sunday.status === 'in_progress' ? (
                    <Clock className="w-5 h-5 text-sky-400 animate-spin-slow shrink-0" />
                  ) : (
                    <span className="text-[10px] bg-zinc-800 px-2 py-0.5 rounded text-zinc-500">
                      مغلق
                    </span>
                  )}
                </div>

                <div className="space-y-1">
                  <div className="flex justify-between items-center text-[11px] font-tajawal text-zinc-400">
                    <span>نسبة الإنجاز:</span>
                    <span className="font-cairo font-bold text-amber-300">
                      {sunday.completionPercentage}%
                    </span>
                  </div>
                  <div className="w-full bg-zinc-800 h-1.5 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full ${
                        sunday.status === 'completed'
                          ? 'bg-emerald-400'
                          : sunday.status === 'in_progress'
                          ? 'bg-sky-400'
                          : 'bg-zinc-700'
                      }`}
                      style={{ width: `${sunday.completionPercentage}%` }}
                    />
                  </div>
                </div>

                <div className="text-[10px] font-tajawal text-zinc-400 pt-1 border-t border-white/5 flex justify-between">
                  <span>تاريخ الحالة:</span>
                  <span className="text-amber-200">{sunday.completedDate}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 4. Section: Achievements (الأوسمة والإنجازات) */}
        <div className="p-6 rounded-3xl bg-zinc-900/90 border border-white/10 space-y-4 shadow-lg">
          <div className="flex items-center justify-between">
            <h3 className="font-cairo font-bold text-lg text-amber-100 flex items-center gap-2">
              <Trophy className="w-5 h-5 text-amber-400" />
              الأوسمة والإنجازات • Achievements ({userProfile.unlockedAchievementsCount} / {userProfile.totalAchievementsCount})
            </h3>
            {onNavigate && (
              <button
                type="button"
                onClick={() => {
                  onClose();
                  onNavigate('achievements');
                }}
                className="text-xs font-cairo font-bold text-amber-400 hover:underline flex items-center gap-1 cursor-pointer"
              >
                <span>عرض الكل</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 pt-1">
            {achievements.map((ach) => {
              const AchIcon = ach.icon;
              return (
                <div
                  key={ach.id}
                  className={`p-4 rounded-2xl border flex items-start gap-3.5 transition-all ${ach.colorClass}`}
                >
                  <div
                    className={`w-11 h-11 rounded-2xl flex items-center justify-center shrink-0 border shadow-md ${
                      ach.unlocked
                        ? 'bg-amber-500/20 text-amber-300 border-amber-500/40'
                        : 'bg-zinc-950 text-zinc-600 border-zinc-800'
                    }`}
                  >
                    <AchIcon className="w-6 h-6" />
                  </div>

                  <div className="space-y-1 min-w-0 flex-1">
                    <div className="flex items-center justify-between gap-1">
                      <h4 className="font-cairo font-bold text-xs sm:text-sm text-amber-100 truncate">
                        {ach.titleAr}
                      </h4>
                      <span className="text-[10px] font-cairo font-black text-emerald-400 shrink-0">
                        +{ach.xpReward} XP
                      </span>
                    </div>
                    <p className="text-[11px] font-tajawal text-zinc-300 line-clamp-2">
                      {ach.descriptionAr}
                    </p>
                    <div className="text-[10px] font-tajawal text-zinc-400 pt-1 flex items-center justify-between">
                      <span>{ach.titleEn}</span>
                      <span className="text-amber-400">{ach.unlockedDate}</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* 5. Section: User Inventory (مقتنياتي المستبدلة) */}
        <div className="p-6 rounded-3xl bg-zinc-900/90 border border-amber-500/20 shadow-xl">
          <UserInventorySection />
        </div>

        {/* Footer info note */}
        <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-center space-y-1">
          <p className="font-cairo font-bold text-sm text-amber-200">
            ملف المستخدم الشامل (User Profile)
          </p>
          <p className="font-tajawal text-xs text-amber-300/70">
            يعرض البيانات الكاملة: الصورة الشخصية (Avatar)، الاسم الكامل، البريد الإلكتروني، المستوى الحالي، نقاط XP، العملات الذهبية، السلسلة المتتالية، الآحاد المكتملة، الأنشطة المكتملة، الأوسمة، والطلبات الأخيرة.
          </p>
        </div>
          </>
        )}
      </div>


      {/* Edit Profile Modal Interface */}
      <EditProfileModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        currentAvatar={userProfile.avatarUrl}
        currentName={userProfile.fullName}
      />

      <GlobalFooter />
    </motion.div>
  );
};
