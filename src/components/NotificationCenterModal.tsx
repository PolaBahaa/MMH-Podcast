import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Bell,
  BellOff,
  Check,
  CheckCheck,
  Trash2,
  X,
  Tv,
  Target,
  Award,
  ShoppingBag,
  Package,
  Info,
  Sparkles,
  ArrowLeft,
  CornerDownLeft,
  Filter,
} from 'lucide-react';
import { ActiveSection } from '../types';
import { EmptyState } from './EmptyState';

export type NotificationCategory =
  | 'all'
  | 'learning'
  | 'activities'
  | 'achievements'
  | 'store'
  | 'orders'
  | 'system';

export interface NotificationItem {
  id: string;
  category: Exclude<NotificationCategory, 'all'>;
  titleAr: string;
  titleEn: string;
  messageAr: string;
  messageEn: string;
  timestamp: string;
  isRead: boolean;
  actionTarget?: ActiveSection;
}

const INITIAL_NOTIFICATIONS: NotificationItem[] = [
  {
    id: 'notif-1',
    category: 'learning',
    titleAr: 'الحلقة الثانية متاحة الآن! 🎬',
    titleEn: 'Episode 2 is Now Available!',
    messageAr: 'تم رفع دراسة وشواهد الأحد الثاني من الصوم (أحد التجربة). شاهد العظة وشواهد متى 4.',
    messageEn: 'Sunday 2 study on the Temptation in Wilderness is now live.',
    timestamp: 'منذ 10 دقائق • 10m ago',
    isRead: false,
    actionTarget: 'episode',
  },
  {
    id: 'notif-2',
    category: 'activities',
    titleAr: 'تحدي جديد: اختبار أحد الكنوز 🎯',
    titleEn: 'New Quiz Challenge Available!',
    messageAr: 'شارك في الاختبار التفاعلي للحلقة الأولى واكسب +50 XP و 15 عملة ذهبية!',
    messageEn: 'Complete Sunday 1 Quiz to earn +50 XP and 15 Gold Coins.',
    timestamp: 'منذ 45 دقيقة • 45m ago',
    isRead: false,
    actionTarget: 'quiz',
  },
  {
    id: 'notif-3',
    category: 'achievements',
    titleAr: 'وسام جديد مفتوح: شعلة المواظبة 🏆',
    titleEn: 'New Badge Unlocked: Streak Flame!',
    messageAr: 'تهانينا! حافظت على الدخول والمتابعة لمدة 5 أيام متتالية وحصلت على وسام الشعلة الذهبية.',
    messageEn: 'Congratulations! You achieved a 5-day consecutive activity streak.',
    timestamp: 'منذ ساعتين • 2h ago',
    isRead: false,
    actionTarget: 'achievements',
  },
  {
    id: 'notif-4',
    category: 'store',
    titleAr: 'خصم خاص: كتاب الأجبية القبطية 📖',
    titleEn: 'Special Reward Discount!',
    messageAr: 'وفر 20 عملة ذهبية الآن عند استبدال كتاب الأجبية القبطية المذهبة من المتجر.',
    messageEn: 'Save 20 gold coins on Coptic Agpeya book in the store.',
    timestamp: 'أمس 04:30 م • Yesterday',
    isRead: true,
    actionTarget: 'store',
  },
  {
    id: 'notif-5',
    category: 'orders',
    titleAr: 'تم الشحن: صليب الخشب الزيتوني 📦',
    titleEn: 'Order Shipped Successfully!',
    messageAr: 'طلبك رقم #ORD-8821 قيد التسليم الكنسي عبر خادم التربية الكنسية. تفقد التفاصيل.',
    messageEn: 'Your redeemed order #ORD-8821 has been processed for Church pickup.',
    timestamp: 'أمس 11:15 ص • Yesterday',
    isRead: true,
    actionTarget: 'journey',
  },
  {
    id: 'notif-6',
    category: 'system',
    titleAr: 'تحديث المنصة: نظام العملات والأوسمة ⚙️',
    titleEn: 'Platform Update: Economy System',
    messageAr: 'تم إضافة متطلبات اقتصادية جديدة وحساب دقيق لمستويات الخادم والألقاب الروحية.',
    messageEn: 'New XP level titles and reward economy mechanics have been deployed.',
    timestamp: 'منذ يومين • 2 days ago',
    isRead: true,
    actionTarget: 'journey',
  },
  {
    id: 'notif-7',
    category: 'learning',
    titleAr: 'ملف الألحان القبطية المرفق 🎶',
    titleEn: 'Coptic Lent Hymns PDF Attached',
    messageAr: 'تم إرفاق النوتة القبطية المكتوبة ولحن "طاي أوري" الخاص بأسبوع الآلام الصوم.',
    messageEn: 'Sacred Coptic Passion Week hymns sheet music added.',
    timestamp: 'منذ 3 أيام • 3 days ago',
    isRead: true,
    actionTarget: 'episode',
  },
];

