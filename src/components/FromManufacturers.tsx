
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
         
         <div className="w-full px-6 lg:px-12 xl:px-24 mb-16 relative z-10">
            <div className="flex flex-col items-start gap-8">
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
               {[
                 { left: "12%", top: "24%" },
                 { left: "68%", top: "15%" },
                 { left: "35%", top: "72%" },
                 { left: "85%", top: "58%" },
                 { left: "45%", top: "33%" },
                 { left: "18%", top: "85%" }
               ].map((pos, i) => (
                  <motion.div
                     key={i}
                     className="absolute w-64 h-64 rounded-full blur-[100px]"
                     style={{ 
                        backgroundColor: i % 2 === 0 ? '#1B3F8B08' : '#C9A04808',
                        left: pos.left,
                        top: pos.top
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
                      { title: "WHO-GMP", color: "#1B3F8B", image: "/certifications/who-gmp.png", pad: "p-6 sm:p-8", filter: "" },
                      { title: "USFDA", color: "#0c2160", image: "/certifications/usfda.svg", pad: "p-10 sm:p-12", filter: "" },
                      { title: "ISO 9001", color: "#C9A048", image: "/certifications/iso.png", pad: "p-4 sm:p-6", filter: "" },
                      { title: "HACCP", color: "#386641", image: "/certifications/haccp.png", pad: "p-2 sm:p-4", filter: "" },
                      { title: "FSSAI", color: "#006d77", image: "/certifications/fssai.png", pad: "p-2 sm:p-4", filter: "contrast-125 brightness-105" },
                      { title: "HALAL", color: "#457b9d", image: "/certifications/halal.png", pad: "p-4 sm:p-6", filter: "" },
                      { title: "Ayush", color: "#6a994e", image: "/certifications/ayush.png", pad: "p-1 sm:p-2", filter: "contrast-125 brightness-105" },
                      { title: "ISO 22000", color: "#4361ee", image: "/certifications/iso22000.png", pad: "p-4 sm:p-6", filter: "" }
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
                           className={`w-48 h-48 sm:w-56 sm:h-56 rounded-full bg-white/90 backdrop-blur-2xl border border-white/80 shadow-[0_20px_50px_rgba(0,0,0,0.03)] flex flex-col items-center justify-center group cursor-pointer transition-all duration-700 relative overflow-hidden ${doc.pad}`}
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
                            <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/40 to-transparent pointer-events-none z-20" />

                            {/* Accent Glow */}
                            <div 
                               className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-[0.08] transition-opacity duration-700 blur-3xl pointer-events-none" 
                               style={{ backgroundColor: doc.color }}
                            />

                            <img 
                               src={doc.image} 
                               alt={`${doc.title} Logo`} 
                               className={`w-full h-full object-contain mix-blend-multiply relative z-10 transition-transform duration-700 group-hover:scale-110 ${doc.filter}`}
                               onError={(e) => {
                                 (e.target as HTMLImageElement).src = `https://ui-avatars.com/api/?name=${doc.title}&background=${doc.color.replace('#', '')}&color=fff&font-size=0.33`;
                               }}
                            />
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
