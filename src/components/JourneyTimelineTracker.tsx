import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Sparkles,
  CheckCircle2,
  Clock,
  Lock,
  Compass,
  ChevronRight,
  Tv,
  Award,
  BookOpen,
  ChevronLeft,
} from 'lucide-react';
import { ActiveSection } from '../types';
import { USER_ECONOMY_DATA } from '../data/economyData';

export interface SundayMilestone {
  id: number;
  titleAr: string;
  titleEn: string;
  theme: string;
  scripture: string;
  status: 'completed' | 'current' | 'upcoming';
  progressPercent: number;
  xpReward: number;
  unlockedAt?: string;
}

export const SUNDAY_MILESTONES: SundayMilestone[] = [
  {
    id: 1,
    titleAr: 'أحد الكنز',
    titleEn: 'Treasure Sunday',
    theme: 'ادخروا لكم كنزاً في السماء',
    scripture: 'متى ٦ : ١٩ - ٣٤',
    status: 'completed',
    progressPercent: 100,
    xpReward: 200,
    unlockedAt: 'الأسبوع الأول',
  },
  {
    id: 2,
    titleAr: 'أحد التجربة',
    titleEn: 'Temptation Sunday',
    theme: 'ليس بالخبز وحده يحيا الإنسان',
    scripture: 'متى ٤ : ١ - ١١',
    status: 'current',
    progressPercent: 65,
    xpReward: 250,
    unlockedAt: 'الأسبوع الحالي',
  },
  {
    id: 3,
    titleAr: 'أحد الابن الضال',
    titleEn: 'Prodigal Son Sunday',
    theme: 'أقوم وأذهب إلى أبي',
    scripture: 'لوقا ١٥ : ١١ - ٣٢',
    status: 'upcoming',
    progressPercent: 0,
    xpReward: 300,
  },
  {
    id: 4,
    titleAr: 'أحد السامرية',
    titleEn: 'Samaritan Woman Sunday',
    theme: 'الماء الحي ينبوع ينبع إلى حياة أبدية',
    scripture: 'يوحنا ٤ : ١ - ٤٢',
    status: 'upcoming',
    progressPercent: 0,
    xpReward: 350,
  },
  {
    id: 5,
    titleAr: 'أحد المخلع',
    titleEn: 'Paralytic Man Sunday',
    theme: 'قوم احمل سريرك وامشِ',
    scripture: 'يوحنا ٥ : ١ - ١٨',
    status: 'upcoming',
    progressPercent: 0,
    xpReward: 400,
  },
  {
    id: 6,
    titleAr: 'أحد المولود أعمى',
    titleEn: 'Born Blind Sunday',
    theme: 'كنت أعمى والآن أبصر',
    scripture: 'يوحنا ٩ : ١ - ٤١',
    status: 'upcoming',
    progressPercent: 0,
    xpReward: 450,
  },
  {
    id: 7,
    titleAr: 'أحد الشعانين',
    titleEn: 'Palm Sunday',
    theme: 'أوصنا لابن داود مبارك الآتي باسم الرب',
    scripture: 'متى ٢١ : ١ - ١٧',
    status: 'upcoming',
    progressPercent: 0,
    xpReward: 500,
  },
];

interface JourneyTimelineTrackerProps {
  onSelectEpisode?: (episodeId: number) => void;
  onNavigate?: (section: ActiveSection) => void;
}

