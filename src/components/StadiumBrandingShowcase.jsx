import React, { useState } from 'react';
import { Tv, Flame, Radio, Target, Shield, Users, Megaphone, Bus } from 'lucide-react';
import MobileCarousel from './MobileCarousel';

export default function StadiumBrandingShowcase({ onOpenContact }) {
  const [activeCategory, setActiveCategory] = useState('stadium');

  const stadiumBranding = [
    { title: 'Court-Side LED Boards', desc: 'Rotating high-frequency partner video messages along court perimeter visible in all broadcast angles.', icon: Tv },
    { title: 'Court Floor Branding', desc: 'Prime center-court and baseline decal placements visible during every spike and rally.', icon: Target },
    { title: 'Net & Post Branding', desc: 'High-impact logo integration on net tapes and referee posts featured in every closeup replay.', icon: Flame },
    { title: 'Officials Kit & Scorer Table', desc: 'Official score desk wrap and umpire apparel branding for continuous visual presence.', icon: Shield },
    { title: 'Backdrop & Podium', desc: 'Post-match press conference backdrops, player interviews, and trophy podium branding.', icon: Megaphone },
    { title: 'Entry Arches & Gates', desc: 'Immersive venue entrance arches creating first impressions for every arena spectator.', icon: Users },
    { title: 'Team Jerseys & Kits', desc: 'Front chest, back, sleeve, and short partner logo integration across all 7 squads.', icon: Shield },
    { title: 'Fan Zones & Stands', desc: 'Interactive brand experiential zones, concession stands, and spectator seating activation areas.', icon: Users },
  ];

  const outdoorBranding = [
    { title: 'Hoardings & Billboards', desc: 'High-traffic arterial city locations across Gautam Budh Nagar, Ludhiana, and Varanasi.', icon: Megaphone },
    { title: 'Bus Shelters & Transit', desc: 'Daily visibility along prime commuter routes and high-volume transportation hubs.', icon: Bus },
    { title: 'Pole Kiosks & City Branding', desc: 'Saturating major avenue lamp posts surrounding host stadiums and city centers.', icon: Target },
    { title: 'Roadshows & Trophy Tour', desc: 'Taking the NPVL Championship Trophy directly into high-footfall public plazas.', icon: Flame },
    { title: 'Malls & Campuses', desc: 'Experiential pop-up courts and activations where youth and college audiences gather.', icon: Users },
    { title: 'Auto & E-Rickshaw Branding', desc: 'Hyper-local moving media traversing every neighborhood across North Indian cities.', icon: Bus },
  ];

  const items = activeCategory === 'stadium' ? stadiumBranding : outdoorBranding;

  return (
    <div className="bg-gray-50 border-2 border-gray-200 rounded-2xl p-6 md:p-12 shadow-xl relative overflow-hidden">
      {/* Category Toggle Header */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pb-8 border-b border-gray-200 mb-8">
        <div>
          <span className="text-xs font-bold uppercase tracking-widest text-[#E50914] bg-[#E50914]/10 px-3 py-1 rounded-full border border-[#E50914]/30">
            360° BRAND VISIBILITY
          </span>
          <h3 className="font-bebas text-3xl md:text-5xl text-gray-900 tracking-wider uppercase mt-2">
            PREMIUM BRAND INTEGRATION
          </h3>
        </div>

        <div className="flex bg-white p-1 rounded-xl border border-gray-300 shadow-sm w-full sm:w-auto">
          <button
            onClick={() => setActiveCategory('stadium')}
            className={`flex-1 sm:flex-none px-3 sm:px-5 py-2 rounded-lg font-bebas text-sm sm:text-base md:text-lg tracking-wider transition-all leading-tight text-center ${
              activeCategory === 'stadium'
                ? 'bg-[#E50914] text-white shadow-md'
                : 'text-gray-700 hover:text-gray-900'
            }`}
          >
            IN-STADIUM BRANDING
          </button>
          <button
            onClick={() => setActiveCategory('outdoor')}
            className={`flex-1 sm:flex-none px-3 sm:px-5 py-2 rounded-lg font-bebas text-sm sm:text-base md:text-lg tracking-wider transition-all leading-tight text-center ${
              activeCategory === 'outdoor'
                ? 'bg-[#E50914] text-white shadow-md'
                : 'text-gray-700 hover:text-gray-900'
            }`}
          >
            OUTDOOR PROMOTION
          </button>
        </div>
      </div>

      {/* Branding Asset Cards */}
      <MobileCarousel desktopClass="grid-cols-2 lg:grid-cols-4">
        {items.map((item, idx) => {
          const Icon = item.icon;
          return (
            <div
              key={idx}
              className="group bg-white hover:bg-red-50/50 border border-gray-200 hover:border-[#E50914] p-6 rounded-xl transition-all duration-300 relative overflow-hidden flex flex-col justify-between shadow-sm hover:shadow-md h-full"
            >
              <div>
                <div className="w-12 h-12 rounded-lg bg-[#E50914]/10 border border-[#E50914]/30 flex items-center justify-center text-[#E50914] mb-4 group-hover:scale-105 transition-transform">
                  <Icon className="w-6 h-6" />
                </div>
                <h4 className="font-bebas text-2xl text-gray-900 tracking-wider mb-2 group-hover:text-[#E50914] transition-colors">
                  {item.title}
                </h4>
                <p className="text-xs text-gray-700 leading-relaxed font-sans">
                  {item.desc}
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-gray-100 flex items-center justify-between text-[10px] uppercase font-bold text-[#E50914] tracking-widest">
                <span>HIGH VISIBILITY</span>
                <span className="w-2 h-2 rounded-full bg-[#E50914]" />
              </div>
            </div>
          );
        })}
      </MobileCarousel>

      {/* Bottom Callout */}
      <div className="mt-12 p-6 rounded-xl bg-white border-2 border-[#E50914]/40 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-md">
        <div>
          <h4 className="font-bebas text-2xl md:text-3xl text-gray-900 tracking-wider">
            READY TO ELEVATE YOUR BRAND WITH NPVL?
          </h4>
          <p className="text-xs text-gray-600">
            Custom brand integration packages tailored for title, presenting, associate, and official category partners.
          </p>
        </div>
        <button
          onClick={onOpenContact}
          className="red-sweep-btn bg-[#E50914] hover:bg-[#B20710] text-white font-bold text-xs uppercase tracking-wider px-6 py-3 rounded whitespace-nowrap shadow-md"
        >
          BECOME A PARTNER
        </button>
      </div>
    </div>
  );
}

