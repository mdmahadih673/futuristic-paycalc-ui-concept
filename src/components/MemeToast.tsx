import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const memeNotifications = [
  { emoji: '📊', title: 'Math Market Update', msg: 'Division prices rose 12% today' },
  { emoji: '🧠', title: 'Fake AI Report', msg: 'Your equation is trending on MathTwitter' },
  { emoji: '💸', title: 'Weekend Discount', msg: '0% off multiplication this Sunday' },
  { emoji: '🚀', title: 'NASA Partnership', msg: 'Your calculation processed in orbit!' },
  { emoji: '📉', title: 'Economy Alert', msg: 'Inflation increased division by 2৳' },
  { emoji: '🏆', title: 'Achievement!', msg: 'You unlocked "Willing to pay for math"' },
  { emoji: '💡', title: 'Pro Tip', msg: 'Subtraction is cheaper than division 💡' },
  { emoji: '🤖', title: 'AI Notif', msg: '47 AIs computed your last equation' },
  { emoji: '💎', title: 'Upgrade Offer', msg: 'Go PRO for 10% less math debt' },
  { emoji: '😂', title: 'Fun Fact', msg: '"2+2=4" costs only ৳1. Bargain!' },
];

interface MemeToastProps {
  active: boolean;
}

const MemeToast: React.FC<MemeToastProps> = ({ active }) => {
  const [toast, setToast] = useState<typeof memeNotifications[0] | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!active) return;

    const show = () => {
      const notification = memeNotifications[Math.floor(Math.random() * memeNotifications.length)];
      setToast(notification);
      setVisible(true);
      setTimeout(() => setVisible(false), 3500);
    };

    // Show first after 5 seconds
    const first = setTimeout(show, 5000);
    // Then show every 12 seconds
    const interval = setInterval(show, 12000);

    return () => {
      clearTimeout(first);
      clearInterval(interval);
    };
  }, [active]);

  return (
    <AnimatePresence>
      {visible && toast && (
        <motion.div
          initial={{ y: -80, opacity: 0, scale: 0.9 }}
          animate={{ y: 0, opacity: 1, scale: 1 }}
          exit={{ y: -80, opacity: 0, scale: 0.9 }}
          transition={{ type: 'spring', stiffness: 400, damping: 30 }}
          className="absolute top-16 left-4 right-4 z-40"
          style={{
            background: 'rgba(10,8,30,0.95)',
            border: '1px solid rgba(139,92,246,0.4)',
            borderRadius: '16px',
            backdropFilter: 'blur(20px)',
            boxShadow: '0 0 25px rgba(139,92,246,0.2), 0 8px 32px rgba(0,0,0,0.5)',
          }}
        >
          <div className="flex items-center gap-3 px-4 py-3">
            {/* App icon */}
            <div
              className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
              style={{
                background: 'linear-gradient(135deg, #8b5cf6, #ec4899)',
                boxShadow: '0 0 10px rgba(139,92,246,0.4)',
              }}
            >
              <span className="text-sm">{toast.emoji}</span>
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <p
                  className="text-xs font-black truncate"
                  style={{ color: '#c084fc', fontFamily: "'Space Grotesk'", fontSize: '11px' }}
                >
                  PayCalc Pro
                </p>
                <p className="text-xs flex-shrink-0" style={{ color: 'rgba(167,139,250,0.4)', fontSize: '10px' }}>
                  now
                </p>
              </div>
              <p
                className="text-xs font-bold"
                style={{ color: '#fff', fontFamily: "'Space Grotesk'", fontSize: '11px' }}
              >
                {toast.title}
              </p>
              <p
                className="text-xs truncate"
                style={{ color: 'rgba(167,139,250,0.6)', fontFamily: "'Space Grotesk'", fontSize: '10px' }}
              >
                {toast.msg}
              </p>
            </div>
          </div>

          {/* Progress bar */}
          <motion.div
            initial={{ width: '100%' }}
            animate={{ width: '0%' }}
            transition={{ duration: 3.5, ease: 'linear' }}
            className="absolute bottom-0 left-0 h-0.5 rounded-full"
            style={{
              background: 'linear-gradient(90deg, #8b5cf6, #ec4899)',
            }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default MemeToast;
