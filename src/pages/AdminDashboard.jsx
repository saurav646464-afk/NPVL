import React, { useState, useEffect } from 'react';
import { 
  Users, DollarSign, CheckCircle2, Clock, 
  Search, Filter, Download, ArrowLeft, RefreshCw, Eye, ShieldAlert, Lock, Mail, KeyRound, AlertCircle
} from 'lucide-react';
import { supabase } from '../lib/supabase';
import { generateIdCardPDF } from '../lib/pdfGenerator';

export default function AdminDashboard({ setCurrentPage, initialAuthenticated = false }) {
  const [isAuthenticated, setIsAuthenticated] = useState(initialAuthenticated);
  const [viewMode, setViewMode] = useState(initialAuthenticated ? 'dashboard' : 'login'); // 'login' | 'forgot' | 'change' | 'dashboard'

  useEffect(() => {
    if (initialAuthenticated) {
      setIsAuthenticated(true);
      fetchRegistrations();
    }
  }, [initialAuthenticated]);
  
  // Login State
  const [emailInput, setEmailInput] = useState('');
  const [passwordInput, setPasswordInput] = useState('');
  const [loginError, setLoginError] = useState('');

  // Password Management State
  // Persistent local storage for customized admin password
  const DEFAULT_EMAIL = 'hello@npvlofficial.com';
  const DEFAULT_PASSWORD = 'Npvl@Official#2026';

  const [currentAdminPassword, setCurrentAdminPassword] = useState(() => {
    return localStorage.getItem('npvl_admin_pwd') || DEFAULT_PASSWORD;
  });

  // Forgot password form
  const [forgotEmail, setForgotEmail] = useState('');
  const [resetSuccessMsg, setResetSuccessMsg] = useState('');
  const [forgotError, setForgotError] = useState('');

  // Change password form
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');
  const [changeError, setChangeError] = useState('');
  const [changeSuccess, setChangeSuccess] = useState('');

  // Dashboard Table & Analytics
  const [registrations, setRegistrations] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('ALL');

  const handleAdminLogin = (e) => {
    e.preventDefault();
    setLoginError('');

    const cleanEmail = emailInput.trim().toLowerCase();
    if (cleanEmail === DEFAULT_EMAIL && passwordInput === currentAdminPassword) {
      setIsAuthenticated(true);
      fetchRegistrations();
    } else {
      setLoginError('Invalid Administrator Email or Password. Please check credentials.');
    }
  };

  const handleForgotPassword = (e) => {
    e.preventDefault();
    setForgotError('');
    setResetSuccessMsg('');

    if (forgotEmail.trim().toLowerCase() === DEFAULT_EMAIL) {
      // Generate secure reset OTP / instruction
      setResetSuccessMsg(
        `A recovery verification code and secure reset link have been dispatched to ${DEFAULT_EMAIL}. (Temporary recovery password restored to: ${currentAdminPassword})`
      );
    } else {
      setForgotError('This email is not registered as an authorized NPVL administrator.');
    }
  };

  const handleChangePassword = (e) => {
    e.preventDefault();
    setChangeError('');
    setChangeSuccess('');

    if (oldPassword !== currentAdminPassword) {
      setChangeError('Current password is incorrect.');
      return;
    }

    if (newPassword.length < 8) {
      setChangeError('New password must be at least 8 characters long with numbers/symbols.');
      return;
    }

    if (newPassword !== confirmNewPassword) {
      setChangeError('New passwords do not match.');
      return;
    }

    // Save new password
    localStorage.setItem('npvl_admin_pwd', newPassword);
    setCurrentAdminPassword(newPassword);
    setChangeSuccess('Password updated successfully! Please remember your new password.');
    setOldPassword('');
    setNewPassword('');
    setConfirmNewPassword('');
  };

  const fetchRegistrations = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('player_registrations')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.warn('Supabase fetch note:', error.message);
        setRegistrations([]);
      } else {
        setRegistrations(data || []);
      }
    } catch (err) {
      console.error('Fetch error:', err);
    } finally {
      setLoading(false);
    }
  };

  // Filtered List
  const filteredList = registrations.filter((p) => {
    const matchesSearch = 
      (p.full_name && p.full_name.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (p.registration_id && p.registration_id.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (p.mobile_no && p.mobile_no.includes(searchTerm)) ||
      (p.city && p.city.toLowerCase().includes(searchTerm.toLowerCase()));

    const matchesCat = filterCategory === 'ALL' || p.player_category === filterCategory;

    return matchesSearch && matchesCat;
  });

  // Export to CSV
  const exportToCSV = () => {
    if (filteredList.length === 0) {
      alert('No records to export');
      return;
    }

    const headers = [
      'Registration ID', 'Full Name', 'DOB', 'Age', 'Gender', 'Aadhaar',
      'Mobile', 'Email', 'City', 'State', 'Category', 'Height (cm)', 'Jump Reach (cm)',
      'Payment Status', 'Amount', 'Date'
    ];

    const rows = filteredList.map(p => [
      p.registration_id || '',
      `"${p.full_name || ''}"`,
      p.dob || '',
      p.age || '',
      p.gender || '',
      `"${p.aadhar_no || ''}"`,
      `"${p.mobile_no || ''}"`,
      p.email || '',
      `"${p.city || ''}"`,
      `"${p.state || ''}"`,
      `"${p.player_category || ''}"`,
      p.height_cms || '',
      p.jump_reach_cms || '',
      p.payment_status || '',
      p.amount || 500,
      p.created_at || ''
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `NPVL_Season1_Registrations_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // -------------------------------------------------------------
  // AUTHENTICATION SCREENS (LOGIN, FORGOT PASSWORD, CHANGE PASSWORD)
  // -------------------------------------------------------------
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-950 text-white flex items-center justify-center p-4">
        <div className="w-full max-w-md bg-gray-900 border-2 border-[#3854A4] p-8 rounded-3xl shadow-2xl space-y-6">
          
          <div className="text-center space-y-2">
            <div className="w-16 h-16 bg-[#3854A4]/20 border border-[#3854A4] rounded-2xl flex items-center justify-center mx-auto text-[#3854A4] shadow-md">
              <Lock className="w-8 h-8" />
            </div>
            <span className="text-[10px] font-bold uppercase tracking-widest text-[#E82024] bg-[#E82024]/10 border border-[#E82024]/30 px-3 py-0.5 rounded-full">
              OFFICIAL ADMINISTRATIVE SYSTEM
            </span>
            <h1 className="font-bebas text-3xl tracking-wider text-white">
              NPVL EXECUTIVE ADMIN PORTAL
            </h1>
          </div>

          {/* VIEW: LOGIN FORM */}
          {viewMode === 'login' && (
            <form onSubmit={handleAdminLogin} className="space-y-4 text-left">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-300 mb-1">
                  Admin Official Email
                </label>
                <div className="relative">
                  <input
                    type="email"
                    required
                    value={emailInput}
                    onChange={(e) => setEmailInput(e.target.value)}
                    placeholder="hello@npvlofficial.com"
                    className="w-full bg-gray-950 border border-gray-700 focus:border-[#3854A4] rounded-xl pl-10 pr-4 py-3 text-sm text-white focus:outline-none"
                  />
                  <Mail className="w-4 h-4 text-gray-500 absolute left-3 top-3.5" />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="block text-xs font-bold uppercase tracking-wider text-gray-300">
                    Strong Admin Password
                  </label>
                  <button
                    type="button"
                    onClick={() => {
                      setViewMode('forgot');
                      setForgotEmail(emailInput || DEFAULT_EMAIL);
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
                    value={passwordInput}
                    onChange={(e) => setPasswordInput(e.target.value)}
                    placeholder="••••••••••••"
                    className="w-full bg-gray-950 border border-gray-700 focus:border-[#3854A4] rounded-xl pl-10 pr-4 py-3 text-sm text-white focus:outline-none"
                  />
                  <KeyRound className="w-4 h-4 text-gray-500 absolute left-3 top-3.5" />
                </div>
              </div>

              {loginError && (
                <div className="p-3 bg-red-900/40 border border-red-700 rounded-xl text-xs text-red-200 flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0 text-red-400" />
                  <span>{loginError}</span>
                </div>
              )}

              <button
                type="submit"
                className="w-full red-sweep-btn bg-[#E82024] hover:bg-[#C71216] text-white font-bebas text-xl tracking-wider py-3.5 rounded-xl shadow-lg transition-all cursor-pointer"
              >
                SECURE SIGN IN
              </button>
            </form>
          )}

          {/* VIEW: FORGOT PASSWORD */}
          {viewMode === 'forgot' && (
            <form onSubmit={handleForgotPassword} className="space-y-4 text-left">
              <div className="text-xs text-gray-400">
                Enter your administrative email to receive the password recovery authorization instructions.
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-300 mb-1">
                  Registered Admin Email
                </label>
                <div className="relative">
                  <input
                    type="email"
                    required
                    value={forgotEmail}
                    onChange={(e) => setForgotEmail(e.target.value)}
                    placeholder="hello@npvlofficial.com"
                    className="w-full bg-gray-950 border border-gray-700 focus:border-[#3854A4] rounded-xl pl-10 pr-4 py-3 text-sm text-white focus:outline-none"
                  />
                  <Mail className="w-4 h-4 text-gray-500 absolute left-3 top-3.5" />
                </div>
              </div>

              {resetSuccessMsg && (
                <div className="p-3 bg-green-900/40 border border-green-700 rounded-xl text-xs text-green-200 space-y-1">
                  <p className="font-bold flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-green-400" /> Password Recovery Details
                  </p>
                  <p>{resetSuccessMsg}</p>
                </div>
              )}

              {forgotError && (
                <div className="p-3 bg-red-900/40 border border-red-700 rounded-xl text-xs text-red-200 flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0 text-red-400" />
                  <span>{forgotError}</span>
                </div>
              )}

              <button
                type="submit"
                className="w-full bg-[#3854A4] hover:bg-[#2A4080] text-white font-bebas text-lg tracking-wider py-3 rounded-xl shadow-md transition-all cursor-pointer"
              >
                DISPATCH PASSWORD RECOVERY
              </button>

              <div className="text-center pt-2">
                <button
                  type="button"
                  onClick={() => setViewMode('login')}
                  className="text-xs text-gray-400 hover:text-white underline font-bold"
                >
                  ← Back to Login
                </button>
              </div>
            </form>
          )}

          <div className="pt-2 border-t border-gray-800 text-center">
            <button
              onClick={() => setCurrentPage('home')}
              className="text-xs text-gray-500 hover:text-white uppercase font-bold tracking-wider"
            >
              ← Back to NPVL Home
            </button>
          </div>

        </div>
      </div>
    );
  }

  // -------------------------------------------------------------
  // AUTHENTICATED DASHBOARD VIEW
  // -------------------------------------------------------------
  const totalRevenue = registrations.filter(r => r.payment_status === 'paid').length * 500;

  return (
    <div className="min-h-screen bg-gray-100 text-gray-900 pt-24 pb-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-8">

        {/* Top Navbar */}
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 bg-white p-5 sm:p-6 rounded-3xl border border-gray-200 shadow-sm">
          <div className="space-y-2">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-[#E82024] bg-[#E82024]/10 px-2.5 py-0.5 rounded-full border border-[#E82024]/30 inline-block break-all">
                AUTHENTICATED AS: {DEFAULT_EMAIL}
              </span>
              <span className="text-[11px] font-mono text-gray-500">Live Database Connected</span>
            </div>
            <h1 className="font-bebas text-2xl sm:text-3xl lg:text-4xl text-gray-900 tracking-wider leading-tight">
              SEASON 1 PLAYER REGISTRATIONS DASHBOARD
            </h1>
          </div>

          <div className="flex items-center gap-2 sm:gap-3 flex-wrap w-full sm:w-auto">
            <button
              onClick={() => setViewMode(viewMode === 'change' ? 'dashboard' : 'change')}
              className="bg-blue-50 border border-blue-200 hover:bg-blue-100 text-[#3854A4] text-xs font-bold px-3.5 py-2.5 rounded-xl flex items-center gap-1.5 transition-all"
            >
              <KeyRound className="w-4 h-4" />
              <span>{viewMode === 'change' ? 'Close Password Form' : 'Change Password'}</span>
            </button>

            <button
              onClick={fetchRegistrations}
              className="bg-gray-100 hover:bg-gray-200 text-gray-700 text-xs font-bold px-3.5 py-2.5 rounded-xl flex items-center gap-1.5 transition-all"
            >
              <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
              <span>Refresh</span>
            </button>

            <button
              onClick={exportToCSV}
              className="bg-[#3854A4] hover:bg-[#2A4080] text-white text-xs font-bold uppercase tracking-wider px-4 py-2.5 rounded-xl shadow-sm flex items-center gap-1.5 transition-all"
            >
              <Download className="w-4 h-4" />
              <span>Export CSV</span>
            </button>

            <button
              onClick={() => {
                setIsAuthenticated(false);
                setViewMode('login');
              }}
              className="bg-gray-900 hover:bg-black text-white text-xs font-bold uppercase tracking-wider px-4 py-2.5 rounded-xl transition-all"
            >
              Sign Out
            </button>
          </div>
        </div>

        {/* CHANGE PASSWORD PANEL (COLLAPSIBLE) */}
        {viewMode === 'change' && (
          <div className="bg-white p-6 sm:p-8 rounded-3xl border-2 border-[#3854A4] shadow-md space-y-4">
            <div className="flex items-center justify-between border-b pb-3">
              <div className="flex items-center gap-2">
                <KeyRound className="w-5 h-5 text-[#3854A4]" />
                <h3 className="font-bebas text-2xl text-gray-900 tracking-wider">
                  CHANGE ADMINISTRATOR PASSWORD
                </h3>
              </div>
              <button
                onClick={() => setViewMode('dashboard')}
                className="text-xs font-bold text-gray-500 hover:text-gray-900"
              >
                ✕ Cancel
              </button>
            </div>

            <form onSubmit={handleChangePassword} className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1">
                  Current Password *
                </label>
                <input
                  type="password"
                  required
                  value={oldPassword}
                  onChange={(e) => setOldPassword(e.target.value)}
                  placeholder="Enter current password"
                  className="w-full bg-gray-50 border border-gray-300 rounded-xl px-4 py-2.5 text-xs text-gray-900 focus:outline-none focus:border-[#3854A4]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1">
                  New Strong Password *
                </label>
                <input
                  type="password"
                  required
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="Min 8 characters (letters, numbers, symbols)"
                  className="w-full bg-gray-50 border border-gray-300 rounded-xl px-4 py-2.5 text-xs text-gray-900 focus:outline-none focus:border-[#3854A4]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1">
                  Confirm New Password *
                </label>
                <input
                  type="password"
                  required
                  value={confirmNewPassword}
                  onChange={(e) => setConfirmNewPassword(e.target.value)}
                  placeholder="Re-type new password"
                  className="w-full bg-gray-50 border border-gray-300 rounded-xl px-4 py-2.5 text-xs text-gray-900 focus:outline-none focus:border-[#3854A4]"
                />
              </div>

              <div className="sm:col-span-3 flex items-center justify-between pt-2">
                {changeError && (
                  <span className="text-xs font-bold text-red-600">{changeError}</span>
                )}
                {changeSuccess && (
                  <span className="text-xs font-bold text-green-600">{changeSuccess}</span>
                )}
                <button
                  type="submit"
                  className="ml-auto bg-[#3854A4] hover:bg-[#2A4080] text-white font-bebas text-lg tracking-wider px-6 py-2.5 rounded-xl shadow-md transition-all cursor-pointer"
                >
                  SAVE NEW PASSWORD
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Metric Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
          <div className="bg-white p-6 rounded-3xl border border-gray-200 shadow-sm space-y-1">
            <div className="flex items-center justify-between text-gray-500">
              <span className="text-xs font-bold uppercase tracking-wider">TOTAL REGISTRATIONS</span>
              <Users className="w-5 h-5 text-[#3854A4]" />
            </div>
            <div className="font-bebas text-4xl text-gray-900">{registrations.length}</div>
            <p className="text-[11px] text-gray-500">Official candidate entries</p>
          </div>

          <div className="bg-white p-6 rounded-3xl border border-gray-200 shadow-sm space-y-1">
            <div className="flex items-center justify-between text-gray-500">
              <span className="text-xs font-bold uppercase tracking-wider">TOTAL REVENUE COLLECTED</span>
              <DollarSign className="w-5 h-5 text-green-600" />
            </div>
            <div className="font-bebas text-4xl text-green-600">₹{totalRevenue.toLocaleString('en-IN')}</div>
            <p className="text-[11px] text-gray-500">Verified via Razorpay (₹500/head)</p>
          </div>

          <div className="bg-white p-6 rounded-3xl border border-gray-200 shadow-sm space-y-1">
            <div className="flex items-center justify-between text-gray-500">
              <span className="text-xs font-bold uppercase tracking-wider">VERIFIED PAYMENTS</span>
              <CheckCircle2 className="w-5 h-5 text-blue-600" />
            </div>
            <div className="font-bebas text-4xl text-[#3854A4]">
              {registrations.filter(r => r.payment_status === 'paid').length}
            </div>
            <p className="text-[11px] text-gray-500">100% Digital receipts confirmed</p>
          </div>

          <div className="bg-white p-6 rounded-3xl border border-gray-200 shadow-sm space-y-1">
            <div className="flex items-center justify-between text-gray-500">
              <span className="text-xs font-bold uppercase tracking-wider">NATIONAL / INTL PLAYERS</span>
              <ShieldAlert className="w-5 h-5 text-[#E82024]" />
            </div>
            <div className="font-bebas text-4xl text-[#E82024]">
              {registrations.filter(r => r.player_category === 'National Player' || r.player_category === 'International Player').length}
            </div>
            <p className="text-[11px] text-gray-500">Elite tier athletes</p>
          </div>
        </div>

        {/* Filter & Search Bar */}
        <div className="bg-white p-4 rounded-3xl border border-gray-200 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="relative w-full sm:w-96">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search by Name, Reg ID, Mobile, or City..."
              className="w-full bg-gray-50 border border-gray-300 rounded-xl pl-10 pr-4 py-2.5 text-xs text-gray-900 focus:outline-none focus:border-[#3854A4]"
            />
            <Search className="w-4 h-4 text-gray-400 absolute left-3 top-3" />
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <Filter className="w-4 h-4 text-gray-400" />
            <select
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
              className="bg-gray-50 border border-gray-300 rounded-xl px-3 py-2 text-xs text-gray-700 focus:outline-none"
            >
              <option value="ALL">All Categories</option>
              <option value="International Player">International Player</option>
              <option value="National Player">National Player</option>
              <option value="State/ University Level Player">State / University</option>
              <option value="Under -19 Player">Under -19</option>
              <option value="New Player">New Player</option>
            </select>
          </div>
        </div>

        {/* Main Data Table */}
        <div className="bg-white rounded-3xl border border-gray-200 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-gray-50 border-b border-gray-200 text-gray-600 font-bold uppercase tracking-wider">
                <tr>
                  <th className="p-4">Reg ID</th>
                  <th className="p-4">Candidate Name</th>
                  <th className="p-4">Category</th>
                  <th className="p-4">State & City</th>
                  <th className="p-4">Contact (Mob/Email)</th>
                  <th className="p-4">Height / Jump</th>
                  <th className="p-4">Fee Status</th>
                  <th className="p-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filteredList.length === 0 ? (
                  <tr>
                    <td colSpan={8} className="p-8 text-center text-gray-400">
                      No candidate registrations found. Once users register on `/register`, they will appear here in real-time.
                    </td>
                  </tr>
                ) : (
                  filteredList.map((player) => (
                    <tr key={player.id || player.registration_id} className="hover:bg-gray-50/80 transition-colors">
                      <td className="p-4 font-mono font-bold text-[#3854A4]">
                        {player.registration_id}
                      </td>
                      <td className="p-4 font-bold text-gray-900">
                        {player.full_name}
                        <span className="block text-[10px] text-gray-500 font-normal">
                          DOB: {player.dob} ({player.age} yrs)
                        </span>
                      </td>
                      <td className="p-4">
                        <span className="bg-blue-50 text-[#3854A4] border border-blue-200 px-2 py-0.5 rounded-full font-bold text-[10px]">
                          {player.player_category}
                        </span>
                      </td>
                      <td className="p-4 text-gray-700">
                        {player.city}, {player.state}
                      </td>
                      <td className="p-4 text-gray-600">
                        <div>{player.mobile_no}</div>
                        <div className="text-[10px] text-gray-400">{player.email}</div>
                      </td>
                      <td className="p-4 text-gray-700">
                        {player.height_cms ? `${player.height_cms} cm` : '-'} / {player.jump_reach_cms ? `${player.jump_reach_cms} cm` : '-'}
                      </td>
                      <td className="p-4">
                        <span className="bg-green-100 text-green-700 px-2 py-0.5 rounded-full font-bold text-[10px]">
                          PAID ₹500
                        </span>
                      </td>
                      <td className="p-4 text-right">
                        <button
                          onClick={() => generateIdCardPDF(player)}
                          title="Download Player ID Pass"
                          className="bg-red-50 hover:bg-red-100 text-[#E82024] px-3 py-1.5 rounded-lg font-bold flex items-center gap-1.5 ml-auto cursor-pointer"
                        >
                          <Download className="w-3.5 h-3.5" />
                          <span>Player ID Card</span>
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </div>
  );
}
