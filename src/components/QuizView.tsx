import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { ArrowRight, HelpCircle, Award, CheckCircle } from 'lucide-react';
import { SceneData } from '../types';
import { SkeletonBlock } from './SkeletonLoaders';
import { GlobalFooter } from './GlobalFooter';

interface QuizViewProps {
  scene: SceneData;
  onClose: () => void;
}

export const QuizView: React.FC<QuizViewProps> = ({ scene, onClose }) => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 450);
    return () => clearTimeout(timer);
  }, []);

  return (

    <motion.div
      className="fixed inset-0 z-50 overflow-y-auto bg-black/95 backdrop-blur-2xl text-white dir-rtl select-none"
      initial={{ opacity: 0, scale: 0.98, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.98, y: 20 }}
      transition={{ duration: 0.3 }}
    >
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
          قسم الاختبارات والتحديات • Quiz Section
        </span>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-8 space-y-8">
        {isLoading ? (
          <div className="space-y-6">
            <div className="text-center space-y-2 flex flex-col items-center">
              <SkeletonBlock className="h-6 w-40 rounded-full" />
              <SkeletonBlock className="h-10 w-60 rounded-xl" />
              <SkeletonBlock className="h-4 w-72 rounded-md" />
            </div>
            <div className="p-8 rounded-2xl bg-zinc-900 border border-amber-500/30 flex flex-col items-center space-y-6">
              <SkeletonBlock className="w-16 h-16 rounded-full" />
              <SkeletonBlock className="h-6 w-48 rounded-md" />
              <SkeletonBlock className="h-4 w-64 rounded-md" />
              <div className="grid grid-cols-3 gap-4 w-full max-w-sm">
                <SkeletonBlock className="h-16 rounded-xl" />
                <SkeletonBlock className="h-16 rounded-xl" />
                <SkeletonBlock className="h-16 rounded-xl" />
              </div>
              <SkeletonBlock className="h-12 w-48 rounded-xl" />
            </div>
          </div>
        ) : (
          <>
            <div className="text-center space-y-2">

          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-300 text-xs font-tajawal font-bold">
            <HelpCircle className="w-4 h-4" />
            <span>اختبار الحلقة {scene.episodeNumber}</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-cairo font-black text-amber-100">
            اختبار استيعاب الحلقة
          </h1>
          <p className="text-sm md:text-base font-tajawal text-amber-200/80">
            اختبر معلوماتك وفهمك للشواهد والدروس المستفادة من {scene.sundayTitle}.
          </p>
        </div>

        <div className="p-8 rounded-2xl bg-zinc-900 border border-amber-500/30 text-center space-y-6">
          <div className="w-16 h-16 mx-auto rounded-full bg-amber-500/20 text-amber-400 flex items-center justify-center border border-amber-500/40">
            <Award className="w-8 h-8" />
          </div>

          <div className="space-y-2">
            <h3 className="font-cairo font-extrabold text-xl text-amber-100">
              اختبار {scene.sundayTitle}
            </h3>
            <p className="font-tajawal text-sm text-zinc-300">
              5 أسئلة تفاعلية • مكافأة: +100 XP و 20 قطعة نقدية
            </p>
          </div>

          <div className="grid grid-cols-3 gap-4 max-w-sm mx-auto pt-2">
            <div className="p-3 rounded-xl bg-black/40 border border-white/10">
              <span className="block text-xs font-tajawal text-zinc-400">الأسئلة</span>
              <span className="font-cairo font-bold text-lg text-amber-300">5</span>
            </div>
            <div className="p-3 rounded-xl bg-black/40 border border-white/10">
              <span className="block text-xs font-tajawal text-zinc-400">الوقت</span>
              <span className="font-cairo font-bold text-lg text-amber-300">5 د</span>
            </div>
            <div className="p-3 rounded-xl bg-black/40 border border-white/10">
              <span className="block text-xs font-tajawal text-zinc-400">النقاط</span>
              <span className="font-cairo font-bold text-lg text-amber-300">100</span>
            </div>
          </div>

          <div className="pt-4">
            <span className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full font-tajawal font-bold text-sm bg-amber-500/20 text-amber-300 border border-amber-500/40">
              <CheckCircle className="w-4 h-4" />
              هيكل قسم الاختبارات جاهز للتفعيل في السبرينت القادم
            </span>
          </div>
        </div>
          </>
        )}
      </div>

      <GlobalFooter />
    </motion.div>
  );
};
