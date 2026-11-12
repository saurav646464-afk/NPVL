import React, { useState, useEffect, useRef } from 'react';
import { Image as ImageIcon, X, ChevronLeft, ChevronRight, ZoomIn, Sparkles } from 'lucide-react';
import { supabase } from '../lib/supabase';

// ── Horizontal Carousel for one event ──────────────────────────────────────
function EventCarousel({ eventName, photos, onPhotoClick }) {
  const trackRef = useRef(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  const checkScroll = () => {
    const el = trackRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 4);
    setCanScrollRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 4);
  };

  useEffect(() => {
    checkScroll();
    const el = trackRef.current;
    if (el) el.addEventListener('scroll', checkScroll, { passive: true });
    window.addEventListener('resize', checkScroll);
    return () => {
      if (el) el.removeEventListener('scroll', checkScroll);
      window.removeEventListener('resize', checkScroll);
    };
  }, [photos]);

  const scroll = (dir) => {
    const el = trackRef.current;
    if (!el) return;
    const cardWidth = el.querySelector('div')?.offsetWidth || 260;
    el.scrollBy({ left: dir * (cardWidth + 16), behavior: 'smooth' });
  };

  return (
    <div className="space-y-4">
      {/* Event Heading */}
      <div className="flex items-center justify-between gap-3 border-b-2 border-gray-200 pb-3">
        <div className="flex items-center gap-3">
          <div className="w-1.5 h-8 bg-[#E82024] rounded-full shrink-0" />
          <div>
            <span className="text-[10px] font-bold uppercase tracking-widest text-gray-400 block">Event Album</span>
            <h2 className="font-bebas text-2xl sm:text-3xl text-gray-900 tracking-wider leading-tight">
              {eventName}
            </h2>
          </div>
        </div>
        <span className="text-xs font-bold text-gray-400 bg-gray-100 px-3 py-1 rounded-full shrink-0">
          {photos.length} {photos.length === 1 ? 'Photo' : 'Photos'}
        </span>
      </div>

      {/* Carousel Track */}
      <div className="relative">
        {/* Left Arrow */}
        {canScrollLeft && (
          <button
            onClick={() => scroll(-1)}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-3 z-10 w-9 h-9 bg-white border border-gray-200 rounded-full shadow-md flex items-center justify-center hover:bg-[#3854A4] hover:text-white hover:border-[#3854A4] transition-all cursor-pointer"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
        )}

        {/* Scrollable Row */}
        <div
          ref={trackRef}
          className="flex gap-4 overflow-x-auto scrollbar-none pb-2 scroll-smooth"
          style={{ scrollSnapType: 'x mandatory' }}
        >
          {photos.map((photo, idx) => (
            <div
              key={photo.id || idx}
              onClick={() => onPhotoClick(photo, photos)}
              className="shrink-0 w-56 sm:w-64 md:w-72 group cursor-pointer rounded-2xl overflow-hidden border border-gray-200 bg-white hover:border-[#3854A4] hover:shadow-xl transition-all duration-300"
              style={{ scrollSnapAlign: 'start' }}
            >
              {/* Photo */}
              <div className="relative aspect-[4/3] overflow-hidden bg-gray-100">
                <img
                  src={photo.image_url}
                  alt={photo.title || eventName}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <div className="bg-white/90 p-2.5 rounded-full shadow-lg">
                    <ZoomIn className="w-5 h-5 text-[#3854A4]" />
                  </div>
                </div>
              </div>

              {/* Caption strip */}
              {(photo.title || photo.caption) && (
                <div className="p-3">
                  {photo.title && (
                    <p className="text-xs font-bold text-gray-900 line-clamp-1 group-hover:text-[#3854A4] transition-colors">
                      {photo.title}
                    </p>
                  )}
                  {photo.caption && (
                    <p className="text-[11px] text-gray-500 line-clamp-1 mt-0.5">{photo.caption}</p>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Right Arrow */}
        {canScrollRight && (
          <button
            onClick={() => scroll(1)}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-3 z-10 w-9 h-9 bg-white border border-gray-200 rounded-full shadow-md flex items-center justify-center hover:bg-[#3854A4] hover:text-white hover:border-[#3854A4] transition-all cursor-pointer"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        )}
      </div>
    </div>
  );
}

// ── Main Gallery Page ───────────────────────────────────────────────────────
export default function Gallery() {
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(true);

  // Lightbox state
  const [activePhoto, setActivePhoto] = useState(null);
  const [lightboxList, setLightboxList] = useState([]);

  useEffect(() => {
    fetchGalleryPhotos();
  }, []);

  // ESC to close lightbox
  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') setActivePhoto(null); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  const fetchGalleryPhotos = async () => {
    setLoading(true);

    // PRIMARY: Supabase (cross-device)
    try {
      const { data, error } = await supabase
        .from('gallery_photos')
        .select('*')
        .order('created_at', { ascending: false });

      if (!error && data && data.length > 0) {
        setPhotos(data);
        setLoading(false);
        return;
      }
    } catch (_) {}

    // FALLBACK: localStorage
    try {
      const local = JSON.parse(localStorage.getItem('npvl_custom_gallery') || '[]');
      setPhotos(Array.isArray(local) ? local.filter(p => !p.id?.startsWith('def-')) : []);
    } catch {
      setPhotos([]);
    }
    setLoading(false);
  };

  // Group by event (preserve insertion order — newest event first)
  const groupedEvents = photos.reduce((acc, photo) => {
    const event = photo.event_name || 'General Photos';
    if (!acc[event]) acc[event] = [];
    acc[event].push(photo);
    return acc;
  }, {});

  // Lightbox helpers
  const openLightbox = (photo, list) => {
    setLightboxList(list);
    setActivePhoto(photo);
  };

  const lightboxIndex = lightboxList.findIndex(
    p => (p.id || p.image_url) === (activePhoto?.id || activePhoto?.image_url)
  );

  const handlePrev = (e) => {
    e.stopPropagation();
    const prev = (lightboxIndex - 1 + lightboxList.length) % lightboxList.length;
    setActivePhoto(lightboxList[prev]);
  };

  const handleNext = (e) => {
    e.stopPropagation();
    const next = (lightboxIndex + 1) % lightboxList.length;
    setActivePhoto(lightboxList[next]);
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 pt-28 pb-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-10">

        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#3854A4]/10 border border-[#3854A4]/30 rounded-full text-[#3854A4] text-xs font-bold uppercase tracking-widest">
            <Sparkles className="w-3.5 h-3.5 text-[#E82024]" />
            <span>Official Media Archive</span>
          </div>
          <h1 className="font-bebas text-4xl sm:text-6xl text-gray-900 tracking-wider uppercase leading-none">
            NPVL OFFICIAL <span className="text-[#3854A4]">PHOTO GALLERY</span>
          </h1>
          <p className="text-xs sm:text-sm text-gray-600 leading-relaxed font-medium">
            Explore exclusive moments, trial camps, press announcements, official match preparations,
            and community events from North Premier Volleyball League Season 1.
          </p>
        </div>

        {/* Content */}
        {loading ? (
          <div className="py-24 text-center space-y-4">
            <div className="w-12 h-12 border-4 border-[#3854A4] border-t-transparent rounded-full animate-spin mx-auto" />
            <p className="text-xs font-bold uppercase tracking-wider text-gray-500">Loading Official Photo Gallery...</p>
          </div>

        ) : photos.length === 0 ? (
          <div className="py-20 text-center bg-white rounded-3xl border border-dashed border-gray-300 max-w-2xl mx-auto p-8 sm:p-12 space-y-4 shadow-sm">
            <div className="w-16 h-16 bg-[#3854A4]/10 text-[#3854A4] rounded-full flex items-center justify-center mx-auto">
              <ImageIcon className="w-8 h-8" />
            </div>
            <span className="text-[10px] font-bold uppercase tracking-widest text-[#E82024] bg-[#E82024]/10 px-3 py-1 rounded-full border border-[#E82024]/30 inline-block">
              Coming Soon
            </span>
            <h3 className="font-bebas text-3xl sm:text-4xl text-gray-900 tracking-wider">
              Official Gallery Updates Coming Soon
            </h3>
            <p className="text-xs sm:text-sm text-gray-600 max-w-md mx-auto leading-relaxed">
              Official photos from NPVL Season 1 events, press conferences, and player trials
              will be published here by the administration.
            </p>
          </div>

        ) : (
          /* Event-wise Carousels */
          <div className="space-y-12">
            {Object.entries(groupedEvents).map(([eventName, eventPhotos]) => (
              <EventCarousel
                key={eventName}
                eventName={eventName}
                photos={eventPhotos}
                onPhotoClick={openLightbox}
              />
            ))}
          </div>
        )}

      </div>

      {/* ── LIGHTBOX ─────────────────────────────────────────────────────── */}
      {activePhoto && (
        <div
          onClick={() => setActivePhoto(null)}
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-3 sm:p-6"
        >
          {/* Close */}
          <button
            onClick={() => setActivePhoto(null)}
            className="absolute top-4 right-4 z-50 p-2.5 bg-white/20 hover:bg-white text-white hover:text-black rounded-full transition-all cursor-pointer shadow-lg"
          >
            <X className="w-6 h-6" />
          </button>

          {/* Prev */}
          {lightboxList.length > 1 && (
            <button
              onClick={handlePrev}
              className="absolute left-3 sm:left-6 z-40 p-2 sm:p-3 bg-white/20 hover:bg-white text-white hover:text-black rounded-full transition-all cursor-pointer"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
          )}

          {/* Next */}
          {lightboxList.length > 1 && (
            <button
              onClick={handleNext}
              className="absolute right-3 sm:right-6 z-40 p-2 sm:p-3 bg-white/20 hover:bg-white text-white hover:text-black rounded-full transition-all cursor-pointer"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          )}

          {/* Photo Box */}
          <div
            onClick={(e) => e.stopPropagation()}
            className="max-w-4xl w-full bg-gray-900 border border-white/20 rounded-3xl overflow-hidden shadow-2xl"
          >
            <div className="relative max-h-[70vh] flex items-center justify-center bg-black/80">
              <img
                src={activePhoto.image_url}
                alt={activePhoto.title || activePhoto.event_name}
                className="max-h-[70vh] w-auto max-w-full object-contain"
              />
            </div>

            {(activePhoto.event_name || activePhoto.title || activePhoto.caption || activePhoto.date) && (
              <div className="p-5 sm:p-6 text-white space-y-2 border-t border-white/10 bg-gray-900">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-[#E82024] bg-[#E82024]/10 border border-[#E82024]/30 px-2.5 py-0.5 rounded-full">
                    {activePhoto.event_name || 'General Photos'}
                  </span>
                  {lightboxList.length > 1 && (
                    <span className="text-xs text-gray-400 font-mono">
                      {lightboxIndex + 1} / {lightboxList.length}
                    </span>
                  )}
                  {activePhoto.date && (
                    <span className="text-xs text-gray-400 font-mono">📅 {activePhoto.date}</span>
                  )}
                </div>
                {activePhoto.title && (
                  <h2 className="font-bebas text-2xl sm:text-3xl tracking-wide text-white">
                    {activePhoto.title}
                  </h2>
                )}
                {activePhoto.caption && (
                  <p className="text-xs sm:text-sm text-gray-300 leading-relaxed">{activePhoto.caption}</p>
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
