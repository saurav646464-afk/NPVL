import React from 'react';
import { RefreshCcw, AlertTriangle, CheckCircle2, Clock, Mail } from 'lucide-react';

export default function RefundPolicy({ onOpenContact }) {
  return (
    <div className="min-h-screen bg-white text-gray-900 pt-28 pb-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-10">
        
        {/* Header */}
        <div className="text-center space-y-3 border-b pb-8 border-gray-200">
          <span className="text-xs font-bold uppercase tracking-widest text-[#E82024] bg-[#E82024]/10 px-3.5 py-1 rounded-full border border-[#E82024]/30">
            PAYMENT TRANSPARENCY
          </span>
          <h1 className="font-bebas text-4xl sm:text-6xl text-gray-900 tracking-wider uppercase">
            REFUND & <span className="text-[#3854A4]">CANCELLATION POLICY</span>
          </h1>
          <p className="text-xs sm:text-sm text-gray-500 font-medium">
            Standard Operating Procedure for Payments Processed via Razorpay Payment Gateway
          </p>
        </div>

        {/* Content Body */}
        <div className="space-y-8 text-sm text-gray-700 leading-relaxed font-sans">
          
          <section className="bg-red-50/60 p-6 rounded-2xl border border-[#E82024]/30 space-y-2">
            <h2 className="font-bebas text-2xl text-gray-900 tracking-wider flex items-center gap-2">
              <RefreshCcw className="w-5 h-5 text-[#E82024]" /> 1. OVERVIEW & SCOPE
            </h2>
            <p>
              This Refund & Cancellation Policy sets forth the terms governing payments made for player registrations, trials, tournament passes, digital event tickets, and associated sports services on the North Premier Volleyball League (NPVL) platform.
            </p>
          </section>

          {/* Policy Breakdown Table */}
          <section className="space-y-4">
            <h2 className="font-bebas text-2xl text-gray-900 tracking-wider">
              2. SERVICE-SPECIFIC CANCELLATION GUIDELINES
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-gray-50 border border-gray-200 rounded-2xl p-5 space-y-2">
                <span className="text-xs font-bold uppercase tracking-wider text-[#3854A4] block">CATEGORY 01</span>
                <h3 className="font-bebas text-xl text-gray-900">PLAYER REGISTRATION & TRIALS</h3>
                <p className="text-xs text-gray-600 leading-relaxed">
                  Registration and trial evaluation fees cover operational logistics, venue booking, scout evaluators, and administration. Once payment is confirmed and slot assigned, trial registration fees are <strong>Non-Refundable</strong>, except in cases where NPVL cancels or permanently calls off the trial camp.
                </p>
              </div>

              <div className="bg-gray-50 border border-gray-200 rounded-2xl p-5 space-y-2">
                <span className="text-xs font-bold uppercase tracking-wider text-[#3854A4] block">CATEGORY 02</span>
                <h3 className="font-bebas text-xl text-gray-900">MATCH TICKETS & FAN PASSES</h3>
                <p className="text-xs text-gray-600 leading-relaxed">
                  If an official NPVL match fixture is cancelled permanently without being rescheduled to a later date or venue, ticket holders will be eligible for a <strong>100% refund</strong> credited to their original payment source.
                </p>
              </div>

              <div className="bg-gray-50 border border-gray-200 rounded-2xl p-5 space-y-2">
                <span className="text-xs font-bold uppercase tracking-wider text-[#3854A4] block">CATEGORY 03</span>
                <h3 className="font-bebas text-xl text-gray-900">DUPLICATE / FAILED TRANSACTIONS</h3>
                <p className="text-xs text-gray-600 leading-relaxed">
                  In case of technical errors where an amount has been debited twice or debited without confirmation receipt generation, the extra deduction will be <strong>automatically refunded</strong> by Razorpay within 5–7 banking days.
                </p>
              </div>
            </div>
          </section>

          <section className="space-y-3">
            <h2 className="font-bebas text-2xl text-gray-900 tracking-wider">
              3. REFUND PROCESS & SETTLEMENT TIMELINES
            </h2>
            <p>
              All eligible refunds approved by NPVL management are processed programmatically through the <strong>Razorpay Payment Gateway API</strong> back to the original mode of payment:
            </p>
            <div className="space-y-2 pt-1">
              <div className="flex items-start gap-3 bg-gray-50 p-3.5 rounded-xl border border-gray-200">
                <Clock className="w-5 h-5 text-[#3854A4] shrink-0 mt-0.5" />
                <div>
                  <strong className="text-gray-900 block text-xs">Processing Window (5 to 7 Business Days)</strong>
                  <span className="text-xs text-gray-600">Once initiated from our dashboard, the bank or UPI network typically credits the funds within 5–7 working days depending on the customer's issuing bank.</span>
                </div>
              </div>
              <div className="flex items-start gap-3 bg-gray-50 p-3.5 rounded-xl border border-gray-200">
                <CheckCircle2 className="w-5 h-5 text-[#16A34A] shrink-0 mt-0.5" />
                <div>
                  <strong className="text-gray-900 block text-xs">Direct Original Source Credit</strong>
                  <span className="text-xs text-gray-600">Refunds are never sent via cash or third-party accounts. They are strictly credited to the exact card, UPI ID, or bank account used at checkout.</span>
                </div>
              </div>
            </div>
          </section>

          <section className="space-y-3">
            <h2 className="font-bebas text-2xl text-gray-900 tracking-wider">
              4. HOW TO RAISE A REFUND CLAIM
            </h2>
            <p>
              If you have experienced a duplicate debit or have an eligible refund inquiry, please write to our Finance & Payment Helpdesk within <strong>48 hours</strong> of the transaction with:
            </p>
            <ul className="list-disc pl-5 space-y-1.5 text-xs text-gray-700">
              <li>Razorpay Payment ID (e.g., <code>pay_XXXXXXXXXXXX</code>)</li>
              <li>Registered Email ID & Mobile Number used during checkout</li>
              <li>Transaction Date and Screenshot of Bank Debit confirmation</li>
            </ul>
          </section>

          {/* Helpdesk banner */}
          <div className="bg-[#121C38] text-white p-6 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-4 border border-[#3854A4]">
            <div className="space-y-1 text-center sm:text-left">
              <h3 className="font-bebas text-2xl tracking-wide text-white">PAYMENT GRIEVANCE & SUPPORT DESK</h3>
              <p className="text-xs text-gray-300">Managed in coordination with Razorpay Merchant Operations</p>
              <div className="text-xs text-blue-300 pt-1">
                Email: <span className="underline">payments@npvlofficial.com</span> | <span className="underline">hello@npvlofficial.com</span>
              </div>
            </div>
            <button
              onClick={onOpenContact}
              className="bg-[#E82024] hover:bg-[#C71216] text-white text-xs font-bold uppercase tracking-wider px-6 py-3 rounded-lg shadow-md whitespace-nowrap transition-all"
            >
              RAISE INQUIRY
            </button>
          </div>

        </div>

      </div>
    </div>
  );
}
