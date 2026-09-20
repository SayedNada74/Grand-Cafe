import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { cafeConfig } from '../config/cafeConfig';
import { Instagram, ExternalLink, Heart, MessageCircle, Play, CheckCircle2 } from 'lucide-react';
import { ScrollReveal } from './common/ScrollReveal';

interface InstagramPost {
  id: number;
  type: 'video' | 'image';
  mediaSrc: string;
  postUrl: string;
  titleAr: string;
  titleEn: string;
  tagAr: string;
  tagEn: string;
  likes: number;
  comments: number;
}

export const InstagramSection: React.FC = () => {
  const { t, lang } = useLanguage();

  const posts: InstagramPost[] = [
    {
      id: 1,
      type: 'video',
      mediaSrc: '/assets/instagram/post1_reel.mp4',
      postUrl: 'https://www.instagram.com/reel/DOs_RlhjHYc/?stkn=MXY1bHo1N3U2Z3FvZQ==',
      titleAr: 'أجواء ولمة جراند كافيه الساحرة',
      titleEn: 'Grand Cafe Cozy Ambiance',
      tagAr: 'ريل • أجواء الكافيه',
      tagEn: 'Reel • Cafe Vibes',
      likes: 428,
      comments: 36
    },
    {
      id: 2,
      type: 'image',
      mediaSrc: '/assets/instagram/post2_croissant.jpeg',
      postUrl: 'https://www.instagram.com/p/DZVnyOigqir/?stkn=dzJjOXA4d25xMzF2',
      titleAr: 'ساندوتش كرواسون تركي مع آيس درينك مثلج',
      titleEn: 'Turkey Croissant & Layered Iced Drink',
      tagAr: 'فطار وروقان الصباح',
      tagEn: 'Morning Breakfast Special',
      likes: 365,
      comments: 29
    },
    {
      id: 3,
      type: 'video',
      mediaSrc: '/assets/instagram/post3_reel.mp4',
      postUrl: 'https://www.instagram.com/reel/DZYP7r-Cjaf/?stkn=MW40dGthdHo1MXNmag==',
      titleAr: 'تحضير سموكيد كرواسون',
      titleEn: 'Crafting Smoked croissants',
      tagAr: 'ريل • تحضير سموكيد كرواسون',
      tagEn: 'Reel • Smoked croissants',
      likes: 512,
      comments: 48
    },
    {
      id: 4,
      type: 'image',
      mediaSrc: '/assets/instagram/post4_drinks.jpeg',
      postUrl: 'https://www.instagram.com/p/DTfiaxZjNqs/?stkn=cXJ1bHZ5OXFzNjRw',
      titleAr: 'تشكيلة موهيتو بنكهات الفواكه المنعشة',
      titleEn: 'Colorful Fruit Mojitos Lineup',
      tagAr: 'موهيتو ومشروبات مميزة',
      tagEn: 'Specialty Mojitos',
      likes: 389,
      comments: 31
    }
  ];

  return (
    <section id="instagram" className="py-24 bg-cafe-warm/40 dark:bg-cafe-dark border-t border-cafe-amber/15 relative overflow-hidden transition-colors duration-300">

      {/* Background Subtle Gradient Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-gradient-to-tr from-pink-500/5 via-amber-500/5 to-purple-500/5 blur-3xl pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Section Header */}
        <ScrollReveal direction="up">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
            <div>
              <span className="text-xs font-extrabold tracking-widest text-cafe-amber uppercase mb-2 block flex items-center gap-1.5">
                <Instagram className="w-4 h-4 text-pink-500" />
                {t('insta.badge')}
              </span>
              <h2 className="text-3xl sm:text-5xl font-extrabold text-cafe-espresso dark:text-cafe-cream">
                {t('insta.title')}
              </h2>
              <p className="text-sm sm:text-base text-cafe-muted-light dark:text-cafe-warm/75 mt-2 max-w-xl">
                {lang === 'ar'
                  ? 'تابع أحدث لحظاتنا، عروضنا الحصرية، وكواليس تحضير مشروبات ومخبوزات جراند كافيه يومياً.'
                  : 'Follow our daily moments, exclusive deals, and behind-the-scenes treats every day.'}
              </p>
            </div>

            {/* Profile CTA Pill */}
            <a
              href={cafeConfig.instagram.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 text-xs font-extrabold px-6 py-3.5 rounded-full bg-gradient-to-r from-purple-600 via-pink-600 to-amber-500 text-white shadow-lg hover:shadow-pink-500/25 hover:brightness-105 active:scale-95 transition-all self-start md:self-auto"
            >
              <Instagram className="w-4 h-4" />
              <span>{t('insta.followBtn')}</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </ScrollReveal>

        {/* Profile Card Banner */}
        <ScrollReveal direction="up" delay={0.1}>
          <div className="mb-10 p-4 sm:p-6 rounded-3xl bg-cafe-surface-light dark:bg-cafe-surface-dark border border-cafe-amber/20 shadow-warm-sm flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              {/* Instagram Story Gradient Ring around Logo */}
              <div className="p-1 rounded-full bg-gradient-to-tr from-amber-400 via-rose-500 to-purple-600 shadow-md flex-shrink-0">
                <div className="p-0.5 bg-cafe-cream dark:bg-cafe-espresso rounded-full">
                  <img
                    src={cafeConfig.assets.logo}
                    alt="Grand Cafe"
                    className="w-12 h-12 rounded-full object-cover"
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center gap-1.5">
                  <span className="font-extrabold text-base sm:text-lg text-cafe-espresso dark:text-white">
                    {cafeConfig.instagram.handle}
                  </span>
                  <CheckCircle2 className="w-4 h-4 text-blue-500 fill-blue-500/20" />
                </div>
                <p className="text-xs text-cafe-muted-light dark:text-cafe-warm/75 font-medium mt-0.5">
                  Since 2014 • Welcome to Grand Cafe • Enjoy your time. see you again 🫶
                </p>
              </div>
            </div>

            <a
              href={cafeConfig.instagram.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs font-bold px-4 py-2 rounded-xl bg-cafe-amber/15 dark:bg-white/10 hover:bg-cafe-amber hover:text-white dark:hover:bg-cafe-gold dark:hover:text-cafe-espresso border border-cafe-amber/25 transition-all text-cafe-amber dark:text-cafe-gold flex items-center gap-1.5 whitespace-nowrap"
            >
              <span>{lang === 'ar' ? 'عرض الصفحة الرسمية' : 'View Official Profile'}</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </ScrollReveal>

        {/* Real Instagram Posts Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {posts.map((post, index) => (
            <ScrollReveal key={post.id} direction="up" delay={index * 0.1}>
              <a
                href={post.postUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative rounded-3xl overflow-hidden aspect-[4/5] border border-cafe-amber/20 shadow-warm-sm hover:shadow-warm-lg transition-all duration-300 block bg-cafe-surface-dark/90"
              >
                {/* Media: Video Reel or Photo */}
                {post.type === 'video' ? (
                  <video
                    src={post.mediaSrc}
                    autoPlay
                    loop
                    muted
                    playsInline
                    preload="metadata"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                ) : (
                  <img
                    src={post.mediaSrc}
                    alt={lang === 'ar' ? post.titleAr : post.titleEn}
                    loading="lazy"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                )}

                {/* Top Floating Badge (Reel or Photo Indicator) */}
                <div className="absolute top-3.5 right-3.5 z-10">
                  <div className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/20 text-white text-[10px] font-bold shadow-sm">
                    {post.type === 'video' ? (
                      <>
                        <Play className="w-3 h-3 fill-white text-white" />
                        <span>Reel</span>
                      </>
                    ) : (
                      <>
                        <Instagram className="w-3 h-3 text-pink-400" />
                        <span>Post</span>
                      </>
                    )}
                  </div>
                </div>

                {/* Bottom Permanent Caption Bar */}
                <div className="absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-black/90 via-black/50 to-transparent text-white z-10 transition-opacity duration-300">
                  <span className="text-[10px] font-bold text-cafe-gold tracking-wide block mb-1">
                    {lang === 'ar' ? post.tagAr : post.tagEn}
                  </span>
                  <p className="text-xs font-bold line-clamp-2 leading-relaxed text-white/95">
                    {lang === 'ar' ? post.titleAr : post.titleEn}
                  </p>
                </div>

                {/* Hover Instagram Engagement Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-purple-950/90 via-black/70 to-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center gap-3 p-6 text-white z-20">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-purple-600 via-pink-600 to-amber-500 flex items-center justify-center shadow-lg transform group-hover:scale-110 transition-transform">
                    <Instagram className="w-6 h-6 text-white" />
                  </div>

                  <div className="flex items-center gap-5 text-sm font-bold">
                    <div className="flex items-center gap-1.5">
                      <Heart className="w-4 h-4 text-rose-500 fill-rose-500" />
                      <span>{post.likes}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <MessageCircle className="w-4 h-4 text-white fill-white/30" />
                      <span>{post.comments}</span>
                    </div>
                  </div>

                  <div className="inline-flex items-center gap-1.5 text-xs font-bold px-4 py-2 rounded-full bg-white/20 hover:bg-white text-white hover:text-black border border-white/30 transition-colors mt-2">
                    <span>{lang === 'ar' ? 'عرض على إنستجرام' : 'View on Instagram'}</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </div>
                </div>

              </a>
            </ScrollReveal>
          ))}
        </div>

      </div>
    </section>
  );
};
