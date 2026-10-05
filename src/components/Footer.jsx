import React from 'react';
import { ArrowUpRight } from 'lucide-react';

export default function Footer({ setCurrentPage, onOpenContact }) {
  const navLinks = [
    { id: 'home', label: 'HOME' },
    { id: 'about', label: 'ABOUT' },
    { id: 'league', label: 'THE LEAGUE' },
    { id: 'season1', label: 'SEASON 1' },
    { id: 'teams', label: 'TEAMS' },
    { id: 'media', label: 'MEDIA' },
    { id: 'partners', label: 'PARTNERS' },
    { id: 'franchise', label: 'FRANCHISE' },
    { id: 'fans', label: 'FANS' },
    { id: 'contact', label: 'CONTACT' },
  ];

  const socialLinks = [
    { name: 'YouTube', href: '#' },
    { name: 'Instagram', href: '#' },
    { name: 'Facebook', href: '#' },
    { name: 'X', href: '#' },
    { name: 'LinkedIn', href: '#' },
  ];

  return (
    <footer className="relative bg-gray-50 border-t-4 border-[#E50914] pt-16 pb-12 text-gray-900 overflow-hidden">
      {/* Subtle court-line background texture */}
      <img
        src="https://images.unsplash.com/photo-1554068865-24cecd4e34b8?w=1200&q=40&auto=format&fit=crop"
        alt=""
        aria-hidden="true"
        className="absolute inset-0 w-full h-full object-cover opacity-[0.04] pointer-events-none select-none"
      />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Top Branding Section */}
        <div className="flex flex-col items-center text-center mb-12">
          <img src="/logo.png" alt="NPVL Logo" className="h-20 md:h-28 w-auto object-contain mb-6 filter drop-shadow-md" />
          <span className="inline-block bg-[#E50914]/10 border border-[#E50914]/30 text-[#E50914] text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded-full mb-4">
            COMING SOON — SEASON 1
          </span>
          <h2 className="font-bebas text-5xl md:text-7xl lg:text-8xl tracking-wider text-gray-900 uppercase leading-none">
            NORTH PREMIER <span className="text-[#E50914]">VOLLEYBALL LEAGUE</span>
          </h2>
          <p className="font-bebas text-2xl md:text-4xl text-gray-800 tracking-[0.25em] uppercase mt-2">
            INSPIRE. <span className="text-[#E50914]">EMPOWER.</span> UNITE.
          </p>
        </div>

        {/* Navigation Grid */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-6 py-8 border-y border-gray-200 my-8">
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => {
                setCurrentPage(link.id);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="text-left font-bebas text-xl md:text-2xl text-gray-800 hover:text-[#E50914] transition-colors tracking-wide flex items-center justify-between group"
            >
              <span>{link.label}</span>
              <ArrowUpRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity text-[#E50914]" />
            </button>
          ))}
        </div>

        {/* Social Platforms Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6 py-6 border-b border-gray-200">
          <div className="flex items-center gap-4 flex-wrap justify-center sm:justify-start">
            <span className="text-xs uppercase font-bold text-gray-500 tracking-wider">OFFICIAL PLATFORMS:</span>
            {socialLinks.map((s) => (
              <a
                key={s.name}
                href={s.href}
                onClick={(e) => e.preventDefault()}
                className="text-xs font-bold text-gray-800 hover:text-[#E50914] transition-colors border border-gray-300 hover:border-[#E50914] bg-white px-3 py-1 rounded-md shadow-sm"
              >
                {s.name}
              </a>
            ))}
          </div>

          <span className="text-xs font-bold text-[#E50914] uppercase tracking-widest bg-[#E50914]/10 border border-[#E50914]/30 px-3 py-1 rounded-full">
            NORTH PREMIER VOLLEYBALL LEAGUE
          </span>
        </div>

        {/* Bottom Legal */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between text-xs text-gray-500 gap-4">
          <p>© {new Date().getFullYear()} North Premier Volleyball League (NPVL). All rights reserved.</p>
          <p className="text-center md:text-right max-w-xl">
            Proposed Season 1 structure. Venues, dates, and broadcast platforms subject to final confirmation.
          </p>
        </div>
      </div>
    </footer>
  );
}