interface NotificationCenterModalProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (section: ActiveSection) => void;
}

export const NotificationCenterModal: React.FC<NotificationCenterModalProps> = ({
  isOpen,
  onClose,
  onNavigate,
}) => {
  const [notifications, setNotifications] = useState<NotificationItem[]>(INITIAL_NOTIFICATIONS);
  const [activeCategory, setActiveCategory] = useState<NotificationCategory>('all');
  const [showUnreadOnly, setShowUnreadOnly] = useState(false);

  // Unread count total
  const unreadCount = useMemo(
    () => notifications.filter((n) => !n.isRead).length,
    [notifications]
  );

  // Filtered list
  const filteredNotifications = useMemo(() => {
    return notifications.filter((item) => {
      if (showUnreadOnly && item.isRead) return false;
      if (activeCategory !== 'all' && item.category !== activeCategory) return false;
      return true;
    });
  }, [notifications, activeCategory, showUnreadOnly]);

  const categoryPills: {
    id: NotificationCategory;
    labelAr: string;
    icon: React.FC<{ className?: string }>;
  }[] = [
    { id: 'all', labelAr: 'الكل • All', icon: Sparkles },
    { id: 'learning', labelAr: 'التعليم • Learning', icon: Tv },
    { id: 'activities', labelAr: 'الأنشطة • Activities', icon: Target },
    { id: 'achievements', labelAr: 'الإنجازات • Badges', icon: Award },
    { id: 'store', labelAr: 'المتجر • Store', icon: ShoppingBag },
    { id: 'orders', labelAr: 'الطلبات • Orders', icon: Package },
    { id: 'system', labelAr: 'النظام • System', icon: Info },
  ];

  const getCategoryMeta = (cat: Exclude<NotificationCategory, 'all'>) => {
    switch (cat) {
      case 'learning':
        return { icon: Tv, badgeAr: 'دروس وتأملات', color: 'bg-amber-500/15 text-amber-300 border-amber-500/30' };
      case 'activities':
        return { icon: Target, badgeAr: 'مسابقات وأنشطة', color: 'bg-purple-500/15 text-purple-300 border-purple-500/30' };
      case 'achievements':
        return { icon: Award, badgeAr: 'أوسمة وإنجازات', color: 'bg-rose-500/15 text-rose-300 border-rose-500/30' };
      case 'store':
        return { icon: ShoppingBag, badgeAr: 'عروض المتجر', color: 'bg-emerald-500/15 text-emerald-300 border-emerald-500/30' };
      case 'orders':
        return { icon: Package, badgeAr: 'تحديث الطلبات', color: 'bg-sky-500/15 text-sky-300 border-sky-500/30' };
      case 'system':
        return { icon: Info, badgeAr: 'إشعار نظام', color: 'bg-indigo-500/15 text-indigo-300 border-indigo-500/30' };
    }
  };

  const handleMarkAllAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, isRead: true })));
  };

  const handleClearAll = () => {
    setNotifications([]);
  };

  const handleToggleRead = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, isRead: !n.isRead } : n))
    );
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-start justify-center pt-12 sm:pt-20 px-4 bg-black/85 backdrop-blur-md dir-rtl overflow-hidden">
        {/* Backdrop click to close */}
        <motion.div
          className="absolute inset-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        />

        {/* Modal Window Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: -20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: -20 }}
          transition={{ duration: 0.25, ease: 'easeOut' }}
          className="relative w-full max-w-3xl bg-zinc-950 border border-amber-500/30 rounded-3xl shadow-[0_0_50px_rgba(0,0,0,0.9)] overflow-hidden flex flex-col max-h-[85vh] z-10"
        >
          {/* Header Controls Bar */}
          <div className="p-4 sm:p-5 border-b border-amber-500/20 bg-zinc-900/90 flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-amber-500/15 border border-amber-500/30 flex items-center justify-center text-amber-300 relative">
                <Bell className="w-5 h-5" />
                {unreadCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-amber-500 text-zinc-950 font-cairo font-black text-[10px] flex items-center justify-center border border-zinc-950 shadow-md animate-pulse">
                    {unreadCount}
                  </span>
                )}
              </div>

              <div>
                <h3 className="font-cairo font-black text-base sm:text-lg text-amber-100 flex items-center gap-2">
                  <span>مركز الإشعارات والتنبيهات</span>
                  <span className="text-xs font-tajawal text-amber-400/80 font-bold">
                    ({notifications.length})
                  </span>
                </h3>
                <p className="text-xs font-tajawal text-zinc-400">
                  Notification Center • تابع جديد الدروس والمسابقات والتحديثات
                </p>
              </div>
            </div>

            {/* Quick Actions (Mark Read / Clear) */}
            <div className="flex items-center gap-2">
              {unreadCount > 0 && (
                <button
                  type="button"
                  onClick={handleMarkAllAsRead}
                  className="px-3 py-1.5 rounded-xl bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/30 text-amber-300 text-xs font-tajawal font-bold transition-all cursor-pointer flex items-center gap-1.5"
                >
                  <CheckCheck className="w-4 h-4 text-amber-400" />
                  <span>تحديد الكل كـ مقروء</span>
                </button>
              )}

              {notifications.length > 0 && (
                <button
                  type="button"
                  onClick={handleClearAll}
                  className="p-2 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 border border-rose-500/25 text-rose-300 text-xs font-tajawal font-bold transition-all cursor-pointer"
                  title="مسح جميع الإشعارات"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              )}

              <button
                type="button"
                onClick={onClose}
                className="p-2 rounded-xl bg-zinc-800 border border-zinc-700 text-zinc-300 hover:bg-zinc-700 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Category Filters Bar */}
          <div className="p-3 bg-zinc-900/60 border-b border-white/5 flex items-center justify-between gap-2 overflow-x-auto no-scrollbar">
            <div className="flex items-center gap-2">
              {categoryPills.map((pill) => {
                const PillIcon = pill.icon;
                const isSelected = activeCategory === pill.id;
                return (
                  <button
                    key={pill.id}
                    type="button"
                    onClick={() => setActiveCategory(pill.id)}
                    className={`px-3 py-1.5 rounded-2xl text-xs font-tajawal font-bold transition-all shrink-0 flex items-center gap-1.5 cursor-pointer ${
                      isSelected
                        ? 'bg-amber-500 text-zinc-950 font-black shadow-[0_0_12px_rgba(251,191,36,0.3)] scale-105'
                        : 'bg-zinc-900/90 text-zinc-300 hover:bg-zinc-800 border border-zinc-800'
                    }`}
                  >
                    <PillIcon className={`w-3.5 h-3.5 ${isSelected ? 'text-zinc-950' : 'text-amber-400/80'}`} />
                    <span>{pill.labelAr.split('•')[0].trim()}</span>
                  </button>
                );
              })}
            </div>

            {/* Unread Toggle Pill */}
            <button
              type="button"
              onClick={() => setShowUnreadOnly((prev) => !prev)}
              className={`px-3 py-1.5 rounded-2xl text-xs font-tajawal font-bold transition-all shrink-0 flex items-center gap-1.5 cursor-pointer border ${
                showUnreadOnly
                  ? 'bg-amber-400/20 border-amber-400 text-amber-200'
                  : 'bg-zinc-900/80 border-zinc-800 text-zinc-400 hover:text-zinc-200'
              }`}
            >
              <Filter className="w-3.5 h-3.5" />
              <span>غير المقروء فقط ({unreadCount})</span>
            </button>
          </div>

          {/* Notifications List Container */}
          <div className="p-4 sm:p-6 overflow-y-auto space-y-3 flex-1">
            {filteredNotifications.length > 0 ? (
              filteredNotifications.map((notif) => {
                const meta = getCategoryMeta(notif.category);
                const ItemIcon = meta.icon;

                return (
                  <motion.div
                    key={notif.id}
                    layout
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    onClick={() => {
                      // Mark as read and navigate if target exists
                      setNotifications((prev) =>
                        prev.map((n) => (n.id === notif.id ? { ...n, isRead: true } : n))
                      );
                      if (notif.actionTarget) {
                        onNavigate(notif.actionTarget);
                        onClose();
                      }
                    }}
                    className={`p-4 rounded-2xl border transition-all cursor-pointer relative group flex flex-col sm:flex-row items-start justify-between gap-4 ${
                      !notif.isRead
                        ? 'bg-zinc-900/90 border-amber-500/40 shadow-[0_0_20px_rgba(251,191,36,0.06)]'
                        : 'bg-zinc-950/60 border-zinc-800/80 opacity-80 hover:opacity-100 hover:border-zinc-700'
                    }`}
                  >
                    {/* Unread Glowing Dot Indicator */}
                    {!notif.isRead && (
                      <span className="absolute top-4 left-4 w-2.5 h-2.5 rounded-full bg-amber-400 shadow-[0_0_10px_#f59e0b] animate-pulse" />
                    )}

                    <div className="flex items-start gap-3.5">
                      <div className="w-10 h-10 rounded-2xl bg-zinc-950 border border-amber-500/30 flex items-center justify-center shrink-0 group-hover:border-amber-400 transition-colors mt-0.5">
                        <ItemIcon className="w-5 h-5 text-amber-400" />
                      </div>

                      <div className="space-y-1 text-right">
                        <div className="flex flex-wrap items-center gap-2">
                          <h5 className="font-cairo font-bold text-sm text-amber-100 group-hover:text-amber-300 transition-colors">
                            {notif.titleAr}
                          </h5>
                          <span className={`text-[10px] font-tajawal font-bold px-2 py-0.5 rounded-full border ${meta.color}`}>
                            {meta.badgeAr}
                          </span>
                        </div>

                        <p className="text-xs font-tajawal text-zinc-300 leading-relaxed">
                          {notif.messageAr}
                        </p>

                        <span className="text-[10px] font-tajawal text-amber-400/80 font-semibold block pt-1">
                          {notif.timestamp}
                        </span>
                      </div>
                    </div>

                    {/* Actions on Item */}
                    <div className="flex items-center gap-2 shrink-0 self-end sm:self-center">
                      <button
                        type="button"
                        onClick={(e) => handleToggleRead(notif.id, e)}
                        className={`p-1.5 rounded-xl border text-xs font-tajawal transition-all cursor-pointer ${
                          notif.isRead
                            ? 'bg-zinc-900 border-zinc-800 text-zinc-500 hover:text-amber-300'
                            : 'bg-amber-500/20 border-amber-500/40 text-amber-300 hover:bg-amber-500/30'
                        }`}
                        title={notif.isRead ? 'تحديد كـ غير مقروء' : 'تحديد كـ مقروء'}
                      >
                        {notif.isRead ? <Check className="w-4 h-4" /> : <CheckCheck className="w-4 h-4" />}
                      </button>

                      {notif.actionTarget && (
                        <div className="text-amber-400 opacity-60 group-hover:opacity-100 group-hover:translate-x-[-2px] transition-all flex items-center text-xs font-tajawal font-bold gap-1 bg-amber-500/10 px-2 py-1 rounded-xl border border-amber-500/20">
                          <span>عرض</span>
                          <CornerDownLeft className="w-3.5 h-3.5" />
                        </div>
                      )}
                    </div>
                  </motion.div>
                );
              })
            ) : (
              <EmptyState
                type="no_notifications"
                titleAr={showUnreadOnly ? 'لا توجد إشعارات غير مقروءة' : 'صندوق الإشعارات فارغ'}
                descriptionAr={
                  showUnreadOnly
                    ? 'لقد قمت بقراءة جميع التنبيهات والأخبار المتاحة! انقر لعرض الإشعارات السابقة.'
                    : 'أنت على اطلاع تام بكافة التحديثات والدروس. سنخبرك فور رفع محتوى جديد.'
                }
                onAction={showUnreadOnly ? () => setShowUnreadOnly(false) : undefined}
                actionLabelAr={showUnreadOnly ? 'عرض كافة الإشعارات' : undefined}
              />
            )}
          </div>

          {/* Footer Bar */}
          <div className="p-3 sm:p-4 bg-zinc-900/80 border-t border-amber-500/20 flex items-center justify-between text-xs font-tajawal text-zinc-400">
            <div className="flex items-center gap-1.5 text-amber-300/80 font-bold">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>تنبيهات مخصصة لمتابعة الحلقات • MMH Podcast 2026</span>
            </div>

            <button
              type="button"
              onClick={onClose}
              className="text-amber-400 hover:text-amber-200 font-bold transition-colors cursor-pointer"
            >
              إغلاق النافذة
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
