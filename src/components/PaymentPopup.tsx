import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Play } from 'lucide-react';

interface PaymentPopupProps {
  price: number;
  operation: string;
  onPay: (method: string) => void;
  onWatchAd: () => void;
  onClose: () => void;
  funnyReason: string;
}

const paymentMethods = [
  { id: 'bkash', label: 'bKash', icon: '📱', color: '#e2136e', gradient: 'linear-gradient(135deg, #e2136e, #ff4d97)' },
  { id: 'nagad', label: 'Nagad', icon: '💳', color: '#f7941d', gradient: 'linear-gradient(135deg, #f7941d, #ff6b00)' },
  { id: 'card', label: 'Card', icon: '💎', color: '#06b6d4', gradient: 'linear-gradient(135deg, #06b6d4, #8b5cf6)' },
  { id: 'crypto', label: 'Crypto', icon: '₿', color: '#f59e0b', gradient: 'linear-gradient(135deg, #f59e0b, #ef4444)' },
];

const funnyLines = [
  "Servers in Bangladesh are expensive 😅",
  "My electricity bill is due next week",
  "The numbers need emotional support",
  "Math teachers need salaries too",
  "Inflation hit the calculator market",
  "We accept vibes, but prefer money",
];

const PaymentPopup: React.FC<PaymentPopupProps> = ({ price, operation, onPay, onWatchAd, onClose, funnyReason }) => {
  const [selectedMethod, setSelectedMethod] = useState<string | null>(null);
  const [isPaying, setIsPaying] = useState(false);
  const [randomLine] = useState(() => funnyLines[Math.floor(Math.random() * funnyLines.length)]);

  const handlePay = async () => {
    if (!selectedMethod) return;
    setIsPaying(true);
    setTimeout(() => {
      onPay(selectedMethod);
    }, 2000);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="absolute inset-0 flex items-end z-50"
      style={{ background: 'rgba(0,0,0,0.8)', backdropFilter: 'blur(8px)' }}
    >
      <motion.div
        initial={{ y: '100%', opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: '100%', opacity: 0 }}
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        className="w-full relative overflow-hidden"
        style={{
          background: 'linear-gradient(180deg, rgba(15,8,40,0.98) 0%, rgba(5,5,20,0.98) 100%)',
          border: '1px solid rgba(139,92,246,0.4)',
          borderBottom: 'none',
          borderRadius: '32px 32px 0 0',
          boxShadow: '0 -20px 60px rgba(139,92,246,0.25)',
        }}
      >
        {/* Drag handle */}
        <div className="flex justify-center pt-4 pb-2">
          <div className="w-12 h-1 rounded-full" style={{ background: 'rgba(139,92,246,0.4)' }} />
        </div>

        {/* Header glow line */}
        <div
          className="absolute top-0 left-0 right-0 h-0.5"
          style={{ background: 'linear-gradient(90deg, transparent, #8b5cf6, #06b6d4, #ec4899, transparent)' }}
        />

        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 w-8 h-8 rounded-full flex items-center justify-center transition-all hover:scale-110"
          style={{ background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.15)' }}
        >
          <X size={14} color="#a0aec0" />
        </button>

        <div className="px-5 pb-6">
          {/* Lock icon + title */}
          <div className="text-center mb-4">
            <motion.div
              animate={{ rotate: [0, -10, 10, -5, 0], scale: [1, 1.2, 1] }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="text-4xl mb-2 inline-block"
            >
              🔒
            </motion.div>
            <h2
              className="text-xl font-black mb-1"
              style={{
                fontFamily: "'Orbitron', monospace",
                background: 'linear-gradient(90deg, #c084fc, #67e8f9)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              RESULT LOCKED
            </h2>
            <p className="text-sm" style={{ color: 'rgba(167,139,250,0.8)' }}>
              {funnyReason}
            </p>
          </div>

          {/* Price card */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="rounded-2xl p-4 mb-4 text-center relative overflow-hidden"
            style={{
              background: 'linear-gradient(135deg, rgba(139,92,246,0.2), rgba(6,182,212,0.15))',
              border: '1px solid rgba(139,92,246,0.4)',
            }}
          >
            <div className="absolute inset-0 animate-shimmer" />
            <div className="flex items-center justify-center gap-3 relative z-10">
              <div>
                <p className="text-xs mb-0.5" style={{ color: 'rgba(167,139,250,0.6)', fontFamily: "'Space Grotesk'" }}>
                  {operation} calculation fee
                </p>
                <p
                  className="text-4xl font-black"
                  style={{
                    fontFamily: "'Orbitron', monospace",
                    background: 'linear-gradient(90deg, #fcd34d, #f59e0b)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    filter: 'drop-shadow(0 0 10px rgba(245,158,11,0.5))',
                  }}
                >
                  ৳{price}
                </p>
                <p className="text-xs mt-0.5" style={{ color: 'rgba(167,139,250,0.5)' }}>
                  {randomLine}
                </p>
              </div>
            </div>
          </motion.div>

          {/* Payment methods */}
          <p className="text-xs font-bold mb-2 uppercase tracking-widest" style={{ color: 'rgba(167,139,250,0.5)' }}>
            Choose Payment Method
          </p>
          <div className="grid grid-cols-4 gap-2 mb-3">
            {paymentMethods.map((method, i) => (
              <motion.button
                key={method.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * i + 0.3 }}
                onClick={() => setSelectedMethod(method.id)}
                whileTap={{ scale: 0.92 }}
                className="flex flex-col items-center justify-center py-3 px-2 rounded-xl relative overflow-hidden transition-all"
                style={{
                  background: selectedMethod === method.id
                    ? method.gradient
                    : 'rgba(255,255,255,0.05)',
                  border: selectedMethod === method.id
                    ? `2px solid ${method.color}`
                    : '1px solid rgba(255,255,255,0.1)',
                  boxShadow: selectedMethod === method.id
                    ? `0 0 20px ${method.color}60, 0 0 40px ${method.color}30`
                    : 'none',
                }}
              >
                <span className="text-xl">{method.icon}</span>
                <span className="text-xs font-bold mt-1" style={{ color: selectedMethod === method.id ? '#fff' : 'rgba(200,200,220,0.7)', fontFamily: "'Space Grotesk'" }}>
                  {method.label}
                </span>
                {selectedMethod === method.id && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute top-1 right-1 w-3 h-3 rounded-full bg-white flex items-center justify-center"
                  >
                    <div className="w-1.5 h-1.5 rounded-full" style={{ background: method.color }} />
                  </motion.div>
                )}
              </motion.button>
            ))}
          </div>

          {/* Pay button */}
          <AnimatePresence mode="wait">
            {!isPaying ? (
              <motion.button
                key="pay-btn"
                onClick={handlePay}
                disabled={!selectedMethod}
                whileTap={{ scale: 0.96 }}
                className="w-full py-4 rounded-2xl font-black text-base mb-3 relative overflow-hidden transition-all"
                style={{
                  background: selectedMethod
                    ? 'linear-gradient(135deg, #8b5cf6, #6d28d9, #ec4899)'
                    : 'rgba(100,100,120,0.3)',
                  color: '#fff',
                  border: selectedMethod ? '1px solid rgba(139,92,246,0.8)' : '1px solid rgba(255,255,255,0.1)',
                  boxShadow: selectedMethod ? '0 0 30px rgba(139,92,246,0.4)' : 'none',
                  fontFamily: "'Orbitron', monospace",
                  fontSize: '13px',
                  letterSpacing: '2px',
                  cursor: selectedMethod ? 'pointer' : 'not-allowed',
                }}
              >
                {selectedMethod && <div className="absolute inset-0 animate-shimmer" />}
                <span className="relative z-10">
                  {selectedMethod ? `💳 PAY ৳${price} NOW` : 'SELECT PAYMENT METHOD'}
                </span>
              </motion.button>
            ) : (
              <motion.div
                key="paying"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="w-full py-4 rounded-2xl mb-3 flex items-center justify-center gap-3"
                style={{
                  background: 'linear-gradient(135deg, rgba(139,92,246,0.3), rgba(6,182,212,0.3))',
                  border: '1px solid rgba(139,92,246,0.5)',
                }}
              >
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 0.8, repeat: Infinity, ease: 'linear' }}
                  className="w-5 h-5 rounded-full border-2 border-purple-400 border-t-transparent"
                />
                <span className="text-purple-300 font-bold text-sm" style={{ fontFamily: "'Space Grotesk'" }}>
                  Processing your wallet damage...
                </span>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Watch ad button */}
          <motion.button
            onClick={onWatchAd}
            whileTap={{ scale: 0.96 }}
            className="w-full py-3 rounded-2xl font-bold text-sm flex items-center justify-center gap-2 transition-all hover:bg-white/10"
            style={{
              background: 'rgba(255,255,255,0.05)',
              border: '1px solid rgba(255,255,255,0.12)',
              color: 'rgba(167,139,250,0.8)',
              fontFamily: "'Space Grotesk', sans-serif",
            }}
          >
            <Play size={14} />
            Watch 30-sec Ad Instead (Free but painful)
          </motion.button>

          {/* Funny small print */}
          <p className="text-center mt-3 text-xs" style={{ color: 'rgba(100,100,120,0.6)' }}>
            🔐 256-bit encryption • Your math is safe with us<br />
            <span style={{ fontSize: '10px' }}>*No refunds. Math is hard for everyone.</span>
          </p>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default PaymentPopup;
