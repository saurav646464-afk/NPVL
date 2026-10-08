import React from 'react';
import { Shield, Sparkles, Zap, ArrowRight } from 'lucide-react';
import NorthIndiaMap from '../components/NorthIndiaMap';
import MobileCarousel from '../components/MobileCarousel';
import { teamsData } from '../data/teamsData';

export default function Teams({ setCurrentPage, onSelectTeam, onOpenContact }) {
  const handleTeamClick = (teamId) => {
    if (onSelectTeam) {
      onSelectTeam(teamId);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-white text-gray-900 pt-28 pb-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-16">
        <div className="text-center max-w-4xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 bg-[#E50914]/10 border border-[#E50914]/30 px-3.5 py-1 rounded-full text-[#E50914] text-xs font-bold uppercase tracking-widest font-montserrat">
            <Sparkles className="w-3.5 h-3.5" />
            <span>OFFICIAL SEASON 1 FRANCHISES</span>
          </div>
          <h1 className="font-montserrat font-bold text-3xl sm:text-6xl md:text-7xl text-gray-900 tracking-wider uppercase leading-none break-words">
            SEVEN FRANCHISES. <br />
            <span className="text-[#E50914]">ONE NORTH.</span>
          </h1>
          <p className="text-xs sm:text-base text-gray-700 font-medium leading-relaxed font-sans">
            Representing the spirit, pride, and athletic power of North India across 7 key regional territories — 25 matches, 21 league + 3 qualification + 1 final.
          </p>
        </div>

        {/* Complete India Map with 7 Highlighted Franchise Territories */}
        <NorthIndiaMap onSelectTeam={onSelectTeam} onOpenContact={onOpenContact} />

        {/* 7 Teams Grid — Clickable to open individual team page */}
        <div>
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 mb-8 border-b border-gray-200 pb-4">
            <h2 className="font-montserrat font-black text-xl sm:text-3xl text-gray-900 uppercase">
              OFFICIAL SEASON 1 TEAM ROSTER
            </h2>
            <span className="text-xs font-montserrat font-bold text-[#E50914] bg-red-50 px-3 py-1 rounded-full border border-[#E50914]/30">
              CLICK ANY TEAM TO OPEN FULL PROFILE
            </span>
          </div>

          <MobileCarousel desktopClass="sm:grid-cols-2 lg:grid-cols-4">
            {teamsData.map((team) => (
              <div
                key={team.id}
                onClick={() => handleTeamClick(team.id)}
                className="group relative bg-white border-2 border-gray-200 hover:border-[#E50914] rounded-3xl p-6 text-center transition-all duration-300 shadow-sm hover:shadow-2xl flex flex-col items-center justify-between overflow-hidden cursor-pointer h-full"
              >
                {/* Subtle background glow */}
                <div className="absolute inset-0 bg-gradient-to-b from-gray-50 via-white to-red-50/20 opacity-60 group-hover:opacity-100 transition-opacity duration-300" />
                
                <div className="relative z-10 w-full flex flex-col items-center">
                  <div className="flex items-center justify-between text-xs text-gray-500 font-bold w-full mb-4">
                    <span className="font-montserrat font-bold text-sm text-[#E50914] tracking-wider">TEAM #{team.teamNumber}</span>
                    <span className="bg-gray-100 text-gray-700 text-[10px] font-montserrat font-semibold px-2 py-0.5 rounded border border-gray-200">
                      {team.region}
                    </span>
                  </div>

                  {/* Team Logo Container */}
                  <div className="relative w-32 h-32 md:w-36 md:h-36 mx-auto my-2 flex items-center justify-center p-2 group-hover:scale-108 transition-transform duration-300">
                    <img
                      src={team.logo}
                      alt={team.name}
                      className="w-full h-full object-contain filter drop-shadow-md group-hover:drop-shadow-xl transition-all"
                    />
                  </div>

                  <h3 className="font-montserrat font-black text-lg md:text-xl text-gray-900 tracking-wider my-3 group-hover:text-[#E50914] transition-colors leading-tight">
                    {team.name}
                  </h3>

                  <p className="text-xs text-gray-500 font-sans italic line-clamp-2 mb-2">
                    "{team.tagline}"
                  </p>
                </div>

                <div className="relative z-10 w-full pt-4 border-t border-gray-100 mt-2">
                  <span className="inline-flex items-center justify-center gap-1.5 w-full bg-[#E50914]/10 group-hover:bg-[#E50914] text-[#E50914] group-hover:text-white font-montserrat font-bold text-xs uppercase tracking-widest py-2.5 rounded-xl border border-[#E50914]/30 transition-all shadow-2xs">
                    <span>VIEW TEAM PROFILE</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>
            ))}
          </MobileCarousel>
        </div>

        {/* Own a Franchise Banner */}
        <div className="relative bg-gray-900 text-white border-2 border-[#E50914] rounded-3xl p-8 md:p-12 text-center overflow-hidden shadow-xl">
          <div className="relative z-10 max-w-3xl mx-auto space-y-4">
            <Zap className="w-10 h-10 text-[#E50914] mx-auto animate-pulse" />
            <h3 className="font-montserrat font-black text-3xl md:text-5xl text-white tracking-wider uppercase">
              OWN AN NPVL FRANCHISE
            </h3>
            <p className="text-xs md:text-sm text-gray-300 font-sans leading-relaxed">
              Interested in acquiring founding franchise rights, equity partnership, or regional commercial integrations for NPVL Season 1?
            </p>
            <button
              onClick={onOpenContact}
              className="red-sweep-btn bg-[#E50914] hover:bg-[#B20710] text-white font-montserrat font-bold text-xs uppercase tracking-wider px-8 py-3.5 rounded-xl shadow-md mt-4 transition-all"
            >
              ENQUIRE ABOUT FRANCHISE OWNERSHIP
            </button>
          </div>
        </div>

        <p className="text-center text-xs text-gray-500 font-sans font-medium italic">
          Official player drafts, squad rosters, head coaches, and match schedules will be announced at the NPVL Season 1 Launch event.
        </p>
      </div>
    </div>
  );
}
