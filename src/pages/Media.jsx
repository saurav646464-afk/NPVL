import React from 'react';
import { Tv, Radio, Share2, Play, Video, Smartphone } from 'lucide-react';

export default function Media() {
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

  return (
    <div className="min-h-screen bg-white text-gray-900 pt-28 pb-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-16">
        <div className="text-center max-w-4xl mx-auto space-y-4">
          <span className="text-xs font-bold uppercase tracking-widest text-[#E50914] bg-[#E50914]/10 px-3 py-1 rounded-full border border-[#E50914]/30">
            MEDIA & DIGITAL DISTRIBUTION
          </span>
          <h1 className="font-bebas text-6xl sm:text-8xl text-gray-900 tracking-wider uppercase leading-none">
            THE GAME DOESN'T STOP AT <br />
            <span className="text-[#E50914]">THE FINAL WHISTLE.</span>
          </h1>
          <p className="text-sm md:text-base text-gray-700 font-medium leading-relaxed">
            NPVL brings volleyball to wider national audiences through modern digital storytelling, OTT streaming, broadcast coverage, and daily social media engagement.
          </p>
        </div>

        {/* Media Banner Image */}
        <div className="relative rounded-2xl overflow-hidden h-48 md:h-60 shadow-xl">
          <img
            src="/volleyball-match.jpg"
            alt="Volleyball match broadcast"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-l from-black/70 via-black/40 to-transparent flex items-center justify-end p-8 md:p-12">
            <div className="text-right">
              <p className="font-bebas text-2xl md:text-4xl text-white tracking-wider">BEYOND THE COURT</p>
              <p className="font-bebas text-3xl md:text-5xl text-[#E50914] tracking-wider leading-none">REACH MILLIONS</p>
            </div>
          </div>
        </div>

        {/* Tentative Partners */}
        <section className="bg-gray-50 border-2 border-[#E50914]/40 p-8 md:p-12 rounded-2xl space-y-6 shadow-sm">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border-b border-gray-200 pb-6">
            <div>
              <span className="text-xs font-bold text-[#E50914] uppercase tracking-widest">
                BROADCAST / STREAMING — SUBJECT TO CONFIRMATION
              </span>
              <h2 className="font-bebas text-4xl md:text-5xl text-gray-900 tracking-wider uppercase mt-1">
                TENTATIVE BROADCASTING PARTNERS
              </h2>
            </div>
            <span className="bg-[#E50914] text-white text-xs font-bold px-3 py-1 rounded-full uppercase">
              TENTATIVE / PROPOSED
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white border-2 border-gray-200 p-6 rounded-xl space-y-4 shadow-2xs">
              <div className="flex items-center justify-between">
                <h3 className="font-bebas text-3xl text-gray-900 tracking-wider">JIOHOTSTAR</h3>
                <span className="text-[10px] text-gray-600 font-bold border border-gray-300 px-2 py-0.5 rounded">TENTATIVE PARTNER</span>
              </div>
              <p className="text-xs text-gray-700 font-medium leading-relaxed">
                <strong className="text-gray-900">451M</strong> Average monthly active users during FY26.
              </p>
              <div className="p-3 bg-gray-50 rounded border border-gray-200 text-[11px] text-gray-600 font-medium">
                Sources: Reliance Industries / JioStar (FY26, Reliance AGM 2026). Platform figures, not NPVL projections. Partner tentative.
              </div>
            </div>

            <div className="bg-white border-2 border-gray-200 p-6 rounded-xl space-y-4 shadow-2xs">
              <div className="flex items-center justify-between">
                <h3 className="font-bebas text-3xl text-gray-900 tracking-wider">SONYLIV</h3>
                <span className="text-[10px] text-gray-600 font-bold border border-gray-300 px-2 py-0.5 rounded">TENTATIVE PARTNER</span>
              </div>
              <p className="text-xs text-gray-700 font-medium leading-relaxed">
                <strong className="text-gray-900">90%+</strong> web traffic comes from India. World-record peak live-streaming concurrency platform.
              </p>
              <div className="p-3 bg-gray-50 rounded border border-gray-200 text-[11px] text-gray-600 font-medium">
                Sources: Similarweb (sonyliv.com web traffic). Platform figures, not NPVL projections. Partner tentative.
              </div>
            </div>
          </div>
        </section>

        {/* Content Pillars */}
        <section className="space-y-8">
          <div className="text-center">
            <span className="text-xs font-bold uppercase tracking-widest text-[#E50914]">ALWAYS-ON CONTENT</span>
            <h2 className="font-bebas text-4xl md:text-6xl text-gray-900 tracking-wider uppercase mt-1">
              MEDIA & CONTENT PILLARS
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {contentPillars.map((pillar, idx) => {
              const Icon = pillar.icon;
              return (
                <div key={idx} className="bg-gray-50 border-2 border-gray-200 hover:border-[#E50914] p-6 rounded-xl space-y-3 transition-colors shadow-2xs">
                  <div className="w-10 h-10 bg-[#E50914]/10 rounded-lg flex items-center justify-center text-[#E50914] border border-[#E50914]/30">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="font-bebas text-2xl text-gray-900 tracking-wider">{pillar.title}</h3>
                  <p className="text-xs text-gray-700 font-medium leading-relaxed font-sans">{pillar.desc}</p>
                </div>
              );
            })}
          </div>
        </section>

        {/* Social Platforms */}
        <section className="bg-gray-50 border-2 border-gray-200 p-8 rounded-2xl space-y-6 shadow-sm">
          <h3 className="font-bebas text-3xl text-gray-900 tracking-wider text-center">
            ALWAYS-ON DIGITAL STORYTELLING PLATFORMS
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {socialPlatforms.map((soc, idx) => (
              <div key={idx} className="bg-white border border-gray-300 p-4 rounded-xl space-y-2 shadow-2xs">
                <span className="font-bebas text-xl text-[#E50914]">{soc.platform}</span>
                <p className="text-xs text-gray-700 font-medium font-sans">{soc.role}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Radio & PR */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-gray-50 border-2 border-gray-200 p-8 rounded-2xl space-y-4 shadow-sm">
            <div className="flex items-center gap-2 text-[#E50914]">
              <Radio className="w-6 h-6" />
              <h3 className="font-bebas text-3xl text-gray-900 tracking-wider">RADIO PARTNERSHIP (TENTATIVE)</h3>
            </div>
            <ul className="space-y-2 text-xs text-gray-800 font-medium">
              <li>• On-Air Promos: Match-day promos & countdowns</li>
              <li>• RJ Mentions: Live talk, trivia and fan contests</li>
              <li>• City Activations: On-ground presence in host cities</li>
              <li>• Player Interviews: Stories straight from the court</li>
              <li>• Ticket Giveaways: Driving stadium footfall</li>
            </ul>
          </div>

          <div className="bg-gray-50 border-2 border-gray-200 p-8 rounded-2xl space-y-4 shadow-sm">
            <div className="flex items-center gap-2 text-[#E50914]">
              <Share2 className="w-6 h-6" />
              <h3 className="font-bebas text-3xl text-gray-900 tracking-wider">PR & OUTREACH PARTNERS (TENTATIVE)</h3>
            </div>
            <ul className="space-y-2 text-xs text-gray-800 font-medium">
              <li>• Press & Launch: National & regional press conferences</li>
              <li>• Media Coverage: Outlets across North India</li>
              <li>• Creator Collaborations: Influencer & sports creator content</li>
              <li>• Community Outreach: School, college and club networks</li>
            </ul>
          </div>
        </section>
      </div>
    </div>
  );
}
