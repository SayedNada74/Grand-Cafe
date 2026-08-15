import React, { useState, useMemo } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { menuCategories } from '../data/menuData';
import { Search, Sparkles, Coffee, Flame, CupSoda, Cake, Milk, GlassWater, Citrus, Wine, IceCream, Zap, FileText, ChevronDown, ChevronUp } from 'lucide-react';

interface InteractiveMenuProps {
  onOpenOriginalMenu: () => void;
}

const INITIAL_VISIBLE_ITEMS = 5;

export const InteractiveMenu: React.FC<InteractiveMenuProps> = ({ onOpenOriginalMenu }) => {
  const { t, lang, isRtl } = useLanguage();
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [expandedCategories, setExpandedCategories] = useState<Record<string, boolean>>({});

  // Map icon strings to Lucide icon components
  const getCategoryIcon = (iconName: string) => {
    switch (iconName) {
      case 'Coffee': return Coffee;
      case 'Flame': return Flame;
      case 'CupSoda': return CupSoda;
      case 'Cake': return Cake;
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
        
        {/* Section Header */}
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
          <button
            onClick={onOpenOriginalMenu}
            className="inline-flex items-center gap-2 text-xs font-extrabold px-5 py-2.5 rounded-full bg-cafe-amber/15 text-cafe-amber border border-cafe-amber/30 hover:bg-cafe-amber hover:text-cafe-espresso transition-all shadow-warm-sm"
          >
            <FileText className="w-4 h-4" />
            <span>{t('menu.viewOriginal')}</span>
          </button>
        </div>

        {/* Real-time Search Input */}
        <div className="max-w-md mx-auto mb-10">
          <div className="relative">
            <Search className={`absolute top-1/2 -translate-y-1/2 w-5 h-5 text-cafe-muted-light dark:text-cafe-muted-dark ${isRtl ? 'right-4' : 'left-4'}`} />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={t('menu.searchPlaceholder')}
              className={`w-full py-3.5 px-4 rounded-full bg-cafe-surface-light dark:bg-cafe-surface-dark border border-cafe-amber/30 text-sm text-cafe-espresso dark:text-cafe-cream placeholder-cafe-muted-light dark:placeholder-cafe-muted-dark focus:outline-none focus:border-cafe-gold focus:ring-2 focus:ring-cafe-gold/20 shadow-warm-sm transition-all ${
                isRtl ? 'pr-12 pl-4' : 'pl-12 pr-4'
              }`}
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className={`absolute top-1/2 -translate-y-1/2 text-xs font-bold text-cafe-amber ${isRtl ? 'left-4' : 'right-4'}`}
              >
                مسح
              </button>
            )}
          </div>
        </div>

        {/* Categories Tab Navigation Bar (Horizontally Scrollable) */}
        <div className="mb-12 overflow-x-auto no-scrollbar pb-2">
          <div className="flex items-center gap-2 min-w-max justify-start md:justify-center">
            
            {/* "ALL" Button */}
            <button
              onClick={() => setActiveCategory('all')}
              className={`px-5 py-2.5 rounded-full text-xs font-bold transition-all ${
                activeCategory === 'all'
                  ? 'bg-gold-gradient text-cafe-espresso shadow-md'
                  : 'bg-cafe-surface-light dark:bg-cafe-surface-dark text-cafe-espresso/80 dark:text-cafe-cream/80 border border-cafe-amber/20 hover:border-cafe-amber'
              }`}
            >
              ✨ {t('menu.all')}
            </button>

            {/* Category Tab Buttons */}
            {menuCategories.map((cat) => {
              const IconComp = getCategoryIcon(cat.iconName);
              const isActive = activeCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`flex items-center gap-2 px-4 py-2.5 rounded-full text-xs font-bold transition-all ${
                    isActive
                      ? 'bg-gold-gradient text-cafe-espresso shadow-md'
                      : 'bg-cafe-surface-light dark:bg-cafe-surface-dark text-cafe-espresso/80 dark:text-cafe-cream/80 border border-cafe-amber/20 hover:border-cafe-amber'
                  }`}
                >
                  <IconComp className="w-4 h-4" />
                  <span>{lang === 'ar' ? cat.nameAr : cat.nameEn}</span>
                  <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${isActive ? 'bg-cafe-espresso/20 text-cafe-espresso' : 'bg-cafe-amber/10 text-cafe-amber'}`}>
                    {cat.items.length}
                  </span>
                </button>
              );
            })}

          </div>
        </div>

        {/* Menu Items Render Container */}
        {totalItemsFound === 0 ? (
          <div className="text-center py-16 bg-cafe-surface-light dark:bg-cafe-surface-dark rounded-3xl border border-cafe-amber/20 max-w-lg mx-auto">
            <p className="text-base font-bold text-cafe-espresso dark:text-cafe-cream mb-2">
              {t('menu.noResults')}
            </p>
            <p className="text-xs text-cafe-muted-light dark:text-cafe-muted-dark mb-4">
              جرّب البحث باسم آخر أو اختيار قسم مختلف
            </p>
            <button
              onClick={() => { setActiveCategory('all'); setSearchQuery(''); }}
              className="text-xs font-bold text-cafe-amber underline"
            >
              عرض جميع الأصناف
            </button>
          </div>
        ) : (
          <div className="space-y-12">
            {filteredCategories.map((cat) => {
              const isExpanded = !!expandedCategories[cat.id];
              const isSearching = searchQuery.trim().length > 0;
              
              // Determine visible items: show all when searching or expanded, otherwise first 5 items
              const visibleItems = isExpanded || isSearching
                ? cat.items
                : cat.items.slice(0, INITIAL_VISIBLE_ITEMS);

              const hasMore = cat.items.length > INITIAL_VISIBLE_ITEMS && !isSearching;
              const remainingCount = cat.items.length - INITIAL_VISIBLE_ITEMS;

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

                  {/* Grid of Menu Items with Smooth Disclosure Animation */}
                  <div
                    id={`category-items-${cat.id}`}
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 transition-all duration-300 ease-in-out"
                  >
                    {visibleItems.map((item) => (
                      <div
                        key={item.id}
                        className="group flex items-center justify-between p-4 rounded-2xl bg-cafe-surface-light dark:bg-cafe-surface-dark border border-cafe-amber/15 hover:border-cafe-amber/40 shadow-warm-sm hover:shadow-warm-md transition-all animate-fadeIn"
                      >
                        <div className="flex-1 pr-3 pl-1">
                          <div className="flex items-center gap-2">
                            <h4 className="text-base font-bold text-cafe-espresso dark:text-cafe-cream group-hover:text-cafe-amber transition-colors">
                              {lang === 'ar' ? item.nameAr : item.nameEn}
                            </h4>
                            {(item.featuredDrink || item.featuredDessert) && (
                              <span className="text-[9px] font-extrabold px-1.5 py-0.5 rounded bg-amber-500/15 text-amber-500 border border-amber-500/30">
                                ★ مميز
                              </span>
                            )}
                          </div>
                          <span className="text-[11px] text-cafe-muted-light dark:text-cafe-muted-dark block mt-0.5 font-sans">
                            {lang === 'ar' ? item.nameEn : item.nameAr}
                          </span>
                        </div>

                        {/* Price Badge */}
                        <div className="text-end flex-shrink-0">
                          <span className="text-base font-extrabold text-cafe-gold font-mono bg-cafe-gold/10 px-3 py-1.5 rounded-xl border border-cafe-gold/20 block">
                            {item.price} <span className="text-xs font-sans">{t('menu.currency')}</span>
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Accessible Progressive Disclosure Button (View More / Show Less) */}
                  {hasMore && (
                    <div className="flex justify-center mt-6">
                      <button
                        onClick={() => toggleCategoryExpand(cat.id)}
                        aria-expanded={isExpanded}
                        aria-controls={`category-items-${cat.id}`}
                        className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-xs font-extrabold bg-cafe-surface-light dark:bg-cafe-surface-dark border border-cafe-amber/30 text-cafe-amber hover:bg-cafe-amber hover:text-cafe-espresso dark:hover:text-cafe-espresso shadow-warm-sm transition-all duration-300 transform hover:scale-105 active:scale-95 cursor-pointer"
                      >
                        {isExpanded ? (
                          <>
                            <ChevronUp className="w-4 h-4" />
                            <span>{t('menu.showLess')}</span>
                          </>
                        ) : (
                          <>
                            <ChevronDown className="w-4 h-4" />
                            <span>{t('menu.viewMore')} (+{remainingCount})</span>
                          </>
                        )}
                      </button>
                    </div>
                  )}

                </div>
              );
            })}
          </div>
        )}

      </div>
    </section>
  );
};
