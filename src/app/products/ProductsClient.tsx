"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, SlidersHorizontal, ArrowRight, X, ShieldCheck, Dna } from "lucide-react";
import Link from "next/link";

export default function ProductsClient({ products }: { products: any[] }) {
  const categories = ["All", ...Array.from(new Set(products.map(p => p.category)))];
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [showFilters, setShowFilters] = useState(false);

  const filteredProducts = products.filter(p => {
    const matchesCategory = activeCategory === "All" || p.category === activeCategory;
    const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-white flex flex-col pt-0 font-sans scroll-mt-20 md:scroll-mt-24">

      {/* ── 1. HEADER (STREAMLINED NAV) ── */}
      <div className="w-full relative py-14 sm:py-20 px-6 lg:px-12 border-b border-brand-blue/10" style={{ background: "linear-gradient(150deg, #0c2160 0%, #1B3F8B 50%, #2460aa 100%)" }}>
        <div className="absolute inset-0 opacity-[0.05] pointer-events-none"
          style={{ backgroundImage: "radial-gradient(circle, white 1px, transparent 1px)", backgroundSize: "24px 24px" }} />

        <div className="max-w-[1400px] mx-auto relative z-10 flex flex-col items-center">
          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="text-center mb-10 pt-4 sm:pt-6">
            <h1 className="text-3xl sm:text-5xl font-serif font-bold text-white leading-tight mb-2">
              Our <span style={{ background: "linear-gradient(105deg, #C9A048 10%, #f5e48a 55%, #C9A048 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>Molecules</span>
            </h1>
            <p className="text-[#C9A048] font-bold tracking-[0.4em] uppercase text-[9px]">Scientific Innovation Portfolio</p>
          </motion.div>

          <div className="w-full max-w-xl group relative">
            <div className="flex items-center gap-4">
              <div className="relative flex-grow">
                <Search className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-white/30 group-focus-within:text-gold-dark transition-colors" />
                <input
                  type="text"
                  placeholder="Search molecular database..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-16 pr-8 py-5 bg-white/5 backdrop-blur-3xl border border-white/10 rounded-2xl outline-none focus:bg-white focus:text-brand-blue transition-all text-white placeholder:text-white/30 text-sm font-medium shadow-2xl"
                />
              </div>
              <button
                onClick={() => setShowFilters(!showFilters)}
                className={`p-5 rounded-2xl border transition-all duration-500 shadow-xl ${showFilters ? "bg-white text-brand-blue border-white" : "bg-white/10 text-white border-white/10 hover:bg-white/20"
                  }`}
              >
                {showFilters ? <X className="w-6 h-6" /> : <SlidersHorizontal className="w-6 h-6" />}
              </button>
            </div>

            <AnimatePresence>
              {showFilters && (
                <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="absolute top-full left-0 right-0 mt-4 z-50">
                  <div className="p-2 flex flex-wrap justify-center border border-white/10 bg-[#0c2160]/95 backdrop-blur-2xl rounded-2xl shadow-[0_30px_60px_rgba(0,0,0,0.5)]">
                    {categories.map((cat) => (
                      <button
                        key={cat}
                        onClick={() => setActiveCategory(cat)}
                        className={`px-6 py-3.5 rounded-xl text-[10px] font-bold uppercase tracking-widest transition-all ${activeCategory === cat ? "bg-white text-brand-blue shadow-lg scale-105" : "text-white/60 hover:text-white"
                          }`}
                      >
                        {cat}
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* ── 2. PRODUCT DOSSIERS ── */}
      <div className="w-full flex-grow">
        <AnimatePresence mode="popLayout">
          {filteredProducts.map((p, index) => (
            <div key={p.id}>
              <ProductSection product={p} index={index} />
              {index < filteredProducts.length - 1 && (
                <div className="w-full flex justify-center py-0 h-[0.5px]">
                  <div className="w-full h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent opacity-60" />
                </div>
              )}
            </div>
          ))}
        </AnimatePresence>

        {filteredProducts.length === 0 && (
          <div className="flex flex-col items-center justify-center py-60">
            <Dna className="w-16 h-16 text-slate-100 mb-6 animate-pulse" />
            <p className="text-gray-400 font-serif italic text-2xl">No matching molecules found.</p>
          </div>
        )}
      </div>

    </div>
  );
}

function ProductSection({ product, index }: { product: any, index: number }) {
  const isEven = index % 2 === 0;
  const [activeIdx, setActiveIdx] = useState(0);
  const images: string[] = product.images || [];

  return (
    <motion.section
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: "-100px" }}
      className={`relative w-full py-20 lg:py-32 overflow-hidden ${!isEven ? 'bg-slate-50/50' : 'bg-white'}`}
    >
      {/* Background Story Mark */}
      <div className={`absolute top-1/2 -translate-y-1/2 select-none pointer-events-none opacity-[0.03] text-[250px] lg:text-[450px] font-serif font-black transition-all ${isEven ? '-left-20' : '-right-20'}`}>
        {product.name.split(' ')[1] || product.name}
      </div>

      <div className="max-w-[1500px] mx-auto px-6 lg:px-12 relative z-10">
        <div className={`flex flex-col ${isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'} items-center gap-20 lg:gap-32`}>

          {/* Visual Column */}
          <div className="w-full lg:w-1/2">
            <motion.div
              initial={{ opacity: 0, x: isEven ? -40 : 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
              className="relative group pb-12"
            >
              {/* Image Card + Swipe zone */}
              <div
                className="relative aspect-square sm:aspect-[4/3] rounded-[4rem] bg-white border border-gray-100 shadow-[20px_40px_80px_rgba(0,0,0,0.06)] overflow-hidden flex items-center justify-center select-none"
                onTouchStart={(e) => {
                  const touch = e.touches[0];
                  (e.currentTarget as any)._touchStartX = touch.clientX;
                }}
                onTouchEnd={(e) => {
                  const startX = (e.currentTarget as any)._touchStartX ?? 0;
                  const endX = e.changedTouches[0].clientX;
                  const diff = startX - endX;
                  if (Math.abs(diff) > 40) {
                    if (diff > 0) setActiveIdx((i) => (i + 1) % images.length);
                    else setActiveIdx((i) => (i - 1 + images.length) % images.length);
                  }
                }}
              >
                {/* Subtle bg overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-brand-blue/[0.02] to-transparent pointer-events-none z-10" />

                {/* Corner Accents */}
                <div className="absolute top-8 left-8 w-8 h-8 border-t-2 border-l-2 border-gold-dark/25 z-20 pointer-events-none" />
                <div className="absolute bottom-16 right-8 w-8 h-8 border-b-2 border-r-2 border-gold-dark/25 z-20 pointer-events-none" />

                {/* Image counter */}
                <div className="absolute top-6 right-6 z-30 bg-white/80 backdrop-blur-sm border border-gray-100 rounded-full px-3 py-1 shadow-sm">
                  <span className="text-[10px] font-bold text-slate-400 tracking-widest">{activeIdx + 1}/{images.length}</span>
                </div>

                {/* Image */}
                <AnimatePresence mode="wait">
                  <motion.img
                    key={activeIdx}
                    src={images[activeIdx] || undefined}
                    alt={`${product.name} - view ${activeIdx + 1}`}
                    initial={{ opacity: 0, x: 40 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -40 }}
                    transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
                    className="w-full h-full object-contain p-8 sm:p-12 z-10 pb-16"
                  />
                </AnimatePresence>

                {/* Dots — inside card, above the image area at bottom */}
                {images.length > 1 && (
                  <div className="absolute bottom-5 left-0 right-0 flex justify-center items-center gap-2.5 z-40">
                    {images.map((_, idx) => (
                      <button
                        key={idx}
                        onClick={() => setActiveIdx(idx)}
                        aria-label={`View image ${idx + 1}`}
                        className={`rounded-full transition-all duration-300 ${
                          activeIdx === idx
                            ? 'w-7 h-2.5 bg-brand-blue shadow-[0_0_10px_rgba(27,63,139,0.5)]'
                            : 'w-2.5 h-2.5 bg-slate-300 hover:bg-brand-blue/40'
                        }`}
                      />
                    ))}
                  </div>
                )}
              </div>

              {/* Clinic Core Badge */}
              <div className="absolute bottom-0 right-6 lg:right-16 bg-white px-8 py-5 rounded-3xl shadow-2xl border border-gray-50 flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-brand-blue/5 flex items-center justify-center">
                  <ShieldCheck className="w-5 h-5 text-brand-blue" />
                </div>
                <div>
                  <p className="text-[9px] uppercase font-black text-brand-blue/40 tracking-[0.2em] mb-0.5">Clinic Core</p>
                  <p className="text-sm font-bold text-gray-900 tracking-wide uppercase">{product.category}</p>
                </div>
              </div>
            </motion.div>
          </div>


          {/* Content Column */}
          <div className="w-full lg:w-1/2">
            <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.2 }}>
              <div className="flex items-center gap-4 mb-8">
                <span className="text-gold-dark font-black tracking-[0.5em] uppercase text-[10px]">{product.focus}</span>
                <div className="h-px flex-grow bg-slate-100" />
              </div>

              <h2 className="text-4xl lg:text-6xl font-serif font-bold text-gray-900 mb-6 leading-tight">
                <span className="text-brand-blue">Dhinakar</span> Excellence:<br />
                <span className="text-gold-dark">{product.name}</span>
              </h2>

              <p className="text-gray-500 text-xl lg:text-2xl font-medium mb-10 font-sans italic">"{product.tagline}"</p>
              <p className="text-gray-600 text-base lg:text-lg leading-[1.8] mb-12 max-w-xl line-clamp-2">
                {product.description?.split('\n')[0]}
              </p>

              <div className="bg-white rounded-[2.5rem] border border-gray-100 shadow-[0_30px_60px_rgba(0,0,0,0.03)] p-10 lg:p-14 mb-12 relative overflow-hidden">
                <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-gold-dark/5 rounded-full blur-3xl" />
                <p className="text-[10px] font-black text-brand-blue uppercase tracking-[0.4em] mb-8 border-b border-slate-50 pb-4">Principal Formula Matrix</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-6 gap-x-10">
                  {(product.ingredients as string[]).map((ing: string, i: number) => (
                    <div key={i} className="flex items-start gap-4">
                      <div className="w-2 h-2 rounded-full bg-gold-dark mt-1.5 shrink-0" />
                      <span className="text-xs lg:text-[13px] font-bold text-gray-800 tracking-wider leading-tight uppercase font-mono">{ing}</span>
                    </div>
                  ))}
                </div>
              </div>

              <Link
                href={`/products/${product.id}`}
                className="group inline-flex items-center gap-6 px-12 py-6 bg-brand-blue text-white rounded-full font-bold uppercase tracking-[0.2em] text-[11px] shadow-2xl hover:bg-brand-blue-dark transition-all"
              >
                <span>View More</span>
                <ArrowRight className="w-5 h-5 text-gold-dark group-hover:translate-x-2 transition-transform" />
              </Link>
            </motion.div>
          </div>

        </div>
      </div>
    </motion.section>
  );
}
