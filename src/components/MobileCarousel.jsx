import React, { useRef, useState, useCallback } from 'react';

/**
 * MobileCarousel
 * - Mobile (<md): horizontal snap carousel, exactly ONE card visible at a time, with dot indicators
 * - Desktop (md+): regular CSS grid via `desktopClass` prop
 */
export default function MobileCarousel({ children, desktopClass = 'md:grid-cols-3' }) {
  const items = React.Children.toArray(children);
  const trackRef = useRef(null);
  const [active, setActive] = useState(0);

  const onScroll = useCallback(() => {
    if (!trackRef.current) return;
    const el = trackRef.current;
    // Each card is exactly el.clientWidth wide (full container)
    const idx = Math.round(el.scrollLeft / el.clientWidth);
    setActive(Math.min(Math.max(idx, 0), items.length - 1));
  }, [items.length]);

  const goTo = (idx) => {
    if (!trackRef.current) return;
    trackRef.current.scrollTo({ left: trackRef.current.clientWidth * idx, behavior: 'smooth' });
    setActive(idx);
  };

  return (
    <>
      {/* ── MOBILE: one-at-a-time snap carousel ── */}
      <div className="md:hidden">
        {/* Scroll track — each card is w-full (100% of this container) */}
        <div
          ref={trackRef}
          onScroll={onScroll}
          className="flex overflow-x-auto snap-x snap-mandatory pb-2"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none', WebkitOverflowScrolling: 'touch' }}
        >
          {items.map((child, idx) => (
            <div
              key={idx}
              className="snap-start shrink-0 w-full px-0.5"
            >
              {child}
            </div>
          ))}
        </div>

        {/* Dot indicators */}
        {items.length > 1 && (
          <div className="flex justify-center gap-1.5 mt-4">
            {items.map((_, idx) => (
              <button
                key={idx}
                onClick={() => goTo(idx)}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  idx === active ? 'w-6 bg-[#E50914]' : 'w-1.5 bg-gray-300'
                }`}
                aria-label={`Slide ${idx + 1}`}
              />
            ))}
          </div>
        )}
      </div>

      {/* ── DESKTOP: regular grid ── */}
      <div className={`hidden md:grid gap-6 ${desktopClass}`}>
        {children}
      </div>
    </>
  );
}
