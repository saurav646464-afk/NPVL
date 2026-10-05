import React from 'react';
import { Shield, Lock, Sparkles, Zap } from 'lucide-react';

export default function Teams({ onOpenContact }) {
  const teams = [
    { id: '01', label: 'TEAM 01', region: '[City / Region]' },
    { id: '02', label: 'TEAM 02', region: '[City / Region]' },
    { id: '03', label: 'TEAM 03', region: '[City / Region]' },
    { id: '04', label: 'TEAM 04', region: '[City / Region]' },
    { id: '05', label: 'TEAM 05', region: '[City / Region]' },
    { id: '06', label: 'TEAM 06', region: '[City / Region]' },
    { id: '07', label: 'TEAM 07', region: '[City / Region]' },
  ];

  return (
    <div className="min-h-screen bg-white text-gray-900 pt-28 pb-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-16">
        <div className="text-center max-w-4xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 bg-[#E50914]/10 border border-[#E50914]/30 px-3.5 py-1 rounded-full text-[#E50914] text-xs font-bold uppercase tracking-widest">
            <Sparkles className="w-3.5 h-3.5" />
            <span>SEASON 1 FRANCHISES</span>
          </div>
          <h1 className="font-bebas text-6xl sm:text-8xl text-gray-900 tracking-wider uppercase leading-none">
            SEVEN TEAMS. <br />
            <span className="text-[#E50914]">ONE NORTH.</span>
          </h1>
          <p className="text-sm md:text-base text-gray-700 font-medium leading-relaxed">
            Official team names, regional identities, and brand crests will be unveiled at the official Season 1 Launch event.
          </p>
        </div>

        {/* Teams Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {teams.map((team, i) => (
            <div
              key={team.id}
              className="group relative border-2 border-gray-200 hover:border-[#E50914] rounded-2xl p-8 text-center transition-all duration-300 shadow-sm hover:shadow-md flex flex-col items-center justify-between overflow-hidden"
            >
              {/* Court background image */}
              <img
                src="https://images.unsplash.com/photo-1554068865-24cecd4e34b8?w=600&q=70&auto=format&fit=crop"
                alt="Volleyball court"
                className="absolute inset-0 w-full h-full object-cover opacity-10 group-hover:opacity-20 transition-opacity duration-300"
              />
              <div className="relative z-10 w-full">
                <div className="flex items-center justify-between text-xs text-gray-500 font-bold mb-6">
                  <span className="font-bebas text-xl text-[#E50914]">FRANCHISE #{team.id}</span>
                  <Lock className="w-4 h-4 text-[#E50914]" />
                </div>

                <div className="relative w-24 h-24 mx-auto mb-6 flex items-center justify-center">
                  <div className="absolute inset-0 border-2 border-dashed border-[#E50914]/40 rounded-full group-hover:border-[#E50914] group-hover:scale-105 transition-all duration-500" />
                  <div className="w-18 h-18 bg-white border-2 border-[#E50914] rounded-2xl flex items-center justify-center shadow-md">
                    <Shield className="w-8 h-8 text-[#E50914]" />
                  </div>
                </div>

                <h3 className="font-bebas text-3xl text-gray-900 tracking-wider mb-1 group-hover:text-[#E50914] transition-colors">
                  {team.label}
                </h3>
                <p className="text-xs text-gray-500 font-mono font-bold mb-4">{team.region}</p>
              </div>

              <div className="relative z-10 w-full pt-4 border-t border-gray-200">
                <span className="inline-block w-full bg-[#E50914]/10 group-hover:bg-[#E50914] text-[#E50914] group-hover:text-white font-bold text-xs uppercase tracking-widest py-2 rounded border border-[#E50914]/30 transition-all">
                  COMING SOON
                </span>
              </div>
            </div>
          ))}

          {/* 8th Card */}
          <div className="bg-gray-900 text-white border-2 border-[#E50914] rounded-2xl p-8 text-center flex flex-col items-center justify-between shadow-md">
            <div className="space-y-4">
              <Zap className="w-10 h-10 text-[#E50914] mx-auto animate-bounce" />
              <h3 className="font-bebas text-3xl text-white tracking-wider">OWN A FRANCHISE</h3>
              <p className="text-xs text-gray-300 font-medium">
                Interested in owning an NPVL Season 1 team? Enquire about franchise rights and regional partnerships.
              </p>
            </div>
            <button
              onClick={onOpenContact}
              className="w-full bg-[#E50914] hover:bg-[#B20710] text-white font-bold text-xs uppercase tracking-wider py-3 rounded shadow-md mt-6"
            >
              ENQUIRE ABOUT FRANCHISE
            </button>
          </div>
        </div>

        <p className="text-center text-xs text-gray-500 font-bold italic">
          Official team names, logos, player drafts, and squad rosters will be formally announced at the NPVL Season 1 Launch event.
        </p>
      </div>
    </div>
  );
}
