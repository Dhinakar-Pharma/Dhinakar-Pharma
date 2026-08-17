"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, LogOut } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

const navLinks = [
  { name: "Home", href: "/" },
  { name: "Our Values", href: "/values" },
  { name: "Products", href: "/products" },
  { name: "From the Manufacturers", href: "/from-the-manufacturers" },
  { name: "Connect", href: "/connect" },
];

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

  if (pathname.startsWith('/admin/print') || isLogin) return null;

  return (
    <>
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out ${
        isScrolled 
          ? "pt-3 px-3 sm:px-6 lg:px-10" 
          : "pt-0 px-0"
      }`}>
        <div className={`mx-auto transition-all duration-300 ease-in-out ${
          isScrolled 
            ? "max-w-7xl bg-white/90 backdrop-blur-md rounded-full shadow-lg border border-slate-200/80 px-6 lg:px-8" 
            : "max-w-full bg-white border-b border-slate-100 px-6 lg:px-12"
        }`}>
          <div className={`flex items-center justify-between transition-all duration-300 ${
            isScrolled ? "h-14 md:h-16" : "h-16 md:h-20"
          }`}>
            {/* Logo Section */}
            <div className="flex-shrink-0 flex items-center h-full group">
              <Link href={isAdmin ? "/admin" : "/"} className="relative flex items-center">
                <img
                  src="/logo.png"
                  alt="Dhinakar Pharma"
                  className={`w-auto object-contain mix-blend-multiply contrast-[1.1] transition-all duration-300 ${
                    isScrolled ? "h-11 md:h-13 scale-[1.35]" : "h-14 md:h-16 scale-[1.65]"
                  } origin-left group-hover:brightness-110`}
                />
              </Link>
            </div>

            {/* Desktop Menu */}
            {!isAdmin && (
              <div className="hidden md:block">
                <div className="flex items-center space-x-1 lg:space-x-2">
                  {navLinks.map((link) => (
                    <Link
                      key={link.name}
                      href={link.href}
                      className={`cursor-pointer group relative px-4 py-1.5 text-[11px] font-extrabold uppercase tracking-wider transition-all duration-300 ${
                        isActive(link.href) ? "text-brand-blue" : "text-slate-500 hover:text-brand-blue"
                      }`}
                    >
                      {link.name}
                      {/* Scientific Indicator */}
                      <span className={`absolute top-0 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-[#C9A048] transition-all duration-300 ${
                        isActive(link.href) ? "opacity-100 scale-100" : "opacity-0 scale-0 group-hover:opacity-100 group-hover:scale-100"
                      }`} />
                      <span className={`absolute -bottom-0.5 left-1/2 h-[2px] bg-brand-blue transform -translate-x-1/2 transition-all duration-300 rounded-full ${
                        isActive(link.href) ? "w-1/2 opacity-100" : "w-0 opacity-0 group-hover:w-1/3 group-hover:opacity-100"
                      }`} />
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {/* Action Section */}
            <div className="flex items-center gap-4">
              {isAdmin && !isLogin && (
                <button onClick={handleLogout} className="flex items-center gap-2 bg-slate-50 text-slate-600 border border-slate-200 px-3.5 py-1.5 rounded-lg font-bold text-[10px] uppercase tracking-wider shadow-sm hover:bg-slate-100 transition-all">
                  <LogOut className="w-3.5 h-3.5" /> Logout
                </button>
              )}

              {/* Mobile menu toggle */}
              {!isAdmin && (
                <div className="md:hidden flex items-center">
                  <button
                    onClick={() => setIsOpen(!isOpen)}
                    className="p-1.5 rounded-lg text-slate-600 hover:bg-slate-50 transition-colors"
                  >
                    {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
                  </button>
                </div>
              )}
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
            <div className="px-4 pt-2 pb-3 space-y-1 flex flex-col items-center justify-center h-full gap-6">
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.name}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ delay: i * 0.08 }}
                >
                  <Link
                    href={link.href}
                    className={`cursor-pointer text-2xl font-serif transition-all duration-300 flex items-center group relative ${isActive(link.href) ? "text-brand-blue" : "text-slate-800 hover:text-brand-blue"
                      }`}
                  >
                    <span
                      className={`absolute left-0 h-[2px] top-1/2 -translate-y-1/2 bg-brand-blue transition-all duration-300 ease-out rounded-full ${isActive(link.href) ? "w-6" : "w-0 group-hover:w-6"
                        }`}
                    />
                    <span
                      className={`transform transition-all duration-300 ease-out ${isActive(link.href)
                          ? "translate-x-8 opacity-100"
                          : "opacity-80 group-hover:opacity-100 group-hover:translate-x-8"
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
    </>
  );
}
