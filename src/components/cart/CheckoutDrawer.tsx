import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ArrowLeft, ArrowRight, MessageCircle, User, Phone, MapPin, FileText, AlertCircle, Lock } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { useLanguage } from '../../context/LanguageContext';
import { cafeConfig } from '../../config/cafeConfig';

interface FormData {
  name: string;
  phone: string;
  address: string;
  notes: string;
}

interface FormErrors {
  name?: string;
  phone?: string;
  address?: string;
}

export const CheckoutDrawer: React.FC = () => {
  const { items, isCheckoutOpen, setCheckoutOpen, setCartOpen, totalPrice, clearCart } = useCart();
  const { t, lang, isRtl } = useLanguage();

  const [form, setForm] = useState<FormData>(() => {
    try {
      const saved = localStorage.getItem('grand_cafe_customer_info');
      if (saved) {
        const parsed = JSON.parse(saved);
        return {
          name: parsed.name || '',
          phone: parsed.phone || '',
          address: parsed.address || '',
          notes: '',
        };
      }
    } catch (e) {}
    return { name: '', phone: '', address: '', notes: '' };
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitted, setSubmitted] = useState(false);

  const handleBack = () => {
    setCheckoutOpen(false);
    setTimeout(() => setCartOpen(true), 200);
  };

  const normalizePhone = (str: string): string => {
    return str
      .replace(/[٠-٩]/g, d => '٠١٢٣٤٥٦٧٨٩'.indexOf(d).toString())
      .replace(/[\s\-\(\)\.]/g, '')
      .replace(/^(\+20|0020|20)/, '0');
  };

  const validate = (): boolean => {
    const newErrors: FormErrors = {};
    if (!form.name.trim()) newErrors.name = t('checkout.required');
    
    const cleanedPhone = normalizePhone(form.phone);
    if (!form.phone.trim()) {
      newErrors.phone = t('checkout.required');
    } else if (!/^01[0-9]{9}$/.test(cleanedPhone)) {
      newErrors.phone = t('checkout.invalidPhone');
    }
    if (!form.address.trim()) newErrors.address = t('checkout.required');
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const generateWhatsAppMessage = (): string => {
    const isAr = lang === 'ar';
    const lines: string[] = [];
    const currency = isAr ? 'ج.م' : 'EGP';
    const divider = isAr ? '\u200F' + '-'.repeat(38) : '-'.repeat(38);

    // 1. Header
    lines.push(isAr ? '*طلب جديد | جراند كافيه*' : '*New Order | Grand Cafe*');
    lines.push(divider);

    // 2. Customer & Delivery Info
    lines.push(isAr ? '*بيانات العميل والتوصيل:*' : '*Customer & Delivery Details:*');
    lines.push(isAr ? `- الاسم: ${form.name.trim()}` : `- Name: ${form.name.trim()}`);
    lines.push(isAr ? `- رقم الموبايل: ${form.phone.trim()}` : `- Phone: ${form.phone.trim()}`);
    lines.push(isAr ? `- العنوان: ${form.address.trim()}` : `- Address: ${form.address.trim()}`);
    lines.push(divider);

    // 3. Order Items
    lines.push(isAr ? '*تفاصيل الأوردر:*' : '*Order Items:*');
    lines.push('');

    items.forEach((ci, idx) => {
      const name = (isAr ? ci.item.nameAr : ci.item.nameEn).trim();
      const addOnsPrice = ci.selectedAddOns.reduce((s, a) => s + a.price, 0);
      const unitPrice = ci.item.price + addOnsPrice;
      const subtotal = unitPrice * ci.quantity;

      lines.push(`${idx + 1}. *${name}*`);
      lines.push(isAr ? `- العدد: ${ci.quantity}` : `- Quantity: ${ci.quantity}`);
      if (ci.quantity > 1) {
        lines.push(isAr ? `- سعر القطعة: ${unitPrice} ${currency}` : `- Unit Price: ${unitPrice} ${currency}`);
      }
      if (ci.selectedAddOns.length > 0) {
        const addOnNames = ci.selectedAddOns.map(a => (isAr ? a.nameAr : a.nameEn).trim()).join('، ');
        lines.push(isAr ? `- إضافات: ${addOnNames}` : `- Add-ons: ${addOnNames}`);
      }
      lines.push(isAr ? `- الإجمالي: ${subtotal} ${currency}` : `- Subtotal: ${subtotal} ${currency}`);
      lines.push('');
    });

    // 4. Grand Total
    lines.push(divider);
    lines.push(isAr ? `*الحساب الإجمالي: ${totalPrice} ${currency}*` : `*Grand Total: ${totalPrice} ${currency}*`);
    lines.push(divider);

    // 5. Special Notes (if provided)
    if (form.notes.trim()) {
      lines.push(isAr ? '*ملاحظات خاصة:*' : '*Special Notes:*');
      lines.push(form.notes.trim());
      lines.push(divider);
    }

    // 6. Footer
    lines.push(isAr ? '*جراند كافيه - التل الكبير*' : '*Grand Cafe - Tell El Kebir*');
    lines.push(isAr ? 'شكراً لطلبكم! يسعدنا دائماً خدمتكم.' : 'Thank you for your order! Always glad to serve you.');

    return lines.join('\n');
  };

  const handleSubmit = () => {
    setSubmitted(true);
    if (!validate()) return;

    const message = generateWhatsAppMessage();
    const cleanNumber = cafeConfig.whatsappNumber.replace(/[^0-9]/g, '');
    const url = `https://api.whatsapp.com/send?phone=${cleanNumber}&text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');

    // Save customer info in localStorage for future orders convenience
    try {
      localStorage.setItem('grand_cafe_customer_info', JSON.stringify({
        name: form.name.trim(),
        phone: form.phone.trim(),
        address: form.address.trim(),
      }));
    } catch (e) {}

    // Reset after sending
    clearCart();
    setErrors({});
    setSubmitted(false);
    setCheckoutOpen(false);
  };

  const updateField = (field: keyof FormData, value: string) => {
    setForm(f => ({ ...f, [field]: value }));
    if (submitted) {
      // Revalidate on change after first submit attempt
      setTimeout(() => validate(), 0);
    }
  };

  return (
    <AnimatePresence>
      {isCheckoutOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[70]"
            onClick={() => setCheckoutOpen(false)}
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: isRtl ? '-100%' : '100%' }}
            animate={{ x: 0 }}
            exit={{ x: isRtl ? '-100%' : '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            className={`fixed top-0 ${isRtl ? 'left-0' : 'right-0'} h-full w-full sm:max-w-[420px] z-[70] bg-cafe-surface-light dark:bg-cafe-dark shadow-warm-lg flex flex-col`}
          >
            {/* Header */}
            <div className="flex items-center justify-between p-5 border-b border-cafe-amber/15 flex-shrink-0">
              <button
                onClick={handleBack}
                className="flex items-center gap-2 text-sm font-semibold text-cafe-amber hover:text-cafe-gold transition-colors"
              >
                {isRtl ? <ArrowRight className="w-4 h-4" /> : <ArrowLeft className="w-4 h-4" />}
                {t('checkout.back')}
              </button>
              <button
                onClick={() => setCheckoutOpen(false)}
                className="w-8 h-8 rounded-full bg-cafe-amber/10 text-cafe-amber flex items-center justify-center hover:bg-cafe-amber/20 transition-colors"
                aria-label="Close"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Form */}
            <div className="flex-1 overflow-y-auto p-5 space-y-5">
              <h2 className="text-xl font-bold text-cafe-espresso dark:text-cafe-cream">
                {t('checkout.title')}
              </h2>

              {/* Name */}
              <div>
                <label className="flex items-center gap-2 text-sm font-semibold text-cafe-espresso dark:text-cafe-cream mb-2">
                  <User className="w-4 h-4 text-cafe-amber" />
                  {t('checkout.name')} *
                </label>
                <input
                  type="text"
                  value={form.name}
                  onChange={(e) => updateField('name', e.target.value)}
                  placeholder={t('checkout.namePlaceholder')}
                  className={`w-full py-3 px-4 rounded-xl bg-cafe-warm/30 dark:bg-cafe-surface-dark border ${errors.name ? 'border-red-500' : 'border-cafe-amber/20'} text-sm text-cafe-espresso dark:text-cafe-cream placeholder-cafe-muted-light dark:placeholder-cafe-muted-dark focus:outline-none focus:border-cafe-amber focus:ring-2 focus:ring-cafe-amber/20 transition-all`}
                />
                {errors.name && (
                  <p className="mt-1 text-xs text-red-500 flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" /> {errors.name}
                  </p>
                )}
              </div>

              {/* Phone */}
              <div>
                <label className="flex items-center gap-2 text-sm font-semibold text-cafe-espresso dark:text-cafe-cream mb-2">
                  <Phone className="w-4 h-4 text-cafe-amber" />
                  {t('checkout.phone')} *
                </label>
                <input
                  type="tel"
                  value={form.phone}
                  onChange={(e) => updateField('phone', e.target.value)}
                  placeholder={t('checkout.phonePlaceholder')}
                  dir="ltr"
                  className={`w-full py-3 px-4 rounded-xl bg-cafe-warm/30 dark:bg-cafe-surface-dark border ${errors.phone ? 'border-red-500' : 'border-cafe-amber/20'} text-sm text-cafe-espresso dark:text-cafe-cream placeholder-cafe-muted-light dark:placeholder-cafe-muted-dark focus:outline-none focus:border-cafe-amber focus:ring-2 focus:ring-cafe-amber/20 transition-all`}
                />
                {errors.phone && (
                  <p className="mt-1 text-xs text-red-500 flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" /> {errors.phone}
                  </p>
                )}
              </div>

              {/* Address */}
              <div>
                <label className="flex items-center gap-2 text-sm font-semibold text-cafe-espresso dark:text-cafe-cream mb-2">
                  <MapPin className="w-4 h-4 text-cafe-amber" />
                  {t('checkout.address')} *
                </label>
                <textarea
                  value={form.address}
                  onChange={(e) => updateField('address', e.target.value)}
                  placeholder={t('checkout.addressPlaceholder')}
                  rows={2}
                  className={`w-full py-3 px-4 rounded-xl bg-cafe-warm/30 dark:bg-cafe-surface-dark border ${errors.address ? 'border-red-500' : 'border-cafe-amber/20'} text-sm text-cafe-espresso dark:text-cafe-cream placeholder-cafe-muted-light dark:placeholder-cafe-muted-dark focus:outline-none focus:border-cafe-amber focus:ring-2 focus:ring-cafe-amber/20 transition-all resize-none`}
                />
                {errors.address && (
                  <p className="mt-1 text-xs text-red-500 flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" /> {errors.address}
                  </p>
                )}
              </div>

              {/* Notes */}
              <div>
                <label className="flex items-center gap-2 text-sm font-semibold text-cafe-espresso dark:text-cafe-cream mb-2">
                  <FileText className="w-4 h-4 text-cafe-amber" />
                  {t('checkout.notes')}
                </label>
                <textarea
                  value={form.notes}
                  onChange={(e) => setForm(f => ({ ...f, notes: e.target.value }))}
                  placeholder={t('checkout.notesPlaceholder')}
                  rows={2}
                  className="w-full py-3 px-4 rounded-xl bg-cafe-warm/30 dark:bg-cafe-surface-dark border border-cafe-amber/20 text-sm text-cafe-espresso dark:text-cafe-cream placeholder-cafe-muted-light dark:placeholder-cafe-muted-dark focus:outline-none focus:border-cafe-amber focus:ring-2 focus:ring-cafe-amber/20 transition-all resize-none"
                />
              </div>

              {/* Order Summary */}
              <div className="bg-cafe-warm/50 dark:bg-cafe-surface-dark rounded-2xl p-4 border border-cafe-amber/15">
                <h3 className="text-sm font-bold text-cafe-espresso dark:text-cafe-cream mb-3">
                  {t('checkout.orderSummary')}
                </h3>
                <div className="space-y-2">
                  {items.map(ci => {
                    const addOnsPrice = ci.selectedAddOns.reduce((s, a) => s + a.price, 0);
                    const subtotal = (ci.item.price + addOnsPrice) * ci.quantity;
                    return (
                      <div key={ci.cartItemId} className="flex items-start justify-between text-xs gap-2">
                        <div className="flex-1 min-w-0">
                          <span className="text-cafe-espresso dark:text-cafe-cream font-semibold">
                            {ci.quantity} × {lang === 'ar' ? ci.item.nameAr : ci.item.nameEn}
                          </span>
                          {ci.selectedAddOns.length > 0 && (
                            <span className="text-cafe-muted-light dark:text-cafe-muted-dark block">
                              + {ci.selectedAddOns.map(a => lang === 'ar' ? a.nameAr : a.nameEn).join(', ')}
                            </span>
                          )}
                        </div>
                        <span className="text-cafe-gold font-bold whitespace-nowrap">
                          {subtotal} {t('menu.currency')}
                        </span>
                      </div>
                    );
                  })}
                </div>
                <div className="mt-3 pt-3 border-t border-cafe-amber/15 flex justify-between">
                  <span className="text-sm font-bold text-cafe-espresso dark:text-cafe-cream">{t('cart.total')}</span>
                  <span className="text-base font-extrabold text-cafe-gold">{totalPrice} {t('menu.currency')}</span>
                </div>
              </div>
            </div>

            {/* Footer — WhatsApp Button */}
            <div className="border-t border-cafe-amber/15 p-5 bg-cafe-warm/20 dark:bg-cafe-espresso flex-shrink-0">
              <button
                onClick={handleSubmit}
                className="w-full py-4 rounded-xl bg-[#25D366] text-white font-bold text-base hover:bg-[#20bd5a] transition-all transform hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-3 shadow-lg"
              >
                <MessageCircle className="w-5 h-5" />
                {t('checkout.sendWhatsApp')}
              </button>
              <p className="text-[11px] text-center text-cafe-muted-light dark:text-cafe-muted-dark mt-2.5 flex items-center justify-center gap-1.5">
                <Lock className="w-3.5 h-3.5 text-cafe-amber dark:text-cafe-gold flex-shrink-0" />
                <span>
                  {lang === 'ar'
                    ? 'سيتم تحويلك مباشرةً إلى محادثة واتساب الرسمية لجراند كافيه لتأكيد الطلب'
                    : 'You will be redirected to Grand Cafe official WhatsApp to confirm your order'}
                </span>
              </p>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
