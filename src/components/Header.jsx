import React, { useState, useEffect } from 'react';
import { X, ChevronRight, Zap, Grid } from 'lucide-react';

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
    { id: 'about', label: 'ABOUT' },
    { id: 'league', label: 'THE LEAGUE' },
    { id: 'season1', label: 'SEASON 1', badge: 'SOON' },
    { id: 'teams', label: 'TEAMS' },
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
          scrolled ? 'glass-header-light py-2.5 shadow-lg' : 'bg-white/95 border-b-2 border-[#E50914] py-3.5 shadow-sm'
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
              <span className="font-bebas text-xl md:text-2xl text-gray-900 tracking-wider block leading-none group-hover:text-[#E50914] transition-colors">
                NPVL
              </span>
              <span className="text-[9px] text-gray-500 tracking-widest block uppercase font-bold">
                North Premier League
              </span>
            </div>
          </button>

          {/* Right side: MENU Button + COMING SOON Badge + JOIN THE JOURNEY CTA */}
          <div className="flex items-center gap-2 md:gap-3.5">
            {/* All Pages MENU Button */}
            <button
              onClick={() => setMenuDropdownOpen(!menuDropdownOpen)}
              className="flex items-center gap-1.5 bg-gray-100 hover:bg-gray-200 border-2 border-gray-300 hover:border-[#E50914] text-gray-900 text-xs font-bold uppercase tracking-wider px-3 py-2 rounded-lg transition-all shadow-2xs"
            >
              <Grid className="w-3.5 h-3.5 text-[#E50914]" />
              <span>MENU</span>
            </button>

            {/* COMING SOON Badge — hidden on mobile */}
            <div className="hidden sm:flex items-center gap-1.5 bg-[#E50914]/10 border border-[#E50914]/30 text-[#E50914] text-[10px] uppercase font-bold tracking-widest px-3 py-2 rounded-full">
              <Zap className="w-3 h-3 animate-pulse" />
              <span>COMING SOON</span>
            </div>

            {/* JOIN THE JOURNEY — icon only on mobile, full text on sm+ */}
            <button
              onClick={onOpenContact}
              className="red-sweep-btn bg-[#E50914] hover:bg-[#B20710] text-white text-xs font-bold uppercase tracking-wider px-3 sm:px-5 md:px-6 py-2.5 rounded-lg shadow-md hover:shadow-lg transition-all whitespace-nowrap"
            >
              <span className="hidden sm:inline">JOIN THE JOURNEY</span>
              <span className="sm:hidden">JOIN</span>
            </button>
          </div>
        </div>
      </header>

      {/* Clean Interactive All Pages MENU Directory Modal */}
      {menuDropdownOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-md flex items-start justify-center pt-20 p-4 animate-fadeIn">
          <div className="bg-white border-2 border-[#E50914] rounded-2xl w-full max-w-3xl p-6 md:p-8 shadow-2xl relative">
            <div className="flex items-center justify-between border-b border-gray-200 pb-4 mb-6">
              <div className="flex items-center gap-3">
                <img src="/logo.png" alt="NPVL" className="h-10 w-auto" />
                <div>
                  <h3 className="font-bebas text-2xl text-gray-900 tracking-wider leading-none">
                    NPVL LEAGUE DIRECTORY
                  </h3>
                  <p className="text-xs text-gray-500 font-bold uppercase tracking-widest">
                    INSPIRE. EMPOWER. UNITE.
                  </p>
                </div>
              </div>
              <button
                onClick={() => setMenuDropdownOpen(false)}
                className="p-2 text-gray-500 hover:text-gray-900 rounded-full hover:bg-gray-100"
              >
                <X className="w-6 h-6 text-[#E50914]" />
              </button>
            </div>

            {/* Grid of All 10 Pages */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`flex items-center justify-between p-3.5 rounded-xl border-2 text-left font-bebas text-xl md:text-2xl tracking-wider transition-all ${
                    currentPage === item.id
                      ? 'bg-[#E50914] text-white border-[#E50914] shadow-md scale-[1.02]'
                      : 'bg-gray-50 hover:bg-red-50 text-gray-900 border-gray-200 hover:border-[#E50914]'
                  }`}
                >
                  <span className="flex items-center gap-2">
                    {item.label}
                    {item.badge && (
                      <span className="text-[10px] bg-[#E50914] text-white px-1.5 py-0.5 rounded font-sans font-bold">
                        {item.badge}
                      </span>
                    )}
                  </span>
                  <ChevronRight className={`w-5 h-5 ${currentPage === item.id ? 'text-white' : 'text-[#E50914]'}`} />
                </button>
              ))}
            </div>

            <div className="mt-6 pt-4 border-t border-gray-200 flex flex-col sm:flex-row items-center justify-between gap-3">
              <span className="text-xs text-gray-500 font-bold uppercase">
                NORTH PREMIER VOLLEYBALL LEAGUE — SEASON 1
              </span>
              <button
                onClick={() => {
                  setMenuDropdownOpen(false);
                  onOpenContact();
                }}
                className="w-full sm:w-auto bg-[#E50914] hover:bg-[#B20710] text-white font-bold text-xs uppercase tracking-wider px-6 py-2.5 rounded-lg shadow-md"
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
