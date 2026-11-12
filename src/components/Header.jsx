import React, { useState, useEffect } from 'react';
import { X, ChevronRight, Zap, Grid, LogIn } from 'lucide-react';

export default function Header({ currentPage, setCurrentPage, onOpenContact }) {
  const [scrolled, setScrolled] = useState(false);
  const [menuDropdownOpen, setMenuDropdownOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { id: 'home', label: 'HOME' },
    { id: 'register', label: 'PLAYER REGISTRATION', badge: 'NOV 16' },
    { id: 'about', label: 'ABOUT' },
    { id: 'league', label: 'THE LEAGUE' },
    { id: 'season1', label: 'SEASON 1', badge: 'SOON' },
    { id: 'teams', label: 'TEAMS' },
    { id: 'gallery', label: 'GALLERY' },
    { id: 'media', label: 'MEDIA' },
    { id: 'partners', label: 'PARTNERS' },
    { id: 'franchise', label: 'FRANCHISE' },
    { id: 'fans', label: 'FANS' },
    { id: 'contact', label: 'CONTACT' },
  ];

  const handleNavClick = (id) => {
    setCurrentPage(id);
    setMenuDropdownOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          scrolled ? 'glass-header-light py-2.5 shadow-lg' : 'bg-white/95 border-b-2 border-[#3854A4] py-3.5 shadow-sm'
        }`}
      >
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 flex items-center justify-between gap-2">
          {/* Official Logo Left */}
          <button
            onClick={() => handleNavClick('home')}
            className="flex items-center gap-2 group text-left focus:outline-none shrink-0"
          >
            <img
              src="/logo.png"
              alt="North Premier Volleyball League Logo"
              className="h-9 md:h-12 w-auto object-contain transition-transform group-hover:scale-105"
            />
            <div className="hidden sm:block">
              <span className="font-bebas text-xl md:text-2xl text-gray-900 tracking-wider block leading-none group-hover:text-[#3854A4] transition-colors">
                NPVL
              </span>
              <span className="text-[9px] text-[#3854A4] tracking-widest block uppercase font-bold">
                North Premier League
              </span>
            </div>
          </button>

          {/* Right side: REGISTER NOW CTA + MENU Button + JOIN THE JOURNEY */}
          <div className="flex items-center gap-1.5 md:gap-3">
            {/* Direct Quick Register Button */}
            <button
              onClick={() => handleNavClick('register')}
              className="bg-[#E82024] hover:bg-[#C71216] text-white text-[11px] font-bold uppercase tracking-wider px-2.5 sm:px-3.5 py-2 rounded-lg shadow-sm flex items-center gap-1.5 transition-all animate-pulse"
            >
              <Zap className="w-3 h-3 text-white" />
              <span>REGISTER</span>
            </button>

            {/* All Pages MENU Button */}
            <button
              onClick={() => setMenuDropdownOpen(!menuDropdownOpen)}
              className="flex items-center gap-1.5 bg-gray-100 hover:bg-blue-50/50 border-2 border-gray-300 hover:border-[#3854A4] text-gray-900 text-xs font-bold uppercase tracking-wider px-2.5 sm:px-3 py-2 rounded-lg transition-all shadow-2xs"
            >
              <Grid className="w-3.5 h-3.5 text-[#3854A4]" />
              <span>MENU</span>
            </button>

            {/* LOGIN Button (Right next to Menu) */}
            <button
              onClick={() => handleNavClick('login-hub')}
              className="flex items-center gap-1.5 bg-blue-50/80 hover:bg-blue-100 border-2 border-[#3854A4] text-[#3854A4] text-xs font-bold uppercase tracking-wider px-2.5 sm:px-3.5 py-2 rounded-lg transition-all shadow-2xs"
            >
              <LogIn className="w-3.5 h-3.5 text-[#3854A4]" />
              <span>LOGIN</span>
            </button>

            {/* JOIN THE JOURNEY — icon only on mobile, full text on sm+ */}
            <button
              onClick={onOpenContact}
              className="red-sweep-btn bg-[#121C38] hover:bg-[#1E293B] border border-[#3854A4] text-white text-xs font-bold uppercase tracking-wider px-3 sm:px-4 md:px-5 py-2 rounded-lg shadow-md hover:shadow-lg transition-all whitespace-nowrap hidden sm:inline-block"
            >
              <span>ENQUIRE</span>
            </button>
          </div>
        </div>
      </header>

      {/* Clean Interactive All Pages MENU Directory Modal */}
      {menuDropdownOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-md flex items-start justify-center pt-10 sm:pt-20 px-3 sm:px-4 animate-fadeIn">
          <div className="bg-white border-2 border-[#3854A4] rounded-2xl w-full max-w-lg sm:max-w-3xl p-3.5 sm:p-6 md:p-8 shadow-2xl relative max-h-[88vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-gray-200 pb-3 mb-3 sm:mb-4">
              <div className="flex items-center gap-2">
                <img src="/logo.png" alt="NPVL" className="h-7 sm:h-8 w-auto" />
                <div>
                  <h3 className="font-bebas text-lg sm:text-2xl text-gray-900 tracking-wider leading-none">
                    NPVL DIRECTORY
                  </h3>
                  <p className="text-[9px] sm:text-[10px] text-[#3854A4] font-bold uppercase tracking-widest">
                    INSPIRE. EMPOWER. UNITE.
                  </p>
                </div>
              </div>
              <button
                onClick={() => setMenuDropdownOpen(false)}
                className="p-1.5 text-gray-500 hover:text-gray-900 rounded-full hover:bg-gray-100"
              >
                <X className="w-5 h-5 text-[#3854A4]" />
              </button>
            </div>

            {/* Grid of All Pages */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 sm:gap-3">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`flex items-center justify-between p-2 sm:p-3.5 rounded-xl border-2 text-left font-bebas text-sm sm:text-lg md:text-xl tracking-wider transition-all ${
                    currentPage === item.id
                      ? 'bg-[#3854A4] text-white border-[#3854A4] shadow-md'
                      : 'bg-gray-50 hover:bg-blue-50/50 text-gray-900 border-gray-200 hover:border-[#3854A4]'
                  }`}
                >
                  <span className="flex items-center gap-1 truncate">
                    {item.label}
                    {item.badge && (
                      <span className="text-[8px] sm:text-[9px] bg-[#E82024] text-white px-1 py-0.5 rounded font-sans font-bold shrink-0">
                        {item.badge}
                      </span>
                    )}
                  </span>
                  <ChevronRight className={`w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0 ${currentPage === item.id ? 'text-white' : 'text-[#3854A4]'}`} />
                </button>
              ))}
            </div>

            <div className="mt-4 pt-4 border-t border-gray-200 flex flex-col sm:flex-row items-center justify-between gap-3">
              <span className="text-[10px] text-gray-500 font-bold uppercase text-center sm:text-left">
                NORTH PREMIER VOLLEYBALL LEAGUE
              </span>
              <button
                onClick={() => {
                  setMenuDropdownOpen(false);
                  onOpenContact();
                }}
                className="w-full sm:w-auto bg-[#E82024] hover:bg-[#C71216] text-white font-bold text-xs uppercase tracking-wider px-5 py-2.5 rounded-lg shadow-md"
              >
                JOIN THE JOURNEY
              </button>
            </div>
          </div>
        </div>
      )}

    </>
  );
}
