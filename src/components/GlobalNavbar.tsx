import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { EmptyState } from './EmptyState';
import { GlobalSearchModal } from './GlobalSearchModal';
import { NotificationCenterModal } from './NotificationCenterModal';
import {
  Home,
  Tv,
  Target,
  ShoppingBag,
  Trophy,
  User,
  Coins,
  Sparkles,
  Bell,
  Menu,
  X,
  Award,
  Settings,
  HelpCircle,
  Puzzle,
  Grid,
  Compass,
  LogIn,
  Search,
  ChevronDown,
} from 'lucide-react';
import { ActiveSection } from '../types';
import { USER_ECONOMY_DATA } from '../data/economyData';

interface GlobalNavbarProps {
  activeSection: ActiveSection;
  onNavigate: (section: ActiveSection) => void;
  currentEpisodeNumber?: number;
}

export const GlobalNavbar: React.FC<GlobalNavbarProps> = ({
  activeSection,
  onNavigate,
  currentEpisodeNumber = 1,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isNotificationCenterOpen, setIsNotificationCenterOpen] = useState(false);
  const [isMoreOpen, setIsMoreOpen] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsSearchOpen((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Economy stats from centralized platform foundation
  const { currentXP: userXP, coins: userCoins, level: userLevel } = USER_ECONOMY_DATA;

  // Secondary items moved under "More" (المزيد) dropdown menu
  const secondaryNavItems: { id: ActiveSection; labelAr: string; labelEn: string; icon: React.FC<{ className?: string }> }[] = [
    { id: 'journey', labelAr: 'رحلتي', labelEn: 'My Journey', icon: Compass },
    { id: 'activities', labelAr: 'الأنشطة', labelEn: 'Activities', icon: Target },
    { id: 'store', labelAr: 'المتجر', labelEn: 'Store', icon: ShoppingBag },
    { id: 'achievements', labelAr: 'الإنجازات', labelEn: 'Achievements', icon: Award },
  ];

  const isSecondaryActive = secondaryNavItems.some((item) => item.id === activeSection);

  // Full list of navigation items for mobile drawer menu
  const allNavItems: { id: ActiveSection; label: string; icon: React.FC<{ className?: string }> }[] = [
    { id: 'home', label: 'الرئيسية • Home', icon: Home },
    { id: 'journey', label: 'رحلتي • My Journey', icon: Compass },
    { id: 'episode', label: `الحلقة ${currentEpisodeNumber} • Episode`, icon: Tv },
    { id: 'activities', label: 'الأنشطة • Activities', icon: Target },
    { id: 'quiz', label: 'الاختبارات • Quiz', icon: HelpCircle },
    { id: 'puzzle', label: 'الألغاز • Puzzles', icon: Puzzle },
    { id: 'crossword', label: 'كلمات متقاطعة • Crossword', icon: Grid },
    { id: 'store', label: 'متجر المكافآت • Store', icon: ShoppingBag },
    { id: 'profile', label: 'الملف الشخصي • Profile', icon: User },
    { id: 'auth', label: 'تسجيل الدخول / الحساب • Auth & Sign In', icon: LogIn },
    { id: 'achievements', label: 'الإنجازات • Achievements', icon: Award },
    { id: 'leaderboard', label: 'لوحة الصدارة • Leaderboard', icon: Trophy },
    { id: 'settings', label: 'الإعدادات • Settings', icon: Settings },
  ];

  return (
    <>
      {/* Floating Glass Navigation Bar (Apple-like minimalist design) */}
      <header className="fixed top-3 left-4 right-4 z-40 pointer-events-auto max-w-5xl mx-auto select-none">
        <nav className="bg-black/35 backdrop-blur-2xl border border-white/10 rounded-full px-3 py-1.5 sm:px-4 sm:py-2 flex items-center justify-between shadow-[0_8px_32px_rgba(0,0,0,0.4)] transition-all duration-300 hover:border-amber-500/30">
          
          {/* TOP-RIGHT (RTL Start): Project Logo & Title */}
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => onNavigate('home')}
              className="flex items-center gap-2.5 group cursor-pointer text-left ltr"
              title="بودكاست مش مجرد حد"
            >
              <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-amber-500/20 via-amber-400/20 to-amber-300/20 flex items-center justify-center border border-amber-300/40 shadow-[0_0_12px_rgba(251,191,36,0.4)] group-hover:scale-105 transition-transform overflow-hidden p-0.5">
                <img
                  src="/assets/logo/logo.png"
                  alt="بودكاست مش مجرد حد"
                  className="w-full h-full object-cover rounded-full"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="hidden sm:flex flex-col text-right dir-rtl">
                <span className="text-amber-100/90 font-cairo font-extrabold text-xs tracking-wide leading-tight group-hover:text-amber-300 transition-colors">
                  بودكاست مش مجرد حد
                </span>
                <span className="text-amber-400/60 font-tajawal text-[9px] leading-tight">
                  MMH Podcast
                </span>
              </div>
            </button>
          </div>

          {/* CENTER: Primary Nav & Secondary Nav Dropdown - Unified Apple TV Icon Pods */}
          <div className="hidden md:flex items-center gap-1 bg-white/5 backdrop-blur-md px-1 py-1 rounded-full border border-white/10 relative">
            {/* Nav 1: Home */}
            <button
              type="button"
              onClick={() => {
                onNavigate('home');
                setIsMoreOpen(false);
              }}
              className={`w-8 h-8 rounded-full flex items-center justify-center transition-all duration-200 cursor-pointer active:scale-95 ${
                activeSection === 'home'
                  ? 'bg-gradient-to-tr from-amber-500 via-amber-400 to-amber-300 text-zinc-950 border border-amber-300/50 shadow-[0_0_12px_rgba(251,191,36,0.5)] scale-105'
                  : 'text-amber-200/80 hover:text-amber-200 hover:bg-white/15'
              }`}
              title="الرئيسية • Home"
            >
              <Home className={`w-3.5 h-3.5 ${activeSection === 'home' ? 'text-zinc-950 font-black' : 'text-amber-300'}`} />
            </button>

            {/* Nav 2: Journey */}
            <button
              type="button"
              onClick={() => {
                onNavigate('journey');
                setIsMoreOpen(false);
              }}
              className={`w-8 h-8 rounded-full flex items-center justify-center transition-all duration-200 cursor-pointer active:scale-95 ${
                activeSection === 'journey'
                  ? 'bg-gradient-to-tr from-amber-500 via-amber-400 to-amber-300 text-zinc-950 border border-amber-300/50 shadow-[0_0_12px_rgba(251,191,36,0.5)] scale-105'
                  : 'text-amber-200/80 hover:text-amber-200 hover:bg-white/15'
              }`}
              title="رحلتي • Journey"
            >
              <Compass className={`w-3.5 h-3.5 ${activeSection === 'journey' ? 'text-zinc-950 font-black' : 'text-amber-300'}`} />
            </button>

            {/* Nav 3: Current Episode */}
            <button
              type="button"
              onClick={() => {
                onNavigate('episode');
                setIsMoreOpen(false);
              }}
              className={`w-8 h-8 rounded-full flex items-center justify-center transition-all duration-200 cursor-pointer active:scale-95 ${
                activeSection === 'episode'
                  ? 'bg-gradient-to-tr from-amber-500 via-amber-400 to-amber-300 text-zinc-950 border border-amber-300/50 shadow-[0_0_12px_rgba(251,191,36,0.5)] scale-105'
                  : 'text-amber-200/80 hover:text-amber-200 hover:bg-white/15'
              }`}
              title={`الحلقة ${currentEpisodeNumber} • Episode`}
            >
              <Tv className={`w-3.5 h-3.5 ${activeSection === 'episode' ? 'text-zinc-950 font-black' : 'text-amber-300'}`} />
            </button>

            {/* Secondary Navigation Dropdown Trigger: More */}
            <div className="relative">
              <button
                type="button"
                onClick={() => setIsMoreOpen((prev) => !prev)}
                className={`relative w-8 h-8 rounded-full flex items-center justify-center transition-all duration-200 cursor-pointer active:scale-95 ${
                  isSecondaryActive || isMoreOpen
                    ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40 shadow-[0_0_10px_rgba(251,191,36,0.2)]'
                    : 'text-amber-200/80 hover:text-amber-200 hover:bg-white/15'
                }`}
                title="المزيد من الأقسام • More Sections"
              >
                <Grid className="w-3.5 h-3.5 text-amber-300" />
                {isSecondaryActive && (
                  <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 rounded-full bg-amber-400 shadow-[0_0_6px_#f59e0b]" />
                )}
              </button>

              {/* Secondary Navigation Menu Popover */}
              <AnimatePresence>
                {isMoreOpen && (
                  <>
                    <div
                      className="fixed inset-0 z-30"
                      onClick={() => setIsMoreOpen(false)}
                    />
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95, y: 8 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.95, y: 8 }}
                      transition={{ duration: 0.15 }}
                      className="absolute top-full mt-2 right-0 w-48 p-1.5 rounded-2xl bg-zinc-950/95 backdrop-blur-2xl border border-amber-500/30 shadow-[0_10px_30px_rgba(0,0,0,0.8)] z-40 text-right dir-rtl space-y-1"
                    >
                      {secondaryNavItems.map((item) => {
                        const ItemIcon = item.icon;
                        const isSelected = activeSection === item.id;
                        return (
                          <button
                            key={item.id}
                            type="button"
                            onClick={() => {
                              onNavigate(item.id);
                              setIsMoreOpen(false);
                            }}
                            className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-tajawal font-bold transition-all cursor-pointer ${
                              isSelected
                                ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                                : 'text-zinc-300 hover:bg-white/10 hover:text-amber-200'
                            }`}
                          >
                            <ItemIcon className={`w-4 h-4 ${isSelected ? 'text-amber-400' : 'text-amber-400/70'}`} />
                            <div className="flex flex-col text-right">
                              <span>{item.labelAr}</span>
                              <span className="text-[9px] font-tajawal text-zinc-500 font-normal">{item.labelEn}</span>
                            </div>
                          </button>
                        );
                      })}
                    </motion.div>
                  </>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* RIGHT SIDE: Icon-based Primary Actions & Compact Economy Pills */}
          <div className="flex items-center gap-1.5 sm:gap-2 dir-rtl">
            {/* Search */}
            <button
              type="button"
              onClick={() => setIsSearchOpen(true)}
              className="w-8 h-8 rounded-full flex items-center justify-center bg-white/5 hover:bg-white/15 border border-white/10 hover:border-amber-400/30 text-amber-200 transition-all duration-200 cursor-pointer active:scale-95 group relative"
              title="بحث شامل • Search (Cmd+K / Ctrl+K)"
            >
              <Search className="w-3.5 h-3.5 text-amber-300 group-hover:scale-110 transition-transform" />
            </button>

            {/* Notifications */}
            <button
              type="button"
              onClick={() => setIsNotificationCenterOpen(true)}
              className="relative w-9 h-9 sm:w-8 sm:h-8 min-w-[44px] min-h-[44px] sm:min-w-0 sm:min-h-0 rounded-full flex items-center justify-center bg-white/5 hover:bg-white/15 border border-white/10 hover:border-amber-400/30 text-amber-200 transition-all duration-200 cursor-pointer active:scale-95 group"
              title="مركز الإشعارات • Notification Center"
            >
              <Bell className="w-3.5 h-3.5 text-amber-300 group-hover:scale-110 transition-transform" />
              <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 rounded-full bg-amber-400 shadow-[0_0_6px_#f59e0b] animate-pulse" />
            </button>

            <div className="hidden sm:block w-px h-4 bg-white/10 my-auto" />

            {/* Compact Economy Pills (Level, XP, Coins) */}
            <div className="hidden sm:flex items-center gap-1.5">
              {/* Level Pill */}
              <button
                type="button"
                onClick={() => onNavigate('profile')}
                className="h-8 px-2.5 rounded-full bg-white/5 hover:bg-white/15 border border-white/10 hover:border-amber-400/30 text-amber-200 transition-all duration-200 cursor-pointer active:scale-95 flex items-center gap-1.5 text-[11px] font-tajawal font-bold tracking-tight select-none"
                title="المستوى • Level"
              >
                <Trophy className="w-3.5 h-3.5 text-amber-400" />
                <span>Lv {userLevel}</span>
              </button>

              {/* XP Pill */}
              <button
                type="button"
                onClick={() => onNavigate('achievements')}
                className="h-8 px-2.5 rounded-full bg-white/5 hover:bg-white/15 border border-white/10 hover:border-emerald-400/30 text-emerald-300 transition-all duration-200 cursor-pointer active:scale-95 flex items-center gap-1.5 text-[11px] font-tajawal font-bold tracking-tight select-none"
                title="نقاط الخبرة • XP"
              >
                <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
                <span>XP {userXP}</span>
              </button>

              {/* Coins Pill */}
              <button
                type="button"
                onClick={() => onNavigate('store')}
                className="h-8 px-2.5 rounded-full bg-white/5 hover:bg-white/15 border border-white/10 hover:border-amber-400/30 text-amber-200 transition-all duration-200 cursor-pointer active:scale-95 flex items-center gap-1.5 text-[11px] font-tajawal font-bold tracking-tight select-none"
                title="العملات • Coins"
              >
                <Coins className="w-3.5 h-3.5 text-amber-400" />
                <span>¢ {userCoins}</span>
              </button>
            </div>

            <div className="hidden sm:block w-px h-4 bg-white/10 my-auto" />

            {/* Profile Avatar */}
            <button
              type="button"
              onClick={() => onNavigate('profile')}
              className={`w-9 h-9 sm:w-8 sm:h-8 min-w-[44px] min-h-[44px] sm:min-w-0 sm:min-h-0 rounded-full flex items-center justify-center border transition-all duration-200 cursor-pointer active:scale-95 group ${
                activeSection === 'profile'
                  ? 'bg-gradient-to-tr from-amber-500 via-amber-400 to-amber-300 text-zinc-950 border-amber-400 shadow-[0_0_12px_rgba(251,191,36,0.6)] scale-105'
                  : 'bg-white/5 hover:bg-white/15 border-white/10 text-amber-300 hover:border-amber-400/40'
              }`}
              title="الملف الشخصي • Profile"
            >
              <User className={`w-3.5 h-3.5 ${activeSection === 'profile' ? 'text-zinc-950' : 'text-amber-300'} group-hover:scale-110 transition-transform`} />
            </button>

            {/* Mobile Navigation Drawer Trigger */}
            <button
              type="button"
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden w-9 h-9 sm:w-8 sm:h-8 min-w-[44px] min-h-[44px] rounded-full flex items-center justify-center bg-amber-500/15 hover:bg-amber-500/25 border border-amber-500/30 text-amber-300 transition-all duration-200 cursor-pointer active:scale-95"
              title="القائمة • Menu"
            >
              {isOpen ? <X className="w-4 h-4 text-amber-400" /> : <Menu className="w-4 h-4 text-amber-400" />}
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile Drawer Navigation Menu (Collapsible Premium Glass Sheet) */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed inset-0 z-50 bg-black/90 backdrop-blur-2xl flex flex-col justify-between p-6 md:p-12 dir-rtl overflow-y-auto select-none pointer-events-auto max-w-full overflow-x-hidden"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            {/* Drawer Header */}
            <div className="flex items-center justify-between pb-6 border-b border-amber-500/20 max-w-5xl mx-auto w-full">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-amber-500/20 via-amber-400/20 to-amber-300/20 flex items-center justify-center border border-amber-300/40 shadow-[0_0_12px_rgba(251,191,36,0.4)] overflow-hidden p-0.5 shrink-0">
                  <img
                    src="/assets/logo/logo.png"
                    alt="بودكاست مش مجرد حد"
                    className="w-full h-full object-cover rounded-full"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div>
                  <h2 className="text-xl md:text-2xl font-cairo font-black text-amber-100">
                    قائمة المنصة التفاعلية
                  </h2>
                  <p className="text-xs md:text-sm font-tajawal text-amber-300/70">
                    بودكاست مش مجرد حد • MMH Podcast
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="w-11 h-11 min-w-[44px] min-h-[44px] rounded-full bg-amber-500/10 hover:bg-amber-500/20 text-amber-300 border border-amber-500/30 transition-all cursor-pointer flex items-center justify-center shrink-0"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Mobile User Quick Stats Banner */}
            <div className="max-w-5xl mx-auto w-full my-4 p-4 rounded-2xl bg-zinc-900/90 border border-amber-500/25 flex items-center justify-around text-center">
              <div>
                <span className="text-[10px] font-tajawal text-amber-300/80 block">المستوى • Level</span>
                <span className="font-cairo font-black text-base text-amber-100">Lvl {userLevel}</span>
              </div>
              <div className="w-px h-8 bg-white/10" />
              <div>
                <span className="text-[10px] font-tajawal text-emerald-400/80 block">تقدم التعلم • XP</span>
                <span className="font-cairo font-black text-base text-emerald-300">+{userXP} XP</span>
              </div>
              <div className="w-px h-8 bg-white/10" />
              <div>
                <span className="text-[10px] font-tajawal text-amber-300/80 block">عملات المتجر • Coins</span>
                <span className="font-cairo font-black text-base text-amber-200">{userCoins} 🪙</span>
              </div>
            </div>

            {/* Grid of Navigation Items */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4 max-w-5xl mx-auto w-full my-4">
              {allNavItems.map((item) => {
                const Icon = item.icon;
                const isActive = activeSection === item.id;
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => {
                      onNavigate(item.id);
                      setIsOpen(false);
                    }}
                    className={`p-4 rounded-2xl text-right flex items-center gap-4 transition-all duration-300 cursor-pointer border ${
                      isActive
                        ? 'bg-gradient-to-r from-amber-500/20 to-amber-400/10 border-amber-400 text-amber-100 shadow-[0_0_20px_rgba(251,191,36,0.2)] scale-[1.02]'
                        : 'bg-zinc-900/80 border-white/10 text-zinc-300 hover:bg-zinc-800/90 hover:border-amber-500/40 hover:text-amber-200'
                    }`}
                  >
                    <div
                      className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 ${
                        isActive
                          ? 'bg-amber-400 text-amber-950 font-bold'
                          : 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                      }`}
                    >
                      <Icon className="w-6 h-6" />
                    </div>
                    <div className="flex flex-col">
                      <span className="font-cairo font-bold text-base md:text-lg">
                        {item.label.split('•')[0].trim()}
                      </span>
                      <span className="font-tajawal text-xs opacity-70">
                        {item.label.split('•')[1]?.trim() || ''}
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Footer Close Button */}
            <div className="text-center pt-6 border-t border-white/10 max-w-5xl mx-auto w-full">
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="px-8 py-2.5 rounded-full font-tajawal font-bold text-sm text-amber-950 bg-amber-400 hover:bg-amber-300 transition-all cursor-pointer shadow-lg"
              >
                إغلاق القائمة • Close Menu
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Global Search Modal Interface */}
      <GlobalSearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        onNavigate={onNavigate}
      />

      {/* Notification Center Modal */}
      <NotificationCenterModal
        isOpen={isNotificationCenterOpen}
        onClose={() => setIsNotificationCenterOpen(false)}
        onNavigate={onNavigate}
      />
    </>
  );
};
