import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Plus, Minus, Trash2, ShoppingBag, ArrowRight, ArrowLeft, Coffee } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { useLanguage } from '../../context/LanguageContext';

export const CartDrawer: React.FC = () => {
  const { items, isCartOpen, setCartOpen, updateQuantity, removeItem, clearCart, totalPrice, totalItems, setCheckoutOpen } = useCart();
  const { t, lang, isRtl } = useLanguage();
  const [confirmClear, setConfirmClear] = useState(false);

  const handleCheckout = () => {
    setCartOpen(false);
    setTimeout(() => setCheckoutOpen(true), 200);
  };

  const handleClearCart = () => {
    if (confirmClear) {
      clearCart();
      setConfirmClear(false);
    } else {
      setConfirmClear(true);
      setTimeout(() => setConfirmClear(false), 3000);
    }
  };

  return (
    <AnimatePresence>
      {isCartOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[60]"
            onClick={() => setCartOpen(false)}
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: isRtl ? '-100%' : '100%' }}
            animate={{ x: 0 }}
            exit={{ x: isRtl ? '-100%' : '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            className={`fixed top-0 ${isRtl ? 'left-0' : 'right-0'} h-full w-full sm:max-w-[420px] z-[60] bg-cafe-surface-light dark:bg-cafe-dark shadow-warm-lg flex flex-col`}
          >
            {/* Header */}
            <div className="flex items-center justify-between p-5 border-b border-cafe-amber/15 flex-shrink-0">
              <div className="flex items-center gap-3">
                <ShoppingBag className="w-5 h-5 text-cafe-amber" />
                <h2 className="text-lg font-bold text-cafe-espresso dark:text-cafe-cream">
                  {t('cart.title')}
                </h2>
                {totalItems > 0 && (
                  <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-cafe-amber/10 text-cafe-amber">
                    {totalItems} {t('cart.itemsCount')}
                  </span>
                )}
              </div>
              <button
                onClick={() => setCartOpen(false)}
                className="w-8 h-8 rounded-full bg-cafe-amber/10 text-cafe-amber flex items-center justify-center hover:bg-cafe-amber/20 transition-colors"
                aria-label="Close cart"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Cart Items */}
            <div className="flex-1 overflow-y-auto p-5 space-y-4">
              {/* Cafe Welcome Note */}
              {items.length > 0 && (
                <div className="px-4 py-2.5 rounded-2xl bg-cafe-amber/10 border border-cafe-amber/20 flex items-center gap-2.5 text-xs text-cafe-amber dark:text-cafe-gold font-bold">
                  <Coffee className="w-4 h-4 text-cafe-amber dark:text-cafe-gold flex-shrink-0" />
                  <span>{lang === 'ar' ? 'مخبوزاتنا طازجة يومياً ومشروباتنا تحضر بكل حب' : 'Freshly baked daily & crafted with passion'}</span>
                </div>
              )}

              {items.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-center py-12">
                  <div className="w-20 h-20 rounded-full bg-cafe-amber/10 flex items-center justify-center mb-4">
                    <ShoppingBag className="w-10 h-10 text-cafe-amber/50" />
                  </div>
                  <h3 className="text-lg font-bold text-cafe-espresso dark:text-cafe-cream mb-2">
                    {t('cart.empty')}
                  </h3>
                  <p className="text-sm text-cafe-muted-light dark:text-cafe-muted-dark mb-6 max-w-xs">
                    {t('cart.emptyDesc')}
                  </p>
                  <a
                    href="#menu"
                    onClick={() => setCartOpen(false)}
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gold-gradient text-cafe-espresso font-bold text-sm hover:shadow-gold-glow transition-all"
                  >
                    {t('cart.exploreMenu')}
                  </a>
                </div>
              ) : (
                <AnimatePresence mode="popLayout">
                  {items.map((ci) => {
                    const addOnsPrice = ci.selectedAddOns.reduce((s, a) => s + a.price, 0);
                    const unitPrice = ci.item.price + addOnsPrice;
                    const subtotal = unitPrice * ci.quantity;
                    return (
                      <motion.div
                        key={ci.cartItemId}
                        layout
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, x: isRtl ? 100 : -100 }}
                        className="bg-cafe-warm/40 dark:bg-cafe-surface-dark rounded-2xl p-3.5 border border-cafe-amber/20 shadow-warm-sm"
                      >
                        <div className="flex items-start gap-3 mb-3">
                          {/* Item Thumbnail */}
                          {ci.item.image ? (
                            <div className="w-14 h-14 rounded-xl overflow-hidden flex-shrink-0 border border-cafe-amber/20 bg-cafe-warm">
                              <img src={ci.item.image} alt={ci.item.nameAr} className="w-full h-full object-cover" />
                            </div>
                          ) : (
                            <div className="w-14 h-14 rounded-xl flex items-center justify-center flex-shrink-0 bg-cafe-amber/10 text-cafe-amber border border-cafe-amber/15">
                              <ShoppingBag className="w-6 h-6 opacity-40" />
                            </div>
                          )}

                          {/* Info */}
                          <div className="flex-1 min-w-0">
                            <div className="flex items-start justify-between gap-1">
                              <h4 className="text-sm font-bold text-cafe-espresso dark:text-cafe-cream truncate">
                                {lang === 'ar' ? ci.item.nameAr : ci.item.nameEn}
                              </h4>
                              <button
                                onClick={() => removeItem(ci.cartItemId)}
                                className="w-7 h-7 rounded-lg text-cafe-muted-light dark:text-cafe-muted-dark hover:text-red-500 hover:bg-red-500/10 flex items-center justify-center transition-colors flex-shrink-0"
                                aria-label={t('cart.removeItem')}
                                title={t('cart.removeItem')}
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                            <span className="text-[11px] text-cafe-muted-light dark:text-cafe-muted-dark block">
                              {lang === 'ar' ? ci.item.nameEn : ci.item.nameAr}
                            </span>
                            {ci.selectedAddOns.length > 0 && (
                              <div className="mt-1.5 flex flex-wrap gap-1">
                                {ci.selectedAddOns.map(addon => (
                                  <span key={addon.id} className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-cafe-amber/15 text-cafe-amber border border-cafe-amber/25">
                                    + {lang === 'ar' ? addon.nameAr : addon.nameEn}
                                  </span>
                                ))}
                              </div>
                            )}
                          </div>
                        </div>

                        <div className="flex items-center justify-between pt-2.5 border-t border-cafe-amber/10">
                          {/* Quantity Stepper: unified sleek capsule */}
                          <div className="inline-flex items-center rounded-xl bg-cafe-warm/80 dark:bg-cafe-card-dark border border-cafe-amber/25 p-0.5 gap-1 shadow-inner" dir="ltr">
                            <button
                              onClick={() => updateQuantity(ci.cartItemId, ci.quantity - 1)}
                              className="w-7 h-7 rounded-lg bg-cafe-amber/10 dark:bg-cafe-surface-dark text-cafe-espresso dark:text-cafe-cream hover:bg-cafe-amber hover:text-cafe-espresso active:scale-90 transition-all flex items-center justify-center border border-cafe-amber/20"
                              aria-label="Decrease quantity"
                            >
                              <Minus className="w-3 h-3 stroke-[2.5]" />
                            </button>
                            <span className="w-7 text-center text-xs font-black text-cafe-espresso dark:text-cafe-cream font-mono">
                              {ci.quantity}
                            </span>
                            <button
                              onClick={() => updateQuantity(ci.cartItemId, ci.quantity + 1)}
                              className="w-7 h-7 rounded-lg bg-gold-gradient text-cafe-espresso hover:brightness-110 active:scale-90 shadow-sm transition-all flex items-center justify-center font-bold"
                              aria-label="Increase quantity"
                            >
                              <Plus className="w-3 h-3 stroke-[2.5]" />
                            </button>
                          </div>

                          {/* Subtotal */}
                          <div className="flex items-baseline gap-1">
                            <span className="text-base font-black text-cafe-gold font-mono">
                              {subtotal}
                            </span>
                            <span className="text-[11px] font-bold text-cafe-muted-light dark:text-cafe-muted-dark">
                              {t('menu.currency')}
                            </span>
                          </div>
                        </div>
                      </motion.div>
                    );
                  })}
                </AnimatePresence>
              )}
            </div>

            {/* Footer */}
            {items.length > 0 && (
              <div className="border-t border-cafe-amber/15 p-5 space-y-4 bg-cafe-warm/20 dark:bg-cafe-espresso flex-shrink-0">
                <button
                  onClick={handleClearCart}
                  className="text-xs font-semibold text-red-500 hover:text-red-400 transition-colors"
                >
                  {confirmClear ? t('cart.clearConfirm') : t('cart.clearCart')}
                </button>

                <div className="flex items-center justify-between">
                  <span className="text-base font-semibold text-cafe-espresso dark:text-cafe-cream">
                    {t('cart.total')}
                  </span>
                  <span className="text-xl font-extrabold text-cafe-gold">
                    {totalPrice} {t('menu.currency')}
                  </span>
                </div>

                <button
                  onClick={handleCheckout}
                  className="w-full py-4 rounded-xl bg-gold-gradient text-cafe-espresso font-bold text-base hover:shadow-gold-glow transition-all transform hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-2"
                >
                  <span>{t('cart.checkout')}</span>
                  {isRtl ? <ArrowLeft className="w-4 h-4" /> : <ArrowRight className="w-4 h-4" />}
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
