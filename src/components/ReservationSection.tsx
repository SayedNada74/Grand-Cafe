import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { cafeConfig } from '../config/cafeConfig';
import { MessageCircle, Sparkles, CheckCircle2 } from 'lucide-react';

export const ReservationSection: React.FC = () => {
  const { t, isRtl } = useLanguage();
  
  const [eventType, setEventType] = useState('Birthday');
  const [guestsCount, setGuestsCount] = useState('4');
  const [date, setDate] = useState('');
  const [notes, setNotes] = useState('');

  const handleWhatsAppBooking = (e: React.FormEvent) => {
    e.preventDefault();

    const formattedMessage = isRtl
      ? `مرحباً جراند كافيه! 👋\nأود طلب حجز طاولات / مناسبة بالتفاصيل التالية:\n- نوع المناسبة: ${eventType}\n- عدد الأفراد المتوقع: ${guestsCount}\n- الموعد المحدد: ${date || 'غير محدد'}\n- ملاحظات إضافية: ${notes || 'لا يوجد'}\n\nيرجى تأكيد إمكانية الحجز. شكرًا لكم!`
      : `Hello Grand Cafe! 👋\nI would like to make a reservation with the following details:\n- Event Type: ${eventType}\n- Expected Guests: ${guestsCount}\n- Preferred Date: ${date || 'Not specified'}\n- Notes: ${notes || 'None'}\n\nPlease confirm availability. Thank you!`;

    const encoded = encodeURIComponent(formattedMessage);
    const cleanNumber = cafeConfig.whatsappNumber.replace(/[^0-9]/g, '');
    window.open(`https://wa.me/${cleanNumber}?text=${encoded}`, '_blank');
  };

  return (
    <section id="reservation" className="py-24 bg-cafe-warm/40 dark:bg-cafe-dark relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="bg-cafe-surface-light dark:bg-cafe-surface-dark border border-cafe-amber/20 rounded-3xl p-8 sm:p-12 shadow-warm-lg">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Text & Pitch Column */}
            <div className="lg:col-span-5">
              <span className="text-xs font-extrabold tracking-widest text-cafe-amber uppercase mb-2 block flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-cafe-gold" />
                {t('res.badge')}
              </span>
              <h2 className="text-3xl sm:text-5xl font-extrabold text-cafe-espresso dark:text-cafe-cream mb-4">
                {t('res.title')}
              </h2>
              <p className="text-base text-cafe-muted-light dark:text-cafe-muted-dark leading-relaxed mb-8">
                {t('res.subtitle')}
              </p>

              <div className="space-y-4 pt-4 border-t border-cafe-amber/15">
                <div className="flex items-center gap-3 text-sm font-semibold text-cafe-espresso dark:text-cafe-cream">
                  <CheckCircle2 className="w-5 h-5 text-cafe-amber flex-shrink-0" />
                  <span>تنسيق خاص لأعياد الميلاد والاحتفالات 🎂</span>
                </div>
                <div className="flex items-center gap-3 text-sm font-semibold text-cafe-espresso dark:text-cafe-cream">
                  <CheckCircle2 className="w-5 h-5 text-cafe-amber flex-shrink-0" />
                  <span>قعدات مخصصة للتجمعات الخاصة والعائلية 👥</span>
                </div>
                <div className="flex items-center gap-3 text-sm font-semibold text-cafe-espresso dark:text-cafe-cream">
                  <CheckCircle2 className="w-5 h-5 text-cafe-amber flex-shrink-0" />
                  <span>تجهيزات خاصة للحفلات والمناسبات 🎈</span>
                </div>
              </div>
            </div>

            {/* Interactive Form Column */}
            <div className="lg:col-span-7">
              <form onSubmit={handleWhatsAppBooking} className="bg-cafe-warm/50 dark:bg-cafe-card-dark border border-cafe-amber/20 rounded-2xl p-6 sm:p-8 space-y-6">
                
                {/* Event Type Choice (3 Options strictly requested: Birthday, Private Gathering, Party) */}
                <div>
                  <label className="block text-xs font-bold text-cafe-espresso dark:text-cafe-cream mb-2">
                    {t('res.eventType')}
                  </label>
                  <div className="grid grid-cols-3 gap-3">
                    {[
                      { id: 'Birthday', label: t('res.typeBirthday') },
                      { id: 'Gathering', label: t('res.typeGathering') },
                      { id: 'Party', label: t('res.typeParty') },
                    ].map((type) => (
                      <button
                        type="button"
                        key={type.id}
                        onClick={() => setEventType(type.id)}
                        className={`py-3 px-2 rounded-xl text-xs font-bold transition-all border text-center ${
                          eventType === type.id
                            ? 'bg-gold-gradient text-cafe-espresso border-cafe-gold shadow-sm'
                            : 'bg-cafe-surface-light dark:bg-cafe-surface-dark border-cafe-amber/20 text-cafe-espresso/80 dark:text-cafe-cream/80 hover:border-cafe-amber'
                        }`}
                      >
                        {type.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Guests Count & Date */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-cafe-espresso dark:text-cafe-cream mb-2">
                      {t('res.guests')}
                    </label>
                    <select
                      value={guestsCount}
                      onChange={(e) => setGuestsCount(e.target.value)}
                      className="w-full py-3 px-4 rounded-xl bg-cafe-surface-light dark:bg-cafe-surface-dark border border-cafe-amber/30 text-sm font-semibold text-cafe-espresso dark:text-cafe-cream focus:outline-none focus:border-cafe-gold"
                    >
                      <option value="1-2">1 - 2 أفراد</option>
                      <option value="3-5">3 - 5 أفراد</option>
                      <option value="6-10">6 - 10 أفراد</option>
                      <option value="10+">أكثر من 10 أفراد (مجموعة كبيرة)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-cafe-espresso dark:text-cafe-cream mb-2">
                      {t('res.date')}
                    </label>
                    <input
                      type="date"
                      value={date}
                      onChange={(e) => setDate(e.target.value)}
                      className="w-full py-3 px-4 rounded-xl bg-cafe-surface-light dark:bg-cafe-surface-dark border border-cafe-amber/30 text-sm font-semibold text-cafe-espresso dark:text-cafe-cream focus:outline-none focus:border-cafe-gold"
                    />
                  </div>
                </div>

                {/* Additional Notes */}
                <div>
                  <label className="block text-xs font-bold text-cafe-espresso dark:text-cafe-cream mb-2">
                    {t('res.notes')}
                  </label>
                  <textarea
                    rows={3}
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder="مثال: يرجى تجهيز طاولة في الجلسة المكيفة لحفل عيد ميلاد..."
                    className="w-full py-3 px-4 rounded-xl bg-cafe-surface-light dark:bg-cafe-surface-dark border border-cafe-amber/30 text-sm text-cafe-espresso dark:text-cafe-cream placeholder-cafe-muted-light dark:placeholder-cafe-muted-dark focus:outline-none focus:border-cafe-gold"
                  />
                </div>

                {/* Submit WhatsApp Button */}
                <button
                  type="submit"
                  className="w-full flex items-center justify-center gap-2.5 py-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-base shadow-lg transition-all transform hover:scale-[1.01]"
                >
                  <MessageCircle className="w-5 h-5 fill-white text-emerald-600" />
                  <span>{t('res.submitWhatsApp')}</span>
                </button>

              </form>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
