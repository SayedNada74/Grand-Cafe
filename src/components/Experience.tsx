import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { Coffee, Laptop, Users, PartyPopper } from 'lucide-react';
import { ScrollReveal } from './common/ScrollReveal';

export const Experience: React.FC = () => {
  const { lang } = useLanguage();

  const features = [
    {
      icon: Coffee,
      title: lang === 'ar' ? 'بن محمص مختص' : 'Specialty Coffee',
      subtitle: lang === 'ar' ? 'حبوب منتقاة ومحمصة بعناية' : 'Freshly roasted premium beans',
    },
    {
      icon: Laptop,
      title: lang === 'ar' ? 'تكييف وإنترنت سريع' : 'AC & Fast Wi-Fi',
      subtitle: lang === 'ar' ? 'جلسة هادئة للشغل والمذاكرة' : 'Quiet workspace & study zone',
    },
    {
      icon: Users,
      title: lang === 'ar' ? 'صالة مكيفة وجاردن' : 'Indoor & Garden',
      subtitle: lang === 'ar' ? 'قعدات متنوعة للمّة والصحاب' : 'Spaces for friends & family',
    },
    {
      icon: PartyPopper,
      title: lang === 'ar' ? 'مناسبات واحتفالات' : 'Events & Celebrations',
      subtitle: lang === 'ar' ? 'تنسيق خاص لأعياد الميلاد' : 'Special birthday setups',
    },
  ];

  return (
    <section id="experience" className="py-8 sm:py-12 bg-cafe-warm/30 dark:bg-cafe-dark border-b border-cafe-amber/15 relative overflow-hidden transition-colors duration-300">
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Compact 4-Pillar Feature Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 sm:gap-5">
          {features.map((item, index) => {
            const IconComponent = item.icon;
            return (
              <ScrollReveal key={index} direction="up" delay={index * 0.08}>
                <div className="group p-4 sm:p-5 rounded-2xl bg-cafe-surface-light dark:bg-cafe-surface-dark border border-cafe-amber/20 hover:border-cafe-gold shadow-warm-sm hover:shadow-warm-md transition-all duration-300 flex items-center gap-4">
                  
                  {/* Icon Box */}
                  <div className="w-11 h-11 rounded-xl bg-cafe-amber/15 dark:bg-white/10 border border-cafe-amber/25 text-cafe-amber dark:text-cafe-gold flex items-center justify-center flex-shrink-0 group-hover:scale-105 group-hover:bg-cafe-amber group-hover:text-white transition-all duration-300 shadow-sm">
                    <IconComponent className="w-5 h-5" />
                  </div>

                  {/* Text Details */}
                  <div className="min-w-0">
                    <h3 className="text-sm sm:text-base font-extrabold text-cafe-espresso dark:text-cafe-cream truncate">
                      {item.title}
                    </h3>
                    <p className="text-xs text-cafe-muted-light dark:text-cafe-warm/75 font-medium leading-snug mt-0.5 truncate">
                      {item.subtitle}
                    </p>
                  </div>

                </div>
              </ScrollReveal>
            );
          })}
        </div>

      </div>
    </section>
  );
};
