import React, { useState, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useTheme } from '../context/ThemeContext';
import { cafeConfig } from '../config/cafeConfig';
import {
  Sun,
  Moon,
  Globe,
  Menu as MenuIcon,
  X,
  Calendar,
  ShoppingBag,
  FileText,
  Home,
  Coffee,
  Flame,
  MapPin,
  Croissant,
  BookOpen,
  Star,
  Instagram,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import { useCart } from '../context/CartContext';
import { Magnetic } from './common/Magnetic';

interface NavbarProps {
  onOpenBooking: () => void;
  onOpenOriginalMenu: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenBooking, onOpenOriginalMenu }) => {
  const { t, lang, toggleLang } = useLanguage();
  const { toggleTheme, isDark } = useTheme();
  const { totalItems, setCartOpen } = useCart();
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');

  useEffect(() => {
    const sectionIds = ['hero', 'spot', 'popular', 'menu', 'instagram', 'location'];

    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        const progress = (window.scrollY / totalHeight) * 100;
        setScrollProgress(Math.min(100, Math.max(0, progress)));
      }
      setIsScrolled(window.scrollY > 25);

      // Scrollspy detection
      if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 60) {
        setActiveSection('location');
      } else {
        let current = 'hero';
        for (const id of sectionIds) {
          const el = document.getElementById(id);
          if (el && el.offsetTop - 220 <= window.scrollY) {
            current = id;
          }
        }
        setActiveSection(current);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const startNavLinks = [
    { href: '#hero', id: 'hero', label: t('nav.home') },
    { href: '#spot', id: 'spot', label: t('nav.spot') },
    { href: '#popular', id: 'popular', label: t('nav.popular') },
  ];

  const endNavLinks = [
    { href: '#menu', id: 'menu', label: t('nav.menu') },
    { href: '#instagram', id: 'instagram', label: t('nav.instagram') },
    { href: '#location', id: 'location', label: t('nav.location') },
  ];

  return (
    <>
      {/* Scroll Progress Bar at very top */}
      <div className="fixed top-0 left-0 right-0 h-[3px] z-[70] pointer-events-none bg-transparent">
        <div
          className="h-full bg-gradient-to-r from-amber-500 via-cafe-gold to-yellow-300 shadow-[0_0_12px_rgba(212,175,55,0.85)] transition-all duration-100 ease-out"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      {/* Floating Pill Header */}
      <header className="fixed top-3 sm:top-5 inset-x-0 mx-auto z-50 px-3 sm:px-4 max-w-7xl pointer-events-none transition-all duration-300">
        <div
          className={`pointer-events-auto rounded-full transition-all duration-300 ${isScrolled
              ? 'bg-cafe-cream/85 dark:bg-cafe-espresso/85 backdrop-blur-xl border border-cafe-amber/30 shadow-warm-lg py-2 px-4 sm:px-6'
              : 'bg-cafe-cream/75 dark:bg-cafe-espresso/75 backdrop-blur-lg border border-cafe-amber/25 shadow-warm-sm py-2 px-4 sm:px-6'
            }`}
        >
          {/* Mobile Header View: Clean, Balanced & Airy */}
          <div className="flex lg:hidden items-center justify-between gap-3">
            {/* Mobile Logo Brand */}
            <a
              href="#hero"
              className="flex items-center gap-2.5 group flex-shrink-0"
              title="Grand Cafe"
            >
              <div className="relative w-10 h-10 rounded-full p-0.5 border-2 border-cafe-gold/70 group-hover:border-cafe-gold shadow-gold-glow bg-cafe-cream dark:bg-cafe-espresso flex items-center justify-center overflow-hidden">
                <img
                  src={cafeConfig.assets.logo}
                  alt={cafeConfig.name.en}
                  className="w-full h-full object-cover rounded-full"
                />
              </div>
              <div className="flex flex-col">
                <span className="font-extrabold text-sm text-cafe-espresso dark:text-cafe-cream leading-tight">
                  {lang === 'ar' ? cafeConfig.name.ar : cafeConfig.name.en}
                </span>
                <span className="text-[10px] text-cafe-gold tracking-widest font-mono font-semibold">
                  {cafeConfig.established}
                </span>
              </div>
            </a>

            {/* Mobile Controls Right: Just Cart + Hamburger Menu */}
            <div className="flex items-center gap-2">
              {/* Mobile Cart Button */}
              <button
                onClick={() => setCartOpen(true)}
                className="relative p-2.5 rounded-full bg-cafe-warm/80 dark:bg-cafe-surface-dark border border-cafe-amber/25 text-cafe-amber shadow-sm hover:border-cafe-gold transition-all"
                aria-label={t('cart.title')}
              >
                <ShoppingBag className="w-4 h-4" />
                {totalItems > 0 && (
                  <span className="absolute -top-1 -right-1 min-w-[17px] h-[17px] px-1 rounded-full bg-cafe-amber text-white text-[9px] font-black flex items-center justify-center shadow-md">
                    {totalItems}
                  </span>
                )}
              </button>

              {/* Mobile Hamburger Toggle */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className={`p-2.5 rounded-full border transition-all ${mobileMenuOpen
                    ? 'bg-cafe-amber text-white border-cafe-amber shadow-warm-sm'
                    : 'bg-cafe-warm/80 dark:bg-cafe-surface-dark border border-cafe-amber/25 text-cafe-espresso dark:text-cafe-cream hover:border-cafe-gold'
                  }`}
                aria-label="Toggle menu"
              >
                {mobileMenuOpen ? <X className="w-4 h-4" /> : <MenuIcon className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* Desktop Header View: CSS Grid for 100% Guaranteed Dead Center Logo */}
          <div className="hidden lg:grid grid-cols-[1fr_auto_1fr] items-center w-full">

            {/* Desktop Start Wing: Controls + Primary Navigation */}
            <div className="flex items-center justify-between w-full pe-3 xl:pe-6">
              {/* Settings / Language & Theme */}
              <div className="flex items-center gap-2 flex-shrink-0">
                <button
                  onClick={toggleLang}
                  className="group flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-full bg-cafe-warm/80 dark:bg-cafe-surface-dark border border-cafe-amber/25 hover:border-cafe-gold text-cafe-espresso dark:text-cafe-cream transition-all duration-150 hover:-translate-y-0.5 active:scale-95 shadow-sm"
                  title="Switch Language"
                >
                  <Globe className="w-3.5 h-3.5 text-cafe-amber transition-transform duration-300 group-hover:rotate-45" />
                  <span>{lang === 'ar' ? 'EN' : 'عربي'}</span>
                </button>

                <button
                  onClick={toggleTheme}
                  className="group p-2 rounded-full bg-cafe-warm/80 dark:bg-cafe-surface-dark border border-cafe-amber/25 hover:border-cafe-gold text-cafe-espresso dark:text-cafe-cream transition-all duration-150 hover:-translate-y-0.5 active:scale-95 shadow-sm"
                  title="Toggle Theme"
                >
                  {isDark ? (
                    <Sun className="w-3.5 h-3.5 text-cafe-gold transition-transform duration-300 group-hover:rotate-45" />
                  ) : (
                    <Moon className="w-3.5 h-3.5 text-cafe-mocha transition-transform duration-300 group-hover:-rotate-12" />
                  )}
                </button>
              </div>

              {/* Primary Nav Links */}
              <nav className="flex items-center gap-4 xl:gap-6">
                {startNavLinks.map((link) => {
                  const isActive = activeSection === link.id;
                  return (
                    <a
                      key={link.href}
                      href={link.href}
                      className={`text-xs whitespace-nowrap relative py-1 transition-all ${
                        isActive
                          ? 'font-extrabold text-cafe-amber dark:text-cafe-gold drop-shadow-sm'
                          : 'font-bold text-cafe-espresso/80 dark:text-cafe-cream/80 hover:text-cafe-amber dark:hover:text-cafe-gold'
                      }`}
                    >
                      {link.label}
                      {isActive && (
                        <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-cafe-amber dark:bg-cafe-gold shadow-gold-glow animate-pulse" />
                      )}
                    </a>
                  );
                })}
              </nav>
            </div>

            {/* Desktop Center: Exactly Centered Glowing Logo */}
            <div className="flex items-center justify-center px-2 xl:px-4 flex-shrink-0">
              <Magnetic strength={0.35}>
                <a
                  href="#hero"
                  className="flex items-center group"
                  title="Grand Cafe"
                >
                  <div className="relative w-11 h-11 sm:w-12 sm:h-12 rounded-full p-0.5 border-2 border-cafe-gold/80 group-hover:border-cafe-gold shadow-gold-glow bg-cafe-cream dark:bg-cafe-espresso flex items-center justify-center transition-transform transform group-hover:scale-105 overflow-hidden">
                    <img
                      src={cafeConfig.assets.logo}
                      alt={cafeConfig.name.en}
                      className="w-full h-full object-cover rounded-full"
                    />
                  </div>
                </a>
              </Magnetic>
            </div>

            {/* Desktop End Wing: Secondary Navigation + Cart + CTA */}
            <div className="flex items-center justify-between w-full ps-3 xl:ps-6">
              {/* Secondary Nav Links */}
              <nav className="flex items-center gap-4 xl:gap-5">
                {endNavLinks.map((link) => {
                  const isActive = activeSection === link.id;
                  return (
                    <a
                      key={link.href}
                      href={link.href}
                      className={`text-xs whitespace-nowrap relative py-1 transition-all ${
                        isActive
                          ? 'font-extrabold text-cafe-amber dark:text-cafe-gold drop-shadow-sm'
                          : 'font-bold text-cafe-espresso/80 dark:text-cafe-cream/80 hover:text-cafe-amber dark:hover:text-cafe-gold'
                      }`}
                    >
                      {link.label}
                      {isActive && (
                        <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-cafe-amber dark:bg-cafe-gold shadow-gold-glow animate-pulse" />
                      )}
                    </a>
                  );
                })}
                <button
                  onClick={onOpenOriginalMenu}
                  className="inline-flex items-center gap-1.5 text-xs font-bold px-3 py-1 rounded-full border border-cafe-amber/30 text-cafe-amber hover:bg-cafe-amber/15 hover:border-cafe-gold transition-all whitespace-nowrap"
                >
                  <FileText className="w-3.5 h-3.5 text-cafe-amber" />
                  <span>{t('nav.originalMenu')}</span>
                </button>
              </nav>

              {/* Actions: Cart + Book Table CTA */}
              <div className="flex items-center gap-3 flex-shrink-0">
                {/* Cart Button */}
                <button
                  onClick={() => setCartOpen(true)}
                  className="group relative p-2 rounded-full bg-cafe-warm/80 dark:bg-cafe-surface-dark border border-cafe-amber/25 hover:border-cafe-gold text-cafe-espresso dark:text-cafe-cream transition-all duration-150 hover:-translate-y-0.5 active:scale-95 shadow-sm"
                  aria-label={t('cart.title')}
                  title={t('cart.title')}
                >
                  <ShoppingBag className="w-4 h-4 text-cafe-amber transition-transform duration-200 group-hover:scale-110" />
                  {totalItems > 0 && (
                    <span className="absolute -top-1.5 -right-1.5 min-w-[18px] h-[18px] px-1 rounded-full bg-cafe-amber text-white text-[10px] font-black flex items-center justify-center animate-scaleIn shadow-md">
                      {totalItems}
                    </span>
                  )}
                </button>

                {/* Book Table Button */}
                <button
                  onClick={onOpenBooking}
                  className="flex items-center gap-1.5 text-xs font-extrabold px-4 py-2 rounded-full bg-gold-gradient text-cafe-espresso shadow-gold-glow hover:brightness-105 hover:-translate-y-0.5 active:scale-95 transition-all duration-150 whitespace-nowrap"
                >
                  <Calendar className="w-3.5 h-3.5" />
                  <span>{t('nav.bookBtn')}</span>
                </button>
              </div>
            </div>

          </div>
        </div>

        {/* Mobile Dropdown Menu: Compact, Organized & Touch-Friendly */}
        {mobileMenuOpen && (
          <div className="pointer-events-auto mt-2 rounded-3xl bg-cafe-cream/95 dark:bg-cafe-espresso/95 backdrop-blur-2xl border border-cafe-amber/30 shadow-2xl p-4 sm:p-5 transition-all animate-fadeIn max-h-[80vh] overflow-y-auto">
            <div className="flex flex-col gap-3.5">

              {/* 1. Primary Core Navigation Links */}
              <div className="space-y-1">
                {[
                  { href: '#hero', id: 'hero', label: t('nav.home'), icon: Home },
                  { href: '#spot', id: 'spot', label: t('nav.spot'), icon: BookOpen },
                  { href: '#popular', id: 'popular', label: t('nav.popular'), icon: Flame, badge: lang === 'ar' ? 'مميز' : 'Hot' },
                  { href: '#menu', id: 'menu', label: t('nav.menu'), icon: Coffee },
                  { href: '#instagram', id: 'instagram', label: t('nav.instagram'), icon: Instagram, badge: lang === 'ar' ? 'ريلز' : 'Reels' },
                  { href: '#location', id: 'location', label: t('nav.location'), icon: MapPin },
                ].map((item) => {
                  const Icon = item.icon;
                  const isActive = activeSection === item.id;
                  return (
                    <a
                      key={item.href}
                      href={item.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className={`flex items-center justify-between px-3 py-2 rounded-2xl text-sm transition-all group ${
                        isActive
                          ? 'bg-cafe-amber/15 text-cafe-amber dark:text-cafe-gold font-extrabold shadow-sm border border-cafe-amber/30'
                          : 'font-bold text-cafe-espresso dark:text-cafe-cream hover:bg-cafe-amber/10 hover:text-cafe-amber border border-transparent'
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <div
                          className={`w-7 h-7 rounded-lg flex items-center justify-center transition-colors ${
                            isActive
                              ? 'bg-cafe-amber text-white shadow-sm'
                              : 'bg-cafe-warm/80 dark:bg-cafe-surface-dark border border-cafe-amber/20 text-cafe-amber group-hover:border-cafe-gold group-hover:text-cafe-gold'
                          }`}
                        >
                          <Icon className="w-3.5 h-3.5" />
                        </div>
                        <span>{item.label}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        {item.badge && (
                          <span className="text-[10px] font-black px-2 py-0.5 rounded-full bg-cafe-amber/20 text-cafe-amber border border-cafe-amber/30">
                            {item.badge}
                          </span>
                        )}
                        {lang === 'ar' ? (
                          <ChevronLeft className="w-4 h-4 text-cafe-muted-light/60 dark:text-cafe-warm/40 group-hover:text-cafe-amber transition-colors" />
                        ) : (
                          <ChevronRight className="w-4 h-4 text-cafe-muted-light/60 dark:text-cafe-warm/40 group-hover:text-cafe-amber transition-colors" />
                        )}
                      </div>
                    </a>
                  );
                })}
              </div>

              {/* 2. Explore More Sections (Bakery + Reviews) */}
              <div className="pt-2.5 border-t border-cafe-amber/15">
                <div className="text-[11px] font-bold text-cafe-muted-light dark:text-cafe-warm/60 uppercase tracking-wider mb-2 px-1">
                  {lang === 'ar' ? 'استكشف المزيد في جراند كافيه' : 'Explore More'}
                </div>
                <div className="grid grid-cols-2 gap-1.5">
                  {[
                    { href: '#bakery', label: lang === 'ar' ? 'مخبوزات جراند' : 'Grand Bakery', icon: Croissant },
                    { href: '#reviews', label: lang === 'ar' ? 'آراء العملاء' : 'Reviews', icon: Star },
                  ].map((sub) => {
                    const SubIcon = sub.icon;
                    return (
                      <a
                        key={sub.href}
                        href={sub.href}
                        onClick={() => setMobileMenuOpen(false)}
                        className="flex items-center gap-2 p-2 rounded-xl bg-cafe-warm/60 dark:bg-cafe-surface-dark/70 border border-cafe-amber/15 hover:border-cafe-gold/60 text-xs font-bold text-cafe-espresso dark:text-cafe-cream hover:text-cafe-amber transition-all"
                      >
                        <SubIcon className="w-3.5 h-3.5 text-cafe-amber flex-shrink-0" />
                        <span className="truncate">{sub.label}</span>
                      </a>
                    );
                  })}
                </div>
              </div>

              {/* 3. Action Buttons: Original Menu & Book Table */}
              <div className="grid grid-cols-2 gap-2 pt-2 border-t border-cafe-amber/15">
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenOriginalMenu();
                  }}
                  className="flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl border border-cafe-amber/30 text-cafe-amber hover:bg-cafe-amber/15 hover:border-cafe-gold transition-all text-xs font-bold"
                >
                  <FileText className="w-3.5 h-3.5 flex-shrink-0" />
                  <span className="truncate">{t('nav.originalMenu')}</span>
                </button>

                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenBooking();
                  }}
                  className="flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl bg-gold-gradient text-cafe-espresso font-extrabold text-xs shadow-gold-glow hover:brightness-105 active:scale-95 transition-all"
                >
                  <Calendar className="w-3.5 h-3.5 flex-shrink-0" />
                  <span className="truncate">{t('nav.bookBtn')}</span>
                </button>
              </div>

              {/* 4. Settings Bar: Language + Theme Switches */}
              <div className="grid grid-cols-2 gap-2 pt-2 border-t border-cafe-amber/15">
                <button
                  onClick={toggleLang}
                  className="flex items-center justify-center gap-2 py-2 px-3 rounded-xl bg-cafe-warm/80 dark:bg-cafe-surface-dark border border-cafe-amber/20 hover:border-cafe-gold/50 text-xs font-bold text-cafe-espresso dark:text-cafe-cream transition-all"
                  title="Switch Language"
                >
                  <Globe className="w-3.5 h-3.5 text-cafe-amber" />
                  <span>{lang === 'ar' ? 'English (EN)' : 'العربية (AR)'}</span>
                </button>

                <button
                  onClick={toggleTheme}
                  className="flex items-center justify-center gap-2 py-2 px-3 rounded-xl bg-cafe-warm/80 dark:bg-cafe-surface-dark border border-cafe-amber/20 hover:border-cafe-gold/50 text-xs font-bold text-cafe-espresso dark:text-cafe-cream transition-all"
                  title="Toggle Theme"
                >
                  {isDark ? (
                    <>
                      <Sun className="w-3.5 h-3.5 text-cafe-gold" />
                      <span>{lang === 'ar' ? 'وضع نهاري' : 'Light Mode'}</span>
                    </>
                  ) : (
                    <>
                      <Moon className="w-3.5 h-3.5 text-cafe-mocha" />
                      <span>{lang === 'ar' ? 'وضع ليلي' : 'Dark Mode'}</span>
                    </>
                  )}
                </button>
              </div>

            </div>
          </div>
        )}
      </header>
    </>
  );
};
