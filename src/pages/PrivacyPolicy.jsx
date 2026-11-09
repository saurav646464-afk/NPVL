import React from 'react';
import { Lock, Eye, Database, ShieldAlert, CheckCircle } from 'lucide-react';

export default function PrivacyPolicy({ onOpenContact }) {
  return (
    <div className="min-h-screen bg-white text-gray-900 pt-28 pb-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-10">
        
        {/* Header */}
        <div className="text-center space-y-3 border-b pb-8 border-gray-200">
          <span className="text-xs font-bold uppercase tracking-widest text-[#3854A4] bg-[#3854A4]/10 px-3.5 py-1 rounded-full border border-[#3854A4]/30">
            DATA SECURITY & USER PRIVACY
          </span>
          <h1 className="font-bebas text-4xl sm:text-6xl text-gray-900 tracking-wider uppercase">
            PRIVACY <span className="text-[#3854A4]">POLICY</span>
          </h1>
          <p className="text-xs sm:text-sm text-gray-500 font-medium">
            Last Updated: November 2026 | Compliant with IT Act 2000 & Digital Personal Data Protection (DPDP) Guidelines
          </p>
        </div>

        {/* Content Body */}
        <div className="space-y-8 text-sm text-gray-700 leading-relaxed font-sans">
          
          <section className="bg-gray-50 p-6 rounded-2xl border border-gray-200 space-y-2">
            <h2 className="font-bebas text-2xl text-gray-900 tracking-wider flex items-center gap-2">
              <Lock className="w-5 h-5 text-[#3854A4]" /> 1. COMMITMENT TO PRIVACY
            </h2>
            <p>
              North Premier Volleyball League ("NPVL", "we", "our", or "us") is dedicated to protecting the personal privacy and data of our athletes, franchise owners, partners, fans, and website visitors. This Privacy Policy details how we collect, handle, safeguard, and use your personal information.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-bebas text-2xl text-gray-900 tracking-wider">
              2. INFORMATION WE COLLECT
            </h2>
            <p>We may collect information under the following categories:</p>
            <ul className="list-disc pl-5 space-y-2">
              <li><strong>Contact & Identity Details:</strong> Full Name, Email Address, Phone Number, Date of Birth, State / City, and Government ID proofs (for athlete trial verifications).</li>
              <li><strong>Athletic & Professional Information:</strong> Height, playing position, past club representation, physical statistics (for player registration).</li>
              <li><strong>Billing & Transaction Records:</strong> Transaction IDs, timestamps, payment mode, and order value collected via authorized payment gateways (Razorpay). <em>(Note: Complete card numbers, CVVs, and banking passwords are never stored on our servers)</em>.</li>
              <li><strong>Technical Data:</strong> IP address, device type, browser information, and session logs to maintain website security and user experience.</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="font-bebas text-2xl text-gray-900 tracking-wider">
              3. HOW WE USE YOUR INFORMATION
            </h2>
            <p>Your data is processed strictly for legitimate operational purposes:</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              {[
                'Athlete registration, trial scheduling & verification',
                'Issuing electronic passes, tickets, and transaction receipts',
                'Responding to franchise and commercial partnership queries',
                'Sending critical league notices, schedule updates & news',
                'Preventing unauthorized transactions & securing platform access',
                'Complying with statutory laws and sports governing bodies',
              ].map((item, idx) => (
                <div key={idx} className="flex items-center gap-2 bg-gray-50 p-3 rounded-xl border border-gray-200 text-xs text-gray-800">
                  <CheckCircle className="w-4 h-4 text-[#3854A4] shrink-0" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </section>

          <section className="space-y-3">
            <h2 className="font-bebas text-2xl text-gray-900 tracking-wider">
              4. SHARING & DATA DISCLOSURE
            </h2>
            <p>
              We do <strong>not</strong> sell, rent, or trade your personal data to any third-party marketing companies. Data is only shared with:
            </p>
            <ul className="list-disc pl-5 space-y-2">
              <li><strong>Payment Partners (Razorpay):</strong> Strictly for facilitating secure electronic checkout, fraud screening, and issuing transaction receipts.</li>
              <li><strong>Official League Management & Franchise Selection Committees:</strong> For athlete scouting, draft allotment, and player roster management.</li>
              <li><strong>Legal Authorities:</strong> When required by court order, law enforcement, or national regulatory directives.</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="font-bebas text-2xl text-gray-900 tracking-wider">
              5. DATA SECURITY & ENCRYPTION
            </h2>
            <p>
              All data transmitted across the Platform is protected using industry-standard 256-bit SSL encryption. We employ strict access controls, firewalls, and regular monitoring protocols to shield your information from unauthorized access, modification, or exposure.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-bebas text-2xl text-gray-900 tracking-wider">
              6. COOKIES & TRACKING
            </h2>
            <p>
              The Platform uses essential cookies to remember user sessions, track navigation efficiency, and deliver smooth browsing. You may choose to disable cookies in your browser settings, though certain functional modules may operate with limited capability.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-bebas text-2xl text-gray-900 tracking-wider">
              7. GRIEVANCE & DATA PROTECTION OFFICER
            </h2>
            <p>
              If you have any questions regarding your data privacy, request deletion of your information, or wish to report a security concern, please contact our Data & Grievance Desk at:
            </p>
            <div className="p-4 bg-gray-50 border border-gray-200 rounded-xl text-xs space-y-1">
              <div><strong>Grievance Officer:</strong> Official Compliance Team, NPVL</div>
              <div><strong>Managed by:</strong> The Backstory Media (Official Digital Partner)</div>
              <div><strong>Email:</strong> <a href="mailto:privacy@npvlofficial.com" className="text-[#3854A4] font-bold">privacy@npvlofficial.com</a> / <a href="mailto:hello@npvlofficial.com" className="text-[#3854A4] font-bold">hello@npvlofficial.com</a></div>
            </div>
          </section>

        </div>

      </div>
    </div>
  );
}
