"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  CheckCircle2, 
  ArrowLeft, 
  ShieldCheck, 
  FlaskConical,
  X,
  Mail,
  ArrowRight,
  Zap,
  Heart,
  Activity,
  Shield,
  Sparkles,
  Info,
  Dna
} from "lucide-react";
import Link from "next/link";

export default function ProductDetailClient({ product }: { product: any }) {
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);

  useEffect(() => {
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' as ScrollBehavior });
  }, [product?.id]);

  if (!product) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-white p-6">
        <FlaskConical className="w-16 h-16 text-slate-200 mb-6 animate-pulse" />
        <h1 className="text-2xl font-serif font-bold text-gray-900 mb-4">Molecule Not Found</h1>
        <Link href="/products" className="flex items-center gap-2 text-brand-blue font-bold uppercase tracking-widest text-[10px]">
          <ArrowLeft className="w-4 h-4" /> Return to Portfolio
        </Link>
      </div>
    );
  }

  const primaryImage = product.images?.[0] || "/logo.png";
  const nutritionData = product.nutrition || {};
  const packInfo = Array.isArray(nutritionData) ? nutritionData : (nutritionData.packInfo || []);
  const ingredientBenefits = nutritionData.ingredientBenefits || [];
  const overallSupports = nutritionData.overallSupports || [];

  return (
    <div className="min-h-screen bg-slate-50/60 font-sans text-slate-900 selection:bg-brand-blue/5">
      
      {/* ── 1. BREADCRUMB & TOP HEADER ── */}
      <div className="bg-white border-b border-slate-200/80 py-4 px-6 sm:px-10 lg:px-16">
        <div className="max-w-[1600px] mx-auto flex items-center justify-between">
          <Link href="/products" className="inline-flex items-center gap-2 text-slate-500 hover:text-brand-blue transition-colors text-xs font-bold uppercase tracking-wider">
            <ArrowLeft className="w-4 h-4" /> Back to Products
          </Link>
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-[#C9A048]">{product.category}</span>
            <span className="text-slate-300">•</span>
            <span className="text-[10px] font-bold uppercase tracking-wider text-brand-blue">{product.focus}</span>
          </div>
        </div>
      </div>

      {/* ── 2. HERO CLINICAL SECTION ── */}
      <section className="py-10 sm:py-14 px-6 sm:px-10 lg:px-16 bg-white border-b border-slate-200/80">
        <div className="max-w-[1600px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
            
            {/* Single Product Packaging Image */}
            <div className="lg:col-span-5 flex flex-col items-center">
              <motion.div
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="w-full relative"
              >
                <div className="w-full aspect-[4/3] bg-white rounded-3xl border border-slate-200/90 shadow-sm flex items-center justify-center p-3 relative overflow-hidden group">
                  <img
                    src={primaryImage}
                    alt={product.name}
                    onClick={() => setIsLightboxOpen(true)}
                    className="w-full h-full object-contain cursor-zoom-in rounded-2xl"
                  />
                </div>
              </motion.div>

              {/* Rx Notice */}
              <div className="mt-6 w-full bg-slate-50 border border-slate-200/80 rounded-2xl p-4 flex items-center justify-between text-xs text-slate-600">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-brand-blue" />
                  <span className="font-semibold">Institutional Grade Formulation (Rx)</span>
                </div>
                <span className="font-bold text-slate-400 uppercase text-[9px]">Dhinakar Pharma</span>
              </div>
            </div>

            {/* Content Stage */}
            <div className="lg:col-span-7">
              <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
                <div className="flex items-center gap-3 mb-2">
                  <span className="px-3 py-1 bg-[#C9A048]/10 border border-[#C9A048]/30 text-[#C9A048] rounded-md text-[10px] font-bold tracking-widest uppercase">
                    Rx Prescription Matrix
                  </span>
                </div>

                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-slate-900 mb-3 tracking-tight">
                  {product.name}
                </h1>

                <p className="text-brand-blue text-base sm:text-lg font-serif italic mb-5 font-semibold">
                  "{product.tagline}"
                </p>

                <p className="text-slate-600 text-sm sm:text-base leading-relaxed mb-8">
                  {product.description}
                </p>

                {/* Overall Clinical Support Pills */}
                {overallSupports.length > 0 && (
                  <div className="mb-8 p-5 bg-gradient-to-br from-slate-900 to-brand-blue rounded-2xl text-white shadow-lg">
                    <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#C9A048] mb-3 flex items-center gap-2">
                      <Sparkles className="w-3.5 h-3.5" /> Overall Clinical Supports
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {overallSupports.map((sup: string, i: number) => (
                        <span key={i} className="bg-white/10 backdrop-blur-md border border-white/20 px-3.5 py-1.5 rounded-xl text-xs font-semibold">
                          {sup}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Direct Action Button */}
                <div className="flex flex-col sm:flex-row items-center gap-4 pt-4 border-t border-slate-100">
                  <Link
                    href="/connect"
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-4 bg-brand-blue text-white rounded-xl font-bold uppercase tracking-wider text-xs shadow-lg hover:bg-[#0c2160] transition-colors"
                  >
                    <Mail className="w-4 h-4 text-[#C9A048]" />
                    <span>Inquire / Institutional Request</span>
                    <ArrowRight className="w-4 h-4 text-[#C9A048]" />
                  </Link>
                </div>
              </motion.div>
            </div>

          </div>
        </div>
      </section>

      {/* ── 3. KEY BENEFITS GRID (EXECUTIVE CLINICAL LAYOUT) ── */}
      <section className="py-14 px-6 sm:px-10 lg:px-16 max-w-[1600px] mx-auto">
        <div className="mb-8 flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-slate-200 pb-5">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <div className="h-0.5 w-6 bg-[#C9A048]" />
              <span className="text-[10px] font-black uppercase tracking-[0.25em] text-[#C9A048]">Clinical Efficacy & Action</span>
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-serif font-bold text-slate-900 tracking-tight">
              Key Benefits & Therapeutic Value
            </h2>
          </div>
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-500 bg-white px-4 py-2 rounded-xl border border-slate-200/80 shadow-sm">
            <Dna className="w-4 h-4 text-brand-blue" />
            <span>5 Core Mechanisms</span>
          </div>
        </div>

        {/* 5-Column Ultra-Clean Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5">
          {(product.benefits as string[]).map((benefit, i) => {
            const parts = benefit.split('—');
            const title = parts[0]?.trim() || benefit;
            const desc = parts[1]?.trim() || "";

            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.35, delay: i * 0.06 }}
                className="bg-white rounded-2xl border border-slate-200/90 p-6 flex flex-col justify-between shadow-[0_4px_20px_rgba(0,0,0,0.02)] hover:shadow-[0_12px_30px_rgba(12,33,96,0.08)] hover:border-brand-blue/50 transition-all duration-300 relative group overflow-hidden"
              >
                {/* Top Gold Accent Line */}
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-brand-blue via-[#C9A048] to-brand-blue transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />

                <div>
                  {/* Header Row: Icon & Number Badge */}
                  <div className="flex items-center justify-between mb-5">
                    <div className="w-11 h-11 rounded-xl bg-[#0c2160] text-[#C9A048] flex items-center justify-center shadow-md group-hover:scale-105 transition-transform">
                      {i === 0 && <Zap className="w-5 h-5" />}
                      {i === 1 && <Heart className="w-5 h-5" />}
                      {i === 2 && <Activity className="w-5 h-5" />}
                      {i === 3 && <Shield className="w-5 h-5" />}
                      {i >= 4 && <Sparkles className="w-5 h-5" />}
                    </div>

                    <span className="text-[10px] font-black font-mono text-slate-300 group-hover:text-brand-blue transition-colors">
                      0{i + 1}
                    </span>
                  </div>

                  {/* Benefit Title */}
                  <h3 className="font-extrabold text-slate-900 text-xs sm:text-sm tracking-wide uppercase leading-snug mb-2 group-hover:text-brand-blue transition-colors">
                    {title}
                  </h3>

                  {/* Benefit Description */}
                  {desc && (
                    <p className="text-slate-600 text-xs leading-relaxed font-normal">
                      {desc}
                    </p>
                  )}
                </div>

                {/* Bottom Verification Indicator */}
                <div className="mt-6 pt-3 border-t border-slate-100 flex items-center justify-between text-[9px] font-bold text-slate-400 uppercase tracking-wider">
                  <span className="flex items-center gap-1.5 text-emerald-600 font-semibold">
                    <CheckCircle2 className="w-3.5 h-3.5" /> Verified Action
                  </span>
                </div>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* ── 4. INGREDIENTS-WISE KEY BENEFITS TABLE ── */}
      {ingredientBenefits.length > 0 && (
        <section className="py-12 px-6 sm:px-10 lg:px-16 max-w-[1600px] mx-auto">
          <div className="bg-white rounded-3xl border border-slate-200/90 shadow-sm overflow-hidden p-6 sm:p-10">
            <div className="mb-6 flex items-center justify-between border-b border-slate-100 pb-4">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-widest text-[#C9A048]">Active Molecule Mechanism</span>
                <h2 className="text-2xl font-serif font-bold text-slate-900">Ingredients Wise Key Benefits</h2>
              </div>
              <FlaskConical className="w-8 h-8 text-brand-blue/30" />
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left font-sans">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-200 text-[#0c2160] uppercase text-[10px] tracking-widest font-extrabold">
                    <th className="py-4 px-6 w-1/3">Active Ingredient</th>
                    <th className="py-4 px-6">Clinical Mechanism & Key Benefits</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {ingredientBenefits.map((item: any, idx: number) => (
                    <tr key={idx} className="hover:bg-slate-50/60 transition-colors">
                      <td className="py-4 px-6 font-bold text-slate-900 text-xs sm:text-sm flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-[#C9A048]" />
                        {item.ingredient}
                      </td>
                      <td className="py-4 px-6 text-slate-600 text-xs sm:text-sm leading-relaxed">
                        {item.benefits}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>
      )}

      {/* ── 5. SPECIFICATION & FAQ ACCORDION ── */}
      <section className="py-12 px-6 sm:px-10 lg:px-16 max-w-[1600px] mx-auto pb-20">
        <div className="bg-white rounded-3xl border border-slate-200/90 shadow-sm overflow-hidden">
          <AccordionItem title="Product Specifications & Packaging" initialOpen={true}>
            <table className="w-full text-left font-sans">
              <tbody className="divide-y divide-slate-100">
                {packInfo.map((info: any, i: number) => (
                  <tr key={i}>
                    <td className="py-3 px-6 font-bold text-slate-700 text-xs sm:text-sm w-1/3">{info.component}</td>
                    <td className="py-3 px-6 text-slate-900 font-semibold text-xs sm:text-sm">{info.amount}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </AccordionItem>

          <AccordionItem title="Clinical FAQ & Medical Guidance">
            <div className="space-y-6 pt-2">
              {(product.faq as any[]).map((f: any, i: number) => (
                <div key={i} className="bg-slate-50 p-5 rounded-2xl border border-slate-200/80">
                  <h4 className="font-bold text-brand-blue text-sm sm:text-base mb-2">Q: {f.question}</h4>
                  <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">A: {f.answer}</p>
                </div>
              ))}
            </div>
          </AccordionItem>
        </div>

        {/* Disclaimer */}
        <div className="mt-8 p-4 bg-amber-500/10 border border-amber-500/20 rounded-2xl flex items-center gap-3 text-xs text-amber-900">
          <Info className="w-5 h-5 shrink-0 text-amber-600" />
          <p>
            <strong>Regulatory Notice:</strong> This product is a specialized nutritional & healthcare formulation manufactured under stringent cGMP guidelines. Not intended to diagnose, treat, cure, or prevent any disease.
          </p>
        </div>
      </section>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {isLightboxOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 p-4 cursor-zoom-out backdrop-blur-md"
            onClick={() => setIsLightboxOpen(false)}
          >
            <button 
              onClick={() => setIsLightboxOpen(false)}
              className="absolute top-6 right-6 w-12 h-12 bg-white/10 hover:bg-white/20 text-white rounded-full flex items-center justify-center transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
            <motion.img
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              src={primaryImage}
              alt={product.name}
              className="w-full h-full object-contain max-w-[92vw] max-h-[92vh]"
              onClick={(e) => e.stopPropagation()} 
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function AccordionItem({ title, children, initialOpen = false }: { title: string, children: React.ReactNode, initialOpen?: boolean }) {
  const [isOpen, setIsOpen] = useState(initialOpen);

  return (
    <div className="border-b border-slate-100 last:border-0">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-6 py-5 flex items-center justify-between hover:bg-slate-50/50 transition-colors text-left"
      >
        <h3 className="text-base sm:text-lg font-bold text-slate-900">{title}</h3>
        <div className={`w-7 h-7 rounded-full flex items-center justify-center transition-transform ${isOpen ? 'rotate-180 bg-brand-blue text-white' : 'bg-slate-100 text-slate-600'}`}>
          ↓
        </div>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.3 }} className="overflow-hidden">
            <div className="px-6 pb-6 pt-2">
              {children}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
