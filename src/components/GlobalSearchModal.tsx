import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Search,
  X,
  Tv,
  Target,
  ShoppingBag,
  Award,
  BookOpen,
  Sparkles,
  ArrowLeft,
  ChevronRight,
  Filter,
  Flame,
  CheckCircle2,
  CornerDownLeft,
} from 'lucide-react';
import { ActiveSection } from '../types';
import { EmptyState } from './EmptyState';

export type SearchCategory = 'all' | 'episodes' | 'activities' | 'products' | 'achievements' | 'bible';

interface SearchItem {
  id: string;
  category: Exclude<SearchCategory, 'all'>;
  titleAr: string;
  titleEn: string;
  subtitleAr: string;
  subtitleEn: string;
  badgeAr: string;
  badgeColor: string;
  sectionTarget: ActiveSection;
  icon: React.FC<{ className?: string }>;
}

const SEARCH_PLACEHOLDER_DATA: SearchItem[] = [
  // 1. Episodes
  {
    id: 'ep-1',
    category: 'episodes',
    titleAr: 'الأحد الأول: أحد الكنوز',
    titleEn: 'Sunday 1: Sunday of Treasures',
    subtitleAr: 'متى 6: 19-34 • العظة على الجبل وكنوز السماء',
    subtitleEn: 'Matt 6:19-34 • Sermon on the Mount & Heavenly Treasures',
    badgeAr: 'الحلقة 1',
    badgeColor: 'bg-amber-500/15 text-amber-300 border-amber-500/30',
    sectionTarget: 'episode',
    icon: Tv,
  },
  {
    id: 'ep-2',
    category: 'episodes',
    titleAr: 'الأحد الثاني: أحد التجربة',
    titleEn: 'Sunday 2: Sunday of Temptation',
    subtitleAr: 'متى 4: 1-11 • نصرة المسيح على الجبل بالنصوص المقدسة',
    subtitleEn: 'Matt 4:1-11 • Christ’s Victory over Temptation in the Wilderness',
    badgeAr: 'الحلقة 2',
    badgeColor: 'bg-amber-500/15 text-amber-300 border-amber-500/30',
    sectionTarget: 'episode',
    icon: Tv,
  },
  {
    id: 'ep-3',
    category: 'episodes',
    titleAr: 'الأحد الثالث: أحد الابن الضال',
    titleEn: 'Sunday 3: Sunday of Prodigal Son',
    subtitleAr: 'لوقا 15: 11-32 • محبة الآب الفائقة والغفران الأبدي',
    subtitleEn: 'Luke 15:11-32 • The Father’s Infinite Love & Forgiveness',
    badgeAr: 'الحلقة 3',
    badgeColor: 'bg-amber-500/15 text-amber-300 border-amber-500/30',
    sectionTarget: 'episode',
    icon: Tv,
  },
  {
    id: 'ep-4',
    category: 'episodes',
    titleAr: 'الأحد الرابع: أحد السامرية',
    titleEn: 'Sunday 4: Sunday of Samaritan Woman',
    subtitleAr: 'يوحنا 4: 1-42 • ماء الحياة الأبدي والعبادة بالروح والحق',
    subtitleEn: 'John 4:1-42 • Living Water & Worship in Spirit and Truth',
    badgeAr: 'الحلقة 4',
    badgeColor: 'bg-amber-500/15 text-amber-300 border-amber-500/30',
    sectionTarget: 'episode',
    icon: Tv,
  },
  {
    id: 'ep-5',
    category: 'episodes',
    titleAr: 'الأحد الخامس: أحد المخلع',
    titleEn: 'Sunday 5: Sunday of Paralytic',
    subtitleAr: 'يوحنا 5: 1-18 • شفاء بركة بيت حسدا وقوة المغفرة',
    subtitleEn: 'John 5:1-18 • Bethesda Pool Healing & Divine Restoration',
    badgeAr: 'الحلقة 5',
    badgeColor: 'bg-amber-500/15 text-amber-300 border-amber-500/30',
    sectionTarget: 'episode',
    icon: Tv,
  },
  {
    id: 'ep-6',
    category: 'episodes',
    titleAr: 'الأحد السادس: أحد المولود أعمى',
    titleEn: 'Sunday 6: Sunday of Born Blind',
    subtitleAr: 'يوحنا 9: 1-41 • نور العالم وفتح أعين البصيرة والقلب',
    subtitleEn: 'John 9:1-41 • Light of the World & Opening Inner Eyes',
    badgeAr: 'الحلقة 6',
    badgeColor: 'bg-amber-500/15 text-amber-300 border-amber-500/30',
    sectionTarget: 'episode',
    icon: Tv,
  },

  // 2. Activities
  {
    id: 'act-1',
    category: 'activities',
    titleAr: 'اختبار آيات ومفاهيم أحد الكنوز',
    titleEn: 'Treasures Sunday Verses Quiz',
    subtitleAr: '10 أسئلة تفاعلية حول كنز السماء وعدم الاهتمام بالغد',
    subtitleEn: '10 Interactive questions on heavenly wealth',
    badgeAr: 'اختبار • Quiz',
    badgeColor: 'bg-purple-500/15 text-purple-300 border-purple-500/30',
    sectionTarget: 'quiz',
    icon: Target,
  },
  {
    id: 'act-2',
    category: 'activities',
    titleAr: 'لغز الأيقونة القبطية المشفرة',
    titleEn: 'Coptic Encoded Icon Puzzle',
    subtitleAr: 'ترتيب أجزاء أيقونة القيامة واكتشاف الرموز الكنسية',
    subtitleEn: 'Assemble Coptic Resurrection icon pieces',
    badgeAr: 'لغز • Puzzle',
    badgeColor: 'bg-purple-500/15 text-purple-300 border-purple-500/30',
    sectionTarget: 'puzzle',
    icon: Target,
  },
  {
    id: 'act-3',
    category: 'activities',
    titleAr: 'كلمات متقاطعة: ألحان وأسبوع آلام الصوم',
    titleEn: 'Holy Week & Hymns Crossword',
    subtitleAr: 'حل شبكة الكلمات حول الحان آحاد الصوم المقدس',
    subtitleEn: 'Solve the crossword network on Lent Coptic hymns',
    badgeAr: 'كلمات متقاطعة',
    badgeColor: 'bg-purple-500/15 text-purple-300 border-purple-500/30',
    sectionTarget: 'crossword',
    icon: Target,
  },

  // 3. Products
  {
    id: 'prod-1',
    category: 'products',
    titleAr: 'كتاب الأجبية القبطية المذهبة باللغتين',
    titleEn: 'Gilded Coptic Agpeya Book (Bilingual)',
    subtitleAr: 'صلوات الساعات السبع باللغات القبطية والعربية والإنجليزية',
    subtitleEn: 'Seven Canonical Hours Prayers in Coptic & Arabic',
    badgeAr: '120 🪙 • متجر',
    badgeColor: 'bg-emerald-500/15 text-emerald-300 border-emerald-500/30',
    sectionTarget: 'store',
    icon: ShoppingBag,
  },
  {
    id: 'prod-2',
    category: 'products',
    titleAr: 'صليب الخشب الزيتوني الحفري العتيق',
    titleEn: 'Carved Antique Olive Wood Cross',
    subtitleAr: 'صنيعة يدوية من أخشاب الزيتون المقدسة بالحفر القبطي',
    subtitleEn: 'Handmade Coptic carved cross from Jerusalem olive wood',
    badgeAr: '250 🪙 • متجر',
    badgeColor: 'bg-emerald-500/15 text-emerald-300 border-emerald-500/30',
    sectionTarget: 'store',
    icon: ShoppingBag,
  },
  {
    id: 'prod-3',
    category: 'products',
    titleAr: 'أيقونة البشارة والقيامة الفاخرة',
    titleEn: 'Deluxe Annunciation & Resurrection Icon',
    subtitleAr: 'طباعة كنسية فاخرة مطعمة بالرقائق الذهبية',
    subtitleEn: 'Luxury Coptic Icon with gold leaf foil accents',
    badgeAr: '350 🪙 • متجر',
    badgeColor: 'bg-emerald-500/15 text-emerald-300 border-emerald-500/30',
    sectionTarget: 'store',
    icon: ShoppingBag,
  },

  // 4. Achievements
  {
    id: 'ach-1',
    category: 'achievements',
    titleAr: 'وسام شعلة المواظبة اليومية (7 أيام)',
    titleEn: '7-Day Daily Streak Flame Badge',
    subtitleAr: 'مستمر في متابعة دروس ودراسات الصوم لمدة أسبوع كامل',
    subtitleEn: 'Active daily study streak for 7 consecutive days',
    badgeAr: 'وسام • Badge',
    badgeColor: 'bg-rose-500/15 text-rose-300 border-rose-500/30',
    sectionTarget: 'achievements',
    icon: Award,
  },
  {
    id: 'ach-2',
    category: 'achievements',
    titleAr: 'وسام حارس الألحان القبطية الأصيلة',
    titleEn: 'Coptic Sacred Hymns Guardian Medal',
    subtitleAr: 'استمع وحفظ ألحان الصوم الكبير كاملة عبر المنصة',
    subtitleEn: 'Mastered all Coptic Great Lent liturgical hymns',
    badgeAr: 'ميدالية • Medal',
    badgeColor: 'bg-rose-500/15 text-rose-300 border-rose-500/30',
    sectionTarget: 'achievements',
    icon: Award,
  },

  // 5. Bible References
  {
    id: 'bib-1',
    category: 'bible',
    titleAr: '«لاَ تَكْنِزُوا لَكُمْ كُنُوزًا عَلَى الأَرْضِ... بَلِ اكْنِزُوا لَكُمْ كُنُوزًا فِي السَّمَاءِ»',
    titleEn: '“Do not store up for yourselves treasures on earth... but in heaven”',
    subtitleAr: 'إنجيل متى 6: 19-20 • شاهد الأحد الأول من الصوم',
    subtitleEn: 'Gospel of Matthew 6:19-20 • Sunday of Treasures',
    badgeAr: 'متى 6: 19',
    badgeColor: 'bg-sky-500/15 text-sky-300 border-sky-500/30',
    sectionTarget: 'episode',
    icon: BookOpen,
  },
  {
    id: 'bib-2',
    category: 'bible',
    titleAr: '«مَكْتُوبٌ: لَيْسَ بِالْخُبْزِ وَحْدَهُ يَحْيَا الإِنْسَانُ بَلْ بِكُلِّ كَلِمَةٍ تَخْرُجُ مِنْ فَمِ اللهِ»',
    titleEn: '“Man shall not live by bread alone, but by every word of God”',
    subtitleAr: 'إنجيل متى 4: 4 • شاهد الأحد الثاني من الصوم',
    subtitleEn: 'Gospel of Matthew 4:4 • Sunday of Temptation',
    badgeAr: 'متى 4: 4',
    badgeColor: 'bg-sky-500/15 text-sky-300 border-sky-500/30',
    sectionTarget: 'episode',
    icon: BookOpen,
  },
  {
    id: 'bib-3',
    category: 'bible',
    titleAr: '«أَقُومُ وَأَذْهَبُ إِلَى أَبِي وَأَقُولُ لَهُ: يَا أَبِي، أَخْطَأْتُ إِلَى السَّمَاءِ وَقُدَّامَكَ»',
    titleEn: '“I will set out and go back to my father and say to him: Father, I have sinned”',
    subtitleAr: 'إنجيل لوقا 15: 18 • شاهد الأحد الثالث (الابن الضال)',
    subtitleEn: 'Gospel of Luke 15:18 • Sunday of Prodigal Son',
    badgeAr: 'لوقا 15: 18',
    badgeColor: 'bg-sky-500/15 text-sky-300 border-sky-500/30',
    sectionTarget: 'episode',
    icon: BookOpen,
  },
  {
    id: 'bib-4',
    category: 'bible',
    titleAr: '«كُلُّ مَنْ يَشْرَبُ مِنْ هذَا الْمَاءِ يَعْطَشُ أَيْضًا. وَلكِنْ مَنْ يَشْرَبُ مِنَ الْمَاءِ الَّذِي أُعْطِيهِ... فَلَنْ يَعْطَشَ»',
    titleEn: '“Whoever drinks of the water that I give him will never thirst”',
    subtitleAr: 'إنجيل يوحنا 4: 13-14 • شاهد الأحد الرابع (السامرية)',
    subtitleEn: 'Gospel of John 4:13-14 • Sunday of Samaritan Woman',
    badgeAr: 'يوحنا 4: 13',
    badgeColor: 'bg-sky-500/15 text-sky-300 border-sky-500/30',
    sectionTarget: 'episode',
    icon: BookOpen,
  },
];

