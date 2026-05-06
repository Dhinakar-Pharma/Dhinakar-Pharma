"use client";

import Link from "next/link";
import { MapPin, Mail, Phone } from "lucide-react";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";

const navLinks = [
  { name: "Home", href: "/" },
  { name: "Our Values", href: "/values" },
  { name: "Products", href: "/products" },
  { name: "Track Order", href: "/track" },
  { name: "From the Manufacturers", href: "/from-the-manufacturers" },
];

export default function Footer() {
  const pathname = usePathname();
  if (pathname?.startsWith('/admin/print')) return null;

  const isAdmin = pathname?.startsWith('/admin');

  if (isAdmin) {
    return (
      <footer className="bg-white border-t border-slate-200 py-6 mt-auto">
        <div className="w-full px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between text-[11px] uppercase tracking-widest font-bold text-slate-400">
          <p>© {new Date().getFullYear()} Dhinakar Pharma. Admin Portal.</p>
          <div className="flex items-center gap-6 mt-4 md:mt-0">
            <span className="flex items-center gap-2">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
              </span>
              Secure Connection
            </span>
            <span className="text-slate-300">|</span>
            <span className="hover:text-brand-blue transition-colors cursor-pointer text-slate-500">Support</span>
          </div>
        </div>
      </footer>
    );
  }
  return (
    <footer className="relative overflow-hidden text-white pt-16 pb-8 bg-[#0c2160]">
      {/* Deep Atmospheric Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-brand-blue/20 blur-[120px] pointer-events-none" />
      
      <div className="relative z-10 max-w-6xl mx-auto px-6 flex flex-col items-center">
        
        {/* ── 1. THE BRAND MARK (PRECISION MULTI-ZONE MASK) ── */}
        <div className="mb-8 relative group">
          <div className="absolute inset-0 bg-[#C9A048]/15 blur-[60px] rounded-full scale-150 opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
          <div className="relative w-48 h-24 md:w-64 md:h-44 flex items-center justify-center transition-transform duration-700 hover:scale-105">
            {/* 
               Logo as a Mask with Surgical Multi-Stop Gradient:
               - White targets the structural Blue parts (D and DHINAKAR)
               - Gold targets the original Yellow/Gold parts (Swoosh, Leaf, PHARMA)
            */}
            <div 
              className="w-full h-full drop-shadow-[0_0_12px_rgba(255,255,255,0.2)]"
              style={{
                background: "linear-gradient(to bottom, white 0%, white 42%, #C9A048 43%, #C9A048 63%, white 64%, white 85%, #C9A048 86%, #C9A048 100%)",
                WebkitMaskImage: 'url(/logo.png)',
                WebkitMaskRepeat: 'no-repeat',
                WebkitMaskPosition: 'center',
                WebkitMaskSize: 'contain',
                maskImage: 'url(/logo.png)',
                maskRepeat: 'no-repeat',
                maskPosition: 'center',
                maskSize: 'contain',
              }}
            />
          </div>
        </div>

        {/* ── 2. THE STATEMENT (PREMIUM TYPOGRAPHY) ── */}
        <div className="max-w-2xl text-center mb-10">
           <h2 className="text-base md:text-xl font-serif font-bold text-white leading-snug tracking-tight mb-3">
             Addressing complex metabolic and reproductive disorders with <br className="hidden md:block" />
             <span className="text-[#C9A048] italic font-medium">precision-crafted generic solutions</span>.
           </h2>
           <div className="flex items-center justify-center gap-1.5 opacity-30">
              <div className="w-1 h-1 rounded-full bg-[#C9A048]" />
              <div className="w-6 h-px bg-white" />
              <div className="w-1 h-1 rounded-full bg-[#C9A048]" />
           </div>
        </div>

        {/* ── 3. THE TABS (SCIENTIFIC NAVIGATION) ── */}
        <nav className="flex flex-wrap justify-center gap-x-10 gap-y-3 mb-12">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="text-white/60 hover:text-white text-[10px] font-black tracking-[0.3em] uppercase transition-all duration-300 relative group"
            >
              <span className="relative z-10">{link.name}</span>
              <span className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-0 h-[1.5px] bg-[#C9A048] group-hover:w-full transition-all duration-500" />
            </Link>
          ))}
        </nav>

        {/* ── 4. THE UTILITY BAR ── */}
        <div className="w-full pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-4 text-[9px] font-bold tracking-[0.15em] uppercase text-white/40">
          <p>© {new Date().getFullYear()} Dhinakar Pharma Private Limited.</p>
          
          <div className="flex flex-wrap justify-center gap-6 text-white/60">
            <Link href="/track" className="hover:text-white transition-colors">Track Order</Link>
            <Link href="#" className="hover:text-white transition-colors">Privacy</Link>
            <Link href="#" className="hover:text-white transition-colors">Terms</Link>
            <Link href="#" className="hover:text-white transition-colors">Sitemap</Link>
          </div>
        </div>

      </div>
    </footer>
  );
}
