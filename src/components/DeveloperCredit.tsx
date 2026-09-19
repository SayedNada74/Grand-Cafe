import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Globe, Instagram, Facebook, ArrowUpRight } from 'lucide-react';

interface DeveloperCreditProps {
  align?: 'left' | 'center' | 'right';
  direction?: 'up' | 'down';
  compact?: boolean;
  className?: string;
}

export const DeveloperCredit: React.FC<DeveloperCreditProps> = ({
  align = 'center',
  direction = 'up',
  compact = false,
  className = '',
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Close on click outside or escape key
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen]);

  const socialLinks = [
    {
      name: 'Portfolio',
      href: 'https://sayed-nada-portfolio.vercel.app/',
      icon: Globe,
      handle: 'sayed-nada.vercel.app',
    },
    {
      name: 'Instagram',
      href: 'https://www.instagram.com/sayed_nada_7?igsi=MWI1YmpxejA5YTV2aQ%3D%3D',
      icon: Instagram,
      handle: '@sayed_nada_7',
    },
    {
      name: 'Facebook',
      href: 'https://www.facebook.com/elsayed.mahmoud.nada?rdid=3YDtjKeyZmZgYYKq&share_url=https%3A%2F%2Fwww.facebook.com%2Fshare%2F1EiVuvAo5z%2F#',
      icon: Facebook,
      handle: 'Sayed Mahmoud Nada',
    },
  ];

  const alignmentClass =
    align === 'left'
      ? 'left-0'
      : align === 'right'
      ? 'right-0'
      : 'left-1/2';

  const xOffset = align === 'center' ? '-50%' : '0%';

  const directionClass =
    direction === 'up' ? 'bottom-full mb-2.5' : 'top-full mt-2.5';

  return (
    <div ref={containerRef} className={`relative inline-block ${className}`}>
      {/* Pill Capsule Button */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        aria-haspopup="true"
        title="Sayed Nada - Developer & Designer"
        className={`group relative flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold transition-all duration-300 select-none
          bg-cafe-warm/80 hover:bg-cafe-warm/95
          dark:bg-cafe-surface-dark/85 dark:hover:bg-cafe-surface-dark
          backdrop-blur-md
          border border-cafe-amber/30 hover:border-cafe-gold
          dark:border-cafe-gold/30 dark:hover:border-cafe-gold/60
          text-cafe-espresso dark:text-cafe-cream
          shadow-sm hover:shadow-warm-sm
          active:scale-95
          ${isOpen ? 'ring-2 ring-cafe-gold/40 border-cafe-gold shadow-gold-glow' : ''}
        `}
      >
        {/* Subtle Indicator Dot */}
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cafe-gold opacity-60" />
          <span className="relative inline-flex rounded-full h-2 w-2 bg-cafe-amber dark:bg-cafe-gold" />
        </span>

        {/* Text */}
        <span className="font-sans font-bold tracking-tight text-[11px] sm:text-xs">
          <span className={compact ? 'hidden xl:inline' : 'inline'}>Developed by </span>
          <span className="font-extrabold text-cafe-amber dark:text-cafe-gold">Sayed Nada</span>
        </span>

        {/* Code Badge */}
        <span className="font-mono text-[10px] font-black px-1.5 py-0.5 rounded bg-cafe-amber/15 dark:bg-cafe-gold/15 text-cafe-amber dark:text-cafe-gold border border-cafe-amber/25 dark:border-cafe-gold/30 transition-colors">
          &lt;/&gt;
        </span>
      </button>

      {/* Floating Popover Card - Perfectly centered directly over capsule */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            dir="ltr"
            initial={{ opacity: 0, y: direction === 'up' ? 8 : -8, scale: 0.95, x: xOffset }}
            animate={{ opacity: 1, y: 0, scale: 1, x: xOffset }}
            exit={{ opacity: 0, y: direction === 'up' ? 6 : -6, scale: 0.95, x: xOffset }}
            transition={{ type: 'spring', damping: 25, stiffness: 350 }}
            className={`absolute ${directionClass} ${alignmentClass} z-50 w-64 p-3 rounded-2xl
              bg-white/95 dark:bg-[#18110b]/95
              backdrop-blur-xl
              border border-cafe-amber/30 dark:border-cafe-gold/30
              shadow-[0_12px_32px_rgba(45,30,20,0.14)] dark:shadow-[0_16px_40px_rgba(0,0,0,0.7)]
              transition-colors duration-300 text-left
            `}
          >
            {/* Header: Clear Title - Clarifying Developer & Designer role (not cafe owner) */}
            <div className="pb-2 mb-2 px-1 border-b border-cafe-amber/15 dark:border-white/10 flex items-center justify-between">
              <span className="text-[10px] font-black tracking-widest uppercase text-cafe-amber dark:text-cafe-gold">
                DEVELOPER & DESIGNER
              </span>
              <span className="font-mono text-[9px] font-bold px-1.5 py-0.5 rounded bg-cafe-amber/10 dark:bg-cafe-gold/10 text-cafe-amber dark:text-cafe-gold border border-cafe-amber/20 dark:border-cafe-gold/20">
                &lt;/&gt;
              </span>
            </div>

            {/* Links List - 100% Vertically Aligned in 3 Clean Columns */}
            <div className="space-y-1">
              {socialLinks.map((item) => {
                const IconComponent = item.icon;
                return (
                  <a
                    key={item.name}
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center justify-between px-2.5 py-2 rounded-xl transition-all duration-200
                      hover:bg-cafe-warm/70 dark:hover:bg-white/[0.08]
                      text-cafe-espresso dark:text-cafe-cream"
                  >
                    {/* Left: Icon (Fixed Width) + Label (Strict Left-Aligned) */}
                    <div className="flex items-center gap-3 min-w-0 flex-1">
                      <div className="w-5 h-5 flex items-center justify-center flex-shrink-0 text-cafe-espresso/80 dark:text-cafe-cream/80 group-hover:text-cafe-amber dark:group-hover:text-cafe-gold transition-colors">
                        <IconComponent className="w-4 h-4" />
                      </div>

                      <div className="flex flex-col min-w-0 text-left">
                        <span className="text-xs font-bold truncate text-cafe-espresso dark:text-cafe-cream group-hover:text-cafe-amber dark:group-hover:text-cafe-gold transition-colors">
                          {item.name}
                        </span>
                        <span className="text-[10px] text-cafe-muted-light dark:text-cafe-warm/50 truncate font-mono">
                          {item.handle}
                        </span>
                      </div>
                    </div>

                    {/* Right: Sleek Arrow */}
                    <ArrowUpRight className="w-3.5 h-3.5 text-cafe-muted-light/60 dark:text-cafe-warm/40 group-hover:text-cafe-amber dark:group-hover:text-cafe-gold transition-all group-hover:translate-x-0.5 group-hover:-translate-y-0.5 flex-shrink-0 ms-2" />
                  </a>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
