import React from 'react';
import { motion } from 'motion/react';
import {
  Tv,
  Target,
  Package,
  Coins,
  ShoppingBag,
  SearchX,
  BellOff,
  Sparkles,
  RefreshCw,
  PlusCircle,
  LucideIcon,
} from 'lucide-react';

export type EmptyStateType =
  | 'no_episodes'
  | 'no_activities'
  | 'no_orders'
  | 'no_coins'
  | 'no_products'
  | 'no_search_results'
  | 'no_notifications';

interface EmptyStateProps {
  type: EmptyStateType;
  titleAr?: string;
  titleEn?: string;
  descriptionAr?: string;
  descriptionEn?: string;
  actionLabelAr?: string;
  onAction?: () => void;
  className?: string;
}

interface EmptyStateConfig {
  Icon: LucideIcon;
  defaultTitleAr: string;
  defaultTitleEn: string;
  defaultDescAr: string;
  defaultDescEn: string;
  defaultActionAr?: string;
  accentColor: string;
  glowColor: string;
}

const EMPTY_STATE_CONFIGS: Record<EmptyStateType, EmptyStateConfig> = {
  no_episodes: {
    Icon: Tv,
    defaultTitleAr: 'لا توجد حلقات متاحة حالياً',
    defaultTitleEn: 'No Episodes Available',
    defaultDescAr: 'لم يتم العثور على حلقات مسجلة لهذا الأحد. يرجى التفقُّد لاحقاً بعد رفع المحتوى القبطي.',
    defaultDescEn: 'No recorded episodes were found for this Sunday. Please check back soon.',
    defaultActionAr: 'تحديث المحتوى',
    accentColor: 'text-amber-400',
    glowColor: 'rgba(245, 158, 11, 0.25)',
  },
  no_activities: {
    Icon: Target,
    defaultTitleAr: 'لا توجد أنشطة تفاعلية هنا',
    defaultTitleEn: 'No Activities Found',
    defaultDescAr: 'لا توجد مسابقات أو أنشطة روحية متطابقة مع التصفية المختارة في هذه الحلقة.',
    defaultDescEn: 'No interactive quizzes or spiritual activities match the selected filter.',
    defaultActionAr: 'إعادة ضبط التصفية',
    accentColor: 'text-purple-400',
    glowColor: 'rgba(168, 85, 247, 0.25)',
  },
  no_orders: {
    Icon: Package,
    defaultTitleAr: 'سجل الطلبات فارغ',
    defaultTitleEn: 'No Orders Yet',
    defaultDescAr: 'لم تقم باستبدال أي مقتنيات أو هدايا حتى الآن. استبدل عملاتك الذهبية من المتجر!',
    defaultDescEn: 'You have not redeemed any items or gifts yet. Redeem your coins from the store!',
    defaultActionAr: 'تصفح المتجر والجوائز',
    accentColor: 'text-sky-400',
    glowColor: 'rgba(14, 165, 233, 0.25)',
  },
  no_coins: {
    Icon: Coins,
    defaultTitleAr: 'رصيد العملات غير كافٍ',
    defaultTitleEn: 'Insufficient Coin Balance',
    defaultDescAr: 'تحتاج للمزيد من العملات الذهبية لاستبدال هذه الهدية. شارك في الأنشطة والصلوات لكسبها!',
    defaultDescEn: 'You need more gold coins to redeem this item. Complete activities to earn coins!',
    defaultActionAr: 'كسب العملات الآن',
    accentColor: 'text-amber-300',
    glowColor: 'rgba(251, 191, 36, 0.3)',
  },
  no_products: {
    Icon: ShoppingBag,
    defaultTitleAr: 'لا توجد منتجات في هذا القسم',
    defaultTitleEn: 'No Products Available',
    defaultDescAr: 'القسم المختار لا يحتوي على منتجات متاحة للاستبدال حالياً. تفقد الأقسام الأخرى.',
    defaultDescEn: 'The selected category currently has no products available for redemption.',
    defaultActionAr: 'عرض جميع المقتنيات',
    accentColor: 'text-emerald-400',
    glowColor: 'rgba(16, 185, 129, 0.25)',
  },
  no_search_results: {
    Icon: SearchX,
    defaultTitleAr: 'لم نجد أي نتائج متطابقة',
    defaultTitleEn: 'No Matching Search Results',
    defaultDescAr: 'تأكد من كتابة اسم المنتج أو العبارة بشكل صحيح أو حاول البحث بكلمات أكثر شمولاً.',
    defaultDescEn: 'Make sure the product name is spelled correctly or try broader search terms.',
    defaultActionAr: 'مسح نص البحث',
    accentColor: 'text-rose-400',
    glowColor: 'rgba(244, 63, 94, 0.25)',
  },
  no_notifications: {
    Icon: BellOff,
    defaultTitleAr: 'لا توجد إشعارات جديدة',
    defaultTitleEn: 'No New Notifications',
    defaultDescAr: 'أنت على اطلاع بكل التحديثات! سنخبرك فور توفر حلقات جديدة أو هدايا مستبدلة.',
    defaultDescEn: 'You are all caught up! We will notify you when new episodes or rewards arrive.',
    accentColor: 'text-indigo-400',
    glowColor: 'rgba(99, 102, 241, 0.25)',
  },
};

