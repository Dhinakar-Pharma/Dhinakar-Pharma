"use client";

import { motion } from "framer-motion";
import { 
  ShieldCheck, 
  Target, 
  FlaskConical, 
  Globe2, 
  Sparkles, 
  HeartHandshake,
  ArrowRight,
  Plus
} from "lucide-react";

const pillars = [
  {
    title: "WHO-GMP Quality",
    description: "Adhering to the most stringent international manufacturing standards for safety and efficacy.",
    icon: ShieldCheck,
    tag: "QUALITY"
  },
  {
    title: "Precision Products",
    description: "Specializing in complex metabolic and reproductive generic solutions with high clinical precision.",
    icon: Target,
    tag: "PRECISION"
  },
  {
    title: "R&D Excellence",
    description: "Our core is driven by rigorous scientific research and developmental innovation for better outcomes.",
    icon: FlaskConical,
    tag: "SCIENCE"
  },
  {
    title: "Global Standards",
    description: "Bringing world-class pharmaceutical expertise from the leading drug capital, Hyderabad.",
    icon: Globe2,
    tag: "GLOBAL"
  },
  {
    title: "99.8% Purity",
    description: "Ensuring near-perfect purity levels across our entire pharmaceutical portfolio for patient safety.",
    icon: Sparkles,
    tag: "PURITY"
  },
  {
    title: "Empathetic Care",
    description: "Designing solutions that restore balance and support patients on their journey to healthy living.",
    icon: HeartHandshake,
    tag: "CARE"
  }
];

export default function WhyUs() {
  return (
    <div className="min-h-screen bg-white flex flex-col scroll-mt-20 md:scroll-mt-24 font-sans">
      
      {/* ── 1. SIGNATURE EXECUTIVE HEADER ── */}
      <div className="w-full relative overflow-hidden py-10 sm:py-16 px-5 sm:px-10 lg:px-12" style={{ background: "linear-gradient(150deg, #0c2160 0%, #1B3F8B 50%, #2460aa 100%)" }}>
        {/* Background Polish */}
        <div className="absolute inset-0 opacity-[0.05] pointer-events-none"
          style={{ backgroundImage: "radial-gradient(circle, white 1px, transparent 1px)", backgroundSize: "24px 24px" }} />
        
        <div className="max-w-[1600px] mx-auto relative z-10">
           <div className="flex flex-col md:flex-row items-center justify-between gap-6 sm:gap-10">
              <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
                 <div className="flex items-center gap-3 mb-3 sm:mb-4">
                    <div className="h-[2px] w-6 bg-[#C9A048]" />
                    <p className="text-[#C9A048] font-bold tracking-[0.4em] uppercase text-[8px] sm:text-[9px]">The Advantage</p>
                 </div>
                 <h1 className="text-2xl sm:text-4xl lg:text-5xl font-serif font-bold text-white leading-tight mb-3 sm:mb-4">
                    Why Choose <br className="hidden lg:block"/>
                    <span style={{ background: "linear-gradient(105deg, #C9A048 10%, #f5e48a 55%, #C9A048 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>Dhinakar Pharma?</span>
                 </h1>
                 <p className="text-white/60 text-[13px] sm:text-base lg:text-lg max-w-2xl leading-relaxed">
                   Bridging the gap between research and patient care.
                 </p>
              </motion.div>

              {/* Status Badge */}
              <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="shrink-0">
                 <div className="bg-white/5 backdrop-blur-xl border border-white/10 p-8 rounded-[2rem] text-center">
                    <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center mx-auto mb-4 border border-white/10">
                       <Plus className="w-8 h-8 text-[#C9A048]" />
                    </div>
                    <p className="text-white text-3xl font-serif font-bold mb-1">99.8%</p>
                    <p className="text-[#C9A048] text-[9px] font-black uppercase tracking-widest">Purity Standard</p>
                 </div>
              </motion.div>
           </div>
        </div>
      </div>

      {/* ── 2. PILLARS OF EXCELLENCE GRID ── */}
      <section className="py-20 lg:py-32 bg-slate-50/30">
        <div className="max-w-[1600px] mx-auto px-5 sm:px-10 lg:px-12">
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
            {pillars.map((pillar, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                className="group relative bg-white p-10 lg:p-12 rounded-[2.5rem] border border-slate-100 shadow-[0_20px_50px_rgba(0,0,0,0.02)] hover:shadow-[0_40px_80px_rgba(12,31,96,0.06)] transition-all duration-500 hover:-translate-y-2"
              >
                {/* Accent Corner */}
                <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-slate-50 to-transparent rounded-tr-[2.5rem] pointer-events-none" />

                <div className="relative z-10">
                   {/* Icon Stage */}
                   <div className="w-16 h-16 bg-brand-blue/5 rounded-2xl flex items-center justify-center mb-8 border border-brand-blue/5 group-hover:scale-110 group-hover:bg-brand-blue/10 transition-all duration-500">
                      <pillar.icon className="w-7 h-7 text-brand-blue" />
                   </div>

                   <p className="text-[#386641] font-black tracking-[0.3em] uppercase text-[9px] mb-4">{pillar.tag}</p>
                   
                   <h3 className="text-2xl font-serif font-bold text-slate-900 mb-4 tracking-tight group-hover:text-brand-blue transition-colors">
                      {pillar.title}
                   </h3>
                   
                   <p className="text-slate-500 text-[15px] sm:text-base leading-relaxed mb-8">
                     {pillar.description}
                   </p>

                   {/* Subtle Link Indicator */}
                   <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-all duration-500 text-brand-blue">
                      <span className="text-[10px] font-bold uppercase tracking-widest">Learn More</span>
                      <ArrowRight className="w-4 h-4" />
                   </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 3. BOTTOM TRUST BANNER ── */}
      <section className="pb-24 sm:pb-32 bg-slate-50/30">
         <div className="max-w-[1600px] mx-auto px-5 sm:px-10 lg:px-12">
            <div className="bg-brand-blue p-10 sm:p-16 lg:p-20 rounded-[3rem] relative overflow-hidden group">
               {/* Background Glow */}
               <div className="absolute top-0 right-0 w-full h-full bg-[radial-gradient(circle_at_70%_30%,rgba(201,160,72,0.1),transparent_70%)] opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
               <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-white/5 rounded-full blur-3xl" />
               
               <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-10">
                  <div className="text-center md:text-left">
                     <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-white mb-6 leading-tight">
                        Guided by Science, <br className="hidden lg:block"/> 
                        Driven by <span className="text-[#C9A048]">Compassion.</span>
                     </h2>
                     <p className="text-white/60 text-base sm:text-lg max-w-xl leading-relaxed">
                        Join us in our mission to redefine global healthcare standards through pharmaceutical excellence and empathetic innovation.
                     </p>
                  </div>
                  <button className="px-10 py-5 bg-white text-brand-blue rounded-full font-bold uppercase tracking-[0.2em] text-[10px] shadow-2xl hover:bg-[#C9A048] hover:text-white transition-all duration-500">
                     Partner With Us
                  </button>
               </div>
            </div>
         </div>
      </section>

    </div>
  );
}
