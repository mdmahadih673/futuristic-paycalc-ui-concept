import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface CalcDisplayProps {
  expression: string;
  currentValue: string;
  isLocked: boolean;
  isProcessing: boolean;
  processingText: string;
}

const CalcDisplay: React.FC<CalcDisplayProps> = ({
  expression,
  currentValue,
  isLocked,
  isProcessing,
  processingText,
}) => {
  const fontSize =
    currentValue.length > 10 ? 'text-3xl' : currentValue.length > 7 ? 'text-4xl' : 'text-5xl';

  return (
    <div
      className="relative mx-4 rounded-3xl p-5 overflow-hidden"
      style={{
        background: 'rgba(10, 8, 25, 0.8)',
        border: '1px solid rgba(139, 92, 246, 0.3)',
        boxShadow: '0 0 30px rgba(139, 92, 246, 0.15), inset 0 0 30px rgba(0,0,0,0.5)',
        minHeight: '140px',
      }}
    >
      {/* Inner glow */}
      <div
        className="absolute top-0 right-0 w-32 h-32 rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(139,92,246,0.1) 0%, transparent 70%)' }}
      />

      {/* Expression */}
      <div className="text-right mb-2 min-h-6">
        <AnimatePresence mode="popLayout">
          <motion.p
            key={expression}
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-sm font-medium tracking-wider truncate"
            style={{ color: 'rgba(167, 139, 250, 0.7)', fontFamily: "'Orbitron', monospace" }}
          >
            {expression || '\u00A0'}
          </motion.p>
        </AnimatePresence>
      </div>

      {/* Main number display */}
      <div className="text-right relative min-h-16 flex items-end justify-end">
        <AnimatePresence mode="popLayout">
          {isProcessing ? (
            <motion.div
              key="processing"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="w-full"
            >
              <p
                className="text-base font-bold mb-2 animate-text-glow"
                style={{ color: '#c084fc', fontFamily: "'Space Grotesk', sans-serif" }}
              >
                ⚡ {processingText}
              </p>
              <div className="w-full h-1.5 rounded-full overflow-hidden" style={{ background: 'rgba(139,92,246,0.2)' }}>
                <div
                  className="h-full rounded-full animate-loading-bar"
                  style={{
                    background: 'linear-gradient(90deg, #8b5cf6, #06b6d4, #ec4899)',
                    boxShadow: '0 0 10px #8b5cf6',
                  }}
                />
              </div>
              <p className="text-xs mt-1.5" style={{ color: 'rgba(167,139,250,0.5)', fontFamily: "'Space Grotesk'" }}>
                Calculating using NASA servers... 🚀
              </p>
            </motion.div>
          ) : isLocked ? (
            <motion.div
              key="locked"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex items-center gap-3"
            >
              <motion.div
                animate={{ rotate: [0, -5, 5, -5, 0], scale: [1, 1.1, 1] }}
                transition={{ repeat: Infinity, duration: 2 }}
                className="text-3xl"
              >
                🔒
              </motion.div>
              <div>
                <p
                  className="font-black"
                  style={{
                    fontSize: '22px',
                    fontFamily: "'Orbitron', monospace",
                    background: 'linear-gradient(90deg, #8b5cf6, #ec4899)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                  }}
                >
                  RESULT LOCKED
                </p>
                <p className="text-xs" style={{ color: 'rgba(167,139,250,0.6)' }}>
                  Pay to unlock your math 💸
                </p>
              </div>
            </motion.div>
          ) : (
            <motion.span
              key={currentValue}
              initial={{ opacity: 0, y: 15, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -15, scale: 0.95 }}
              transition={{ type: 'spring', stiffness: 400, damping: 30 }}
              className={`font-black ${fontSize} tracking-tight`}
              style={{
                fontFamily: "'Orbitron', monospace",
                background: 'linear-gradient(135deg, #e2d9ff 0%, #c084fc 50%, #67e8f9 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                filter: 'drop-shadow(0 0 8px rgba(139,92,246,0.5))',
              }}
            >
              {currentValue || '0'}
            </motion.span>
          )}
        </AnimatePresence>
      </div>

      {/* Bottom accent line */}
      <div
        className="absolute bottom-0 left-0 right-0 h-0.5"
        style={{
          background: 'linear-gradient(90deg, transparent, #8b5cf6, #06b6d4, #ec4899, transparent)',
        }}
      />
    </div>
  );
};

export default CalcDisplay;
