import React from 'react';
import { motion } from 'framer-motion';
import { Target, Star, CheckCircle2 } from 'lucide-react';

export default function About({ onOpenContact }) {
  const leadership = [
    {
      name: 'Smt. Seema Dwivdi Ji',
      role: 'CHIEF PATRON, NPVL',
      sub: 'Rajya Sabha MP',
      desc: 'Distinguished parliamentary leader providing strategic patronage and vision for empowering youth through sports across North India.',
      image: '/Smt. Seema Dwivdi Ji.jpeg',
    },
    {
      name: 'Mr. Parveen Mishra',
      role: 'CO-FOUNDER, NPVL',
      sub: 'Co Founder & Advisory',
      desc: 'Pioneering sports visionary committed to establishing professional league infrastructure and grassroots athletic pathways.',
      image: '/Mr. Parveen Mishra.jpeg',
    },
    {
      name: 'Smt. Shivani Chaudhary',
      role: 'FOUNDER & DIRECTOR, NPVL',
      sub: 'Founder & Governance',
      desc: 'Leading league operations and governance to build an inclusive, high-impact volleyball ecosystem for North India.',
      image: '/Smt. Shivani Chaudhary.png',
    },
    {
      name: 'Mr. Kulvir Singh Rana',
      role: 'CEO, NPVL',
      sub: 'Chief Executive Officer',
      desc: 'Driving commercial execution, franchise relations, and professional league management from day one.',
      image: '/Mr. Kulvir Singh Rana.jpeg',
    },
  ];

  const chiefGuests = [
    {
      name: 'Mr. Dalip Singh Rana',
      aka: 'THE GREAT KHALI',
      role: 'Former WWE World Heavyweight Champion & 2021 WWE Hall of Fame Inductee',
      quote: '“Strength is built on discipline, not just size. To every young player of North India – train hard, stay humble and own your court. NPVL is your stage.”',
      image: '/dalip-singh-rana.jpg',
    },
    {
      name: 'Dr. Sanjeev Balyan',
      aka: 'FORMER UNION MINISTER OF STATE',
      role: 'Public Service & Youth Empowerment Icon',
      quote: '“When our villages get the right platform, our youth can compete with the best in the country.”',
      image: '/sanjeev-balyan.jpg',
    },
  ];

  const advisoryTeam = [
    'Mr. Rohit Rana', 'Mr. Kaptan Singh', 'Mr. Nickey Mishra', 'Mr. Mukesh Saroha', 'Mr. Lalit Kumar',
    'Mr. Balwan Singh', 'Mr. Sharad Kaushik', 'Mr. Omvir Mann', 'Mr. Gurinder Singh', 'Mr. Vinit Kumar',
    'Mr. Saurav Tomar', 'Mr. Gaurav Chauhan', 'Mr. Shivander Singh', 'Mr. Ankur Panwar', 'Mr. Rahul Siwach',
    'Mr. Saurabh Singh', 'Mr. Shubham Tomar', 'Mr. Sonu Singh', 'Mr. Gaurav Baliyan', 'Mr. Balvinder Singh',
    'Mr. Vaibhav Chaudhary', 'Mr. Gaurav Chaudhary', 'Mr. Somveer Mann', 'Mr. Zeeshan Ali', 'Mr. Sanjay Kishor'
  ];

  return (
    <div className="min-h-screen bg-white text-gray-900 pt-28 pb-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-20">
        {/* Page Header */}
        <div className="text-center max-w-4xl mx-auto space-y-4">
          <span className="text-xs font-bold uppercase tracking-widest text-[#E50914] bg-[#E50914]/10 px-3 py-1 rounded-full border border-[#E50914]/30">
            ABOUT NPVL
          </span>
          <h1 className="font-bebas text-6xl sm:text-8xl text-gray-900 tracking-wider uppercase leading-none">
            BUILDING THE FUTURE OF <br />
            <span className="text-[#E50914]">NORTH INDIAN VOLLEYBALL</span>
          </h1>
          <p className="text-sm md:text-base text-gray-700 font-medium leading-relaxed">
            North Premier Volleyball League is envisioned as a professionally structured volleyball league focused on creating a competitive platform for athletes and building a stronger volleyball ecosystem across North India.
          </p>
        </div>

        {/* Volleyball Banner Image */}
        <div className="relative rounded-2xl overflow-hidden h-56 md:h-72 shadow-xl">
          <img
            src="https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=1600&q=80&auto=format&fit=crop"
            alt="Volleyball team training"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/30 to-transparent flex items-center p-8 md:p-12">
            <div>
              <p className="font-bebas text-3xl md:text-5xl text-white tracking-wider">NORTH INDIA'S VOLLEYBALL</p>
              <p className="font-bebas text-xl md:text-3xl text-[#E50914] tracking-wider">GETS ITS BIGGEST STAGE</p>
            </div>
          </div>
        </div>

        {/* Major Visual Quote Section */}
        <section className="relative py-16 border-2 border-[#E50914]/40 rounded-2xl text-center overflow-hidden shadow-lg">
          {/* Background image */}
          <img
            src="https://images.unsplash.com/photo-1547347298-4074fc3086f0?w=1600&q=80&auto=format&fit=crop"
            alt="Volleyball court"
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gray-900/80" />
          <div className="relative z-10 px-8 md:px-14">
          <span className="text-xs font-bold uppercase tracking-[0.3em] text-[#E50914] mb-3 block">
            MOTIVATION BEHIND THE LEAGUE
          </span>

          <motion.h2
            initial={{ scale: 0.95, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            className="font-bebas text-5xl sm:text-7xl md:text-8xl text-white tracking-wider uppercase leading-none my-4"
          >
            "TALENT DESERVES A <span className="text-[#E50914]">STAGE."</span>
          </motion.h2>

          <p className="max-w-3xl mx-auto text-sm md:text-base text-gray-200 font-medium leading-relaxed mt-4">
            North India is home to extraordinary talent, passion and an undeniable sporting spirit. Yet countless volleyball dreams remain unseen, waiting for the right platform to rise. NPVL exists to change that.
          </p>
          </div>
        </section>

        {/* Mission & Vision Grid */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-white border-2 border-gray-200 p-8 md:p-10 rounded-2xl space-y-4 hover:border-[#E50914] transition-colors shadow-sm">
            <div className="w-12 h-12 bg-[#E50914]/10 rounded-lg flex items-center justify-center text-[#E50914] border border-[#E50914]/30">
              <Target className="w-6 h-6" />
            </div>
            <h3 className="font-bebas text-4xl text-gray-900 tracking-wider">OUR MISSION</h3>
            <p className="text-sm text-gray-700 font-medium leading-relaxed">
              To build a professional and sustainable volleyball ecosystem that creates opportunities for athletes, connects talent with competitive platforms, and brings communities, partners and audiences closer to the sport.
            </p>
            <ul className="space-y-2 text-xs text-gray-700 font-medium pt-2 border-t border-gray-100">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#E50914]" />
                Discover emerging talent across schools & academies
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#E50914]" />
                Develop athletes through structured competition
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#E50914]" />
                Create meaningful sporting opportunities and career paths
              </li>
            </ul>
          </div>

          <div className="bg-white border-2 border-gray-200 p-8 md:p-10 rounded-2xl space-y-4 hover:border-[#E50914] transition-colors shadow-sm">
            <div className="w-12 h-12 bg-[#E50914]/10 rounded-lg flex items-center justify-center text-[#E50914] border border-[#E50914]/30">
              <Star className="w-6 h-6" />
            </div>
            <h3 className="font-bebas text-4xl text-gray-900 tracking-wider">OUR VISION</h3>
            <p className="text-sm text-gray-700 font-medium leading-relaxed">
              To build a leading volleyball platform in North India that creates a pathway for athletes, strengthens competitive opportunities and contributes to the long-term growth of the sport.
            </p>
            <div className="p-4 bg-gray-50 rounded-lg border border-gray-200 text-xs text-[#E50914] font-bold uppercase tracking-wider mt-4">
              FROM LOCAL TALENT TO PROFESSIONAL OPPORTUNITY. FROM NORTH INDIA TO A LARGER STAGE.
            </div>
          </div>
        </section>

        {/* Leadership Section */}
        <section className="space-y-12">
          <div className="text-center">
            <span className="text-xs font-bold uppercase tracking-widest text-[#E50914] bg-[#E50914]/10 px-3 py-1 rounded-full border border-[#E50914]/30">
              LEADERSHIP & VISIONARIES
            </span>
            <h2 className="font-bebas text-5xl md:text-7xl text-gray-900 tracking-wider uppercase mt-3">
              THE PEOPLE BEHIND NPVL
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {leadership.map((person, idx) => (
              <div
                key={idx}
                className="bg-gray-50 border-2 border-gray-200 hover:border-[#E50914] rounded-2xl transition-all duration-300 flex flex-col shadow-2xs hover:shadow-md group overflow-hidden"
              >
                {/* Photo — full width, tall */}
                {person.image ? (
                  <div className="w-full h-64 overflow-hidden bg-gray-100">
                    <img
                      src={person.image}
                      alt={person.name}
                      className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                ) : (
                  <div className="w-full h-64 bg-[#E50914]/10 flex items-center justify-center text-[#E50914] font-bebas text-7xl">
                    {person.name.split(' ')[1]?.[0] || 'N'}
                  </div>
                )}
                {/* Text content */}
                <div className="p-5 border-t-2 border-[#E50914]/20">
                  <h3 className="font-bebas text-2xl text-gray-900 tracking-wider group-hover:text-[#E50914] transition-colors leading-tight">
                    {person.name}
                  </h3>
                  <div className="text-xs font-bold text-[#E50914] uppercase tracking-wider mt-1 mb-0.5">
                    {person.role}
                  </div>
                  <div className="text-[11px] text-gray-500 font-bold mb-3">{person.sub}</div>
                  <p className="text-xs text-gray-600 font-medium leading-relaxed">
                    {person.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Chief Guests */}
        <section className="bg-gray-50 border-2 border-[#E50914]/30 p-8 md:p-12 rounded-2xl space-y-8 shadow-sm">
          <div className="text-center">
            <span className="text-xs font-bold uppercase tracking-widest text-[#E50914]">DISTINGUISHED PATRONS</span>
            <h3 className="font-bebas text-4xl md:text-6xl text-gray-900 tracking-wider uppercase mt-1">
              OUR CHIEF GUESTS
            </h3>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {chiefGuests.map((guest, idx) => (
              <div key={idx} className="bg-white border-2 border-gray-200 hover:border-[#E50914] p-6 sm:p-8 rounded-2xl shadow-sm hover:shadow-md transition-all flex flex-col sm:flex-row gap-6 items-center sm:items-start">
                {guest.image && (
                  <div className="relative shrink-0 w-32 h-36 sm:w-36 sm:h-44 rounded-xl overflow-hidden border-2 border-[#E50914] shadow-md">
                    <img
                      src={guest.image}
                      alt={guest.name}
                      className="w-full h-full object-cover object-top"
                    />
                  </div>
                )}
                <div className="space-y-3 flex-1 text-center sm:text-left">
                  <div className="flex flex-wrap items-center justify-between gap-2 border-b border-gray-100 pb-2">
                    <h4 className="font-bebas text-3xl text-gray-900 tracking-wider">{guest.name}</h4>
                    <span className="text-[10px] bg-[#E50914] text-white px-2.5 py-1 rounded font-bold uppercase tracking-wider">
                      {guest.aka}
                    </span>
                  </div>
                  <p className="text-xs font-bold text-gray-600 leading-snug">{guest.role}</p>
                  <blockquote className="text-xs sm:text-sm italic text-gray-800 border-l-4 border-[#E50914] pl-3 py-1 font-serif leading-relaxed">
                    {guest.quote}
                  </blockquote>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Advisory Committee */}
        <section className="bg-gray-50 border border-gray-300 p-8 rounded-2xl">
          <h4 className="font-bebas text-2xl text-gray-900 tracking-wider mb-4 border-b border-gray-200 pb-2">
            LEAGUE ADVISORY & ORGANISING COMMITTEE
          </h4>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
            {advisoryTeam.map((member, idx) => (
              <div key={idx} className="text-xs text-gray-800 bg-white px-3 py-2 rounded border border-gray-200 font-bold shadow-2xs">
                {member}
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
