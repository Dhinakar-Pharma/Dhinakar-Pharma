"use client";

import { motion } from "framer-motion";
import { ShieldCheck, Award, Beaker, Factory } from "lucide-react";

export default function Manufacturing() {
  return (
    <section id="manufacturing" className="py-24 lg:py-40 bg-white overflow-hidden">
      <div className="max-w-[1650px] mx-auto px-6 lg:px-12 flex flex-col lg:flex-row items-center gap-16 lg:gap-32">
        
        {/* Image side */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="w-full lg:w-1/2 relative"
        >
          {/* Decorative elements */}
          <div className="absolute -top-10 -left-10 w-40 h-40 bg-brand-blue/5 rounded-full -z-10 blur-3xl animate-pulse" />
          <div className="absolute -bottom-10 -right-10 w-64 h-64 bg-[#C9A048]/10 rounded-full -z-10 blur-3xl" />
          
          <div className="relative group">
            <img
              src="/manufacturing.png"
              alt="Dhinakar Pharma Manufacturing"
              className="w-full h-auto rounded-[3rem] shadow-[0_50px_100px_rgba(0,0,0,0.12)] border-[16px] border-white transition-transform duration-700 group-hover:scale-[1.02]"
            />
            
            {/* Floating Trust Card */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="absolute -bottom-8 -right-4 lg:-right-12"
            >
              <div className="glass-gold p-8 rounded-3xl shadow-2xl flex items-center gap-5 max-w-[300px]">
                <div className="w-14 h-14 rounded-2xl bg-white/80 flex items-center justify-center shrink-0 shadow-inner">
                  <ShieldCheck className="w-7 h-7 text-brand-blue" />
                </div>
                <div>
                  <p className="text-[10px] uppercase tracking-widest text-brand-blue font-bold mb-1">Certification</p>
                  <p className="text-sm font-bold text-gray-900 leading-tight">FDA Compliant & EU-GMP Standards</p>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* Text side */}
        <div className="w-full lg:w-1/2">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex items-center gap-4 mb-8"
          >
            <span className="w-12 h-[2px] bg-[#C9A048]" />
            <span className="text-brand-blue font-bold tracking-[0.4em] text-[11px] uppercase">Operational Excellence</span>
          </motion.div>
          
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl lg:text-6xl xl:text-7xl font-serif font-bold text-gray-900 leading-[1.1] mb-10"
          >
            Precision in every <br />
            <span style={{ background: "linear-gradient(105deg, #C9A048 10%, #f5e48a 55%, #C9A048 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
              Scientific Molecule.
            </span>
          </motion.h2>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="space-y-8"
          >
            <p className="text-xl text-gray-600 leading-relaxed font-light">
              Our manufacturing philosophy is rooted in the belief that quality should never be an afterthought. 
              We operate at the intersection of rigorous science and industrial precision.
            </p>
            
            <p className="text-lg text-gray-500 leading-relaxed">
              From testing raw materials to the final packaging stage, our labs utilize cutting-edge technology 
              and automated control systems to ensure that every formulation meets international pharmacopeia standards. 
              Our commitment to sterile environments and meticulous quality gates defines our institutional identity.
            </p>

            {/* Subtle Indicators */}
            <div className="pt-10 flex flex-wrap gap-8 items-center border-t border-gray-100">
              <div className="flex items-center gap-3">
                <Beaker className="w-5 h-5 text-gold-dark" />
                <span className="text-xs font-bold uppercase tracking-widest text-gray-400">Advanced R&D</span>
              </div>
              <div className="flex items-center gap-3">
                <Factory className="w-5 h-5 text-gold-dark" />
                <span className="text-xs font-bold uppercase tracking-widest text-gray-400">ISO Certified</span>
              </div>
              <div className="flex items-center gap-3">
                <Award className="w-5 h-5 text-gold-dark" />
                <span className="text-xs font-bold uppercase tracking-widest text-gray-400">Global Standards</span>
              </div>
            </div>
          </motion.div>
        </div>

      </div>
    </section>
  );
}
