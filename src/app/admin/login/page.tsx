"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Lock, ShieldCheck, Server, KeyRound, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

export default function AdminLogin() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  const [username, setUsername] = useState("");
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
        body: JSON.stringify({ username, password })
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
    <div className="min-h-[calc(100vh-140px)] flex items-center justify-center bg-slate-100 p-4 sm:p-8 relative overflow-hidden">
      
      {/* Advanced Animated Background */}
      <div className="absolute inset-0 w-full h-full pointer-events-none z-0 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_50%,transparent_20%,#f1f5f9_100%)] z-10"></div>
        
        {/* Infinite Scrolling Grid */}
        <motion.div 
          animate={{ x: [0, -40], y: [0, -40] }}
          transition={{ repeat: Infinity, duration: 4, ease: "linear" }}
          className="absolute w-[150%] h-[150%] top-[-10%] left-[-10%] bg-[linear-gradient(to_right,#cbd5e1_1px,transparent_1px),linear-gradient(to_bottom,#cbd5e1_1px,transparent_1px)] bg-[size:40px_40px] opacity-40"
        />
        
        {/* Floating atmospheric glows with Framer Motion */}
        {mounted && (
          <>
            <motion.div 
              animate={{ x: [0, 50, -30, 0], y: [0, -50, 40, 0], scale: [1, 1.1, 0.9, 1] }} 
              transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
              className="absolute top-[-20%] left-[-10%] w-[70vw] h-[70vw] rounded-full bg-blue-500/15 blur-[150px]" 
            />
            <motion.div 
              animate={{ x: [0, -60, 40, 0], y: [0, 60, -30, 0], scale: [1, 0.9, 1.2, 1] }} 
              transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
              className="absolute bottom-[-20%] right-[-10%] w-[60vw] h-[60vw] rounded-full bg-amber-500/10 blur-[150px]" 
            />
            
            {/* Floating Data Particles */}
            {Array.from({ length: 25 }).map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-1 h-1 bg-brand-blue/50 rounded-full"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                }}
                animate={{
                  y: [0, -80, 0],
                  opacity: [0, 1, 0],
                }}
                transition={{
                  duration: Math.random() * 5 + 5,
                  repeat: Infinity,
                  ease: "linear",
                  delay: Math.random() * 5,
                }}
              />
            ))}
          </>
        )}
      </div>

      <div className="w-full max-w-4xl max-h-[90vh] bg-white/40 backdrop-blur-2xl rounded-[2rem] shadow-2xl overflow-hidden flex flex-col md:flex-row relative z-10 border border-white/60">
        
        {/* Left Side: Branding & Info */}
        <div className="md:w-5/12 bg-slate-900/95 text-white p-8 md:p-10 flex flex-col justify-between relative overflow-hidden">
          {/* Subtle pattern background */}
          <div className="absolute inset-0 opacity-[0.05]" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '24px 24px' }}></div>
          
          <div className="relative z-10">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 border border-white/20 text-[10px] uppercase tracking-widest font-bold mb-8 text-white backdrop-blur-md">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_8px_rgba(52,211,153,0.8)]"></span>
              System Online
            </div>
            <h1 className="font-serif text-3xl lg:text-4xl font-bold mb-4 leading-tight">Dhinakar<br />Command<br />Center</h1>
            <p className="text-slate-400 text-xs font-medium leading-relaxed max-w-sm mt-4">Secure, authenticated access to the central database and live analytics infrastructure.</p>
          </div>

          <div className="relative z-10 space-y-4 mt-8 hidden md:block">
            <div className="flex items-center gap-4">
              <div className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center shrink-0">
                <ShieldCheck className="w-4 h-4 text-amber-400" />
              </div>
              <div>
                <h3 className="text-[10px] font-bold uppercase tracking-widest text-slate-300">End-to-End Encryption</h3>
                <p className="text-[10px] text-slate-500 font-medium mt-0.5">256-bit secure connection</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center shrink-0">
                <Server className="w-4 h-4 text-amber-400" />
              </div>
              <div>
                <h3 className="text-[10px] font-bold uppercase tracking-widest text-slate-300">Live Database Sync</h3>
                <p className="text-[10px] text-slate-500 font-medium mt-0.5">Real-time inventory changes</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side: Login Form */}
        <div className="md:w-7/12 p-8 md:p-10 flex flex-col justify-center bg-white/50 relative">
          <div className="w-full max-w-sm mx-auto">
            <div className="w-12 h-12 bg-blue-50/80 text-blue-600 rounded-xl flex items-center justify-center mb-6 border border-blue-100/50 shadow-inner">
              <KeyRound className="w-5 h-5" />
            </div>
            
            <h2 className="font-serif text-2xl font-bold text-slate-900 mb-1">Admin Login</h2>
            <p className="text-slate-500 font-medium text-xs mb-8">Enter your master credentials to proceed.</p>

            {error && (
              <div className="bg-red-50/80 text-red-600 text-[11px] font-bold p-3 rounded-lg mb-5 border border-red-100 flex items-center gap-2 animate-in slide-in-from-top-2">
                <div className="w-1.5 h-1.5 rounded-full bg-red-500 shrink-0"></div>
                {error}
              </div>
            )}

            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-1">
                <label className="text-[9px] font-bold text-slate-400 uppercase tracking-widest ml-1">Admin Username</label>
                <input 
                  type="text" 
                  value={username} 
                  onChange={e => setUsername(e.target.value)} 
                  required 
                  placeholder="admin"
                  className="w-full px-4 py-3 rounded-xl border border-white/60 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 outline-none transition-all font-medium text-slate-900 bg-white/70 backdrop-blur-md focus:bg-white placeholder:text-slate-300 shadow-sm text-sm" 
                />
              </div>
              
              <div className="space-y-1">
                <label className="text-[9px] font-bold text-slate-400 uppercase tracking-widest ml-1">Master Password</label>
                <input 
                  type="password" 
                  value={password} 
                  onChange={e => setPassword(e.target.value)} 
                  required 
                  placeholder="••••••••"
                  className="w-full px-4 py-3 rounded-xl border border-white/60 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 outline-none transition-all font-bold text-slate-900 bg-white/70 backdrop-blur-md focus:bg-white placeholder:text-slate-300 shadow-sm text-sm" 
                />
              </div>

              <button 
                disabled={loading} 
                className="w-full py-3.5 mt-2 bg-slate-900 text-white font-bold uppercase tracking-[0.1em] text-[10px] rounded-xl hover:bg-blue-600 transition-all shadow-lg hover:shadow-blue-600/30 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2 group"
              >
                {loading ? (
                  <span className="flex items-center gap-2">
                    <span className="w-3 h-3 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                    Authenticating...
                  </span>
                ) : (
                  <>
                    Initialize Session
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </>
                )}
              </button>
            </form>
            
            <div className="mt-8 flex items-center justify-center gap-2 text-[9px] font-bold text-slate-400 uppercase tracking-widest">
              <Lock className="w-2.5 h-2.5" />
              Restricted Area • Authorized Personnel Only
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
