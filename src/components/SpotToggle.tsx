import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { cafeConfig } from '../config/cafeConfig';
import { Snowflake, VolumeX, Laptop, Wind, Users, Moon, Sparkles, CheckCircle } from 'lucide-react';

export const SpotToggle: React.FC = () => {
  const { t } = useLanguage();
  const [spot, setSpot] = useState<'indoor' | 'outdoor'>('indoor');

  const indoorFeatures = [
    { icon: Snowflake, label: t('spot.acBadge') },
    { icon: VolumeX, label: t('spot.quietBadge') },
    { icon: Laptop, label: 'جلسة مريحة للمذاكرة والشغل' },
    { icon: Sparkles, label: 'إضاءة دافئة مريحة للعين' },
  ];

  const outdoorFeatures = [
    { icon: Wind, label: t('spot.breezeBadge') },
    { icon: Users, label: 'جلسة واسعة للأصحاب والعائلات' },
    { icon: Moon, label: 'أجواء مسائية ممتعة في الهواء المفتوح' },
    { icon: Sparkles, label: 'رؤية متميزة وإطلالة حيوية' },
  ];

  return (
    <section id="spot" className="py-24 bg-cafe-cream dark:bg-cafe-espresso relative transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-xs font-extrabold tracking-widest text-cafe-amber uppercase mb-2 block">
            {t('spot.badge')}
          </span>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-cafe-espresso dark:text-cafe-cream mb-6">
            {t('spot.title')}
          </h2>

          {/* Segmented Switch Interaction */}
          <div className="inline-flex p-1.5 rounded-full bg-cafe-warm dark:bg-cafe-surface-dark border border-cafe-amber/30 shadow-inner">
            <button
              onClick={() => setSpot('indoor')}
              className={`px-6 py-2.5 rounded-full text-sm font-bold transition-all duration-300 ${
                spot === 'indoor'
                  ? 'bg-gold-gradient text-cafe-espresso shadow-md'
                  : 'text-cafe-espresso/70 dark:text-cafe-cream/70 hover:text-cafe-amber'
              }`}
            >
              ❄️ {t('spot.indoor')}
            </button>
            <button
              onClick={() => setSpot('outdoor')}
              className={`px-6 py-2.5 rounded-full text-sm font-bold transition-all duration-300 ${
                spot === 'outdoor'
                  ? 'bg-gold-gradient text-cafe-espresso shadow-md'
                  : 'text-cafe-espresso/70 dark:text-cafe-cream/70 hover:text-cafe-amber'
              }`}
            >
              🌿 {t('spot.outdoor')}
            </button>
          </div>
        </div>

        {/* Display Card Grid */}
        <div className="bg-cafe-surface-light dark:bg-cafe-surface-dark border border-cafe-amber/20 rounded-3xl p-6 sm:p-10 shadow-warm-lg transition-all duration-500 overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            
            {/* Visual Image Framing: Full object-cover filling frame smoothly with rounded corners */}
            <div className="relative rounded-2xl overflow-hidden aspect-[4/3] border border-cafe-amber/20 shadow-warm-md group">
              <img
                src={spot === 'indoor' ? cafeConfig.assets.indoorSeating : cafeConfig.assets.outdoorSeating}
                alt={spot === 'indoor' ? 'Indoor Seating' : 'Outdoor Seating'}
                loading="lazy"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-cafe-espresso/80 via-transparent to-transparent" />
              <div className="absolute top-4 right-4 bg-cafe-espresso/90 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold text-cafe-gold border border-cafe-gold/30">
                {spot === 'indoor' ? 'Indoor Zone ❄️' : 'Outdoor Terrace 🌿'}
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
                      className="flex items-center gap-3 p-3 rounded-xl bg-cafe-warm/50 dark:bg-cafe-card-dark border border-cafe-amber/15"
                    >
                      <div className="w-8 h-8 rounded-lg bg-cafe-amber/15 text-cafe-amber flex items-center justify-center flex-shrink-0">
                        <IconComp className="w-4 h-4" />
                      </div>
                      <span className="text-xs sm:text-sm font-semibold text-cafe-espresso dark:text-cafe-cream">
                        {feat.label}
                      </span>
                    </div>
                  );
                })}
              </div>

              {/* WhatsApp Spot Reservation CTA */}
              <div className="pt-4">
                <a
                  href="#reservation"
                  className="inline-flex items-center gap-2 text-xs font-bold px-6 py-3 rounded-full bg-cafe-amber/15 text-cafe-amber border border-cafe-amber/30 hover:bg-cafe-amber hover:text-cafe-espresso transition-all"
                >
                  <CheckCircle className="w-4 h-4" />
                  <span>احجز قعدتك المفضلة دلوقتي</span>
                </a>
              </div>

            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
