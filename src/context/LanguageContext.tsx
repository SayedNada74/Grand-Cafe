import React, { createContext, useContext, useState, useEffect } from 'react';

export type Language = 'ar' | 'en';

interface LanguageContextType {
  lang: Language;
  setLang: (lang: Language) => void;
  toggleLang: () => void;
  t: (key: string) => string;
  isRtl: boolean;
}

const translations: Record<string, Record<Language, string>> = {
  // Navigation
  'nav.home': { ar: 'الرئيسية', en: 'Home' },
  'nav.experience': { ar: 'التجربة', en: 'Experience' },
  'nav.menu': { ar: 'المنيو', en: 'Menu' },
  'nav.spot': { ar: 'اختار قعدتك', en: 'Find Your Spot' },
  'nav.popular': { ar: 'الأكثر طلباً', en: 'Most Popular' },
  'nav.instagram': { ar: 'إنستغرام', en: 'Instagram' },
  'nav.reservation': { ar: 'الحجز والمناسبات', en: 'Reservations' },
  'nav.location': { ar: 'العنوان', en: 'Location' },
  'nav.originalMenu': { ar: 'المنيو الورقي', en: 'Original Menu' },
  'nav.bookBtn': { ar: 'احجز مكانك', en: 'Reserve Table' },

  // Hero
  'hero.eyebrow': { ar: 'قهوة • حلويات • قعدة رايقة', en: 'COFFEE • DESSERTS • GOOD MOMENTS' },
  'hero.titleLine1': { ar: 'قهوتك..', en: 'Your Coffee.' },
  'hero.titleLine2': { ar: 'قعدتك.. مكانك.', en: 'Your Place.' },
  'hero.subtitle': {
    ar: 'جراند كافيه مش مجرد مكان تشرب فيه قهوة، ده مكانك الخاص عشان تروّق، تشتغل، تذاكر، أو تقعد قعدة حلوة مع أصحابك في التل الكبير.',
    en: 'Grand Cafe is more than coffee. It is your ultimate space for relaxing, working remotely, studying, and special gatherings.'
  },
  'hero.exploreMenu': { ar: 'استكشف المنيو', en: 'Explore Menu' },
  'hero.reserveSpace': { ar: 'احجز طاولتك', en: 'Reserve Table' },
  'hero.estTag': { ar: 'تأسس عام 2014 • خبرة 10+ سنوات في الضيافة', en: 'EST. 2014 • 10+ Years of Passion' },

  // Experience ("More Than Coffee")
  'exp.badge': { ar: 'تجربة جراند كافيه', en: 'THE GRAND EXPERIENCE' },
  'exp.title': { ar: 'أكتر من مجرد قهوة.', en: 'More Than Coffee.' },
  'exp.subtitle': { ar: 'عملنا جراند كافيه عشان يكون مكانك المفضل لكل لحظة في يومك.', en: 'Designed to be your everyday home for every single moment.' },

  'exp.chill.title': { ar: 'قهوة ومزاج هادي', en: 'Coffee & Chill' },
  'exp.chill.desc': { ar: 'استمتع بأجود أنواع القهوة والمشاريب الباردة والساخنة اللي تظبط يومك.', en: 'Unwind with specialty hot brewed coffees and refreshing handcrafted mocktails.' },

  'exp.work.title': { ar: 'شغل ومذاكرة', en: 'Work & Study' },
  'exp.work.desc': { ar: 'صالة مكيفة وهادية، فيها إنترنت سريع وإضاءة مريحة تضمن لك أعلى تركيز.', en: 'Quiet air-conditioned ambient, fast Wi-Fi, and comfy seating to boost your productivity.' },

  'exp.gather.title': { ar: 'لقاءات وأصحاب', en: 'Meet & Gather' },
  'exp.gather.desc': { ar: 'قعدات جوه وبره متميزة بتشيل لِمّة الأصحاب وميتينج الشغل في أجواء دافية.', en: 'Spacious indoor and open-air seating for business meetings and friends hangouts.' },

  'exp.celebrate.title': { ar: 'حفلات ومناسبات', en: 'Celebrate Moments' },
  'exp.celebrate.desc': { ar: 'احجز عيد ميلادك أو تجمعك الخاص معانا، وإحنا هنظبط لك كل التفاصيل.', en: 'Book for birthdays, anniversaries, and private team gatherings with seamless setup.' },

  // Indoor / Outdoor Toggle
  'spot.badge': { ar: 'اختار قعدتك المفضلة', en: 'SEATING AMBIANCE' },
  'spot.title': { ar: 'اختار المكان اللي على مزاجك', en: 'Find Your Preferred Spot' },
  'spot.indoor': { ar: 'جلسة داخلية (Indoor)', en: 'Indoor Seating' },
  'spot.outdoor': { ar: 'جلسة خارجية (Outdoor)', en: 'Outdoor Terrace' },
  'spot.indoorTitle': { ar: 'قعدة داخلية رايقة ومكيفة', en: 'Quiet Air-Conditioned Sanctuary' },
  'spot.indoorDesc': { ar: 'قعدة جوه متقسّمة ومكيفة بالكامل بإضاءة مريحة للعين، مثالية للشغل والمذاكرة والميتينج المهم.', en: 'Fully air-conditioned, softly lit interior designed for deep focus, formal meetings, and pure relaxation.' },
  'spot.outdoorTitle': { ar: 'قعدة بره في الهواء الطلق', en: 'Open-Air Refreshing Atmosphere' },
  'spot.outdoorDesc': { ar: 'استمتع بنسيم الهواء الطلق وأجواء القعدة الخارجية الفرفوشة مع الأصحاب.', en: 'Enjoy the open breeze, outdoor vibe, and vibrant evening gatherings with your friends.' },
  'spot.acBadge': { ar: 'تكييف مركزي قوي', en: 'Full AC Climate Comfort' },
  'spot.quietBadge': { ar: 'أجواء هادئة وتركيز', en: 'Quiet & Focused Space' },
  'spot.breezeBadge': { ar: 'هواء طلق وجلسة خارجية', en: 'Fresh Open-Air Breeze' },

  // Menu
  'menu.badge': { ar: 'منيو جراند كافيه', en: 'DIGITAL MENU' },
  'menu.title': { ar: 'استكشف قائمة مشاريبنا وحلوياتنا', en: 'Explore Our Flavors & Delights' },
  'menu.subtitle': { ar: 'جميع الأسعار مطابقة للمنيو الرسمي داخل الكافيه', en: 'Directly sourced from our official physical menu' },
  'menu.searchPlaceholder': { ar: 'ابحث عن مشروبك أو الحلوى (مثل: آيس لاتيه، مولتن كيك)...', en: 'Search drink or dessert (e.g. Latte, Molten Cake)...' },
  'menu.all': { ar: 'الكل', en: 'All' },
  'menu.noResults': { ar: 'ملقيناش أصناف تطابق بحثك', en: 'No menu items match your search' },
  'menu.viewOriginal': { ar: 'عرض صورة المنيو الورقي الأصلي', en: 'View Original Physical Menu' },
  'menu.viewMore': { ar: 'عرض المزيد', en: 'View More' },
  'menu.showLess': { ar: 'عرض أقل', en: 'Show Less' },
  'menu.featuredDrinksTitle': { ar: 'المشاريب الأكثر طلباً', en: 'Top Signature Drinks' },
  'menu.featuredDessertsTitle': { ar: 'الحلويات المميزة', en: 'Featured Signature Desserts' },
  'menu.currency': { ar: 'ج.م', en: 'EGP' },

  // Most Popular Drinks & Desserts
  'popular.badge': { ar: 'المشاريب والحلويات الأكثر طلباً', en: 'MOST POPULAR CHOICES' },
  'popular.title': { ar: 'المشاريب والحلويات الأكثر طلباً', en: 'Most Popular Drinks & Desserts' },
  'popular.subtitle': { ar: 'أكتر اختيارات بيحبها ويطلبها زوار جراند كافيه، معمولة بأعلى جودة وطعم يظبط مزاجك.', en: 'Our guests\' top-rated drinks and decadent artisanal desserts, crafted to perfection.' },

  // Bakery & Croissant
  'bakery.badge': { ar: 'مخبوزات جراند كافيه', en: 'FRESH BAKERY & CROISSANTS' },
  'bakery.title': { ar: 'كرواسون ومخبوزات طازجة يومياً', en: 'Freshly Baked Artisanal Croissants' },
  'bakery.subtitle': { ar: 'كرواسون فرنسي هش بالزبدة الطبيعية مع تشكيلة حشوات حلو وحادق تفتح النفس.', en: 'Golden flaky French butter croissants with delicious sweet and savory gourmet fillings.' },
  'bakery.addonNote': { ar: 'متاح إضافة دوريتوس وصوص شيدر وزيتون (الـ 3 مع بعض بـ 20 ج.م)', en: 'Add Doritos, Cheddar Sauce & Olives (all 3 together for 20 EGP)' },

  // Desserts Spotlight
  'dessert.badge': { ar: 'الحلويات المتميزة', en: 'ARTISANAL DESSERTS' },
  'dessert.title': { ar: 'حلويات طازجة تظبط يومك', en: 'Indulge Your Sweet Cravings' },
  'dessert.subtitle': { ar: 'تشكيلة طازجة ومميزة من المولتن كيك، الريد فليفت، الشوكليت كيك والوافل.', en: 'Freshly handcrafted molten cakes, chocolate slices, and crispy waffles.' },

  // Coffee Story
  'story.title1': { ar: 'قهوة مظبوطة.', en: 'GOOD COFFEE.' },
  'story.title2': { ar: 'مزاج عالي.', en: 'GOOD MOOD.' },
  'story.title3': { ar: 'لحظات حلوة.', en: 'GOOD MOMENTS.' },
  'story.desc': { ar: 'في جراند كافيه بنختار بن القهوة بعناية وبنحضره بحب عشان تحس بالطعم الأصلي في كل رشفة.', en: 'At Grand Cafe, we select premium coffee beans and brew each cup with passion so every sip counts.' },

  // Reservation / Events
  'res.badge': { ar: 'احجز مكانك أو مناسبتك', en: 'PRIVATE BOOKING & EVENTS' },
  'res.title': { ar: 'اعمل مناسبتك عندنا في جراند كافيه', en: 'Make It Yours.' },
  'res.subtitle': { ar: 'بتخطط لعيد ميلاد، تجمع خاص، أو حفلة؟ تواصل معانا مباشرة على الواتساب وإحنا هنظبط لك القعدة!', en: 'Planning a birthday, private gathering, or party? Chat with us on WhatsApp for custom arrangements.' },
  'res.eventType': { ar: 'نوع المناسبة', en: 'Event Type' },
  'res.typeBirthday': { ar: 'عيد ميلاد', en: 'Birthday Party' },
  'res.typeGathering': { ar: 'تجمع خاص', en: 'Private Gathering' },
  'res.typeParty': { ar: 'حفلة', en: 'Special Party' },
  'res.guests': { ar: 'عدد الأفراد المتوقع', en: 'Expected Guests' },
  'res.date': { ar: 'الموعد المحدد', en: 'Preferred Date' },
  'res.notes': { ar: 'أي تفاصيل أو طلبات خاصة (اختياري)', en: 'Additional Requests (Optional)' },
  'res.submitWhatsApp': { ar: 'إرسال طلب الحجز عبر الواتساب', en: 'Send Reservation via WhatsApp' },

  // Reviews
  'reviews.badge': { ar: 'آراء زوارنا الحقيقيين', en: 'REAL GUEST REVIEWS' },
  'reviews.title': { ar: 'ناس حبّت قعدة جراند كافيه', en: 'Loved By Our Guests' },

  // Instagram
  'insta.badge': { ar: 'صفحتنا على إنستجرام', en: 'INSTAGRAM COMMUNITY' },
  'insta.title': { ar: 'تابع جديدنا على إنستجرام', en: 'See What\'s Happening at Grand' },
  'insta.followBtn': { ar: 'متابعة @grand.cafe0', en: 'Follow @grand.cafe0' },

  // Location & Contact
  'loc.badge': { ar: 'المكان والعنوان', en: 'VISIT US' },
  'loc.title': { ar: 'ينورنا حضوركم في موقعنا', en: 'Come Find Us.' },
  'loc.addressTitle': { ar: 'العنوان بالتفصيل', en: 'Exact Address' },
  'loc.hoursTitle': { ar: 'مواعيد العمل', en: 'Opening Hours' },
  'loc.getDirections': { ar: 'فتح الخريطة واتباع الاتجاهات', en: 'Get Directions on Google Maps' },
  'loc.callUs': { ar: 'اتصل بينا على 01070313242', en: 'Call Us Now' },
  'loc.chatWhatsapp': { ar: 'تواصل عل الواتساب', en: 'Chat on WhatsApp' },

  // Footer
  'footer.brandStatement': { ar: 'جراند كافيه - مكانك المفضل لقهوتك، شغلك، وقعدتك الحلوة ومناسباتك منذ عام 2014.', en: 'Grand Cafe - Your ultimate destination for coffee, work, and memorable moments since 2014.' },
  'footer.quickLinks': { ar: 'روابط سريعة', en: 'Quick Links' },
  'footer.explore': { ar: 'استكشف الكافيه', en: 'Explore Grand Cafe' },
  'footer.menuAndOrders': { ar: 'المنيو والطلبات', en: 'Menu & Orders' },
  'footer.visitAndHours': { ar: 'الموقع وساعات العمل', en: 'Visit & Working Hours' },
  'footer.rights': { ar: 'جميع الحقوق محفوظة © 2026 جراند كافيه.', en: 'All Rights Reserved © 2026 Grand Cafe.' },

  // Cart
  'cart.title': { ar: 'سلة الطلبات', en: 'Your Cart' },
  'cart.empty': { ar: 'السلة فارغة', en: 'Your cart is empty' },
  'cart.emptyDesc': { ar: 'استكشف المنيو وأضف مشاريبك وحلوياتك المفضلة', en: 'Explore our menu and add your favorite drinks & desserts' },
  'cart.exploreMenu': { ar: 'استكشف المنيو', en: 'Explore Menu' },
  'cart.total': { ar: 'الإجمالي', en: 'Total' },
  'cart.clearCart': { ar: 'مسح السلة', en: 'Clear Cart' },
  'cart.clearConfirm': { ar: 'متأكد من المسح؟', en: 'Are you sure?' },
  'cart.checkout': { ar: 'إتمام الطلب', en: 'Checkout' },
  'cart.addToCart': { ar: 'أضف للطلب', en: 'Add to Cart' },
  'cart.removeItem': { ar: 'إزالة', en: 'Remove' },
  'cart.itemsCount': { ar: 'أصناف', en: 'items' },
  'cart.inCart': { ar: 'في السلة', en: 'in cart' },

  // Checkout
  'checkout.title': { ar: 'بيانات الطلب', en: 'Order Details' },
  'checkout.name': { ar: 'الاسم', en: 'Your Name' },
  'checkout.phone': { ar: 'رقم الموبايل', en: 'Phone Number' },
  'checkout.address': { ar: 'العنوان', en: 'Delivery Address' },
  'checkout.notes': { ar: 'ملاحظات إضافية (اختياري)', en: 'Additional Notes (Optional)' },
  'checkout.sendWhatsApp': { ar: 'إرسال الطلب عبر واتساب', en: 'Send Order via WhatsApp' },
  'checkout.orderSummary': { ar: 'ملخص الطلب', en: 'Order Summary' },
  'checkout.required': { ar: 'مطلوب', en: 'Required' },
  'checkout.invalidPhone': { ar: 'رقم موبايل غير صحيح', en: 'Invalid phone number' },
  'checkout.back': { ar: 'رجوع للسلة', en: 'Back to Cart' },
  'checkout.namePlaceholder': { ar: 'مثال: أحمد محمد', en: 'e.g. Ahmed Mohamed' },
  'checkout.phonePlaceholder': { ar: '01xxxxxxxxx', en: '01xxxxxxxxx' },
  'checkout.addressPlaceholder': { ar: 'العنوان بالتفصيل', en: 'Full delivery address' },
  'checkout.notesPlaceholder': { ar: 'مثال: القهوة سكر خفيف', en: 'e.g. Less sugar please' },

  // Add-ons
  'addons.title': { ar: 'إضافات اختيارية', en: 'Optional Add-ons' },
  'addons.banner': { ar: 'إضافات اختيارية: دوريتوس، صوص شيدر، زيتون (الـ 3 مع بعض بـ 20 ج.م)', en: 'Optional add-ons: Doritos, Cheddar Sauce, Olives (all 3 together for 20 EGP)' },
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [lang, setLangState] = useState<Language>('ar');

  const setLang = (newLang: Language) => {
    if (newLang === lang) return;
    
    // Add micro-transition class to prevent abrupt visual snap
    document.documentElement.classList.add('lang-switching');
    
    setTimeout(() => {
      setLangState(newLang);
      document.documentElement.dir = newLang === 'ar' ? 'rtl' : 'ltr';
      document.documentElement.lang = newLang;
      if (newLang === 'ar') {
        document.body.classList.remove('font-en');
        document.body.classList.add('font-ar');
      } else {
        document.body.classList.remove('font-ar');
        document.body.classList.add('font-en');
      }

      // Smoothly return to full opacity
      setTimeout(() => {
        document.documentElement.classList.remove('lang-switching');
      }, 60);
    }, 60);

    try {
      localStorage.setItem('grand_cafe_lang_v2', newLang);
    } catch (e) {}
  };

  const toggleLang = () => {
    setLang(lang === 'ar' ? 'en' : 'ar');
  };

  const t = (key: string): string => {
    if (translations[key] && translations[key][lang]) {
      return translations[key][lang];
    }
    return key;
  };

  useEffect(() => {
    try {
      const savedLang = localStorage.getItem('grand_cafe_lang_v2') as Language | null;
      if (savedLang === 'en' || savedLang === 'ar') {
        setLang(savedLang);
      } else {
        setLang('ar');
      }
    } catch (e) {
      setLang('ar');
    }
  }, []);

  return (
    <LanguageContext.Provider value={{ lang, setLang, toggleLang, t, isRtl: lang === 'ar' }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
