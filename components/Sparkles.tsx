
import React, { useMemo } from 'react';
import { motion } from 'framer-motion';

const Sparkles: React.FC<{ count?: number; color?: string }> = ({ count = 20, color = "#fff" }) => {
  const sparkles = useMemo(() => {
    return Array.from({ length: count }).map((_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      duration: 2 + Math.random() * 3,
      delay: Math.random() * 2,
      size: 2 + Math.random() * 4,
    }));
  }, [count]);

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {sparkles.map((s) => (
        <motion.div
          key={s.id}
          className="absolute rounded-full"
          style={{
            backgroundColor: color,
            left: s.left,
            top: s.top,
            width: s.size,
            height: s.size,
            boxShadow: `0 0 ${s.size * 2}px ${color}`,
          }}
          animate={{
            opacity: [0, 0.8, 0],
            scale: [0.5, 1.2, 0.5],
            y: [0, -20, 0],
          }}
          transition={{
            duration: s.duration,
            repeat: Infinity,
            delay: s.delay,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
};

export default Sparkles;
