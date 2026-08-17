"use client";

import { motion } from "framer-motion";
import { MapPin, Mail, Phone, Clock, Globe } from "lucide-react";

const contactInfo = [
  {
    icon: MapPin,
    title: "Headquarters",
    subtitle: "Sri Govinda Nilayam • Plot No. 556",
    details: [
      "OU Colony, Shaikpet",
      "Hyderabad, Telangana 500008",
      "India"
    ]
  },
  {
    icon: Phone,
    title: "Institutional Liaison",
    subtitle: "Direct Business Line",
    details: [
      "+91 99498 55889"
    ]
  },
  {
    icon: Mail,
    title: "Digital Correspondence",
    subtitle: "Inquiries & Corporate Desk",
    details: [
      "business@dhinakarpharma.in"
    ]
  },
];

export default function ConnectPage() {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
      
      {/* ── 1. COMPACT INSTITUTIONAL BANNER ── */}
      <section className="relative overflow-hidden py-10 sm:py-14 px-6 sm:px-10 lg:px-16 bg-brand-blue">
        <div className="absolute inset-0 bg-[linear-gradient(150deg,#0c2160_0%,#1B3F8B_50%,#0c2160_100%)] z-0" />
        <div className="absolute inset-0 opacity-[0.04] pointer-events-none"
          style={{ backgroundImage: "radial-gradient(circle, white 1px, transparent 1px)", backgroundSize: "24px 24px" }} />

        <div className="max-w-[1800px] mx-auto relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center justify-center gap-3 mb-3">
              <div className="h-px w-8 bg-[#C9A048]" />
              <p className="text-[#C9A048] font-bold tracking-[0.3em] uppercase text-[10px]">Institutional Engagement</p>
              <div className="h-px w-8 bg-[#C9A048]" />
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-white leading-tight mb-3">
              Let's <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#C9A048] via-[#f5e48a] to-[#C9A048]">Connect</span>
            </h1>

            <p className="text-slate-300 text-xs sm:text-sm max-w-xl mx-auto font-normal">
              Pioneering health with precision through direct institutional liaison and scientific support.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ── 2. CONTACT DETAILS & GOOGLE MAPS GRID ── */}
      <section className="py-12 sm:py-16 max-w-[1800px] mx-auto px-6 sm:px-10 lg:px-16 w-full flex-grow">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch">

          {/* Left Column: Contact Cards (5 cols) */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-5">
            {contactInfo.map((item, index) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200/90 shadow-[0_10px_30px_rgba(0,0,0,0.03)] hover:shadow-lg transition-all duration-300 flex items-start gap-5 group"
                >
                  <div className="w-12 h-12 rounded-2xl bg-brand-blue/5 border border-brand-blue/10 flex items-center justify-center text-brand-blue shrink-0 group-hover:bg-brand-blue group-hover:text-white transition-colors duration-300 shadow-sm">
                    <Icon className="w-5 h-5" />
                  </div>

                  <div>
                    <span className="text-[9px] font-bold uppercase tracking-wider text-[#C9A048] block mb-0.5">{item.subtitle}</span>
                    <h3 className="text-base font-serif font-bold text-slate-900 mb-2">
                      {item.title}
                    </h3>
                    <div className="space-y-0.5 text-xs sm:text-sm text-slate-600 font-medium">
                      {item.details.map((line, i) => (
                        <p key={i}>{line}</p>
                      ))}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Right Column: Google Maps Container (7 cols) */}
          <div className="lg:col-span-7">
            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative min-h-[400px] h-full w-full rounded-3xl overflow-hidden shadow-[0_20px_50px_rgba(12,31,94,0.08)] border-4 border-white bg-white group"
            >
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3806.9142426330456!2d78.3965553!3d17.4163333!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bcb96987f174c3d%3A0x6e8851458e08d277!2sOU%20Colony%2C%20Shaikpet%2C%20Hyderabad%2C%20Telangana%20500008!5e0!3m2!1sen!2sin!4v1714981000000!5m2!1sen!2sin"
                className="w-full h-full min-h-[400px] border-0 contrast-[1.05]"
                allowFullScreen={true}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
              
              <div className="absolute bottom-5 right-5 bg-white/95 backdrop-blur-md px-5 py-2.5 rounded-2xl border border-slate-200 shadow-lg pointer-events-none">
                <p className="text-brand-blue text-[10px] font-bold uppercase tracking-[0.2em]">Hyderabad Corporate HQ</p>
              </div>
            </motion.div>
          </div>

        </div>
      </section>

    </div>
  );
}
