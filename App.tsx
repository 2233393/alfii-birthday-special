
import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Stage } from './types';
import StageWrapper from './components/StageWrapper';
import Sparkles from './components/Sparkles';
import TeddyBears from './components/TeddyBears';
import Explosion from './components/Explosion';

const App: React.FC = () => {
  const [currentStage, setCurrentStage] = useState<Stage>(Stage.OPENING);
  const [isVibrating, setIsVibrating] = useState(false);

  const nextStage = useCallback(() => {
    const stages = Object.values(Stage);
    const currentIndex = stages.indexOf(currentStage);
    if (currentIndex < stages.length - 1) {
      setCurrentStage(stages[currentIndex + 1]);
    }
  }, [currentStage]);

  const restart = () => setCurrentStage(Stage.OPENING);

  // Trigger stage specific effects
  useEffect(() => {
    if (currentStage === Stage.NAME_REVEAL) {
      setIsVibrating(true);
      const timer = setTimeout(() => setIsVibrating(false), 2000);
      return () => clearTimeout(timer);
    }
  }, [currentStage]);

  return (
    <main className="relative w-full h-[100dvh] bg-black overflow-hidden font-sans text-white">
      {/* Background Layer: Persistent for transitions */}
      <AnimatePresence mode="wait">
        {currentStage === Stage.OPENING && (
          <motion.div
            key="bg-opening"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-[#0a0a0a]"
          />
        )}
        {currentStage !== Stage.OPENING && currentStage !== Stage.DREAMY_ENDING && (
          <motion.div
            key="bg-main"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-gradient-to-br from-pink-50 via-white to-purple-50"
          />
        )}
        {currentStage === Stage.DREAMY_ENDING && (
          <motion.div
            key="bg-ending"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="absolute inset-0 bg-[#020617] bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-slate-900 via-slate-950 to-black"
          />
        )}
      </AnimatePresence>

      {/* Stage 1: Opening */}
      <StageWrapper isActive={currentStage === Stage.OPENING} onTap={nextStage}>
        <Sparkles count={30} color="#ffb7c5" />
        <motion.p 
          className="text-xl md:text-2xl font-serif text-pink-100 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 2 }}
        >
          Something special was created just for you…
        </motion.p>
        <motion.div
          animate={{ scale: [1, 1.1, 1], opacity: [0.5, 1, 0.5] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="text-pink-300 font-medium tracking-widest uppercase text-sm"
        >
          Tap gently 💖
        </motion.div>
      </StageWrapper>

      {/* Stage 2: Emotional Build-Up */}
      <StageWrapper isActive={currentStage === Stage.BUILD_UP} onTap={nextStage}>
        <TeddyBears />
        <div className="relative z-10 px-8 text-slate-800">
          <motion.h2 
            className="text-2xl font-serif italic mb-6 text-pink-500"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 1.5 }}
          >
            Today is not just a normal day…
          </motion.h2>
          <motion.p
            className="text-lg leading-relaxed font-light"
            initial={{ width: 0, opacity: 0 }}
            animate={{ width: "100%", opacity: 1 }}
            transition={{ delay: 2.5, duration: 3 }}
          >
            It’s the day the world received someone extraordinary.
          </motion.p>
          <Sparkles count={15} color="#f472b6" />
        </div>
      </StageWrapper>

      {/* Stage 3: Name Reveal */}
      <StageWrapper isActive={currentStage === Stage.NAME_REVEAL} onTap={nextStage}>
        <div className={`relative flex flex-col items-center px-4 ${isVibrating ? 'animate-bounce' : ''}`}>
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ type: "spring", damping: 10, stiffness: 100 }}
            className="text-5xl font-serif text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-rose-500 to-purple-600 mb-4 text-center leading-tight"
          >
            🎉 Happy Birthday <br/> <span className="drop-shadow-lg shadow-rose-300">Aafiya Jahan</span> 🎂
          </motion.div>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="text-slate-500 text-sm italic"
          >
            Tap to see your surprise...
          </motion.p>
          {/* Floating Hearts */}
          {Array.from({ length: 10 }).map((_, i) => (
            <motion.div
              key={i}
              className="absolute text-2xl"
              initial={{ y: 200, x: (i - 5) * 40, opacity: 0 }}
              animate={{ y: -400, opacity: [0, 1, 0], x: (i - 5) * 45 + Math.sin(i) * 30 }}
              transition={{ duration: 4, repeat: Infinity, delay: i * 0.3 }}
            >
              💖
            </motion.div>
          ))}
        </div>
      </StageWrapper>

      {/* Stage 4: Gift Suspense */}
      <StageWrapper isActive={currentStage === Stage.GIFT_SUSPENSE} onTap={nextStage}>
        <div className="flex flex-col items-center">
          <motion.div
            animate={{ 
              rotate: [-2, 2, -2],
              y: [0, -10, 0]
            }}
            transition={{ repeat: Infinity, duration: 0.5 }}
            className="relative w-48 h-48 mb-12"
          >
            <div className="absolute inset-0 bg-rose-500 rounded-lg shadow-2xl flex items-center justify-center border-4 border-rose-300">
              <div className="w-full h-8 bg-rose-300 absolute" />
              <div className="h-full w-8 bg-rose-300 absolute" />
              <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center -top-8 absolute shadow-lg border-2 border-rose-200">
                🎀
              </div>
            </div>
            <div className="absolute inset-0 bg-white/10 blur-xl scale-125 animate-pulse" />
          </motion.div>
          <motion.p 
            className="text-slate-700 font-serif italic text-xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            I have something for you…
          </motion.p>
          <motion.p 
            className="text-rose-500 font-bold mt-2 animate-pulse"
          >
            Tap the gift slowly…
          </motion.p>
        </div>
      </StageWrapper>

      {/* Stage 5: Magical Explosion */}
      <StageWrapper isActive={currentStage === Stage.MAGICAL_EXPLOSION} className="bg-white">
        <Explosion onComplete={nextStage} />
      </StageWrapper>

      {/* Stage 6: Personal Love Message */}
      <StageWrapper isActive={currentStage === Stage.LOVE_MESSAGE} onTap={nextStage}>
        <motion.div 
          className="w-[90%] max-w-sm bg-white/40 backdrop-blur-xl border border-white/60 p-8 rounded-3xl shadow-2xl relative z-10"
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <div className="text-slate-800 space-y-4 font-light text-left">
            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }} className="font-serif text-2xl text-pink-600 mb-4">Aafiya,</motion.p>
            {[
              "You are one of the most precious blessings in my life.",
              "Your smile changes everything.",
              "Your presence makes the world softer.",
              "I truly hope this year brings you happiness beyond imagination."
            ].map((line, idx) => (
              <motion.p
                key={idx}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1.5 + idx * 1.5, duration: 1 }}
                className="leading-relaxed"
              >
                {line}
              </motion.p>
            ))}
          </div>
          {/* Glow around name in message */}
          <motion.div 
            className="absolute top-8 left-8 w-16 h-8 bg-pink-200/50 blur-xl rounded-full -z-10"
            animate={{ opacity: [0.3, 0.7, 0.3] }}
            transition={{ repeat: Infinity, duration: 2 }}
          />
          {/* Floating tiny hearts around card */}
          {Array.from({ length: 6 }).map((_, i) => (
            <motion.div
              key={i}
              className="absolute text-xl"
              style={{ 
                top: `${Math.random() * 100}%`, 
                left: `${Math.random() * 100}%` 
              }}
              animate={{ 
                scale: [0.8, 1.2, 0.8],
                rotate: [0, 20, -20, 0]
              }}
              transition={{ repeat: Infinity, duration: 3, delay: i * 0.5 }}
            >
              💕
            </motion.div>
          ))}
        </motion.div>
      </StageWrapper>

      {/* Stage 7: Dreamy Ending */}
      <StageWrapper isActive={currentStage === Stage.DREAMY_ENDING}>
        <div className="absolute inset-0 pointer-events-none">
          {Array.from({ length: 50 }).map((_, i) => (
            <motion.div
              key={i}
              className="absolute bg-white rounded-full"
              style={{
                width: Math.random() * 3,
                height: Math.random() * 3,
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
              }}
              animate={{
                opacity: [0.2, 1, 0.2],
              }}
              transition={{
                duration: 2 + Math.random() * 3,
                repeat: Infinity,
                delay: Math.random() * 5,
              }}
            />
          ))}
        </div>

        <div className="z-10 text-center px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 2 }}
            className="space-y-4 mb-16"
          >
            <p className="text-slate-400 tracking-[0.3em] text-xs uppercase">Aafiya Jahan</p>
            <h1 className="text-3xl font-serif text-white/90">
              You are rare. <br/>
              You are special. <br/>
              And today… <br/>
              the universe celebrates you.
            </h1>
          </motion.h1>
          
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 3, duration: 2 }}
            className="mt-8"
          >
            <h2 className="text-4xl font-serif text-transparent bg-clip-text bg-gradient-to-t from-rose-400 to-pink-200 mb-2">
              Happy Birthday 💖
            </h2>
            <p className="text-rose-300 font-serif text-2xl drop-shadow-[0_0_15px_rgba(255,192,203,0.8)]">Aafiya Jahan</p>
          </motion.div>
        </div>

        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 6 }}
          onClick={restart}
          className="absolute bottom-12 px-6 py-2 rounded-full border border-white/20 text-white/60 text-sm tracking-widest hover:bg-white/10 transition-colors uppercase"
        >
          Restart Story
        </motion.button>

        {/* Falling sparkles */}
        <Sparkles count={40} color="#ffd700" />
      </StageWrapper>

      {/* Persistent Touch Feedback Overlay */}
      <div className="fixed inset-0 pointer-events-none z-[100] active:bg-white/5 transition-colors duration-100" />
    </main>
  );
};

export default App;
