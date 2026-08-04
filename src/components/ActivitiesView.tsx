import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { ActivitiesSkeleton } from './SkeletonLoaders';
import { EmptyState } from './EmptyState';
import { GlobalFooter } from './GlobalFooter';
import {

  ArrowRight,
  Target,
  CheckCircle2,
  Clock,
  Coins,
  Sparkles,
  HelpCircle,
  Puzzle,
  Grid,
  Brain,
  BookOpen,
  History,
  CheckSquare,
  Search,
  Lock,
  Circle,
  BarChart2,
  Trophy,
  Filter,
  Flame,
  Award,
  Play,
  RotateCcw,
  Info,
  Layers,
  X,
} from 'lucide-react';
import { SceneData } from '../types';

interface ActivitiesViewProps {
  scene: SceneData;
  onClose: () => void;
}

export type ActivityCategoryType =
  | 'quiz'
  | 'puzzle'
  | 'crossword'
  | 'memory'
  | 'verse_match'
  | 'timeline'
  | 'true_false'
  | 'hidden_objects';

export interface ActivityCategory {
  id: ActivityCategoryType;
  title: string;
  titleEn: string;
  description: string;
  icon: React.FC<{ className?: string }>;
  colorClass: string;
  badgeBg: string;
}

export interface ActivityItem {
  id: string;
  categoryId: ActivityCategoryType;
  type: string;
  title: string;
  description: string;
  icon: React.FC<{ className?: string }>;
  difficulty: 'easy' | 'medium' | 'hard';
  difficultyLabel: string;
  duration: string;
  xpReward: number;
  coinsReward: number;
  status: 'completed' | 'in_progress' | 'not_started' | 'locked';
  progressPercent: number;
  objectives: string[];
}

export const CATEGORIES: ActivityCategory[] = [
  {
    id: 'quiz',
    title: 'اختبارات الفهم',
    titleEn: 'Quiz',
    description: 'أسئلة تفاعلية لاختبار مدى استيعاب المفاهيم والشواهد الكتابية والدروس الروحية.',
    icon: HelpCircle,
    colorClass: 'text-amber-400 border-amber-500/30 bg-amber-500/10',
    badgeBg: 'bg-amber-500/20 text-amber-300 border-amber-500/30',
  },
  {
    id: 'puzzle',
    title: 'ألغاز المشاهد',
    titleEn: 'Puzzle',
    description: 'تجميع وإعادة تركيب قطع اللوحات التفاعلية ثلاثية الأبعاد للمشاهد الكتابية.',
    icon: Puzzle,
    colorClass: 'text-sky-400 border-sky-500/30 bg-sky-500/10',
    badgeBg: 'bg-sky-500/20 text-sky-300 border-sky-500/30',
  },
  {
    id: 'crossword',
    title: 'الكلمات المتقاطعة',
    titleEn: 'Crossword',
    description: 'شبكات كلمات تقاطعية مستوحاة من أسماء وشخصيات وآيات الإنجيل المُبارك.',
    icon: Grid,
    colorClass: 'text-emerald-400 border-emerald-500/30 bg-emerald-500/10',
    badgeBg: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30',
  },
  {
    id: 'memory',
    title: 'لعبة الذاكرة',
    titleEn: 'Memory Game',
    description: 'مطابقة بطاقات الصور والرموز الروحية لاختبار التركيز وقوة الملاحظة البصرية.',
    icon: Brain,
    colorClass: 'text-purple-400 border-purple-500/30 bg-purple-500/10',
    badgeBg: 'bg-purple-500/20 text-purple-300 border-purple-500/30',
  },
  {
    id: 'verse_match',
    title: 'مطابقة الآيات',
    titleEn: 'Verse Match',
    description: 'الربط المباشر بين النصوص الكتابية والشواهد المقابلة لها في قراءات الإنجيل.',
    icon: BookOpen,
    colorClass: 'text-yellow-400 border-yellow-500/30 bg-yellow-500/10',
    badgeBg: 'bg-yellow-500/20 text-yellow-300 border-yellow-500/30',
  },
  {
    id: 'timeline',
    title: 'التسلسل الزمني',
    titleEn: 'Timeline Challenge',
    description: 'ترتيب الأحداث التاريخية والكتابية بالترتيب الزمني الصحيح والدقيق.',
    icon: History,
    colorClass: 'text-rose-400 border-rose-500/30 bg-rose-500/10',
    badgeBg: 'bg-rose-500/20 text-rose-300 border-rose-500/30',
  },
  {
    id: 'true_false',
    title: 'صح أم خطأ',
    titleEn: 'True or False',
    description: 'تحدي تقييم صحة العبارات والتعاليم الروحية بأسلوب سريع ومباشر.',
    icon: CheckSquare,
    colorClass: 'text-teal-400 border-teal-500/30 bg-teal-500/10',
    badgeBg: 'bg-teal-500/20 text-teal-300 border-teal-500/30',
  },
  {
    id: 'hidden_objects',
    title: 'العناصر الخفية',
    titleEn: 'Hidden Objects',
    description: 'اكتشاف والبحث عن الرموز والعناصر المعمارية والروحية المخفية في اللوحات.',
    icon: Search,
    colorClass: 'text-indigo-400 border-indigo-500/30 bg-indigo-500/10',
    badgeBg: 'bg-indigo-500/20 text-indigo-300 border-indigo-500/30',
  },
];

