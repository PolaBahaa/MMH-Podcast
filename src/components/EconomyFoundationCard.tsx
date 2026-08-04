import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Trophy,
  Sparkles,
  Coins,
  Flame,
  Info,
  X,
  TrendingUp,
  Award,
  ShoppingBag,
  HelpCircle,
} from 'lucide-react';
import { USER_ECONOMY_DATA, ECONOMY_INFO } from '../data/economyData';

interface EconomyFoundationCardProps {
  variant?: 'full' | 'compact' | 'header';
  onNavigateToStore?: () => void;
  onNavigateToAchievements?: () => void;
}

export const EconomyFoundationCard: React.FC<EconomyFoundationCardProps> = ({
  variant = 'full',
  onNavigateToStore,
  onNavigateToAchievements,
}) => {
  const [activeModal, setActiveModal] = useState<'xp' | 'coins' | 'level' | null>(null);

  const xpProgressPercent = Math.round(
    (USER_ECONOMY_DATA.currentXP / USER_ECONOMY_DATA.maxXPForLevel) * 100
  );

  return (
    <>
      {/* Visual Card Container */}
      <div className="relative overflow-hidden rounded-2xl md:rounded-3xl bg-gradient-to-br from-zinc-950 via-zinc-900 to-amber-950/40 border border-amber-500/25 p-4 md:p-6 shadow-[0_8px_32px_rgba(0,0,0,0.5)] text-right dir-rtl select-none space-y-4">
        
        {/* Subtle Ambient Background Lighting */}
        <div className="absolute top-0 left-1/4 w-64 h-64 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none" />

        {/* Card Header Title Bar */}
        <div className="flex items-center justify-between border-b border-amber-500/15 pb-3">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-amber-500 via-amber-400 to-amber-300 text-amber-950 flex items-center justify-center font-cairo font-black text-sm shadow-[0_0_12px_rgba(251,191,36,0.4)]">
              <Trophy className="w-4 h-4 text-amber-950" />
            </div>
            <div>
              <h3 className="font-cairo font-black text-sm md:text-base text-amber-100 flex items-center gap-2">
                <span>اقتصاد المنصة الروحية</span>
                <span className="text-[10px] font-tajawal font-normal text-amber-400/80 bg-amber-400/10 px-2 py-0.5 rounded-full border border-amber-400/20">
                  Platform Economy
                </span>
              </h3>
              <p className="font-tajawal text-[11px] text-zinc-400 leading-tight">
                منظومة نقاط XP المكتسبة للتعلم، والعملات لتسوق مكافآت المتجر
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={() => setActiveModal('level')}
            className="p-1.5 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-amber-300 transition-colors cursor-pointer text-xs font-tajawal flex items-center gap-1"
            title="معلومات النظام الاقتصادي"
          >
            <HelpCircle className="w-4 h-4 text-amber-400" />
            <span className="hidden sm:inline text-[11px]">دليل الاقتصاد</span>
          </button>
        </div>

        {/* Main Economy 3 Pillar Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-4">
          
          {/* Pillar 1: Level */}
          <div
            onClick={() => setActiveModal('level')}
            className="p-3.5 md:p-4 rounded-xl bg-zinc-900/90 border border-amber-500/30 hover:border-amber-400/60 transition-all cursor-pointer group space-y-2 relative overflow-hidden"
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-tajawal font-bold text-amber-300 flex items-center gap-1.5">
                <Trophy className="w-4 h-4 text-amber-400 group-hover:scale-110 transition-transform" />
                <span>المستوى الحالي</span>
              </span>
              <span className="text-[10px] font-tajawal text-amber-400/70 bg-amber-400/10 px-2 py-0.5 rounded-full border border-amber-400/20">
                Level {USER_ECONOMY_DATA.level}
              </span>
            </div>

            <div className="flex items-baseline justify-between pt-1">
              <span className="text-2xl md:text-3xl font-cairo font-black text-amber-100">
                Lvl {USER_ECONOMY_DATA.level}
              </span>
              <span className="text-xs font-tajawal text-amber-200/90 font-bold">
                {USER_ECONOMY_DATA.currentRank.titleAr}
              </span>
            </div>


            {/* Level Progress Bar */}
            <div className="space-y-1 pt-1">
              <div className="flex items-center justify-between text-[10px] font-tajawal text-zinc-400">
                <span>التقدم نحو Level {USER_ECONOMY_DATA.level + 1}</span>
                <span className="text-amber-300 font-bold">{xpProgressPercent}%</span>
              </div>
              <div className="w-full bg-zinc-950 h-2 rounded-full overflow-hidden border border-white/5">
                <div
                  className="bg-gradient-to-r from-amber-500 to-amber-300 h-full rounded-full transition-all duration-500"
                  style={{ width: `${xpProgressPercent}%` }}
                />
              </div>
            </div>
          </div>

          {/* Pillar 2: XP (Learning Progress) */}
          <div
            onClick={() => setActiveModal('xp')}
            className="p-3.5 md:p-4 rounded-xl bg-zinc-900/90 border border-emerald-500/30 hover:border-emerald-400/60 transition-all cursor-pointer group space-y-2 relative overflow-hidden"
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-tajawal font-bold text-emerald-300 flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-emerald-400 group-hover:scale-110 transition-transform" />
                <span>نقاط التعلم (XP)</span>
              </span>
              <span className="text-[10px] font-tajawal text-emerald-400/80 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">
                تقدم التعلم
              </span>
            </div>

            <div className="flex items-baseline justify-between pt-1">
              <span className="text-2xl md:text-3xl font-cairo font-black text-emerald-300">
                +{USER_ECONOMY_DATA.currentXP}
                <span className="text-sm font-tajawal text-emerald-400 font-normal mr-1">XP</span>
              </span>
              <span className="text-xs font-tajawal text-zinc-400">
                من {USER_ECONOMY_DATA.maxXPForLevel} XP
              </span>
            </div>

            <p className="text-[11px] font-tajawal text-zinc-300/80 leading-snug line-clamp-2">
              تكتسب باكتشاف الحلقات وحل الاختبارات والألغاز والمسابقات.
            </p>
          </div>

          {/* Pillar 3: Coins (Store Reward Currency) */}
          <div
            onClick={() => setActiveModal('coins')}
            className="p-3.5 md:p-4 rounded-xl bg-zinc-900/90 border border-amber-500/30 hover:border-amber-400/60 transition-all cursor-pointer group space-y-2 relative overflow-hidden"
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-tajawal font-bold text-amber-300 flex items-center gap-1.5">
                <Coins className="w-4 h-4 text-amber-400 group-hover:scale-110 transition-transform" />
                <span>عملات المتجر (Coins)</span>
              </span>
              <span className="text-[10px] font-tajawal text-amber-300/80 bg-amber-500/10 px-2 py-0.5 rounded-full border border-amber-500/20">
                رصيد الشراء
              </span>
            </div>

            <div className="flex items-baseline justify-between pt-1">
              <span className="text-2xl md:text-3xl font-cairo font-black text-amber-200">
                {USER_ECONOMY_DATA.coins}
                <span className="text-sm font-tajawal text-amber-300 font-normal mr-1">🪙</span>
              </span>
              {onNavigateToStore && (
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    onNavigateToStore();
                  }}
                  className="text-[11px] font-tajawal font-bold text-amber-300 hover:text-amber-100 underline decoration-amber-400/50"
                >
                  زيارة المتجر ←
                </button>
              )}
            </div>

            <p className="text-[11px] font-tajawal text-zinc-300/80 leading-snug line-clamp-2">
              تستخدم لاستبدال الكتب والأيقونات القبطية والشموع المعطرة بالمتجر.
            </p>
          </div>

        </div>

        {/* Footer Shortcut Bar */}
        <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-white/5 text-xs font-tajawal text-zinc-400">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1 text-orange-400">
              <Flame className="w-3.5 h-3.5" />
              <span>السلسلة اليومية: {USER_ECONOMY_DATA.currentStreak} أيام مواظبة</span>
            </span>
            <span className="text-zinc-500">•</span>
            <span className="flex items-center gap-1 text-sky-400">
              <Award className="w-3.5 h-3.5" />
              <span>الآحاد المكتملة: {USER_ECONOMY_DATA.completedSundays} / {USER_ECONOMY_DATA.totalSundays}</span>
            </span>
          </div>

          <div className="flex items-center gap-2">
            {onNavigateToAchievements && (
              <button
                type="button"
                onClick={onNavigateToAchievements}
                className="px-3 py-1 rounded-full bg-amber-500/10 hover:bg-amber-500/20 text-amber-300 border border-amber-500/20 text-xs transition-all cursor-pointer flex items-center gap-1"
              >
                <Award className="w-3.5 h-3.5 text-amber-400" />
                <span>شاشة الإنجازات والأوسمة</span>
              </button>
            )}
            {onNavigateToStore && (
              <button
                type="button"
                onClick={onNavigateToStore}
                className="px-3 py-1 rounded-full bg-amber-400 text-amber-950 font-bold hover:bg-amber-300 text-xs transition-all cursor-pointer flex items-center gap-1"
              >
                <ShoppingBag className="w-3.5 h-3.5 text-amber-950" />
                <span>متجر المكافآت</span>
              </button>
            )}
          </div>
        </div>

      </div>

      {/* Detail Popover Modal for XP / Coins / Level Definitions */}
      <AnimatePresence>
        {activeModal && (
          <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 dir-rtl text-right select-none">
            <motion.div
              className="bg-zinc-900 border border-amber-500/30 rounded-3xl p-6 max-w-lg w-full space-y-5 shadow-[0_10px_40px_rgba(0,0,0,0.8)] relative text-white"
              initial={{ opacity: 0, scale: 0.9, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 10 }}
            >
              <div className="flex items-center justify-between pb-3 border-b border-white/10">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-xl bg-amber-500/20 border border-amber-500/30 text-amber-300 flex items-center justify-center font-bold">
                    {activeModal === 'xp' ? (
                      <Sparkles className="w-5 h-5 text-emerald-400" />
                    ) : activeModal === 'coins' ? (
                      <Coins className="w-5 h-5 text-amber-400" />
                    ) : (
                      <Trophy className="w-5 h-5 text-amber-400" />
                    )}
                  </div>
                  <div>
                    <h4 className="font-cairo font-black text-lg text-amber-100">
                      {ECONOMY_INFO[activeModal].title}
                    </h4>
                    <span className="text-xs font-tajawal text-amber-400/80">
                      {ECONOMY_INFO[activeModal].englishTitle}
                    </span>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setActiveModal(null)}
                  className="p-1.5 rounded-full bg-white/5 hover:bg-white/10 text-zinc-400 hover:text-white"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="p-4 rounded-2xl bg-black/50 border border-white/5 space-y-2">
                <p className="font-tajawal text-sm text-zinc-200 leading-relaxed">
                  {ECONOMY_INFO[activeModal].description}
                </p>
              </div>

              {/* Status breakdown based on activeModal */}
              {activeModal === 'xp' && (
                <div className="p-3.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20 space-y-2 text-xs font-tajawal text-emerald-200">
                  <div className="flex justify-between font-bold">
                    <span>إجمالي نقاط XP التعليمية الممتلكة:</span>
                    <span className="text-emerald-300 font-extrabold text-sm">{USER_ECONOMY_DATA.currentXP} XP</span>
                  </div>
                  <p className="text-zinc-300 text-[11px] leading-normal">
                    تزيد نقاط XP طردياً مع كل شواهد الكتاب المقدس المكتشفة والأسئلة المجابة بصحة في بودكاست مش مجرد حد.
                  </p>
                </div>
              )}

              {activeModal === 'coins' && (
                <div className="p-3.5 rounded-xl bg-amber-500/10 border border-amber-500/20 space-y-2 text-xs font-tajawal text-amber-200">
                  <div className="flex justify-between font-bold">
                    <span>رصيد العملات المتاحة للتسوق:</span>
                    <span className="text-amber-300 font-extrabold text-sm">{USER_ECONOMY_DATA.coins} 🪙</span>
                  </div>
                  <p className="text-zinc-300 text-[11px] leading-normal">
                    استخدم عملاتك الذهبية في متجر المكافآت لشحن المقتنيات القبطية والكتب والأيقونات والتذكارات الروحية.
                  </p>
                </div>
              )}

              {activeModal === 'level' && (
                <div className="p-3.5 rounded-xl bg-amber-500/10 border border-amber-500/20 space-y-2 text-xs font-tajawal text-amber-200">
                  <div className="flex justify-between font-bold">
                    <span>المستوى واللقب الحالي:</span>
                    <span className="text-amber-300 font-extrabold text-sm">Level {USER_ECONOMY_DATA.level} ({USER_ECONOMY_DATA.currentRank.titleAr})</span>
                  </div>
                  <p className="text-zinc-300 text-[11px] leading-normal">
                    المستوى القادم: <span className="text-amber-300 font-bold">{USER_ECONOMY_DATA.nextRank.titleAr}</span> عند الوصول لـ 600 XP.
                  </p>
                </div>
              )}


              <button
                type="button"
                onClick={() => setActiveModal(null)}
                className="w-full py-2.5 rounded-xl bg-amber-400 text-amber-950 font-cairo font-black text-sm hover:bg-amber-300 transition-colors"
              >
                فهمت ذلك • Got it
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};
