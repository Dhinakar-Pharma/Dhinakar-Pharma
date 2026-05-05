"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ShoppingBag, LogOut } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

const navLinks = [
  { name: "Home", href: "/" },
  { name: "Our Values", href: "/values" },
  { name: "Products", href: "/products" },
  { name: "Why Us", href: "/why-us" },
];

import { useCartStore } from "@/store/cartStore";
import CartSidebar from "./CartSidebar";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = async () => {
    await fetch("/api/admin/logout", { method: "POST" });
    router.push("/admin/login");
    router.refresh();
  };
  
  const { items, setIsOpen: setCartOpen } = useCartStore();
  const cartItemCount = items.reduce((total, item) => total + item.quantity, 0);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  const isActive = (href: string) => pathname === href;
  const isAdmin = pathname.startsWith('/admin');
  const isLogin = pathname.includes('/login');

  if (pathname.startsWith('/admin/print')) return null;

  return (
    <>
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-in-out ${
        isScrolled 
          ? "pt-6 px-4 sm:px-6 lg:px-12" 
          : "pt-0 px-0"
      }`}>
        <div className={`mx-auto transition-all duration-500 ease-in-out ${
          isScrolled 
            ? "max-w-7xl bg-white/80 backdrop-blur-xl rounded-[2.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.12)] border border-white/40 px-8 lg:px-12" 
            : "max-w-full bg-white border-b border-gray-100 px-6 lg:px-16"
        }`}>
          <div className={`flex items-center justify-between transition-all duration-500 ${
            isScrolled ? "h-16 md:h-20" : "h-20 md:h-24"
          }`}>
            {/* Logo Section */}
            <div className="flex-shrink-0 flex items-center h-full group">
              <Link href={isAdmin ? "/admin" : "/"} className="relative">
                <img
                  src="/logo.png"
                  alt="Dhinakar Pharma"
                  className={`w-auto object-contain mix-blend-multiply contrast-[1.1] transition-all duration-500 ${
                    isScrolled ? "h-12 md:h-14 scale-[1.3]" : "h-16 md:h-18 scale-[1.6]"
                  } origin-left group-hover:brightness-110`}
                />
              </Link>
            </div>

            {/* Desktop Menu */}
            {!isAdmin && (
              <div className="hidden md:block">
                <div className="flex items-center space-x-2">
                  {navLinks.map((link) => (
                    <Link
                      key={link.name}
                      href={link.href}
                      className={`cursor-pointer group relative px-6 py-2 text-[12px] font-black uppercase tracking-[0.2em] transition-all duration-300 ${
                        isActive(link.href) ? "text-brand-blue" : "text-gray-400 hover:text-brand-blue"
                      }`}
                    >
                      {link.name}
                      {/* Scientific Indicator */}
                      <span className={`absolute top-0 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-[#C9A048] transition-all duration-500 ${
                        isActive(link.href) ? "opacity-100 scale-100" : "opacity-0 scale-0 group-hover:opacity-100 group-hover:scale-100"
                      }`} />
                      <span className={`absolute -bottom-1 left-1/2 h-[1px] bg-brand-blue/30 transform -translate-x-1/2 transition-all duration-500 ${
                        isActive(link.href) ? "w-1/2 opacity-100" : "w-0 opacity-0 group-hover:w-1/3 group-hover:opacity-100"
                      }`} />
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {/* Action Section */}
            <div className="flex items-center gap-6">
              {isAdmin && !isLogin && (
                <button onClick={handleLogout} className="flex items-center gap-2 bg-slate-50 text-slate-600 border border-slate-200 px-4 py-2 rounded-xl font-bold text-[11px] uppercase tracking-wider shadow-sm hover:bg-slate-100 transition-all">
                  <LogOut className="w-3.5 h-3.5" /> Logout
                </button>
              )}

              {/* Cart Button */}
              {!isAdmin && (
                <button 
                  onClick={() => setCartOpen(true)}
                  className="relative p-2.5 text-gray-400 hover:text-brand-blue transition-all duration-300 transform hover:scale-110"
                >
                  <ShoppingBag className="w-6 h-6" strokeWidth={1.5} />
                  {cartItemCount > 0 && (
                    <span className="absolute top-1 right-1 inline-flex items-center justify-center min-w-[18px] h-[18px] text-[9px] font-black leading-none text-white bg-brand-blue rounded-full shadow-lg border-2 border-white">
                      {cartItemCount}
                    </span>
                  )}
                </button>
              )}

              {/* Mobile menu toggle */}
              <div className="md:hidden flex items-center">
                <button
                  onClick={() => setIsOpen(!isOpen)}
                  className="p-2 rounded-xl text-gray-500 hover:bg-gray-50 transition-colors"
                >
                  {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                </button>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && !isAdmin && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 bg-white/95 backdrop-blur-xl md:hidden pt-16"
          >
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 flex flex-col items-center justify-center h-full gap-8">
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ delay: i * 0.1 }}
                >
                  <Link
                    href={link.href}
                    className={`cursor-pointer text-3xl font-serif transition-all duration-300 flex items-center group relative ${isActive(link.href) ? "text-brand-blue" : "text-gray-900 hover:text-brand-blue"
                      }`}
                  >
                    <span
                      className={`absolute left-0 h-[2px] top-1/2 -translate-y-1/2 bg-brand-blue transition-all duration-500 ease-out rounded-full ${isActive(link.href) ? "w-8" : "w-0 group-hover:w-8"
                        }`}
                    />
                    <span
                      className={`transform transition-all duration-500 ease-out ${isActive(link.href)
                          ? "translate-x-12 opacity-100"
                          : "opacity-80 group-hover:opacity-100 group-hover:translate-x-12"
                        }`}
                    >
                      {link.name}
                    </span>
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      
      <CartSidebar />
    </>
  );
}
