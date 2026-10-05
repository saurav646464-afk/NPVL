import React from 'react';
import { Tv, Zap } from 'lucide-react';

export default function BroadcastMarquee() {
  const items = [
    { name: 'JIOHOTSTAR', tag: 'TENTATIVE PARTNER', desc: '451M Avg Monthly Active Users' },
    { name: 'SONYLIV', tag: 'TENTATIVE PARTNER', desc: '90%+ India Web Traffic Share' },
    { name: 'DD SPORTS', tag: 'TENTATIVE PARTNER', desc: '1.2 Cr Households Reach' },
    { name: 'WAVES OTT', tag: 'TENTATIVE PARTNER', desc: '1.5 Cr+ App Downloads' },
  ];

  // Repeat items 4 times to ensure seamless infinite looping
  const repeatedItems = [...items, ...items, ...items, ...items];

  return (
    <div className="bg-gray-900 border-y-2 border-[#E50914] py-3 text-white overflow-hidden relative shadow-md select-none">
      {/* Subtle background glow */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(229,9,20,0.15),transparent)] pointer-events-none" />
      
      <div className="flex items-center">
        {/* Fixed Left Label */}
        <div className="bg-[#E50914] text-white font-montserrat font-bold text-[10px] sm:text-xs uppercase tracking-widest px-3 sm:px-4 py-1.5 shrink-0 z-10 flex items-center gap-1.5 shadow-md rounded-r-md">
          <Tv className="w-3.5 h-3.5" />
          <span>BROADCAST PARTNERS (TENTATIVE)</span>
        </div>

        {/* Marquee Ticker Track */}
        <div className="overflow-hidden w-full flex-1">
          <div className="animate-marquee flex items-center whitespace-nowrap gap-8">
            {repeatedItems.map((item, idx) => (
              <div key={idx} className="flex items-center gap-3 shrink-0">
                <span className="font-montserrat font-black text-sm sm:text-base tracking-wider text-white">
                  {item.name}
                </span>
                <span className="text-[10px] font-montserrat font-bold bg-[#E50914]/20 border border-[#E50914]/40 text-[#E50914] px-2 py-0.5 rounded uppercase">
                  {item.tag}
                </span>
                <span className="text-xs text-gray-400 font-sans font-medium hidden sm:inline">
                  ({item.desc})
                </span>
                <span className="text-[#E50914] font-bold text-lg mx-2">•</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
