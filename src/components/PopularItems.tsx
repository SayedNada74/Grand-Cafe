import React, { useState, useRef, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useCart } from '../context/CartContext';
import { getPopularItems, MenuItem } from '../data/menuData';
import { Sparkles, Star, ArrowUpRight, Coffee, ChevronLeft, ChevronRight, Plus, Minus } from 'lucide-react';
import { ImageModal } from './ImageModal';
import { ScrollReveal } from './common/ScrollReveal';

export const PopularItems: React.FC = () => {
  const { t, lang, isRtl } = useLanguage();
  const { addItem, updateQuantity, items: cartItems } = useCart();
  const popularItems = getPopularItems();
  const [selectedItem, setSelectedItem] = useState<MenuItem | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollStart, setCanScrollStart] = useState(false);
  const [canScrollEnd, setCanScrollEnd] = useState(true);
  const [activeIndex, setActiveIndex] = useState(0);

  const updateScrollState = () => {
    const el = scrollRef.current;
    if (!el) return;
    const { scrollLeft, scrollWidth, clientWidth } = el;
    const maxScroll = scrollWidth - clientWidth;
    if (maxScroll <= 0) {
      setCanScrollStart(false);
      setCanScrollEnd(false);
      return;
    }
    const absScroll = Math.abs(scrollLeft);
    setCanScrollStart(absScroll > 5);
    setCanScrollEnd(absScroll < maxScroll - 5);
    const firstChild = el.firstElementChild as HTMLElement | null;
    if (firstChild) {
      const cardWidth = firstChild.offsetWidth + 24;
      setActiveIndex(Math.min(Math.round(absScroll / cardWidth), popularItems.length - 1));
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
  }, [popularItems.length]);

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
    (el.children[i] as HTMLElement).scrollIntoView({
      behavior: 'smooth', block: 'nearest', inline: 'start',
    });
  };

  const getFocalPosition = (id: string) => {
    switch (id) {
      case 'c8': return 'object-[center_65%]';
      case 'ic1': return 'object-[center_90%]';
      case 'ms3': return 'object-[center_70%]';
      case 'd2': return 'object-[center_90%]';
      case 'd3': return 'object-[center_75%]';
      case 'd7': return 'object-[center_70%]';
      default: return 'object-center';
    }
  };

  const getQty = (itemId: string) => {
    const ci = cartItems.find(c => c.cartItemId === itemId);
    return ci ? ci.quantity : 0;
  };

  return (
    <section id="popular" className="py-20 bg-cafe-warm/30 dark:bg-cafe-dark border-y border-cafe-amber/15 relative overflow-hidden transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section Header */}
        <ScrollReveal direction="up">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
            <div>
              <span className="text-xs font-extrabold tracking-widest text-cafe-amber uppercase mb-2 flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-cafe-gold" />
                {t('popular.badge')}
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-cafe-espresso dark:text-cafe-cream">
                {t('popular.title')}
              </h2>
              <p className="text-sm text-cafe-muted-light dark:text-cafe-muted-dark mt-2 max-w-2xl">
                {t('popular.subtitle')}
              </p>
            </div>
            <div className="flex items-center gap-4">
              {/* Header Navigation Controls */}
              <div className="hidden sm:flex items-center gap-2">
                <button
                  onClick={() => scrollInDirection(false)}
                  disabled={!canScrollStart}
                  className={`w-9 h-9 rounded-full border border-cafe-amber/30 flex items-center justify-center transition-all ${canScrollStart
                    ? 'bg-cafe-surface-light dark:bg-cafe-surface-dark text-cafe-amber hover:bg-cafe-amber hover:text-white shadow-sm active:scale-95'
                    : 'opacity-40 cursor-not-allowed text-cafe-muted-light dark:text-cafe-muted-dark border-cafe-amber/15'
                    }`}
                  aria-label="Scroll backward"
                >
                  {isRtl ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
                </button>
                <button
                  onClick={() => scrollInDirection(true)}
                  disabled={!canScrollEnd}
                  className={`w-9 h-9 rounded-full border border-cafe-amber/30 flex items-center justify-center transition-all ${canScrollEnd
                    ? 'bg-cafe-surface-light dark:bg-cafe-surface-dark text-cafe-amber hover:bg-cafe-amber hover:text-white shadow-sm active:scale-95'
                    : 'opacity-40 cursor-not-allowed text-cafe-muted-light dark:text-cafe-muted-dark border-cafe-amber/15'
                    }`}
                  aria-label="Scroll forward"
                >
                  {isRtl ? <ChevronLeft className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
                </button>
              </div>

              <a href="#menu" className="inline-flex items-center gap-2 text-xs font-bold text-cafe-amber hover:text-cafe-gold transition-colors">
                <span>{t('hero.exploreMenu')}</span>
                <ArrowUpRight className="w-4 h-4" />
              </a>
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
              {popularItems.map((item) => {
                const qty = getQty(item.id);
                return (
                  <div
                    key={item.id}
                    className="flex-shrink-0 w-[80vw] sm:w-[320px] lg:w-[340px] snap-start group relative bg-cafe-surface-light dark:bg-cafe-surface-dark border border-cafe-amber/20 hover:border-cafe-amber/40 rounded-2xl p-5 shadow-warm-sm hover:shadow-warm-md transition-all duration-200 hover:-translate-y-1 active:scale-[0.99] flex flex-col justify-between"
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
                            <span>SIGNATURE</span>
                          </div>
                        </div>
                      ) : (
                        <div className="relative aspect-[3/4] w-full rounded-xl overflow-hidden mb-5 bg-cafe-warm/70 dark:bg-cafe-card-dark border border-dashed border-cafe-amber/30 flex flex-col items-center justify-center text-center p-4">
                          <div className="w-12 h-12 rounded-full bg-cafe-amber/15 text-cafe-amber flex items-center justify-center mb-2">
                            <Coffee className="w-6 h-6" />
                          </div>
                          <span className="text-xs font-bold text-cafe-amber">
                            {lang === 'ar' ? 'صنف مميز في جراند' : 'Grand Special'}
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
                            : (lang === 'ar' ? 'محضّر بأعلى معايير الجودة من أجود المكونات في جراند كافيه.' : 'Crafted with premium ingredients for an unforgettable taste.')}
                      </p>
                    </div>

                    {/* Footer with Cart Controls */}
                    <div className="pt-3 border-t border-cafe-amber/15 flex items-center justify-between">
                      <span className="inline-flex items-center gap-1.5 text-xs text-cafe-amber dark:text-cafe-gold font-semibold">
                        <Coffee className="w-3.5 h-3.5" />
                        <span>{lang === 'ar' ? 'جراند كافيه' : 'Grand Cafe'}</span>
                      </span>
                      {qty > 0 ? (
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => updateQuantity(item.id, qty - 1)}
                            className="w-7 h-7 rounded-full bg-cafe-amber/15 text-cafe-amber flex items-center justify-center hover:bg-cafe-amber hover:text-white transition-colors"
                            aria-label="Decrease quantity"
                          >
                            <Minus className="w-3.5 h-3.5" />
                          </button>
                          <span className="text-sm font-bold text-cafe-espresso dark:text-cafe-cream min-w-[20px] text-center">{qty}</span>
                          <button
                            onClick={() => addItem(item)}
                            className="w-7 h-7 rounded-full bg-cafe-amber text-white flex items-center justify-center hover:bg-cafe-gold transition-colors"
                            aria-label="Increase quantity"
                          >
                            <Plus className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      ) : (
                        <button
                          onClick={() => addItem(item)}
                          className="w-8 h-8 rounded-full bg-gold-gradient text-cafe-espresso flex items-center justify-center shadow-md hover:shadow-gold-glow transition-all transform hover:scale-105 active:scale-90"
                          aria-label={t('cart.addToCart')}
                        >
                          <Plus className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Dot Indicators */}
            <div className="flex justify-center gap-2 mt-6">
              {popularItems.map((_, i) => (
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
          badgeText="GRAND SIGNATURE"
          descriptionAr={selectedItem.descriptionAr}
          descriptionEn={selectedItem.descriptionEn}
        />
      )}
    </section>
  );
};
