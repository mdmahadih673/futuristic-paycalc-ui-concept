import React, { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Settings, Star, BarChart2 } from 'lucide-react';
import CalcDisplay from './CalcDisplay';
import CalcButton from './CalcButton';
import PaymentPopup from './PaymentPopup';
import ResultReveal from './ResultReveal';
import AdScreen from './AdScreen';
import ParticleBackground from './ParticleBackground';
import MemeToast from './MemeToast';

interface CalculatorScreenProps {
  onOpenSettings: () => void;
  onOpenSubscription: () => void;
  mode: string;
}

const operationPrices: Record<string, number> = {
  '+': 1,
  '-': 2,
  '×': 5,
  '÷': 10,
};

const operationNames: Record<string, string> = {
  '+': 'Addition',
  '-': 'Subtraction',
  '×': 'Multiplication',
  '÷': 'Division',
};

const funnyReasons: Record<string, string[]> = {
  '+': [
    "This calculation requires financial support.",
    "Even addition costs money now. Welcome to 2024.",
    "Server cost too high for addition. 😭",
  ],
  '-': [
    "Subtraction is surprisingly expensive.",
    "Taking numbers away costs money ironically.",
    "Math isn't free anymore. Subscribe for less pain.",
  ],
  '×': [
    "Multiplication detected. Premium charge applied.",
    "Need more RAM to multiply numbers.",
    "This equation is emotionally difficult for our servers.",
  ],
  '÷': [
    "Division is our most expensive operation.",
    "Too much math detected. Inflation increased division costs.",
    "Need more RAM to divide numbers. Seriously.",
  ],
};

const processingMessages = [
  "Processing Premium Calculation…",
  "Consulting AI experts…",
  "Calculating using NASA servers…",
  "Too much math detected.",
  "This equation is emotionally difficult.",
  "Warming up quantum processors…",
  "Asking ChatGPT for help…",
  "Loading math.exe…",
];

const modeThemes: Record<string, { bg: string; accent: string; tag: string }> = {
  default: {
    bg: 'linear-gradient(180deg, #05020f 0%, #0a0520 60%, #050215 100%)',
    accent: '#8b5cf6',
    tag: '🤖 AI POWERED',
  },
  chaos: {
    bg: 'linear-gradient(180deg, #0f0205 0%, #200510 60%, #0f0208 100%)',
    accent: '#ef4444',
    tag: '🌪️ CHAOS MODE',
  },
  rich: {
    bg: 'linear-gradient(180deg, #0f0b02 0%, #1a1205 60%, #0f0b02 100%)',
    accent: '#f59e0b',
    tag: '💎 RICH MODE',
  },
  poor: {
    bg: 'linear-gradient(180deg, #050505 0%, #0a0a0a 60%, #050505 100%)',
    accent: '#6b7280',
    tag: '😢 POOR MODE',
  },
};

