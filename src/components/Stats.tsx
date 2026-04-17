"use client";

import { motion } from "framer-motion";
import { Users, Pill, Globe, Building2 } from "lucide-react";

const stats = [
  { label: "Patients Served", value: "1M+", icon: Users },
  { label: "Generic Formulations", value: "50+", icon: Pill },
  { label: "Global Presence", value: "10+", icon: Globe },
  { label: "Research Labs", value: "03", icon: Building2 },
];

export default function Stats() {
  return (
    <section className="py-24 relative overflow-hidden text-white" style={{ background: "linear-gradient(135deg, #0d2568 0%, #1B3F8B 55%, #2460aa 100%)" }}>
      {/* Texture */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{ backgroundImage: "radial-gradient(circle, white 1px, transparent 1px)", backgroundSize: "24px 24px" }} />
      
      <div className="max-w-[1650px] mx-auto px-6 lg:px-12 relative z-10">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-20 text-center">
          {stats.map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15, duration: 0.8 }}
              className="flex flex-col items-center group"
            >
              <div className="w-16 h-16 rounded-2xl bg-white/5 flex items-center justify-center mb-6 group-hover:bg-[#C9A048]/10 transition-colors border border-white/5 group-hover:border-[#C9A048]/30">
                <stat.icon className="w-8 h-8 text-[#C9A048]" />
              </div>
              <p className="text-4xl lg:text-5xl font-serif font-bold mb-2 tracking-tight">{stat.value}</p>
              <p className="text-white/50 text-xs font-bold uppercase tracking-[0.25em]">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
