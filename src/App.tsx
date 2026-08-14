import React, { useState } from 'react';
import { LanguageProvider } from './context/LanguageContext';
import { ThemeProvider } from './context/ThemeContext';
import { Navbar } from './components/Navbar';
import { MobileBottomBar } from './components/MobileBottomBar';
import { Hero } from './components/Hero';
import { Experience } from './components/Experience';
import { SpotToggle } from './components/SpotToggle';
import { FeaturedFavorites } from './components/FeaturedFavorites';
import { DessertsShowcase } from './components/DessertsShowcase';
import { InteractiveMenu } from './components/InteractiveMenu';
import { CoffeeStory } from './components/CoffeeStory';
import { ReservationSection } from './components/ReservationSection';
import { ReviewsSection } from './components/ReviewsSection';
import { InstagramSection } from './components/InstagramSection';
import { LocationSection } from './components/LocationSection';
import { Footer } from './components/Footer';
import { OriginalMenuModal } from './components/OriginalMenuModal';

export const MainLayout: React.FC = () => {
  const [originalMenuModalOpen, setOriginalMenuModalOpen] = useState(false);

  const scrollToReservation = () => {
    const el = document.getElementById('reservation');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen flex flex-col selection:bg-cafe-amber selection:text-white">
      {/* Sticky Top Header Navigation */}
      <Navbar
        onOpenBooking={scrollToReservation}
        onOpenOriginalMenu={() => setOriginalMenuModalOpen(true)}
      />

      {/* Main Content Sections */}
      <main className="flex-grow">
        <Hero onOpenBooking={scrollToReservation} />
        <Experience />
        <SpotToggle />
        <FeaturedFavorites />
        <DessertsShowcase />
        <InteractiveMenu onOpenOriginalMenu={() => setOriginalMenuModalOpen(true)} />
        <CoffeeStory />
        <ReservationSection />
        <ReviewsSection />
        <InstagramSection />
        <LocationSection />
      </main>

      {/* Minimal Footer */}
      <Footer onOpenOriginalMenu={() => setOriginalMenuModalOpen(true)} />

      {/* Fixed Bottom Action Bar for Mobile Screens */}
      <MobileBottomBar onOpenBooking={scrollToReservation} />

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
        <MainLayout />
      </ThemeProvider>
    </LanguageProvider>
  );
}

export default App;