export const EmptyState: React.FC<EmptyStateProps> = ({
  type,
  titleAr,
  titleEn,
  descriptionAr,
  descriptionEn,
  actionLabelAr,
  onAction,
  className = '',
}) => {
  const config = EMPTY_STATE_CONFIGS[type];
  const Icon = config.Icon;

  const displayTitleAr = titleAr || config.defaultTitleAr;
  const displayTitleEn = titleEn || config.defaultTitleEn;
  const displayDescAr = descriptionAr || config.defaultDescAr;
  const displayDescEn = descriptionEn || config.defaultDescEn;
  const displayActionAr = actionLabelAr || config.defaultActionAr;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.35, ease: 'easeOut' }}
      className={`p-8 md:p-12 rounded-3xl bg-gradient-to-b from-zinc-900/90 via-zinc-950 to-zinc-900 border border-amber-500/20 shadow-2xl text-center space-y-5 dir-rtl relative overflow-hidden select-none ${className}`}
    >
      {/* Background Soft Glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 rounded-full blur-3xl pointer-events-none"
        style={{ backgroundColor: config.glowColor }}
      />

      {/* Decorative Floating Icon Illustration */}
      <div className="relative mx-auto w-20 h-20 rounded-3xl bg-zinc-950/80 border border-amber-500/30 flex items-center justify-center shadow-[0_0_25px_rgba(0,0,0,0.8)] group">
        <Icon className={`w-10 h-10 ${config.accentColor} transition-transform duration-300 group-hover:scale-110`} />
        
        {/* Sparkle badge accent */}
        <div className="absolute -top-1.5 -right-1.5 w-6 h-6 rounded-full bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-300 animate-pulse">
          <Sparkles className="w-3.5 h-3.5" />
        </div>
      </div>

      {/* Text Hierarchy */}
      <div className="space-y-2 max-w-md mx-auto">
        <h4 className="font-cairo font-black text-lg md:text-xl text-amber-100 leading-snug">
          {displayTitleAr}
        </h4>
        <p className="text-xs font-cairo font-bold text-amber-400/80 tracking-wider">
          {displayTitleEn}
        </p>
        <p className="text-xs md:text-sm font-tajawal text-zinc-400 leading-relaxed pt-1">
          {displayDescAr}
        </p>
      </div>

      {/* Action Button (Optional) */}
      {onAction && displayActionAr && (
        <div className="pt-2">
          <button
            type="button"
            onClick={onAction}
            className="px-6 py-2.5 rounded-2xl bg-gradient-to-r from-amber-500 via-amber-400 to-amber-300 hover:from-amber-400 hover:to-amber-200 text-amber-950 font-cairo font-black text-xs md:text-sm transition-all shadow-[0_0_15px_rgba(251,191,36,0.25)] hover:shadow-[0_0_25px_rgba(251,191,36,0.4)] hover:scale-105 active:scale-95 cursor-pointer inline-flex items-center gap-2"
          >
            <RefreshCw className="w-4 h-4 text-amber-950" />
            <span>{displayActionAr}</span>
          </button>
        </div>
      )}
    </motion.div>
  );
};
