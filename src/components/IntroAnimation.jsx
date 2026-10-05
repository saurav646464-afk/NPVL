import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function IntroAnimation({ onComplete }) {
  const [stage, setStage] = useState(1);
  const [skipped, setSkipped] = useState(false);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      onComplete();
      return;
    }

    const t1 = setTimeout(() => setStage(2), 300);
    const t2 = setTimeout(() => setStage(3), 900);
    const t3 = setTimeout(() => setStage(4), 1600);
    const t4 = setTimeout(() => setStage(5), 2500);
    const t5 = setTimeout(() => {
      onComplete();
    }, 3100);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
      clearTimeout(t5);
    };
  }, [onComplete]);

  const handleSkip = () => {
    setSkipped(true);
    onComplete();
  };

  if (skipped) return null;

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 bg-white flex flex-col items-center justify-center overflow-hidden pointer-events-auto"
        initial={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.6, ease: "easeInOut" }}
      >
        {/* Step 2: Stadium Atmosphere */}
        {stage >= 2 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.4 }}
            transition={{ duration: 1 }}
            className="absolute inset-0 pointer-events-none"
          >
            <div className="absolute -top-32 left-1/4 w-96 h-96 bg-[#E50914] blur-[140px] rounded-full opacity-20" />
            <div className="absolute -top-32 right-1/4 w-96 h-96 bg-[#E50914] blur-[140px] rounded-full opacity-20" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(229,9,20,0.08)_0,transparent_70%)]" />
          </motion.div>
        )}

        {/* Step 3: Red Line Court Markings SVG Animation */}
        {stage >= 2 && (
          <div className="absolute inset-0 flex items-center justify-center opacity-30 pointer-events-none">
            <svg className="w-[90vw] max-w-4xl h-[60vh]" viewBox="0 0 800 450" fill="none">
              <motion.rect
                x="40" y="40" width="720" height="370"
                stroke="#E50914" strokeWidth="2.5"
                strokeDasharray="2180"
                initial={{ strokeDashoffset: 2180 }}
                animate={{ strokeDashoffset: 0 }}
                transition={{ duration: 1.2, ease: "easeInOut" }}
              />
              <motion.line
                x1="400" y1="40" x2="400" y2="410"
                stroke="#E50914" strokeWidth="3" strokeDasharray="370"
                initial={{ strokeDashoffset: 370 }}
                animate={{ strokeDashoffset: 0 }}
                transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
              />
              <motion.line
                x1="280" y1="40" x2="280" y2="410"
                stroke="#DC2626" strokeWidth="1.5" strokeDasharray="370"
                initial={{ strokeDashoffset: 370 }}
                animate={{ strokeDashoffset: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
              />
              <motion.line
                x1="520" y1="40" x2="520" y2="410"
                stroke="#DC2626" strokeWidth="1.5" strokeDasharray="370"
                initial={{ strokeDashoffset: 370 }}
                animate={{ strokeDashoffset: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
              />
            </svg>
          </div>
        )}

        {/* Step 5: Particles */}
        {stage >= 2 && (
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            {[...Array(16)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-2 h-2 bg-[#E50914] rounded-full blur-[1px]"
                style={{
                  left: `${(i * 13) % 100}%`,
                  top: `${(i * 19) % 100}%`,
                }}
                animate={{
                  y: [0, -40, 0],
                  opacity: [0.2, 0.9, 0.2],
                  scale: [1, 1.4, 1],
                }}
                transition={{
                  duration: 2 + (i % 3),
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: i * 0.1,
                }}
              />
            ))}
          </div>
        )}

        {/* Step 6: Glowing Volleyball Trajectory Sweep */}
        {stage >= 3 && (
          <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 1000 600" preserveAspectRatio="none">
            <motion.path
              d="M 50 500 Q 500 100 950 500"
              fill="none"
              stroke="url(#redGlowGradLight)"
              strokeWidth="5"
              strokeDasharray="1400"
              initial={{ strokeDashoffset: 1400 }}
              animate={{ strokeDashoffset: 0 }}
              transition={{ duration: 0.9, ease: "easeOut" }}
            />
            <defs>
              <linearGradient id="redGlowGradLight" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="transparent" />
                <stop offset="50%" stopColor="#E50914" />
                <stop offset="100%" stopColor="#DC2626" />
              </linearGradient>
            </defs>
          </svg>
        )}

        {/* Step 7, 8, 9: Official Logo, Title & Motto Reveal */}
        <div className="relative z-10 text-center px-4 max-w-3xl">
          {stage >= 4 && (
            <motion.div
              initial={{ scale: 0.7, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.6, type: "spring", stiffness: 120 }}
              className="flex flex-col items-center"
            >
              {/* Official Logo Display */}
              <div className="relative mb-6">
                <div className="absolute inset-0 bg-[#E50914] blur-2xl opacity-30 rounded-full animate-pulse" />
                <img
                  src="/logo.png"
                  alt="NPVL Official Logo"
                  className="h-28 md:h-36 w-auto object-contain relative z-10 filter drop-shadow-xl"
                />
              </div>

              {/* Text: NORTH PREMIER VOLLEYBALL LEAGUE */}
              <motion.h1
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="font-bebas text-4xl md:text-6xl text-gray-900 tracking-wider uppercase leading-none"
              >
                NORTH PREMIER <br />
                <span className="text-[#E50914]">VOLLEYBALL LEAGUE</span>
              </motion.h1>

              {/* Text: INSPIRE. EMPOWER. UNITE. */}
              <motion.p
                initial={{ y: 15, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="font-bebas text-xl md:text-3xl text-gray-800 tracking-[0.25em] uppercase mt-4"
              >
                INSPIRE. <span className="text-[#E50914]">EMPOWER.</span> UNITE.
              </motion.p>
            </motion.div>
          )}
        </div>

        {/* Step 10: Powerful Red Light Sweep Pass */}
        {stage >= 5 && (
          <motion.div
            initial={{ x: "-100%" }}
            animate={{ x: "200%" }}
            transition={{ duration: 0.6, ease: "easeInOut" }}
            className="absolute inset-y-0 w-1/3 bg-gradient-to-r from-transparent via-[#E50914]/40 to-transparent skew-x-12 pointer-events-none"
          />
        )}

        {/* Skip Intro Button */}
        <button
          onClick={handleSkip}
          className="absolute bottom-6 right-6 text-xs text-gray-500 hover:text-gray-900 uppercase tracking-widest font-bold border border-gray-300 hover:border-[#E50914] px-4 py-2 rounded-full bg-white shadow-sm"
        >
          SKIP INTRO ➔
        </button>
      </motion.div>
    </AnimatePresence>
  );
}
