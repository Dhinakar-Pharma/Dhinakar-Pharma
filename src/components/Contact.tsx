"use client";

import { motion } from "framer-motion";
import { Send, MapPin, Mail, Phone, Calendar } from "lucide-react";

export default function Contact() {
  return (
    <section id="contact" className="py-24 lg:py-32 bg-gray-50/50">
      <div className="max-w-[1650px] mx-auto px-6 lg:px-12">
        <div className="bg-white rounded-[3rem] shadow-2xl shadow-blue-900/5 flex flex-col lg:flex-row overflow-hidden border border-gray-100">
          
          {/* Left: Contact Info */}
          <div className="lg:w-1/3 bg-brand-blue p-10 lg:p-16 text-white flex flex-col justify-between relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-2xl" />
            
            <div className="relative z-10">
              <h2 className="text-3xl lg:text-4xl font-serif font-bold mb-6">Partner With Us</h2>
              <p className="text-white/60 mb-12 leading-relaxed">
                Whether you're a healthcare provider, distributor, or patient, we're here to assist you.
              </p>
              
              <div className="space-y-8">
                <div className="flex gap-5">
                  <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center shrink-0">
                    <MapPin className="w-5 h-5 text-gold-light" />
                  </div>
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/40 mb-1">Corporate HQ</p>
                    <p className="text-sm leading-relaxed">Hyderabad, Telangana State, India</p>
                  </div>
                </div>
                
                <div className="flex gap-5">
                  <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center shrink-0">
                    <Mail className="w-5 h-5 text-gold-light" />
                  </div>
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/40 mb-1">Email Us</p>
                    <p className="text-sm">info@dhinakarpharma.in</p>
                  </div>
                </div>

                <div className="flex gap-5">
                  <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center shrink-0">
                    <Phone className="w-5 h-5 text-gold-light" />
                  </div>
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/40 mb-1">Call Us</p>
                    <p className="text-sm">+91 40 4000 0000</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-16 pt-8 border-t border-white/10 flex items-center gap-4 text-xs font-bold uppercase tracking-widest text-[#C9A048]">
              <Calendar className="w-4 h-4" />
              Response within 24 hours
            </div>
          </div>

          {/* Right: Form */}
          <div className="flex-1 p-10 lg:p-16">
            <form className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="flex flex-col gap-2">
                <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400">FullName</label>
                <input type="text" placeholder="John Doe" className="bg-gray-50 border border-gray-100 rounded-2xl py-4 px-6 focus:outline-none focus:border-brand-blue focus:bg-white transition-all transition-duration-300" />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Email Address</label>
                <input type="email" placeholder="john@company.com" className="bg-gray-50 border border-gray-100 rounded-2xl py-4 px-6 focus:outline-none focus:border-brand-blue focus:bg-white transition-all transition-duration-300" />
              </div>
              <div className="flex flex-col gap-2 md:col-span-2">
                <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Enquiry Type</label>
                <select className="bg-gray-50 border border-gray-100 rounded-2xl py-4 px-6 focus:outline-none focus:border-brand-blue focus:bg-white transition-all transition-duration-300 appearance-none">
                  <option>General Information</option>
                  <option>Distribution Partnership</option>
                  <option>Product Information</option>
                  <option>Career Opportunities</option>
                </select>
              </div>
              <div className="flex flex-col gap-2 md:col-span-2">
                <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Message</label>
                <textarea rows={4} placeholder="How can we help you?" className="bg-gray-50 border border-gray-100 rounded-2xl py-4 px-6 focus:outline-none focus:border-brand-blue focus:bg-white transition-all transition-duration-300 resize-none"></textarea>
              </div>
              <div className="md:col-span-2 pt-4">
                <button className="w-full sm:w-auto px-12 py-5 bg-brand-blue hover:bg-brand-blue-dark shadow-2xl shadow-brand-blue/20 text-white font-bold uppercase tracking-[0.2em] rounded-[1.5rem] transition-all flex items-center justify-center gap-3">
                  Submit Enquiry
                  <Send className="w-4 h-4" />
                </button>
              </div>
            </form>
          </div>

        </div>
      </div>
    </section>
  );
}
