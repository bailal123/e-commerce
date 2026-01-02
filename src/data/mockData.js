// Hero Slides
export const heroSlides = [
  {
    id: 1,
    title: 'تخفيضات الصيف',
    subtitle: 'خصم يصل إلى 50%',
    description: 'استمتع بأفضل العروض على منتجات الإلكترونيات والأزياء',
    image: 'https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=800&h=400&fit=crop&auto=format&q=70',
    imageSrcSet: 'https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=480&h=240&fit=crop&auto=format&q=70 480w, https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=800&h=400&fit=crop&auto=format&q=70 800w, https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=1200&h=600&fit=crop&auto=format&q=70 1200w',
    buttonText: 'تسوق الآن',
    buttonLink: '/category/sale',
    bgColor: 'from-primary-600 to-primary-800',
  },
  {
    id: 2,
    title: 'منتجات حرفية مميزة',
    subtitle: 'من أفضل التجار المحليين',
    description: 'اكتشف التحف والمنتجات اليدوية الفريدة',
    image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&h=400&fit=crop&auto=format&q=70',
    imageSrcSet: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=480&h=240&fit=crop&auto=format&q=70 480w, https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&h=400&fit=crop&auto=format&q=70 800w, https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=1200&h=600&fit=crop&auto=format&q=70 1200w',
    buttonText: 'اكتشف المزيد',
    buttonLink: '/category/handmade',
    bgColor: 'from-accent-500 to-accent-700',
  },
  {
    id: 3,
    title: 'أحدث التقنيات',
    subtitle: 'أجهزة ذكية بأسعار منافسة',
    description: 'هواتف، لابتوب، أجهزة منزلية ذكية',
    image: 'https://images.unsplash.com/photo-1468495244123-6c6c332eeece?w=800&h=400&fit=crop&auto=format&q=70',
    imageSrcSet: 'https://images.unsplash.com/photo-1468495244123-6c6c332eeece?w=480&h=240&fit=crop&auto=format&q=70 480w, https://images.unsplash.com/photo-1468495244123-6c6c332eeece?w=800&h=400&fit=crop&auto=format&q=70 800w, https://images.unsplash.com/photo-1468495244123-6c6c332eeece?w=1200&h=600&fit=crop&auto=format&q=70 1200w',
    buttonText: 'عرض المنتجات',
    buttonLink: '/category/electronics',
    bgColor: 'from-blue-600 to-blue-800',
  },
]

// Categories
export const categories = [
  {
    id: 1,
    name: 'إلكترونيات',
    slug: 'electronics',
    description: 'هواتف، لابتوب، أجهزة ذكية',
    image: 'https://images.unsplash.com/photo-1498049794561-7780e7231661?w=400&h=400&fit=crop&auto=format&q=70',
    icon: '📱',
    productCount: 1250,
    featured: true,
  },
  {
    id: 2,
    name: 'أزياء رجالية',
    slug: 'mens-fashion',
    description: 'ملابس وإكسسوارات رجالية',
    image: 'https://images.unsplash.com/photo-1490578474895-699cd4e2cf59?w=400&h=400&fit=crop&auto=format&q=70',
    icon: '👔',
    productCount: 890,
    featured: true,
  },
  {
    id: 3,
    name: 'أزياء نسائية',
    slug: 'womens-fashion',
    description: 'ملابس وإكسسوارات نسائية',
    image: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?w=400&h=400&fit=crop&auto=format&q=70',
    icon: '👗',
    productCount: 1100,
    featured: true,
  },
  {
    id: 4,
    name: 'منزل ومطبخ',
    slug: 'home-kitchen',
    description: 'أدوات منزلية ومطبخ',
    image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=400&fit=crop&auto=format&q=70',
    icon: '🏠',
    productCount: 650,
    featured: true,
  },
  {
    id: 5,
    name: 'جمال وعناية',
    slug: 'beauty',
    description: 'مستحضرات تجميل وعناية',
    image: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=400&h=400&fit=crop&auto=format&q=70',
    icon: '💄',
    productCount: 480,
    featured: false,
  },
  {
    id: 6,
    name: 'رياضة ولياقة',
    slug: 'sports',
    description: 'معدات رياضية وملابس',
    image: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=400&h=400&fit=crop&auto=format&q=70',
    icon: '⚽',
    productCount: 320,
    featured: false,
  },
  {
    id: 7,
    name: 'كتب وقرطاسية',
    slug: 'books',
    description: 'كتب ومستلزمات مكتبية',
    image: 'https://images.unsplash.com/photo-1495446815901-a7297e633e8d?w=400&h=400&fit=crop&auto=format&q=70',
    icon: '📚',
    productCount: 560,
    featured: false,
  },
  {
    id: 8,
    name: 'ألعاب وترفيه',
    slug: 'toys',
    description: 'ألعاب للأطفال والكبار',
    image: 'https://images.unsplash.com/photo-1558060370-d644479cb6f7?w=400&h=400&fit=crop&auto=format&q=70',
    icon: '🎮',
    productCount: 410,
    featured: false,
  },
]

