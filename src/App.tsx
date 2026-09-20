import React, { useState } from 'react';
import { LanguageProvider } from './context/LanguageContext';
import { ThemeProvider } from './context/ThemeContext';
import { CartProvider } from './context/CartContext';
import { Navbar } from './components/Navbar';
import { MobileBottomBar } from './components/MobileBottomBar';
import { Hero } from './components/Hero';
import { Experience } from './components/Experience';
import { SpotToggle } from './components/SpotToggle';
import { PopularItems } from './components/PopularItems';
import { BakeryShowcase } from './components/BakeryShowcase';
import { InteractiveMenu } from './components/InteractiveMenu';
import { ReservationSection } from './components/ReservationSection';
import { ReviewsSection } from './components/ReviewsSection';
import { InstagramSection } from './components/InstagramSection';
import { LocationSection } from './components/LocationSection';
import { Footer } from './components/Footer';
import { OriginalMenuModal } from './components/OriginalMenuModal';
import { CartButton } from './components/cart/CartButton';
import { CartDrawer } from './components/cart/CartDrawer';
import { CheckoutDrawer } from './components/cart/CheckoutDrawer';
import { MarqueeTicker } from './components/MarqueeTicker';
import { CustomCursor } from './components/CustomCursor';
import { Analytics } from '@vercel/analytics/react';

export const MainLayout: React.FC = () => {
  const [originalMenuModalOpen, setOriginalMenuModalOpen] = useState(false);

  const scrollToReservation = () => {
    const el = document.getElementById('reservation');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-cafe-cream text-cafe-espresso dark:bg-cafe-espresso dark:text-cafe-cream selection:bg-cafe-amber selection:text-white transition-colors duration-300">
      {/* Custom Desktop Glow Cursor */}
      <CustomCursor />

      {/* Sticky Top Header Navigation */}
      <Navbar
        onOpenBooking={scrollToReservation}
        onOpenOriginalMenu={() => setOriginalMenuModalOpen(true)}
      />

      {/* Main Content Sections */}
      <main className="flex-grow">
        <Hero onOpenBooking={scrollToReservation} />
        <MarqueeTicker />
        <Experience />
        <SpotToggle />
        <PopularItems />
        <BakeryShowcase />
        <InteractiveMenu onOpenOriginalMenu={() => setOriginalMenuModalOpen(true)} />
        <InstagramSection />
        <ReservationSection />
        <ReviewsSection />
        <LocationSection />
      </main>

      {/* Minimal Footer */}
      <Footer onOpenOriginalMenu={() => setOriginalMenuModalOpen(true)} />

      {/* Fixed Bottom Action Bar for Mobile Screens */}
      <MobileBottomBar onOpenBooking={scrollToReservation} />

      {/* Cart System */}
      <CartButton />
      <CartDrawer />
      <CheckoutDrawer />

      {/* Original Paper Menu Lightbox Modal */}
      <OriginalMenuModal
        isOpen={originalMenuModalOpen}
        onClose={() => setOriginalMenuModalOpen(false)}
      />
    </div>
  );
};

export function App() {
  return (
    <LanguageProvider>
      <ThemeProvider>
        <CartProvider>
          <MainLayout />
          <Analytics />
        </CartProvider>
      </ThemeProvider>
    </LanguageProvider>
  );
}

export default App;
