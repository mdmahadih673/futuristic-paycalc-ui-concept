import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import CalculatorScreen from './components/CalculatorScreen';
import SubscriptionPage from './components/SubscriptionPage';
import SettingsPage from './components/SettingsPage';
import SplashScreen from './components/SplashScreen';

type Screen = 'calculator' | 'subscription' | 'settings';

const pageVariants = {
  initial: (direction: number) => ({
    x: direction > 0 ? '100%' : '-100%',
    opacity: 0,
    scale: 0.95,
  }),
  animate: {
    x: 0,
    opacity: 1,
    scale: 1,
  },
  exit: (direction: number) => ({
    x: direction > 0 ? '-100%' : '100%',
    opacity: 0,
    scale: 0.95,
  }),
};

const pageTransition = {
  type: 'spring' as const,
  stiffness: 280,
  damping: 28,
};

const App: React.FC = () => {
  const [screen, setScreen] = useState<Screen>('calculator');
  const [direction, setDirection] = useState(1);
  const [mode, setMode] = useState('default');
  const [showSplash, setShowSplash] = useState(true);

  const navigate = (to: Screen, dir: number = 1) => {
    setDirection(dir);
    setScreen(to);
  };

  // Gradient by mode
  const bgGradients: Record<string, string> = {
    default: 'radial-gradient(ellipse at 50% 30%, #120640 0%, #000000 70%)',
    chaos: 'radial-gradient(ellipse at 50% 30%, #3d0608 0%, #000000 70%)',
    rich: 'radial-gradient(ellipse at 50% 30%, #3d2a06 0%, #000000 70%)',
    poor: 'radial-gradient(ellipse at 50% 30%, #0a0a0a 0%, #000000 70%)',
  };

  const borderColors: Record<string, string> = {
    default: 'rgba(139,92,246,0.5)',
    chaos: 'rgba(239,68,68,0.5)',
    rich: 'rgba(245,158,11,0.5)',
    poor: 'rgba(107,114,128,0.4)',
  };

  const glowColors: Record<string, string> = {
    default: 'rgba(139,92,246,0.3)',
    chaos: 'rgba(239,68,68,0.25)',
    rich: 'rgba(245,158,11,0.25)',
    poor: 'rgba(107,114,128,0.15)',
  };

  return (
    <div
      className="flex items-center justify-center w-full h-full relative"
      style={{ background: bgGradients[mode] || bgGradients.default }}
    >
      {/* Background ambient stars */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {Array.from({ length: 60 }, (_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full"
            style={{
              width: Math.random() * 2 + 1,
              height: Math.random() * 2 + 1,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              background: ['#8b5cf6', '#06b6d4', '#ec4899', '#fff'][Math.floor(Math.random() * 4)],
              opacity: Math.random() * 0.5 + 0.1,
            }}
            animate={{
              opacity: [0.1, Math.random() * 0.6 + 0.2, 0.1],
              scale: [1, Math.random() * 0.5 + 1, 1],
            }}
            transition={{
              duration: Math.random() * 4 + 2,
              repeat: Infinity,
              delay: Math.random() * 5,
            }}
          />
        ))}
      </div>

      {/* Outer glow frame */}
      <motion.div
        animate={{ filter: `drop-shadow(0 0 40px ${glowColors[mode]}) drop-shadow(0 0 80px ${glowColors[mode]}60)` }}
        transition={{ duration: 0.5 }}
        className="relative"
      >
        {/* Phone outer frame */}
        <motion.div
          animate={{
            borderColor: borderColors[mode],
            boxShadow: `
              0 0 0 1px rgba(0,0,0,0.8),
              0 0 0 3px rgba(20,15,50,0.9),
              0 0 0 4px ${borderColors[mode]}40,
              0 30px 80px rgba(0,0,0,0.8),
              inset 0 0 0 1px rgba(255,255,255,0.05)
            `
          }}
          transition={{ duration: 0.5 }}
          className="mobile-frame"
          style={{
            background: '#060618',
            border: `2px solid ${borderColors[mode]}`,
          }}
        >
          {/* Notch */}
          <div
            className="absolute top-0 left-1/2 z-50"
            style={{
              transform: 'translateX(-50%)',
              width: '126px',
              height: '34px',
              background: '#000',
              borderRadius: '0 0 22px 22px',
              border: `1px solid ${borderColors[mode]}30`,
              borderTop: 'none',
            }}
          >
            {/* Camera */}
            <div
              className="absolute"
              style={{
                right: '20px',
                top: '50%',
                transform: 'translateY(-50%)',
                width: '11px',
                height: '11px',
                borderRadius: '50%',
                background: '#0f0f1a',
                border: '1px solid rgba(139,92,246,0.4)',
                boxShadow: '0 0 8px rgba(6,182,212,0.5), inset 0 0 3px rgba(6,182,212,0.3)',
              }}
            />
            {/* Speaker */}
            <div
              className="absolute"
              style={{
                left: '50%',
                top: '55%',
                transform: 'translate(-60%, -50%)',
                width: '44px',
                height: '4px',
                borderRadius: '2px',
                background: '#111122',
                border: '1px solid rgba(255,255,255,0.06)',
              }}
            />
          </div>

          {/* Power button */}
          <div
            className="absolute"
            style={{
              right: '-3px',
              top: '120px',
              width: '3px',
              height: '56px',
              background: 'linear-gradient(180deg, rgba(139,92,246,0.5), rgba(139,92,246,0.2))',
              borderRadius: '0 2px 2px 0',
            }}
          />

          {/* Volume buttons */}
          <div
            className="absolute"
            style={{
              left: '-3px',
              top: '90px',
              width: '3px',
              height: '32px',
              background: 'linear-gradient(180deg, rgba(139,92,246,0.5), rgba(139,92,246,0.2))',
              borderRadius: '2px 0 0 2px',
            }}
          />
          <div
            className="absolute"
            style={{
              left: '-3px',
              top: '138px',
              width: '3px',
              height: '64px',
              background: 'linear-gradient(180deg, rgba(139,92,246,0.5), rgba(139,92,246,0.2))',
              borderRadius: '2px 0 0 2px',
            }}
          />

          {/* Screen content */}
          <div className="w-full h-full overflow-hidden rounded-[42px] relative">
            {/* Splash Screen */}
            <AnimatePresence>
              {showSplash && (
                <SplashScreen onComplete={() => setShowSplash(false)} />
              )}
            </AnimatePresence>

            {/* Main app screens */}
            <AnimatePresence mode="wait" custom={direction}>
              {screen === 'calculator' && (
                <motion.div
                  key="calculator"
                  custom={direction}
                  variants={pageVariants}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  transition={pageTransition}
                  className="absolute inset-0"
                >
                  <CalculatorScreen
                    onOpenSettings={() => navigate('settings', 1)}
                    onOpenSubscription={() => navigate('subscription', 1)}
                    mode={mode}
                  />
                </motion.div>
              )}

              {screen === 'subscription' && (
                <motion.div
                  key="subscription"
                  custom={direction}
                  variants={pageVariants}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  transition={pageTransition}
                  className="absolute inset-0"
                >
                  <SubscriptionPage onBack={() => navigate('calculator', -1)} />
                </motion.div>
              )}

              {screen === 'settings' && (
                <motion.div
                  key="settings"
                  custom={direction}
                  variants={pageVariants}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  transition={pageTransition}
                  className="absolute inset-0"
                >
                  <SettingsPage
                    onBack={() => navigate('calculator', -1)}
                    currentMode={mode}
                    onModeChange={setMode}
                  />
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Home indicator */}
          <div
            className="absolute bottom-2 left-1/2 z-50"
            style={{
              transform: 'translateX(-50%)',
              width: '130px',
              height: '5px',
              background: 'rgba(255,255,255,0.22)',
              borderRadius: '3px',
            }}
          />

          {/* Top screen gloss */}
          <div
            className="absolute top-0 left-0 right-0 h-28 pointer-events-none rounded-t-[42px] z-20"
            style={{
              background: 'linear-gradient(180deg, rgba(255,255,255,0.03) 0%, transparent 100%)',
            }}
          />
        </motion.div>

        {/* Phone reflection */}
        <div
          className="absolute -bottom-6 left-4 right-4 h-6 pointer-events-none"
          style={{
            background: `linear-gradient(180deg, ${glowColors[mode]} 0%, transparent 100%)`,
            filter: 'blur(12px)',
            transform: 'scaleY(-0.4) translateY(-100%)',
            opacity: 0.5,
          }}
        />
      </motion.div>

      {/* Bottom credit */}
      <motion.div
        className="absolute bottom-3 left-1/2 transform -translate-x-1/2 text-center pointer-events-none"
        animate={{ opacity: [0.3, 0.7, 0.3] }}
        transition={{ duration: 4, repeat: Infinity }}
      >
        <p
          className="text-xs font-bold tracking-widest uppercase"
          style={{
            color: 'rgba(139,92,246,0.4)',
            fontFamily: "'Orbitron', monospace",
            fontSize: '8px',
          }}
        >
          PayCalc™ · Pay Before Result · © 2025
        </p>
      </motion.div>
    </div>
  );
};

export default App;
