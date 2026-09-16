import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';
import { useCart } from '../context/CartContext';
import { menuCategories, type MenuItem, type AddOn } from '../data/menuData';
import { Search, Sparkles, Coffee, Flame, CupSoda, Cake, Milk, GlassWater, Citrus, Wine, IceCream, Zap, FileText, ChevronDown, Croissant, Plus, Minus } from 'lucide-react';
import { AddOnModal } from './cart/AddOnModal';
import { ScrollReveal } from './common/ScrollReveal';
import { Magnetic } from './common/Magnetic';

interface InteractiveMenuProps {
  onOpenOriginalMenu: () => void;
}

const INITIAL_VISIBLE_ITEMS = 5;

export const InteractiveMenu: React.FC<InteractiveMenuProps> = ({ onOpenOriginalMenu }) => {
  const { t, lang, isRtl } = useLanguage();
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [expandedCategories, setExpandedCategories] = useState<Record<string, boolean>>({});
  const { addItem, getItemQuantityInCart, updateQuantity, items: cartItems } = useCart();
  const [addOnModalItem, setAddOnModalItem] = useState<MenuItem | null>(null);
  const [addOnModalAddOns, setAddOnModalAddOns] = useState<AddOn[]>([]);

  // Map icon strings to Lucide icon components
  const getCategoryIcon = (iconName: string) => {
    switch (iconName) {
      case 'Coffee': return Coffee;
      case 'Flame': return Flame;
      case 'CupSoda': return CupSoda;
      case 'Cake': return Cake;
      case 'Croissant': return Croissant;
      case 'Milk': return Milk;
      case 'GlassWater': return GlassWater;
      case 'Citrus': return Citrus;
      case 'Wine': return Wine;
      case 'IceCream': return IceCream;
      case 'Zap': return Zap;
      default: return Sparkles;
    }
  };

  // Toggle category expanded state
  const toggleCategoryExpand = (catId: string) => {
    setExpandedCategories((prev) => ({
      ...prev,
      [catId]: !prev[catId],
    }));
  };

  // Filter items based on active category and search query
  const filteredCategories = useMemo(() => {
    return menuCategories.map((category) => {
      const itemsMatchCategory = activeCategory === 'all' || category.id === activeCategory;
      if (!itemsMatchCategory) {
        return { ...category, items: [] };
      }

      const query = searchQuery.trim().toLowerCase();
      if (!query) {
        return category;
      }

      const filteredItems = category.items.filter((item) => {
        return (
          item.nameAr.toLowerCase().includes(query) ||
          item.nameEn.toLowerCase().includes(query) ||
          item.price.toString().includes(query)
        );
      });

      return { ...category, items: filteredItems };
    }).filter((cat) => cat.items.length > 0);
  }, [activeCategory, searchQuery]);

  const totalItemsFound = useMemo(() => {
    return filteredCategories.reduce((acc, cat) => acc + cat.items.length, 0);
  }, [filteredCategories]);

  return (
    <section id="menu" className="py-24 bg-cafe-warm/40 dark:bg-cafe-dark relative transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section Header with Scroll Reveal */}
        <ScrollReveal direction="up">
          <div className="text-center max-w-3xl mx-auto mb-10">
            <span className="text-xs font-extrabold tracking-widest text-cafe-amber uppercase mb-2 block">
              {t('menu.badge')}
            </span>
            <h2 className="text-3xl sm:text-5xl font-extrabold text-cafe-espresso dark:text-cafe-cream mb-4">
              {t('menu.title')}
            </h2>
            <p className="text-base text-cafe-muted-light dark:text-cafe-muted-dark mb-6">
              {t('menu.subtitle')}
            </p>

            {/* Button to View Original Paper Menu Lightbox */}
            <Magnetic strength={0.25}>
              <button
                onClick={onOpenOriginalMenu}
                className="inline-flex items-center gap-2 text-xs font-extrabold px-5 py-2.5 rounded-full bg-cafe-amber/15 text-cafe-amber border border-cafe-amber/30 hover:bg-cafe-amber hover:text-cafe-espresso transition-all shadow-warm-sm"
              >
                <FileText className="w-4 h-4" />
                <span>{t('menu.viewOriginal')}</span>
              </button>
            </Magnetic>
          </div>
        </ScrollReveal>

        {/* Real-time Search Input */}
        <div className="max-w-md mx-auto mb-10">
          <div className="relative">
            <Search className={`absolute top-1/2 -translate-y-1/2 w-5 h-5 text-cafe-muted-light dark:text-cafe-muted-dark ${isRtl ? 'right-4' : 'left-4'}`} />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={t('menu.searchPlaceholder')}
              className={`w-full py-3.5 px-4 rounded-full bg-cafe-surface-light dark:bg-cafe-surface-dark border border-cafe-amber/30 text-sm text-cafe-espresso dark:text-cafe-cream placeholder-cafe-muted-light dark:placeholder-cafe-muted-dark focus:outline-none focus:border-cafe-gold focus:ring-2 focus:ring-cafe-gold/20 shadow-warm-sm transition-all ${isRtl ? 'pr-12 pl-4' : 'pl-12 pr-4'
                }`}
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className={`absolute top-1/2 -translate-y-1/2 text-xs font-bold text-cafe-amber hover:text-cafe-gold transition-colors ${isRtl ? 'left-4' : 'right-4'}`}
              >
                {lang === 'ar' ? 'مسح' : 'Clear'}
              </button>
            )}
          </div>
        </div>

        {/* Categories Tab Navigation Bar (Horizontally Scrollable with ample vertical padding) */}
        <div className="mb-10 overflow-x-auto no-scrollbar py-3 px-2">
          <div className="flex items-center gap-2.5 min-w-max justify-start md:justify-center py-1.5">

            {/* "ALL" Button */}
            <button
              onClick={() => setActiveCategory('all')}
              className={`group px-5 py-2.5 rounded-full text-xs font-bold transition-all duration-150 hover:-translate-y-0.5 active:scale-95 ${activeCategory === 'all'
                ? 'bg-gold-gradient text-cafe-espresso shadow-md shadow-cafe-gold/20 font-extrabold'
                : 'bg-cafe-surface-light dark:bg-cafe-surface-dark text-cafe-espresso/80 dark:text-cafe-cream/80 border border-cafe-amber/20 hover:border-cafe-amber'
                }`}
            >
              <span className="inline-flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 transition-transform duration-200 group-hover:rotate-12" />
                <span>{t('menu.all')}</span>
              </span>
            </button>

            {/* Category Tab Buttons */}
            {menuCategories.map((cat) => {
              const IconComp = getCategoryIcon(cat.iconName);
              const isActive = activeCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`group flex items-center gap-2 px-4 py-2.5 rounded-full text-xs font-bold transition-all duration-150 hover:-translate-y-0.5 active:scale-95 ${isActive
                    ? 'bg-gold-gradient text-cafe-espresso shadow-md shadow-cafe-gold/20 font-extrabold'
                    : 'bg-cafe-surface-light dark:bg-cafe-surface-dark text-cafe-espresso/80 dark:text-cafe-cream/80 border border-cafe-amber/20 hover:border-cafe-amber'
                    }`}
                >
                  <IconComp className="w-4 h-4 transition-transform duration-200 group-hover:scale-110" />
                  <span>{lang === 'ar' ? cat.nameAr : cat.nameEn}</span>
                  <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${isActive ? 'bg-cafe-espresso/20 text-cafe-espresso' : 'bg-cafe-amber/10 text-cafe-amber'}`}>
                    {cat.items.length}
                  </span>
                </button>
              );
            })}

          </div>
        </div>

        {/* Menu Items Render Container with Smooth Category Cross-fade */}
        {totalItemsFound === 0 ? (
          <div className="text-center py-16 bg-cafe-surface-light dark:bg-cafe-surface-dark rounded-3xl border border-cafe-amber/20 max-w-lg mx-auto">
            <p className="text-base font-bold text-cafe-espresso dark:text-cafe-cream mb-2">
              {t('menu.noResults')}
            </p>
            <p className="text-xs text-cafe-muted-light dark:text-cafe-muted-dark mb-4">
              {lang === 'ar' ? 'جرّب البحث باسم آخر أو اختيار قسم مختلف' : 'Try searching with a different name or select another category'}
            </p>
            <button
              onClick={() => { setActiveCategory('all'); setSearchQuery(''); }}
              className="text-xs font-bold text-cafe-amber underline hover:text-cafe-gold transition-colors"
            >
              {lang === 'ar' ? 'عرض جميع الأصناف' : 'Show all items'}
            </button>
          </div>
        ) : (
          <AnimatePresence mode="wait">
            <motion.div
              key={activeCategory + (searchQuery ? `_q_${searchQuery}` : '')}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
              className="space-y-12"
            >
              {filteredCategories.map((cat) => {
                const isExpanded = !!expandedCategories[cat.id];
                const isSearching = searchQuery.trim().length > 0;

                // Keep initial 5 items stable and fixed
                const initialItems = cat.items.slice(0, INITIAL_VISIBLE_ITEMS);
                const extraItems = cat.items.slice(INITIAL_VISIBLE_ITEMS);
                const hasMore = extraItems.length > 0 && !isSearching;
                const remainingCount = extraItems.length;

                const renderCard = (item: MenuItem) => {
                  const hasAddOns = cat.addOns && cat.addOns.length > 0;
                  const totalQty = getItemQuantityInCart(item.id);

                  return (
                    <div
                      key={item.id}
                      className="group flex items-center justify-between p-4 rounded-2xl bg-cafe-surface-light dark:bg-cafe-surface-dark border border-cafe-amber/15 hover:border-cafe-amber/40 shadow-warm-sm hover:shadow-warm-md transition-all duration-200 hover:-translate-y-0.5 active:scale-[0.99]"
                    >
                      <div className="flex-1 pr-3 pl-1">
                        <div className="flex items-center gap-2">
                          <h4 className="text-base font-bold text-cafe-espresso dark:text-cafe-cream group-hover:text-cafe-amber transition-colors">
                            {lang === 'ar' ? item.nameAr : item.nameEn}
                          </h4>
                          {(item.featuredDrink || item.featuredDessert) && (
                            <span className="text-[9px] font-extrabold px-1.5 py-0.5 rounded bg-amber-500/15 text-amber-500 border border-amber-500/30">
                              {lang === 'ar' ? '★ مميز' : '★ Featured'}
                            </span>
                          )}
                        </div>
                        <span className="text-[11px] text-cafe-muted-light dark:text-cafe-muted-dark block mt-0.5 font-sans">
                          {lang === 'ar' ? item.nameEn : item.nameAr}
                        </span>
                      </div>

                      {/* Price + Cart Controls */}
                      <div className="flex items-center gap-2 flex-shrink-0">
                        <span className="text-sm font-extrabold text-cafe-gold font-mono bg-cafe-gold/10 px-2.5 py-1 rounded-xl border border-cafe-gold/20 transition-transform duration-200 group-hover:scale-105">
                          {item.price} <span className="text-[10px] font-sans">{t('menu.currency')}</span>
                        </span>

                        {hasAddOns ? (
                          <div className="flex items-center gap-1.5">
                            {totalQty > 0 && (
                              <span className="text-[10px] font-bold text-cafe-amber bg-cafe-amber/10 px-1.5 py-0.5 rounded-full">
                                {totalQty}
                              </span>
                            )}
                            <button
                              onClick={(e) => { e.stopPropagation(); setAddOnModalItem(item); setAddOnModalAddOns(cat.addOns!); }}
                              className="w-7 h-7 rounded-full bg-gold-gradient text-cafe-espresso flex items-center justify-center shadow-sm hover:shadow-gold-glow transition-all transform hover:scale-105 active:scale-90"
                              aria-label={t('cart.addToCart')}
                            >
                              <Plus className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        ) : totalQty > 0 ? (
                          (() => {
                            const cartItem = cartItems.find(ci => ci.cartItemId === item.id);
                            return (
                              <div className="flex items-center gap-1">
                                <button
                                  onClick={(e) => { e.stopPropagation(); if (cartItem) updateQuantity(cartItem.cartItemId, cartItem.quantity - 1); }}
                                  className="w-6 h-6 rounded-full bg-cafe-amber/15 text-cafe-amber flex items-center justify-center hover:bg-cafe-amber hover:text-white active:scale-90 transition-all"
                                  aria-label="Decrease quantity"
                                >
                                  <Minus className="w-3 h-3" />
                                </button>
                                <span className="text-xs font-bold text-cafe-espresso dark:text-cafe-cream min-w-[16px] text-center">{totalQty}</span>
                                <button
                                  onClick={(e) => { e.stopPropagation(); addItem(item); }}
                                  className="w-6 h-6 rounded-full bg-cafe-amber text-white flex items-center justify-center hover:bg-cafe-gold active:scale-90 transition-all"
                                  aria-label="Increase quantity"
                                >
                                  <Plus className="w-3.5 h-3.5" />
                                </button>
                              </div>
                            );
                          })()
                        ) : (
                          <button
                            onClick={(e) => { e.stopPropagation(); addItem(item); }}
                            className="w-7 h-7 rounded-full bg-gold-gradient text-cafe-espresso flex items-center justify-center shadow-sm hover:shadow-gold-glow transition-all transform hover:scale-105 active:scale-90"
                            aria-label={t('cart.addToCart')}
                          >
                            <Plus className="w-3.5 h-3.5" />
                          </button>
                        )}
                      </div>
                    </div>
                  );
                };

                return (
                  <div key={cat.id} className="scroll-mt-28">

                    {/* Category Header Title */}
                    <div className="flex items-center gap-3 mb-6 pb-2 border-b border-cafe-amber/20">
                      <div className="w-8 h-8 rounded-lg bg-cafe-amber/15 text-cafe-amber flex items-center justify-center">
                        {React.createElement(getCategoryIcon(cat.iconName), { className: 'w-4 h-4' })}
                      </div>
                      <h3 className="text-2xl font-extrabold text-cafe-espresso dark:text-cafe-cream">
                        {lang === 'ar' ? cat.nameAr : cat.nameEn}
                      </h3>
                      <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-cafe-amber/10 text-cafe-amber border border-cafe-amber/20">
                        {cat.items.length} {lang === 'ar' ? 'صنف' : 'items'}
                      </span>
                    </div>

                    {/* Add-on banner for Croissant category */}
                    {cat.addOns && cat.addOns.length > 0 && (
                      <div className="mb-6 px-4 py-3 rounded-2xl bg-cafe-amber/10 border border-cafe-amber/30 text-xs sm:text-sm font-bold text-cafe-amber flex items-center gap-2.5 shadow-warm-sm animate-fadeIn">
                        <Sparkles className="w-4 h-4 text-cafe-gold flex-shrink-0" />
                        <span>{t('addons.banner')}</span>
                      </div>
                    )}

                    {/* Grid of Menu Items: 5 Base Items remain stationary; Extra items animate smoothly */}
                    <div
                      id={`category-items-${cat.id}`}
                      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
                    >
                      {initialItems.map((item) => renderCard(item))}

                      <AnimatePresence initial={false}>
                        {(isExpanded || isSearching) &&
                          extraItems.map((item, idx) => (
                            <motion.div
                              key={item.id}
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, y: 8 }}
                              transition={{
                                duration: 0.18,
                                delay: Math.min(idx * 0.02, 0.1),
                                ease: [0.16, 1, 0.3, 1],
                              }}
                            >
                              {renderCard(item)}
                            </motion.div>
                          ))}
                      </AnimatePresence>
                    </div>

                    {/* Accessible Progressive Disclosure Button (View More / Show Less) */}
                    {hasMore && (
                      <div className="flex justify-center mt-6">
                        <button
                          onClick={() => toggleCategoryExpand(cat.id)}
                          aria-expanded={isExpanded}
                          aria-controls={`category-items-${cat.id}`}
                          className="group inline-flex items-center gap-2 px-6 py-2.5 rounded-full text-xs font-extrabold bg-cafe-surface-light dark:bg-cafe-surface-dark border border-cafe-amber/30 text-cafe-amber hover:bg-cafe-amber hover:text-cafe-espresso dark:hover:text-cafe-espresso shadow-warm-sm transition-all duration-200 hover:-translate-y-0.5 active:scale-95 cursor-pointer"
                        >
                          <motion.div
                            animate={{ rotate: isExpanded ? 180 : 0 }}
                            transition={{ duration: 0.22, ease: 'easeInOut' }}
                          >
                            <ChevronDown className="w-4 h-4" />
                          </motion.div>
                          <span>
                            {isExpanded
                              ? t('menu.showLess')
                              : `${t('menu.viewMore')} (+${remainingCount})`}
                          </span>
                        </button>
                      </div>
                    )}

                  </div>
                );
              })}
            </motion.div>
          </AnimatePresence>
        )}

      </div>

      {/* Add-on Selection Modal */}
      {addOnModalItem && (
        <AddOnModal
          isOpen={!!addOnModalItem}
          onClose={() => setAddOnModalItem(null)}
          item={addOnModalItem}
          addOns={addOnModalAddOns}
        />
      )}
    </section>
  );
};
