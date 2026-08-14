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
  'nav.reservation': { ar: 'الحجز والمناسبات', en: 'Reservations' },
  'nav.location': { ar: 'المكان والعنوان', en: 'Location' },
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
  'spot.acBadge': { ar: 'تكييف قوي ❄️', en: 'Full AC Comfort ❄️' },
  'spot.quietBadge': { ar: 'هدوء وتركيز 🤫', en: 'Quiet Atmosphere 🤫' },
  'spot.breezeBadge': { ar: 'هواء طلق وجاردن ممتازة 🌿', en: 'Fresh Open Breeze 🌿' },

  // Menu
  'menu.badge': { ar: 'منيو جراند كافيه', en: 'DIGITAL MENU' },
  'menu.title': { ar: 'استكشف قائمة مشاريبنا وحلوياتنا', en: 'Explore Our Flavors & Delights' },
  'menu.subtitle': { ar: 'جميع الأسعار مطابقة للمنيو الرسمي داخل الكافيه', en: 'Directly sourced from our official physical menu' },
  'menu.searchPlaceholder': { ar: 'ابحث عن مشروبك أو الحلوى (مثل: آيس لاتيه، مولتن كيك)...', en: 'Search drink or dessert (e.g. Latte, Molten Cake)...' },
  'menu.all': { ar: 'الكل', en: 'All' },
  'menu.noResults': { ar: 'ملقينامش أصناف تطابق بحثك', en: 'No menu items match your search' },
  'menu.viewOriginal': { ar: 'عرض صورة المنيو الورقي الأصلي', en: 'View Original Physical Menu' },
  'menu.featuredDrinksTitle': { ar: 'المشاريب الأكثر طلباً', en: 'Top Signature Drinks' },
  'menu.featuredDessertsTitle': { ar: 'الحلويات المميزة', en: 'Featured Signature Desserts' },
  'menu.currency': { ar: 'ج.م', en: 'EGP' },

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
  'footer.rights': { ar: 'جميع الحقوق محفوظة © 2026 جراند كافيه.', en: 'All Rights Reserved © 2026 Grand Cafe.' }
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [lang, setLangState] = useState<Language>('ar');

  const setLang = (newLang: Language) => {
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
    setLang('ar');
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
