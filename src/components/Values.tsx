"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, Target, Quote, ArrowRight, Dna } from "lucide-react";

const tabContent = [
  {
    id: "vision",
    title: "Vision",
    text: "To become a trusted leader in healthcare, known for bridging the gap between clinical research and patient accessibility.",
    image: "/vision_premium.png",
    icon: Sparkles,
  },
  {
    id: "mission",
    title: "Mission",
    text: "To deliver high-quality, generic formulations that empower healthcare professionals and transform the lives of patients suffering from various healthcare disorders.",
    image: "/mission_premium.png",
    icon: Target,
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
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } },
};

export default function Values() {
  const [activeTab, setActiveTab] = useState(tabContent[0]);

  return (
    <section id="values" className="min-h-screen bg-slate-50 flex flex-col scroll-mt-20 md:scroll-mt-24 overflow-hidden font-sans">
      
      {/* ── 1. TOP HEADER (DYNAMIC BLUE PANEL) ── */}
      <div className="w-full relative overflow-hidden py-20 sm:py-24 px-5 sm:px-10 lg:px-12 bg-brand-blue">
        {/* Animated Background Gradients & Particles */}
        <div className="absolute inset-0 bg-[linear-gradient(150deg,#0c2160_0%,#1B3F8B_50%,#2460aa_100%)] z-0" />
        <div className="absolute inset-0 opacity-[0.05] z-0 pointer-events-none" style={{ backgroundImage: "radial-gradient(circle, white 1px, transparent 1px)", backgroundSize: "24px 24px" }} />
        
        {/* Floating Orbs */}
        <motion.div 
          animate={{ y: [0, -20, 0], scale: [1, 1.05, 1], opacity: [0.3, 0.4, 0.3] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -top-16 -left-16 w-[30rem] h-[30rem] bg-brand-blue-light rounded-full blur-[100px] z-0 pointer-events-none"
        />

        <div className="max-w-[1600px] mx-auto relative z-10 flex flex-col md:flex-row items-center justify-between gap-12">
          <motion.div 
            initial="hidden" 
            whileInView="show" 
            viewport={{ once: true }}
            variants={containerVariants}
            className="text-center md:text-left w-full md:w-auto"
          >
            <motion.div variants={itemVariants} className="flex items-center justify-center md:justify-start gap-3 mb-4">
               <div className="h-[2px] w-8 sm:w-10 bg-[#C9A048]" />
               <p className="text-[#C9A048] font-bold tracking-[0.3em] uppercase text-[10px] sm:text-xs">What Defines Us</p>
            </motion.div>
            
            <motion.h1 variants={itemVariants} className="text-4xl sm:text-5xl lg:text-6xl font-serif font-bold text-white leading-tight drop-shadow-lg">
               Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#C9A048] via-[#f5e48a] to-[#C9A048]">Values</span>
            </motion.h1>
          </motion.div>

          {/* Premium Tab Switcher */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="flex items-center p-1.5 bg-white/10 backdrop-blur-2xl rounded-2xl border border-white/20 shadow-[0_10px_30px_rgba(0,0,0,0.3)] w-full md:w-auto relative z-20 shrink-0"
          >
            {tabContent.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab.id === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab)}
                  className={`flex-1 md:flex-none relative flex items-center justify-center gap-2 px-8 sm:px-12 py-3.5 sm:py-4 rounded-xl text-[11px] sm:text-xs font-bold uppercase tracking-[0.2em] transition-colors duration-500 overflow-hidden ${
                    isActive ? "text-brand-blue" : "text-white/60 hover:text-white"
                  }`}
                >
                  <span className="relative z-10 flex items-center gap-2">
                    <Icon className={`w-4 h-4 ${isActive ? 'text-brand-blue' : 'text-white/60'}`} />
                    {tab.title}
                  </span>
                  {isActive && (
                    <motion.div
                      layoutId="activeTabGlow"
                      className="absolute inset-0 bg-white shadow-md"
                      transition={{ type: "spring", bounce: 0.2, duration: 0.5 }}
                    />
                  )}
                </button>
              );
            })}
          </motion.div>
        </div>
      </div>

      {/* ── 2. IMMERSIVE CONTENT AREA ── */}
      <div className="w-full max-w-[1600px] mx-auto px-5 sm:px-10 lg:px-12 py-16 sm:py-20 lg:py-28 relative z-10 flex-grow">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 sm:gap-16 lg:gap-20 items-center">
          
          {/* Animated Text Block */}
          <div className="lg:col-span-5 relative order-2 lg:order-1">
            <Quote className="absolute -top-10 -left-10 w-40 h-40 text-gray-200/40 -z-10 transform -rotate-12" />
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab.id}
                initial={{ opacity: 0, x: -30, filter: "blur(5px)" }}
                animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
                exit={{ opacity: 0, x: 30, filter: "blur(5px)" }}
                transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] as any }}
                className="relative z-10"
              >
                <div className="flex items-center gap-4 mb-8">
                  <div className="w-10 h-10 rounded-full bg-brand-blue/5 flex items-center justify-center border border-brand-blue/10">
                    <activeTab.icon className="w-5 h-5 text-brand-blue" />
                  </div>
                  <span className="text-xs font-black text-brand-blue tracking-[0.2em] uppercase">{activeTab.title} Statement</span>
                </div>
                
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-serif text-gray-900 leading-[1.6] mb-10 italic font-light">
                  <span className="text-[#C9A048] font-bold text-5xl leading-none">"</span>
                  {activeTab.text}
                  <span className="text-[#C9A048] font-bold text-5xl leading-none">"</span>
                </h2>

                <div className="flex items-center gap-3 cursor-pointer group w-max">
                  <span className="text-xs font-bold text-gray-400 tracking-widest uppercase group-hover:text-brand-blue transition-colors">Discover Methodology</span>
                  <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center group-hover:bg-brand-blue transition-colors">
                    <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-white transition-colors group-hover:translate-x-0.5" />
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Premium Glassmorphic Image Block */}
          <div className="lg:col-span-7 order-1 lg:order-2">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab.id}
                initial={{ opacity: 0, scale: 0.95, rotateY: 5 }}
                animate={{ opacity: 1, scale: 1, rotateY: 0 }}
                exit={{ opacity: 0, scale: 1.05, rotateY: -5 }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] as any }}
                className="relative group perspective-1000"
              >
                <motion.div 
                  whileHover={{ scale: 1.02, rotateX: 2, rotateY: -2 }}
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  className="relative aspect-[4/3] lg:aspect-[16/10] rounded-[2rem] sm:rounded-[3rem] overflow-hidden shadow-[0_30px_60px_rgba(12,31,94,0.12)] bg-white border-[8px] sm:border-[12px] border-white backdrop-blur-sm ring-1 ring-gray-100"
                >
                  <img
                    src={activeTab.image}
                    alt={activeTab.title}
                    className="w-full h-full object-cover transform transition-transform duration-1000 group-hover:scale-110"
                  />
                  
                  {/* Glassmorphic Overlay Gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0c2160]/40 to-transparent opacity-60" />
                  
                  {/* Floating Badge */}
                  <motion.div 
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.4 }}
                    className="absolute bottom-6 left-6 sm:bottom-8 sm:left-8 bg-white/10 backdrop-blur-xl border border-white/20 p-4 sm:p-5 rounded-3xl flex items-center gap-4 shadow-2xl"
                  >
                    <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                      <Dna className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <p className="text-white/80 text-[9px] uppercase tracking-widest font-bold mb-1">Scientific Core</p>
                      <p className="text-white text-sm sm:text-base font-serif font-bold">Pioneering Health</p>
                    </div>
                  </motion.div>
                </motion.div>
                
                {/* Decorative background glow */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[110%] h-[110%] bg-gradient-to-tr from-brand-blue/15 to-gold-dark/15 blur-3xl -z-10 rounded-[4rem] opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
              </motion.div>
            </AnimatePresence>
          </div>

        </div>
      </div>

      {/* ── 3. DYNAMIC COMMITMENT BANNER ── */}
      <div className="w-full max-w-[1500px] mx-auto px-5 sm:px-10 lg:px-12 pb-16 sm:pb-20">
         <motion.div 
           initial={{ opacity: 0, y: 20 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true, margin: "-50px" }}
           transition={{ duration: 0.8 }}
           className="bg-gradient-to-br from-brand-blue to-[#0c1b42] rounded-2xl sm:rounded-[2.5rem] p-6 sm:p-10 lg:p-12 relative overflow-hidden group shadow-[0_20px_50px_rgba(12,31,94,0.15)]"
         >
            {/* Animated Background Elements */}
            <motion.div 
              animate={{ rotate: 360 }} 
              transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
              className="absolute -top-[50%] -right-[20%] w-[100%] h-[200%] bg-[conic-gradient(from_0deg_at_50%_50%,rgba(201,160,72,0)_0%,rgba(201,160,72,0.1)_50%,rgba(201,160,72,0)_100%)] z-0" 
            />
            <div className="absolute inset-0 bg-brand-blue/50 backdrop-blur-sm z-0" />
            
            <div className="relative z-10 flex flex-col lg:flex-row items-center lg:items-start xl:items-center justify-between gap-8 lg:gap-14 xl:gap-20">
              <div className="w-full lg:w-auto text-center lg:text-left shrink-0">
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/10 bg-white/5 backdrop-blur-md mb-4 sm:mb-5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#C9A048] animate-pulse" />
                  <span className="text-[9px] font-black text-white/90 uppercase tracking-[0.2em]">Our Commitment</span>
                </div>
                <h3 className="text-2xl sm:text-3xl lg:text-3xl xl:text-4xl font-serif font-bold text-white leading-tight">
                  Every patient deserves a <br className="hidden sm:block lg:hidden xl:block"/>
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#C9A048] to-[#f5e48a]">brighter tomorrow.</span>
                </h3>
              </div>
              
              <div className="hidden lg:block w-px h-16 xl:h-20 bg-white/10 shrink-0" />
              
              <div className="w-full lg:flex-1 lg:max-w-xl xl:max-w-2xl">
                <div className="p-5 sm:p-8 rounded-xl sm:rounded-2xl bg-white/5 backdrop-blur-lg border border-white/10">
                  <p className="text-white/80 font-sans leading-relaxed text-sm sm:text-base lg:text-lg">
                    At Dhinakar Pharma, we believe in the journey of health. 
                    Whether it is restoring hormonal balance or supporting the journey to parenthood, 
                    our products are designed with the <span className="text-white font-bold">empathy of a caregiver</span> and the <span className="text-white font-bold">precision of a scientist</span>.
                  </p>
                </div>
              </div>
            </div>
         </motion.div>
      </div>

    </section>
  );
}
