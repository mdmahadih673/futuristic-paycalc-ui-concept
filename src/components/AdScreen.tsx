import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface AdScreenProps {
  onComplete: () => void;
  onSkip: () => void;
}

const adContent = [
  {
    emoji: '🍔',
    brand: 'BurgerKing',
    headline: 'Have it Your Way',
    sub: '(You clearly can\'t have math your way)',
    color: '#f59e0b',
  },
  {
    emoji: '📱',
    brand: 'PhoneHouse',
    headline: 'New Phone Dropped!',
    sub: 'Your calculator is free but your phone isn\'t',
    color: '#06b6d4',
  },
  {
    emoji: '💊',
    brand: 'MathPain™',
    headline: 'Math Headache?',
    sub: 'Try our new Premium Calculator Plan!',
    color: '#ec4899',
  },
];

const AdScreen: React.FC<AdScreenProps> = ({ onComplete, onSkip }) => {
  const [countdown, setCountdown] = useState(30);
  const [canSkip, setCanSkip] = useState(false);
  const [currentAd] = useState(() => adContent[Math.floor(Math.random() * adContent.length)]);
  const [progress, setProgress] = useState(0);
  const [funnyPhase, setFunnyPhase] = useState(0);

  const funnyTexts = [
    'Loading ad... buffering... almost...',
    'Showing you things you never asked for...',
    'This is your fault for not paying...',
    'Almost done making you suffer...',
    'Final 10 seconds of punishment...',
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCountdown((prev) => {
        const next = prev - 1;
        setProgress(((30 - next) / 30) * 100);
        if (next <= 25) setFunnyPhase(1);
        if (next <= 18) setFunnyPhase(2);
        if (next <= 12) setFunnyPhase(3);
        if (next <= 8) setFunnyPhase(4);
        if (next <= 0) {
          clearInterval(interval);
          onComplete();
          return 0;
        }
        return next;
      });
    }, 1000);

    setTimeout(() => setCanSkip(true), 5000);

    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="absolute inset-0 flex flex-col z-50 overflow-hidden"
      style={{ background: '#000' }}
    >
      {/* Ad label */}
      <div className="flex items-center justify-between px-4 pt-12 pb-2">
        <div
          className="px-2 py-1 rounded-md text-xs font-bold"
          style={{
            background: 'rgba(239,68,68,0.2)',
            border: '1px solid rgba(239,68,68,0.4)',
            color: '#fca5a5',
            fontFamily: "'Space Grotesk'",
          }}
        >
          📢 AD
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs" style={{ color: 'rgba(167,139,250,0.6)', fontFamily: "'Space Grotesk'" }}>
            {funnyTexts[funnyPhase]}
          </span>
        </div>
      </div>

      {/* Main ad content */}
      <div className="flex-1 flex flex-col items-center justify-center px-6 relative">
        {/* Fake ad graphic */}
        <motion.div
          animate={{
            scale: [1, 1.02, 1],
            rotate: [0, 1, -1, 0],
          }}
          transition={{ duration: 3, repeat: Infinity }}
          className="w-full rounded-3xl overflow-hidden relative mb-4"
          style={{
            background: `linear-gradient(135deg, ${currentAd.color}30, rgba(0,0,0,0.8))`,
            border: `2px solid ${currentAd.color}60`,
            boxShadow: `0 0 30px ${currentAd.color}40`,
            minHeight: '280px',
          }}
        >
          <div className="p-8 text-center flex flex-col items-center justify-center min-h-64">
            <motion.div
              animate={{ y: [0, -10, 0], rotate: [0, 10, -10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="text-7xl mb-4"
            >
              {currentAd.emoji}
            </motion.div>
            <p
              className="text-xs font-black uppercase tracking-widest mb-2"
              style={{ color: currentAd.color, fontFamily: "'Orbitron', monospace", fontSize: '10px' }}
            >
              SPONSORED BY {currentAd.brand}
            </p>
            <h2
              className="text-3xl font-black mb-2"
              style={{
                color: '#fff',
                fontFamily: "'Orbitron', monospace",
                textShadow: `0 0 20px ${currentAd.color}`,
              }}
            >
              {currentAd.headline}
            </h2>
            <p className="text-sm" style={{ color: 'rgba(200,200,220,0.7)', fontFamily: "'Space Grotesk'" }}>
              {currentAd.sub}
            </p>

            {/* Fake price tag */}
            <motion.div
              animate={{ rotate: [-5, 5, -5] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="absolute top-4 right-4 w-14 h-14 rounded-full flex flex-col items-center justify-center"
              style={{
                background: 'linear-gradient(135deg, #ef4444, #dc2626)',
                boxShadow: '0 0 15px rgba(239,68,68,0.5)',
              }}
            >
              <span className="text-xs font-black text-white leading-tight" style={{ fontFamily: "'Orbitron'", fontSize: '8px' }}>
                ONLY
              </span>
              <span className="text-sm font-black text-white" style={{ fontFamily: "'Orbitron'" }}>৳99</span>
            </motion.div>
          </div>
        </motion.div>

        {/* Punishment text */}
        <motion.p
          key={funnyPhase}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-xs text-center mb-4"
          style={{ color: 'rgba(167,139,250,0.6)', fontFamily: "'Space Grotesk'" }}
        >
          {funnyPhase === 0 && "😔 This is what happens when you don't pay..."}
          {funnyPhase === 1 && "🎯 Still watching? Wow, you're really committed to free math."}
          {funnyPhase === 2 && "💀 Halfway through! The developer is proud of you."}
          {funnyPhase === 3 && "🏃 Almost free! Just a few more seconds of pain."}
          {funnyPhase === 4 && "🎉 Final stretch! Your math freedom approaches!"}
        </motion.p>
      </div>

      {/* Progress & controls */}
      <div className="px-5 pb-12">
        {/* Progress bar */}
        <div className="w-full h-1.5 rounded-full mb-4 overflow-hidden" style={{ background: 'rgba(255,255,255,0.1)' }}>
          <motion.div
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.5 }}
            className="h-full rounded-full"
            style={{
              background: `linear-gradient(90deg, ${currentAd.color}, #8b5cf6)`,
              boxShadow: `0 0 10px ${currentAd.color}`,
            }}
          />
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 1, repeat: Infinity }}
              className="w-2 h-2 rounded-full"
              style={{ background: '#ef4444', boxShadow: '0 0 6px #ef4444' }}
            />
            <span className="text-sm font-bold" style={{ color: '#fca5a5', fontFamily: "'Orbitron', monospace" }}>
              {countdown}s
            </span>
          </div>

          <motion.button
            onClick={canSkip ? onSkip : undefined}
            whileTap={canSkip ? { scale: 0.95 } : {}}
            className="px-4 py-2 rounded-xl text-sm font-bold transition-all"
            style={{
              background: canSkip
                ? 'linear-gradient(135deg, #8b5cf6, #ec4899)'
                : 'rgba(255,255,255,0.05)',
              color: canSkip ? '#fff' : 'rgba(107,114,128,0.5)',
              border: canSkip ? '1px solid rgba(139,92,246,0.8)' : '1px solid rgba(255,255,255,0.1)',
              cursor: canSkip ? 'pointer' : 'not-allowed',
              fontFamily: "'Space Grotesk'",
              boxShadow: canSkip ? '0 0 15px rgba(139,92,246,0.4)' : 'none',
            }}
          >
            {canSkip ? '⚡ Skip Ad' : `Skip in ${Math.max(0, 5 - (30 - countdown))}s`}
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
};

export default AdScreen;
