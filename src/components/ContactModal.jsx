import React, { useState } from 'react';
import { X, Send, CheckCircle2 } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function ContactModal({ isOpen, onClose, initialInterest = 'General Enquiry' }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    organisation: '',
    interest: initialInterest,
    message: '',
  });

  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#E50914', '#FFFFFF', '#111827']
        });
      } catch (err) {}
    }, 800);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleReset = () => {
    setSubmitted(false);
    setFormData({
      name: '',
      email: '',
      phone: '',
      organisation: '',
      interest: 'General Enquiry',
      message: '',
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center bg-black/60 backdrop-blur-md animate-fadeIn overflow-y-auto">
      <div className="relative w-full max-w-2xl bg-white border-2 border-[#E50914] rounded-2xl shadow-2xl my-4 mx-3 overflow-hidden">

        {/* Sticky Close Bar — always visible on mobile */}
        <div className="sticky top-0 z-10 bg-white border-b border-gray-200 px-5 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <img src="/logo.png" alt="NPVL" className="h-7 w-auto" />
            <span className="font-bebas text-lg text-gray-900 tracking-wider">NPVL ENQUIRY</span>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-gray-400 hover:text-gray-900 rounded-full hover:bg-red-50 transition-colors border border-gray-200"
          >
            <X className="w-5 h-5 text-[#E50914]" />
          </button>
        </div>

        <div className="p-5 md:p-10">
        {!submitted ? (
          <div>
            <div className="mb-6">
              <span className="text-xs font-bold uppercase tracking-widest text-[#E50914] bg-[#E50914]/10 px-3 py-1 rounded-full border border-[#E50914]/30">
                OFFICIAL NPVL ENQUIRY
              </span>
              <h2 className="font-bebas text-3xl md:text-5xl text-gray-900 tracking-wider uppercase mt-2 leading-none">
                LET'S BUILD THE FUTURE OF VOLLEYBALL.
              </h2>
              <p className="text-xs md:text-sm text-gray-600 mt-2 font-sans">
                Connect directly with the NPVL League Office for partnerships, franchise opportunities, media accreditation, or general inquiries.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-gray-800 mb-1">
                    FULL NAME *
                  </label>
                  <input
                    type="text"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Enter your full name"
                    className="w-full bg-gray-50 border border-gray-300 focus:border-[#E50914] focus:ring-1 focus:ring-[#E50914] rounded-lg px-4 py-2.5 text-sm text-gray-900 placeholder-gray-400 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-gray-800 mb-1">
                    EMAIL ADDRESS *
                  </label>
                  <input
                    type="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="name@company.com"
                    className="w-full bg-gray-50 border border-gray-300 focus:border-[#E50914] focus:ring-1 focus:ring-[#E50914] rounded-lg px-4 py-2.5 text-sm text-gray-900 placeholder-gray-400 focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-gray-800 mb-1">
                    PHONE NUMBER *
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    required
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="+91 XXXXX XXXXX"
                    className="w-full bg-gray-50 border border-gray-300 focus:border-[#E50914] focus:ring-1 focus:ring-[#E50914] rounded-lg px-4 py-2.5 text-sm text-gray-900 placeholder-gray-400 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-gray-800 mb-1">
                    ORGANISATION / ENTITY
                  </label>
                  <input
                    type="text"
                    name="organisation"
                    value={formData.organisation}
                    onChange={handleChange}
                    placeholder="Company or Academy name"
                    className="w-full bg-gray-50 border border-gray-300 focus:border-[#E50914] focus:ring-1 focus:ring-[#E50914] rounded-lg px-4 py-2.5 text-sm text-gray-900 placeholder-gray-400 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-gray-800 mb-1">
                  AREA OF INTEREST *
                </label>
                <select
                  name="interest"
                  value={formData.interest}
                  onChange={handleChange}
                  className="w-full bg-gray-50 border border-gray-300 focus:border-[#E50914] focus:ring-1 focus:ring-[#E50914] rounded-lg px-4 py-2.5 text-sm text-gray-900 focus:outline-none"
                >
                  <option value="General Enquiry">General Enquiry</option>
                  <option value="Partnership">Partnership Opportunities</option>
                  <option value="Franchise">Franchise Ownership Enquiry</option>
                  <option value="Media">Media & Broadcast</option>
                  <option value="Athlete / Player">Athlete / Player Registration</option>
                  <option value="Community">Community Outreach & Academies</option>
                </select>
              </div>

              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-gray-800 mb-1">
                  YOUR MESSAGE *
                </label>
                <textarea
                  name="message"
                  required
                  rows="3"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Tell us how you would like to engage with NPVL..."
                  className="w-full bg-gray-50 border border-gray-300 focus:border-[#E50914] focus:ring-1 focus:ring-[#E50914] rounded-lg px-4 py-2.5 text-sm text-gray-900 placeholder-gray-400 focus:outline-none resize-none"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="red-sweep-btn w-full bg-[#E50914] hover:bg-[#B20710] text-white font-bold text-sm uppercase tracking-wider py-3.5 rounded-lg shadow-md transition-all flex items-center justify-center gap-2 mt-4"
              >
                {loading ? (
                  <span className="animate-spin rounded-full h-5 w-5 border-b-2 border-white" />
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    <span>SUBMIT ENQUIRY</span>
                  </>
                )}
              </button>
            </form>
          </div>
        ) : (
          <div className="text-center py-8 animate-fadeIn space-y-4">
            <div className="w-16 h-16 bg-red-100 border-2 border-[#E50914] rounded-full flex items-center justify-center mx-auto text-[#E50914]">
              <CheckCircle2 className="w-10 h-10" />
            </div>

            <h3 className="font-bebas text-4xl text-gray-900 tracking-wider uppercase">
              ENQUIRY SUBMITTED SUCCESSFULLY!
            </h3>

            <p className="text-sm text-gray-700 max-w-md mx-auto">
              Thank you <span className="text-[#E50914] font-bold">{formData.name}</span>. Your details regarding <span className="text-gray-900 font-bold">"{formData.interest}"</span> have been recorded. The NPVL Team will contact you shortly.
            </p>

            <button
              onClick={handleReset}
              className="mt-6 bg-[#E50914] hover:bg-[#B20710] text-white font-bold uppercase tracking-wider text-xs px-8 py-3 rounded-lg shadow-md"
            >
              CLOSE WINDOW
            </button>
          </div>
        )}
        </div>
        {/* end p-5 content wrapper */}
      </div>
    </div>
  );
}
