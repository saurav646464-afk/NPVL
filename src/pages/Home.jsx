import React from 'react';
import { motion } from 'framer-motion';
import { ChevronDown, Trophy, Sparkles, ShieldCheck, ArrowRight, Zap, Target, Users, Flame, Globe } from 'lucide-react';
import StadiumBrandingShowcase from '../components/StadiumBrandingShowcase';

import BroadcastMarquee from '../components/BroadcastMarquee';

export default function Home({ setCurrentPage, onOpenContact }) {
  const stats = [
    { label: 'TEAMS', number: '07', sub: 'Regional Squads' },
    { label: 'DAYS OF ACTION', number: '15', sub: 'High-Octane Event' },
    { label: 'MATCHES PROPOSED', number: '24*', sub: '21 League + 2 Semis + 1 Final' },
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
      {/* 1. CINEMATIC HERO SECTION (RED + WHITE) */}
      <section className="relative min-h-screen flex items-center justify-center pt-24 pb-16 px-4 sm:px-6 lg:px-8 overflow-hidden bg-gradient-to-b from-white via-gray-50 to-white">
        {/* Dynamic Background Visuals */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-[#E50914]/10 blur-[150px] rounded-full animate-pulse-glow" />

          {/* Volleyball Court Line Overlay */}
          <svg className="absolute inset-0 w-full h-full opacity-10" viewBox="0 0 1000 600" preserveAspectRatio="none">
            <line x1="0" y1="300" x2="1000" y2="300" stroke="#E50914" strokeWidth="4" />
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
                <stop offset="50%" stopColor="#E50914" />
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
            <img src="/logo.png" alt="Official NPVL Logo" className="h-28 md:h-36 w-auto object-contain filter drop-shadow-xl" />
          </motion.div>

          {/* Badges */}
          <div className="flex flex-wrap items-center justify-center gap-3">
            <span className="text-xs md:text-sm font-bold tracking-[0.2em] text-[#E50914] uppercase bg-[#E50914]/10 border border-[#E50914]/30 px-3.5 py-1 rounded-full">
              NORTH PREMIER VOLLEYBALL LEAGUE
            </span>
            <span className="text-xs md:text-sm font-bold tracking-[0.2em] text-gray-900 uppercase bg-gray-100 border border-gray-300 px-3.5 py-1 rounded-full flex items-center gap-1.5 shadow-xs">
              <Zap className="w-3.5 h-3.5 text-[#E50914] animate-pulse" />
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
            <span className="text-[#E50914] glow-text-red">VOLLEYBALL</span>
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
              className="red-sweep-btn w-full sm:w-auto bg-[#E50914] hover:bg-[#B20710] text-white font-bold text-sm uppercase tracking-wider px-8 py-4 rounded-lg shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2"
            >
              <span>EXPLORE THE LEAGUE</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={onOpenContact}
              className="w-full sm:w-auto bg-gray-900 hover:bg-black text-white font-bold text-sm uppercase tracking-wider px-8 py-4 rounded-lg shadow-md transition-all flex items-center justify-center gap-2"
            >
              <span>JOIN THE JOURNEY</span>
            </button>
          </div>
        </div>

      </section>

      {/* 2. HERO STATISTICS SECTION */}
      <section className="relative z-30 bg-gray-50 border-y-2 border-[#E50914]/20 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 text-center">
            {stats.map((st, idx) => (
              <motion.div
                key={idx}
                initial={{ scale: 0.95, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="bg-white border-2 border-gray-200 p-6 rounded-xl hover:border-[#E50914] transition-colors shadow-sm hover:shadow-md group"
              >
                <div className="font-bebas text-6xl md:text-8xl text-gray-900 tracking-wider leading-none group-hover:text-[#E50914] transition-colors">
                  {st.number}
                </div>
                <div className="font-bebas text-xl md:text-2xl text-[#E50914] tracking-wider uppercase mt-1">
                  {st.label}
                </div>
                <div className="text-xs text-gray-600 mt-1 font-bold">{st.sub}</div>
              </motion.div>
            ))}
          </div>

          <p className="text-center text-xs text-gray-500 mt-6 font-bold italic">
            *Proposed Season 1 structure. Dates, venues and final details are subject to confirmation.
          </p>
        </div>
      </section>

      {/* 3. INTRODUCTION SECTION */}
      <section className="py-20 md:py-28 px-4 sm:px-6 lg:px-8 bg-white relative">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7 space-y-6">
            <span className="text-xs font-bold uppercase tracking-widest text-[#E50914] bg-[#E50914]/10 px-3 py-1 rounded-full border border-[#E50914]/30">
              LEAGUE OVERVIEW
            </span>

            <h2 className="font-bebas text-4xl sm:text-6xl md:text-7xl text-gray-900 tracking-wider uppercase leading-none">
              MORE THAN A LEAGUE. <br />
              <span className="text-[#E50914]">A MOVEMENT FOR VOLLEYBALL.</span>
            </h2>

            <p className="text-base md:text-lg text-gray-700 leading-relaxed font-medium">
              North Premier Volleyball League is being built as a professionally structured volleyball platform focused on creating competitive opportunities for athletes and building a stronger volleyball ecosystem across North India.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 text-sm text-gray-800">
              <div className="flex items-start gap-3 bg-gray-50 p-4 rounded-lg border border-gray-200 shadow-2xs">
                <Target className="w-5 h-5 text-[#E50914] shrink-0 mt-0.5" />
                <span className="font-medium">Create a professional platform for volleyball across North India.</span>
              </div>
              <div className="flex items-start gap-3 bg-gray-50 p-4 rounded-lg border border-gray-200 shadow-2xs">
                <Users className="w-5 h-5 text-[#E50914] shrink-0 mt-0.5" />
                <span className="font-medium">Provide athletes with structured competitive opportunities.</span>
              </div>
              <div className="flex items-start gap-3 bg-gray-50 p-4 rounded-lg border border-gray-200 shadow-2xs">
                <Flame className="w-5 h-5 text-[#E50914] shrink-0 mt-0.5" />
                <span className="font-medium">Connect grassroots talent with higher-level national competition.</span>
              </div>
              <div className="flex items-start gap-3 bg-gray-50 p-4 rounded-lg border border-gray-200 shadow-2xs">
                <Globe className="w-5 h-5 text-[#E50914] shrink-0 mt-0.5" />
                <span className="font-medium">Build strong regional teams, city pride and team identities.</span>
              </div>
            </div>
          </div>

          {/* Right Visual Frame — Volleyball Image */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-2xl overflow-hidden border-2 border-[#E50914]/40 shadow-xl aspect-[4/3]">
              <img
                src="https://images.unsplash.com/photo-1612872087720-bb876e2e67d1?w=800&q=80&auto=format&fit=crop"
                alt="Volleyball action"
                className="absolute inset-0 w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <blockquote className="text-base md:text-lg italic text-white font-serif leading-relaxed mb-3">
                  "From local grounds to packed arenas. From individual dreams to a shared movement."
                </blockquote>
                <div className="flex items-center justify-between text-xs text-white/70 font-bold pt-3 border-t border-white/20">
                  <span>OFFICIAL LEAGUE DECK SOURCE</span>
                  <span className="text-[#E50914] bg-black/40 px-2 py-0.5 rounded">SEASON 1</span>
                </div>
              </div>
            </div>
          </div>
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
        <div className="absolute inset-0 bg-white/88" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#E50914] mb-4 block">
            OUR PHILOSOPHY
          </span>

          <h2 className="font-bebas text-6xl sm:text-8xl md:text-9xl text-gray-900 tracking-wider uppercase leading-none mb-16">
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-block hover:text-[#E50914] transition-colors cursor-default"
            >
              INSPIRE.
            </motion.span>{' '}
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="inline-block text-[#E50914] hover:text-gray-900 transition-colors cursor-default"
            >
              EMPOWER.
            </motion.span>{' '}
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="inline-block hover:text-[#E50914] transition-colors cursor-default"
            >
              UNITE.
            </motion.span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
            <div className="bg-white border-2 border-gray-200 p-8 rounded-xl hover:border-[#E50914] transition-colors shadow-sm group">
              <span className="font-bebas text-4xl text-[#E50914] block mb-2">01 / INSPIRE</span>
              <p className="text-sm text-gray-700 leading-relaxed font-medium">
                Empowering young athletes to dream bigger, work harder and believe that their potential has no limits.
              </p>
            </div>

            <div className="bg-white border-2 border-gray-200 p-8 rounded-xl hover:border-[#E50914] transition-colors shadow-sm group">
              <span className="font-bebas text-4xl text-[#E50914] block mb-2">02 / EMPOWER</span>
              <p className="text-sm text-gray-700 leading-relaxed font-medium">
                A professional platform where talent from every corner of North India gets opportunity, exposure and recognition.
              </p>
            </div>

            <div className="bg-white border-2 border-gray-200 p-8 rounded-xl hover:border-[#E50914] transition-colors shadow-sm group">
              <span className="font-bebas text-4xl text-[#E50914] block mb-2">03 / UNITE</span>
              <p className="text-sm text-gray-700 leading-relaxed font-medium">
                Bringing players, fans, communities and cities together through the energy, passion and spirit of the game.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 5. WHY NPVL CARDS SECTION */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto space-y-12">
          <div className="text-center">
            <span className="text-xs font-bold uppercase tracking-widest text-[#E50914] bg-[#E50914]/10 px-3 py-1 rounded-full border border-[#E50914]/30">
              STRATEGIC PILLARS
            </span>
            <h2 className="font-bebas text-5xl md:text-7xl text-gray-900 tracking-wider uppercase mt-3">
              WHY NPVL?
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {whyCards.map((card, idx) => (
              <div
                key={idx}
                className="group relative bg-gray-50 border-2 border-gray-200 hover:border-[#E50914] p-6 rounded-xl transition-all duration-300 flex flex-col justify-between shadow-2xs hover:shadow-md"
              >
                <div>
                  <span className="text-[10px] font-bold text-[#E50914] tracking-widest uppercase bg-[#E50914]/10 px-2 py-0.5 rounded border border-[#E50914]/20">
                    {card.tag}
                  </span>
                  <h3 className="font-bebas text-3xl text-gray-900 tracking-wider mt-4 mb-2 group-hover:text-[#E50914] transition-colors">
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
          </div>
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
