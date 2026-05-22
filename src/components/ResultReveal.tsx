import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
// eslint-disable-next-line @typescript-eslint/no-unused-vars

interface ResultRevealProps {
  expression: string;
  result: string;
  onClose: () => void;
}

const coinColors = ['#f59e0b', '#fcd34d', '#fb923c', '#a78bfa', '#34d399'];

const ResultReveal: React.FC<ResultRevealProps> = ({ expression, result, onClose }) => {
  const [coins, setCoins] = useState<{ id: number; x: number; y: number; vx: number; vy: number; rot: number; color: string }[]>([]);
  const [showResult, setShowResult] = useState(false);
  const [showExplosion, setShowExplosion] = useState(false);
  const [tipAmount, setTipAmount] = useState(0);

  useEffect(() => {
    setTimeout(() => {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.4 },
        colors: ['#8b5cf6', '#06b6d4', '#ec4899', '#f59e0b', '#34d399', '#fff'],
        scalar: 0.9,
        gravity: 0.8,
      });
    }, 800);
    setTimeout(() => setShowExplosion(true), 400);
    setTimeout(() => {
      const newCoins = Array.from({ length: 20 }, (_, i) => ({
        id: i,
        x: 50 + (Math.random() - 0.5) * 40,
        y: 50,
        vx: (Math.random() - 0.5) * 300,
        vy: -(Math.random() * 200 + 100),
        rot: Math.random() * 720 - 360,
        color: coinColors[Math.floor(Math.random() * coinColors.length)],
      }));
      setCoins(newCoins);
    }, 500);
    setTimeout(() => setShowResult(true), 800);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="absolute inset-0 flex flex-col items-center justify-center z-50 overflow-hidden"
      style={{
        background: 'radial-gradient(ellipse at center, rgba(10,5,30,0.97) 0%, rgba(0,0,0,0.98) 100%)',
      }}
    >
      {/* Glow burst */}
      <AnimatePresence>
        {showExplosion && (
          <motion.div
            initial={{ scale: 0, opacity: 1 }}
            animate={{ scale: 5, opacity: 0 }}
            transition={{ duration: 1.2, ease: 'easeOut' }}
            className="absolute w-32 h-32 rounded-full"
            style={{
              background: 'radial-gradient(circle, rgba(139,92,246,0.8) 0%, rgba(6,182,212,0.4) 50%, transparent 100%)',
            }}
          />
        )}
      </AnimatePresence>

      {/* Coins */}
      {coins.map((coin) => (
        <motion.div
          key={coin.id}
          initial={{ x: '50%', y: '50%', opacity: 1, rotate: 0, scale: 1 }}
          animate={{
            x: `calc(50% + ${coin.vx}px)`,
            y: `calc(50% + ${coin.vy}px)`,
            opacity: 0,
            rotate: coin.rot,
            scale: 0,
          }}
          transition={{ duration: 1.5, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="absolute w-6 h-6 rounded-full flex items-center justify-center text-sm font-black pointer-events-none"
          style={{
            background: coin.color,
            boxShadow: `0 0 10px ${coin.color}`,
            color: '#000',
            fontSize: '10px',
          }}
        >
          ৳
        </motion.div>
      ))}

      {/* Main content */}
      <div className="relative z-10 w-full px-6 text-center">
        {/* Vault open animation */}
        <motion.div
          initial={{ scale: 0, rotate: -20, opacity: 0 }}
          animate={{ scale: 1, rotate: 0, opacity: 1 }}
          transition={{ type: 'spring', stiffness: 200, damping: 20, delay: 0.2 }}
          className="text-6xl mb-4"
        >
          🏆
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="text-sm font-bold mb-2 uppercase tracking-widest"
          style={{ color: 'rgba(167,139,250,0.7)', fontFamily: "'Space Grotesk'" }}
        >
          🎉 Payment Successful! Result Unlocked
        </motion.p>

        {/* Expression */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-base mb-4"
          style={{ color: 'rgba(167,139,250,0.6)', fontFamily: "'Orbitron', monospace" }}
        >
          {expression}
        </motion.p>

        {/* Big result */}
        <AnimatePresence>
          {showResult && (
            <motion.div
              initial={{ scale: 0, opacity: 0, filter: 'blur(20px)' }}
              animate={{ scale: 1, opacity: 1, filter: 'blur(0px)' }}
              transition={{ type: 'spring', stiffness: 150, damping: 15, delay: 0 }}
              className="relative inline-block mb-6"
            >
              {/* Glow rings */}
              {[1, 2, 3].map((ring) => (
                <motion.div
                  key={ring}
                  initial={{ scale: 1, opacity: 0.8 }}
                  animate={{ scale: 1 + ring * 0.3, opacity: 0 }}
                  transition={{ duration: 1.5, delay: ring * 0.2, repeat: Infinity, repeatDelay: 1 }}
                  className="absolute inset-0 rounded-2xl"
                  style={{
                    border: `2px solid rgba(139,92,246,${0.6 - ring * 0.15})`,
                  }}
                />
              ))}

              <div
                className="relative rounded-3xl px-10 py-6"
                style={{
                  background: 'linear-gradient(135deg, rgba(139,92,246,0.25), rgba(6,182,212,0.2), rgba(236,72,153,0.15))',
                  border: '2px solid rgba(139,92,246,0.6)',
                  boxShadow: '0 0 40px rgba(139,92,246,0.4), 0 0 80px rgba(139,92,246,0.2)',
                }}
              >
                <p
                  className="font-black"
                  style={{
                    fontSize: result.length > 8 ? '40px' : '56px',
                    fontFamily: "'Orbitron', monospace",
                    background: 'linear-gradient(135deg, #ffffff 0%, #c084fc 30%, #67e8f9 60%, #f9a8d4 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    filter: 'drop-shadow(0 0 20px rgba(139,92,246,0.8))',
                  }}
                >
                  {result}
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Funny bottom text */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2 }}
          className="space-y-3"
        >
          <div
            className="rounded-2xl p-3 mx-2"
            style={{ background: 'rgba(139,92,246,0.1)', border: '1px solid rgba(139,92,246,0.25)' }}
          >
            <p className="text-xs" style={{ color: 'rgba(167,139,250,0.7)', fontFamily: "'Space Grotesk'" }}>
              🧠 This answer was computed by 47 AI models, 3 NASA satellites, and one sleep-deprived developer.
            </p>
          </div>

          {/* Tip button */}
          <div className="flex gap-2">
            {[1, 5, 10].map((tip) => (
              <motion.button
                key={tip}
                whileTap={{ scale: 0.92 }}
                onClick={() => setTipAmount(tip)}
                className="flex-1 py-2.5 rounded-xl text-xs font-bold transition-all"
                style={{
                  background: tipAmount === tip
                    ? 'linear-gradient(135deg, #f59e0b, #ef4444)'
                    : 'rgba(245,158,11,0.1)',
                  border: tipAmount === tip ? '1px solid #f59e0b' : '1px solid rgba(245,158,11,0.25)',
                  color: tipAmount === tip ? '#fff' : '#fcd34d',
                  fontFamily: "'Space Grotesk'",
                  boxShadow: tipAmount === tip ? '0 0 15px rgba(245,158,11,0.4)' : 'none',
                }}
              >
                Tip ৳{tip} 💛
              </motion.button>
            ))}
          </div>
          {tipAmount > 0 && (
            <motion.p
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-xs text-center"
              style={{ color: '#fcd34d' }}
            >
              🙏 Thank you! The developer can eat today!
            </motion.p>
          )}

          <motion.button
            onClick={onClose}
            whileTap={{ scale: 0.96 }}
            className="w-full py-4 rounded-2xl font-black text-sm mt-2"
            style={{
              background: 'linear-gradient(135deg, #8b5cf6, #ec4899)',
              color: '#fff',
              border: '1px solid rgba(139,92,246,0.8)',
              boxShadow: '0 0 20px rgba(139,92,246,0.4)',
              fontFamily: "'Orbitron', monospace",
              letterSpacing: '2px',
            }}
          >
            🔢 CALCULATE MORE (COSTS MORE)
          </motion.button>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default ResultReveal;
