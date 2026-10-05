import React, { useState } from 'react';
import { MapPin, Sparkles, CheckCircle2 } from 'lucide-react';

export default function NorthIndiaMap() {
  const [activeState, setActiveState] = useState(null);

  const states = [
    {
      id: 'up',
      name: 'Uttar Pradesh',
      code: 'UP',
      tagline: 'Heartland of Indian Volleyball & Key Host Region',
      cities: ['Gautam Budh Nagar (Host)', 'Varanasi (Host)', 'Lucknow', 'Kanpur'],
      color: '#E50914',
      path: "M 320,180 L 450,150 L 580,240 L 520,340 L 380,310 L 320,240 Z"
    },
    {
      id: 'punjab',
      name: 'Punjab',
      code: 'PB',
      tagline: 'Home of Athletic Powerhouse & Ludhiana Host City',
      cities: ['Ludhiana (Host)', 'Jalandhar', 'Amritsar', 'Patiala'],
      color: '#E50914',
      path: "M 180,100 L 250,90 L 260,160 L 190,170 L 170,120 Z"
    },
    {
      id: 'haryana',
      name: 'Haryana',
      code: 'HR',
      tagline: 'Cradle of Champions & High-Energy Sports Culture',
      cities: ['Gurugram', 'Faridabad', 'Rohtak', 'Hisar'],
      color: '#E50914',
      path: "M 250,160 L 310,150 L 320,220 L 260,230 L 240,180 Z"
    },
    {
      id: 'rajasthan',
      name: 'Rajasthan',
      code: 'RJ',
      tagline: 'Massive Grassroots Reach & Youth Passion',
      cities: ['Jaipur', 'Jodhpur', 'Udaipur', 'Kota'],
      color: '#E50914',
      path: "M 120,170 L 240,180 L 280,300 L 150,330 L 100,240 Z"
    },
    {
      id: 'delhi',
      name: 'Delhi NCR',
      code: 'DL',
      tagline: 'Capital Sporting Hub & Media Center',
      cities: ['New Delhi', 'NCR Hubs'],
      color: '#E50914',
      path: "M 295,190 L 315,190 L 315,210 L 295,210 Z"
    },
    {
      id: 'chandigarh',
      name: 'Chandigarh',
      code: 'CH',
      tagline: 'Union Territory Sports Apex',
      cities: ['Chandigarh Sector 42 Sports Complex'],
      color: '#E50914',
      path: "M 255,140 L 270,140 L 270,155 L 255,155 Z"
    },
    {
      id: 'hp',
      name: 'Himachal Pradesh',
      code: 'HP',
      tagline: 'High-Altitude Athletic Training & Talent',
      cities: ['Shimla', 'Dharamshala', 'Mandi'],
      color: '#E50914',
      path: "M 240,50 L 310,40 L 300,100 L 250,90 Z"
    },
    {
      id: 'uk',
      name: 'Uttarakhand',
      code: 'UK',
      tagline: 'Mountain Sporting Resilience & Academy Hubs',
      cities: ['Dehradun', 'Haridwar', 'Halwani'],
      color: '#E50914',
      path: "M 310,90 L 390,80 L 380,150 L 310,140 Z"
    },
  ];

  return (
    <div className="bg-white border-2 border-gray-200 rounded-2xl p-6 md:p-10 shadow-xl relative overflow-hidden">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        {/* Left Column */}
        <div className="lg:col-span-5 space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#E50914]/10 border border-[#E50914]/30 text-[#E50914] text-xs font-bold uppercase tracking-widest">
            <Sparkles className="w-3.5 h-3.5" />
            <span>OFFICIALLY APPROVED NORTH ZONE</span>
          </div>

          <h3 className="font-bebas text-4xl md:text-5xl text-gray-900 uppercase tracking-wider leading-none">
            NORTH INDIA <br />
            <span className="text-[#E50914]">VOLLEYBALL DOMAIN</span>
          </h3>

          <p className="text-sm text-gray-700 leading-relaxed font-sans">
            North India is the foundation of NPVL's regional focus. The league connects athletes, teams, communities and commercial partners across 8 core states and territories.
          </p>

          <div className="grid grid-cols-2 gap-2 pt-2">
            {states.map((st) => {
              const isSelected = activeState?.id === st.id;
              return (
                <button
                  key={st.id}
                  onMouseEnter={() => setActiveState(st)}
                  onClick={() => setActiveState(st)}
                  className={`flex items-center gap-2 p-2.5 rounded-lg border text-left transition-all duration-200 ${
                    isSelected
                      ? 'bg-[#E50914] border-[#E50914] text-white shadow-md scale-[1.02]'
                      : 'bg-gray-50 border-gray-200 text-gray-800 hover:border-[#E50914] hover:bg-red-50'
                  }`}
                >
                  <MapPin className={`w-4 h-4 ${isSelected ? 'text-white' : 'text-[#E50914]'}`} />
                  <span className="text-xs font-bold uppercase tracking-wider">{st.name}</span>
                </button>
              );
            })}
          </div>

          {activeState && (
            <div className="p-4 rounded-xl bg-gray-50 border-2 border-[#E50914] animate-fadeIn shadow-sm">
              <div className="flex items-center justify-between mb-2">
                <span className="font-bebas text-2xl text-gray-900 tracking-wider">{activeState.name}</span>
                <span className="text-xs font-bold text-[#E50914] bg-[#E50914]/10 px-2.5 py-0.5 rounded border border-[#E50914]/30">
                  {activeState.code}
                </span>
              </div>
              <p className="text-xs text-gray-700 font-bold mb-3">{activeState.tagline}</p>
              <div className="flex flex-wrap gap-1.5">
                {activeState.cities.map((city, idx) => (
                  <span key={idx} className="text-[11px] bg-white text-gray-900 px-2 py-1 rounded border border-gray-300 flex items-center gap-1 font-medium shadow-2xs">
                    <CheckCircle2 className="w-3 h-3 text-[#E50914]" />
                    {city}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Right Column SVG Map */}
        <div className="lg:col-span-7 flex flex-col items-center justify-center relative">
          <div className="relative w-full max-w-lg aspect-[4/3] bg-gray-50 border border-gray-300 rounded-2xl p-4 flex items-center justify-center shadow-inner">
            <svg viewBox="0 0 600 400" className="w-full h-full filter drop-shadow-md">
              <pattern id="gridLight" width="30" height="30" patternUnits="userSpaceOnUse">
                <path d="M 30 0 L 0 0 0 30" fill="none" stroke="rgba(0,0,0,0.05)" strokeWidth="1" />
              </pattern>
              <rect width="100%" height="100%" fill="url(#gridLight)" />

              {states.map((st) => {
                const isHovered = activeState?.id === st.id;
                return (
                  <g key={st.id} onMouseEnter={() => setActiveState(st)} onClick={() => setActiveState(st)}>
                    <path
                      d={st.path}
                      className="state-path"
                      fill={isHovered ? '#E50914' : '#E2E8F0'}
                      stroke={isHovered ? '#FFFFFF' : '#E50914'}
                      strokeWidth={isHovered ? '3' : '1.5'}
                    />
                    <text
                      x={getCenter(st.id).x}
                      y={getCenter(st.id).y}
                      fill={isHovered ? '#FFFFFF' : '#1E293B'}
                      fontSize="12"
                      fontWeight="bold"
                      fontFamily="Bebas Neue"
                      letterSpacing="1"
                      textAnchor="middle"
                      className="pointer-events-none select-none"
                    >
                      {st.code}
                    </text>
                  </g>
                );
              })}
            </svg>

            <div className="absolute bottom-4 left-4 right-4 bg-white/90 backdrop-blur-md border border-gray-300 px-4 py-2 rounded-lg text-center text-xs text-gray-700 font-medium shadow-sm">
              Hover over or click any region to illuminate North Zone coverage in red.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function getCenter(id) {
  switch (id) {
    case 'hp': return { x: 275, y: 70 };
    case 'uk': return { x: 345, y: 115 };
    case 'punjab': return { x: 215, y: 130 };
    case 'chandigarh': return { x: 262, y: 147 };
    case 'haryana': return { x: 275, y: 190 };
    case 'delhi': return { x: 305, y: 200 };
    case 'up': return { x: 420, y: 240 };
    case 'rajasthan': return { x: 190, y: 240 };
    default: return { x: 300, y: 200 };
  }
}
