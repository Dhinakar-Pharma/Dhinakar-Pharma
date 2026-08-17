"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, SlidersHorizontal, ArrowRight, X, Dna } from "lucide-react";
import Link from "next/link";

export default function ProductsClient({ products }: { products: any[] }) {
  const categories = ["All", ...Array.from(new Set(products.map(p => p.category)))];
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [showFilters, setShowFilters] = useState(false);

  const filteredProducts = products.filter(p => {
    const matchesCategory = activeCategory === "All" || p.category === activeCategory;
    const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.category.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans">

      {/* ── 1. COMPACT INSTITUTIONAL BANNER ── */}
      <div className="w-full relative z-30 py-8 sm:py-12 px-5 sm:px-10 lg:px-16 bg-brand-blue">
        <div className="absolute inset-0 bg-[linear-gradient(150deg,#0c2160_0%,#1B3F8B_50%,#0c2160_100%)] z-0" />
        <div className="absolute inset-0 opacity-[0.04] pointer-events-none"
          style={{ backgroundImage: "radial-gradient(circle, white 1px, transparent 1px)", backgroundSize: "24px 24px" }} />

        <div className="max-w-[1600px] mx-auto relative z-10 flex flex-col items-center">
          <motion.div initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} className="text-center mb-6">
            <div className="flex items-center justify-center gap-3 mb-2">
              <div className="h-px w-6 bg-[#C9A048]" />
              <p className="text-[#C9A048] font-bold tracking-[0.25em] uppercase text-[10px]">Scientific Innovation Portfolio</p>
              <div className="h-px w-6 bg-[#C9A048]" />
            </div>

            <h1 className="text-2xl sm:text-4xl lg:text-5xl font-serif font-bold text-white leading-tight">
              Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#C9A048] via-[#f5e48a] to-[#C9A048]">Molecules & Products</span>
            </h1>
          </motion.div>

          {/* Search & Filter Bar */}
          <div className="w-full max-w-lg group relative">
            <div className="flex items-center gap-2 sm:gap-3">
              <div className="relative flex-grow">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40 group-focus-within:text-[#C9A048] transition-colors" />
                <input
                  type="text"
                  placeholder="Search molecular formulations..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-11 pr-5 py-3 bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl outline-none focus:bg-white focus:text-slate-900 transition-all text-white placeholder:text-white/40 text-xs sm:text-sm font-medium shadow-xl"
                />
              </div>
              <button
                onClick={() => setShowFilters(!showFilters)}
                className={`p-3 rounded-2xl border transition-all duration-300 shadow-lg ${showFilters ? "bg-white text-brand-blue border-white" : "bg-white/10 text-white border-white/20 hover:bg-white/20"
                  }`}
              >
                {showFilters ? <X className="w-4 h-4" /> : <SlidersHorizontal className="w-4 h-4" />}
              </button>
            </div>

            <AnimatePresence>
              {showFilters && (
                <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="absolute top-full left-0 right-0 mt-3 z-50">
                  <div className="p-2 flex flex-wrap justify-center gap-2 border border-white/20 bg-[#0c2160]/95 backdrop-blur-2xl rounded-2xl shadow-2xl">
                    {categories.map((cat) => (
                      <button
                        key={cat}
                        onClick={() => { setActiveCategory(cat); setShowFilters(false); }}
                        className={`px-3.5 py-1.5 rounded-xl text-[10px] font-bold uppercase tracking-wider transition-all ${activeCategory === cat ? "bg-white text-brand-blue shadow-md" : "text-white/70 hover:text-white"
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

      {/* ── 2. ELEGANT STREAMLINED ROW SHOWCASE ── */}
      <div className="w-full max-w-[1600px] mx-auto px-5 sm:px-10 lg:px-16 py-10 sm:py-14 flex-grow space-y-8 sm:space-y-12">
        <AnimatePresence mode="popLayout">
          {filteredProducts.map((p, index) => (
            <ProductRow key={p.id} product={p} index={index} />
          ))}
        </AnimatePresence>

        {filteredProducts.length === 0 && (
          <div className="flex flex-col items-center justify-center py-24 text-center">
            <Dna className="w-12 h-12 text-slate-300 mb-4 animate-pulse" />
            <p className="text-slate-500 font-serif italic text-lg">No matching molecular products found.</p>
          </div>
        )}
      </div>

    </div>
  );
}

function ProductRow({ product, index }: { product: any, index: number }) {
  const isEven = index % 2 === 0;
  const primaryImage = product.images?.[0] || "/logo.png";
  const topIngredients = (product.ingredients as string[])?.slice(0, 3) || [];

  return (
    <motion.section
      initial={{ opacity: 0, y: 15 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4 }}
      className="bg-white rounded-3xl border border-slate-200/90 shadow-[0_4px_25px_rgba(0,0,0,0.03)] hover:shadow-[0_12px_35px_rgba(12,33,96,0.06)] hover:border-brand-blue/30 transition-all duration-300 p-5 sm:p-8 lg:p-10 overflow-hidden relative"
    >
      <div className={`flex flex-col ${isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'} items-center gap-6 lg:gap-12`}>

        {/* Left/Right Column: Product Image */}
        <div className="w-full lg:w-5/12">
          <Link href={`/products/${product.id}`} className="block relative w-full aspect-[4/3] rounded-2xl bg-white border border-slate-200/80 overflow-hidden flex items-center justify-center p-3 shadow-sm group">
            <img
              src={primaryImage}
              alt={product.name}
              className="w-full h-full object-contain rounded-xl group-hover:scale-105 transition-transform duration-300"
            />
            <span className="absolute top-3 right-3 bg-slate-100/90 backdrop-blur-md text-brand-blue text-[9px] font-extrabold uppercase tracking-wider px-2.5 py-1 rounded-md border border-slate-200">
              Rx Formulation
            </span>
          </Link>
        </div>

        {/* Right/Left Column: Streamlined Concise Details */}
        <div className="w-full lg:w-7/12 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <span className="text-[10px] font-extrabold tracking-[0.2em] uppercase text-[#C9A048]">{product.category}</span>
              <span className="text-slate-300">•</span>
              <span className="text-[10px] font-bold uppercase tracking-wider text-brand-blue">{product.focus}</span>
            </div>

            <Link href={`/products/${product.id}`} className="block group">
              <h2 className="text-2xl sm:text-3xl font-serif font-bold text-slate-900 mb-1.5 group-hover:text-brand-blue transition-colors">
                {product.name}
              </h2>
            </Link>

            <p className="text-brand-blue text-xs sm:text-sm font-serif italic mb-3 font-semibold">
              "{product.tagline}"
            </p>

            <p className="text-slate-600 text-xs sm:text-sm leading-relaxed mb-4 line-clamp-2 font-normal">
              {product.description}
            </p>

            {/* Concise Ingredients Preview */}
            {topIngredients.length > 0 && (
              <div className="mb-5 flex items-center gap-2 flex-wrap">
                <span className="text-[9px] font-extrabold uppercase tracking-wider text-slate-400">Key Active:</span>
                {topIngredients.map((ing: string, i: number) => (
                  <span key={i} className="bg-slate-100 text-slate-700 border border-slate-200/80 px-2.5 py-0.5 rounded-lg text-[11px] font-semibold">
                    {ing}
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* Action Bar */}
          <div className="pt-4 border-t border-slate-100 flex items-center justify-between gap-4">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
              Dhinakar Portfolio
            </span>

            <Link
              href={`/products/${product.id}`}
              className="inline-flex items-center gap-2 px-6 py-3 bg-brand-blue text-white rounded-xl text-xs font-bold uppercase tracking-wider shadow-sm hover:bg-[#0c2160] transition-colors"
            >
              <span>View More</span>
              <ArrowRight className="w-3.5 h-3.5 text-[#C9A048]" />
            </Link>
          </div>
        </div>

      </div>
    </motion.section>
  );
}
