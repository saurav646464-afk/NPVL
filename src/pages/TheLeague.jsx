import React from 'react';
import NorthIndiaMap from '../components/NorthIndiaMap';
import MobileCarousel from '../components/MobileCarousel';
import { ArrowRight } from 'lucide-react';

export default function TheLeague({ onOpenContact }) {
  const approachSteps = [
    { title: 'DISCOVER', desc: 'Identify talent and sporting potential across North India.' },
    { title: 'DEVELOP', desc: 'Help athletes improve through structured competition and high-level exposure.' },
    { title: 'CONNECT', desc: 'Bring athletes, teams, communities and commercial partners together.' },
    { title: 'CREATE', desc: 'Build professional events, competitions and stadium experiences around volleyball.' },
    { title: 'GROW', desc: 'Expand the long-term reach, commercial sustainability, and relevance of the sport.' },
  ];

  const impactAreas = [
    { title: 'FOR ATHLETES', desc: 'More structured opportunities to compete, gain exposure, and develop professionally.' },
    { title: 'FOR THE SPORT', desc: 'A stronger, interconnected ecosystem elevating Indian volleyball to mainstream prominence.' },
    { title: 'FOR COMMUNITIES', desc: 'Deep city pride, local fan engagement, and grassroots youth participation.' },
    { title: 'FOR PARTNERS', desc: 'An authentic, high-engagement sports property connecting with Young India.' },
    { title: 'FOR THE FUTURE', desc: 'A sustainable foundation supporting volleyball for generations across North India.' },
  ];

  const ecosystemStakeholders = [
    { title: 'ATHLETES', desc: 'The talent and high-performance competitive core at the heart of NPVL.' },
    { title: 'COACHES', desc: 'Tactical guidance, physical preparation, mental conditioning, and elite development.' },
    { title: 'TEAMS', desc: 'Regional identity, team culture, squad balance, and fierce court competition.' },
    { title: 'COMMUNITIES', desc: 'Grassroots participation, local school outreach, and loyal city support.' },
    { title: 'PARTNERS', desc: 'Brand collaboration, central league sponsorship, and stadium integrations.' },
    { title: 'AUDIENCES', desc: 'Broadcast viewers, OTT streamers, stadium fans, and social media followers.' },
  ];

  return (
    <div className="min-h-screen bg-white text-gray-900 pt-28 pb-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-16 sm:space-y-20">
        {/* Header */}
        <div className="text-center max-w-4xl mx-auto space-y-4">
          <span className="text-xs font-bold uppercase tracking-widest text-[#E50914] bg-[#E50914]/10 px-3 py-1 rounded-full border border-[#E50914]/30">
            THE NPVL BLUEPRINT
          </span>
          <h1 className="font-bebas text-3xl sm:text-5xl md:text-7xl lg:text-8xl text-gray-900 tracking-wider uppercase leading-none break-words">
            THE LEAGUE ARCHITECTURE & <br />
            <span className="text-[#E50914]">VOLLEYBALL ECOSYSTEM</span>
          </h1>
          <p className="text-xs sm:text-sm md:text-base text-gray-700 font-medium leading-relaxed max-w-3xl mx-auto">
            NPVL builds the sport through one connected approach — uniting regional pride, grassroots talent, professional match management, and modern sports entertainment.
          </p>
        </div>

        {/* Volleyball Banner Image */}
        <div className="relative rounded-2xl overflow-hidden h-44 sm:h-56 md:h-64 shadow-xl">
          <img
            src="https://images.unsplash.com/photo-1612872087720-bb876e2e67d1?w=1600&q=80&auto=format&fit=crop"
            alt="Volleyball match action"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#E50914]/85 via-black/50 to-transparent flex items-center p-6 sm:p-8 md:p-12">
            <div>
              <p className="font-bebas text-xl sm:text-3xl md:text-4xl text-white tracking-wider">NORTH INDIA'S BIGGEST</p>
              <p className="font-bebas text-2xl sm:text-4xl md:text-6xl text-white tracking-wider leading-none">VOLLEYBALL PLATFORM</p>
            </div>
          </div>
        </div>

        {/* Regional Footprint Map Section */}
        <section className="space-y-6">
          <div className="text-center">
            <span className="text-xs font-bold uppercase tracking-widest text-[#E50914]">REGIONAL FOOTPRINT</span>
            <h2 className="font-bebas text-3xl sm:text-4xl md:text-6xl text-gray-900 tracking-wider uppercase mt-1">
              THE NORTH ZONE DOMAIN
            </h2>
          </div>
          <NorthIndiaMap />
        </section>

        {/* Approach Carousel */}
        <section className="bg-gray-50 border-2 border-gray-200 p-5 sm:p-8 md:p-12 rounded-3xl space-y-6 sm:space-y-8 shadow-sm">
          <div className="text-center">
            <span className="text-xs font-bold uppercase tracking-widest text-[#E50914]">METHODOLOGY</span>
            <h3 className="font-bebas text-3xl sm:text-4xl md:text-6xl text-gray-900 tracking-wider uppercase mt-1">
              THE NPVL APPROACH
            </h3>
          </div>

          <MobileCarousel desktopClass="md:grid-cols-5">
            {approachSteps.map((step, idx) => (
              <div
                key={idx}
                className="bg-white border-2 border-gray-200 hover:border-[#E50914] p-6 rounded-2xl transition-all duration-300 flex flex-col justify-between group shadow-2xs hover:shadow-md h-full"
              >
                <div>
                  <span className="font-bebas text-3xl text-[#E50914] block mb-2">0{idx + 1}</span>
                  <h4 className="font-bebas text-2xl text-gray-900 tracking-wider group-hover:text-[#E50914] transition-colors">
                    {step.title}
                  </h4>
                  <p className="text-xs text-gray-600 font-medium leading-relaxed mt-2">
                    {step.desc}
                  </p>
                </div>
              </div>
            ))}
          </MobileCarousel>
        </section>

        {/* Player Journey */}
        <section className="space-y-8 sm:space-y-12">
          <div className="text-center">
            <span className="text-xs font-bold uppercase tracking-widest text-[#E50914] bg-[#E50914]/10 px-3 py-1 rounded-full border border-[#E50914]/30">
              ATHLETE DEVELOPMENT
            </span>
            <h2 className="font-bebas text-3xl sm:text-5xl md:text-7xl text-gray-900 tracking-wider uppercase mt-3 break-words">
              THE PLAYER JOURNEY & PATHWAY
            </h2>
          </div>

          <div className="bg-white border-2 border-gray-200 p-5 sm:p-8 rounded-2xl space-y-6 shadow-sm">
            <h3 className="font-bebas text-2xl sm:text-3xl text-gray-900 tracking-wider text-center">
              GRASSROOTS TO PROFESSIONAL PATHWAY
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-6 gap-2.5 sm:gap-3 text-center">
              {['GRASSROOTS', 'SCHOOLS & COLLEGES', 'ACADEMIES & CLUBS', 'COMPETITIVE PLATFORMS', 'NPVL LEAGUE', 'HIGHER OPPORTUNITIES'].map((stage, idx) => (
                <div key={idx} className="bg-gray-50 border-2 border-[#E50914]/30 p-3 sm:p-4 rounded-xl flex flex-col items-center justify-center">
                  <span className="font-bebas text-lg sm:text-xl text-[#E50914]">{idx + 1}</span>
                  <span className="text-[11px] sm:text-xs font-bold text-gray-900 uppercase tracking-wider mt-1">{stage}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-gray-50 border-2 border-gray-200 p-5 sm:p-8 rounded-2xl space-y-6 shadow-sm">
            <h3 className="font-bebas text-2xl sm:text-3xl text-gray-900 tracking-wider text-center">
              BEYOND THE GAME: ATHLETE EVOLUTION
            </h3>
            <div className="flex flex-col md:flex-row items-center justify-between gap-3 sm:gap-4">
              {['PARTICIPATE', 'COMPETE', 'PERFORM', 'GAIN EXPOSURE', 'PROGRESS'].map((step, idx) => (
                <React.Fragment key={idx}>
                  <div className="w-full md:w-auto flex-1 bg-white hover:bg-[#E50914] text-gray-900 hover:text-white p-3.5 sm:p-4 rounded-xl border-2 border-gray-200 hover:border-[#E50914] transition-all text-center group shadow-2xs">
                    <span className="font-bebas text-xl sm:text-2xl tracking-wider block">{step}</span>
                  </div>
                  {idx < 4 && <ArrowRight className="hidden md:block w-5 h-5 text-[#E50914] shrink-0" />}
                </React.Fragment>
              ))}
            </div>
          </div>
        </section>

        {/* Stakeholders Carousel */}
        <section className="bg-white border-2 border-gray-200 p-5 sm:p-8 md:p-12 rounded-3xl space-y-6 sm:space-y-8 shadow-sm">
          <div className="text-center max-w-3xl mx-auto">
            <span className="text-xs font-bold uppercase tracking-widest text-[#E50914]">STAKEHOLDER INTEGRATION</span>
            <h3 className="font-bebas text-2xl sm:text-4xl md:text-6xl text-gray-900 tracking-wider uppercase mt-1 break-words">
              THE VOLLEYBALL ECOSYSTEM
            </h3>
          </div>

          <MobileCarousel desktopClass="md:grid-cols-2 lg:grid-cols-3">
            {ecosystemStakeholders.map((sh, idx) => (
              <div key={idx} className="bg-gray-50 border-2 border-gray-200 hover:border-[#E50914] p-6 rounded-2xl space-y-2 h-full shadow-2xs hover:shadow-md transition-all">
                <span className="text-xs font-bold text-[#E50914] uppercase tracking-wider">STAKEHOLDER 0{idx + 1}</span>
                <h4 className="font-bebas text-2xl sm:text-3xl text-gray-900 tracking-wider">{sh.title}</h4>
                <p className="text-xs text-gray-700 font-medium leading-relaxed font-sans">{sh.desc}</p>
              </div>
            ))}
          </MobileCarousel>
        </section>

        {/* Impact Areas Carousel */}
        <section className="bg-gray-50 border-2 border-[#E50914]/40 p-5 sm:p-8 md:p-12 rounded-3xl space-y-6 sm:space-y-8 shadow-sm">
          <div className="text-center max-w-3xl mx-auto">
            <span className="text-xs font-bold uppercase tracking-widest text-[#E50914]">WHAT WE CREATE</span>
            <h3 className="font-bebas text-2xl sm:text-4xl md:text-6xl text-gray-900 tracking-wider uppercase mt-1 break-words">
              THE NPVL IMPACT
            </h3>
          </div>

          <MobileCarousel desktopClass="md:grid-cols-3 lg:grid-cols-5">
            {impactAreas.map((imp, idx) => (
              <div key={idx} className="bg-white p-6 rounded-2xl border-2 border-gray-200 hover:border-[#E50914] shadow-2xs h-full transition-all">
                <h4 className="font-bebas text-xl text-[#E50914] mb-2">{imp.title}</h4>
                <p className="text-xs text-gray-700 font-medium leading-relaxed font-sans">{imp.desc}</p>
              </div>
            ))}
          </MobileCarousel>
        </section>
      </div>
    </div>
  );
}
