import React from 'react';
import StadiumBrandingShowcase from '../components/StadiumBrandingShowcase';
import { Award, ShieldCheck, HeartHandshake, Building2, Megaphone, School, Landmark } from 'lucide-react';

export default function Partners({ onOpenContact }) {
  const categories = [
    { title: 'TITLE PARTNERSHIP', desc: 'League-wide central ownership, trophy naming rights, front-of-jersey logo placement, center-court decal, and primary broadcast integration.', icon: Award },
    { title: 'PRESENTING PARTNERS', desc: 'Co-branding across all official match broadcasts, stadium entry arches, press backdrops, and digital highlights.', icon: ShieldCheck },
    { title: 'ASSOCIATE PARTNERS', desc: 'Category-exclusive partnership packages across court-side LED boards, official scoring desk, and referee kit apparel.', icon: HeartHandshake },
    { title: 'OFFICIAL CATEGORY PARTNERS', desc: 'Official hydration, apparel, ball, tech, logistics, and timing partner designations.', icon: Building2 },
    { title: 'MEDIA & CONTENT PARTNERS', desc: 'Co-created digital campaigns, athlete story series, radio promos, and social media reels.', icon: Megaphone },
    { title: 'EDUCATIONAL INSTITUTIONS', desc: 'Campus activations, student volunteering, inter-college tournaments, and ticket privileges.', icon: School },
    { title: 'GOVERNMENT ORGANISATIONS', desc: 'Youth sports promotion, rural talent development initiatives, and regional sports infrastructure alignment.', icon: Landmark },
  ];

  return (
    <div className="min-h-screen bg-white text-gray-900 pt-28 pb-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-16">
        <div className="text-center max-w-4xl mx-auto space-y-4">
          <span className="text-xs font-bold uppercase tracking-widest text-[#E50914] bg-[#E50914]/10 px-3 py-1 rounded-full border border-[#E50914]/30">
            PARTNERSHIP OPPORTUNITIES
          </span>
          <h1 className="font-bebas text-6xl sm:text-8xl text-gray-900 tracking-wider uppercase leading-none">
            BUILD THE FUTURE OF <br />
            <span className="text-[#E50914]">VOLLEYBALL WITH US</span>
          </h1>
          <p className="text-sm md:text-base text-gray-700 font-medium leading-relaxed">
            Brands can become part of the sporting narrative rather than simply appear around it. NPVL offers shared-value partnerships designed for high visibility and authentic youth connection.
          </p>
        </div>

        {/* Partners Banner Image */}
        <div className="relative rounded-2xl overflow-hidden h-48 md:h-60 shadow-xl">
          <img
            src="https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=1600&q=80&auto=format&fit=crop"
            alt="Sports partnership and branding"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent flex items-center p-8 md:p-12">
            <div>
              <p className="font-bebas text-2xl md:text-4xl text-white tracking-wider">BECOME PART OF</p>
              <p className="font-bebas text-3xl md:text-5xl text-[#E50914] tracking-wider leading-none">NORTH INDIA'S SPORT</p>
            </div>
          </div>
        </div>

        {/* Tier Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((cat, idx) => {
            const Icon = cat.icon;
            return (
              <div key={idx} className="bg-gray-50 border-2 border-gray-200 hover:border-[#E50914] p-8 rounded-2xl transition-colors space-y-3 flex flex-col justify-between group shadow-2xs hover:shadow-md">
                <div>
                  <div className="w-12 h-12 bg-[#E50914]/10 rounded-lg flex items-center justify-center text-[#E50914] border border-[#E50914]/30 mb-4 group-hover:scale-105 transition-transform">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="font-bebas text-2xl text-gray-900 tracking-wider group-hover:text-[#E50914] transition-colors">
                    {cat.title}
                  </h3>
                  <p className="text-xs text-gray-700 font-medium leading-relaxed font-sans mt-2">
                    {cat.desc}
                  </p>
                </div>
                <div className="pt-4 border-t border-gray-200 flex items-center justify-between text-[10px] text-[#E50914] font-bold uppercase tracking-widest">
                  <span>TIER 0{idx + 1}</span>
                  <span>COMMERCIAL OPPORTUNITY</span>
                </div>
              </div>
            );
          })}
        </div>

        <StadiumBrandingShowcase onOpenContact={onOpenContact} />
      </div>
    </div>
  );
}
