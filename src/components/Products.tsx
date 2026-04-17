"use client";

import { motion } from "framer-motion";
import { Pill, FlaskConical, Syringe, Activity } from "lucide-react";

const products = [
  { id: 1, name: "CardioCare Premium", category: "Cardiology", icon: Activity },
  { id: 2, name: "NeuroGen Plus", category: "Neurology", icon: Pill },
  { id: 3, name: "ImmunoShield X", category: "Immunology", icon: FlaskConical },
  { id: 4, name: "VaxCore Alpha", category: "Vaccines", icon: Syringe },
  { id: 5, name: "OsteoFlex Max", category: "Orthopedics", icon: Pill },
  { id: 6, name: "DermaGlow Elite", category: "Dermatology", icon: FlaskConical },
];

export default function Products() {
  return (
    <section id="products" className="scroll-mt-16 py-24 relative z-10 w-full bg-gray-50/50">
      <div className="max-w-[1800px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 mb-16 text-center">
        <h2 className="text-4xl md:text-5xl font-serif font-bold text-gray-900 mb-4">
          Our <span className="text-gradient-gold">Products</span>
        </h2>
        <div className="w-24 h-1 bg-gradient-to-r from-brand-blue-dark to-brand-blue mx-auto" />
      </div>

      <div className="max-w-[1800px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-6 gap-8">
          {products.map((product) => (
            <motion.div
              key={product.id}
              whileHover="hover"
              initial="rest"
              className="group relative h-80 rounded-2xl flex flex-col items-center justify-center cursor-pointer overflow-hidden transition-all duration-500 border border-transparent hover:border-brand-blue hover:bg-white/60"
            >
              {/* Product Visual Mock */}
              <motion.div
                variants={{
                  rest: { y: 0, scale: 1 },
                  hover: { y: -20, scale: 1.1 },
                }}
                transition={{ duration: 0.4 }}
                className="z-10 flex flex-col items-center"
              >
                <div className="w-24 h-24 rounded-full bg-gradient-to-br from-brand-blue/10 to-transparent flex items-center justify-center mb-6 shadow-lg group-hover:shadow-[0_0_30px_rgba(32,101,150,0.3)] transition-all duration-500">
                  <product.icon className="h-12 w-12 text-brand-blue stroke-[1.5]" />
                </div>
                <h3 className="text-2xl font-serif font-bold text-gray-900 text-center px-4">
                  {product.name}
                </h3>
                <p className="text-sm text-gray-500 mt-2 opacity-100 group-hover:opacity-0 transition-opacity duration-300">
                  {product.category}
                </p>
              </motion.div>

              {/* View Details Button (Hidden on rest, revealed on hover) */}
              <motion.div
                variants={{
                  rest: { opacity: 0, y: 20 },
                  hover: { opacity: 1, y: 0 },
                }}
                transition={{ duration: 0.3, delay: 0.1 }}
                className="absolute bottom-10 z-20"
              >
                <button className="px-6 py-2 border border-brand-blue text-brand-blue rounded-full text-sm font-semibold tracking-wider uppercase hover:bg-brand-blue hover:text-white transition-colors flex items-center gap-2 relative overflow-hidden group/btn">
                  <span className="relative z-10">View Details</span>
                  <div className="absolute inset-0 bg-brand-blue/20 animate-pulse" />
                </button>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
