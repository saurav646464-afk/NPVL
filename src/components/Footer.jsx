import React from 'react';

export default function Footer({ setCurrentPage, onOpenContact }) {
  const quickLinks = [
    { id: 'home',     label: 'Home' },
    { id: 'teams',    label: 'Teams' },
    { id: 'media',    label: 'Media' },
    { id: 'partners', label: 'Partners' },
    { id: 'contact',  label: 'Contact' },
  ];

  const go = (id) => {
    setCurrentPage(id);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-white border-t-2 border-[#E50914]/30 pt-10 pb-6 text-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Top row: logo + quick links */}
        <div className="flex flex-col sm:flex-row items-center sm:items-start justify-between gap-8 pb-8 border-b border-gray-200">

          {/* Logo + tagline */}
          <div className="flex flex-col items-center sm:items-start gap-2 shrink-0">
            <img src="/logo.png" alt="NPVL" className="h-14 w-auto object-contain" />
            <p className="text-[10px] font-bold uppercase tracking-widest text-gray-500">
              North Premier Volleyball League
            </p>
            <span className="text-[10px] font-bold uppercase tracking-widest text-[#E50914] bg-[#E50914]/10 border border-[#E50914]/30 px-2 py-0.5 rounded-full">
              COMING SOON — SEASON 1
            </span>
          </div>

          {/* Quick links */}
          <nav className="flex flex-wrap justify-center sm:justify-end gap-x-6 gap-y-2">
            {quickLinks.map((l) => (
              <button
                key={l.id}
                onClick={() => go(l.id)}
                className="text-sm font-bold text-gray-700 hover:text-[#E50914] transition-colors uppercase tracking-wide"
              >
                {l.label}
              </button>
            ))}
          </nav>
        </div>

        {/* Social + CTA row */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 py-6 border-b border-gray-200">
          <div className="flex items-center gap-3 flex-wrap justify-center">
            <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400">Follow us:</span>
            {['YouTube', 'Instagram', 'Facebook', 'X'].map((s) => (
              <a
                key={s}
                href="#"
                onClick={(e) => e.preventDefault()}
                className="text-xs font-bold text-gray-700 hover:text-[#E50914] transition-colors"
              >
                {s}
              </a>
            ))}
            <span className="text-gray-300">|</span>
            <a
              href="mailto:hello@npvlofficial.com"
              className="text-xs font-bold text-[#E50914] hover:underline"
            >
              ✉ hello@npvlofficial.com
            </a>
          </div>
          <button
            onClick={onOpenContact}
            className="bg-[#E50914] hover:bg-[#B20710] text-white text-xs font-bold uppercase tracking-wider px-5 py-2.5 rounded-lg shadow-sm transition-all whitespace-nowrap"
          >
            JOIN THE JOURNEY
          </button>
        </div>

        {/* Bottom legal */}
        <div className="pt-5 flex flex-col sm:flex-row items-center justify-between text-[11px] text-gray-400 font-medium gap-2 text-center sm:text-left">
          <p>© {new Date().getFullYear()} NPVL. All rights reserved.</p>
          <p>Proposed structure. Dates & venues subject to confirmation.</p>
        </div>

      </div>
    </footer>
  );
}
