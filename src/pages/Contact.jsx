import React, { useState } from 'react';
import { Send, CheckCircle2 } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    organisation: '',
    interest: 'General Enquiry',
    message: '',
  });

  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(formData),
      });
      if (res.ok) {
        setSubmitted(true);
        try { confetti({ particleCount: 90, spread: 80, origin: { y: 0.6 }, colors: ['#E50914', '#FFFFFF', '#111827'] }); } catch (_) {}
      } else {
        alert('Submission failed. Please email us directly at hello@npvlofficial.com');
      }
    } catch {
      alert('Network error. Please email us directly at hello@npvlofficial.com');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="min-h-screen bg-white text-gray-900 pt-28 pb-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto space-y-16">
        <div className="text-center max-w-4xl mx-auto space-y-4">
          <span className="text-xs font-bold uppercase tracking-widest text-[#E50914] bg-[#E50914]/10 px-3 py-1 rounded-full border border-[#E50914]/30">
            CONNECT WITH NPVL
          </span>
          <h1 className="font-bebas text-3xl sm:text-6xl md:text-8xl text-gray-900 tracking-wider uppercase leading-none break-words">
            LET'S BUILD THE FUTURE <br />
            <span className="text-[#E50914]">OF VOLLEYBALL.</span>
          </h1>
          <p className="text-xs sm:text-base text-gray-700 font-medium leading-relaxed">
            Reach out to the NPVL League Office for partnership opportunities, franchise ownership enquiries, media accreditation, athlete registrations, or general questions.
          </p>
          {/* Direct email */}
          <a
            href="mailto:hello@npvlofficial.com"
            className="inline-flex items-center gap-2 text-sm font-bold text-[#E50914] hover:underline"
          >
            ✉ hello@npvlofficial.com
          </a>
        </div>

        <div className="bg-gray-50 border-2 border-[#E50914]/40 rounded-2xl p-8 md:p-12 shadow-xl">
          {!submitted ? (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-gray-800 mb-2">
                    FULL NAME *
                  </label>
                  <input
                    type="text"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Enter your full name"
                    className="w-full bg-white border border-gray-300 focus:border-[#E50914] focus:ring-1 focus:ring-[#E50914] rounded-lg px-4 py-3 text-sm text-gray-900 placeholder-gray-400 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-gray-800 mb-2">
                    EMAIL ADDRESS *
                  </label>
                  <input
                    type="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="name@company.com"
                    className="w-full bg-white border border-gray-300 focus:border-[#E50914] focus:ring-1 focus:ring-[#E50914] rounded-lg px-4 py-3 text-sm text-gray-900 placeholder-gray-400 focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-gray-800 mb-2">
                    PHONE NUMBER *
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    required
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="+91 XXXXX XXXXX"
                    className="w-full bg-white border border-gray-300 focus:border-[#E50914] focus:ring-1 focus:ring-[#E50914] rounded-lg px-4 py-3 text-sm text-gray-900 placeholder-gray-400 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-gray-800 mb-2">
                    ORGANISATION / ACADEMY
                  </label>
                  <input
                    type="text"
                    name="organisation"
                    value={formData.organisation}
                    onChange={handleChange}
                    placeholder="Company or Academy name"
                    className="w-full bg-white border border-gray-300 focus:border-[#E50914] focus:ring-1 focus:ring-[#E50914] rounded-lg px-4 py-3 text-sm text-gray-900 placeholder-gray-400 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-800 mb-2">
                  AREA OF INTEREST *
                </label>
                <select
                  name="interest"
                  value={formData.interest}
                  onChange={handleChange}
                  className="w-full bg-white border border-gray-300 focus:border-[#E50914] focus:ring-1 focus:ring-[#E50914] rounded-lg px-4 py-3 text-sm text-gray-900 focus:outline-none"
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
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-800 mb-2">
                  YOUR MESSAGE *
                </label>
                <textarea
                  name="message"
                  required
                  rows="4"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Share your proposed engagement or inquiry details..."
                  className="w-full bg-white border border-gray-300 focus:border-[#E50914] focus:ring-1 focus:ring-[#E50914] rounded-lg px-4 py-3 text-sm text-gray-900 placeholder-gray-400 focus:outline-none resize-none"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="red-sweep-btn w-full bg-[#E50914] hover:bg-[#B20710] text-white font-bold text-sm uppercase tracking-wider py-4 rounded-lg shadow-md transition-all flex items-center justify-center gap-2"
              >
                {loading ? (
                  <span className="animate-spin rounded-full h-5 w-5 border-b-2 border-white" />
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    <span>SUBMIT OFFICIAL ENQUIRY</span>
                  </>
                )}
              </button>
            </form>
          ) : (
            <div className="text-center py-12 space-y-6">
              <div className="w-20 h-20 bg-red-100 border-2 border-[#E50914] rounded-full flex items-center justify-center mx-auto text-[#E50914]">
                <CheckCircle2 className="w-12 h-12" />
              </div>
              <h2 className="font-bebas text-5xl text-gray-900 tracking-wider uppercase">
                ENQUIRY TRANSMITTED SUCCESSFULLY
              </h2>
              <p className="text-sm text-gray-700 max-w-md mx-auto leading-relaxed">
                Thank you <strong className="text-[#E50914]">{formData.name}</strong>. Your official submission regarding <strong className="text-gray-900">"{formData.interest}"</strong> has been logged with the NPVL Executive Office.
              </p>
              <button
                onClick={() => setSubmitted(false)}
                className="bg-[#E50914] hover:bg-[#B20710] text-white font-bold uppercase tracking-wider text-xs px-8 py-3 rounded-lg shadow-md"
              >
                SUBMIT ANOTHER ENQUIRY
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
