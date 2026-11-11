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
    <footer className="bg-white border-t-2 border-[#3854A4]/30 pt-10 pb-6 text-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Top row: logo + quick links */}
        <div className="flex flex-col sm:flex-row items-center sm:items-start justify-between gap-8 pb-8 border-b border-gray-200">

          {/* Logo + tagline */}
          <div className="flex flex-col items-center sm:items-start gap-2 shrink-0">
            <img src="/logo.png" alt="NPVL" className="h-14 w-auto object-contain" />
            <p className="text-[10px] font-bold uppercase tracking-widest text-[#3854A4]">
              North Premier Volleyball League
            </p>
            <span className="text-[10px] font-bold uppercase tracking-widest text-[#E82024] bg-[#E82024]/10 border border-[#E82024]/30 px-2.5 py-0.5 rounded-full">
              COMING SOON — SEASON 1
            </span>
          </div>

          {/* Quick links */}
          <nav className="flex flex-wrap justify-center sm:justify-end gap-x-6 gap-y-2">
            {quickLinks.map((l) => (
              <button
                key={l.id}
                onClick={() => go(l.id)}
                className="text-sm font-bold text-gray-700 hover:text-[#3854A4] transition-colors uppercase tracking-wide"
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
            <a
              href="https://www.instagram.com/npvlofficial?psln=MW5tdTBza2o2b2ZnNg=="
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs font-bold text-[#E82024] hover:text-[#3854A4] transition-colors flex items-center gap-1"
            >
              Instagram
            </a>
            <span className="text-gray-300">•</span>
            {['YouTube', 'Facebook', 'X'].map((s) => (
              <a
                key={s}
                href="#"
                onClick={(e) => e.preventDefault()}
                className="text-xs font-bold text-gray-700 hover:text-[#3854A4] transition-colors"
              >
                {s}
              </a>
            ))}
            <span className="text-gray-300">|</span>
            <a
              href="mailto:hello@npvlofficial.com"
              className="text-xs font-bold text-[#3854A4] hover:text-[#E82024] transition-colors"
            >
              ✉ hello@npvlofficial.com
            </a>
          </div>
          <button
            onClick={onOpenContact}
            className="red-sweep-btn bg-[#E82024] hover:bg-[#C71216] text-white text-xs font-bold uppercase tracking-wider px-5 py-2.5 rounded-lg shadow-sm transition-all whitespace-nowrap"
          >
            JOIN THE JOURNEY
          </button>
        </div>

        {/* Bottom legal & Compliance */}
        <div className="pt-6 flex flex-col md:flex-row items-center justify-between text-xs text-gray-500 font-medium gap-4 text-center md:text-left">
          <div className="space-y-1">
            <p className="text-gray-900 font-bold">
              © {new Date().getFullYear()} North Premier Volleyball League (NPVL). All rights reserved.
            </p>
            <p className="text-[11px] text-gray-400">
              Official Media & Digital Infrastructure Partner: <strong className="text-gray-700">The Backstory Media</strong>
            </p>
          </div>

          {/* Mandatory Compliance Policy Links for Razorpay */}
          <div className="flex items-center gap-x-4 gap-y-2 flex-wrap justify-center text-xs">
            <button
              onClick={() => go('terms')}
              className="hover:text-[#3854A4] underline transition-colors"
            >
              Terms & Conditions
            </button>
            <span className="text-gray-300">•</span>
            <button
              onClick={() => go('privacy')}
              className="hover:text-[#3854A4] underline transition-colors"
            >
              Privacy Policy
            </button>
            <span className="text-gray-300">•</span>
            <button
              onClick={() => go('refund')}
              className="hover:text-[#3854A4] underline transition-colors"
            >
              Refund & Cancellation
            </button>
            <span className="text-gray-300">•</span>
            <button
              onClick={() => go('contact')}
              className="hover:text-[#3854A4] underline transition-colors"
            >
              Contact Us
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
}
