import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingBag } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { useLanguage } from '../../context/LanguageContext';

export const CartButton: React.FC = () => {
  const { totalItems, setCartOpen, totalPrice } = useCart();
  const { t, isRtl } = useLanguage();

  return (
    <AnimatePresence>
      {totalItems > 0 && (
        <motion.button
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0, opacity: 0 }}
          transition={{ type: 'spring', damping: 20, stiffness: 300 }}
          onClick={() => setCartOpen(true)}
          className={`fixed z-40 bottom-20 sm:bottom-8 ${isRtl ? 'left-4 sm:left-8' : 'right-4 sm:right-8'} bg-gold-gradient text-cafe-espresso rounded-full shadow-warm-lg hover:shadow-gold-glow transition-shadow flex items-center gap-3 px-5 py-3.5`}
          aria-label={t('cart.title')}
        >
          <div className="relative">
            <ShoppingBag className="w-5 h-5" />
            <motion.span
              key={totalItems}
              initial={{ scale: 0.5 }}
              animate={{ scale: 1 }}
              className="absolute -top-2.5 -right-2.5 w-5 h-5 rounded-full bg-cafe-espresso text-cafe-cream text-[10px] font-bold flex items-center justify-center"
            >
              {totalItems}
            </motion.span>
          </div>
          <span className="text-sm font-bold">
            {totalPrice} {t('menu.currency')}
          </span>
        </motion.button>
      )}
    </AnimatePresence>
  );
};
