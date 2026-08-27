'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function IdcQuiz() {
  const [slide, setSlide] = useState(1);

  const nextSlide = () => {
    setSlide((prev) => prev + 1);
  };

  const containerVariants = {
    hidden: { opacity: 0, y: 20, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.4,
        ease: [0.16, 1, 0.3, 1],
        staggerChildren: 0.15,
      },
    },
    exit: {
      opacity: 0,
      y: -20,
      scale: 0.95,
      transition: { duration: 0.2, ease: 'easeIn' },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
  };

  return (
    <main className="min-h-screen bg-[#FFF0F5] text-[#3D2645] flex flex-col items-center justify-center p-4 relative overflow-hidden font-sans select-none">
      <div className="absolute top-8 flex gap-2.5 z-10">
        {[1, 2, 3, 4, 5, 6].map((step) => (
          <motion.div
            key={step}
            animate={{
              width: slide === step ? 32 : 10,
              backgroundColor:
                slide === step ? '#D81B60' : 'rgba(216, 27, 96, 0.25)',
            }}
            transition={{ type: 'spring', stiffness: 350, damping: 25 }}
            className="h-2.5 rounded-full"
          />
        ))}
      </div>

      <AnimatePresence mode="wait">
        {slide === 1 && (
          <motion.div
            key="slide1"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="flex flex-col items-center text-center max-w-md w-full"
          >
            <motion.h1
              variants={itemVariants}
              className="text-5xl font-black text-[#D81B60] mb-1 tracking-tight"
            >
              idc.
            </motion.h1>
            <motion.p
              variants={itemVariants}
              className="text-xs font-bold tracking-widest text-[#D81B60]/60 uppercase mb-8"
            >
              A quiz for the unbothered
            </motion.p>
            <motion.h2
              variants={itemVariants}
              className="text-3xl font-extrabold mb-10 leading-snug"
            >
              Do you really think I'm reading all of this?
            </motion.h2>
            <motion.button
              variants={itemVariants}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={nextSlide}
              className="bg-[#D81B60] text-white font-bold py-3.5 px-9 rounded-full shadow-lg border-2 border-black text-lg cursor-pointer"
            >
              Next →
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}