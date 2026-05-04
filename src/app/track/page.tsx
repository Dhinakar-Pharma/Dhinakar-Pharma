"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { Package, Truck, Home, Search, AlertCircle } from "lucide-react";

function TrackOrderContent() {
  const searchParams = useSearchParams();
  const [orderId, setOrderId] = useState(searchParams.get("orderId") || "");
  const [email, setEmail] = useState(searchParams.get("email") || "");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [order, setOrder] = useState<any>(null);

  useEffect(() => {
    if (orderId && email) {
      handleTrack();
    }
  }, []);

  const handleTrack = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!orderId || !email) {
      setError("Please provide both Order ID and Email address.");
      return;
    }
    
    setLoading(true);
    setError("");
    setOrder(null);
    
    try {
      const res = await fetch("/api/track", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ orderId, email })
      });
      const data = await res.json();
      
      if (!res.ok) throw new Error(data.error);
      
      setOrder(data);
    } catch (err: any) {
      setError(err.message || "Could not find your order. Please check your details.");
    } finally {
      setLoading(false);
    }
  };

  const statusMap: any = {
    "PROCESSING": { step: 1, text: "Order Processing" },
    "SHIPPED": { step: 2, text: "Dispatched & In Transit" },
    "DELIVERED": { step: 3, text: "Delivered Successfully" }
  };

  const currentStep = order ? (statusMap[order.fulfillmentStatus]?.step || 1) : 0;

  return (
    <div className="bg-slate-50 flex flex-col min-h-[calc(100vh-200px)]">
      <div className="flex-1 pt-12 pb-16 px-4 flex flex-col items-center">
        
        <div className="w-full max-w-3xl text-center mb-10">
          <h1 className="font-serif text-4xl md:text-5xl font-bold text-slate-900 tracking-tight">Track Your Order</h1>
          <p className="text-slate-500 mt-4 max-w-xl mx-auto font-medium leading-relaxed">Enter your tracking details below to see the real-time status of your pharmaceutical delivery.</p>
        </div>

        <div className="w-full max-w-3xl bg-white rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-100 overflow-hidden">
          {/* Search Form */}
          <div className="p-6 sm:p-10 border-b border-slate-100 bg-slate-50/50">
            <form onSubmit={handleTrack} className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1">
                <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-widest mb-2">Order ID</label>
                <input 
                  type="text" 
                  placeholder="e.g. clx89..." 
                  value={orderId} 
                  onChange={(e) => setOrderId(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-brand-blue focus:ring-1 outline-none font-mono text-sm"
                />
              </div>
              <div className="flex-1">
                <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-widest mb-2">Email Address</label>
                <input 
                  type="email" 
                  placeholder="john@example.com" 
                  value={email} 
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-brand-blue focus:ring-1 outline-none font-medium text-sm"
                />
              </div>
              <div className="sm:pt-6 flex items-end">
                <button 
                  type="submit" 
                  disabled={loading}
                  className="w-full sm:w-auto px-8 py-3 bg-brand-blue text-white rounded-xl font-bold text-sm tracking-widest uppercase hover:bg-brand-blue-dark transition-colors disabled:opacity-70 flex items-center justify-center gap-2 h-[46px]"
                >
                  {loading ? <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : <><Search className="w-4 h-4" /> Track</>}
                </button>
              </div>
            </form>
            {error && (
              <div className="mt-4 p-4 bg-red-50 border border-red-100 text-red-600 rounded-xl flex items-center gap-3 text-sm font-bold animate-in fade-in">
                <AlertCircle className="w-5 h-5" /> {error}
              </div>
            )}
          </div>

          {/* Results Area */}
          {order && (
            <div className="p-6 sm:p-10 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div className="flex flex-col md:flex-row justify-between gap-6 mb-12">
                <div>
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Order Details</p>
                  <p className="font-mono text-lg font-bold text-brand-blue mt-1">#{order.id.slice(-8).toUpperCase()}</p>
                  <p className="text-sm font-medium text-slate-500 mt-1">Placed on {new Date(order.createdAt).toLocaleDateString('en-IN', { month: 'long', day: 'numeric', year: 'numeric' })}</p>
                </div>
                <div className="md:text-right">
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Shipping To</p>
                  <p className="font-bold text-slate-800 mt-1">{order.customerName}</p>
                  <p className="text-sm font-medium text-slate-500 max-w-[200px] md:ml-auto leading-relaxed">{order.shippingAddress}</p>
                </div>
              </div>

              {/* Progress Tracker */}
              <div className="relative mb-16 px-4">
                <div className="absolute top-1/2 left-8 right-8 h-1 bg-slate-100 -translate-y-1/2 z-0 rounded-full" />
                <div className="absolute top-1/2 left-8 h-1 bg-brand-blue -translate-y-1/2 z-0 rounded-full transition-all duration-1000 ease-out" style={{ width: currentStep === 1 ? '0%' : currentStep === 2 ? '50%' : 'calc(100% - 4rem)' }} />
                
                <div className="relative z-10 flex justify-between">
                  {/* Step 1 */}
                  <div className="flex flex-col items-center gap-3">
                    <div className={`w-14 h-14 rounded-full border-4 border-white flex items-center justify-center shadow-lg transition-colors duration-500 ${currentStep >= 1 ? 'bg-brand-blue text-white' : 'bg-slate-100 text-slate-400'}`}>
                      <Package className="w-6 h-6" />
                    </div>
                    <span className={`text-[11px] uppercase tracking-widest font-bold ${currentStep >= 1 ? 'text-slate-900' : 'text-slate-400'}`}>Processing</span>
                  </div>
                  
                  {/* Step 2 */}
                  <div className="flex flex-col items-center gap-3">
                    <div className={`w-14 h-14 rounded-full border-4 border-white flex items-center justify-center shadow-lg transition-colors duration-500 delay-150 ${currentStep >= 2 ? 'bg-brand-blue text-white' : 'bg-slate-100 text-slate-400'}`}>
                      <Truck className="w-6 h-6" />
                    </div>
                    <span className={`text-[11px] uppercase tracking-widest font-bold ${currentStep >= 2 ? 'text-slate-900' : 'text-slate-400'}`}>Dispatched</span>
                  </div>
                  
                  {/* Step 3 */}
                  <div className="flex flex-col items-center gap-3">
                    <div className={`w-14 h-14 rounded-full border-4 border-white flex items-center justify-center shadow-lg transition-colors duration-500 delay-300 ${currentStep >= 3 ? 'bg-brand-blue text-white' : 'bg-slate-100 text-slate-400'}`}>
                      <Home className="w-6 h-6" />
                    </div>
                    <span className={`text-[11px] uppercase tracking-widest font-bold ${currentStep >= 3 ? 'text-slate-900' : 'text-slate-400'}`}>Delivered</span>
                  </div>
                </div>
              </div>

              {/* Items List */}
              <div>
                <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest border-b border-slate-100 pb-3 mb-4">Items in Shipment</h3>
                <div className="space-y-4">
                  {order.items.map((item: any) => (
                    <div key={item.id} className="flex items-center gap-4 bg-slate-50 p-4 rounded-xl border border-slate-100">
                      <div className="w-16 h-16 bg-white rounded-xl p-2 shrink-0 border border-slate-200">
                        <img src={item.product.images?.[0] || "/product-placeholder.png"} alt={item.product.name} className="w-full h-full object-contain mix-blend-multiply" />
                      </div>
                      <div className="flex-1">
                        <p className="font-bold text-sm text-slate-900">{item.product.name}</p>
                        <p className="text-xs text-slate-500 font-bold mt-1 uppercase tracking-widest">Qty: {item.quantity}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-brand-blue text-sm">₹{item.priceAtPurchase}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-6 flex justify-between items-center border-t border-slate-100 pt-6">
                  <span className="font-bold text-slate-500 uppercase tracking-widest text-[11px]">Total Amount Paid</span>
                  <span className="font-bold text-slate-900 text-2xl">₹{order.totalAmount}</span>
                </div>
              </div>

            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default function TrackOrderPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-slate-50 flex items-center justify-center"><div className="w-10 h-10 border-4 border-brand-blue border-t-transparent rounded-full animate-spin" /></div>}>
      <TrackOrderContent />
    </Suspense>
  );
}
