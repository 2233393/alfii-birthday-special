
import React from 'react';
import { motion } from 'framer-motion';

const TeddyBears: React.FC = () => {
  const bears = Array.from({ length: 6 }).map((_, i) => ({
    id: i,
    left: `${Math.random() * 90}%`,
    delay: i * 0.5,
    size: 40 + Math.random() * 40,
    duration: 15 + Math.random() * 10,
  }));

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-0 opacity-40">
      {bears.map((b) => (
        <motion.div
          key={b.id}
          className="absolute"
          initial={{ y: "110vh", opacity: 0 }}
          animate={{ 
            y: "-20vh", 
            opacity: [0, 1, 1, 0],
            rotate: [0, 15, -15, 0],
            x: [0, 20, -20, 0]
          }}
          transition={{
            duration: b.duration,
            repeat: Infinity,
            delay: b.delay,
            ease: "linear",
          }}
          style={{ left: b.left, fontSize: `${b.size}px` }}
        >
          🧸
        </motion.div>
      ))}
    </div>
  );
};

export default TeddyBears;
