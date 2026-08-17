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

export default function Hero() {
  const [[page, direction], setPage] = useState([0, 0]);

  const imageIndex = ((page % heroImages.length) + heroImages.length) % heroImages.length;

  const paginate = (newDirection: number) => {
    setPage([page + newDirection, newDirection]);
  };

  useEffect(() => {
    const timer = setInterval(() => {
      paginate(1);
    }, 6000);
    return () => clearInterval(timer);
  }, [page]);

  return (
    <section id="home" className="w-full bg-white pt-8 sm:pt-12 pb-12 sm:pb-16 relative overflow-hidden font-sans">
      
      {/* ── 1. WIDE-SCREEN MAIN HERO GRID ── */}
      <div className="max-w-[1800px] mx-auto px-6 sm:px-10 lg:px-16 xl:px-20 w-full relative z-10 flex flex-col lg:flex-row items-center justify-between gap-10 lg:gap-16 mb-16 lg:mb-20">

        {/* TEXT CONTENT - LEFT (50%) */}
        <div className="w-full lg:w-1/2 flex flex-col text-center lg:text-left items-center lg:items-start">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="flex items-center gap-3 mb-4"
          >
            <span className="w-10 h-px bg-[#C9A048]" />
            <span className="text-brand-blue font-bold tracking-[0.35em] text-[10px] sm:text-[11px] uppercase">Pioneering Healthcare</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-3xl sm:text-4xl lg:text-5xl xl:text-[3.5rem] 2xl:text-[3.85rem] font-serif font-bold text-gray-900 leading-[1.1] mb-6"
          >
            Dhinakar Pharma: <br className="hidden lg:block" />Illuminating Health through <br className="hidden lg:block" /><span style={{ background: "linear-gradient(105deg, #C9A048 10%, #f5e48a 55%, #C9A048 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>Science-Driven Formulations</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-base sm:text-lg text-gray-600 font-sans leading-relaxed mb-8 max-w-2xl"
          >
            Based in the bulk drug capital of India, Hyderabad, we are committed to addressing complex metabolic and reproductive disorders with precision-crafted generic solutions that bridge the gap between quality and accessibility.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="flex flex-wrap items-center justify-center lg:justify-start gap-4 w-full sm:w-auto"
          >
            <Link href="/products" className="px-9 py-4 bg-brand-blue hover:bg-brand-blue-dark rounded-full text-white font-bold uppercase tracking-wider text-[11px] sm:text-[12px] shadow-xl shadow-brand-blue/20 transition-all duration-300 transform hover:-translate-y-0.5 inline-flex items-center justify-center gap-3 w-full sm:w-auto">
              Explore Products
              <ArrowRight className="w-4 h-4 text-[#C9A048]" />
            </Link>

            <Link href="/connect" className="px-8 py-4 bg-white hover:bg-slate-50 border border-slate-200 text-brand-blue font-bold uppercase tracking-wider text-[11px] sm:text-[12px] rounded-full shadow-sm hover:shadow-md transition-all duration-300 inline-flex items-center justify-center gap-2 w-full sm:w-auto">
              Institutional Liaison
            </Link>
          </motion.div>

          {/* Wide Quick Metrics Bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mt-10 pt-6 border-t border-slate-100 w-full flex flex-wrap items-center justify-center lg:justify-start gap-8 text-left"
          >
            <div className="flex items-center gap-3">
              <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping" />
              <div>
                <p className="text-lg font-serif font-bold text-gray-900 leading-none">99.8%</p>
                <p className="text-[9px] font-bold text-gray-400 uppercase tracking-widest mt-0.5">Purity Benchmark</p>
              </div>
            </div>

            <div className="w-px h-8 bg-slate-200 hidden sm:block" />

            <div>
              <p className="text-lg font-serif font-bold text-gray-900 leading-none">WHO-GMP & USFDA</p>
              <p className="text-[9px] font-bold text-gray-400 uppercase tracking-widest mt-0.5">Global Compliance</p>
            </div>
          </motion.div>
        </div>

        {/* IMAGE CONTENT - RIGHT (50% WIDE SCIENTIFIC DOSSIER) */}
        <div className="w-full lg:w-1/2 relative h-auto lg:h-[520px] xl:h-[560px] flex items-center justify-center">
          
          {/* Background Technical Grid */}
          <div className="hidden lg:block absolute inset-0 bg-brand-blue/[0.01] rounded-3xl overflow-hidden pointer-events-none">
            <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: "radial-gradient(#0c2160 1px, transparent 1px)", backgroundSize: "32px 32px" }} />
          </div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-brand-blue/[0.03] rounded-full blur-[100px] pointer-events-none" />

          {/* MOBILE CAROUSEL (lg:hidden) */}
          <div className="lg:hidden w-full relative py-2">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, ease: "easeOut", delay: 0.3 }}
              className="group relative w-full aspect-[4/3] rounded-2xl overflow-hidden border-4 border-white shadow-xl bg-gray-50 flex items-center justify-center"
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
              <div className="absolute inset-y-0 left-0 right-0 z-20 flex items-center justify-between px-3 pointer-events-none opacity-100">
                <button onClick={(e) => { e.stopPropagation(); paginate(-1); }} className="pointer-events-auto p-2.5 rounded-full bg-white/70 backdrop-blur-md text-brand-blue shadow-md active:scale-90 transition-all">
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button onClick={(e) => { e.stopPropagation(); paginate(1); }} className="pointer-events-auto p-2.5 rounded-full bg-white/70 backdrop-blur-md text-brand-blue shadow-md active:scale-90 transition-all">
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>

              {/* Dot Navigation */}
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-30 flex gap-2">
                {heroImages.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setPage([i, i > imageIndex ? 1 : -1])}
                    className={`h-1.5 rounded-full transition-all duration-500 ${
                      i === imageIndex ? "w-6 bg-white" : "w-2 bg-white/40"
                    }`}
                  />
                ))}
              </div>
            </motion.div>
          </div>

          {/* DESKTOP SCIENTIFIC DOSSIER - FULL SPAN (hidden lg:block) */}
          <div className="hidden lg:block relative w-full h-full">
            
            {/* 1. Main Facility Layer (Back) */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.5, ease: "easeOut" }}
              className="absolute top-0 right-0 w-[92%] h-[85%] z-10"
            >
              <div className="relative w-full h-full rounded-3xl overflow-hidden border-8 border-white shadow-[0_25px_60px_rgba(0,0,0,0.09)] group">
                <img src={heroImages[0]} className="absolute inset-0 w-full h-full object-cover transition-transform duration-2000 group-hover:scale-105" alt="Main Facility" />
                <div className="absolute inset-0 bg-brand-blue/5" />
              </div>
            </motion.div>

            {/* 2. R&D Layer (Front Left) */}
            <motion.div
              initial={{ opacity: 0, x: -100, y: 50 }}
              animate={{ opacity: 1, x: 0, y: 0 }}
              whileHover={{ scale: 1.03, zIndex: 40 }}
              transition={{ duration: 1.2, delay: 0.4 }}
              className="absolute bottom-2 left-0 w-[58%] h-[58%] z-30"
            >
              <div className="relative w-full h-full rounded-2xl overflow-hidden border-6 border-white shadow-[0_30px_50px_rgba(0,0,0,0.12)] group cursor-pointer">
                <img src={heroImages[1]} className="absolute inset-0 w-full h-full object-cover" alt="R&D Lab" />
                <div className="absolute inset-0 bg-white/10 group-hover:bg-transparent transition-colors duration-500" />
              </div>
            </motion.div>

            {/* 3. Global Reach Layer (Floating Right) */}
            <motion.div
              initial={{ opacity: 0, y: 100 }}
              animate={{ opacity: 1, y: 0, rotate: [0, 2, 0, -2, 0] }}
              transition={{ opacity: { duration: 1, delay: 0.6 }, y: { duration: 1, delay: 0.6 }, rotate: { duration: 8, repeat: Infinity, ease: "easeInOut" } }}
              className="absolute -bottom-4 -right-4 w-[42%] h-[42%] z-40"
            >
              <div className="relative w-full h-full rounded-2xl overflow-hidden border-4 border-white shadow-[0_20px_40px_rgba(0,0,0,0.12)] bg-white p-1">
                <img src={heroImages[2]} className="w-full h-full object-cover rounded-xl" alt="Global Reach" />
              </div>
            </motion.div>

          </div>
        </div>
      </div>

      {/* ── 2. WIDE-SPAN FOCUS AREAS SECTION ── */}
      <div className="max-w-[1800px] mx-auto px-6 sm:px-10 lg:px-16 xl:px-20 text-center relative z-10 pt-10 lg:pt-16 pb-12">
        
        {/* Background Atmosphere */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[85%] h-[85%] bg-brand-blue/[0.02] rounded-full blur-[120px] pointer-events-none -z-10" />

        {/* Expertise Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex items-center justify-center gap-4 mb-4"
        >
          <div className="h-px w-12 sm:w-20 bg-gray-200" />
          <p className="text-[10px] sm:text-[11px] font-bold text-gray-400 tracking-[0.35em] uppercase">Dedicated Core Expertise</p>
          <div className="h-px w-12 sm:w-20 bg-gray-200" />
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-brand-blue mb-4"
        >
          Our Focus Areas
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="text-gray-500 text-base max-w-2xl mx-auto mb-12 leading-relaxed"
        >
          We concentrate our scientific activities on complex generic products for global markets.
        </motion.p>

        {/* Cards Grid - Wide Span */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 xl:gap-10">
          {[
            { 
              title: "Metabolic Healthcare", 
              desc: "Precision treatments for insulin resistance management and endocrine disorders.",
              icon: <Beaker className="w-6 h-6 text-white" />,
              num: "01",
              tag: "Therapeutic Core"
            },
            { 
              title: "Reproductive Wellness", 
              desc: "Innovative hormonal treatments designed to support reproductive health.",
              icon: <ShieldCheck className="w-6 h-6 text-white" />,
              num: "02",
              tag: "Endocrine Care"
            },
            { 
              title: "Global Standards", 
              desc: "Delivering WHO-GMP certified products to international health providers.",
              icon: <Award className="w-6 h-6 text-white" />,
              num: "03",
              tag: "Quality Assured"
            }
          ].map((area, i) => (
            <motion.div
              key={area.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 + (i * 0.1) }}
              className="group relative bg-white rounded-3xl border border-slate-200/90 shadow-[0_10px_35px_rgba(0,0,0,0.04)] hover:shadow-[0_25px_60px_rgba(12,33,96,0.12)] hover:border-brand-blue/30 transition-all duration-500 p-8 xl:p-10 flex flex-col items-start text-left cursor-pointer overflow-hidden"
            >
              {/* Subtle Ambient Background Gradient on Hover */}
              <div className="absolute inset-0 bg-gradient-to-br from-brand-blue/[0.02] via-transparent to-[#C9A048]/[0.03] opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

              {/* Card Header: Icon + Number Tag */}
              <div className="w-full flex items-center justify-between mb-8 relative z-10">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#0c2160] to-[#1B3F8B] shadow-lg shadow-brand-blue/20 flex items-center justify-center group-hover:scale-110 group-hover:rotate-3 transition-all duration-500">
                  {area.icon}
                </div>
                
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-bold tracking-wider uppercase text-slate-400 bg-slate-100 px-3 py-1 rounded-full group-hover:bg-brand-blue/5 group-hover:text-brand-blue transition-colors">
                    {area.tag}
                  </span>
                  <span className="text-2xl font-serif font-black text-slate-300 group-hover:text-[#C9A048] transition-colors">
                    {area.num}
                  </span>
                </div>
              </div>

              {/* Title */}
              <h3 className="text-xl sm:text-2xl font-serif font-bold text-slate-900 group-hover:text-brand-blue transition-colors mb-3 relative z-10">
                {area.title}
              </h3>
              
              {/* Description */}
              <p className="text-slate-500 text-sm sm:text-[15px] leading-relaxed relative z-10">
                {area.desc}
              </p>

              {/* Top Accent Gradient Bar */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-brand-blue via-[#C9A048] to-brand-blue opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </motion.div>
          ))}
        </div>

      </div>

    </section>
  );
}
