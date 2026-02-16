
import React, { ReactNode } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface StageWrapperProps {
  children: ReactNode;
  isActive: boolean;
  onTap?: () => void;
  className?: string;
}

const StageWrapper: React.FC<StageWrapperProps> = ({ children, isActive, onTap, className = "" }) => {
  return (
    <AnimatePresence>
      {isActive && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 1.05 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          onClick={onTap}
          className={`fixed inset-0 w-full h-[100dvh] flex flex-col items-center justify-center overflow-hidden p-6 text-center select-none ${className}`}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default StageWrapper;