// Vendors
export const vendors = [
  {
    id: 1,
    name: 'متجر التقنية',
    slug: 'tech-store',
    description: 'أفضل الأجهزة الإلكترونية بأسعار تنافسية',
    logo: 'https://images.unsplash.com/photo-1560179707-f14e90ef3623?w=150&h=150&fit=crop&auto=format&q=70',
    coverImage: 'https://images.unsplash.com/photo-1531297484001-80022131f5a1?w=800&h=300&fit=crop&auto=format&q=70',
    rating: 4.8,
    reviewCount: 1250,
    productCount: 450,
    followerCount: 5600,
    verified: true,
    featured: true,
    joinedDate: '2022-01-15',
    responseTime: 'خلال ساعة',
    shippingSpeed: 'سريع',
    location: 'دبي',
    categories: ['إلكترونيات', 'أجهزة ذكية'],
    badges: ['بائع موثوق', 'شحن سريع'],
  },
  {
    id: 2,
    name: 'أزياء الخليج',
    slug: 'gulf-fashion',
    description: 'أحدث صيحات الموضة العربية والعالمية',
    logo: 'https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?w=150&h=150&fit=crop&auto=format&q=70',
    coverImage: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&h=300&fit=crop&auto=format&q=70',
    rating: 4.7,
    reviewCount: 890,
    productCount: 380,
    followerCount: 4200,
    verified: true,
    featured: true,
    joinedDate: '2021-08-20',
    responseTime: 'خلال 3 ساعات',
    shippingSpeed: 'سريع',
    location: 'أبوظبي',
    categories: ['أزياء رجالية', 'أزياء نسائية'],
    badges: ['بائع موثوق', 'منتجات أصلية'],
  },
  {
    id: 3,
    name: 'حرف يدوية',
    slug: 'handmade-crafts',
    description: 'منتجات يدوية فريدة من صنع حرفيين محليين',
    logo: 'https://images.unsplash.com/photo-1452860606245-08befc0ff44b?w=150&h=150&fit=crop&auto=format&q=70',
    coverImage: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=300&fit=crop&auto=format&q=70',
    rating: 4.9,
    reviewCount: 520,
    productCount: 180,
    followerCount: 3100,
    verified: true,
    featured: true,
    joinedDate: '2022-03-10',
    responseTime: 'خلال يوم',
    shippingSpeed: 'عادي',
    location: 'الشارقة',
    categories: ['حرف يدوية', 'ديكور'],
    badges: ['حرفي معتمد', 'منتجات فريدة'],
  },
  {
    id: 4,
    name: 'صحتك أولاً',
    slug: 'health-first',
    description: 'مستلزمات صحية وعناية شخصية',
    logo: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=150&h=150&fit=crop&auto=format&q=70',
    coverImage: 'https://images.unsplash.com/photo-1532938911079-1b06ac7ceec7?w=800&h=300&fit=crop&auto=format&q=70',
    rating: 4.6,
    reviewCount: 340,
    productCount: 220,
    followerCount: 2800,
    verified: true,
    featured: false,
    joinedDate: '2022-06-05',
    responseTime: 'خلال ساعتين',
    shippingSpeed: 'سريع',
    location: 'دبي',
    categories: ['جمال وعناية', 'صحة'],
    badges: ['منتجات معتمدة'],
  },
]

