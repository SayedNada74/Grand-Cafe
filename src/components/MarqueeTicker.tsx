import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { Coffee, Croissant, Snowflake, Trees, Wifi, CakeSlice, GlassWater, IceCream, MapPin } from 'lucide-react';

export const MarqueeTicker: React.FC = () => {
  const { lang, isRtl } = useLanguage();

  const items = lang === 'ar' ? [
    { text: 'بن قهوة فاخر ومحمص طازة', icon: Coffee },
    { text: 'مخبوزات فرنسية ساخنة من الفرن', icon: Croissant },
    { text: 'صالة مكيفة هادية ومجهزة للمذاكرة والعمل', icon: Snowflake },
    { text: 'جاردن خارجي ونسيم عليل', icon: Trees },
    { text: 'إنترنت فائق السرعة مجاني', icon: Wifi },
    { text: 'مولتن كيك وتشيز كيك بلجيكي', icon: CakeSlice },
    { text: 'موهيتو فريش وعصائر طبيعية منعشة', icon: GlassWater },
    { text: 'آيس كريم وميلك شيك مميز', icon: IceCream },
    { text: 'مكانك المفضل في التل الكبير - أمام السنترال', icon: MapPin },
  ] : [
    { text: 'Specialty Fresh Roasted Coffee', icon: Coffee },
    { text: 'French Bakery Fresh from the Oven', icon: Croissant },
    { text: 'Air Conditioned Workspace & Study Area', icon: Snowflake },
    { text: 'Open-Air Outdoor Garden', icon: Trees },
    { text: 'Free High-Speed Wi-Fi', icon: Wifi },
    { text: 'Molten Cake & Belgian Cheesecake', icon: CakeSlice },
    { text: 'Fresh Mojitos & Signature Drinks', icon: GlassWater },
    { text: 'Ice Cream & Creamy Milkshakes', icon: IceCream },
    { text: 'Tell El Kebir - In Front of Central', icon: MapPin },
  ];

  // Repeat items to ensure seamless infinite looping
  const repeatedItems = [...items, ...items, ...items];

  return (
    <div className="relative w-full overflow-hidden bg-cafe-warm/80 dark:bg-cafe-surface-dark border-y border-cafe-amber/20 py-3 select-none backdrop-blur-sm shadow-warm-sm transition-colors duration-300">
      {/* Edge Gradient Shadows for seamless fade */}
      <div className="absolute left-0 inset-y-0 w-12 sm:w-20 bg-gradient-to-r from-cafe-warm dark:from-cafe-surface-dark to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 inset-y-0 w-12 sm:w-20 bg-gradient-to-l from-cafe-warm dark:from-cafe-surface-dark to-transparent z-10 pointer-events-none" />

      {/* Marquee Track */}
      <div className={isRtl ? 'animate-marquee-rtl' : 'animate-marquee-ltr'}>
        {repeatedItems.map((item, index) => (
          <div
            key={index}
            className="inline-flex items-center gap-2.5 mx-5 sm:mx-7 text-xs sm:text-sm font-bold text-cafe-espresso dark:text-cafe-cream whitespace-nowrap group cursor-default"
          >
            <item.icon className="w-4 h-4 text-cafe-amber dark:text-cafe-gold group-hover:scale-110 transition-all duration-200 flex-shrink-0" />
            <span className="group-hover:text-cafe-amber transition-colors duration-200">
              {item.text}
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-cafe-gold/60 mx-1 sm:mx-2" />
          </div>
        ))}
      </div>
    </div>
  );
};
