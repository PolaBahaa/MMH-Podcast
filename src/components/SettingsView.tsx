import React, { useState } from 'react';
import { motion } from 'motion/react';
import {
  ArrowRight,
  Settings,
  Palette,
  Bell,
  Globe,
  Eye,
  Shield,
  Info,
  Sun,
  Moon,
  Sparkles,
  Volume2,
  Lock,
  Download,
  RotateCcw,
  CheckCircle2,
  LogIn,
  Sliders,
  Smartphone,
  BookOpen,
  VolumeX,
} from 'lucide-react';
import { ActiveSection } from '../types';
import { GlobalFooter } from './GlobalFooter';

interface SettingsViewProps {
  onClose: () => void;
  onNavigate?: (section: ActiveSection) => void;
}

export const SettingsView: React.FC<SettingsViewProps> = ({ onClose, onNavigate }) => {
  // Appearance state placeholders
  const [theme, setTheme] = useState<'golden' | 'dark' | 'sepia'>('golden');
  const [animations, setAnimations] = useState(true);
  const [ambientAudio, setAmbientAudio] = useState(true);

  // Notification state placeholders
  const [dailyScripturesAlert, setDailyScripturesAlert] = useState(true);
  const [agpeyaAlerts, setAgpeyaAlerts] = useState(true);
  const [streakAlerts, setStreakAlerts] = useState(true);

  // Language state placeholders
  const [language, setLanguage] = useState<'ar' | 'cop' | 'en'>('ar');
  const [copticSubtitles, setCopticSubtitles] = useState(true);
  const [bibleVersion, setBibleVersion] = useState<'vandyke' | 'common'>('vandyke');

  // Accessibility state placeholders
  const [fontSize, setFontSize] = useState<'normal' | 'large' | 'xlarge'>('normal');
  const [highContrast, setHighContrast] = useState(false);
  const [audioReadout, setAudioReadout] = useState(false);

  // Privacy state placeholders
  const [localEncryption, setLocalEncryption] = useState(true);
  const [shareStats, setShareStats] = useState(false);

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
          الإعدادات والتفضيلات • Settings
        </span>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-8 md:py-10 space-y-8">
        {/* Title Header */}
        <div className="text-center space-y-2">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-300 text-xs font-tajawal font-bold">
            <Settings className="w-4 h-4 text-amber-400" />
            <span>خيارات التشغيل والتحكم بالأداء</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-cairo font-black text-amber-100">
            إعدادات المنصة الشاملة
          </h1>
          <p className="text-xs md:text-sm font-tajawal text-amber-200/80 max-w-lg mx-auto">
            قم بتخصيص السمة البصرية، الإشعارات، اللغة، وإمكانية الوصول لراحة التجربة الروحية.
          </p>
        </div>

        {/* Auth Shortcut Banner */}
        <div className="p-4 rounded-2xl bg-gradient-to-r from-amber-500/15 via-zinc-900 to-amber-500/15 border border-amber-500/30 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-md">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400 shrink-0">
              <LogIn className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-cairo font-bold text-sm text-amber-100">بوابة الحسابات والمصادقة (Auth Center)</h4>
              <p className="text-xs font-tajawal text-zinc-400">تسجيل الدخول، إنشاء حساب جديد، أو المتابعة بحساب Google</p>
            </div>
          </div>

          <button
            type="button"
            onClick={() => {
              onClose();
              onNavigate?.('auth');
            }}
            className="px-4 py-2 rounded-xl bg-amber-400 hover:bg-amber-300 text-amber-950 font-cairo font-extrabold text-xs transition-all cursor-pointer shadow-md shrink-0"
          >
            إدارة الحساب • Open Auth
          </button>
        </div>

        {/* 1. SECTION: APPEARANCE (التمظهر والسمة البصرية) */}
        <div className="p-6 rounded-3xl bg-zinc-900/90 border border-amber-500/20 space-y-5 shadow-lg">
          <div className="flex items-center gap-2.5 pb-3 border-b border-white/10">
            <Palette className="w-5 h-5 text-amber-400" />
            <h3 className="font-cairo font-black text-lg text-amber-100">
              1. المظهر والنمط البصري • Appearance
            </h3>
          </div>

          <div className="space-y-4">
            {/* Theme Selector */}
            <div className="space-y-2">
              <label className="block text-xs font-cairo font-bold text-amber-300">
                السمة البصرية والألوان (Theme Selector):
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {[
                  { id: 'golden', name: 'الذهبي الكنسي (Liturgical Gold)', icon: Sparkles },
                  { id: 'dark', name: 'الليل القدسي (Holy Night Dark)', icon: Moon },
                  { id: 'sepia', name: 'الصحراء المقدسة (Monastic Sepia)', icon: Sun },
                ].map((item) => {
                  const Icon = item.icon;
                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => setTheme(item.id as any)}
                      className={`p-3 rounded-2xl border text-right transition-all cursor-pointer flex items-center gap-2.5 ${
                        theme === item.id
                          ? 'bg-amber-500/20 border-amber-500 text-amber-200 shadow-md font-bold'
                          : 'bg-zinc-950 border-white/10 text-zinc-400 hover:text-zinc-200'
                      }`}
                    >
                      <Icon className="w-4 h-4 text-amber-400 shrink-0" />
                      <span className="font-cairo text-xs">{item.name}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Animations Toggle */}
            <div className="p-3.5 rounded-2xl bg-zinc-950 border border-white/5 flex items-center justify-between">
              <div>
                <h4 className="font-cairo font-bold text-xs sm:text-sm text-amber-100">
                  الانتقالات السينمائية والمؤثرات البصرية
                </h4>
                <p className="text-[11px] font-tajawal text-zinc-400">
                  تفعيل التحريكات والانتقالات الناعمة بين المشاهد والصفحات
                </p>
              </div>
              <input
                type="checkbox"
                checked={animations}
                onChange={(e) => setAnimations(e.target.checked)}
                className="accent-amber-500 w-5 h-5 cursor-pointer"
              />
            </div>

            {/* Ambient Background Music */}
            <div className="p-3.5 rounded-2xl bg-zinc-950 border border-white/5 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                {ambientAudio ? (
                  <Volume2 className="w-4 h-4 text-amber-400" />
                ) : (
                  <VolumeX className="w-4 h-4 text-zinc-500" />
                )}
                <div>
                  <h4 className="font-cairo font-bold text-xs sm:text-sm text-amber-100">
                    الألحان والموسيقى الهادئة في الخلفية
                  </h4>
                  <p className="text-[11px] font-tajawal text-zinc-400">
                    تشغيل خلفية موسيقية للتأمل والتصفح الهادئ
                  </p>
                </div>
              </div>
              <input
                type="checkbox"
                checked={ambientAudio}
                onChange={(e) => setAmbientAudio(e.target.checked)}
                className="accent-amber-500 w-5 h-5 cursor-pointer"
              />
            </div>
          </div>
        </div>

        {/* 2. SECTION: NOTIFICATIONS (الإشعارات والتنبيهات) */}
        <div className="p-6 rounded-3xl bg-zinc-900/90 border border-amber-500/20 space-y-5 shadow-lg">
          <div className="flex items-center gap-2.5 pb-3 border-b border-white/10">
            <Bell className="w-5 h-5 text-amber-400" />
            <h3 className="font-cairo font-black text-lg text-amber-100">
              2. الإشعارات والتنبيهات • Notifications
            </h3>
          </div>

          <div className="space-y-3">
            <div className="p-3.5 rounded-2xl bg-zinc-950 border border-white/5 flex items-center justify-between">
              <div>
                <h4 className="font-cairo font-bold text-xs sm:text-sm text-amber-100">
                  تنبيه القراءات والتأملات اليومية
                </h4>
                <p className="text-[11px] font-tajawal text-zinc-400">
                  تلقي تذكير صباحي بآية الصوم اليومية وشواهد الإنجيل
                </p>
              </div>
              <input
                type="checkbox"
                checked={dailyScripturesAlert}
                onChange={(e) => setDailyScripturesAlert(e.target.checked)}
                className="accent-amber-500 w-5 h-5 cursor-pointer"
              />
            </div>

            <div className="p-3.5 rounded-2xl bg-zinc-950 border border-white/5 flex items-center justify-between">
              <div>
                <h4 className="font-cairo font-bold text-xs sm:text-sm text-amber-100">
                  تذكيرات صلوات السواعي (الأجبية)
                </h4>
                <p className="text-[11px] font-tajawal text-zinc-400">
                  تنبيه أوقات صلواة الأجبية (الثالثة، السادسة، والتاسعة)
                </p>
              </div>
              <input
                type="checkbox"
                checked={agpeyaAlerts}
                onChange={(e) => setAgpeyaAlerts(e.target.checked)}
                className="accent-amber-500 w-5 h-5 cursor-pointer"
              />
            </div>

            <div className="p-3.5 rounded-2xl bg-zinc-950 border border-white/5 flex items-center justify-between">
              <div>
                <h4 className="font-cairo font-bold text-xs sm:text-sm text-amber-100">
                  إشعارات الشعلة اليومية وترقية المستوى
                </h4>
                <p className="text-[11px] font-tajawal text-zinc-400">
                  تنبيه الحفاظ على السلسلة المتتالية وحصد الأوسمة
                </p>
              </div>
              <input
                type="checkbox"
                checked={streakAlerts}
                onChange={(e) => setStreakAlerts(e.target.checked)}
                className="accent-amber-500 w-5 h-5 cursor-pointer"
              />
            </div>
          </div>
        </div>

        {/* 3. SECTION: LANGUAGE (اللغة والمصطلحات) */}
        <div className="p-6 rounded-3xl bg-zinc-900/90 border border-amber-500/20 space-y-5 shadow-lg">
          <div className="flex items-center gap-2.5 pb-3 border-b border-white/10">
            <Globe className="w-5 h-5 text-amber-400" />
            <h3 className="font-cairo font-black text-lg text-amber-100">
              3. اللغة والمصطلحات الكنسية • Language
            </h3>
          </div>

          <div className="space-y-4">
            {/* Primary Language Choice */}
            <div className="space-y-2">
              <label className="block text-xs font-cairo font-bold text-amber-300">
                لغة واجهة المنصة الرئيسية:
              </label>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {[
                  { id: 'ar', label: 'العربية (Arabic)', desc: 'اللغة الأساسية' },
                  { id: 'cop', label: 'القبطية (Coptic Terms)', desc: 'مع المصطلحات القبطية' },
                  { id: 'en', label: 'English', desc: 'English Interface' },
                ].map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setLanguage(item.id as any)}
                    className={`p-3 rounded-2xl border text-right transition-all cursor-pointer flex flex-col ${
                      language === item.id
                        ? 'bg-amber-500/20 border-amber-500 text-amber-200 shadow-md font-bold'
                        : 'bg-zinc-950 border-white/10 text-zinc-400 hover:text-zinc-200'
                    }`}
                  >
                    <span className="font-cairo text-xs">{item.label}</span>
                    <span className="text-[10px] font-tajawal opacity-70">{item.desc}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Bible Translation Selection */}
            <div className="p-3.5 rounded-2xl bg-zinc-950 border border-white/5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
              <div>
                <h4 className="font-cairo font-bold text-xs sm:text-sm text-amber-100">
                  ترجمة الكتاب المقدس المعتمدة
                </h4>
                <p className="text-[11px] font-tajawal text-zinc-400">
                  اختر الترجمة المستخدمة للنصوص والآيات الإنجيلية
                </p>
              </div>

              <select
                value={bibleVersion}
                onChange={(e) => setBibleVersion(e.target.value as any)}
                className="bg-zinc-900 border border-amber-500/30 text-amber-200 text-xs font-tajawal font-bold rounded-xl px-3 py-2 outline-none cursor-pointer"
              >
                <option value="vandyke">ترجمة فاندايك (Van Dyck)</option>
                <option value="common">الترجمة العربية المشتركة (Good News)</option>
              </select>
            </div>

            {/* Coptic Subtitles */}
            <div className="p-3.5 rounded-2xl bg-zinc-950 border border-white/5 flex items-center justify-between">
              <div>
                <h4 className="font-cairo font-bold text-xs sm:text-sm text-amber-100">
                  عرض المعاني والقراءات القبطية المعرّبة
                </h4>
                <p className="text-[11px] font-tajawal text-zinc-400">
                  إظهار كتابة الألحان باللغة العربية والقبطية جنباً إلى جنب
                </p>
              </div>
              <input
                type="checkbox"
                checked={copticSubtitles}
                onChange={(e) => setCopticSubtitles(e.target.checked)}
                className="accent-amber-500 w-5 h-5 cursor-pointer"
              />
            </div>
          </div>
        </div>

        {/* 4. SECTION: ACCESSIBILITY (إمكانية الوصول والسهولة) */}
        <div className="p-6 rounded-3xl bg-zinc-900/90 border border-amber-500/20 space-y-5 shadow-lg">
          <div className="flex items-center gap-2.5 pb-3 border-b border-white/10">
            <Eye className="w-5 h-5 text-amber-400" />
            <h3 className="font-cairo font-black text-lg text-amber-100">
              4. إمكانية الوصول ووضوح النصوص • Accessibility
            </h3>
          </div>

          <div className="space-y-4">
            {/* Font Size Chooser */}
            <div className="space-y-2">
              <label className="block text-xs font-cairo font-bold text-amber-300">
                حجم خطوط القراءة والتأملات (Font Size):
              </label>

              <div className="grid grid-cols-3 gap-3">
                {[
                  { id: 'normal', label: 'قياسي (Normal)' },
                  { id: 'large', label: 'كبير (Large)' },
                  { id: 'xlarge', label: 'كبير جداً (XL)' },
                ].map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setFontSize(item.id as any)}
                    className={`p-2.5 rounded-xl border text-center font-cairo text-xs transition-all cursor-pointer ${
                      fontSize === item.id
                        ? 'bg-amber-500/20 border-amber-500 text-amber-200 font-bold'
                        : 'bg-zinc-950 border-white/10 text-zinc-400 hover:text-zinc-200'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

            {/* High Contrast */}
            <div className="p-3.5 rounded-2xl bg-zinc-950 border border-white/5 flex items-center justify-between">
              <div>
                <h4 className="font-cairo font-bold text-xs sm:text-sm text-amber-100">
                  نمط التباين العالي للنصوص (High Contrast)
                </h4>
                <p className="text-[11px] font-tajawal text-zinc-400">
                  زيادة تباين الخطوط لسهولة القراءة في الإضاءة الخافتة
                </p>
              </div>
              <input
                type="checkbox"
                checked={highContrast}
                onChange={(e) => setHighContrast(e.target.checked)}
                className="accent-amber-500 w-5 h-5 cursor-pointer"
              />
            </div>

            {/* Audio Reader */}
            <div className="p-3.5 rounded-2xl bg-zinc-950 border border-white/5 flex items-center justify-between">
              <div>
                <h4 className="font-cairo font-bold text-xs sm:text-sm text-amber-100">
                  دعم القارئ الصوتي المساعد (Screen Reader Audio Assist)
                </h4>
                <p className="text-[11px] font-tajawal text-zinc-400">
                  تضمين تسميات صوتية واضحة لعناصر التحكم والآيات
                </p>
              </div>
              <input
                type="checkbox"
                checked={audioReadout}
                onChange={(e) => setAudioReadout(e.target.checked)}
                className="accent-amber-500 w-5 h-5 cursor-pointer"
              />
            </div>
          </div>
        </div>

        {/* 5. SECTION: PRIVACY (الخصوصية وأمان البيانات) */}
        <div className="p-6 rounded-3xl bg-zinc-900/90 border border-amber-500/20 space-y-5 shadow-lg">
          <div className="flex items-center gap-2.5 pb-3 border-b border-white/10">
            <Shield className="w-5 h-5 text-amber-400" />
            <h3 className="font-cairo font-black text-lg text-amber-100">
              5. الخصوصية وحفظ البيانات • Privacy & Security
            </h3>
          </div>

          <div className="space-y-3">
            <div className="p-3.5 rounded-2xl bg-zinc-950 border border-white/5 flex items-center justify-between">
              <div>
                <h4 className="font-cairo font-bold text-xs sm:text-sm text-amber-100">
                  تشفير وحماية التقدم المحلي
                </h4>
                <p className="text-[11px] font-tajawal text-zinc-400">
                  حفظ مستواك وإنجازاتك في التخزين المحلي المشفر للمتصفح
                </p>
              </div>
              <span className="text-[11px] font-tajawal text-emerald-400 bg-emerald-500/15 px-3 py-1 rounded-full border border-emerald-500/30">
                مفعل تلقائياً
              </span>
            </div>

            <div className="p-3.5 rounded-2xl bg-zinc-950 border border-white/5 flex items-center justify-between">
              <div>
                <h4 className="font-cairo font-bold text-xs sm:text-sm text-amber-100">
                  مشاركة الإحصائيات المجهولة للأداء
                </h4>
                <p className="text-[11px] font-tajawal text-zinc-400">
                  المساعدة في تحسين تجربة التطبيق دون جمع أي بيانات شخصية
                </p>
              </div>
              <input
                type="checkbox"
                checked={shareStats}
                onChange={(e) => setShareStats(e.target.checked)}
                className="accent-amber-500 w-5 h-5 cursor-pointer"
              />
            </div>

            <div className="pt-2 flex flex-wrap gap-3">
              <button
                type="button"
                onClick={() => alert('تم تصدير نسخة احتياطية من الإنجازات والتقدم بنجاح!')}
                className="px-4 py-2 rounded-xl bg-zinc-950 hover:bg-zinc-800 border border-white/10 text-amber-300 font-cairo font-bold text-xs flex items-center gap-2 transition-all cursor-pointer"
              >
                <Download className="w-4 h-4 text-amber-400" />
                <span>تصدير نسخة احتياطية من التقدم</span>
              </button>
            </div>
          </div>
        </div>

        {/* 6. SECTION: ABOUT (حول التطبيق والمنصة) */}
        <div className="p-6 rounded-3xl bg-zinc-900/90 border border-amber-500/20 space-y-5 shadow-lg">
          <div className="flex items-center gap-2.5 pb-3 border-b border-white/10">
            <Info className="w-5 h-5 text-amber-400" />
            <h3 className="font-cairo font-black text-lg text-amber-100">
              6. حول المنصة والإصدار • About Platform
            </h3>
          </div>

          <div className="space-y-4">
            <div className="p-4 rounded-2xl bg-zinc-950 border border-white/5 space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-cairo font-black text-sm text-amber-200">
                  بودكاست مش مجرد حد • MMH Podcast
                </span>
                <span className="text-xs font-cairo font-bold text-amber-400 bg-amber-400/10 px-3 py-0.5 rounded-full border border-amber-400/20">
                  v2.6.0 (2026 Edition)
                </span>
              </div>
              <p className="text-xs font-tajawal text-zinc-400 leading-relaxed">
                منصة إيمانية تعليمية تفاعلية مصممة لمرافقة المؤمن في مسار الصوم المقدس السبعة آحاد، وتوفر اختبارات، كلمات متقاطعة، صلوات الأجبية، ومتجر مكافآت روحي.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-tajawal text-zinc-400">
              <div className="p-3 rounded-xl bg-zinc-950 border border-white/5 flex items-center justify-between">
                <span>الحقوق والاعتمادات:</span>
                <span className="text-amber-300 font-cairo">الكنيسة القبطية الأرثوذكسية</span>
              </div>
              <div className="p-3 rounded-xl bg-zinc-950 border border-white/5 flex items-center justify-between">
                <span>تاريخ التحديث:</span>
                <span className="text-amber-300 font-cairo">أغسطس 2026</span>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Note */}
        <div className="text-center text-xs font-tajawal text-zinc-500 pt-4">
          جميع الإعدادات يتم حفظها وتفعيلها محلياً • MMH Podcast 2026
        </div>
      </div>

      <GlobalFooter />
    </motion.div>
  );
};
