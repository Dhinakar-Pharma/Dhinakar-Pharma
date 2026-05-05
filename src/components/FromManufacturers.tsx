
"use client";
import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { 
  ShieldCheck, 
  ArrowRight
} from "lucide-react";

export default function FromManufacturers() {
  const trackRef = useRef<HTMLDivElement>(null);

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

      {/* ── 3. TECHNICAL DOSSIERS (OSCILLATING MOTION SLIDER) ── */}
      <section className="py-20 bg-[#F8FAFC] border-t border-slate-100 relative group/section overflow-hidden">
         
         <div className="max-w-[1400px] mx-auto px-6 lg:px-12 mb-16 relative z-10">
            <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-8">
               <div className="text-left flex-grow">
                  <div className="flex items-center gap-3 mb-4">
                     <div className="h-px w-6 bg-brand-blue/20" />
                     <p className="text-brand-blue font-black tracking-[0.4em] uppercase text-[8px]">Scientific Archive</p>
                  </div>
                  <h2 className="text-2xl lg:text-3xl font-serif font-bold text-slate-900 leading-tight">
                    Technical <span className="text-brand-blue italic font-medium">Documentation</span>
                  </h2>
                  <p className="text-slate-500 mt-4 max-w-xl text-xs lg:text-sm font-light leading-relaxed">
                    A comprehensive repository of our certified manufacturing dossiers and international compliance protocols.
                  </p>
               </div>
               
               {/* Custom Navigation Controls */}
               <div className="flex gap-4 self-end">
                  <button 
                    onClick={() => {
                      const el = trackRef.current;
                      if (el) el.scrollBy({ left: -320, behavior: 'smooth' });
                    }}
                    className="group/btn w-12 h-12 rounded-full border border-slate-200 flex items-center justify-center hover:border-brand-blue transition-all duration-500 bg-white/80 backdrop-blur-sm shadow-sm"
                  >
                     <ArrowRight className="w-5 h-5 rotate-180 text-slate-400 group-hover/btn:text-brand-blue transition-colors" />
                  </button>
                  <button 
                    onClick={() => {
                      const el = trackRef.current;
                      if (el) el.scrollBy({ left: 320, behavior: 'smooth' });
                    }}
                    className="group/btn w-12 h-12 rounded-full border border-slate-200 flex items-center justify-center hover:border-brand-blue transition-all duration-500 bg-white/80 backdrop-blur-sm shadow-sm"
                  >
                     <ArrowRight className="w-5 h-5 text-slate-400 group-hover/btn:text-brand-blue transition-colors" />
                  </button>
               </div>
            </div>
         </div>

         {/* Controllable Track - Optimized for 4 Cards */}
         <div className="max-w-[1400px] mx-auto px-6 lg:px-12 relative z-10">
            <div 
              id="dossier-track"
              ref={trackRef}
              className="flex gap-6 overflow-x-auto pb-16 no-scrollbar snap-x snap-mandatory"
            >
               {[
                 { title: "WHO-GMP Certificate", type: "Certification", id: "01", file: "/WHO-GMP Certificate.pdf", image: "/WHO-GMP.png" },
                 { title: "USFDA 2025 Registration", type: "Regulatory", id: "02", file: "/USFDA 2025.pdf", image: "/USFDA.png" },
                 { title: "ISO 9001 (QMS)", type: "Quality Standard", id: "03", file: "/ISO 9001 (QMS Cewrtification).pdf", image: "/iso9001.png" },
                 { title: "HACCP Certified", type: "Safety", id: "04", file: "/HACCP.pdf", image: "/haccp_preview.png" },
                 { title: "FSSAI License", type: "Compliance", id: "05", file: "/FSSAI - SKHC.pdf", image: "/fssai.png" },
                 { title: "HALAL Certificate", type: "Institutional", id: "06", file: "/HALAL CERTICATE.pdf", image: "/Halal.png" },
                 { title: "Ayush Registration", type: "Scientific", id: "07", file: "/Ayush - SKHC.pdf", image: "/Ayush.png" },
                 { title: "ISO 22000 (FSMS)", type: "Certification", id: "08", file: "/ISO.pdf", image: "/iso22000.png" }
               ].map((doc, i) => (
                 <motion.div 
                   key={i}
                   initial={{ opacity: 0, y: 30 }}
                   whileInView={{ opacity: 1, y: 0 }}
                   viewport={{ once: true }}
                   transition={{ delay: i * 0.1, duration: 0.8, ease: "easeOut" }}
                   whileHover={{ y: -10 }}
                   onClick={() => window.open(doc.file, '_blank')}
                   className="min-w-[280px] sm:min-w-[305px] bg-white/60 backdrop-blur-xl rounded-[2rem] border border-white/80 shadow-[0_20px_40px_rgba(0,0,0,0.03)] hover:shadow-[0_40px_80px_rgba(0,0,0,0.08)] transition-all duration-500 overflow-hidden group cursor-pointer snap-start relative"
                 >
                    <div className="absolute inset-0 rounded-[2rem] border border-brand-blue/0 group-hover:border-brand-blue/10 transition-all duration-500 pointer-events-none" />

                    <div className="relative aspect-[3/4] bg-white flex items-center justify-center overflow-hidden">
                       <img 
                         src={doc.image} 
                         alt={doc.title}
                         className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                       />
                       <div className="absolute inset-0 bg-gradient-to-tr from-brand-blue/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                       <div className="absolute top-0 left-0 w-full h-20 bg-gradient-to-b from-black/5 to-transparent pointer-events-none" />
                       <div className="absolute top-6 right-6 px-4 py-1.5 bg-white/90 backdrop-blur-md rounded-full border border-white shadow-sm z-10">
                          <p className="text-[9px] font-black uppercase tracking-widest">{doc.type}</p>
                       </div>
                    </div>
                    
                    <div className="p-8 relative bg-white/70 backdrop-blur-md border-t border-white/40">
                       <div className="flex items-center gap-2 mb-3">
                          <span className="w-1 h-1 rounded-full bg-brand-blue/40" />
                          <span className="text-[9px] font-black text-brand-blue/40 tracking-widest uppercase">Protocol DOC-{doc.id}</span>
                       </div>
                       <h3 className="text-lg font-serif font-bold text-slate-900 mb-6 truncate group-hover:text-brand-blue transition-colors duration-300">{doc.title}</h3>
                       <div className="flex items-center justify-between">
                          <div className="flex -space-x-1.5">
                             {[1,2,3].map(j => (
                               <div key={j} className="w-5 h-5 rounded-full border border-white bg-slate-50" />
                             ))}
                          </div>
                          <div className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center group-hover:bg-brand-blue group-hover:text-white transition-all duration-300 shadow-sm">
                             <ArrowRight className="w-4 h-4" />
                          </div>
                       </div>
                    </div>
                 </motion.div>
               ))}
            </div>
         </div>

         <style jsx global>{`
           .no-scrollbar::-webkit-scrollbar {
             display: none;
           }
           .no-scrollbar {
             -ms-overflow-style: none;
             scrollbar-width: none;
           }
         `}</style>
      </section>

    </div>
  );
}
