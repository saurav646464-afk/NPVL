import React from 'react';
import { MapPin, Zap, Info } from 'lucide-react';

export default function Season1({ onOpenContact }) {
  const hostCities = [
    {
      city: 'GAUTAM BUDH NAGAR',
      state: 'Uttar Pradesh',
      desc: 'Prime NCR Sports Complex & Arena Hub',
      venue: '[Venue to be confirmed]',
    },
    {
      city: 'LUDHIANA',
      state: 'Punjab',
      desc: 'Historical Indoor Sports Arena & Punjab Volleyball Heartland',
      venue: '[Venue to be confirmed]',
    },
    {
      city: 'VARANASI',
      state: 'Uttar Pradesh',
      desc: 'Cultural Capital Arena & High-Energy Fanbase',
      venue: '[Venue to be confirmed]',
    },
  ];

  return (
    <div className="min-h-screen bg-white text-gray-900 pt-28 pb-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-16">
        <div className="text-center max-w-4xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 bg-[#E50914]/10 border border-[#E50914]/30 px-3.5 py-1 rounded-full text-[#E50914] text-xs font-bold uppercase tracking-widest">
            <Zap className="w-3.5 h-3.5 animate-pulse" />
            <span>COMING SOON — SEASON 1</span>
          </div>
          <h1 className="font-bebas text-4xl sm:text-6xl md:text-8xl text-gray-900 tracking-wider uppercase leading-none">
            SEASON 1 <br />
            <span className="text-[#E50914]">THE JOURNEY BEGINS</span>
          </h1>
          <p className="text-sm md:text-base text-gray-700 font-medium leading-relaxed">
            The inaugurational season of the North Premier Volleyball League brings together 7 premier regional franchises for 15 intense days of men's professional volleyball action.
          </p>
        </div>

        {/* Match Day Banner Image */}
        <div className="relative rounded-2xl overflow-hidden h-52 md:h-72 shadow-xl">
          <img
            src="https://images.unsplash.com/photo-1594736797933-d0501ba2fe65?w=1600&q=80&auto=format&fit=crop"
            alt="Volleyball match day atmosphere"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/10 flex flex-col justify-end p-8 md:p-12">
            <p className="font-bebas text-4xl md:text-6xl text-white tracking-wider">THE INAUGURAL SEASON</p>
            <p className="text-gray-300 text-sm md:text-base font-medium mt-1">07 Teams · 15 Days · 03 Host Cities · Proposed Season Structure</p>
          </div>
        </div>

        {/* Fact Cards */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          <div className="bg-gray-50 border-2 border-gray-200 p-6 rounded-xl text-center shadow-2xs">
            <span className="font-bebas text-5xl text-[#E50914] block">07</span>
            <span className="font-bebas text-xl text-gray-900 tracking-wider uppercase">TEAMS</span>
            <span className="text-[10px] text-gray-500 font-bold block mt-1">Regional Squads</span>
          </div>
          <div className="bg-gray-50 border-2 border-gray-200 p-6 rounded-xl text-center shadow-2xs">
            <span className="font-bebas text-5xl text-[#E50914] block">15</span>
            <span className="font-bebas text-xl text-gray-900 tracking-wider uppercase">DAYS</span>
            <span className="text-[10px] text-gray-500 font-bold block mt-1">High-Octane Action</span>
          </div>
          <div className="bg-gray-50 border-2 border-gray-200 p-6 rounded-xl text-center shadow-2xs">
            <span className="font-bebas text-5xl text-[#E50914] block">24*</span>
            <span className="font-bebas text-xl text-gray-900 tracking-wider uppercase">MATCHES</span>
            <span className="text-[10px] text-gray-500 font-bold block mt-1">Proposed Structure</span>
          </div>
          <div className="bg-gray-50 border-2 border-gray-200 p-6 rounded-xl text-center shadow-2xs">
            <span className="font-bebas text-5xl text-[#E50914] block">03</span>
            <span className="font-bebas text-xl text-gray-900 tracking-wider uppercase">HOST CITIES</span>
            <span className="text-[10px] text-gray-500 font-bold block mt-1">UP & Punjab Arenas</span>
          </div>
          <div className="bg-gray-50 border-2 border-gray-200 p-6 rounded-xl text-center col-span-2 md:col-span-1 shadow-2xs">
            <span className="font-bebas text-5xl text-gray-900 block">MEN</span>
            <span className="font-bebas text-xl text-[#E50914] tracking-wider uppercase">CATEGORY</span>
            <span className="text-[10px] text-gray-500 font-bold block mt-1">Premier Division</span>
          </div>
        </div>

        {/* Proposed Match Structure */}
        <section className="bg-gray-50 border-2 border-gray-200 p-8 md:p-12 rounded-2xl space-y-8 shadow-sm">
          <div className="text-center">
            <span className="text-xs font-bold uppercase tracking-widest text-[#E50914]">PROPOSED FORMAT</span>
            <h2 className="font-bebas text-4xl md:text-6xl text-gray-900 tracking-wider uppercase mt-1">
              PROPOSED MATCH STRUCTURE
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
            <div className="bg-white border-2 border-gray-200 p-8 rounded-xl space-y-2 shadow-2xs">
              <span className="font-bebas text-6xl text-[#E50914]">21</span>
              <h3 className="font-bebas text-2xl text-gray-900 tracking-wider">LEAGUE STAGE MATCHES</h3>
              <p className="text-xs text-gray-600 font-medium">Round-robin competition among all 7 franchises.</p>
            </div>
            <div className="bg-white border-2 border-gray-200 p-8 rounded-xl space-y-2 shadow-2xs">
              <span className="font-bebas text-6xl text-[#E50914]">02</span>
              <h3 className="font-bebas text-2xl text-gray-900 tracking-wider">SEMI-FINALS</h3>
              <p className="text-xs text-gray-600 font-medium">Top 4 teams battle for championship final spots.</p>
            </div>
            <div className="bg-white border-2 border-[#E50914] p-8 rounded-xl space-y-2 shadow-md">
              <span className="font-bebas text-6xl text-[#E50914]">01</span>
              <h3 className="font-bebas text-2xl text-gray-900 tracking-wider">CHAMPIONSHIP FINAL</h3>
              <p className="text-xs text-gray-600 font-medium">Crowning the Season 1 NPVL Champions.</p>
            </div>
          </div>
        </section>

        {/* Host Cities */}
        <section className="space-y-8">
          <div className="text-center">
            <span className="text-xs font-bold uppercase tracking-widest text-[#E50914]">DESTINATIONS</span>
            <h2 className="font-bebas text-4xl md:text-6xl text-gray-900 tracking-wider uppercase mt-1">
              SEASON 1 HOST CITIES
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {hostCities.map((city, idx) => (
              <div key={idx} className="bg-white border-2 border-gray-200 p-8 rounded-2xl space-y-4 hover:border-[#E50914] transition-colors shadow-sm">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-[#E50914] bg-[#E50914]/10 px-2.5 py-1 rounded uppercase border border-[#E50914]/30">
                    {city.state}
                  </span>
                  <MapPin className="w-5 h-5 text-[#E50914]" />
                </div>
                <h3 className="font-bebas text-3xl text-gray-900 tracking-wider">{city.city}</h3>
                <p className="text-xs text-gray-700 font-medium">{city.desc}</p>
                <div className="pt-4 border-t border-gray-100 flex items-center gap-2 text-xs text-gray-500 font-bold italic">
                  <Info className="w-4 h-4 text-[#E50914]" />
                  <span>{city.venue}</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        <div className="p-4 bg-gray-50 rounded-xl border border-gray-300 text-center text-xs text-gray-600 font-bold">
          *Proposed Season 1 structure. Dates, venues, match schedules, and final operational details are subject to confirmation at the official Season 1 Launch event.
        </div>
      </div>
    </div>
  );
}

