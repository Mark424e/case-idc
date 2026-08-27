"use client";

import React, { useState, useEffect, useRef } from "react";

import { motion, AnimatePresence, useSpring } from "framer-motion";

export default function IdcQuiz() {
  const [slide, setSlide] = useState(1);

  // Evasive Button State

  const [evasivePos, setEvasivePos] = useState({ top: 0, left: 0 });

  // Slider Mechanics State

  const [hasInteracted, setHasInteracted] = useState(false);

  const [sliderAttempts, setSliderAttempts] = useState(0);

  const isDragging = useRef(false);

  // Rubber Ball Spring

  const ballY = useSpring(0, {
    stiffness: 900,

    damping: 12,

    mass: 0.8,
  });

  // Gravity Drain Loop

  useEffect(() => {
    if (slide !== 4) return;

    const interval = setInterval(() => {
      if (!isDragging.current) {
        const currentY = ballY.get();

        if (currentY < 0) {
          ballY.set(Math.min(0, currentY + 50));
        }
      }
    }, 16);

    return () => clearInterval(interval);
  }, [slide, ballY]);

  // Handle Evasive Button Logic (Wide screen-ranging movement)

  const dodgeCursor = () => {
    const screenWidth = typeof window !== "undefined" ? window.innerWidth : 600;

    const screenHeight =
      typeof window !== "undefined" ? window.innerHeight : 800;

    const maxX = Math.min(350, screenWidth / 2 - 80);

    const maxY = Math.min(250, screenHeight / 2 - 100);

    const randomX = (Math.random() - 0.5) * 2 * maxX;

    const randomY = (Math.random() - 0.5) * 2 * maxY;

    setEvasivePos({
      top: randomY,

      left: randomX,
    });
  };

  const nextSlide = () => {
    setEvasivePos({ top: 0, left: 0 });

    setSlide((prev) => prev + 1);
  };

  const handleBallDrop = () => {
    isDragging.current = false;

    ballY.set(0);

    setHasInteracted(true);

    setSliderAttempts((prev) => prev + 1);
  };

  // Stagger Animations

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

      transition: { duration: 0.2, ease: "easeIn" },
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
                slide === step ? "#D81B60" : "rgba(216, 27, 96, 0.25)",
            }}
            transition={{ type: "spring", stiffness: 350, damping: 25 }}
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

        {slide === 2 && (
          <motion.div
            key="slide2"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="flex flex-col items-center text-center max-w-md w-full"
          >
            <motion.h2
              variants={itemVariants}
              className="text-3xl font-extrabold mb-8 leading-tight"
            >
              No, like... do you{" "}
              <span className="text-[#D81B60] italic">really</span> think I'm
              reading all of that?
            </motion.h2>

            <motion.div
              variants={itemVariants}
              className="flex gap-6 justify-center items-center w-full min-h-[100px] relative"
            >
              <motion.button
                onMouseEnter={dodgeCursor}
                onTouchStart={dodgeCursor}
                animate={{
                  x: evasivePos.left,

                  y: evasivePos.top,
                }}
                transition={{
                  type: "spring",

                  stiffness: 600,

                  damping: 15,

                  mass: 0.5,
                }}
                className="bg-white text-black border-2 border-black font-bold py-2.5 px-6 rounded-full shadow cursor-pointer"
              >
                Yes
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={nextSlide}
                className="bg-[#D81B60] text-white border-2 border-black font-bold py-2.5 px-6 rounded-full shadow z-10 cursor-pointer"
              >
                No
              </motion.button>
            </motion.div>

            <motion.p
              variants={itemVariants}
              className="text-xs text-gray-500 mt-6"
            >
              (choose wisely)
            </motion.p>
          </motion.div>
        )}

        {slide === 3 && (
          <motion.div
            key="slide3"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="flex flex-col items-center text-center max-w-md w-full"
          >
            <motion.span
              variants={itemVariants}
              className="text-6xl mb-4 inline-block"
            >
              🎉
            </motion.span>

            <motion.h2
              variants={itemVariants}
              className="text-4xl font-black mb-2"
            >
              You're right!
            </motion.h2>

            <motion.h3
              variants={itemVariants}
              className="text-2xl font-bold mb-4"
            >
              You're just wasting your time.
            </motion.h3>

            <motion.p
              variants={itemVariants}
              className="text-sm text-gray-600 mb-8"
            >
              Absolutely nobody asked for that essay.
            </motion.p>

            <motion.button
              variants={itemVariants}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={nextSlide}
              className="bg-[#D81B60] text-white border-2 border-black font-bold py-3.5 px-8 rounded-full shadow-lg text-lg cursor-pointer"
            >
              Continue 💀
            </motion.button>
          </motion.div>
        )}

        {slide === 4 && (
          <motion.div
            key="slide4"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="flex flex-col items-center text-center max-w-md w-full"
          >
            <motion.h2
              variants={itemVariants}
              className="text-2xl font-bold mb-1"
            >
              On a scale of "don't care at all" to "care sooo much"...
            </motion.h2>

            <motion.p
              variants={itemVariants}
              className="text-xs text-gray-600 mb-6"
            >
              How much do I actually care about your message?
            </motion.p>

            <motion.div
              variants={itemVariants}
              className="flex flex-col items-center gap-3 mb-6"
            >
              <span className="text-xs font-extrabold text-[#D81B60] tracking-wide">
                I CARE SOOO MUCH 😼
              </span>

              <div className="relative flex justify-center items-end">
                <div
                  className="w-12 h-64 bg-white border-2 border-black rounded-full relative cursor-grab active:cursor-grabbing touch-none p-1 flex justify-center"
                  onPointerDown={(e) => {
                    isDragging.current = true;

                    e.currentTarget.setPointerCapture(e.pointerId);

                    const rect = e.currentTarget.getBoundingClientRect();

                    const rawOffsetY = Math.max(
                      0,
                      rect.bottom - e.clientY - 24,
                    );

                    const maxHeight = rect.height - 48;

                    const resistedY = Math.min(maxHeight, rawOffsetY * 0.25);

                    ballY.set(-resistedY);
                  }}
                  onPointerMove={(e) => {
                    if (!isDragging.current) return;

                    const rect = e.currentTarget.getBoundingClientRect();

                    const rawOffsetY = Math.max(
                      0,
                      rect.bottom - e.clientY - 24,
                    );

                    const maxHeight = rect.height - 48;

                    const resistedY = Math.min(maxHeight, rawOffsetY * 0.25);

                    ballY.set(-resistedY);
                  }}
                  onPointerUp={(e) => {
                    e.currentTarget.releasePointerCapture(e.pointerId);

                    handleBallDrop();
                  }}
                  onPointerCancel={() => {
                    handleBallDrop();
                  }}
                >
                  <motion.div
                    style={{ y: ballY }}
                    className="w-10 h-10 bg-[#D81B60] border-2 border-black rounded-full flex items-center justify-center text-sm shadow-md absolute bottom-1 pointer-events-none select-none"
                  >
                    💅
                  </motion.div>
                </div>
              </div>

              <span className="text-xs font-extrabold text-gray-700 tracking-wide">
                I DON'T CARE AT ALL 🐱
              </span>
            </motion.div>

            <div className="w-full h-24 relative flex flex-col items-center justify-start">
              <AnimatePresence>
                {sliderAttempts >= 3 && (
                  <motion.p
                    initial={{ opacity: 0, y: -6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="text-xs text-[#D81B60] font-semibold absolute top-0"
                  >
                    Oops... it keeps slipping down 🥑
                  </motion.p>
                )}
              </AnimatePresence>

              {hasInteracted && (
                <motion.button
                  initial={{ opacity: 0, scale: 0.9, y: 10 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={nextSlide}
                  className="w-full bg-[#D81B60] text-white border-2 border-black font-black py-3.5 px-6 rounded-full shadow-lg text-lg absolute bottom-0 cursor-pointer"
                >
                  DING DING DING 🔔
                </motion.button>
              )}
            </div>
          </motion.div>
        )}

        {slide === 5 && (
          <motion.div
            key="slide5"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="flex flex-col items-center text-center max-w-md w-full"
          >
            <motion.h2
              variants={itemVariants}
              className="text-3xl font-extrabold mb-8 leading-snug"
            >
              Can you please stop texting me?
            </motion.h2>

            <motion.div
              variants={itemVariants}
              className="flex gap-6 justify-center items-center w-full min-h-[100px] relative"
            >
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={nextSlide}
                className="bg-[#D81B60] text-white border-2 border-black font-bold py-2.5 px-6 rounded-full shadow z-10 cursor-pointer"
              >
                Yes
              </motion.button>

              <motion.button
                onMouseEnter={dodgeCursor}
                onTouchStart={dodgeCursor}
                animate={{
                  x: evasivePos.left,

                  y: evasivePos.top,
                }}
                transition={{
                  type: "spring",

                  stiffness: 600,

                  damping: 15,

                  mass: 0.5,
                }}
                className="bg-white text-black border-2 border-black font-bold py-2.5 px-6 rounded-full shadow cursor-pointer"
              >
                No
              </motion.button>
            </motion.div>

            <motion.p
              variants={itemVariants}
              className="text-xs text-gray-500 mt-6"
            >
              (there is only one right answer)
            </motion.p>
          </motion.div>
        )}

        {slide === 6 && (
          <motion.div
            key="slide6"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="flex flex-col items-center text-center max-w-md w-full"
          >
            <motion.h2
              variants={itemVariants}
              className="text-5xl font-black mb-2 tracking-tight"
            >
              THANK GOD
            </motion.h2>

            <motion.div variants={itemVariants} className="text-3xl mb-4">
              💅 💅 💅
            </motion.div>

            <motion.p
              variants={itemVariants}
              className="text-sm font-medium text-gray-700 mb-8"
            >
              Glad we could clear that up. Have the day you deserve! ✨
            </motion.p>

            <motion.div
              variants={itemVariants}
              className="flex gap-3 w-full mb-6"
            >
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={() =>
                  navigator.clipboard?.writeText(window.location.href)
                }
                className="flex-1 bg-[#D81B60] text-white border-2 border-black font-bold py-2.5 px-4 rounded-full shadow text-sm cursor-pointer"
              >
                Share with a friend 💌
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => {
                  setSlide(1);

                  setHasInteracted(false);

                  setSliderAttempts(0);

                  ballY.set(0);
                }}
                className="flex-1 bg-white text-black border-2 border-black font-bold py-2.5 px-4 rounded-full shadow text-sm cursor-pointer"
              >
                Replay 🔄
              </motion.button>
            </motion.div>

            <motion.p
              variants={itemVariants}
              className="text-[10px] text-gray-400 max-w-xs"
            >
              Send this link to anyone whose essay-length texts you simply will
              not be reading.
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