interface GlobalSearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (section: ActiveSection) => void;
}

export const GlobalSearchModal: React.FC<GlobalSearchModalProps> = ({
  isOpen,
  onClose,
  onNavigate,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<SearchCategory>('all');

  // Handle ESC shortcut
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  // Filtered results memo
  const filteredResults = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    return SEARCH_PLACEHOLDER_DATA.filter((item) => {
      // Category filter
      if (activeCategory !== 'all' && item.category !== activeCategory) {
        return false;
      }
      // Query filter
      if (!query) return true;
      return (
        item.titleAr.toLowerCase().includes(query) ||
        item.titleEn.toLowerCase().includes(query) ||
        item.subtitleAr.toLowerCase().includes(query) ||
        item.subtitleEn.toLowerCase().includes(query) ||
        item.badgeAr.toLowerCase().includes(query)
      );
    });
  }, [searchQuery, activeCategory]);

  const categoryPills: { id: SearchCategory; labelAr: string; icon: React.FC<{ className?: string }> }[] = [
    { id: 'all', labelAr: 'الكل • All', icon: Sparkles },
    { id: 'episodes', labelAr: 'الحلقات • Episodes', icon: Tv },
    { id: 'activities', labelAr: 'الأنشطة • Activities', icon: Target },
    { id: 'products', labelAr: 'المتجر • Store', icon: ShoppingBag },
    { id: 'achievements', labelAr: 'الإنجازات • Badges', icon: Award },
    { id: 'bible', labelAr: 'الشواهد • Scriptures', icon: BookOpen },
  ];

  const popularSearches = [
    'حد الكنوز',
    'الابن الضال',
    'الأجبية القبطية',
    'متى 6',
    'وسام الشعلة',
    'كلمات متقاطعة',
  ];

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 px-4 bg-black/80 backdrop-blur-md dir-rtl overflow-hidden">
        {/* Backdrop click to close */}
        <motion.div
          className="absolute inset-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        />

        {/* Modal Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: -20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: -20 }}
          transition={{ duration: 0.25, ease: 'easeOut' }}
          className="relative w-full max-w-3xl bg-zinc-950 border border-amber-500/30 rounded-3xl shadow-[0_0_50px_rgba(0,0,0,0.9)] overflow-hidden flex flex-col max-h-[82vh] z-10"
        >
          {/* Header Search Input Bar */}
          <div className="p-4 sm:p-5 border-b border-amber-500/20 bg-zinc-900/90 flex items-center gap-3">
            <Search className="w-6 h-6 text-amber-400 shrink-0" />
            
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="ابحث عن أفرودة، حلقة، نشاط، منتج، أو شاهد كتابي... (Search)"
              className="w-full bg-transparent text-amber-100 placeholder:text-zinc-500 font-cairo text-sm sm:text-base outline-none border-none"
              autoFocus
            />

            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="p-1 rounded-full text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            )}

            <button
              type="button"
              onClick={onClose}
              className="px-2.5 py-1 rounded-xl bg-zinc-800 border border-zinc-700 text-xs font-tajawal text-zinc-300 hover:bg-zinc-700 transition-colors cursor-pointer hidden sm:flex items-center gap-1 shrink-0"
            >
              <span>إغلاق</span>
              <kbd className="text-[10px] font-mono text-zinc-400 bg-zinc-900 px-1 rounded">Esc</kbd>
            </button>
          </div>

          {/* Category Filter Pills */}
          <div className="p-3 bg-zinc-900/50 border-b border-white/5 flex items-center gap-2 overflow-x-auto no-scrollbar">
            {categoryPills.map((pill) => {
              const PillIcon = pill.icon;
              const isSelected = activeCategory === pill.id;
              return (
                <button
                  key={pill.id}
                  type="button"
                  onClick={() => setActiveCategory(pill.id)}
                  className={`px-3 py-1.5 rounded-2xl text-xs font-tajawal font-bold transition-all shrink-0 flex items-center gap-1.5 cursor-pointer ${
                    isSelected
                      ? 'bg-amber-500 text-zinc-950 font-black shadow-[0_0_12px_rgba(251,191,36,0.3)] scale-105'
                      : 'bg-zinc-900/80 text-zinc-300 hover:bg-zinc-800 border border-zinc-800'
                  }`}
                >
                  <PillIcon className={`w-3.5 h-3.5 ${isSelected ? 'text-zinc-950' : 'text-amber-400/80'}`} />
                  <span>{pill.labelAr.split('•')[0].trim()}</span>
                </button>
              );
            })}
          </div>

          {/* Results Area */}
          <div className="p-4 sm:p-6 overflow-y-auto space-y-3 flex-1">
            {filteredResults.length > 0 ? (
              <div className="space-y-2.5">
                <div className="flex items-center justify-between text-xs font-tajawal text-zinc-400 pb-1">
                  <span>نتائج البحث ({filteredResults.length})</span>
                  <span className="text-[10px] text-amber-400/80">انقر للذهاب المباشر للقسم</span>
                </div>

                {filteredResults.map((item) => {
                  const ItemIcon = item.icon;
                  return (
                    <motion.div
                      key={item.id}
                      whileHover={{ scale: 1.01, x: -3 }}
                      onClick={() => {
                        onNavigate(item.sectionTarget);
                        onClose();
                      }}
                      className="p-3.5 sm:p-4 rounded-2xl bg-zinc-900/80 border border-amber-500/15 hover:border-amber-500/40 hover:bg-zinc-900 transition-all cursor-pointer flex items-center justify-between gap-4 group"
                    >
                      <div className="flex items-center gap-3.5">
                        <div className="w-10 h-10 rounded-2xl bg-zinc-950 border border-amber-500/30 flex items-center justify-center shrink-0 group-hover:border-amber-400 transition-colors">
                          <ItemIcon className="w-5 h-5 text-amber-400" />
                        </div>

                        <div className="space-y-0.5 text-right">
                          <div className="flex flex-wrap items-center gap-2">
                            <h5 className="font-cairo font-bold text-sm text-amber-100 group-hover:text-amber-300 transition-colors">
                              {item.titleAr}
                            </h5>
                            <span className={`text-[10px] font-tajawal font-bold px-2 py-0.5 rounded-full border ${item.badgeColor}`}>
                              {item.badgeAr}
                            </span>
                          </div>

                          <p className="text-xs font-tajawal text-zinc-400 line-clamp-1">
                            {item.subtitleAr}
                          </p>
                        </div>
                      </div>

                      <div className="shrink-0 flex items-center text-amber-400 opacity-60 group-hover:opacity-100 group-hover:translate-x-[-2px] transition-all">
                        <CornerDownLeft className="w-4 h-4" />
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            ) : (
              <EmptyState
                type="no_search_results"
                titleAr={`لم نجد نتائج تطابق "${searchQuery}"`}
                descriptionAr="تأكد من كتابة اسم الكنز أو الأحد أو الشاهد الكتابي بشكل صحيح، أو اختر تصنيفاً آخر."
                onAction={() => {
                  setSearchQuery('');
                  setActiveCategory('all');
                }}
                actionLabelAr="عرض جميع المحتويات"
              />
            )}
          </div>

          {/* Footer Popular Search Suggestions */}
          <div className="p-3 sm:p-4 bg-zinc-900/80 border-t border-amber-500/20 flex flex-wrap items-center justify-between gap-2 text-xs font-tajawal">
            <div className="flex items-center gap-1.5 text-amber-300/80 font-bold">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>بحث شائع:</span>
            </div>

            <div className="flex flex-wrap items-center gap-1.5">
              {popularSearches.map((tag) => (
                <button
                  key={tag}
                  type="button"
                  onClick={() => setSearchQuery(tag)}
                  className="px-2.5 py-1 rounded-xl bg-zinc-950 border border-amber-500/20 text-zinc-300 hover:text-amber-300 hover:border-amber-500/40 transition-colors cursor-pointer text-[11px]"
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
