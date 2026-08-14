import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { cafeConfig } from '../config/cafeConfig';
import { BookOpen, MapPin, MessageCircle, Calendar } from 'lucide-react';

interface MobileBottomBarProps {
  onOpenBooking: () => void;
}

export const MobileBottomBar: React.FC<MobileBottomBarProps> = ({ onOpenBooking }) => {
  const { t, isRtl } = useLanguage();

  const handleWhatsAppClick = () => {
    const text = encodeURIComponent(
      isRtl
        ? "مرحباً جراند كافيه، أود الاستفسار والحجز."
        : "Hello Grand Cafe, I would like to ask about reservations."
    );
    window.open(`https://wa.me/${cafeConfig.whatsappNumber.replace(/[^0-9]/g, '')}?text=${text}`, '_blank');
  };

  return (
    <div className="sm:hidden fixed bottom-0 left-0 right-0 z-40 bg-cafe-cream/95 dark:bg-cafe-espresso/95 backdrop-blur-lg border-t border-cafe-amber/20 px-3 py-2 shadow-warm-lg">
      <div className="grid grid-cols-4 gap-1 text-center">
        
        {/* Menu */}
        <a
          href="#menu"
          className="flex flex-col items-center justify-center py-1 text-cafe-espresso/80 dark:text-cafe-cream/80 hover:text-cafe-amber dark:hover:text-cafe-gold transition-colors"
        >
          <BookOpen className="w-5 h-5 mb-0.5 text-cafe-amber" />
          <span className="text-[10px] font-semibold">{t('nav.menu')}</span>
        </a>

        {/* Location */}
        <a
          href={cafeConfig.googleMapsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-col items-center justify-center py-1 text-cafe-espresso/80 dark:text-cafe-cream/80 hover:text-cafe-amber dark:hover:text-cafe-gold transition-colors"
        >
          <MapPin className="w-5 h-5 mb-0.5 text-cafe-amber" />
          <span className="text-[10px] font-semibold">{t('nav.location')}</span>
        </a>

        {/* WhatsApp Chat */}
        <button
          onClick={handleWhatsAppClick}
          className="flex flex-col items-center justify-center py-1 text-emerald-600 dark:text-emerald-400 hover:opacity-80 transition-opacity"
        >
          <MessageCircle className="w-5 h-5 mb-0.5 text-emerald-500" />
          <span className="text-[10px] font-semibold">واتساب</span>
        </button>

        {/* Book Table */}
        <button
          onClick={onOpenBooking}
          className="flex flex-col items-center justify-center py-1 text-cafe-espresso dark:text-cafe-cream font-bold"
        >
          <div className="w-7 h-7 rounded-full bg-gold-gradient flex items-center justify-center mb-0.5 shadow-sm">
            <Calendar className="w-4 h-4 text-cafe-espresso" />
          </div>
          <span className="text-[10px] font-bold text-cafe-amber">{t('nav.bookBtn')}</span>
        </button>

      </div>
    </div>
  );
};
