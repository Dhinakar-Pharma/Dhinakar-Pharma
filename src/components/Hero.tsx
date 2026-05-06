"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, ChevronLeft, ChevronRight, ShieldCheck, Beaker, Award } from "lucide-react";
import Link from "next/link";

// Array of images for the right-side carousel
const heroImages = [
  "/lab_hero.png",
  "/scientific_hero.png",
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
      <div className="max-w-[1700px] mx-auto px-6 lg:px-12 w-full relative z-10 flex flex-col lg:flex-row items-center gap-12 lg:gap-16 mb-24 lg:mb-32">

        {/* TEXT CONTENT - LEFT */}
        <div className="w-full lg:w-[47%] flex flex-col text-center lg:text-left items-center lg:items-start">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="flex items-center gap-3 mb-6"
          >
            <span className="w-12 h-px bg-[#C9A048]" />
            <span className="text-brand-blue font-bold tracking-[0.4em] text-[11px] uppercase">Pioneering Healthcare</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-4xl sm:text-5xl lg:text-6xl xl:text-[5rem] font-serif font-bold text-gray-900 leading-[1.05] mb-8"
          >
            Dhinakar Pharma: <br className="hidden lg:block" />Illuminating Health through <br className="hidden lg:block" /><span style={{ background: "linear-gradient(105deg, #C9A048 10%, #f5e48a 55%, #C9A048 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>Science-Driven Formulations</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-lg md:text-xl text-gray-600 font-sans leading-relaxed mb-12 max-w-xl"
          >
            Based in the bulk drug capital of India, we are committed to addressing complex metabolic and reproductive disorders
            with precision-crafted generic solutions that bridge the gap between quality and accessibility.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <Link href="/products" className="px-10 py-4.5 bg-brand-blue hover:bg-brand-blue-dark rounded-full text-white font-bold uppercase tracking-wider text-[12px] shadow-2xl shadow-brand-blue/30 transition-all duration-300 transform hover:-translate-y-1 inline-flex items-center justify-center gap-3 w-max">
              Explore Products
              <ArrowRight className="w-4 h-4 text-[#C9A048]" />
            </Link>
          </motion.div>
        </div>

        {/* IMAGE CONTENT - RIGHT (SCIENTIFIC DOSSIER / CAROUSEL) */}
        <div className="w-full lg:w-[55%] relative h-auto lg:h-[600px] flex items-center justify-center">
          
          {/* Background Technical Grid (Desktop only) */}
          <div className="hidden lg:block absolute inset-0 bg-brand-blue/[0.01] rounded-[3rem] overflow-hidden pointer-events-none">
            <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: "radial-gradient(#0c2160 1px, transparent 1px)", backgroundSize: "30px 30px" }} />
          </div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-brand-blue/[0.03] rounded-full blur-[100px] pointer-events-none" />

          {/* MOBILE CAROUSEL (lg:hidden) */}
          <div className="lg:hidden w-full relative py-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, ease: "easeOut", delay: 0.3 }}
              className="group relative w-full aspect-[4/3] rounded-[2rem] overflow-hidden border-[10px] border-white shadow-[0_30px_60px_rgba(0,0,0,0.1)] bg-gray-50 flex items-center justify-center"
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
                  transition={{ duration: 1, ease: [0.65, 0, 0.35, 1] }}
                  className="absolute inset-0 w-full h-full object-cover"
                />
              </AnimatePresence>

              {/* Arrow Controls */}
              <div className="absolute inset-y-0 left-0 right-0 z-20 flex items-center justify-between px-4 pointer-events-none opacity-100">
                <button onClick={(e) => { e.stopPropagation(); paginate(-1); }} className="pointer-events-auto p-3 rounded-full bg-white/50 backdrop-blur-md text-brand-blue shadow-lg active:scale-90 transition-all">
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button onClick={(e) => { e.stopPropagation(); paginate(1); }} className="pointer-events-auto p-3 rounded-full bg-white/50 backdrop-blur-md text-brand-blue shadow-lg active:scale-90 transition-all">
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>

              {/* Dot Navigation */}
              <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-30 flex gap-2">
                {heroImages.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setPage([i, i > imageIndex ? 1 : -1])}
                    className={`h-1.5 rounded-full transition-all duration-500 ${
                      i === imageIndex ? "w-8 bg-white" : "w-2 bg-white/40"
                    }`}
                  />
                ))}
              </div>
            </motion.div>
          </div>

          {/* DESKTOP SCIENTIFIC DOSSIER (hidden lg:block) */}
          <div className="hidden lg:block relative w-full h-full">
            
            {/* 1. Main Facility Layer (Back) */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.5, ease: "easeOut" }}
              className="absolute top-0 right-0 w-[90%] h-[80%] z-10"
            >
              <div className="relative w-full h-full rounded-[3.5rem] overflow-hidden border-[16px] border-white shadow-[0_40px_100px_rgba(0,0,0,0.12)] group">
                <img src={heroImages[0]} className="absolute inset-0 w-full h-full object-cover transition-transform duration-2000 group-hover:scale-110" alt="Main Facility" />
                <div className="absolute inset-0 bg-brand-blue/5" />
              </div>
            </motion.div>

            {/* 2. R&D Layer (Front Left) */}
            <motion.div
              initial={{ opacity: 0, x: -100, y: 50 }}
              animate={{ opacity: 1, x: 0, y: 0 }}
              whileHover={{ scale: 1.05, zIndex: 40 }}
              transition={{ duration: 1.2, delay: 0.4 }}
              className="absolute bottom-5 left-0 w-[60%] h-[60%] z-30"
            >
              <div className="relative w-full h-full rounded-[3rem] overflow-hidden border-[12px] border-white shadow-[0_50px_80px_rgba(0,0,0,0.15)] group cursor-pointer">
                <img src={heroImages[1]} className="absolute inset-0 w-full h-full object-cover" alt="R&D Lab" />
                <div className="absolute inset-0 bg-white/10 group-hover:bg-transparent transition-colors duration-500" />
              </div>
            </motion.div>

            {/* 3. Global Reach Layer (Floating Right) */}
            <motion.div
              initial={{ opacity: 0, y: 100 }}
              animate={{ opacity: 1, y: 0, rotate: [0, 2, 0, -2, 0] }}
              transition={{ opacity: { duration: 1, delay: 0.6 }, y: { duration: 1, delay: 0.6 }, rotate: { duration: 8, repeat: Infinity, ease: "easeInOut" } }}
              className="absolute -bottom-8 -right-8 w-[45%] h-[42%] z-40"
            >
              <div className="relative w-full h-full rounded-[2.5rem] overflow-hidden border-[8px] border-white shadow-[0_30px_60px_rgba(0,0,0,0.12)] bg-white p-1.5">
                <img src={heroImages[2]} className="w-full h-full object-cover rounded-[2rem]" alt="Global Reach" />
              </div>
            </motion.div>

          </div>
        </div>
      </div>

      {/* ── FOCUS AREAS SECTION ── */}
      <div className="max-w-[1700px] mx-auto px-6 lg:px-12 text-center relative z-10 pt-12 lg:pt-24 pb-20">
        
        {/* Background Atmosphere */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[80%] bg-brand-blue/[0.02] rounded-full blur-[120px] pointer-events-none -z-10" />
        <div className="absolute inset-0 opacity-[0.02] pointer-events-none -z-10" style={{ backgroundImage: "linear-gradient(rgba(12, 33, 96, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(12, 33, 96, 0.1) 1px, transparent 1px)", backgroundSize: "100px 100px" }} />

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
          {[
            { 
              title: "Metabolic Healthcare", 
              desc: "Precision treatments for insulin resistance management and endocrine disorders.",
              icon: <Beaker className="w-6 h-6" />,
              num: "01"
            },
            { 
              title: "Reproductive Wellness", 
              desc: "Innovative hormonal treatments designed to support reproductive health.",
              icon: <ShieldCheck className="w-6 h-6" />,
              num: "02"
            },
            { 
              title: "Global Standards", 
              desc: "Delivering WHO-GMP certified products to international health providers.",
              icon: <Award className="w-6 h-6" />,
              num: "03"
            }
          ].map((area, i) => (
            <motion.div
              key={area.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 + (i * 0.1) }}
              className="glass-gold group relative p-10 sm:p-12 rounded-[2.5rem] border border-white/40 shadow-[0_20px_50px_rgba(0,0,0,0.04)] hover:shadow-[0_40px_80px_rgba(201,160,72,0.15)] transition-all duration-700 flex flex-col items-center text-center cursor-pointer overflow-hidden"
            >
              {/* Background Number */}
              <span className="absolute -top-4 -right-4 text-8xl font-black text-brand-blue/[0.03] italic group-hover:text-brand-blue/[0.06] transition-colors duration-700 pointer-events-none">
                {area.num}
              </span>

              {/* Icon Container */}
              <div className="w-16 h-16 rounded-2xl bg-white shadow-xl flex items-center justify-center mb-8 group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 border border-brand-blue/5">
                <div className="text-brand-blue">
                  {area.icon}
                </div>
              </div>

              <h3 className="text-xl sm:text-2xl font-serif font-bold text-brand-blue mb-5 group-hover:text-gray-900 transition-colors">
                {area.title}
              </h3>
              
              <p className="text-gray-500 text-sm sm:text-[15px] leading-relaxed max-w-[280px]">
                {area.desc}
              </p>

              {/* Bottom Decorative Bar */}
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-1 bg-gradient-to-r from-transparent via-[#C9A048] to-transparent group-hover:w-full transition-all duration-700" />
            </motion.div>
          ))}
        </div>

      </div>

    </section>
  );
}
