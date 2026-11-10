import React, { useState, useEffect } from 'react';
import { Timer, ArrowRight, Bell, Sparkles, CheckCircle2 } from 'lucide-react';

export default function RegistrationCountdownBanner({ onNavigateRegister }) {
  // Target: Monday 16/11/2026 00:00:00 IST
  const targetDate = new Date('2026-11-16T00:00:00+05:30').getTime();

  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    isLive: false,
  });

  useEffect(() => {
    const updateCountdown = () => {
      const now = new Date().getTime();
      const difference = targetDate - now;

      if (difference <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0, isLive: true });
      } else {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);
        setTimeLeft({ days, hours, minutes, seconds, isLive: false });
      }
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);
    return () => clearInterval(interval);
  }, [targetDate]);

  return (
    <div className="relative overflow-hidden bg-gradient-to-r from-[#121C38] via-[#1E293B] to-[#121C38] border-b-2 border-[#E82024] text-white shadow-xl">
      {/* Background Court Ambient Glows */}
      <div className="absolute -left-20 -top-20 w-60 h-60 bg-[#3854A4]/30 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -right-20 -top-20 w-60 h-60 bg-[#E82024]/20 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 sm:py-4 relative z-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          
          {/* Left Title & Status */}
          <div className="flex items-center gap-3 text-center md:text-left">
            <span className="relative flex h-3 w-3 shrink-0">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#E82024] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-[#E82024]"></span>
            </span>
            <div>
              <div className="flex items-center gap-2 flex-wrap justify-center md:justify-start">
                <span className="text-[11px] font-extrabold uppercase tracking-widest text-[#E82024] bg-[#E82024]/10 border border-[#E82024]/40 px-2 py-0.5 rounded-full">
                  OFFICIAL ANNOUNCEMENT
                </span>
                <span className="text-[11px] font-bold text-gray-300">
                  NPVL • NORTH PREMIER VOLLEYBALL LEAGUE — SEASON 1
                </span>
              </div>
              <h3 className="font-bebas text-lg sm:text-2xl text-white tracking-wider mt-0.5">
                PLAYER REGISTRATION STARTS <span className="text-[#E82024]">MONDAY 16/11/2026</span>
              </h3>
            </div>
          </div>

          {/* Center: Live Countdown Clock */}
          <div className="flex items-center gap-2 sm:gap-3 bg-black/40 backdrop-blur-md px-4 py-2 rounded-2xl border border-white/10 shadow-inner">
            <Timer className="w-4 h-4 text-[#3854A4] shrink-0" />
            <div className="flex items-center gap-1.5 sm:gap-2 text-center font-mono">
              <div className="flex flex-col">
                <span className="font-bebas text-xl sm:text-2xl text-white font-bold leading-none min-w-[28px]">
                  {String(timeLeft.days).padStart(2, '0')}
                </span>
                <span className="text-[9px] uppercase tracking-wider text-gray-400">Days</span>
              </div>
              <span className="text-gray-500 font-bold">:</span>
              <div className="flex flex-col">
                <span className="font-bebas text-xl sm:text-2xl text-white font-bold leading-none min-w-[28px]">
                  {String(timeLeft.hours).padStart(2, '0')}
                </span>
                <span className="text-[9px] uppercase tracking-wider text-gray-400">Hours</span>
              </div>
              <span className="text-gray-500 font-bold">:</span>
              <div className="flex flex-col">
                <span className="font-bebas text-xl sm:text-2xl text-white font-bold leading-none min-w-[28px]">
                  {String(timeLeft.minutes).padStart(2, '0')}
                </span>
                <span className="text-[9px] uppercase tracking-wider text-gray-400">Mins</span>
              </div>
              <span className="text-gray-500 font-bold">:</span>
              <div className="flex flex-col">
                <span className="font-bebas text-xl sm:text-2xl text-[#E82024] font-bold leading-none min-w-[28px]">
                  {String(timeLeft.seconds).padStart(2, '0')}
                </span>
                <span className="text-[9px] uppercase tracking-wider text-[#E82024]">Secs</span>
              </div>
            </div>
          </div>

          {/* Right: CTA Button */}
          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={onNavigateRegister}
              className="red-sweep-btn bg-[#E82024] hover:bg-[#C71216] text-white font-bebas text-base sm:text-lg tracking-wider px-5 py-2.5 rounded-xl shadow-lg flex items-center gap-2 transition-all group"
            >
              <span>VIEW REGISTRATION PORTAL</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}
