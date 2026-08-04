import React, { useRef, useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  ArrowRight,
  Clock,
  CheckCircle2,
  Lock,
  Circle,
  BookOpen,
  Target,
  MessageSquare,
  HelpCircle,
  Quote,
  Sparkles,
  Trophy,
  Gauge,
  FileText,
  Layers,
} from 'lucide-react';
import { SceneData } from '../types';
import { EpisodeCompletionView } from './EpisodeCompletionView';
import { getSundayVerseStyle } from '../utils/sundayTheme';
import { CustomVideoPlayer } from './CustomVideoPlayer';
import { EpisodeSkeleton } from './SkeletonLoaders';
import { GlobalFooter } from './GlobalFooter';

interface EpisodeViewProps {
  scene: SceneData;
  onClose: () => void;
  onStartActivities?: () => void;
}


const VIDEO_MAP: Record<SceneData['bgType'], { video: string; poster: string }> = {
  city_gate: {
    video: '/videos/palms.mp4',
    poster: '/assets/images/palms.png',
  },
  bethesda_pool: {
    video: '/videos/bethesda.mp4',
    poster: '/assets/images/bethesda.png',
  },
  sunlit_alley: {
    video: '/videos/blind.mp4',
    poster: '/assets/images/blind.png',
  },
  treasure_field: {
    video: '/videos/treasure.mp4',
    poster: '/assets/images/treasure.png',
  },
  samaritan_well: {
    video: '/videos/samaritan.mp4',
    poster: '/assets/images/samaritan.png',
  },
  country_house: {
    video: '/videos/prodigal.mp4',
    poster: '/assets/images/prodigal.png',
  },
  mountain_summit: {
    video: '/videos/temptation.mp4',
    poster: '/assets/images/temptation.png',
  },
};

const getEpisodeDifficulty = (ep: number) => {
  switch (ep) {
    case 1:
      return { label: 'أساسي • Foundation', badge: 'bg-emerald-500/15 text-emerald-300 border-emerald-500/25' };
    case 2:
      return { label: 'متوسط • Intermediate', badge: 'bg-amber-500/15 text-amber-300 border-amber-500/25' };
    case 3:
      return { label: 'عميق • Deep Reflection', badge: 'bg-amber-500/15 text-amber-300 border-amber-500/25' };
    case 4:
      return { label: 'عميق • Deep Reflection', badge: 'bg-sky-500/15 text-sky-300 border-sky-500/25' };
    case 5:
      return { label: 'إيماني • Faith Level', badge: 'bg-emerald-500/15 text-emerald-300 border-emerald-500/25' };
    case 6:
      return { label: 'متقدم • Advanced', badge: 'bg-blue-500/15 text-blue-300 border-blue-500/25' };
    case 7:
      return { label: 'ملكوتي • Kingdom Level', badge: 'bg-lime-500/15 text-lime-300 border-lime-500/25' };
    default:
      return { label: 'جميع المستويات • All Levels', badge: 'bg-amber-500/15 text-amber-300 border-amber-500/25' };
  }
};

