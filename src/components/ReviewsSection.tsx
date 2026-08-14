import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { cafeConfig } from '../config/cafeConfig';
import { Star, Quote, CheckCircle2, ExternalLink } from 'lucide-react';

export const ReviewsSection: React.FC = () => {
  const { t, lang } = useLanguage();

  const reviews = [
    {
      id: 1,
      name: 'Ahmed Abouzaid',
      nameAr: 'أحمد أبو زيد',
      rating: 5,
      commentAr: 'كافيه جميل جداً وأجواء رايقة بالتل الكبير.',
      commentEn: 'Very beautiful cafe and cozy vibes in Tell El Kebir.',
      source: 'مُقيّم حقيقي على خرائط جوجل'
    },
    {
      id: 2,
      name: 'Ahmed Elghandour',
      nameAr: 'أحمد الغندور',
      rating: 5,
      commentAr: 'مكان جميل والخدمة ممتازة والقعدة مريحة.',
      commentEn: 'Beautiful place, excellent service, and comfortable seating.',
      source: 'مُقيّم حقيقي على خرائط جوجل'
    },
    {
      id: 3,
      name: 'محمود الحاوي',
      nameAr: 'محمود الحاوي',
      rating: 5,
      commentAr: 'كافيه كويس جداً وكما هو متوقع في الضيافة والجودة.',
      commentEn: 'Very good cafe, maintains high quality and great hospitality.',
      source: 'مُقيّم حقيقي على خرائط جوجل'
    }
  ];

  return (
    <section className="py-20 bg-cafe-cream dark:bg-cafe-espresso border-t border-cafe-amber/15">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 gap-4">
          <div>
            <span className="text-xs font-extrabold tracking-widest text-cafe-amber uppercase mb-2 block">
              {t('reviews.badge')}
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-cafe-espresso dark:text-cafe-cream mb-2">
              {t('reviews.title')}
            </h2>
            <div className="flex items-center gap-1.5 text-amber-400 mt-2">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-amber-400" />
              ))}
              <span className="text-xs font-mono font-bold text-cafe-espresso dark:text-cafe-cream mr-2">
                4.9 / 5.0 عبر خرائط جوجل (90+ تقييم)
              </span>
            </div>
          </div>

          <a
            href={cafeConfig.googleMapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-xs font-bold px-5 py-2.5 rounded-full bg-cafe-amber/15 text-cafe-amber border border-cafe-amber/30 hover:bg-cafe-amber hover:text-cafe-espresso transition-all"
          >
            <span>مشاهدة جميع التقييمات على خرائط جوجل</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>

        {/* Reviews Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {reviews.map((rev) => (
            <div
              key={rev.id}
              className="relative p-6 rounded-2xl bg-cafe-surface-light dark:bg-cafe-surface-dark border border-cafe-amber/20 shadow-warm-sm flex flex-col justify-between"
            >
              <Quote className="w-8 h-8 text-cafe-amber/20 absolute top-4 left-4" />

              <div>
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(rev.rating)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-cafe-gold text-cafe-gold" />
                  ))}
                </div>

                <p className="text-base text-cafe-espresso/90 dark:text-cafe-cream/90 leading-relaxed mb-6 font-medium italic">
                  "{lang === 'ar' ? rev.commentAr : rev.commentEn}"
                </p>
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-cafe-amber/15">
                <div>
                  <h4 className="text-sm font-bold text-cafe-espresso dark:text-cafe-cream">
                    {lang === 'ar' ? rev.nameAr : rev.name}
                  </h4>
                  <span className="text-[10px] text-cafe-amber font-semibold flex items-center gap-1 mt-0.5">
                    <CheckCircle2 className="w-3 h-3 text-emerald-500" />
                    <span>{rev.source}</span>
                  </span>
                </div>
                <span className="text-lg">⭐</span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
