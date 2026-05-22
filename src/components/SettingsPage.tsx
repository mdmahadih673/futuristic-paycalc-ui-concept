import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Volume2, Zap, Brain, Palette, Cpu } from 'lucide-react';

interface SettingsPageProps {
  onBack: () => void;
  currentMode: string;
  onModeChange: (mode: string) => void;
}

const Toggle: React.FC<{ value: boolean; onChange: (v: boolean) => void; color?: string }> = ({
  value,
  onChange,
  color = '#8b5cf6',
}) => (
  <button
    onClick={() => onChange(!value)}
    className="relative w-12 h-6 rounded-full transition-all"
    style={{
      background: value ? `linear-gradient(90deg, ${color}, ${color}cc)` : 'rgba(255,255,255,0.1)',
      boxShadow: value ? `0 0 10px ${color}60` : 'none',
    }}
  >
    <motion.div
      animate={{ x: value ? 24 : 2 }}
      transition={{ type: 'spring', stiffness: 500, damping: 30 }}
      className="absolute top-1 w-4 h-4 rounded-full bg-white"
      style={{ boxShadow: '0 1px 3px rgba(0,0,0,0.4)' }}
    />
  </button>
);

const modes = [
  { id: 'default', label: 'Default Neon', emoji: '💜', color: '#8b5cf6', description: 'Classic purple vibes' },
  { id: 'chaos', label: 'CHAOS MODE', emoji: '🌪️', color: '#ef4444', description: 'Random taxes added 😈' },
  { id: 'rich', label: 'RICH MODE', emoji: '🥇', color: '#f59e0b', description: 'Gold theme, luxury' },
  { id: 'poor', label: 'POOR MODE', emoji: '😢', color: '#6b7280', description: 'Loan before division' },
];

const neonColors = [
  '#8b5cf6', '#06b6d4', '#ec4899', '#10b981', '#f59e0b', '#ef4444',
];

