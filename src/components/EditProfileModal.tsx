import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  X,
  Camera,
  User,
  Globe,
  Sun,
  Moon,
  Sparkles,
  Bell,
  CheckCircle2,
  Save,
  RotateCcw,
  Palette,
  Shield,
  Upload,
  Image as ImageIcon,
} from 'lucide-react';

interface EditProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentAvatar?: string;
  currentName?: string;
}

const PRESET_AVATARS = [
  'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
  'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80',
  'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=400&q=80',
  'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80',
  'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=400&q=80',
];

export const EditProfileModal: React.FC<EditProfileModalProps> = ({
  isOpen,
  onClose,
  currentAvatar = 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
  currentName = 'فادي القمص مرقس • Fady Al-Qommos',
}) => {
  // State for editable fields
  const [selectedAvatar, setSelectedAvatar] = useState(currentAvatar);
  const [customAvatarUrl, setCustomAvatarUrl] = useState('');
  const [displayName, setDisplayName] = useState(currentName);
  const [preferredLanguage, setPreferredLanguage] = useState<'ar' | 'cop' | 'en'>('ar');
  const [themePreference, setThemePreference] = useState<'golden' | 'night' | 'desert'>('golden');

  // Notification states
  const [notifications, setNotifications] = useState({
    dailyScripture: true,
    agpeyaReminders: true,
    journeyMilestones: true,
    activitiesAndQuizzes: false,
    storeUpdates: false,
  });

  // UI toast feedback
  const [showToast, setShowToast] = useState(false);

  const handleToggleNotification = (key: keyof typeof notifications) => {
    setNotifications((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const handleSavePlaceholder = (e: React.FormEvent) => {
    e.preventDefault();
    setShowToast(true);
    setTimeout(() => {
      setShowToast(false);
      onClose();
    }, 1200);
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 overflow-y-auto bg-black/90 backdrop-blur-xl text-white dir-rtl select-none flex items-center justify-center p-4 sm:p-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.25 }}
      >
        {/* Toast Feedback */}
        <AnimatePresence>
          {showToast && (
            <motion.div
              initial={{ opacity: 0, y: -20, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.9 }}
              className="fixed top-6 z-50 px-6 py-3.5 rounded-2xl bg-amber-500/20 border border-amber-500/40 text-amber-200 shadow-[0_10px_30px_rgba(0,0,0,0.8)] font-cairo font-bold text-xs sm:text-sm flex items-center gap-3 dir-rtl"
            >
              <CheckCircle2 className="w-5 h-5 text-amber-400 shrink-0" />
              <span>تم حفظ تفضيلات الملف الشخصي محلياً (معاينة الواجهة)</span>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Modal Window Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          transition={{ duration: 0.25 }}
          className="relative w-full max-w-2xl bg-zinc-950/95 border border-amber-500/30 rounded-3xl p-6 sm:p-8 shadow-[0_25px_60px_rgba(0,0,0,0.9)] overflow-hidden my-auto space-y-6"
        >
          {/* Ambient Glow */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-80 h-32 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

          {/* Modal Header */}
          <div className="flex items-center justify-between pb-4 border-b border-white/10 relative z-10">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-amber-500/15 border border-amber-500/30 flex items-center justify-center text-amber-400 shadow-md">
                <User className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-xl font-cairo font-black text-amber-100">
                  تعديل الملف الشخصي • Edit Profile
                </h2>
                <p className="text-xs font-tajawal text-zinc-400">
                  تخصيص الهوية الشخصية والتفضلات البصرية والإشعارات
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={onClose}
              className="w-9 h-9 rounded-full bg-zinc-900 border border-white/10 hover:border-amber-500/40 text-zinc-400 hover:text-amber-300 flex items-center justify-center transition-all cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <form onSubmit={handleSavePlaceholder} className="space-y-6 relative z-10">
            {/* 1. Profile Picture Selection */}
            <div className="space-y-3 p-4 rounded-2xl bg-zinc-900/60 border border-white/5">
              <label className="block text-xs font-cairo font-bold text-amber-300 flex items-center gap-2">
                <Camera className="w-4 h-4 text-amber-400" />
                الصورة الشخصية • Profile Picture
              </label>

              <div className="flex flex-col sm:flex-row items-center gap-5 pt-1">
                {/* Current Selected Avatar Preview */}
                <div className="relative shrink-0">
                  <img
                    src={selectedAvatar}
                    alt="Selected Avatar"
                    className="w-20 h-20 rounded-full object-cover border-2 border-amber-400 shadow-[0_0_20px_rgba(251,191,36,0.4)]"
                  />
                  <div className="absolute bottom-0 right-0 w-6 h-6 rounded-full bg-amber-500 text-amber-950 flex items-center justify-center border border-zinc-900 shadow">
                    <Camera className="w-3.5 h-3.5" />
                  </div>
                </div>

                {/* Preset Choices & URL option */}
                <div className="space-y-2.5 w-full">
                  <span className="text-[11px] font-tajawal text-zinc-400 block">
                    اختر رمزاً مستعاراً أو صورة رمزية:
                  </span>
                  <div className="flex flex-wrap items-center gap-2">
                    {PRESET_AVATARS.map((url, idx) => (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => setSelectedAvatar(url)}
                        className={`relative rounded-full p-0.5 border-2 transition-all cursor-pointer ${
                          selectedAvatar === url
                            ? 'border-amber-400 scale-105 shadow-[0_0_12px_rgba(251,191,36,0.6)]'
                            : 'border-transparent opacity-60 hover:opacity-100'
                        }`}
                      >
                        <img
                          src={url}
                          alt={`Avatar Preset ${idx + 1}`}
                          className="w-10 h-10 rounded-full object-cover"
                        />
                      </button>
                    ))}
                  </div>

                  {/* Optional Custom Image URL Input */}
                  <div className="relative pt-1">
                    <input
                      type="url"
                      value={customAvatarUrl}
                      onChange={(e) => {
                        setCustomAvatarUrl(e.target.value);
                        if (e.target.value.trim().length > 5) {
                          setSelectedAvatar(e.target.value);
                        }
                      }}
                      placeholder="أدخل رابط صورة مخصص (URL)..."
                      className="w-full pl-4 pr-9 py-2 rounded-xl bg-zinc-950 border border-white/10 focus:border-amber-500 text-xs font-tajawal text-amber-100 placeholder-zinc-600 outline-none"
                    />
                    <ImageIcon className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
                  </div>
                </div>
              </div>
            </div>

            {/* 2. Display Name Input */}
            <div className="space-y-1.5 p-4 rounded-2xl bg-zinc-900/60 border border-white/5">
              <label className="block text-xs font-cairo font-bold text-amber-300 flex items-center gap-2">
                <User className="w-4 h-4 text-amber-400" />
                الاسم الظاهر • Display Name
              </label>
              <input
                type="text"
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
                placeholder="أدخل الاسم الشخصي الظاهر"
                className="w-full px-4 py-3 rounded-xl bg-zinc-950 border border-white/10 focus:border-amber-500 text-xs sm:text-sm font-cairo font-bold text-amber-100 outline-none transition-all"
              />
              <span className="text-[11px] font-tajawal text-zinc-500 block pt-0.5">
                يظهر هذا الاسم في لوحة الصدارة وعرض الملف الشخصي ومشاركات الإنجازات.
              </span>
            </div>

            {/* 3. Preferred Language & Theme Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Preferred Language */}
              <div className="space-y-2 p-4 rounded-2xl bg-zinc-900/60 border border-white/5">
                <label className="block text-xs font-cairo font-bold text-amber-300 flex items-center gap-2">
                  <Globe className="w-4 h-4 text-amber-400" />
                  اللغة المفضلة • Preferred Language
                </label>

                <div className="space-y-2 pt-1">
                  {[
                    { id: 'ar', label: 'العربية (Arabic)', desc: 'اللغة الرئيسية للمنصة' },
                    { id: 'cop', label: 'القبطية (Coptic)', desc: 'المصطلحات والألحان الكنسية' },
                    { id: 'en', label: 'English', desc: 'Bilingual Interface' },
                  ].map((lang) => (
                    <button
                      key={lang.id}
                      type="button"
                      onClick={() => setPreferredLanguage(lang.id as any)}
                      className={`w-full p-2.5 rounded-xl border text-right transition-all cursor-pointer flex items-center justify-between ${
                        preferredLanguage === lang.id
                          ? 'bg-amber-500/15 border-amber-500/50 text-amber-200 shadow-md'
                          : 'bg-zinc-950 border-white/5 text-zinc-400 hover:text-zinc-200'
                      }`}
                    >
                      <div>
                        <span className="font-cairo font-bold text-xs block">{lang.label}</span>
                        <span className="text-[10px] font-tajawal opacity-75">{lang.desc}</span>
                      </div>
                      {preferredLanguage === lang.id && (
                        <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
                      )}
                    </button>
                  ))}
                </div>
              </div>

              {/* Theme Preference */}
              <div className="space-y-2 p-4 rounded-2xl bg-zinc-900/60 border border-white/5">
                <label className="block text-xs font-cairo font-bold text-amber-300 flex items-center gap-2">
                  <Palette className="w-4 h-4 text-amber-400" />
                  تفضيلات النمط والسمة • Theme
                </label>

                <div className="space-y-2 pt-1">
                  {[
                    { id: 'golden', label: 'الذهبي الطقسي (Golden Liturgical)', icon: Sparkles },
                    { id: 'night', label: 'الليل القدسي (Holy Night Dark)', icon: Moon },
                    { id: 'desert', label: 'الصحراء المقدسة (Desert Monastic)', icon: Sun },
                  ].map((thm) => {
                    const ThmIcon = thm.icon;
                    return (
                      <button
                        key={thm.id}
                        type="button"
                        onClick={() => setThemePreference(thm.id as any)}
                        className={`w-full p-2.5 rounded-xl border text-right transition-all cursor-pointer flex items-center justify-between ${
                          themePreference === thm.id
                            ? 'bg-amber-500/15 border-amber-500/50 text-amber-200 shadow-md'
                            : 'bg-zinc-950 border-white/5 text-zinc-400 hover:text-zinc-200'
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          <ThmIcon className="w-4 h-4 text-amber-400 shrink-0" />
                          <span className="font-cairo font-bold text-xs">{thm.label}</span>
                        </div>
                        {themePreference === thm.id && (
                          <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* 4. Notification Preferences */}
            <div className="space-y-3 p-4 rounded-2xl bg-zinc-900/60 border border-white/5">
              <label className="block text-xs font-cairo font-bold text-amber-300 flex items-center gap-2">
                <Bell className="w-4 h-4 text-amber-400" />
                تفضيلات الإشعارات والتنبيهات • Notification Preferences
              </label>

              <div className="space-y-2.5 pt-1">
                {[
                  {
                    key: 'dailyScripture',
                    labelAr: 'إشعارات القراءات والتأملات اليومية',
                    descAr: 'تنبيه صبوحي بتأمل وقراءات يوم الصوم',
                  },
                  {
                    key: 'agpeyaReminders',
                    labelAr: 'تذكيرات صلوات السواعي (الأجبية)',
                    descAr: 'تنبيه أوقات الصلوات السبع اليومية',
                  },
                  {
                    key: 'journeyMilestones',
                    labelAr: 'تنبيهات إنجازات المسار وترقية المستويات',
                    descAr: 'إشعار فوري عند الحصول على وسام أو ارتقاء مستوى',
                  },
                  {
                    key: 'activitiesAndQuizzes',
                    labelAr: 'إشعارات الأنشطة التفاعلية والكلمات المتقاطعة',
                    descAr: 'تحديثات المسابقات والتحديات الجديدة',
                  },
                ].map((item) => {
                  const isChecked = notifications[item.key as keyof typeof notifications];
                  return (
                    <div
                      key={item.key}
                      onClick={() => handleToggleNotification(item.key as any)}
                      className="p-3 rounded-xl bg-zinc-950 border border-white/5 flex items-center justify-between cursor-pointer hover:border-amber-500/30 transition-all"
                    >
                      <div>
                        <h4 className="font-cairo font-bold text-xs text-amber-100">
                          {item.labelAr}
                        </h4>
                        <p className="text-[10px] font-tajawal text-zinc-400">
                          {item.descAr}
                        </p>
                      </div>

                      {/* Custom Toggle Switch */}
                      <div
                        className={`w-11 h-6 rounded-full transition-colors relative p-1 shrink-0 ${
                          isChecked ? 'bg-amber-500' : 'bg-zinc-800'
                        }`}
                      >
                        <div
                          className={`w-4 h-4 rounded-full bg-zinc-950 shadow-md transform transition-transform ${
                            isChecked ? '-translate-x-5' : 'translate-x-0'
                          }`}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Buttons Bar: Save & Cancel */}
            <div className="flex items-center justify-end gap-3 pt-2 border-t border-white/10">
              <button
                type="button"
                onClick={onClose}
                className="px-5 py-2.5 rounded-2xl bg-zinc-900 hover:bg-zinc-800 border border-white/10 text-zinc-300 font-cairo font-bold text-xs sm:text-sm transition-all cursor-pointer"
              >
                إلغاء • Cancel
              </button>

              <button
                type="submit"
                className="px-6 py-2.5 rounded-2xl bg-gradient-to-r from-amber-500 via-amber-400 to-amber-300 hover:brightness-110 text-amber-950 font-cairo font-black text-xs sm:text-sm flex items-center gap-2 transition-all cursor-pointer shadow-lg shadow-amber-500/20 active:scale-95"
              >
                <Save className="w-4 h-4" />
                <span>حفظ التغييرات • Save Changes</span>
              </button>
            </div>
          </form>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};
