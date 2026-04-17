import { useState } from 'react';
import { Button } from '../components/ui/Button';
import { Shield, Key } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface PinLockPageProps {
  onSuccess: () => void;
}

export function PinLockPage({ onSuccess }: PinLockPageProps) {
  const [pin, setPin] = useState('');
  const [error, setError] = useState(false);
  const correctPin = '1234'; // Default PIN for demo

  const handleKeyPress = (num: string) => {
    if (pin.length < 4) {
      const newPin = pin + num;
      setPin(newPin);
      
      if (newPin.length === 4) {
        if (newPin === correctPin) {
          onSuccess();
        } else {
          setError(true);
          setTimeout(() => {
            setPin('');
            setError(false);
          }, 600);
        }
      }
    }
  };

  const handleClear = () => setPin('');

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center">
      <div className="max-w-sm w-full space-y-12">
        <div className="text-center">
          <div className="w-16 h-16 bg-red-600/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <Shield className="text-red-500 w-8 h-8" />
          </div>
          <h2 className="text-2xl font-bold text-white">Security Scan</h2>
          <p className="text-slate-500 mt-2">Enter your 4-digit security PIN</p>
        </div>

        <div className="flex justify-center gap-4">
          {[0, 1, 2, 3].map((i) => (
            <motion.div
              key={i}
              animate={error ? { x: [-5, 5, -5, 5, 0] } : {}}
              className={`w-12 h-16 border-2 rounded-2xl flex items-center justify-center text-2xl font-bold transition-all ${
                pin[i] 
                  ? "border-red-500 bg-red-500/10 text-white" 
                  : "border-slate-800 bg-slate-900/50 text-slate-700"
              }`}
            >
              <AnimatePresence>
                {pin[i] && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0 }}
                    className="w-3 h-3 bg-white rounded-full"
                  />
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>

        <div className="grid grid-cols-3 gap-3">
          {['1', '2', '3', '4', '5', '6', '7', '8', '9'].map((num) => (
            <button
              key={num}
              onClick={() => handleKeyPress(num)}
              className="h-16 rounded-2xl bg-slate-900 border border-slate-800 text-white text-xl font-bold hover:bg-slate-800 active:scale-95 transition-all outline-none"
            >
              {num}
            </button>
          ))}
          <button
            onClick={handleClear}
            className="h-16 rounded-2xl bg-slate-900 border border-slate-800 text-slate-500 text-sm font-bold hover:bg-slate-800 active:scale-95 transition-all outline-none"
          >
            Clear
          </button>
          <button
            onClick={() => handleKeyPress('0')}
            className="h-16 rounded-2xl bg-slate-900 border border-slate-800 text-white text-xl font-bold hover:bg-slate-800 active:scale-95 transition-all outline-none"
          >
            0
          </button>
          <div className="h-16 rounded-2xl bg-slate-900/50 border border-slate-800 flex items-center justify-center">
            <Key className="w-6 h-6 text-slate-700" />
          </div>
        </div>

        <p className="text-center text-xs text-slate-600 italic">
          Default PIN is 1234
        </p>
      </div>
    </div>
  );
}
