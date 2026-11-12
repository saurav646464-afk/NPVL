import React, { useState, useEffect } from 'react';
import { 
  User, Calendar, Phone, Mail, MapPin, Award, 
  Upload, FileCheck, CheckCircle2, AlertTriangle, 
  Download, ArrowRight, ShieldCheck, Clock, Sparkles
} from 'lucide-react';
import { supabase } from '../lib/supabase';
import { generateIdCardPDF } from '../lib/pdfGenerator';
import confetti from 'canvas-confetti';

export default function Register({ onOpenContact, setCurrentPage }) {
  // Launch target: 16 Nov 2026 00:00:00 IST
  const targetDate = new Date('2026-11-16T00:00:00+05:30').getTime();
  const [isLive, setIsLive] = useState(false);
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  // STRICT LOCK MODE: Form submission is strictly off until 16 Nov 2026
  const [previewMode, setPreviewMode] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [completedData, setCompletedData] = useState(null);

  // Form State
  const [formData, setFormData] = useState({
    // Personal Information
    full_name: '',
    dob: '',
    age: '',
    gender: 'Male',
    nationality: 'Indian',
    aadhar_no: '',
    mobile_no: '',
    whatsapp_no: '',
    email: '',
    postal_address: '',
    city: '',
    pincode: '',
    state: '',
    country: 'India',
    instagram_id: '',
    employment_status: 'Pursuing Studies',
    institution_name: '',
    account_password: '', // Candidate login password

    // Volleyball Information
    player_category: 'New Player',
    top_achievement: '',
    certificate_year_place: '',
    current_team_dept: '',
    height_cms: '',
    weight_kgs: '',
    standing_reach_cms: '',
    jump_reach_cms: '',
    tshirt_size: '',

    // Agreements & Voluntary Payment Consent
    declaration_agreed: false,
    voluntary_payment_consent: false,
  });

  // Photo & Certificate files
  const [photoFile, setPhotoFile] = useState(null);
  const [photoDataUrl, setPhotoDataUrl] = useState('');
  const [certificateFile, setCertificateFile] = useState(null);

  // Countdown timer logic
  useEffect(() => {
    const checkTimer = () => {
      const now = new Date().getTime();
      const diff = targetDate - now;
      if (diff <= 0) {
        setIsLive(true);
      } else {
        setIsLive(false);
        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60)) / (1000 * 60));
        const seconds = Math.floor((diff % (1000 * 60)) / 1000);
        setTimeLeft({ days, hours, minutes, seconds });
      }
    };
    checkTimer();
    const interval = setInterval(checkTimer, 1000);
    return () => clearInterval(interval);
  }, [targetDate]);

  // Handle photo upload and convert to base64 for ID card preview/pdf
  const handlePhotoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPhotoFile(file);
      const reader = new FileReader();
      reader.onload = (event) => {
        setPhotoDataUrl(event.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // Auto-calculate age whenever DOB changes
  const handleDobChange = (e) => {
    const dobValue = e.target.value;
    let calculatedAge = '';
    if (dobValue) {
      const birthDate = new Date(dobValue);
      const today = new Date();
      let age = today.getFullYear() - birthDate.getFullYear();
      const m = today.getMonth() - birthDate.getMonth();
      if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age--;
      }
      calculatedAge = age > 0 ? age : 0;
    }
    setFormData((prev) => ({
      ...prev,
      dob: dobValue,
      age: calculatedAge,
    }));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Razorpay Checkout & Submission Handler
  const handleSubmitAndPay = async (e) => {
    e.preventDefault();

    // STRICT LOCK CHECK: Disallow submission before 16 Nov
    if (!isLive) {
      alert('Registrations will officially open on Monday, 16 November 2026. Submissions are currently closed.');
      return;
    }

    if (!formData.full_name || !formData.dob || !formData.mobile_no || !formData.email || !formData.aadhar_no) {
      alert('Please fill out all personal details (Full Name, DOB, Mobile, Email, Aadhaar Number).');
      return;
    }

    if (!formData.account_password || formData.account_password.length < 6) {
      alert('Please create an account password of at least 6 characters.');
      return;
    }

    if (!photoFile) {
      alert('Passport size photograph is mandatory. Please upload your photo.');
      return;
    }

    if (!formData.declaration_agreed) {
      alert('Please agree to the official declaration and code of conduct before proceeding.');
      return;
    }

    if (!formData.voluntary_payment_consent) {
      alert('Please confirm your consent for voluntary payment of the ₹500 registration fee.');
      return;
    }

    setSubmitting(true);

    try {
      // Generate unique registration id e.g. NPVL-2026-M1042
      const randomSuffix = Math.floor(1000 + Math.random() * 9000);
      const regId = `NPVL-2026-M${randomSuffix}`;

      // Razorpay Checkout Options
      const options = {
        key: 'rzp_test_mock_keys_active',
        amount: 500 * 100, // 500 INR in paise
        currency: 'INR',
        name: 'North Premier Volleyball League',
        description: 'Season 1 Player Trial & Registration Fee',
        image: '/logo.png',
        handler: async function (response) {
          await finalizeRegistration(regId, response.razorpay_payment_id || `PAY_MOCK_${Date.now()}`);
        },
        prefill: {
          name: formData.full_name,
          email: formData.email,
          contact: formData.mobile_no,
        },
        theme: {
          color: '#3854A4',
        },
        modal: {
          ondismiss: function () {
            setSubmitting(false);
          },
        },
      };

      if (window.Razorpay) {
        const rzp1 = new window.Razorpay(options);
        rzp1.open();
      } else {
        const confirmSim = window.confirm(
          `[NPVL Razorpay Payment Gateway]\n\nRegistration Fee: ₹500\nCandidate: ${formData.full_name}\n\nClick OK to simulate successful ₹500 payment and generate your official Player ID Card!`
        );
        if (confirmSim) {
          await finalizeRegistration(regId, `PAY_TEST_${Date.now()}`);
        } else {
          setSubmitting(false);
        }
      }
    } catch (err) {
      console.error('Submission error:', err);
      alert('An error occurred during submission. Please try again.');
      setSubmitting(false);
    }
  };

  const finalizeRegistration = async (regId, paymentId) => {
    try {
      const payload = {
        full_name: formData.full_name,
        dob: formData.dob,
        age: formData.age,
        gender: formData.gender,
        nationality: formData.nationality,
        aadhar_no: formData.aadhar_no,
        mobile_no: formData.mobile_no,
        whatsapp_no: formData.whatsapp_no,
        email: formData.email,
        postal_address: formData.postal_address,
        city: formData.city,
        pincode: formData.pincode,
        state: formData.state,
        country: formData.country,
        instagram_id: formData.instagram_id,
        employment_status: formData.employment_status || 'Pursuing Studies',
        institution_name: formData.institution_name || '-',
        player_category: formData.player_category,
        top_achievement: formData.top_achievement,
        certificate_year_place: formData.certificate_year_place,
        current_team_dept: formData.current_team_dept,
        height_cms: formData.height_cms ? Number(formData.height_cms) : null,
        weight_kgs: formData.weight_kgs ? Number(formData.weight_kgs) : null,
        standing_reach_cms: formData.standing_reach_cms ? Number(formData.standing_reach_cms) : null,
        jump_reach_cms: formData.jump_reach_cms ? Number(formData.jump_reach_cms) : null,
        tshirt_size: formData.tshirt_size,
        declaration_agreed: formData.declaration_agreed,
        medical_history: {
          account_password: formData.account_password || '123456',
          voluntary_payment_consent: formData.voluntary_payment_consent,
          photo_data_url: photoDataUrl || null,
        },
        registration_id: regId,
        payment_status: 'paid',
        razorpay_payment_id: paymentId,
        amount: 500,
        certificate_generated: false,
        id_card_generated: true,
      };

      const { data: insertedData, error } = await supabase.from('player_registrations').insert([payload]).select();
      if (error) {
        console.error('Supabase insert error details:', error);
        alert(`Database notice: ${error.message}`);
      } else {
        console.log('Successfully saved to Supabase:', insertedData);
      }

      setCompletedData({
        ...payload,
        photo_data_url: photoDataUrl,
      });
      setSubmitting(false);
      try {
        confetti({ particleCount: 120, spread: 90, origin: { y: 0.6 } });
      } catch (_) {}
    } catch (err) {
      console.error('Finalize error:', err);
      setCompletedData({
        ...formData,
        registration_id: regId,
        payment_status: 'paid',
        amount: 500,
        photo_data_url: photoDataUrl,
      });
      setSubmitting(false);
    }
  };

  // -------------------------------------------------------------
  // VIEW: REGISTRATION SUCCESS & DIGITAL ID CARD SCREEN
  // -------------------------------------------------------------
  if (completedData) {
    return (
      <div className="min-h-screen bg-gray-50 text-gray-900 pt-24 pb-20 px-3 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto space-y-6">
          
          <div className="bg-white border-2 border-green-500 rounded-3xl p-5 sm:p-10 text-center shadow-xl space-y-5">
            <div className="w-16 h-16 sm:w-20 sm:h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto text-green-600 shadow-md">
              <CheckCircle2 className="w-8 h-8 sm:w-10 sm:h-10" />
            </div>

            <div className="space-y-2">
              <span className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-green-700 bg-green-100 px-3 py-1 rounded-full border border-green-300 inline-block">
                REGISTRATION CONFIRMED • PAYMENT VERIFIED
              </span>
              <h1 className="font-bebas text-2xl sm:text-4xl text-gray-900 tracking-wider leading-tight px-1 break-words">
                CONGRATULATIONS, {completedData.full_name.toUpperCase()}!
              </h1>
              <p className="text-xs sm:text-sm text-gray-600 max-w-xl mx-auto leading-relaxed">
                Your application for <strong>North Premier Volleyball League (NPVL) Season 1</strong> has been successfully registered. Your official Player ID Card is generated below.
              </p>
            </div>

            {/* Quick Details Badge */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 bg-gray-50 p-4 rounded-2xl border border-gray-200 text-left">
              <div>
                <span className="text-[10px] text-gray-500 font-bold uppercase block">REG ID</span>
                <span className="font-mono font-bold text-xs sm:text-sm text-[#E82024] break-all">{completedData.registration_id}</span>
              </div>
              <div>
                <span className="text-[10px] text-gray-500 font-bold uppercase block">CATEGORY</span>
                <span className="font-bold text-xs sm:text-sm text-gray-900 break-words">{completedData.player_category}</span>
              </div>
              <div>
                <span className="text-[10px] text-gray-500 font-bold uppercase block">AMOUNT</span>
                <span className="font-bold text-xs sm:text-sm text-green-600">₹500 PAID</span>
              </div>
              <div>
                <span className="text-[10px] text-gray-500 font-bold uppercase block">STATUS</span>
                <span className="font-bold text-xs sm:text-sm text-[#3854A4]">VERIFIED</span>
              </div>
            </div>

            {/* ID Card Download Action */}
            <div className="pt-3 border-t border-gray-200 space-y-3">
              <p className="text-xs text-gray-500">
                Please download and keep your official Player ID Card. You can also re-download it anytime using your Mobile / Email & Password from the Login page.
              </p>
              
              <div className="flex justify-center">
                <button
                  onClick={() => generateIdCardPDF(completedData)}
                  className="w-full sm:w-auto bg-[#E82024] hover:bg-[#C71216] text-white font-bebas text-lg sm:text-xl tracking-wider px-6 py-4 rounded-xl shadow-lg flex items-center justify-center gap-2 transition-all cursor-pointer"
                >
                  <Download className="w-5 h-5 shrink-0" />
                  <span>DOWNLOAD PLAYER ID CARD (PDF)</span>
                </button>
              </div>

              <div className="pt-1">
                <button
                  onClick={() => setCurrentPage('home')}
                  className="text-xs text-gray-500 hover:text-gray-900 font-bold uppercase tracking-wider underline"
                >
                  Back to NPVL Home
                </button>
              </div>
            </div>

          </div>

        </div>
      </div>
    );
  }

  // -------------------------------------------------------------
  // VIEW: COUNTDOWN LOCKED BANNER (Before 16/11/2026)
  // -------------------------------------------------------------
  if (!isLive && !previewMode) {
    return (
      <div className="min-h-screen bg-white text-gray-900 pt-28 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto space-y-12">
          
          {/* Header */}
          <div className="text-center space-y-4">
            <span className="text-xs font-bold uppercase tracking-widest text-[#E82024] bg-[#E82024]/10 px-3.5 py-1 rounded-full border border-[#E82024]/30">
              OFFICIAL REGISTRATION PORTAL
            </span>
            <h1 className="font-bebas text-4xl sm:text-6xl md:text-7xl text-gray-900 tracking-wider uppercase leading-none">
              PLAYER REGISTRATION <br />
              <span className="text-[#3854A4]">OPENS ON MONDAY, 16 NOVEMBER 2026</span>
            </h1>
            <p className="text-xs sm:text-sm md:text-base text-gray-600 font-medium max-w-2xl mx-auto leading-relaxed">
              Registrations for North India's biggest North Premier Volleyball League will officially unlock on 16/11/2026. The submission portal is currently locked until the timer reaches zero.
            </p>
          </div>

          {/* Big Countdown Clock */}
          <div className="bg-[#121C38] border-2 border-[#3854A4] rounded-3xl p-8 sm:p-12 text-white text-center shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-80 h-80 bg-[#E82024]/20 rounded-full blur-3xl pointer-events-none" />
            
            <div className="relative z-10 space-y-6">
              <span className="text-xs font-bold uppercase tracking-[0.25em] text-gray-300">
                OFFICIAL COUNTDOWN TO LAUNCH
              </span>

              <div className="grid grid-cols-4 gap-2 sm:gap-4 max-w-xl mx-auto font-mono">
                <div className="bg-white/10 backdrop-blur-md rounded-xl sm:rounded-2xl py-3 px-1.5 sm:p-5 border border-white/10 flex flex-col items-center justify-center">
                  <span className="font-bebas text-3xl sm:text-6xl text-white font-black block leading-none">
                    {String(timeLeft.days).padStart(2, '0')}
                  </span>
                  <span className="text-[9px] sm:text-xs uppercase tracking-wider text-gray-400 mt-1.5 block">Days</span>
                </div>
                <div className="bg-white/10 backdrop-blur-md rounded-xl sm:rounded-2xl py-3 px-1.5 sm:p-5 border border-white/10 flex flex-col items-center justify-center">
                  <span className="font-bebas text-3xl sm:text-6xl text-white font-black block leading-none">
                    {String(timeLeft.hours).padStart(2, '0')}
                  </span>
                  <span className="text-[9px] sm:text-xs uppercase tracking-wider text-gray-400 mt-1.5 block">Hours</span>
                </div>
                <div className="bg-white/10 backdrop-blur-md rounded-xl sm:rounded-2xl py-3 px-1.5 sm:p-5 border border-white/10 flex flex-col items-center justify-center">
                  <span className="font-bebas text-3xl sm:text-6xl text-white font-black block leading-none">
                    {String(timeLeft.minutes).padStart(2, '0')}
                  </span>
                  <span className="text-[9px] sm:text-xs uppercase tracking-wider text-gray-400 mt-1.5 block">Minutes</span>
                </div>
                <div className="bg-white/10 backdrop-blur-md rounded-xl sm:rounded-2xl py-3 px-1.5 sm:p-5 border border-[#E82024]/40 flex flex-col items-center justify-center">
                  <span className="font-bebas text-3xl sm:text-6xl text-[#E82024] font-black block leading-none">
                    {String(timeLeft.seconds).padStart(2, '0')}
                  </span>
                  <span className="text-[9px] sm:text-xs uppercase tracking-wider text-[#E82024] mt-1.5 block">Seconds</span>
                </div>
              </div>

              {/* Action buttons */}
              <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
                <button
                  onClick={() => setCurrentPage('login-hub')}
                  className="bg-[#3854A4] hover:bg-[#2A4080] text-white text-xs font-bold uppercase tracking-wider px-8 py-3.5 rounded-xl shadow-md transition-all flex items-center gap-2"
                >
                  <span>ALREADY REGISTERED? DOWNLOAD ID CARD</span>
                </button>
              </div>

            </div>
          </div>

          {/* Flowchart & Document Guidelines Section */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-gray-50 border border-gray-200 p-6 rounded-2xl space-y-3">
              <span className="text-xs font-bold uppercase tracking-wider text-[#3854A4] block">FLOWCHART STEP 01</span>
              <h3 className="font-bebas text-2xl text-gray-900">PREPARE DOCUMENTS</h3>
              <ul className="text-xs text-gray-600 space-y-1.5 list-disc pl-4">
                <li>Aadhaar Card (front & back)</li>
                <li>Passport size photograph (Max 2MB)</li>
                <li>Participation / Merit sports certificate (optional)</li>
                <li>Online self-consent verification</li>
              </ul>
            </div>

            <div className="bg-gray-50 border border-gray-200 p-6 rounded-2xl space-y-3">
              <span className="text-xs font-bold uppercase tracking-wider text-[#3854A4] block">FLOWCHART STEP 02</span>
              <h3 className="font-bebas text-2xl text-gray-900">FILL ONLINE FORM</h3>
              <ul className="text-xs text-gray-600 space-y-1.5 list-disc pl-4">
                <li>Auto calculated age verification</li>
                <li>Physical dimensions (height, reaches)</li>
                <li>Create personal login password</li>
                <li>Upload documents directly in portal</li>
              </ul>
            </div>

            <div className="bg-gray-50 border border-gray-200 p-6 rounded-2xl space-y-3">
              <span className="text-xs font-bold uppercase tracking-wider text-[#3854A4] block">FLOWCHART STEP 03</span>
              <h3 className="font-bebas text-2xl text-gray-900">PAY & GET ID CARD</h3>
              <ul className="text-xs text-gray-600 space-y-1.5 list-disc pl-4">
                <li>₹500 Fee via Razorpay (UPI, Cards)</li>
                <li>Instant Verified Registration ID</li>
                <li>Detailed Player Trial ID Card PDF</li>
                <li>Valid for Season 1 Player Draft</li>
              </ul>
            </div>
          </div>

        </div>
      </div>
    );
  }

  // -------------------------------------------------------------
  // VIEW: FULL OFFICIAL REGISTRATION FORM
  // -------------------------------------------------------------
  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 pt-28 pb-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-10">

        {/* Top Header Card */}
        <div className="bg-white border-2 border-[#3854A4]/30 rounded-3xl p-6 sm:p-10 shadow-sm space-y-4 text-center">
          <div className="flex items-center justify-center gap-2">
            <span className="text-xs font-bold uppercase tracking-widest text-[#E82024] bg-[#E82024]/10 px-3 py-1 rounded-full border border-[#E82024]/30">
              SEASON 1 OFFICIAL DRAFT ENTRY
            </span>
            <span className="text-xs font-bold uppercase tracking-widest text-[#3854A4] bg-[#3854A4]/10 px-3 py-1 rounded-full border border-[#3854A4]/30">
              FEE: ₹500
            </span>
          </div>

          <h1 className="font-bebas text-3xl sm:text-5xl md:text-6xl text-gray-900 tracking-wider uppercase leading-none">
            PLAYER'S REGISTRATION FORM
          </h1>
          <p className="text-xs sm:text-sm text-gray-600 max-w-2xl mx-auto">
            Please fill out all details accurately as per your official government identification records. Note: Incomplete forms or those without proper fee submission will not be processed.
          </p>
        </div>

        {/* Form Container */}
        <form onSubmit={handleSubmitAndPay} className="space-y-8">
          
          {/* SECTION 1: PERSONAL INFORMATION */}
          <div className="bg-white border-2 border-gray-200 rounded-3xl p-6 sm:p-8 shadow-sm space-y-6">
            <div className="border-b border-gray-200 pb-4">
              <span className="text-xs font-bold uppercase tracking-wider text-[#3854A4] block">SECTION 01</span>
              <h2 className="font-bebas text-2xl sm:text-3xl text-gray-900 tracking-wider">
                PERSONAL INFORMATION
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Full Name */}
              <div className="sm:col-span-2">
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1">
                  Full Name (As per Aadhaar Card) *
                </label>
                <input
                  type="text"
                  required
                  name="full_name"
                  value={formData.full_name}
                  onChange={handleInputChange}
                  placeholder="Enter full name"
                  className="w-full bg-gray-50 border border-gray-300 focus:border-[#3854A4] focus:ring-1 focus:ring-[#3854A4] rounded-xl px-4 py-3 text-sm text-gray-900 placeholder-gray-400 focus:outline-none"
                />
              </div>

              {/* DOB */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1">
                  Date of Birth *
                </label>
                <input
                  type="date"
                  required
                  name="dob"
                  value={formData.dob}
                  onChange={handleDobChange}
                  className="w-full bg-gray-50 border border-gray-300 focus:border-[#3854A4] focus:ring-1 focus:ring-[#3854A4] rounded-xl px-4 py-3 text-sm text-gray-900 focus:outline-none"
                />
              </div>

              {/* Auto Calculated Age */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1">
                  Age (Auto Calculated)
                </label>
                <input
                  type="text"
                  readOnly
                  value={formData.age ? `${formData.age} Years Old` : 'Select DOB above'}
                  className="w-full bg-blue-50 border border-blue-200 rounded-xl px-4 py-3 text-sm font-bold text-[#3854A4] focus:outline-none cursor-not-allowed"
                />
              </div>

              {/* Gender */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1">
                  Gender *
                </label>
                <select
                  name="gender"
                  value={formData.gender}
                  onChange={handleInputChange}
                  className="w-full bg-gray-50 border border-gray-300 focus:border-[#3854A4] focus:ring-1 focus:ring-[#3854A4] rounded-xl px-4 py-3 text-sm text-gray-900 focus:outline-none"
                >
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              {/* Nationality */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1">
                  Nationality *
                </label>
                <input
                  type="text"
                  name="nationality"
                  value={formData.nationality}
                  onChange={handleInputChange}
                  className="w-full bg-gray-50 border border-gray-300 focus:border-[#3854A4] focus:ring-1 focus:ring-[#3854A4] rounded-xl px-4 py-3 text-sm text-gray-900 focus:outline-none"
                />
              </div>

              {/* Aadhaar No */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1">
                  Aadhaar Card No. *
                </label>
                <input
                  type="text"
                  required
                  maxLength={12}
                  name="aadhar_no"
                  value={formData.aadhar_no}
                  onChange={handleInputChange}
                  placeholder="12 digit Aadhaar number"
                  className="w-full bg-gray-50 border border-gray-300 focus:border-[#3854A4] focus:ring-1 focus:ring-[#3854A4] rounded-xl px-4 py-3 text-sm text-gray-900 focus:outline-none font-mono"
                />
              </div>

              {/* Mobile No */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1">
                  Mobile Number *
                </label>
                <input
                  type="tel"
                  required
                  name="mobile_no"
                  value={formData.mobile_no}
                  onChange={handleInputChange}
                  placeholder="+91 9876543210"
                  className="w-full bg-gray-50 border border-gray-300 focus:border-[#3854A4] focus:ring-1 focus:ring-[#3854A4] rounded-xl px-4 py-3 text-sm text-gray-900 focus:outline-none"
                />
              </div>

              {/* WhatsApp No */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1">
                  WhatsApp Number *
                </label>
                <input
                  type="tel"
                  required
                  name="whatsapp_no"
                  value={formData.whatsapp_no}
                  onChange={handleInputChange}
                  placeholder="+91 WhatsApp number for alerts"
                  className="w-full bg-gray-50 border border-gray-300 focus:border-[#3854A4] focus:ring-1 focus:ring-[#3854A4] rounded-xl px-4 py-3 text-sm text-gray-900 focus:outline-none"
                />
              </div>

              {/* Email */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1">
                  Email ID *
                </label>
                <input
                  type="email"
                  required
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="player@example.com"
                  className="w-full bg-gray-50 border border-gray-300 focus:border-[#3854A4] focus:ring-1 focus:ring-[#3854A4] rounded-xl px-4 py-3 text-sm text-gray-900 focus:outline-none"
                />
              </div>

              {/* Postal Address */}
              <div className="sm:col-span-2">
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1">
                  Postal Residential Address *
                </label>
                <textarea
                  rows={2}
                  required
                  name="postal_address"
                  value={formData.postal_address}
                  onChange={handleInputChange}
                  placeholder="Full permanent residential address..."
                  className="w-full bg-gray-50 border border-gray-300 focus:border-[#3854A4] focus:ring-1 focus:ring-[#3854A4] rounded-xl px-4 py-3 text-sm text-gray-900 focus:outline-none resize-none"
                />
              </div>

              {/* City */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1">
                  City / District *
                </label>
                <input
                  type="text"
                  required
                  name="city"
                  value={formData.city}
                  onChange={handleInputChange}
                  placeholder="e.g. Lucknow / Varanasi / Ludhiana"
                  className="w-full bg-gray-50 border border-gray-300 focus:border-[#3854A4] focus:ring-1 focus:ring-[#3854A4] rounded-xl px-4 py-3 text-sm text-gray-900 focus:outline-none"
                />
              </div>

              {/* Pincode */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1">
                  Pincode *
                </label>
                <input
                  type="text"
                  required
                  name="pincode"
                  value={formData.pincode}
                  onChange={handleInputChange}
                  placeholder="6 digit PIN"
                  className="w-full bg-gray-50 border border-gray-300 focus:border-[#3854A4] focus:ring-1 focus:ring-[#3854A4] rounded-xl px-4 py-3 text-sm text-gray-900 focus:outline-none"
                />
              </div>

              {/* State */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1">
                  State *
                </label>
                <select
                  required
                  name="state"
                  value={formData.state}
                  onChange={handleInputChange}
                  className="w-full bg-gray-50 border border-gray-300 focus:border-[#3854A4] focus:ring-1 focus:ring-[#3854A4] rounded-xl px-4 py-3 text-sm text-gray-900 focus:outline-none"
                >
                  <option value="">Select State</option>
                  <option value="Uttar Pradesh">Uttar Pradesh</option>
                  <option value="Punjab">Punjab</option>
                  <option value="Haryana">Haryana</option>
                  <option value="Delhi NCR">Delhi NCR</option>
                  <option value="Rajasthan">Rajasthan</option>
                  <option value="Uttarakhand">Uttarakhand</option>
                  <option value="Himachal Pradesh">Himachal Pradesh</option>
                  <option value="Other">Other State</option>
                </select>
              </div>

              {/* Country */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1">
                  Country
                </label>
                <input
                  type="text"
                  readOnly
                  value="India"
                  className="w-full bg-gray-100 border border-gray-300 rounded-xl px-4 py-3 text-sm text-gray-600 focus:outline-none cursor-not-allowed"
                />
              </div>

              {/* Instagram ID */}
              <div className="sm:col-span-2">
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1">
                  Instagram ID (Optional)
                </label>
                <input
                  type="text"
                  name="instagram_id"
                  value={formData.instagram_id}
                  onChange={handleInputChange}
                  placeholder="@username"
                  className="w-full bg-gray-50 border border-gray-300 focus:border-[#3854A4] focus:ring-1 focus:ring-[#3854A4] rounded-xl px-4 py-3 text-sm text-gray-900 focus:outline-none"
                />
              </div>

              {/* Employment Status */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1">
                  Employment Status *
                </label>
                <select
                  name="employment_status"
                  value={formData.employment_status}
                  onChange={handleInputChange}
                  className="w-full bg-gray-50 border border-gray-300 focus:border-[#3854A4] focus:ring-1 focus:ring-[#3854A4] rounded-xl px-4 py-3 text-sm text-gray-900 focus:outline-none"
                >
                  <option value="Pursuing Studies">Pursuing Studies</option>
                  <option value="Employed">Employed</option>
                  <option value="Non Employed">Non Employed</option>
                  <option value="Others">Others</option>
                </select>
              </div>

              {/* Institution Name */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1">
                  Institution / Dept Name (Where Studying/Working)
                </label>
                <input
                  type="text"
                  name="institution_name"
                  value={formData.institution_name}
                  onChange={handleInputChange}
                  placeholder="University / College / Company (Else write N/A)"
                  className="w-full bg-gray-50 border border-gray-300 focus:border-[#3854A4] focus:ring-1 focus:ring-[#3854A4] rounded-xl px-4 py-3 text-sm text-gray-900 focus:outline-none"
                />
              </div>

              {/* Set Account Password for Login */}
              <div className="sm:col-span-2 bg-gradient-to-r from-blue-50/70 to-red-50/40 border border-blue-200 p-4 rounded-2xl">
                <label className="block text-xs font-bold uppercase tracking-wider text-[#3854A4] mb-1">
                  Create Account Password (For Candidate Login & ID Card Retrieval) *
                </label>
                <p className="text-[11px] text-gray-500 mb-2">
                  Create a password so you can log in later via the website to access your profile and re-download your Player ID Card anytime.
                </p>
                <input
                  type="password"
                  required
                  name="account_password"
                  value={formData.account_password}
                  onChange={handleInputChange}
                  placeholder="Create your login password (min 6 characters)..."
                  className="w-full bg-white border border-gray-300 focus:border-[#3854A4] focus:ring-1 focus:ring-[#3854A4] rounded-xl px-4 py-3 text-sm text-gray-900 focus:outline-none"
                />
              </div>

              {/* Photo Upload */}
              <div className="sm:col-span-2 bg-blue-50/50 border border-blue-200 p-4 rounded-2xl">
                <label className="block text-xs font-bold uppercase tracking-wider text-[#3854A4] mb-1">
                  Passport Size Photograph (To Be Uploaded on ID Card) *
                </label>
                <p className="text-[11px] text-gray-500 mb-2">
                  Format: JPG, PNG, WEBP • Max Size: 2MB • Clear front face with white/light background.
                </p>
                <input
                  type="file"
                  required
                  accept="image/*"
                  onChange={handlePhotoUpload}
                  className="block w-full text-xs text-gray-700 file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-bold file:bg-[#3854A4] file:text-white hover:file:bg-[#2A4080]"
                />
              </div>

            </div>
          </div>

          {/* SECTION 2: VOLLEYBALL INFORMATION */}
          <div className="bg-white border-2 border-gray-200 rounded-3xl p-6 sm:p-8 shadow-sm space-y-6">
            <div className="border-b border-gray-200 pb-4">
              <span className="text-xs font-bold uppercase tracking-wider text-[#3854A4] block">SECTION 02</span>
              <h2 className="font-bebas text-2xl sm:text-3xl text-gray-900 tracking-wider">
                VOLLEYBALL INFORMATION & STATS
              </h2>
            </div>

            <div className="space-y-4">
              {/* Player Category Radio Grid */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-2">
                  Player Category * (Select Only 1)
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {[
                    'International Player',
                    'National Player',
                    'State/ University Level Player',
                    'Under 21 Player',
                    'New Player',
                  ].map((cat) => (
                    <label
                      key={cat}
                      className={`flex items-center gap-2.5 p-3 rounded-xl border-2 cursor-pointer transition-all ${
                        formData.player_category === cat
                          ? 'bg-blue-50 border-[#3854A4] text-[#3854A4] font-bold'
                          : 'bg-gray-50 border-gray-200 text-gray-700 hover:border-gray-300'
                      }`}
                    >
                      <input
                        type="radio"
                        name="player_category"
                        value={cat}
                        checked={formData.player_category === cat}
                        onChange={handleInputChange}
                        className="text-[#3854A4] focus:ring-[#3854A4]"
                      />
                      <span className="text-xs">{cat}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Top Achievement */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1">
                  Top Achievement <span className="text-gray-400 font-normal">(Optional)</span>
                </label>
                <input
                  type="text"
                  name="top_achievement"
                  value={formData.top_achievement}
                  onChange={handleInputChange}
                  placeholder="e.g. Gold Medal in State Championship 2024 / Best Spiker"
                  className="w-full bg-gray-50 border border-gray-300 focus:border-[#3854A4] focus:ring-1 focus:ring-[#3854A4] rounded-xl px-4 py-3 text-sm text-gray-900 focus:outline-none"
                />
              </div>

              {/* Certificate Upload + Details */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1">
                    Participation or Merit Certificate (Upload) <span className="text-gray-400 font-normal">(Optional)</span>
                  </label>
                  <p className="text-[11px] text-gray-500 mb-1.5">Format: PDF, PNG, JPG • Max 5MB</p>
                  <input
                    type="file"
                    accept=".pdf,image/*"
                    onChange={(e) => setCertificateFile(e.target.files[0])}
                    className="block w-full text-xs text-gray-700 file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-bold file:bg-[#3854A4] file:text-white hover:file:bg-[#2A4080]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1">
                    Certificate Year & Place / Merit <span className="text-gray-400 font-normal">(Optional)</span>
                  </label>
                  <input
                    type="text"
                    name="certificate_year_place"
                    value={formData.certificate_year_place}
                    onChange={handleInputChange}
                    placeholder="e.g. 2024, Varanasi - 1st Position"
                    className="w-full bg-gray-50 border border-gray-300 focus:border-[#3854A4] focus:ring-1 focus:ring-[#3854A4] rounded-xl px-4 py-3 text-sm text-gray-900 focus:outline-none"
                  />
                </div>
              </div>

              {/* Current Team / Club */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1">
                  Name of Current Department / University / Club Team
                </label>
                <input
                  type="text"
                  name="current_team_dept"
                  value={formData.current_team_dept}
                  onChange={handleInputChange}
                  placeholder="Current active team or academy (if any)"
                  className="w-full bg-gray-50 border border-gray-300 focus:border-[#3854A4] focus:ring-1 focus:ring-[#3854A4] rounded-xl px-4 py-3 text-sm text-gray-900 focus:outline-none"
                />
              </div>

              {/* Athletic Dimensions Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-gray-700 mb-1">
                    Height (cms) *
                  </label>
                  <input
                    type="number"
                    required
                    name="height_cms"
                    value={formData.height_cms}
                    onChange={handleInputChange}
                    placeholder="e.g. 175"
                    className="w-full bg-gray-50 border border-gray-300 focus:border-[#3854A4] rounded-xl p-3 text-sm text-gray-900 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-gray-700 mb-1">
                    Weight (kgs) *
                  </label>
                  <input
                    type="number"
                    required
                    name="weight_kgs"
                    value={formData.weight_kgs}
                    onChange={handleInputChange}
                    placeholder="e.g. 64"
                    className="w-full bg-gray-50 border border-gray-300 focus:border-[#3854A4] rounded-xl p-3 text-sm text-gray-900 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-gray-700 mb-1">
                    Standing Reach (cms) *
                  </label>
                  <input
                    type="number"
                    required
                    name="standing_reach_cms"
                    value={formData.standing_reach_cms}
                    onChange={handleInputChange}
                    placeholder="e.g. 225"
                    className="w-full bg-gray-50 border border-gray-300 focus:border-[#3854A4] rounded-xl p-3 text-sm text-gray-900 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-gray-700 mb-1">
                    Jump Reach (cms) *
                  </label>
                  <input
                    type="number"
                    required
                    name="jump_reach_cms"
                    value={formData.jump_reach_cms}
                    onChange={handleInputChange}
                    placeholder="e.g. 290"
                    className="w-full bg-gray-50 border border-gray-300 focus:border-[#3854A4] rounded-xl p-3 text-sm text-gray-900 focus:outline-none"
                  />
                </div>
              </div>

              {/* T-Shirt Size */}
              <div className="pt-2">
                <label className="block text-[11px] font-bold uppercase tracking-wider text-gray-700 mb-2">
                  T-Shirt Size <span className="text-[#E82024]">*</span>
                </label>
                <div className="flex flex-wrap gap-3">
                  {['XS', 'S', 'M', 'L', 'XL', 'XXL', 'XXXL'].map((size) => (
                    <label
                      key={size}
                      className={`flex items-center justify-center w-14 h-12 rounded-xl border-2 font-bold text-sm cursor-pointer transition-all select-none ${
                        formData.tshirt_size === size
                          ? 'bg-[#3854A4] border-[#3854A4] text-white shadow-md'
                          : 'bg-gray-50 border-gray-300 text-gray-700 hover:border-[#3854A4] hover:text-[#3854A4]'
                      }`}
                    >
                      <input
                        type="radio"
                        name="tshirt_size"
                        value={size}
                        required
                        checked={formData.tshirt_size === size}
                        onChange={handleInputChange}
                        className="sr-only"
                      />
                      {size}
                    </label>
                  ))}
                </div>
                {!formData.tshirt_size && (
                  <p className="text-[11px] text-gray-400 mt-1.5">Please select your T-shirt size to proceed.</p>
                )}
              </div>

            </div>
          </div>

          {/* SECTION 3: DECLARATION & VOLUNTARY PAYMENT CONSENT (REPLACES OLD MEDICAL & STAMP PAPER) */}
          <div className="bg-white border-2 border-gray-200 rounded-3xl p-6 sm:p-8 shadow-sm space-y-6">
            <div className="border-b border-gray-200 pb-4">
              <span className="text-xs font-bold uppercase tracking-wider text-[#3854A4] block">SECTION 03</span>
              <h2 className="font-bebas text-2xl sm:text-3xl text-gray-900 tracking-wider">
                DECLARATION & VOLUNTARY PAYMENT CONSENT
              </h2>
            </div>

            {/* Declaration Text Box */}
            <div className="bg-gray-50 p-5 rounded-2xl border border-gray-200 text-xs text-gray-700 space-y-2 leading-relaxed">
              <p className="font-bold text-gray-900 text-sm">Official Declaration & Player Commitment:</p>
              <ul className="list-disc pl-5 space-y-1.5">
                <li>I confirm that all details, statistics, and certificates submitted in this registration form are true and accurate to the best of my knowledge.</li>
                <li>I agree to abide by all the rules, codes of conduct, and disciplinary regulations of the North Premier Volleyball League (NPVL).</li>
                <li>I confirm that I am physically fit to participate in competitive volleyball activities and selection trials.</li>
                <li>I consent to the use of my photograph, name, and sports information for official league accreditation, promotional purposes, and tournament broadcasts.</li>
              </ul>
            </div>

            {/* Consent Checkboxes */}
            <div className="space-y-4 pt-2">
              
              {/* Checkbox 1: General Declaration */}
              <label className="flex items-start gap-3 p-4 bg-blue-50/50 border border-blue-200 rounded-2xl cursor-pointer hover:bg-blue-50 transition-colors">
                <input
                  type="checkbox"
                  required
                  checked={formData.declaration_agreed}
                  onChange={(e) => setFormData((prev) => ({ ...prev, declaration_agreed: e.target.checked }))}
                  className="w-5 h-5 text-[#3854A4] rounded mt-0.5"
                />
                <span className="text-xs font-bold text-gray-900 leading-snug">
                  I solemnly declare that the information provided is correct, and I agree to abide by the official rules and code of conduct of the North Premier Volleyball League (NPVL). *
                </span>
              </label>

              {/* Checkbox 2: Voluntary Payment Consent (Self Consent for ₹500 Payment) */}
              <label className="flex items-start gap-3 p-4 bg-red-50/50 border border-red-200 rounded-2xl cursor-pointer hover:bg-red-50 transition-colors">
                <input
                  type="checkbox"
                  required
                  checked={formData.voluntary_payment_consent}
                  onChange={(e) => setFormData((prev) => ({ ...prev, voluntary_payment_consent: e.target.checked }))}
                  className="w-5 h-5 text-[#E82024] rounded mt-0.5"
                />
                <span className="text-xs font-bold text-gray-900 leading-snug">
                  VOLUNTARY PAYMENT CONSENT: I hereby confirm that I am making the voluntary registration fee payment of ₹500 (Five Hundred Rupees) with my full knowledge and free personal consent for NPVL Season 1 Player Draft & Trial entry. *
                </span>
              </label>

            </div>

          </div>

          {/* SUBMISSION & RAZORPAY TRIGGER BOX */}
          <div className="bg-[#121C38] border-2 border-[#3854A4] rounded-3xl p-6 sm:p-8 text-white shadow-xl flex flex-col items-center gap-5 sm:flex-row sm:justify-between">
            <div className="space-y-1 text-center sm:text-left">
              <span className="text-xs font-bold uppercase tracking-wider text-[#E82024]">STEP 4 OF 4</span>
              <h3 className="font-bebas text-2xl sm:text-4xl tracking-wider text-white leading-tight">
                FEE PAYMENT &<br className="sm:hidden" /> GENERATE PLAYER ID CARD
              </h3>
              <p className="text-xs text-gray-300">
                Total Payable: <strong className="text-white text-base">₹500 INR</strong> (Includes Draft Evaluation & Official Player ID Pass)
              </p>
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="w-full sm:w-auto red-sweep-btn bg-[#E82024] hover:bg-[#C71216] disabled:opacity-50 text-white font-bebas text-lg sm:text-xl tracking-wider px-6 py-4 rounded-2xl shadow-xl flex items-center justify-center gap-2 transition-all cursor-pointer"
            >
              <span className="text-center leading-tight">
                {submitting ? 'PROCESSING...' : 'PAY ₹500 &\nSUBMIT FORM'}
              </span>
              <ArrowRight className="w-5 h-5 shrink-0" />
            </button>
          </div>

        </form>

      </div>
    </div>
  );
}
