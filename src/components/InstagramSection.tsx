import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { cafeConfig } from '../config/cafeConfig';
import { Instagram, ExternalLink } from 'lucide-react';
import { ImageModal } from './ImageModal';

export const InstagramSection: React.FC = () => {
  const { t, lang } = useLanguage();
  const [selectedPost, setSelectedPost] = useState<{ image: string; titleAr: string; titleEn: string } | null>(null);

  const posts = [
    {
      id: 1,
      image: '/assets/caffe_latte.jpg',
      titleAr: 'قهوة لاتيه جراند كافيه',
      titleEn: 'Grand Cafe Latte'
    },
    {
      id: 2,
      image: '/assets/chocolate_cake.jpeg',
      titleAr: 'شوكليت كيك جراند كافيه',
      titleEn: 'Grand Cafe Chocolate Cake'
    },
    {
      id: 3,
      image: '/assets/outdoor_seating.jpg',
      titleAr: 'جلسة جراند كافيه الفاخرة',
      titleEn: 'Grand Cafe Seating Ambiance'
    },
    {
      id: 4,
      image: '/assets/blue_passion_mojito.jpg',
      titleAr: 'موهيتو بلو باشن المنعش',
      titleEn: 'Grand Cafe Blue Passion Mojito'
    }
  ];

  // Helper to set ideal focal crop position for each Instagram photo
  const getFocalPosition = (id: number) => {
    switch (id) {
      case 1: return 'object-[center_70%]'; // صورة اللاتيه (تركيز على الكوب ورسمة القهوة)
      case 2: return 'object-[center_95%]'; // صورة الشوكليت كيك (تركيز على قطعة الكيك وعين الجمل)
      case 3: return 'object-[center_50%]'; // صورة الجلسة والواجهة
      case 4: return 'object-[center_73%]'; // صورة موهيتو بلو باشن (تركيز على المشروب واللوجو)
      default: return 'object-center';
    }
  };

  return (
    <section className="py-20 bg-cafe-warm/40 dark:bg-cafe-dark border-t border-cafe-amber/15 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <span className="text-xs font-extrabold tracking-widest text-cafe-amber uppercase mb-2 block flex items-center gap-1.5">
              <Instagram className="w-4 h-4 text-pink-500" />
              {t('insta.badge')}
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-cafe-espresso dark:text-cafe-cream">
              {t('insta.title')}
            </h2>
          </div>

          <a
            href={cafeConfig.instagram.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-xs font-extrabold px-6 py-3 rounded-full bg-gradient-to-r from-purple-600 via-pink-600 to-amber-500 text-white shadow-md hover:opacity-95 transition-all transform hover:scale-105"
          >
            <Instagram className="w-4 h-4" />
            <span>{t('insta.followBtn')}</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>

        {/* Clean Instagram Photo Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {posts.map((post) => (
            <div
              key={post.id}
              onClick={() => setSelectedPost(post)}
              className="group relative rounded-2xl overflow-hidden aspect-square border border-cafe-amber/20 shadow-warm-sm block cursor-pointer"
            >
              <img
                src={post.image}
                alt={lang === 'ar' ? post.titleAr : post.titleEn}
                loading="lazy"
                className={`w-full h-full object-cover ${getFocalPosition(post.id)} group-hover:scale-105 transition-transform duration-700`}
              />
            </div>
          ))}
        </div>

      </div>

      {/* Lightbox Popup Modal */}
      {selectedPost && (
        <ImageModal
          isOpen={!!selectedPost}
          onClose={() => setSelectedPost(null)}
          imageSrc={selectedPost.image}
          titleAr={selectedPost.titleAr}
          titleEn={selectedPost.titleEn}
          badgeText="INSTAGRAM @GRAND.CAFE0"
          descriptionAr="تفضل بزيارة حسابنا الرسمي على إنستجرام لمتابعة آخر صورنا وفيديوهاتنا الحصرية!"
          descriptionEn="Visit our official Instagram profile @grand.cafe0 for daily updates and exclusive stories!"
        />
      )}
    </section>
  );
};
