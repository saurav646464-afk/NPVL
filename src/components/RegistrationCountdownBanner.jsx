import React from 'react';
import { ArrowRight, CheckCircle2, Sparkles, Zap } from 'lucide-react';

export default function RegistrationCountdownBanner({ onNavigateRegister }) {
  return (
    <div className="relative overflow-hidden bg-gradient-to-r from-[#121C38] via-[#1E293B] to-[#121C38] border-b-2 border-[#E82024] text-white shadow-xl">
      {/* Background Ambient Glows */}
      <div className="absolute -left-20 -top-20 w-60 h-60 bg-[#3854A4]/30 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -right-20 -top-20 w-60 h-60 bg-[#E82024]/20 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 sm:py-4 relative z-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">

          {/* Left: Status Badge + Title */}
          <div className="flex items-center gap-3 text-center md:text-left">
            {/* Live Pulsing Dot */}
            <span className="relative flex h-3 w-3 shrink-0">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-green-400"></span>
            </span>
            <div>
              <div className="flex items-center gap-2 flex-wrap justify-center md:justify-start">
                <span className="text-[11px] font-extrabold uppercase tracking-widest text-green-400 bg-green-400/10 border border-green-400/40 px-2 py-0.5 rounded-full flex items-center gap-1">
                  <Sparkles className="w-3 h-3" /> REGISTRATIONS OPEN
                </span>
                <span className="text-[11px] font-bold text-gray-300">
                  NPVL • NORTH PREMIER VOLLEYBALL LEAGUE — SEASON 1
                </span>
              </div>
              <h3 className="font-bebas text-lg sm:text-2xl text-white tracking-wider mt-0.5">
                🏐 SEASON 1 PLAYER REGISTRATIONS ARE <span className="text-green-400">OFFICIALLY LIVE!</span>
              </h3>
            </div>
          </div>

          {/* Center: Live status badges */}
          <div className="flex items-center gap-2 sm:gap-3 bg-black/40 backdrop-blur-md px-4 py-2 rounded-2xl border border-white/10 shadow-inner">
            <CheckCircle2 className="w-4 h-4 text-green-400 shrink-0" />
            <div className="flex items-center gap-3 text-center font-mono">
              <div className="flex flex-col items-center">
                <span className="font-bebas text-xl sm:text-2xl text-green-400 font-bold leading-none">LIVE</span>
                <span className="text-[9px] uppercase tracking-wider text-gray-400">Status</span>
              </div>
              <span className="text-gray-500 font-bold">|</span>
              <div className="flex flex-col items-center">
                <span className="font-bebas text-xl sm:text-2xl text-white font-bold leading-none">₹500</span>
                <span className="text-[9px] uppercase tracking-wider text-gray-400">Reg. Fee</span>
              </div>
              <span className="text-gray-500 font-bold">|</span>
              <div className="flex flex-col items-center">
                <span className="font-bebas text-xl sm:text-2xl text-[#E82024] font-bold leading-none">S1</span>
                <span className="text-[9px] uppercase tracking-wider text-[#E82024]">Season</span>
              </div>
            </div>
          </div>

          {/* Right: CTA Button */}
          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={onNavigateRegister}
              className="red-sweep-btn bg-[#E82024] hover:bg-[#C71216] text-white font-bebas text-base sm:text-lg tracking-wider px-5 py-2.5 rounded-xl shadow-lg flex items-center gap-2 transition-all group"
            >
              <Zap className="w-4 h-4" />
              <span>REGISTER NOW</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}
