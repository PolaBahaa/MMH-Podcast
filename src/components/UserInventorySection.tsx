import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { EmptyState } from './EmptyState';
import {
  Package,
  Book,
  BookOpen,
  Flame,
  Image as ImageIcon,
  Gift,
  Search,
  Filter,
  Calendar,
  CheckCircle2,
  Clock,
  Truck,
  Sparkles,
  ShoppingBag,
  Tag,
  Hash,
  ChevronDown,
  Info,
} from 'lucide-react';

export interface InventoryItem {
  id: string;
  nameAr: string;
  nameEn: string;
  category: 'books' | 'agpeya' | 'candles' | 'icons' | 'gifts';
  categoryLabelAr: string;
  imageUrl: string;
  redemptionDateAr: string;
  redemptionDateEn: string;
  status: 'delivered' | 'ready' | 'in_transit' | 'processing';
  statusLabelAr: string;
  statusLabelEn: string;
  coinsSpent: number;
  orderNumber: string;
  descriptionAr: string;
}

const INVENTORY_DATA: InventoryItem[] = [
  // 1. Books Category
  {
    id: 'inv-book-1',
    nameAr: 'كتاب: بستان الرهبان وقصص الآباء القديسين',
    nameEn: 'Garden of Monks & Fathers Stories',
    category: 'books',
    categoryLabelAr: 'الكتب والمؤلفات • Books',
    imageUrl: 'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&w=600&q=80',
    redemptionDateAr: '20 يوليو 2026',
    redemptionDateEn: 'July 20, 2026',
    status: 'delivered',
    statusLabelAr: 'تم التسليم بنجاح',
    statusLabelEn: 'Delivered',
    coinsSpent: 160,
    orderNumber: '#ORD-2026-4402',
    descriptionAr: 'نسخة فاخرة مجلدة تجمع حكم وقصص آباء البرية الصومية.',
  },
  {
    id: 'inv-book-2',
    nameAr: 'دراسات في سفر التكوين وقراءات الصوم الكبير',
    nameEn: 'Genesis & Great Lent Readings Study',
    category: 'books',
    categoryLabelAr: 'الكتب والمؤلفات • Books',
    imageUrl: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=600&q=80',
    redemptionDateAr: '28 يوليو 2026',
    redemptionDateEn: 'July 28, 2026',
    status: 'delivered',
    statusLabelAr: 'تم التسليم بنجاح',
    statusLabelEn: 'Delivered',
    coinsSpent: 220,
    orderNumber: '#ORD-2026-5120',
    descriptionAr: 'تفسير آبائي مبسط لقراءات إشياء العهد القديم وتكوين.',
  },

  // 2. Agpeya Category
  {
    id: 'inv-agp-1',
    nameAr: 'أجبية القديسين الذهبية (كتاب صلوات السواعي)',
    nameEn: 'Golden Agpeya Prayer Book',
    category: 'agpeya',
    categoryLabelAr: 'صلوات الأجبية والسواعي • Agpeya',
    imageUrl: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=600&q=80',
    redemptionDateAr: '4 أغسطس 2026',
    redemptionDateEn: 'August 4, 2026',
    status: 'processing',
    statusLabelAr: 'قيد المعالجة والإعداد',
    statusLabelEn: 'Processing',
    coinsSpent: 350,
    orderNumber: '#ORD-2026-9412',
    descriptionAr: 'كتاب صلوات السواعي السبع مطبوع بماء الذهب وحجم جيب مريح.',
  },
  {
    id: 'inv-agp-2',
    nameAr: 'كتيب صلاة نصف الليل والأجبية المعربة',
    nameEn: 'Midnight Prayer & Arabic-Coptic Agpeya',
    category: 'agpeya',
    categoryLabelAr: 'صلوات الأجبية والسواعي • Agpeya',
    imageUrl: 'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?auto=format&fit=crop&w=600&q=80',
    redemptionDateAr: '15 يوليو 2026',
    redemptionDateEn: 'July 15, 2026',
    status: 'delivered',
    statusLabelAr: 'تم التسليم بنجاح',
    statusLabelEn: 'Delivered',
    coinsSpent: 120,
    orderNumber: '#ORD-2026-1029',
    descriptionAr: 'دليل الصلوات الليلية وتأملات مزمور 119 الكبير.',
  },

  // 3. Candles Category
  {
    id: 'inv-can-1',
    nameAr: 'طقم شموع العسل الطبيعي المعطرة بالبخور',
    nameEn: 'Natural Beeswax Incense Candles Set',
    category: 'candles',
    categoryLabelAr: 'الشموع والمباخر المقدسة • Candles',
    imageUrl: 'https://images.unsplash.com/photo-1603006905003-be475563bc59?auto=format&fit=crop&w=600&q=80',
    redemptionDateAr: '2 أغسطس 2026',
    redemptionDateEn: 'August 2, 2026',
    status: 'in_transit',
    statusLabelAr: 'جاري الشحن والتوصيل',
    statusLabelEn: 'In Transit',
    coinsSpent: 180,
    orderNumber: '#ORD-2026-8103',
    descriptionAr: 'مجموعة 12 شمعة شمع عسل طبيعي 100% لخلوات الصوم والمذبح المنزلي.',
  },
  {
    id: 'inv-can-2',
    nameAr: 'مبخرة نحاسية طقسية مصقولة مع بخور أورشليم',
    nameEn: 'Liturgical Brass Censer & Jerusalem Incense',
    category: 'candles',
    categoryLabelAr: 'الشموع والمباخر المقدسة • Candles',
    imageUrl: 'https://images.unsplash.com/photo-1548625149-fc4a29cf7092?auto=format&fit=crop&w=600&q=80',
    redemptionDateAr: '29 يوليو 2026',
    redemptionDateEn: 'July 29, 2026',
    status: 'delivered',
    statusLabelAr: 'تم التسليم بنجاح',
    statusLabelEn: 'Delivered',
    coinsSpent: 290,
    orderNumber: '#ORD-2026-6731',
    descriptionAr: 'مبخرة نحاسية بتصميم قبطي تقليدي مع حبات بخور الميرون العطري.',
  },

  // 4. Icons Category
  {
    id: 'inv-ico-1',
    nameAr: 'أيقونة السيد المسيح المعلم (طراز قبطي أثري)',
    nameEn: 'Christ the Teacher Coptic Icon',
    category: 'icons',
    categoryLabelAr: 'الأيقونات المقدسة • Icons',
    imageUrl: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b675?auto=format&fit=crop&w=600&q=80',
    redemptionDateAr: '31 يوليو 2026',
    redemptionDateEn: 'July 31, 2026',
    status: 'ready',
    statusLabelAr: 'جاهز للاستلام بالمقر',
    statusLabelEn: 'Ready for Pickup',
    coinsSpent: 400,
    orderNumber: '#ORD-2026-7789',
    descriptionAr: 'أيقونة خشبية يدوية الصنع بألوان الذهب العتيق والرقائق المقدسة.',
  },
  {
    id: 'inv-ico-2',
    nameAr: 'أيقونة العذراء مريم والطفل يسوع (دير السريان)',
    nameEn: 'St. Mary & Infant Jesus Monastery Icon',
    category: 'icons',
    categoryLabelAr: 'الأيقونات المقدسة • Icons',
    imageUrl: 'https://images.unsplash.com/photo-1563089145-599997674d42?auto=format&fit=crop&w=600&q=80',
    redemptionDateAr: '18 يوليو 2026',
    redemptionDateEn: 'July 18, 2026',
    status: 'delivered',
    statusLabelAr: 'تم التسليم بنجاح',
    statusLabelEn: 'Delivered',
    coinsSpent: 320,
    orderNumber: '#ORD-2026-2390',
    descriptionAr: 'لوحة أيقونة ديرية معالجة برنيش حماية ضد عوامل الزمن.',
  },

  // 5. Gifts Category
  {
    id: 'inv-gft-1',
    nameAr: 'صليب خشب الزيتون المقدس (خشب زكريات أورشليم)',
    nameEn: 'Jerusalem Olive Wood Cross',
    category: 'gifts',
    categoryLabelAr: 'الهدايا التذكارية والمقتنيات • Gifts',
    imageUrl: 'https://images.unsplash.com/photo-1548625149-fc4a29cf7092?auto=format&fit=crop&w=600&q=80',
    redemptionDateAr: '3 أغسطس 2026',
    redemptionDateEn: 'August 3, 2026',
    status: 'in_transit',
    statusLabelAr: 'جاري الشحن والتوصيل',
    statusLabelEn: 'In Transit',
    coinsSpent: 240,
    orderNumber: '#ORD-2026-8841',
    descriptionAr: 'صليب يدوي محفور من خشب الزيتون الطبيعي ومسكون بالبركة.',
  },
  {
    id: 'inv-gft-2',
    nameAr: 'ميدالية تذكارية بشعار MMH Podcast 2026',
    nameEn: 'MMH Podcast 2026 Commemorative Keychain',
    category: 'gifts',
    categoryLabelAr: 'الهدايا التذكارية والمقتنيات • Gifts',
    imageUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=600&q=80',
    redemptionDateAr: '10 يوليو 2026',
    redemptionDateEn: 'July 10, 2026',
    status: 'delivered',
    statusLabelAr: 'تم التسليم بنجاح',
    statusLabelEn: 'Delivered',
    coinsSpent: 80,
    orderNumber: '#ORD-2026-0042',
    descriptionAr: 'ميدالية معدنية مطعمة باللون الذهبي تحمل حكمة آحاد الصوم.',
  },
];

