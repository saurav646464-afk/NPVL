import React from 'react';
import { Users, Award, Gift, Flag, Smile, Sparkles, Zap, Heart, Camera } from 'lucide-react';
import MobileCarousel from '../components/MobileCarousel';

export default function Fans({ onOpenContact }) {
  const fanPillars = [
    { title: 'LOCAL TEAM SUPPORT & FAN GROUPS', desc: 'Rallying city communities behind their official regional volleyball franchises.', icon: Flag },
    { title: 'OPEN TRIALS & COMMUNITY DAYS', desc: 'Grassroots talent scouting events and open community volleyball play days in host cities.', icon: Users },
    { title: 'SCHOOL & COLLEGE OUTREACH', desc: 'School clinics, campus ambassador programs, and inter-university fan zones.', icon: Award },
    { title: 'FAN CONTESTS & GIVEAWAYS', desc: 'Daily match trivia, player signables, jersey giveaways, and VIP court-side passes.', icon: Gift },
    { title: 'PLAYER MEET & GREETS', desc: 'Direct fan interaction sessions, autograph signings, and arena fan photo opportunities.', icon: Smile },
  ];

  return (
    <div className="min-h-screen bg-white text-gray-900 pt-28 pb-20 px-4 sm:px-6 lg:px-8 animate-fadeIn">
      <div className="max-w-7xl mx-auto space-y-16">
        
        {/* Header */}
        <div className="text-center max-w-4xl mx-auto space-y-4">
          <span className="text-xs font-bold uppercase tracking-widest text-[#E50914] bg-[#E50914]/10 px-3 py-1 rounded-full border border-[#E50914]/30">
            FANS & COMMUNITY
          </span>
          <h1 className="font-bebas text-3xl sm:text-6xl md:text-8xl text-gray-900 tracking-wider uppercase leading-none break-words">
            THE GAME BELONGS TO <br />
            <span className="text-[#E50914]">EVERYONE.</span>
          </h1>
          <p className="text-xs sm:text-base text-gray-700 font-medium leading-relaxed">
            A league is only as strong as the people who follow it. NPVL is dedicated to creating ways for fans, families, students, and local communities across North India to feel part of the game.
          </p>
        </div>

        {/* 🐯 OFFICIAL NPVL MASCOT FEATURE SECTION */}
        <div className="relative bg-gradient-to-br from-gray-950 via-gray-900 to-black text-white rounded-3xl p-5 sm:p-10 md:p-12 overflow-hidden shadow-2xl border-2 border-[#E50914]">
          {/* Background Ambient Glow */}
          <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#E50914]/20 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-red-600/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Mascot Image Left/Center */}
            <div className="lg:col-span-5 flex flex-col items-center justify-center">
              <div className="relative w-full max-w-[320px] bg-white/5 backdrop-blur-sm p-4 sm:p-6 rounded-3xl border border-white/10 shadow-2xl flex items-center justify-center group">
                <img
                  src="/npvl-mascot.jpg"
                  alt="Official NPVL Mascot"
                  className="w-full h-auto object-contain rounded-2xl filter drop-shadow-2xl transition-transform duration-500 group-hover:scale-105"
                />
              </div>
            </div>

            {/* Mascot Story & Details Right */}
            <div className="lg:col-span-7 space-y-5 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 bg-[#E50914]/20 border border-[#E50914]/40 px-3.5 py-1 rounded-full text-[#E50914] text-xs font-montserrat font-bold uppercase tracking-widest">
                <Sparkles className="w-3.5 h-3.5" />
                <span>MEET THE OFFICIAL LEAGUE MASCOT</span>
              </div>

              <h2 className="font-montserrat font-black text-2xl sm:text-4xl md:text-5xl lg:text-6xl text-white tracking-wider uppercase leading-tight break-words">
                THE ROAR OF <br />
                <span className="text-[#E50914]">NORTH INDIAN VOLLEYBALL</span>
              </h2>

              <p className="text-xs sm:text-base text-gray-300 font-sans leading-relaxed">
                Embodying lightning-fast agility, massive vertical jump power, and the fearless fighting spirit of the North, our official mascot stands ready to lead the roar across stadium stands in Season 1.
              </p>

              {/* 4 Feature Badges */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 text-left">
                <div className="flex items-center gap-3 bg-white/10 backdrop-blur-md p-3 rounded-xl border border-white/10">
                  <Zap className="w-5 h-5 text-[#E50914] shrink-0" />
                  <div>
                    <span className="font-montserrat font-bold text-xs uppercase block text-white">Matchday Arena Energy</span>
                    <span className="text-[11px] text-gray-400 font-medium">Leading stadium chants & crowd cheers</span>
                  </div>
                </div>

                <div className="flex items-center gap-3 bg-white/10 backdrop-blur-md p-3 rounded-xl border border-white/10">
                  <Award className="w-5 h-5 text-[#E50914] shrink-0" />
                  <div>
                    <span className="font-montserrat font-bold text-xs uppercase block text-white">Campus & School Tours</span>
                    <span className="text-[11px] text-gray-400 font-medium">Youth engagement across North India</span>
                  </div>
                </div>

                <div className="flex items-center gap-3 bg-white/10 backdrop-blur-md p-3 rounded-xl border border-white/10">
                  <Camera className="w-5 h-5 text-[#E50914] shrink-0" />
                  <div>
                    <span className="font-montserrat font-bold text-xs uppercase block text-white">Fan Zone Photo Booths</span>
                    <span className="text-[11px] text-gray-400 font-medium">Exclusive arena selfies & meetups</span>
                  </div>
                </div>

                <div className="flex items-center gap-3 bg-white/10 backdrop-blur-md p-3 rounded-xl border border-white/10">
                  <Heart className="w-5 h-5 text-[#E50914] shrink-0" />
                  <div>
                    <span className="font-montserrat font-bold text-xs uppercase block text-white">Official Merch & Plushies</span>
                    <span className="text-[11px] text-gray-400 font-medium">Collectibles coming in Season 1</span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-3 flex flex-wrap items-center justify-center lg:justify-start gap-3">
                <button
                  onClick={onOpenContact}
                  className="red-sweep-btn bg-[#E50914] hover:bg-[#B20710] text-white font-montserrat font-bold text-xs uppercase tracking-wider px-6 py-3 rounded-xl shadow-lg transition-all"
                >
                  INVITE MASCOT TO YOUR CAMPUS / CITY
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Stadium Atmosphere Card */}
        <div className="relative border-2 border-[#E50914]/40 rounded-2xl text-center overflow-hidden shadow-lg min-h-[200px] sm:min-h-[240px] flex flex-col items-center justify-center">
          {/* Background stadium image */}
          <img
            src="https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=1600&q=80&auto=format&fit=crop"
            alt="Stadium crowd atmosphere"
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gray-900/75" />
          <div className="relative z-10 p-6 md:p-14">
            <span className="text-xs font-bold uppercase tracking-widest text-[#E50914]">BRINGING FANS CLOSER</span>
            <h2 className="font-bebas text-2xl sm:text-5xl md:text-7xl text-white tracking-wider uppercase mt-2 mb-4 break-words">
              PACKED ARENAS. ELECTRIC ATMOSPHERE.
            </h2>
            <p className="max-w-2xl mx-auto text-xs md:text-sm text-gray-200 font-medium leading-relaxed">
              From cheering in stadium stands to following every rally on live streaming, NPVL unites fans across Uttar Pradesh, Punjab, Haryana, Rajasthan, Delhi, Chandigarh, Himachal Pradesh, and Uttarakhand.
            </p>
          </div>
        </div>

        {/* Pillars Grid */}
        <MobileCarousel desktopClass="md:grid-cols-2 lg:grid-cols-3">
          {fanPillars.map((pillar, idx) => {
            const Icon = pillar.icon;
            return (
              <div key={idx} className="bg-gray-50 border-2 border-gray-200 hover:border-[#E50914] p-6 sm:p-8 rounded-2xl transition-all space-y-4 group shadow-2xs hover:shadow-md">
                <div className="w-12 h-12 bg-[#E50914]/10 rounded-lg flex items-center justify-center text-[#E50914] border border-[#E50914]/30 group-hover:scale-105 transition-transform">
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="font-bebas text-xl sm:text-2xl text-gray-900 tracking-wider group-hover:text-[#E50914] transition-colors">
                  {pillar.title}
                </h3>
                <p className="text-xs text-gray-700 font-medium leading-relaxed font-sans">
                  {pillar.desc}
                </p>
              </div>
            );
          })}
        </MobileCarousel>

        {/* Bottom CTA */}
        <div className="bg-white border-2 border-gray-200 p-6 sm:p-8 md:p-12 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-6 text-center sm:text-left shadow-sm">
          <div>
            <h3 className="font-bebas text-2xl sm:text-3xl md:text-4xl text-gray-900 tracking-wider break-words">
              WANT TO REGISTER YOUR SCHOOL OR COMMUNITY ACADEMY?
            </h3>
            <p className="text-xs text-gray-600 font-medium mt-1">
              Connect with the NPVL Community Outreach Team for open trial dates and match ticket allocations.
            </p>
          </div>
          <button
            onClick={onOpenContact}
            className="red-sweep-btn bg-[#E50914] hover:bg-[#B20710] text-white font-bold text-xs uppercase tracking-wider px-8 py-3.5 rounded-lg shadow-md whitespace-nowrap"
          >
            JOIN THE COMMUNITY
          </button>
        </div>
      </div>
    </div>
  );
}
