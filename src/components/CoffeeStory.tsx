import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { cafeConfig } from '../config/cafeConfig';
import { Coffee, Flame, HeartHandshake } from 'lucide-react';

export const CoffeeStory: React.FC = () => {
  const { t } = useLanguage();

  return (
    <section className="py-24 bg-cafe-espresso text-white relative overflow-hidden">

      {/* Background Image Overlay with Dark Vignette */}
      <div className="absolute inset-0 z-0 opacity-20 mix-blend-overlay">
        <img
          src={cafeConfig.assets.coffeePassion}
          alt="Grand Cafe Coffee & Passion"
          className="w-full h-full object-cover"
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

          {/* Typography & Story Text */}
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cafe-gold/15 text-cafe-gold text-xs font-bold mb-6 border border-cafe-gold/30 uppercase tracking-widest">
              <Coffee className="w-3.5 h-3.5" />
              <span>COFFEE & PASSION</span>
            </div>

            <h2 className="text-4xl sm:text-6xl font-black tracking-tight leading-[1.35] sm:leading-[1.3] mb-8">
              <span className="block text-cafe-cream mb-2.5">{t('story.title1')}</span>
              <span className="block text-cafe-gold mb-2.5">{t('story.title2')}</span>
              <span className="block text-amber-200">{t('story.title3')}</span>
            </h2>

            <p className="text-base sm:text-lg text-cafe-warm/80 leading-[1.85] mb-8">
              {t('story.desc')}
            </p>

            <div className="grid grid-cols-2 gap-6 pt-6 border-t border-white/10">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-cafe-gold/20 flex items-center justify-center text-cafe-gold">
                  <Flame className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white">حبوب محصمصة بعناية</h4>
                  <span className="text-xs text-white/60">Freshly Roasted Beans</span>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-cafe-gold/20 flex items-center justify-center text-cafe-gold">
                  <HeartHandshake className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white">ضيافة دافئة</h4>
                  <span className="text-xs text-white/60">Warm Hospitality</span>
                </div>
              </div>
            </div>

          </div>

          {/* Aesthetic Card Visual: Image fills frame smoothly */}
          <div className="relative flex justify-center">
            <div className="relative w-full max-w-md aspect-[3/3] rounded-3xl overflow-hidden border-2 border-cafe-gold/30 shadow-warm-lg group">
              <img
                src={cafeConfig.assets.coffeePassion}
                alt="Grand Cafe Coffee & Passion"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-cafe-espresso/90 via-transparent to-transparent" />
              <div className="absolute bottom-4 left-4 right-4 text-center bg-cafe-espresso/80 backdrop-blur-sm py-1 rounded-full border border-cafe-gold/20">
                <span className="text-[10px] font-mono font-bold text-cafe-gold tracking-widest uppercase">
                  GRAND CAFE • SINCE 2014
                </span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
