import React from 'react';

export default function BroadcastMarquee() {
  const items = [
    { name: 'JIOHOTSTAR',  logo: '/jiohotstar.jfif',   tag: 'TENTATIVE' },
    { name: 'SONYLIV',     logo: '/sonyliv.jfif',      tag: 'TENTATIVE' },
    { name: 'DD SPORTS',   logo: '/dd sportts.jpg',    tag: 'TENTATIVE' },
    { name: 'WAVES OTT',   logo: '/wavesott.png',      tag: 'TENTATIVE' },
  ];

  // Repeat 5× for seamless infinite loop
  const repeated = [...items, ...items, ...items, ...items, ...items];

  return (
    <div className="bg-[#0F172A] border-y-2 border-[#3854A4] py-3 overflow-hidden relative shadow-md select-none">
      {/* Background glow */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(56,84,164,0.18),transparent)] pointer-events-none" />

      <div className="flex items-center">
        {/* Marquee track */}
        <div className="overflow-hidden w-full flex-1">
          <div className="animate-marquee flex items-center gap-10 whitespace-nowrap">
            {repeated.map((item, idx) => (
              <div key={idx} className="flex items-center gap-3 shrink-0">
                {/* Logo image */}
                <div className="h-8 w-auto flex items-center justify-center bg-white rounded px-2 py-0.5">
                  <img
                    src={item.logo}
                    alt={item.name}
                    className="h-6 w-auto object-contain"
                    onError={(e) => { e.target.style.display = 'none'; }}
                  />
                </div>
                {/* Name */}
                <span className="font-montserrat font-black text-sm sm:text-base tracking-wider text-white">
                  {item.name}
                </span>
                {/* Tag */}
                <span className="text-[10px] font-bold bg-[#E82024]/20 border border-[#E82024]/40 text-[#E82024] px-2 py-0.5 rounded uppercase">
                  {item.tag}
                </span>
                {/* Separator */}
                <span className="text-[#3854A4] font-bold text-xl mx-1">·</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
