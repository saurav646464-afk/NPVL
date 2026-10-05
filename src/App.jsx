import React, { useState } from 'react';
import IntroAnimation from './components/IntroAnimation';
import Header from './components/Header';
import Footer from './components/Footer';
import CustomCursor from './components/CustomCursor';
import ContactModal from './components/ContactModal';

// Pages
import Home from './pages/Home';
import About from './pages/About';
import TheLeague from './pages/TheLeague';
import Season1 from './pages/Season1';
import Teams from './pages/Teams';
import Media from './pages/Media';
import Partners from './pages/Partners';
import Franchise from './pages/Franchise';
import Ecosystem from './pages/Ecosystem';
import Fans from './pages/Fans';
import Contact from './pages/Contact';

export default function App() {
  const [showIntro, setShowIntro] = useState(true);
  const [currentPage, setCurrentPage] = useState('home');
  const [contactModalOpen, setContactModalOpen] = useState(false);
  const [modalInterest, setModalInterest] = useState('General Enquiry');

  const openContactWithInterest = (interest = 'General Enquiry') => {
    setModalInterest(interest);
    setContactModalOpen(true);
  };

  const handleReplayIntro = () => {
    setShowIntro(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <Home setCurrentPage={setCurrentPage} onOpenContact={() => openContactWithInterest('General Enquiry')} />;
      case 'about':
        return <About onOpenContact={() => openContactWithInterest('General Enquiry')} />;
      case 'league':
        return <TheLeague onOpenContact={() => openContactWithInterest('General Enquiry')} />;
      case 'season1':
        return <Season1 onOpenContact={() => openContactWithInterest('General Enquiry')} />;
      case 'teams':
        return <Teams onOpenContact={() => openContactWithInterest('Franchise')} />;
      case 'media':
        return <Media />;
      case 'partners':
        return <Partners onOpenContact={() => openContactWithInterest('Partnership')} />;
      case 'franchise':
        return <Franchise onOpenContact={() => openContactWithInterest('Franchise')} />;
      case 'ecosystem':
        return <Ecosystem />;
      case 'fans':
        return <Fans onOpenContact={() => openContactWithInterest('Community')} />;
      case 'contact':
        return <Contact />;
      default:
        return <Home setCurrentPage={setCurrentPage} onOpenContact={() => openContactWithInterest('General Enquiry')} />;
    }
  };

  return (
    <div className="relative min-h-screen bg-[#070708] text-white selection:bg-[#E50914] selection:text-white">
      {/* Desktop Custom Cursor */}
      <CustomCursor />

      {/* Unique Website Opening Animation */}
      {showIntro && <IntroAnimation onComplete={() => setShowIntro(false)} />}

      {/* Global Sticky Header */}
      <Header
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        onOpenContact={() => openContactWithInterest('General Enquiry')}
      />

      {/* Main Content Area */}
      <main className="relative z-10">
        {renderPage()}
      </main>

      {/* Global Footer */}
      <Footer
        setCurrentPage={setCurrentPage}
        onReplayIntro={handleReplayIntro}
        onOpenContact={() => openContactWithInterest('General Enquiry')}
      />

      {/* Global Contact & Enquiry Modal */}
      <ContactModal
        isOpen={contactModalOpen}
        onClose={() => setContactModalOpen(false)}
        initialInterest={modalInterest}
      />
    </div>
  );
}
