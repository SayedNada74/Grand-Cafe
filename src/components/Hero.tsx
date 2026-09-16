import React, { useState, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useCart } from '../context/CartContext';
import { cafeConfig } from '../config/cafeConfig';
import { Coffee, Calendar, ChevronDown, Sparkles, Star, Wind, Croissant, Plus, ArrowRight, ArrowLeft, Eye, ChevronLeft, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Magnetic } from './common/Magnetic';

interface HeroProps {
  onOpenBooking: () => void;
}

interface ShowcaseItem {
  id: string;
  nameAr: string;
  nameEn: string;
  categoryAr: string;
  categoryEn: string;
  price: number;
  image: string;
  badgeAr: string;
  badgeEn: string;
  descAr: string;
  descEn: string;
}

const showcaseItems: ShowcaseItem[] = [
  {
    id: 'ms3',
    nameAr: 'موهيتو بلو باشن',
    nameEn: 'Blue Passion Mojito',
    categoryAr: 'مشروب منعش',
    categoryEn: 'Signature Drink',
    price: 55,
    image: '/assets/blue_passion_mojito.jpg',
    badgeAr: 'الأكثر انتعاشاً',
    badgeEn: 'Summer Refresher',
    descAr: 'موهيتو باشن فروت أزرق بلمسة نعناع صيفي مثلج.',
    descEn: 'Vibrant blue passion fruit cooler with crushed ice & fresh mint.',
  },
  {
    id: 'cr4',
    nameAr: 'كرواسون ميكس تشيز',
    nameEn: 'Mix Cheese Croissant',
    categoryAr: 'مخبوزات فرنسية',
    categoryEn: 'Fresh Bakery',
    price: 90,
    image: '/assets/croissant_mix_cheese.jpeg',
    badgeAr: 'طازج من الفرن',
    badgeEn: 'Fresh Daily',
    descAr: 'كرواسون فرنسي هش بالزبدة الطبيعية ومحشو بتشكيلة جبن ذائبة.',
    descEn: 'Flaky artisanal butter croissant stuffed with rich melted cheese blend.',
  },
  {
    id: 'c8',
    nameAr: 'كافيه لاتيه ',
    nameEn: 'Caffè Latte',
    categoryAr: 'قهوة ساخنة',
    categoryEn: 'Hot Specialty',
    price: 45,
    image: '/assets/caffe_latte.jpg',
    badgeAr: 'مذاق البن الأصلي',
    badgeEn: 'Rich Espresso',
    descAr: 'إسبريسو غني محضر من أجود حبوب البن مع حليب مبخر كريمي.',
    descEn: 'Rich balanced espresso topped with velvety steamed milk foam.',
  },
  {
    id: 'd2',
    nameAr: 'شوكليت كيك',
    nameEn: 'Chocolate Cake',
    categoryAr: 'حلويات فاخرة',
    categoryEn: 'Desserts',
    price: 60,
    image: '/assets/chocolate_cake.jpeg',
    badgeAr: 'شوكولاتة بلجيكية',
    badgeEn: 'Belgian Chocolate',
    descAr: 'كيك الشوكولاتة الغني بطبقات الجناش البلجيكي الفاخر.',
    descEn: 'Decadent multi-layer cake rich with Belgian chocolate ganache.',
  },
];

