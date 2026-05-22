import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Check } from 'lucide-react';

interface SubscriptionPageProps {
  onBack: () => void;
}

const plans = [
  {
    id: 'free',
    name: 'FREE PLAN',
    emoji: '😅',
    price: '৳0',
    period: '/forever',
    color: '#6b7280',
    gradient: 'linear-gradient(135deg, rgba(107,114,128,0.3), rgba(75,85,99,0.2))',
    border: 'rgba(107,114,128,0.4)',
    glow: 'rgba(107,114,128,0.2)',
    features: [
      { text: 'Only addition (+)', available: true },
      { text: '3 calculations/day', available: true },
      { text: 'Forced to watch ads', available: true },
      { text: 'Subtraction (-)', available: false },
      { text: 'Multiplication (×)', available: false },
      { text: 'Division (÷)', available: false },
    ],
    badge: null,
    funny: 'For people who enjoy pain',
  },
  {
    id: 'student',
    name: 'STUDENT PLAN',
    emoji: '🎒',
    price: '৳99',
    period: '/month',
    color: '#06b6d4',
    gradient: 'linear-gradient(135deg, rgba(6,182,212,0.3), rgba(8,145,178,0.2))',
    border: 'rgba(6,182,212,0.5)',
    glow: 'rgba(6,182,212,0.3)',
    features: [
      { text: 'Addition (+)', available: true },
      { text: 'Subtraction (-) UNLOCKED!', available: true },
      { text: 'Remove ads (mostly)', available: true },
      { text: '10 calculations/day', available: true },
      { text: 'Multiplication (×)', available: false },
      { text: 'Division (÷)', available: false },
    ],
    badge: 'POPULAR',
    funny: 'Spend tuition money wisely',
  },
  {
    id: 'pro',
    name: 'PRO MATHEMATICIAN',
    emoji: '🧮',
    price: '৳499',
    period: '/month',
    color: '#8b5cf6',
    gradient: 'linear-gradient(135deg, rgba(139,92,246,0.35), rgba(109,40,217,0.25))',
    border: 'rgba(139,92,246,0.6)',
    glow: 'rgba(139,92,246,0.35)',
    features: [
      { text: 'Addition + Subtraction', available: true },
      { text: 'Multiplication (×) UNLOCKED!', available: true },
      { text: 'Faster calculation servers', available: true },
      { text: 'Priority queue (Math VIP)', available: true },
      { text: 'Unlimited calculations', available: true },
      { text: 'Division (÷)', available: false },
    ],
    badge: 'RECOMMENDED',
    funny: 'For serious number crunchers',
  },
  {
    id: 'ultimate',
    name: 'ULTIMATE AI GENIUS',
    emoji: '🚀',
    price: '৳2,999',
    period: '/month',
    color: '#ec4899',
    gradient: 'linear-gradient(135deg, rgba(236,72,153,0.35), rgba(139,92,246,0.3), rgba(6,182,212,0.2))',
    border: 'rgba(236,72,153,0.7)',
    glow: 'rgba(236,72,153,0.4)',
    features: [
      { text: 'ALL operations UNLOCKED', available: true },
      { text: 'Division (÷) FINALLY!', available: true },
      { text: 'Scientific calculator', available: true },
      { text: 'Dark ultra neon theme', available: true },
      { text: 'Priority equation solving', available: true },
      { text: '"AI-powered" badge (fake)', available: true },
    ],
    badge: '💎 ELITE',
    funny: '"Worth every taka" – No one',
  },
];

