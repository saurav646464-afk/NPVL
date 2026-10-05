import React from 'react';
import { Users, Award, Gift, Flag, Smile } from 'lucide-react';

export default function Fans({ onOpenContact }) {
  const fanPillars = [
    { title: 'LOCAL TEAM SUPPORT & FAN GROUPS', desc: 'Rallying city communities behind their official regional volleyball franchises.', icon: Flag },
    { title: 'OPEN TRIALS & COMMUNITY DAYS', desc: 'Grassroots talent scouting events and open community volleyball play days in host cities.', icon: Users },
    { title: 'SCHOOL & COLLEGE OUTREACH', desc: 'School clinics, campus ambassador programs, and inter-university fan zones.', icon: Award },
    { title: 'FAN CONTESTS & GIVEAWAYS', desc: 'Daily match trivia, player signables, jersey giveaways, and VIP court-side passes.', icon: Gift },
    { title: 'PLAYER MEET & GREETS', desc: 'Direct fan interaction sessions, autograph signings, and arena fan photo opportunities.', icon: Smile },
  ];

  return (
    <div className="min-h-screen bg-white text-gray-900 pt-28 pb-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-16">
        <div className="text-center max-w-4xl mx-auto space-y-4">
          <span className="text-xs font-bold uppercase tracking-widest text-[#E50914] bg-[#E50914]/10 px-3 py-1 rounded-full border border-[#E50914]/30">
            FANS & COMMUNITY
          </span>
          <h1 className="font-bebas text-6xl sm:text-8xl text-gray-900 tracking-wider uppercase leading-none">
            THE GAME BELONGS TO <br />
            <span className="text-[#E50914]">EVERYONE.</span>
          </h1>
          <p className="text-sm md:text-base text-gray-700 font-medium leading-relaxed">
            A league is only as strong as the people who follow it. NPVL is dedicated to creating ways for fans, families, students, and local communities across North India to feel part of the game.
          </p>
        </div>

        {/* Stadium Atmosphere Card */}
        <div className="relative border-2 border-[#E50914]/40 rounded-2xl text-center overflow-hidden shadow-lg min-h-[240px] flex flex-col items-center justify-center">
          {/* Background stadium image */}
          <img
            src="https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=1600&q=80&auto=format&fit=crop"
            alt="Stadium crowd atmosphere"
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gray-900/75" />
          <div className="relative z-10 p-8 md:p-14">
          <span className="text-xs font-bold uppercase tracking-widest text-[#E50914]">BRINGING FANS CLOSER</span>
          <h2 className="font-bebas text-5xl md:text-7xl text-white tracking-wider uppercase mt-2 mb-4">
            PACKED ARENAS. ELECTRIC ATMOSPHERE.
          </h2>
          <p className="max-w-2xl mx-auto text-xs md:text-sm text-gray-200 font-medium leading-relaxed">
            From cheering in stadium stands to following every rally on live streaming, NPVL unites fans across Uttar Pradesh, Punjab, Haryana, Rajasthan, Delhi, Chandigarh, Himachal Pradesh, and Uttarakhand.
          </p>
          </div>
        </div>

        {/* Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {fanPillars.map((pillar, idx) => {
            const Icon = pillar.icon;
            return (
              <div key={idx} className="bg-gray-50 border-2 border-gray-200 hover:border-[#E50914] p-8 rounded-2xl transition-all space-y-4 group shadow-2xs hover:shadow-md">
                <div className="w-12 h-12 bg-[#E50914]/10 rounded-lg flex items-center justify-center text-[#E50914] border border-[#E50914]/30 group-hover:scale-105 transition-transform">
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="font-bebas text-2xl text-gray-900 tracking-wider group-hover:text-[#E50914] transition-colors">
                  {pillar.title}
                </h3>
                <p className="text-xs text-gray-700 font-medium leading-relaxed font-sans">
                  {pillar.desc}
                </p>
              </div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <div className="bg-white border-2 border-gray-200 p-8 md:p-12 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-6 text-center sm:text-left shadow-sm">
          <div>
            <h3 className="font-bebas text-3xl md:text-4xl text-gray-900 tracking-wider">
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