const SettingsPage: React.FC<SettingsPageProps> = ({ onBack, currentMode, onModeChange }) => {
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [aiMode, setAiMode] = useState(true);
  const [haptics, setHaptics] = useState(true);
  const [animations, setAnimations] = useState(true);
  const [selectedColor, setSelectedColor] = useState('#8b5cf6');
  const [animIntensity, setAnimIntensity] = useState(75);
  const [showModeConfirm, setShowModeConfirm] = useState<string | null>(null);

  const settings = [
    {
      icon: <Volume2 size={16} />,
      label: 'Sound Effects',
      desc: 'Cha-ching when you pay',
      value: soundEnabled,
      onChange: setSoundEnabled,
      color: '#06b6d4',
    },
    {
      icon: <Zap size={16} />,
      label: 'Haptic Feedback',
      desc: 'Feel the financial pain',
      value: haptics,
      onChange: setHaptics,
      color: '#8b5cf6',
    },
    {
      icon: <Brain size={16} />,
      label: 'Fake AI Mode™',
      desc: '"Powered by 47 AI models"',
      value: aiMode,
      onChange: setAiMode,
      color: '#ec4899',
    },
    {
      icon: <Zap size={16} />,
      label: 'Animations',
      desc: 'Makes app feel premium',
      value: animations,
      onChange: setAnimations,
      color: '#10b981',
    },
  ];

  return (
    <div
      className="h-full flex flex-col relative overflow-y-auto"
      style={{
        background: 'linear-gradient(180deg, #050215 0%, #0a0520 100%)',
      }}
    >
      {/* Bg glow */}
      <div
        className="absolute top-0 right-0 w-64 h-64 rounded-full pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(236,72,153,0.1) 0%, transparent 70%)',
          transform: 'translate(30%, -30%)',
        }}
      />

      <div className="px-5 pt-14 pb-20 relative z-10">
        {/* Header */}
        <button onClick={onBack} className="flex items-center gap-2 mb-6" style={{ color: 'rgba(167,139,250,0.8)' }}>
          <ArrowLeft size={18} />
          <span className="text-sm font-medium" style={{ fontFamily: "'Space Grotesk'" }}>Back</span>
        </button>

        <div className="flex items-center gap-3 mb-6">
          <div
            className="w-10 h-10 rounded-2xl flex items-center justify-center"
            style={{ background: 'linear-gradient(135deg, #8b5cf6, #ec4899)' }}
          >
            <Palette size={18} color="#fff" />
          </div>
          <div>
            <h1
              className="text-xl font-black"
              style={{
                fontFamily: "'Orbitron', monospace",
                background: 'linear-gradient(90deg, #c084fc, #67e8f9)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              SETTINGS
            </h1>
            <p className="text-xs" style={{ color: 'rgba(167,139,250,0.5)', fontFamily: "'Space Grotesk'" }}>
              Customize your expensive calculator
            </p>
          </div>
        </div>

        {/* Calculator Mode */}
        <div className="mb-5">
          <p
            className="text-xs font-bold mb-3 uppercase tracking-widest"
            style={{ color: 'rgba(167,139,250,0.5)', fontFamily: "'Space Grotesk'" }}
          >
            🎮 Calculator Mode
          </p>
          <div className="grid grid-cols-2 gap-2">
            {modes.map((mode) => (
              <motion.button
                key={mode.id}
                whileTap={{ scale: 0.94 }}
                onClick={() => {
                  onModeChange(mode.id);
                  setShowModeConfirm(mode.id);
                  setTimeout(() => setShowModeConfirm(null), 2000);
                }}
                className="relative rounded-2xl p-3 text-left overflow-hidden"
                style={{
                  background: currentMode === mode.id
                    ? `linear-gradient(135deg, ${mode.color}30, ${mode.color}15)`
                    : 'rgba(255,255,255,0.04)',
                  border: currentMode === mode.id
                    ? `2px solid ${mode.color}`
                    : '1px solid rgba(255,255,255,0.1)',
                  boxShadow: currentMode === mode.id ? `0 0 20px ${mode.color}40` : 'none',
                }}
              >
                <span className="text-xl">{mode.emoji}</span>
                <p
                  className="text-xs font-bold mt-1"
                  style={{ color: currentMode === mode.id ? mode.color : 'rgba(220,220,240,0.8)', fontFamily: "'Space Grotesk'" }}
                >
                  {mode.label}
                </p>
                <p className="text-xs mt-0.5" style={{ color: 'rgba(167,139,250,0.4)', fontSize: '10px', fontFamily: "'Space Grotesk'" }}>
                  {mode.description}
                </p>
                {showModeConfirm === mode.id && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="absolute inset-0 flex items-center justify-center rounded-2xl"
                    style={{ background: `${mode.color}30` }}
                  >
                    <span className="text-xl">✅</span>
                  </motion.div>
                )}
              </motion.button>
            ))}
          </div>
        </div>

        {/* Neon color */}
        <div className="mb-5">
          <p
            className="text-xs font-bold mb-3 uppercase tracking-widest"
            style={{ color: 'rgba(167,139,250,0.5)', fontFamily: "'Space Grotesk'" }}
          >
            🌈 Neon Color
          </p>
          <div
            className="rounded-2xl p-4"
            style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}
          >
            <div className="flex gap-3 justify-center">
              {neonColors.map((color) => (
                <motion.button
                  key={color}
                  whileTap={{ scale: 0.85 }}
                  onClick={() => setSelectedColor(color)}
                  className="w-8 h-8 rounded-full relative"
                  style={{
                    background: color,
                    boxShadow: selectedColor === color
                      ? `0 0 15px ${color}, 0 0 30px ${color}60`
                      : `0 0 5px ${color}60`,
                  }}
                >
                  {selectedColor === color && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="absolute inset-0 rounded-full border-2 border-white"
                      style={{ transform: 'scale(1.3)' }}
                    />
                  )}
                </motion.button>
              ))}
            </div>
          </div>
        </div>

        {/* Animation intensity */}
        <div className="mb-5">
          <p
            className="text-xs font-bold mb-3 uppercase tracking-widest"
            style={{ color: 'rgba(167,139,250,0.5)', fontFamily: "'Space Grotesk'" }}
          >
            ⚡ Animation Intensity: {animIntensity}%
          </p>
          <div
            className="rounded-2xl p-4"
            style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}
          >
            <input
              type="range"
              min="0"
              max="100"
              value={animIntensity}
              onChange={(e) => setAnimIntensity(Number(e.target.value))}
              className="w-full"
              style={{ accentColor: selectedColor }}
            />
            <div className="flex justify-between mt-1">
              <span className="text-xs" style={{ color: 'rgba(167,139,250,0.4)', fontFamily: "'Space Grotesk'" }}>Chill 😴</span>
              <span className="text-xs" style={{ color: 'rgba(167,139,250,0.4)', fontFamily: "'Space Grotesk'" }}>Seizure Mode 🌈</span>
            </div>
          </div>
        </div>

        {/* Toggles */}
        <div className="mb-5">
          <p
            className="text-xs font-bold mb-3 uppercase tracking-widest"
            style={{ color: 'rgba(167,139,250,0.5)', fontFamily: "'Space Grotesk'" }}
          >
            🎛️ Features
          </p>
          <div
            className="rounded-2xl overflow-hidden"
            style={{ border: '1px solid rgba(255,255,255,0.08)' }}
          >
            {settings.map((setting, i) => (
              <div
                key={i}
                className="flex items-center justify-between p-4"
                style={{
                  borderBottom: i < settings.length - 1 ? '1px solid rgba(255,255,255,0.05)' : 'none',
                  background: i % 2 === 0 ? 'rgba(255,255,255,0.03)' : 'rgba(255,255,255,0.01)',
                }}
              >
                <div className="flex items-center gap-3">
                  <div
                    className="w-8 h-8 rounded-xl flex items-center justify-center"
                    style={{ background: `${setting.color}20`, color: setting.color }}
                  >
                    {setting.icon}
                  </div>
                  <div>
                    <p className="text-sm font-semibold" style={{ color: 'rgba(220,220,240,0.9)', fontFamily: "'Space Grotesk'" }}>
                      {setting.label}
                    </p>
                    <p className="text-xs" style={{ color: 'rgba(167,139,250,0.4)', fontFamily: "'Space Grotesk'" }}>
                      {setting.desc}
                    </p>
                  </div>
                </div>
                <Toggle value={setting.value} onChange={setting.onChange} color={setting.color} />
              </div>
            ))}
          </div>
        </div>

        {/* App info */}
        <div
          className="rounded-2xl p-4 text-center"
          style={{ background: 'rgba(139,92,246,0.08)', border: '1px solid rgba(139,92,246,0.2)' }}
        >
          <div className="flex items-center justify-center gap-2 mb-2">
            <Cpu size={14} color="#8b5cf6" />
            <p
              className="text-sm font-bold"
              style={{ color: '#c084fc', fontFamily: "'Orbitron', monospace", fontSize: '11px' }}
            >
              PAYCALC v1.0.0
            </p>
          </div>
          <p className="text-xs" style={{ color: 'rgba(167,139,250,0.5)', fontFamily: "'Space Grotesk'" }}>
            Powered by Fake AI™ • Running on borrowed servers<br />
            "We calculate, you pay" – PayCalc Inc.<br />
            <span style={{ fontSize: '10px', color: 'rgba(167,139,250,0.3)' }}>
              Not responsible for financial trauma caused by seeing the result price
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