export const JourneyTimelineTracker: React.FC<JourneyTimelineTrackerProps> = ({
  onSelectEpisode,
  onNavigate,
}) => {
  const [selectedMilestone, setSelectedMilestone] = useState<SundayMilestone>(
    SUNDAY_MILESTONES[1] // Default selection: Episode 2 (Current)
  );

  const completedSundays = USER_ECONOMY_DATA.completedSundays; // 2
  const totalSundays = USER_ECONOMY_DATA.totalSundays; // 7
  const remainingSundays = totalSundays - completedSundays; // 5
  const currentSeason = 'الموسم الحالي • MMH Podcast Season';

  // Overall timeline progress percentage calculation
  const overallProgressPercent = Math.round(
    ((completedSundays + 0.65) / totalSundays) * 100
  );

  return (
    <div className="relative overflow-hidden rounded-2xl md:rounded-3xl bg-gradient-to-br from-zinc-950 via-zinc-900 to-amber-950/30 border border-amber-500/25 p-4 md:p-6 shadow-[0_8px_32px_rgba(0,0,0,0.5)] text-right dir-rtl select-none space-y-6">
      {/* Background Cinematic Glows */}
      <div className="absolute top-0 right-1/4 w-72 h-72 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-72 h-72 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none" />

      {/* Top Header & Season Summary */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-amber-500/15 pb-4">
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-amber-500 via-amber-400 to-amber-300 text-amber-950 flex items-center justify-center font-cairo font-black text-lg shadow-[0_0_15px_rgba(251,191,36,0.4)]">
            <Compass className="w-5 h-5 text-amber-950" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-tajawal font-bold text-amber-400/90 bg-amber-500/10 px-2.5 py-0.5 rounded-full border border-amber-500/20">
                {currentSeason}
              </span>
            </div>
            <h3 className="font-cairo font-black text-xl md:text-2xl text-amber-100 mt-0.5">
              مسار آحاد الصوم المقدس
            </h3>
          </div>
        </div>

        {/* 4 Summary Pills */}
        <div className="flex flex-wrap items-center gap-2 text-xs font-tajawal">
          <div className="px-3 py-1.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 font-bold flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span>المكتملة: {completedSundays} آحاد</span>
          </div>

          <div className="px-3 py-1.5 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-300 font-bold flex items-center gap-1.5">
            <Clock className="w-4 h-4 text-amber-400" />
            <span>المتبقية: {remainingSundays} آحاد</span>
          </div>

          <div className="px-3.5 py-1.5 rounded-xl bg-zinc-900 border border-amber-500/30 text-amber-100 font-cairo font-black flex items-center gap-1">
            <span>التقدم الكلي:</span>
            <span className="text-amber-400 text-sm">{overallProgressPercent}%</span>
          </div>
        </div>
      </div>

      {/* Premium Horizontal Timeline Strip */}
      <div className="space-y-3">
        <div className="flex items-center justify-between text-xs font-tajawal text-zinc-400">
          <span className="font-bold text-amber-200">
            الجدول الزمني التفاعلي لآحاد الصوم المقدس (7 محطات روحية)
          </span>
          <span>اسحب أو اضغط على أي أحد لاستكشاف شواهده</span>
        </div>

        {/* Horizontal Scrollable Timeline Container */}
        <div className="relative pt-4 pb-2">
          {/* Background Connecting Line */}
          <div className="absolute top-1/2 left-4 right-4 h-1 bg-zinc-800 -translate-y-1/2 z-0 rounded-full">
            {/* Illuminated Completed Segment */}
            <motion.div
              className="h-full bg-gradient-to-r from-emerald-400 via-amber-400 to-amber-300 rounded-full shadow-[0_0_12px_rgba(251,191,36,0.6)]"
              initial={{ width: 0 }}
              animate={{ width: `${((completedSundays + 0.5) / totalSundays) * 100}%` }}
              transition={{ duration: 1 }}
            />
          </div>

          {/* Milestones Horizontal Row */}
          <div className="relative z-10 grid grid-cols-7 gap-2 md:gap-3 text-center">
            {SUNDAY_MILESTONES.map((ms) => {
              const isSelected = selectedMilestone.id === ms.id;
              const isCompleted = ms.status === 'completed';
              const isCurrent = ms.status === 'current';

              return (
                <button
                  key={ms.id}
                  type="button"
                  onClick={() => setSelectedMilestone(ms)}
                  className={`group relative flex flex-col items-center gap-2 p-2 rounded-2xl transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-amber-500/15 border-2 border-amber-400 shadow-[0_0_20px_rgba(251,191,36,0.3)] scale-105'
                      : 'hover:bg-white/5 border border-transparent'
                  }`}
                >
                  {/* Milestone Circular Node */}
                  <div
                    className={`w-10 h-10 md:w-12 md:h-12 rounded-2xl flex items-center justify-center font-cairo font-black text-sm md:text-base transition-all duration-300 ${
                      isCompleted
                        ? 'bg-gradient-to-tr from-emerald-500 to-emerald-300 text-zinc-950 shadow-[0_0_15px_rgba(16,185,129,0.5)] border-2 border-emerald-300'
                        : isCurrent
                        ? 'bg-gradient-to-tr from-amber-500 via-amber-400 to-amber-300 text-zinc-950 shadow-[0_0_20px_rgba(251,191,36,0.6)] animate-pulse border-2 border-amber-200'
                        : 'bg-zinc-900 text-zinc-500 border border-white/10 group-hover:border-white/20'
                    }`}
                  >
                    {isCompleted ? (
                      <CheckCircle2 className="w-5 h-5 text-zinc-950 stroke-[2.5]" />
                    ) : isCurrent ? (
                      <span>{ms.id}</span>
                    ) : (
                      <Lock className="w-4 h-4 text-zinc-600" />
                    )}
                  </div>

                  {/* Milestone Sunday Title & Label */}
                  <div className="space-y-0.5">
                    <span
                      className={`block font-cairo font-bold text-xs md:text-sm truncate max-w-[80px] md:max-w-none ${
                        isCompleted
                          ? 'text-emerald-300'
                          : isCurrent
                          ? 'text-amber-200 font-black'
                          : 'text-zinc-500'
                      }`}
                    >
                      {ms.titleAr}
                    </span>

                    <span className="block text-[10px] font-tajawal text-zinc-400/80 truncate">
                      {isCompleted ? 'مكتمل ✓' : isCurrent ? 'جاري الآن ⚡' : 'قريباً'}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Selected Milestone Detail Showcase Card */}
      <AnimatePresence mode="wait">
        <motion.div
          key={selectedMilestone.id}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.2 }}
          className="p-4 md:p-5 rounded-2xl bg-zinc-900/90 border border-amber-500/30 space-y-4 shadow-lg relative"
        >
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/10 pb-3">
            <div className="flex items-center gap-3">
              <div
                className={`w-10 h-10 rounded-xl flex items-center justify-center font-cairo font-black text-lg ${
                  selectedMilestone.status === 'completed'
                    ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                    : selectedMilestone.status === 'current'
                    ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                    : 'bg-zinc-800 text-zinc-500 border border-white/5'
                }`}
              >
                {selectedMilestone.id}
              </div>

              <div>
                <div className="flex items-center gap-2">
                  <h4 className="font-cairo font-black text-lg text-amber-100">
                    {selectedMilestone.titleAr}
                  </h4>
                  <span className="text-xs font-tajawal text-amber-400/80">
                    ({selectedMilestone.titleEn})
                  </span>
                </div>
                <p className="font-tajawal text-xs text-amber-300/80">
                  {selectedMilestone.theme} • {selectedMilestone.scripture}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 text-xs font-tajawal">
              <span className="px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-300 border border-emerald-500/20 font-bold flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
                <span>+{selectedMilestone.xpReward} XP</span>
              </span>

              {selectedMilestone.status === 'completed' && (
                <span className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 font-bold">
                  تمت الدراسة بنجاح ✓
                </span>
              )}

              {selectedMilestone.status === 'current' && (
                <span className="px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30 font-bold">
                  الأحد الحالي (65% مكتمل)
                </span>
              )}

              {selectedMilestone.status === 'upcoming' && (
                <span className="px-3 py-1 rounded-full bg-zinc-800 text-zinc-400 border border-white/10">
                  سيفتح في الأسبوع القادم 🔒
                </span>
              )}
            </div>
          </div>

          {/* Action Row */}
          <div className="flex items-center justify-between pt-1">
            <div className="flex items-center gap-2 text-xs font-tajawal text-zinc-400">
              <BookOpen className="w-4 h-4 text-amber-400" />
              <span>شاهد الحلقة التفاعلية وشارك في حل الاختبارات والألغاز</span>
            </div>

            <button
              type="button"
              onClick={() => {
                if (onSelectEpisode) {
                  onSelectEpisode(selectedMilestone.id);
                } else if (onNavigate) {
                  onNavigate('episode');
                }
              }}
              className="px-5 py-2 rounded-full font-cairo font-bold text-xs md:text-sm text-amber-950 bg-gradient-to-r from-amber-300 via-amber-400 to-amber-500 hover:from-amber-200 hover:to-amber-400 transition-all cursor-pointer flex items-center gap-1.5 shadow-md active:scale-95"
            >
              <Tv className="w-4 h-4 fill-amber-950 text-amber-950" />
              <span>
                {selectedMilestone.status === 'completed'
                  ? 'مراجعة الحلقة والشواهد'
                  : selectedMilestone.status === 'current'
                  ? 'متابعة الأحد الحالي'
                  : 'معاينة الحلقة'}
              </span>
            </button>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};
