import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { USER_ECONOMY_DATA } from '../data/economyData';
import { StoreSkeleton } from './SkeletonLoaders';
import { EmptyState } from './EmptyState';
import { GlobalFooter } from './GlobalFooter';
import {

  ArrowRight,
  Coins,
  Gift,
  Sparkles,
  BookOpen,
  BookMarked,
  Flame,
  Image as ImageIcon,
  Cross,
  Bookmark,
  Church,
  Trophy,
  CheckCircle2,
  AlertCircle,
  Filter,
  ShoppingBag,
  Star,
  Search,
  ChevronLeft,
  TrendingUp,
  Tag,
  Compass,
  Baby,
  Layers,
  Heart,
  Check,
  Plus,
  Minus,
  Share2,
  ShieldCheck,
  Truck,
  Info,
  X,
  Maximize2,
  Trash2,
  Clock,
  Package,
  ClipboardList,
  Calendar,
  Hash,
} from 'lucide-react';

export interface CartItemState {
  productId: string;
  quantity: number;
}

export type OrderStatus = 'Pending' | 'Approved' | 'Preparing' | 'Ready' | 'Delivered';

export interface OrderItem {
  productId: string;
  productNameAr: string;
  productImage: string;
  quantity: number;
  unitCoins: number;
}

export interface StoreOrder {
  id: string;
  orderNumber: string;
  dateAr: string;
  items: OrderItem[];
  totalCoins: number;
  status: OrderStatus;
  statusNoteAr: string;
}

const ORDER_STATUS_CONFIG: Record<
  OrderStatus,
  {
    labelAr: string;
    labelEn: string;
    bgClass: string;
    textClass: string;
    borderClass: string;
    badgeBg: string;
    icon: React.ComponentType<{ className?: string }>;
    stepIndex: number;
    descriptionAr: string;
  }
> = {
  Pending: {
    labelAr: 'قيد الانتظار',
    labelEn: 'Pending',
    bgClass: 'bg-amber-500/15',
    textClass: 'text-amber-300',
    borderClass: 'border-amber-500/30',
    badgeBg: 'bg-amber-500',
    icon: Clock,
    stepIndex: 1,
    descriptionAr: 'تم استلام طلب الاستبدال وبانتظار المراجعة والاعتماد',
  },
  Approved: {
    labelAr: 'تم الاعتماد',
    labelEn: 'Approved',
    bgClass: 'bg-blue-500/15',
    textClass: 'text-blue-300',
    borderClass: 'border-blue-500/30',
    badgeBg: 'bg-blue-500',
    icon: CheckCircle2,
    stepIndex: 2,
    descriptionAr: 'تمت الموافقة على الطلب وخصم العملات بنجاح',
  },
  Preparing: {
    labelAr: 'جاري التحضير',
    labelEn: 'Preparing',
    bgClass: 'bg-purple-500/15',
    textClass: 'text-purple-300',
    borderClass: 'border-purple-500/30',
    badgeBg: 'bg-purple-500',
    icon: Package,
    stepIndex: 3,
    descriptionAr: 'جاري تجهيز وتغليف الكتب والأيقونات بالمكتبة',
  },
  Ready: {
    labelAr: 'جاهز للاستلام',
    labelEn: 'Ready',
    bgClass: 'bg-cyan-500/15',
    textClass: 'text-cyan-300',
    borderClass: 'border-cyan-500/30',
    badgeBg: 'bg-cyan-500',
    icon: Gift,
    stepIndex: 4,
    descriptionAr: 'طلبك جاهز للاستلام الآن من مكتب التربية الكنسية بالمطرانية',
  },
  Delivered: {
    labelAr: 'تم التسليم',
    labelEn: 'Delivered',
    bgClass: 'bg-emerald-500/15',
    textClass: 'text-emerald-300',
    borderClass: 'border-emerald-500/30',
    badgeBg: 'bg-emerald-500',
    icon: ShieldCheck,
    stepIndex: 5,
    descriptionAr: 'تم تسليم المقتنيات القبطية بنجاح وبركة الصوم معك',
  },
};

const INITIAL_PLACEHOLDER_ORDERS: StoreOrder[] = [
  {
    id: 'ord-101',
    orderNumber: '#ORD-2026-9412',
    dateAr: '4 أغسطس 2026 • 10:15 ص',
    status: 'Pending',
    statusNoteAr: 'طلبك قيد المراجعة والاعتماد من خادم مكتب التربية الكنسية.',
    totalCoins: 350,
    items: [
      {
        productId: 'prod-featured-1',
        productNameAr: 'أجبية القديسين الذهبية (كتاب صلوات السواعي)',
        productImage: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=600&q=80',
        quantity: 1,
        unitCoins: 350,
      },
    ],
  },
  {
    id: 'ord-102',
    orderNumber: '#ORD-2026-8841',
    dateAr: '3 أغسطس 2026 • 04:45 م',
    status: 'Approved',
    statusNoteAr: 'تمت الموافقة والاعتماد بطلبات الصوم، وسيتم تحضير المقتنيات.',
    totalCoins: 330,
    items: [
      {
        productId: 'prod-pop-1',
        productNameAr: 'صليب خشب الزيتون المقدس (أورشليم)',
        productImage: 'https://images.unsplash.com/photo-1548625149-fc4a29cf7092?auto=format&fit=crop&w=600&q=80',
        quantity: 2,
        unitCoins: 120,
      },
      {
        productId: 'prod-rec-1',
        productNameAr: 'سلسلة ميدالية أيكونة مارجرجس الخشبية',
        productImage: 'https://images.unsplash.com/photo-1601288496920-b6154fe3626a?auto=format&fit=crop&w=600&q=80',
        quantity: 1,
        unitCoins: 90,
      },
    ],
  },
  {
    id: 'ord-103',
    orderNumber: '#ORD-2026-7310',
    dateAr: '1 أغسطس 2026 • 01:20 م',
    status: 'Preparing',
    statusNoteAr: 'جاري تغليف وإعداد الكتب والأيقونات بالمكتبة.',
    totalCoins: 480,
    items: [
      {
        productId: 'prod-new-1',
        productNameAr: 'موسوعة تاريخ الكنيسة القبطية - المجلد الأول',
        productImage: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=600&q=80',
        quantity: 1,
        unitCoins: 480,
      },
    ],
  },
  {
    id: 'ord-104',
    orderNumber: '#ORD-2026-6105',
    dateAr: '28 يوليو 2026 • 06:00 م',
    status: 'Ready',
    statusNoteAr: 'طلبك جاهز للاستلام الآن من مكتب خدمة التربية الكنسية بالمطرانية.',
    totalCoins: 210,
    items: [
      {
        productId: 'prod-cat-cross-2',
        productNameAr: 'صليب يد نحاسي منقوش بالطرق القبطي القديم',
        productImage: 'https://images.unsplash.com/photo-1548625149-fc4a29cf7092?auto=format&fit=crop&w=600&q=80',
        quantity: 1,
        unitCoins: 210,
      },
    ],
  },
  {
    id: 'ord-105',
    orderNumber: '#ORD-2026-4402',
    dateAr: '20 يوليو 2026 • 11:00 ص',
    status: 'Delivered',
    statusNoteAr: 'تم تسليم الطلب بنجاح وبركة الصوم معك.',
    totalCoins: 160,
    items: [
      {
        productId: 'prod-rec-2',
        productNameAr: 'كتاب تجميعي: بستان الرهبان وقصص الآباء',
        productImage: 'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&w=600&q=80',
        quantity: 1,
        unitCoins: 160,
      },
    ],
  },
];

interface RewardStoreViewProps {
  onClose: () => void;
}

export type StoreCategory =
  | 'All'
  | 'Books'
  | 'Agpeya'
  | 'Candles'
  | 'Crosses'
  | 'Icons'
  | 'Church Gifts'
  | 'Children\'s Corner'
  | 'Accessories'
  | 'Collectibles';

export interface CategoryCardData {
  key: StoreCategory;
  labelAr: string;
  labelEn: string;
  icon: React.FC<{ className?: string }>;
  image: string;
  count: number;
  descriptionAr: string;
  badgeTag?: string;
}

export interface StoreProduct {
  id: string;
  nameAr: string;
  nameEn: string;
  category: StoreCategory;
  categoryLabelAr: string;
  image: string;
  galleryImages?: string[];
  requiredCoins: number;
  availability: 'In Stock' | 'Limited Stock' | 'Out of Stock';
  stockCount?: number;
  description: string;
  detailedDescriptionAr?: string;
  specifications?: { labelAr: string; valueAr: string }[];
  isFeatured?: boolean;
  isNewArrival?: boolean;
  isPopular?: boolean;
  isRecommended?: boolean;
  badgeTag?: string;
  rating?: number;
  reviewsCount?: number;
}

