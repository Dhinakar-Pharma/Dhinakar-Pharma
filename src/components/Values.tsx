"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const tabContent = [
  {
    id: "vision",
    title: "Vision",
    text: "To become a trusted leader in healthcare, known for bridging the gap between clinical research and patient accessibility.",
    image: "/vision_premium.png",
  },
  {
    id: "mission",
    title: "Mission",
    text: "To deliver high-quality, generic formulations that empower healthcare professionals and transform the lives of patients suffering from various healthcare disorders.",
    image: "/mission_premium.png",
  },
];

export default function Values() {
  const [activeTab, setActiveTab] = useState(tabContent[0]);

  return (
    <section id="values" className="min-h-screen bg-slate-50 flex flex-col">
      
      {/* ── 1. TOP HEADER (BLUE PANEL) ── */}
      <div className="w-full relative overflow-hidden py-16 sm:py-20 px-5 sm:px-10 lg:px-12" style={{ background: "linear-gradient(150deg, #0c2160 0%, #1B3F8B 50%, #2460aa 100%)" }}>
        {/* Decorative elements */}
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none"
          style={{ backgroundImage: "radial-gradient(circle, white 1px, transparent 1px)", backgroundSize: "22px 22px" }} />
        <div className="absolute -top-16 -right-16 w-64 h-64 sm:w-80 sm:h-80 rounded-full border border-white/[0.04]" />
        
        <div className="max-w-[1500px] mx-auto relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start gap-3 mb-4">
               <div className="h-[2px] w-6 sm:w-8 bg-[#C9A048]" />
               <p className="text-[#C9A048] font-bold tracking-[0.3em] uppercase text-[9px] sm:text-[10px]">What Defines Us</p>
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-white leading-tight">
               Our <span style={{ background: "linear-gradient(105deg, #C9A048 10%, #f5e48a 55%, #C9A048 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>Values</span>
            </h1>
          </motion.div>

          {/* Tab Switcher - Responsive width */}
          <div className="flex items-center p-1 sm:p-1.5 bg-white/5 backdrop-blur-md rounded-xl sm:rounded-2xl border border-white/10 w-full md:w-auto">
            {tabContent.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab)}
                className={`flex-1 md:flex-none relative px-6 sm:px-12 py-2.5 sm:py-3.5 rounded-lg sm:rounded-xl text-[10px] sm:text-xs font-bold uppercase tracking-[0.2em] transition-all duration-500 overflow-hidden ${
                  activeTab.id === tab.id ? "text-brand-blue" : "text-white/60 hover:text-white"
                }`}
              >
                <span className="relative z-10">{tab.title}</span>
                {activeTab.id === tab.id && (
                  <motion.div
                    layoutId="activeTabPill"
                    className="absolute inset-0 bg-white"
                    transition={{ type: "spring", bounce: 0.25, duration: 0.6 }}
                  />
                )}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ── 2. UPPER GRID AREA (TOGGLEABLE) ── */}
      <div className="w-full max-w-[1500px] mx-auto px-5 sm:px-10 lg:px-12 py-10 sm:py-16 lg:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 sm:gap-16 lg:gap-24 items-center">
          
          {/* Text block - Improved padding/size for mobile */}
          <div className="lg:col-span-5 pt-0 lg:pt-4">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
                className="min-h-[140px] sm:min-h-[180px] lg:min-h-[220px]"
              >
                <div className="w-12 sm:w-16 h-1 bg-gradient-to-r from-brand-blue to-[#C9A048] mb-8 sm:mb-10" />
                <p className="text-xl sm:text-2xl lg:text-3xl font-serif text-gray-900 leading-[1.6] italic font-light">
                  "{activeTab.text}"
                </p>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Image block - BETTER RESPONSIVE SIZING */}
          <div className="lg:col-span-7">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab.id}
                initial={{ opacity: 0, scale: 0.98, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 1.02, y: -20 }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className="relative aspect-square sm:aspect-[4/3] lg:aspect-[16/9] rounded-[2rem] sm:rounded-[3rem] overflow-hidden shadow-[0_30px_60px_rgba(12,31,94,0.1)] border-[8px] sm:border-[12px] border-white ring-1 ring-gray-100 bg-gray-50"
              >
                <img
                  src={activeTab.image}
                  alt={activeTab.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0c1f5e]/30 to-transparent pointer-events-none" />
                
                {/* Floating label - smaller on mobile */}
                <div className="absolute bottom-5 right-5 sm:bottom-8 sm:right-8 bg-white/20 backdrop-blur-xl px-4 sm:px-6 py-2 sm:py-3 rounded-full border border-white/30">
                  <p className="text-white text-[8px] sm:text-[10px] uppercase font-bold tracking-[0.4em]">Pioneering Health</p>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

        </div>
      </div>

      {/* ── 3. STATIC BOTTOM COMMITMENT (BIG RECTANGULAR BOX) ── */}
      <div className="w-full max-w-[1500px] mx-auto px-5 sm:px-10 lg:px-12 pb-16 sm:pb-20">
         <div className="w-full bg-white rounded-2xl sm:rounded-[3rem] border border-gray-100 shadow-[0_30px_60px_rgba(0,0,0,0.03)] p-6 sm:p-10 lg:p-14 relative overflow-hidden group">
            {/* Background glows */}
            <div className="absolute top-0 right-0 w-32 h-32 sm:w-64 sm:h-64 bg-brand-blue/5 rounded-full blur-3xl -z-10" />
            
            <div className="flex flex-col lg:flex-row items-center lg:items-start xl:items-center gap-6 sm:gap-10 lg:gap-14 xl:gap-20">
              <div className="shrink-0 text-center lg:text-left w-full lg:w-auto">
                <p className="text-[9px] sm:text-[10px] font-bold text-brand-blue uppercase tracking-[0.4em] mb-4">Our Commitment</p>
                <h3 className="text-2xl sm:text-3xl lg:text-3xl xl:text-4xl font-serif font-bold text-gray-900 leading-tight">
                  Every patient deserves a <br className="hidden sm:block"/>
                  <span className="text-[#C9A048]">brighter tomorrow.</span>
                </h3>
              </div>
              
              <div className="hidden lg:block w-px h-20 xl:h-24 bg-gray-100 shrink-0" />

              <p className="text-gray-600 font-sans leading-relaxed text-sm sm:text-base lg:text-lg lg:max-w-xl xl:max-w-2xl text-center lg:text-left">
                At Dhinakar Pharma, we believe in the journey of health. 
                Whether it is restoring hormonal balance or supporting the journey to parenthood, 
                our products are designed with the empathy of a caregiver and the precision of a scientist.
              </p>
            </div>
         </div>
      </div>

    </section>
  );
}
