import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight, Grid, Key } from 'lucide-react';
import { SceneData } from '../types';
import { GlobalFooter } from './GlobalFooter';

interface CrosswordViewProps {
  scene: SceneData;
  onClose: () => void;
}

export const CrosswordView: React.FC<CrosswordViewProps> = ({ scene, onClose }) => {
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
          الكلمات المتقاطعة • Crossword Section
        </span>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-8 space-y-8">
        <div className="text-center space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-300 text-xs font-tajawal font-bold">
            <Grid className="w-4 h-4" />
            <span>شبكة أفكار {scene.sundayTitle}</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-cairo font-black text-amber-100">
            لعبة الكلمات المتقاطعة الإيمانية
          </h1>
          <p className="text-sm md:text-base font-tajawal text-amber-200/80">
            اكتشف المفردات والشواهد الكتابية وأسماء الشخصيات من خلال شبكة الكلمات المتقاطعة.
          </p>
        </div>

        <div className="p-8 rounded-2xl bg-zinc-900 border border-amber-500/30 text-center space-y-6">
          <div className="w-16 h-16 mx-auto rounded-full bg-amber-500/20 text-amber-400 flex items-center justify-center border border-amber-500/40">
            <Key className="w-8 h-8" />
          </div>

          <h3 className="font-cairo font-bold text-xl text-amber-100">
            شبكة كلمات {scene.sundayTitle}
          </h3>

          <div className="grid grid-cols-5 gap-2 max-w-xs mx-auto p-4 bg-black/50 rounded-xl border border-white/10 opacity-75">
            {Array.from({ length: 15 }).map((_, i) => (
              <div
                key={i}
                className="w-10 h-10 rounded-lg bg-zinc-800 border border-amber-500/30 flex items-center justify-center font-bold text-amber-300 font-cairo text-sm"
              >
                {i % 3 === 0 ? 'ك' : i % 2 === 0 ? 'ن' : 'ز'}
              </div>
            ))}
          </div>

          <p className="font-tajawal text-xs md:text-sm text-zinc-400">
            تم إعداد هيكل واجهة الكلمات المتقاطعة وسوف يتم ربط الألغاز تفاعلياً.
          </p>
        </div>
      </div>

      <GlobalFooter />
    </motion.div>
  );
};
