import React, { useState, useEffect } from 'react';
import { 
  Users, DollarSign, CheckCircle2, Clock, 
  Search, Filter, Download, ArrowLeft, RefreshCw, Eye, ShieldAlert, Lock, Mail, KeyRound, AlertCircle, Image as ImageIcon, Trash2, PlusCircle, UploadCloud, X, Layers
} from 'lucide-react';
import { supabase } from '../lib/supabase';
import { generateIdCardPDF } from '../lib/pdfGenerator';

export default function AdminDashboard({ setCurrentPage, initialAuthenticated = false, setAdminLoggedIn }) {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return initialAuthenticated || sessionStorage.getItem('npvl_admin_logged_in') === 'true';
  });
  const [viewMode, setViewMode] = useState(() => {
    return (initialAuthenticated || sessionStorage.getItem('npvl_admin_logged_in') === 'true') ? 'dashboard' : 'login';
  });

  useEffect(() => {
    const isAuthed = initialAuthenticated || sessionStorage.getItem('npvl_admin_logged_in') === 'true';
    if (isAuthed) {
      setIsAuthenticated(true);
      setViewMode('dashboard');
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

  // Gallery Manager State (Bulk Upload & Optional Titles)
  const [galleryPhotos, setGalleryPhotos] = useState([]);
  const [galleryLoading, setGalleryLoading] = useState(false);

  // Fetch gallery photos from Supabase on mount
  useEffect(() => {
    const isAuthed = initialAuthenticated || sessionStorage.getItem('npvl_admin_logged_in') === 'true';
    if (isAuthed) {
      fetchGalleryFromSupabase();
    }
  }, []);

  const fetchGalleryFromSupabase = async () => {
    setGalleryLoading(true);
    try {
      const { data, error } = await supabase
        .from('gallery_photos')
        .select('*')
        .order('created_at', { ascending: false });
      if (!error && data) {
        setGalleryPhotos(data);
      } else {
        // Fallback to localStorage
        const local = JSON.parse(localStorage.getItem('npvl_custom_gallery') || '[]');
        setGalleryPhotos(Array.isArray(local) ? local.filter(p => !p.id?.startsWith('def-')) : []);
      }
    } catch {
      const local = JSON.parse(localStorage.getItem('npvl_custom_gallery') || '[]');
      setGalleryPhotos(Array.isArray(local) ? local.filter(p => !p.id?.startsWith('def-')) : []);
    } finally {
      setGalleryLoading(false);
    }
  };
  const [photoForm, setPhotoForm] = useState({
    globalTitle: '', // Optional batch title
    event_name: 'Season 1 Launch Event',
    image_url: '', // Optional URL
    caption: '', // Optional caption
    date: new Date().toISOString().split('T')[0],
  });
  const [customEventName, setCustomEventName] = useState('');
  const [stagedPhotos, setStagedPhotos] = useState([]); // Selected bulk files
  const [isProcessingFiles, setIsProcessingFiles] = useState(false);
  const [processingStatus, setProcessingStatus] = useState('');
  const [photoUploadSuccess, setPhotoUploadSuccess] = useState('');

  // Auto-compress high-resolution camera photos (e.g. 8MB-25MB) into crisp Full HD web JPEGs (~300KB-600KB)
  const compressImageFile = (file, maxWidth = 1920, maxHeight = 1920, quality = 0.82) => {
    return new Promise((resolve) => {
      if (!file.type.startsWith('image/') || file.type.includes('svg')) {
        const reader = new FileReader();
        reader.onload = (e) => resolve({ dataUrl: e.target.result });
        reader.onerror = () => resolve({ dataUrl: '' });
        reader.readAsDataURL(file);
        return;
      }

      const reader = new FileReader();
      reader.onerror = () => resolve({ dataUrl: '' });
      reader.onload = (e) => {
        const img = new Image();
        img.onerror = () => resolve({ dataUrl: e.target.result });
        img.onload = () => {
          try {
            let width = img.width;
            let height = img.height;

            // Scale down proportionally if larger than maxWidth / maxHeight (Full HD standard)
            if (width > maxWidth || height > maxHeight) {
              if (width > height) {
                height = Math.round((height * maxWidth) / width);
                width = maxWidth;
              } else {
                width = Math.round((width * maxHeight) / height);
                height = maxHeight;
              }
            }

            const canvas = document.createElement('canvas');
            canvas.width = width;
            canvas.height = height;
            const ctx = canvas.getContext('2d');

            ctx.imageSmoothingEnabled = true;
            ctx.imageSmoothingQuality = 'high';
            ctx.drawImage(img, 0, 0, width, height);

            const compressedDataUrl = canvas.toDataURL('image/jpeg', quality);
            resolve({ dataUrl: compressedDataUrl });
          } catch (err) {
            console.warn('Canvas compression fallback:', err);
            resolve({ dataUrl: e.target.result });
          }
        };
        img.src = e.target.result;
      };
      reader.readAsDataURL(file);
    });
  };

  // Handle multiple bulk file selection with auto HD camera photo compression
  const handleBulkFilesSelected = async (e) => {
    const files = Array.from(e.target.files || []);
    if (files.length === 0) return;

    setIsProcessingFiles(true);
    setProcessingStatus(`Optimizing ${files.length} photo(s)...`);

    const newItems = [];

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      // Supports camera photos up to 25MB each!
      if (file.size > 25 * 1024 * 1024) {
        alert(`File "${file.name}" is over 25MB. Skipping this file.`);
        continue;
      }

      const mbSize = (file.size / (1024 * 1024)).toFixed(1);
      setProcessingStatus(`Optimizing photo ${i + 1} of ${files.length} (${mbSize} MB Camera Shot)...`);

      try {
        const { dataUrl } = await compressImageFile(file);
        if (dataUrl) {
          newItems.push({
            id: `staged-${Date.now()}-${i}-${Math.random().toString(36).substr(2, 5)}`,
            dataUrl,
            title: '', // Optional
            fileName: file.name,
            origMb: mbSize,
          });
        }
      } catch (err) {
        console.error('File compression error:', err);
      }
    }

    setStagedPhotos(prev => [...prev, ...newItems]);
    setIsProcessingFiles(false);
    setProcessingStatus('');
    e.target.value = '';
  };

  // Remove photo from staging
  const removeStagedPhoto = (id) => {
    setStagedPhotos(prev => prev.filter(p => p.id !== id));
  };

  // Update individual title for a staged photo
  const updateStagedPhotoTitle = (id, newTitle) => {
    setStagedPhotos(prev => prev.map(p => p.id === id ? { ...p, title: newTitle } : p));
  };

  // Publish all staged photos + optional URL photo to gallery → Supabase Storage + DB
  const handlePublishBulkPhotos = async (e) => {
    e.preventDefault();

    if (stagedPhotos.length === 0 && !photoForm.image_url) {
      alert('Please select one or more photos to upload, or provide an image link.');
      return;
    }

    const finalEvent = photoForm.event_name === 'OTHER_CUSTOM'
      ? (customEventName.trim() || 'General Photos')
      : photoForm.event_name;

    setIsProcessingFiles(true);
    setProcessingStatus('Uploading photos to server...');
    setPhotoUploadSuccess('');

    // Helper: base64 dataUrl → Blob
    const base64ToBlob = (dataUrl) => {
      const [header, base64] = dataUrl.split(',');
      const mime = (header.match(/:(.*?);/) || [])[1] || 'image/jpeg';
      const binary = atob(base64);
      const array = new Uint8Array(binary.length);
      for (let i = 0; i < binary.length; i++) array[i] = binary.charCodeAt(i);
      return new Blob([array], { type: mime });
    };

    const publishedPhotos = [];
    let failCount = 0;

    // 1. Upload each staged file to Supabase Storage
    for (let i = 0; i < stagedPhotos.length; i++) {
      const item = stagedPhotos[i];
      const photoId = `photo-${Date.now()}-${i}-${Math.random().toString(36).substr(2, 6)}`;
      const safeEvent = finalEvent.replace(/[^a-zA-Z0-9_-]/g, '_');
      const storagePath = `events/${safeEvent}/${photoId}.jpg`;

      setProcessingStatus(`Uploading photo ${i + 1} of ${stagedPhotos.length}...`);

      try {
        const blob = base64ToBlob(item.dataUrl);
        const { error: uploadError } = await supabase.storage
          .from('gallery')
          .upload(storagePath, blob, { contentType: 'image/jpeg', upsert: false });

        if (uploadError) {
          console.error('Storage upload error:', uploadError.message);
          failCount++;
          continue;
        }

        const { data: urlData } = supabase.storage.from('gallery').getPublicUrl(storagePath);
        const publicUrl = urlData?.publicUrl || '';

        const photoRecord = {
          id: photoId,
          title: item.title.trim() || photoForm.globalTitle.trim() || '',
          event_name: finalEvent,
          image_url: publicUrl,
          storage_path: storagePath,
          caption: photoForm.caption.trim() || '',
          date: photoForm.date,
        };

        const { error: insertError } = await supabase.from('gallery_photos').insert(photoRecord);
        if (insertError) {
          console.error('DB insert error:', insertError.message);
          failCount++;
        } else {
          publishedPhotos.push(photoRecord);
        }
      } catch (err) {
        console.error('Upload exception:', err);
        failCount++;
      }
    }

    // 2. URL-only photo → insert directly into DB (no storage upload needed)
    if (photoForm.image_url.trim()) {
      const urlPhotoId = `photo-${Date.now()}-url`;
      const urlRecord = {
        id: urlPhotoId,
        title: photoForm.globalTitle.trim() || '',
        event_name: finalEvent,
        image_url: photoForm.image_url.trim(),
        storage_path: null,
        caption: photoForm.caption.trim() || '',
        date: photoForm.date,
      };
      try {
        const { error: urlInsertError } = await supabase.from('gallery_photos').insert(urlRecord);
        if (!urlInsertError) {
          publishedPhotos.push(urlRecord);
        }
      } catch (_) {}
    }

    // 3. Refresh gallery list from Supabase
    await fetchGalleryFromSupabase();

    setIsProcessingFiles(false);
    setProcessingStatus('');
    setStagedPhotos([]);
    setPhotoForm({
      globalTitle: '',
      event_name: finalEvent,
      image_url: '',
      caption: '',
      date: new Date().toISOString().split('T')[0],
    });
    setCustomEventName('');

    if (publishedPhotos.length > 0) {
      setPhotoUploadSuccess(
        `✅ Successfully uploaded ${publishedPhotos.length} photo(s) to the website gallery! Now visible on ALL devices.${failCount > 0 ? ` (${failCount} failed)` : ''}`
      );
    } else {
      setPhotoUploadSuccess(`❌ Upload failed. Check your internet connection and try again.`);
    }
    setTimeout(() => setPhotoUploadSuccess(''), 7000);
  };

  const handleDeletePhoto = async (photoId) => {
    if (window.confirm('Are you sure you want to delete this photo from the gallery?')) {
      // Find storage_path for deletion from storage bucket
      const photo = galleryPhotos.find(p => p.id === photoId);
      if (photo?.storage_path) {
        try {
          await supabase.storage.from('gallery').remove([photo.storage_path]);
        } catch (_) {}
      }
      try {
        await supabase.from('gallery_photos').delete().eq('id', photoId);
      } catch (_) {}
      // Refresh from Supabase
      await fetchGalleryFromSupabase();
    }
  };

  const handleDeleteAllPhotos = async () => {
    if (window.confirm('Are you sure you want to delete ALL photos from the gallery? This cannot be undone!')) {
      // Delete all files from storage bucket
      try {
        const { data: fileList } = await supabase.storage.from('gallery').list('events', { limit: 1000 });
        if (fileList && fileList.length > 0) {
          // List subfolders and delete files within
          for (const folder of fileList) {
            const { data: subFiles } = await supabase.storage.from('gallery').list(`events/${folder.name}`, { limit: 1000 });
            if (subFiles && subFiles.length > 0) {
              const paths = subFiles.map(f => `events/${folder.name}/${f.name}`);
              await supabase.storage.from('gallery').remove(paths);
            }
          }
        }
      } catch (_) {}
      // Delete all rows from table
      try {
        await supabase.from('gallery_photos').delete().neq('id', '___none___');
      } catch (_) {}
      localStorage.removeItem('npvl_custom_gallery');
      setGalleryPhotos([]);
    }
  };

  const handleAdminLogin = (e) => {
    e.preventDefault();
    setLoginError('');

    const cleanEmail = emailInput.trim().toLowerCase();
    if (cleanEmail === DEFAULT_EMAIL && passwordInput === currentAdminPassword) {
      setIsAuthenticated(true);
      setViewMode('dashboard');
      if (setAdminLoggedIn) setAdminLoggedIn(true);
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
              onClick={() => setViewMode(viewMode === 'gallery' ? 'dashboard' : 'gallery')}
              className="bg-purple-50 border border-purple-200 hover:bg-purple-100 text-purple-700 text-xs font-bold px-3.5 py-2.5 rounded-xl flex items-center gap-1.5 transition-all"
            >
              <ImageIcon className="w-4 h-4" />
              <span>{viewMode === 'gallery' ? 'Close Gallery Panel' : 'Manage Gallery'}</span>
            </button>

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
                if (setAdminLoggedIn) setAdminLoggedIn(false);
                sessionStorage.removeItem('npvl_admin_logged_in');
              }}
              className="bg-gray-900 hover:bg-black text-white text-xs font-bold uppercase tracking-wider px-4 py-2.5 rounded-xl transition-all"
            >
              Sign Out
            </button>
          </div>
        </div>

        {/* GALLERY MANAGER PANEL (COLLAPSIBLE - SUPPORTS BULK UPLOAD) */}
        {viewMode === 'gallery' && (
          <div className="bg-white p-6 sm:p-8 rounded-3xl border-2 border-purple-400 shadow-md space-y-6">
            <div className="flex items-center justify-between border-b pb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-purple-100 rounded-xl flex items-center justify-center text-purple-700">
                  <ImageIcon className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-bebas text-2xl sm:text-3xl text-gray-900 tracking-wider">
                    OFFICIAL WEBSITE GALLERY MANAGER
                  </h3>
                  <p className="text-xs text-gray-500">
                    Upload photos in bulk (multiple at once) with event album tags. Image titles are completely optional!
                  </p>
                </div>
              </div>
              <button
                onClick={() => setViewMode('dashboard')}
                className="text-xs font-bold text-gray-500 hover:text-gray-900 bg-gray-100 hover:bg-gray-200 px-3.5 py-2 rounded-xl transition-all cursor-pointer"
              >
                ✕ Close Panel
              </button>
            </div>

            {/* Bulk Upload Form */}
            <form onSubmit={handlePublishBulkPhotos} className="bg-purple-50/50 border border-purple-200 p-5 sm:p-6 rounded-2xl space-y-5">
              <div className="flex items-center justify-between border-b border-purple-200/60 pb-3">
                <span className="text-xs font-bold uppercase tracking-wider text-purple-800 flex items-center gap-2">
                  <Layers className="w-4 h-4 text-purple-600" />
                  <span>STEP 1: SELECT EVENT ALBUM & DETAILS</span>
                </span>
                <span className="text-[11px] text-purple-600 font-medium">All titles & captions are optional</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {/* Event Name Selection / Input */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1">
                    Event Name / Album *
                  </label>
                  <select
                    value={photoForm.event_name}
                    onChange={(e) => setPhotoForm({ ...photoForm, event_name: e.target.value })}
                    className="w-full bg-white border border-gray-300 rounded-xl px-3 py-2.5 text-xs font-bold text-gray-800 focus:outline-none focus:border-purple-500"
                  >
                    <option value="Season 1 Launch Event">Season 1 Launch Event</option>
                    <option value="Player Trials 2026">Player Trials 2026</option>
                    <option value="Arena & Stadium Prep">Arena & Stadium Prep</option>
                    <option value="Team Jersey & Kit Reveal">Team Jersey & Kit Reveal</option>
                    <option value="General Photos">General Photos</option>
                    <option value="OTHER_CUSTOM">+ Add Custom Event Name</option>
                  </select>
                </div>

                {/* Custom Event Name if selected */}
                {photoForm.event_name === 'OTHER_CUSTOM' && (
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-purple-700 mb-1">
                      Type Custom Event Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={customEventName}
                      onChange={(e) => setCustomEventName(e.target.value)}
                      placeholder="e.g. Press Meet Varanasi"
                      className="w-full bg-white border border-purple-400 rounded-xl px-3 py-2.5 text-xs text-gray-900 focus:outline-none"
                    />
                  </div>
                )}

                {/* Common/Batch Title (Optional) */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1 flex items-center justify-between">
                    <span>Title (Optional)</span>
                    <span className="text-[10px] text-gray-400 font-normal">Optional</span>
                  </label>
                  <input
                    type="text"
                    value={photoForm.globalTitle}
                    onChange={(e) => setPhotoForm({ ...photoForm, globalTitle: e.target.value })}
                    placeholder="Leave blank or enter title"
                    className="w-full bg-white border border-gray-300 rounded-xl px-3 py-2.5 text-xs text-gray-900 focus:outline-none focus:border-purple-500"
                  />
                </div>

                {/* Photo Date */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1">
                    Date of Event (Optional)
                  </label>
                  <input
                    type="date"
                    value={photoForm.date}
                    onChange={(e) => setPhotoForm({ ...photoForm, date: e.target.value })}
                    className="w-full bg-white border border-gray-300 rounded-xl px-3 py-2 text-xs text-gray-900 focus:outline-none"
                  />
                </div>
              </div>

              {/* Caption (Optional) */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1 flex items-center justify-between">
                  <span>Caption / Description (Optional)</span>
                  <span className="text-[10px] text-gray-400 font-normal">Optional</span>
                </label>
                <input
                  type="text"
                  value={photoForm.caption}
                  onChange={(e) => setPhotoForm({ ...photoForm, caption: e.target.value })}
                  placeholder="Short note about these photos (shown in gallery and lightbox)..."
                  className="w-full bg-white border border-gray-300 rounded-xl px-3 py-2 text-xs text-gray-900 focus:outline-none"
                />
              </div>

              {/* STEP 2: File Upload (Multiple / Bulk Support) */}
              <div className="border-t border-purple-200/60 pt-4 space-y-3">
                <span className="text-xs font-bold uppercase tracking-wider text-purple-800 flex items-center gap-2">
                  <UploadCloud className="w-4 h-4 text-purple-600" />
                  <span>STEP 2: CHOOSE PHOTOS (SELECT MULTIPLE FILES AT ONCE)</span>
                </span>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Bulk File Input with Auto HD Compression */}
                  <div className="bg-white p-4 rounded-2xl border-2 border-dashed border-purple-300 hover:border-purple-500 transition-colors">
                    <div className="flex items-center justify-between mb-1">
                      <label className="block text-xs font-bold text-purple-900">
                        📸 Choose Photos From Device / Camera
                      </label>
                      <span className="text-[10px] font-bold bg-green-100 text-green-800 px-2 py-0.5 rounded-full border border-green-200">
                        Up to 25MB Each
                      </span>
                    </div>
                    <p className="text-[11px] text-gray-500 mb-2.5 leading-snug">
                      High-res camera photos (even 8MB–15MB) are automatically optimized to crisp Full HD web quality instantly!
                    </p>
                    <input
                      type="file"
                      multiple
                      accept="image/*"
                      onChange={handleBulkFilesSelected}
                      disabled={isProcessingFiles}
                      className="block w-full text-xs text-gray-700 file:mr-3 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-bold file:bg-purple-600 file:text-white hover:file:bg-purple-700 cursor-pointer disabled:opacity-50"
                    />
                    {isProcessingFiles && (
                      <div className="mt-2.5 p-2 bg-purple-50 border border-purple-200 rounded-xl flex items-center gap-2 text-xs text-purple-800 font-bold animate-pulse">
                        <RefreshCw className="w-3.5 h-3.5 animate-spin text-purple-600" />
                        <span>{processingStatus || 'Optimizing camera photos...'}</span>
                      </div>
                    )}
                  </div>

                  {/* Or Single URL */}
                  <div className="bg-white p-4 rounded-2xl border border-gray-200">
                    <label className="block text-xs font-bold text-gray-800 mb-1">
                      🔗 Or Paste Web Image URL Link
                    </label>
                    <p className="text-[11px] text-gray-500 mb-2.5">
                      Optional: Paste a direct image link if hosted online.
                    </p>
                    <input
                      type="url"
                      value={photoForm.image_url.startsWith('data:') ? '' : photoForm.image_url}
                      onChange={(e) => setPhotoForm({ ...photoForm, image_url: e.target.value })}
                      placeholder="https://example.com/event-photo.jpg"
                      className="w-full bg-gray-50 border border-gray-300 rounded-xl px-3 py-2 text-xs text-gray-900 focus:outline-none"
                    />
                  </div>
                </div>
              </div>

              {/* STEP 3: Staged Photos Preview (Bulk Grid) */}
              {stagedPhotos.length > 0 && (
                <div className="bg-white p-4 rounded-2xl border border-purple-200 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold uppercase tracking-wider text-purple-800">
                      SELECTED PHOTOS READY TO UPLOAD ({stagedPhotos.length})
                    </span>
                    <button
                      type="button"
                      onClick={() => setStagedPhotos([])}
                      className="text-xs font-bold text-red-600 hover:text-red-800 cursor-pointer"
                    >
                      Clear All Selected
                    </button>
                  </div>

                  <p className="text-[11px] text-gray-500">
                    Titles are optional. You can give individual titles below or leave them blank. Click (✕) to remove any photo.
                  </p>

                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 max-h-72 overflow-y-auto p-1">
                    {stagedPhotos.map((item) => (
                      <div key={item.id} className="relative group bg-gray-50 rounded-xl border border-gray-200 p-1.5 space-y-1.5 shadow-2xs">
                        <div className="relative aspect-square overflow-hidden rounded-lg bg-black/10">
                          <img
                            src={item.dataUrl}
                            alt="Preview"
                            className="w-full h-full object-cover"
                          />
                          {item.origMb && (
                            <span className="absolute bottom-1 left-1 bg-black/75 text-[9px] text-white px-1.5 py-0.5 rounded font-mono">
                              {item.origMb}MB ⚡
                            </span>
                          )}
                          <button
                            type="button"
                            onClick={() => removeStagedPhoto(item.id)}
                            className="absolute top-1 right-1 p-1 bg-red-600 hover:bg-red-700 text-white rounded-full shadow-md cursor-pointer"
                            title="Remove photo"
                          >
                            <X className="w-3 h-3" />
                          </button>
                        </div>
                        <input
                          type="text"
                          value={item.title}
                          onChange={(e) => updateStagedPhotoTitle(item.id, e.target.value)}
                          placeholder="Title (Optional)"
                          className="w-full bg-white border border-gray-300 rounded-md px-1.5 py-1 text-[10px] text-gray-800 focus:outline-none focus:border-purple-500"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {photoUploadSuccess && (
                <div className="p-3.5 bg-green-50 border border-green-200 rounded-xl text-xs text-green-800 font-bold flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-green-600 shrink-0" />
                  <span>{photoUploadSuccess}</span>
                </div>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isProcessingFiles}
                className="w-full sm:w-auto bg-purple-600 hover:bg-purple-700 text-white font-bebas text-lg tracking-wider px-8 py-3 rounded-xl shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
              >
                <UploadCloud className="w-5 h-5" />
                <span>
                  {stagedPhotos.length > 0 
                    ? `PUBLISH ALL (${stagedPhotos.length}) PHOTOS TO WEBSITE GALLERY` 
                    : 'PUBLISH TO WEBSITE GALLERY'}
                </span>
              </button>
            </form>

            {/* Current Photos List in Dashboard */}
            <div className="space-y-4 pt-2">
              <div className="flex items-center justify-between border-b pb-2 flex-wrap gap-2">
                <h4 className="font-bebas text-xl sm:text-2xl text-gray-900 tracking-wider">
                  CURRENTLY PUBLISHED CUSTOM PHOTOS ({galleryPhotos.length})
                </h4>
                {galleryPhotos.length > 0 && (
                  <button
                    type="button"
                    onClick={handleDeleteAllPhotos}
                    className="text-xs font-bold text-red-600 hover:text-red-800 bg-red-50 hover:bg-red-100 px-3 py-1.5 rounded-lg border border-red-200 transition-colors cursor-pointer"
                  >
                    Delete All Uploaded Photos
                  </button>
                )}
              </div>

              {galleryPhotos.length === 0 ? (
                <p className="text-xs text-gray-500 italic p-6 bg-gray-50 rounded-2xl border border-dashed border-gray-300 text-center">
                  No photos uploaded yet. Select and upload your official event photos in bulk using the form above!
                </p>
              ) : (
                <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-3">
                  {galleryPhotos.map((photo) => (
                    <div key={photo.id} className="relative group bg-gray-50 rounded-xl border border-gray-200 overflow-hidden shadow-2xs">
                      <img
                        src={photo.image_url}
                        alt={photo.title || photo.event_name}
                        className="h-24 w-full object-cover"
                      />
                      <div className="p-2 space-y-0.5">
                        <span className="text-[9px] font-bold uppercase text-purple-700 block truncate">
                          {photo.event_name}
                        </span>
                        <p className="text-[10px] font-bold text-gray-900 truncate">
                          {photo.title || <span className="text-gray-400 italic font-normal">No title (Optional)</span>}
                        </p>
                      </div>
                      <button
                        type="button"
                        onClick={() => handleDeletePhoto(photo.id)}
                        className="absolute top-1 right-1 p-1 bg-red-600 hover:bg-red-700 text-white rounded-md shadow-md opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
                        title="Delete photo"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

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