const PRODUCTS: StoreProduct[] = [
  // 1. Featured Products
  {
    id: 'prod-featured-1',
    nameAr: 'وسام "سفير الصوم الكبير" الذهبي',
    nameEn: 'Golden Ambassador Medal',
    category: 'Collectibles',
    categoryLabelAr: 'مقتنيات نادرة',
    image: 'https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?auto=format&fit=crop&w=800&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1579783902614-a3fb3927b675?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1548625149-fc4a29cf7092?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=800&q=80',
    ],
    requiredCoins: 500,
    availability: 'Limited Stock',
    stockCount: 5,
    description: 'ميدالية تذكارية فاخرة مطلية بالذهب تمنح للمتميزين في دراسات آحاد الصوم الكبير.',
    detailedDescriptionAr:
      'ميدالية تذكارية فاخرة إصدار خاص محدود بمناسبة الصوم الكبير 2026. مصقولة ومطليّة بماء الذهب عيار 24 مع النقوش القبطية الأيقونية المحفورة بالليزر لرموز آحاد الصوم. تأتي داخل علبة مخملية ملكية فاخرة تحمل شهادة توثيق ورقم تسلسلي نادِر.',
    specifications: [
      { labelAr: 'المادة', valueAr: 'نحاس مرصع بماء الذهب 24K' },
      { labelAr: 'الأبعاد', valueAr: 'قطر 6.5 سم - سمك 4 مم' },
      { labelAr: 'الوزن', valueAr: '120 جرام' },
      { labelAr: 'التغليف', valueAr: 'علبة قطيفة سوداء ومبطنة بالساتان' },
      { labelAr: 'المنشأ', valueAr: 'صناعة ديرية فاخرة' },
    ],
    isFeatured: true,
    badgeTag: 'مميز حائل • Highlight',
    rating: 5.0,
    reviewsCount: 48,
  },
  {
    id: 'prod-featured-2',
    nameAr: 'موسوعة حكايات آباء الصحرائيات',
    nameEn: 'Desert Fathers Encyclopedia',
    category: 'Books',
    categoryLabelAr: 'كتب روحية',
    image: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=800&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&w=800&q=80',
    ],
    requiredCoins: 180,
    availability: 'In Stock',
    stockCount: 24,
    description: 'قصص وحكم آباء الرهبنة القبطية القدامى مصوغة باللغة العربية مع شواهد روحية.',
    detailedDescriptionAr:
      'موسوعة روحية شاملة في مجلدين تضم بين دفتيها أروع السير العطرة والحكم الذهبية لآباء برية شيهيت ومصر القديمة (أنبا أنطونيوس، أنبا مقار، وأنبا باخوميوس). مطبوعة على ورق كوشيه مقوّى ذي جودة عالية ومزودة بشواهد قبطية وعربية وتأملات مخصصة لأيام الصوم.',
    specifications: [
      { labelAr: 'عدد الصفحات', valueAr: '640 صفحة (مجلدين)' },
      { labelAr: 'نوع الغلاف', valueAr: 'مجوف مقوى مذهب (Hardcover)' },
      { labelAr: 'لغة الكتاب', valueAr: 'العربية والقبطية الشائعة' },
      { labelAr: 'دار النشر', valueAr: 'مطبوعات التراث القبطي' },
    ],
    isFeatured: true,
    badgeTag: 'الأعلى تقييماً • Top Rated',
    rating: 4.9,
    reviewsCount: 124,
  },
  {
    id: 'prod-featured-3',
    nameAr: 'أيقونة قبطية خشبية للسيد المسيح',
    nameEn: 'Coptic Wooden Christ Icon',
    category: 'Icons',
    categoryLabelAr: 'أيقونات قبطية',
    image: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b675?auto=format&fit=crop&w=800&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1579783902614-a3fb3927b675?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1548625149-fc4a29cf7092?auto=format&fit=crop&w=800&q=80',
    ],
    requiredCoins: 200,
    availability: 'Limited Stock',
    stockCount: 8,
    description: 'أيقونة قبطية مصنوعة يدوياً على خشب الزيتون المعتق بتفاصيل تاريخية دقيقة.',
    detailedDescriptionAr:
      'أيقونة قبطية كلاسيكية للسيد المسيح الضابط الكل، مرسومة بألوان المينا والذهب النقي ومطليّة بورنيش حماية شفاف لمنع التأثر بالرطوبة. كل أيقونة قطة يدوية فريدة تم إعدادها بأيدي فنانين قبطيين متخصصين بكنائس الوادي.',
    specifications: [
      { labelAr: 'خامة الخشب', valueAr: 'خشب زيتون معتق طبيعي 100%' },
      { labelAr: 'المقاس', valueAr: '25 × 18 سم' },
      { labelAr: 'نوع الألوان', valueAr: 'تمبرا وألوان زيتية مع ورق ذهب' },
      { labelAr: 'التعليق', valueAr: 'مزودة بعلاقة جدارية نحاسية' },
    ],
    isFeatured: true,
    badgeTag: 'صنع يدوي • Handmade',
    rating: 4.8,
    reviewsCount: 86,
  },

  // 2. New Arrivals
  {
    id: 'prod-new-1',
    nameAr: 'شمعة البخور الصافي للصلاة',
    nameEn: 'Pure Incense Prayer Candle',
    category: 'Candles',
    categoryLabelAr: 'شموع معطرة',
    image: 'https://images.unsplash.com/photo-1603006905003-be475563bc59?auto=format&fit=crop&w=800&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1603006905003-be475563bc59?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=800&q=80',
    ],
    requiredCoins: 60,
    availability: 'In Stock',
    stockCount: 40,
    description: 'شمعة طبيعية معطرة برائحة بخور الكنيسة الأصيل لجلسات الصلاة والتأمل اليومي.',
    detailedDescriptionAr:
      'شمعة صويا طبيعية نسرية احتراقها نقي ودون دخان، مدعمة بخلاصة زيوت البخور الكنسي الفاخر والميرون الهادئ. تمنح الغرفة أو ركن الصلاة عبقاً روحانياً يساعد على الخشوع والتركيز خلال ساعات قراءة الأجبية والكتاب المقدس.',
    specifications: [
      { labelAr: 'المكونات', valueAr: 'شمع صويا طبيعي + زيوت بخور نقية' },
      { labelAr: 'زمن الاحتراق', valueAr: 'حوالي 45 ساعة متواصلة' },
      { labelAr: 'الوعاء', valueAr: 'زجاج فاخر مذهب مزود بتمثال صليب' },
    ],
    isNewArrival: true,
    badgeTag: 'وصل حديثاً • New',
    rating: 4.7,
    reviewsCount: 52,
  },
  {
    id: 'prod-new-2',
    nameAr: 'فاصل كتب قبطي مطرز بالجلد',
    nameEn: 'Embroidered Coptic Leather Bookmark',
    category: 'Accessories',
    categoryLabelAr: 'فواصل كتب',
    image: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=800&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=800&q=80',
    ],
    requiredCoins: 40,
    availability: 'In Stock',
    stockCount: 50,
    description: 'فاصل قراءة فاخر مطرز بعبارات إنجيلية وآيات مفتاحية من آحاد الصوم.',
    detailedDescriptionAr:
      'فاصل قراءة مصمّم يدويًا من الجلد الطبيعي الفاخر، محفور عليه باللون الذهبي البارز آية الصوم: "ليس بالخبز وحده يحيى الإنسان". رفيق مثالي لمتابعة قراءات قطمارس الصوم والأجبية.',
    specifications: [
      { labelAr: 'الخامة', valueAr: 'جلد طبيعي ممتاذ 100%' },
      { labelAr: 'اللون', valueAr: 'بني دافئ وحروف مذهبة' },
      { labelAr: 'الطول', valueAr: '18 سم × 4 سم' },
    ],
    isNewArrival: true,
    badgeTag: 'اصدار جديد • Fresh',
    rating: 4.6,
    reviewsCount: 33,
  },
  {
    id: 'prod-new-3',
    nameAr: 'كتاب تأملات الصوم الكبير المقدس',
    nameEn: 'Great Lent Reflections Book',
    category: 'Books',
    categoryLabelAr: 'كتب روحية',
    image: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=800&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&w=800&q=80',
    ],
    requiredCoins: 100,
    availability: 'In Stock',
    stockCount: 18,
    description: 'كتاب روحي يتضمن قراءات يومية وتأملات عميقة في آحاد الصوم المقدس السبعة.',
    detailedDescriptionAr:
      'دليل روحي وعملي مقسم إلى 55 يومًا لمرافقة المؤمن طوال أيام الصوم الكبير. يحتوي على شروح مبسطة لإناجيل الأحاد، والأسابيع، وأقوال الآباء القديسين مع تدريبات سلوكية وروحية لكل يوم.',
    specifications: [
      { labelAr: 'عدد الصفحات', valueAr: '280 صفحة' },
      { labelAr: 'سنة الإصدار', valueAr: 'طبعة 2026 المحدثة' },
      { labelAr: 'الكاتب', valueAr: 'نخبة من أساتذة الكلية الإكليريكية' },
    ],
    isNewArrival: true,
    badgeTag: 'طبعة 2026 • New Edition',
    rating: 4.8,
    reviewsCount: 65,
  },

  // 3. Popular Products
  {
    id: 'prod-pop-1',
    nameAr: 'الأجبية المقدسة - طبعة جيب فاخرة',
    nameEn: 'The Holy Agpeya - Pocket Edition',
    category: 'Agpeya',
    categoryLabelAr: 'الأجبية والصلوات',
    image: 'https://images.unsplash.com/photo-1519682337058-a94d519337bc?auto=format&fit=crop&w=800&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1519682337058-a94d519337bc?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=800&q=80',
    ],
    requiredCoins: 150,
    availability: 'In Stock',
    stockCount: 30,
    description: 'كتاب صلوات الساعات السبع طبعة مذهبة الغلاف مع الترتيب والطقس الكنسي.',
    detailedDescriptionAr:
      'طبعة فاخرة بحجم الجيب من الأجبية المقدسة (صلوات الساعات). مطبوعة بلونين (أحمر وأسود) لتمييز المردات والطلبات الكاهنية والشماسية مع فواصل شريطية حريرية مذهبة وغلاف مقوى مقاوم للماء.',
    specifications: [
      { labelAr: 'النوع', valueAr: 'أجبية الساعات السبع طقس قبطي أرثوذكسي' },
      { labelAr: 'الغلاف', valueAr: 'جلد صناعي فاخر بحواف مذهبة' },
      { labelAr: 'الحجم', valueAr: '12 × 9 سم (جيب)' },
    ],
    isPopular: true,
    badgeTag: 'الأكثر طلباً • Bestseller',
    rating: 5.0,
    reviewsCount: 210,
  },
  {
    id: 'prod-pop-2',
    nameAr: 'صليب خشب الزيتون المقدس',
    nameEn: 'Holy Olive Wood Cross',
    category: 'Crosses',
    categoryLabelAr: 'صلبان وقلائد',
    image: 'https://images.unsplash.com/photo-1548625149-fc4a29cf7092?auto=format&fit=crop&w=800&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1548625149-fc4a29cf7092?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=800&q=80',
    ],
    requiredCoins: 90,
    availability: 'In Stock',
    stockCount: 22,
    description: 'صليب يدوي منحوت من خشب الزيتون الأصلي القادم من الأراضي المقدسة.',
    detailedDescriptionAr:
      'صليب يد مريح للمسكي والصلوات، منحوت بعناية فائقة من خشب زيتون القدس التاريخي المعمر. يتميز بعروق الخشب الدافئة والتصميم الانسيابي المصمم لراحة اليد أثناء التأمل.',
    specifications: [
      { labelAr: 'نوع الخشب', valueAr: 'زيتون فلسطين القدس المعتق' },
      { labelAr: 'الطول', valueAr: '11 سم' },
      { labelAr: 'اللمسة الأخيرة', valueAr: 'زيت زيتون طبيعي نقي' },
    ],
    isPopular: true,
    badgeTag: 'الأكثر شعبية • Popular',
    rating: 4.9,
    reviewsCount: 140,
  },
  {
    id: 'prod-pop-3',
    nameAr: 'مبخرة نحاسية كنسية مزخرفة',
    nameEn: 'Ornate Brass Censer',
    category: 'Church Gifts',
    categoryLabelAr: 'هدايا كنسية',
    image: 'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=800&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1603006905003-be475563bc59?auto=format&fit=crop&w=800&q=80',
    ],
    requiredCoins: 300,
    availability: 'Limited Stock',
    stockCount: 3,
    description: 'مبخرة نحاسية تقليدية مصممة خصيصاً للركن الروحي والصلوات المنزلية.',
    detailedDescriptionAr:
      'مبخرة نحاسية ثقيلة الوزن مع غطاء مخرم على شكل قبة كنيسة، محفورة يدوياً بزخارف قبطية هندسية وسلاسل ثلاثية متينة مع جرس صغير يعطي رنيناً هادئاً.',
    specifications: [
      { labelAr: 'المادة', valueAr: 'نحاس أصفر مصقول' },
      { labelAr: 'الارتفاع', valueAr: '20 سم' },
      { labelAr: 'المحمل', valueAr: 'سلاسل نحاسية مع طبق قاعدة عازل للحرارة' },
    ],
    isPopular: true,
    badgeTag: 'فاخر • Premium',
    rating: 4.8,
    reviewsCount: 77,
  },

  // 4. Recommended For You
  {
    id: 'prod-rec-1',
    nameAr: 'كتاب بستان الرهبان القبطي',
    nameEn: 'Garden of Monks Book',
    category: 'Books',
    categoryLabelAr: 'كتب روحية',
    image: 'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&w=800&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=800&q=80',
    ],
    requiredCoins: 140,
    availability: 'In Stock',
    stockCount: 15,
    description: 'تراث رهباني قبطي يحتوي على سير وأقوال الآباء الشيوخ لتنمية الحياة الروحية.',
    detailedDescriptionAr:
      'أحد أهم وأعظم كتب التراث الروحي الأرثوذكسي. يعرض مواقف وقصص حية لنسّاك البرية القبطية وكيف انتصروا على التجارب والشهوات بالتواضع والصلاة والصوم.',
    specifications: [
      { labelAr: 'عدد الصفحات', valueAr: '450 صفحة' },
      { labelAr: 'النوع', valueAr: 'سير وحكم آباء برية شيهيت' },
    ],
    isRecommended: true,
    badgeTag: 'موصى به لمستواك • Recommended',
    rating: 4.9,
    reviewsCount: 95,
  },
  {
    id: 'prod-rec-2',
    nameAr: 'لوحة أيقونة العذراء والطفل القبطية',
    nameEn: 'Virgin Mary & Child Icon',
    category: 'Icons',
    categoryLabelAr: 'أيقونات قبطية',
    image: 'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=800&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1579783902614-a3fb3927b675?auto=format&fit=crop&w=800&q=80',
    ],
    requiredCoins: 220,
    availability: 'In Stock',
    stockCount: 10,
    description: 'أيقونة جدارية قبطية كلاسيكية تجسد والدة الإله والمسيح بلمسات دافئة.',
    detailedDescriptionAr:
      'أيقونة جدارية مهيبة برسم قبطي أصيل للسيدة العذراء تحمل الطفل يسوع وتحيط بهما ملاك الرب. مرسومة بدقة وعناية على لوح خشبي سميك محفور الحواف ومزخرف بأوراق الذهب.',
    specifications: [
      { labelAr: 'الخشب', valueAr: 'خشب زان طبيعي معالج' },
      { labelAr: 'الحجم', valueAr: '30 × 20 سم' },
    ],
    isRecommended: true,
    badgeTag: 'اختيار المحرر • Choice',
    rating: 4.9,
    reviewsCount: 112,
  },
  {
    id: 'prod-rec-3',
    nameAr: 'قلادة صليب فضة قبطي تذكاري',
    nameEn: 'Silver Coptic Cross Pendant',
    category: 'Crosses',
    categoryLabelAr: 'صلبان وقلائد',
    image: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=800&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1548625149-fc4a29cf7092?auto=format&fit=crop&w=800&q=80',
    ],
    requiredCoins: 250,
    availability: 'Out of Stock',
    stockCount: 0,
    description: 'قلادة صليب محفور بدقة على النمط القبطي التاريخي مصممة للتذكار الروحي.',
    detailedDescriptionAr:
      'قلادة صليب مصنوعة من الفضة الخالصة عيار 925، مزخرفة بالحفر الدقيق للرموز المسيحية القديمة. خفيفة الوزن ومناسبة للارتداء اليومي أو تقديمها كهدية بركة قيمة.',
    specifications: [
      { labelAr: 'المعدن', valueAr: 'فضة إسترليني نادرة عيار 925' },
      { labelAr: 'الوزن', valueAr: '18 جرام' },
    ],
    isRecommended: true,
    badgeTag: 'تذكار مبارك • Artifact',
    rating: 4.7,
    reviewsCount: 41,
  },
];

