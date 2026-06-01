"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Lock, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password })
      });

      if (res.ok) {
        router.push("/admin");
        router.refresh();
      } else {
        const data = await res.json();
        setError(data.error || "Access Denied. Invalid credentials.");
      }
    } catch (err) {
      setError("Secure connection failed. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex font-sans overflow-hidden bg-white">
      
      {/* LEFT SIDE: VIDEO IMMERSIVE */}
      <div className="relative hidden lg:block lg:w-2/3 h-screen overflow-hidden bg-brand-blue">
        <video 
          autoPlay 
          muted 
          loop 
          playsInline
          className="absolute inset-0 w-full h-full object-cover opacity-60"
        >
          <source src="/admin-bg.mp4.mp4" type="video/mp4" />
        </video>
        
        {/* Elegant Dark Overlays */}
        <div className="absolute inset-0 bg-brand-blue/60 mix-blend-multiply" />
        <div className="absolute inset-0 bg-gradient-to-r from-brand-blue/90 via-brand-blue/50 to-transparent" />
        
        {/* Top Left Logo */}
        <div className="absolute top-8 left-8 md:top-10 md:left-12 z-20 w-40 md:w-56">
           <img src="/logo.png" alt="Dhinakar Pharma" className="w-full h-auto object-contain brightness-0 invert drop-shadow-[0_10px_20px_rgba(0,0,0,0.5)]" />
        </div>
        
        {/* Bottom Text Content */}
        <div className="absolute inset-0 flex flex-col p-12 md:p-16 justify-end z-10 pb-20">
            <h1 className="font-serif text-5xl xl:text-6xl font-bold text-white mb-6 leading-tight max-w-2xl">
              Dhinakar Pharma <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#C9A048] to-[#f5e48a]">Administrative Control.</span>
            </h1>
            <p className="text-white/80 text-lg max-w-lg font-medium leading-relaxed">
              Secure gateway for enterprise resource planning, live inventory management, and clinical data oversight.
            </p>
          </div>
        </div>

      {/* RIGHT SIDE: FULL HEIGHT LOGIN PANEL */}
      <div className="w-full lg:w-1/3 h-screen flex flex-col justify-center px-8 sm:px-12 xl:px-16 bg-white shadow-[-30px_0_60px_rgba(0,0,0,0.1)] relative z-20 overflow-y-auto">
        
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="w-full max-w-sm mx-auto flex flex-col justify-center min-h-full py-12"
        >
          <div className="flex flex-col items-center mb-12 text-center">
            <img src="/logo.png" alt="Dhinakar Pharma Logo" className="w-48 object-contain mb-8" />
            <h2 className="font-serif text-3xl font-bold text-brand-blue mb-2">Welcome Back</h2>
            <p className="text-slate-500 text-sm font-medium">Please enter your details to sign in.</p>
          </div>

          <AnimatePresence mode="wait">
            {error && (
              <motion.div 
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="overflow-hidden"
              >
                <div className="bg-red-50 text-red-600 text-xs font-bold p-4 rounded-xl mb-6 border border-red-100 flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-red-500 shrink-0" />
                  {error}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label className="block text-[11px] uppercase tracking-wider font-bold text-slate-600 mb-2 ml-1">Email Address</label>
              <input 
                type="email" 
                value={email} 
                onChange={e => setEmail(e.target.value)} 
                required 
                placeholder="admin@dhinakar.com"
                className="w-full px-5 py-4 rounded-xl border border-slate-200 focus:border-brand-blue outline-none transition-all text-sm font-medium text-slate-900 bg-slate-50 focus:bg-white focus:ring-4 focus:ring-brand-blue/5" 
              />
            </div>
            
            <div>
              <label className="block text-[11px] uppercase tracking-wider font-bold text-slate-600 mb-2 ml-1">Password</label>
              <input 
                type="password" 
                value={password} 
                onChange={e => setPassword(e.target.value)} 
                required 
                placeholder="••••••••"
                className="w-full px-5 py-4 rounded-xl border border-slate-200 focus:border-brand-blue outline-none transition-all text-sm font-bold text-slate-900 bg-slate-50 focus:bg-white focus:ring-4 focus:ring-brand-blue/5 tracking-widest placeholder:tracking-normal" 
              />
            </div>

            <button 
              disabled={loading} 
              className="w-full py-4 mt-6 bg-brand-blue text-white font-bold text-sm rounded-xl hover:bg-[#0c1b42] transition-colors disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2 group shadow-[0_10px_20px_rgba(12,31,94,0.15)]"
            >
              {loading ? (
                <span className="flex items-center gap-2">
                  <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                  Authenticating...
                </span>
              ) : (
                <>
                  Sign In
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </button>
          </form>
          
          <div className="mt-16 flex flex-col items-center gap-3 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
            <div className="flex items-center gap-2">
              <Lock className="w-3.5 h-3.5" />
              256-bit Encrypted Connection
            </div>
            <span className="text-slate-300">© {new Date().getFullYear()} Dhinakar Pharma</span>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
