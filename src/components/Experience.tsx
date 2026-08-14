import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { Coffee, Laptop, Users, PartyPopper } from 'lucide-react';

export const Experience: React.FC = () => {
  const { t } = useLanguage();

  const experiences = [
    {
      icon: Coffee,
      title: t('exp.chill.title'),
      desc: t('exp.chill.desc'),
      color: 'from-amber-500/20 to-orange-500/10',
      borderColor: 'group-hover:border-amber-500/40',
      badge: '☕ Signature Roasts'
    },
    {
      icon: Laptop,
      title: t('exp.work.title'),
      desc: t('exp.work.desc'),
      color: 'from-blue-500/20 to-indigo-500/10',
      borderColor: 'group-hover:border-blue-500/40',
      badge: '⚡ Quiet & AC Zone'
    },
    {
      icon: Users,
      title: t('exp.gather.title'),
      desc: t('exp.gather.desc'),
      color: 'from-emerald-500/20 to-teal-500/10',
      borderColor: 'group-hover:border-emerald-500/40',
      badge: '👥 Indoor & Outdoor'
    },
    {
      icon: PartyPopper,
      title: t('exp.celebrate.title'),
      desc: t('exp.celebrate.desc'),
      color: 'from-rose-500/20 to-pink-500/10',
      borderColor: 'group-hover:border-rose-500/40',
      badge: '🎂 Birthdays & Events'
    },
  ];

  return (
    <section id="experience" className="py-24 bg-cafe-warm/40 dark:bg-cafe-dark relative overflow-hidden">
      
      {/* Background Subtle Pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(#C68B59_1px,transparent_1px)] [background-size:24px_24px] opacity-10 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-extrabold tracking-widest text-cafe-amber uppercase mb-2 block">
            {t('exp.badge')}
          </span>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-cafe-espresso dark:text-cafe-cream mb-4">
            {t('exp.title')}
          </h2>
          <p className="text-base sm:text-lg text-cafe-muted-light dark:text-cafe-muted-dark leading-relaxed">
            {t('exp.subtitle')}
          </p>
        </div>

        {/* 4 Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {experiences.map((item, index) => {
            const IconComponent = item.icon;
            return (
              <div
                key={index}
                className={`group relative p-8 rounded-2xl bg-cafe-surface-light dark:bg-cafe-surface-dark border border-cafe-amber/15 shadow-warm-sm hover:shadow-warm-md transition-all duration-300 transform hover:-translate-y-1 ${item.borderColor}`}
              >
                {/* Gradient Accent Overlay on Hover */}
                <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${item.color} opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none`} />

                <div className="relative z-10">
                  {/* Top Badge */}
                  <span className="inline-block text-[11px] font-semibold px-2.5 py-1 rounded-full bg-cafe-amber/10 text-cafe-amber mb-6 border border-cafe-amber/20">
                    {item.badge}
                  </span>

                  {/* Icon Container */}
                  <div className="w-14 h-14 rounded-xl bg-cafe-warm dark:bg-cafe-card-dark border border-cafe-amber/20 flex items-center justify-center mb-6 text-cafe-amber group-hover:scale-110 transition-transform duration-300">
                    <IconComponent className="w-7 h-7" />
                  </div>

                  {/* Title */}
                  <h3 className="text-xl font-bold text-cafe-espresso dark:text-cafe-cream mb-3">
                    {item.title}
                  </h3>

                  {/* Description */}
                  <p className="text-sm text-cafe-muted-light dark:text-cafe-muted-dark leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