const CATEGORIES: { id: 'all' | 'books' | 'agpeya' | 'candles' | 'icons' | 'gifts'; labelAr: string; icon: any }[] = [
  { id: 'all', labelAr: 'كافة المقتنيات (الكل)', icon: Package },
  { id: 'books', labelAr: 'الكتب (Books)', icon: Book },
  { id: 'agpeya', labelAr: 'الأجبية (Agpeya)', icon: BookOpen },
  { id: 'candles', labelAr: 'الشموع (Candles)', icon: Flame },
  { id: 'icons', labelAr: 'الأيقونات (Icons)', icon: ImageIcon },
  { id: 'gifts', labelAr: 'الهدايا (Gifts)', icon: Gift },
];

interface UserInventorySectionProps {
  onItemSelect?: (item: InventoryItem) => void;
}

export const UserInventorySection: React.FC<UserInventorySectionProps> = ({ onItemSelect }) => {
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'books' | 'agpeya' | 'candles' | 'icons' | 'gifts'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedItemDetail, setSelectedItemDetail] = useState<InventoryItem | null>(null);

  // Filter items according to search and selected category
  const filteredItems = INVENTORY_DATA.filter((item) => {
    const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
    const matchesSearch =
      item.nameAr.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.nameEn.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.orderNumber.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // Group items by category for structured grouped display when 'all' is selected
  const groupedCategories = (['books', 'agpeya', 'candles', 'icons', 'gifts'] as const).map((catKey) => {
    const catMeta = CATEGORIES.find((c) => c.id === catKey);
    const catItems = filteredItems.filter((i) => i.category === catKey);
    return {
      key: catKey,
      labelAr: catMeta?.labelAr || catKey,
      Icon: catMeta?.icon || Package,
      items: catItems,
    };
  }).filter((group) => group.items.length > 0);

  const getStatusBadge = (status: InventoryItem['status'], labelAr: string) => {
    switch (status) {
      case 'delivered':
        return (
          <span className="px-3 py-1 rounded-full text-[11px] font-cairo font-bold bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 flex items-center gap-1.5 shrink-0">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
            <span>{labelAr}</span>
          </span>
        );
      case 'ready':
        return (
          <span className="px-3 py-1 rounded-full text-[11px] font-cairo font-bold bg-amber-500/15 border border-amber-500/30 text-amber-300 flex items-center gap-1.5 shrink-0 animate-pulse">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>{labelAr}</span>
          </span>
        );
      case 'in_transit':
        return (
          <span className="px-3 py-1 rounded-full text-[11px] font-cairo font-bold bg-sky-500/15 border border-sky-500/30 text-sky-300 flex items-center gap-1.5 shrink-0">
            <Truck className="w-3.5 h-3.5 text-sky-400" />
            <span>{labelAr}</span>
          </span>
        );
      case 'processing':
      default:
        return (
          <span className="px-3 py-1 rounded-full text-[11px] font-cairo font-bold bg-purple-500/15 border border-purple-500/30 text-purple-300 flex items-center gap-1.5 shrink-0">
            <Clock className="w-3.5 h-3.5 text-purple-400" />
            <span>{labelAr}</span>
          </span>
        );
    }
  };

  return (
    <div className="space-y-6 dir-rtl select-none">
      {/* Top Section Header */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pb-4 border-b border-amber-500/20">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-amber-500/15 border border-amber-500/30 flex items-center justify-center text-amber-400 shadow-md">
            <Package className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-cairo font-black text-xl text-amber-100 flex items-center gap-2">
              مقتنياتي المستبدلة • User Inventory
            </h3>
            <p className="text-xs font-tajawal text-zinc-400">
              سجل كافة المنتجات والمقتنيات الروحية التي قمت باستبدالها بفضل العملات
            </p>
          </div>
        </div>

        {/* Counter Badge */}
        <div className="flex items-center gap-2 bg-amber-500/10 px-4 py-2 rounded-2xl border border-amber-500/20 text-xs font-cairo font-bold text-amber-300">
          <ShoppingBag className="w-4 h-4 text-amber-400" />
          <span>إجمالي العناصر المستبدلة: {INVENTORY_DATA.length} مقتنيات</span>
        </div>
      </div>

      {/* Filter Category Tabs & Search Input */}
      <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4">
        {/* Category Filter Pills */}
        <div className="flex flex-wrap items-center gap-2">
          {CATEGORIES.map((cat) => {
            const CatIcon = cat.icon;
            const isSelected = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-3.5 py-2 rounded-2xl text-xs font-cairo font-bold transition-all flex items-center gap-2 cursor-pointer shadow-sm ${
                  isSelected
                    ? 'bg-gradient-to-r from-amber-500 via-amber-400 to-amber-300 text-amber-950 font-black shadow-[0_0_15px_rgba(251,191,36,0.4)] scale-105'
                    : 'bg-zinc-900 hover:bg-zinc-800 text-zinc-300 border border-white/10'
                }`}
              >
                <CatIcon className={`w-4 h-4 ${isSelected ? 'text-amber-950' : 'text-amber-400'}`} />
                <span>{cat.labelAr}</span>
              </button>
            );
          })}
        </div>

        {/* Search Bar */}
        <div className="relative min-w-[240px]">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="بحث عن منتج أو رقم طلب..."
            className="w-full pl-4 pr-10 py-2.5 rounded-2xl bg-zinc-950 border border-white/10 focus:border-amber-500 text-xs font-tajawal text-amber-100 placeholder-zinc-500 outline-none transition-all"
          />
          <Search className="absolute right-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-amber-400" />
        </div>
      </div>

      {/* Main Content Area: Grouped Categories View */}
      {filteredItems.length === 0 ? (
        <EmptyState
          type={searchQuery ? 'no_search_results' : 'no_orders'}
          titleAr={searchQuery ? `لا توجد مقتنيات تطابق "${searchQuery}"` : 'لا توجد مقتنيات في هذا القسم'}
          descriptionAr={searchQuery ? 'جرب البحث بكلمة مختلفة أو اسم كتاب أو رقم طلب آخر.' : 'اختر تصنيفاً آخر أو تصفح متجر المكافآت لاستبدال هدايا جديدة.'}
          onAction={() => {
            setSearchQuery('');
            setSelectedCategory('all');
          }}
          actionLabelAr="عرض جميع المقتنيات"
        />
      ) : (
        <div className="space-y-8">
          {groupedCategories.map((group) => {
            const GroupIcon = group.Icon;
            return (
              <div key={group.key} className="space-y-4">
                {/* Category Subheader */}
                <div className="flex items-center gap-2.5 pb-2 border-b border-white/10">
                  <div className="w-7 h-7 rounded-lg bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400">
                    <GroupIcon className="w-4 h-4" />
                  </div>
                  <h4 className="font-cairo font-extrabold text-base text-amber-200">
                    {group.labelAr}
                  </h4>
                  <span className="text-xs font-tajawal text-zinc-500 mr-auto">
                    ({group.items.length} منتجات)
                  </span>
                </div>

                {/* Grid of Product Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4">
                  {group.items.map((item) => (
                    <motion.div
                      key={item.id}
                      whileHover={{ y: -2 }}
                      className="p-4 rounded-3xl bg-gradient-to-br from-zinc-900/90 via-zinc-950 to-zinc-900 border border-amber-500/20 hover:border-amber-500/50 shadow-lg flex flex-col sm:flex-row gap-4 transition-all relative overflow-hidden group"
                    >
                      {/* Product Image */}
                      <div className="relative w-full sm:w-32 h-36 sm:h-auto rounded-2xl overflow-hidden shrink-0 border border-white/10 bg-black">
                        <img
                          src={item.imageUrl}
                          alt={item.nameAr}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        <div className="absolute top-2 right-2 bg-black/70 backdrop-blur-md px-2 py-0.5 rounded-full text-[10px] font-cairo font-bold text-amber-300 border border-white/10">
                          {item.coinsSpent} 🪙
                        </div>
                      </div>

                      {/* Details Content */}
                      <div className="flex-1 flex flex-col justify-between space-y-2 min-w-0">
                        <div className="space-y-1.5">
                          {/* Order Number & Category Label */}
                          <div className="flex items-center justify-between gap-2 text-[11px] font-tajawal text-zinc-400">
                            <span className="font-cairo font-black text-amber-400 flex items-center gap-1">
                              <Hash className="w-3.5 h-3.5" />
                              {item.orderNumber}
                            </span>
                            <span className="text-zinc-500 truncate">{item.categoryLabelAr}</span>
                          </div>

                          {/* Name */}
                          <h5 className="font-cairo font-black text-sm text-amber-100 leading-snug">
                            {item.nameAr}
                          </h5>
                          <p className="text-[11px] font-tajawal text-zinc-400 line-clamp-2">
                            {item.descriptionAr}
                          </p>
                        </div>

                        {/* Footer Info: Redemption Date & Status */}
                        <div className="pt-2 border-t border-white/5 flex items-center justify-between gap-2">
                          <div className="flex items-center gap-1.5 text-[11px] font-tajawal text-zinc-400">
                            <Calendar className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                            <span>تاريخ الاستبدال: {item.redemptionDateAr}</span>
                          </div>

                          {getStatusBadge(item.status, item.statusLabelAr)}
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
