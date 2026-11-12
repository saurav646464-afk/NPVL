import React, { useState, useEffect } from 'react';
import { Image as ImageIcon, X, Filter, Calendar, ChevronLeft, ChevronRight, ZoomIn, Sparkles } from 'lucide-react';
import { supabase } from '../lib/supabase';

export default function Gallery() {
  const [photos, setPhotos] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState('ALL');
  const [activePhoto, setActivePhoto] = useState(null); // Fullscreen Lightbox state
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchGalleryPhotos();
  }, []);

  const fetchGalleryPhotos = async () => {
    setLoading(true);

    // PRIMARY: Fetch from Supabase (cross-device sync)
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

    // FALLBACK: localStorage cache (offline or Supabase unavailable)
    try {
      const local = JSON.parse(localStorage.getItem('npvl_custom_gallery') || '[]');
      setPhotos(Array.isArray(local) ? local.filter(p => !p.id?.startsWith('def-')) : []);
    } catch {
      setPhotos([]);
    }
    setLoading(false);
  };

  // Extract unique Event Names for the filter
  const eventNames = ['ALL', ...Array.from(new Set(photos.map(p => p.event_name || 'General Photos')))];

  // Filtered photos
  const filteredPhotos = selectedEvent === 'ALL'
    ? photos
    : photos.filter(p => (p.event_name || 'General Photos') === selectedEvent);

  // Group photos by Event Name when viewing ALL
  const groupedEvents = photos.reduce((acc, photo) => {
    const event = photo.event_name || 'General Photos';
    if (!acc[event]) acc[event] = [];
    acc[event].push(photo);
    return acc;
  }, {});

  // Lightbox Navigation
  const handlePrev = (e) => {
    e.stopPropagation();
    const currentIndex = filteredPhotos.findIndex(p => (p.id || p.image_url) === (activePhoto.id || activePhoto.image_url));
    const prevIndex = (currentIndex - 1 + filteredPhotos.length) % filteredPhotos.length;
    setActivePhoto(filteredPhotos[prevIndex]);
  };

  const handleNext = (e) => {
    e.stopPropagation();
    const currentIndex = filteredPhotos.findIndex(p => (p.id || p.image_url) === (activePhoto.id || activePhoto.image_url));
    const nextIndex = (currentIndex + 1) % filteredPhotos.length;
    setActivePhoto(filteredPhotos[nextIndex]);
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 pt-28 pb-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-10">

        {/* Header Banner */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#3854A4]/10 border border-[#3854A4]/30 rounded-full text-[#3854A4] text-xs font-bold uppercase tracking-widest">
            <Sparkles className="w-3.5 h-3.5 text-[#E82024]" />
            <span>OFFICIAL MEDIA ARCHIVE</span>
          </div>
          <h1 className="font-bebas text-4xl sm:text-6xl text-gray-900 tracking-wider uppercase leading-none">
            NPVL OFFICIAL <span className="text-[#3854A4]">PHOTO GALLERY</span>
          </h1>
          <p className="text-xs sm:text-sm text-gray-600 leading-relaxed font-medium">
            Explore exclusive moments, trial camps, press announcements, official match preparations, and community events from North Premier Volleyball League Season 1.
          </p>
        </div>

        {/* Filter Navigation Bar (shown when photos exist) */}
        {photos.length > 0 && (
          <div className="bg-white p-2.5 sm:p-3 rounded-2xl border border-gray-200 shadow-xs flex items-center gap-2 overflow-x-auto scrollbar-none">
            <div className="flex items-center gap-1.5 px-3 py-2 text-gray-500 font-bold text-xs uppercase shrink-0">
              <Filter className="w-4 h-4 text-[#3854A4]" />
              <span className="hidden sm:inline">Filter By Event:</span>
            </div>

            <div className="flex items-center gap-2 flex-nowrap">
              {eventNames.map((name) => (
                <button
                  key={name}
                  onClick={() => setSelectedEvent(name)}
                  className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all whitespace-nowrap cursor-pointer ${
                    selectedEvent === name
                      ? 'bg-[#3854A4] text-white shadow-md'
                      : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                  }`}
                >
                  {name === 'ALL' ? 'All Events & Photos' : name}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Gallery Content Area */}
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
              COMING SOON
            </span>
            <h3 className="font-bebas text-3xl sm:text-4xl text-gray-900 tracking-wider">
              OFFICIAL GALLERY UPDATES COMING SOON
            </h3>
            <p className="text-xs sm:text-sm text-gray-600 max-w-md mx-auto leading-relaxed">
              Official photos from North Premier Volleyball League Season 1 events, press conferences, and player trials will be published here by the administration.
            </p>
          </div>
        ) : selectedEvent !== 'ALL' ? (
          /* Single Event View */
          <div className="space-y-6">
            <div className="border-b-2 border-[#3854A4]/20 pb-3 flex items-center justify-between">
              <div>
                <span className="text-xs font-bold uppercase tracking-widest text-[#E82024]">EVENT ALBUM</span>
                <h2 className="font-bebas text-3xl sm:text-4xl text-gray-900 tracking-wider">
                  {selectedEvent}
                </h2>
              </div>
              <span className="text-xs font-bold text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
                {filteredPhotos.length} {filteredPhotos.length === 1 ? 'Photo' : 'Photos'}
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
              {filteredPhotos.map((photo, idx) => (
                <div
                  key={photo.id || idx}
                  onClick={() => setActivePhoto(photo)}
                  className="group bg-white rounded-2xl overflow-hidden border border-gray-200 hover:border-[#3854A4] shadow-xs hover:shadow-xl transition-all duration-300 cursor-pointer flex flex-col"
                >
                  <div className="relative aspect-4/3 overflow-hidden bg-gray-100">
                    <img
                      src={photo.image_url}
                      alt={photo.title || photo.event_name || 'NPVL Event Photo'}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <div className="bg-white/90 text-gray-900 p-2.5 rounded-full shadow-lg">
                        <ZoomIn className="w-5 h-5 text-[#3854A4]" />
                      </div>
                    </div>
                  </div>

                  <div className="p-4 flex-1 flex flex-col justify-between space-y-2">
                    <div>
                      {photo.title ? (
                        <h3 className="font-bold text-sm text-gray-900 line-clamp-1 group-hover:text-[#3854A4] transition-colors">
                          {photo.title}
                        </h3>
                      ) : (
                        <span className="text-[11px] font-bold uppercase tracking-wider text-[#3854A4] bg-blue-50 px-2 py-0.5 rounded-md inline-block">
                          {photo.event_name || 'Event Photo'}
                        </span>
                      )}
                      {photo.caption && (
                        <p className="text-xs text-gray-500 line-clamp-2 mt-1 leading-snug">
                          {photo.caption}
                        </p>
                      )}
                    </div>
                    {photo.date && (
                      <div className="flex items-center gap-1.5 text-[11px] text-gray-400 font-medium pt-1">
                        <Calendar className="w-3.5 h-3.5 text-[#E82024]" />
                        <span>{photo.date}</span>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          /* All Events Grouped View */
          <div className="space-y-12">
            {Object.entries(groupedEvents).map(([eventName, eventPhotos]) => (
              <div key={eventName} className="space-y-5">
                
                {/* Event Heading */}
                <div className="border-b-2 border-gray-200 pb-3 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-2.5 h-7 bg-[#E82024] rounded-full" />
                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-widest text-gray-400 block">EVENT ALBUM</span>
                      <h2 className="font-bebas text-2xl sm:text-3xl text-gray-900 tracking-wider">
                        {eventName}
                      </h2>
                    </div>
                  </div>
                  <button
                    onClick={() => setSelectedEvent(eventName)}
                    className="text-xs font-bold text-[#3854A4] hover:text-[#E82024] transition-colors"
                  >
                    View All ({eventPhotos.length}) →
                  </button>
                </div>

                {/* Photos Grid for this Event */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
                  {eventPhotos.map((photo, idx) => (
                    <div
                      key={photo.id || idx}
                      onClick={() => setActivePhoto(photo)}
                      className="group bg-white rounded-2xl overflow-hidden border border-gray-200 hover:border-[#3854A4] shadow-xs hover:shadow-xl transition-all duration-300 cursor-pointer flex flex-col"
                    >
                      <div className="relative aspect-4/3 overflow-hidden bg-gray-100">
                        <img
                          src={photo.image_url}
                          alt={photo.title || photo.event_name || 'NPVL Event Photo'}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          loading="lazy"
                        />
                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                          <div className="bg-white/90 text-gray-900 p-2.5 rounded-full shadow-lg">
                            <ZoomIn className="w-5 h-5 text-[#3854A4]" />
                          </div>
                        </div>
                      </div>

                      <div className="p-4 flex-1 flex flex-col justify-between space-y-2">
                        <div>
                          {photo.title ? (
                            <h3 className="font-bold text-sm text-gray-900 line-clamp-1 group-hover:text-[#3854A4] transition-colors">
                              {photo.title}
                            </h3>
                          ) : (
                            <span className="text-[11px] font-bold uppercase tracking-wider text-[#3854A4] bg-blue-50 px-2 py-0.5 rounded-md inline-block">
                              {photo.event_name || 'Event Photo'}
                            </span>
                          )}
                          {photo.caption && (
                            <p className="text-xs text-gray-500 line-clamp-2 mt-1 leading-snug">
                              {photo.caption}
                            </p>
                          )}
                        </div>
                        {photo.date && (
                          <div className="flex items-center gap-1.5 text-[11px] text-gray-400 font-medium pt-1">
                            <Calendar className="w-3.5 h-3.5 text-[#E82024]" />
                            <span>{photo.date}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>

              </div>
            ))}
          </div>
        )}

      </div>

      {/* LIGHTBOX MODAL (Same page popup with top close button) */}
      {activePhoto && (
        <div
          onClick={() => setActivePhoto(null)}
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 animate-fadeIn"
        >
          {/* Top Sticky Close Button */}
          <button
            onClick={() => setActivePhoto(null)}
            className="absolute top-4 right-4 z-50 p-2.5 bg-white/20 hover:bg-white text-white hover:text-black rounded-full transition-all cursor-pointer shadow-lg"
            title="Close (ESC)"
          >
            <X className="w-6 h-6" />
          </button>

          {/* Left / Right Navigation */}
          <button
            onClick={handlePrev}
            className="absolute left-3 sm:left-6 z-40 p-2 sm:p-3 bg-white/20 hover:bg-white text-white hover:text-black rounded-full transition-all cursor-pointer"
            title="Previous"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          <button
            onClick={handleNext}
            className="absolute right-3 sm:right-6 z-40 p-2 sm:p-3 bg-white/20 hover:bg-white text-white hover:text-black rounded-full transition-all cursor-pointer"
            title="Next"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Center Content Box */}
          <div
            onClick={(e) => e.stopPropagation()}
            className="max-w-4xl w-full bg-gray-900 border border-white/20 rounded-3xl overflow-hidden shadow-2xl space-y-4"
          >
            <div className="relative max-h-[70vh] flex items-center justify-center bg-black/80">
              <img
                src={activePhoto.image_url}
                alt={activePhoto.title}
                className="max-h-[70vh] w-auto max-w-full object-contain"
              />
            </div>

            <div className="p-5 sm:p-6 text-white space-y-2 border-t border-white/10 bg-gray-900">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#E82024] bg-[#E82024]/10 border border-[#E82024]/30 px-2.5 py-0.5 rounded-full">
                  {activePhoto.event_name || 'General Photos'}
                </span>
                {activePhoto.date && (
                  <span className="text-xs text-gray-400 font-mono">Date: {activePhoto.date}</span>
                )}
              </div>

              {activePhoto.title && (
                <h2 className="font-bebas text-2xl sm:text-3xl tracking-wide text-white">
                  {activePhoto.title}
                </h2>
              )}

              {activePhoto.caption && (
                <p className="text-xs sm:text-sm text-gray-300 leading-relaxed font-sans">
                  {activePhoto.caption}
                </p>
              )}
            </div>
          </div>

        </div>
      )}

    </div>
  );
}