export const ActivitiesView: React.FC<ActivitiesViewProps> = ({ scene, onClose }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<ActivityCategoryType | 'all'>('all');

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 450);
    return () => clearTimeout(timer);
  }, []);

  const [statusFilter, setStatusFilter] = useState<'all' | 'not_started' | 'in_progress' | 'completed' | 'locked'>('all');
  const [selectedDifficulty, setSelectedDifficulty] = useState<'all' | 'easy' | 'medium' | 'hard'>('all');
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [selectedActivityForDetails, setSelectedActivityForDetails] = useState<ActivityItem | null>(null);

  const activities: ActivityItem[] = [
    // 1. Quiz Category
    {
      id: 'act-quiz-1',
      categoryId: 'quiz',
      type: 'اختبار تقييمي • Quiz',
      title: 'اختبار المفاهيم والشواهد الكتابية',
      description: 'اختبار شامل لاستيعاب الشواهد الإنجيلية والتعاليم الروحية والدروس الرئيسية للحلقة.',
      icon: HelpCircle,
      difficulty: 'medium',
      difficultyLabel: 'متوسط • Medium',
      duration: '5 دقائق',
      xpReward: 100,
      coinsReward: 25,
      status: 'completed',
      progressPercent: 100,
      objectives: [
        'فهم واستيعاب الدروس والمفاهيم الروحية والشواهد الإنجيلية الرئيسية للحلقة.',
        'الإجابة الصحيحة على جميع الأسئلة للحصول على التقييم الكامل والعلامة العالية.',
        'ربط الشواهد الكتابية بتطبيقات عميقة ومباشرة في حياتنا الروحية اليومية.',
      ],
    },
    {
      id: 'act-quiz-2',
      categoryId: 'quiz',
      type: 'اختيار من متعدد • MCQ',
      title: 'تحدي أسئلة الاختيار المباشر السريع',
      description: 'أسئلة سريعة متعددة الخيارات لاختبار الفهم المباشر والدقيق لحدث إنجيل الأحد.',
      icon: HelpCircle,
      difficulty: 'easy',
      difficultyLabel: 'سهل • Easy',
      duration: '3 دقائق',
      xpReward: 50,
      coinsReward: 10,
      status: 'in_progress',
      progressPercent: 60,
      objectives: [
        'الاختيار السريع والدقيق للإجابات الصحيحة في زمن قياسي وسريع.',
        'اختبار سرعة البصيرة والفهم المباشر لأحداث قراءة الأحد الإنجيلية.',
        'جمع النقاط والعملات الذهبية الإضافية لتعزيز المستويات الروحية.',
      ],
    },

    // 2. Puzzle Category
    {
      id: 'act-puzzle-1',
      categoryId: 'puzzle',
      type: 'لغز بصرية • Puzzle',
      title: 'لغز تركيب المشهد الكتابي',
      description: 'قم بتجميع وإعادة تركيب قطع المشهد التصويري التفاعلي ثلاثي الأبعاد الخاص بالحلقة.',
      icon: Puzzle,
      difficulty: 'easy',
      difficultyLabel: 'سهل • Easy',
      duration: '4 دقائق',
      xpReward: 60,
      coinsReward: 15,
      status: 'completed',
      progressPercent: 100,
      objectives: [
        'تجميع وإعادة تركيب قطع اللوحة التصويرية التفاعلية للمشهد الإنجيلي.',
        'ملاحظة التفاصيل الفنية والأيقونية الدقيقة للشخصيات والأماكن والمظاهر.',
        'إكمال تركيب اللوحة بالكامل في الوقت المحدد لكسب المكافأة الذهبية.',
      ],
    },
    {
      id: 'act-puzzle-2',
      categoryId: 'puzzle',
      type: 'ألغاز البناء • Architectural Puzzle',
      title: 'تجميع تفاصيل الهيكل والمذبح',
      description: 'قم بتركيب الأجزاء المعمارية والأيقونية التاريخية للحدث الإنجيلي.',
      icon: Puzzle,
      difficulty: 'medium',
      difficultyLabel: 'متوسط • Medium',
      duration: '6 دقائق',
      xpReward: 80,
      coinsReward: 20,
      status: 'in_progress',
      progressPercent: 35,
      objectives: [
        'التعرف على الأجزاء المعمارية والهيكلية وتفاصيل المذبح والرموز الروحية.',
        'تركيب الأجزاء التاريخية والدينية بالشكل الهندسي الصحيح والمتناسق.',
        'تطوير المعرفة البصرية بالهندسة الروحية والتراث الإنجيلي العريق.',
      ],
    },

    // 3. Crossword Category
    {
      id: 'act-crossword-1',
      categoryId: 'crossword',
      type: 'كلمات متقاطعة • Crossword',
      title: 'شبكة الكلمات المتقاطعة الإنجيلية',
      description: 'حل الألغاز المتقاطعة المستوحاة من أسماء وشخصيات وآيات الإنجيل المُبارك.',
      icon: Grid,
      difficulty: 'medium',
      difficultyLabel: 'متوسط • Medium',
      duration: '7 دقائق',
      xpReward: 80,
      coinsReward: 20,
      status: 'not_started',
      progressPercent: 0,
      objectives: [
        'استكشاف وتخمين الأسماء والشخصيات والأماكن المذكورة في نصوص الإنجيل.',
        'حل الشبكة المتقاطعة بالاستعانة بالتلميحات والشواهد الكتابية الدقيقة.',
        'تنشيط الذاكرة وحفظ المسميات الإنجيلية بدون أخطاء إملائية.',
      ],
    },

    // 4. Memory Game Category
    {
      id: 'act-memory-1',
      categoryId: 'memory',
      type: 'لعبة الذاكرة • Memory',
      title: 'تحدي الذاكرة والأيقونات الروحية',
      description: 'طابق بطاقات الصور والرموز الروحية لاختبار قوة الملاحظة والتركيز البصري.',
      icon: Brain,
      difficulty: 'easy',
      difficultyLabel: 'سهل • Easy',
      duration: '3 دقائق',
      xpReward: 50,
      coinsReward: 10,
      status: 'in_progress',
      progressPercent: 50,
      objectives: [
        'مطابقة بطاقات الأيقونات والرموز الروحية المتشابهة بدقة عالية.',
        'تنشيط الذاكرة البصرية وتركيز الانتباه على مواقع البطاقات المكشوفة.',
        'إنهاء التحدي بأقل عدد من المحاولات وفي أقصر وقت ممكن.',
      ],
    },

    // 5. Verse Match Category
    {
      id: 'act-verse-1',
      categoryId: 'verse_match',
      type: 'مطابقة آيات • Verse Match',
      title: 'مطابقة الآيات مع الشواهد المقابلة',
      description: 'وصل بين النص الكتابي والشاهد المقابل له من قراءات إنجيل الأحد.',
      icon: BookOpen,
      difficulty: 'medium',
      difficultyLabel: 'متوسط • Medium',
      duration: '4 دقائق',
      xpReward: 70,
      coinsReward: 15,
      status: 'not_started',
      progressPercent: 0,
      objectives: [
        'الربط المباشر والدقيق بين النصوص الكتابية والشواهد الإنجيلية المقابلة.',
        'دقة تحديد السفر والإصحاح والآية لكل اقتباس روحاني في الحلقة.',
        'ترسيخ الحفظ الذهني للشواهد الكتابية في القلوب والأفئدة.',
      ],
    },

    // 6. Timeline Challenge Category
    {
      id: 'act-timeline-1',
      categoryId: 'timeline',
      type: 'تسلسل زمني • Timeline',
      title: 'تحدي التسلسل الزمني للأحداث',
      description: 'رتب الأحداث التاريخية والكتابية بالترتيب الكرونولوجي الصحيح.',
      icon: History,
      difficulty: 'hard',
      difficultyLabel: 'صعب • Hard',
      duration: '6 دقائق',
      xpReward: 90,
      coinsReward: 30,
      status: 'locked',
      progressPercent: 0,
      objectives: [
        'ترتيب الأحداث التاريخية والكتابية وفق تسلسلها الزمني الدقيق والمنطقي.',
        'إدراك السياق التاريخي والجغرافي للأحداث والمحطات الإنجيلية.',
        'استكشاف الروابط الكرونولوجية بين النبوءات وتحققها في البشارة.',
      ],
    },

    // 7. True or False Category
    {
      id: 'act-tf-1',
      categoryId: 'true_false',
      type: 'صح أم خطأ • True / False',
      title: 'اختبار صح أم خطأ السريع',
      description: 'حدد مدى صحة العبارات والتعاليم الروحية بأسلوب تفاعلي وسريع.',
      icon: CheckSquare,
      difficulty: 'easy',
      difficultyLabel: 'سهل • Easy',
      duration: '2 دقيقة',
      xpReward: 40,
      coinsReward: 10,
      status: 'not_started',
      progressPercent: 0,
      objectives: [
        'تقييم العبارات والتعاليم الروحية المطروحة بسرعة ودقة وبصيرة روحية.',
        'تمييز المفاهيم الإيمانية السليمة وتفنيد المفاهيم والتأويلات المغلوطة.',
        'تحقيق أفضل نتيجة زمنية في الاختبار التقييمي المباشر والسريع.',
      ],
    },

    // 8. Hidden Objects Category
    {
      id: 'act-hidden-1',
      categoryId: 'hidden_objects',
      type: 'عناصر خفية • Hidden Objects',
      title: 'البحث عن الرموز والعناصر الخفية',
      description: 'ابحث عن العناصر والأواني والرموز التاريخية المخبأة داخل لوحة المشهد الإنجيلي.',
      icon: Search,
      difficulty: 'medium',
      difficultyLabel: 'متوسط • Medium',
      duration: '5 دقائق',
      xpReward: 75,
      coinsReward: 20,
      status: 'in_progress',
      progressPercent: 25,
      objectives: [
        'البحث عن الرموز والعناصر المعمارية والمقدسة المخبأة داخل المشهد.',
        'استكشاف تفاصيل الأواني والأيقونات الإنجيلية بدقة ملاحظة وتأمل.',
        'العثور على كافة العناصر الخفية قبل انتهاء الوقت المخصص للتحدي.',
      ],
    },
  ];

  // Calculated Stats
  const totalActivities = activities.length;
  const completedCount = activities.filter((a) => a.status === 'completed').length;
  const inProgressCount = activities.filter((a) => a.status === 'in_progress').length;
  const notStartedCount = activities.filter((a) => a.status === 'not_started').length;
  const lockedCount = activities.filter((a) => a.status === 'locked').length;

  const totalXpAvailable = activities.reduce((acc, a) => acc + a.xpReward, 0);
  const earnedXp = activities
    .filter((a) => a.status === 'completed')
    .reduce((acc, a) => acc + a.xpReward, 0);
  const totalCoinsAvailable = activities.reduce((acc, a) => acc + a.coinsReward, 0);
  const earnedCoins = activities
    .filter((a) => a.status === 'completed')
    .reduce((acc, a) => acc + a.coinsReward, 0);

  const episodeProgressPercent = Math.round((completedCount / totalActivities) * 100);

  // Filtered List
  const filteredActivities = activities.filter((act) => {
    if (selectedCategory !== 'all' && act.categoryId !== selectedCategory) return false;
    if (statusFilter !== 'all' && act.status !== statusFilter) return false;
    if (selectedDifficulty !== 'all' && act.difficulty !== selectedDifficulty) return false;
    return true;
  });

  const getStatusBadge = (status: ActivityItem['status'], percent?: number) => {
    switch (status) {
      case 'completed':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-tajawal font-bold bg-emerald-950/60 text-emerald-300 border border-emerald-500/30 shadow-sm">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
            <span>مكتمل • Completed</span>
          </span>
        );
      case 'in_progress':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-tajawal font-bold bg-amber-950/70 text-amber-300 border border-amber-500/35 shadow-sm">
            <Clock className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
            <span>قيد التقدم • {percent ?? 50}%</span>
          </span>
        );
      case 'locked':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-tajawal font-bold bg-zinc-900/80 text-zinc-500 border border-zinc-800">
            <Lock className="w-3.5 h-3.5" />
            <span>مغلق • Locked</span>
          </span>
        );
      case 'not_started':
      default:
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-tajawal font-bold bg-zinc-800/80 text-zinc-300 border border-zinc-700/60">
            <Circle className="w-3.5 h-3.5 text-zinc-400" />
            <span>لم يبدأ • Not Started</span>
          </span>
        );
    }
  };

  const getDifficultyBadge = (difficulty: ActivityItem['difficulty'], label: string) => {
    switch (difficulty) {
      case 'easy':
        return (
          <span className="inline-flex items-center gap-1 text-xs font-tajawal font-medium text-emerald-300 bg-emerald-500/10 px-2.5 py-0.5 rounded-md border border-emerald-500/20">
            <BarChart2 className="w-3 h-3 text-emerald-400" />
            <span>{label}</span>
          </span>
        );
      case 'medium':
        return (
          <span className="inline-flex items-center gap-1 text-xs font-tajawal font-medium text-amber-300 bg-amber-500/10 px-2.5 py-0.5 rounded-md border border-amber-500/20">
            <BarChart2 className="w-3 h-3 text-amber-400" />
            <span>{label}</span>
          </span>
        );
      case 'hard':
        return (
          <span className="inline-flex items-center gap-1 text-xs font-tajawal font-medium text-rose-300 bg-rose-500/10 px-2.5 py-0.5 rounded-md border border-rose-500/20">
            <BarChart2 className="w-3 h-3 text-rose-400" />
            <span>{label}</span>
          </span>
        );
    }
  };

  const handleActionClick = (title: string, status: ActivityItem['status']) => {
    if (status === 'locked') {
      setToastMessage(`هذا النشاط مغلق حالياً حتى إكمال الأنشطة السابقة.`);
    } else {
      setToastMessage(`سيتم تفعيل نشاط "${title}" قريباً في التحديث القادم!`);
    }

    setTimeout(() => {
      setToastMessage(null);
    }, 3500);
  };

  // Group activities by category for clean section rendering
  const categoriesToRender = CATEGORIES.filter((cat) => {
    if (selectedCategory !== 'all' && cat.id !== selectedCategory) return false;
    const catActivities = filteredActivities.filter((a) => a.categoryId === cat.id);
    return catActivities.length > 0;
  });

  return (
    <motion.div
      className="fixed inset-0 z-50 overflow-y-auto bg-zinc-950/95 backdrop-blur-2xl text-white dir-rtl select-none"
      initial={{ opacity: 0, scale: 0.98, y: 16 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.98, y: 16 }}
      transition={{ duration: 0.3 }}
    >
      {/* Toast Notification */}
      {toastMessage && (
        <motion.div
          className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 px-5 py-3 rounded-2xl bg-amber-500 text-amber-950 font-cairo font-bold text-sm shadow-[0_0_25px_rgba(251,191,36,0.6)] flex items-center gap-2 border border-amber-200"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
        >
          <Info className="w-4 h-4 flex-shrink-0" />
          <span>{toastMessage}</span>
        </motion.div>
      )}

      {/* Sticky Header Navigation */}
      <header className="sticky top-0 z-30 bg-zinc-950/85 backdrop-blur-md border-b border-amber-500/20 px-4 py-3.5 md:px-8 flex items-center justify-between">
        <button
          type="button"
          onClick={onClose}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full font-tajawal font-bold text-xs md:text-sm text-amber-200 bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/30 transition-all cursor-pointer"
        >
          <ArrowRight className="w-4 h-4 text-amber-400" />
          <span>العودة • Back</span>
        </button>

        <div className="flex items-center gap-2">
          <span className="text-xs md:text-sm font-tajawal font-extrabold text-amber-300 bg-amber-500/15 px-3.5 py-1 rounded-full border border-amber-500/25">
            مركز الأنشطة والمهام • Activities Hub
          </span>
        </div>
      </header>

      {/* Main Container */}
      <div className="max-w-7xl mx-auto px-4 py-6 md:py-8 space-y-8">
        {isLoading ? (
          <ActivitiesSkeleton />
        ) : (
          <>
            {/* Page Title & Episode Context */}
            <div className="text-center space-y-3">

          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs md:text-sm font-tajawal font-bold">
            <Sparkles className="w-4 h-4 text-amber-400" />
            <span>الحلقة {scene.episodeNumber}: {scene.sundayTitle}</span>
          </div>
          <h1 className="text-3xl md:text-5xl font-cairo font-black text-amber-100 tracking-tight">
            مركز الأنشطة والتصنيفات التفاعلية
          </h1>
          <p className="text-sm md:text-base font-tajawal text-zinc-300 max-w-2xl mx-auto leading-relaxed">
            منظمة في أقسام متخصصة (اختبارات، ألغاز، كلمات متقاطعة، ذاكرة، مطابقة، تسلسل زمني، صح/خطأ، وعناصر خفية).
          </p>
        </div>

        {/* Compact Activities Dashboard */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
          {/* Card 1: Episode Progress */}
          <div className="p-3.5 rounded-xl bg-zinc-900/80 border border-amber-500/20 shadow-md flex flex-col justify-between space-y-2">
            <div className="flex items-center justify-between text-[11px] font-tajawal text-zinc-400">
              <span className="font-bold text-amber-300/90">تقدم الحلقة</span>
              <BookOpen className="w-3.5 h-3.5 text-amber-400" />
            </div>
            <div className="flex items-baseline justify-between">
              <span className="text-xl md:text-2xl font-cairo font-black text-amber-100">
                {episodeProgressPercent}%
              </span>
              <span className="text-[10px] font-tajawal text-zinc-400">
                الحلقة {scene.episodeNumber}
              </span>
            </div>
            <div className="w-full bg-zinc-950 h-1.5 rounded-full overflow-hidden border border-white/5">
              <div
                className="bg-gradient-to-r from-amber-500 to-amber-300 h-full rounded-full transition-all duration-500"
                style={{ width: `${episodeProgressPercent}%` }}
              />
            </div>
          </div>

          {/* Card 2: Activities Completed */}
          <div className="p-3.5 rounded-xl bg-zinc-900/80 border border-amber-500/20 shadow-md flex flex-col justify-between space-y-2">
            <div className="flex items-center justify-between text-[11px] font-tajawal text-zinc-400">
              <span className="font-bold text-amber-300/90">الأنشطة المكتملة</span>
              <CheckCircle2 className="w-3.5 h-3.5 text-amber-400" />
            </div>
            <div className="flex items-baseline justify-between">
              <span className="text-xl md:text-2xl font-cairo font-black text-amber-100">
                {completedCount} <span className="text-xs font-tajawal font-normal text-zinc-400">/ {totalActivities}</span>
              </span>
            </div>
            <span className="text-[10px] font-tajawal text-emerald-400 flex items-center gap-1">
              <span>{completedCount} مكتملة • {inProgressCount} قيد التقدم</span>
            </span>
          </div>

          {/* Card 3: Total XP Available */}
          <div className="p-3.5 rounded-xl bg-zinc-900/80 border border-amber-500/20 shadow-md flex flex-col justify-between space-y-2">
            <div className="flex items-center justify-between text-[11px] font-tajawal text-zinc-400">
              <span className="font-bold text-amber-300/90">إجمالي XP المتاحة</span>
              <Trophy className="w-3.5 h-3.5 text-amber-400" />
            </div>
            <div className="flex items-baseline justify-between">
              <span className="text-xl md:text-2xl font-cairo font-black text-amber-300">
                {totalXpAvailable} <span className="text-xs text-amber-400 font-bold">XP</span>
              </span>
            </div>
            <span className="text-[10px] font-tajawal text-amber-200/70">
              مكتسب: +{earnedXp} XP
            </span>
          </div>

          {/* Card 4: Total Coins Available */}
          <div className="p-3.5 rounded-xl bg-zinc-900/80 border border-amber-500/20 shadow-md flex flex-col justify-between space-y-2">
            <div className="flex items-center justify-between text-[11px] font-tajawal text-zinc-400">
              <span className="font-bold text-amber-300/90">إجمالي العملات المتاحة</span>
              <Coins className="w-3.5 h-3.5 text-amber-400" />
            </div>
            <div className="flex items-baseline justify-between">
              <span className="text-xl md:text-2xl font-cairo font-black text-amber-200">
                {totalCoinsAvailable} <span className="text-xs text-amber-400 font-bold">عملة</span>
              </span>
            </div>
            <span className="text-[10px] font-tajawal text-amber-200/70">
              مكتسب: {earnedCoins} عملات
            </span>
          </div>

          {/* Card 5: Estimated Total Time */}
          <div className="p-3.5 rounded-xl bg-zinc-900/80 border border-amber-500/20 shadow-md flex flex-col justify-between space-y-2 col-span-2 sm:col-span-1">
            <div className="flex items-center justify-between text-[11px] font-tajawal text-zinc-400">
              <span className="font-bold text-amber-300/90">الوقت الإجمالي المقدر</span>
              <Clock className="w-3.5 h-3.5 text-amber-400" />
            </div>
            <div className="flex items-baseline justify-between">
              <span className="text-xl md:text-2xl font-cairo font-black text-amber-100">
                46 دقيقة
              </span>
            </div>
            <span className="text-[10px] font-tajawal text-zinc-400">
              لكافة الـ 10 أنشطة
            </span>
          </div>
        </div>

        {/* Category Navigation Bar (All 8 Categories Pills) */}
        <div className="p-4 rounded-2xl bg-zinc-900/90 border border-amber-500/20 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-tajawal font-bold text-amber-300 flex items-center gap-1.5">
              <Layers className="w-4 h-4 text-amber-400" />
              <span>تصنيفات الأنشطة • Activity Categories</span>
            </span>
            <span className="text-[11px] font-tajawal text-zinc-400">
              اختر تصنيفاً للتصفية السريعة
            </span>
          </div>

          {/* Category Tabs Scrollable Row */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1.5 scrollbar-none">
            {/* All Categories Button */}
            <button
              type="button"
              onClick={() => setSelectedCategory('all')}
              className={`px-4 py-2 rounded-xl text-xs font-tajawal font-bold transition-all cursor-pointer whitespace-nowrap flex items-center gap-2 ${
                selectedCategory === 'all'
                  ? 'bg-amber-400 text-amber-950 shadow-md font-extrabold'
                  : 'bg-zinc-800/80 text-zinc-300 hover:bg-zinc-700/80 border border-white/5'
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              <span>جميع التصنيفات ({totalActivities})</span>
            </button>

            {/* Individual Category Pills */}
            {CATEGORIES.map((cat) => {
              const CatIcon = cat.icon;
              const catCount = activities.filter((a) => a.categoryId === cat.id).length;
              const isSelected = selectedCategory === cat.id;

              return (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-3.5 py-2 rounded-xl text-xs font-tajawal font-bold transition-all cursor-pointer whitespace-nowrap flex items-center gap-2 border ${
                    isSelected
                      ? 'bg-amber-400 text-amber-950 border-amber-300 shadow-md font-extrabold'
                      : 'bg-zinc-800/80 text-zinc-300 hover:bg-zinc-700/80 border-amber-500/15'
                  }`}
                >
                  <CatIcon className={`w-3.5 h-3.5 ${isSelected ? 'text-amber-950' : 'text-amber-400'}`} />
                  <span>{cat.title} ({catCount})</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Status & Difficulty Filter Bar */}
        <div className="p-3.5 rounded-2xl bg-zinc-900/70 border border-amber-500/15 flex flex-wrap items-center justify-between gap-4">
          {/* Status Filter */}
          <div className="flex items-center gap-1.5 overflow-x-auto scrollbar-none">
            <span className="text-xs font-tajawal font-bold text-amber-400 pl-2 hidden sm:inline flex items-center gap-1">
              <Filter className="w-3.5 h-3.5" />
              <span>الحالة:</span>
            </span>

            {[
              { id: 'all', label: `الكل (${activities.length})` },
              { id: 'not_started', label: `لم يبدأ (${notStartedCount})` },
              { id: 'in_progress', label: `قيد التقدم (${inProgressCount})` },
              { id: 'completed', label: `المكتملة (${completedCount})` },
              { id: 'locked', label: `المغلقة (${lockedCount})` },
            ].map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setStatusFilter(tab.id as typeof statusFilter)}
                className={`px-3 py-1 rounded-lg text-xs font-tajawal font-medium transition-all cursor-pointer whitespace-nowrap ${
                  statusFilter === tab.id
                    ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40 font-bold'
                    : 'bg-zinc-800/60 text-zinc-400 hover:bg-zinc-800 border border-transparent'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Difficulty Dropdown */}
          <div className="flex items-center gap-1.5">
            <span className="text-xs font-tajawal text-zinc-400">المستوى:</span>
            <select
              value={selectedDifficulty}
              onChange={(e) => setSelectedDifficulty(e.target.value as typeof selectedDifficulty)}
              className="bg-zinc-800 text-amber-200 text-xs font-tajawal font-bold px-3 py-1 rounded-xl border border-amber-500/30 focus:outline-none focus:border-amber-400 cursor-pointer"
            >
              <option value="all">جميع المستويات</option>
              <option value="easy">سهل • Easy</option>
              <option value="medium">متوسط • Medium</option>
              <option value="hard">صعب • Hard</option>
            </select>
          </div>
        </div>

        {/* Category Sections List */}
        <div className="space-y-10">
          {categoriesToRender.map((cat) => {
            const CatIcon = cat.icon;
            const catActivities = filteredActivities.filter((a) => a.categoryId === cat.id);

            if (catActivities.length === 0) return null;

            return (
              <section key={cat.id} className="space-y-5">
                {/* Category Header */}
                <div className="p-4 rounded-2xl bg-zinc-900/90 border border-amber-500/20 flex flex-wrap items-center justify-between gap-3 shadow-md">
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-xl border flex items-center justify-center ${cat.colorClass}`}>
                      <CatIcon className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h2 className="font-cairo font-black text-lg text-amber-100">
                          {cat.title}
                        </h2>
                        <span className={`text-[11px] font-tajawal font-bold px-2.5 py-0.5 rounded-full border ${cat.badgeBg}`}>
                          {cat.titleEn}
                        </span>
                      </div>
                      <p className="font-tajawal text-xs text-zinc-300">
                        {cat.description}
                      </p>
                    </div>
                  </div>

                  <span className="text-xs font-tajawal text-zinc-400 bg-black/40 px-3 py-1 rounded-full border border-white/10">
                    {catActivities.length} نشاط في هذا القسم
                  </span>
                </div>

                {/* Activity Cards Responsive Grid under Category */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                  {catActivities.map((act) => {
                    const ActIcon = act.icon;
                    const isCompleted = act.status === 'completed';
                    const isLocked = act.status === 'locked';

                    return (
                      <div
                        key={act.id}
                        onClick={() => setSelectedActivityForDetails(act)}
                        className={`group relative p-6 rounded-3xl backdrop-blur-xl transition-all duration-300 ease-out flex flex-col justify-between space-y-5 overflow-hidden shadow-xl shadow-black/40 cursor-pointer ${
                          isCompleted
                            ? 'bg-gradient-to-b from-emerald-950/20 via-zinc-900/80 to-zinc-950/90 border border-emerald-500/30 hover:border-emerald-400/60 hover:shadow-[0_12px_30px_rgba(16,185,129,0.2)] hover:-translate-y-1.5 hover:scale-[1.015]'
                            : isLocked
                            ? 'bg-zinc-900/60 border border-zinc-800/80 opacity-75 backdrop-blur-md'
                            : 'bg-gradient-to-b from-zinc-900/90 via-zinc-900/70 to-zinc-950/95 border border-amber-500/25 hover:border-amber-400/50 hover:shadow-[0_15px_35px_rgba(245,158,11,0.18)] hover:-translate-y-1.5 hover:scale-[1.015]'
                        }`}
                      >
                        {/* Top Gold Accent Bar */}
                        <div
                          className={`absolute top-0 inset-x-0 h-0.5 transition-opacity duration-300 ${
                            isCompleted
                              ? 'bg-gradient-to-r from-transparent via-emerald-400 to-transparent opacity-80 group-hover:opacity-100'
                              : isLocked
                              ? 'bg-zinc-700 opacity-40'
                              : 'bg-gradient-to-r from-transparent via-amber-400 to-transparent opacity-60 group-hover:opacity-100'
                          }`}
                        />

                        {/* Card Content Container */}
                        <div className="space-y-4">
                          {/* Top Bar: Icon with Gold Border, Type & Status Badge */}
                          <div className="flex items-start justify-between gap-3">
                            <div className="w-12 h-12 rounded-2xl bg-amber-500/15 text-amber-400 border border-amber-500/30 flex items-center justify-center flex-shrink-0 group-hover:scale-110 group-hover:border-amber-400/60 group-hover:bg-amber-500/25 group-hover:shadow-[0_0_15px_rgba(245,158,11,0.3)] transition-all duration-300">
                              <ActIcon className="w-6 h-6" />
                            </div>

                            {getStatusBadge(act.status, act.progressPercent)}
                          </div>

                          {/* Type Tag & Title */}
                          <div className="space-y-1">
                            <span className="text-[11px] font-tajawal font-extrabold text-amber-400/90 tracking-wider block uppercase">
                              {act.type}
                            </span>
                            <h3 className="font-cairo font-bold text-base md:text-lg text-amber-50 leading-snug tracking-tight group-hover:text-amber-300 transition-colors">
                              {act.title}
                            </h3>
                          </div>

                          {/* Description */}
                          <p className="font-tajawal text-xs md:text-sm text-zinc-300/90 leading-relaxed">
                            {act.description}
                          </p>

                          {/* Subtle Progress Indicator Bar */}
                          <div className="space-y-1.5 pt-1">
                            <div className="flex items-center justify-between text-[11px] font-tajawal">
                              <span className="text-zinc-400">نسبة الإنجاز • Progress</span>
                              <span className={`font-bold ${
                                isCompleted
                                  ? 'text-emerald-400'
                                  : act.status === 'in_progress'
                                  ? 'text-amber-300'
                                  : isLocked
                                  ? 'text-zinc-500'
                                  : 'text-zinc-400'
                              }`}>
                                {act.progressPercent}%
                              </span>
                            </div>
                            <div className="h-1.5 w-full bg-zinc-950/80 rounded-full overflow-hidden border border-white/5">
                              <div
                                className={`h-full rounded-full transition-all duration-500 ${
                                  isCompleted
                                    ? 'bg-gradient-to-r from-emerald-500/70 to-emerald-400'
                                    : act.status === 'in_progress'
                                    ? 'bg-gradient-to-r from-amber-500/80 to-amber-300/90'
                                    : 'bg-zinc-800/60'
                                }`}
                                style={{ width: `${act.progressPercent}%` }}
                              />
                            </div>
                          </div>
                        </div>

                        {/* Footer Section: Rewards, Meta Stats & Action Button */}
                        <div className="space-y-4 pt-4 border-t border-amber-500/15">
                          {/* Rewards Row (XP & Coins) */}
                          <div className="flex items-center justify-between text-xs font-tajawal">
                            <div className="flex items-center gap-2">
                              <span className="bg-amber-500/15 text-amber-300 font-extrabold px-3 py-1 rounded-xl border border-amber-500/30 shadow-inner flex items-center gap-1">
                                <Sparkles className="w-3 h-3 text-amber-400" />
                                +{act.xpReward} XP
                              </span>
                              <span className="bg-amber-400/15 text-amber-200 font-extrabold px-3 py-1 rounded-xl border border-amber-400/30 shadow-inner flex items-center gap-1">
                                <Coins className="w-3 h-3 text-amber-400" />
                                +{act.coinsReward}
                              </span>
                            </div>

                            {getDifficultyBadge(act.difficulty, act.difficultyLabel)}
                          </div>

                          {/* Meta Details Row (Duration & Details Hint) */}
                          <div className="flex items-center justify-between text-xs font-tajawal text-zinc-400 pt-0.5">
                            <span className="flex items-center gap-1.5">
                              <Clock className="w-3.5 h-3.5 text-amber-400" />
                              <span>المدة: {act.duration}</span>
                            </span>
                            <span className="text-[11px] text-amber-300/80 font-bold group-hover:text-amber-300 transition-colors flex items-center gap-1">
                              <Info className="w-3 h-3" />
                              <span>التفاصيل</span>
                            </span>
                          </div>

                          {/* Action Button */}
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              setSelectedActivityForDetails(act);
                            }}
                            disabled={isLocked}
                            className={`w-full py-3 px-4 rounded-xl font-cairo font-bold text-xs md:text-sm flex items-center justify-center gap-2 transition-all duration-200 cursor-pointer shadow-md ${
                              isCompleted
                                ? 'bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-200 border border-emerald-500/40 hover:scale-[1.01] active:scale-[0.98]'
                                : isLocked
                                ? 'bg-zinc-800/80 text-zinc-500 border border-zinc-700/80 cursor-not-allowed'
                                : 'bg-gradient-to-r from-amber-400 via-amber-300 to-amber-400 hover:from-amber-300 hover:to-amber-200 text-amber-950 font-black shadow-[0_0_15px_rgba(251,191,36,0.3)] hover:scale-[1.02] active:scale-[0.98]'
                            }`}
                          >
                            {isCompleted ? (
                              <>
                                <RotateCcw className="w-4 h-4 text-emerald-400" />
                                <span>مراجعة النشاط • Review Activity</span>
                              </>
                            ) : isLocked ? (
                              <>
                                <Lock className="w-4 h-4" />
                                <span>مغلق • Locked</span>
                              </>
                            ) : (
                              <>
                                <Play className="w-4 h-4 text-amber-950 fill-amber-950" />
                                <span>عرض التفاصيل وابدأ النشاط</span>
                              </>
                            )}
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </section>
            );
          })}
        </div>

        {/* Empty state if filtering yields no results */}
        {filteredActivities.length === 0 && (
          <EmptyState
            type="no_activities"
            titleAr="لا توجد أنشطة تفاعلية تطابق التصفية"
            descriptionAr="جرب اختيار تصنيف آخر أو تعديل مستوى الصعوبة وحالة النشاط للوصول إلى المسابقات والألغاز."
            onAction={() => {
              setSelectedCategory('all');
              setStatusFilter('all');
              setSelectedDifficulty('all');
            }}
            actionLabelAr="عرض جميع الأنشطة"
          />
        )}

        {/* Learning Hub Dashboard Footer Banner */}
        <div className="p-5 rounded-2xl bg-gradient-to-r from-amber-500/10 via-amber-500/5 to-transparent border border-amber-500/20 text-right space-y-1.5">
          <div className="flex items-center gap-2 text-amber-300 font-cairo font-bold text-sm">
            <Sparkles className="w-4 h-4 text-amber-400" />
            <span>نظام الأنشطة والتصنيفات التفاعلية • Interactive Learning Hub</span>
          </div>
          <p className="font-tajawal text-xs text-zinc-300 leading-relaxed">
            تم تنظيم مركز الأنشطة في 8 تصنيفات تفاعلية مستقلة لتجربة تعلم شاملة تغطي كل أنماط التفكير والألعاب والمسابقات الروحية.
          </p>
        </div>
          </>
        )}
      </div>


      {/* Activity Details Panel Modal */}
      {selectedActivityForDetails && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md dir-rtl overflow-y-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 15 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            className="relative w-full max-w-2xl my-8 rounded-3xl bg-zinc-900/95 border border-amber-500/30 shadow-[0_20px_60px_rgba(0,0,0,0.8)] overflow-hidden backdrop-blur-2xl"
          >
            {/* Top Gold Accent Bar */}
            <div className="h-1 w-full bg-gradient-to-r from-amber-500 via-amber-300 to-amber-500" />

            {/* Modal Close Button */}
            <button
              type="button"
              onClick={() => setSelectedActivityForDetails(null)}
              className="absolute top-5 left-5 w-10 h-10 rounded-full bg-zinc-800/80 hover:bg-zinc-700 text-zinc-300 hover:text-white flex items-center justify-center border border-white/10 transition-colors cursor-pointer z-10"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="p-6 md:p-8 space-y-6">
              {/* Header Info */}
              <div className="flex items-start gap-4">
                {/* Icon Badge */}
                <div className="w-16 h-16 rounded-2xl bg-amber-500/15 text-amber-400 border border-amber-500/30 flex items-center justify-center flex-shrink-0 shadow-lg shadow-amber-500/10">
                  {React.createElement(selectedActivityForDetails.icon, { className: 'w-8 h-8' })}
                </div>

                <div className="space-y-1.5 flex-1 pl-8">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-xs font-tajawal font-extrabold px-3 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30">
                      {selectedActivityForDetails.type}
                    </span>
                    {getStatusBadge(selectedActivityForDetails.status, selectedActivityForDetails.progressPercent)}
                  </div>
                  <h2 className="font-cairo font-black text-xl md:text-2xl text-amber-100 leading-snug">
                    {selectedActivityForDetails.title}
                  </h2>
                </div>
              </div>

              {/* Activity Progress Bar Section */}
              <div className="p-4 rounded-2xl bg-zinc-950/70 border border-amber-500/20 space-y-2">
                <div className="flex items-center justify-between text-xs font-tajawal">
                  <span className="font-bold text-amber-300 flex items-center gap-1.5">
                    <Flame className="w-4 h-4 text-amber-400" />
                    <span>حالة وإنجاز النشاط • Activity Progress</span>
                  </span>
                  <span className="font-extrabold text-amber-200">
                    {selectedActivityForDetails.progressPercent}%
                  </span>
                </div>
                <div className="h-2 w-full bg-zinc-900 rounded-full overflow-hidden border border-white/5">
                  <div
                    className={`h-full rounded-full transition-all duration-500 ${
                      selectedActivityForDetails.status === 'completed'
                        ? 'bg-gradient-to-r from-emerald-500 to-emerald-400'
                        : selectedActivityForDetails.status === 'in_progress'
                        ? 'bg-gradient-to-r from-amber-500 to-amber-300'
                        : 'bg-zinc-800'
                    }`}
                    style={{ width: `${selectedActivityForDetails.progressPercent}%` }}
                  />
                </div>
              </div>

              {/* Description Section */}
              <div className="p-4 rounded-2xl bg-zinc-950/60 border border-white/5 space-y-2">
                <h3 className="text-xs font-tajawal font-bold text-amber-400 flex items-center gap-1.5">
                  <Info className="w-4 h-4 text-amber-400" />
                  <span>وصف النشاط • Activity Description</span>
                </h3>
                <p className="font-tajawal text-sm text-zinc-300 leading-relaxed">
                  {selectedActivityForDetails.description}
                </p>
              </div>

              {/* Requirements & Rewards Grid (Duration, XP, Coins, Difficulty) */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {/* Duration */}
                <div className="p-3.5 rounded-2xl bg-zinc-950/70 border border-amber-500/20 space-y-1 text-center">
                  <Clock className="w-5 h-5 text-amber-400 mx-auto" />
                  <span className="text-[11px] font-tajawal text-zinc-400 block">المدة المقدرة</span>
                  <span className="text-xs font-cairo font-black text-amber-200 block">
                    {selectedActivityForDetails.duration}
                  </span>
                </div>

                {/* XP Reward */}
                <div className="p-3.5 rounded-2xl bg-zinc-950/70 border border-amber-500/20 space-y-1 text-center">
                  <Sparkles className="w-5 h-5 text-amber-400 mx-auto" />
                  <span className="text-[11px] font-tajawal text-zinc-400 block">نقاط الخبرة</span>
                  <span className="text-xs font-cairo font-black text-amber-300 block">
                    +{selectedActivityForDetails.xpReward} XP
                  </span>
                </div>

                {/* Coins Reward */}
                <div className="p-3.5 rounded-2xl bg-zinc-950/70 border border-amber-500/20 space-y-1 text-center">
                  <Coins className="w-5 h-5 text-amber-400 mx-auto" />
                  <span className="text-[11px] font-tajawal text-zinc-400 block">العملات الذهبية</span>
                  <span className="text-xs font-cairo font-black text-amber-200 block">
                    +{selectedActivityForDetails.coinsReward}
                  </span>
                </div>

                {/* Difficulty */}
                <div className="p-3.5 rounded-2xl bg-zinc-950/70 border border-amber-500/20 space-y-1 text-center">
                  <Target className="w-5 h-5 text-amber-400 mx-auto" />
                  <span className="text-[11px] font-tajawal text-zinc-400 block">مستوى الصعوبة</span>
                  <div className="flex justify-center pt-0.5">
                    {getDifficultyBadge(selectedActivityForDetails.difficulty, selectedActivityForDetails.difficultyLabel)}
                  </div>
                </div>
              </div>

              {/* Objectives Section */}
              <div className="p-5 rounded-2xl bg-zinc-950/70 border border-amber-500/20 space-y-3">
                <h3 className="text-sm font-cairo font-bold text-amber-300 flex items-center gap-2">
                  <Target className="w-4 h-4 text-amber-400" />
                  <span>أهداف النشاط والتحدي • Activity Objectives</span>
                </h3>

                <ul className="space-y-2.5">
                  {selectedActivityForDetails.objectives.map((obj, idx) => (
                    <li key={idx} className="flex items-start gap-2.5 text-xs md:text-sm font-tajawal text-zinc-200">
                      <CheckCircle2 className="w-4 h-4 text-amber-400 flex-shrink-0 mt-0.5" />
                      <span>{obj}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Start Activity Button */}
              <div className="pt-2 space-y-2">
                <button
                  type="button"
                  onClick={() => {
                    handleActionClick(selectedActivityForDetails.title, selectedActivityForDetails.status);
                    setSelectedActivityForDetails(null);
                  }}
                  disabled={selectedActivityForDetails.status === 'locked'}
                  className={`w-full py-4 px-6 rounded-2xl font-cairo font-black text-sm md:text-base flex items-center justify-center gap-2 transition-all cursor-pointer shadow-lg ${
                    selectedActivityForDetails.status === 'completed'
                      ? 'bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-200 border border-emerald-500/40 hover:scale-[1.01]'
                      : selectedActivityForDetails.status === 'locked'
                      ? 'bg-zinc-800 text-zinc-500 border border-zinc-700 cursor-not-allowed'
                      : 'bg-gradient-to-r from-amber-400 via-amber-300 to-amber-400 hover:from-amber-300 hover:to-amber-200 text-amber-950 shadow-[0_0_25px_rgba(251,191,36,0.35)] hover:scale-[1.015] active:scale-[0.98]'
                  }`}
                >
                  {selectedActivityForDetails.status === 'completed' ? (
                    <>
                      <RotateCcw className="w-5 h-5 text-emerald-400" />
                      <span>مراجعة النشاط • Review Activity</span>
                    </>
                  ) : selectedActivityForDetails.status === 'in_progress' ? (
                    <>
                      <Play className="w-5 h-5 fill-amber-950 text-amber-950" />
                      <span>متابعة النشاط • Continue Activity ({selectedActivityForDetails.progressPercent}%)</span>
                    </>
                  ) : selectedActivityForDetails.status === 'locked' ? (
                    <>
                      <Lock className="w-5 h-5" />
                      <span>النشاط مغلق حالياً • Activity Locked</span>
                    </>
                  ) : (
                    <>
                      <Play className="w-5 h-5 fill-amber-950 text-amber-950" />
                      <span>ابدأ النشاط الآن • Start Activity</span>
                    </>
                  )}
                </button>
                
                <p className="text-center text-[11px] font-tajawal text-zinc-400">
                  {selectedActivityForDetails.status === 'completed'
                    ? 'لقد أكملت هذا النشاط وحصلت على المكافآت مسبقاً.'
                    : selectedActivityForDetails.status === 'locked'
                    ? 'يرجى إكمال الأنشطة السابقة لفتح هذا التحدي.'
                    : 'عند إكمال هذا النشاط بنجاح ستتم إضافة نقاط XP والعملات الذهبية إلى حسابك.'}
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      )}

      <GlobalFooter />
    </motion.div>
  );
};

