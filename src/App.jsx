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
import TeamDetail from './pages/TeamDetail';
import TermsAndConditions from './pages/TermsAndConditions';
import PrivacyPolicy from './pages/PrivacyPolicy';
import RefundPolicy from './pages/RefundPolicy';
import Register from './pages/Register';
import PlayerLogin from './pages/PlayerLogin';
import AdminDashboard from './pages/AdminDashboard';
import LoginHub from './pages/LoginHub';
import VerifyAccreditation from './pages/VerifyAccreditation';
import Gallery from './pages/Gallery';

export default function App() {
  const [showIntro, setShowIntro] = useState(false);
  const [currentPage, setCurrentPage] = useState(() => {
    // If URL has /verify or ?id= (from QR scan), open verify page
    if (window.location.search.includes('id=') || window.location.pathname.includes('verify')) {
      return 'verify';
    }
    return sessionStorage.getItem('npvl_current_page') || 'home';
  });
  const [adminLoggedIn, setAdminLoggedIn] = useState(() => {
    return sessionStorage.getItem('npvl_admin_logged_in') === 'true';
  });
  const [selectedTeamId, setSelectedTeamId] = useState('up');
  const [contactModalOpen, setContactModalOpen] = useState(false);
  const [modalInterest, setModalInterest] = useState('General Enquiry');

  // Sync state changes with sessionStorage so refresh preserves current page & session
  const navigatePage = (page) => {
    setCurrentPage(page);
    sessionStorage.setItem('npvl_current_page', page);
  };

  const handleAdminLoginState = (isLoggedIn) => {
    setAdminLoggedIn(isLoggedIn);
    if (isLoggedIn) {
      sessionStorage.setItem('npvl_admin_logged_in', 'true');
    } else {
      sessionStorage.removeItem('npvl_admin_logged_in');
    }
  };

  const openContactWithInterest = (interest = 'General Enquiry') => {
    setModalInterest(interest);
    setContactModalOpen(true);
  };

  const handleSelectTeam = (teamId) => {
    setSelectedTeamId(teamId);
    navigatePage('team-detail');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleReplayIntro = () => {
    setShowIntro(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return (
          <Home
            setCurrentPage={navigatePage}
            onSelectTeam={handleSelectTeam}
            onOpenContact={() => openContactWithInterest('General Enquiry')}
          />
        );
      case 'about':
        return <About onOpenContact={() => openContactWithInterest('General Enquiry')} />;
      case 'league':
        return <TheLeague onOpenContact={() => openContactWithInterest('General Enquiry')} />;
      case 'season1':
        return <Season1 onOpenContact={() => openContactWithInterest('General Enquiry')} />;
      case 'teams':
        return (
          <Teams
            setCurrentPage={navigatePage}
            onSelectTeam={handleSelectTeam}
            onOpenContact={() => openContactWithInterest('Franchise')}
          />
        );
      case 'team-detail':
        return (
          <TeamDetail
            teamId={selectedTeamId}
            setCurrentPage={navigatePage}
            onSelectTeam={handleSelectTeam}
            onOpenContact={() => openContactWithInterest('Franchise')}
          />
        );
      case 'media':
        return <Media />;
      case 'gallery':
        return <Gallery />;
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
      case 'register':
        return <Register onOpenContact={() => openContactWithInterest('General Enquiry')} setCurrentPage={navigatePage} />;
      case 'login-hub':
        return <LoginHub setCurrentPage={navigatePage} setAdminLoggedIn={handleAdminLoginState} />;
      case 'player-login':
        return <PlayerLogin setCurrentPage={navigatePage} />;
      case 'admin':
        return <AdminDashboard setCurrentPage={navigatePage} initialAuthenticated={adminLoggedIn} setAdminLoggedIn={handleAdminLoginState} />;
      case 'terms':
        return <TermsAndConditions onOpenContact={() => openContactWithInterest('General Enquiry')} />;
      case 'privacy':
        return <PrivacyPolicy onOpenContact={() => openContactWithInterest('General Enquiry')} />;
      case 'refund':
        return <RefundPolicy onOpenContact={() => openContactWithInterest('General Enquiry')} />;
      case 'verify':
        return <VerifyAccreditation setCurrentPage={navigatePage} />;
      default:
        return (
          <Home
            setCurrentPage={navigatePage}
            onSelectTeam={handleSelectTeam}
            onOpenContact={() => openContactWithInterest('General Enquiry')}
          />
        );
    }
  };

  return (
    <div className="relative min-h-screen bg-[#070708] text-white selection:bg-[#3854A4] selection:text-white">
      {/* Desktop Custom Cursor */}
      <CustomCursor />

      {/* Unique Website Opening Animation */}
      {showIntro && <IntroAnimation onComplete={() => setShowIntro(false)} />}

      {/* Global Sticky Header */}
      <Header
        currentPage={currentPage}
        setCurrentPage={navigatePage}
        onOpenContact={() => openContactWithInterest('General Enquiry')}
      />

      {/* Main Content Area */}
      <main className="relative z-10">
        {renderPage()}
      </main>

      {/* Global Footer */}
      <Footer
        setCurrentPage={navigatePage}
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
