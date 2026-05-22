import React, { useState } from 'react';
import { motion } from 'framer-motion';

interface CalcButtonProps {
  label: string;
  onClick: () => void;
  type?: 'number' | 'operator' | 'equals' | 'special' | 'clear';
  wide?: boolean;
  disabled?: boolean;
}

const CalcButton: React.FC<CalcButtonProps> = ({ label, onClick, type = 'number', wide = false, disabled = false }) => {
  const [ripples, setRipples] = useState<{ id: number; x: number; y: number }[]>([]);

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (disabled) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const id = Date.now();
    setRipples((prev) => [...prev, { id, x, y }]);
    setTimeout(() => setRipples((prev) => prev.filter((r) => r.id !== id)), 700);
    onClick();
  };

  const getStyles = () => {
    switch (type) {
      case 'equals':
        return {
          background: 'linear-gradient(135deg, #8b5cf6 0%, #6d28d9 50%, #ec4899 100%)',
          boxShadow: '0 0 20px rgba(139,92,246,0.5), 0 0 40px rgba(139,92,246,0.2), inset 0 1px 0 rgba(255,255,255,0.2)',
          color: '#ffffff',
          border: '1.5px solid rgba(139,92,246,0.9)',
        };
      case 'operator':
        return {
          background: 'rgba(6,182,212,0.15)',
          boxShadow: '0 0 15px rgba(6,182,212,0.3), inset 0 1px 0 rgba(255,255,255,0.1)',
          color: '#67e8f9',
          border: '1.5px solid rgba(6,182,212,0.5)',
        };
      case 'clear':
        return {
          background: 'rgba(239,68,68,0.15)',
          boxShadow: '0 0 15px rgba(239,68,68,0.3), inset 0 1px 0 rgba(255,255,255,0.1)',
          color: '#fca5a5',
          border: '1.5px solid rgba(239,68,68,0.5)',
        };
      case 'special':
        return {
          background: 'rgba(245,158,11,0.15)',
          boxShadow: '0 0 15px rgba(245,158,11,0.3), inset 0 1px 0 rgba(255,255,255,0.1)',
          color: '#fcd34d',
          border: '1.5px solid rgba(245,158,11,0.5)',
        };
      default:
        return {
          background: 'rgba(255,255,255,0.08)',
          boxShadow: '0 0 12px rgba(139,92,246,0.15), inset 0 1px 0 rgba(255,255,255,0.1)',
          color: '#e2e8f0',
          border: '1.5px solid rgba(255,255,255,0.2)',
        };
    }
  };

  const styles = getStyles();

  return (
    <motion.button
      onClick={handleClick}
      disabled={disabled}
      whileTap={{ scale: 0.88 }}
      whileHover={{ scale: 1.03, y: -1 }}
      transition={{ type: 'spring', stiffness: 500, damping: 25 }}
      className={`relative overflow-hidden rounded-2xl font-bold select-none aspect-square flex items-center justify-center ${wide ? 'col-span-2' : ''}`}
      style={{
        ...styles,
        fontSize: type === 'equals' ? 'clamp(20px, 5vw, 28px)' : ['÷', '×', '−', '+'].includes(label) ? 'clamp(18px, 4vw, 24px)' : 'clamp(14px, 3.5vw, 20px)',
        fontFamily: ['÷', '×', '−', '+', '='].includes(label) ? "'Space Grotesk', sans-serif" : "'Orbitron', monospace",
        cursor: disabled ? 'not-allowed' : 'pointer',
        opacity: disabled ? 0.5 : 1,
        backdropFilter: 'blur(10px)',
        WebkitBackdropFilter: 'blur(10px)',
        letterSpacing: type === 'number' ? '1px' : '0',
      }}
    >
      {/* Ripple effects */}
      {ripples.map((ripple) => (
        <span
          key={ripple.id}
          className="absolute rounded-full pointer-events-none"
          style={{
            left: ripple.x - 10,
            top: ripple.y - 10,
            width: 20,
            height: 20,
            background:
              type === 'equals'
                ? 'rgba(255,255,255,0.4)'
                : type === 'operator'
                  ? 'rgba(6,182,212,0.5)'
                  : 'rgba(139,92,246,0.4)',
            animation: 'glowBurst 0.7s ease-out forwards',
            transform: 'scale(0)',
          }}
        />
      ))}

      {/* Hover shimmer */}
      <div
        className="absolute inset-0 opacity-0 hover:opacity-100 transition-opacity duration-300"
        style={{
          background: 'linear-gradient(135deg, rgba(255,255,255,0.05) 0%, transparent 100%)',
        }}
      />

      {/* Top highlight */}
      <div
        className="absolute top-0 left-4 right-4 h-px"
        style={{ background: 'rgba(255,255,255,0.2)' }}
      />

      <span className="relative z-10">{label}</span>

      {/* Equals button pulse ring */}
      {type === 'equals' && (
        <div
          className="absolute inset-0 rounded-2xl animate-neon-pulse"
          style={{ opacity: 0.3 }}
        />
      )}
    </motion.button>
  );
};

export default CalcButton;
