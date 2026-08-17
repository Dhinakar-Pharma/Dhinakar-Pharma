"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, Target, Quote, ArrowRight, Dna, ShieldCheck, Award } from "lucide-react";

const tabContent = [
  {
    id: "vision",
    title: "Vision",
    subtitle: "Pioneering Future Care",
    text: "To become a trusted leader in healthcare, known for bridging the gap between clinical research and patient accessibility.",
    image: "/vision_premium.png",
    icon: Sparkles,
    metrics: [
      { label: "Global Reach", value: "International Standards" },
      { label: "Research Focus", value: "Generic Formulations" }
    ]
  },
  {
    id: "mission",
    title: "Mission",
    subtitle: "Precision & Purpose",
    text: "To deliver high-quality, generic formulations that empower healthcare professionals and transform the lives of patients suffering from various healthcare disorders.",
    image: "/mission_premium.png",
    icon: Target,
    metrics: [
      { label: "Quality Standard", value: "WHO-GMP & USFDA" },
      { label: "Impact", value: "Patient-Centric Care" }
    ]
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const itemVariants: any = {
  hidden: { opacity: 0, y: 15 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } },
};

export default function Values() {
  const [activeTab, setActiveTab] = useState(tabContent[0]);

  return (
    <section id="values" className="bg-slate-50 flex flex-col scroll-mt-20 md:scroll-mt-24 overflow-hidden font-sans">
      
      {/* ── 1. DYNAMIC BRAND BLUE PANEL ── */}
      <div className="w-full relative overflow-hidden py-12 sm:py-16 px-6 sm:px-10 lg:px-16 bg-brand-blue">
        {/* Gradients & Subtle Background Pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(150deg,#0c2160_0%,#1B3F8B_50%,#2460aa_100%)] z-0" />
        <div className="absolute inset-0 opacity-[0.05] z-0 pointer-events-none" style={{ backgroundImage: "radial-gradient(circle, white 1px, transparent 1px)", backgroundSize: "24px 24px" }} />
        
        {/* Ambient Glow */}
        <motion.div 
          animate={{ y: [0, -15, 0], scale: [1, 1.05, 1], opacity: [0.3, 0.4, 0.3] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -top-16 -left-16 w-[25rem] h-[25rem] bg-brand-blue-light rounded-full blur-[100px] z-0 pointer-events-none"
        />

        <div className="max-w-[1800px] mx-auto relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
          <motion.div 
            initial="hidden" 
            whileInView="show" 
            viewport={{ once: true }}
            variants={containerVariants}
            className="text-center md:text-left w-full md:w-auto"
          >
            <motion.div variants={itemVariants} className="flex items-center justify-center md:justify-start gap-3 mb-3">
               <div className="h-[2px] w-8 bg-[#C9A048]" />
               <p className="text-[#C9A048] font-bold tracking-[0.3em] uppercase text-[10px] sm:text-xs">What Defines Us</p>
            </motion.div>
            
            <motion.h1 variants={itemVariants} className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-white leading-tight drop-shadow-md">
               Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#C9A048] via-[#f5e48a] to-[#C9A048]">Values</span>
            </motion.h1>
          </motion.div>

          {/* Premium Glass Tab Switcher */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="flex items-center p-1.5 bg-white/10 backdrop-blur-2xl rounded-2xl border border-white/20 shadow-2xl w-full md:w-auto relative z-20 shrink-0"
          >
            {tabContent.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab.id === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab)}
                  className={`flex-1 md:flex-none relative flex items-center justify-center gap-2.5 px-8 sm:px-12 py-3 rounded-xl text-[11px] font-bold uppercase tracking-[0.2em] transition-colors duration-500 overflow-hidden ${
                    isActive ? "text-brand-blue" : "text-white/70 hover:text-white"
                  }`}
                >
                  <span className="relative z-10 flex items-center gap-2">
                    <Icon className={`w-4 h-4 ${isActive ? 'text-brand-blue' : 'text-white/70'}`} />
                    {tab.title}
                  </span>
                  {isActive && (
                    <motion.div
                      layoutId="activeTabGlow"
                      className="absolute inset-0 bg-white shadow-lg"
                      transition={{ type: "spring", bounce: 0.2, duration: 0.5 }}
                    />
                  )}
                </button>
              );
            })}
          </motion.div>
        </div>
      </div>

      {/* ── 2. GLASS CARD CONTENT DISPLAY ── */}
      <div className="w-full max-w-[1800px] mx-auto px-6 sm:px-10 lg:px-16 py-12 sm:py-16 relative z-10 flex-grow">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
          
          {/* Glass Text Box */}
          <div className="lg:col-span-5 relative order-2 lg:order-1">
            <Quote className="absolute -top-10 -left-10 w-36 h-36 text-gray-200/30 -z-10 transform -rotate-12 pointer-events-none" />
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab.id}
                initial={{ opacity: 0, x: -20, filter: "blur(4px)" }}
                animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
                exit={{ opacity: 0, x: 20, filter: "blur(4px)" }}
                transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1] as any }}
                className="bg-white p-8 sm:p-10 rounded-3xl border border-slate-200/80 shadow-[0_15px_40px_rgba(0,0,0,0.04)] relative z-10"
              >
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#0c2160] to-[#1B3F8B] flex items-center justify-center text-white shadow-md">
                    <activeTab.icon className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[10px] font-bold text-brand-blue tracking-[0.2em] uppercase block">{activeTab.title} Statement</span>
                    <span className="text-xs text-slate-400 font-medium">{activeTab.subtitle}</span>
                  </div>
                </div>
                
                <h2 className="text-xl sm:text-2xl lg:text-3xl font-serif text-gray-900 leading-[1.6] mb-8 font-normal">
                  <span className="text-[#C9A048] font-bold text-4xl leading-none mr-1">"</span>
                  {activeTab.text}
                  <span className="text-[#C9A048] font-bold text-4xl leading-none ml-1">"</span>
                </h2>

                {/* Sub-Metrics Grid */}
                <div className="grid grid-cols-2 gap-4 pt-6 border-t border-slate-100">
                  {activeTab.metrics.map((m) => (
                    <div key={m.label} className="flex flex-col">
                      <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider">{m.label}</span>
                      <span className="text-xs sm:text-sm font-serif font-bold text-slate-900 mt-0.5">{m.value}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Premium Glassmorphic Image Frame */}
          <div className="lg:col-span-7 order-1 lg:order-2">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab.id}
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.04 }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] as any }}
                className="relative group"
              >
                <motion.div 
                  whileHover={{ scale: 1.01 }}
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  className="relative aspect-[16/10] rounded-3xl overflow-hidden shadow-[0_25px_60px_rgba(12,31,94,0.12)] bg-white border-8 border-white ring-1 ring-slate-100"
                >
                  <img
                    src={activeTab.image}
                    alt={activeTab.title}
                    className="w-full h-full object-cover transform transition-transform duration-1000 group-hover:scale-105"
                  />
                  
                  {/* Overlay Gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0c2160]/40 to-transparent opacity-60" />
                  
                  {/* Floating Badge */}
                  <motion.div 
                    initial={{ y: 15, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.3 }}
                    className="absolute bottom-6 left-6 bg-white/15 backdrop-blur-xl border border-white/25 p-4 rounded-2xl flex items-center gap-3.5 shadow-2xl"
                  >
                    <div className="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center">
                      <Dna className="w-4 h-4 text-white" />
                    </div>
                    <div>
                      <p className="text-white/80 text-[9px] uppercase tracking-widest font-bold mb-0.5">Scientific Core</p>
                      <p className="text-white text-xs sm:text-sm font-serif font-bold">Pioneering Health</p>
                    </div>
                  </motion.div>
                </motion.div>
                
                {/* Decorative background glow */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[105%] h-[105%] bg-gradient-to-tr from-brand-blue/15 to-gold-dark/15 blur-3xl -z-10 rounded-[3rem] opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
              </motion.div>
            </AnimatePresence>
          </div>

        </div>
      </div>

      {/* ── 3. COMMITMENT BANNER WITH GOLD ACCENT BORDER ── */}
      <div className="w-full max-w-[1800px] mx-auto px-6 sm:px-10 lg:px-16 pb-12 sm:pb-16">
         <motion.div 
           initial={{ opacity: 0, y: 15 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true }}
           transition={{ duration: 0.6 }}
           className="bg-gradient-to-br from-brand-blue via-[#0c1b42] to-[#0c2160] rounded-3xl p-6 sm:p-8 lg:p-10 relative overflow-hidden group shadow-[0_20px_50px_rgba(12,31,94,0.15)] border border-[#C9A048]/30"
         >
            {/* Animated Background Elements */}
            <motion.div 
              animate={{ rotate: 360 }} 
              transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
              className="absolute -top-[50%] -right-[20%] w-[100%] h-[200%] bg-[conic-gradient(from_0deg_at_50%_50%,rgba(201,160,72,0)_0%,rgba(201,160,72,0.12)_50%,rgba(201,160,72,0)_100%)] z-0 pointer-events-none" 
            />
            <div className="absolute inset-0 bg-brand-blue/50 backdrop-blur-sm z-0" />
            
            <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-6 lg:gap-10">
              <div className="w-full lg:w-auto text-center lg:text-left shrink-0">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/10 bg-white/5 backdrop-blur-md mb-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#C9A048] animate-pulse" />
                  <span className="text-[9px] font-black text-white/90 uppercase tracking-[0.2em]">Our Commitment</span>
                </div>
                <h3 className="text-xl sm:text-2xl lg:text-3xl font-serif font-bold text-white leading-tight">
                  Every patient deserves a <br className="hidden sm:block lg:hidden xl:block"/>
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#C9A048] to-[#f5e48a]">brighter tomorrow.</span>
                </h3>
              </div>
              
              <div className="hidden lg:block w-px h-16 bg-white/10 shrink-0" />
              
              <div className="w-full lg:flex-1 lg:max-w-xl">
                <div className="p-5 rounded-2xl bg-white/5 backdrop-blur-lg border border-white/10">
                  <p className="text-white/80 font-sans leading-relaxed text-xs sm:text-sm lg:text-base">
                    At Dhinakar Pharma, we believe in the journey of health. 
                    Whether restoring balance or supporting parenthood, 
                    our formulations are designed with the <span className="text-white font-bold">empathy of a caregiver</span> and the <span className="text-white font-bold">precision of a scientist</span>.
                  </p>
                </div>
              </div>
            </div>
         </motion.div>
      </div>

    </section>
  );
}
