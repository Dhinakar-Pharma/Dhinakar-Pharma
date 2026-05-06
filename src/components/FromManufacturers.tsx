
"use client";
import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { 
  ShieldCheck, 
  Award,
  Beaker
} from "lucide-react";

export default function FromManufacturers() {
  return (
    <div className="min-h-screen bg-white flex flex-col font-sans">
      
      {/* ── 1. MINIMALIST INSTITUTIONAL BANNER ── */}
      <div className="w-full relative overflow-hidden py-12 lg:py-16 px-6 lg:px-12" style={{ background: "linear-gradient(150deg, #0c2160 0%, #1B3F8B 50%, #2460aa 100%)" }}>
        <div className="absolute inset-0 opacity-[0.05] pointer-events-none"
          style={{ backgroundImage: "radial-gradient(circle, white 1px, transparent 1px)", backgroundSize: "32px 32px" }} />
        
        <div className="max-w-[1500px] mx-auto relative z-10">
           <div className="flex flex-col md:flex-row items-center justify-between gap-12 lg:gap-24">
              
              {/* Left Side: Title */}
              <motion.div 
                initial={{ opacity: 0, x: -20 }} 
                animate={{ opacity: 1, x: 0 }}
                className="max-w-md text-center md:text-left"
              >
                 <div className="flex items-center justify-center md:justify-start gap-4 mb-4">
                    <div className="h-px w-6 bg-[#C9A048]" />
                    <p className="text-[#C9A048] font-black tracking-[0.4em] uppercase text-[8px]">Institutional Authority</p>
                 </div>
                 <h1 className="text-3xl lg:text-4xl font-serif font-bold text-white leading-tight">
                    From the <br />
                    <span style={{ background: "linear-gradient(105deg, #C9A048 10%, #f5e48a 55%, #C9A048 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>Manufacturers</span>
                 </h1>
              </motion.div>

              {/* Right Side: Statement Only */}
              <motion.div 
                initial={{ opacity: 0, x: 20 }} 
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 }}
                className="max-w-xl text-center md:text-left border-l-0 md:border-l border-white/10 md:pl-12 lg:pl-16"
              >
                 <h2 className="text-lg lg:text-xl font-serif font-medium text-white/80 leading-[1.6] italic">
                    "Adhering to the most <span className="text-[#f5e48a] border-b border-[#C9A048]/30">stringent</span> manufacturing standards for safety and efficacy."
                 </h2>
              </motion.div>

           </div>
        </div>
      </div>

      {/* ── 3. TECHNICAL INDEX (MINIMALIST CERTIFICATIONS) ── */}
      <section className="pt-24 pb-8 bg-[#F8FAFC] border-t border-slate-100 relative overflow-hidden">
         <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-brand-blue/5 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2" />
         
         <div className="max-w-[1400px] mx-auto px-6 lg:px-12 mb-16 relative z-10">
            <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-8">
               <div className="text-left flex-grow">
                  <div className="flex items-center gap-3 mb-4">
                     <div className="h-px w-6 bg-brand-blue/20" />
                     <p className="text-brand-blue font-black tracking-[0.4em] uppercase text-[8px]">Scientific Archive</p>
                  </div>
                  <h2 className="text-3xl lg:text-4xl font-serif font-bold text-slate-900 leading-tight">
                    Technical <span className="text-brand-blue italic font-medium">Index</span>
                  </h2>
                  <p className="text-slate-500 mt-6 max-w-xl text-sm lg:text-base font-light leading-relaxed">
                    A comprehensive registry of international certifications and compliance standards governing our manufacturing protocols.
                  </p>
               </div>
            </div>
         </div>

          {/* ── 3. FLOATING SCIENTIFIC RIBBON (PREMIUM EDITION) ── */}
         <div className="relative py-4 overflow-hidden bg-[#F8FAFC]">
            {/* Molecular Background Elements */}
            <div className="absolute inset-0 pointer-events-none opacity-[0.4]">
               {[...Array(6)].map((_, i) => (
                  <motion.div
                     key={i}
                     className="absolute w-64 h-64 rounded-full blur-[100px]"
                     style={{ 
                        backgroundColor: i % 2 === 0 ? '#1B3F8B08' : '#C9A04808',
                        left: `${Math.random() * 100}%`,
                        top: `${Math.random() * 100}%`
                     }}
                     animate={{ 
                        x: [0, 50, 0],
                        y: [0, 30, 0],
                        scale: [1, 1.1, 1]
                     }}
                     transition={{ 
                        duration: 10 + i * 2, 
                        repeat: Infinity, 
                        ease: "easeInOut" 
                     }}
                  />
               ))}
            </div>

            {/* Edge Gradients for seamless infinite feel */}
            <div className="absolute left-0 top-0 bottom-0 w-64 bg-gradient-to-r from-[#F8FAFC] via-[#F8FAFC]/80 to-transparent z-20 pointer-events-none" />
            <div className="absolute right-0 top-0 bottom-0 w-64 bg-gradient-to-l from-[#F8FAFC] via-[#F8FAFC]/80 to-transparent z-20 pointer-events-none" />

            <div className="flex w-fit animate-marquee hover:[animation-play-state:paused] gap-16 py-12 px-16">
               {[...Array(2)].map((_, idx) => (
                  <div key={idx} className="flex gap-16">
                    {[
                      { title: "WHO-GMP", type: "Certification", id: "01", color: "#1B3F8B", icon: <ShieldCheck className="w-7 h-7" /> },
                      { title: "USFDA", type: "Regulatory", id: "02", color: "#0c2160", icon: <ShieldCheck className="w-7 h-7" /> },
                      { title: "ISO 9001", type: "Quality", id: "03", color: "#C9A048", icon: <Award className="w-7 h-7" /> },
                      { title: "HACCP", type: "Safety", id: "04", color: "#386641", icon: <ShieldCheck className="w-7 h-7" /> },
                      { title: "FSSAI", type: "Compliance", id: "05", color: "#006d77", icon: <ShieldCheck className="w-7 h-7" /> },
                      { title: "HALAL", type: "Institutional", id: "06", color: "#457b9d", icon: <ShieldCheck className="w-7 h-7" /> },
                      { title: "Ayush", type: "Scientific", id: "07", color: "#6a994e", icon: <Beaker className="w-7 h-7" /> },
                      { title: "ISO 22000", type: "Certification", id: "08", color: "#4361ee", icon: <ShieldCheck className="w-7 h-7" /> }
                    ].map((doc, i) => (
                      <motion.div 
                        key={`${idx}-${i}`}
                        initial={{ y: 0 }}
                        animate={{ 
                           y: [0, -20, 0],
                        }}
                        transition={{ 
                           duration: 5 + (i % 4), 
                           repeat: Infinity, 
                           ease: "easeInOut" 
                        }}
                        className="relative"
                      >
                         <motion.div 
                           className="w-56 h-56 sm:w-64 sm:h-64 rounded-full bg-white/90 backdrop-blur-2xl border border-white/80 shadow-[0_20px_50px_rgba(0,0,0,0.03)] flex flex-col items-center justify-center p-8 sm:p-10 group cursor-pointer transition-all duration-700 relative overflow-hidden"
                           whileHover={{ scale: 1.08, boxShadow: "0 30px 80px rgba(0,0,0,0.12)" }}
                         >
                            {/* Iridescent Gradient Border (Animated on Hover) */}
                            <div 
                               className="absolute inset-0 rounded-full p-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
                               style={{ background: `linear-gradient(45deg, transparent, ${doc.color}40, transparent)` }}
                            >
                               <div className="w-full h-full rounded-full bg-white/0" />
                            </div>

                            {/* Shimmer Effect */}
                            <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/40 to-transparent pointer-events-none" />

                            {/* Accent Glow */}
                            <div 
                               className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-[0.08] transition-opacity duration-700 blur-3xl pointer-events-none" 
                               style={{ backgroundColor: doc.color }}
                            />

                            <div 
                               className="w-16 h-16 sm:w-20 sm:h-20 rounded-[2rem] flex items-center justify-center mb-8 shadow-[0_8px_20px_rgba(0,0,0,0.03)] transition-all duration-700 group-hover:rounded-2xl group-hover:shadow-lg group-hover:-rotate-6"
                               style={{ backgroundColor: `${doc.color}10`, color: doc.color }}
                            >
                               {doc.icon}
                            </div>

                            <div className="text-center relative z-10">
                               <p className="text-[9px] sm:text-[10px] font-black uppercase tracking-[0.5em] mb-3 opacity-40 group-hover:opacity-100 transition-opacity" style={{ color: doc.color }}>{doc.type}</p>
                               <h3 className="text-base sm:text-xl font-serif font-bold text-slate-900 leading-tight tracking-tight">
                                  {doc.title}
                               </h3>
                            </div>

                            {/* Scientific Detail Dots */}
                            <div className="mt-8 flex gap-1.5 opacity-20 group-hover:opacity-60 transition-opacity">
                               {[1, 2, 3, 4, 5].map(dot => (
                                  <div key={dot} className="w-1 h-1 rounded-full bg-slate-300" />
                               ))}
                            </div>

                            {/* Reference Tag */}
                            <div className="absolute top-10 right-10">
                               <span className="text-[8px] font-black text-slate-100 uppercase tracking-widest group-hover:text-slate-300 transition-colors">ID-{doc.id}</span>
                            </div>
                         </motion.div>
                      </motion.div>
                    ))}
                  </div>
               ))}
            </div>
         </div>

         <style jsx global>{`
            @keyframes marquee {
               0% { transform: translateX(0); }
               100% { transform: translateX(-50%); }
            }
            .animate-marquee {
               animation: marquee 60s linear infinite;
            }
         `}</style>
      </section>
    </div>
  );
}