export const EpisodeView: React.FC<EpisodeViewProps> = ({ scene, onClose, onStartActivities }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [showCompletionModal, setShowCompletionModal] = useState(false);
  const videoData = VIDEO_MAP[scene.bgType] || VIDEO_MAP.city_gate;
  const details = scene.episodeDetails;
  const difficultyInfo = getEpisodeDifficulty(scene.episodeNumber);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 450);
    return () => clearTimeout(timer);
  }, [scene.id]);


  const getStatusBadge = () => {
    switch (scene.status) {
      case 'completed':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-tajawal font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 backdrop-blur-md">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>مكتمل • Completed</span>
          </span>
        );
      case 'locked':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-tajawal font-bold bg-slate-800/60 text-slate-400 border border-slate-700/50 backdrop-blur-md">
            <Lock className="w-3.5 h-3.5" />
            <span>مغلق • Locked</span>
          </span>
        );
      case 'not_started':
      default:
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-tajawal font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30 backdrop-blur-md">
            <Circle className="w-3.5 h-3.5" />
            <span>غير مبدوء • Not Started</span>
          </span>
        );
    }
  };

  return (
    <motion.div
      className="fixed inset-0 z-50 overflow-y-auto bg-black/95 backdrop-blur-2xl text-white dir-rtl select-none w-full max-w-full overflow-x-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
    >
      {/* Sticky Header Nav Bar */}
      <motion.div
        className="sticky top-0 z-30 bg-black/85 backdrop-blur-xl border-b border-amber-500/20 px-4 py-3.5 md:px-8 flex items-center justify-between gap-3"
        initial={{ opacity: 0, y: -16 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -16 }}
        transition={{ duration: 0.55, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
      >
        <button
          type="button"
          onClick={onClose}
          className="inline-flex items-center gap-2 px-4 py-2.5 min-h-[44px] rounded-full font-tajawal font-bold text-xs md:text-sm text-amber-200 bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/30 transition-all duration-300 cursor-pointer hover:scale-[1.02] active:scale-[0.98] shrink-0"
        >
          <ArrowRight className="w-4 h-4 text-amber-400" />
          <span>العودة إلى الرحلة • Back</span>
        </button>

        <div className="flex items-center gap-2">
          <span className="text-xs md:text-sm font-tajawal font-extrabold text-amber-400 bg-amber-400/10 px-3.5 py-1 rounded-full border border-amber-400/20">
            حلقة {scene.episodeNumber} • Episode {scene.episodeNumber}
          </span>
          {getStatusBadge()}
        </div>
      </motion.div>

      {/* Main Content Area */}
      {isLoading ? (
        <EpisodeSkeleton />
      ) : (
        <motion.div
          className="max-w-7xl mx-auto px-4 py-6 md:px-8 md:py-8 space-y-8"
          initial={{ opacity: 0, scale: 0.96, y: 16 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: 16 }}
          transition={{ duration: 0.65, delay: 0.05, ease: [0.16, 1, 0.3, 1] }}
        >

        {/* TOP SECTION: Episode Title Header */}
        <div className="space-y-2 text-center md:text-right border-b border-amber-500/15 pb-4">
          <div className="flex flex-wrap items-center justify-center md:justify-start gap-2.5">
            <span className="inline-flex items-center gap-1 px-3 py-0.5 rounded-full text-xs font-cairo font-bold bg-amber-500/15 text-amber-300 border border-amber-500/25">
              الحلقة {scene.episodeNumber}
            </span>
            {scene.subtitle && (
              <span className="text-xs font-tajawal font-medium text-amber-200/70">
                • {scene.subtitle}
              </span>
            )}
          </div>

          <h1 className="text-2xl md:text-4xl font-cairo font-black text-amber-50 tracking-tight leading-tight drop-shadow-md">
            {scene.sundayTitle}
          </h1>
        </div>

        {/* MAIN LAYOUT: Video Area & Compact Episode Information Sidebar */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
          
          {/* PRIMARY COLUMN: Premium Video Player & Reflection */}
          <div className="lg:col-span-7 xl:col-span-8 space-y-6">
            <CustomVideoPlayer
              src={videoData.video}
              poster={videoData.poster}
              autoPlay
              title={scene.sundayTitle}
              onEnded={() => setShowCompletionModal(true)}
            />

            {/* Reflection Question Card below player */}
            <div className="p-5 md:p-6 rounded-2xl bg-gradient-to-b from-amber-950/25 to-zinc-900/90 backdrop-blur-md border border-amber-500/25 space-y-3">
              <div className="flex items-center gap-2 text-amber-300 font-cairo font-bold text-base border-b border-amber-500/20 pb-2.5">
                <HelpCircle className="w-4 h-4 text-amber-400" />
                <span>تأمل روحي • Reflection</span>
              </div>
              <p className="font-tajawal text-sm md:text-base text-amber-100 font-semibold leading-relaxed p-3.5 rounded-xl bg-amber-500/10 border border-amber-500/20">
                {details?.reflectionQuestion || 'كيف تتفاعل هذه الرسالة مع ظروفك الحالية اليوم؟'}
              </p>
              <div className="flex items-center gap-2 text-xs font-tajawal text-amber-300/70 pt-1">
                <Sparkles className="w-3.5 h-3.5 text-amber-400 flex-shrink-0" />
                <span>خذ دقائق للهدوء والتأمل الشخصي قبل البدء في الأنشطة.</span>
              </div>
            </div>
          </div>

          {/* SIDEBAR COLUMN: Compact Episode Information Sidebar */}
          <aside className="lg:col-span-5 xl:col-span-4 space-y-5 lg:sticky lg:top-24">
            <div className="p-5 md:p-6 rounded-2xl bg-zinc-900/85 backdrop-blur-xl border border-amber-500/25 shadow-xl space-y-5 text-right">
              
              {/* Sidebar Header & Key Metadata Badges */}
              <div className="border-b border-amber-500/20 pb-4 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-amber-400 font-cairo font-bold text-base">
                    <Layers className="w-4 h-4 text-amber-400" />
                    <span>معلومات الحلقة • Information</span>
                  </div>
                </div>

                {/* Duration & Difficulty Quick Badges */}
                <div className="flex flex-wrap items-center gap-2 pt-1">
                  {/* Estimated Duration */}
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-tajawal font-medium bg-black/50 text-amber-200 border border-amber-500/20">
                    <Clock className="w-3.5 h-3.5 text-amber-400" />
                    <span>المدة: {scene.duration}</span>
                  </div>

                  {/* Difficulty Level */}
                  <div className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-tajawal font-medium border ${difficultyInfo.badge}`}>
                    <Gauge className="w-3.5 h-3.5" />
                    <span>المستوى: {difficultyInfo.label}</span>
                  </div>
                </div>
              </div>

              {/* 1. Episode Summary */}
              <div className="space-y-1.5">
                <div className="flex items-center gap-1.5 text-amber-300 font-cairo font-bold text-xs">
                  <FileText className="w-3.5 h-3.5 text-amber-400" />
                  <span>ملخص الحلقة • Summary</span>
                </div>
                <p className="font-tajawal text-xs md:text-sm text-zinc-300 leading-relaxed">
                  {scene.description}
                </p>
              </div>

              {/* 2. Key Verse */}
              {(() => {
                const verseStyle = getSundayVerseStyle(scene.episodeNumber);
                return (
                  <div className={`p-3.5 rounded-xl border space-y-1.5 ${verseStyle.containerClass}`}>
                    <div className="flex items-center gap-1.5 text-xs font-tajawal font-bold text-amber-300">
                      <Quote className="w-3.5 h-3.5 text-amber-400" />
                      <span>الآية الرئيسية • Key Verse</span>
                    </div>
                    <p className={`text-xs md:text-sm font-amiri font-bold leading-relaxed ${verseStyle.textClass}`}>
                      {details?.keyVerse || scene.verse}
                    </p>
                    <p className={`text-[11px] font-tajawal font-medium text-left dir-ltr ${verseStyle.refClass}`}>
                      — {details?.keyVerseRef || scene.verseRef}
                    </p>
                  </div>
                );
              })()}

              {/* 3. Bible References */}
              <div className="space-y-2">
                <div className="flex items-center gap-1.5 text-amber-300 font-cairo font-bold text-xs">
                  <BookOpen className="w-3.5 h-3.5 text-amber-400" />
                  <span>الشواهد الكتابية • Bible References</span>
                </div>
                <ul className="space-y-1.5">
                  {(details?.bibleReferences || [
                    scene.verseRef,
                    'إنجيل الأحد المُبارك — القراءات الكنسية',
                  ]).map((ref, i) => (
                    <li key={i} className="flex items-center gap-2 font-tajawal text-xs text-amber-100/90 bg-amber-500/5 px-3 py-2 rounded-lg border border-amber-500/10">
                      <BookOpen className="w-3 h-3 text-amber-400 flex-shrink-0" />
                      <span>{ref}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* 4. Learning Objectives */}
              <div className="space-y-2">
                <div className="flex items-center gap-1.5 text-amber-300 font-cairo font-bold text-xs">
                  <Target className="w-3.5 h-3.5 text-amber-400" />
                  <span>الأهداف التعليمية • Learning Objectives</span>
                </div>
                <ul className="space-y-1.5">
                  {(details?.learningObjectives || [
                    'فهم المعنى الروحي واللاهوتي للقيامة والتجديد.',
                    'تطبيق تعاليم الإنجيل في الحياة اليومية والخدمة.',
                    'النمو في المحبة والرجاء والصلاة الدائمة.',
                  ]).map((obj, i) => (
                    <li key={i} className="flex items-start gap-2 font-tajawal text-xs text-zinc-300 leading-relaxed">
                      <span className="flex-shrink-0 w-4 h-4 rounded-full bg-amber-500/20 text-amber-300 font-bold text-[10px] flex items-center justify-center mt-0.5 border border-amber-500/30">
                        {i + 1}
                      </span>
                      <span>{obj}</span>
                    </li>
                  ))}
                </ul>
              </div>

            </div>
          </aside>
        </div>

        {/* BOTTOM SECTION: Start Activities Button */}
        <div className="pt-6 pb-10 border-t border-amber-500/20 flex flex-col items-center justify-center space-y-6">
          <button
            type="button"
            onClick={onStartActivities || onClose}
            className="inline-flex items-center justify-center gap-3 px-10 py-4 rounded-full font-cairo font-black text-lg text-amber-950 bg-gradient-to-r from-amber-300 via-amber-400 to-amber-500 hover:from-amber-200 hover:to-amber-400 transition-all duration-300 shadow-[0_0_35px_rgba(251,191,36,0.6)] hover:shadow-[0_0_45px_rgba(251,191,36,0.85)] hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
          >
            <Target className="w-6 h-6 text-amber-950" />
            <span>ابدأ الأنشطة • Start Activities</span>
          </button>

          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 w-full pt-4 border-t border-white/10 text-center sm:text-right">
            <p className="text-xs md:text-sm font-tajawal text-zinc-400">
              بودكاست مش مجرد حد — الحلقة {scene.episodeNumber} من 7
            </p>

            <button
              type="button"
              onClick={onClose}
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full font-tajawal font-bold text-xs md:text-sm text-amber-200 bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/30 transition-all duration-200 cursor-pointer hover:scale-[1.02] active:scale-[0.98]"
            >
              <ArrowRight className="w-4 h-4 text-amber-400" />
              <span>العودة إلى الرحلة • Back to Journey</span>
            </button>
          </div>
        </div>
      </motion.div>
      )}


      {/* Sprint 7 Episode Completion Screen Overlay Modal */}
      <AnimatePresence>
        {showCompletionModal && (
          <EpisodeCompletionView
            scene={scene}
            onStartActivities={() => {
              setShowCompletionModal(false);
              if (onStartActivities) onStartActivities();
            }}
            onReplayEpisode={() => {
              setShowCompletionModal(false);
            }}
            onContinueJourney={() => {
              setShowCompletionModal(false);
              onClose();
            }}
            onClose={() => setShowCompletionModal(false)}
          />
        )}
      </AnimatePresence>

      <GlobalFooter />
    </motion.div>
  );
};

