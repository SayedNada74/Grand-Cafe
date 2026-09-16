import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export const CustomCursor: React.FC = () => {
  const [mousePosition, setMousePosition] = useState({ x: -100, y: -100 });
  const [isHovered, setIsHovered] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Only run on non-touch devices
    if (window.matchMedia('(pointer: coarse)').matches) return;

    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    const handleMouseEnter = () => {
      setIsVisible(true);
    };

    // Check hover targets for interactive elements & text
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (target?.closest('button, a, input, textarea, select, [role="button"], .cursor-pointer, h1, h2, h3, h4, p, label')) {
        setIsHovered(true);
      } else {
        setIsHovered(false);
      }
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('mouseover', handleMouseOver, { passive: true });
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseover', handleMouseOver);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
    };
  }, [isVisible]);

  if (!isVisible) return null;

  return (
    <div className="hidden lg:block pointer-events-none fixed inset-0 z-[9999] overflow-hidden">
      {/* Outer Halo Ring - Completely clear, zero blur, gentle zoom on text/buttons */}
      <motion.div
        className="fixed top-0 left-0 rounded-full border border-cafe-gold/60 bg-cafe-gold/[0.04] pointer-events-none shadow-[0_0_12px_rgba(212,175,55,0.2)]"
        animate={{
          x: mousePosition.x - (isHovered ? 26 : 14),
          y: mousePosition.y - (isHovered ? 26 : 14),
          width: isHovered ? 52 : 28,
          height: isHovered ? 52 : 28,
          scale: isHovered ? 1.25 : 1,
          opacity: isHovered ? 0.95 : 0.75,
        }}
        transition={{
          type: 'spring',
          damping: 26,
          stiffness: 320,
          mass: 0.45,
        }}
      />
      {/* Inner Pinpoint Glow */}
      <motion.div
        className="fixed top-0 left-0 w-1.5 h-1.5 rounded-full bg-cafe-gold shadow-[0_0_6px_rgba(212,175,55,0.9)] pointer-events-none"
        animate={{
          x: mousePosition.x - 3,
          y: mousePosition.y - 3,
          scale: isHovered ? 0.75 : 1,
          opacity: isHovered ? 0.6 : 1,
        }}
        transition={{
          type: 'spring',
          damping: 35,
          stiffness: 800,
          mass: 0.1,
        }}
      />
    </div>
  );
};
