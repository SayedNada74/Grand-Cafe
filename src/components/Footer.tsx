import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useTheme } from '../context/ThemeContext';
import { cafeConfig } from '../config/cafeConfig';
import { Instagram, Facebook, MapPin, Phone, MessageCircle, Heart, Globe, Sun, Moon } from 'lucide-react';

interface FooterProps {
  onOpenOriginalMenu: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenOriginalMenu }) => {
  const { t, lang, toggleLang, isRtl } = useLanguage();
  const { toggleTheme, isDark } = useTheme();

  return (
    <footer className="bg-cafe-warm/90 text-cafe-espresso dark:bg-cafe-dark dark:text-cafe-warm pt-16 pb-24 sm:pb-12 border-t border-cafe-amber/15 relative overflow-hidden transition-colors duration-300">
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-cafe-amber/15">
          
          {/* Brand Info Column */}
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center gap-3">
              <img
                src={cafeConfig.assets.logo}
                alt={cafeConfig.name.en}
                className="w-12 h-12 rounded-full border-2 border-cafe-gold/40 object-cover"
              />
              <div>
                <span className="font-extrabold text-xl text-cafe-espresso dark:text-white block">
                  {lang === 'ar' ? cafeConfig.name.ar : cafeConfig.name.en}
                </span>
                <span className="text-xs font-mono text-cafe-gold font-bold">
                  EST. {cafeConfig.established} • TELL EL KEBIR
                </span>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-cafe-muted-light dark:text-cafe-warm/75 leading-relaxed max-w-sm">
              {t('footer.brandStatement')}
            </p>

            <div className="flex items-center gap-3 pt-2">
              <a
                href={cafeConfig.instagram.url}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-cafe-surface-light dark:bg-white/10 border border-cafe-amber/20 hover:bg-pink-600 hover:text-white flex items-center justify-center text-cafe-espresso dark:text-white transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>

              <a
                href={cafeConfig.facebook.url}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-cafe-surface-light dark:bg-white/10 border border-cafe-amber/20 hover:bg-blue-600 hover:text-white flex items-center justify-center text-cafe-espresso dark:text-white transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="w-4 h-4" />
              </a>

              <a
                href={`https://wa.me/${cafeConfig.whatsappNumber.replace(/[^0-9]/g, '')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-cafe-surface-light dark:bg-white/10 border border-cafe-amber/20 hover:bg-emerald-600 hover:text-white flex items-center justify-center text-cafe-espresso dark:text-white transition-colors"
                aria-label="WhatsApp"
              >
                <MessageCircle className="w-4 h-4" />
              </a>

              <a
                href={cafeConfig.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-cafe-surface-light dark:bg-white/10 border border-cafe-amber/20 hover:bg-cafe-gold hover:text-cafe-espresso flex items-center justify-center text-cafe-espresso dark:text-white transition-colors"
                aria-label="Google Maps"
              >
                <MapPin className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Links Column */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="text-sm font-bold text-cafe-espresso dark:text-white uppercase tracking-wider mb-4 border-b border-cafe-amber/20 pb-2 inline-block">
              {t('footer.quickLinks')}
            </h4>
            <ul className="space-y-2.5 text-xs font-medium text-cafe-muted-light dark:text-cafe-warm/80">
              <li>
                <a href="#hero" className="hover:text-cafe-amber dark:hover:text-cafe-gold transition-colors">
                  {t('nav.home')}
                </a>
              </li>
              <li>
                <a href="#experience" className="hover:text-cafe-amber dark:hover:text-cafe-gold transition-colors">
                  {t('nav.experience')}
                </a>
              </li>
              <li>
                <a href="#spot" className="hover:text-cafe-amber dark:hover:text-cafe-gold transition-colors">
                  {t('nav.spot')}
                </a>
              </li>
              <li>
                <a href="#menu" className="hover:text-cafe-amber dark:hover:text-cafe-gold transition-colors">
                  {t('nav.menu')}
                </a>
              </li>
              <li>
                <a href="#reservation" className="hover:text-cafe-amber dark:hover:text-cafe-gold transition-colors">
                  {t('nav.reservation')}
                </a>
              </li>
              <li>
                <button
                  onClick={onOpenOriginalMenu}
                  className="hover:text-cafe-gold transition-colors text-cafe-amber"
                >
                  📜 {t('nav.originalMenu')}
                </button>
              </li>
            </ul>
          </div>

          {/* Contact & Hours Column */}
          <div className="md:col-span-4 space-y-3">
            <h4 className="text-sm font-bold text-cafe-espresso dark:text-white uppercase tracking-wider mb-4 border-b border-cafe-amber/20 pb-2 inline-block">
              {t('nav.location')}
            </h4>
            <div className="space-y-2.5 text-xs text-cafe-muted-light dark:text-cafe-warm/80">
              <p className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-cafe-amber dark:text-cafe-gold flex-shrink-0 mt-0.5" />
                <span>{cafeConfig.location.address[isRtl ? 'ar' : 'en']}</span>
              </p>
              <p className="flex items-center gap-2">
                <Instagram className="w-4 h-4 text-cafe-amber dark:text-cafe-gold flex-shrink-0" />
                <span>{cafeConfig.instagram.handle}</span>
              </p>
              <p className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-cafe-amber dark:text-cafe-gold flex-shrink-0" />
                <span>{cafeConfig.phoneNumber}</span>
              </p>
            </div>

            {/* Language & Theme Controls */}
            <div className="flex items-center gap-2 pt-4">
              <button
                onClick={toggleLang}
                className="flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-lg bg-cafe-surface-light dark:bg-white/10 text-cafe-espresso dark:text-white border border-cafe-amber/20 hover:border-cafe-amber"
              >
                <Globe className="w-3.5 h-3.5 text-cafe-amber dark:text-cafe-gold" />
                <span>{lang === 'ar' ? 'English' : 'العربية'}</span>
              </button>
              <button
                onClick={toggleTheme}
                className="p-2 rounded-lg bg-cafe-surface-light dark:bg-white/10 text-cafe-espresso dark:text-white border border-cafe-amber/20 hover:border-cafe-amber"
              >
                {isDark ? <Sun className="w-4 h-4 text-cafe-gold" /> : <Moon className="w-4 h-4 text-cafe-mocha" />}
              </button>
            </div>
          </div>

        </div>

        {/* Bottom Copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-cafe-muted-light dark:text-cafe-warm/60">
          <p>{t('footer.rights')}</p>
          <p className="flex items-center gap-1">
            <span>Crafted with</span>
            <Heart className="w-3.5 h-3.5 fill-rose-500 text-rose-500" />
            <span>for Grand Cafe</span>
          </p>
        </div>

      </div>
    </footer>
  );
};
