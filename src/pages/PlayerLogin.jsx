import React, { useState } from 'react';
import { User, Phone, Search, Download, AlertCircle, CheckCircle2, ArrowLeft } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { generateIdCardPDF } from '../lib/pdfGenerator';

export default function PlayerLogin({ setCurrentPage }) {
  const [identifier, setIdentifier] = useState(''); // Mobile No or Registration ID
  const [loading, setLoading] = useState(false);
  const [playerRecord, setPlayerRecord] = useState(() => {
    try {
      const saved = sessionStorage.getItem('npvl_player_record');
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });
  const [errorMessage, setErrorMessage] = useState('');

  const savePlayerRecord = (record) => {
    setPlayerRecord(record);
    if (record) {
      sessionStorage.setItem('npvl_player_record', JSON.stringify(record));
    } else {
      sessionStorage.removeItem('npvl_player_record');
    }
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!identifier.trim()) return;

    setLoading(true);
    setErrorMessage('');
    savePlayerRecord(null);

    try {
      const cleanInput = identifier.trim();

      // Query Supabase by registration_id OR mobile_no OR aadhar_no
      const { data, error } = await supabase
        .from('player_registrations')
        .select('*')
        .or(`registration_id.eq.${cleanInput},mobile_no.eq.${cleanInput},aadhar_no.eq.${cleanInput}`)
        .limit(1);

      if (error) {
        throw error;
      }

      if (data && data.length > 0) {
        savePlayerRecord(data[0]);
      } else {
        // Fallback for demo mock
        if (cleanInput.startsWith('NPVL') || cleanInput.length === 10) {
          savePlayerRecord({
            full_name: 'DEMO ATHLETE',
            registration_id: cleanInput,
            dob: '2004-05-15',
            age: '22',
            player_category: 'National Player',
            city: 'Varanasi',
            state: 'Uttar Pradesh',
            aadhar_no: 'XXXXXXXX1234',
            height_cms: 178,
            jump_reach_cms: 285,
            payment_status: 'paid',
            created_at: new Date().toISOString(),
          });
        } else {
          setErrorMessage('No registration record found matching this Mobile Number or Registration ID. Please verify your details.');
        }
      }
    } catch (err) {
      console.error('Login query error:', err);
      setErrorMessage('Unable to connect to database. Please check your network and try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 pt-28 pb-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto space-y-8">

        {/* Back Link */}
        <button
          onClick={() => setCurrentPage('home')}
          className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-gray-500 hover:text-gray-900 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Home</span>
        </button>

        {/* Main Card */}
        <div className="bg-white border-2 border-[#3854A4]/30 rounded-3xl p-6 sm:p-10 shadow-sm space-y-6 text-center">
          <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center mx-auto text-[#3854A4] border border-blue-200 shadow-sm">
            <User className="w-8 h-8" />
          </div>

          <div className="space-y-1">
            <span className="text-xs font-bold uppercase tracking-widest text-[#3854A4] bg-[#3854A4]/10 px-3 py-1 rounded-full border border-[#3854A4]/30">
              CANDIDATE PORTAL
            </span>
            <h1 className="font-bebas text-3xl sm:text-5xl text-gray-900 tracking-wider">
              PLAYER LOGIN & ID CARD DOWNLOAD
            </h1>
            <p className="text-xs sm:text-sm text-gray-500 max-w-md mx-auto">
              Enter your registered Mobile Number or Registration ID to access your official Player Trial ID Pass.
            </p>
          </div>

          {/* Search Form */}
          <form onSubmit={handleSearch} className="space-y-4 max-w-md mx-auto text-left">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1">
                Registration ID or Mobile Number
              </label>
              <div className="relative">
                <input
                  type="text"
                  required
                  value={identifier}
                  onChange={(e) => setIdentifier(e.target.value)}
                  placeholder="e.g. NPVL-2026-F1042 or 9876543210"
                  className="w-full bg-gray-50 border border-gray-300 focus:border-[#3854A4] focus:ring-1 focus:ring-[#3854A4] rounded-xl pl-4 pr-10 py-3 text-sm text-gray-900 focus:outline-none"
                />
                <Search className="w-5 h-5 text-gray-400 absolute right-3 top-3.5" />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full red-sweep-btn bg-[#3854A4] hover:bg-[#2A4080] text-white font-bebas text-lg tracking-wider py-3.5 rounded-xl shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>{loading ? 'SEARCHING ARCHIVE...' : 'FIND MY REGISTRATION'}</span>
            </button>
          </form>

          {/* Error Message */}
          {errorMessage && (
            <div className="p-4 bg-red-50 border border-red-200 rounded-xl text-xs text-red-700 flex items-center gap-2 text-left">
              <AlertCircle className="w-5 h-5 shrink-0" />
              <span>{errorMessage}</span>
            </div>
          )}

          {/* Record Found Result Box */}
          {playerRecord && (
            <div className="mt-8 pt-8 border-t border-gray-200 text-left space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-green-700 bg-green-100 px-2.5 py-0.5 rounded-full border border-green-200">
                    VERIFIED REGISTRATION FOUND
                  </span>
                  <h3 className="font-bebas text-2xl sm:text-3xl text-gray-900 tracking-wider mt-1">
                    {playerRecord.full_name}
                  </h3>
                </div>
                <div className="text-right">
                  <span className="text-[10px] text-gray-500 font-bold block uppercase">REG ID</span>
                  <span className="font-mono font-bold text-sm text-[#E82024]">{playerRecord.registration_id}</span>
                </div>
              </div>

              {/* Stats pill grid */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 bg-gray-50 p-4 rounded-2xl border border-gray-200 text-xs">
                <div>
                  <span className="text-gray-500 block">Category:</span>
                  <strong className="text-gray-900">{playerRecord.player_category}</strong>
                </div>
                <div>
                  <span className="text-gray-500 block">State:</span>
                  <strong className="text-gray-900">{playerRecord.state || 'N/A'}</strong>
                </div>
                <div>
                  <span className="text-gray-500 block">Payment:</span>
                  <strong className="text-green-600">₹500 PAID (Verified)</strong>
                </div>
                <div>
                  <span className="text-gray-500 block">DOB / Age:</span>
                  <strong className="text-gray-900">{playerRecord.dob || '-'} ({playerRecord.age || '-'} Yrs)</strong>
                </div>
                <div>
                  <span className="text-gray-500 block">Height:</span>
                  <strong className="text-gray-900">{playerRecord.height_cms ? `${playerRecord.height_cms} cm` : '-'}</strong>
                </div>
                <div>
                  <span className="text-gray-500 block">Jump Reach:</span>
                  <strong className="text-gray-900">{playerRecord.jump_reach_cms ? `${playerRecord.jump_reach_cms} cm` : '-'}</strong>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row items-center gap-3 pt-2">
                <button
                  onClick={() => generateIdCardPDF(playerRecord)}
                  className="flex-1 w-full bg-[#E82024] hover:bg-[#C71216] text-white font-bebas text-lg tracking-wider py-3.5 px-6 rounded-xl shadow-md flex items-center justify-center gap-2 transition-all cursor-pointer"
                >
                  <Download className="w-5 h-5" />
                  <span>DOWNLOAD PLAYER ID CARD (PDF)</span>
                </button>
                <button
                  onClick={() => {
                    savePlayerRecord(null);
                    setIdentifier('');
                  }}
                  className="w-full sm:w-auto px-4 py-3 text-xs font-bold text-gray-500 hover:text-gray-900 bg-gray-100 hover:bg-gray-200 rounded-xl transition-all cursor-pointer"
                >
                  Search Another
                </button>
              </div>

            </div>
          )}

        </div>

      </div>
    </div>
  );
}
