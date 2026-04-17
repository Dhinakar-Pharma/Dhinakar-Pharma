"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Plus,
  Minus,
  CheckCircle2, 
  ArrowLeft, 
  ShieldCheck, 
  FlaskConical,
  ArrowRight,
  ChevronRight
} from "lucide-react";
import Link from "next/link";
import { products } from "@/data/products";

export default function ProductDetailPage() {
  const { id } = useParams();
  const product = products.find((p) => p.id === id);

  useEffect(() => {
    window.scrollTo(0, 0);
    const timer = setTimeout(() => window.scrollTo(0, 0), 10);
    return () => clearTimeout(timer);
  }, [id]);

  if (!product) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-white p-6">
        <FlaskConical className="w-16 h-16 text-slate-100 mb-6 animate-pulse" />
        <h1 className="text-2xl font-serif font-bold text-gray-900 mb-4">Molecule Not Found</h1>
        <Link href="/products" className="flex items-center gap-2 text-brand-blue font-bold uppercase tracking-widest text-[10px]">
          <ArrowLeft className="w-4 h-4" /> Return to Portfolio
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white font-sans text-gray-900 selection:bg-brand-blue/5">
      
      {/* ── 1. COMPACT SCIENTIFIC HEADER ── */}
      <section className="relative pt-12 pb-12 sm:pt-16 sm:pb-20 bg-slate-50/50 border-b border-slate-100">
        <div className="max-w-[1600px] mx-auto px-5 sm:px-10 lg:px-12">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-20 items-center">
            
            {/* Image Stage - Smart Scaled */}
            <div className="lg:col-span-5 flex justify-center lg:justify-start">
               <motion.div initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} className="relative group w-full max-w-[420px]">
                  <div className="aspect-[4/3] bg-white rounded-3xl border border-slate-100 shadow-sm flex items-center justify-center p-6 lg:p-10 relative overflow-hidden">
                     <div className="absolute inset-0 bg-gradient-to-br from-slate-50/50 to-transparent" />
                     <motion.img 
                       src={product.image}
                       alt={product.name}
                       className="relative z-10 max-h-[280px] lg:max-h-[350px] w-auto drop-shadow-lg"
                     />
                  </div>
                  {/* Subtle Badge */}
                  <div className="absolute -bottom-3 -right-3 bg-white px-4 py-2 rounded-xl shadow-lg border border-slate-50 flex items-center gap-2">
                     <ShieldCheck className="w-4 h-4 text-brand-blue/30" />
                     <span className="text-[9px] font-bold text-slate-500 uppercase tracking-widest leading-none">Pharma Certified</span>
                  </div>
               </motion.div>
            </div>

            {/* Content Stage - Clean Hierarchy */}
            <div className="lg:col-span-7">
               <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
                  <div className="inline-block px-3 py-1 bg-brand-blue/5 border border-brand-blue/10 rounded sm:mb-6 mb-4">
                     <span className="text-brand-blue font-black tracking-[0.3em] uppercase text-[8px]">{product.focus}</span>
                  </div>

                  <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-slate-900 mb-4 tracking-tight leading-tight">
                    {product.name}
                  </h1>

                  <p className="text-slate-500 text-base sm:text-lg mb-8 leading-relaxed font-medium">
                    {product.tagline}
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-3 gap-x-8 mb-10">
                    {product.benefits.map((benefit, i) => (
                      <div key={i} className="flex gap-3 items-start">
                         <CheckCircle2 className="w-4 h-4 text-gold-dark mt-0.5 shrink-0" />
                         <p className="text-slate-600 text-[14px] sm:text-[15px] font-medium leading-snug">{benefit}</p>
                      </div>
                    ))}
                  </div>

                  <button className="flex items-center gap-4 px-8 py-4 bg-brand-blue text-white rounded-full font-bold uppercase tracking-[0.2em] text-[10px] shadow-lg shadow-brand-blue/10 hover:bg-brand-blue-dark transition-all">
                    Medical Dossier
                    <ArrowRight className="w-4 h-4 text-gold-dark" />
                  </button>
               </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 2. DATA DOSSIER (STREAMLINED ACCORDIONS) ── */}
      <section className="py-12 sm:py-20 lg:py-24 bg-white">
         <div className="max-w-[1600px] mx-auto px-5 sm:px-10 lg:px-12">
            
            <div className="border border-slate-100 rounded-2xl overflow-hidden shadow-sm">
               
               {/* DESCRIPTION */}
               <AccordionItem title="Description" initialOpen={true}>
                  <div className="pt-2">
                     <h3 className="text-[#386641] font-bold text-xl sm:text-2xl mb-5 tracking-tight">Why {product.name} Health?</h3>
                     <p className="text-slate-500 text-[15px] sm:text-base leading-relaxed mb-10">
                       {product.description}
                     </p>

                     <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-10 gap-y-8 mb-10">
                        {product.nutrition.slice(0, 6).map((item) => (
                          <div key={item.component} className="flex gap-4">
                             <div className="w-1.5 h-1.5 rounded-full bg-slate-200 mt-2 shrink-0" />
                             <div>
                                <h4 className="text-slate-900 font-bold text-[14px] sm:text-[15px] mb-1 leading-tight">{item.component}</h4>
                                <p className="text-slate-400 text-[12px] sm:text-[13px] leading-relaxed">
                                   Precision measured for optimal clinical synergy.
                                </p>
                             </div>
                          </div>
                        ))}
                     </div>

                     <div className="mt-10 p-6 bg-slate-50 border border-slate-100 rounded-xl text-center">
                        <p className="text-[11px] text-slate-400 italic mx-auto leading-relaxed">
                          * Therapeutic Nutritional Interventions are carefully integrated to address specific metabolic pathways.
                        </p>
                     </div>
                  </div>
               </AccordionItem>

               {/* COMPOSITION TABLE */}
               <AccordionItem title="Nutritional Information">
                  <div className="border border-slate-100 rounded-[2rem] overflow-hidden mt-2">
                     <table className="w-full text-left font-sans">
                        <thead className="bg-[#F8FAFC]">
                           <tr>
                              <th className="px-6 sm:px-10 py-5 font-black text-brand-blue uppercase tracking-widest text-[9px] sm:text-[10px]">Each Capsule Contains</th>
                              <th className="px-6 sm:px-10 py-5 font-black text-brand-blue uppercase tracking-widest text-[9px] sm:text-[10px]">Amount</th>
                              <th className="hidden sm:table-cell px-6 sm:px-10 py-5 font-black text-brand-blue uppercase tracking-widest text-[9px] sm:text-[10px] text-right">RDA %</th>
                           </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                           {product.nutrition.map((item) => (
                             <tr key={item.component} className="hover:bg-slate-50/50 transition-colors">
                                <td className="px-6 sm:px-10 py-5 font-bold text-slate-700 text-[14px] sm:text-[15px]">{item.component}</td>
                                <td className="px-6 sm:px-10 py-5 font-extrabold text-brand-blue text-[14px] sm:text-[15px]">{item.amount}</td>
                                <td className="hidden sm:table-cell px-6 sm:px-10 py-5 text-slate-200 text-right">—</td>
                             </tr>
                           ))}
                           <tr className="bg-slate-50/20">
                              <td className="px-6 sm:px-10 py-4.5 text-slate-500 font-bold text-sm">Excipients</td>
                              <td className="px-6 sm:px-10 py-4.5 text-brand-blue font-bold text-sm">q.s.</td>
                              <td className="hidden sm:table-cell px-6 sm:px-10 py-4.5 text-slate-100 text-right">—</td>
                           </tr>
                        </tbody>
                     </table>
                  </div>
               </AccordionItem>

               {/* CLINICAL FAQ */}
               <AccordionItem title="FAQ">
                  <div className="space-y-10 py-2">
                     {product.faq.map((item, i) => (
                       <div key={i}>
                          <h4 className="text-[#386641] font-bold text-[15px] sm:text-[17px] mb-2 leading-tight">
                             {i + 1}. {item.question}
                          </h4>
                          <p className="text-slate-500 text-[14px] sm:text-[15px] leading-relaxed pl-6 border-l-2 border-slate-50">
                             {item.answer}
                          </p>
                       </div>
                     ))}
                  </div>
               </AccordionItem>
            </div>
         </div>
      </section>

    </div>
  );
}

function AccordionItem({ title, children, initialOpen = false }: { title: string, children: React.ReactNode, initialOpen?: boolean }) {
  const [isOpen, setIsOpen] = useState(initialOpen);

  return (
    <div className="border-b border-slate-50 last:border-0 bg-white">
       <button 
         onClick={() => setIsOpen(!isOpen)}
         className="w-full px-6 py-6 sm:px-10 flex items-center gap-6 hover:bg-slate-50/30 transition-all text-left group"
       >
          <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-all ${isOpen ? 'bg-slate-100 text-slate-900' : 'bg-slate-50 text-slate-300'}`}>
             {isOpen ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
          </div>
          <h3 className="text-lg sm:text-xl font-bold text-slate-900 tracking-tight">{title}</h3>
       </button>
       <AnimatePresence>
          {isOpen && (
            <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.3 }} className="overflow-hidden">
               <div className="px-6 pb-12 sm:px-20 pt-2 border-t border-slate-50/50">
                  {children}
               </div>
            </motion.div>
          )}
       </AnimatePresence>
    </div>
  );
}
