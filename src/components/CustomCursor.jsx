import React, { useEffect, useState } from 'react';

export default function CustomCursor() {
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [isHovered, setIsHovered] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e) => {
      setPos({ x: e.clientX, y: e.clientY });
      if (!isVisible) setIsVisible(true);

      const target = e.target;
      const isInteractive = target.closest('a, button, input, select, textarea, .interactive-cursor, [role="button"]');
      setIsHovered(!!isInteractive);
    };

    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
    };
  }, [isVisible]);

  if (!isVisible) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-50 overflow-hidden hidden lg:block">
      {/* Primary Dot */}
      <div
        className="fixed w-3 h-3 bg-[#E82024] rounded-full -translate-x-1/2 -translate-y-1/2 transition-transform duration-75 ease-out shadow-[0_0_12px_#E82024]"
        style={{
          left: `${pos.x}px`,
          top: `${pos.y}px`,
          transform: `translate(-50%, -50%) scale(${isHovered ? 1.5 : 1})`
        }}
      />
      {/* Secondary Outer Ring */}
      <div
        className="fixed w-9 h-9 border border-[#3854A4]/50 rounded-full -translate-x-1/2 -translate-y-1/2 transition-all duration-300 ease-out"
        style={{
          left: `${pos.x}px`,
          top: `${pos.y}px`,
          transform: `translate(-50%, -50%) scale(${isHovered ? 1.8 : 1})`,
          backgroundColor: isHovered ? 'rgba(56, 84, 164, 0.2)' : 'transparent',
          borderColor: isHovered ? '#3854A4' : 'rgba(56, 84, 164, 0.4)'
        }}
      />
    </div>
  );
}
