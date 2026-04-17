"use client";

import { motion } from "framer-motion";
import { CheckCircle2, ShieldCheck, Zap } from "lucide-react";

export default function Manufacturing() {
  return (
    <section id="manufacturing" className="py-24 lg:py-32 bg-white overflow-hidden">
      <div className="max-w-[1650px] mx-auto px-6 lg:px-12 flex flex-col lg:flex-row items-center gap-16 lg:gap-24">
        
        {/* Image side */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="w-full lg:w-1/2 relative"
        >
          <div className="absolute -top-6 -left-6 w-32 h-32 bg-brand-blue/5 rounded-3xl -z-10" />
          <div className="absolute -bottom-6 -right-6 w-48 h-48 bg-[#C9A048]/5 rounded-full -z-10 blur-2xl" />
          
          <img
            src="/manufacturing.png"
            alt="Dhinakar Pharma Manufacturing"
            className="w-full h-auto rounded-[2.5rem] shadow-2xl shadow-brand-blue/10 border-[12px] border-white"
          />
          
          <div className="absolute top-1/2 -translate-y-1/2 -right-12 hidden xl:block">
            <div className="bg-white p-6 rounded-3xl shadow-xl border border-gray-100 flex items-center gap-4 max-w-[240px]">
              <div className="w-12 h-12 rounded-full bg-green-50 flex items-center justify-center shrink-0">
                <ShieldCheck className="w-6 h-6 text-green-600" />
              </div>
              <p className="text-sm font-bold text-gray-900 leading-snug">FDA Compliant & EU-GMP Standards</p>
            </div>
          </div>
        </motion.div>

        {/* Text side */}
        <div className="w-full lg:w-1/2">
          <div className="flex items-center gap-3 mb-6">
            <span className="w-12 h-px bg-brand-blue" />
            <span className="text-brand-blue font-bold tracking-widest text-[10px] uppercase">Scientific Integrity</span>
          </div>
          
          <h2 className="text-4xl lg:text-5xl xl:text-6xl font-serif font-bold text-gray-900 leading-tight mb-8">
            Precision in every <span className="text-gold-dark">Molecule.</span>
          </h2>
          
          <p className="text-lg text-gray-600 leading-relaxed mb-10">
            Our manufacturing philosophy is rooted in the belief that quality should never be an afterthought. 
            From testing raw materials to the final packaging stage, our labs utilize cutting-edge technology 
            to ensure that every formulation meets international pharmacopeia standards.
          </p>

          <div className="space-y-6 mb-12">
            {[
              { t: "Automated Control Systems", d: "Minimizing human error through sophisticated robotics.", i: Zap },
              { t: "Rigorous Quality Gates", d: "Five levels of testing before a product leaves our facility.", i: CheckCircle2 },
            ].map((item, i) => (
              <div key={i} className="flex gap-5 group">
                <div className="w-12 h-12 rounded-xl bg-gray-50 flex items-center justify-center shrink-0 group-hover:bg-brand-blue group-hover:text-white transition-all">
                  <item.i className="w-6 h-6 text-brand-blue group-hover:text-white" />
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 mb-1">{item.t}</h4>
                  <p className="text-sm text-gray-500 leading-relaxed">{item.d}</p>
                </div>
              </div>
            ))}
          </div>

          <button className="px-10 py-4 border-2 border-brand-blue text-brand-blue font-bold uppercase tracking-widest text-[11px] rounded-full hover:bg-brand-blue hover:text-white transition-all shadow-xl shadow-brand-blue/5">
            Learn About our standards
          </button>
        </div>

      </div>
    </section>
  );
}
