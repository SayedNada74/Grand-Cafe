import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { cafeConfig } from '../config/cafeConfig';
import { MapPin, Clock, Phone, MessageCircle, ExternalLink, Navigation, Copy, Check } from 'lucide-react';
import { ScrollReveal } from './common/ScrollReveal';
import { Magnetic } from './common/Magnetic';

export const LocationSection: React.FC = () => {
  const { t, lang, isRtl } = useLanguage();
  const [copiedItem, setCopiedItem] = useState<'address' | 'phone' | null>(null);

  const copyToClipboard = async (text: string, type: 'address' | 'phone') => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedItem(type);
      setTimeout(() => {
        setCopiedItem(null);
      }, 2500);
    } catch (err) {
      console.error('Failed to copy', err);
    }
  };

  return (
    <section id="location" className="py-24 bg-cafe-cream dark:bg-cafe-espresso relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <ScrollReveal direction="up">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="text-xs font-extrabold tracking-widest text-cafe-amber uppercase mb-2 flex items-center justify-center gap-1.5">
              <MapPin className="w-4 h-4 text-cafe-amber" />
              {t('loc.badge')}
            </span>
            <h2 className="text-3xl sm:text-5xl font-extrabold text-cafe-espresso dark:text-cafe-cream">
              {t('loc.title')}
            </h2>
          </div>
        </ScrollReveal>

        {/* Location Grid Card */}
        <ScrollReveal direction="up" delay={0.15}>
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
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <h4 className="text-xs font-extrabold text-cafe-muted-light dark:text-cafe-muted-dark uppercase tracking-wider">
                      {t('loc.addressTitle')}
                    </h4>
                    <button
                      onClick={() => copyToClipboard(cafeConfig.location.address[isRtl ? 'ar' : 'en'], 'address')}
                      className="inline-flex items-center gap-1 text-[11px] font-bold px-2.5 py-1 rounded-lg bg-cafe-warm/80 dark:bg-cafe-card-dark border border-cafe-amber/25 hover:border-cafe-gold text-cafe-amber hover:text-cafe-gold transition-all active:scale-95 shadow-sm"
                      title={lang === 'ar' ? 'نسخ العنوان' : 'Copy address'}
                    >
                      {copiedItem === 'address' ? (
                        <>
                          <Check className="w-3 h-3 text-emerald-500" />
                          <span className="text-emerald-500">{lang === 'ar' ? 'تم النسخ' : 'Copied'}</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3 h-3" />
                          <span>{lang === 'ar' ? 'نسخ' : 'Copy'}</span>
                        </>
                      )}
                    </button>
                  </div>
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
              
              {/* Google Maps Button with Magnetic pull */}
              <Magnetic strength={0.25} className="w-full">
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
              </Magnetic>

              {/* Phone & WhatsApp Links */}
              <div className="grid grid-cols-2 gap-3">
                <div className="flex items-stretch gap-1.5">
                  <a
                    href={`tel:${cafeConfig.phoneNumber}`}
                    className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl bg-cafe-warm dark:bg-cafe-card-dark border border-cafe-amber/30 text-xs font-bold text-cafe-espresso dark:text-cafe-cream hover:border-cafe-amber transition-all"
                  >
                    <Phone className="w-4 h-4 text-cafe-amber flex-shrink-0" />
                    <span className="truncate">{t('loc.callUs')}</span>
                  </a>
                  <button
                    onClick={() => copyToClipboard(cafeConfig.phoneNumber, 'phone')}
                    className="px-2.5 rounded-xl bg-cafe-warm dark:bg-cafe-card-dark border border-cafe-amber/30 text-cafe-amber hover:border-cafe-gold transition-all active:scale-95 flex items-center justify-center"
                    title={lang === 'ar' ? 'نسخ رقم الهاتف' : 'Copy phone number'}
                  >
                    {copiedItem === 'phone' ? (
                      <Check className="w-3.5 h-3.5 text-emerald-500" />
                    ) : (
                      <Copy className="w-3.5 h-3.5" />
                    )}
                  </button>
                </div>

                <a
                  href={`https://wa.me/${cafeConfig.whatsappNumber.replace(/[^0-9]/g, '')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 py-3 rounded-xl bg-emerald-600/15 border border-emerald-600/30 text-xs font-bold text-emerald-600 dark:text-emerald-400 hover:bg-emerald-600 hover:text-white transition-all"
                >
                  <MessageCircle className="w-4 h-4 flex-shrink-0" />
                  <span className="truncate">{t('loc.chatWhatsapp')}</span>
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
              className="w-full h-full filter contrast-105 dark:brightness-[0.88] dark:contrast-[1.1] dark:saturate-[0.85] transition-all duration-300"
            />

            {/* Subtle Ambient Night Mode Overlay to soften map glare */}
            <div className="pointer-events-none absolute inset-0 dark:bg-gradient-to-t dark:from-cafe-espresso/35 dark:via-transparent dark:to-cafe-espresso/20" />
            
            {/* Map Overlay Badge */}
            <div className="absolute top-4 right-4 bg-cafe-espresso/90 text-white px-4 py-2 rounded-xl backdrop-blur-md border border-cafe-gold/30 text-xs font-bold flex items-center gap-2 shadow-lg">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping" />
              <span>جراند كافيه | GRAND CAFE</span>
            </div>
          </div>

          </div>
        </ScrollReveal>

      </div>

      {/* Floating Toast Notification for 1-Tap Copy */}
      {copiedItem && (
        <div className="fixed bottom-20 sm:bottom-8 left-1/2 -translate-x-1/2 z-50 flex items-center gap-2 px-5 py-2.5 rounded-full bg-cafe-espresso dark:bg-cafe-surface-dark text-white backdrop-blur-xl border border-cafe-gold/50 shadow-2xl text-xs font-extrabold tracking-wide transition-all animate-bounce">
          <Check className="w-4 h-4 text-emerald-400 flex-shrink-0" />
          <span>
            {copiedItem === 'address'
              ? (lang === 'ar' ? 'تم نسخ العنوان بنجاح ✨' : 'Address copied to clipboard ✨')
              : (lang === 'ar' ? 'تم نسخ رقم الهاتف بنجاح ✨' : 'Phone number copied to clipboard ✨')}
          </span>
        </div>
      )}
    </section>
  );
};