// Products
export const products = [
  {
    id: 1,
    name: 'آيفون 15 برو ماكس',
    slug: 'iphone-15-pro-max',
    description: 'أحدث هاتف من أبل مع شريحة A17 Pro وكاميرا 48 ميجابكسل',
    longDescription: `
      يأتي iPhone 15 Pro Max بتصميم جديد من التيتانيوم يجعله أخف وأقوى. 
      يضم شريحة A17 Pro الأقوى على الإطلاق مع GPU بـ 6 أنوية.
      كاميرا رئيسية 48 ميجابكسل مع زووم بصري 5x.
      شاشة Super Retina XDR بحجم 6.7 إنش.
      منفذ USB-C مع دعم USB 3.
    `,
    images: [
      'https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=600&h=600&fit=crop&auto=format&q=70',
      'https://images.unsplash.com/photo-1591337676887-a217a6970a8a?w=600&h=600&fit=crop&auto=format&q=70',
      'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=600&h=600&fit=crop&auto=format&q=70',
    ],
    price: 5499,
    salePrice: 4999,
    currency: 'AED',
    category: categories[0],
    vendor: vendors[0],
    rating: 4.9,
    reviewCount: 128,
    stock: 25,
    sku: 'APL-IP15PM-256',
    variants: {
      colors: [
        { name: 'تيتانيوم طبيعي', value: '#8B8B8D' },
        { name: 'تيتانيوم أزرق', value: '#4B5563' },
        { name: 'تيتانيوم أبيض', value: '#F5F5F5' },
        { name: 'تيتانيوم أسود', value: '#1F2937' },
      ],
      sizes: ['256GB', '512GB', '1TB'],
    },
    features: [
      'شريحة A17 Pro',
      'كاميرا 48MP',
      'شاشة 6.7 إنش',
      'تيتانيوم',
      'USB-C',
    ],
    specifications: {
      'الشاشة': '6.7 إنش Super Retina XDR',
      'المعالج': 'A17 Pro',
      'الكاميرا الخلفية': '48MP + 12MP + 12MP',
      'الكاميرا الأمامية': '12MP',
      'البطارية': 'حتى 29 ساعة تشغيل فيديو',
      'نظام التشغيل': 'iOS 17',
    },
    tags: ['جديد', 'الأكثر مبيعاً'],
    featured: true,
    isNew: true,
    createdAt: '2024-01-15',
  },
  {
    id: 2,
    name: 'سماعات AirPods Pro 2',
    slug: 'airpods-pro-2',
    description: 'سماعات لاسلكية مع إلغاء ضوضاء نشط وصوت مكاني',
    longDescription: `
      سماعات AirPods Pro الجيل الثاني مع شريحة H2 الجديدة.
      إلغاء ضوضاء نشط أقوى بمرتين.
      وضع الشفافية التكيفي.
      صوت مكاني شخصي.
      عمر بطارية يصل إلى 6 ساعات.
    `,
    images: [
      'https://images.unsplash.com/photo-1600294037681-c80b4cb5b434?w=600&h=600&fit=crop&auto=format&q=70',
      'https://images.unsplash.com/photo-1588423771073-b8903fbb85b5?w=600&h=600&fit=crop&auto=format&q=70',
    ],
    price: 999,
    salePrice: null,
    currency: 'AED',
    category: categories[0],
    vendor: vendors[0],
    rating: 4.8,
    reviewCount: 256,
    stock: 50,
    sku: 'APL-APP2-WHT',
    variants: {
      colors: [
        { name: 'أبيض', value: '#FFFFFF' },
      ],
    },
    features: [
      'إلغاء ضوضاء',
      'صوت مكاني',
      'مقاوم للماء',
      'شريحة H2',
    ],
    specifications: {
      'الشريحة': 'Apple H2',
      'إلغاء الضوضاء': 'نشط',
      'مقاومة الماء': 'IPX4',
      'البطارية': '6 ساعات (30 ساعة مع العلبة)',
      'الاتصال': 'Bluetooth 5.3',
    },
    tags: ['الأكثر مبيعاً'],
    featured: true,
    isNew: false,
    createdAt: '2023-09-20',
  },
  {
    id: 3,
    name: 'قميص قطني فاخر',
    slug: 'premium-cotton-shirt',
    description: 'قميص رجالي من القطن المصري عالي الجودة',
    longDescription: `
      قميص رجالي أنيق مصنوع من أفضل أنواع القطن المصري.
      تصميم كلاسيكي يناسب جميع المناسبات.
      قماش ناعم ومريح طوال اليوم.
      سهل الكي ومقاوم للتجعد.
    `,
    images: [
      'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=600&h=600&fit=crop&auto=format&q=70',
      'https://images.unsplash.com/photo-1603252109303-2751441dd157?w=600&h=600&fit=crop&auto=format&q=70',
    ],
    price: 299,
    salePrice: 199,
    currency: 'AED',
    category: categories[1],
    vendor: vendors[1],
    rating: 4.6,
    reviewCount: 89,
    stock: 100,
    sku: 'GF-SHT-CTN-001',
    variants: {
      colors: [
        { name: 'أبيض', value: '#FFFFFF' },
        { name: 'أزرق فاتح', value: '#87CEEB' },
        { name: 'زهري', value: '#FFB6C1' },
        { name: 'رمادي', value: '#808080' },
      ],
      sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    },
    features: [
      'قطن مصري 100%',
      'مقاوم للتجعد',
      'تصميم كلاسيكي',
    ],
    specifications: {
      'المادة': '100% قطن مصري',
      'النمط': 'كلاسيكي',
      'الياقة': 'عادية',
      'الأكمام': 'طويلة',
      'العناية': 'غسيل آلي',
    },
    tags: ['خصم', 'الأكثر مبيعاً'],
    featured: true,
    isNew: false,
    createdAt: '2023-11-10',
  },
  {
    id: 4,
    name: 'فستان سهرة أنيق',
    slug: 'elegant-evening-dress',
    description: 'فستان سهرة نسائي مطرز بتصميم عصري',
    longDescription: `
      فستان سهرة أنيق بتصميم عصري وتطريز يدوي فاخر.
      قماش ساتان ناعم مع طبقة من التل.
      مناسب للحفلات والمناسبات الخاصة.
    `,
    images: [
      'https://images.unsplash.com/photo-1518611012118-696072aa579a?w=600&h=600&fit=crop&auto=format&q=70',
      'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=600&h=600&fit=crop&auto=format&q=70',
    ],
    price: 1299,
    salePrice: null,
    currency: 'AED',
    category: categories[2],
    vendor: vendors[1],
    rating: 4.9,
    reviewCount: 45,
    stock: 15,
    sku: 'GF-DRS-EVE-001',
    variants: {
      colors: [
        { name: 'أسود', value: '#000000' },
        { name: 'أحمر', value: '#DC143C' },
        { name: 'كحلي', value: '#000080' },
      ],
      sizes: ['S', 'M', 'L', 'XL'],
    },
    features: [
      'تطريز يدوي',
      'قماش ساتان',
      'تصميم عصري',
    ],
    specifications: {
      'المادة': 'ساتان وتل',
      'الطول': 'طويل',
      'التطريز': 'يدوي',
      'المناسبة': 'سهرات وحفلات',
    },
    tags: ['جديد'],
    featured: true,
    isNew: true,
    createdAt: '2024-01-05',
  },
  {
    id: 5,
    name: 'طقم أواني طبخ سيراميك',
    slug: 'ceramic-cookware-set',
    description: 'طقم أواني طبخ من السيراميك الصحي - 10 قطع',
    longDescription: `
      طقم أواني طبخ فاخر من السيراميك الصحي غير اللاصق.
      يتضمن 10 قطع متنوعة لجميع احتياجات المطبخ.
      خالي من PFOA وآمن للاستخدام.
      مقابض مقاومة للحرارة.
    `,
    images: [
      'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=600&h=600&fit=crop&auto=format&q=70',
      'https://images.unsplash.com/photo-1590794056226-79ef3a8147e1?w=600&h=600&fit=crop&auto=format&q=70',
    ],
    price: 899,
    salePrice: 699,
    currency: 'AED',
    category: categories[3],
    vendor: vendors[2],
    rating: 4.7,
    reviewCount: 67,
    stock: 30,
    sku: 'HC-CKW-CRM-010',
    variants: {
      colors: [
        { name: 'رمادي', value: '#808080' },
        { name: 'أبيض', value: '#FFFFFF' },
        { name: 'أزرق', value: '#4169E1' },
      ],
    },
    features: [
      'سيراميك صحي',
      'غير لاصق',
      'خالي من PFOA',
      '10 قطع',
    ],
    specifications: {
      'المادة': 'سيراميك',
      'عدد القطع': '10',
      'غير لاصق': 'نعم',
      'آمن للفرن': 'حتى 260°C',
      'آمن لغسالة الأطباق': 'نعم',
    },
    tags: ['خصم', 'الأكثر مبيعاً'],
    featured: true,
    isNew: false,
    createdAt: '2023-10-15',
  },
  {
    id: 6,
    name: 'لابتوب MacBook Air M3',
    slug: 'macbook-air-m3',
    description: 'لابتوب MacBook Air مع شريحة M3 الجديدة',
    longDescription: `
      MacBook Air الجديد مع شريحة Apple M3.
      شاشة Liquid Retina بحجم 15 إنش.
      عمر بطارية يصل إلى 18 ساعة.
      تصميم نحيف وخفيف.
    `,
    images: [
      'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=600&h=600&fit=crop&auto=format&q=70',
      'https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?w=600&h=600&fit=crop&auto=format&q=70',
    ],
    price: 5999,
    salePrice: null,
    currency: 'AED',
    category: categories[0],
    vendor: vendors[0],
    rating: 4.9,
    reviewCount: 89,
    stock: 20,
    sku: 'APL-MBA-M3-15',
    variants: {
      colors: [
        { name: 'فضي', value: '#C0C0C0' },
        { name: 'رمادي فلكي', value: '#4A4A4A' },
        { name: 'ذهبي', value: '#FFD700' },
        { name: 'منتصف الليل', value: '#191970' },
      ],
      sizes: ['256GB', '512GB', '1TB'],
    },
    features: [
      'شريحة M3',
      'شاشة 15 إنش',
      'بطارية 18 ساعة',
      'خفيف الوزن',
    ],
    specifications: {
      'الشاشة': '15 إنش Liquid Retina',
      'المعالج': 'Apple M3',
      'الذاكرة': '8GB / 16GB / 24GB',
      'البطارية': 'حتى 18 ساعة',
      'الوزن': '1.51 كجم',
    },
    tags: ['جديد'],
    featured: true,
    isNew: true,
    createdAt: '2024-01-20',
  },
  {
    id: 7,
    name: 'عطر عود فاخر',
    slug: 'luxury-oud-perfume',
    description: 'عطر عود عربي أصيل بتركيبة فاخرة',
    longDescription: `
      عطر عود عربي أصيل من أجود أنواع العود الكمبودي.
      تركيبة فريدة تدوم طويلاً.
      عبوة فاخرة مناسبة للإهداء.
    `,
    images: [
      'https://images.unsplash.com/photo-1541643600914-78b084683601?w=600&h=600&fit=crop&auto=format&q=70',
      'https://images.unsplash.com/photo-1594035910387-fea47794261f?w=600&h=600&fit=crop&auto=format&q=70',
    ],
    price: 450,
    salePrice: null,
    currency: 'AED',
    category: categories[4],
    vendor: vendors[3],
    rating: 4.8,
    reviewCount: 156,
    stock: 40,
    sku: 'HF-PRF-OUD-001',
    variants: {
      sizes: ['50ml', '100ml'],
    },
    features: [
      'عود كمبودي',
      'يدوم طويلاً',
      'عبوة فاخرة',
    ],
    specifications: {
      'الحجم': '100ml',
      'التركيز': 'Eau de Parfum',
      'المكونات': 'عود، عنبر، مسك',
      'بلد المنشأ': 'الإمارات',
    },
    tags: ['الأكثر مبيعاً'],
    featured: false,
    isNew: false,
    createdAt: '2023-08-10',
  },
  {
    id: 8,
    name: 'ساعة ذكية Galaxy Watch 6',
    slug: 'galaxy-watch-6',
    description: 'ساعة سامسونج الذكية مع مستشعرات صحية متقدمة',
    longDescription: `
      Galaxy Watch 6 مع شاشة Super AMOLED.
      مستشعر BioActive لتتبع الصحة.
      تتبع النوم والتمارين.
      مقاومة للماء 5ATM.
    `,
    images: [
      'https://images.unsplash.com/photo-1579586337278-3befd40fd17a?w=600&h=600&fit=crop&auto=format&q=70',
      'https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?w=600&h=600&fit=crop&auto=format&q=70',
    ],
    price: 1399,
    salePrice: 1199,
    currency: 'AED',
    category: categories[0],
    vendor: vendors[0],
    rating: 4.6,
    reviewCount: 78,
    stock: 35,
    sku: 'SAM-GW6-44',
    variants: {
      colors: [
        { name: 'أسود', value: '#000000' },
        { name: 'فضي', value: '#C0C0C0' },
        { name: 'ذهبي وردي', value: '#E8C8C8' },
      ],
      sizes: ['40mm', '44mm'],
    },
    features: [
      'شاشة AMOLED',
      'مستشعر BioActive',
      'مقاوم للماء',
      'Wear OS',
    ],
    specifications: {
      'الشاشة': '1.5 إنش Super AMOLED',
      'نظام التشغيل': 'Wear OS',
      'مقاومة الماء': '5ATM + IP68',
      'البطارية': '425mAh',
      'الاتصال': 'Bluetooth, WiFi, NFC',
    },
    tags: ['خصم'],
    featured: false,
    isNew: false,
    createdAt: '2023-11-25',
  },
  // ======== منتجات جديدة من الصور المحلية ========
  {
    id: 101,
    name: 'طقم ملابس أطفال صيفي',
    slug: 'kids-summer-outfit-set',
    description: 'طقم ملابس أطفال مريح وعصري للصيف، قطن 100%',
    longDescription: `
      طقم ملابس أطفال صيفي مصنوع من القطن الطبيعي 100%.
      مريح وناعم على بشرة الأطفال.
      ألوان زاهية ثابتة لا تبهت مع الغسيل.
      مناسب للعب والنزهات الصيفية.
    `,
    images: [
      '/products/IMG-20260102-WA0009.jpg',
      '/products/IMG-20260102-WA0010.jpg',
    ],
    price: 149,
    salePrice: 99,
    currency: 'AED',
    category: categories[2], // أزياء نسائية (سنغيرها للأطفال)
    vendor: vendors[1],
    rating: 4.7,
    reviewCount: 45,
    stock: 80,
    sku: 'KIDS-SUM-001',
    variants: {
      colors: [
        { name: 'أزرق', value: '#4169E1' },
        { name: 'وردي', value: '#FF69B4' },
        { name: 'أخضر', value: '#32CD32' },
      ],
      sizes: ['2-3 سنوات', '4-5 سنوات', '6-7 سنوات', '8-9 سنوات'],
    },
    features: ['قطن 100%', 'مريح', 'ألوان ثابتة', 'سهل الغسيل'],
    tags: ['جديد', 'خصم'],
    featured: true,
    isNew: true,
    createdAt: '2026-01-02',
  },
  {
    id: 102,
    name: 'فستان سهرة أنيق',
    slug: 'elegant-evening-dress',
    description: 'فستان سهرة فاخر بتصميم عصري مناسب للمناسبات',
    longDescription: `
      فستان سهرة أنيق بتصميم راقٍ.
      قماش فاخر مع تطريز يدوي.
      مناسب للحفلات والمناسبات الخاصة.
      قصة تبرز جمال القوام.
    `,
    images: [
      '/products/IMG-20260102-WA0011.jpg',
      '/products/IMG-20260102-WA0012.jpg',
      '/products/IMG-20260102-WA0013.jpg',
    ],
    price: 899,
    salePrice: 649,
    currency: 'AED',
    category: categories[2],
    vendor: vendors[1],
    rating: 4.9,
    reviewCount: 78,
    stock: 25,
    sku: 'DRESS-EVE-001',
    variants: {
      colors: [
        { name: 'أسود', value: '#000000' },
        { name: 'أحمر', value: '#DC143C' },
        { name: 'ذهبي', value: '#FFD700' },
      ],
      sizes: ['S', 'M', 'L', 'XL'],
    },
    features: ['تطريز يدوي', 'قماش فاخر', 'تصميم حصري'],
    tags: ['فاخر', 'خصم'],
    featured: true,
    isNew: true,
    createdAt: '2026-01-02',
  },
  {
    id: 103,
    name: 'حقيبة يد جلدية فاخرة',
    slug: 'luxury-leather-handbag',
    description: 'حقيبة يد نسائية من الجلد الطبيعي بتصميم إيطالي',
    longDescription: `
      حقيبة يد فاخرة من الجلد الطبيعي 100%.
      تصميم إيطالي أنيق وعملي.
      جيوب داخلية متعددة للتنظيم.
      سحّاب معدني عالي الجودة.
    `,
    images: [
      '/products/IMG-20260102-WA0014.jpg',
      '/products/IMG-20260102-WA0015.jpg',
    ],
    price: 599,
    salePrice: null,
    currency: 'AED',
    category: categories[2],
    vendor: vendors[1],
    rating: 4.8,
    reviewCount: 92,
    stock: 40,
    sku: 'BAG-LTH-001',
    variants: {
      colors: [
        { name: 'بني', value: '#8B4513' },
        { name: 'أسود', value: '#000000' },
        { name: 'بيج', value: '#F5F5DC' },
      ],
    },
    features: ['جلد طبيعي', 'تصميم إيطالي', 'جيوب متعددة'],
    tags: ['فاخر'],
    featured: true,
    isNew: true,
    createdAt: '2026-01-02',
  },
  {
    id: 104,
    name: 'ساعة رجالية كلاسيكية',
    slug: 'classic-mens-watch',
    description: 'ساعة يد رجالية بتصميم كلاسيكي أنيق مع حزام جلدي',
    longDescription: `
      ساعة رجالية فاخرة بتصميم كلاسيكي خالد.
      آلية سويسرية دقيقة.
      حزام جلدي طبيعي مريح.
      مقاومة للماء حتى 50 متر.
    `,
    images: [
      '/products/IMG-20260102-WA0016.jpg',
      '/products/IMG-20260102-WA0017.jpg',
    ],
    price: 1299,
    salePrice: 999,
    currency: 'AED',
    category: categories[1],
    vendor: vendors[0],
    rating: 4.9,
    reviewCount: 156,
    stock: 30,
    sku: 'WATCH-CLS-001',
    variants: {
      colors: [
        { name: 'فضي/بني', value: '#C0C0C0' },
        { name: 'ذهبي/أسود', value: '#FFD700' },
      ],
    },
    features: ['آلية سويسرية', 'جلد طبيعي', 'مقاوم للماء'],
    tags: ['فاخر', 'خصم'],
    featured: true,
    isNew: true,
    createdAt: '2026-01-02',
  },
  {
    id: 105,
    name: 'نظارات شمسية ريبان',
    slug: 'rayban-sunglasses',
    description: 'نظارات شمسية أصلية بعدسات مستقطبة وحماية UV400',
    longDescription: `
      نظارات شمسية أصلية من ريبان.
      عدسات مستقطبة تقلل الوهج.
      حماية كاملة من الأشعة فوق البنفسجية UV400.
      إطار خفيف ومريح للاستخدام اليومي.
    `,
    images: [
      '/products/IMG-20260102-WA0018.jpg',
      '/products/IMG-20260102-WA0019.jpg',
    ],
    price: 799,
    salePrice: 599,
    currency: 'AED',
    category: categories[1],
    vendor: vendors[0],
    rating: 4.7,
    reviewCount: 203,
    stock: 60,
    sku: 'GLASS-RB-001',
    variants: {
      colors: [
        { name: 'أسود', value: '#000000' },
        { name: 'بني', value: '#8B4513' },
        { name: 'ذهبي', value: '#FFD700' },
      ],
    },
    features: ['عدسات مستقطبة', 'UV400', 'إطار خفيف'],
    tags: ['خصم'],
    featured: false,
    isNew: true,
    createdAt: '2026-01-02',
  },
  {
    id: 106,
    name: 'عطر عود فاخر',
    slug: 'luxury-oud-perfume',
    description: 'عطر عود عربي فاخر برائحة طويلة الأمد',
    longDescription: `
      عطر عود فاخر بتركيبة حصرية.
      مكونات طبيعية 100%.
      رائحة تدوم طوال اليوم.
      تصميم زجاجة فاخر.
    `,
    images: [
      '/products/IMG-20260102-WA0020.jpg',
      '/products/IMG-20260102-WA0021.jpg',
    ],
    price: 450,
    salePrice: null,
    currency: 'AED',
    category: categories[4], // جمال وعناية
    vendor: vendors[3],
    rating: 4.9,
    reviewCount: 312,
    stock: 45,
    sku: 'PERF-OUD-001',
    variants: {
      sizes: ['50ml', '100ml', '150ml'],
    },
    features: ['عود طبيعي', 'تركيز عالي', 'ثبات طويل'],
    tags: ['فاخر', 'الأكثر مبيعاً'],
    featured: true,
    isNew: true,
    createdAt: '2026-01-02',
  },
  {
    id: 107,
    name: 'طقم مجوهرات فضية',
    slug: 'silver-jewelry-set',
    description: 'طقم مجوهرات من الفضة الإيطالية مع أحجار كريمة',
    longDescription: `
      طقم مجوهرات أنيق من الفضة الإيطالية عيار 925.
      يشمل: قلادة، أقراط، وسوار.
      أحجار زركون لامعة.
      مناسب للإهداء والمناسبات.
    `,
    images: [
      '/products/IMG-20260102-WA0022.jpg',
      '/products/IMG-20260102-WA0023.jpg',
      '/products/IMG-20260102-WA0024.jpg',
    ],
    price: 699,
    salePrice: 499,
    currency: 'AED',
    category: categories[2],
    vendor: vendors[1],
    rating: 4.8,
    reviewCount: 87,
    stock: 35,
    sku: 'JWL-SLV-001',
    variants: {
      colors: [
        { name: 'فضي', value: '#C0C0C0' },
        { name: 'ذهبي وردي', value: '#B76E79' },
      ],
    },
    features: ['فضة 925', 'أحجار زركون', 'علبة هدايا'],
    tags: ['خصم', 'هدايا'],
    featured: true,
    isNew: true,
    createdAt: '2026-01-02',
  },
  {
    id: 108,
    name: 'حذاء رياضي نايك',
    slug: 'nike-sports-shoes',
    description: 'حذاء رياضي مريح للجري والتمارين اليومية',
    longDescription: `
      حذاء رياضي من نايك بتقنية Air Max.
      نعل مرن يمتص الصدمات.
      تهوية ممتازة للقدم.
      مناسب للجري والتمارين.
    `,
    images: [
      '/products/IMG-20260102-WA0025.jpg',
      '/products/IMG-20260102-WA0026.jpg',
    ],
    price: 549,
    salePrice: 399,
    currency: 'AED',
    category: categories[5], // رياضة
    vendor: vendors[0],
    rating: 4.6,
    reviewCount: 245,
    stock: 100,
    sku: 'SHOE-NK-001',
    variants: {
      colors: [
        { name: 'أسود/أبيض', value: '#000000' },
        { name: 'أزرق/رمادي', value: '#4169E1' },
        { name: 'أحمر/أسود', value: '#DC143C' },
      ],
      sizes: ['40', '41', '42', '43', '44', '45'],
    },
    features: ['Air Max', 'نعل مرن', 'تهوية عالية'],
    tags: ['خصم', 'رياضي'],
    featured: false,
    isNew: true,
    createdAt: '2026-01-02',
  },
  {
    id: 109,
    name: 'سماعة بلوتوث JBL',
    slug: 'jbl-bluetooth-speaker',
    description: 'سماعة بلوتوث محمولة بصوت قوي ومقاومة للماء',
    longDescription: `
      سماعة JBL بلوتوث لاسلكية.
      صوت ستيريو قوي وواضح.
      مقاومة للماء والغبار IP67.
      بطارية تدوم 12 ساعة.
    `,
    images: [
      '/products/IMG-20260102-WA0027.jpg',
      '/products/IMG-20260102-WA0028.jpg',
    ],
    price: 399,
    salePrice: 299,
    currency: 'AED',
    category: categories[0],
    vendor: vendors[0],
    rating: 4.7,
    reviewCount: 178,
    stock: 70,
    sku: 'SPK-JBL-001',
    variants: {
      colors: [
        { name: 'أسود', value: '#000000' },
        { name: 'أزرق', value: '#4169E1' },
        { name: 'أحمر', value: '#DC143C' },
        { name: 'أخضر', value: '#228B22' },
      ],
    },
    features: ['IP67', 'بلوتوث 5.1', 'بطارية 12 ساعة'],
    tags: ['خصم', 'الأكثر مبيعاً'],
    featured: true,
    isNew: true,
    createdAt: '2026-01-02',
  },
  {
    id: 110,
    name: 'كريم عناية بالبشرة',
    slug: 'skincare-cream-set',
    description: 'مجموعة كريمات عناية بالبشرة طبيعية 100%',
    longDescription: `
      مجموعة كريمات عناية بالبشرة.
      مكونات طبيعية وعضوية.
      مناسب لجميع أنواع البشرة.
      يشمل: كريم نهاري، ليلي، وسيروم.
    `,
    images: [
      '/products/IMG-20260102-WA0029.jpg',
      '/products/IMG-20260102-WA0032.jpg',
    ],
    price: 299,
    salePrice: 229,
    currency: 'AED',
    category: categories[4],
    vendor: vendors[3],
    rating: 4.8,
    reviewCount: 156,
    stock: 55,
    sku: 'SKIN-CRM-001',
    features: ['طبيعي 100%', 'لجميع البشرات', 'خالي من البارابين'],
    tags: ['خصم', 'طبيعي'],
    featured: false,
    isNew: true,
    createdAt: '2026-01-02',
  },
  {
    id: 111,
    name: 'قهوة عربية فاخرة',
    slug: 'premium-arabic-coffee',
    description: 'قهوة عربية بالهيل والزعفران من أجود الأنواع',
    longDescription: `
      قهوة عربية فاخرة محمصة بعناية.
      ممزوجة بالهيل والزعفران.
      حبوب 100% أرابيكا.
      تحميص متوسط للنكهة المثالية.
    `,
    images: [
      '/products/IMG-20260102-WA0033.jpg',
      '/products/IMG-20260102-WA0034.jpg',
    ],
    price: 89,
    salePrice: null,
    currency: 'AED',
    category: categories[3], // منزل ومطبخ
    vendor: vendors[2],
    rating: 4.9,
    reviewCount: 423,
    stock: 200,
    sku: 'COFFE-ARB-001',
    variants: {
      sizes: ['250g', '500g', '1kg'],
    },
    features: ['أرابيكا 100%', 'بالهيل والزعفران', 'تحميص طازج'],
    tags: ['الأكثر مبيعاً'],
    featured: true,
    isNew: true,
    createdAt: '2026-01-02',
  },
  {
    id: 112,
    name: 'طقم أواني طبخ',
    slug: 'cooking-pots-set',
    description: 'طقم أواني طبخ ستانلس ستيل عالي الجودة 10 قطع',
    longDescription: `
      طقم أواني طبخ من الستانلس ستيل.
      10 قطع متنوعة الأحجام.
      مقابض عازلة للحرارة.
      مناسب لجميع أنواع المواقد.
    `,
    images: [
      '/products/IMG-20260102-WA0035.jpg',
      '/products/IMG-20260102-WA0036.jpg',
    ],
    price: 599,
    salePrice: 449,
    currency: 'AED',
    category: categories[3],
    vendor: vendors[2],
    rating: 4.6,
    reviewCount: 89,
    stock: 40,
    sku: 'COOK-SET-001',
    features: ['ستانلس ستيل', '10 قطع', 'مقابض عازلة'],
    tags: ['خصم'],
    featured: false,
    isNew: true,
    createdAt: '2026-01-02',
  },
  {
    id: 113,
    name: 'لعبة تعليمية للأطفال',
    slug: 'educational-kids-toy',
    description: 'لعبة تعليمية تفاعلية لتنمية مهارات الأطفال',
    longDescription: `
      لعبة تعليمية تفاعلية.
      تنمي المهارات الحركية والذهنية.
      آمنة ومصنوعة من مواد غير سامة.
      مناسبة للأعمار 3-8 سنوات.
    `,
    images: [
      '/products/IMG-20260102-WA0037.jpg',
      '/products/IMG-20260102-WA0038.jpg',
    ],
    price: 149,
    salePrice: 99,
    currency: 'AED',
    category: categories[7], // ألعاب
    vendor: vendors[2],
    rating: 4.7,
    reviewCount: 134,
    stock: 85,
    sku: 'TOY-EDU-001',
    features: ['تعليمية', 'آمنة', 'تفاعلية'],
    tags: ['خصم', 'أطفال'],
    featured: true,
    isNew: true,
    createdAt: '2026-01-02',
  },
  {
    id: 114,
    name: 'كتاب تطوير الذات',
    slug: 'self-development-book',
    description: 'كتاب ملهم لتطوير الذات وتحقيق النجاح',
    longDescription: `
      كتاب تطوير ذات من أكثر الكتب مبيعاً.
      نصائح عملية للنجاح.
      قصص ملهمة حقيقية.
      ترجمة احترافية.
    `,
    images: [
      '/products/IMG-20260102-WA0039.jpg',
      '/products/IMG-20260102-WA0040.jpg',
    ],
    price: 79,
    salePrice: null,
    currency: 'AED',
    category: categories[6], // كتب
    vendor: vendors[2],
    rating: 4.8,
    reviewCount: 267,
    stock: 150,
    sku: 'BOOK-DEV-001',
    features: ['أكثر مبيعاً', 'ترجمة احترافية'],
    tags: ['الأكثر مبيعاً'],
    featured: false,
    isNew: true,
    createdAt: '2026-01-02',
  },
  {
    id: 115,
    name: 'جهاز تمارين منزلي',
    slug: 'home-fitness-equipment',
    description: 'جهاز تمارين منزلي متعدد الوظائف للياقة البدنية',
    longDescription: `
      جهاز تمارين منزلي شامل.
      يشمل تمارين الصدر، الظهر، الأرجل.
      سهل التركيب والاستخدام.
      مصنوع من الفولاذ المقوى.
    `,
    images: [
      '/products/IMG-20260102-WA0041.jpg',
      '/products/IMG-20260102-WA0042.jpg',
    ],
    price: 1499,
    salePrice: 1199,
    currency: 'AED',
    category: categories[5],
    vendor: vendors[0],
    rating: 4.5,
    reviewCount: 67,
    stock: 20,
    sku: 'FIT-EQP-001',
    features: ['متعدد الوظائف', 'فولاذ مقوى', 'سهل التركيب'],
    tags: ['خصم'],
    featured: false,
    isNew: true,
    createdAt: '2026-01-02',
  },
  {
    id: 116,
    name: 'شنطة سفر بعجلات',
    slug: 'travel-luggage-trolley',
    description: 'شنطة سفر بعجلات متينة وخفيفة الوزن',
    longDescription: `
      شنطة سفر بعجلات 360 درجة.
      خامة ABS متينة وخفيفة.
      قفل TSA معتمد.
      مقاسات متعددة.
    `,
    images: [
      '/products/IMG-20260102-WA0043.jpg',
      '/products/IMG-20260102-WA0044.jpg',
    ],
    price: 399,
    salePrice: 299,
    currency: 'AED',
    category: categories[3],
    vendor: vendors[1],
    rating: 4.6,
    reviewCount: 123,
    stock: 50,
    sku: 'BAG-TRV-001',
    variants: {
      colors: [
        { name: 'أسود', value: '#000000' },
        { name: 'أزرق', value: '#4169E1' },
        { name: 'رمادي', value: '#808080' },
      ],
      sizes: ['صغير', 'متوسط', 'كبير'],
    },
    features: ['عجلات 360°', 'ABS متين', 'قفل TSA'],
    tags: ['خصم'],
    featured: false,
    isNew: true,
    createdAt: '2026-01-02',
  },
  {
    id: 117,
    name: 'مكياج كامل طقم',
    slug: 'complete-makeup-set',
    description: 'طقم مكياج كامل للمبتدئين والمحترفين',
    longDescription: `
      طقم مكياج شامل يحتوي على كل ما تحتاجينه.
      ألوان متنوعة تناسب جميع ألوان البشرة.
      منتجات عالية الجودة.
      حقيبة تنظيم عملية.
    `,
    images: [
      '/products/IMG-20260102-WA0045.jpg',
      '/products/IMG-20260102-WA0046.jpg',
      '/products/IMG-20260102-WA0047.jpg',
    ],
    price: 349,
    salePrice: 249,
    currency: 'AED',
    category: categories[4],
    vendor: vendors[3],
    rating: 4.7,
    reviewCount: 189,
    stock: 65,
    sku: 'MKP-SET-001',
    features: ['طقم كامل', 'ألوان متنوعة', 'حقيبة تنظيم'],
    tags: ['خصم', 'الأكثر مبيعاً'],
    featured: true,
    isNew: true,
    createdAt: '2026-01-02',
  },
  {
    id: 118,
    name: 'سجادة صلاة فاخرة',
    slug: 'premium-prayer-rug',
    description: 'سجادة صلاة فاخرة بنقوش إسلامية أنيقة',
    longDescription: `
      سجادة صلاة فاخرة بتصميم إسلامي.
      خامة ناعمة ومريحة.
      حجم مناسب للصلاة.
      ألوان متعددة.
    `,
    images: [
      '/products/IMG-20260102-WA0048.jpg',
      '/products/IMG-20260102-WA0049.jpg',
    ],
    price: 129,
    salePrice: null,
    currency: 'AED',
    category: categories[3],
    vendor: vendors[2],
    rating: 4.9,
    reviewCount: 345,
    stock: 200,
    sku: 'RUG-PRA-001',
    variants: {
      colors: [
        { name: 'أخضر', value: '#228B22' },
        { name: 'أزرق', value: '#4169E1' },
        { name: 'بني', value: '#8B4513' },
      ],
    },
    features: ['نقوش إسلامية', 'ناعمة', 'مريحة'],
    tags: ['الأكثر مبيعاً'],
    featured: true,
    isNew: true,
    createdAt: '2026-01-02',
  },
  {
    id: 119,
    name: 'طابعة ليزر HP',
    slug: 'hp-laser-printer',
    description: 'طابعة ليزر سريعة للمكاتب والمنازل',
    longDescription: `
      طابعة HP ليزر لاسلكية.
      طباعة سريعة حتى 30 صفحة/دقيقة.
      واي فاي وبلوتوث.
      اقتصادية في استهلاك الحبر.
    `,
    images: [
      '/products/IMG-20260102-WA0050.jpg',
      '/products/IMG-20260102-WA0051.jpg',
    ],
    price: 899,
    salePrice: 749,
    currency: 'AED',
    category: categories[0],
    vendor: vendors[0],
    rating: 4.5,
    reviewCount: 78,
    stock: 30,
    sku: 'PRINT-HP-001',
    features: ['واي فاي', '30 صفحة/دقيقة', 'اقتصادية'],
    tags: ['خصم'],
    featured: false,
    isNew: true,
    createdAt: '2026-01-02',
  },
  {
    id: 120,
    name: 'عباية مطرزة فاخرة',
    slug: 'embroidered-abaya',
    description: 'عباية نسائية مطرزة بتصميم عصري وأنيق',
    longDescription: `
      عباية فاخرة بتطريز يدوي.
      قماش كريب عالي الجودة.
      تصميم عصري يناسب جميع المناسبات.
      قصة مريحة وأنيقة.
    `,
    images: [
      '/products/IMG-20260102-WA0052.jpg',
      '/products/IMG-20260102-WA0053.jpg',
      '/products/IMG-20260102-WA0054.jpg',
    ],
    price: 599,
    salePrice: 449,
    currency: 'AED',
    category: categories[2],
    vendor: vendors[1],
    rating: 4.9,
    reviewCount: 234,
    stock: 45,
    sku: 'ABYA-EMB-001',
    variants: {
      colors: [
        { name: 'أسود', value: '#000000' },
        { name: 'كحلي', value: '#000080' },
        { name: 'بني غامق', value: '#3D2914' },
      ],
      sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    },
    features: ['تطريز يدوي', 'كريب فاخر', 'تصميم عصري'],
    tags: ['خصم', 'فاخر'],
    featured: true,
    isNew: true,
    createdAt: '2026-01-02',
  },

// Reviews
export const reviews = [
  {
    id: 1,
    productId: 1,
    user: {
      name: 'أحمد محمد',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop&auto=format&q=70',
    },
    rating: 5,
    title: 'أفضل هاتف استخدمته',
    comment: 'جودة الكاميرا مذهلة والأداء سريع جداً. التصميم الجديد بالتيتانيوم يعطي إحساس بالفخامة.',
    images: [
      'https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=300&h=225&fit=crop&auto=format&q=70',
    ],
    helpful: 45,
    verified: true,
    createdAt: '2024-01-20',
  },
  {
    id: 2,
    productId: 1,
    user: {
      name: 'سارة علي',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&h=80&fit=crop&auto=format&q=70',
    },
    rating: 4,
    title: 'ممتاز لكن السعر مرتفع',
    comment: 'هاتف رائع بكل المقاييس، الكاميرا والشاشة والبطارية كلها ممتازة. لكن السعر مرتفع نسبياً.',
    images: [],
    helpful: 23,
    verified: true,
    createdAt: '2024-01-18',
  },
  {
    id: 3,
    productId: 2,
    user: {
      name: 'خالد العمري',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=80&h=80&fit=crop&auto=format&q=70',
    },
    rating: 5,
    title: 'إلغاء الضوضاء مذهل',
    comment: 'أفضل سماعات استخدمتها، إلغاء الضوضاء قوي جداً وجودة الصوت ممتازة.',
    images: [],
    helpful: 67,
    verified: true,
    createdAt: '2024-01-15',
  },
  {
    id: 4,
    productId: 3,
    user: {
      name: 'فهد السالم',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=80&h=80&fit=crop&auto=format&q=70',
    },
    rating: 5,
    title: 'قماش ممتاز وتفصيل دقيق',
    comment: 'القميص بجودة عالية جداً، القماش ناعم ومريح والخياطة ممتازة. سأشتري ألوان أخرى.',
    images: [],
    helpful: 34,
    verified: true,
    createdAt: '2024-01-12',
  },
]

// Testimonials
export const testimonials = [
  {
    id: 1,
    name: 'عبدالله الراشد',
    role: 'عميل VIP',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop&auto=format&q=70',
    rating: 5,
    comment: 'تجربة تسوق ممتازة! المنتجات أصلية والتوصيل سريع. أنصح الجميع بالتسوق من هنا.',
    createdAt: '2024-01-15',
  },
  {
    id: 2,
    name: 'نورة الفهد',
    role: 'مصممة أزياء',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&h=80&fit=crop&auto=format&q=70',
    rating: 5,
    comment: 'أجد دائماً ما أبحث عنه هنا. تشكيلة واسعة وأسعار منافسة وخدمة عملاء متميزة.',
    createdAt: '2024-01-10',
  },
  {
    id: 3,
    name: 'محمد الدوسري',
    role: 'رائد أعمال',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=80&h=80&fit=crop&auto=format&q=70',
    rating: 5,
    comment: 'منصة موثوقة للتسوق. جربت عدة متاجر والتعامل معهم كان احترافي من البداية للنهاية.',
    createdAt: '2024-01-05',
  },
  {
    id: 4,
    name: 'هند العتيبي',
    role: 'مدونة',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=80&h=80&fit=crop&auto=format&q=70',
    rating: 5,
    comment: 'أحببت تنوع المنتجات خاصة المنتجات اليدوية. جودة عالية وأسعار معقولة.',
    createdAt: '2024-01-02',
  },
]

// Filters
export const filterOptions = {
  priceRanges: [
    { id: 'under-100', label: 'أقل من 100 د.إ', min: 0, max: 100 },
    { id: '100-500', label: '100 - 500 د.إ', min: 100, max: 500 },
    { id: '500-1000', label: '500 - 1000 د.إ', min: 500, max: 1000 },
    { id: '1000-5000', label: '1000 - 5000 د.إ', min: 1000, max: 5000 },
    { id: 'over-5000', label: 'أكثر من 5000 د.إ', min: 5000, max: Infinity },
  ],
  sortOptions: [
    { id: 'newest', label: 'الأحدث' },
    { id: 'popular', label: 'الأكثر شعبية' },
    { id: 'price-low', label: 'السعر: من الأقل للأعلى' },
    { id: 'price-high', label: 'السعر: من الأعلى للأقل' },
    { id: 'rating', label: 'التقييم' },
  ],
  colors: [
    { id: 'black', name: 'أسود', value: '#000000' },
    { id: 'white', name: 'أبيض', value: '#FFFFFF' },
    { id: 'red', name: 'أحمر', value: '#DC143C' },
    { id: 'blue', name: 'أزرق', value: '#4169E1' },
    { id: 'green', name: 'أخضر', value: '#228B22' },
    { id: 'gold', name: 'ذهبي', value: '#FFD700' },
  ],
}

// Navigation
export const mainNavigation = [
  { name: 'الرئيسية', href: '/' },
  { name: 'الأقسام', href: '/categories', hasDropdown: true },
  { name: 'المتاجر', href: '/vendors' },
  { name: 'العروض', href: '/deals' },
  { name: 'جديدنا', href: '/new-arrivals' },
]

// Footer Links
export const footerLinks = {
  company: [
    { name: 'من نحن', href: '/about' },
    { name: 'تواصل معنا', href: '/contact' },
    { name: 'المدونة', href: '/blog' },
    { name: 'الوظائف', href: '/careers' },
  ],
  support: [
    { name: 'مركز المساعدة', href: '/help' },
    { name: 'سياسة الإرجاع', href: '/returns' },
    { name: 'الشحن والتوصيل', href: '/shipping' },
    { name: 'الأسئلة الشائعة', href: '/faq' },
  ],
  vendors: [
    { name: 'سجل كتاجر', href: '/vendor/register' },
    { name: 'لوحة التحكم', href: '/vendor/dashboard' },
    { name: 'شروط التجار', href: '/vendor/terms' },
  ],
  legal: [
    { name: 'الشروط والأحكام', href: '/terms' },
    { name: 'سياسة الخصوصية', href: '/privacy' },
    { name: 'سياسة ملفات الارتباط', href: '/cookies' },
  ],
}

export default {
  heroSlides,
  categories,
  vendors,
  products,
  reviews,
  testimonials,
  filterOptions,
  mainNavigation,
  footerLinks,
}
