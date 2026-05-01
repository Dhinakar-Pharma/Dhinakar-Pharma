"use client";

import Link from "next/link";
import { MapPin, Mail, Phone } from "lucide-react";
import { usePathname } from "next/navigation";

const navLinks = [
  { name: "Home", href: "/" },
  { name: "Our Values", href: "/values" },
  { name: "Products", href: "/products" },
  { name: "Why Us", href: "/why-us" },
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
    <footer 
      className="relative overflow-hidden text-white pt-12 pb-8" 
      style={{ background: "linear-gradient(150deg, #0c2160 0%, #1B3F8B 60%, #2460aa 100%)" }}
    >
      {/* Decorative background elements */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{ backgroundImage: "radial-gradient(circle, white 1px, transparent 1px)", backgroundSize: "22px 22px" }} />
      <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full border border-white/[0.04]" />

      <div className="relative z-10 max-w-4xl mx-auto px-6 flex flex-col items-center text-center">
        
        {/* 1. Logo Card */}
        <div className="bg-white p-2 rounded-2xl shadow-xl mb-6 flex items-center justify-center w-20 h-20 overflow-hidden">
          <img
            src="/footer_logo.png"
            alt="Dhinakar Pharma"
            className="w-full h-full object-contain mix-blend-multiply contrast-[1.1] scale-[1.25]"
          />
        </div>

        {/* 2. Tagline */}
        <p className="text-white/70 text-sm leading-relaxed max-w-lg mb-6">
          Addressing complex metabolic and reproductive disorders with <br className="hidden sm:block" />
          precision-crafted generic solutions from Hyderabad, India.
        </p>

        {/* 3. Navigation Links */}
        <nav className="flex flex-wrap justify-center gap-x-8 gap-y-3 mb-6">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="text-white/80 hover:text-white text-[11px] font-bold tracking-[0.2em] uppercase transition-colors duration-200"
            >
              {link.name}
            </Link>
          ))}
        </nav>

        {/* 5. Horizontal Divider */}
        <div className="w-full h-px bg-white/10 mb-6" />

        {/* 6. Contact Row */}
        <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-4 text-white/60 text-[12px] mb-10">
          <div className="flex items-center gap-2.5">
            <MapPin className="w-4 h-4 text-blue-300 opacity-50" />
            <span>Hyderabad, India</span>
          </div>
          <div className="hidden md:block w-1.5 h-1.5 rounded-full bg-white/10" />
          <div className="flex items-center gap-2.5">
            <Phone className="w-4 h-4 text-blue-300 opacity-50" />
            <span>+91 40 4000 0000</span>
          </div>
          <div className="hidden md:block w-1.5 h-1.5 rounded-full bg-white/10" />
          <div className="flex items-center gap-2.5">
            <Mail className="w-4 h-4 text-blue-300 opacity-50" />
            <span>info@dhinakarpharma.in</span>
          </div>
        </div>

        {/* 7. Bottom Bar */}
        <div className="w-full border-t border-white/5 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-white/30 text-[10px]">
          <p>© {new Date().getFullYear()} Dhinakar Pharma. All rights reserved.</p>
          <div className="flex items-center gap-8">
            <Link href="#" className="hover:text-white/50 transition-colors">Privacy Policy</Link>
            <Link href="#" className="hover:text-white/50 transition-colors">Terms of Service</Link>
            <Link href="#" className="hover:text-white/50 transition-colors">Site Map</Link>
          </div>
        </div>

      </div>
    </footer>
  );
}