const products = PRODUCTS;

export const RewardStoreView: React.FC<RewardStoreViewProps> = ({ onClose }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<StoreCategory>('All');

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 450);
    return () => clearTimeout(timer);
  }, []);

  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeToast, setActiveToast] = useState<string | null>(null);
  const [favorites, setFavorites] = useState<string[]>(['prod-featured-1', 'prod-pop-1']);
  const [cartItems, setCartItems] = useState<CartItemState[]>([
    { productId: 'prod-featured-1', quantity: 1 },
    { productId: 'prod-pop-1', quantity: 2 },
  ]);
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);
  const [userOrders, setUserOrders] = useState<StoreOrder[]>(INITIAL_PLACEHOLDER_ORDERS);
  const [isOrdersOpen, setIsOrdersOpen] = useState<boolean>(false);
  const [orderStatusFilter, setOrderStatusFilter] = useState<'All' | OrderStatus>('All');
  const [selectedProductForDetails, setSelectedProductForDetails] = useState<StoreProduct | null>(null);
  const [activeGalleryIndex, setActiveGalleryIndex] = useState<number>(0);
  const [quantity, setQuantity] = useState<number>(1);

  const userCoins = USER_ECONOMY_DATA.coins;
  const userXP = USER_ECONOMY_DATA.currentXP;
  const userLevel = USER_ECONOMY_DATA.level;

  const handleOpenDetails = (product: StoreProduct) => {
    setSelectedProductForDetails(product);
    setActiveGalleryIndex(0);
    setQuantity(1);
  };

  const toggleFavorite = (productId: string, productName: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (favorites.includes(productId)) {
      setFavorites((prev) => prev.filter((id) => id !== productId));
      setActiveToast(`تمت إزالة "${productName}" من المفضلة`);
    } else {
      setFavorites((prev) => [...prev, productId]);
      setActiveToast(`تمت إضافة "${productName}" إلى المفضلة ❤️`);
    }
    setTimeout(() => setActiveToast(null), 3000);
  };

  const isProductInCart = (productId: string) => cartItems.some((item) => item.productId === productId);

  const totalCartQuantity = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  const totalCartCoins = cartItems.reduce((acc, item) => {
    const prod = products.find((p) => p.id === item.productId);
    return acc + (prod ? prod.requiredCoins * item.quantity : 0);
  }, 0);

  const handleAddToCart = (product: StoreProduct, qtyToAdd: number = 1, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    if (product.availability === 'Out of Stock') return;

    setCartItems((prev) => {
      const existingIndex = prev.findIndex((item) => item.productId === product.id);
      if (existingIndex >= 0) {
        const updated = [...prev];
        updated[existingIndex] = {
          ...updated[existingIndex],
          quantity: updated[existingIndex].quantity + qtyToAdd,
        };
        return updated;
      } else {
        return [...prev, { productId: product.id, quantity: qtyToAdd }];
      }
    });

    setActiveToast(`تمت إضافة ${qtyToAdd > 1 ? `${qtyToAdd} من ` : ''}"${product.nameAr}" إلى السلة 🛒`);
    setTimeout(() => setActiveToast(null), 3000);
  };

  const handleUpdateCartQuantity = (productId: string, delta: number) => {
    setCartItems((prev) =>
      prev
        .map((item) => {
          if (item.productId === productId) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean) as CartItemState[]
    );
  };

  const handleRemoveFromCart = (productId: string, productName?: string) => {
    setCartItems((prev) => prev.filter((item) => item.productId !== productId));
    if (productName) {
      setActiveToast(`تمت إزالة "${productName}" من السلة`);
      setTimeout(() => setActiveToast(null), 3000);
    }
  };

  const categories: CategoryCardData[] = [
    {
      key: 'Books',
      labelAr: 'الكتب الروحية',
      labelEn: 'Books',
      icon: BookOpen,
      image: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=600&q=80',
      count: 14,
      descriptionAr: 'موسوعات، تفاسير، وسير الآباء والشهداء القبطية',
      badgeTag: 'الأكثر قراءة',
    },
    {
      key: 'Agpeya',
      labelAr: 'الأجبية والصلوات',
      labelEn: 'Agpeya',
      icon: BookMarked,
      image: 'https://images.unsplash.com/photo-1519682337058-a94d519337bc?auto=format&fit=crop&w=600&q=80',
      count: 8,
      descriptionAr: 'صلوات الساعات، الأبصلمودية الكيهكية والسنوية',
      badgeTag: 'صلوات طقسية',
    },
    {
      key: 'Candles',
      labelAr: 'الشموع المعطرة',
      labelEn: 'Candles',
      icon: Flame,
      image: 'https://images.unsplash.com/photo-1603006905003-be475563bc59?auto=format&fit=crop&w=600&q=80',
      count: 10,
      descriptionAr: 'شموع طبيعية برائحة البخور والزهور الكنسية',
      badgeTag: 'بخور نقي',
    },
    {
      key: 'Crosses',
      labelAr: 'الصلبان والقلائد',
      labelEn: 'Crosses',
      icon: Cross,
      image: 'https://images.unsplash.com/photo-1548625149-fc4a29cf7092?auto=format&fit=crop&w=600&q=80',
      count: 12,
      descriptionAr: 'صلبان خشب الزيتون، الفضة، والنحاس المبارك',
      badgeTag: 'صنع يدوي',
    },
    {
      key: 'Icons',
      labelAr: 'الأيقونات القبطية',
      labelEn: 'Icons',
      icon: ImageIcon,
      image: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b675?auto=format&fit=crop&w=600&q=80',
      count: 9,
      descriptionAr: 'أيقونات خشبية جدارية ومحفورة بالفن القبطي',
      badgeTag: 'فن قبطي',
    },
    {
      key: 'Church Gifts',
      labelAr: 'الهدايا الكنسية',
      labelEn: 'Church Gifts',
      icon: Church,
      image: 'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=600&q=80',
      count: 11,
      descriptionAr: 'مباخر، أوانٍ، ومقتنيات التبرك والخدمة الكنسية',
      badgeTag: 'مقتنيات بركة',
    },
    {
      key: "Children's Corner",
      labelAr: 'ركن الأطفال',
      labelEn: "Children's Corner",
      icon: Baby,
      image: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=600&q=80',
      count: 15,
      descriptionAr: 'قصص مصورة، ألعاب تفاعلية، وألغاز التربية الكنسية',
      badgeTag: 'تعليمي تفاعلي',
    },
    {
      key: 'Accessories',
      labelAr: 'الإكسسوارات والمستلزمات',
      labelEn: 'Accessories',
      icon: Layers,
      image: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=600&q=80',
      count: 7,
      descriptionAr: 'فواصل قراءة، أغطية كتابية، ومستلزمات مكتبية',
      badgeTag: 'مستلزمات دراسية',
    },
  ];

  // Filtering products based on category and search query
  const filteredProducts = products.filter((p) => {
    const matchesCategory = selectedCategory === 'All' || p.category === selectedCategory;
    const matchesSearch =
      searchQuery.trim() === '' ||
      p.nameAr.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.nameEn.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.categoryLabelAr.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const featuredProducts = products.filter((p) => p.isFeatured);
  const newArrivals = products.filter((p) => p.isNewArrival);
  const popularProducts = products.filter((p) => p.isPopular);
  const recommendedProducts = products.filter((p) => p.isRecommended);

  const handleSimulateRedeem = (product: StoreProduct) => {
    setActiveToast(`تم اختيار "${product.nameAr}" • هذه واجهة عرض تخطيطية للمتجر`);
    setTimeout(() => setActiveToast(null), 3500);
  };

  // Availability Badge Component
  const renderAvailabilityBadge = (status: StoreProduct['availability']) => {
    switch (status) {
      case 'In Stock':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-tajawal font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
            <CheckCircle2 className="w-3 h-3 text-emerald-400" />
            <span>متوفر • In Stock</span>
          </span>
        );
      case 'Limited Stock':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-tajawal font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30">
            <Sparkles className="w-3 h-3 text-amber-400" />
            <span>كمية محدودة • Limited</span>
          </span>
        );
      case 'Out of Stock':
      default:
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-tajawal font-bold bg-zinc-800 text-zinc-400 border border-zinc-700">
            <AlertCircle className="w-3 h-3" />
            <span>نفذت الكمية • Out of Stock</span>
          </span>
        );
    }
  };

  // Generic Product Card Component
  const renderProductCard = (product: StoreProduct, isCompact = false) => {
    const isOutOfStock = product.availability === 'Out of Stock';
    const canAfford = userCoins >= product.requiredCoins;
    const isFavorite = favorites.includes(product.id);
    const isInCart = isProductInCart(product.id);

    return (
      <div
        key={product.id}
        onClick={() => handleOpenDetails(product)}
        className="group relative rounded-2xl md:rounded-3xl bg-zinc-900/80 backdrop-blur-md border border-white/10 hover:border-amber-500/40 transition-all duration-300 overflow-hidden flex flex-col justify-between hover:shadow-[0_8px_30px_rgba(0,0,0,0.5)] cursor-pointer"
      >
        {/* Product Image Banner */}
        <div className="relative aspect-[4/3] w-full overflow-hidden bg-zinc-950">
          <img
            src={product.image}
            alt={product.nameAr}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 via-transparent to-black/30" />

          {/* Top Overlays */}
          <div className="absolute top-3 inset-x-3 flex items-start justify-between gap-2 z-10">
            {/* Category Tag */}
            <div className="flex flex-col items-start gap-1">
              <span className="bg-black/70 backdrop-blur-md px-2.5 py-1 rounded-full border border-white/15 text-amber-200 text-[10px] font-tajawal font-bold shadow-md">
                {product.categoryLabelAr}
              </span>
              {product.badgeTag && (
                <span className="bg-amber-500/20 backdrop-blur-md px-2 py-0.5 rounded-full border border-amber-500/30 text-amber-300 text-[9px] font-tajawal font-medium">
                  {product.badgeTag}
                </span>
              )}
            </div>

            {/* Favorite Button */}
            <button
              type="button"
              onClick={(e) => toggleFavorite(product.id, product.nameAr, e)}
              className={`p-2 rounded-full backdrop-blur-md border transition-all cursor-pointer shadow-md active:scale-90 ${
                isFavorite
                  ? 'bg-rose-500/25 border-rose-500/50 text-rose-400'
                  : 'bg-black/60 border-white/20 text-zinc-300 hover:text-rose-400 hover:bg-black/80'
              }`}
              title={isFavorite ? 'إزالة من المفضلة' : 'إضافة للمفضلة'}
            >
              <Heart className={`w-4 h-4 ${isFavorite ? 'fill-rose-500 text-rose-500' : ''}`} />
            </button>
          </div>

          {/* Details Preview Button on Hover */}
          <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
            <span className="px-4 py-2 rounded-full bg-amber-400 text-amber-950 font-cairo font-black text-xs shadow-xl flex items-center gap-1.5 transform translate-y-2 group-hover:translate-y-0 transition-transform">
              <Maximize2 className="w-3.5 h-3.5" />
              <span>عرض التفاصيل • Details</span>
            </span>
          </div>

          {/* Coins Required Badge (Bottom Right of Image) */}
          <div className="absolute bottom-3 right-3 bg-black/80 backdrop-blur-md px-3 py-1 rounded-full border border-amber-500/40 text-amber-300 text-xs font-cairo font-black flex items-center gap-1.5 shadow-md">
            <Coins className="w-3.5 h-3.5 text-amber-400" />
            <span>{product.requiredCoins} عملة</span>
          </div>
        </div>

        {/* Content Details */}
        <div className="p-4 md:p-5 space-y-3 flex-1 flex flex-col justify-between">
          <div className="space-y-2">
            <div className="flex items-start justify-between gap-2">
              <h4 className="font-cairo font-bold text-base md:text-lg text-amber-100 leading-snug line-clamp-1 group-hover:text-amber-300 transition-colors">
                {product.nameAr}
              </h4>
              {product.rating && (
                <div className="flex items-center gap-1 text-xs font-cairo text-amber-400 shrink-0 bg-amber-500/10 px-2 py-0.5 rounded-md border border-amber-500/20">
                  <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                  <span>{product.rating}</span>
                </div>
              )}
            </div>

            <p className="font-tajawal text-xs text-zinc-300/90 line-clamp-2 leading-relaxed">
              {product.description}
            </p>
          </div>

          {/* Availability & Action Buttons */}
          <div className="pt-3 border-t border-white/10 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-tajawal text-zinc-400">حالة التوفر:</span>
              {renderAvailabilityBadge(product.availability)}
            </div>

            {/* Action Buttons Row */}
            <div className="grid grid-cols-2 gap-2 pt-1">
              {/* Add To Cart Button */}
              <button
                type="button"
                onClick={(e) => handleAddToCart(product, e)}
                disabled={isOutOfStock}
                className={`py-2.5 rounded-xl font-cairo font-bold text-xs flex items-center justify-center gap-1.5 transition-all cursor-pointer active:scale-95 ${
                  isOutOfStock
                    ? 'bg-zinc-800 text-zinc-500 border border-zinc-700 cursor-not-allowed'
                    : isInCart
                    ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                    : 'bg-zinc-800/90 text-amber-200 border border-amber-500/30 hover:bg-amber-500/20 hover:border-amber-400'
                }`}
              >
                {isInCart ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                    <span>في السلة ✓</span>
                  </>
                ) : (
                  <>
                    <ShoppingBag className="w-3.5 h-3.5 text-amber-400" />
                    <span>إضافة للسلة</span>
                  </>
                )}
              </button>

              {/* Redeem Button */}
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  handleSimulateRedeem(product);
                }}
                disabled={isOutOfStock}
                className={`py-2.5 rounded-xl font-cairo font-bold text-xs flex items-center justify-center gap-1.5 transition-all cursor-pointer active:scale-95 ${
                  isOutOfStock
                    ? 'bg-zinc-800 text-zinc-500 border border-zinc-700 cursor-not-allowed'
                    : canAfford
                    ? 'bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600 text-amber-950 hover:from-amber-300 hover:to-amber-500 shadow-md'
                    : 'bg-amber-500/20 text-amber-200 border border-amber-500/30 hover:bg-amber-500/30'
                }`}
              >
                <Gift className="w-3.5 h-3.5" />
                <span>استبدال فوري</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Render Premium Product Details Modal
  const renderProductDetailsModal = () => {
    if (!selectedProductForDetails) return null;
    const product = selectedProductForDetails;
    const isOutOfStock = product.availability === 'Out of Stock';
    const canAfford = userCoins >= product.requiredCoins * quantity;
    const isFavorite = favorites.includes(product.id);
    const isInCart = isProductInCart(product.id);

    const gallery = product.galleryImages && product.galleryImages.length > 0
      ? product.galleryImages
      : [product.image];

    const currentImage = gallery[activeGalleryIndex] || product.image;

    // Related products (same category or others excluding current)
    const relatedProducts = products
      .filter((p) => p.id !== product.id && (p.category === product.category || p.isRecommended || p.isPopular))
      .slice(0, 3);

    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 bg-black/85 backdrop-blur-xl overflow-y-auto flex items-start justify-center p-3 sm:p-5 md:p-8 dir-rtl font-cairo"
      >
        <motion.div
          initial={{ scale: 0.95, y: 20 }}
          animate={{ scale: 1, y: 0 }}
          exit={{ scale: 0.95, y: 20 }}
          className="relative w-full max-w-5xl bg-zinc-950/95 border border-amber-500/30 rounded-3xl shadow-[0_25px_60px_rgba(0,0,0,0.9)] overflow-hidden my-auto"
        >
          {/* Top Sticky Header Bar */}
          <div className="sticky top-0 z-20 bg-zinc-950/90 backdrop-blur-md px-5 py-3.5 border-b border-white/10 flex items-center justify-between gap-3">
            <button
              type="button"
              onClick={() => setSelectedProductForDetails(null)}
              className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-zinc-900 border border-white/15 text-amber-300 text-xs md:text-sm font-tajawal font-bold hover:bg-amber-500/20 hover:border-amber-400 transition-all cursor-pointer active:scale-95"
            >
              <ArrowRight className="w-4 h-4 text-amber-400" />
              <span>العودة للمتجر • Back to Store</span>
            </button>

            <div className="flex items-center gap-2">
              <span className="hidden sm:inline-flex text-xs font-tajawal font-bold text-amber-200 bg-amber-500/10 px-3 py-1 rounded-full border border-amber-500/20">
                تفاصيل المنتج • Product Details
              </span>

              {/* Share button */}
              <button
                type="button"
                onClick={() => {
                  setActiveToast(`تم نسخ رابط "${product.nameAr}" 🔗`);
                  setTimeout(() => setActiveToast(null), 3000);
                }}
                className="p-2 rounded-full bg-zinc-900 border border-white/15 text-zinc-300 hover:text-amber-300 hover:border-amber-500/40 transition-all cursor-pointer"
                title="مشاركة المنتج"
              >
                <Share2 className="w-4 h-4" />
              </button>

              {/* Favorite button */}
              <button
                type="button"
                onClick={(e) => toggleFavorite(product.id, product.nameAr, e)}
                className={`p-2 rounded-full border transition-all cursor-pointer ${
                  isFavorite
                    ? 'bg-rose-500/25 border-rose-500/50 text-rose-400'
                    : 'bg-zinc-900 border-white/15 text-zinc-300 hover:text-rose-400'
                }`}
                title="المفضلة"
              >
                <Heart className={`w-4 h-4 ${isFavorite ? 'fill-rose-500 text-rose-500' : ''}`} />
              </button>

              {/* Close Button */}
              <button
                type="button"
                onClick={() => setSelectedProductForDetails(null)}
                className="p-2 rounded-full bg-zinc-900 border border-white/15 text-zinc-400 hover:text-white hover:bg-zinc-800 transition-all cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Main Details Grid */}
          <div className="p-5 md:p-8 space-y-8 max-h-[80vh] overflow-y-auto custom-scrollbar">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 md:gap-8 items-start">
              {/* COLUMN 1: Large Product Gallery (5 cols on lg) */}
              <div className="lg:col-span-5 space-y-4">
                {/* Main Large Display Image */}
                <div className="relative aspect-square w-full rounded-2xl md:rounded-3xl overflow-hidden bg-zinc-900 border border-amber-500/30 shadow-2xl group">
                  <img
                    src={currentImage}
                    alt={product.nameAr}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/70 via-transparent to-black/20" />

                  {/* Image Overlay Badges */}
                  <div className="absolute top-3 right-3 flex flex-col items-end gap-1.5 z-10">
                    <span className="bg-black/80 backdrop-blur-md px-3 py-1 rounded-full border border-amber-500/40 text-amber-300 text-xs font-bold shadow-md">
                      {product.categoryLabelAr}
                    </span>
                    {product.badgeTag && (
                      <span className="bg-amber-500/20 backdrop-blur-md px-2.5 py-0.5 rounded-full border border-amber-500/30 text-amber-200 text-[10px]">
                        {product.badgeTag}
                      </span>
                    )}
                  </div>

                  {/* Stock Availability Pill Over Image */}
                  <div className="absolute bottom-3 left-3 z-10">
                    {renderAvailabilityBadge(product.availability)}
                  </div>
                </div>

                {/* Gallery Thumbnails Strip */}
                {gallery.length > 1 && (
                  <div className="space-y-2">
                    <span className="text-[11px] font-tajawal text-zinc-400 block">معرض الصور • Product Gallery ({gallery.length}):</span>
                    <div className="flex items-center gap-3 overflow-x-auto pb-2">
                      {gallery.map((img, idx) => (
                        <button
                          key={idx}
                          type="button"
                          onClick={() => setActiveGalleryIndex(idx)}
                          className={`relative w-16 h-16 rounded-xl overflow-hidden border-2 transition-all cursor-pointer shrink-0 ${
                            activeGalleryIndex === idx
                              ? 'border-amber-400 ring-2 ring-amber-400/50 scale-105'
                              : 'border-white/10 opacity-60 hover:opacity-100 hover:border-amber-500/40'
                          }`}
                        >
                          <img src={img} alt={`صورة ${idx + 1}`} className="w-full h-full object-cover" />
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Guarantees Box */}
                <div className="p-4 rounded-2xl bg-zinc-900/60 border border-white/10 space-y-2.5 text-xs font-tajawal text-zinc-300">
                  <div className="flex items-center gap-2 text-amber-300 font-bold">
                    <ShieldCheck className="w-4 h-4 text-amber-400" />
                    <span>ضمان أصالة المقتنيات والبركة الكنسية</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Truck className="w-4 h-4 text-zinc-400" />
                    <span>توصيل سريع وآمن عبر مكتب الخدمة بالمطرانية</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Info className="w-4 h-4 text-zinc-400" />
                    <span>يستبدل بقيمة العملات الذهبية المحققة من آحاد الصوم</span>
                  </div>
                </div>
              </div>

              {/* COLUMN 2: Product Info & Actions (7 cols on lg) */}
              <div className="lg:col-span-7 space-y-6">
                {/* Header Titles & Rating */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between flex-wrap gap-2">
                    <span className="text-xs font-tajawal font-bold text-amber-400 bg-amber-500/10 px-3 py-1 rounded-full border border-amber-500/20">
                      قسم {product.categoryLabelAr}
                    </span>
                    {product.rating && (
                      <div className="flex items-center gap-1.5 text-xs font-cairo text-amber-400 bg-amber-500/10 px-2.5 py-1 rounded-md border border-amber-500/20">
                        <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                        <span className="font-bold">{product.rating}</span>
                        <span className="text-zinc-400 font-normal">({product.reviewsCount || 45} تقييم)</span>
                      </div>
                    )}
                  </div>

                  <h1 className="font-cairo font-black text-2xl md:text-3xl text-amber-100 leading-tight">
                    {product.nameAr}
                  </h1>
                  <p className="font-tajawal text-sm text-zinc-400 font-medium">
                    {product.nameEn}
                  </p>
                </div>

                {/* Price in Coins Banner */}
                <div className="p-4 rounded-2xl bg-gradient-to-r from-amber-950/60 via-zinc-900 to-zinc-900 border border-amber-500/40 flex items-center justify-between flex-wrap gap-3">
                  <div>
                    <span className="text-xs font-tajawal text-amber-300/80 block">التكلفة اللازمة للاستبدال:</span>
                    <div className="flex items-center gap-2 text-amber-300 font-black text-2xl md:text-3xl">
                      <Coins className="w-7 h-7 text-amber-400 animate-pulse" />
                      <span>{product.requiredCoins * quantity} عملة ذهبية</span>
                    </div>
                  </div>

                  {/* Affordability Status */}
                  <div className="text-left">
                    <span className="text-[11px] font-tajawal text-zinc-400 block">رصيدك الحالي:</span>
                    <span className={`text-xs md:text-sm font-bold ${canAfford ? 'text-emerald-400' : 'text-rose-400'}`}>
                      {userCoins} عملة {canAfford ? '✓ متاح للاستبدال' : '⚠️ تحتاج لعملات إضافية'}
                    </span>
                  </div>
                </div>

                {/* Product Description */}
                <div className="space-y-2">
                  <h3 className="font-cairo font-bold text-sm text-amber-200">وصف المنتج والتفاصيل الروحية:</h3>
                  <p className="font-tajawal text-xs md:text-sm text-zinc-300 leading-relaxed bg-zinc-900/40 p-3.5 rounded-xl border border-white/5">
                    {product.detailedDescriptionAr || product.description}
                  </p>
                </div>

                {/* Specifications Grid if present */}
                {product.specifications && product.specifications.length > 0 && (
                  <div className="space-y-2">
                    <h3 className="font-cairo font-bold text-sm text-amber-200">المواصفات الفنية والقياسات:</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-tajawal">
                      {product.specifications.map((spec, i) => (
                        <div key={i} className="flex items-center justify-between p-2.5 rounded-xl bg-zinc-900/60 border border-white/10">
                          <span className="text-zinc-400">{spec.labelAr}:</span>
                          <span className="text-amber-200 font-bold">{spec.valueAr}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Availability Status & Quantity Selector */}
                <div className="pt-2 border-t border-white/10 flex items-center justify-between flex-wrap gap-4">
                  <div className="space-y-1">
                    <span className="text-xs font-tajawal text-zinc-400 block">حالة التوفر بالمخزن:</span>
                    <div className="flex items-center gap-2">
                      {renderAvailabilityBadge(product.availability)}
                      {product.stockCount !== undefined && (
                        <span className="text-xs font-tajawal text-amber-300/80">
                          ({product.stockCount} قطعة متبقية)
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Quantity Controller */}
                  {!isOutOfStock && (
                    <div className="flex items-center gap-3 bg-zinc-900 p-1.5 rounded-xl border border-white/15">
                      <span className="text-xs font-tajawal text-zinc-400 px-2">الكمية:</span>
                      <button
                        type="button"
                        onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                        className="w-7 h-7 rounded-lg bg-zinc-800 text-zinc-200 flex items-center justify-center hover:bg-zinc-700 transition-colors cursor-pointer"
                      >
                        <Minus className="w-3.5 h-3.5" />
                      </button>
                      <span className="font-cairo font-black text-sm text-amber-300 min-w-[20px] text-center">
                        {quantity}
                      </span>
                      <button
                        type="button"
                        onClick={() => setQuantity((q) => Math.min(product.stockCount || 10, q + 1))}
                        className="w-7 h-7 rounded-lg bg-zinc-800 text-zinc-200 flex items-center justify-center hover:bg-zinc-700 transition-colors cursor-pointer"
                      >
                        <Plus className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  )}
                </div>

                {/* Main Actions Row (Add To Cart & Instant Redeem) */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                  {/* Add To Cart */}
                  <button
                    type="button"
                    onClick={() => handleAddToCart(product, quantity)}
                    disabled={isOutOfStock}
                    className={`py-3.5 rounded-2xl font-cairo font-bold text-xs md:text-sm flex items-center justify-center gap-2 transition-all cursor-pointer active:scale-95 ${
                      isOutOfStock
                        ? 'bg-zinc-800 text-zinc-500 border border-zinc-700 cursor-not-allowed'
                        : isInCart
                        ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                        : 'bg-zinc-900 text-amber-200 border border-amber-500/40 hover:bg-amber-500/20'
                    }`}
                  >
                    {isInCart ? (
                      <>
                        <Check className="w-4 h-4 text-emerald-400" />
                        <span>موجود بالسلة ✓</span>
                      </>
                    ) : (
                      <>
                        <ShoppingBag className="w-4 h-4 text-amber-400" />
                        <span>إضافة للسلة • Add To Cart</span>
                      </>
                    )}
                  </button>

                  {/* Immediate Redeem */}
                  <button
                    type="button"
                    onClick={() => handleSimulateRedeem(product)}
                    disabled={isOutOfStock}
                    className={`py-3.5 rounded-2xl font-cairo font-black text-xs md:text-sm flex items-center justify-center gap-2 transition-all cursor-pointer active:scale-95 ${
                      isOutOfStock
                        ? 'bg-zinc-800 text-zinc-500 border border-zinc-700 cursor-not-allowed'
                        : canAfford
                        ? 'bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600 text-amber-950 hover:from-amber-300 hover:to-amber-500 shadow-[0_0_20px_rgba(251,191,36,0.3)]'
                        : 'bg-amber-500/20 text-amber-200 border border-amber-500/30 hover:bg-amber-500/30'
                    }`}
                  >
                    <Gift className="w-4 h-4" />
                    <span>استبدال فوري • Redeem</span>
                  </button>
                </div>
              </div>
            </div>

            {/* SECTION: Related Products */}
            {relatedProducts.length > 0 && (
              <div className="pt-8 border-t border-white/10 space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-cairo font-black text-lg md:text-xl text-amber-100 flex items-center gap-2">
                    <Sparkles className="w-5 h-5 text-amber-400" />
                    <span>منتجات ذات صلة • Related Products</span>
                  </h3>
                  <span className="text-xs font-tajawal text-zinc-400">انقر للمعاينة السريعة</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {relatedProducts.map((rel) => (
                    <button
                      key={rel.id}
                      type="button"
                      onClick={() => handleOpenDetails(rel)}
                      className="group p-3 rounded-2xl bg-zinc-900/60 border border-white/10 hover:border-amber-500/40 text-right flex items-center gap-3 transition-all cursor-pointer hover:bg-zinc-900"
                    >
                      <img
                        src={rel.image}
                        alt={rel.nameAr}
                        className="w-16 h-16 rounded-xl object-cover shrink-0 border border-white/10 group-hover:scale-105 transition-transform"
                      />
                      <div className="space-y-1 min-w-0 flex-1">
                        <h4 className="font-cairo font-bold text-xs text-amber-100 truncate group-hover:text-amber-300">
                          {rel.nameAr}
                        </h4>
                        <div className="flex items-center gap-1 text-[11px] text-amber-400 font-bold">
                          <Coins className="w-3 h-3 text-amber-400" />
                          <span>{rel.requiredCoins} عملة</span>
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </motion.div>
      </motion.div>
    );
  };

  // Render Shopping Cart Modal
  const renderCartModal = () => {
    if (!isCartOpen) return null;

    const canAffordTotal = userCoins >= totalCartCoins;

    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 bg-black/85 backdrop-blur-xl overflow-y-auto flex items-start justify-center p-3 sm:p-5 md:p-8 dir-rtl font-cairo"
      >
        <motion.div
          initial={{ scale: 0.95, y: 20 }}
          animate={{ scale: 1, y: 0 }}
          exit={{ scale: 0.95, y: 20 }}
          className="relative w-full max-w-4xl bg-zinc-950/95 border border-amber-500/30 rounded-3xl shadow-[0_25px_60px_rgba(0,0,0,0.9)] overflow-hidden my-auto"
        >
          {/* Modal Header */}
          <div className="sticky top-0 z-20 bg-zinc-950/90 backdrop-blur-md px-5 py-4 border-b border-white/10 flex items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-2xl bg-amber-500/15 border border-amber-500/30 text-amber-400">
                <ShoppingBag className="w-5 h-5" />
              </div>
              <div>
                <h2 className="font-cairo font-black text-lg md:text-xl text-amber-100 flex items-center gap-2">
                  <span>سلة استبدال المكافآت</span>
                  <span className="text-xs font-bold text-amber-400 bg-amber-500/10 px-2.5 py-0.5 rounded-full border border-amber-500/20">
                    {totalCartQuantity} قطعة
                  </span>
                </h2>
                <p className="font-tajawal text-xs text-zinc-400">
                  مراجعة المقتنيات وتأكيد استبدالها ببدل عملات الصوم
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              {cartItems.length > 0 && (
                <button
                  type="button"
                  onClick={() => {
                    setCartItems([]);
                    setActiveToast('تم تفريغ السلة بنجاح 🗑️');
                    setTimeout(() => setActiveToast(null), 3000);
                  }}
                  className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 border border-rose-500/20 text-rose-300 text-xs font-tajawal font-bold transition-all cursor-pointer"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span>تفريع السلة</span>
                </button>
              )}

              <button
                type="button"
                onClick={() => setIsCartOpen(false)}
                className="p-2 rounded-full bg-zinc-900 border border-white/15 text-zinc-400 hover:text-white hover:bg-zinc-800 transition-all cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Modal Main Content */}
          <div className="p-5 md:p-8 max-h-[80vh] overflow-y-auto custom-scrollbar space-y-6">
            {cartItems.length === 0 ? (
              /* Empty Cart View */
              <div className="py-12 px-4 text-center space-y-4 max-w-md mx-auto">
                <div className="w-20 h-20 mx-auto rounded-3xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400">
                  <ShoppingBag className="w-10 h-10 opacity-60" />
                </div>
                <div className="space-y-1">
                  <h3 className="font-cairo font-black text-lg text-amber-100">سلتك فارغة حالياً</h3>
                  <p className="font-tajawal text-xs text-zinc-400 leading-relaxed">
                    تصفح أقسام متجر المكافآت واختر المقتنيات القبطية والكتب والصلبان لاستبدالها بعملاتك.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setIsCartOpen(false)}
                  className="px-6 py-2.5 rounded-xl bg-amber-500 text-amber-950 font-cairo font-bold text-xs hover:bg-amber-400 transition-all shadow-lg cursor-pointer inline-flex items-center gap-2"
                >
                  <span>تصفح المعروضات الآن</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            ) : (
              /* Cart Grid (Product List + Summary) */
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                {/* Product List Column (7 cols) */}
                <div className="lg:col-span-7 space-y-3">
                  <div className="flex items-center justify-between">
                    <h3 className="font-cairo font-bold text-sm text-amber-200">
                      قائمة المنتجات بالسلة ({cartItems.length})
                    </h3>
                    <span className="text-xs text-zinc-400 font-tajawal">
                      إجمالي القطع: {totalCartQuantity}
                    </span>
                  </div>

                  <div className="space-y-3">
                    {cartItems.map((cartItem) => {
                      const product = products.find((p) => p.id === cartItem.productId);
                      if (!product) return null;
                      const itemCoinsTotal = product.requiredCoins * cartItem.quantity;

                      return (
                        <motion.div
                          key={cartItem.productId}
                          layout
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, scale: 0.95 }}
                          className="p-3.5 rounded-2xl bg-zinc-900/80 border border-white/10 hover:border-amber-500/30 transition-all flex items-center gap-3.5 group relative"
                        >
                          {/* Thumbnail */}
                          <div
                            onClick={() => {
                              setIsCartOpen(false);
                              handleOpenDetails(product);
                            }}
                            className="w-16 h-16 md:w-20 md:h-20 rounded-xl overflow-hidden bg-zinc-950 shrink-0 border border-white/10 cursor-pointer relative group/img"
                          >
                            <img
                              src={product.image}
                              alt={product.nameAr}
                              className="w-full h-full object-cover group-hover/img:scale-110 transition-transform duration-300"
                            />
                          </div>

                          {/* Details */}
                          <div className="flex-1 min-w-0 space-y-1">
                            <div className="flex items-center gap-2">
                              <span className="text-[10px] font-tajawal font-bold text-amber-300 bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20">
                                {product.categoryLabelAr}
                              </span>
                            </div>
                            <h4 className="font-cairo font-bold text-xs md:text-sm text-amber-100 truncate">
                              {product.nameAr}
                            </h4>
                            <div className="flex items-center gap-2 text-xs font-cairo text-amber-400 font-bold">
                              <Coins className="w-3.5 h-3.5 text-amber-400" />
                              <span>{product.requiredCoins} عملة / قطعة</span>
                            </div>
                          </div>

                          {/* Controls & Total Coins */}
                          <div className="flex flex-col items-end gap-2 shrink-0">
                            {/* Item Subtotal Coins */}
                            <div className="text-left font-cairo font-black text-amber-300 text-sm md:text-base flex items-center gap-1">
                              <span>{itemCoinsTotal}</span>
                              <Coins className="w-3.5 h-3.5 text-amber-400" />
                            </div>

                            {/* Quantity Selector + Remove Button */}
                            <div className="flex items-center gap-1.5 bg-zinc-950 p-1 rounded-xl border border-white/10">
                              <button
                                type="button"
                                onClick={() => handleUpdateCartQuantity(cartItem.productId, -1)}
                                className="w-6 h-6 rounded-lg bg-zinc-800 text-zinc-300 hover:bg-zinc-700 flex items-center justify-center transition-colors cursor-pointer"
                                title="تقليل الكمية"
                              >
                                <Minus className="w-3 h-3" />
                              </button>
                              <span className="font-cairo font-extrabold text-xs text-amber-200 min-w-[18px] text-center">
                                {cartItem.quantity}
                              </span>
                              <button
                                type="button"
                                onClick={() => handleUpdateCartQuantity(cartItem.productId, 1)}
                                className="w-6 h-6 rounded-lg bg-zinc-800 text-zinc-300 hover:bg-zinc-700 flex items-center justify-center transition-colors cursor-pointer"
                                title="زيادة الكمية"
                              >
                                <Plus className="w-3 h-3" />
                              </button>
                              <button
                                type="button"
                                onClick={() => handleRemoveFromCart(cartItem.productId, product.nameAr)}
                                className="w-6 h-6 rounded-lg bg-rose-500/20 text-rose-300 hover:bg-rose-500/30 flex items-center justify-center transition-colors cursor-pointer mr-1"
                                title="إزالة من السلة"
                              >
                                <Trash2 className="w-3 h-3" />
                              </button>
                            </div>
                          </div>
                        </motion.div>
                      );
                    })}
                  </div>
                </div>

                {/* Cart Summary Column (5 cols) */}
                <div className="lg:col-span-5 space-y-4">
                  <div className="p-5 rounded-3xl bg-zinc-900/90 border border-amber-500/30 space-y-5 shadow-xl sticky top-20">
                    <h3 className="font-cairo font-black text-base text-amber-100 border-b border-white/10 pb-3 flex items-center gap-2">
                      <Sparkles className="w-4 h-4 text-amber-400" />
                      <span>ملخص طلب السلة • Cart Summary</span>
                    </h3>

                    <div className="space-y-3 font-tajawal text-xs md:text-sm">
                      {/* Item count breakdown */}
                      <div className="flex items-center justify-between text-zinc-300">
                        <span>إجمالي الأصناف والقطع:</span>
                        <span className="font-bold text-white">{cartItems.length} أنواع ({totalCartQuantity} قطعة)</span>
                      </div>

                      {/* Total Required Coins */}
                      <div className="flex items-center justify-between text-zinc-300 pt-2 border-t border-white/10">
                        <span className="font-bold text-amber-200">إجمالي العملات المطلوبة:</span>
                        <div className="flex items-center gap-1.5 font-cairo font-black text-xl text-amber-400">
                          <Coins className="w-5 h-5 text-amber-400" />
                          <span>{totalCartCoins} عملة</span>
                        </div>
                      </div>

                      {/* User Balance Comparison */}
                      <div className="p-3.5 rounded-2xl bg-zinc-950 border border-white/10 space-y-2">
                        <div className="flex items-center justify-between text-xs">
                          <span className="text-zinc-400">رصيدك الحالي:</span>
                          <span className="font-bold text-amber-300 font-cairo">{userCoins} عملة</span>
                        </div>

                        <div className="flex items-center justify-between text-xs pt-1 border-t border-white/5">
                          <span className="text-zinc-400">الرصيد المتبقي بعد الاستبدال:</span>
                          <span
                            className={`font-bold font-cairo ${
                              canAffordTotal ? 'text-emerald-400' : 'text-rose-400'
                            }`}
                          >
                            {userCoins - totalCartCoins} عملة
                          </span>
                        </div>
                      </div>

                      {!canAffordTotal && (
                        <div className="p-3 rounded-xl bg-rose-500/15 border border-rose-500/30 text-rose-300 text-xs flex items-center gap-2">
                          <AlertCircle className="w-4 h-4 text-rose-400 shrink-0" />
                          <span>رصيدك غير كافٍ. يلزمك {totalCartCoins - userCoins} عملة إضافية.</span>
                        </div>
                      )}
                    </div>

                    {/* Redeem Button (Placeholder Action) */}
                    <button
                      type="button"
                      onClick={() => {
                        if (!canAffordTotal) {
                          setActiveToast('⚠️ رصيد العملات غير كافٍ لاستبدال السلة كاملة');
                          setTimeout(() => setActiveToast(null), 3000);
                          return;
                        }

                        // Build new order object
                        const newOrderItems: OrderItem[] = cartItems
                          .map((ci) => {
                            const p = products.find((prod) => prod.id === ci.productId);
                            if (!p) return null;
                            return {
                              productId: p.id,
                              productNameAr: p.nameAr,
                              productImage: p.image,
                              quantity: ci.quantity,
                              unitCoins: p.requiredCoins,
                            };
                          })
                          .filter(Boolean) as OrderItem[];

                        const randomNum = Math.floor(1000 + Math.random() * 9000);
                        const newOrder: StoreOrder = {
                          id: `ord-${Date.now()}`,
                          orderNumber: `#ORD-2026-${randomNum}`,
                          dateAr: '4 أغسطس 2026 • الآن',
                          status: 'Pending',
                          statusNoteAr: 'تم إنشاء الطلب بنجاح وهو قيد المراجعة والاعتماد من المطرانية.',
                          totalCoins: totalCartCoins,
                          items: newOrderItems,
                        };

                        setUserOrders((prev) => [newOrder, ...prev]);
                        setActiveToast(`🎉 تم إرسال الطلب ${newOrder.orderNumber} بنجاح! يمكنك متابعته في صفحة الطلبات`);
                        setTimeout(() => {
                          setActiveToast(null);
                          setCartItems([]);
                          setIsCartOpen(false);
                          setIsOrdersOpen(true);
                        }, 2500);
                      }}
                      disabled={!canAffordTotal}
                      className={`w-full py-4 rounded-2xl font-cairo font-black text-sm flex items-center justify-center gap-2 transition-all cursor-pointer shadow-lg active:scale-95 ${
                        canAffordTotal
                          ? 'bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600 text-amber-950 hover:from-amber-300 hover:to-amber-500 shadow-[0_0_25px_rgba(251,191,36,0.4)]'
                          : 'bg-zinc-800 text-zinc-500 border border-zinc-700 cursor-not-allowed'
                      }`}
                    >
                      <Gift className="w-5 h-5" />
                      <span>تأكيد استبدال السلة • Redeem Cart</span>
                    </button>

                    <p className="text-[10px] font-tajawal text-center text-zinc-400">
                      * المقتنيات المستبدلة متاحة للاستلام من مكتب خدمة التربية الكنسية عند إبراز المعرف.
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </motion.div>
      </motion.div>
    );
  };

  // Render Orders Page Modal
  const renderOrdersModal = () => {
    if (!isOrdersOpen) return null;

    const filteredOrders = userOrders.filter(
      (ord) => orderStatusFilter === 'All' || ord.status === orderStatusFilter
    );

    const statusOptions: { key: 'All' | OrderStatus; labelAr: string; count: number }[] = [
      { key: 'All', labelAr: 'الكل', count: userOrders.length },
      { key: 'Pending', labelAr: 'قيد الانتظار', count: userOrders.filter((o) => o.status === 'Pending').length },
      { key: 'Approved', labelAr: 'تم الاعتماد', count: userOrders.filter((o) => o.status === 'Approved').length },
      { key: 'Preparing', labelAr: 'جاري التحضير', count: userOrders.filter((o) => o.status === 'Preparing').length },
      { key: 'Ready', labelAr: 'جاهز للاستلام', count: userOrders.filter((o) => o.status === 'Ready').length },
      { key: 'Delivered', labelAr: 'تم التسليم', count: userOrders.filter((o) => o.status === 'Delivered').length },
    ];

    const stages: OrderStatus[] = ['Pending', 'Approved', 'Preparing', 'Ready', 'Delivered'];

    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 bg-black/85 backdrop-blur-xl overflow-y-auto flex items-start justify-center p-3 sm:p-5 md:p-8 dir-rtl font-cairo"
      >
        <motion.div
          initial={{ scale: 0.95, y: 20 }}
          animate={{ scale: 1, y: 0 }}
          exit={{ scale: 0.95, y: 20 }}
          className="relative w-full max-w-5xl bg-zinc-950/95 border border-amber-500/30 rounded-3xl shadow-[0_25px_60px_rgba(0,0,0,0.9)] overflow-hidden my-auto"
        >
          {/* Header */}
          <div className="sticky top-0 z-20 bg-zinc-950/90 backdrop-blur-md px-5 py-4 border-b border-white/10 flex items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-2xl bg-amber-500/15 border border-amber-500/30 text-amber-400">
                <ClipboardList className="w-5 h-5" />
              </div>
              <div>
                <h2 className="font-cairo font-black text-lg md:text-xl text-amber-100 flex items-center gap-2">
                  <span>سجل وطلبات الاستبدال • Orders Page</span>
                  <span className="text-xs font-bold text-amber-400 bg-amber-500/10 px-2.5 py-0.5 rounded-full border border-amber-500/20">
                    {userOrders.length} طلبات
                  </span>
                </h2>
                <p className="font-tajawal text-xs text-zinc-400">
                  متابعة حالة طلبات مقتنيات الصوم ببدل العملات ومواعيد الاستلام
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setIsOrdersOpen(false)}
              className="p-2 rounded-full bg-zinc-900 border border-white/15 text-zinc-400 hover:text-white hover:bg-zinc-800 transition-all cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Filter Status Pills */}
          <div className="px-5 md:px-8 pt-4 pb-2 border-b border-white/5 bg-zinc-900/40 flex items-center gap-2 overflow-x-auto no-scrollbar">
            {statusOptions.map((opt) => (
              <button
                key={opt.key}
                type="button"
                onClick={() => setOrderStatusFilter(opt.key)}
                className={`px-3.5 py-1.5 rounded-full font-cairo font-bold text-xs shrink-0 flex items-center gap-1.5 transition-all cursor-pointer ${
                  orderStatusFilter === opt.key
                    ? 'bg-amber-500 text-amber-950 shadow-md shadow-amber-500/20'
                    : 'bg-zinc-900 text-zinc-400 hover:text-white hover:bg-zinc-800 border border-white/10'
                }`}
              >
                <span>{opt.labelAr}</span>
                <span className={`px-1.5 py-0.2 rounded-full text-[10px] ${
                  orderStatusFilter === opt.key ? 'bg-amber-950/30 text-amber-950 font-black' : 'bg-zinc-800 text-zinc-400'
                }`}>
                  {opt.count}
                </span>
              </button>
            ))}
          </div>

          {/* Orders Content */}
          <div className="p-5 md:p-8 max-h-[75vh] overflow-y-auto custom-scrollbar space-y-6">
            {filteredOrders.length === 0 ? (
              <div className="py-12 px-4 text-center space-y-4 max-w-md mx-auto">
                <div className="w-16 h-16 mx-auto rounded-2xl bg-zinc-900 border border-white/10 flex items-center justify-center text-zinc-500">
                  <ClipboardList className="w-8 h-8" />
                </div>
                <h3 className="font-cairo font-bold text-amber-100 text-base">لا توجد طلبات بهذه الحالة حالياً</h3>
                <p className="font-tajawal text-xs text-zinc-400">اختر تصنيفاً آخر لمشاهدة باقي طلبات الاستبدال.</p>
              </div>
            ) : (
              <div className="space-y-6">
                {filteredOrders.map((order) => {
                  const statusInfo = ORDER_STATUS_CONFIG[order.status];
                  const StatusIcon = statusInfo.icon;
                  const currentStepIdx = statusInfo.stepIndex;

                  return (
                    <motion.div
                      key={order.id}
                      layout
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="p-5 rounded-3xl bg-zinc-900/80 border border-amber-500/20 hover:border-amber-500/40 transition-all space-y-5 shadow-lg relative overflow-hidden group"
                    >
                      {/* Top Bar: Order Number, Date, Status Badge */}
                      <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-white/10">
                        <div className="flex items-center gap-3">
                          <div className="px-3 py-1 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-300 font-cairo font-black text-sm md:text-base flex items-center gap-1.5">
                            <Hash className="w-4 h-4 text-amber-400" />
                            <span>{order.orderNumber}</span>
                          </div>
                          <div className="flex items-center gap-1.5 text-xs text-zinc-400 font-tajawal">
                            <Calendar className="w-3.5 h-3.5 text-zinc-500" />
                            <span>{order.dateAr}</span>
                          </div>
                        </div>

                        {/* Status Badge */}
                        <div className={`px-4 py-1.5 rounded-full border ${statusInfo.bgClass} ${statusInfo.borderClass} ${statusInfo.textClass} flex items-center gap-2 font-cairo font-black text-xs md:text-sm shadow-md`}>
                          <StatusIcon className="w-4 h-4" />
                          <span>{statusInfo.labelAr} ({statusInfo.labelEn})</span>
                        </div>
                      </div>

                      {/* 5-Stage Status Progress Tracker */}
                      <div className="p-4 rounded-2xl bg-zinc-950/60 border border-white/5 space-y-3">
                        <div className="flex items-center justify-between text-xs font-cairo font-bold text-zinc-400 pb-1">
                          <span>مسار حالة الطلب (Order Progress)</span>
                          <span className={`text-[11px] ${statusInfo.textClass}`}>{statusInfo.descriptionAr}</span>
                        </div>

                        {/* Tracker Bar */}
                        <div className="relative flex items-center justify-between pt-2">
                          {/* Progress Line */}
                          <div className="absolute top-1/2 left-4 right-4 -translate-y-1/2 h-1 bg-zinc-800 z-0">
                            <div
                              className="h-full bg-gradient-to-r from-amber-500 via-blue-500 to-emerald-500 transition-all duration-500"
                              style={{ width: `${((currentStepIdx - 1) / 4) * 100}%` }}
                            />
                          </div>

                          {/* Stage Nodes */}
                          {stages.map((stg, index) => {
                            const cfg = ORDER_STATUS_CONFIG[stg];
                            const StepIcon = cfg.icon;
                            const isPassed = index + 1 <= currentStepIdx;
                            const isCurrent = index + 1 === currentStepIdx;

                            return (
                              <div key={stg} className="relative z-10 flex flex-col items-center gap-1.5 group/step">
                                <div
                                  className={`w-8 h-8 rounded-full flex items-center justify-center transition-all ${
                                    isCurrent
                                      ? `${cfg.badgeBg} text-zinc-950 font-black ring-4 ring-amber-500/20 scale-110 shadow-lg`
                                      : isPassed
                                      ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                                      : 'bg-zinc-900 text-zinc-600 border border-zinc-800'
                                  }`}
                                >
                                  {isPassed && !isCurrent ? (
                                    <Check className="w-4 h-4" />
                                  ) : (
                                    <StepIcon className="w-3.5 h-3.5" />
                                  )}
                                </div>
                                <span
                                  className={`text-[10px] font-tajawal font-bold text-center hidden sm:block ${
                                    isCurrent
                                      ? 'text-amber-200 font-extrabold'
                                      : isPassed
                                      ? 'text-zinc-300'
                                      : 'text-zinc-600'
                                  }`}
                                >
                                  {cfg.labelAr}
                                </span>
                              </div>
                            );
                          })}
                        </div>
                      </div>

                      {/* Products List */}
                      <div className="space-y-2.5">
                        <h4 className="font-cairo font-bold text-xs text-amber-200">
                          المقتنيات المطلوبة ({order.items.length}):
                        </h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                          {order.items.map((item, idx) => (
                            <div
                              key={idx}
                              className="p-3 rounded-2xl bg-zinc-950 border border-white/5 flex items-center gap-3"
                            >
                              <img
                                src={item.productImage}
                                alt={item.productNameAr}
                                className="w-14 h-14 rounded-xl object-cover shrink-0 border border-white/10"
                              />
                              <div className="flex-1 min-w-0 space-y-1">
                                <h5 className="font-cairo font-bold text-xs text-amber-100 truncate">
                                  {item.productNameAr}
                                </h5>
                                <div className="flex items-center justify-between text-[11px] font-tajawal text-zinc-400">
                                  <span>الكمية: <strong className="text-amber-300 font-cairo">× {item.quantity}</strong></span>
                                  <span className="font-cairo font-bold text-amber-400 flex items-center gap-1">
                                    <Coins className="w-3 h-3" />
                                    {item.unitCoins * item.quantity} عملة
                                  </span>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Order Summary & Footer Note */}
                      <div className="pt-3 border-t border-white/10 flex flex-wrap items-center justify-between gap-3">
                        <div className="flex items-center gap-2">
                          <div className="px-3.5 py-1.5 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-300 font-cairo font-bold text-xs flex items-center gap-2">
                            <span>إجمالي العملات المستخدمة:</span>
                            <span className="font-black text-amber-400 text-sm flex items-center gap-1">
                              <Coins className="w-4 h-4 text-amber-400" />
                              {order.totalCoins} عملة
                            </span>
                          </div>
                        </div>

                        <div className="text-xs text-zinc-400 font-tajawal flex items-center gap-1.5 bg-zinc-950 px-3 py-1.5 rounded-xl border border-white/5">
                          <Info className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                          <span>متاح للاستلام: مكتب التربية الكنسية بالمطرانية</span>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            )}
          </div>
        </motion.div>
      </motion.div>
    );
  };

  return (
    <motion.div
      className="fixed inset-0 z-50 overflow-y-auto bg-black/95 backdrop-blur-2xl text-white dir-rtl select-none"
      initial={{ opacity: 0, scale: 0.98, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.98, y: 20 }}
      transition={{ duration: 0.3 }}
    >
      {/* Toast Notification Banner */}
      <AnimatePresence>
        {activeToast && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-16 left-1/2 -translate-x-1/2 z-50 px-6 py-3 rounded-full bg-amber-400 text-amber-950 font-cairo font-bold text-xs md:text-sm shadow-[0_0_25px_rgba(251,191,36,0.6)] flex items-center gap-2 border border-amber-200"
          >
            <Sparkles className="w-4 h-4 text-amber-950 fill-amber-950" />
            <span>{activeToast}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Sticky Top Navigation Bar */}
      <div className="sticky top-0 z-40 bg-black/90 backdrop-blur-md border-b border-amber-500/20 px-4 py-3.5 md:px-8 flex items-center justify-between">
        <button
          type="button"
          onClick={onClose}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full font-tajawal font-bold text-xs md:text-sm text-amber-200 bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/30 transition-all cursor-pointer"
        >
          <ArrowRight className="w-4 h-4 text-amber-400" />
          <span>العودة • Back</span>
        </button>

        <div className="flex items-center gap-2 md:gap-3">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-amber-400" />
            <span className="text-xs md:text-sm font-tajawal font-extrabold text-amber-400 bg-amber-400/10 px-3.5 py-1 rounded-full border border-amber-400/20">
              متجر المكافآت الرئيسي • Store Home
            </span>
          </div>

          {favorites.length > 0 && (
            <span className="hidden md:inline-flex items-center gap-1 px-3 py-1 rounded-full bg-rose-500/15 border border-rose-500/30 text-rose-300 text-xs font-tajawal font-bold">
              <Heart className="w-3.5 h-3.5 fill-rose-500 text-rose-500" />
              <span>{favorites.length} بالمفضلة</span>
            </span>
          )}

          {/* Interactive Orders Button */}
          <button
            type="button"
            onClick={() => setIsOrdersOpen(true)}
            className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-zinc-900 hover:bg-zinc-800 border border-amber-500/30 text-amber-200 text-xs md:text-sm font-tajawal font-extrabold transition-all cursor-pointer shadow-md active:scale-95 group"
          >
            <ClipboardList className="w-4 h-4 text-amber-400 group-hover:scale-110 transition-transform" />
            <span>طلباتي ({userOrders.length})</span>
          </button>

          {/* Interactive Cart Button */}
          <button
            type="button"
            onClick={() => setIsCartOpen(true)}
            className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-gradient-to-r from-amber-500/20 to-amber-600/20 hover:from-amber-500/30 hover:to-amber-600/30 border border-amber-500/40 text-amber-200 text-xs md:text-sm font-tajawal font-extrabold transition-all cursor-pointer shadow-md active:scale-95 group"
          >
            <ShoppingBag className="w-4 h-4 text-amber-400 group-hover:scale-110 transition-transform" />
            <span>السلة ({totalCartQuantity})</span>
            {totalCartQuantity > 0 && (
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
            )}
          </button>
        </div>

        {/* User Balance Compact Pill */}
        <div className="hidden sm:flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/15 border border-amber-500/30 text-amber-200 text-xs font-cairo font-bold">
          <Coins className="w-4 h-4 text-amber-400" />
          <span>{userCoins} عملة ذهبية</span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-6 md:py-10 space-y-10">
        {isLoading ? (
          <StoreSkeleton />
        ) : (
          <>
            {/* Store Home Header Hero Banner */}
            <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-zinc-950 via-zinc-900 to-amber-950/40 border border-amber-500/30 p-6 md:p-10 shadow-[0_8px_32px_rgba(0,0,0,0.6)] text-center space-y-4">

          <div className="absolute top-0 right-1/4 w-72 h-72 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-1/4 w-72 h-72 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="flex flex-wrap items-center justify-center gap-2 max-w-xl mx-auto">
            <span className="px-3 py-1 rounded-full bg-amber-500/20 border border-amber-500/30 text-amber-300 text-xs font-tajawal font-bold flex items-center gap-1.5">
              <Trophy className="w-3.5 h-3.5 text-amber-400" />
              <span>المستوى {userLevel}</span>
            </span>
            <span className="px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-500/30 text-emerald-300 text-xs font-tajawal font-bold flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
              <span>+{userXP} XP</span>
            </span>
            <span className="px-4 py-1.5 rounded-full bg-gradient-to-r from-amber-500/30 via-amber-400/30 to-amber-500/30 border border-amber-500/50 text-amber-200 text-xs md:text-sm font-cairo font-black shadow-md flex items-center gap-2">
              <Coins className="w-4 h-4 text-amber-400" />
              <span>رصيدك الحالي: <strong className="text-amber-300">{userCoins} عملة 🪙</strong></span>
            </span>
          </div>

          <h1 className="text-3xl md:text-5xl font-cairo font-black text-amber-100 tracking-tight">
            متجر المكافآت والمقتنيات الكنسية
          </h1>

          <p className="text-sm md:text-base font-tajawal text-amber-200/80 max-w-3xl mx-auto leading-relaxed">
            استبدل العملات الذهبية (Coins) التي اكتسبتها في رحلتك الروحية بمكافآت هادفة، كتب دينية، أيقونات قبطية، وشموع معطرة مباركة.
          </p>

          {/* Search Input Bar */}
          <div className="max-w-md mx-auto pt-2">
            <div className="relative">
              <Search className="w-4 h-4 text-amber-400 absolute right-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="ابحث عن كتاب، أيقونة، شمعة، أو صليب..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-4 pr-10 py-2.5 rounded-full bg-zinc-900/90 border border-amber-500/30 text-xs md:text-sm font-tajawal text-amber-100 placeholder-zinc-500 focus:outline-none focus:border-amber-400 transition-all shadow-inner"
              />
            </div>
          </div>
        </div>

        {/* If searching or category filtering active, show filtered grid */}
        {(searchQuery.trim() !== '' || selectedCategory !== 'All') ? (
          <div className="space-y-6">
            <div className="flex items-center justify-between border-b border-amber-500/20 pb-3">
              <h2 className="font-cairo font-black text-xl text-amber-100 flex items-center gap-2">
                <Filter className="w-5 h-5 text-amber-400" />
                <span>نتائج البحث والتصفية ({filteredProducts.length} منتج)</span>
              </h2>

              <button
                type="button"
                onClick={() => {
                  setSelectedCategory('All');
                  setSearchQuery('');
                }}
                className="text-xs font-tajawal text-amber-400 hover:text-amber-200 underline cursor-pointer"
              >
                إلغاء التصفية والعودة للرئيسية
              </button>
            </div>

            {filteredProducts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProducts.map((p) => renderProductCard(p))}
              </div>
            ) : (
              <EmptyState
                type="no_search_results"
                titleAr={`لم نجد نتائج تطابق "${searchQuery || selectedCategory}"`}
                descriptionAr="جرب البحث باسم آخر مثل (أجبية، كتاب، شمعة، أيقونة، صليب) أو اختر قسماً آخر من القائمة."
                onAction={() => {
                  setSelectedCategory('All');
                  setSearchQuery('');
                }}
                actionLabelAr="إلغاء التصفية ورؤية كافة المنتجات"
              />
            )}
          </div>
        ) : (
          /* Store Home Sections View */
          <div className="space-y-12">
            {/* SECTION 1: Featured Products (المنتجات المميزة) */}
            <section className="space-y-5">
              <div className="flex items-center justify-between border-b border-amber-500/20 pb-3">
                <div className="flex items-center gap-2.5">
                  <div className="p-2 rounded-xl bg-amber-500/20 text-amber-300 border border-amber-500/30">
                    <Sparkles className="w-5 h-5" />
                  </div>
                  <div>
                    <h2 className="font-cairo font-black text-xl md:text-2xl text-amber-100">
                      منتجات مميزة • Featured Products
                    </h2>
                    <p className="font-tajawal text-xs text-zinc-400">
                      أبرز المقتنيات النادرة والكتب ذات القيمة الروحية العالية
                    </p>
                  </div>
                </div>

                <span className="text-xs font-tajawal font-bold text-amber-400 bg-amber-500/10 px-3 py-1 rounded-full border border-amber-500/20">
                  3 منتجات مميزة
                </span>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Hero Featured Card (Spans 2 columns on large screens) */}
                <div className="lg:col-span-2 relative overflow-hidden rounded-3xl bg-gradient-to-br from-amber-950/40 via-zinc-900 to-zinc-950 border border-amber-500/40 p-6 md:p-8 shadow-xl flex flex-col justify-between space-y-6 group">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <span className="px-3 py-1 rounded-full bg-amber-400 text-amber-950 font-cairo font-black text-xs shadow-md">
                      {featuredProducts[0].badgeTag}
                    </span>
                    <span className="px-3 py-1 rounded-full bg-black/60 border border-amber-500/30 text-amber-300 font-cairo font-bold text-xs flex items-center gap-1">
                      <Coins className="w-3.5 h-3.5 text-amber-400" />
                      <span>{featuredProducts[0].requiredCoins} عملة</span>
                    </span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
                    <div className="space-y-3">
                      <span className="text-xs font-tajawal text-amber-400 font-bold block">
                        {featuredProducts[0].categoryLabelAr}
                      </span>
                      <h3 className="font-cairo font-black text-2xl md:text-3xl text-amber-100 leading-tight">
                        {featuredProducts[0].nameAr}
                      </h3>
                      <p className="font-tajawal text-xs md:text-sm text-zinc-300 leading-relaxed">
                        {featuredProducts[0].description}
                      </p>
                      <div className="pt-2">
                        {renderAvailabilityBadge(featuredProducts[0].availability)}
                      </div>
                    </div>

                    <div className="relative aspect-[4/3] rounded-2xl overflow-hidden border border-amber-500/30 shadow-2xl">
                      <img
                        src={featuredProducts[0].image}
                        alt={featuredProducts[0].nameAr}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => handleSimulateRedeem(featuredProducts[0])}
                    className="w-full py-3.5 rounded-2xl font-cairo font-black text-sm text-amber-950 bg-gradient-to-r from-amber-300 via-amber-400 to-amber-500 hover:from-amber-200 hover:to-amber-400 shadow-[0_0_20px_rgba(251,191,36,0.3)] transition-all cursor-pointer flex items-center justify-center gap-2 active:scale-95"
                  >
                    <Gift className="w-4 h-4" />
                    <span>استبدل المنتج المميز • Redeem Featured Item</span>
                  </button>
                </div>

                {/* Secondary Featured Cards */}
                <div className="space-y-6 flex flex-col justify-between">
                  {featuredProducts.slice(1).map((p) => renderProductCard(p, true))}
                </div>
              </div>
            </section>

            {/* SECTION 2: Categories (أقسام المتجر) */}
            <section className="space-y-5">
              <div className="flex items-center justify-between border-b border-amber-500/20 pb-3">
                <div className="flex items-center gap-2.5">
                  <div className="p-2 rounded-xl bg-sky-500/20 text-sky-300 border border-sky-500/30">
                    <Filter className="w-5 h-5" />
                  </div>
                  <div>
                    <h2 className="font-cairo font-black text-xl md:text-2xl text-amber-100">
                      أقسام المتجر الرئيسية • Store Categories
                    </h2>
                    <p className="font-tajawal text-xs text-zinc-400">
                      تصفح الأقسام الثمانية المخصصة واستكشف المقتنيات والكتب والدراسات الكنسية
                    </p>
                  </div>
                </div>

                <span className="text-xs font-tajawal font-bold text-sky-400 bg-sky-500/10 px-3 py-1 rounded-full border border-sky-500/20">
                  8 أقسام رئيسية
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5">
                {categories.map((cat) => {
                  const CatIcon = cat.icon;
                  const isSelected = selectedCategory === cat.key;

                  return (
                    <button
                      key={cat.key}
                      type="button"
                      onClick={() => setSelectedCategory(cat.key)}
                      className={`group relative rounded-2xl md:rounded-3xl overflow-hidden border text-right transition-all duration-300 cursor-pointer flex flex-col justify-between aspect-[16/10] sm:aspect-[4/3] p-4 md:p-5 shadow-lg ${
                        isSelected
                          ? 'border-amber-400 ring-2 ring-amber-400/50 shadow-[0_0_25px_rgba(251,191,36,0.3)] scale-[1.02]'
                          : 'border-white/10 hover:border-amber-500/40 hover:shadow-[0_0_20px_rgba(251,191,36,0.15)]'
                      }`}
                    >
                      {/* Background Category Image */}
                      <img
                        src={cat.image}
                        alt={cat.labelAr}
                        className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/70 to-zinc-950/30 group-hover:via-zinc-950/60 transition-colors" />

                      {/* Top Row: Icon Badge & Product Count */}
                      <div className="relative z-10 flex items-center justify-between gap-2">
                        <div className="w-10 h-10 rounded-2xl bg-black/60 backdrop-blur-md border border-amber-500/30 text-amber-300 flex items-center justify-center shadow-md group-hover:bg-amber-400 group-hover:text-amber-950 transition-colors">
                          <CatIcon className="w-5 h-5" />
                        </div>

                        <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/75 backdrop-blur-md border border-white/15 text-amber-200 text-[11px] font-tajawal font-bold shadow-md">
                          <span>{cat.count} منتج</span>
                          {cat.badgeTag && (
                            <span className="text-[10px] text-amber-400/90 font-normal border-r border-white/20 pr-1.5 mr-0.5 hidden sm:inline">
                              {cat.badgeTag}
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Bottom Row: Category Name & Short Description */}
                      <div className="relative z-10 space-y-1 pt-4">
                        <div className="flex items-center justify-between">
                          <h3 className="font-cairo font-black text-lg md:text-xl text-amber-100 group-hover:text-amber-300 transition-colors">
                            {cat.labelAr}
                          </h3>
                          <span className="text-xs font-tajawal text-amber-400/80 font-normal">
                            {cat.labelEn}
                          </span>
                        </div>
                        <p className="font-tajawal text-xs text-zinc-300/90 line-clamp-1 leading-relaxed">
                          {cat.descriptionAr}
                        </p>
                      </div>
                    </button>
                  );
                })}
              </div>
            </section>

            {/* SECTION 3: New Arrivals (وصل حديثاً) */}
            <section className="space-y-5">
              <div className="flex items-center justify-between border-b border-amber-500/20 pb-3">
                <div className="flex items-center gap-2.5">
                  <div className="p-2 rounded-xl bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                    <Flame className="w-5 h-5" />
                  </div>
                  <div>
                    <h2 className="font-cairo font-black text-xl md:text-2xl text-amber-100">
                      وصل حديثاً • New Arrivals
                    </h2>
                    <p className="font-tajawal text-xs text-zinc-400">
                      أحدث المنتجات والمكافآت التي تمت إضافتها للمتجر مؤخراً
                    </p>
                  </div>
                </div>

                <span className="text-xs font-tajawal font-bold text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20">
                  إضافات جديدة
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {newArrivals.map((p) => renderProductCard(p))}
              </div>
            </section>

            {/* SECTION 4: Popular Products (الأكثر شعبية) */}
            <section className="space-y-5">
              <div className="flex items-center justify-between border-b border-amber-500/20 pb-3">
                <div className="flex items-center gap-2.5">
                  <div className="p-2 rounded-xl bg-orange-500/20 text-orange-300 border border-orange-500/30">
                    <TrendingUp className="w-5 h-5" />
                  </div>
                  <div>
                    <h2 className="font-cairo font-black text-xl md:text-2xl text-amber-100">
                      الأكثر شعبية • Popular Products
                    </h2>
                    <p className="font-tajawal text-xs text-zinc-400">
                      المنتجات الأكثر طلباً واستبدالاً بين المشاركين في الصوم الكبير
                    </p>
                  </div>
                </div>

                <span className="text-xs font-tajawal font-bold text-orange-400 bg-orange-500/10 px-3 py-1 rounded-full border border-orange-500/20">
                  🔥 الأعلى طلباً
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {popularProducts.map((p) => renderProductCard(p))}
              </div>
            </section>

            {/* SECTION 5: Recommended For You (مقترحة لك) */}
            <section className="space-y-5">
              <div className="flex items-center justify-between border-b border-amber-500/20 pb-3">
                <div className="flex items-center gap-2.5">
                  <div className="p-2 rounded-xl bg-purple-500/20 text-purple-300 border border-purple-500/30">
                    <Compass className="w-5 h-5" />
                  </div>
                  <div>
                    <h2 className="font-cairo font-black text-xl md:text-2xl text-amber-100">
                      مقترحة لك • Recommended For You
                    </h2>
                    <p className="font-tajawal text-xs text-zinc-400">
                      ترشيحات مخصصة بناءً على مستواك الروحي ورصيد نقاطك
                    </p>
                  </div>
                </div>

                <span className="text-xs font-tajawal font-bold text-purple-400 bg-purple-500/10 px-3 py-1 rounded-full border border-purple-500/20">
                  موصى به لمستواك
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {recommendedProducts.map((p) => renderProductCard(p))}
              </div>
            </section>
          </div>
        )}

        {/* Store Footer Info Banner */}
        <div className="p-5 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-center space-y-1.5">
          <p className="font-cairo font-bold text-sm text-amber-200">
            الصفحة الرئيسية لمتجر المكافآت • Store Home & Product Details
          </p>
          <p className="font-tajawal text-xs text-amber-300/70">
            تتضمن الأقسام الرئيسية الخمسة والمعرض التفاعلي الشامل لتفاصيل المنتجات، الصور المتعددة، المكونات والمواصفات الروحية مع إضافة المفضلة والسلة.
          </p>
        </div>
          </>
        )}
      </div>


      {/* Product Details, Cart, & Orders Modal Portals */}
      <AnimatePresence>
        {selectedProductForDetails && renderProductDetailsModal()}
        {isCartOpen && renderCartModal()}
        {isOrdersOpen && renderOrdersModal()}
      </AnimatePresence>

      <GlobalFooter />
    </motion.div>
  );
};
