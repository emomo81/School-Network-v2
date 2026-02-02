import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Step1CreateAccount from './Step1CreateAccount';
import Step2ProfileSetup from './Step2ProfileSetup';
import Step3DepartmentSelection from './Step3DepartmentSelection';

interface OnboardingFlowProps {
  onComplete: (data: any) => void;
}

export default function OnboardingFlow({ onComplete }: OnboardingFlowProps) {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    fullName: '',
    displayName: '',
    avatar: '',
    department: '',
  });

  const handleNext = (data: any) => {
    setFormData({ ...formData, ...data });
    if (currentStep === 3) {
      onComplete({ ...formData, ...data });
    } else {
      setCurrentStep(currentStep + 1);
    }
  };

  return (
    <div className="min-h-screen bg-[#0F1012] flex flex-col items-center justify-center relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-20 left-20 w-96 h-96 bg-[#1C8AF8]/10 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl" />
      </div>

      {/* Logo */}
      <div className="absolute top-8 left-0 right-0 flex justify-center z-10">
        <div className="text-white font-bold text-2xl flex items-center gap-2">
          <div className="w-8 h-8 bg-[#1C8AF8] rounded-lg flex items-center justify-center">
            <span className="text-white text-xl">U</span>
          </div>
          UniHub
        </div>
      </div>

      {/* Progress indicator */}
      <div className="absolute top-24 left-0 right-0 flex justify-center gap-4 z-10">
        {[1, 2, 3].map((step) => (
          <div key={step} className="flex items-center gap-3">
            <div
              className={`flex items-center justify-center w-8 h-8 rounded-full border transition-all ${
                currentStep >= step
                  ? 'bg-[#1C8AF8] border-[#1C8AF8] text-white'
                  : 'bg-transparent border-white/20 text-white/40'
              }`}
            >
              <span className="text-sm font-medium">{step}</span>
            </div>
            {step < 3 && (
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                className="text-white/20"
              >
                <path
                  d="M6 12L10 8L6 4"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            )}
          </div>
        ))}
      </div>

      {/* Steps content */}
      <div className="w-full max-w-md z-10 px-4">
        <AnimatePresence mode="wait">
          {currentStep === 1 && (
            <motion.div
              key="step1"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              <Step1CreateAccount onNext={handleNext} />
            </motion.div>
          )}
          {currentStep === 2 && (
            <motion.div
              key="step2"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              <Step2ProfileSetup onNext={handleNext} initialData={formData} />
            </motion.div>
          )}
          {currentStep === 3 && (
            <motion.div
              key="step3"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              <Step3DepartmentSelection onNext={handleNext} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Bottom decoration */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full max-w-7xl opacity-20 pointer-events-none">
        <svg viewBox="0 0 1200 300" fill="none" className="w-full">
          <path
            d="M0 150 Q300 50, 600 150 T1200 150"
            stroke="url(#gradient)"
            strokeWidth="2"
          />
          <defs>
            <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#1C8AF8" stopOpacity="0" />
              <stop offset="50%" stopColor="#1C8AF8" stopOpacity="1" />
              <stop offset="100%" stopColor="#A855F7" stopOpacity="0" />
            </linearGradient>
          </defs>
        </svg>
      </div>
    </div>
  );
}
