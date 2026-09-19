import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Plus, Minus, Check, ShoppingBag, Sparkles, Flame, Layers } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { useCart } from '../../context/CartContext';
import type { MenuItem, AddOn } from '../../data/menuData';

interface AddOnModalProps {
  isOpen: boolean;
  onClose: () => void;
  item: MenuItem;
  addOns: AddOn[];
}

export const AddOnModal: React.FC<AddOnModalProps> = ({ isOpen, onClose, item, addOns }) => {
  const { t, lang, isRtl } = useLanguage();
  const { addItem } = useCart();
  const [selected, setSelected] = useState<AddOn[]>([]);
  const [quantity, setQuantity] = useState(1);

  const toggleAddOn = (addon: AddOn) => {
    setSelected(prev =>
      prev.find(a => a.id === addon.id)
        ? prev.filter(a => a.id !== addon.id)
        : [...prev, addon]
    );
  };

  const addOnsTotal = selected.reduce((s, a) => s + a.price, 0);
  const unitPrice = item.price + addOnsTotal;
  const totalPrice = unitPrice * quantity;

  const handleAdd = () => {
    // Add item with quantity and selected add-ons
    for (let i = 0; i < quantity; i++) {
      addItem(item, selected.length > 0 ? selected : undefined);
    }
    setSelected([]);
    setQuantity(1);
    onClose();
  };

  const handleClose = () => {
    setSelected([]);
    setQuantity(1);
    onClose();
  };

  const renderAddOnIcon = (id: string) => {
    if (id.includes('doritos')) return <Flame className="w-4 h-4 text-cafe-amber dark:text-cafe-gold" />;
    if (id.includes('olive')) return <Layers className="w-4 h-4 text-cafe-amber dark:text-cafe-gold" />;
    return <Sparkles className="w-4 h-4 text-cafe-amber dark:text-cafe-gold" />;
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-black/75 backdrop-blur-md"
            onClick={handleClose}
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: 15 }}
            transition={{ type: 'spring', damping: 26, stiffness: 320 }}
            className="relative w-full max-w-md bg-cafe-surface-light dark:bg-cafe-dark rounded-3xl border border-cafe-amber/30 shadow-2xl overflow-hidden z-10 my-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Image Hero or Header Banner */}
            <div className="relative h-44 sm:h-48 w-full bg-cafe-warm dark:bg-cafe-espresso overflow-hidden">
              {item.image ? (
                <img
                  src={item.image}
                  alt={lang === 'ar' ? item.nameAr : item.nameEn}
                  className="w-full h-full object-cover object-center"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-cafe-amber/20 to-cafe-espresso/40">
                  <Sparkles className="w-16 h-16 text-cafe-gold/40" />
                </div>
              )}
              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-cafe-surface-light dark:from-cafe-dark via-black/40 to-transparent" />

              {/* Close Button */}
              <button
                onClick={handleClose}
                className={`absolute top-4 ${isRtl ? 'left-4' : 'right-4'} w-9 h-9 rounded-full bg-black/60 hover:bg-black/80 backdrop-blur-md text-white/90 flex items-center justify-center transition-all transform hover:scale-105 active:scale-95 shadow-lg border border-white/10`}
                aria-label="Close"
              >
                <X className="w-4 h-4" />
              </button>

              {/* Base Price Badge */}
              <div className={`absolute bottom-4 ${isRtl ? 'right-4' : 'left-4'} flex flex-col`}>
                <span className="text-[11px] font-semibold text-cafe-gold uppercase tracking-wider">
                  {lang === 'ar' ? 'السعر الأساسي' : 'Base Price'}
                </span>
                <span className="text-xl font-extrabold text-white drop-shadow-md">
                  {item.price} <span className="text-xs font-normal">{t('menu.currency')}</span>
                </span>
              </div>
            </div>

            {/* Content Body */}
            <div className="p-5 sm:p-6 space-y-5">
              {/* Titles */}
              <div>
                <h3 className="text-xl font-extrabold text-cafe-espresso dark:text-cafe-cream tracking-tight">
                  {lang === 'ar' ? item.nameAr : item.nameEn}
                </h3>
                <p className="text-xs font-sans text-cafe-muted-light dark:text-cafe-muted-dark mt-0.5">
                  {lang === 'ar' ? item.nameEn : item.nameAr}
                </p>
                {item.descriptionAr && (
                  <p className="text-xs text-cafe-espresso/70 dark:text-cafe-cream/70 mt-2 leading-relaxed">
                    {lang === 'ar' ? item.descriptionAr : item.descriptionEn}
                  </p>
                )}
              </div>

              {/* Add-ons Section */}
              <div className="space-y-2.5">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-cafe-amber uppercase tracking-wider flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-cafe-gold" />
                    {t('addons.title')}
                  </span>
                  <span className="text-[11px] text-cafe-muted-light dark:text-cafe-muted-dark">
                    {lang === 'ar' ? 'اختياري' : 'Optional'}
                  </span>
                </div>

                <div className="space-y-2">
                  {addOns.map(addon => {
                    const isSelected = selected.some(a => a.id === addon.id);
                    return (
                      <button
                        key={addon.id}
                        type="button"
                        onClick={() => toggleAddOn(addon)}
                        className={`w-full flex items-center justify-between p-3.5 rounded-2xl border transition-all duration-200 ${
                          isSelected
                            ? 'border-cafe-gold bg-cafe-amber/15 shadow-warm-sm scale-[1.01]'
                            : 'border-cafe-amber/20 bg-cafe-warm/40 dark:bg-cafe-surface-dark hover:border-cafe-amber/50'
                        }`}
                      >
                        <div className="flex items-center gap-3 text-start">
                          <div className="w-8 h-8 rounded-xl bg-cafe-amber/15 border border-cafe-amber/25 flex items-center justify-center flex-shrink-0">
                            {renderAddOnIcon(addon.id)}
                          </div>
                          <div className="flex flex-col">
                            <span className="text-sm font-bold text-cafe-espresso dark:text-cafe-cream">
                              {lang === 'ar' ? addon.nameAr : addon.nameEn}
                            </span>
                            <span className="text-[11px] text-cafe-amber dark:text-cafe-gold font-semibold mt-0.5">
                              {lang === 'ar' ? 'الـ 3 إضافات مع بعض بـ 20 ج.م فقط' : 'All 3 items together for only 20 EGP'}
                            </span>
                          </div>
                        </div>

                        <div className="flex items-center gap-3">
                          <span className="text-xs font-extrabold text-cafe-gold font-mono bg-cafe-gold/10 px-2 py-0.5 rounded-lg border border-cafe-gold/20">
                            +{addon.price} {t('menu.currency')}
                          </span>
                          <div
                            className={`w-5 h-5 rounded-lg border-2 flex items-center justify-center transition-all ${
                              isSelected
                                ? 'border-cafe-gold bg-cafe-gold text-cafe-espresso'
                                : 'border-cafe-amber/30 bg-transparent'
                            }`}
                          >
                            {isSelected && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                          </div>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Quantity Selector */}
              <div className="flex items-center justify-between pt-2 border-t border-cafe-amber/15">
                <span className="text-sm font-bold text-cafe-espresso dark:text-cafe-cream">
                  {lang === 'ar' ? 'الكمية' : 'Quantity'}
                </span>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setQuantity(q => Math.max(1, q - 1))}
                    disabled={quantity <= 1}
                    className="w-8 h-8 rounded-xl bg-cafe-warm dark:bg-cafe-surface-dark border border-cafe-amber/25 text-cafe-amber flex items-center justify-center hover:bg-cafe-amber hover:text-white transition-colors disabled:opacity-40 disabled:hover:bg-transparent disabled:hover:text-cafe-amber"
                  >
                    <Minus className="w-3.5 h-3.5" />
                  </button>
                  <span className="text-base font-extrabold text-cafe-espresso dark:text-cafe-cream min-w-[28px] text-center font-mono">
                    {quantity}
                  </span>
                  <button
                    type="button"
                    onClick={() => setQuantity(q => q + 1)}
                    className="w-8 h-8 rounded-xl bg-cafe-amber text-white flex items-center justify-center hover:bg-cafe-gold transition-colors"
                  >
                    <Plus className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>

            {/* Modal Footer with Live Total & Add CTA */}
            <div className="p-5 border-t border-cafe-amber/20 bg-cafe-warm/30 dark:bg-cafe-espresso flex items-center justify-between gap-4">
              <div className="flex flex-col">
                <span className="text-[11px] font-semibold text-cafe-muted-light dark:text-cafe-muted-dark">
                  {t('cart.total')}
                </span>
                <span className="text-2xl font-black text-cafe-gold font-mono tracking-tight">
                  {totalPrice} <span className="text-xs font-sans font-bold">{t('menu.currency')}</span>
                </span>
              </div>

              <button
                type="button"
                onClick={handleAdd}
                className="flex-1 py-3.5 px-6 rounded-2xl bg-gold-gradient text-cafe-espresso font-extrabold text-sm shadow-gold-glow hover:brightness-105 active:scale-[0.98] transition-all flex items-center justify-center gap-2"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>{t('cart.addToCart')}</span>
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
