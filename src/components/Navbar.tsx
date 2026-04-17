"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navLinks = [
  { name: "Home", href: "/" },
  { name: "Our Values", href: "/values" },
  { name: "Products", href: "/products" },
  { name: "Why Us", href: "/why-us" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();

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

  return (
    <>
      <nav className={`fixed top-0 w-full z-50 bg-white transition-all duration-300 border-b ${isScrolled ? "border-gray-200 shadow-sm" : "border-transparent"}`}>
        <div className="max-w-[1800px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* Logo */}
            <div className="flex-shrink-0 flex items-center h-16 md:h-20 w-40 md:w-64">
              <Link href="/">
                <img
                  src="/logo.jpg"
                  alt="Dhinakar Pharma"
                  className="h-16 md:h-18 w-auto object-contain mix-blend-multiply contrast-[1.2] brightness-[1.1] scale-[1.15] origin-left"
                />
              </Link>
            </div>

            {/* Desktop Menu */}
            <div className="hidden md:block pt-2">
              <div className="ml-10 flex items-center space-x-8">
                {navLinks.map((link) => (
                  <Link
                    key={link.name}
                    href={link.href}
                    className={`cursor-pointer group relative px-5 py-2 text-[13px] font-bold uppercase tracking-[0.15em] transition-all duration-300 ${
                      isActive(link.href)
                        ? "text-brand-blue"
                        : "text-gray-500 hover:text-brand-blue"
                    }`}
                  >
                    {link.name}
                    <span
                      className={`absolute -bottom-2 left-1/2 h-[2px] bg-gold-dark transform -translate-x-1/2 transition-all duration-500 ease-out rounded-full ${
                        isActive(link.href)
                          ? "w-1/2 opacity-100"
                          : "w-0 opacity-0 group-hover:w-1/2 group-hover:opacity-100"
                      }`}
                    />
                  </Link>
                ))}
              </div>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden flex items-center">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="inline-flex items-center justify-center p-2 rounded-md text-gray-600 hover:text-brand-blue focus:outline-none"
              >
                <span className="sr-only">Open main menu</span>
                {isOpen ? (
                  <X className="block h-6 w-6" aria-hidden="true" />
                ) : (
                  <Menu className="block h-6 w-6" aria-hidden="true" />
                )}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
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
                    className={`cursor-pointer text-3xl font-serif transition-all duration-300 flex items-center group relative ${
                      isActive(link.href) ? "text-brand-blue" : "text-gray-900 hover:text-brand-blue"
                    }`}
                  >
                    <span
                      className={`absolute left-0 h-[2px] top-1/2 -translate-y-1/2 bg-brand-blue transition-all duration-500 ease-out rounded-full ${
                        isActive(link.href) ? "w-8" : "w-0 group-hover:w-8"
                      }`}
                    />
                    <span
                      className={`transform transition-all duration-500 ease-out ${
                        isActive(link.href)
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
    </>
  );
}
