import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface SplashScreenProps {
  onComplete: () => void;
}

const SplashScreen: React.FC<SplashScreenProps> = ({ onComplete }) => {
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    const timers = [
      setTimeout(() => setPhase(1), 500),
      setTimeout(() => setPhase(2), 1500),
      setTimeout(() => setPhase(3), 2500),
      setTimeout(() => onComplete(), 3800),
    ];
    return () => timers.forEach(clearTimeout);
  }, [onComplete]);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.6, ease: 'easeInOut' }}
      className="absolute inset-0 flex flex-col items-center justify-center z-[100] overflow-hidden"
      style={{
        background: 'linear-gradient(180deg, #020010 0%, #050020 50%, #020010 100%)',
      }}
    >
      {/* Animated bg rings */}
      {[1, 2, 3, 4].map((ring) => (
        <motion.div
          key={ring}
          className="absolute rounded-full border"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: ring * 0.8, opacity: 0.15 - ring * 0.03 }}
          transition={{ delay: ring * 0.15, duration: 1, ease: 'easeOut' }}
          style={{
            width: '280px',
            height: '280px',
            borderColor: `rgba(139, 92, 246, ${0.5 - ring * 0.1})`,
            boxShadow: `0 0 ${ring * 15}px rgba(139,92,246,0.2)`,
          }}
        />
      ))}

      {/* Liquid blob */}
      <motion.div
        className="absolute w-48 h-48 animate-liquid"
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 0.15, scale: 1 }}
        transition={{ delay: 0.3, duration: 1 }}
        style={{
          background: 'radial-gradient(circle, #8b5cf6 0%, #ec4899 50%, #06b6d4 100%)',
          filter: 'blur(40px)',
        }}
      />

      {/* Logo */}
      <motion.div
        initial={{ scale: 0, rotate: -20, opacity: 0 }}
        animate={{ scale: 1, rotate: 0, opacity: 1 }}
        transition={{ delay: 0.2, type: 'spring', stiffness: 200, damping: 20 }}
        className="relative mb-6"
      >
        {/* Glow ring around logo */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
          className="absolute inset-0 rounded-3xl"
          style={{
            border: '2px solid transparent',
            background: 'linear-gradient(#050020, #050020) padding-box, linear-gradient(45deg, #8b5cf6, #06b6d4, #ec4899, #8b5cf6) border-box',
            borderRadius: '28px',
          }}
        />

        <div
          className="relative w-24 h-24 rounded-3xl flex items-center justify-center"
          style={{
            background: 'linear-gradient(135deg, #1a0840 0%, #0d051f 100%)',
            border: '1px solid rgba(139,92,246,0.4)',
            boxShadow: '0 0 30px rgba(139,92,246,0.4), inset 0 0 20px rgba(139,92,246,0.1)',
          }}
        >
          <span className="text-4xl">🧮</span>
        </div>
      </motion.div>

      {/* Title */}
      <AnimatePresence>
        {phase >= 1 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-3"
          >
            <h1
              className="text-3xl font-black mb-1"
              style={{
                fontFamily: "'Orbitron', monospace",
                background: 'linear-gradient(135deg, #ffffff 0%, #c084fc 40%, #67e8f9 80%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                filter: 'drop-shadow(0 0 15px rgba(139,92,246,0.5))',
              }}
            >
              PayCalc
            </h1>
            <p
              className="text-sm font-medium"
              style={{ color: 'rgba(167,139,250,0.7)', fontFamily: "'Space Grotesk'" }}
            >
              Pay Before Result™
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Tagline phrases */}
      <AnimatePresence mode="wait">
        {phase === 1 && (
          <motion.p
            key="t1"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="text-xs text-center px-8"
            style={{ color: 'rgba(167,139,250,0.5)', fontFamily: "'Space Grotesk'" }}
          >
            "The world's first premium calculator" 🏆
          </motion.p>
        )}
        {phase === 2 && (
          <motion.p
            key="t2"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="text-xs text-center px-8"
            style={{ color: 'rgba(167,139,250,0.5)', fontFamily: "'Space Grotesk'" }}
          >
            "Math is a service, not a right." 😂
          </motion.p>
        )}
        {phase === 3 && (
          <motion.p
            key="t3"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="text-xs text-center px-8"
            style={{ color: 'rgba(167,139,250,0.5)', fontFamily: "'Space Grotesk'" }}
          >
            Loading Premium Math Algorithms... 🛸
          </motion.p>
        )}
      </AnimatePresence>

      {/* Loading dots */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="flex gap-2 mt-8"
      >
        {[0, 1, 2].map((i) => (
          <motion.div
            key={i}
            animate={{ scale: [1, 1.5, 1], opacity: [0.3, 1, 0.3] }}
            transition={{ duration: 1.2, repeat: Infinity, delay: i * 0.2 }}
            className="w-2 h-2 rounded-full"
            style={{
              background: i === 0 ? '#8b5cf6' : i === 1 ? '#06b6d4' : '#ec4899',
              boxShadow: `0 0 8px ${i === 0 ? '#8b5cf6' : i === 1 ? '#06b6d4' : '#ec4899'}`,
            }}
          />
        ))}
      </motion.div>

      {/* Bottom badge */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="absolute bottom-8 flex items-center gap-2"
      >
        <div
          className="px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5"
          style={{
            background: 'rgba(139,92,246,0.1)',
            border: '1px solid rgba(139,92,246,0.3)',
            color: 'rgba(167,139,250,0.6)',
            fontFamily: "'Space Grotesk'",
            fontSize: '10px',
          }}
        >
          <span>🤖</span>
          <span>Powered by 47 AI Models (Fake)</span>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default SplashScreen;
