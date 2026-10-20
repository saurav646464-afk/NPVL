import React from 'react';
import { motion } from 'framer-motion';
import { ChevronDown, Trophy, Sparkles, ShieldCheck, ArrowRight, Zap, Target, Users, Flame, Globe } from 'lucide-react';
import StadiumBrandingShowcase from '../components/StadiumBrandingShowcase';
import BroadcastMarquee from '../components/BroadcastMarquee';
import MobileCarousel from '../components/MobileCarousel';
import NorthIndiaMap from '../components/NorthIndiaMap';

export default function Home({ setCurrentPage, onSelectTeam, onOpenContact }) {
  const stats = [
    { label: 'TEAMS', number: '07', sub: 'Regional Squads' },
    { label: 'DAYS OF ACTION', number: '15', sub: 'High-Octane Event' },
    { label: 'MATCHES PROPOSED', number: '25*', sub: '21 League + 3 Qualification + 1 Final' },
    { label: 'HOST CITIES', number: '03', sub: 'UP & Punjab Arenas' },
  ];

  const whyCards = [
    { title: 'DISCOVER', desc: 'Identify emerging volleyball talent across schools, colleges, and grassroots grounds.', tag: 'TALENT' },
    { title: 'DEVELOP', desc: 'Create competitive opportunities and athlete development pathways.', tag: 'GROWTH' },
    { title: 'CONNECT', desc: 'Bring athletes, teams, communities, partners and audiences together.', tag: 'UNITY' },
    { title: 'CREATE', desc: 'Build professional sporting experiences and strong team identities.', tag: 'STAGE' },
    { title: 'GROW', desc: 'Create long-term opportunities for volleyball across North India.', tag: 'FUTURE' },
  ];

  return (
    <div className="min-h-screen bg-white text-gray-900 overflow-hidden">
      {/* 1. CINEMATIC HERO SECTION (ROYAL BLUE + RED + WHITE) */}
      <section className="relative min-h-screen flex items-center justify-center pt-24 pb-16 px-4 sm:px-6 lg:px-8 overflow-hidden bg-gradient-to-b from-white via-slate-50/50 to-white">
        {/* Dynamic Background Visuals */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-[#3854A4]/15 blur-[150px] rounded-full animate-pulse-glow" />

          {/* Volleyball Court Line Overlay */}
          <svg className="absolute inset-0 w-full h-full opacity-10" viewBox="0 0 1000 600" preserveAspectRatio="none">
            <line x1="0" y1="300" x2="1000" y2="300" stroke="#3854A4" strokeWidth="4" />
            <line x1="300" y1="0" x2="300" y2="600" stroke="#111827" strokeWidth="2" strokeDasharray="10,10" />
            <line x1="700" y1="0" x2="700" y2="600" stroke="#111827" strokeWidth="2" strokeDasharray="10,10" />
          </svg>

          {/* Glowing Volleyball Arc Trajectory */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 1200 800" preserveAspectRatio="none">
            <motion.path
              d="M -100 700 Q 600 50 1300 700"
              fill="none"
              stroke="url(#heroArcLight)"
              strokeWidth="5"
              strokeDasharray="1600"
              animate={{ strokeDashoffset: [1600, 0] }}
              transition={{ duration: 3, repeat: Infinity, repeatDelay: 1, ease: "easeInOut" }}
            />
            <defs>
              <linearGradient id="heroArcLight" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="transparent" />
                <stop offset="40%" stopColor="#3854A4" />
                <stop offset="70%" stopColor="#E82024" />
                <stop offset="100%" stopColor="#DC2626" />
              </linearGradient>
            </defs>
          </svg>
        </div>

        {/* Hero Main Content Box */}
        <div className="relative z-20 max-w-5xl mx-auto text-center space-y-6">
          {/* Logo Showcase */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="flex justify-center mb-2"
          >
            <img src="/logo.png" alt="Official NPVL Logo" className="h-32 sm:h-40 md:h-48 w-auto object-contain filter drop-shadow-2xl" />
          </motion.div>

          {/* Badges */}
          <div className="flex flex-wrap items-center justify-center gap-3">
            <span className="text-xs md:text-sm font-bold tracking-[0.2em] text-[#3854A4] uppercase bg-[#3854A4]/10 border border-[#3854A4]/30 px-3.5 py-1 rounded-full">
              NORTH PREMIER VOLLEYBALL LEAGUE
            </span>
            <span className="text-xs md:text-sm font-bold tracking-[0.2em] text-[#E82024] uppercase bg-[#E82024]/10 border border-[#E82024]/30 px-3.5 py-1 rounded-full flex items-center gap-1.5 shadow-xs">
              <Zap className="w-3.5 h-3.5 text-[#E82024] animate-pulse" />
              COMING SOON — SEASON 1
            </span>
          </div>

          {/* Main Headline */}
          <motion.h1
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="font-bebas text-4xl sm:text-6xl md:text-7xl lg:text-8xl text-gray-900 uppercase tracking-wider leading-[0.92] drop-shadow-sm"
          >
            THE NEXT BIG STAGE <br />
            FOR NORTH INDIA'S <br />
            <span className="text-[#3854A4] glow-text-blue">VOLLEYBALL</span>
          </motion.h1>

          <p className="max-w-2xl mx-auto text-sm sm:text-base md:text-lg text-gray-700 font-sans leading-relaxed font-medium">
            A professionally structured volleyball league creating a competitive platform for athletes while building a stronger volleyball ecosystem across North India.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <button
              onClick={() => {
                setCurrentPage('league');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="red-sweep-btn w-full sm:w-auto bg-[#3854A4] hover:bg-[#2A448E] text-white font-bold text-sm uppercase tracking-wider px-8 py-4 rounded-lg shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2"
            >
              <span>EXPLORE THE LEAGUE</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={onOpenContact}
              className="red-sweep-btn w-full sm:w-auto bg-[#E82024] hover:bg-[#C71216] text-white font-bold text-sm uppercase tracking-wider px-8 py-4 rounded-lg shadow-md transition-all flex items-center justify-center gap-2"
            >
              <span>JOIN THE JOURNEY</span>
            </button>
          </div>
        </div>

      </section>

      {/* 2. HERO STATISTICS SECTION */}
      <section className="relative z-30 bg-slate-50 border-y-2 border-[#3854A4]/20 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <MobileCarousel desktopClass="grid-cols-2 lg:grid-cols-4">
            {stats.map((st, idx) => (
              <div
                key={idx}
                className="bg-white border-2 border-gray-200 p-6 rounded-xl hover:border-[#3854A4] transition-colors shadow-sm hover:shadow-md group text-center h-full"
              >
                <div className="font-bebas text-6xl md:text-8xl text-gray-900 tracking-wider leading-none group-hover:text-[#3854A4] transition-colors">
                  {st.number}
                </div>
                <div className="font-bebas text-xl md:text-2xl text-[#3854A4] tracking-wider uppercase mt-1">
                  {st.label}
                </div>
                <div className="text-xs text-gray-600 mt-1 font-bold">{st.sub}</div>
              </div>
            ))}
          </MobileCarousel>

          <p className="text-center text-xs text-gray-500 mt-6 font-bold italic">
            *Proposed Season 1 structure. Dates, venues and final details are subject to confirmation.
          </p>
        </div>
      </section>

      {/* 3. INTRODUCTION SECTION */}
      <section className="py-20 md:py-28 px-4 sm:px-6 lg:px-8 bg-white relative">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7 space-y-6">

            <h2 className="font-bebas text-4xl sm:text-6xl md:text-7xl text-gray-900 tracking-wider uppercase leading-none">
              MORE THAN A LEAGUE. <br />
              <span className="text-[#3854A4]">A MOVEMENT FOR VOLLEYBALL.</span>
            </h2>

            <p className="text-base md:text-lg text-gray-700 leading-relaxed font-medium">
              North Premier Volleyball League is being built as a professionally structured volleyball platform focused on creating competitive opportunities for athletes and building a stronger volleyball ecosystem across North India.
            </p>

            <MobileCarousel desktopClass="grid-cols-2">
              <div className="flex items-start gap-3 bg-slate-50 p-4 rounded-lg border border-gray-200 shadow-2xs h-full">
                <Target className="w-5 h-5 text-[#3854A4] shrink-0 mt-0.5" />
                <span className="font-medium text-sm text-gray-800">Create a professional platform for volleyball across North India.</span>
              </div>
              <div className="flex items-start gap-3 bg-slate-50 p-4 rounded-lg border border-gray-200 shadow-2xs h-full">
                <Users className="w-5 h-5 text-[#3854A4] shrink-0 mt-0.5" />
                <span className="font-medium text-sm text-gray-800">Provide athletes with structured competitive opportunities.</span>
              </div>
              <div className="flex items-start gap-3 bg-slate-50 p-4 rounded-lg border border-gray-200 shadow-2xs h-full">
                <Flame className="w-5 h-5 text-[#E82024] shrink-0 mt-0.5" />
                <span className="font-medium text-sm text-gray-800">Connect grassroots talent with higher-level national competition.</span>
              </div>
              <div className="flex items-start gap-3 bg-slate-50 p-4 rounded-lg border border-gray-200 shadow-2xs h-full">
                <Globe className="w-5 h-5 text-[#3854A4] shrink-0 mt-0.5" />
                <span className="font-medium text-sm text-gray-800">Build strong regional teams, city pride and team identities.</span>
              </div>
            </MobileCarousel>
          </div>

          {/* Right Visual Frame — Volleyball Image */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-2xl overflow-hidden border-2 border-[#3854A4]/40 shadow-xl aspect-[4/3]">
              <img
                src="/volleyball-arena.jpg"
                alt="Volleyball arena match"
                className="absolute inset-0 w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <blockquote className="text-base md:text-lg italic text-white font-serif leading-relaxed mb-3">
                  "From local grounds to packed arenas. From individual dreams to a shared movement."
                </blockquote>
                <div className="flex items-center justify-between text-xs text-white/70 font-bold pt-3 border-t border-white/20">
                  <span>OFFICIAL LEAGUE DECK SOURCE</span>
                  <span className="text-white bg-[#3854A4] px-2.5 py-0.5 rounded font-bold">SEASON 1</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3B. NORTH INDIA INTERACTIVE FRANCHISE MAP */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-slate-50 border-t border-gray-200">
        <div className="max-w-7xl mx-auto">
          <NorthIndiaMap onSelectTeam={onSelectTeam} onOpenContact={onOpenContact} />
        </div>
      </section>

      {/* 4. PHILOSOPHY SECTION — with stadium background image */}
      <section className="py-24 border-y-2 border-gray-200 relative overflow-hidden">
        {/* Background stadium image */}
        <img
          src="https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?w=1600&q=70&auto=format&fit=crop"
          alt="Stadium atmosphere"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-white/90" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#3854A4] mb-4 block">
            OUR PHILOSOPHY
          </span>

          <h2 className="font-bebas text-4xl sm:text-7xl md:text-9xl text-gray-900 tracking-wider uppercase leading-none mb-16">
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-block hover:text-[#3854A4] transition-colors cursor-default"
            >
              INSPIRE.
            </motion.span>{' '}
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="inline-block text-[#E82024] hover:text-[#3854A4] transition-colors cursor-default"
            >
              EMPOWER.
            </motion.span>{' '}
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="inline-block text-[#3854A4] hover:text-gray-900 transition-colors cursor-default"
            >
              UNITE.
            </motion.span>
          </h2>

          <MobileCarousel desktopClass="grid-cols-3">
            <div className="bg-white border-2 border-gray-200 p-8 rounded-xl hover:border-[#3854A4] transition-colors shadow-sm group h-full">
              <span className="font-bebas text-4xl text-[#3854A4] block mb-2">INSPIRE</span>
              <p className="text-sm text-gray-700 leading-relaxed font-medium">
                Empowering young athletes to dream bigger, work harder and believe that their potential has no limits.
              </p>
            </div>

            <div className="bg-white border-2 border-gray-200 p-8 rounded-xl hover:border-[#E82024] transition-colors shadow-sm group h-full">
              <span className="font-bebas text-4xl text-[#E82024] block mb-2">EMPOWER</span>
              <p className="text-sm text-gray-700 leading-relaxed font-medium">
                A professional platform where talent from every corner of North India gets opportunity, exposure and recognition.
              </p>
            </div>

            <div className="bg-white border-2 border-gray-200 p-8 rounded-xl hover:border-[#3854A4] transition-colors shadow-sm group h-full">
              <span className="font-bebas text-4xl text-[#3854A4] block mb-2">UNITE</span>
              <p className="text-sm text-gray-700 leading-relaxed font-medium">
                Bringing players, fans, communities and cities together through the energy, passion and spirit of the game.
              </p>
            </div>
          </MobileCarousel>
        </div>
      </section>

      {/* 5. WHY NPVL CARDS SECTION */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto space-y-12">
          <div className="text-center">
            <span className="text-xs font-bold uppercase tracking-widest text-[#3854A4] bg-[#3854A4]/10 px-3 py-1 rounded-full border border-[#3854A4]/30">
              STRATEGIC PILLARS
            </span>
            <h2 className="font-bebas text-5xl md:text-7xl text-gray-900 tracking-wider uppercase mt-3">
              WHY NPVL?
            </h2>
          </div>

          <MobileCarousel desktopClass="grid-cols-3 lg:grid-cols-5">
            {whyCards.map((card, idx) => (
              <div
                key={idx}
                className="group relative bg-slate-50 border-2 border-gray-200 hover:border-[#3854A4] p-6 rounded-xl transition-all duration-300 flex flex-col justify-between shadow-2xs hover:shadow-md h-full"
              >
                <div>
                  <span className="text-[10px] font-bold text-[#3854A4] tracking-widest uppercase bg-[#3854A4]/10 px-2 py-0.5 rounded border border-[#3854A4]/20">
                    {card.tag}
                  </span>
                  <h3 className="font-bebas text-3xl text-gray-900 tracking-wider mt-4 mb-2 group-hover:text-[#3854A4] transition-colors">
                    {card.title}
                  </h3>
                  <p className="text-xs text-gray-600 leading-relaxed font-medium">
                    {card.desc}
                  </p>
                </div>
                <div className="mt-6 pt-4 border-t border-gray-200 text-[10px] font-bold uppercase tracking-widest text-gray-400 group-hover:text-gray-900 transition-colors">
                  PILLAR 0{idx + 1}
                </div>
              </div>
            ))}
          </MobileCarousel>
        </div>
      </section>

      {/* INFINITE BROADCAST MARQUEE TICKER */}
      <BroadcastMarquee />

      {/* 6. STADIUM BRANDING & MEDIA HIGHLIGHT SHOWCASE */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50 border-t border-gray-200">
        <div className="max-w-7xl mx-auto">
          <StadiumBrandingShowcase onOpenContact={onOpenContact} />
        </div>
      </section>
    </div>
  );
}


