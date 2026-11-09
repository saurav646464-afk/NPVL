import React from 'react';
import { ShieldCheck, FileText, Lock, RefreshCcw } from 'lucide-react';

export default function TermsAndConditions({ onOpenContact }) {
  return (
    <div className="min-h-screen bg-white text-gray-900 pt-28 pb-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-10">
        
        {/* Header */}
        <div className="text-center space-y-3 border-b pb-8 border-gray-200">
          <span className="text-xs font-bold uppercase tracking-widest text-[#3854A4] bg-[#3854A4]/10 px-3.5 py-1 rounded-full border border-[#3854A4]/30">
            LEGAL & REGULATORY COMPLIANCE
          </span>
          <h1 className="font-bebas text-4xl sm:text-6xl text-gray-900 tracking-wider uppercase">
            TERMS & <span className="text-[#3854A4]">CONDITIONS</span>
          </h1>
          <p className="text-xs sm:text-sm text-gray-500 font-medium">
            Last Updated: November 2026 | Effective for Season 1 & Official Digital Operations
          </p>
        </div>

        {/* Content Body */}
        <div className="space-y-8 text-sm text-gray-700 leading-relaxed font-sans">
          
          <section className="bg-gray-50 p-6 rounded-2xl border border-gray-200 space-y-2">
            <h2 className="font-bebas text-2xl text-gray-900 tracking-wider flex items-center gap-2">
              <FileText className="w-5 h-5 text-[#3854A4]" /> 1. ACCEPTANCE OF TERMS
            </h2>
            <p>
              By accessing, browsing, registering, or transacting on the North Premier Volleyball League (NPVL) website (the "Platform"), you acknowledge and agree to comply with and be bound by these Terms and Conditions, our Privacy Policy, and our Refund Policy. If you do not agree with any part of these terms, please do not use the Platform.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-bebas text-2xl text-gray-900 tracking-wider">
              2. NATURE OF THE LEAGUE & SERVICES
            </h2>
            <p>
              NPVL is a premier sports league initiative conceptualized to promote, develop, and showcase volleyball talent across North India. The Platform provides information, player registration forms, trial announcements, ticketing updates, franchise opportunities, fan memberships, and official league communications.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-bebas text-2xl text-gray-900 tracking-wider">
              3. REGISTRATION, TRIALS & ATHLETE ELIGIBILITY
            </h2>
            <ul className="list-disc pl-5 space-y-2">
              <li>All athletes submitting trial or registration applications must provide truthful, complete, and legally verifiable details (including proof of age, citizenship, and medical fitness).</li>
              <li>Participation in trials or selection camps does not guarantee final squad selection or franchise contracts.</li>
              <li>NPVL reserves the right to verify credentials and disqualify any applicant found furnishing falsified documentation without prior notice.</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="font-bebas text-2xl text-gray-900 tracking-wider">
              4. PAYMENTS, PRICING & PAYMENT GATEWAY USAGE
            </h2>
            <p>
              Any payments made on the Platform—including but not limited to registration processing fees, fan club passes, match tickets, or official merchandise—are processed securely through authorized third-party payment gateways (including <strong>Razorpay</strong>).
            </p>
            <ul className="list-disc pl-5 space-y-2">
              <li>All fees are listed in Indian Rupees (INR) and are inclusive of applicable statutory taxes unless stated otherwise.</li>
              <li>You agree to provide valid, authorized payment instruments (UPI, Debit/Credit Card, Net Banking) during transactions.</li>
              <li>NPVL does not store complete banking or card details on its servers. All payment handling adheres to RBI & PCI-DSS compliance standards.</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="font-bebas text-2xl text-gray-900 tracking-wider">
              5. INTELLECTUAL PROPERTY RIGHTS
            </h2>
            <p>
              All trademarks, emblems, team crests, logos, designs, audio-visual footage, photography, and textual content published on this website are the proprietary property of North Premier Volleyball League (NPVL) and its authorized media partners (The Backstory Media). Unauthorized reproduction, redistribution, or commercial use is strictly prohibited.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-bebas text-2xl text-gray-900 tracking-wider">
              6. EVENT RESCHEDULING & FORCE MAJEURE
            </h2>
            <p>
              NPVL shall not be held liable for any postponement, venue modification, or cancellation of match fixtures, trials, or ceremonies arising due to weather conditions, government directives, safety protocols, or force majeure events.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-bebas text-2xl text-gray-900 tracking-wider">
              7. GOVERNING LAW & JURISDICTION
            </h2>
            <p>
              These Terms & Conditions shall be construed and governed in accordance with the laws of India. Any disputes arising in connection with the Platform or league transactions shall be subject to the exclusive jurisdiction of the competent courts in Uttar Pradesh / New Delhi, India.
            </p>
          </section>

          {/* Contact box */}
          <div className="bg-blue-50/70 border border-[#3854A4]/30 p-6 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <h3 className="font-bebas text-xl text-[#3854A4] tracking-wide">HAVE QUESTIONS REGARDING OUR TERMS?</h3>
              <p className="text-xs text-gray-600">Our legal and technical desk is available to assist you.</p>
            </div>
            <button
              onClick={onOpenContact}
              className="bg-[#3854A4] hover:bg-[#2A4080] text-white text-xs font-bold uppercase tracking-wider px-6 py-2.5 rounded-lg shadow-sm transition-all"
            >
              CONTACT LEGAL DESK
            </button>
          </div>

        </div>

      </div>
    </div>
  );
}
