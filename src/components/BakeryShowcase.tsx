import React, { useState, useRef, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useCart } from '../context/CartContext';
import { getBakeryFeaturedItems, menuCategories, MenuItem } from '../data/menuData';
import { Croissant, Star, Sparkles, ChevronLeft, ChevronRight, Plus } from 'lucide-react';
import { ImageModal } from './ImageModal';
import { AddOnModal } from './cart/AddOnModal';
import { ScrollReveal } from './common/ScrollReveal';

export const BakeryShowcase: React.FC = () => {
  const { t, lang, isRtl } = useLanguage();
  const { getItemQuantityInCart } = useCart();
  const bakeryItems = getBakeryFeaturedItems();
  const [selectedItem, setSelectedItem] = useState<MenuItem | null>(null);
  const [addOnItem, setAddOnItem] = useState<MenuItem | null>(null);

  const croissantCategory = menuCategories.find(c => c.id === 'croissant');
  const addOns = croissantCategory?.addOns || [];

  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollStart, setCanScrollStart] = useState(false);
  const [canScrollEnd, setCanScrollEnd] = useState(true);
  const [activeIndex, setActiveIndex] = useState(0);

  const updateScrollState = () => {
    const el = scrollRef.current;
    if (!el) return;
    const { scrollLeft, scrollWidth, clientWidth } = el;
    const maxScroll = scrollWidth - clientWidth;
    if (maxScroll <= 0) { setCanScrollStart(false); setCanScrollEnd(false); return; }
    const absScroll = Math.abs(scrollLeft);
    setCanScrollStart(absScroll > 5);
    setCanScrollEnd(absScroll < maxScroll - 5);
    const firstChild = el.firstElementChild as HTMLElement | null;
    if (firstChild) {
      const cardWidth = firstChild.offsetWidth + 24;
      setActiveIndex(Math.min(Math.round(absScroll / cardWidth), bakeryItems.length - 1));
    }
  };

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    const handler = () => updateScrollState();
    el.addEventListener('scroll', handler, { passive: true });
    updateScrollState();
    const ro = new ResizeObserver(handler);
    ro.observe(el);
    return () => { el.removeEventListener('scroll', handler); ro.disconnect(); };
  }, [bakeryItems.length]);

  const scrollInDirection = (forward: boolean) => {
    const el = scrollRef.current;
    if (!el) return;
    const amount = 340;
    const direction = forward ? (isRtl ? -amount : amount) : (isRtl ? amount : -amount);
    el.scrollBy({ left: direction, behavior: 'smooth' });
  };

  const scrollToIndex = (i: number) => {
    const el = scrollRef.current;
    if (!el || !el.children[i]) return;
    (el.children[i] as HTMLElement).scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'start' });
  };

  const getFocalPosition = (id: string) => {
    switch (id) {
      case 'cr1': return 'object-[center_70%]';
      case 'cr2': return 'object-[center_55%]';
      case 'cr3': return 'object-[center_100%]';
      default: return 'object-center';
    }
  };

  return (
    <section id="bakery" className="py-24 bg-cafe-cream dark:bg-cafe-espresso relative transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section Header */}
        <ScrollReveal direction="up">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <span className="text-xs font-extrabold tracking-widest text-cafe-amber uppercase mb-2 flex items-center justify-center gap-1.5">
              <Croissant className="w-4 h-4 text-cafe-amber" />
              {t('bakery.badge')}
            </span>
            <h2 className="text-3xl sm:text-5xl font-extrabold text-cafe-espresso dark:text-cafe-cream mb-4">
              {t('bakery.title')}
            </h2>
            <p className="text-base text-cafe-muted-light dark:text-cafe-muted-dark max-w-xl mx-auto mb-6">
              {t('bakery.subtitle')}
            </p>
            <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-cafe-amber/15 border border-cafe-amber/30 text-xs font-bold text-cafe-amber shadow-sm">
              <Sparkles className="w-4 h-4 text-cafe-gold" />
              <span>{t('addons.banner')}</span>
            </div>
          </div>
        </ScrollReveal>

        {/* Horizontal Carousel */}
        <ScrollReveal direction="up" delay={0.15}>
          <div className="relative">
            {/* Backward Arrow (Desktop Floating) */}
            {canScrollStart && (
              <button
                onClick={() => scrollInDirection(false)}
                className={`absolute top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full bg-cafe-surface-light/95 dark:bg-cafe-surface-dark/95 backdrop-blur-md border border-cafe-amber/30 text-cafe-amber shadow-warm-lg hover:bg-cafe-amber hover:text-white hover:scale-110 active:scale-95 transition-all hidden sm:flex items-center justify-center ${isRtl ? '-right-3 lg:-right-5' : '-left-3 lg:-left-5'}`}
                aria-label="Scroll backward"
              >
                {isRtl ? <ChevronRight className="w-5 h-5" /> : <ChevronLeft className="w-5 h-5" />}
              </button>
            )}

            {/* Forward Arrow (Desktop Floating) */}
            {canScrollEnd && (
              <button
                onClick={() => scrollInDirection(true)}
                className={`absolute top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full bg-cafe-surface-light/95 dark:bg-cafe-surface-dark/95 backdrop-blur-md border border-cafe-amber/30 text-cafe-amber shadow-warm-lg hover:bg-cafe-amber hover:text-white hover:scale-110 active:scale-95 transition-all hidden sm:flex items-center justify-center ${isRtl ? '-left-3 lg:-left-5' : '-right-3 lg:-right-5'}`}
                aria-label="Scroll forward"
              >
                {isRtl ? <ChevronLeft className="w-5 h-5" /> : <ChevronRight className="w-5 h-5" />}
              </button>
            )}

          {/* Scrollable Container */}
          <div
            ref={scrollRef}
            className="flex gap-6 overflow-x-auto snap-x snap-mandatory no-scrollbar pb-4 -mx-4 px-4 sm:mx-0 sm:px-0"
          >
            {bakeryItems.map((item) => {
              const totalQty = getItemQuantityInCart(item.id);
              return (
                <div
                  key={item.id}
                  className="flex-shrink-0 w-[80vw] sm:w-[320px] lg:w-[340px] snap-start group relative bg-cafe-surface-light dark:bg-cafe-surface-dark border border-cafe-amber/20 rounded-2xl p-5 shadow-warm-sm hover:shadow-warm-md transition-all duration-300 flex flex-col justify-between"
                >
                  <div>
                    {/* Image */}
                    {item.image ? (
                      <div
                        onClick={() => setSelectedItem(item)}
                        className="relative aspect-[3/4] w-full rounded-xl overflow-hidden mb-5 border border-cafe-amber/15 shadow-warm-sm cursor-pointer"
                      >
                        <img
                          src={item.image}
                          alt={lang === 'ar' ? item.nameAr : item.nameEn}
                          loading="lazy"
                          className={`w-full h-full object-cover ${getFocalPosition(item.id)} group-hover:scale-105 transition-transform duration-500`}
                        />
                        <div className="absolute top-3 right-3 bg-cafe-espresso/80 backdrop-blur-md px-2.5 py-1 rounded-full text-[10px] font-bold text-cafe-gold flex items-center gap-1 border border-cafe-gold/30 shadow-md z-10">
                          <Star className="w-3 h-3 fill-cafe-gold text-cafe-gold" />
                          <span>FRESH BAKERY</span>
                        </div>
                      </div>
                    ) : (
                      <div className="relative aspect-[3/4] w-full rounded-xl overflow-hidden mb-5 bg-cafe-warm/70 dark:bg-cafe-card-dark border border-dashed border-cafe-amber/30 flex flex-col items-center justify-center text-center p-4">
                        <div className="w-12 h-12 rounded-full bg-cafe-amber/15 text-cafe-amber flex items-center justify-center mb-2">
                          <Croissant className="w-6 h-6" />
                        </div>
                        <span className="text-xs font-bold text-cafe-amber">
                          {lang === 'ar' ? 'كرواسون طازج' : 'Fresh Croissant'}
                        </span>
                      </div>
                    )}

                    {/* Title & Price */}
                    <div className="flex items-start justify-between gap-3 mb-2">
                      <h3 className="text-lg font-bold text-cafe-espresso dark:text-cafe-cream group-hover:text-cafe-amber transition-colors">
                        {lang === 'ar' ? item.nameAr : item.nameEn}
                      </h3>
                      <span className="text-base font-extrabold text-cafe-gold whitespace-nowrap bg-cafe-gold/10 px-3 py-1 rounded-full border border-cafe-gold/20">
                        {item.price} {t('menu.currency')}
                      </span>
                    </div>

                    {/* Description */}
                    <p className="text-xs text-cafe-muted-light dark:text-cafe-muted-dark leading-relaxed mb-4">
                      {item.descriptionAr && lang === 'ar'
                        ? item.descriptionAr
                        : item.descriptionEn && lang === 'en'
                          ? item.descriptionEn
                          : (lang === 'ar' ? 'كرواسون فرنسي طازج يومياً بأعلى معايير الجودة.' : 'Fresh French croissant prepared daily.')}
                    </p>
                  </div>

                  {/* Footer with Cart Controls */}
                  <div className="pt-3 border-t border-cafe-amber/15 flex items-center justify-between">
                    <span className="inline-flex items-center gap-1.5 text-xs text-cafe-amber dark:text-cafe-gold font-semibold">
                      <Croissant className="w-3.5 h-3.5" />
                      <span>{lang === 'ar' ? 'مخبوزات جراند' : 'Grand Bakery'}</span>
                    </span>
                    <div className="flex items-center gap-1.5">
                      {totalQty > 0 && (
                        <span className="text-[10px] font-bold text-cafe-amber bg-cafe-amber/10 px-1.5 py-0.5 rounded-full">
                          {totalQty}
                        </span>
                      )}
                      <button
                        onClick={() => setAddOnItem(item)}
                        className="w-8 h-8 rounded-full bg-gold-gradient text-cafe-espresso flex items-center justify-center shadow-md hover:shadow-gold-glow transition-all transform hover:scale-110 active:scale-95"
                        aria-label={t('cart.addToCart')}
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Dot Indicators */}
          <div className="flex justify-center gap-2 mt-6">
            {bakeryItems.map((_, i) => (
              <button
                key={i}
                onClick={() => scrollToIndex(i)}
                className={`h-2 rounded-full transition-all duration-300 ${i === activeIndex ? 'bg-cafe-amber w-6' : 'bg-cafe-amber/30 hover:bg-cafe-amber/50 w-2'
                  }`}
                aria-label={`Go to item ${i + 1}`}
              />
            ))}
          </div>
        </div>
      </ScrollReveal>
    </div>

      {/* Lightbox Modal */}
      {selectedItem && (
        <ImageModal
          isOpen={!!selectedItem}
          onClose={() => setSelectedItem(null)}
          imageSrc={selectedItem.image || ''}
          titleAr={selectedItem.nameAr}
          titleEn={selectedItem.nameEn}
          price={selectedItem.price}
          badgeText="GRAND FRESH BAKERY"
          descriptionAr={selectedItem.descriptionAr}
          descriptionEn={selectedItem.descriptionEn}
        />
      )}

      {/* Add-on Selection Modal */}
      {addOnItem && (
        <AddOnModal
          isOpen={!!addOnItem}
          onClose={() => setAddOnItem(null)}
          item={addOnItem}
          addOns={addOns}
        />
      )}
    </section>
  );
};
