import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { cafeConfig } from '../config/cafeConfig';
import { Snowflake, BookOpen, Laptop, Wind, Users, Moon, Sparkles, CalendarCheck, Coffee } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Magnetic } from './common/Magnetic';

export const SpotToggle: React.FC = () => {
  const { t, lang } = useLanguage();
  const [spot, setSpot] = useState<'indoor' | 'outdoor'>('indoor');

  const indoorFeatures = [
    { icon: Snowflake, label: lang === 'ar' ? 'تكييف مركزي قوي' : 'Full AC Comfort' },
    { icon: BookOpen, label: lang === 'ar' ? 'أجواء هادئة ومثالية للتركيز' : 'Quiet & Focused Space' },
    { icon: Laptop, label: lang === 'ar' ? 'جلسة مريحة للمذاكرة والشغل' : 'Comfortable Workspace' },
    { icon: Sparkles, label: lang === 'ar' ? 'إضاءة دافئة مريحة للعين' : 'Warm Ambient Lighting' },
  ];

  const outdoorFeatures = [
    { icon: Wind, label: lang === 'ar' ? 'هواء طلق ونسيم عليل' : 'Fresh Open-Air Breeze' },
    { icon: Users, label: lang === 'ar' ? 'جلسة واسعة للأصحاب والعائلات' : 'Spacious Social Seating' },
    { icon: Moon, label: lang === 'ar' ? 'أجواء مسائية ممتعة في الجاردن' : 'Vibrant Evening Ambiance' },
    { icon: Coffee, label: lang === 'ar' ? 'إطلالة حيوية وجلسات خارجية' : 'Scenic Outdoor Seating' },
  ];

  return (
    <section id="spot" className="py-24 bg-cafe-cream dark:bg-cafe-espresso relative transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header with Scroll Reveal */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-12"
        >
          <span className="text-xs font-extrabold tracking-widest text-cafe-amber uppercase mb-2 block">
            {t('spot.badge')}
          </span>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-cafe-espresso dark:text-cafe-cream mb-6">
            {t('spot.title')}
          </h2>

          {/* Segmented Switch Interaction */}
          <div className="inline-flex p-1 sm:p-1.5 rounded-full bg-cafe-warm dark:bg-cafe-surface-dark border border-cafe-amber/30 shadow-inner max-w-full">
            <button
              onClick={() => setSpot('indoor')}
              className={`inline-flex items-center gap-1.5 sm:gap-2 px-4 sm:px-6 py-2 sm:py-2.5 rounded-full text-xs sm:text-sm font-bold transition-all duration-150 hover:-translate-y-0.5 active:scale-95 whitespace-nowrap ${
                spot === 'indoor'
                  ? 'bg-gold-gradient text-cafe-espresso shadow-md shadow-cafe-gold/20 font-extrabold'
                  : 'text-cafe-espresso/70 dark:text-cafe-cream/70 hover:text-cafe-amber dark:hover:text-white'
              }`}
            >
              <Snowflake className="w-3.5 h-3.5 sm:w-4 sm:h-4 transition-transform duration-200 group-hover:rotate-12" />
              <span>{t('spot.indoor')}</span>
            </button>
            <button
              onClick={() => setSpot('outdoor')}
              className={`inline-flex items-center gap-1.5 sm:gap-2 px-4 sm:px-6 py-2 sm:py-2.5 rounded-full text-xs sm:text-sm font-bold transition-all duration-150 hover:-translate-y-0.5 active:scale-95 whitespace-nowrap ${
                spot === 'outdoor'
                  ? 'bg-gold-gradient text-cafe-espresso shadow-md shadow-cafe-gold/20 font-extrabold'
                  : 'text-cafe-espresso/70 dark:text-cafe-cream/70 hover:text-cafe-amber dark:hover:text-white'
              }`}
            >
              <Wind className="w-3.5 h-3.5 sm:w-4 sm:h-4 transition-transform duration-200 group-hover:scale-110" />
              <span>{t('spot.outdoor')}</span>
            </button>
          </div>
        </motion.div>

        {/* Display Card Grid with Scroll Reveal */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.6 }}
          className="bg-cafe-surface-light dark:bg-cafe-surface-dark border border-cafe-amber/20 rounded-3xl p-6 sm:p-10 shadow-warm-lg transition-all duration-500 overflow-hidden"
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            
            {/* Visual Image Framing */}
            <div className="relative rounded-2xl overflow-hidden aspect-[4/3] border border-cafe-amber/20 shadow-warm-md group bg-cafe-warm dark:bg-cafe-card-dark">
              <AnimatePresence mode="wait">
                <motion.img
                  key={spot}
                  src={spot === 'indoor' ? cafeConfig.assets.indoorSeating : cafeConfig.assets.outdoorSeating}
                  alt={spot === 'indoor' ? 'Indoor Seating' : 'Outdoor Seating'}
                  initial={{ opacity: 0, scale: 1.05 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.4 }}
                  className="w-full h-full object-cover"
                />
              </AnimatePresence>
              <div className="absolute inset-0 bg-gradient-to-t from-cafe-espresso/80 via-transparent to-transparent pointer-events-none" />
              <div className="absolute top-4 right-4 bg-cafe-espresso/90 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold text-cafe-gold border border-cafe-gold/30 z-10 flex items-center gap-1.5">
                {spot === 'indoor' ? (
                  <>
                    <Snowflake className="w-3.5 h-3.5 text-cafe-gold" />
                    <span>{lang === 'ar' ? 'صالة مكيفة هادئة' : 'Indoor AC Zone'}</span>
                  </>
                ) : (
                  <>
                    <Wind className="w-3.5 h-3.5 text-cafe-gold" />
                    <span>{lang === 'ar' ? 'جاردن في الهواء الطلق' : 'Outdoor Garden'}</span>
                  </>
                )}
              </div>
            </div>

            {/* Information Details */}
            <div className="flex flex-col gap-6">
              <div>
                <h3 className="text-2xl sm:text-3xl font-bold text-cafe-espresso dark:text-cafe-cream mb-3">
                  {spot === 'indoor' ? t('spot.indoorTitle') : t('spot.outdoorTitle')}
                </h3>
                <p className="text-base text-cafe-muted-light dark:text-cafe-muted-dark leading-relaxed">
                  {spot === 'indoor' ? t('spot.indoorDesc') : t('spot.outdoorDesc')}
                </p>
              </div>

              {/* Feature Tags List */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-cafe-amber/15">
                {(spot === 'indoor' ? indoorFeatures : outdoorFeatures).map((feat, idx) => {
                  const IconComp = feat.icon;
                  return (
                    <div
                      key={idx}
                      className="flex items-center gap-3 p-3.5 rounded-2xl bg-cafe-warm/40 dark:bg-cafe-card-dark border border-cafe-amber/20 hover:border-cafe-gold/40 transition-all duration-200 hover:-translate-y-0.5 shadow-sm"
                    >
                      <div className="w-9 h-9 rounded-xl bg-cafe-amber/15 text-cafe-amber dark:text-cafe-gold flex items-center justify-center flex-shrink-0 transition-transform duration-200 group-hover:scale-105">
                        <IconComp className="w-4 h-4" />
                      </div>
                      <span className="text-xs sm:text-sm font-bold text-cafe-espresso dark:text-cafe-cream">
                        {feat.label}
                      </span>
                    </div>
                  );
                })}
              </div>

              {/* WhatsApp Spot Reservation CTA with Magnetic effect */}
              <div className="pt-4">
                <Magnetic strength={0.25}>
                  <a
                    href="#reservation"
                    className="inline-flex items-center gap-2 text-xs font-bold px-6 py-3 rounded-full bg-cafe-amber/15 text-cafe-amber border border-cafe-amber/30 hover:bg-cafe-amber hover:text-cafe-espresso transition-all duration-150 hover:-translate-y-0.5 active:scale-95 shadow-sm"
                  >
                    <CalendarCheck className="w-4 h-4" />
                    <span>{lang === 'ar' ? 'احجز قعدتك المفضلة الآن' : 'Reserve Your Preferred Spot'}</span>
                  </a>
                </Magnetic>
              </div>

            </div>

          </div>
        </motion.div>

      </div>
    </section>
  );
};
