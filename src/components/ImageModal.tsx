import React, { useEffect } from 'react';
import { X, Coffee } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

interface ImageModalProps {
  isOpen: boolean;
  onClose: () => void;
  imageSrc: string;
  titleAr: string;
  titleEn: string;
  price?: number;
  badgeText?: string;
  descriptionAr?: string;
  descriptionEn?: string;
}

export const ImageModal: React.FC<ImageModalProps> = ({
  isOpen,
  onClose,
  imageSrc,
  titleAr,
  titleEn,
  price,
  badgeText,
  descriptionAr,
  descriptionEn,
}) => {
  const { lang, t } = useLanguage();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-cafe-espresso/90 backdrop-blur-md animate-fadeIn"
      onClick={onClose}
    >
      {/* Container Box */}
      <div
        className="relative max-w-4xl w-full max-h-[90vh] bg-cafe-surface-light dark:bg-cafe-surface-dark border-2 border-cafe-gold/30 rounded-3xl shadow-2xl overflow-hidden flex flex-col animate-scaleUp"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between p-4 sm:p-5 border-b border-cafe-amber/15 bg-cafe-warm/50 dark:bg-cafe-card-dark">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-cafe-amber/15 text-cafe-amber flex items-center justify-center">
              <Coffee className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg sm:text-xl font-extrabold text-cafe-espresso dark:text-cafe-cream">
                {lang === 'ar' ? titleAr : titleEn}
              </h3>
              {badgeText && (
                <span className="text-[10px] font-bold text-cafe-gold uppercase tracking-wider block">
                  {badgeText}
                </span>
              )}
            </div>
          </div>

          <div className="flex items-center gap-3">
            {price !== undefined && (
              <span className="text-sm sm:text-base font-extrabold text-cafe-gold bg-cafe-gold/10 px-3.5 py-1.5 rounded-full border border-cafe-gold/30">
                {price} {t('menu.currency')}
              </span>
            )}

            <button
              onClick={onClose}
              className="p-2 rounded-full bg-cafe-surface-light dark:bg-white/10 hover:bg-cafe-amber hover:text-cafe-espresso text-cafe-espresso dark:text-white transition-all border border-cafe-amber/20"
              aria-label="Close image popup"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Body: Full Uncropped Image View */}
        <div className="relative flex-1 p-4 sm:p-6 flex items-center justify-center bg-black/40 overflow-auto min-h-[300px]">
          <img
            src={imageSrc}
            alt={lang === 'ar' ? titleAr : titleEn}
            className="max-h-[65vh] max-w-full object-contain rounded-2xl shadow-2xl border border-cafe-amber/20"
          />
        </div>

        {/* Modal Footer Description */}
        {(descriptionAr || descriptionEn) && (
          <div className="p-4 sm:p-5 bg-cafe-warm/40 dark:bg-cafe-card-dark border-t border-cafe-amber/15 text-center">
            <p className="text-xs sm:text-sm text-cafe-muted-light dark:text-cafe-muted-dark leading-relaxed max-w-2xl mx-auto font-medium">
              {lang === 'ar' ? descriptionAr : descriptionEn}
            </p>
          </div>
        )}

      </div>
    </div>
  );
};
