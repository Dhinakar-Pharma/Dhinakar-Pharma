"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Minus, Plus, Trash2, ShoppingBag, CreditCard, CheckCircle2, XCircle, Package, Truck, Home, Clock } from "lucide-react";
import { useCartStore } from "@/store/cartStore";
import Script from "next/script";

type CheckoutResult = { status: "idle" | "success" | "failed"; orderId?: string; error?: string; timestamp?: string };

export default function CartSidebar() {
  const { items, isOpen, setIsOpen, removeItem, updateQuantity, getTotalPrice, clearCart } = useCartStore();
  const [showCheckout, setShowCheckout] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "", phone: "", address: "", doctor: "" });
  const [checkoutResult, setCheckoutResult] = useState<CheckoutResult>({ status: "idle" });
  
  const [discountType, setDiscountType] = useState<"none" | "new" | "returning">("none");
  const [isCheckingEmail, setIsCheckingEmail] = useState(false);

  const subtotal = getTotalPrice();
  let discountAmount = 0;
  if (discountType === "new") discountAmount = subtotal * 0.20;
  else if (discountType === "returning") discountAmount = subtotal * 0.15;
  const finalPrice = subtotal - discountAmount;

  useEffect(() => {
    const checkEmail = setTimeout(async () => {
      if (!formData.email || !formData.email.includes("@")) {
        setDiscountType("none");
        return;
      }
      
      setIsCheckingEmail(true);
      try {
        const res = await fetch("/api/customer-status", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email: formData.email })
        });
        const data = await res.json();
        
        if (data.isReturningCustomer) {
          setDiscountType("returning");
        } else {
          setDiscountType("new");
        }
      } catch (error) {
        console.error(error);
        setDiscountType("none");
      } finally {
        setIsCheckingEmail(false);
      }
    }, 600);

    return () => clearTimeout(checkEmail);
  }, [formData.email]);

  const handlePayment = async () => {
    if (!formData.name || !formData.email || !formData.phone || !formData.doctor || !formData.address) {
      alert("Please fill in your name, email, phone, prescribing doctor, and address.");
      return;
    }
    
    setIsProcessing(true);

    try {
      const formattedItems = items.map(item => ({ productId: item.id, quantity: item.quantity }));

      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          items: formattedItems,
          customerName: formData.name,
          customerEmail: formData.email,
          customerPhone: formData.phone,
          shippingAddress: formData.address,
          prescribingDoctor: formData.doctor
        })
      });
      const data = await res.json();

      if (!res.ok) throw new Error(data.error);

      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID, 
        amount: data.amount,
        currency: "INR",
        name: "Dhinakar Pharma",
        description: `Order for ${items.length} product(s)`,
        order_id: data.orderId, 
        handler: async function (response: any) {
          const verifyRes = await fetch("/api/checkout/verify", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_order_id: response.razorpay_order_id,
              razorpay_signature: response.razorpay_signature,
              dbOrderId: data.dbOrderId 
            })
          });
          const verifyData = await verifyRes.json();
          if (verifyData.success) {
            const now = new Date().toLocaleString('en-IN', { dateStyle: 'medium', timeStyle: 'short' });
            setCheckoutResult({ status: "success", orderId: data.dbOrderId, timestamp: now });
            setShowCheckout(false);
            clearCart();
          } else {
            setCheckoutResult({ status: "failed", error: verifyData.error || "Signature mismatch" });
          }
        },
        prefill: { name: formData.name, email: formData.email, contact: formData.phone },
        theme: { color: "#1B3F8B" }
      };

      const rzp1 = new (window as any).Razorpay(options);
      rzp1.on('payment.failed', function (response: any) {
        setCheckoutResult({ status: "failed", error: response.error.description });
      });
      rzp1.open();

    } catch (error: any) {
      console.error(error);
      setCheckoutResult({ status: "failed", error: error.message || "Something went wrong" });
    } finally {
      setIsProcessing(false);
    }
  };

  const closeSidebar = () => {
    setIsOpen(false);
    setTimeout(() => {
      setShowCheckout(false);
      if (checkoutResult.status === "success") {
        setCheckoutResult({ status: "idle" });
      }
    }, 300);
  };

  return (
    <>
      <Script src="https://checkout.razorpay.com/v1/checkout.js" />
      
      {/* Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-[60]"
            onClick={closeSidebar}
          />
        )}
      </AnimatePresence>

      {/* Sidebar Cart */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }} transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 h-full w-full max-w-md bg-white shadow-2xl z-[70] flex flex-col"
          >
            <div className="flex items-center justify-between p-6 border-b border-slate-100">
              <h2 className="font-serif font-bold text-2xl flex items-center gap-3">
                <ShoppingBag className="text-brand-blue w-6 h-6" /> Your Cart
              </h2>
              <button onClick={closeSidebar} className="p-2 text-slate-400 hover:text-slate-800 transition-colors bg-slate-50 rounded-full">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex-grow overflow-y-auto p-6 space-y-6 bg-slate-50/50">
              {items.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-slate-400 space-y-4">
                  <ShoppingBag className="w-16 h-16 opacity-20" />
                  <p className="font-medium">Your scientific cart is empty.</p>
                </div>
              ) : (
                items.map(item => (
                  <div key={item.id} className="flex gap-4 bg-white p-4 rounded-2xl shadow-sm border border-slate-100 relative">
                    <button onClick={() => removeItem(item.id)} className="absolute top-4 right-4 text-slate-300 hover:text-red-500 transition-colors">
                      <Trash2 className="w-4 h-4" />
                    </button>
                    <div className="w-20 h-20 bg-slate-50 rounded-xl flex items-center justify-center p-2 shrink-0">
                      <img src={item.image} alt={item.name} className="w-full h-full object-contain mix-blend-multiply" />
                    </div>
                    <div className="flex-grow pr-6">
                      <h3 className="font-bold text-slate-800 text-sm">{item.name}</h3>
                      <p className="text-brand-blue font-bold mt-1">₹{item.price}</p>
                      
                      <div className="flex items-center gap-3 mt-3">
                        <div className="flex items-center border border-slate-200 rounded-full overflow-hidden">
                          <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="px-2 py-1 bg-slate-50 hover:bg-slate-100 text-slate-600"><Minus className="w-3 h-3" /></button>
                          <span className="w-8 text-center text-xs font-bold">{item.quantity}</span>
                          <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="px-2 py-1 bg-slate-50 hover:bg-slate-100 text-slate-600"><Plus className="w-3 h-3" /></button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {items.length > 0 && (
              <div className="p-6 border-t border-slate-100 bg-white">
                <div className="flex items-center justify-between mb-6">
                  <span className="text-slate-500 font-bold uppercase tracking-widest text-xs">Total Amount</span>
                  <span className="text-2xl font-bold text-brand-blue">₹{subtotal}</span>
                </div>
                
                <button 
                  onClick={() => setShowCheckout(true)}
                  className="w-full py-4 bg-brand-blue text-white font-bold uppercase tracking-widest text-[11px] rounded-xl hover:bg-brand-blue-dark transition-colors shadow-lg shadow-brand-blue/20"
                >
                  Proceed to Checkout
                </button>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Checkout Modal Inside Sidebar logic */}
      <AnimatePresence>
        {showCheckout && isOpen && checkoutResult.status === "idle" && (
          <motion.div 
            initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }} transition={{ type: "tween", duration: 0.3 }}
            className="fixed top-0 right-0 h-full w-full max-w-md bg-white shadow-2xl z-[80] flex flex-col"
          >
            <div className="px-6 py-6 border-b border-slate-100 flex items-center gap-4 bg-slate-50/50">
              <button onClick={() => setShowCheckout(false)} className="p-2 bg-white rounded-full shadow-sm text-slate-400 hover:text-slate-700">
                <X className="w-4 h-4" />
              </button>
              <h3 className="font-serif font-bold text-xl text-slate-900">Delivery Details</h3>
            </div>

            <div className="p-6 flex-grow overflow-y-auto space-y-5">
              {/* Upfront Advertisement Banner */}
              {discountType === "none" && (
                <div className="bg-gradient-to-r from-brand-blue/10 to-brand-blue/5 border border-brand-blue/20 rounded-xl p-4 shadow-sm">
                  <div className="flex items-center gap-2 text-brand-blue font-bold text-sm mb-1.5">
                    <span className="text-lg">🎁</span> Unlock Your Discount
                  </div>
                  <p className="text-slate-600 text-xs leading-relaxed font-medium">
                    Enjoy <span className="font-bold text-brand-blue">20% OFF</span> for new customers or <span className="font-bold text-brand-blue">15% OFF</span> if you've ordered before! Enter your email address below to automatically apply your savings.
                  </p>
                </div>
              )}

              <div>
                <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-widest mb-2">Full Name</label>
                <input type="text" placeholder="John Doe" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-brand-blue focus:ring-1 outline-none transition-all font-medium text-slate-900" />
              </div>
              <div>
                <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-widest mb-2">Email Address *</label>
                <div className="relative">
                  <input 
                    type="email" 
                    placeholder="john@example.com" 
                    value={formData.email} 
                    onChange={(e) => setFormData({...formData, email: e.target.value})} 
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-brand-blue focus:ring-1 outline-none transition-all font-medium text-slate-900 pr-10" 
                  />
                  {isCheckingEmail && (
                    <div className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 border-2 border-brand-blue border-t-transparent rounded-full animate-spin" />
                  )}
                </div>
                
                {/* Discount Banners */}
                <AnimatePresence mode="wait">
                  {discountType === "new" && (
                    <motion.div initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -5 }} className="mt-2 bg-green-50 text-green-700 px-3 py-2 rounded-lg text-[11px] font-bold flex items-center gap-2 border border-green-100">
                      <span>🎉 20% Welcome Discount Applied!</span>
                    </motion.div>
                  )}
                  {discountType === "returning" && (
                    <motion.div initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -5 }} className="mt-2 bg-brand-blue/10 text-brand-blue px-3 py-2 rounded-lg text-[11px] font-bold flex items-center gap-2 border border-brand-blue/20">
                      <span>👋 Welcome back! 15% Loyalty Discount Applied!</span>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
              <div>
                <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-widest mb-2">Phone Number</label>
                <input type="tel" placeholder="+91 98765 43210" value={formData.phone} onChange={(e) => setFormData({...formData, phone: e.target.value})} className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-brand-blue focus:ring-1 outline-none transition-all font-medium text-slate-900" />
              </div>
              <div>
                <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-widest mb-2">Prescribing Doctor *</label>
                <input type="text" placeholder="Dr. Smith" value={formData.doctor} onChange={(e) => setFormData({...formData, doctor: e.target.value})} className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-brand-blue focus:ring-1 outline-none transition-all font-medium text-slate-900" />
              </div>
              <div>
                <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-widest mb-2">Full Shipping Address</label>
                <textarea rows={3} placeholder="123 Pharma Street, Medical City, 400001" value={formData.address} onChange={(e) => setFormData({...formData, address: e.target.value})} className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-brand-blue focus:ring-1 outline-none transition-all font-medium text-slate-900 resize-none" />
              </div>
            </div>

            <div className="p-6 border-t border-slate-100 bg-white">
              {discountType !== "none" && (
                <div className="flex items-center justify-between mb-4">
                  <span className="text-slate-500 font-bold uppercase tracking-widest text-[10px]">Discount Applied</span>
                  <span className="text-green-600 font-bold">- ₹{discountAmount.toFixed(2)}</span>
                </div>
              )}
              <button 
                onClick={handlePayment} 
                disabled={isProcessing}
                className="w-full flex items-center justify-center gap-3 px-6 py-4 bg-brand-blue text-white rounded-xl font-bold uppercase tracking-[0.1em] text-[12px] shadow-lg shadow-brand-blue/20 hover:bg-brand-blue-dark transition-all disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {isProcessing ? (
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  <>
                    <CreditCard className="w-4 h-4" />
                    Pay ₹{finalPrice.toFixed(2)}
                  </>
                )}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Result Dialog Overlay */}
      <AnimatePresence>
        {checkoutResult.status !== "idle" && (
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 bg-slate-900/60 backdrop-blur-md z-[100] flex items-center justify-center p-4"
          >
            <motion.div 
              initial={{ scale: 0.9, opacity: 0, y: 20 }} animate={{ scale: 1, opacity: 1, y: 0 }} exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="bg-white rounded-3xl shadow-2xl w-full max-w-lg overflow-hidden flex flex-col"
            >
              {checkoutResult.status === "failed" ? (
                <div className="p-10 flex flex-col items-center text-center">
                  <div className="w-20 h-20 bg-red-50 text-red-500 rounded-full flex items-center justify-center mb-6">
                    <XCircle className="w-10 h-10" />
                  </div>
                  <h2 className="font-serif font-bold text-3xl text-slate-900 mb-2">Payment Failed</h2>
                  <p className="text-slate-500 mb-8">{checkoutResult.error}</p>
                  <button onClick={() => setCheckoutResult({ status: "idle" })} className="px-8 py-4 bg-brand-blue text-white rounded-xl font-bold uppercase tracking-widest text-[11px] hover:bg-brand-blue-dark w-full">
                    Try Again
                  </button>
                </div>
              ) : (
                <div className="p-8 sm:p-10 flex flex-col relative">
                  <button onClick={closeSidebar} className="absolute top-6 right-6 p-2 text-slate-400 hover:bg-slate-50 rounded-full">
                    <X className="w-5 h-5" />
                  </button>
                  
                  <div className="flex items-center gap-5 mb-8 border-b border-slate-100 pb-8">
                    <div className="w-16 h-16 bg-[#386641]/10 text-[#386641] rounded-2xl flex items-center justify-center shrink-0">
                      <CheckCircle2 className="w-8 h-8" />
                    </div>
                    <div>
                      <h2 className="font-serif font-bold text-2xl text-slate-900 leading-tight">Order Confirmed</h2>
                      <p className="text-sm font-medium text-slate-500 mt-1 uppercase tracking-widest">#{checkoutResult.orderId?.slice(-8)}</p>
                    </div>
                  </div>

                  <h3 className="font-bold text-sm text-slate-900 uppercase tracking-widest mb-6">Tracking Status</h3>
                  
                  <div className="relative pl-4 space-y-8 before:absolute before:inset-0 before:ml-[23px] before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-brand-blue before:via-slate-200 before:to-slate-200">
                    
                    {/* Step 1: Processing */}
                    <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                      <div className="flex items-center justify-center w-8 h-8 rounded-full border-4 border-white bg-brand-blue text-white shadow shrink-0 z-10">
                        <Package className="w-3.5 h-3.5" />
                      </div>
                      <div className="w-[calc(100%-3rem)] md:w-[calc(50%-2.5rem)] pl-4 md:pl-0 md:group-odd:pr-4 md:group-even:pl-4">
                        <div className="flex flex-col">
                          <span className="font-bold text-slate-900 text-[15px]">Order Processing</span>
                          <span className="text-xs text-brand-blue font-bold mt-0.5">{checkoutResult.timestamp}</span>
                        </div>
                      </div>
                    </div>

                    {/* Step 2: Dispatched */}
                    <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group">
                      <div className="flex items-center justify-center w-8 h-8 rounded-full border-4 border-white bg-slate-200 text-slate-400 shadow shrink-0 z-10">
                        <Truck className="w-3.5 h-3.5" />
                      </div>
                      <div className="w-[calc(100%-3rem)] md:w-[calc(50%-2.5rem)] pl-4 md:pl-0 md:group-odd:pr-4 md:group-even:pl-4">
                        <div className="flex flex-col">
                          <span className="font-bold text-slate-400 text-[15px]">Dispatched</span>
                          <span className="text-xs text-slate-300 font-medium mt-0.5">Pending Carrier Pickup</span>
                        </div>
                      </div>
                    </div>

                    {/* Step 3: Delivered */}
                    <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group">
                      <div className="flex items-center justify-center w-8 h-8 rounded-full border-4 border-white bg-slate-200 text-slate-400 shadow shrink-0 z-10">
                        <Home className="w-3.5 h-3.5" />
                      </div>
                      <div className="w-[calc(100%-3rem)] md:w-[calc(50%-2.5rem)] pl-4 md:pl-0 md:group-odd:pr-4 md:group-even:pl-4">
                        <div className="flex flex-col">
                          <span className="font-bold text-slate-400 text-[15px]">Delivered</span>
                          <span className="text-xs text-slate-300 font-medium mt-0.5">Expected in 3-5 days</span>
                        </div>
                      </div>
                    </div>

                  </div>

                  <button onClick={closeSidebar} className="mt-10 px-8 py-4 bg-slate-50 text-slate-600 rounded-xl font-bold uppercase tracking-widest text-[11px] hover:bg-slate-100 transition-colors w-full border border-slate-200">
                    Continue Browsing
                  </button>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
