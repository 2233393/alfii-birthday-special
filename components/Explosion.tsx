
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const Explosion: React.FC<{ onComplete: () => void }> = ({ onComplete }) => {
  const particles = Array.from({ length: 50 }).map((_, i) => {
    const angle = (i / 50) * Math.PI * 2;
    const velocity = 100 + Math.random() * 300;
    return {
      id: i,
      x: Math.cos(angle) * velocity,
      y: Math.sin(angle) * velocity,
      color: ["#ff7eb3", "#ff758c", "#ff9a9e", "#fad0c4", "#ffd1ff"][Math.floor(Math.random() * 5)],
      size: 4 + Math.random() * 8,
    };
  });

  useEffect(() => {
    const timer = setTimeout(onComplete, 2500);
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <div className="relative w-full h-full flex items-center justify-center">
      {/* Glow Wave */}
      <motion.div
        className="absolute w-10 h-10 rounded-full bg-pink-200"
        initial={{ scale: 0, opacity: 1 }}
        animate={{ scale: 30, opacity: 0 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
      />
      
      {/* Sparkle Rays */}
      {Array.from({ length: 8 }).map((_, i) => (
        <motion.div
          key={`ray-${i}`}
          className="absolute h-[1px] bg-white w-[200px]"
          style={{ rotate: i * 45 }}
          initial={{ scaleX: 0, opacity: 1 }}
          animate={{ scaleX: 2, opacity: 0 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
        />
      ))}

      {/* Glitter Particles */}
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full"
          style={{
            backgroundColor: p.color,
            width: p.size,
            height: p.size,
            boxShadow: `0 0 10px ${p.color}`,
          }}
          initial={{ x: 0, y: 0, opacity: 1, scale: 1 }}
          animate={{ 
            x: p.x, 
            y: p.y, 
            opacity: 0, 
            scale: 0,
            rotate: 360 
          }}
          transition={{ duration: 1.8, ease: "backOut" }}
        />
      ))}
    </div>
  );
};

export default Explosion;
