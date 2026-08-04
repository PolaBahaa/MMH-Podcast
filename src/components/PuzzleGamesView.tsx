import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight, Puzzle, Sparkles, Gamepad2 } from 'lucide-react';
import { SceneData } from '../types';
import { GlobalFooter } from './GlobalFooter';

interface PuzzleGamesViewProps {
  scene: SceneData;
  onClose: () => void;
}

export const PuzzleGamesView: React.FC<PuzzleGamesViewProps> = ({ scene, onClose }) => {
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
          ألعاب الألغاز • Puzzle Games Section
        </span>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-8 space-y-8">
        <div className="text-center space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-300 text-xs font-tajawal font-bold">
            <Gamepad2 className="w-4 h-4" />
            <span>ألغاز {scene.sundayTitle}</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-cairo font-black text-amber-100">
            ألعاب الألغاز والتحديات الذهنية
          </h1>
          <p className="text-sm md:text-base font-tajawal text-amber-200/80">
            ألغاز صور تفاعلية، وترتيب الأحداث الكتابية بطريقة شيقة وممتعة.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-6 rounded-2xl bg-zinc-900 border border-white/10 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-purple-500/20 text-purple-300 flex items-center justify-center border border-purple-500/30">
              <Puzzle className="w-5 h-5" />
            </div>
            <h3 className="font-cairo font-bold text-lg text-amber-100">
              لغز تركيب المشهد الكتابي
            </h3>
            <p className="font-tajawal text-xs md:text-sm text-zinc-300">
              قم بإعادة ترتيب قطع الصورة الفنية الخاصة بالمشهد لإكمال اللوحة.
            </p>
            <span className="inline-block text-xs font-tajawal font-bold text-amber-400 bg-amber-400/10 px-3 py-1 rounded-md">
              هيكل اللعبة جاهز
            </span>
          </div>

          <div className="p-6 rounded-2xl bg-zinc-900 border border-white/10 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-300 flex items-center justify-center border border-amber-500/30">
              <Sparkles className="w-5 h-5" />
            </div>
            <h3 className="font-cairo font-bold text-lg text-amber-100">
              ترتيب التسلسل الزمني للأحداث
            </h3>
            <p className="font-tajawal text-xs md:text-sm text-zinc-300">
              ضع الأحداث والمواقف الكتابية بالترتيب الصحيح كرتولوجي وفق الإنجيل.
            </p>
            <span className="inline-block text-xs font-tajawal font-bold text-amber-400 bg-amber-400/10 px-3 py-1 rounded-md">
              هيكل اللعبة جاهز
            </span>
          </div>
        </div>
      </div>

      <GlobalFooter />
    </motion.div>
  );
};
