"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";

// Array of images for the right-side carousel
const heroImages = [
  "/lab_hero.png",
  "/corporate_hero.png",
  "/pharma_hero.png"
];

const variants = {
  enter: (direction: number) => {
    return {
      x: direction > 0 ? "100%" : "-100%",
      opacity: 0.8
    };
  },
  center: {
    zIndex: 1,
    x: 0,
    opacity: 1
  },
  exit: (direction: number) => {
    return {
      zIndex: 0,
      x: direction < 0 ? "100%" : "-100%",
      opacity: 0.8
    };
  }
};

const focusAreas = [
  {
    title: "Metabolic Healthcare",
    desc: "Precision treatments for insulin resistance management and endocrine disorders.",
  },
  {
    title: "Reproductive Wellness",
    desc: "Innovative hormonal treatments designed to support reproductive health.",
  },
  {
    title: "Global Standards",
    desc: "Delivering WHO-GMP certified products to international health providers.",
  }
];

export default function Hero() {
  const [[page, direction], setPage] = useState([0, 0]);

  // Wrap around index safely for infinite scrolling
  const imageIndex = ((page % heroImages.length) + heroImages.length) % heroImages.length;

  const paginate = (newDirection: number) => {
    setPage([page + newDirection, newDirection]);
  };

  // Auto-play the sliding images
  useEffect(() => {
    const timer = setInterval(() => {
      paginate(1);
    }, 6000);
    return () => clearInterval(timer);
  }, [page]);

  return (
    <section id="home" className="w-full bg-white pt-24 pb-24 relative overflow-hidden">
      
      {/* ── MAIN HERO SECTION ── */}
      <div className="max-w-[1650px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 w-full relative z-10 flex flex-col lg:flex-row items-center gap-12 lg:gap-10 mb-24 lg:mb-32">
        
        {/* TEXT CONTENT - LEFT */}
        <div className="w-full lg:w-1/2 flex flex-col text-center lg:text-left items-center lg:items-start">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="flex items-center gap-3 mb-6"
          >
            <span className="w-12 h-px bg-[#C9A048]" />
            <span className="text-brand-blue font-bold tracking-[0.3em] text-[10px] uppercase">Pioneering Healthcare</span>
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-4xl sm:text-5xl lg:text-6xl xl:text-[4.75rem] font-serif font-bold text-gray-900 leading-[1.12] mb-8"
          >
            Illuminating Health through <br className="hidden lg:block" /><span style={{ background: "linear-gradient(105deg, #C9A048 10%, #f5e48a 55%, #C9A048 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>Science-Driven Formulations</span>
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-lg md:text-xl lg:text-xl text-gray-600 font-sans leading-relaxed mb-12 max-w-2xl"
          >
            Based in the bulk drug capital of India, we are committed to addressing complex metabolic and reproductive disorders 
            with precision-crafted generic solutions that bridge the gap between quality and accessibility.
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <button className="px-10 py-4.5 bg-brand-blue hover:bg-brand-blue-dark rounded-full text-white font-bold uppercase tracking-wider text-[12px] shadow-2xl shadow-brand-blue/30 transition-all duration-300 transform hover:-translate-y-1 flex items-center justify-center gap-3">
              Explore Products
              <ArrowRight className="w-4 h-4 text-[#C9A048]" />
            </button>
          </motion.div>
        </div>

        {/* IMAGE CONTENT - RIGHT */}
        <div className="w-full lg:w-1/2 flex justify-center lg:justify-end relative">
          <motion.div
             initial={{ opacity: 0, scale: 0.95 }}
             animate={{ opacity: 1, scale: 1 }}
             transition={{ duration: 1, ease: "easeOut", delay: 0.3 }}
             className="group relative w-full max-w-2xl lg:max-w-[750px] aspect-[16/10] rounded-[2rem] overflow-hidden border-[12px] lg:border-[16px] border-white shadow-[0_40px_80px_rgba(0,0,0,0.1)] bg-gray-50 flex items-center justify-center"
          >
            <AnimatePresence initial={false} custom={direction}>
              <motion.img 
                key={page}
                src={heroImages[imageIndex]} 
                alt="Dhinakar Pharma" 
                custom={direction}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 1.2, ease: [0.65, 0, 0.35, 1] }}
                className="absolute inset-0 w-full h-full object-cover"
              />
            </AnimatePresence>
            
            <div className="absolute inset-0 bg-gradient-to-t from-brand-blue/20 to-transparent z-10 pointer-events-none" />

            {/* Arrow Controls */}
            <div className="absolute inset-y-0 left-0 right-0 z-20 flex items-center justify-between px-6 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300">
               <button onClick={(e) => { e.stopPropagation(); paginate(-1); }} className="pointer-events-auto p-4 rounded-full bg-white/20 backdrop-blur-md hover:bg-white text-white hover:text-brand-blue shadow-lg transition-all">
                  <ChevronLeft className="w-5 h-5" />
               </button>
               <button onClick={(e) => { e.stopPropagation(); paginate(1); }} className="pointer-events-auto p-4 rounded-full bg-white/20 backdrop-blur-md hover:bg-white text-white hover:text-brand-blue shadow-lg transition-all">
                  <ChevronRight className="w-5 h-5" />
               </button>
            </div>
          </motion.div>
        </div>

      </div>

      {/* ── FOCUS AREAS SECTION (AS REQUESTED) ── */}
      <div className="max-w-[1500px] mx-auto px-6 lg:px-12 text-center">
        
        {/* Expertise Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex items-center justify-center gap-6 mb-6"
        >
          <div className="h-px w-12 sm:w-20 bg-gray-200" />
          <p className="text-[10px] sm:text-[11px] font-bold text-gray-400 tracking-[0.4em] uppercase">Dedicated Core Expertise</p>
          <div className="h-px w-12 sm:w-20 bg-gray-200" />
        </motion.div>

        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-4xl md:text-5xl font-serif font-bold text-brand-blue mb-6"
        >
          Our Focus Areas
        </motion.h2>

        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="text-gray-500 text-sm sm:text-base max-w-2xl mx-auto mb-16 leading-relaxed"
        >
          We concentrate our scientific activities on complex generic products for global markets.
        </motion.p>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 sm:gap-10">
          {focusAreas.map((area, i) => (
            <motion.div
              key={area.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 + (i * 0.1) }}
              className="bg-white p-10 sm:p-12 rounded-2xl border border-gray-50 shadow-[0_15px_45px_rgba(0,0,0,0.03)] hover:shadow-[0_25px_60px_rgba(0,0,0,0.06)] transition-all duration-500 flex flex-col items-center group"
            >
              <h3 className="text-xl sm:text-2xl font-serif font-bold text-brand-blue mb-4 group-hover:text-[#C9A048] transition-colors">{area.title}</h3>
              <p className="text-gray-500 text-[13px] sm:text-sm leading-relaxed">{area.desc}</p>
            </motion.div>
          ))}
        </div>

      </div>

    </section>
  );
}
