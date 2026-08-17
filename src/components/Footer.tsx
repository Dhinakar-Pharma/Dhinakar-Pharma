"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const navLinks = [
  { name: "Home", href: "/" },
  { name: "Our Values", href: "/values" },
  { name: "Products", href: "/products" },
  { name: "From the Manufacturers", href: "/from-the-manufacturers" },
  { name: "Connect", href: "/connect" },
];

export default function Footer() {
  const pathname = usePathname();
  if (pathname?.startsWith('/admin/print') || pathname?.startsWith('/admin/login')) return null;

  const isAdmin = pathname?.startsWith('/admin');

  if (isAdmin) {
    return (
      <footer className="bg-white border-t border-slate-200 py-6 mt-auto font-sans">
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
    <footer className="relative overflow-hidden text-slate-800 pt-12 pb-8 bg-[#f0f4fa] border-t border-slate-200/80 font-sans">
      {/* Soft Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-brand-blue/[0.02] blur-[100px] pointer-events-none" />
      
      <div className="relative z-10 max-w-5xl mx-auto px-6 flex flex-col items-center text-center">
        
        {/* ── 1. THE BRAND MARK (ZOOMED LOGO) ── */}
        <div className="mb-6 relative group">
          <Link href="/" className="inline-block transition-transform duration-500 hover:scale-105">
            <img
              src="/logo.png"
              alt="Dhinakar Pharma"
              className="h-16 md:h-20 w-auto object-contain contrast-[1.1] mix-blend-multiply scale-[1.35] origin-center"
            />
          </Link>
        </div>

        {/* ── 2. THE STATEMENT ── */}
        <div className="max-w-2xl text-center mb-8">
           <h2 className="text-base md:text-lg font-serif font-bold text-slate-900 leading-snug tracking-tight mb-3">
             Addressing complex metabolic and reproductive disorders with <br className="hidden md:block" />
             <span className="text-brand-blue italic font-medium">precision-crafted generic solutions</span>.
           </h2>
           <div className="flex items-center justify-center gap-2 opacity-30">
              <div className="w-1.5 h-1.5 rounded-full bg-[#C9A048]" />
              <div className="w-8 h-px bg-slate-400" />
              <div className="w-1.5 h-1.5 rounded-full bg-[#C9A048]" />
           </div>
        </div>

        {/* ── 3. THE NAVIGATION TABS ── */}
        <nav className="flex flex-wrap justify-center gap-x-8 gap-y-3 mb-10">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="text-slate-600 hover:text-brand-blue text-[11px] font-extrabold tracking-[0.25em] uppercase transition-all duration-300 relative group"
            >
              <span className="relative z-10">{link.name}</span>
              <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-0 h-[2px] bg-[#C9A048] group-hover:w-full transition-all duration-300 rounded-full" />
            </Link>
          ))}
        </nav>

        {/* ── 4. THE UTILITY BAR ── */}
        <div className="w-full pt-6 border-t border-slate-200 flex flex-col md:flex-row items-center justify-between gap-4 text-[10px] font-bold tracking-wider uppercase text-slate-400">
          <p>© {new Date().getFullYear()} Dhinakar Pharma Private Limited. All rights reserved.</p>
          
          <div className="flex flex-wrap justify-center gap-6 text-slate-500">
            <Link href="/connect" className="hover:text-brand-blue transition-colors">Connect</Link>
            <span>•</span>
            <Link href="/products" className="hover:text-brand-blue transition-colors">Products</Link>
            <span>•</span>
            <Link href="/values" className="hover:text-brand-blue transition-colors">Our Values</Link>
          </div>
        </div>

      </div>
    </footer>
  );
}
