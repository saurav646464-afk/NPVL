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
    const t4 = setTimeout(() => setStage(5), 2900);
    const t5 = setTimeout(() => {
      onComplete();
    }, 3600);

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
        className="fixed inset-0 z-50 bg-white flex flex-col items-center justify-center overflow-hidden pointer-events-auto select-none"
        initial={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.6, ease: "easeInOut" }}
      >
        {/* Step 2: Stadium Atmosphere & Glow */}
        {stage >= 2 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.45 }}
            transition={{ duration: 1 }}
            className="absolute inset-0 pointer-events-none"
          >
            <div className="absolute -top-32 left-1/4 w-96 h-96 bg-[#3854A4] blur-[140px] rounded-full opacity-25" />
            <div className="absolute -top-32 right-1/4 w-96 h-96 bg-[#E82024] blur-[140px] rounded-full opacity-25" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(56,84,164,0.08)_0,transparent_70%)]" />
          </motion.div>
        )}

        {/* Step 3: Dual-Tone Court Markings SVG Animation */}
        {stage >= 2 && (
          <div className="absolute inset-0 flex items-center justify-center opacity-30 pointer-events-none">
            <svg className="w-[90vw] max-w-4xl h-[60vh]" viewBox="0 0 800 450" fill="none">
              <motion.rect
                x="40" y="40" width="720" height="370"
                stroke="#3854A4" strokeWidth="2.5"
                strokeDasharray="2180"
                initial={{ strokeDashoffset: 2180 }}
                animate={{ strokeDashoffset: 0 }}
                transition={{ duration: 1.2, ease: "easeInOut" }}
              />
              <motion.line
                x1="400" y1="40" x2="400" y2="410"
                stroke="#E82024" strokeWidth="3" strokeDasharray="370"
                initial={{ strokeDashoffset: 370 }}
                animate={{ strokeDashoffset: 0 }}
                transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
              />
              <motion.line
                x1="280" y1="40" x2="280" y2="410"
                stroke="#3854A4" strokeWidth="1.5" strokeDasharray="370"
                initial={{ strokeDashoffset: 370 }}
                animate={{ strokeDashoffset: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
              />
              <motion.line
                x1="520" y1="40" x2="520" y2="410"
                stroke="#3854A4" strokeWidth="1.5" strokeDasharray="370"
                initial={{ strokeDashoffset: 370 }}
                animate={{ strokeDashoffset: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
              />
            </svg>
          </div>
        )}

        {/* Step 5: Dual-Tone Energy Particles */}
        {stage >= 2 && (
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            {[...Array(16)].map((_, i) => (
              <motion.div
                key={i}
                className={`absolute w-2 h-2 rounded-full blur-[1px] ${
                  i % 2 === 0 ? 'bg-[#3854A4]' : 'bg-[#E82024]'
                }`}
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
              stroke="url(#brandGlowGradLight)"
              strokeWidth="5"
              strokeDasharray="1400"
              initial={{ strokeDashoffset: 1400 }}
              animate={{ strokeDashoffset: 0 }}
              transition={{ duration: 0.9, ease: "easeOut" }}
            />
            <defs>
              <linearGradient id="brandGlowGradLight" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="transparent" />
                <stop offset="35%" stopColor="#3854A4" />
                <stop offset="65%" stopColor="#E82024" />
                <stop offset="100%" stopColor="#DC2626" />
              </linearGradient>
            </defs>
          </svg>
        )}

        {/* Step 7: Official NPVL Logo Reveal (Only Logo) */}
        <div className="relative z-10 flex flex-col items-center justify-center px-4 w-full">
          {stage >= 4 && (
            <motion.div
              initial={{ scale: 0.6, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.7, type: "spring", stiffness: 100 }}
              className="relative flex items-center justify-center"
            >
              {/* Dual ambient glow behind logo */}
              <div className="absolute inset-0 bg-[#3854A4] blur-3xl opacity-30 rounded-full scale-125 pointer-events-none" />
              <div className="absolute inset-0 bg-[#E82024] blur-2xl opacity-20 rounded-full scale-90 pointer-events-none" />
              <img
                src="/logo.png"
                alt="NPVL Official Logo"
                className="h-36 sm:h-48 md:h-56 w-auto object-contain relative z-10 filter drop-shadow-2xl"
              />
            </motion.div>
          )}
        </div>

        {/* Step 10: Powerful Dual-Tone Sweep Pass */}
        {stage >= 5 && (
          <motion.div
            initial={{ x: "-100%" }}
            animate={{ x: "200%" }}
            transition={{ duration: 0.6, ease: "easeInOut" }}
            className="absolute inset-y-0 w-1/3 bg-gradient-to-r from-transparent via-[#3854A4]/30 to-[#E82024]/20 skew-x-12 pointer-events-none"
          />
        )}

      </motion.div>
    </AnimatePresence>
  );
}