export const Hero: React.FC<HeroProps> = ({ onOpenBooking }) => {
  const { t, lang, isRtl } = useLanguage();
  const { addItem } = useCart();
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  // Auto-rotate showcase items every 4.5 seconds
  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      setActiveIndex(prev => (prev + 1) % showcaseItems.length);
    }, 4500);
    return () => clearInterval(interval);
  }, [isPaused]);

  const currentItem = showcaseItems[activeIndex];

  const handlePrev = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setActiveIndex(prev => (prev - 1 + showcaseItems.length) % showcaseItems.length);
  };

  const handleNext = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setActiveIndex(prev => (prev + 1) % showcaseItems.length);
  };

  const [touchStartX, setTouchStartX] = useState<number | null>(null);

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStartX(e.touches[0].clientX);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX === null) return;
    const touchEndX = e.changedTouches[0].clientX;
    const diff = touchStartX - touchEndX;
    if (Math.abs(diff) > 40) {
      if (diff > 0) {
        // Swiped towards left
        isRtl ? handlePrev() : handleNext();
      } else {
        // Swiped towards right
        isRtl ? handleNext() : handlePrev();
      }
    }
    setTouchStartX(null);
  };

  const getShowcaseFocal = (id: string) => {
    switch (id) {
      case 'd2': return 'object-[center_92%]'; // Focuses directly on the rich chocolate slice & walnuts
      case 'c8': return 'object-[center_60%]'; // Centers the coffee cup and latte art
      case 'ms3': return 'object-[center_72%]'; // Centers the blue mojito and mint
      case 'cr4': return 'object-[center_55%]'; // Centers the golden croissant and cheese
      default: return 'object-center';
    }
  };

  const getTargetSection = (id: string) => {
    if (id.startsWith('cr')) return '#bakery';
    return '#popular';
  };

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    addItem({
      id: currentItem.id,
      nameAr: currentItem.nameAr,
      nameEn: currentItem.nameEn,
      price: currentItem.price,
      image: currentItem.image,
    });
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center pt-28 sm:pt-32 pb-16 overflow-hidden bg-cafe-cream dark:bg-cafe-espresso transition-colors duration-300"
    >
      {/* Dynamic Background Ambiance Image (Responsive to Light/Dark mode) */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <img
          src={cafeConfig.assets.heroAmbiance}
          alt="Grand Cafe Ambiance"
          loading="eager"
          decoding="async"
          className="w-full h-full object-cover object-center scale-105 transition-opacity duration-700 opacity-20 dark:opacity-40"
        />
        {/* Light Mode Gradients: Warm Cream & Soft Amber */}
        <div className="absolute inset-0 bg-gradient-to-b from-cafe-cream/90 via-cafe-warm/80 to-cafe-cream dark:hidden" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-amber-100/60 via-transparent to-transparent dark:hidden" />

        {/* Dark Mode Gradients: Rich Espresso & Vignette */}
        <div className="hidden dark:block absolute inset-0 bg-gradient-to-b from-cafe-espresso/90 via-cafe-espresso/80 to-cafe-espresso" />
        <div className="hidden dark:block absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-transparent via-cafe-espresso/60 to-cafe-espresso" />
      </div>

      {/* Warm Ambient Floating Glows */}
      <div className="absolute top-1/4 -left-20 w-80 h-80 bg-cafe-gold/15 dark:bg-cafe-gold/10 rounded-full blur-3xl pointer-events-none animate-pulse duration-[8000ms]" />
      <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-cafe-amber/15 dark:bg-cafe-amber/10 rounded-full blur-3xl pointer-events-none animate-pulse duration-[10000ms]" />

      {/* Content Container */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">

          {/* Left Column: Humanized Typography & CTAs (7 cols) */}
          <div className="lg:col-span-7 flex flex-col items-center lg:items-start text-center lg:text-start">

            {/* Eyebrow Badge */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cafe-amber/15 border border-cafe-amber/30 backdrop-blur-md mb-5 shadow-sm"
            >
              <Sparkles className="w-4 h-4 text-cafe-gold" />
              <span className="text-xs font-extrabold tracking-wider text-cafe-amber dark:text-cafe-gold uppercase">
                {lang === 'ar' ? 'جراند كافيه • التل الكبير' : 'Grand Cafe • Tell El Kebir'}
              </span>
            </motion.div>

            {/* Main Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-3xl sm:text-5xl lg:text-6xl font-black text-cafe-espresso dark:text-cafe-cream tracking-tight leading-[1.3] sm:leading-[1.25] mb-5"
            >
              <span className="block mb-2">
                {lang === 'ar' ? 'قهوتك بمزاج،' : 'Crafted with Passion,'}
              </span>
              <span className="block bg-gradient-to-r from-amber-600 via-cafe-amber to-cafe-gold dark:from-cafe-gold dark:via-amber-300 dark:to-yellow-200 bg-clip-text text-transparent">
                {lang === 'ar' ? 'ولمّتك الحلوة كل يوم.' : 'Every Single Cup.'}
              </span>
            </motion.h1>

            {/* Subtitle Description */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="max-w-xl text-sm sm:text-base lg:text-lg text-cafe-espresso/80 dark:text-cafe-warm/90 leading-relaxed mb-7 font-medium"
            >
              {lang === 'ar'
                ? 'من أول فنجان قهوة الصبح بريحة البن المحمص، لحد قعدة روقان بالليل مع صحابك.. مخبوزات طازة من الفرن ومشروبات معمولة بحب عشان يومك يكمل صح.'
                : 'From your first morning cup of freshly roasted coffee to relaxing evening moments with friends. Flaky bakery, refreshing sips, and warm hospitality.'}
            </motion.p>

            {/* Feature Highlights Pills */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-wrap items-center justify-center lg:justify-start gap-2.5 mb-8"
            >
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-cafe-surface-light/80 dark:bg-cafe-dark/80 border border-cafe-gold/30 backdrop-blur-md text-xs font-bold text-cafe-gold shadow-sm">
                <Star className="w-3.5 h-3.5 fill-cafe-gold text-cafe-gold" />
                <span>{lang === 'ar' ? '★ 4.9 تقييم على جوجل' : '★ 4.9 Google Rating'}</span>
              </div>

              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-cafe-surface-light/80 dark:bg-cafe-dark/80 border border-cafe-amber/30 backdrop-blur-md text-xs font-bold text-cafe-espresso dark:text-cafe-cream shadow-sm">
                <Wind className="w-3.5 h-3.5 text-cafe-amber dark:text-cafe-gold" />
                <span>{lang === 'ar' ? 'صالة مكيفة + جاردن' : 'AC Indoor + Garden'}</span>
              </div>

              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-cafe-surface-light/80 dark:bg-cafe-dark/80 border border-cafe-amber/30 backdrop-blur-md text-xs font-bold text-cafe-espresso dark:text-cafe-cream shadow-sm">
                <Croissant className="w-3.5 h-3.5 text-cafe-amber dark:text-cafe-gold" />
                <span>{lang === 'ar' ? 'مخبوزات طازجة يومياً' : 'Fresh Daily Bakery'}</span>
              </div>
            </motion.div>

            {/* Dual Magnetic CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto"
            >
              <Magnetic strength={0.3} className="w-full sm:w-auto">
                <a
                  href="#menu"
                  className="group w-full sm:w-auto flex items-center justify-center gap-2.5 text-sm sm:text-base font-extrabold px-8 py-4 rounded-full bg-gold-gradient text-cafe-espresso shadow-gold-glow hover:-translate-y-0.5 active:scale-[0.98] transition-all duration-200"
                >
                  <Coffee className="w-5 h-5 text-cafe-espresso transition-transform duration-200 group-hover:rotate-6" />
                  <span>{t('hero.exploreMenu')}</span>
                </a>
              </Magnetic>

              <Magnetic strength={0.3} className="w-full sm:w-auto">
                <button
                  onClick={onOpenBooking}
                  className="group w-full sm:w-auto flex items-center justify-center gap-2.5 text-sm sm:text-base font-extrabold px-8 py-4 rounded-full bg-cafe-surface-light dark:bg-white/10 hover:bg-cafe-warm dark:hover:bg-white/20 border border-cafe-amber/30 text-cafe-espresso dark:text-white hover:-translate-y-0.5 active:scale-[0.98] transition-all duration-200 shadow-sm"
                >
                  <Calendar className="w-5 h-5 text-cafe-amber dark:text-cafe-gold transition-transform duration-200 group-hover:scale-110" />
                  <span>{t('hero.reserveSpace')}</span>
                </button>
              </Magnetic>
            </motion.div>

          </div>

          {/* Right Column: Dynamic Interactive Showcase Card (5 cols) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="lg:col-span-5 flex flex-col items-center"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
          >
            {/* Ambient Card Backlight Glow on Hover */}
            <div className="relative w-full max-w-sm sm:max-w-md group">
              <div className="absolute -inset-1.5 rounded-[2rem] bg-gradient-to-r from-cafe-gold/30 via-cafe-amber/30 to-cafe-gold/30 opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-500 pointer-events-none -z-10" />

              {/* Main Showcase Card with Card-Level Hover Zoom & Lift */}
              <motion.div
                whileHover={{ y: -8, scale: 1.025 }}
                transition={{ type: 'spring', stiffness: 280, damping: 22 }}
                onClick={() => {
                  const target = document.querySelector(getTargetSection(currentItem.id));
                  if (target) target.scrollIntoView({ behavior: 'smooth' });
                }}
                className="relative w-full bg-cafe-surface-light dark:bg-cafe-surface-dark rounded-3xl p-4 sm:p-5 border border-cafe-amber/25 hover:border-cafe-gold/60 shadow-warm-lg hover:shadow-2xl hover:shadow-cafe-gold/25 dark:hover:shadow-cafe-gold/15 backdrop-blur-xl overflow-hidden cursor-pointer transition-colors duration-300"
              >

                {/* Product Image Stage with Interactive Zoom, Touch Swipe & Clear Navigation Arrows */}
                <div
                  onTouchStart={handleTouchStart}
                  onTouchEnd={handleTouchEnd}
                  className="group/img relative aspect-square sm:aspect-[4/4] w-full rounded-2xl overflow-hidden bg-cafe-warm dark:bg-cafe-card-dark mb-4 shadow-warm-md border border-cafe-amber/15 select-none"
                >
                  <AnimatePresence mode="wait">
                    <motion.img
                      key={currentItem.id}
                      src={currentItem.image}
                      alt={lang === 'ar' ? currentItem.nameAr : currentItem.nameEn}
                      initial={{ opacity: 0, scale: 1.05 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.96 }}
                      transition={{ duration: 0.4 }}
                      className={`w-full h-full object-cover ${getShowcaseFocal(currentItem.id)} group-hover/img:scale-110 transition-transform duration-700 ease-out pointer-events-none`}
                    />
                  </AnimatePresence>

                  {/* Subtle Hover Darkening Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-40 group-hover/img:opacity-60 transition-opacity duration-300 pointer-events-none" />

                  {/* Hover Eye Badge */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover/img:opacity-100 transition-opacity duration-300 pointer-events-none bg-black/25 backdrop-blur-[2px]">
                    <span className="px-4 py-2 rounded-full bg-cafe-espresso/90 text-cafe-gold border border-cafe-gold/40 text-xs font-bold shadow-xl flex items-center gap-2 transform translate-y-2 group-hover/img:translate-y-0 transition-transform duration-300">
                      <Eye className="w-4 h-4" />
                      <span>{lang === 'ar' ? 'عرض في المنيو' : 'Explore Item'}</span>
                    </span>
                  </div>

                  {/* Prominent Floating Navigation Arrows on Sides (Mobile & Desktop) */}
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      isRtl ? handleNext(e) : handlePrev(e);
                    }}
                    className="absolute left-2.5 top-1/2 -translate-y-1/2 w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-cafe-espresso/85 hover:bg-cafe-espresso text-cafe-gold border border-cafe-gold/40 shadow-xl backdrop-blur-md flex items-center justify-center hover:scale-110 active:scale-90 transition-all z-20 focus:outline-none"
                    aria-label={isRtl ? 'التالي' : 'Previous'}
                    title={isRtl ? 'التالي' : 'Previous'}
                  >
                    <ChevronLeft className="w-6 h-6 stroke-[2.5]" />
                  </button>

                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      isRtl ? handlePrev(e) : handleNext(e);
                    }}
                    className="absolute right-2.5 top-1/2 -translate-y-1/2 w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-cafe-espresso/85 hover:bg-cafe-espresso text-cafe-gold border border-cafe-gold/40 shadow-xl backdrop-blur-md flex items-center justify-center hover:scale-110 active:scale-90 transition-all z-20 focus:outline-none"
                    aria-label={isRtl ? 'السابق' : 'Next'}
                    title={isRtl ? 'السابق' : 'Next'}
                  >
                    <ChevronRight className="w-6 h-6 stroke-[2.5]" />
                  </button>

                  {/* Floating Category Badge */}
                  <div className={`absolute top-3 ${isRtl ? 'right-3' : 'left-3'} px-3 py-1 rounded-full bg-cafe-espresso/85 backdrop-blur-md border border-cafe-gold/30 text-xs font-bold text-cafe-gold shadow-md flex items-center gap-1 z-10 pointer-events-none`}>
                    <span>{lang === 'ar' ? currentItem.badgeAr : currentItem.badgeEn}</span>
                  </div>

                  {/* Slide Counter Badge */}
                  <div className={`absolute top-3 ${isRtl ? 'left-3' : 'right-3'} px-2.5 py-1 rounded-full bg-cafe-espresso/85 backdrop-blur-md border border-cafe-gold/30 text-[11px] font-mono font-bold text-cafe-gold shadow-md z-10 pointer-events-none`}>
                    {activeIndex + 1} / {showcaseItems.length}
                  </div>

                  {/* Price Tag Pill */}
                  <div className={`absolute bottom-3 ${isRtl ? 'right-3' : 'left-3'} px-3.5 py-1 rounded-full bg-gold-gradient text-cafe-espresso text-xs font-black shadow-lg z-10 font-mono pointer-events-none`}>
                    {currentItem.price} <span className="font-sans font-bold">{t('menu.currency')}</span>
                  </div>
                </div>

                {/* Product Details & Actions */}
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div>
                    <span className="text-[10px] font-extrabold uppercase tracking-wider text-cafe-amber block mb-0.5">
                      {lang === 'ar' ? currentItem.categoryAr : currentItem.categoryEn}
                    </span>
                    <h3 className="text-lg font-extrabold text-cafe-espresso dark:text-cafe-cream leading-tight">
                      {lang === 'ar' ? currentItem.nameAr : currentItem.nameEn}
                    </h3>
                    <p className="text-xs text-cafe-muted-light dark:text-cafe-muted-dark mt-1 line-clamp-2">
                      {lang === 'ar' ? currentItem.descAr : currentItem.descEn}
                    </p>
                  </div>

                  {/* Quick Add To Cart Button */}
                  <button
                    type="button"
                    onClick={handleAddToCart}
                    className="w-11 h-11 rounded-full bg-gold-gradient text-cafe-espresso flex items-center justify-center shadow-gold-glow hover:scale-110 active:scale-95 transition-all flex-shrink-0 z-10"
                    aria-label={t('cart.addToCart')}
                    title={t('cart.addToCart')}
                  >
                    <Plus className="w-5 h-5 stroke-[2.5]" />
                  </button>
                </div>

                {/* Showcase Navigation Indicators & Clickable Section Link */}
                <div className="pt-3 border-t border-cafe-amber/15 flex items-center justify-between gap-2">
                  {/* Spaced-Out Responsive Indicator Buttons */}
                  <div className="flex items-center gap-0.5 sm:gap-1.5">
                    {showcaseItems.map((item, idx) => (
                      <button
                        type="button"
                        key={item.id}
                        onClick={(e) => {
                          e.stopPropagation();
                          setActiveIndex(idx);
                        }}
                        className="p-1 sm:p-2 flex items-center justify-center focus:outline-none group/dot min-w-[26px] min-h-[26px] sm:min-w-[34px] sm:min-h-[34px] rounded-full hover:bg-cafe-amber/10 transition-colors"
                        aria-label={`Showcase item ${idx + 1}`}
                        title={lang === 'ar' ? item.nameAr : item.nameEn}
                      >
                        <span
                          className={`h-2 sm:h-2.5 rounded-full transition-all duration-300 ${
                            idx === activeIndex
                              ? 'w-5 sm:w-8 bg-cafe-gold shadow-md shadow-cafe-gold/50'
                              : 'w-2 sm:w-2.5 bg-cafe-amber/30 dark:bg-white/20 group-hover/dot:bg-cafe-amber/60 group-hover/dot:scale-125'
                          }`}
                        />
                      </button>
                    ))}
                  </div>

                  {/* Working Clickable Navigation Link with responsive text and perfect proportions */}
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      const target = document.querySelector(getTargetSection(currentItem.id));
                      if (target) target.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className="text-[11px] sm:text-xs font-extrabold text-cafe-amber dark:text-cafe-gold hover:text-cafe-gold transition-colors flex items-center gap-1.5 px-3 py-1.5 sm:px-3.5 sm:py-2 rounded-full bg-cafe-amber/10 hover:bg-cafe-amber/20 dark:bg-white/10 dark:hover:bg-white/20 border border-cafe-amber/25 dark:border-white/20 group/link cursor-pointer flex-shrink-0 whitespace-nowrap shadow-sm"
                  >
                    <span className="sm:hidden">{lang === 'ar' ? 'استكشف المزيد' : 'Explore More'}</span>
                    <span className="hidden sm:inline">{lang === 'ar' ? 'مشروبات ومخبوزات مميزة' : 'Signature Choices'}</span>
                    {isRtl ? (
                      <ArrowLeft className="w-3.5 h-3.5 transform group-hover/link:-translate-x-1 transition-transform" />
                    ) : (
                      <ArrowRight className="w-3.5 h-3.5 transform group-hover/link:translate-x-1 transition-transform" />
                    )}
                  </button>
                </div>

              </motion.div>
            </div>
          </motion.div>

        </div>
      </div>

      {/* Scroll Down Indicator */}
      <div className="absolute bottom-3 inset-x-0 flex justify-center z-10 pointer-events-none">
        <a
          href="#experience"
          className="p-1.5 rounded-full text-cafe-amber dark:text-cafe-gold hover:text-cafe-espresso dark:hover:text-white transition-colors animate-bounce pointer-events-auto"
          aria-label="Scroll down"
        >
          <ChevronDown className="w-5 h-5" />
        </a>
      </div>

    </section>
  );
};
