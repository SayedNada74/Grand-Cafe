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
    <section id="location" className="py-20 sm:py-24 bg-cafe-cream dark:bg-cafe-espresso relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <ScrollReveal direction="up">
          <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-14">
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
          <div className="lg:col-span-5 bg-cafe-surface-light dark:bg-cafe-surface-dark border border-cafe-amber/20 rounded-3xl p-6 sm:p-8 shadow-warm-lg flex flex-col justify-between">
            
            <div className="space-y-6">
              
              {/* Brand Logo & Name Header */}
              <div className="flex items-center gap-4 pb-5 border-b border-cafe-amber/15">
                <img
                  src={cafeConfig.assets.logo}
                  alt={cafeConfig.name.en}
                  className="w-14 h-14 rounded-full object-cover border-2 border-cafe-amber/30 shadow-sm"
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

              {/* 1. Address Info Card */}
              <div className="group relative flex items-start gap-3.5 p-3.5 rounded-2xl bg-cafe-warm/40 dark:bg-cafe-card-dark/40 border border-cafe-amber/15 hover:border-cafe-amber/40 transition-all">
                <div className="w-10 h-10 rounded-xl bg-cafe-amber/15 text-cafe-amber flex items-center justify-center flex-shrink-0 mt-0.5 group-hover:bg-cafe-amber group-hover:text-white transition-colors">
                  <MapPin className="w-5 h-5" />
                </div>
                <div className="flex-1 min-w-0">
                  <span className="text-[11px] font-extrabold text-cafe-muted-light dark:text-cafe-muted-dark uppercase tracking-wider block mb-0.5">
                    {t('loc.addressTitle')}
                  </span>
                  <p className="text-xs sm:text-sm font-bold text-cafe-espresso dark:text-cafe-cream leading-relaxed">
                    {cafeConfig.location.address[isRtl ? 'ar' : 'en']}
                  </p>
                </div>
                <button
                  onClick={() => copyToClipboard(cafeConfig.location.address[isRtl ? 'ar' : 'en'], 'address')}
                  className={`flex-shrink-0 flex items-center gap-1 text-[11px] font-bold px-2.5 py-1.5 rounded-xl border transition-all active:scale-95 shadow-sm ${
                    copiedItem === 'address'
                      ? 'bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border-emerald-500/30'
                      : 'bg-cafe-warm/80 dark:bg-cafe-surface-dark border-cafe-amber/20 text-cafe-amber hover:text-cafe-gold hover:border-cafe-gold'
                  }`}
                  title={lang === 'ar' ? 'نسخ العنوان' : 'Copy address'}
                  aria-label="Copy address"
                >
                  {copiedItem === 'address' ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-500" />
                      <span>{lang === 'ar' ? 'تم النسخ' : 'Copied'}</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>{lang === 'ar' ? 'نسخ' : 'Copy'}</span>
                    </>
                  )}
                </button>
              </div>

              {/* 2. Opening Hours Info Card */}
              <div className="group relative flex items-start gap-3.5 p-3.5 rounded-2xl bg-cafe-warm/40 dark:bg-cafe-card-dark/40 border border-cafe-amber/15 hover:border-cafe-amber/40 transition-all">
                <div className="w-10 h-10 rounded-xl bg-cafe-amber/15 text-cafe-amber flex items-center justify-center flex-shrink-0 mt-0.5 group-hover:bg-cafe-amber group-hover:text-white transition-colors">
                  <Clock className="w-5 h-5" />
                </div>
                <div className="flex-1 min-w-0">
                  <span className="text-[11px] font-extrabold text-cafe-muted-light dark:text-cafe-muted-dark uppercase tracking-wider block mb-0.5">
                    {t('loc.hoursTitle')}
                  </span>
                  <p className="text-xs sm:text-sm font-bold text-cafe-espresso dark:text-cafe-cream">
                    {cafeConfig.openingHours[isRtl ? 'ar' : 'en']}
                  </p>
                </div>
              </div>

              {/* 3. Phone & Orders Info Card */}
              <div className="group relative flex items-start gap-3.5 p-3.5 rounded-2xl bg-cafe-warm/40 dark:bg-cafe-card-dark/40 border border-cafe-amber/15 hover:border-cafe-amber/40 transition-all">
                <div className="w-10 h-10 rounded-xl bg-cafe-amber/15 text-cafe-amber flex items-center justify-center flex-shrink-0 mt-0.5 group-hover:bg-cafe-amber group-hover:text-white transition-colors">
                  <Phone className="w-5 h-5" />
                </div>
                <div className="flex-1 min-w-0">
                  <span className="text-[11px] font-extrabold text-cafe-muted-light dark:text-cafe-muted-dark uppercase tracking-wider block mb-0.5">
                    {lang === 'ar' ? 'رقم الهاتف والطلبات' : 'Phone & Orders'}
                  </span>
                  <a
                    href={`tel:${cafeConfig.phoneNumber}`}
                    className="text-xs sm:text-sm font-bold font-mono text-cafe-espresso dark:text-cafe-cream hover:text-cafe-amber dark:hover:text-cafe-gold transition-colors inline-block dir-ltr"
                  >
                    {cafeConfig.phoneNumber}
                  </a>
                </div>
                <button
                  onClick={() => copyToClipboard(cafeConfig.phoneNumber, 'phone')}
                  className={`flex-shrink-0 flex items-center gap-1 text-[11px] font-bold px-2.5 py-1.5 rounded-xl border transition-all active:scale-95 shadow-sm ${
                    copiedItem === 'phone'
                      ? 'bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border-emerald-500/30'
                      : 'bg-cafe-warm/80 dark:bg-cafe-surface-dark border-cafe-amber/20 text-cafe-amber hover:text-cafe-gold hover:border-cafe-gold'
                  }`}
                  title={lang === 'ar' ? 'نسخ رقم الهاتف' : 'Copy phone number'}
                  aria-label="Copy phone number"
                >
                  {copiedItem === 'phone' ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-500" />
                      <span>{lang === 'ar' ? 'تم النسخ' : 'Copied'}</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>{lang === 'ar' ? 'نسخ' : 'Copy'}</span>
                    </>
                  )}
                </button>
              </div>

            </div>

            {/* Direct Contact Action CTAs */}
            <div className="pt-6 border-t border-cafe-amber/15 space-y-3 mt-6">
              
              {/* Google Maps Button with Magnetic pull */}
              <Magnetic strength={0.25} className="w-full">
                <a
                  href={cafeConfig.googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-center gap-2.5 py-3.5 rounded-2xl bg-gold-gradient text-cafe-espresso font-extrabold text-sm shadow-gold-glow hover:opacity-95 active:scale-98 transition-all"
                >
                  <Navigation className="w-4 h-4 fill-cafe-espresso text-cafe-espresso" />
                  <span>{t('loc.getDirections')}</span>
                  <ExternalLink className="w-4 h-4" />
                </a>
              </Magnetic>

              {/* Phone & WhatsApp 2-Column Buttons */}
              <div className="grid grid-cols-2 gap-3">
                <a
                  href={`tel:${cafeConfig.phoneNumber}`}
                  className="flex items-center justify-center gap-2 py-3 px-3 rounded-2xl bg-cafe-warm/80 dark:bg-cafe-card-dark border border-cafe-amber/30 text-xs font-bold text-cafe-espresso dark:text-cafe-cream hover:border-cafe-gold hover:text-cafe-amber transition-all shadow-sm active:scale-95"
                >
                  <Phone className="w-4 h-4 text-cafe-amber flex-shrink-0" />
                  <span className="truncate">{t('loc.callUs')}</span>
                </a>

                <a
                  href={`https://wa.me/${cafeConfig.whatsappNumber.replace(/[^0-9]/g, '')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 py-3 px-3 rounded-2xl bg-emerald-600/15 border border-emerald-600/30 text-xs font-bold text-emerald-600 dark:text-emerald-400 hover:bg-emerald-600 hover:text-white transition-all shadow-sm active:scale-95"
                >
                  <MessageCircle className="w-4 h-4 flex-shrink-0" />
                  <span className="truncate">{t('loc.chatWhatsapp')}</span>
                </a>
              </div>

            </div>

          </div>

          {/* Interactive Google Map Preview Column */}
          <div className="lg:col-span-7 rounded-3xl overflow-hidden border border-cafe-amber/20 shadow-warm-lg relative min-h-[380px]">
            <iframe
              title="Grand Cafe Location Google Map"
              src="https://maps.google.com/maps?q=30.5585222,31.7853341&z=16&output=embed"
              width="100%"
              height="100%"
              style={{ border: 0, minHeight: '400px' }}
              allowFullScreen={false}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="w-full h-full filter contrast-105 dark:invert-[0.92] dark:hue-rotate-[195deg] dark:brightness-[0.88] dark:contrast-[1.1] dark:saturate-[0.7] transition-all duration-300"
            />

            {/* Subtle Ambient Night Mode Overlay to soften map glare */}
            <div className="pointer-events-none absolute inset-0 dark:bg-gradient-to-t dark:from-cafe-espresso/30 dark:via-transparent dark:to-cafe-espresso/15" />
            
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
