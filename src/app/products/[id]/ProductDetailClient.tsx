"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Plus,
  Minus,
  CheckCircle2, 
  ArrowLeft, 
  ShieldCheck, 
  FlaskConical,
  ShoppingCart
} from "lucide-react";
import Link from "next/link";
import { useCartStore } from "@/store/cartStore";

export default function ProductDetailClient({ product }: { product: any }) {
  const [quantity, setQuantity] = useState(1);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const { addItem, setIsOpen } = useCartStore();

  useEffect(() => {
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' as ScrollBehavior });
  }, [product?.id]);

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

  const handleAddToCart = () => {
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      quantity,
      image: product.images?.[0] || ""
    });
    setIsOpen(true); // Open the cart sidebar
  };

  return (
    <div className="min-h-screen bg-white font-sans text-gray-900 selection:bg-brand-blue/5">
      
      {/* ── 1. COMPACT SCIENTIFIC HEADER ── */}
      <section className="relative pt-24 pb-12 sm:pt-28 sm:pb-20 bg-slate-50/50 border-b border-slate-100">
        <div className="max-w-[1600px] mx-auto px-5 sm:px-10 lg:px-12">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-20 items-center">
            
            {/* Image Stage */}
            <div className="lg:col-span-5 flex justify-center lg:justify-start">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="w-full max-w-[480px] flex flex-row gap-4"
              >
                {/* Thumbnail Strip */}
                {product.images?.length > 1 && (
                  <div className="flex flex-col gap-3 pt-1">
                    {product.images.map((img: string, idx: number) => (
                      <button
                        key={idx}
                        onClick={() => setCurrentImageIndex(idx)}
                        className={`relative w-16 h-16 rounded-2xl overflow-hidden border-2 transition-all duration-300 flex-shrink-0 ${
                          currentImageIndex === idx
                            ? 'border-brand-blue shadow-[0_0_0_3px_rgba(27,63,139,0.15)]'
                            : 'border-slate-100 hover:border-slate-300 opacity-60 hover:opacity-100'
                        }`}
                        aria-label={`View image ${idx + 1}`}
                      >
                        <img
                          src={img}
                          alt={`${product.name} thumbnail ${idx + 1}`}
                          className="w-full h-full object-contain p-1.5 bg-white"
                        />
                        {currentImageIndex === idx && (
                          <div className="absolute inset-0 bg-brand-blue/5 rounded-xl" />
                        )}
                      </button>
                    ))}
                  </div>
                )}

                {/* Main Image */}
                <div className="flex-1 relative">
                  <div className="aspect-square bg-gradient-to-br from-slate-50 to-white rounded-3xl border border-slate-100 shadow-[0_8px_40px_rgba(0,0,0,0.07)] flex items-center justify-center overflow-hidden relative group">
                    {/* Corner accents */}
                    <div className="absolute top-4 left-4 w-6 h-6 border-t-2 border-l-2 border-brand-blue/20 rounded-tl-lg pointer-events-none z-10" />
                    <div className="absolute bottom-4 right-4 w-6 h-6 border-b-2 border-r-2 border-brand-blue/20 rounded-br-lg pointer-events-none z-10" />

                    <AnimatePresence mode="wait">
                      <motion.img
                        key={currentImageIndex}
                        src={product.images?.[currentImageIndex]}
                        initial={{ opacity: 0, scale: 0.96 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 1.02 }}
                        transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
                        alt={`${product.name} - View ${currentImageIndex + 1}`}
                        className="w-full h-full object-contain p-6 drop-shadow-md group-hover:scale-[1.03] transition-transform duration-500"
                      />
                    </AnimatePresence>

                    {/* Image counter badge */}
                    <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm border border-slate-100 rounded-full px-3 py-1 z-10 shadow-sm">
                      <span className="text-[10px] font-bold text-slate-400 tracking-widest">
                        {currentImageIndex + 1}/{product.images?.length}
                      </span>
                    </div>
                  </div>

                  {/* Pharma Certified Badge */}
                  <div className="absolute -bottom-3 -right-2 bg-white px-4 py-2 rounded-2xl shadow-lg border border-slate-100 flex items-center gap-2 z-30">
                    <ShieldCheck className="w-4 h-4 text-brand-blue/50" />
                    <span className="text-[9px] font-bold text-slate-500 uppercase tracking-widest leading-none">Pharma Certified</span>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Content Stage */}
            <div className="lg:col-span-7">
               <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
                  <div className="inline-block px-3 py-1 bg-brand-blue/5 border border-brand-blue/10 rounded sm:mb-6 mb-4">
                     <span className="text-brand-blue font-black tracking-[0.3em] uppercase text-[8px]">{product.focus}</span>
                  </div>

                  <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-slate-900 mb-2 tracking-tight leading-tight">
                    {product.name}
                  </h1>
                  
                  <div className="flex items-center gap-4 mb-4">
                    <span className="text-2xl font-bold text-brand-blue">₹{product.price}</span>
                    <span className="text-xs text-slate-400 font-medium uppercase tracking-widest">Per Pack</span>
                  </div>

                  <p className="text-slate-500 text-base sm:text-lg mb-4 leading-relaxed font-medium">
                    {product.tagline}
                  </p>

                  <p className="text-slate-400 text-sm sm:text-[15px] mb-8 leading-relaxed max-w-xl">
                    {product.description?.split('\n')[0]}
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-3 gap-x-8 mb-10">
                    {(product.benefits as string[]).slice(0, 4).map((benefit, i) => (
                      <div key={i} className="flex gap-3 items-start">
                         <CheckCircle2 className="w-4 h-4 text-gold-dark mt-0.5 shrink-0" />
                         <p className="text-slate-600 text-[14px] sm:text-[15px] font-medium leading-snug">{benefit}</p>
                      </div>
                    ))}
                  </div>

                  {/* BUY NOW & QUANTITY SECTION */}
                  <div className="flex flex-col sm:flex-row items-center gap-4 border-t border-slate-200 pt-8 mt-4">
                    
                    {/* Quantity Selector */}
                    <div className="flex items-center justify-between border border-slate-200 rounded-full bg-white w-full sm:w-auto overflow-hidden">
                      <button 
                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                        className="p-4 text-slate-500 hover:bg-slate-50 hover:text-brand-blue transition-colors"
                      >
                        <Minus className="w-4 h-4" />
                      </button>
                      <span className="w-12 text-center font-bold text-lg">{quantity}</span>
                      <button 
                        onClick={() => setQuantity(quantity + 1)}
                        className="p-4 text-slate-500 hover:bg-slate-50 hover:text-brand-blue transition-colors"
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>

                    {/* Add to Cart Button */}
                    <button 
                      onClick={handleAddToCart}
                      className="flex-grow sm:flex-grow-0 w-full flex items-center justify-center gap-3 px-10 py-4 bg-brand-blue text-white rounded-full font-bold uppercase tracking-[0.2em] text-[11px] shadow-xl shadow-brand-blue/20 hover:bg-brand-blue-dark transition-all transform hover:scale-[1.02]"
                    >
                      <ShoppingCart className="w-4 h-4" />
                      Add to Cart — ₹{product.price * quantity}
                    </button>
                  </div>
               </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 3. DATA DOSSIER (STREAMLINED ACCORDIONS) ── */}
      <section className="py-12 sm:py-20 lg:py-24 bg-white">
         <div className="max-w-[1600px] mx-auto px-5 sm:px-10 lg:px-12">
            <div className="border border-slate-100 rounded-2xl overflow-hidden shadow-sm">
               <AccordionItem title="Description">
                  <div className="pt-2">
                     <h3 className="text-[#386641] font-bold text-xl sm:text-2xl mb-5 tracking-tight">About {product.name}</h3>
                     <div className="space-y-4">
                        {product.description?.split('\n').filter((line: string) => line.trim() !== '').map((line: string, i: number) => (
                          <div key={i} className="flex gap-3 items-start">
                             <div className="w-1.5 h-1.5 rounded-full bg-brand-blue/40 mt-2 shrink-0" />
                             <p className="text-slate-600 text-[14px] sm:text-[15px] font-medium leading-relaxed">
                               {line.startsWith('*') || line.startsWith('-') ? line.substring(1).trim() : line.trim()}
                             </p>
                          </div>
                        ))}
                     </div>
                  </div>
               </AccordionItem>

               <AccordionItem title="Nutritional Information">
                  <div className="border border-slate-100 rounded-[2rem] overflow-hidden mt-2">
                     <table className="w-full text-left font-sans">
                        <thead className="bg-[#F8FAFC]">
                           <tr>
                              <th className="px-6 sm:px-10 py-5 font-black text-brand-blue uppercase tracking-widest text-[9px] sm:text-[10px]">Approximate Composition</th>
                              <th className="px-6 sm:px-10 py-5 font-black text-brand-blue uppercase tracking-widest text-[9px] sm:text-[10px]">Claim per Tablet</th>
                              <th className="px-6 sm:px-10 py-5 font-black text-brand-blue uppercase tracking-widest text-[9px] sm:text-[10px]">% RDA*</th>
                           </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                           {(product.nutrition as any[]).map((item: any, i: number) => (
                             <tr key={i} className="hover:bg-slate-50/50 transition-colors">
                                <td className="px-6 sm:px-10 py-5 font-bold text-slate-700 text-[13px] sm:text-[14px]">{item.component}</td>
                                <td className="px-6 sm:px-10 py-5 font-extrabold text-slate-900 text-[13px] sm:text-[14px]">{item.amount}</td>
                                <td className="px-6 sm:px-10 py-5 font-black text-brand-blue text-[13px] sm:text-[14px]">{item.rda || "-"}</td>
                             </tr>
                           ))}
                        </tbody>
                     </table>
                  </div>
                  <p className="mt-4 text-[10px] text-slate-400 font-medium italic pl-6">* % RDA (Recommended Dietary Allowance) values are based on ICMR guidelines.</p>
               </AccordionItem>

               <AccordionItem title="FAQ">
                  <div className="space-y-10 py-2">
                     {(product.faq as any[]).map((item: any, i: number) => (
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
