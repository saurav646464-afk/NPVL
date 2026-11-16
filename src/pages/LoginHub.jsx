import React, { useState } from 'react';
import { 
  Lock, Mail, KeyRound, AlertCircle, CheckCircle2, 
  ArrowRight, Download, Search, ShieldCheck, User
} from 'lucide-react';
import { supabase } from '../lib/supabase';
import { generateIdCardPDF } from '../lib/pdfGenerator';

export default function UniversalLogin({ setCurrentPage, setAdminLoggedIn }) {
  const [identifier, setIdentifier] = useState(''); // Email, Mobile No, or Reg ID
  const [password, setPassword] = useState('');     // Required for admin or password flow
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  // Mode: 'login' | 'forgot' | 'player_dashboard'
  const [playerRecord, setPlayerRecord] = useState(() => {
    try {
      const saved = sessionStorage.getItem('npvl_player_record');
      const parsed = saved ? JSON.parse(saved) : null;
      if (parsed && (parsed.full_name === 'REGISTERED PLAYER' || parsed.full_name === 'DEMO ATHLETE')) {
        sessionStorage.removeItem('npvl_player_record');
        return null;
      }
      return parsed;
    } catch {
      return null;
    }
  });
  const [viewMode, setViewMode] = useState(() => {
    try {
      const saved = sessionStorage.getItem('npvl_player_record');
      if (!saved || saved.includes('REGISTERED PLAYER') || saved.includes('DEMO ATHLETE')) {
        sessionStorage.removeItem('npvl_player_record');
        return 'login';
      }
      return 'player_dashboard';
    } catch {
      return 'login';
    }
  });

  // Forgot password states
  const [forgotInput, setForgotInput] = useState('');
  const [resetSuccessMsg, setResetSuccessMsg] = useState('');

  // Admin credentials
  const ADMIN_EMAIL = 'hello@npvlofficial.com';
  const DEFAULT_ADMIN_PWD = 'Npvl@Official#2026';

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');
    setLoading(true);

    const cleanInput = identifier.trim().toLowerCase();

    // 1. Check if ADMIN Login
    if (cleanInput === ADMIN_EMAIL) {
      const storedPwd = localStorage.getItem('npvl_admin_pwd') || DEFAULT_ADMIN_PWD;
      if (password === storedPwd) {
        setLoading(false);
        if (setAdminLoggedIn) setAdminLoggedIn(true);
        setCurrentPage('admin');
        window.scrollTo({ top: 0, behavior: 'smooth' });
        return;
      } else {
        setLoading(false);
        setErrorMsg('Invalid administrator password. Please try again or use Forgot Password.');
        return;
      }
    }

    // 2. Otherwise: Check PLAYER / CANDIDATE in Supabase Database
    try {
      const cleanInput = identifier.trim();
      const digitsOnly = cleanInput.replace(/\D/g, '');
      const last10 = digitsOnly.length >= 10 ? digitsOnly.slice(-10) : digitsOnly;
      const cleanRegId = cleanInput.replace(/[^a-zA-Z0-9-]/g, '');

      const queryParts = [
        `email.ilike.${cleanInput}`,
      ];

      if (cleanRegId.length > 3) {
        queryParts.push(`registration_id.ilike.%${cleanRegId}%`);
      }

      if (last10.length === 10) {
        queryParts.push(`mobile_no.eq.${last10}`);
        queryParts.push(`mobile_no.eq.+91${last10}`);
        queryParts.push(`whatsapp_no.eq.${last10}`);
      } else if (cleanInput.length > 0) {
        queryParts.push(`mobile_no.eq.${cleanInput}`);
      }

      const { data, error } = await supabase
        .from('player_registrations')
        .select('*')
        .or(queryParts.join(','))
        .limit(1);

      if (error) {
        console.warn('Query note:', error.message);
      }

      if (data && data.length > 0) {
        const found = data[0];
        const savedPassword = found.medical_history?.account_password;
        const altPassword = found.medical_history?.alternate_password;

        // If candidate has a set password, verify it (case-insensitive & whitespace tolerant)
        // Also supports DOB (e.g. YYYY-MM-DD or birth year like 2005) as emergency fallback!
        if (savedPassword) {
          const inputClean = password.trim().toLowerCase();
          const savedClean = savedPassword.trim().toLowerCase();
          const altClean = (altPassword || '').trim().toLowerCase();
          
          const inputNoSpace = inputClean.replace(/\s+/g, '');
          const savedNoSpace = savedClean.replace(/\s+/g, '');
          const altNoSpace = altClean.replace(/\s+/g, '');

          const dob = (found.dob || '').trim();
          const birthYear = dob.slice(0, 4);
          const dobMatches = (
            (dob && inputNoSpace === dob.replace(/\D/g, '')) ||
            (birthYear && inputNoSpace === birthYear)
          );

          const isMatch = (
            password.trim() === savedPassword.trim() ||
            inputClean === savedClean ||
            inputNoSpace === savedNoSpace ||
            (altClean && (inputClean === altClean || inputNoSpace === altNoSpace)) ||
            dobMatches
          );

          if (!isMatch) {
            setLoading(false);
            setErrorMsg('Incorrect password. (Tip: You can use your Birth Year e.g. 2005 as password, or use the Quick Pass Download button below).');
            return;
          }
        }

        // Extract photo from medical_history JSONB
        const photoFromDB = found.medical_history?.photo_data_url || found.photo_data_url || null;
        
        // Strip duplicate heavy medical_history from player record
        const { medical_history, ...cleanRecord } = found;
        const playerWithPhoto = { ...cleanRecord, photo_data_url: photoFromDB };

        setPlayerRecord(playerWithPhoto);

        // Safely set sessionStorage without crashing on large photos (>2MB browser quota)
        try {
          sessionStorage.setItem('npvl_player_record', JSON.stringify(playerWithPhoto));
        } catch (storageErr) {
          console.warn('Quota exceeded for photo, storing record without heavy base64 string:', storageErr);
          try {
            const { photo_data_url, ...storageOnly } = playerWithPhoto;
            sessionStorage.setItem('npvl_player_record', JSON.stringify(storageOnly));
          } catch (_) {}
        }

        setViewMode('player_dashboard');
      } else {
        setErrorMsg('No player registration record found for this Mobile Number, Registration ID, or Email. Please check your details.');
      }
    } catch (err) {
      console.error('Login error:', err);
      setErrorMsg(err.message || 'Error logging in. Please check your details.');
    } finally {
      setLoading(false);
    }
  };

  // -------------------------------------------------------------
  // QUICK PASS DOWNLOAD (NO PASSWORD REQUIRED FOR PLAYERS)
  // -------------------------------------------------------------
  const handleQuickPassDownload = async (e) => {
    if (e && e.preventDefault) e.preventDefault();
    setErrorMsg('');

    if (!identifier.trim()) {
      setErrorMsg('Please enter your Mobile Number or Registration ID in the box above.');
      return;
    }

    setLoading(true);
    try {
      const cleanInput = identifier.trim();
      const digitsOnly = cleanInput.replace(/\D/g, '');
      const last10 = digitsOnly.length >= 10 ? digitsOnly.slice(-10) : digitsOnly;
      const cleanRegId = cleanInput.replace(/[^a-zA-Z0-9-]/g, '');

      const queryParts = [
        `email.ilike.${cleanInput}`,
      ];

      if (cleanRegId.length > 3) {
        queryParts.push(`registration_id.ilike.%${cleanRegId}%`);
      }

      if (last10.length === 10) {
        queryParts.push(`mobile_no.eq.${last10}`);
        queryParts.push(`mobile_no.eq.+91${last10}`);
        queryParts.push(`whatsapp_no.eq.${last10}`);
      } else if (cleanInput.length > 0) {
        queryParts.push(`mobile_no.eq.${cleanInput}`);
      }

      const { data, error } = await supabase
        .from('player_registrations')
        .select('*')
        .or(queryParts.join(','))
        .limit(1);

      if (error) throw error;

      if (data && data.length > 0) {
        const found = data[0];
        const photoFromDB = found.medical_history?.photo_data_url || found.photo_data_url || null;
        const { medical_history, ...cleanRecord } = found;
        const playerWithPhoto = { ...cleanRecord, photo_data_url: photoFromDB };

        setPlayerRecord(playerWithPhoto);
        try {
          const { photo_data_url, ...storageOnly } = playerWithPhoto;
          sessionStorage.setItem('npvl_player_record', JSON.stringify(storageOnly));
        } catch (_) {}

        setViewMode('player_dashboard');
      } else {
        setErrorMsg('No player record found for this Mobile Number or Registration ID. Please check your details.');
      }
    } catch (err) {
      console.error('Quick pass error:', err);
      setErrorMsg('Unable to retrieve pass. Please check your details or network connection.');
    } finally {
      setLoading(false);
    }
  };

  const handleForgotSubmit = (e) => {
    e.preventDefault();
    setResetSuccessMsg('');
    setErrorMsg('');

    const clean = forgotInput.trim().toLowerCase();
    if (clean === ADMIN_EMAIL) {
      const currentPwd = localStorage.getItem('npvl_admin_pwd') || DEFAULT_ADMIN_PWD;
      setResetSuccessMsg(
        `Administrator recovery instructions sent to ${ADMIN_EMAIL}. (Temporary recovery password: ${currentPwd})`
      );
    } else {
      setResetSuccessMsg(
        `If an account or registration exists for ${forgotInput.trim()}, a verification code and registration details have been sent to your registered Mobile / WhatsApp.`
      );
    }
  };

  // -------------------------------------------------------------
  // VIEW: REGISTERED PLAYER DASHBOARD (AFTER SUCCESSFUL PLAYER LOGIN)
  // -------------------------------------------------------------
  if (viewMode === 'player_dashboard' && playerRecord) {
    const isCoachRecord = (playerRecord.registration_type || '').toLowerCase() === 'coach' ||
                          (playerRecord.player_category || '').toLowerCase().includes('coach');
    const roleTitle = isCoachRecord ? 'Coach' : 'Player';

    return (
      <div className="min-h-screen bg-gray-50 text-gray-900 pt-24 pb-20 px-3 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto space-y-6">
          <div className="bg-white border-2 border-green-500 rounded-3xl p-5 sm:p-8 shadow-sm space-y-5">

            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 border-b pb-4">
              <div className="min-w-0">
                <span className="text-xs font-bold uppercase tracking-wider text-green-700 bg-green-100 px-3 py-1 rounded-full border border-green-300 inline-block">
                  LOGIN SUCCESSFUL • VERIFIED {roleTitle.toUpperCase()}
                </span>
                <h1 className="font-bebas text-2xl sm:text-4xl text-gray-900 tracking-wider mt-2 break-words leading-tight">
                  WELCOME,<br className="sm:hidden" /> {playerRecord.full_name.toUpperCase()}
                </h1>
              </div>
              <div className="sm:text-right shrink-0">
                <span className="text-[10px] text-gray-500 font-bold block uppercase">REG ID</span>
                <span className="font-mono font-bold text-sm text-[#E82024]">{playerRecord.registration_id}</span>
              </div>
            </div>

            {/* Candidate details */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 bg-gray-50 p-4 rounded-2xl border border-gray-200 text-xs">
              <div>
                <span className="text-gray-500 block">Category:</span>
                <strong className="text-gray-900 break-words">{playerRecord.player_category}</strong>
              </div>
              <div>
                <span className="text-gray-500 block">Location:</span>
                <strong className="text-gray-900 break-words">{playerRecord.city}, {playerRecord.state}</strong>
              </div>
              <div>
                <span className="text-gray-500 block">Payment:</span>
                <strong className="text-green-600">₹500 PAID ✓</strong>
              </div>
              <div>
                <span className="text-gray-500 block">DOB / Age:</span>
                <strong className="text-gray-900">{playerRecord.dob || '-'} ({playerRecord.age || '-'} Yrs)</strong>
              </div>
              {isCoachRecord ? (
                <>
                  <div>
                    <span className="text-gray-500 block">Role:</span>
                    <strong className="text-gray-900">Official Coach</strong>
                  </div>
                  <div>
                    <span className="text-gray-500 block">Status:</span>
                    <strong className="text-blue-600">Accredited</strong>
                  </div>
                </>
              ) : (
                <>
                  <div>
                    <span className="text-gray-500 block">Height:</span>
                    <strong className="text-gray-900">{playerRecord.height_cms ? `${playerRecord.height_cms} cm` : '-'}</strong>
                  </div>
                  <div>
                    <span className="text-gray-500 block">Jump Reach:</span>
                    <strong className="text-gray-900">{playerRecord.jump_reach_cms ? `${playerRecord.jump_reach_cms} cm` : '-'}</strong>
                  </div>
                </>
              )}
            </div>

            {/* Download Button */}
            <div className="flex justify-center pt-1">
              <button
                onClick={() => generateIdCardPDF(playerRecord)}
                className="w-full bg-[#E82024] hover:bg-[#C71216] text-white font-bebas text-lg sm:text-xl tracking-wider py-4 px-6 rounded-2xl shadow-lg flex items-center justify-center gap-2 transition-all cursor-pointer"
              >
                <Download className="w-5 h-5 shrink-0" />
                <span className="text-center leading-tight">DOWNLOAD OFFICIAL {roleTitle.toUpperCase()} ID CARD (PDF)</span>
              </button>
            </div>

            <div className="text-center pt-1">
              <button
                onClick={() => {
                  setPlayerRecord(null);
                  sessionStorage.removeItem('npvl_player_record');
                  setViewMode('login');
                }}
                className="text-xs font-bold text-gray-500 hover:text-gray-900 underline uppercase tracking-wider"
              >
                Sign Out
              </button>
            </div>

          </div>
        </div>
      </div>
    );
  }

  // -------------------------------------------------------------
  // VIEW: SINGLE UNIFIED LOGIN SCREEN
  // -------------------------------------------------------------
  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 pt-28 pb-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md mx-auto space-y-6">

        {/* Clean Header */}
        <div className="text-center space-y-2">
          <span className="text-xs font-bold uppercase tracking-widest text-[#3854A4] bg-[#3854A4]/10 px-3.5 py-1 rounded-full border border-[#3854A4]/30">
            SECURE ACCESS PORTAL
          </span>
          <h1 className="font-bebas text-4xl sm:text-5xl text-gray-900 tracking-wider">
            NPVL OFFICIAL LOGIN
          </h1>
          <p className="text-xs sm:text-sm text-gray-500 max-w-xs mx-auto">
            Sign in to access your registered candidate profile, Player ID Card download, or official administrative dashboard.
          </p>
        </div>

        {/* Universal Login Card */}
        <div className="bg-white border-2 border-gray-200 rounded-3xl p-6 sm:p-8 shadow-sm space-y-6">
          
          {viewMode === 'login' && (
            <form onSubmit={handleLoginSubmit} className="space-y-4">
              
              {/* Identifier Input */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1">
                  Email ID / Mobile Number / Registration ID *
                </label>
                <div className="relative">
                  <input
                    type="text"
                    required
                    value={identifier}
                    onChange={(e) => setIdentifier(e.target.value)}
                    placeholder="e.g. hello@npvlofficial.com or 9876543210"
                    className="w-full bg-gray-50 border border-gray-300 focus:border-[#3854A4] focus:ring-1 focus:ring-[#3854A4] rounded-xl pl-10 pr-4 py-3 text-sm text-gray-900 placeholder-gray-400 focus:outline-none"
                  />
                  <Mail className="w-4 h-4 text-gray-400 absolute left-3.5 top-3.5" />
                </div>
              </div>

              {/* Password Input */}
              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="block text-xs font-bold uppercase tracking-wider text-gray-700">
                    Password *
                  </label>
                  <button
                    type="button"
                    onClick={() => {
                      setViewMode('forgot');
                      setForgotInput(identifier || '');
                    }}
                    className="text-xs text-[#3854A4] hover:underline font-bold"
                  >
                    Forgot Password?
                  </button>
                </div>
                <div className="relative">
                  <input
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your password..."
                    className="w-full bg-gray-50 border border-gray-300 focus:border-[#3854A4] focus:ring-1 focus:ring-[#3854A4] rounded-xl pl-10 pr-4 py-3 text-sm text-gray-900 placeholder-gray-400 focus:outline-none"
                  />
                  <KeyRound className="w-4 h-4 text-gray-400 absolute left-3.5 top-3.5" />
                </div>
              </div>

              {/* Error Box */}
              {errorMsg && (
                <div className="p-3 bg-red-50 border border-red-200 rounded-xl text-xs text-red-700 flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0 text-red-600" />
                  <span>{errorMsg}</span>
                </div>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full red-sweep-btn bg-[#3854A4] hover:bg-[#2A4080] text-white font-bebas text-xl tracking-wider py-3.5 rounded-xl shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>{loading ? 'AUTHENTICATING...' : 'SIGN IN WITH PASSWORD'}</span>
                <ArrowRight className="w-5 h-5" />
              </button>

              {/* Divider */}
              <div className="relative flex py-2 items-center">
                <div className="flex-grow border-t border-gray-200"></div>
                <span className="flex-shrink mx-3 text-[10px] font-bold uppercase tracking-wider text-gray-400">OR ATHLETE PASS DOWNLOAD</span>
                <div className="flex-grow border-t border-gray-200"></div>
              </div>

              {/* Quick ID Pass Download without Password */}
              <button
                type="button"
                onClick={handleQuickPassDownload}
                disabled={loading}
                className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bebas text-lg tracking-wider py-3.5 rounded-xl shadow-sm transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <Download className="w-5 h-5" />
                <span>DOWNLOAD ID PASS (NO PASSWORD REQUIRED)</span>
              </button>
              <p className="text-[11px] text-gray-400 text-center leading-tight">
                Forgot password? Just enter your Mobile Number or Registration ID above and click the green button.
              </p>

            </form>
          )}

          {/* FORGOT PASSWORD FORM */}
          {viewMode === 'forgot' && (
            <form onSubmit={handleForgotSubmit} className="space-y-4">
              <div className="text-xs text-gray-600 leading-relaxed">
                Enter your registered Email ID, Mobile Number, or Registration ID to receive password recovery assistance.
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1">
                  Email / Mobile / Reg ID *
                </label>
                <div className="relative">
                  <input
                    type="text"
                    required
                    value={forgotInput}
                    onChange={(e) => setForgotInput(e.target.value)}
                    placeholder="Enter registered detail..."
                    className="w-full bg-gray-50 border border-gray-300 focus:border-[#3854A4] rounded-xl pl-10 pr-4 py-3 text-sm text-gray-900 focus:outline-none"
                  />
                  <Mail className="w-4 h-4 text-gray-400 absolute left-3.5 top-3.5" />
                </div>
              </div>

              {resetSuccessMsg && (
                <div className="p-3 bg-green-50 border border-green-200 rounded-xl text-xs text-green-800 space-y-1">
                  <p className="font-bold flex items-center gap-1.5 text-green-700">
                    <CheckCircle2 className="w-4 h-4" /> Password Assistance Sent
                  </p>
                  <p>{resetSuccessMsg}</p>
                </div>
              )}

              <button
                type="submit"
                className="w-full bg-[#3854A4] hover:bg-[#2A4080] text-white font-bebas text-lg tracking-wider py-3.5 rounded-xl shadow-md transition-all cursor-pointer"
              >
                SUBMIT RECOVERY REQUEST
              </button>

              <div className="text-center pt-2">
                <button
                  type="button"
                  onClick={() => setViewMode('login')}
                  className="text-xs text-[#3854A4] hover:underline font-bold"
                >
                  ← Back to Sign In
                </button>
              </div>
            </form>
          )}

          {/* Quick Registration prompt */}
          <div className="pt-4 border-t border-gray-100 text-center text-xs text-gray-500">
            Haven't registered for Season 1 yet?{' '}
            <button
              onClick={() => {
                setCurrentPage('register');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="text-[#E82024] font-bold hover:underline"
            >
              Register as Player
            </button>
          </div>

        </div>

      </div>
    </div>
  );
}
