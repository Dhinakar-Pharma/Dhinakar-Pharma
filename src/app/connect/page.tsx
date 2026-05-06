"use client";

import { motion } from "framer-motion";
import { MapPin, Mail, Phone, Clock, Globe } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const contactInfo = [
  {
    icon: MapPin,
    title: "Headquarters",
    details: [
      "Plot no 556, Sri Govinda Nilayam",
      "OU Colony, Shaikpet",
      "Hyderabad, Telangana 500008",
      "India"
    ]
  },
  {
    icon: Phone,
    title: "Institutional Liaison",
    details: [
      "+91 99498 55889"
    ]
  },
  {
    icon: Mail,
    title: "Digital Correspondence",
    details: [
      "business@dhinakarpharma.in"
    ]
  },
];

export default function ConnectPage() {
  return (
    <>
      {/* Hero Section (Values Style - Condensed) */}
      <section className="relative overflow-hidden py-16 sm:py-20 px-6" style={{ background: "linear-gradient(150deg, #0c2160 0%, #1B3F8B 50%, #2460aa 100%)" }}>
        {/* Decorative elements */}
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none"
          style={{ backgroundImage: "radial-gradient(circle, white 1px, transparent 1px)", backgroundSize: "22px 22px" }} />
        <div className="absolute -top-16 -right-16 w-64 h-64 sm:w-80 sm:h-80 rounded-full border border-white/[0.04]" />

        <div className="max-w-7xl mx-auto relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="flex items-center justify-center gap-3 mb-5">
              <div className="h-[2px] w-6 bg-[#C9A048]" />
              <p className="text-[#C9A048] font-bold tracking-[0.4em] uppercase text-[9px]">Institutional Engagement</p>
              <div className="h-[2px] w-6 bg-[#C9A048]" />
            </div>

            <h1 className="text-3xl md:text-5xl lg:text-6xl font-serif font-bold text-white leading-tight mb-6">
              Let's <span style={{ background: "linear-gradient(105deg, #C9A048 10%, #f5e48a 55%, #C9A048 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>Connect</span>
            </h1>

            <p className="text-white/60 text-[10px] md:text-xs max-w-2xl mx-auto leading-relaxed font-medium uppercase tracking-[0.2em]">
              Pioneering health with precision through direct <br className="hidden md:block" /> institutional liaison and scientific support.
            </p>
          </motion.div>
        </div>
      </section>

      {/* 2-Column Contact Section */}
      <section className="py-20 relative overflow-hidden bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-start">

            {/* Left Column: Institutional Details */}
            <div className="lg:col-span-5 pt-4">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
              >
                <div className="space-y-12">
                  {/* Specialized Headquarters Rendering */}
                  <div className="flex gap-6 group">
                    <div className="shrink-0 w-12 h-12 rounded-2xl bg-slate-50 flex items-center justify-center group-hover:bg-brand-blue group-hover:text-white transition-all duration-500">
                      <MapPin className="w-5 h-5" strokeWidth={1.5} />
                    </div>
                    <div>
                      <h3 className="text-sm font-black uppercase tracking-[0.2em] text-slate-400 mb-4">
                        Headquarters
                      </h3>
                      <div className="space-y-4">
                        <div>
                          <p className="text-xl font-serif font-bold text-slate-900 leading-tight">Sri Govinda Nilayam</p>
                          <p className="text-sm font-bold text-brand-blue uppercase tracking-widest mt-1">Plot No. 556</p>
                        </div>
                        <div className="pt-3 border-t border-slate-100">
                          <p className="text-base text-slate-600 font-medium leading-relaxed">
                            OU Colony, Shaikpet <br />
                            Hyderabad, Telangana 500008 <br />
                            India
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Other Contact Items */}
                  {contactInfo.slice(1, 3).map((item, index) => (
                    <div key={item.title} className="flex gap-6 group">
                      <div className="shrink-0 w-12 h-12 rounded-2xl bg-slate-50 flex items-center justify-center group-hover:bg-brand-blue group-hover:text-white transition-all duration-500">
                        <item.icon className="w-5 h-5" strokeWidth={1.5} />
                      </div>
                      <div>
                        <h3 className="text-sm font-black uppercase tracking-[0.2em] text-slate-400 mb-3">
                          {item.title}
                        </h3>
                        <div className="space-y-1">
                          {item.details.map((line, i) => (
                            <p key={i} className="text-base text-slate-600 font-medium leading-relaxed">
                              {line}
                            </p>
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>

            {/* Right Column: Google Maps Integration (Rectangular) */}
            <div className="lg:col-span-7 h-full">
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="relative h-[400px] lg:h-[500px] w-full rounded-2xl overflow-hidden shadow-[0_20px_50px_rgba(12,31,94,0.08)] border-8 border-slate-50 ring-1 ring-slate-100 bg-slate-50 group"
              >
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3806.9142426330456!2d78.3965553!3d17.4163333!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bcb96987f174c3d%3A0x6e8851458e08d277!2sOU%20Colony%2C%20Shaikpet%2C%20Hyderabad%2C%20Telangana%20500008!5e0!3m2!1sen!2sin!4v1714981000000!5m2!1sen!2sin"
                  className="w-full h-full border-0 grayscale-[0.2] contrast-[1.1] opacity-90 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-700"
                  allowFullScreen={true}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
                {/* Custom Overlay for Map Aesthetic */}
                <div className="absolute inset-0 pointer-events-none ring-inset ring-1 ring-black/5" />
                <div className="absolute bottom-6 right-6 bg-white/90 backdrop-blur-xl px-6 py-3 rounded-2xl border border-white shadow-lg pointer-events-none">
                  <p className="text-brand-blue text-[10px] font-black uppercase tracking-[0.3em]">Institutional Hub</p>
                </div>
              </motion.div>
            </div>

          </div>
        </div>
      </section>

    </>
  );
}
