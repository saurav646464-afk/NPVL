import React from 'react';

export default function Ecosystem() {
  return (
    <div className="min-h-screen bg-white text-gray-900 pt-28 pb-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-16">
        <div className="text-center max-w-4xl mx-auto space-y-4">
          <span className="text-xs font-bold uppercase tracking-widest text-[#E50914] bg-[#E50914]/10 px-3 py-1 rounded-full border border-[#E50914]/30">
            BUSINESS ECONOMY
          </span>
          <h1 className="font-bebas text-6xl sm:text-8xl text-gray-900 tracking-wider uppercase leading-none">
            SHARED-VALUE <br />
            <span className="text-[#E50914]">SPORTS ECOSYSTEM</span>
          </h1>
          <p className="text-sm md:text-base text-gray-700 font-medium leading-relaxed">
            NPVL is built on a sustainable sports economy where the league, team franchises, and brand partners grow together through shared commercial value pools.
          </p>
        </div>

        {/* 3 Core Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-gray-50 border-2 border-[#E50914]/40 p-8 rounded-2xl space-y-4 shadow-sm">
            <span className="font-bebas text-5xl text-[#E50914]">01 / LEAGUE</span>
            <h3 className="font-bebas text-3xl text-gray-900 tracking-wider">CENTRAL RIGHTS POOL</h3>
            <p className="text-xs text-gray-700 font-medium leading-relaxed font-sans">
              Owns central rights: media & broadcast, title & associate sponsorships, OTT licensing, and central digital assets. Revenue flows into a central pool for distribution.
            </p>
            <div className="pt-4 border-t border-gray-200 text-[11px] text-[#E50914] font-bold uppercase">
              CENTRAL REVENUE GENERATOR
            </div>
          </div>

          <div className="bg-gray-50 border-2 border-gray-200 p-8 rounded-2xl space-y-4 shadow-sm">
            <span className="font-bebas text-5xl text-gray-900">02 / FRANCHISE</span>
            <h3 className="font-bebas text-3xl text-gray-900 tracking-wider">TEAM VALUE CREATION</h3>
            <p className="text-xs text-gray-700 font-medium leading-relaxed font-sans">
              Invests through team operations; earns a contractual share of central revenue plus team-level jersey sponsorships, local ticketing, and merchandise.
            </p>
            <div className="pt-4 border-t border-gray-200 text-[11px] text-gray-500 font-bold uppercase">
              REGIONAL BRAND OPERATOR
            </div>
          </div>

          <div className="bg-gray-50 border-2 border-gray-200 p-8 rounded-2xl space-y-4 shadow-sm">
            <span className="font-bebas text-5xl text-[#E50914]">03 / PARTNERS</span>
            <h3 className="font-bebas text-3xl text-gray-900 tracking-wider">BRAND INTEGRATION</h3>
            <p className="text-xs text-gray-700 font-medium leading-relaxed font-sans">
              Brands invest in sponsorship and activation packages in return for high broadcast visibility, youth engagement, stadium branding, and authentic association.
            </p>
            <div className="pt-4 border-t border-gray-200 text-[11px] text-[#E50914] font-bold uppercase">
              COMMERCIAL BRAND ENGINE
            </div>
          </div>
        </div>

        {/* Revenue Streams */}
        <section className="bg-gray-50 border-2 border-gray-200 p-8 md:p-12 rounded-2xl space-y-8 shadow-sm">
          <div className="text-center">
            <span className="text-xs font-bold uppercase tracking-widest text-[#E50914]">REVENUE STREAMS BREAKDOWN</span>
            <h2 className="font-bebas text-4xl md:text-6xl text-gray-900 tracking-wider uppercase mt-1">
              WHERE THE REVENUE COMES FROM
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white border-2 border-gray-200 p-8 rounded-xl space-y-4 shadow-2xs">
              <div className="flex items-center justify-between border-b border-gray-200 pb-3">
                <h3 className="font-bebas text-3xl text-gray-900 tracking-wider">CENTRAL (LEAGUE STREAMS)</h3>
                <span className="text-xs bg-[#E50914] text-white font-bold px-2.5 py-1 rounded">CENTRAL POOL</span>
              </div>
              <ul className="space-y-3 text-xs text-gray-800 font-medium font-sans">
                <li className="flex items-center gap-2">• Media & Broadcast Rights Distribution</li>
                <li className="flex items-center gap-2">• Title, Presenting & Associate Sponsorships</li>
                <li className="flex items-center gap-2">• Digital, OTT & Content Partnerships</li>
                <li className="flex items-center gap-2">• Official Licensing & Merchandising Rights</li>
                <li className="flex items-center gap-2">• Central Gate & Hospitality Receipts</li>
              </ul>
            </div>

            <div className="bg-white border-2 border-gray-200 p-8 rounded-xl space-y-4 shadow-2xs">
              <div className="flex items-center justify-between border-b border-gray-200 pb-3">
                <h3 className="font-bebas text-3xl text-gray-900 tracking-wider">FRANCHISE (TEAM STREAMS)</h3>
                <span className="text-xs bg-gray-200 text-gray-900 font-bold px-2.5 py-1 rounded">TEAM REVENUE</span>
              </div>
              <ul className="space-y-3 text-xs text-gray-800 font-medium font-sans">
                <li className="flex items-center gap-2">• Share of Central Revenue Pool</li>
                <li className="flex items-center gap-2">• Jersey, Kit & Squad Apparel Sponsorships</li>
                <li className="flex items-center gap-2">• Team Ticketing & Match-Day Hospitality</li>
                <li className="flex items-center gap-2">• Local City Brand Partnerships & Activations</li>
                <li className="flex items-center gap-2">• Team Merchandise & Performance Prize Money</li>
              </ul>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
