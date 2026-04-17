"use client";

import { useRef } from "react";
import { motion } from "framer-motion";

const timelineItems = [
  {
    year: "2023",
    title: "The Genesis",
    description: "Conceived in Hyderabad with a mission to redefine metabolic and reproductive care.",
  },
  {
    year: "2024",
    title: "Operational Excellence",
    description: "Launch of our world-class manufacturing standards and state-of-the-art laboratory.",
  },
  {
    year: "2024",
    title: "Product Portfolio",
    description: "Unveiling our first range of precision-crafted generic formulations.",
  },
  {
    year: "2025",
    title: "Global Reach",
    description: "Expanding our footprint to provide affordable healthcare to millions.",
  },
];

export default function WhyUs() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  return (
    <section id="why-us" className="scroll-mt-16 py-24 relative z-10 w-full overflow-hidden" ref={containerRef}>
      <div className="max-w-[1800px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 mb-24 text-center">
        <h2 className="text-4xl md:text-5xl font-serif font-bold text-gray-900 mb-4">
          The Journey of <span className="text-gradient-gold">Innovation</span>
        </h2>
        <div className="w-24 h-1 bg-gradient-to-r from-brand-blue-dark to-brand-blue mx-auto" />
      </div>

      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 relative">
        {/* Central Gold Line */}
        <div className="absolute left-1/2 transform -translate-x-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-gold-dark to-transparent hidden md:block" />

        <div className="space-y-24">
          {timelineItems.map((item, index) => {
            const isEven = index % 2 === 0;

            return (
              <div key={index} className="relative flex flex-col md:flex-row items-center justify-between w-full group">
                
                {/* Node for Mobile */}
                <motion.div
                  initial={{ opacity: 0, scale: 0 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: false, margin: "-100px" }}
                  className="md:hidden absolute left-4 w-4 h-4 rounded-full bg-gold-dark shadow-[0_0_15px_#B8860B] z-20"
                />
                <div className="md:hidden absolute left-6 top-8 bottom-[-96px] w-[1px] bg-gold-dark/30 z-10" />

                {/* Left Content */}
                <div className={`w-full md:w-5/12 pl-12 md:pl-0 ${isEven ? "md:text-right md:pr-12" : "md:order-2 md:text-left md:pl-12"}`}>
                  <motion.div
                    initial={{ opacity: 0, x: isEven ? -50 : 50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: false, margin: "-100px" }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                    className="glass-gold p-8 rounded-2xl relative"
                  >
                    <span className="text-4xl font-serif font-bold text-gray-900/5 absolute -top-4 right-4 md:right-auto md:left-4 group-hover:text-gold-dark/10 transition-colors duration-500">
                      {item.year}
                    </span>
                    <h3 className="text-2xl font-serif font-bold text-gray-900 mb-2 relative z-10">{item.title}</h3>
                    <p className="text-gray-600 font-sans relative z-10">{item.description}</p>
                  </motion.div>
                </div>

                {/* Central Node (Desktop) */}
                <motion.div
                  initial={{ opacity: 0.2, scale: 0.5 }}
                  whileInView={{ opacity: 1, scale: 1, backgroundColor: "#B8860B" }}
                  viewport={{ once: false, margin: "-50% 0px -50% 0px" }}
                  transition={{ duration: 0.4 }}
                  className="hidden md:flex absolute left-1/2 transform -translate-x-1/2 w-6 h-6 rounded-full bg-white border-2 border-gold-dark items-center justify-center z-20"
                >
                  <motion.div 
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    className="absolute inset-0 rounded-full bg-gold-dark blur-md z-[-1]"
                  />
                  <div className="w-2 h-2 rounded-full bg-white" />
                </motion.div>

                {/* Right Space */}
                <div className={`hidden md:block w-5/12 ${isEven ? "md:order-2" : ""}`} />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
