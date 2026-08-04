export interface RankItem {
  level: number;
  titleAr: string;
  titleEn: string;
  minXP: number;
  maxXP: number;
  description: string;
  badgeIcon: string;
  isUnlocked?: boolean;
}

export interface StreakGoal {
  currentDays: number;
  targetDays: number;
  description: string;
}

export interface UserEconomyState {
  level: number;
  currentRank: RankItem;
  nextRank: RankItem;
  currentXP: number;
  minXPForLevel: number;
  maxXPForLevel: number;
  xpNeededForNextLevel: number;
  coins: number;
  currentStreak: number;
  longestStreak: number;
  weeklyGoal: StreakGoal;
  monthlyGoal: StreakGoal;
  completedSundays: number;
  totalSundays: number;
  // Rewards Summary stats
  totalXPEarned: number;
  totalCoinsEarned: number;
  activitiesCompleted: number;
  episodesCompleted: number;
  achievementsEarned: number;
  totalAchievementsCount: number;
}

export const RANKS: RankItem[] = [
  {
    level: 1,
    titleAr: 'مستكشف',
    titleEn: 'Explorer',
    minXP: 0,
    maxXP: 150,
    description: 'بداية الرحلة الروحية واستكشاف شواهد الصوم الكبير.',
    badgeIcon: 'Compass',
  },
  {
    level: 2,
    titleAr: 'تلميذ',
    titleEn: 'Disciple',
    minXP: 150,
    maxXP: 350,
    description: 'التعمق في دراسة الكلمة والمواظبة على الأنشطة والتأملات.',
    badgeIcon: 'BookOpen',
  },
  {
    level: 3,
    titleAr: 'خادم',
    titleEn: 'Servant',
    minXP: 350,
    maxXP: 600,
    description: 'الخدمة الفعالة وتطبيق قيم الصوم والمشاركة الإيجابية.',
    badgeIcon: 'Heart',
  },
  {
    level: 4,
    titleAr: 'شاهد',
    titleEn: 'Witness',
    minXP: 600,
    maxXP: 950,
    description: 'الشهادة الحية للإيمان القبطي والتفوق في اختبارات المعرفة.',
    badgeIcon: 'Eye',
  },
  {
    level: 5,
    titleAr: 'رسول',
    titleEn: 'Messenger',
    minXP: 950,
    maxXP: 1400,
    description: 'نشر المعرفة ومشاركة الشواهد الروحية مع الآخرين.',
    badgeIcon: 'Send',
  },
  {
    level: 6,
    titleAr: 'معلم',
    titleEn: 'Teacher',
    minXP: 1400,
    maxXP: 2000,
    description: 'إتقان كل دراسات الصوم وإعانة الآخرين في رحلتهم.',
    badgeIcon: 'GraduationCap',
  },
  {
    level: 7,
    titleAr: 'راعي',
    titleEn: 'Shepherd',
    minXP: 2000,
    maxXP: 2800,
    description: 'المواظبة الروحية القيادية والرعاية الأخوية.',
    badgeIcon: 'ShieldCheck',
  },
  {
    level: 8,
    titleAr: 'سفير',
    titleEn: 'Ambassador',
    minXP: 2800,
    maxXP: 4000,
    description: 'أعلى رتبة روحية - سفير لكلمة الخلاص والمحبة.',
    badgeIcon: 'Crown',
  },
];

export const USER_ECONOMY_DATA: UserEconomyState = {
  level: 3,
  currentRank: RANKS[2], // Servant (خادم)
  nextRank: RANKS[3], // Witness (شاهد)
  currentXP: 450,
  minXPForLevel: 350,
  maxXPForLevel: 600,
  xpNeededForNextLevel: 150, // 600 - 450
  coins: 120,
  currentStreak: 5,
  longestStreak: 12,
  weeklyGoal: {
    currentDays: 5,
    targetDays: 7,
    description: 'هدف التعلم الأسبوعي (5 من 7 أيام)',
  },
  monthlyGoal: {
    currentDays: 18,
    targetDays: 25,
    description: 'هدف المواظبة الشهري (18 من 25 يوماً)',
  },
  completedSundays: 2,
  totalSundays: 7,
  // Rewards Summary placeholder values
  totalXPEarned: 1250,
  totalCoinsEarned: 380,
  activitiesCompleted: 14,
  episodesCompleted: 2,
  achievementsEarned: 6,
  totalAchievementsCount: 12,
};

export const ECONOMY_INFO = {
  xp: {
    title: 'نقاط الخبرة (XP)',
    englishTitle: 'Learning Progress XP',
    description: 'تمثل نقاط XP مدى تقدمك التعليمي والروحي والاستفادة من مشاهَدات الحلقات والتفاعل مع الأنشطة والاختبارات والألغاز.',
    icon: 'Sparkles',
    color: 'emerald',
  },
  coins: {
    title: 'العملات الذهبية (Coins)',
    englishTitle: 'Store Reward Currency',
    description: 'تمثل العملات الذهبية رصيد المكافآت المكتسبة التي يمكنك استخدامها واستبدالها داخل متجر الهدايا القبطية والكتب والأيقونات.',
    icon: 'Coins',
    color: 'amber',
  },
  level: {
    title: 'المستوى الحالي (Level)',
    englishTitle: 'Current Spiritual Level',
    description: 'يرتفع مستواك الروحي والتعليمي تلقائياً كلما جمعت المزيد من نقاط الخبرة XP لفتح مزايا وشارات جديدة.',
    icon: 'Trophy',
    color: 'amber',
  },
};
