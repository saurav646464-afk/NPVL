import React from 'react';
import { Shield, Trophy, DollarSign, Users, Award, Heart, CheckCircle2, AlertCircle } from 'lucide-react';

export default function Franchise({ onOpenContact }) {
  const benefits = [
    { title: 'OWN A PROFESSIONAL TEAM', desc: 'A direct equity stake in a professionally structured, governance-led sports league.', icon: Shield },
    { title: 'REGIONAL IDENTITY & PRIDE', desc: 'Represent your city and North Indian region on a prominent broadcast stage.', icon: Trophy },
    { title: 'BRAND VISIBILITY', desc: 'High-frequency exposure across television, OTT, digital media, outdoor billboards, and stadium venues.', icon: Award },
    { title: 'REVENUE OPPORTUNITIES', desc: 'Share of the central league revenue pool plus local jersey sponsorships, ticketing, and merchandise.', icon: DollarSign },
    { title: 'TALENT DEVELOPMENT', desc: 'Build and nurture a high-performance roster of North India’s finest volleyball athletes.', icon: Users },
    { title: 'NETWORK & IMPACT', desc: 'Connect with senior business leaders, government dignitaries, and sporting icons.', icon: Heart },
  ];

  const inclusions = [
    { title: 'TEAM RIGHTS', desc: 'Exclusive franchise participation rights for Season 1.' },
    { title: 'PLAYER AUCTION / DRAFT', desc: 'Direct access to the centralized player draft and auction pool.' },
    { title: 'BRANDING RIGHTS', desc: 'Ownership of team name, logo, mascot, and official jersey branding.' },
    { title: 'REVENUE SHARE', desc: 'Contractual share of the central league revenue pool.' },
    { title: 'MATCH OPERATIONS', desc: 'Fully managed league venues, match officials, and stadium logistics.' },
    { title: 'MEDIA COVERAGE', desc: 'Guaranteed broadcast, streaming, and digital highlight production.' },
    { title: 'LEAGUE MARKETING', desc: 'Centralized league-led promotion for every franchise squad.' },
    { title: 'COMMERCIAL SUPPORT', desc: 'Ongoing operational, sponsorship, and governance support.' },
  ];

  return (
    <div className="min-h-screen bg-white text-gray-900 pt-28 pb-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-16">
        <div className="text-center max-w-4xl mx-auto space-y-4">
          <span className="text-xs font-bold uppercase tracking-widest text-[#E50914] bg-[#E50914]/10 px-3 py-1 rounded-full border border-[#E50914]/30">
            FRANCHISE OPPORTUNITY
          </span>
          <h1 className="font-bebas text-6xl sm:text-8xl text-gray-900 tracking-wider uppercase leading-none">
            OWN A TEAM. <br />
            <span className="text-[#E50914]">BUILD A LEGACY.</span>
          </h1>
          <p className="text-sm md:text-base text-gray-700 font-medium leading-relaxed">
            Acquire a founding franchise in the North Premier Volleyball League. Become part of a professionally structured sports ecosystem bringing North Indian sports talent to the national spotlight.
          </p>
          <div className="pt-2">
            <button
              onClick={onOpenContact}
              className="red-sweep-btn bg-[#E50914] hover:bg-[#B20710] text-white font-bold text-xs uppercase tracking-wider px-8 py-3.5 rounded-lg shadow-md"
            >
              ENQUIRE ABOUT FRANCHISE
            </button>
          </div>
        </div>

        {/* Franchise Banner Image */}
        <div className="relative rounded-2xl overflow-hidden h-52 md:h-64 shadow-xl">
          <img
            src="https://images.unsplash.com/photo-1612872087720-bb876e2e67d1?w=1600&q=80&auto=format&fit=crop"
            alt="Volleyball arena"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-gray-900/80 via-gray-900/50 to-transparent flex items-center p-8 md:p-12">
            <div>
              <p className="font-bebas text-2xl md:text-4xl text-white tracking-wider">OWN A TEAM.</p>
              <p className="font-bebas text-3xl md:text-6xl text-[#E50914] tracking-wider leading-none">BUILD A LEGACY.</p>
              <p className="text-gray-300 text-xs md:text-sm font-medium mt-2">North Premier Volleyball League — Season 1</p>
            </div>
          </div>
        </div>

        {/* Benefits Grid */}
        <section className="space-y-8">
          <div className="text-center">
            <span className="text-xs font-bold uppercase tracking-widest text-[#E50914]">WHY OWN AN NPVL TEAM?</span>
            <h2 className="font-bebas text-4xl md:text-6xl text-gray-900 tracking-wider uppercase mt-1">
              FRANCHISE OWNERSHIP BENEFITS
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {benefits.map((ben, idx) => {
              const Icon = ben.icon;
              return (
                <div key={idx} className="bg-gray-50 border-2 border-gray-200 hover:border-[#E50914] p-8 rounded-2xl transition-all space-y-3 group shadow-2xs hover:shadow-md">
                  <div className="w-12 h-12 bg-[#E50914]/10 rounded-lg flex items-center justify-center text-[#E50914] border border-[#E50914]/30 group-hover:scale-105 transition-transform">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="font-bebas text-2xl text-gray-900 tracking-wider group-hover:text-[#E50914] transition-colors">
                    {ben.title}
                  </h3>
                  <p className="text-xs text-gray-700 font-medium leading-relaxed font-sans">
                    {ben.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </section>

        {/* Inclusions */}
        <section className="bg-gray-50 border-2 border-gray-200 p-8 md:p-12 rounded-2xl space-y-8 shadow-sm">
          <div className="text-center">
            <span className="text-xs font-bold uppercase tracking-widest text-[#E50914]">WHAT THE FRANCHISE FEE COVERS</span>
            <h2 className="font-bebas text-4xl md:text-6xl text-gray-900 tracking-wider uppercase mt-1">
              FRANCHISE INCLUSIONS
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {inclusions.map((inc, idx) => (
              <div key={idx} className="bg-white border border-gray-300 p-6 rounded-xl space-y-2 shadow-2xs">
                <div className="flex items-center gap-2 text-[#E50914]">
                  <CheckCircle2 className="w-4 h-4" />
                  <h4 className="font-bebas text-xl text-gray-900 tracking-wider">{inc.title}</h4>
                </div>
                <p className="text-xs text-gray-700 font-medium leading-relaxed">{inc.desc}</p>
              </div>
            ))}
          </div>

          <div className="p-4 bg-white rounded-xl border border-gray-300 flex items-center gap-3 text-xs text-gray-600 font-bold">
            <AlertCircle className="w-5 h-5 text-[#E50914] shrink-0" />
            <span>Indicative franchise inclusions. Final commercial terms, franchise agreements, and inclusions are subject to final mutual contract execution.</span>
          </div>
        </section>


        {/* Bottom CTA */}
        <div className="relative border-2 border-[#E50914] rounded-2xl text-center overflow-hidden shadow-xl">
          {/* Background image */}
          <img
            src="https://images.unsplash.com/photo-1518611012118-696072aa579a?w=1600&q=80&auto=format&fit=crop"
            alt="Volleyball training"
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gray-900/85" />
          <div className="relative z-10 p-8 md:p-12 space-y-4">
          <h3 className="font-bebas text-4xl md:text-5xl text-white tracking-wider uppercase">
            BECOME A FOUNDING FRANCHISE OWNER IN SEASON 1
          </h3>
          <p className="text-xs md:text-sm text-gray-300 max-w-2xl mx-auto font-medium">
            Contact the NPVL League Office to request the confidential Franchise Information Deck and commercial terms.
          </p>
          <button
            onClick={onOpenContact}
            className="red-sweep-btn bg-[#E50914] hover:bg-[#B20710] text-white font-bold text-xs uppercase tracking-wider px-8 py-3.5 rounded-lg shadow-md"
          >
            ENQUIRE ABOUT FRANCHISE
          </button>
          </div>
        </div>
      </div>
    </div>
  );
}
