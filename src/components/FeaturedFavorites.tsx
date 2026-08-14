import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { getFeaturedDrinks, MenuItem } from '../data/menuData';
import { Sparkles, Star, ArrowUpRight, Coffee } from 'lucide-react';
import { ImageModal } from './ImageModal';

export const FeaturedFavorites: React.FC = () => {
  const { t, lang } = useLanguage();
  const featuredDrinks = getFeaturedDrinks();
  const [selectedItem, setSelectedItem] = useState<MenuItem | null>(null);

  // Helper to set ideal focal crop position for each drink photo
  const getFocalPosition = (id: string) => {
    switch (id) {
      case 'c8': return 'object-[center_80%]'; // Latte art cup in lower part
      case 'ic2': return 'object-[center_85%]'; // Iced mocha cup
      case 'ic1': return 'object-[center_90%]'; // Iced latte cup
      case 'ms3': return 'object-[center_75%]'; // Blue passion mojito cup & logo
      default: return 'object-center';
    }
  };

  return (
    <section className="py-20 bg-cafe-warm/30 dark:bg-cafe-dark border-y border-cafe-amber/15 relative overflow-hidden transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <span className="text-xs font-extrabold tracking-widest text-cafe-amber uppercase mb-2 block flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-cafe-gold" />
              {t('menu.featuredDrinksTitle')}
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-cafe-espresso dark:text-cafe-cream">
              {lang === 'ar' ? 'المشاريب الأكثر طلباً ومحبة عند زوارنا' : 'Top Signature Drinks'}
            </h2>
          </div>
          <a
            href="#menu"
            className="inline-flex items-center gap-2 text-xs font-bold text-cafe-amber hover:text-cafe-gold transition-colors"
          >
            <span>{t('hero.exploreMenu')}</span>
            <ArrowUpRight className="w-4 h-4" />
          </a>
        </div>

        {/* Featured Items Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredDrinks.map((item) => (
            <div
              key={item.id}
              className="group relative bg-cafe-surface-light dark:bg-cafe-surface-dark border border-cafe-amber/20 rounded-2xl p-5 shadow-warm-sm hover:shadow-warm-md transition-all duration-300 transform hover:-translate-y-1 flex flex-col justify-between"
            >
              <div>
                {/* Clean Image Frame: Aspect-Square 1:1 matching Instagram image box */}
                {item.image ? (
                  <div
                    onClick={() => setSelectedItem(item)}
                    className="relative aspect-[3/4] w-full rounded-xl overflow-hidden mb-5 border border-cafe-amber/15 shadow-warm-sm cursor-pointer"
                  >
                    <img
                      src={item.image}
                      alt={lang === 'ar' ? item.nameAr : item.nameEn}
                      className={`w-full h-full object-cover ${getFocalPosition(item.id)} group-hover:scale-105 transition-transform duration-500`}
                    />

                    {/* Signature Badge */}
                    <div className="absolute top-3 right-3 bg-cafe-espresso/80 backdrop-blur-md px-2.5 py-1 rounded-full text-[10px] font-bold text-cafe-gold flex items-center gap-1 border border-cafe-gold/30 shadow-md z-10">
                      <Star className="w-3 h-3 fill-cafe-gold text-cafe-gold" />
                      <span>SIGNATURE</span>
                    </div>
                  </div>
                ) : (
                  <div className="relative aspect-[3/4] w-full rounded-xl overflow-hidden mb-5 bg-cafe-warm/70 dark:bg-cafe-card-dark border border-dashed border-cafe-amber/30 flex flex-col items-center justify-center text-center p-4">
                    <div className="w-12 h-12 rounded-full bg-cafe-amber/15 text-cafe-amber flex items-center justify-center mb-2">
                      <Coffee className="w-6 h-6" />
                    </div>
                    <span className="text-xs font-bold text-cafe-amber">
                      {lang === 'ar' ? 'مشروب مميز في جراند' : 'Grand Special'}
                    </span>
                    <span className="text-[10px] text-cafe-muted-light dark:text-cafe-muted-dark mt-1">
                      {lang === 'ar' ? '(الصورة ستُضاف قريباً)' : '(Image coming soon)'}
                    </span>
                  </div>
                )}

                {/* Title & Price */}
                <div className="flex items-start justify-between gap-4 mb-2">
                  <h3 className="text-lg font-bold text-cafe-espresso dark:text-cafe-cream group-hover:text-cafe-amber transition-colors">
                    {lang === 'ar' ? item.nameAr : item.nameEn}
                  </h3>
                  <span className="text-base font-extrabold text-cafe-gold whitespace-nowrap bg-cafe-gold/10 px-3 py-1 rounded-full border border-cafe-gold/20">
                    {item.price} {t('menu.currency')}
                  </span>
                </div>

                {/* Subtitle / Description */}
                <p className="text-xs text-cafe-muted-light dark:text-cafe-muted-dark leading-relaxed mb-4">
                  {item.descriptionAr && lang === 'ar'
                    ? item.descriptionAr
                    : item.descriptionEn && lang === 'en'
                      ? item.descriptionEn
                      : (lang === 'ar' ? 'محضّر بأعلى معايير الجودة من أجود المكونات في جراند كافيه.' : 'Crafted with premium ingredients for an unforgettable taste.')}
                </p>
              </div>

              {/* Order Badge */}
              <div className="pt-3 border-t border-cafe-amber/15 flex items-center justify-between text-xs text-cafe-amber font-semibold">
                <span>☕ {lang === 'ar' ? 'جراند كافيه' : 'Grand Cafe'}</span>
                <span className="text-cafe-gold">★ 4.9</span>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Lightbox Popup Modal */}
      {selectedItem && (
        <ImageModal
          isOpen={!!selectedItem}
          onClose={() => setSelectedItem(null)}
          imageSrc={selectedItem.image || ''}
          titleAr={selectedItem.nameAr}
          titleEn={selectedItem.nameEn}
          price={selectedItem.price}
          badgeText="GRAND SIGNATURE DRINK"
          descriptionAr={selectedItem.descriptionAr}
          descriptionEn={selectedItem.descriptionEn}
        />
      )}
    </section>
  );
};
