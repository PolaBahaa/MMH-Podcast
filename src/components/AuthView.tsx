import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { GlobalFooter } from './GlobalFooter';
import {
  X,
  ArrowRight,
  User,
  Mail,
  Lock,
  Eye,
  EyeOff,
  ShieldCheck,
  LogIn,
  UserPlus,
  Sparkles,
  CheckCircle2,
  AlertCircle,
  KeyRound,
  Info,
} from 'lucide-react';

interface AuthViewProps {
  onClose: () => void;
  onLoginSuccess?: (userName?: string) => void;
}

export const AuthView: React.FC<AuthViewProps> = ({ onClose, onLoginSuccess }) => {
  const [activeTab, setActiveTab] = useState<'signin' | 'signup'>('signin');

  // Form fields for Sign In
  const [signInEmail, setSignInEmail] = useState('');
  const [signInPassword, setSignInPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(true);
  const [showSignInPassword, setShowSignInPassword] = useState(false);

  // Form fields for Create Account
  const [signUpName, setSignUpName] = useState('');
  const [signUpEmail, setSignUpEmail] = useState('');
  const [signUpPassword, setSignUpPassword] = useState('');
  const [signUpConfirmPassword, setSignUpConfirmPassword] = useState('');
  const [agreeTerms, setAgreeTerms] = useState(true);
  const [showSignUpPassword, setShowSignUpPassword] = useState(false);

  // Loading & Toast States
  const [isLoading, setIsLoading] = useState(false);
  const [loadingType, setLoadingType] = useState<'google' | 'guest' | 'signin' | 'signup' | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [toastType, setToastType] = useState<'success' | 'info' | 'error'>('success');

  const showToast = (msg: string, type: 'success' | 'info' | 'error' = 'success') => {
    setToastMessage(msg);
    setToastType(type);
    setTimeout(() => {
      setToastMessage(null);
    }, 3500);
  };

  // Action: Continue with Google (Placeholder)
  const handleGoogleAuth = () => {
    setIsLoading(true);
    setLoadingType('google');

    setTimeout(() => {
      setIsLoading(false);
      setLoadingType(null);
      showToast('🎉 تم تسجيل الدخول بواسطة حساب Google بنجاح!', 'success');
      if (onLoginSuccess) onLoginSuccess('مستخدم Google');
      setTimeout(() => {
        onClose();
      }, 1200);
    }, 1000);
  };

  // Action: Continue as Guest (Placeholder)
  const handleGuestAuth = () => {
    setIsLoading(true);
    setLoadingType('guest');

    setTimeout(() => {
      setIsLoading(false);
      setLoadingType(null);
      showToast('✨ مرحباً بك! تم تفعيل وضع الزائر المستكشف.', 'info');
      if (onLoginSuccess) onLoginSuccess('زائر مستكشف');
      setTimeout(() => {
        onClose();
      }, 1200);
    }, 800);
  };

  // Action: Sign In Submit
  const handleSignInSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!signInEmail || !signInPassword) {
      showToast('يرجى ملء جميع الحقول المطلوبة.', 'error');
      return;
    }

    setIsLoading(true);
    setLoadingType('signin');

    setTimeout(() => {
      setIsLoading(false);
      setLoadingType(null);
      showToast('✅ مرحباً بعودتك! تم تسجيل الدخول بنجاح.', 'success');
      if (onLoginSuccess) onLoginSuccess(signInEmail.split('@')[0] || 'المعلم الروحي');
      setTimeout(() => {
        onClose();
      }, 1200);
    }, 1000);
  };

  // Action: Create Account Submit
  const handleSignUpSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!signUpName || !signUpEmail || !signUpPassword) {
      showToast('يرجى إدخال كافة البيانات المطلوبة.', 'error');
      return;
    }

    if (signUpPassword !== signUpConfirmPassword) {
      showToast('كلمتا المرور غير متطابقتين!', 'error');
      return;
    }

    if (!agreeTerms) {
      showToast('يرجى الموافقة على الشروط والأحكام للمتابعة.', 'error');
      return;
    }

    setIsLoading(true);
    setLoadingType('signup');

    setTimeout(() => {
      setIsLoading(false);
      setLoadingType(null);
      showToast(`🎉 تم إنشاء الحساب بنجاح! أهلاً بك يا ${signUpName}`, 'success');
      if (onLoginSuccess) onLoginSuccess(signUpName);
      setTimeout(() => {
        onClose();
      }, 1200);
    }, 1200);
  };

  // Action: Forgot Password
  const handleForgotPassword = () => {
    if (!signInEmail) {
      showToast('أدخل بريدك الإلكتروني أولاً لإرسال رابط الاستعادة.', 'info');
    } else {
      showToast(`تم إرسال رابط استعادة كلمة المرور إلى ${signInEmail}`, 'success');
    }
  };

  return (
    <motion.div
      className="fixed inset-0 z-50 overflow-y-auto bg-black/95 backdrop-blur-2xl text-white dir-rtl select-none flex items-center justify-center p-4 sm:p-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      {/* Toast Notification */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.9 }}
            className={`fixed top-6 z-50 px-5 py-3 rounded-2xl border shadow-[0_10px_30px_rgba(0,0,0,0.8)] font-cairo font-bold text-xs sm:text-sm flex items-center gap-3 dir-rtl ${
              toastType === 'success'
                ? 'bg-amber-500/20 border-amber-500/40 text-amber-200'
                : toastType === 'error'
                ? 'bg-red-500/20 border-red-500/40 text-red-200'
                : 'bg-sky-500/20 border-sky-500/40 text-sky-200'
            }`}
          >
            {toastType === 'success' ? (
              <CheckCircle2 className="w-5 h-5 text-amber-400 shrink-0" />
            ) : toastType === 'error' ? (
              <AlertCircle className="w-5 h-5 text-red-400 shrink-0" />
            ) : (
              <Info className="w-5 h-5 text-sky-400 shrink-0" />
            )}
            <span>{toastMessage}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Container Card */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        transition={{ duration: 0.3 }}
        className="relative w-full max-w-lg bg-zinc-950/90 border border-amber-500/30 rounded-3xl p-6 sm:p-8 shadow-[0_25px_60px_rgba(0,0,0,0.9)] overflow-hidden my-auto"
      >
        {/* Background Ambient Golden Glow */}
        <div className="absolute -top-24 -right-24 w-60 h-60 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 w-60 h-60 bg-amber-600/10 rounded-full blur-3xl pointer-events-none" />

        {/* Top Header Bar */}
        <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-6">
          <button
            type="button"
            onClick={onClose}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full font-tajawal font-bold text-xs text-amber-200/80 bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/20 transition-all cursor-pointer"
          >
            <ArrowRight className="w-3.5 h-3.5 text-amber-400" />
            <span>إغلاق • Close</span>
          </button>

          <span className="text-xs font-tajawal font-extrabold text-amber-400 bg-amber-400/10 px-3 py-1 rounded-full border border-amber-400/20">
            الوحدة 6 • المصادقة (Auth)
          </span>
        </div>

        {/* Cinematic Branding Title */}
        <div className="text-center space-y-2 mb-6">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-gradient-to-tr from-amber-500 via-amber-400 to-amber-300 text-zinc-950 font-cairo font-black text-xl shadow-[0_0_20px_rgba(251,191,36,0.4)] mx-auto mb-1">
            ✝
          </div>
          <h1 className="text-2xl sm:text-3xl font-cairo font-black text-amber-100 tracking-tight">
            بودكاست مش مجرد حد
          </h1>
          <p className="text-xs sm:text-sm font-tajawal text-amber-200/80 max-w-xs mx-auto">
            بوابة الانتساب وتسجيل الدخول لحفظ إنجازاتك ومتابعة مسارك الروحي
          </p>
        </div>

        {/* Quick Fast-Auth Buttons (Google & Guest) */}
        <div className="space-y-3 mb-6">
          {/* Continue with Google */}
          <button
            type="button"
            onClick={handleGoogleAuth}
            disabled={isLoading}
            className="w-full py-3.5 px-4 rounded-2xl bg-zinc-900 hover:bg-zinc-800 border border-white/15 hover:border-amber-500/40 font-cairo font-bold text-xs sm:text-sm text-zinc-100 flex items-center justify-center gap-3 transition-all cursor-pointer shadow-md active:scale-98 disabled:opacity-50"
          >
            {isLoading && loadingType === 'google' ? (
              <div className="w-5 h-5 border-2 border-amber-400 border-t-transparent rounded-full animate-spin" />
            ) : (
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.665-5.17 3.665-9.17z"
                />
                <path
                  fill="#34A853"
                  d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.23v3.13C3.21 21.32 7.31 24 12 24z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.28 14.25c-.25-.72-.38-1.49-.38-2.25s.13-1.53.38-2.25V6.62H1.23C.44 8.2.01 10.03.01 12s.43 3.8 1.22 5.38l4.05-3.13z"
                />
                <path
                  fill="#EA4335"
                  d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.31 0 3.21 2.68 1.23 6.62l4.05 3.13c.95-2.83 3.6-4.93 6.72-4.93z"
                />
              </svg>
            )}
            <span>المتابعة باستخدام Google • Continue with Google</span>
          </button>

          {/* Continue as Guest */}
          <button
            type="button"
            onClick={handleGuestAuth}
            disabled={isLoading}
            className="w-full py-3 px-4 rounded-2xl bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/30 text-amber-300 font-cairo font-bold text-xs sm:text-sm flex items-center justify-center gap-2.5 transition-all cursor-pointer shadow-sm active:scale-98 disabled:opacity-50"
          >
            {isLoading && loadingType === 'guest' ? (
              <div className="w-4 h-4 border-2 border-amber-400 border-t-transparent rounded-full animate-spin" />
            ) : (
              <Sparkles className="w-4 h-4 text-amber-400" />
            )}
            <span>المتابعة كزائر • Continue as Guest</span>
          </button>
        </div>

        {/* Divider */}
        <div className="relative flex items-center justify-center my-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-white/10" />
          </div>
          <span className="relative bg-zinc-950 px-4 text-[11px] font-tajawal font-bold text-zinc-500 uppercase">
            أو باستخدام البريد • Or via Email
          </span>
        </div>

        {/* Sign In / Create Account Tab Switcher */}
        <div className="grid grid-cols-2 p-1 rounded-2xl bg-zinc-900 border border-white/10 mb-6">
          <button
            type="button"
            onClick={() => setActiveTab('signin')}
            className={`py-2.5 rounded-xl font-cairo font-extrabold text-xs sm:text-sm transition-all cursor-pointer flex items-center justify-center gap-2 ${
              activeTab === 'signin'
                ? 'bg-amber-500 text-amber-950 shadow-lg shadow-amber-500/20'
                : 'text-zinc-400 hover:text-amber-200'
            }`}
          >
            <LogIn className="w-4 h-4" />
            <span>تسجيل الدخول</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('signup')}
            className={`py-2.5 rounded-xl font-cairo font-extrabold text-xs sm:text-sm transition-all cursor-pointer flex items-center justify-center gap-2 ${
              activeTab === 'signup'
                ? 'bg-amber-500 text-amber-950 shadow-lg shadow-amber-500/20'
                : 'text-zinc-400 hover:text-amber-200'
            }`}
          >
            <UserPlus className="w-4 h-4" />
            <span>إنشاء حساب جديد</span>
          </button>
        </div>

        {/* Form Area */}
        <AnimatePresence mode="wait">
          {activeTab === 'signin' ? (
            /* Sign In Form */
            <motion.form
              key="signin-form"
              initial={{ opacity: 0, x: -15 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 15 }}
              onSubmit={handleSignInSubmit}
              className="space-y-4"
            >
              {/* Email Input */}
              <div className="space-y-1">
                <label className="block text-xs font-cairo font-bold text-amber-200 text-right">
                  البريد الإلكتروني • Email
                </label>
                <div className="relative">
                  <Mail className="absolute right-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
                  <input
                    type="email"
                    value={signInEmail}
                    onChange={(e) => setSignInEmail(e.target.value)}
                    placeholder="example@domain.com"
                    className="w-full pr-10 pl-4 py-3 rounded-2xl bg-zinc-900 border border-white/10 focus:border-amber-500 text-xs sm:text-sm font-tajawal text-amber-100 placeholder-zinc-600 outline-none transition-all"
                  />
                </div>
              </div>

              {/* Password Input */}
              <div className="space-y-1">
                <label className="block text-xs font-cairo font-bold text-amber-200 text-right">
                  كلمة المرور • Password
                </label>
                <div className="relative">
                  <Lock className="absolute right-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
                  <input
                    type={showSignInPassword ? 'text' : 'password'}
                    value={signInPassword}
                    onChange={(e) => setSignInPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full pr-10 pl-11 py-3 rounded-2xl bg-zinc-900 border border-white/10 focus:border-amber-500 text-xs sm:text-sm font-tajawal text-amber-100 placeholder-zinc-600 outline-none transition-all"
                  />
                  <button
                    type="button"
                    onClick={() => setShowSignInPassword(!showSignInPassword)}
                    className="absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-amber-300 transition-colors cursor-pointer"
                  >
                    {showSignInPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* Remember Me & Forgot Password */}
              <div className="flex items-center justify-between text-xs font-tajawal pt-1">
                <label className="flex items-center gap-2 text-zinc-400 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="accent-amber-500 w-4 h-4 rounded cursor-pointer"
                  />
                  <span>تذكر بياناتي • Remember me</span>
                </label>

                <button
                  type="button"
                  onClick={handleForgotPassword}
                  className="text-amber-400 hover:underline cursor-pointer"
                >
                  نسيت كلمة المرور؟
                </button>
              </div>

              {/* Submit Sign In Button */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full mt-2 py-3.5 rounded-2xl bg-gradient-to-r from-amber-500 via-amber-400 to-amber-300 hover:brightness-110 text-amber-950 font-cairo font-black text-sm flex items-center justify-center gap-2 transition-all cursor-pointer shadow-lg shadow-amber-500/20 active:scale-98 disabled:opacity-50"
              >
                {isLoading && loadingType === 'signin' ? (
                  <div className="w-5 h-5 border-2 border-amber-950 border-t-transparent rounded-full animate-spin" />
                ) : (
                  <>
                    <LogIn className="w-4 h-4" />
                    <span>تسجيل الدخول • Sign In</span>
                  </>
                )}
              </button>
            </motion.form>
          ) : (
            /* Create Account Form */
            <motion.form
              key="signup-form"
              initial={{ opacity: 0, x: 15 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -15 }}
              onSubmit={handleSignUpSubmit}
              className="space-y-3.5"
            >
              {/* Full Name Input */}
              <div className="space-y-1">
                <label className="block text-xs font-cairo font-bold text-amber-200 text-right">
                  الاسم الكامل • Full Name
                </label>
                <div className="relative">
                  <User className="absolute right-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
                  <input
                    type="text"
                    value={signUpName}
                    onChange={(e) => setSignUpName(e.target.value)}
                    placeholder="الاسم الثلاثي (مثال: فادي القمص)"
                    className="w-full pr-10 pl-4 py-2.5 rounded-2xl bg-zinc-900 border border-white/10 focus:border-amber-500 text-xs sm:text-sm font-tajawal text-amber-100 placeholder-zinc-600 outline-none transition-all"
                  />
                </div>
              </div>

              {/* Email Input */}
              <div className="space-y-1">
                <label className="block text-xs font-cairo font-bold text-amber-200 text-right">
                  البريد الإلكتروني • Email Address
                </label>
                <div className="relative">
                  <Mail className="absolute right-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
                  <input
                    type="email"
                    value={signUpEmail}
                    onChange={(e) => setSignUpEmail(e.target.value)}
                    placeholder="name@domain.com"
                    className="w-full pr-10 pl-4 py-2.5 rounded-2xl bg-zinc-900 border border-white/10 focus:border-amber-500 text-xs sm:text-sm font-tajawal text-amber-100 placeholder-zinc-600 outline-none transition-all"
                  />
                </div>
              </div>

              {/* Password Input */}
              <div className="space-y-1">
                <label className="block text-xs font-cairo font-bold text-amber-200 text-right">
                  كلمة المرور • Password
                </label>
                <div className="relative">
                  <Lock className="absolute right-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
                  <input
                    type={showSignUpPassword ? 'text' : 'password'}
                    value={signUpPassword}
                    onChange={(e) => setSignUpPassword(e.target.value)}
                    placeholder="6 أحرف/أرقام على الأقل"
                    className="w-full pr-10 pl-11 py-2.5 rounded-2xl bg-zinc-900 border border-white/10 focus:border-amber-500 text-xs sm:text-sm font-tajawal text-amber-100 placeholder-zinc-600 outline-none transition-all"
                  />
                  <button
                    type="button"
                    onClick={() => setShowSignUpPassword(!showSignUpPassword)}
                    className="absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-amber-300 transition-colors cursor-pointer"
                  >
                    {showSignUpPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* Confirm Password Input */}
              <div className="space-y-1">
                <label className="block text-xs font-cairo font-bold text-amber-200 text-right">
                  تأكيد كلمة المرور • Confirm Password
                </label>
                <div className="relative">
                  <ShieldCheck className="absolute right-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
                  <input
                    type="password"
                    value={signUpConfirmPassword}
                    onChange={(e) => setSignUpConfirmPassword(e.target.value)}
                    placeholder="إعادة كتابة كلمة المرور"
                    className="w-full pr-10 pl-4 py-2.5 rounded-2xl bg-zinc-900 border border-white/10 focus:border-amber-500 text-xs sm:text-sm font-tajawal text-amber-100 placeholder-zinc-600 outline-none transition-all"
                  />
                </div>
              </div>

              {/* Terms Agreement Checkbox */}
              <div className="pt-1">
                <label className="flex items-start gap-2 text-[11px] font-tajawal text-zinc-400 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={agreeTerms}
                    onChange={(e) => setAgreeTerms(e.target.checked)}
                    className="accent-amber-500 w-4 h-4 rounded mt-0.5 cursor-pointer shrink-0"
                  />
                  <span>
                    أوافق على{' '}
                    <span className="text-amber-400 underline">شروط الاستخدام</span>{' '}
                    و<span className="text-amber-400 underline">سياسة الخصوصية</span>{' '}
                    الخاصة بمنصة بودكاست مش مجرد حد.
                  </span>
                </label>
              </div>

              {/* Submit Create Account Button */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full mt-2 py-3.5 rounded-2xl bg-gradient-to-r from-amber-500 via-amber-400 to-amber-300 hover:brightness-110 text-amber-950 font-cairo font-black text-sm flex items-center justify-center gap-2 transition-all cursor-pointer shadow-lg shadow-amber-500/20 active:scale-98 disabled:opacity-50"
              >
                {isLoading && loadingType === 'signup' ? (
                  <div className="w-5 h-5 border-2 border-amber-950 border-t-transparent rounded-full animate-spin" />
                ) : (
                  <>
                    <UserPlus className="w-4 h-4" />
                    <span>إنشاء حساب جديد • Create Account</span>
                  </>
                )}
              </button>
            </motion.form>
          )}
        </AnimatePresence>

        {/* Footer info note */}
        <div className="mt-6 pt-4 border-t border-white/10 text-center">
          <p className="text-[11px] font-tajawal text-zinc-500">
            جميع البيانات مشفرة وآمنة • MMH Podcast 2026
          </p>
        </div>
      </motion.div>

      <GlobalFooter />
    </motion.div>
  );
};
