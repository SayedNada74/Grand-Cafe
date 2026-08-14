import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { cafeConfig } from '../config/cafeConfig';
import { MapPin, Clock, Phone, MessageCircle, ExternalLink, Navigation } from 'lucide-react';

export const LocationSection: React.FC = () => {
  const { t, lang, isRtl } = useLanguage();

  return (
    <section id="location" className="py-24 bg-cafe-cream dark:bg-cafe-espresso relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="text-xs font-extrabold tracking-widest text-cafe-amber uppercase mb-2 block flex items-center justify-center gap-1.5">
            <MapPin className="w-4 h-4 text-cafe-amber" />
            {t('loc.badge')}
          </span>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-cafe-espresso dark:text-cafe-cream">
            {t('loc.title')}
          </h2>
        </div>

        {/* Location Grid Card */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Information & Details Column */}
          <div className="lg:col-span-5 bg-cafe-surface-light dark:bg-cafe-surface-dark border border-cafe-amber/20 rounded-3xl p-8 shadow-warm-lg flex flex-col justify-between">
            
            <div className="space-y-8">
              
              {/* Brand Logo & Name */}
              <div className="flex items-center gap-4 pb-6 border-b border-cafe-amber/15">
                <img
                  src={cafeConfig.assets.logo}
                  alt={cafeConfig.name.en}
                  className="w-14 h-14 rounded-full object-cover border-2 border-cafe-amber/30"
                />
                <div>
                  <h3 className="text-xl font-extrabold text-cafe-espresso dark:text-cafe-cream">
                    {lang === 'ar' ? cafeConfig.name.ar : cafeConfig.name.en}
                  </h3>
                  <span className="text-xs text-cafe-amber font-mono font-semibold">
                    EST. {cafeConfig.established} • TELL EL KEBIR
                  </span>
                </div>
              </div>

              {/* Address */}
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-cafe-amber/15 text-cafe-amber flex items-center justify-center flex-shrink-0 mt-0.5">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs font-extrabold text-cafe-muted-light dark:text-cafe-muted-dark uppercase tracking-wider mb-1">
                    {t('loc.addressTitle')}
                  </h4>
                  <p className="text-sm font-bold text-cafe-espresso dark:text-cafe-cream leading-relaxed">
                    {cafeConfig.location.address[isRtl ? 'ar' : 'en']}
                  </p>
                </div>
              </div>

              {/* Opening Hours */}
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-cafe-amber/15 text-cafe-amber flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs font-extrabold text-cafe-muted-light dark:text-cafe-muted-dark uppercase tracking-wider mb-1">
                    {t('loc.hoursTitle')}
                  </h4>
                  <p className="text-sm font-bold text-cafe-espresso dark:text-cafe-cream">
                    {cafeConfig.openingHours[isRtl ? 'ar' : 'en']}
                  </p>
                </div>
              </div>

            </div>

            {/* Direct Contact CTAs */}
            <div className="pt-8 border-t border-cafe-amber/15 space-y-3 mt-8">
              
              {/* Google Maps Button */}
              <a
                href={cafeConfig.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-2.5 py-4 rounded-xl bg-gold-gradient text-cafe-espresso font-extrabold text-sm shadow-gold-glow hover:opacity-95 transition-all"
              >
                <Navigation className="w-4 h-4 fill-cafe-espresso text-cafe-espresso" />
                <span>{t('loc.getDirections')}</span>
                <ExternalLink className="w-4 h-4" />
              </a>

              {/* Phone & WhatsApp Links */}
              <div className="grid grid-cols-2 gap-3">
                <a
                  href={`tel:${cafeConfig.phoneNumber}`}
                  className="flex items-center justify-center gap-2 py-3 rounded-xl bg-cafe-warm dark:bg-cafe-card-dark border border-cafe-amber/30 text-xs font-bold text-cafe-espresso dark:text-cafe-cream hover:border-cafe-amber"
                >
                  <Phone className="w-4 h-4 text-cafe-amber" />
                  <span>{t('loc.callUs')}</span>
                </a>

                <a
                  href={`https://wa.me/${cafeConfig.whatsappNumber.replace(/[^0-9]/g, '')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 py-3 rounded-xl bg-emerald-600/15 border border-emerald-600/30 text-xs font-bold text-emerald-600 dark:text-emerald-400 hover:bg-emerald-600 hover:text-white transition-all"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>{t('loc.chatWhatsapp')}</span>
                </a>
              </div>

            </div>

          </div>

          {/* Interactive Google Map Preview Column */}
          <div className="lg:col-span-7 rounded-3xl overflow-hidden border border-cafe-amber/20 shadow-warm-lg relative min-h-[350px]">
            <iframe
              title="Grand Cafe Location Google Map"
              src="https://maps.google.com/maps?q=30.5585222,31.7853341&z=16&output=embed"
              width="100%"
              height="100%"
              style={{ border: 0, minHeight: '400px' }}
              allowFullScreen={false}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="w-full h-full filter saturate-150 contrast-105 dark:invert dark:hue-rotate-180 dark:opacity-85"
            />
            
            {/* Map Overlay Badge */}
            <div className="absolute top-4 right-4 bg-cafe-espresso/90 text-white px-4 py-2 rounded-xl backdrop-blur-md border border-cafe-gold/30 text-xs font-bold flex items-center gap-2 shadow-lg">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping" />
              <span>جراند كافيه | GRAND CAFE</span>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
