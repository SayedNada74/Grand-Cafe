import React, { useState, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useTheme } from '../context/ThemeContext';
import { cafeConfig } from '../config/cafeConfig';
import { Sun, Moon, Globe, Menu as MenuIcon, X, Calendar } from 'lucide-react';

interface NavbarProps {
  onOpenBooking: () => void;
  onOpenOriginalMenu: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenBooking, onOpenOriginalMenu }) => {
  const { t, lang, toggleLang } = useLanguage();
  const { toggleTheme, isDark } = useTheme();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 30) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { href: '#hero', label: t('nav.home') },
    { href: '#experience', label: t('nav.experience') },
    { href: '#spot', label: t('nav.spot') },
    { href: '#menu', label: t('nav.menu') },
    { href: '#reservation', label: t('nav.reservation') },
    { href: '#location', label: t('nav.location') },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 bg-cafe-cream/95 dark:bg-cafe-espresso/95 backdrop-blur-md shadow-warm-sm border-b border-cafe-amber/15 ${
        isScrolled ? 'py-3' : 'py-4'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          
          {/* Logo & Brand Name */}
          <a href="#hero" className="flex items-center gap-3 group">
            <div className="w-11 h-11 rounded-full border-2 border-cafe-amber/40 p-0.5 overflow-hidden shadow-warm-sm group-hover:border-cafe-gold transition-all">
              <img
                src={cafeConfig.assets.logo}
                alt={cafeConfig.name.en}
                className="w-full h-full object-cover rounded-full"
              />
            </div>
            <div className="flex flex-col">
              <span className="font-extrabold text-lg sm:text-xl tracking-tight text-cafe-espresso dark:text-cafe-cream flex items-center gap-1.5">
                {lang === 'ar' ? cafeConfig.name.ar : cafeConfig.name.en}
                <span className="text-[10px] font-medium px-1.5 py-0.5 rounded bg-cafe-amber/15 text-cafe-amber border border-cafe-amber/30">
                  {cafeConfig.established}
                </span>
              </span>
              <span className="text-xs text-cafe-muted-light dark:text-cafe-muted-dark tracking-widest font-mono">
                TELL EL KEBIR
              </span>
            </div>
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-7">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-cafe-espresso/80 dark:text-cafe-cream/80 hover:text-cafe-amber dark:hover:text-cafe-gold transition-colors"
              >
                {link.label}
              </a>
            ))}
            <button
              onClick={onOpenOriginalMenu}
              className="text-xs font-semibold px-3 py-1.5 rounded-full border border-cafe-amber/30 text-cafe-amber hover:bg-cafe-amber/10 transition-all"
            >
              📜 {t('nav.originalMenu')}
            </button>
          </nav>

          {/* Right Controls (Theme, Language, Action CTA) */}
          <div className="hidden sm:flex items-center gap-3">
            
            {/* Language Switcher */}
            <button
              onClick={toggleLang}
              className="flex items-center gap-1.5 text-xs font-semibold px-3 py-2 rounded-lg bg-cafe-warm/80 dark:bg-cafe-surface-dark border border-cafe-amber/20 hover:border-cafe-amber/50 text-cafe-espresso dark:text-cafe-cream transition-all"
              title="Switch Language"
            >
              <Globe className="w-3.5 h-3.5 text-cafe-amber" />
              <span>{lang === 'ar' ? 'English' : 'العربية'}</span>
            </button>

            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg bg-cafe-warm/80 dark:bg-cafe-surface-dark border border-cafe-amber/20 hover:border-cafe-amber/50 text-cafe-espresso dark:text-cafe-cream transition-all"
              title="Toggle Dark/Light Mode"
            >
              {isDark ? (
                <Sun className="w-4 h-4 text-cafe-gold" />
              ) : (
                <Moon className="w-4 h-4 text-cafe-mocha" />
              )}
            </button>

            {/* Reserve Table CTA */}
            <button
              onClick={onOpenBooking}
              className="flex items-center gap-2 text-xs font-bold px-4 py-2.5 rounded-full bg-gold-gradient text-cafe-espresso shadow-gold-glow hover:opacity-95 transition-all transform hover:-translate-y-0.5"
            >
              <Calendar className="w-3.5 h-3.5" />
              <span>{t('nav.bookBtn')}</span>
            </button>
          </div>

          {/* Mobile Menu Toggle Button */}
          <div className="flex sm:hidden items-center gap-2">
            <button
              onClick={toggleLang}
              className="text-xs font-bold px-2 py-1 rounded bg-cafe-warm dark:bg-cafe-surface-dark text-cafe-amber"
            >
              {lang === 'ar' ? 'EN' : 'عربي'}
            </button>
            <button
              onClick={toggleTheme}
              className="p-1.5 rounded bg-cafe-warm dark:bg-cafe-surface-dark text-cafe-amber"
            >
              {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg bg-cafe-warm dark:bg-cafe-surface-dark text-cafe-espresso dark:text-cafe-cream focus:outline-none"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <MenuIcon className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer Overlay */}
      {mobileMenuOpen && (
        <div className="sm:hidden fixed inset-x-0 top-full bg-cafe-cream dark:bg-cafe-espresso border-b border-cafe-amber/20 shadow-warm-lg py-6 px-6 transition-all animate-fadeIn">
          <nav className="flex flex-col gap-4">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="text-base font-semibold text-cafe-espresso dark:text-cafe-cream hover:text-cafe-amber transition-colors"
              >
                {link.label}
              </a>
            ))}
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenOriginalMenu();
              }}
              className="text-sm font-semibold text-start py-2 text-cafe-amber flex items-center gap-2"
            >
              📜 {t('nav.originalMenu')}
            </button>
            <div className="pt-4 border-t border-cafe-amber/15 flex flex-col gap-3">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenBooking();
                }}
                className="w-full flex items-center justify-center gap-2 text-sm font-bold py-3 rounded-full bg-gold-gradient text-cafe-espresso shadow-gold-glow"
              >
                <Calendar className="w-4 h-4" />
                <span>{t('nav.bookBtn')}</span>
              </button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};
