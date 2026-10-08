import React from 'react';
import { Tv, Radio, Share2, Play, Video, Smartphone, TrendingUp, Users, Globe, Flame, ShieldAlert } from 'lucide-react';
import BroadcastMarquee from '../components/BroadcastMarquee';
import MobileCarousel from '../components/MobileCarousel';

export default function Media() {
  const broadcastPartners = [
    {
      name: 'JIOHOTSTAR',
      type: 'OTT & DIGITAL BROADCAST',
      status: 'TENTATIVE PARTNER',
      highlight: '451M Average Monthly Active Users (FY26)',
      desc: 'Leading digital streaming platform in India delivering high-concurrency sports coverage to mobile & connected TVs.',
      source: 'Source: Reliance Industries / JioStar (FY26)'
    },
    {
      name: 'SONYLIV',
      type: 'OTT & DIGITAL BROADCAST',
      status: 'TENTATIVE PARTNER',
      highlight: '90%+ Web Traffic from India | 72.5M Peak Concurrency',
      desc: 'World-record holder for peak live streaming concurrency during ICC Men\'s T20 World Cup.',
      source: 'Source: Similarweb (sonyliv.com web traffic)'
    },
    {
      name: 'DD SPORTS',
      type: 'TERRESTRIAL & SATELLITE TV',
      status: 'TENTATIVE PARTNER',
      highlight: '49M Registered Users | 1.2 Cr Households',
      desc: 'National public sports broadcaster delivering maximum television reach across 1.2 Cr DD Free Dish households.',
      source: 'Source: Prasar Bharati Annual Report 2024-25'
    },
    {
      name: 'WAVES OTT',
      type: 'PUBLIC DIGITAL PLATFORM',
      status: 'TENTATIVE PARTNER',
      highlight: '1.5 Crore+ Downloads | 130+ Countries',
      desc: 'Prasar Bharati\'s flagship OTT streaming platform with extensive global Indian diaspora footprint.',
      source: 'Source: Prasar Bharati, Sept 2026'
    }
  ];

  const broadcastReachMetrics = [
    {
      platform: 'JioHotstar',
      stat: '451M',
      label: 'AVERAGE MONTHLY ACTIVE USERS',
      detail: 'During FY26 across digital ecosystem',
      source: 'Reliance Industries / JioStar (FY26)'
    },
    {
      platform: 'SonyLIV',
      stat: '90%+',
      label: 'INDIA DOMESTIC WEB TRAFFIC',
      detail: 'Of overall platform web traffic originates from India',
      source: 'Similarweb (sonyliv.com web traffic)'
    },
    {
      platform: 'SonyLIV',
      stat: '72.5M',
      label: 'PEAK LIVE STREAMING CONCURRENCY',
      detail: 'World record peak live stream concurrency (ICC Men\'s T20 World Cup)',
      source: 'SonyLIV Official Record'
    },
    {
      platform: 'DD Sports / Waves OTT',
      stat: '49M',
      label: 'REGISTERED USERS',
      detail: 'Public broadcasting digital user footprint',
      source: 'Prasar Bharati Report 2024-25'
    },
    {
      platform: 'DD Free Dish',
      stat: '1.2 Cr',
      label: 'HOUSEHOLDS REACH',
      detail: 'Free-to-air direct-to-home television reach across India',
      source: 'Prasar Bharati Annual Report 2024-25'
    },
    {
      platform: 'Waves OTT',
      stat: '1.5 Cr+',
      label: 'APP DOWNLOADS',
      detail: 'Flagship OTT downloads across mobile & smart TVs',
      source: 'Prasar Bharati, Sept 2026'
    },
    {
      platform: 'Waves OTT',
      stat: '130+',
      label: 'COUNTRIES FOOTPRINT',
      detail: 'Global international diaspora availability',
      source: 'Prasar Bharati, Sept 2026'
    }
  ];

  const contentPillars = [
    { title: 'LIVE MATCH COVERAGE', desc: 'Broadcast-quality match production bringing every jump, spike and rally to millions of viewers.', icon: Tv },
    { title: 'STREAMING', desc: 'On-demand OTT access taking NPVL to mobile-first audiences across India.', icon: Smartphone },
    { title: 'HIGHLIGHTS & REELS', desc: 'High-frequency daily clips, top plays, and viral social media moments.', icon: Video },
    { title: 'ATHLETE STORIES', desc: 'In-depth player profiles highlighting raw talent, discipline, and personal journeys.', icon: Play },
    { title: 'BEHIND THE SCENES', desc: 'Locker room access, practice sessions, travel vlogs, and team camera access.', icon: Share2 },
    { title: 'SOCIAL MEDIA', desc: 'Always-on digital storytelling across YouTube, Instagram, Facebook, X, and LinkedIn.', icon: Share2 },
  ];

  const socialPlatforms = [
    { platform: 'YOUTUBE', role: 'Full match replays, highlights and long-form features.' },
    { platform: 'INSTAGRAM', role: 'Reels, player stories, match-day graphics and live updates.' },
    { platform: 'FACEBOOK', role: 'Community groups, live streams and regional fan engagement.' },
    { platform: 'X', role: 'Real-time scores, match commentary and media updates.' },
    { platform: 'LINKEDIN', role: 'League news, partner announcements and business stories.' },
  ];

  const radioPoints = [
    { title: 'ON-AIR PROMOS', desc: 'Match day promos and countdowns' },
    { title: 'RJ MENTIONS', desc: 'Live talk, trivia and fan contests' },
    { title: 'CITY ACTIVATIONS', desc: 'On ground presence in host cities' },
    { title: 'PLAYER INTERVIEWS', desc: 'Stories straight from the court' },
    { title: 'TICKET GIVEAWAYS', desc: 'Driving footfall to the stands' },
  ];

  const prCategories = [
    { title: 'PRESS & LAUNCH', desc: 'Press conferences and launch events' },
    { title: 'MEDIA COVERAGE', desc: 'National and regional outlets' },
    { title: 'CREATORS', desc: 'Influencer and creator collaborations' },
    { title: 'COMMUNITY', desc: 'School, college and community outreach' },
  ];

  return (
    <div className="min-h-screen bg-white text-gray-900 pt-28 pb-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-20">
        
        {/* Header */}
        <div className="text-center max-w-4xl mx-auto space-y-4">
          <span className="text-xs font-montserrat font-bold uppercase tracking-widest text-[#E50914] bg-[#E50914]/10 px-3 py-1 rounded-full border border-[#E50914]/30">
            MEDIA & DIGITAL DISTRIBUTION
          </span>
          <h1 className="font-montserrat font-bold text-4xl sm:text-6xl md:text-7xl text-gray-900 tracking-wider uppercase leading-none">
            THE GAME DOESN'T STOP AT <br />
            <span className="text-[#E50914]">THE FINAL WHISTLE.</span>
          </h1>
          <p className="text-sm md:text-base text-gray-700 font-medium leading-relaxed font-sans">
            NPVL brings volleyball to wider national audiences through modern digital storytelling, OTT streaming, broadcast coverage, and daily social media engagement.
          </p>
        </div>

        {/* Media Banner Image */}
        <div className="relative rounded-2xl overflow-hidden h-48 md:h-64 shadow-xl">
          <img
            src="/volleyball-match.jpg"
            alt="Volleyball match broadcast"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-l from-black/80 via-black/40 to-transparent flex items-center justify-end p-8 md:p-12">
            <div className="text-right">
              <p className="font-montserrat font-bold text-xl md:text-3xl text-white tracking-wider">BEYOND THE COURT</p>
              <p className="font-montserrat font-bold text-2xl md:text-4xl text-[#E50914] tracking-wider leading-none">REACH MILLIONS</p>
            </div>
          </div>
        </div>

        {/* INFINITE BROADCAST MARQUEE TICKER */}
        <BroadcastMarquee />

        {/* 1. TENTATIVE BROADCAST & STREAMING PARTNERS */}
        <section className="bg-gray-50 border-2 border-[#E50914]/40 p-5 sm:p-8 md:p-12 rounded-3xl space-y-6 sm:space-y-8 shadow-sm">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-gray-200 pb-5">
            <div>
              <span className="text-xs font-montserrat font-semibold text-[#E50914] uppercase tracking-widest block mb-1">
                TENTATIVE BROADCAST & STREAMING PARTNERS
              </span>
              <h2 className="font-montserrat font-bold text-xl sm:text-2xl md:text-4xl text-gray-900 tracking-wider uppercase break-words">
                BROADCAST & STREAMING PARTNERS — TENTATIVE
              </h2>
            </div>
            <span className="bg-[#E50914] text-white text-xs font-montserrat font-semibold px-3 py-1.5 rounded-full uppercase tracking-wider shrink-0 shadow-xs self-start sm:self-auto">
              PARTNERS TENTATIVE
            </span>
          </div>

          <MobileCarousel desktopClass="md:grid-cols-2">
            {broadcastPartners.map((partner, idx) => (
              <div key={idx} className="bg-white border-2 border-gray-200 hover:border-[#E50914] p-5 sm:p-6 rounded-2xl space-y-3 shadow-2xs hover:shadow-md transition-all h-full">
                <div className="flex flex-wrap items-center justify-between gap-2 border-b border-gray-100 pb-3">
                  <h3 className="font-montserrat font-bold text-xl sm:text-2xl text-gray-900 tracking-wider">{partner.name}</h3>
                  <span className="text-[10px] font-montserrat font-semibold bg-red-50 text-[#E50914] border border-[#E50914]/30 px-2 py-0.5 rounded whitespace-nowrap">
                    {partner.status}
                  </span>
                </div>
                <div className="text-xs font-montserrat font-semibold text-[#E50914] uppercase tracking-wider">
                  {partner.highlight}
                </div>
                <p className="text-xs text-gray-700 font-sans leading-relaxed">
                  {partner.desc}
                </p>
                <div className="p-2.5 bg-gray-50 rounded-xl border border-gray-200 text-[11px] text-gray-500 font-sans font-medium">
                  {partner.source}. Platform figures, not NPVL projections. Partners tentative.
                </div>
              </div>
            ))}
          </MobileCarousel>
        </section>

        {/* 2. NEW BROADCAST REACH SECTION */}
        <section className="space-y-8">
          <div className="text-center max-w-3xl mx-auto space-y-2">
            <span className="text-xs font-montserrat font-semibold uppercase tracking-widest text-[#E50914]">
              MASSIVE AUDIENCE FOOTPRINT
            </span>
            <h2 className="font-montserrat font-bold text-3xl sm:text-4xl md:text-6xl text-gray-900 tracking-wider uppercase break-words">
              BROADCAST REACH
            </h2>
            <p className="text-sm sm:text-base text-[#E50914] font-montserrat font-semibold italic">
              "Taking NPVL to a Massive National & Global Audience"
            </p>
          </div>

          <MobileCarousel desktopClass="sm:grid-cols-2 lg:grid-cols-4">
            {broadcastReachMetrics.map((item, idx) => (
              <div
                key={idx}
                className="group bg-white border-2 border-gray-200 hover:border-[#E50914] p-6 rounded-2xl transition-all shadow-2xs hover:shadow-lg flex flex-col justify-between h-full"
              >
                <div>
                  <div className="flex items-center justify-between text-[11px] font-montserrat font-bold text-gray-500 mb-3 border-b border-gray-100 pb-2">
                    <span>{item.platform}</span>
                    <TrendingUp className="w-4 h-4 text-[#E50914]" />
                  </div>
                  <div className="font-montserrat font-black text-4xl md:text-5xl text-[#E50914] tracking-tight group-hover:scale-105 transition-transform duration-300 my-1">
                    {item.stat}
                  </div>
                  <div className="font-montserrat font-bold text-xs text-gray-900 uppercase tracking-wider my-2 leading-snug">
                    {item.label}
                  </div>
                  <p className="text-xs text-gray-600 font-sans leading-relaxed">
                    {item.detail}
                  </p>
                </div>
                <div className="pt-3 mt-4 border-t border-gray-100 text-[10px] text-gray-400 font-sans font-medium">
                  {item.source}
                </div>
              </div>
            ))}
          </MobileCarousel>

          {/* Broadcast Reach Disclaimer & Source Footer */}
          <div className="bg-gray-50 border border-gray-300 p-5 sm:p-6 rounded-xl space-y-2 text-center text-xs text-gray-600 font-sans shadow-2xs">
            <p className="font-montserrat font-bold text-gray-900 uppercase tracking-wider">
              IMPORTANT DISCLAIMER: Platform figures, not NPVL projections. Partners tentative.
            </p>
            <div className="flex flex-wrap justify-center items-center gap-x-6 gap-y-1 text-[11px] text-gray-500 pt-1">
              <span>• Reliance Industries / JioStar (FY26)</span>
              <span>• Similarweb (sonyliv.com web traffic)</span>
              <span>• Prasar Bharati Annual Report 2024-25 (DD Free Dish)</span>
              <span>• Prasar Bharati, Sept 2026 (WAVES OTT)</span>
            </div>
          </div>
        </section>

        {/* 3. NEW RADIO PARTNER SECTION & 4. PR & OUTREACH PARTNERS SECTION */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Radio Partner Section */}
          <div className="bg-gray-50 border-2 border-gray-200 hover:border-[#E50914] p-6 sm:p-8 rounded-2xl space-y-6 shadow-sm transition-colors">
            <div className="space-y-1 border-b border-gray-200 pb-4">
              <div className="flex items-center gap-2 text-[#E50914]">
                <Radio className="w-6 h-6" />
                <span className="text-xs font-montserrat font-bold uppercase tracking-widest">
                  RADIO PARTNER / RADIO ACTIVATION (TENTATIVE)
                </span>
              </div>
              <h3 className="font-montserrat font-black text-2xl sm:text-3xl md:text-4xl text-gray-900 tracking-wider uppercase break-words">
                TAKING NPVL TO EVERY STREET
              </h3>
            </div>

            <MobileCarousel desktopClass="grid-cols-1 !gap-3">
              {radioPoints.map((point, idx) => (
                <div key={idx} className="bg-white border border-gray-200 p-4 rounded-xl flex items-start gap-3 shadow-2xs h-full">
                  <div className="w-2 h-2 rounded-full bg-[#E50914] mt-2 shrink-0" />
                  <div>
                    <h4 className="font-montserrat font-bold text-sm text-gray-900 tracking-wider uppercase">
                      {point.title}
                    </h4>
                    <p className="text-xs text-gray-600 font-sans mt-0.5">{point.desc}</p>
                  </div>
                </div>
              ))}
            </MobileCarousel>
          </div>

          {/* PR & Outreach Partners Section */}
          <div className="bg-gray-50 border-2 border-gray-200 hover:border-[#E50914] p-6 sm:p-8 rounded-2xl space-y-6 shadow-sm transition-colors">
            <div className="space-y-1 border-b border-gray-200 pb-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-[#E50914]">
                  <Share2 className="w-6 h-6" />
                  <span className="text-xs font-montserrat font-bold uppercase tracking-widest">
                    OUTREACH & MEDIA RELATIONS
                  </span>
                </div>
                <span className="bg-[#E50914] text-white text-[10px] font-montserrat font-bold px-2.5 py-0.5 rounded uppercase">
                  TENTATIVE
                </span>
              </div>
              <h3 className="font-montserrat font-black text-2xl sm:text-3xl md:text-4xl text-gray-900 tracking-wider uppercase break-words">
                PR & OUTREACH PARTNERS
              </h3>
            </div>

            <MobileCarousel desktopClass="grid-cols-1 !gap-3">
              {prCategories.map((pr, idx) => (
                <div key={idx} className="bg-white border border-gray-200 p-4 rounded-xl flex items-start gap-3 shadow-2xs h-full">
                  <div className="w-2 h-2 rounded-full bg-[#E50914] mt-2 shrink-0" />
                  <div>
                    <h4 className="font-montserrat font-bold text-sm text-gray-900 tracking-wider uppercase">
                      {pr.title}
                    </h4>
                    <p className="text-xs text-gray-600 font-sans mt-0.5">{pr.desc}</p>
                  </div>
                </div>
              ))}
            </MobileCarousel>
          </div>
        </section>

        {/* Content Pillars */}
        <section className="space-y-8">
          <div className="text-center">
            <span className="text-xs font-montserrat font-bold uppercase tracking-widest text-[#E50914]">ALWAYS-ON CONTENT</span>
            <h2 className="font-montserrat font-black text-3xl sm:text-4xl md:text-6xl text-gray-900 tracking-wider uppercase mt-1 break-words">
              MEDIA & CONTENT PILLARS
            </h2>
          </div>

          <MobileCarousel desktopClass="md:grid-cols-2 lg:grid-cols-3">
            {contentPillars.map((pillar, idx) => {
              const Icon = pillar.icon;
              return (
                <div key={idx} className="bg-gray-50 border-2 border-gray-200 hover:border-[#E50914] p-6 rounded-xl space-y-3 transition-colors shadow-2xs h-full">
                  <div className="w-10 h-10 bg-[#E50914]/10 rounded-lg flex items-center justify-center text-[#E50914] border border-[#E50914]/30">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="font-montserrat font-bold text-xl text-gray-900 tracking-wider">{pillar.title}</h3>
                  <p className="text-xs text-gray-700 font-medium leading-relaxed font-sans">{pillar.desc}</p>
                </div>
              );
            })}
          </MobileCarousel>
        </section>

        {/* Social Platforms */}
        <section className="bg-gray-50 border-2 border-gray-200 p-6 sm:p-8 rounded-2xl space-y-6 shadow-sm">
          <h3 className="font-montserrat font-black text-xl sm:text-2xl md:text-3xl text-gray-900 tracking-wider text-center uppercase break-words">
            ALWAYS-ON DIGITAL STORYTELLING PLATFORMS
          </h3>
          <MobileCarousel desktopClass="sm:grid-cols-2 lg:grid-cols-5">
            {socialPlatforms.map((soc, idx) => (
              <div key={idx} className="bg-white border border-gray-300 p-4 sm:p-5 rounded-xl space-y-2 shadow-2xs h-full">
                <span className="font-montserrat font-black text-lg text-[#E50914]">{soc.platform}</span>
                <p className="text-xs text-gray-700 font-medium font-sans">{soc.role}</p>
              </div>
            ))}
          </MobileCarousel>
        </section>

      </div>
    </div>
  );
}
