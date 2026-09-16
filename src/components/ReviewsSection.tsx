import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { cafeConfig } from '../config/cafeConfig';
import { Star, ExternalLink, CheckCircle2 } from 'lucide-react';
import { ScrollReveal } from './common/ScrollReveal';

// Official Multi-Color Google "G" Icon SVG
const GoogleIcon: React.FC<{ className?: string }> = ({ className = "w-4 h-4" }) => (
  <svg viewBox="0 0 24 24" className={className} fill="none">
    <path
      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
      fill="#4285F4"
    />
    <path
      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
      fill="#34A853"
    />
    <path
      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
      fill="#FBBC05"
    />
    <path
      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
      fill="#EA4335"
    />
  </svg>
);

export const ReviewsSection: React.FC = () => {
  const { t, lang } = useLanguage();

  // 4 Top Real Verbatim Google Maps Reviews from Grand Cafe listing
  const reviews = [
    {
      id: 1,
      name: 'Ahmed Elghandour',
      nameAr: 'أحمد الغندور',
      avatarBg: 'bg-emerald-600',
      initial: 'A',
      rating: 5,
      dateAr: 'قبل 4 أشهر',
      dateEn: '4 months ago',
      badgeAr: 'مراجعتان (2) • 27 صورة',
      badgeEn: '2 reviews • 27 photos',
      commentAr: 'مكان جميل',
      commentEn: 'Beautiful place',
      tagAr: 'تقييم 5 نجوم',
      tagEn: '5-Star Rating',
    },
    {
      id: 2,
      name: 'Ahmed Abouzaid',
      nameAr: 'أحمد أبو زيد',
      avatarBg: 'bg-blue-600',
      initial: 'A',
      rating: 5,
      dateAr: 'زيارة داخل المكان',
      dateEn: 'Dine-in Visit',
      badgeAr: 'مراجعتان (2) • 3 صور',
      badgeEn: '2 reviews • 3 photos',
      commentAr: 'كافيه جميل جدا',
      commentEn: 'Very beautiful cafe',
      tagAr: 'زيارة داخل المكان',
      tagEn: 'Dine-in Experience',
    },
    {
      id: 3,
      name: 'محمود الحاوي',
      nameAr: 'محمود الحاوي',
      avatarBg: 'bg-amber-600',
      initial: 'م',
      rating: 5,
      dateAr: 'مُرشد محلي معتمد',
      dateEn: 'Local Guide',
      badgeAr: 'مرشد محلي (Local Guide) • 63 مراجعة',
      badgeEn: 'Local Guide • 63 reviews',
      commentAr: 'كافية كويس جدا وكما هو',
      commentEn: 'A very good cafe and as it is',
      tagAr: 'Local Guide',
      tagEn: 'Local Guide',
    },
    {
      id: 4,
      name: 'ahmed mostfa',
      nameAr: 'أحمد مصطفى',
      avatarBg: 'bg-rose-600',
      initial: 'A',
      rating: 5,
      dateAr: 'قبل سنة',
      dateEn: '1 year ago',
      badgeAr: '7 مراجعات • 13 صورة',
      badgeEn: '7 reviews • 13 photos',
      commentAr: 'مكان ممتاز',
      commentEn: 'Excellent place',
      tagAr: 'تقييم معتمد',
      tagEn: 'Verified Review',
    },
  ];

  return (
    <section id="reviews" className="py-24 bg-cafe-cream dark:bg-cafe-espresso border-t border-cafe-amber/15 relative overflow-hidden transition-colors duration-300">

      {/* Subtle Background Glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[500px] h-[300px] bg-amber-500/5 blur-3xl rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Section Header with Official Google Trust Badge */}
        <ScrollReveal direction="up">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 gap-6">
            <div>
              <span className="text-xs font-extrabold tracking-widest text-cafe-amber uppercase mb-2 block flex items-center gap-1.5">
                <GoogleIcon className="w-4 h-4" />
                {t('reviews.badge')}
              </span>
              <h2 className="text-3xl sm:text-5xl font-extrabold text-cafe-espresso dark:text-cafe-cream">
                {t('reviews.title')}
              </h2>

              {/* Google Rating Counter */}
              <div className="flex flex-wrap items-center gap-3 mt-3">
                <div className="flex items-center gap-1 bg-white/90 dark:bg-white/10 px-3 py-1 rounded-full border border-cafe-amber/25 shadow-sm">
                  <GoogleIcon className="w-4 h-4" />
                  <span className="text-xs font-black text-cafe-espresso dark:text-white">Google</span>
                  <div className="flex items-center gap-0.5 ms-1.5">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <span className="text-xs font-mono font-bold text-cafe-espresso dark:text-white ms-1">
                    4.9 / 5.0
                  </span>
                </div>
                <span className="text-xs text-cafe-muted-light dark:text-cafe-warm/75 font-medium">
                  {lang === 'ar' ? 'بناءً على أكثر من 90+ تقييم لزوار حقيقيين' : 'Based on 90+ real customer reviews'}
                </span>
              </div>
            </div>

            {/* View on Google Maps Action Button */}
            <a
              href={cafeConfig.googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-xs font-extrabold px-5 py-3 rounded-full bg-cafe-surface-light dark:bg-white/10 text-cafe-espresso dark:text-white border border-cafe-amber/30 hover:border-cafe-gold hover:shadow-gold-glow transition-all shadow-sm whitespace-nowrap self-start md:self-auto"
            >
              <GoogleIcon className="w-4 h-4" />
              <span>{lang === 'ar' ? 'التحقق على خرائط Google' : 'Verify on Google Maps'}</span>
              <ExternalLink className="w-3.5 h-3.5 text-cafe-amber dark:text-cafe-gold" />
            </a>
          </div>
        </ScrollReveal>

        {/* 4 Authentic Google Maps Review Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {reviews.map((rev, index) => (
            <ScrollReveal key={rev.id} direction="up" delay={index * 0.1}>
              <a
                href={cafeConfig.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative p-5 sm:p-6 rounded-3xl bg-cafe-surface-light dark:bg-cafe-surface-dark border border-cafe-amber/20 shadow-warm-sm hover:border-cafe-gold hover:shadow-warm-md transition-all duration-300 flex flex-col justify-between h-full block"
              >
                <div>
                  {/* Reviewer Header: Avatar + Name + Google Logo */}
                  <div className="flex items-start justify-between gap-3 mb-3.5">
                    <div className="flex items-center gap-2.5">
                      {/* Google-style Colorful Avatar Initial */}
                      <div className={`w-9 h-9 rounded-full ${rev.avatarBg} text-white font-extrabold text-sm flex items-center justify-center flex-shrink-0 shadow-sm`}>
                        {rev.initial}
                      </div>

                      <div className="min-w-0">
                        <h4 className="text-xs sm:text-sm font-extrabold text-cafe-espresso dark:text-cafe-cream truncate">
                          {lang === 'ar' ? rev.nameAr : rev.name}
                        </h4>
                        <div className="flex items-center gap-1 text-[10px] text-cafe-muted-light dark:text-cafe-warm/60 font-medium">
                          <span>{lang === 'ar' ? rev.dateAr : rev.dateEn}</span>
                        </div>
                      </div>
                    </div>

                    {/* Google G Logo Badge on Card */}
                    <div className="w-6 h-6 rounded-full bg-white dark:bg-white/10 p-1 flex items-center justify-center flex-shrink-0 border border-cafe-amber/15 shadow-sm">
                      <GoogleIcon className="w-3.5 h-3.5" />
                    </div>
                  </div>

                  {/* Stars Rating & Tag */}
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <div className="flex items-center gap-0.5">
                      {[...Array(rev.rating)].map((_, i) => (
                        <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                      ))}
                    </div>
                    <span className="text-[9px] font-bold px-2 py-0.5 rounded-full bg-cafe-amber/10 text-cafe-amber dark:text-cafe-gold border border-cafe-amber/20 truncate">
                      {lang === 'ar' ? rev.tagAr : rev.tagEn}
                    </span>
                  </div>

                  {/* Review Text */}
                  <p className="text-xs sm:text-sm text-cafe-espresso/90 dark:text-cafe-cream/90 leading-relaxed font-medium">
                    "{lang === 'ar' ? rev.commentAr : rev.commentEn}"
                  </p>
                </div>

                {/* Card Bottom: Verified Google Pin */}
                <div className="pt-3.5 mt-3.5 border-t border-cafe-amber/15 flex items-center justify-between text-[10px] font-bold text-cafe-muted-light dark:text-cafe-warm/70 group-hover:text-cafe-amber transition-colors">
                  <span className="flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3 text-emerald-500 flex-shrink-0" />
                    <span className="truncate">{lang === 'ar' ? rev.badgeAr : rev.badgeEn}</span>
                  </span>
                  <ExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0" />
                </div>

              </a>
            </ScrollReveal>
          ))}
        </div>

      </div>
    </section>
  );
};
