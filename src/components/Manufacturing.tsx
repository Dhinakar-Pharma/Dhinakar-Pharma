"use client";

import { motion } from "framer-motion";
import { ShieldCheck, Award, Beaker, Factory } from "lucide-react";

export default function Manufacturing() {
  return (
    <section id="manufacturing" className="py-8 sm:py-12 bg-white overflow-hidden font-sans">
      <div className="max-w-[1500px] mx-auto px-6 sm:px-10 lg:px-16 w-full flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-14">
        
        {/* Image side */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="w-full lg:w-[46%] relative max-w-lg lg:max-w-none mx-auto"
        >
          {/* Subtle Ambient Glow */}
          <div className="absolute -top-6 -left-6 w-36 h-36 bg-brand-blue/5 rounded-full -z-10 blur-2xl" />
          
          <div className="relative group">
            <img
              src="/manufacturing.png"
              alt="Dhinakar Pharma Manufacturing"
              className="w-full h-auto max-h-[380px] object-cover rounded-2xl shadow-lg border-4 border-white transition-transform duration-500 group-hover:scale-[1.01]"
            />
            
            {/* Floating Trust Card */}
            <motion.div 
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="absolute -bottom-4 -right-2 sm:-right-4"
            >
              <div className="bg-white/95 backdrop-blur-md p-3.5 sm:p-4 rounded-xl shadow-lg border border-slate-200 flex items-center gap-3 max-w-[240px] sm:max-w-[270px]">
                <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-[#0c2160] to-[#1B3F8B] flex items-center justify-center shrink-0 shadow-sm text-white">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-[9px] uppercase tracking-wider text-brand-blue font-bold mb-0.5">Certification</p>
                  <p className="text-xs font-bold text-gray-900 leading-tight">FDA Compliant & EU-GMP Standards</p>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* Text side */}
        <div className="w-full lg:w-[50%] flex flex-col items-start text-left">
          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex items-center gap-2.5 mb-3"
          >
            <span className="w-8 h-px bg-[#C9A048]" />
            <span className="text-brand-blue font-bold tracking-[0.3em] text-[10px] uppercase">Operational Excellence</span>
          </motion.div>
          
          <motion.h2 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-2xl sm:text-3xl lg:text-4xl font-serif font-bold text-gray-900 leading-[1.15] mb-4"
          >
            Precision in every <br className="hidden sm:block" />
            <span style={{ background: "linear-gradient(105deg, #C9A048 10%, #f5e48a 55%, #C9A048 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
              Scientific Molecule.
            </span>
          </motion.h2>
          
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="space-y-3.5"
          >
            <p className="text-sm sm:text-base text-gray-700 leading-relaxed font-normal">
              Our manufacturing philosophy is rooted in the belief that quality should never be an afterthought. 
              We operate at the intersection of rigorous science and industrial precision.
            </p>
            
            <p className="text-xs sm:text-sm text-gray-500 leading-relaxed">
              From testing raw materials to final packaging, our labs utilize cutting-edge technology and automated control systems to ensure that every formulation meets international pharmacopeia standards.
            </p>

            {/* Compact Feature Badges */}
            <div className="pt-5 flex flex-wrap gap-2.5 items-center border-t border-slate-100">
              <div className="flex items-center gap-2 bg-slate-50 border border-slate-200/80 px-3 py-1.5 rounded-lg">
                <Beaker className="w-3.5 h-3.5 text-brand-blue" />
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-700">Advanced R&D</span>
              </div>
              <div className="flex items-center gap-2 bg-slate-50 border border-slate-200/80 px-3 py-1.5 rounded-lg">
                <Factory className="w-3.5 h-3.5 text-brand-blue" />
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-700">ISO Certified</span>
              </div>
              <div className="flex items-center gap-2 bg-slate-50 border border-slate-200/80 px-3 py-1.5 rounded-lg">
                <Award className="w-3.5 h-3.5 text-brand-blue" />
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-700">Global Standards</span>
              </div>
            </div>
          </motion.div>
        </div>

      </div>
    </section>
  );
}
