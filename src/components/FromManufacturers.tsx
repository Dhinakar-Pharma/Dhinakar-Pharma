"use client";

import { motion } from "framer-motion";
import { ShieldCheck, Award, Microscope, CheckCircle2 } from "lucide-react";

const certifications = [
  { title: "WHO-GMP", category: "Global Standard", image: "/certifications/who-gmp.png", description: "Good Manufacturing Practices certification ensuring sterile production." },
  { title: "USFDA Compliance", category: "Regulatory Approval", image: "/certifications/usfda.svg", description: "Strict adherence to United States Food and Drug Administration guidelines." },
  { title: "ISO 9001:2015", category: "Quality System", image: "/certifications/iso.png", description: "International standard for Quality Management Systems (QMS)." },
  { title: "HACCP Certified", category: "Safety Control", image: "/certifications/haccp.png", description: "Hazard Analysis Critical Control Point system for formulation safety." },
  { title: "FSSAI Accreditation", category: "Food & Supplement", image: "/certifications/fssai.png", description: "Food Safety and Standards Authority of India manufacturing license." },
  { title: "HALAL Certification", category: "Global Compliance", image: "/certifications/halal.png", description: "Certified for global dietary compliance and ethical standards." },
  { title: "AYUSH Certified", category: "Formulation Standard", image: "/certifications/ayush.png", description: "Ministry of AYUSH manufacturing compliance for specialized generics." },
  { title: "ISO 22000", category: "Safety Management", image: "/certifications/iso22000.png", description: "Comprehensive food and pharmaceutical safety management standard." }
];

export default function FromManufacturers() {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
      
      {/* ── 1. COMPACT INSTITUTIONAL BANNER ── */}
      <div className="w-full relative overflow-hidden py-10 lg:py-14 px-6 sm:px-10 lg:px-16" style={{ background: "linear-gradient(150deg, #0c2160 0%, #1B3F8B 50%, #2460aa 100%)" }}>
        <div className="absolute inset-0 opacity-[0.05] pointer-events-none"
          style={{ backgroundImage: "radial-gradient(circle, white 1px, transparent 1px)", backgroundSize: "32px 32px" }} />
        
        <div className="max-w-[1800px] mx-auto relative z-10">
           <div className="flex flex-col md:flex-row items-center justify-between gap-8 lg:gap-16">
              
              {/* Title */}
              <motion.div 
                initial={{ opacity: 0, x: -20 }} 
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                className="max-w-md text-center md:text-left"
              >
                 <div className="flex items-center justify-center md:justify-start gap-3 mb-3">
                    <div className="h-px w-6 bg-[#C9A048]" />
                    <p className="text-[#C9A048] font-bold tracking-[0.4em] uppercase text-[9px]">Institutional Authority</p>
                 </div>
                 <h1 className="text-3xl lg:text-4xl font-serif font-bold text-white leading-tight">
                    From the <br />
                    <span style={{ background: "linear-gradient(105deg, #C9A048 10%, #f5e48a 55%, #C9A048 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>Manufacturers</span>
                 </h1>
              </motion.div>

              {/* Statement */}
              <motion.div 
                initial={{ opacity: 0, x: 20 }} 
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1, duration: 0.5 }}
                className="max-w-xl text-center md:text-left border-l-0 md:border-l border-white/10 md:pl-10 lg:pl-14"
              >
                 <h2 className="text-base sm:text-lg lg:text-xl font-serif font-medium text-white/90 leading-[1.6] italic">
                    "Adhering to the most <span className="text-[#f5e48a] border-b border-[#C9A048]/30">stringent</span> manufacturing standards for safety and efficacy."
                 </h2>
              </motion.div>

           </div>
        </div>
      </div>

      {/* ── 2. CERTIFICATION & COMPLIANCE GRID ── */}
      <section className="py-12 sm:py-16 max-w-[1800px] mx-auto px-6 sm:px-10 lg:px-16 w-full flex-grow">
        <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-14">
          <div className="flex items-center justify-center gap-3 mb-2">
            <span className="w-8 h-px bg-[#C9A048]" />
            <span className="text-brand-blue font-bold tracking-[0.3em] uppercase text-[10px]">Technical Registry</span>
            <span className="w-8 h-px bg-[#C9A048]" />
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-serif font-bold text-slate-900 leading-tight">
            Accreditations & <span className="text-brand-blue italic font-medium">Compliance Standards</span>
          </h2>
          <p className="text-slate-500 text-xs sm:text-sm mt-3 font-normal">
            A comprehensive index of international quality certifications governing our pharmaceutical manufacturing facilities.
          </p>
        </div>

        {/* 8 Card Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {certifications.map((doc, i) => (
            <motion.div
              key={doc.title}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
              className="bg-white rounded-2xl p-6 border border-slate-200/90 shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:shadow-lg transition-all duration-300 flex flex-col items-center text-center group"
            >
              {/* Logo Circle Container */}
              <div className="w-28 h-28 rounded-full bg-slate-50 border border-slate-100 p-5 flex items-center justify-center mb-5 group-hover:scale-105 transition-transform duration-300">
                <img 
                  src={doc.image} 
                  alt={`${doc.title} Logo`} 
                  className="w-full h-full object-contain mix-blend-multiply"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = `https://ui-avatars.com/api/?name=${doc.title}&background=0c2160&color=fff&font-size=0.33`;
                  }}
                />
              </div>

              <span className="text-[9px] font-bold uppercase tracking-widest text-[#C9A048] mb-1">{doc.category}</span>
              <h3 className="text-base font-serif font-bold text-slate-900 mb-2 group-hover:text-brand-blue transition-colors">
                {doc.title}
              </h3>
              <p className="text-xs text-slate-500 leading-relaxed font-normal">
                {doc.description}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

    </div>
  );
}