const CalculatorScreen: React.FC<CalculatorScreenProps> = ({ onOpenSettings, onOpenSubscription, mode }) => {
  const [display, setDisplay] = useState('0');
  const [expression, setExpression] = useState('');
  const [operator, setOperator] = useState<string | null>(null);
  const [prevValue, setPrevValue] = useState<number | null>(null);
  const [isShaking, setIsShaking] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [processingText, setProcessingText] = useState('');
  const [showPayment, setShowPayment] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [showAd, setShowAd] = useState(false);
  const [resultValue, setResultValue] = useState('');
  const [fullExpression, setFullExpression] = useState('');
  const [currentOp, setCurrentOp] = useState<string | null>(null);
  const [calcCount, setCalcCount] = useState(0);
  const [isLocked, setIsLocked] = useState(false);
  const [waitingForOperand, setWaitingForOperand] = useState(false);
  const [, setProcMsgIdx] = useState(0);

  const theme = modeThemes[mode] || modeThemes.default;

  const handleNumber = useCallback((num: string) => {
    if (waitingForOperand) {
      setDisplay(num);
      setWaitingForOperand(false);
    } else {
      setDisplay((prev) => (prev === '0' ? num : prev.length < 12 ? prev + num : prev));
    }
  }, [waitingForOperand]);

  const handleDecimal = useCallback(() => {
    if (waitingForOperand) {
      setDisplay('0.');
      setWaitingForOperand(false);
      return;
    }
    if (!display.includes('.')) {
      setDisplay((prev) => prev + '.');
    }
  }, [display, waitingForOperand]);

  const handleOperator = useCallback((op: string) => {
    const current = parseFloat(display);

    if (prevValue !== null && operator && !waitingForOperand) {
      let result = 0;
      if (operator === '+') result = prevValue + current;
      else if (operator === '-') result = prevValue - current;
      else if (operator === '×') result = prevValue * current;
      else if (operator === '÷') result = current !== 0 ? prevValue / current : 0;
      const formatted = parseFloat(result.toFixed(8)).toString();
      setDisplay(formatted);
      setPrevValue(result);
      setExpression(`${formatted} ${op}`);
    } else {
      setPrevValue(current);
      setExpression(`${display} ${op}`);
    }

    setOperator(op);
    setCurrentOp(op);
    setWaitingForOperand(true);
  }, [display, prevValue, operator, waitingForOperand]);

  const handleClear = useCallback(() => {
    setDisplay('0');
    setExpression('');
    setOperator(null);
    setPrevValue(null);
    setWaitingForOperand(false);
    setIsLocked(false);
  }, []);

  const handlePlusMinus = useCallback(() => {
    setDisplay((prev) => (parseFloat(prev) * -1).toString());
  }, []);

  const handlePercent = useCallback(() => {
    setDisplay((prev) => (parseFloat(prev) / 100).toString());
  }, []);

  const handleDelete = useCallback(() => {
    setDisplay((prev) => (prev.length > 1 ? prev.slice(0, -1) : '0'));
  }, []);

  const calculateResult = useCallback(() => {
    if (prevValue === null || !operator) return null;
    const current = parseFloat(display);
    let result = 0;
    if (operator === '+') result = prevValue + current;
    else if (operator === '-') result = prevValue - current;
    else if (operator === '×') result = prevValue * current;
    else if (operator === '÷') result = current !== 0 ? prevValue / current : NaN;
    return parseFloat(result.toFixed(8)).toString();
  }, [prevValue, operator, display]);

  const handleEquals = useCallback(async () => {
    if (prevValue === null || !operator) return;

    const expr = `${prevValue} ${operator} ${display} =`;
    setFullExpression(expr);

    // Shake
    setIsShaking(true);
    setTimeout(() => setIsShaking(false), 600);

    // Start processing
    const msgIndex = Math.floor(Math.random() * processingMessages.length);
    setProcMsgIdx(msgIndex);
    setProcessingText(processingMessages[msgIndex]);
    setIsProcessing(true);
    setIsLocked(false);

    // Rotate processing messages
    const interval = setInterval(() => {
      setProcMsgIdx((prev) => {
        const next = (prev + 1) % processingMessages.length;
        setProcessingText(processingMessages[next]);
        return next;
      });
    }, 800);

    setTimeout(() => {
      clearInterval(interval);
      setIsProcessing(false);
      setIsLocked(true);
      setShowPayment(true);

      // Add chaos tax
      if (mode === 'chaos') {
        const result = calculateResult();
        if (result) {
          const tax = Math.floor(Math.random() * 20) + 5;
          setResultValue(`${result} (+${tax}৳ chaos tax)`);
        }
      } else {
        setResultValue(calculateResult() || '???');
      }
    }, 3000);
  }, [prevValue, operator, display, calculateResult, mode]);

  const handlePay = useCallback((_method: string) => {
    setShowPayment(false);
    setIsLocked(false);
    setCalcCount((prev) => prev + 1);

    setTimeout(() => {
      setShowResult(true);
    }, 300);
  }, []);

  const handleWatchAd = useCallback(() => {
    setShowPayment(false);
    setShowAd(true);
  }, []);

  const handleAdComplete = useCallback(() => {
    setShowAd(false);
    setCalcCount((prev) => prev + 1);
    setTimeout(() => {
      setShowResult(true);
    }, 300);
  }, []);

  const handleResultClose = useCallback(() => {
    setShowResult(false);
    setDisplay('0');
    setExpression('');
    setOperator(null);
    setPrevValue(null);
    setWaitingForOperand(false);
    setIsLocked(false);
    setResultValue('');
  }, []);

  const price = currentOp ? operationPrices[currentOp] : 1;
  const opName = currentOp ? operationNames[currentOp] : 'Basic';
  const reason = currentOp
    ? funnyReasons[currentOp][Math.floor(Math.random() * funnyReasons[currentOp].length)]
    : "Math isn't free anymore.";

  const buttons = [
    // Row 1
    { label: 'AC', onClick: handleClear, type: 'clear' as const },
    { label: '+/-', onClick: handlePlusMinus, type: 'special' as const },
    { label: '%', onClick: handlePercent, type: 'special' as const },
    { label: '÷', onClick: () => handleOperator('÷'), type: 'operator' as const },
    // Row 2
    { label: '7', onClick: () => handleNumber('7'), type: 'number' as const },
    { label: '8', onClick: () => handleNumber('8'), type: 'number' as const },
    { label: '9', onClick: () => handleNumber('9'), type: 'number' as const },
    { label: '×', onClick: () => handleOperator('×'), type: 'operator' as const },
    // Row 3
    { label: '4', onClick: () => handleNumber('4'), type: 'number' as const },
    { label: '5', onClick: () => handleNumber('5'), type: 'number' as const },
    { label: '6', onClick: () => handleNumber('6'), type: 'number' as const },
    { label: '−', onClick: () => handleOperator('-'), type: 'operator' as const },
    // Row 4
    { label: '1', onClick: () => handleNumber('1'), type: 'number' as const },
    { label: '2', onClick: () => handleNumber('2'), type: 'number' as const },
    { label: '3', onClick: () => handleNumber('3'), type: 'number' as const },
    { label: '+', onClick: () => handleOperator('+'), type: 'operator' as const },
    // Row 5
    { label: '⌫', onClick: handleDelete, type: 'special' as const },
    { label: '0', onClick: () => handleNumber('0'), type: 'number' as const },
    { label: '.', onClick: handleDecimal, type: 'number' as const },
    { label: '=', onClick: handleEquals, type: 'equals' as const },
  ];

  return (
    <div
      className="relative h-full w-full flex flex-col overflow-hidden"
      style={{ background: theme.bg }}
    >
      <ParticleBackground />

      {/* Meme Notifications */}
      <MemeToast active={!showPayment && !showResult && !showAd} />

      {/* Status bar */}
      <div className="relative z-10 px-6 pt-12 pb-2 flex items-center justify-between">
        <div className="flex items-center gap-1.5">
          <motion.div
            animate={{ opacity: [1, 0.3, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-2 h-2 rounded-full"
            style={{ background: theme.accent, boxShadow: `0 0 6px ${theme.accent}` }}
          />
          <span
            className="text-xs font-bold uppercase tracking-widest"
            style={{ color: theme.accent, fontFamily: "'Orbitron', monospace", fontSize: '9px' }}
          >
            {theme.tag}
          </span>
        </div>
        <div className="flex items-center gap-2">
          {calcCount > 0 && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="flex items-center gap-1 px-2 py-1 rounded-full"
              style={{ background: 'rgba(245,158,11,0.15)', border: '1px solid rgba(245,158,11,0.3)' }}
            >
              <BarChart2 size={10} color="#fcd34d" />
              <span className="text-xs font-bold" style={{ color: '#fcd34d', fontFamily: "'Orbitron', monospace", fontSize: '9px' }}>
                ৳{calcCount * 2} SPENT
              </span>
            </motion.div>
          )}
        </div>
      </div>

      {/* App title */}
      <div className="relative z-10 px-5 pb-2">
        <div className="flex items-center justify-between">
          <div>
            <h1
              className="text-2xl font-black"
              style={{
                fontFamily: "'Orbitron', monospace",
                background: `linear-gradient(135deg, #fff 0%, ${theme.accent} 50%, #67e8f9 100%)`,
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                filter: `drop-shadow(0 0 10px ${theme.accent}60)`,
              }}
            >
              PayCalc
            </h1>
            <p
              className="text-xs"
              style={{
                color: 'rgba(167,139,250,0.6)',
                fontFamily: "'Space Grotesk', sans-serif",
                marginTop: '-2px',
              }}
            >
              Pay Before Result™
            </p>
          </div>
          <div className="flex items-center gap-2">
            <motion.button
              onClick={onOpenSubscription}
              whileTap={{ scale: 0.9 }}
              className="flex items-center gap-1 px-3 py-1.5 rounded-xl"
              style={{
                background: 'linear-gradient(135deg, rgba(245,158,11,0.25), rgba(239,68,68,0.2))',
                border: '1px solid rgba(245,158,11,0.4)',
                color: '#fcd34d',
              }}
            >
              <Star size={12} fill="#fcd34d" />
              <span className="text-xs font-bold" style={{ fontFamily: "'Orbitron', monospace", fontSize: '9px', letterSpacing: '1px' }}>
                PRO
              </span>
            </motion.button>
            <motion.button
              onClick={onOpenSettings}
              whileTap={{ scale: 0.9 }}
              className="w-9 h-9 rounded-xl flex items-center justify-center"
              style={{
                background: 'rgba(255,255,255,0.08)',
                border: '1px solid rgba(255,255,255,0.12)',
              }}
            >
              <Settings size={16} color="rgba(167,139,250,0.8)" />
            </motion.button>
          </div>
        </div>
      </div>

      {/* Display */}
      <motion.div
        className="relative z-10"
        animate={isShaking ? { x: [-8, 8, -6, 6, -4, 4, -2, 2, 0] } : {}}
        transition={{ duration: 0.5, ease: 'easeOut' }}
      >
        <CalcDisplay
          expression={expression}
          currentValue={display}
          isLocked={isLocked}
          isProcessing={isProcessing}
          processingText={processingText}
        />
      </motion.div>

      {/* Funny status messages */}
      <div className="relative z-10 px-5 py-2">
        <AnimatePresence mode="wait">
          {isProcessing && (
            <motion.div
              key="processing-bar"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="rounded-xl p-2 flex items-center gap-2"
              style={{ background: 'rgba(139,92,246,0.1)', border: '1px solid rgba(139,92,246,0.2)' }}
            >
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 0.8, repeat: Infinity, ease: 'linear' }}
                className="w-4 h-4 rounded-full border-2 flex-shrink-0"
                style={{ borderColor: `${theme.accent} transparent transparent transparent` }}
              />
              <p className="text-xs" style={{ color: `${theme.accent}cc`, fontFamily: "'Space Grotesk'" }}>
                Connecting to premium math servers... 🛸
              </p>
            </motion.div>
          )}
          {mode === 'chaos' && !isProcessing && !isLocked && (
            <motion.div
              key="chaos-warning"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="rounded-xl p-2 text-center"
              style={{ background: 'rgba(239,68,68,0.08)', border: '1px solid rgba(239,68,68,0.2)' }}
            >
              <p className="text-xs" style={{ color: '#fca5a5', fontFamily: "'Space Grotesk'" }}>
                ⚠️ CHAOS MODE: Random taxes will be applied to your result
              </p>
            </motion.div>
          )}
          {mode === 'poor' && !isProcessing && !isLocked && (
            <motion.div
              key="poor-warning"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="rounded-xl p-2 text-center"
              style={{ background: 'rgba(107,114,128,0.08)', border: '1px solid rgba(107,114,128,0.2)' }}
            >
              <p className="text-xs" style={{ color: '#9ca3af', fontFamily: "'Space Grotesk'" }}>
                😢 POOR MODE: You may need a loan for division
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Calculator buttons */}
      <div className="relative z-10 flex-1 px-4 pb-8">
        <div className="grid grid-cols-4 gap-3 h-full" style={{ gridTemplateRows: 'repeat(5, 1fr)' }}>
          {buttons.map((btn, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.02 }}
            >
              <CalcButton
                label={btn.label}
                onClick={btn.onClick}
                type={btn.type}
                disabled={isProcessing || isLocked}
              />
            </motion.div>
          ))}
        </div>
      </div>

      {/* Pricing info strip */}
      <div className="relative z-10 px-5 pb-4">
        <div
          className="rounded-2xl p-2.5 flex items-center justify-around"
          style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)' }}
        >
          {Object.entries(operationPrices).map(([op, price]) => (
            <div key={op} className="text-center">
              <p className="text-base font-bold" style={{ color: 'rgba(220,220,240,0.7)' }}>{op}</p>
              <p className="text-xs font-bold" style={{ color: theme.accent, fontFamily: "'Orbitron', monospace", fontSize: '9px' }}>
                ৳{price}
              </p>
            </div>
          ))}
          <div className="text-center">
            <p className="text-xs" style={{ color: 'rgba(167,139,250,0.4)', fontFamily: "'Space Grotesk'", fontSize: '9px' }}>
              Weekend<br />discount 0%
            </p>
          </div>
        </div>
      </div>

      {/* Overlays */}
      <AnimatePresence>
        {showPayment && (
          <PaymentPopup
            price={price}
            operation={opName}
            onPay={handlePay}
            onWatchAd={handleWatchAd}
            onClose={() => {
              setShowPayment(false);
              setIsLocked(false);
            }}
            funnyReason={reason}
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showAd && (
          <AdScreen onComplete={handleAdComplete} onSkip={handleAdComplete} />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showResult && (
          <ResultReveal
            expression={fullExpression}
            result={resultValue}
            onClose={handleResultClose}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default CalculatorScreen;
