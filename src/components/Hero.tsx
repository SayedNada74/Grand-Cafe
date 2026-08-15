import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { cafeConfig } from '../config/cafeConfig';
import { Coffee, Calendar, ChevronDown, Sparkles, ShieldCheck } from 'lucide-react';

interface HeroProps {
  onOpenBooking: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenBooking }) => {
  const { t, isRtl } = useLanguage();

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center pt-24 pb-16 overflow-hidden">

      {/* Background Image with Dark Vignette & Gradient */}
      <div className="absolute inset-0 z-0">
        <img
          src={cafeConfig.assets.heroAmbiance}
          alt="Grand Cafe Ambiance"
          className="w-full h-full object-cover object-center scale-105 animate-pulse duration-[10000ms]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-cafe-espresso via-cafe-espresso/80 to-cafe-espresso/65 dark:from-cafe-espresso dark:via-cafe-espresso/85 dark:to-cafe-espresso/70" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-transparent via-cafe-espresso/50 to-cafe-espresso" />
      </div>

      {/* Decorative Gold Glow Accent */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-cafe-gold/15 rounded-full blur-3xl pointer-events-none" />

      {/* Content Container */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col items-center">

        {/* Eyebrow Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cafe-amber/15 border border-cafe-amber/30 backdrop-blur-md mb-6 animate-fadeIn">
          <Sparkles className="w-4 h-4 text-cafe-gold animate-spin" style={{ animationDuration: '6s' }} />
          <span className="text-xs font-bold tracking-widest text-cafe-gold uppercase">
            {t('hero.eyebrow')}
          </span>
        </div>

        {/* Main Headline */}
        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold text-white tracking-tight leading-[1.35] sm:leading-[1.3] mb-8 drop-shadow-lg">
          <span className="block text-cafe-cream mb-3">{t('hero.titleLine1')}</span>
          <span className="block bg-gradient-to-r from-cafe-gold via-cafe-amber to-amber-200 bg-clip-text text-transparent">
            {t('hero.titleLine2')}
          </span>
        </h1>

        {/* Subtitle Description */}
        <p className="max-w-2xl text-base sm:text-xl text-cafe-warm/90 leading-[1.85] mb-10 font-medium">
          {t('hero.subtitle')}
        </p>

        {/* Dual Call To Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto mb-12">

          {/* Explore Menu CTA */}
          <a
            href="#menu"
            className="w-full sm:w-auto flex items-center justify-center gap-2.5 text-base font-extrabold px-8 py-4 rounded-full bg-gold-gradient text-cafe-espresso shadow-gold-glow hover:scale-105 active:scale-95 transition-all"
          >
            <Coffee className="w-5 h-5 text-cafe-espresso" />
            <span>{t('hero.exploreMenu')}</span>
          </a>

          {/* Reserve Table CTA */}
          <button
            onClick={onOpenBooking}
            className="w-full sm:w-auto flex items-center justify-center gap-2.5 text-base font-extrabold px-8 py-4 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 backdrop-blur-md text-white transition-all transform hover:scale-105"
          >
            <Calendar className="w-5 h-5 text-cafe-gold" />
            <span>{t('hero.reserveSpace')}</span>
          </button>
        </div>

        {/* EST 2014 & Location Badge */}
        <div className="flex flex-wrap items-center justify-center gap-6 pt-6 border-t border-white/10 text-xs text-cafe-warm/70 font-medium">
          <span className="flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-cafe-gold" />
            {t('hero.estTag')}
          </span>
          <span className="hidden sm:inline text-white/30">•</span>
          <span className="flex items-center gap-1">
            📍 {cafeConfig.location.city[isRtl ? 'ar' : 'en']}
          </span>
        </div>

      </div>

      {/* Scroll Down Indicator (100% Centered on All Screens & Viewports) */}
      <div className="absolute bottom-6 inset-x-0 flex justify-center z-10 pointer-events-none">
        <a
          href="#experience"
          className="p-1 rounded-full text-cafe-gold hover:text-white transition-colors animate-bounce pointer-events-auto"
          aria-label="Scroll down"
        >
          <ChevronDown className="w-6 h-6" />
        </a>
      </div>

    </section>
  );
};
