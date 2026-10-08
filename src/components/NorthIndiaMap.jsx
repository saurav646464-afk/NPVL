import React, { useState } from 'react';
import { MapPin, Sparkles, ChevronRight, ArrowRight, Shield } from 'lucide-react';
import { teamsData } from '../data/teamsData';
import MobileCarousel from './MobileCarousel';

export default function NorthIndiaMap({ onSelectTeam, onOpenContact }) {
  const [activeTeamId, setActiveTeamId] = useState(null);
  const [hoveredStateId, setHoveredStateId] = useState(null);

  // Map state configurations matched with exact locations on the attached map image
  const mapHotspots = [
    {
      id: 'up',
      code: 'UP',
      stateName: 'Uttar Pradesh',
      teamName: 'UP DOMINATORS',
      logo: '/UP Dominator Volleyball Team Emblem.png',
      color: '#1E5EFF', // Royal Blue
      accentClass: 'bg-blue-600',
      textAccent: 'text-blue-600',
      tagline: 'Heartland of Indian Volleyball & Host Arenas',
      cities: 'Gautam Budh Nagar · Varanasi · Lucknow',
      top: '36%',
      left: '45%',
      badgeTop: '33%',
      badgeLeft: '48%',
    },
    {
      id: 'rajasthan',
      code: 'RJ',
      stateName: 'Rajasthan',
      teamName: 'RAJASTHAN BULLS',
      logo: '/Rajasthan Bulls Charging Crest.png',
      color: '#FF7A00', // Orange
      accentClass: 'bg-orange-500',
      textAccent: 'text-orange-500',
      tagline: 'Charging Spirit of the Royal Desert Warriors',
      cities: 'Jaipur · Jodhpur · Udaipur · Kota',
      top: '35%',
      left: '20%',
      badgeTop: '32%',
      badgeLeft: '17%',
    },
    {
      id: 'punjab',
      code: 'PB',
      stateName: 'Punjab',
      teamName: 'PUNJAB PIRATES',
      logo: '/Punjab Pirates Volleyball Club Crest.png',
      color: '#15B825', // Green
      accentClass: 'bg-emerald-500',
      textAccent: 'text-emerald-500',
      tagline: 'Ludhiana Official Host City Arena & High Power',
      cities: 'Ludhiana (Host Arena) · Jalandhar',
      top: '24%',
      left: '25%',
      badgeTop: '21%',
      badgeLeft: '22%',
    },
    {
      id: 'haryana',
      code: 'HR',
      stateName: 'Haryana',
      teamName: 'HARYANA HAWKS',
      logo: '/Haryana Hawks Volleyball Emblem.png',
      color: '#FF1E27', // Bright Red
      accentClass: 'bg-red-600',
      textAccent: 'text-red-600',
      tagline: 'Cradle of Champions & Grassroots Powerhouses',
      cities: 'Gurugram · Rohtak · Faridabad',
      top: '28.5%',
      left: '29%',
      badgeTop: '26%',
      badgeLeft: '26%',
    },
    {
      id: 'delhi',
      code: 'DL',
      stateName: 'Delhi NCR',
      teamName: 'DELHI WARRIORS',
      logo: '/Delhi Warriors Golden Helmet Emblem.png',
      color: '#FFDC00', // Yellow
      accentClass: 'bg-amber-400',
      textAccent: 'text-amber-500',
      tagline: 'Capital Territory, Prime Media & Urban Power',
      cities: 'New Delhi · NCR Metropolitan Arenas',
      top: '31.5%',
      left: '33.5%',
      badgeTop: '29%',
      badgeLeft: '35%',
    },
    {
      id: 'chandigarh',
      code: 'CH',
      stateName: 'Chandigarh',
      teamName: 'CHANDIGARH HEROES',
      logo: '/Chandigarh Heroes Spartan Volleyball Crest.png',
      color: '#A800D6', // Purple
      accentClass: 'bg-purple-600',
      textAccent: 'text-purple-600',
      tagline: 'Spartan Discipline & Sector 42 Arena',
      cities: 'Sector 42 Sports Complex',
      top: '24%',
      left: '31%',
      badgeTop: '21%',
      badgeLeft: '33%',
    },
    {
      id: 'uk',
      code: 'UK',
      stateName: 'Uttarakhand',
      teamName: 'UTTARAKHAND UNITED',
      logo: '/Uttarakhand United Tiger Crest.png',
      color: '#00C4D6', // Cyan
      accentClass: 'bg-cyan-500',
      textAccent: 'text-cyan-600',
      tagline: 'Mountain Stamina & Relentless Fighting Spirit',
      cities: 'Dehradun · Haridwar · Haldwani',
      top: '27%',
      left: '42%',
      badgeTop: '24%',
      badgeLeft: '44%',
    },
  ];

  // Currently active team details from teamsData
  const activeTeam = teamsData.find(t => t.id === activeTeamId) || teamsData[0];
  const activeSpot = mapHotspots.find(s => s.id === activeTeamId) || mapHotspots[0];

  const handleTeamClick = (teamId) => {
    if (onSelectTeam) {
      onSelectTeam(teamId);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <div className="bg-white border-2 border-gray-200 rounded-3xl p-5 sm:p-8 md:p-10 shadow-xl relative overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#E50914]/5 rounded-full blur-3xl pointer-events-none" />

      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-gray-200 mb-8">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#E50914]/10 border border-[#E50914]/30 text-[#E50914] text-xs font-bold uppercase tracking-widest font-montserrat mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            <span>OFFICIAL INTERACTIVE FRANCHISE MAP</span>
          </div>
          <h2 className="font-montserrat font-bold text-3xl sm:text-5xl text-gray-900 tracking-wider uppercase leading-none">
            INDIA MAP — <span className="text-[#E50914]">7 NPVL TEAMS</span>
          </h2>
        </div>
        <div className="flex items-center gap-2">
          <span className="flex items-center gap-1.5 text-xs font-montserrat font-bold text-[#E50914] bg-red-50 border border-[#E50914]/30 px-3 py-1.5 rounded-lg">
            <span className="w-2.5 h-2.5 rounded-full bg-[#E50914] animate-pulse" />
            CLICK ANY STATE TO OPEN OFFICIAL TEAM PAGE
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        {/* Left Column — 7 Team Selectors & Active Profile Preview */}
        <div className="lg:col-span-6 space-y-6">
          <p className="text-sm text-gray-700 font-medium leading-relaxed">
            Explore NPVL's 7 official franchise states highlighted on the national map. Click on any state pin directly or select a franchise below to open their full team profile page.
          </p>

          {/* 7 Teams Quick Selector Carousel on Mobile / Grid on Desktop */}
          <MobileCarousel desktopClass="grid-cols-2">
            {mapHotspots.map((spot) => {
              const isSelected = activeTeamId === spot.id;
              return (
                <button
                  key={spot.id}
                  onClick={() => {
                    setActiveTeamId(spot.id);
                    handleTeamClick(spot.id);
                  }}
                  onMouseEnter={() => {
                    setActiveTeamId(spot.id);
                    setHoveredStateId(spot.id);
                  }}
                  onMouseLeave={() => setHoveredStateId(null)}
                  className={`w-full flex items-center justify-between p-3.5 rounded-2xl border text-left transition-all duration-200 group ${
                    isSelected
                      ? 'bg-gray-900 border-[#E50914] text-white shadow-lg'
                      : 'bg-gray-50 hover:bg-red-50/50 border-gray-200 text-gray-900 hover:border-[#E50914]'
                  }`}
                >
                  <div className="flex items-center gap-3 truncate">
                    {/* Color dot indicator matching exact map color */}
                    <span
                      className="w-3.5 h-3.5 rounded-full shrink-0 shadow-xs ring-2 ring-white"
                      style={{ backgroundColor: spot.color }}
                    />
                    <img
                      src={spot.logo}
                      alt={spot.teamName}
                      className="w-9 h-9 object-contain shrink-0 filter drop-shadow-xs"
                    />
                    <div className="truncate">
                      <span className="font-montserrat font-bold text-xs sm:text-sm block leading-tight truncate">
                        {spot.teamName}
                      </span>
                      <span className={`text-[10px] font-semibold uppercase tracking-wider ${isSelected ? 'text-gray-300' : 'text-gray-500'}`}>
                        {spot.stateName}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-1.5 shrink-0">
                    <span className="text-[10px] font-montserrat font-bold uppercase tracking-wider text-[#E50914] hidden sm:inline group-hover:underline">
                      VIEW
                    </span>
                    <ChevronRight className={`w-4 h-4 transition-transform group-hover:translate-x-0.5 ${isSelected ? 'text-[#E50914]' : 'text-gray-400 group-hover:text-[#E50914]'}`} />
                  </div>
                </button>
              );
            })}
          </MobileCarousel>
        </div>

        {/* Right Column — Exact Map Image with Interactive Clickable Hotspots & Pins */}
        <div className="lg:col-span-6 flex flex-col items-center justify-center relative">
          <div className="relative w-full max-w-[480px] bg-gradient-to-b from-slate-50 via-white to-slate-50 border-2 border-gray-200 rounded-3xl p-3 sm:p-4 shadow-xl overflow-hidden group">
            
            {/* Exact India Map Image */}
            <div className="relative w-full overflow-hidden rounded-2xl select-none">
              <img
                src="/india-npvl-map.png"
                alt="NPVL India Map"
                className="w-full h-auto object-contain block mx-auto filter drop-shadow-sm"
              />

              {/* Interactive State Pins / Hotspots overlay */}
              {mapHotspots.map((spot) => {
                const isSelected = activeTeamId === spot.id;
                const isHovered = hoveredStateId === spot.id;
                const active = isSelected || isHovered;

                return (
                  <div
                    key={spot.id}
                    style={{ top: spot.top, left: spot.left }}
                    onClick={() => handleTeamClick(spot.id)}
                    onMouseEnter={() => {
                      setActiveTeamId(spot.id);
                      setHoveredStateId(spot.id);
                    }}
                    onMouseLeave={() => setHoveredStateId(null)}
                    className="absolute -translate-x-1/2 -translate-y-1/2 cursor-pointer z-20 group/pin"
                  >
                    {/* Subtle radar effect on active/hovered state */}
                    {active && (
                      <span
                        className="absolute -inset-1.5 rounded-full animate-ping opacity-60 pointer-events-none"
                        style={{ backgroundColor: spot.color }}
                      />
                    )}

                    {/* Sleek Interactive Marker Pin */}
                    <div
                      className={`relative flex items-center justify-center transition-all duration-200 rounded-full border shadow-sm ${
                        active
                          ? 'w-6 h-6 sm:w-7 sm:h-7 scale-110 shadow-lg ring-2 ring-white'
                          : 'w-5 h-5 sm:w-6 sm:h-6 hover:scale-110'
                      }`}
                      style={{
                        backgroundColor: spot.color,
                        borderColor: '#FFFFFF',
                      }}
                    >
                      <span className="font-montserrat font-black text-[8px] sm:text-[9px] text-white tracking-tighter select-none leading-none">
                        {spot.code}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Bottom floating instruction overlay */}
            <div className="mt-3 bg-white/95 border border-gray-200 py-2 px-3 rounded-xl flex items-center justify-between text-[11px] text-gray-700 shadow-2xs">
              <span className="font-montserrat font-bold flex items-center gap-1 text-[#E50914]">
                <MapPin className="w-3.5 h-3.5" />
                TAP ANY PIN OR STATE TO OPEN TEAM PAGE
              </span>
              <span className="text-[10px] text-gray-500 font-semibold hidden sm:inline">
                OFFICIAL NPVL MAP
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