const SubscriptionPage: React.FC<SubscriptionPageProps> = ({ onBack }) => {
  const [selectedPlan, setSelectedPlan] = useState('pro');
  const [isAnnual, setIsAnnual] = useState(false);

  return (
    <div
      className="h-full flex flex-col relative"
      style={{
        background: 'linear-gradient(180deg, #050215 0%, #0a0520 50%, #050215 100%)',
      }}
    >
      {/* Background glow */}
      <div
        className="absolute top-20 left-1/2 w-80 h-80 rounded-full pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(139,92,246,0.15) 0%, transparent 70%)',
          transform: 'translateX(-50%)',
        }}
      />

      {/* Header */}
      <div className="px-5 pt-14 pb-4 relative z-10">
        <button
          onClick={onBack}
          className="flex items-center gap-2 mb-5"
          style={{ color: 'rgba(167,139,250,0.8)' }}
        >
          <ArrowLeft size={18} />
          <span className="text-sm font-medium" style={{ fontFamily: "'Space Grotesk'" }}>Back</span>
        </button>

        <div className="text-center">
          <motion.div
            animate={{ rotate: [0, 10, -10, 0], scale: [1, 1.1, 1] }}
            transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
            className="text-4xl mb-2"
          >
            👑
          </motion.div>
          <h1
            className="text-2xl font-black mb-1"
            style={{
              fontFamily: "'Orbitron', monospace",
              background: 'linear-gradient(90deg, #c084fc, #67e8f9, #f9a8d4)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            PAYCALC PREMIUM
          </h1>
          <p className="text-xs" style={{ color: 'rgba(167,139,250,0.6)', fontFamily: "'Space Grotesk'" }}>
            Unlock the full power of basic arithmetic
          </p>

          {/* Annual toggle */}
          <div className="flex items-center justify-center gap-3 mt-4">
            <span className="text-xs font-medium" style={{ color: isAnnual ? 'rgba(167,139,250,0.5)' : '#c084fc', fontFamily: "'Space Grotesk'" }}>
              Monthly
            </span>
            <button
              onClick={() => setIsAnnual(!isAnnual)}
              className="relative w-12 h-6 rounded-full transition-all"
              style={{
                background: isAnnual
                  ? 'linear-gradient(90deg, #8b5cf6, #ec4899)'
                  : 'rgba(255,255,255,0.15)',
              }}
            >
              <motion.div
                animate={{ x: isAnnual ? 24 : 2 }}
                transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                className="absolute top-1 w-4 h-4 rounded-full bg-white"
                style={{ boxShadow: '0 1px 3px rgba(0,0,0,0.3)' }}
              />
            </button>
            <span className="text-xs font-medium" style={{ color: isAnnual ? '#c084fc' : 'rgba(167,139,250,0.5)', fontFamily: "'Space Grotesk'" }}>
              Annual
            </span>
            {isAnnual && (
              <motion.span
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="text-xs font-bold px-2 py-0.5 rounded-full"
                style={{ background: 'rgba(16,185,129,0.2)', color: '#34d399', border: '1px solid rgba(16,185,129,0.4)' }}
              >
                Save 40%!
              </motion.span>
            )}
          </div>
        </div>
      </div>

      {/* Plans */}
      <div className="flex-1 overflow-y-auto px-4 pb-6 space-y-3 relative z-10">
        {plans.map((plan, index) => (
          <motion.div
            key={plan.id}
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            onClick={() => setSelectedPlan(plan.id)}
            className="relative rounded-3xl p-4 cursor-pointer transition-all"
            style={{
              background: plan.gradient,
              border: `2px solid ${selectedPlan === plan.id ? plan.color : plan.border}`,
              boxShadow: selectedPlan === plan.id
                ? `0 0 25px ${plan.glow}, 0 0 50px ${plan.glow}40`
                : '0 0 10px rgba(0,0,0,0.3)',
            }}
          >
            {plan.badge && (
              <div
                className="absolute -top-3 right-4 px-3 py-1 rounded-full text-xs font-black"
                style={{
                  background: plan.id === 'ultimate'
                    ? 'linear-gradient(90deg, #ec4899, #8b5cf6)'
                    : plan.id === 'pro'
                    ? 'linear-gradient(90deg, #8b5cf6, #06b6d4)'
                    : 'linear-gradient(90deg, #06b6d4, #10b981)',
                  color: '#fff',
                  fontFamily: "'Orbitron', monospace",
                  fontSize: '9px',
                  letterSpacing: '1px',
                }}
              >
                {plan.badge}
              </div>
            )}

            {selectedPlan === plan.id && (
              <motion.div
                className="absolute top-3 right-3 w-6 h-6 rounded-full flex items-center justify-center"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                style={{ background: plan.color }}
              >
                <Check size={12} color="#fff" strokeWidth={3} />
              </motion.div>
            )}

            <div className="flex items-start gap-3">
              <span className="text-2xl">{plan.emoji}</span>
              <div className="flex-1">
                <div className="flex items-baseline gap-2 justify-between">
                  <div>
                    <p
                      className="text-sm font-black"
                      style={{ fontFamily: "'Orbitron', monospace", color: plan.color, fontSize: '11px', letterSpacing: '1px' }}
                    >
                      {plan.name}
                    </p>
                    <p className="text-xs mt-0.5" style={{ color: 'rgba(167,139,250,0.5)', fontFamily: "'Space Grotesk'" }}>
                      {plan.funny}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-black text-xl" style={{ color: '#fff', fontFamily: "'Orbitron', monospace", fontSize: '18px' }}>
                      {isAnnual && plan.id !== 'free'
                        ? `৳${Math.floor(parseInt(plan.price.replace(/[৳,]/g, '')) * 0.6).toLocaleString()}`
                        : plan.price}
                    </p>
                    <p className="text-xs" style={{ color: 'rgba(167,139,250,0.5)' }}>{plan.period}</p>
                  </div>
                </div>

                <div className="mt-2 grid grid-cols-2 gap-1">
                  {plan.features.map((feature, fi) => (
                    <div key={fi} className="flex items-center gap-1">
                      <span
                        className="text-xs"
                        style={{ color: feature.available ? '#34d399' : 'rgba(107,114,128,0.6)' }}
                      >
                        {feature.available ? '✓' : '✗'}
                      </span>
                      <span
                        className="text-xs"
                        style={{
                          color: feature.available ? 'rgba(220,220,240,0.8)' : 'rgba(107,114,128,0.5)',
                          fontFamily: "'Space Grotesk'",
                          textDecoration: feature.available ? 'none' : 'line-through',
                          fontSize: '10px',
                        }}
                      >
                        {feature.text}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        ))}

        {/* CTA */}
        <motion.button
          whileTap={{ scale: 0.96 }}
          className="w-full py-4 rounded-2xl font-black relative overflow-hidden"
          style={{
            background: 'linear-gradient(135deg, #8b5cf6, #6d28d9, #ec4899)',
            color: '#fff',
            border: '1px solid rgba(139,92,246,0.8)',
            boxShadow: '0 0 30px rgba(139,92,246,0.5)',
            fontFamily: "'Orbitron', monospace",
            fontSize: '13px',
            letterSpacing: '2px',
          }}
        >
          <div className="absolute inset-0 animate-shimmer" />
          <span className="relative z-10">🚀 SUBSCRIBE NOW</span>
        </motion.button>

        <p className="text-center text-xs" style={{ color: 'rgba(100,100,120,0.5)', fontFamily: "'Space Grotesk'" }}>
          Cancel anytime • No refunds • Math still hard
        </p>

        {/* Funny disclaimer */}
        <div
          className="rounded-2xl p-3"
          style={{ background: 'rgba(239,68,68,0.08)', border: '1px solid rgba(239,68,68,0.2)' }}
        >
          <p className="text-xs text-center" style={{ color: 'rgba(252,165,165,0.7)', fontFamily: "'Space Grotesk'" }}>
            ⚠️ WARNING: Subscribing to Ultimate AI Genius Plan does NOT make you a genius.
            It just makes us richer. Results may vary. Math may still be confusing.
          </p>
        </div>
      </div>
    </div>
  );
};

export default SubscriptionPage;
