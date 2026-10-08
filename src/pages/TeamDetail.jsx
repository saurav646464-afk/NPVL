import React, { useEffect } from 'react';
import { Shield, MapPin, Trophy, Users, Calendar, ArrowLeft, ArrowRight, Zap, CheckCircle2, Award, Star, Mail } from 'lucide-react';
import { teamsData, getTeamById } from '../data/teamsData';
import MobileCarousel from '../components/MobileCarousel';

export default function TeamDetail({ teamId = 'up', setCurrentPage, onSelectTeam, onOpenContact }) {
  const team = getTeamById(teamId) || teamsData[0];
  const otherTeams = teamsData.filter(t => t.id !== team.id);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [teamId]);

  return (
    <div className="min-h-screen bg-white text-gray-900 pt-28 pb-20 px-4 sm:px-6 lg:px-8 animate-fadeIn">
      <div className="max-w-7xl mx-auto space-y-12">
        
        {/* Top Back Navigation Bar */}
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-gray-200 pb-4">
          <button
            onClick={() => {
              if (setCurrentPage) setCurrentPage('teams');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="inline-flex items-center gap-2 text-xs font-montserrat font-bold uppercase tracking-wider text-gray-600 hover:text-[#E50914] transition-colors py-1.5 px-3 rounded-lg hover:bg-gray-100"
          >
            <ArrowLeft className="w-4 h-4 text-[#E50914]" />
            <span>BACK TO ALL TEAMS</span>
          </button>

          <div className="flex items-center gap-2 text-xs text-gray-400 font-montserrat font-semibold">
            <span className="hover:text-gray-700 cursor-pointer" onClick={() => setCurrentPage('home')}>HOME</span>
            <span>/</span>
            <span className="hover:text-gray-700 cursor-pointer" onClick={() => setCurrentPage('teams')}>TEAMS</span>
            <span>/</span>
            <span className="text-[#E50914] font-bold uppercase">{team.name}</span>
          </div>
        </div>

        {/* Hero Banner Header */}
        <div className="relative bg-gradient-to-br from-gray-900 via-gray-950 to-black text-white rounded-3xl p-6 sm:p-10 md:p-12 overflow-hidden shadow-2xl border-2 border-[#E50914]/40">
          {/* Subtle background image */}
          <img
            src={team.bgBanner}
            alt={team.name}
            className="absolute inset-0 w-full h-full object-cover opacity-15 mix-blend-luminosity pointer-events-none"
          />
          {/* Ambient red light glow */}
          <div className="absolute -top-24 -right-24 w-96 h-96 bg-[#E50914]/25 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Logo Left */}
            <div className="lg:col-span-4 flex flex-col items-center justify-center">
              <div className="relative w-44 h-44 sm:w-56 sm:h-56 bg-white p-4 rounded-3xl shadow-2xl border-4 border-[#E50914] flex items-center justify-center group">
                <img
                  src={team.logo}
                  alt={team.name}
                  className="w-full h-full object-contain filter drop-shadow-xl transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <span className="mt-3 text-xs font-montserrat font-bold text-gray-300 uppercase tracking-widest">
                OFFICIAL FRANCHISE EMBLEM
              </span>
            </div>

            {/* Team Info Right */}
            <div className="lg:col-span-8 space-y-4 text-center lg:text-left">
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2.5">
                <span className="bg-[#E50914] text-white font-montserrat font-bold text-xs uppercase tracking-widest px-3 py-1 rounded-full shadow-md">
                  TEAM #{team.teamNumber}
                </span>
                <span className="bg-white/10 backdrop-blur-md text-gray-200 border border-white/20 font-montserrat font-semibold text-xs uppercase tracking-wider px-3 py-1 rounded-full">
                  {team.region}
                </span>
                <span className="bg-white/10 backdrop-blur-md text-[#E50914] border border-[#E50914]/40 font-montserrat font-bold text-xs uppercase tracking-wider px-3 py-1 rounded-full flex items-center gap-1">
                  <Shield className="w-3.5 h-3.5" />
                  SEASON 1 FOUNDING FRANCHISE
                </span>
              </div>

              <h1 className="font-montserrat font-black text-3xl sm:text-6xl md:text-7xl text-white tracking-wider uppercase leading-none break-words">
                {team.name}
              </h1>

              <p className="text-sm sm:text-lg text-gray-300 font-sans italic max-w-2xl">
                "{team.tagline}"
              </p>

              <div className="pt-2 flex flex-wrap items-center justify-center lg:justify-start gap-3">
                <button
                  onClick={onOpenContact}
                  className="red-sweep-btn bg-[#E50914] hover:bg-[#B20710] text-white font-montserrat font-bold text-xs uppercase tracking-wider px-6 py-3 rounded-xl shadow-lg transition-all"
                >
                  ENQUIRE ABOUT THIS FRANCHISE
                </button>
                <button
                  onClick={() => {
                    const el = document.getElementById('team-hubs-section');
                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="bg-white/10 hover:bg-white/20 text-white border border-white/30 font-montserrat font-bold text-xs uppercase tracking-wider px-5 py-3 rounded-xl transition-all"
                >
                  VIEW HOME ARENAS
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Key Quick Stats Strip */}
        <MobileCarousel desktopClass="sm:grid-cols-3">
          <div className="bg-gray-50 border-2 border-gray-200 p-6 rounded-2xl shadow-sm hover:border-[#E50914] transition-colors text-center h-full">
            <span className="text-xs font-montserrat font-bold text-gray-500 uppercase tracking-widest block mb-1">
              ESTABLISHED STATUS
            </span>
            <div className="font-bebas text-3xl sm:text-4xl text-[#E50914] tracking-wider">
              {team.stats.championships}
            </div>
            <p className="text-xs text-gray-600 font-medium mt-1">Official Season 1 Founding Franchise</p>
          </div>

          <div className="bg-gray-50 border-2 border-gray-200 p-6 rounded-2xl shadow-sm hover:border-[#E50914] transition-colors text-center h-full">
            <span className="text-xs font-montserrat font-bold text-gray-500 uppercase tracking-widest block mb-1">
              REGIONAL REACH
            </span>
            <div className="font-bebas text-3xl sm:text-4xl text-gray-900 tracking-wider">
              {team.stats.targetFanbase}
            </div>
            <p className="text-xs text-gray-600 font-medium mt-1">Across {team.region} territory</p>
          </div>

          <div className="bg-gray-50 border-2 border-gray-200 p-6 rounded-2xl shadow-sm hover:border-[#E50914] transition-colors text-center h-full">
            <span className="text-xs font-montserrat font-bold text-gray-500 uppercase tracking-widest block mb-1">
              HOME ARENA CAPACITY
            </span>
            <div className="font-bebas text-3xl sm:text-4xl text-[#E50914] tracking-wider">
              {team.stats.homeCapacity}
            </div>
            <p className="text-xs text-gray-600 font-medium mt-1">Proposed Match Infrastructure</p>
          </div>
        </MobileCarousel>

        {/* Franchise Overview & Key Strengths */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Column: Story */}
          <div className="lg:col-span-7 bg-white border-2 border-gray-200 p-8 rounded-3xl shadow-md space-y-6">
            <div className="inline-flex items-center gap-2 bg-[#E50914]/10 border border-[#E50914]/30 px-3 py-1 rounded-full text-[#E50914] text-xs font-bold uppercase tracking-widest font-montserrat">
              <Zap className="w-3.5 h-3.5" />
              <span>FRANCHISE BLUEPRINT & IDENTITY</span>
            </div>

            <h2 className="font-montserrat font-bold text-2xl sm:text-3xl text-gray-900 uppercase">
              ABOUT {team.name}
            </h2>

            <p className="text-sm sm:text-base text-gray-700 leading-relaxed font-medium">
              {team.description}
            </p>

            <div className="space-y-3 pt-2">
              <h3 className="font-montserrat font-bold text-sm uppercase tracking-wider text-gray-900">
                FRANCHISE CORE STRENGTHS:
              </h3>
              <div className="space-y-2">
                {team.strengths.map((str, idx) => (
                  <div key={idx} className="flex items-center gap-3 bg-gray-50 p-3 rounded-xl border border-gray-200">
                    <CheckCircle2 className="w-4 h-4 text-[#E50914] shrink-0" />
                    <span className="text-sm font-semibold text-gray-800">{str}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Home Venues & Hubs */}
          <div id="team-hubs-section" className="lg:col-span-5 bg-gray-50 border-2 border-gray-200 p-8 rounded-3xl shadow-md space-y-6">
            <div className="inline-flex items-center gap-2 bg-[#E50914]/10 border border-[#E50914]/30 px-3 py-1 rounded-full text-[#E50914] text-xs font-bold uppercase tracking-widest font-montserrat">
              <MapPin className="w-3.5 h-3.5" />
              <span>TERRITORY & HOST INFRASTRUCTURE</span>
            </div>

            <h2 className="font-montserrat font-bold text-2xl sm:text-3xl text-gray-900 uppercase">
              HOME ARENAS & HUBS
            </h2>

            <p className="text-xs sm:text-sm text-gray-600 font-medium">
              Official and proposed home venues, high-performance training grounds, and match arenas for {team.name}.
            </p>

            <div className="space-y-3">
              {team.homeVenues.map((venue, idx) => (
                <div key={idx} className="bg-white p-4 rounded-xl border border-gray-200 shadow-2xs flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-[#E50914]/10 text-[#E50914] flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                    0{idx + 1}
                  </div>
                  <div>
                    <h4 className="font-montserrat font-bold text-sm text-gray-900">{venue}</h4>
                    <span className="text-[11px] text-gray-500 font-medium">North Premier League Season 1 Circuit</span>
                  </div>
                </div>
              ))}
            </div>

            <div className="p-4 bg-white border border-[#E50914]/30 rounded-2xl flex items-center justify-between">
              <div>
                <span className="text-[10px] font-bold text-[#E50914] uppercase tracking-wider block">PRIMARY BASE</span>
                <span className="font-montserrat font-bold text-sm text-gray-900">{team.primaryHub}</span>
              </div>
              <span className="text-xs bg-[#E50914] text-white px-3 py-1 rounded-lg font-montserrat font-bold">
                CONFIRMED
              </span>
            </div>
          </div>
        </div>

        {/* Roster Draft & Technical Staff Section */}
        <div className="bg-white border-2 border-gray-200 p-8 sm:p-10 rounded-3xl shadow-md space-y-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-gray-200 pb-6">
            <div>
              <div className="inline-flex items-center gap-2 bg-[#E50914]/10 border border-[#E50914]/30 px-3 py-1 rounded-full text-[#E50914] text-xs font-bold uppercase tracking-widest font-montserrat mb-2">
                <Users className="w-3.5 h-3.5" />
                <span>TECHNICAL SQUAD & ROSTER</span>
              </div>
              <h2 className="font-montserrat font-bold text-3xl sm:text-4xl text-gray-900 uppercase">
                {team.name} SQUAD STRUCTURE
              </h2>
            </div>
            <span className="text-xs font-montserrat font-bold text-[#E50914] bg-[#E50914]/10 px-3.5 py-1.5 rounded-full border border-[#E50914]/30">
              SEASON 1 PLAYER DRAFT PENDING
            </span>
          </div>

          <MobileCarousel desktopClass="sm:grid-cols-2 lg:grid-cols-4">
            {[
              { role: 'HEAD COACH', status: 'To be revealed at Season 1 Launch Event', icon: Award },
              { role: 'TEAM CAPTAIN', status: 'Announced post Player Auction', icon: Star },
              { role: 'ATTACKERS & SETTERS', status: '12-Player Squad Draft Pipeline', icon: Users },
              { role: 'LIBERO & SPECIALISTS', status: 'High-Performance Roster Selection', icon: Shield },
            ].map((card, idx) => {
              const Icon = card.icon;
              return (
                <div key={idx} className="bg-gray-50 border-2 border-gray-200 p-6 rounded-2xl flex flex-col justify-between space-y-4 hover:border-[#E50914] transition-all group h-full">
                  <div>
                    <div className="w-10 h-10 rounded-xl bg-[#E50914]/10 text-[#E50914] flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                      <Icon className="w-5 h-5" />
                    </div>
                    <h3 className="font-montserrat font-bold text-base text-gray-900 tracking-wider">
                      {card.role}
                    </h3>
                    <p className="text-xs text-gray-600 font-medium mt-2 leading-relaxed">
                      {card.status}
                    </p>
                  </div>
                  <div className="pt-3 border-t border-gray-200 text-[10px] font-bold text-[#E50914] uppercase tracking-wider">
                    NPVL DRAFT ALLOCATION
                  </div>
                </div>
              );
            })}
          </MobileCarousel>

          <div className="bg-gradient-to-r from-gray-900 to-black text-white p-6 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-center sm:text-left">
              <h4 className="font-montserrat font-bold text-base uppercase">ARE YOU AN ATHLETE OR COACH?</h4>
              <p className="text-xs text-gray-300">Submit your profile to the official NPVL Talent Registry for Season 1 player scouting.</p>
            </div>
            <button
              onClick={onOpenContact}
              className="bg-[#E50914] hover:bg-[#B20710] text-white font-montserrat font-bold text-xs uppercase tracking-wider px-5 py-2.5 rounded-lg whitespace-nowrap shadow-md"
            >
              REGISTER FOR TRIALS
            </button>
          </div>
        </div>

        {/* Commercial & Franchise Ownership CTA */}
        <div className="relative bg-[#E50914] text-white rounded-3xl p-8 sm:p-12 overflow-hidden shadow-2xl text-center space-y-4">
          <div className="relative z-10 max-w-3xl mx-auto space-y-4">
            <span className="text-xs font-montserrat font-bold uppercase tracking-widest bg-white/20 px-3 py-1 rounded-full border border-white/30 inline-block">
              COMMERCIAL & PARTNERSHIP RIGHTS
            </span>
            <h2 className="font-montserrat font-black text-3xl sm:text-5xl text-white uppercase tracking-wider">
              OWN OR PARTNER WITH {team.name}
            </h2>
            <p className="text-xs sm:text-sm text-white/90 max-w-2xl mx-auto font-sans leading-relaxed">
              Explore founding equity franchise rights, principal jersey branding, match-day experiential activations, and regional commercial partnerships for {team.name} across {team.region}.
            </p>
            <button
              onClick={onOpenContact}
              className="bg-white text-gray-900 hover:bg-gray-100 font-montserrat font-bold text-xs uppercase tracking-widest px-8 py-3.5 rounded-xl shadow-xl transition-all inline-flex items-center gap-2 mt-2"
            >
              <Mail className="w-4 h-4 text-[#E50914]" />
              <span>REQUEST FRANCHISE DOSSIER</span>
            </button>
          </div>
        </div>

        {/* Explore Other Franchises Strip */}
        <div className="space-y-6 pt-6 border-t border-gray-200">
          <div className="flex items-center justify-between">
            <h3 className="font-montserrat font-bold text-xl sm:text-2xl text-gray-900 uppercase">
              EXPLORE OTHER NPVL FRANCHISES
            </h3>
            <button
              onClick={() => {
                if (setCurrentPage) setCurrentPage('teams');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="text-xs font-montserrat font-bold text-[#E50914] uppercase hover:underline"
            >
              VIEW ALL 7 TEAMS →
            </button>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {otherTeams.map((other) => (
              <button
                key={other.id}
                onClick={() => {
                  if (onSelectTeam) onSelectTeam(other.id);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="bg-gray-50 hover:bg-white border-2 border-gray-200 hover:border-[#E50914] p-4 rounded-2xl text-center transition-all duration-300 shadow-2xs hover:shadow-lg flex flex-col items-center justify-between group"
              >
                <div className="w-16 h-16 my-2 flex items-center justify-center p-1 group-hover:scale-110 transition-transform">
                  <img src={other.logo} alt={other.name} className="w-full h-full object-contain" />
                </div>
                <div className="w-full">
                  <span className="font-montserrat font-bold text-xs text-gray-900 block leading-tight truncate group-hover:text-[#E50914] transition-colors">
                    {other.name}
                  </span>
                  <span className="text-[10px] text-gray-500 font-semibold block mt-0.5 uppercase truncate">
                    {other.region}
                  </span>
                </div>
              </button>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
