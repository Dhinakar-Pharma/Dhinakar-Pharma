"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Package, CheckCircle2, Clock, MapPin, User, Stethoscope, Printer, Download, Search, LayoutDashboard, Pill, ChevronRight, TrendingUp, Plus, Trash2, Image as ImageIcon, BarChart3, IndianRupee, LogOut, ShieldAlert, KeyRound, UserPlus, Users, Shield, Tag, XCircle, Copy } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function AdminDashboard() {
  const router = useRouter();
  const [orders, setOrders] = useState<any[]>([]);
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  
  const [filterType, setFilterType] = useState("ALL");
  const [customDate, setCustomDate] = useState("");
  const [customMonth, setCustomMonth] = useState("");
  const [search, setSearch] = useState("");
  
  const [activeTab, setActiveTab] = useState("ORDERS");
  const [editingProduct, setEditingProduct] = useState<any>(null);
  const [formData, setFormData] = useState<any>({});

  const [ordersPage, setOrdersPage] = useState(1);
  const [abandonedPage, setAbandonedPage] = useState(1);
  const [productsPage, setProductsPage] = useState(1);
  const ITEMS_PER_PAGE = 6;
  const [adminUser, setAdminUser] = useState("Admin");

  const [adminList, setAdminList] = useState<any[]>([]);
  const [newAdmin, setNewAdmin] = useState({ email: '', username: '', password: '' });
  const [adminFormState, setAdminFormState] = useState({ loading: false, error: '', success: '' });

  const [coupons, setCoupons] = useState<any[]>([]);
  const [newCoupon, setNewCoupon] = useState({ name: '', discountPercentage: 10, maxUses: 1 });
  const [couponFormState, setCouponFormState] = useState({ loading: false, error: '', success: '' });
  const [copiedCode, setCopiedCode] = useState<string | null>(null);
  const [couponSearch, setCouponSearch] = useState('');
  const [couponPage, setCouponPage] = useState(1);
  const COUPONS_PER_PAGE = 5;

  const [doctors, setDoctors] = useState<any[]>([]);
  const [newDoctor, setNewDoctor] = useState({ name: '', codePrefix: '' });
  const [doctorFormState, setDoctorFormState] = useState({ loading: false, error: '', success: '' });

  const [confirmDeleteModal, setConfirmDeleteModal] = useState<{id: string, type: 'COUPON' | 'ADMIN' | 'DOCTOR', title: string, message: string} | null>(null);

  useEffect(() => {
    const match = document.cookie.match(/(?:^|; )admin_username=([^;]*)/);
    if (match && match[1]) setAdminUser(match[1]);
  }, []);

  useEffect(() => {
    setOrdersPage(1);
    setAbandonedPage(1);
  }, [filterType, customDate, customMonth, search]);

  const fetchOrders = async () => {
    try {
      const res = await fetch("/api/admin/orders");
      if (res.ok) {
        const data = await res.json();
        setOrders(data);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const fetchProducts = async () => {
    try {
      const res = await fetch("/api/admin/products");
      if (res.ok) {
        const data = await res.json();
        setProducts(data);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const fetchAdmins = async () => {
    try {
      const res = await fetch("/api/admin/users");
      if (res.ok) {
        const data = await res.json();
        setAdminList(data);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const fetchCoupons = async () => {
    try {
      const res = await fetch("/api/admin/coupons");
      if (res.ok) {
        const data = await res.json();
        setCoupons(data);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const fetchDoctors = async () => {
    try {
      const res = await fetch("/api/admin/doctors");
      if (res.ok) {
        const data = await res.json();
        setDoctors(data);
      }
    } catch (error) {}
  };

  useEffect(() => {
    Promise.all([fetchOrders(), fetchProducts(), fetchAdmins(), fetchCoupons(), fetchDoctors()]).finally(() => setLoading(false));
  }, []);

  const handleLogout = async () => {
    try {
      await fetch("/api/admin/logout", { method: "POST" });
      router.push("/admin/login");
      router.refresh();
    } catch (e) {
      console.error(e);
    }
  };

  const [confirmStatusModal, setConfirmStatusModal] = useState<{orderId: string, newStatus: string, customerName: string} | null>(null);
  const [statusUpdating, setStatusUpdating] = useState(false);

  const requestStatusUpdate = (orderId: string, status: string, customerName: string) => {
    setConfirmStatusModal({ orderId, newStatus: status, customerName });
  };

  const confirmUpdateStatus = async () => {
    if (!confirmStatusModal) return;
    setStatusUpdating(true);
    try {
      const res = await fetch("/api/admin/orders", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ orderId: confirmStatusModal.orderId, fulfillmentStatus: confirmStatusModal.newStatus })
      });
      if (res.ok) {
        await fetchOrders();
        setConfirmStatusModal(null);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setStatusUpdating(false);
    }
  };

  const updateStatus = async (orderId: string, status: string) => {
    requestStatusUpdate(orderId, status, "Unknown Customer");
  };

  const updateProductPrice = async (productId: string, price: number) => {
    try {
      const res = await fetch("/api/admin/products", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: productId, price })
      });
      if (res.ok) fetchProducts();
    } catch (error) {
      console.error(error);
    }
  };

  // --- ADMIN MANAGEMENT LOGIC ---
  const handleCreateAdmin = async (e: React.FormEvent) => {
    e.preventDefault();
    setAdminFormState({ loading: true, error: '', success: '' });
    try {
      const res = await fetch("/api/admin/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newAdmin)
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to create admin");
      
      setAdminFormState({ loading: false, error: '', success: 'Admin created successfully!' });
      setNewAdmin({ email: '', username: '', password: '' });
      fetchAdmins();
      setTimeout(() => setAdminFormState(prev => ({ ...prev, success: '' })), 3000);
    } catch (err: any) {
      setAdminFormState({ loading: false, error: err.message, success: '' });
    }
  };

  const requestDeleteAdmin = (id: string) => {
    setConfirmDeleteModal({
      id,
      type: 'ADMIN',
      title: 'Revoke Access',
      message: 'Are you sure you want to completely revoke access for this administrator?'
    });
  };

  const handleCreateCoupon = async (e: React.FormEvent) => {
    e.preventDefault();
    setCouponFormState({ loading: true, error: '', success: '' });
    try {
      const res = await fetch("/api/admin/coupons", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newCoupon)
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to create coupon");
      
      setCouponFormState({ loading: false, error: '', success: 'Coupon created successfully!' });
      setNewCoupon({ name: '', discountPercentage: 10, maxUses: 1 });
      fetchCoupons();
      setTimeout(() => setCouponFormState(prev => ({ ...prev, success: '' })), 3000);
    } catch (err: any) {
      setCouponFormState({ loading: false, error: err.message, success: '' });
    }
  };

  const handleToggleCoupon = async (id: string, isActive: boolean) => {
    try {
      const res = await fetch("/api/admin/coupons", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, isActive: !isActive })
      });
      if (res.ok) fetchCoupons();
    } catch (err) {}
  };

  const requestDeleteCoupon = (id: string) => {
    setConfirmDeleteModal({
      id,
      type: 'COUPON',
      title: 'Delete Campaign',
      message: 'Are you sure you want to permanently delete this discount campaign? This action cannot be undone.'
    });
  };

  const executeDelete = async () => {
    if (!confirmDeleteModal) return;
    
    if (confirmDeleteModal.type === 'COUPON') {
      try {
        const res = await fetch("/api/admin/coupons", {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ id: confirmDeleteModal.id })
        });
        if (res.ok) fetchCoupons();
      } catch (err) {}
    } else if (confirmDeleteModal.type === 'ADMIN') {
      try {
        const res = await fetch("/api/admin/users", {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ id: confirmDeleteModal.id })
        });
        if (res.ok) fetchAdmins();
      } catch (err) {}
    } else if (confirmDeleteModal.type === 'DOCTOR') {
      try {
        const res = await fetch("/api/admin/doctors", {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ id: confirmDeleteModal.id })
        });
        if (res.ok) fetchDoctors();
      } catch (err) {}
    }
    
    setConfirmDeleteModal(null);
  };

  const downloadCouponsCSV = () => {
    if (!coupons.length) return;

    // Headers
    const headers = ["ID", "Campaign Name", "Promo Code", "Discount Percentage", "Max Uses", "Current Uses", "Status", "Prescribing Doctor"];
    
    // Rows
    const rows = coupons.map(c => {
      let docName = "None";
      const parts = c.code.split('-');
      if (parts.length > 1) {
        const prefix = parts[0];
        const doctor = doctors.find(d => d.codePrefix === prefix);
        if (doctor) {
          docName = (!doctor.name.toLowerCase().startsWith('dr.') && !doctor.name.toLowerCase().startsWith('dr ')) 
            ? `Dr. ${doctor.name.trim()}` 
            : doctor.name.trim();
        }
      }

      return [
        c.id,
        `"${c.name}"`, 
        c.code,
        c.discountPercentage + "%",
        c.maxUses,
        c.uses,
        (c.uses >= c.maxUses) ? "Expired" : (c.isActive ? "Active" : "Disabled"),
        `"${docName}"`
      ].join(",");
    });

    const csvContent = [headers.join(","), ...rows].join("\n");
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `Dhinakar_Discount_Codes_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleCreateDoctor = async (e: React.FormEvent) => {
    e.preventDefault();
    setDoctorFormState({ loading: true, error: "", success: "" });
    try {
      const res = await fetch("/api/admin/doctors", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newDoctor)
      });
      const data = await res.json();
      if (res.ok) {
        setDoctorFormState({ loading: false, error: "", success: "Doctor added successfully!" });
        setNewDoctor({ name: '', codePrefix: '' });
        fetchDoctors();
        setTimeout(() => setDoctorFormState(prev => ({ ...prev, success: "" })), 3000);
      } else {
        setDoctorFormState({ loading: false, error: data.error || "Failed to add doctor", success: "" });
      }
    } catch (err) {
      setDoctorFormState({ loading: false, error: "Something went wrong", success: "" });
    }
  };

  const requestDeleteDoctor = (id: string) => {
    setConfirmDeleteModal({
      id,
      type: 'DOCTOR',
      title: 'Remove Doctor',
      message: 'Are you sure you want to permanently delete this doctor? Their prefix will no longer trigger auto-fills.'
    });
  };

  // --- NON-IT FORM BUILDER LOGIC ---
  const handleEditProduct = (product: any) => {
    setEditingProduct(product);
    setFormData({
      ...product,
      images: product.images || [],
      benefits: product.benefits || [],
      ingredients: product.ingredients || [],
      nutrition: product.nutrition || [],
      faq: product.faq || [],
    });
  };

  const handleArrayChange = (field: string, index: number, value: string) => {
    const newArr = [...(formData[field] || [])];
    newArr[index] = value;
    setFormData({ ...formData, [field]: newArr });
  };

  const handleObjectArrayChange = (field: string, index: number, key: string, value: string) => {
    const newArr = [...(formData[field] || [])];
    newArr[index] = { ...newArr[index], [key]: value };
    setFormData({ ...formData, [field]: newArr });
  };

  const addArrayItem = (field: string, defaultItem: any) => {
    setFormData({ ...formData, [field]: [...(formData[field] || []), defaultItem] });
  };

  const removeArrayItem = (field: string, index: number) => {
    const newArr = [...(formData[field] || [])];
    newArr.splice(index, 1);
    setFormData({ ...formData, [field]: newArr });
  };

  const handleImageUploadClick = () => {
    alert("Notice: Direct image uploading requires a Cloud Storage Bucket (like AWS S3 or Cloudinary) to be configured for Vercel deployments. For now, you can paste the file path (e.g., /nutrigra.jpg) directly into the image fields!");
  };

  const handleSaveProduct = async () => {
    try {
      const payload = {
        ...formData,
        images: formData.images.filter((img: string) => img.trim() !== ''),
        benefits: formData.benefits.filter((b: string) => b.trim() !== ''),
        ingredients: formData.ingredients.filter((i: string) => i.trim() !== ''),
      };
      
      const res = await fetch('/api/admin/products', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      if (res.ok) {
        setEditingProduct(null);
        fetchProducts();
      } else {
        alert("Failed to save product.");
      }
    } catch (err) {
      alert("Error saving product.");
    }
  };

  // --- FILTERS & ANALYTICS ---
  const filteredOrders = orders.filter(order => {
    let timeMatch = true;
    const orderDate = new Date(order.createdAt);
    const today = new Date();

    if (filterType === "TODAY") {
      timeMatch = orderDate.toDateString() === today.toDateString();
    } else if (filterType === "THIS_MONTH") {
      timeMatch = orderDate.getMonth() === today.getMonth() && orderDate.getFullYear() === today.getFullYear();
    } else if (filterType === "THIS_YEAR") {
      timeMatch = orderDate.getFullYear() === today.getFullYear();
    } else if (filterType === "CUSTOM_DATE" && customDate) {
      const selectedDate = new Date(customDate);
      timeMatch = orderDate.toDateString() === selectedDate.toDateString();
    } else if (filterType === "CUSTOM_MONTH" && customMonth) {
      const [year, month] = customMonth.split('-');
      timeMatch = orderDate.getFullYear() === parseInt(year) && orderDate.getMonth() === (parseInt(month) - 1);
    }
    
    const searchMatch = search === "" || 
                        order.customerName.toLowerCase().includes(search.toLowerCase()) || 
                        order.customerPhone.includes(search) || 
                        order.id.toLowerCase().includes(search.toLowerCase());
                        
    return timeMatch && searchMatch;
  });

  const exportToCSV = () => {
    const headers = ["Order ID", "Date", "Customer Name", "Email", "Phone", "Address", "Total Amount", "Fulfillment Status"];
    const rows = successfulOrders.map(order => [
      order.id,
      new Date(order.createdAt).toLocaleDateString('en-IN'),
      order.customerName,
      order.customerEmail,
      order.customerPhone,
      `"${order.shippingAddress.replace(/"/g, '""')}"`,
      order.totalAmount,
      order.fulfillmentStatus
    ]);
    const csvContent = "data:text/csv;charset=utf-8," + [headers.join(","), ...rows.map(e => e.join(","))].join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `dhinakar_orders_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const successfulOrders = filteredOrders.filter(o => o.paymentStatus === "SUCCESS");
  const abandonedOrders = filteredOrders.filter(o => o.paymentStatus !== "SUCCESS");

  const paginatedOrders = successfulOrders.slice((ordersPage - 1) * ITEMS_PER_PAGE, ordersPage * ITEMS_PER_PAGE);
  const paginatedAbandoned = abandonedOrders.slice((abandonedPage - 1) * ITEMS_PER_PAGE, abandonedPage * ITEMS_PER_PAGE);
  const paginatedProducts = products.slice((productsPage - 1) * ITEMS_PER_PAGE, productsPage * ITEMS_PER_PAGE);

  const totalRevenue = successfulOrders.reduce((sum, order) => sum + order.totalAmount, 0);
  const pendingFulfillments = successfulOrders.filter(o => o.fulfillmentStatus === "PROCESSING").length;
  
  const productCounts: Record<string, number> = {};
  successfulOrders.forEach(o => o.items.forEach((i: any) => {
    productCounts[i.product.name] = (productCounts[i.product.name] || 0) + i.quantity;
  }));
  const topSellingArr = Object.entries(productCounts).sort((a,b) => b[1] - a[1]);
  const topSellingProduct = topSellingArr.length > 0 ? topSellingArr[0] : null;

  // Reusable Date Filter UI
  const DateFilterUI = () => (
    <div className="flex flex-wrap items-center gap-3 bg-white p-1.5 border border-slate-200 rounded-xl shadow-sm">
      <select 
        value={filterType} 
        onChange={(e) => setFilterType(e.target.value)} 
        className="bg-transparent text-slate-700 text-sm font-bold px-3 py-2 outline-none cursor-pointer"
      >
        <option value="ALL">All Time</option>
        <option value="TODAY">Today</option>
        <option value="THIS_MONTH">This Month</option>
        <option value="THIS_YEAR">This Year</option>
        <option disabled>──────────</option>
        <option value="CUSTOM_DATE">Specific Date...</option>
        <option value="CUSTOM_MONTH">Specific Month...</option>
      </select>
      
      {filterType === 'CUSTOM_DATE' && (
        <div className="flex items-center gap-2 border-l border-slate-200 pl-3 pr-2">
          <input 
            type="date" 
            value={customDate} 
            onChange={(e) => setCustomDate(e.target.value)} 
            className="text-sm font-medium outline-none bg-slate-50 border border-slate-200 rounded-lg px-3 py-1.5 focus:border-brand-blue cursor-pointer"
          />
        </div>
      )}
      
      {filterType === 'CUSTOM_MONTH' && (
        <div className="flex items-center gap-2 border-l border-slate-200 pl-3 pr-2">
          <input 
            type="month" 
            value={customMonth} 
            onChange={(e) => setCustomMonth(e.target.value)} 
            className="text-sm font-medium outline-none bg-slate-50 border border-slate-200 rounded-lg px-3 py-1.5 focus:border-brand-blue cursor-pointer"
          />
        </div>
      )}
    </div>
  );

  const PaginationUI = ({ currentPage, totalItems, onPageChange }: { currentPage: number, totalItems: number, onPageChange: (page: number) => void }) => {
    const totalPages = Math.ceil(totalItems / ITEMS_PER_PAGE);
    if (totalPages <= 1) return null;
    return (
      <div className="flex flex-col sm:flex-row items-center justify-between px-6 py-4 border-t border-slate-200 bg-white gap-4">
        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
          Showing {(currentPage - 1) * ITEMS_PER_PAGE + 1} - {Math.min(currentPage * ITEMS_PER_PAGE, totalItems)} of {totalItems}
        </p>
        <div className="flex items-center gap-2 overflow-x-auto pb-1 sm:pb-0 max-w-full">
          {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
            <button
              key={page}
              onClick={() => onPageChange(page)}
              className={`w-8 h-8 shrink-0 flex items-center justify-center rounded-lg text-sm font-bold transition-all ${currentPage === page ? 'bg-brand-blue text-white shadow-md' : 'bg-white text-slate-500 hover:bg-slate-100 border border-slate-200'}`}
            >
              {page}
            </button>
          ))}
        </div>
      </div>
    );
  };

  if (loading) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center bg-slate-50">
        <div className="w-10 h-10 border-4 border-brand-blue border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="fixed inset-0 top-20 md:top-24 z-40 flex bg-slate-50 overflow-hidden">
      {/* Sidebar */}
      <div className="w-64 bg-white border-r border-slate-200 hidden lg:flex flex-col py-8 px-4 h-full shrink-0">
        <h2 className="font-serif text-2xl font-bold text-slate-900 mb-8 px-2">Workspace</h2>
        <nav className="flex flex-col gap-2">
          <button onClick={() => setActiveTab('ANALYTICS')} className={`flex items-center justify-between px-4 py-3 rounded-xl font-bold text-sm transition-all ${activeTab === 'ANALYTICS' ? 'bg-brand-blue text-white shadow-lg shadow-brand-blue/20' : 'text-slate-500 hover:bg-slate-100'}`}>
            <span className="flex items-center gap-3"><BarChart3 className="w-4 h-4" /> Analytics & Revenue</span>
            {activeTab !== 'ANALYTICS' && <ChevronRight className="w-4 h-4 opacity-50" />}
          </button>
          <button onClick={() => setActiveTab('ORDERS')} className={`flex items-center justify-between px-4 py-3 rounded-xl font-bold text-sm transition-all ${activeTab === 'ORDERS' ? 'bg-brand-blue text-white shadow-lg shadow-brand-blue/20' : 'text-slate-500 hover:bg-slate-100'}`}>
            <span className="flex items-center gap-3"><LayoutDashboard className="w-4 h-4" /> Orders Data</span>
            {activeTab !== 'ORDERS' && <ChevronRight className="w-4 h-4 opacity-50" />}
          </button>
          <button onClick={() => setActiveTab('PRODUCTS')} className={`flex items-center justify-between px-4 py-3 rounded-xl font-bold text-sm transition-all ${activeTab === 'PRODUCTS' ? 'bg-brand-blue text-white shadow-lg shadow-brand-blue/20' : 'text-slate-500 hover:bg-slate-100'}`}>
            <span className="flex items-center gap-3"><Pill className="w-4 h-4" /> Inventory Config</span>
            {activeTab !== 'PRODUCTS' && <ChevronRight className="w-4 h-4 opacity-50" />}
          </button>
          <button onClick={() => setActiveTab('ABANDONED_CARTS')} className={`flex items-center justify-between px-4 py-3 rounded-xl font-bold text-sm transition-all ${activeTab === 'ABANDONED_CARTS' ? 'bg-brand-blue text-white shadow-lg shadow-brand-blue/20' : 'text-slate-500 hover:bg-slate-100'}`}>
            <span className="flex items-center gap-3"><Trash2 className="w-4 h-4" /> Failed Orders</span>
            {activeTab !== 'ABANDONED_CARTS' && <ChevronRight className="w-4 h-4 opacity-50" />}
          </button>
          <div className="my-2 border-t border-slate-100"></div>
          <button onClick={() => setActiveTab('ADMINS')} className={`flex items-center justify-between px-4 py-3 rounded-xl font-bold text-sm transition-all ${activeTab === 'ADMINS' ? 'bg-brand-blue text-white shadow-lg shadow-brand-blue/20' : 'text-slate-500 hover:bg-slate-100'}`}>
            <span className="flex items-center gap-3"><Shield className="w-4 h-4" /> Admin Access</span>
            {activeTab !== 'ADMINS' && <ChevronRight className="w-4 h-4 opacity-50" />}
          </button>
          <button onClick={() => setActiveTab('COUPONS')} className={`flex items-center justify-between px-4 py-3 rounded-xl font-bold text-sm transition-all ${activeTab === 'COUPONS' ? 'bg-brand-blue text-white shadow-lg shadow-brand-blue/20' : 'text-slate-500 hover:bg-slate-100'}`}>
            <span className="flex items-center gap-3"><Tag className="w-4 h-4" /> Discount Codes</span>
            {activeTab !== 'COUPONS' && <ChevronRight className="w-4 h-4 opacity-50" />}
          </button>
          <button onClick={() => setActiveTab('DOCTORS')} className={`flex items-center justify-between px-4 py-3 rounded-xl font-bold text-sm transition-all ${activeTab === 'DOCTORS' ? 'bg-brand-blue text-white shadow-lg shadow-brand-blue/20' : 'text-slate-500 hover:bg-slate-100'}`}>
            <span className="flex items-center gap-3"><Stethoscope className="w-4 h-4" /> Doctors Config</span>
            {activeTab !== 'DOCTORS' && <ChevronRight className="w-4 h-4 opacity-50" />}
          </button>
        </nav>
        
        <div className="mt-auto pt-8 border-t border-slate-100 flex items-center gap-3 px-2">
          <div className="w-10 h-10 rounded-full bg-brand-blue/10 flex items-center justify-center shrink-0 border border-brand-blue/20">
            <span className="font-serif font-bold text-brand-blue text-lg leading-none">{adminUser.charAt(0).toUpperCase()}</span>
          </div>
          <div className="flex flex-col overflow-hidden">
            <span className="font-bold text-xs uppercase tracking-wider text-slate-900 truncate" title={adminUser}>
              {adminUser}
            </span>
            <span className="text-[9px] font-bold uppercase tracking-widest text-slate-400">
              Administrator
            </span>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 py-8 px-4 sm:px-8 w-full max-w-full overflow-y-auto overflow-x-hidden h-full pb-32">
        
        {/* MOBILE TABS */}
        <div className="block lg:hidden mb-6 w-full">
          <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2 ml-1">Dashboard Section</label>
          <div className="relative">
            <select
              value={activeTab}
              onChange={(e) => setActiveTab(e.target.value)}
              className="w-full appearance-none bg-white border border-slate-200 rounded-xl px-4 py-3.5 text-sm font-bold text-slate-700 focus:outline-none focus:ring-2 focus:ring-brand-blue/20 focus:border-brand-blue transition-all shadow-sm"
            >
              <option value="ANALYTICS">Analytics & Revenue</option>
              <option value="ORDERS">Orders Data</option>
              <option value="PRODUCTS">Inventory Config</option>
              <option value="ABANDONED_CARTS">Failed Orders</option>
              <option value="ADMINS">Admin Access</option>
              <option value="COUPONS">Discount Codes</option>
              <option value="DOCTORS">Doctors Config</option>
            </select>
            <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
              <ChevronRight className="w-4 h-4 rotate-90" />
            </div>
          </div>
        </div>

        {activeTab === 'ANALYTICS' && (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-6 mb-8 border-b border-slate-200 pb-8">
              <div>
                <h1 className="font-serif text-3xl font-bold text-slate-900">Revenue & Analytics</h1>
                <p className="text-slate-500 mt-1 font-medium text-sm">Real-time performance metrics and business intelligence.</p>
              </div>
              <DateFilterUI />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm flex flex-col justify-between">
                <div className="flex items-center justify-between mb-6">
                  <div className="w-12 h-12 rounded-full bg-blue-50 text-brand-blue flex items-center justify-center"><IndianRupee className="w-6 h-6" /></div>
                  <span className="text-[10px] font-bold text-blue-600 bg-blue-50 px-2 py-1 rounded-full uppercase tracking-widest border border-blue-100">Confirmed</span>
                </div>
                <div>
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Total Revenue</p>
                  <p className="text-4xl font-bold text-slate-900">₹{totalRevenue.toLocaleString()}</p>
                </div>
              </div>
              
              <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm flex flex-col justify-between">
                <div className="flex items-center justify-between mb-6">
                  <div className="w-12 h-12 rounded-full bg-amber-50 text-amber-600 flex items-center justify-center"><Package className="w-6 h-6" /></div>
                  <span className="text-[10px] font-bold text-amber-600 bg-amber-50 px-2 py-1 rounded-full uppercase tracking-widest border border-amber-100">Action Needed</span>
                </div>
                <div>
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Pending Fulfillments</p>
                  <p className="text-4xl font-bold text-amber-600">{pendingFulfillments}</p>
                </div>
              </div>
              
              <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm flex flex-col justify-between">
                <div className="flex items-center justify-between mb-6">
                  <div className="w-12 h-12 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center"><CheckCircle2 className="w-6 h-6" /></div>
                  <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-1 rounded-full uppercase tracking-widest border border-emerald-100">Best Seller</span>
                </div>
                <div className="overflow-hidden">
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Top Selling Product</p>
                  <p className="text-2xl font-bold text-slate-900 truncate">{topSellingProduct ? topSellingProduct[0] : "N/A"}</p>
                  {topSellingProduct && <p className="text-sm font-bold text-emerald-600 mt-2">{topSellingProduct[1]} units sold this period</p>}
                </div>
              </div>
            </div>
            
            <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm">
              <h3 className="font-bold text-slate-800 border-b border-slate-100 pb-4 mb-4">Analytics Summary</h3>
              <div className="text-slate-600 text-sm leading-relaxed max-w-2xl">
                <p className="mb-2">Your current filter is isolating <strong className="text-slate-900">{successfulOrders.length} successful orders</strong>.</p>
                <p>To view a different time period or select a custom date (like a specific day from last month), use the unified calendar filter at the top right of this screen. The analytics cards will instantly recalculate.</p>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'ORDERS' && (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-6 mb-8">
              <div>
                <h1 className="font-serif text-3xl font-bold text-slate-900">Orders Data</h1>
                <p className="text-slate-500 mt-1 font-medium text-sm">Raw database view of incoming purchases and patient details.</p>
              </div>
              <div className="flex flex-wrap items-center gap-3">
                <div className="relative w-full sm:w-auto">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input type="text" placeholder="Search name, phone, or ID..." value={search} onChange={(e) => setSearch(e.target.value)} className="w-full sm:w-64 pl-10 pr-4 py-2 border border-slate-200 rounded-xl text-sm font-medium focus:border-brand-blue outline-none" />
                </div>
                <DateFilterUI />
                <button onClick={exportToCSV} className="flex items-center gap-2 bg-emerald-50 text-emerald-700 border border-emerald-200 px-4 py-2 rounded-xl font-bold text-sm hover:bg-emerald-100 transition-colors h-[42px] whitespace-nowrap">
                  <Download className="w-4 h-4" /> Export CSV
                </button>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden w-full">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse min-w-[1000px]">
                  <thead>
                    <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 text-[11px] uppercase tracking-widest font-bold">
                      <th className="p-5 whitespace-nowrap">Order ID & Date</th>
                      <th className="p-5 whitespace-nowrap">Items Purchased</th>
                      <th className="p-5 whitespace-nowrap w-[80px] text-center">Qty</th>
                      <th className="p-5 whitespace-nowrap min-w-[150px]">Customer Info</th>
                      <th className="p-5 whitespace-nowrap min-w-[200px]">Shipping Address</th>
                      <th className="p-5 whitespace-nowrap">Medical Details</th>
                      <th className="p-5 whitespace-nowrap">Payment</th>
                      <th className="p-5 whitespace-nowrap">Fulfillment Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {paginatedOrders.map((order) => (
                      <tr key={order.id} className="hover:bg-slate-50/50 transition-colors">
                        <td className="p-5 align-top">
                          <div className="flex flex-col gap-1">
                            <span className="font-mono text-xs font-bold text-brand-blue bg-brand-blue/10 px-2 py-1 rounded inline-block w-fit">
                              #{order.id.slice(-8).toUpperCase()}
                            </span>
                            <span className="text-xs text-slate-500 mt-2 font-medium flex items-center gap-1">
                              <Clock className="w-3 h-3" />
                              {new Date(order.createdAt).toLocaleDateString('en-IN', { month: 'short', day: 'numeric', year: 'numeric' })}
                            </span>
                          </div>
                        </td>
                        <td className="p-5 align-top">
                          <div className="flex flex-col gap-3">
                            {order.items.map((item: any) => (
                              <div key={item.id} className="flex items-center gap-2 text-sm font-bold text-slate-800">
                                <Package className="w-4 h-4 text-slate-400" />
                                {item.product.name}
                              </div>
                            ))}
                          </div>
                        </td>
                        <td className="p-5 align-top text-center">
                          <div className="flex flex-col gap-3">
                            {order.items.map((item: any) => (
                              <div key={item.id} className="text-sm font-bold text-slate-600 bg-slate-100 rounded-lg px-2 py-0.5 mx-auto w-fit">
                                {item.quantity}
                              </div>
                            ))}
                          </div>
                        </td>
                        <td className="p-5 align-top">
                          <div className="flex items-start gap-2">
                            <User className="w-4 h-4 text-slate-400 mt-0.5 shrink-0" />
                            <div>
                              <p className="font-bold text-slate-800 text-sm">{order.customerName}</p>
                              <p className="text-xs text-slate-500">{order.customerEmail}</p>
                              <p className="text-xs text-slate-500">{order.customerPhone}</p>
                            </div>
                          </div>
                        </td>
                        <td className="p-5 align-top">
                          <div className="flex items-start gap-2">
                            <MapPin className="w-4 h-4 text-slate-400 mt-0.5 shrink-0" />
                            <p className="text-xs text-slate-600 leading-relaxed max-w-[220px]">{order.shippingAddress}</p>
                          </div>
                        </td>
                        <td className="p-5 align-top">
                          <div className="flex items-start gap-2">
                            <Stethoscope className="w-4 h-4 text-brand-blue mt-0.5 shrink-0" />
                            <div>
                              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Prescribing Doctor</p>
                              <p className="font-bold text-slate-800 text-sm mt-0.5">{order.prescribingDoctor || "N/A"}</p>
                            </div>
                          </div>
                        </td>
                        <td className="p-5 align-top">
                          <div className="flex flex-col gap-2">
                            <span className="font-bold text-slate-900">₹{order.totalAmount}</span>
                            {order.paymentStatus === "SUCCESS" ? (
                              <span className="inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-widest text-green-700 bg-green-100 px-2 py-1 rounded w-fit">
                                <CheckCircle2 className="w-3 h-3" /> Paid
                              </span>
                            ) : order.paymentStatus === "FAILED" ? (
                              <span className="inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-widest text-red-700 bg-red-100 px-2 py-1 rounded w-fit">
                                Failed
                              </span>
                            ) : (
                              <span className="inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-widest text-amber-700 bg-amber-100 px-2 py-1 rounded w-fit">
                                Pending
                              </span>
                            )}
                            {order.razorpayOrderId && (
                              <span className="text-[10px] text-slate-400 font-mono mt-1 break-all w-[150px] inline-block">
                                {order.razorpayOrderId}
                              </span>
                            )}
                          </div>
                        </td>
                        <td className="p-5 align-top">
                          <div className="flex flex-col gap-3">
                            <select 
                              value={order.fulfillmentStatus}
                              onChange={(e) => {
                                if (e.target.value !== order.fulfillmentStatus) {
                                  requestStatusUpdate(order.id, e.target.value, order.customerName);
                                }
                              }}
                              className={`text-sm font-bold px-3 py-2 rounded-xl outline-none border-2 transition-colors cursor-pointer w-full max-w-[160px]
                                ${order.fulfillmentStatus === 'PROCESSING' ? 'border-amber-200 bg-amber-50 text-amber-700' : ''}
                                ${order.fulfillmentStatus === 'SHIPPED' ? 'border-blue-200 bg-blue-50 text-blue-700' : ''}
                                ${order.fulfillmentStatus === 'DELIVERED' ? 'border-green-200 bg-green-50 text-green-700' : ''}
                              `}
                            >
                              <option value="PROCESSING">⏳ Processing</option>
                              <option value="SHIPPED">🚚 Shipped</option>
                              <option value="DELIVERED">✅ Delivered</option>
                            </select>
                            
                            <button 
                              onClick={() => window.open(`/admin/print/${order.id}`, '_blank')}
                              className="flex items-center justify-center gap-2 text-[10px] font-bold uppercase tracking-[0.1em] bg-white border-2 border-slate-200 text-slate-600 px-3 py-2.5 rounded-xl hover:bg-slate-50 transition-colors w-full max-w-[160px]"
                            >
                              <Printer className="w-3.5 h-3.5" /> Print Order
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                    
                    {successfulOrders.length === 0 && (
                      <tr>
                        <td colSpan={8} className="p-10 text-center text-slate-400 font-medium">
                          No orders found matching your search or filter.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
              <PaginationUI currentPage={ordersPage} totalItems={successfulOrders.length} onPageChange={setOrdersPage} />
            </div>
          </div>
        )}

        {activeTab === 'ABANDONED_CARTS' && (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-6 mb-8">
              <div>
                <h1 className="font-serif text-3xl font-bold text-slate-900">Failed & Pending Orders</h1>
                <p className="text-slate-500 mt-1 font-medium text-sm">Follow up with these customers to recover lost sales.</p>
              </div>
              <div className="flex flex-wrap items-center gap-3">
                <DateFilterUI />
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden w-full">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse min-w-[1000px]">
                  <thead>
                    <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 text-[11px] uppercase tracking-widest font-bold">
                      <th className="p-5 whitespace-nowrap">Order ID & Date</th>
                      <th className="p-5 whitespace-nowrap min-w-[150px]">Customer Info</th>
                      <th className="p-5 whitespace-nowrap min-w-[200px]">Items & Value</th>
                      <th className="p-5 whitespace-nowrap">Status</th>
                      <th className="p-5 whitespace-nowrap">Action Needed</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {paginatedAbandoned.map((order) => (
                      <tr key={order.id} className="hover:bg-slate-50/50 transition-colors">
                        <td className="p-5 align-top">
                          <div className="flex flex-col gap-1">
                            <span className="font-mono text-xs font-bold text-slate-500 bg-slate-100 px-2 py-1 rounded inline-block w-fit">
                              #{order.id.slice(-8).toUpperCase()}
                            </span>
                            <span className="text-xs text-slate-500 mt-2 font-medium">
                              {new Date(order.createdAt).toLocaleDateString('en-IN')}
                            </span>
                          </div>
                        </td>
                        <td className="p-5 align-top">
                          <div className="flex items-start gap-2">
                            <User className="w-4 h-4 text-slate-400 mt-0.5 shrink-0" />
                            <div>
                              <p className="font-bold text-slate-800 text-sm">{order.customerName}</p>
                              <p className="text-xs text-slate-500">{order.customerEmail}</p>
                              <p className="text-xs text-slate-500">{order.customerPhone}</p>
                            </div>
                          </div>
                        </td>
                        <td className="p-5 align-top">
                          <div className="flex flex-col gap-2">
                            <span className="font-bold text-slate-900">₹{order.totalAmount}</span>
                            <span className="text-xs text-slate-500">{order.items.length} item(s)</span>
                          </div>
                        </td>
                        <td className="p-5 align-top">
                          <div className="flex flex-col gap-2">
                            {order.paymentStatus === "FAILED" ? (
                              <span className="inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-widest text-red-700 bg-red-100 px-2 py-1 rounded w-fit">
                                Failed
                              </span>
                            ) : (
                              <span className="inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-widest text-amber-700 bg-amber-100 px-2 py-1 rounded w-fit">
                                Pending
                              </span>
                            )}
                          </div>
                        </td>
                        <td className="p-5 align-top">
                          <button 
                            onClick={() => window.location.href = `mailto:${order.customerEmail}?subject=Dhinakar Pharma - Need help with your order?`}
                            className="text-xs font-bold bg-brand-blue/10 text-brand-blue px-3 py-2 rounded-lg hover:bg-brand-blue/20 transition-colors"
                          >
                            Email Customer
                          </button>
                        </td>
                      </tr>
                    ))}
                    
                    {abandonedOrders.length === 0 && (
                      <tr>
                        <td colSpan={5} className="p-10 text-center text-slate-400 font-medium">
                          No failed or pending orders found.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
              <PaginationUI currentPage={abandonedPage} totalItems={abandonedOrders.length} onPageChange={setAbandonedPage} />
            </div>
          </div>
        )}

        {activeTab === 'PRODUCTS' && (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            {editingProduct ? (
              <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8 max-w-5xl mx-auto">
                <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8 border-b border-slate-100 pb-6 gap-4">
                  <div>
                    <h2 className="font-serif text-2xl font-bold text-slate-900">Edit Product</h2>
                    <p className="text-slate-500 mt-1 text-sm font-medium">Editing: {editingProduct.name}</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <button onClick={() => setEditingProduct(null)} className="px-5 py-2.5 rounded-xl font-bold text-sm bg-slate-100 text-slate-600 hover:bg-slate-200 transition-colors">Cancel</button>
                    <button onClick={handleSaveProduct} className="px-5 py-2.5 rounded-xl font-bold text-sm bg-brand-blue text-white hover:bg-brand-blue/90 shadow-lg shadow-brand-blue/20 transition-all">Save Changes</button>
                  </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                  
                  {/* Basic Details */}
                  <div className="space-y-6">
                    <h3 className="font-bold text-lg text-slate-800 border-b border-slate-100 pb-2">Basic Details</h3>
                    
                    <div>
                      <label className="block text-[11px] uppercase tracking-widest font-bold text-slate-400 mb-2">Product Name</label>
                      <input type="text" value={formData.name || ''} onChange={(e) => setFormData({...formData, name: e.target.value})} className="w-full p-3 border border-slate-200 rounded-lg text-sm font-bold focus:border-brand-blue outline-none" />
                    </div>
                    <div>
                      <label className="block text-[11px] uppercase tracking-widest font-bold text-slate-400 mb-2">Category</label>
                      <input type="text" value={formData.category || ''} onChange={(e) => setFormData({...formData, category: e.target.value})} className="w-full p-3 border border-slate-200 rounded-lg text-sm font-medium focus:border-brand-blue outline-none" />
                    </div>
                    <div>
                      <label className="block text-[11px] uppercase tracking-widest font-bold text-slate-400 mb-2">Focus Area</label>
                      <input type="text" value={formData.focus || ''} onChange={(e) => setFormData({...formData, focus: e.target.value})} className="w-full p-3 border border-slate-200 rounded-lg text-sm font-medium focus:border-brand-blue outline-none" />
                    </div>
                    <div>
                      <label className="block text-[11px] uppercase tracking-widest font-bold text-slate-400 mb-2">Tagline</label>
                      <input type="text" value={formData.tagline || ''} onChange={(e) => setFormData({...formData, tagline: e.target.value})} className="w-full p-3 border border-slate-200 rounded-lg text-sm font-medium focus:border-brand-blue outline-none" />
                    </div>
                    <div>
                      <label className="block text-[11px] uppercase tracking-widest font-bold text-slate-400 mb-2">Price (₹)</label>
                      <input type="number" value={formData.price || 0} onChange={(e) => setFormData({...formData, price: e.target.value})} className="w-full p-3 border border-slate-200 rounded-lg text-sm font-bold focus:border-brand-blue outline-none" />
                    </div>
                    <div>
                      <label className="block text-[11px] uppercase tracking-widest font-bold text-slate-400 mb-2">Description</label>
                      <textarea value={formData.description || ''} onChange={(e) => setFormData({...formData, description: e.target.value})} rows={5} className="w-full p-3 border border-slate-200 rounded-lg text-sm font-medium focus:border-brand-blue outline-none resize-none" />
                    </div>
                  </div>
                  
                  {/* Builders */}
                  <div className="space-y-8">
                    
                    {/* Images Builder */}
                    <div className="bg-slate-50 p-5 rounded-xl border border-slate-100">
                      <div className="flex items-center justify-between mb-4">
                        <label className="block text-[11px] uppercase tracking-widest font-bold text-slate-400">Images</label>
                        <div className="flex gap-2">
                          <button onClick={handleImageUploadClick} className="flex items-center gap-1 text-[10px] font-bold text-slate-600 bg-white border border-slate-200 px-2 py-1.5 rounded hover:bg-slate-100"><ImageIcon className="w-3 h-3" /> Upload</button>
                          <button onClick={() => addArrayItem('images', '')} className="flex items-center gap-1 text-[10px] font-bold text-brand-blue bg-blue-100/50 px-2 py-1.5 rounded hover:bg-blue-100"><Plus className="w-3 h-3" /> Add Link</button>
                        </div>
                      </div>
                      <div className="space-y-3">
                        {formData.images?.map((item: string, i: number) => (
                          <div key={i} className="flex gap-2">
                            <input type="text" value={item} onChange={(e) => handleArrayChange('images', i, e.target.value)} placeholder="/example.jpg" className="flex-1 p-2 border border-slate-200 rounded-lg text-sm font-medium focus:border-brand-blue outline-none" />
                            <button onClick={() => removeArrayItem('images', i)} className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"><Trash2 className="w-4 h-4" /></button>
                          </div>
                        ))}
                        {formData.images?.length === 0 && <p className="text-xs text-slate-400 italic">No images added.</p>}
                      </div>
                    </div>

                    {/* Highlights / Bullet Points Builder */}
                    <div className="bg-blue-50/30 p-6 rounded-2xl border border-blue-100/50 shadow-sm">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 gap-2">
                        <div>
                          <label className="block text-[11px] uppercase tracking-widest font-bold text-brand-blue mb-1">Key Highlights & Bullet Points</label>
                          <p className="text-[10px] text-slate-400 font-medium italic">Add clinical points, features, or unique formulation details here.</p>
                        </div>
                        <button onClick={() => addArrayItem('benefits', '')} className="flex items-center justify-center gap-2 text-[10px] font-bold text-brand-blue bg-white border border-brand-blue/20 px-3 py-2 rounded-xl hover:bg-brand-blue hover:text-white transition-all shadow-sm">
                          <Plus className="w-3.5 h-3.5" /> Add New Point
                        </button>
                      </div>
                      <div className="space-y-3">
                        {formData.benefits?.map((item: string, i: number) => (
                          <div key={i} className="flex gap-2 group">
                            <div className="w-8 h-10 flex items-center justify-center text-[10px] font-black text-slate-300 bg-white border border-slate-100 rounded-lg shrink-0">
                              {i + 1}
                            </div>
                            <input 
                              type="text" 
                              value={item} 
                              onChange={(e) => handleArrayChange('benefits', i, e.target.value)} 
                              placeholder="e.g. Unique Proprietary formulation for bone health" 
                              className="flex-1 p-3 border border-slate-200 rounded-xl text-sm font-medium focus:border-brand-blue focus:ring-4 focus:ring-brand-blue/5 outline-none bg-white transition-all" 
                            />
                            <button onClick={() => removeArrayItem('benefits', i)} className="p-3 text-slate-300 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all opacity-0 group-hover:opacity-100"><Trash2 className="w-4 h-4" /></button>
                          </div>
                        ))}
                        {formData.benefits?.length === 0 && (
                          <div className="text-center py-6 border-2 border-dashed border-slate-100 rounded-2xl">
                             <p className="text-xs text-slate-400 font-medium">No highlights added yet. Click 'Add New Point' to begin.</p>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Ingredients Builder */}
                    <div className="bg-slate-50 p-5 rounded-xl border border-slate-100">
                      <div className="flex items-center justify-between mb-4">
                        <label className="block text-[11px] uppercase tracking-widest font-bold text-slate-400">Ingredients</label>
                        <button onClick={() => addArrayItem('ingredients', '')} className="flex items-center gap-1 text-[10px] font-bold text-brand-blue bg-blue-100/50 px-2 py-1.5 rounded hover:bg-blue-100"><Plus className="w-3 h-3" /> Add Ingredient</button>
                      </div>
                      <div className="space-y-3">
                        {formData.ingredients?.map((item: string, i: number) => (
                          <div key={i} className="flex gap-2">
                            <input type="text" value={item} onChange={(e) => handleArrayChange('ingredients', i, e.target.value)} placeholder="e.g. Chlorophyll" className="flex-1 p-2 border border-slate-200 rounded-lg text-sm font-medium focus:border-brand-blue outline-none" />
                            <button onClick={() => removeArrayItem('ingredients', i)} className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"><Trash2 className="w-4 h-4" /></button>
                          </div>
                        ))}
                        {formData.ingredients?.length === 0 && <p className="text-xs text-slate-400 italic">No ingredients added.</p>}
                      </div>
                    </div>

                    {/* Nutrition Builder */}
                    <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 gap-2">
                        <div>
                          <label className="block text-[11px] uppercase tracking-widest font-bold text-slate-400">Nutritional Information Builder</label>
                          <p className="text-[10px] text-slate-400 font-medium">Add composition, claim amount, and RDA percentage.</p>
                        </div>
                        <button onClick={() => addArrayItem('nutrition', { component: '', amount: '', rda: '' })} className="flex items-center justify-center gap-2 text-[10px] font-bold text-brand-blue bg-white border border-brand-blue/20 px-3 py-2 rounded-xl hover:bg-brand-blue hover:text-white transition-all shadow-sm">
                          <Plus className="w-3.5 h-3.5" /> Add Row
                        </button>
                      </div>
                      <div className="space-y-3">
                        {/* Table Header for Admin - Aligned with Grid */}
                        {formData.nutrition?.length > 0 && (
                          <div className="grid grid-cols-[2fr_1fr_1fr_40px] gap-3 px-1 mb-1">
                            <div className="text-[9px] font-black uppercase text-slate-400 tracking-tighter">Composition</div>
                            <div className="text-[9px] font-black uppercase text-slate-400 tracking-tighter">Claim/Tablet</div>
                            <div className="text-[9px] font-black uppercase text-slate-400 tracking-tighter">% RDA*</div>
                            <div></div>
                          </div>
                        )}
                        {formData.nutrition?.map((item: any, i: number) => (
                          <div key={i} className="grid grid-cols-[2fr_1fr_1fr_40px] gap-3 group items-center">
                            <input type="text" value={item.component || ''} onChange={(e) => handleObjectArrayChange('nutrition', i, 'component', e.target.value)} placeholder="e.g. Calcium" className="w-full p-2.5 border border-slate-200 rounded-lg text-sm font-medium focus:border-brand-blue outline-none bg-white shadow-sm" />
                            <input type="text" value={item.amount || ''} onChange={(e) => handleObjectArrayChange('nutrition', i, 'amount', e.target.value)} placeholder="e.g. 500mg" className="w-full p-2.5 border border-slate-200 rounded-lg text-sm font-bold focus:border-brand-blue outline-none bg-white shadow-sm" />
                            <input type="text" value={item.rda || ''} onChange={(e) => handleObjectArrayChange('nutrition', i, 'rda', e.target.value)} placeholder="e.g. 50%" className="w-full p-2.5 border border-slate-200 rounded-lg text-sm font-bold text-brand-blue focus:border-brand-blue outline-none bg-white shadow-sm" />
                            <button onClick={() => removeArrayItem('nutrition', i)} className="p-2.5 text-slate-300 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all flex items-center justify-center"><Trash2 className="w-4 h-4" /></button>
                          </div>
                        ))}
                        {formData.nutrition?.length === 0 && <p className="text-xs text-slate-400 italic text-center py-4">No nutritional data added.</p>}
                      </div>
                    </div>

                    {/* FAQ Builder */}
                    <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100">
                      <div className="flex items-center justify-between mb-4">
                        <label className="block text-[11px] uppercase tracking-widest font-bold text-slate-400">FAQs</label>
                        <button onClick={() => addArrayItem('faq', { question: '', answer: '' })} className="flex items-center gap-1 text-[10px] font-bold text-brand-blue bg-blue-100/50 px-2 py-1.5 rounded hover:bg-blue-100"><Plus className="w-3 h-3" /> Add FAQ</button>
                      </div>
                      <div className="space-y-4">
                        {formData.faq?.map((item: any, i: number) => (
                          <div key={i} className="flex gap-2 items-start bg-white p-3 rounded-lg border border-slate-200">
                            <div className="flex-1 space-y-2">
                              <input type="text" value={item.question || ''} onChange={(e) => handleObjectArrayChange('faq', i, 'question', e.target.value)} placeholder="Question" className="w-full p-2 border border-slate-200 rounded-lg text-sm font-bold focus:border-brand-blue outline-none" />
                              <textarea value={item.answer || ''} onChange={(e) => handleObjectArrayChange('faq', i, 'answer', e.target.value)} placeholder="Answer" rows={2} className="w-full p-2 border border-slate-200 rounded-lg text-sm font-medium focus:border-brand-blue outline-none resize-none" />
                            </div>
                            <button onClick={() => removeArrayItem('faq', i)} className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors mt-1"><Trash2 className="w-4 h-4" /></button>
                          </div>
                        ))}
                        {formData.faq?.length === 0 && <p className="text-xs text-slate-400 italic">No FAQs added.</p>}
                      </div>
                    </div>

                  </div>
                </div>
              </div>
            ) : (
              <>
                <div className="mb-8">
                  <h1 className="font-serif text-3xl font-bold text-slate-900">Inventory Management</h1>
                  <p className="text-slate-500 mt-1 font-medium text-sm">Update product details, pricing, and images seamlessly.</p>
                </div>

                <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden w-full overflow-x-auto">
                  <table className="w-full text-left border-collapse min-w-[800px]">
                    <thead>
                      <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 text-[11px] uppercase tracking-widest font-bold">
                        <th className="p-5">Product Name</th>
                        <th className="p-5">Category</th>
                        <th className="p-5">Current Price (₹)</th>
                        <th className="p-5 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {paginatedProducts.map(product => (
                        <tr key={product.id} className="hover:bg-slate-50/50 transition-colors">
                          <td className="p-5">
                            <p className="font-bold text-slate-800">{product.name}</p>
                            <p className="text-xs text-slate-400 mt-1">{product.tagline}</p>
                          </td>
                          <td className="p-5 text-sm font-medium text-slate-600">{product.category}</td>
                          <td className="p-5">
                            <span className="font-bold text-slate-900">₹{product.price}</span>
                          </td>
                          <td className="p-5 text-right">
                            <button 
                              onClick={() => handleEditProduct(product)}
                              className="px-4 py-2 bg-brand-blue/5 text-brand-blue hover:bg-brand-blue/10 border border-brand-blue/10 rounded-lg text-xs font-bold transition-colors shadow-sm"
                            >
                              Edit Full Details
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <PaginationUI currentPage={productsPage} totalItems={products.length} onPageChange={setProductsPage} />
              </>
            )}
          </div>
        )}

        {activeTab === 'ADMINS' && (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-700 max-w-[1200px] mx-auto mt-2">
            
            {/* Premium Header */}
            <div className="relative overflow-hidden bg-brand-blue rounded-3xl p-8 sm:p-12 mb-10 shadow-[0_20px_50px_rgba(12,31,94,0.15)] flex flex-col md:flex-row items-center justify-between gap-8">
              <div className="absolute inset-0 bg-[linear-gradient(150deg,#0c2160_0%,#1B3F8B_50%,#2460aa_100%)] z-0" />
              <div className="absolute inset-0 opacity-[0.05] z-0 pointer-events-none" style={{ backgroundImage: "radial-gradient(circle, white 1px, transparent 1px)", backgroundSize: "24px 24px" }} />
              
              <div className="relative z-10 flex items-center gap-6 text-center md:text-left">
                <div className="w-16 h-16 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center shrink-0 shadow-inner">
                  <Shield className="w-8 h-8 text-[#C9A048]" />
                </div>
                <div>
                  <h1 className="font-serif text-3xl sm:text-4xl font-bold text-white mb-2 tracking-tight">Security & Access</h1>
                  <p className="text-white/70 font-medium text-sm max-w-md leading-relaxed">
                    Manage administrative privileges and safeguard the integrity of the Dhinakar Pharma portal.
                  </p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-12 gap-8 items-start">
              
              {/* Form Section */}
              <div className="xl:col-span-4">
                <div className="bg-white rounded-[2rem] shadow-[0_10px_40px_rgba(0,0,0,0.04)] border border-slate-100 p-8 sm:p-10 relative overflow-hidden group">
                  <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-[#C9A048] to-brand-blue" />
                  
                  <div className="flex items-center gap-3 mb-8">
                    <div className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center border border-slate-100">
                      <UserPlus className="w-5 h-5 text-brand-blue" />
                    </div>
                    <h3 className="font-serif text-xl font-bold text-slate-900">Provision Admin</h3>
                  </div>
                  
                  <form onSubmit={handleCreateAdmin} className="space-y-5">
                    <div>
                      <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2 ml-1">Email Address</label>
                      <input 
                        type="email" 
                        required
                        value={newAdmin.email}
                        onChange={(e) => setNewAdmin({...newAdmin, email: e.target.value})}
                        className="w-full bg-slate-50/50 border border-slate-200 rounded-2xl px-5 py-4 text-sm font-bold text-slate-700 focus:ring-2 focus:ring-brand-blue/20 focus:border-brand-blue outline-none transition-all"
                        placeholder="admin@dhinakar.com"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2 ml-1">Username</label>
                      <input 
                        type="text" 
                        required
                        pattern="^[a-zA-Z0-9_]+$"
                        title="Username can only contain letters, numbers, and underscores."
                        value={newAdmin.username}
                        onChange={(e) => setNewAdmin({...newAdmin, username: e.target.value})}
                        className="w-full bg-slate-50/50 border border-slate-200 rounded-2xl px-5 py-4 text-sm font-bold text-slate-700 focus:ring-2 focus:ring-brand-blue/20 focus:border-brand-blue outline-none transition-all"
                        placeholder="e.g. jdoe_admin"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2 ml-1">Security Key</label>
                      <input 
                        type="password" 
                        required
                        minLength={6}
                        value={newAdmin.password}
                        onChange={(e) => setNewAdmin({...newAdmin, password: e.target.value})}
                        className="w-full bg-slate-50/50 border border-slate-200 rounded-2xl px-5 py-4 text-sm font-bold text-slate-700 focus:ring-2 focus:ring-brand-blue/20 focus:border-brand-blue outline-none transition-all"
                        placeholder="••••••••"
                      />
                    </div>
                    
                    {adminFormState.error && (
                      <div className="p-4 bg-red-50/80 text-red-600 text-xs font-bold rounded-xl border border-red-100 flex items-center gap-3 animate-in fade-in zoom-in-95">
                        <ShieldAlert className="w-5 h-5 shrink-0" />
                        {adminFormState.error}
                      </div>
                    )}
                    {adminFormState.success && (
                      <div className="p-4 bg-[#C9A048]/10 text-[#C9A048] text-xs font-bold rounded-xl border border-[#C9A048]/20 flex items-center gap-3 animate-in fade-in zoom-in-95">
                        <CheckCircle2 className="w-5 h-5 shrink-0" />
                        {adminFormState.success}
                      </div>
                    )}

                    <button 
                      type="submit" 
                      disabled={adminFormState.loading}
                      className="w-full bg-slate-900 text-white rounded-2xl py-4 text-sm font-bold shadow-lg shadow-slate-900/20 hover:bg-brand-blue hover:shadow-brand-blue/30 transition-all duration-300 disabled:opacity-70 flex items-center justify-center gap-3 mt-6 group"
                    >
                      {adminFormState.loading ? (
                        <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      ) : (
                        <KeyRound className="w-5 h-5 group-hover:rotate-12 transition-transform" />
                      )}
                      Authorize Access
                    </button>
                  </form>
                </div>
              </div>

              {/* List Section */}
              <div className="xl:col-span-8">
                <div className="bg-white rounded-[2rem] shadow-[0_10px_40px_rgba(0,0,0,0.04)] border border-slate-100 overflow-hidden flex flex-col h-full min-h-[400px]">
                  <div className="p-6 sm:p-8 border-b border-slate-50 flex items-center justify-between bg-white sticky top-0 z-10">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-brand-blue/5 flex items-center justify-center">
                        <Users className="w-5 h-5 text-brand-blue" />
                      </div>
                      <h3 className="font-serif text-xl font-bold text-slate-900">Active Personnel</h3>
                    </div>
                    <div className="px-4 py-1.5 bg-slate-50 text-slate-500 text-xs font-bold uppercase tracking-widest rounded-full border border-slate-100">
                      {adminList.length} Authorized
                    </div>
                  </div>
                  
                  <div className="divide-y divide-slate-50/80 p-2">
                    {adminList.map((admin, index) => (
                      <div key={admin.id} className="p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-slate-50/50 rounded-2xl transition-colors group">
                        <div className="flex items-center gap-4 sm:gap-5 min-w-0">
                          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-slate-100 to-slate-50 border border-slate-200 flex items-center justify-center shrink-0 shadow-sm relative overflow-hidden">
                            <span className="font-serif font-bold text-brand-blue text-xl leading-none relative z-10">
                              {admin.username.charAt(0).toUpperCase()}
                            </span>
                            <div className="absolute inset-0 bg-brand-blue/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                          </div>
                          <div className="min-w-0">
                            <p className="font-bold text-slate-900 text-base flex items-center gap-2 truncate">
                              {admin.username}
                              {index === 0 && <span className="px-2 py-0.5 bg-[#C9A048]/10 text-[#C9A048] text-[9px] uppercase tracking-widest rounded border border-[#C9A048]/20 shrink-0">Root</span>}
                            </p>
                            <div className="text-[11px] font-bold text-slate-500 mt-1 flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2">
                              <span className="truncate">{admin.email}</span>
                              <span className="text-slate-300 hidden sm:inline">•</span>
                              <span className="flex items-center gap-1.5 uppercase tracking-wider text-slate-400">
                                <Clock className="w-3 h-3 shrink-0" />
                                <span className="whitespace-nowrap">Granted: {new Date(admin.createdAt).toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' })}</span>
                              </span>
                            </div>
                          </div>
                        </div>
                        
                        <button 
                          onClick={() => requestDeleteAdmin(admin.id)}
                          className="w-12 h-12 rounded-xl bg-white border border-slate-100 flex items-center justify-center text-slate-300 hover:text-red-500 hover:bg-red-50 hover:border-red-100 shadow-sm hover:shadow transition-all shrink-0"
                          title="Revoke Access"
                        >
                          <Trash2 className="w-5 h-5 transition-transform" />
                        </button>
                      </div>
                    ))}
                    
                    {adminList.length === 0 && (
                      <div className="py-20 px-6 text-center">
                        <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-5 border border-slate-100">
                          <ShieldAlert className="w-8 h-8 text-slate-300" />
                        </div>
                        <p className="font-serif text-xl font-bold text-slate-900 mb-2">No active personnel</p>
                        <p className="text-sm font-medium text-slate-500 max-w-xs mx-auto">System integrity is uncompromised, but you need to authorize users first.</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>

            </div>
          </div>
        )}

        {activeTab === 'COUPONS' && (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 max-w-[1200px] mx-auto mt-4">
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
              
              {/* CREATE COUPON FORM */}
              <div className="xl:col-span-1">
                <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden sticky top-8">
                  <div className="p-8 border-b border-slate-100">
                    <div className="w-12 h-12 bg-brand-blue/5 rounded-2xl flex items-center justify-center mb-6 border border-brand-blue/10">
                      <Plus className="w-6 h-6 text-brand-blue" />
                    </div>
                    <h2 className="font-serif text-2xl font-bold text-slate-900 mb-2">New Policy</h2>
                    <p className="text-sm font-medium text-slate-500 leading-relaxed">
                      Generate a dynamic discount code for VIPs or seasonal campaigns.
                    </p>
                  </div>
                  
                  <div className="p-8 bg-slate-50/50">
                    {couponFormState.error && (
                      <div className="bg-red-50 text-red-600 text-xs font-bold p-4 rounded-xl mb-6 border border-red-100 flex items-center gap-2">
                        <XCircle className="w-4 h-4" /> {couponFormState.error}
                      </div>
                    )}
                    {couponFormState.success && (
                      <div className="bg-green-50 text-green-600 text-xs font-bold p-4 rounded-xl mb-6 border border-green-100 flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4" /> {couponFormState.success}
                      </div>
                    )}
                  
                    <form onSubmit={handleCreateCoupon} className="space-y-5">
                      <div>
                        <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2 ml-1">Recipient / Campaign</label>
                        <input 
                          type="text" 
                          required
                          value={newCoupon.name}
                          onChange={(e) => setNewCoupon({...newCoupon, name: e.target.value})}
                          className="w-full bg-white border border-slate-200 rounded-2xl px-5 py-4 text-sm font-bold text-slate-700 focus:ring-2 focus:ring-brand-blue/20 focus:border-brand-blue outline-none transition-all shadow-sm"
                          placeholder="e.g. Winter Sale"
                        />
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2 ml-1">Discount %</label>
                          <input 
                            type="number" 
                            required
                            min="1"
                            max="100"
                            value={newCoupon.discountPercentage}
                            onChange={(e) => setNewCoupon({...newCoupon, discountPercentage: Number(e.target.value)})}
                            className="w-full bg-white border border-slate-200 rounded-2xl px-5 py-4 text-sm font-bold text-slate-700 focus:ring-2 focus:ring-brand-blue/20 focus:border-brand-blue outline-none transition-all shadow-sm"
                          />
                        </div>
                        <div>
                          <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2 ml-1">Max Uses</label>
                          <input 
                            type="number" 
                            required
                            min="1"
                            value={newCoupon.maxUses}
                            onChange={(e) => setNewCoupon({...newCoupon, maxUses: Number(e.target.value)})}
                            className="w-full bg-white border border-slate-200 rounded-2xl px-5 py-4 text-sm font-bold text-slate-700 focus:ring-2 focus:ring-brand-blue/20 focus:border-brand-blue outline-none transition-all shadow-sm"
                          />
                        </div>
                      </div>
                      
                      <button 
                        disabled={couponFormState.loading}
                        className="w-full py-4 mt-2 bg-brand-blue text-white rounded-2xl font-bold text-[11px] uppercase tracking-widest hover:bg-[#0c1b42] transition-colors shadow-lg shadow-brand-blue/20 disabled:opacity-50"
                      >
                        {couponFormState.loading ? "Generating..." : "Generate Code"}
                      </button>
                    </form>
                  </div>
                </div>
              </div>

              {/* LIST COUPONS */}
              <div className="xl:col-span-2">
                <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6 sm:p-8 h-full flex flex-col">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-6 border-b border-slate-100">
                    <div>
                      <h2 className="font-serif text-xl font-bold text-slate-900 flex items-center gap-3">
                        <Tag className="w-5 h-5 text-[#C9A048]" />
                        Campaign Policies
                      </h2>
                      <p className="text-xs font-medium text-slate-500 mt-1">Manage active & expired discounts</p>
                    </div>
                    <div className="flex items-center gap-3 w-full sm:w-auto">
                      <button 
                        onClick={downloadCouponsCSV}
                        className="px-3 py-2.5 bg-white text-slate-600 rounded-xl font-bold text-[10px] uppercase tracking-widest border border-slate-200 hover:bg-slate-50 hover:text-brand-blue transition-all flex items-center gap-2 shadow-sm whitespace-nowrap"
                        title="Download CSV"
                      >
                        <Download className="w-3.5 h-3.5" />
                        <span className="hidden sm:inline">Export</span>
                      </button>
                      <div className="relative w-full sm:max-w-[220px] flex-1">
                        <Search className="w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                        <input
                          type="text"
                        placeholder="Search codes..."
                        value={couponSearch}
                        onChange={(e) => { setCouponSearch(e.target.value); setCouponPage(1); }}
                        className="w-full bg-slate-50/50 border border-slate-200 rounded-xl pl-10 pr-4 py-2.5 text-xs font-bold text-slate-700 outline-none focus:ring-2 focus:ring-brand-blue/20 focus:border-brand-blue transition-all"
                      />
                    </div>
                  </div>
                </div>
                  
                  <div className="flex-1 flex flex-col gap-3">
                    {(() => {
                      const filteredCoupons = coupons.filter(c => c.name.toLowerCase().includes(couponSearch.toLowerCase()) || c.code.toLowerCase().includes(couponSearch.toLowerCase()));
                      const totalPages = Math.ceil(filteredCoupons.length / COUPONS_PER_PAGE);
                      const paginatedCoupons = filteredCoupons.slice((couponPage - 1) * COUPONS_PER_PAGE, couponPage * COUPONS_PER_PAGE);

                      if (filteredCoupons.length === 0) return (
                        <div className="py-20 px-6 text-center border-2 border-dashed border-slate-200 rounded-2xl mt-2 bg-slate-50/50">
                          <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center mx-auto mb-4 border border-slate-100 shadow-sm">
                            <Tag className="w-6 h-6 text-slate-300" />
                          </div>
                          <p className="font-serif text-lg font-bold text-slate-900 mb-1">No campaigns found</p>
                          <p className="text-xs font-medium text-slate-500">Try adjusting your search or generate a new code.</p>
                        </div>
                      );

                      return (
                        <>
                          {paginatedCoupons.map((coupon) => {
                            const isExpired = coupon.uses >= coupon.maxUses;
                            return (
                              <div key={coupon.id} className={`flex flex-col sm:flex-row sm:items-center justify-between p-4 rounded-2xl border transition-all ${isExpired ? 'bg-slate-50/50 border-slate-200 grayscale opacity-80' : 'bg-white border-slate-200 hover:border-brand-blue/30 hover:shadow-md hover:shadow-brand-blue/5'}`}>
                                <div className="flex items-center gap-4 mb-4 sm:mb-0">
                                  <div className={`w-14 h-14 rounded-xl flex flex-col items-center justify-center shrink-0 border ${isExpired ? 'bg-slate-100 text-slate-400 border-slate-200' : 'bg-brand-blue/5 text-brand-blue border-brand-blue/10'}`}>
                                    <span className="font-serif text-lg font-bold leading-none">{coupon.discountPercentage}%</span>
                                    <span className="text-[9px] font-bold uppercase tracking-widest mt-1">OFF</span>
                                  </div>
                                  <div>
                                    <h3 className={`text-sm font-bold ${isExpired ? 'text-slate-500' : 'text-slate-900'}`}>{coupon.name}</h3>
                                    <div className="flex items-center gap-2 mt-1.5">
                                      <span className={`font-mono text-xs font-bold tracking-widest px-2 py-0.5 rounded-md ${isExpired ? 'bg-slate-200 text-slate-500 line-through' : 'bg-slate-100 text-brand-blue'}`}>
                                        {coupon.code}
                                      </span>
                                      {isExpired ? (
                                        <span className="px-2 py-0.5 bg-slate-200 text-slate-600 text-[9px] uppercase tracking-widest rounded font-bold shadow-inner">Expired</span>
                                      ) : !coupon.isActive ? (
                                        <span className="px-2 py-0.5 bg-orange-50 text-orange-600 text-[9px] uppercase tracking-widest rounded font-bold border border-orange-100">Disabled</span>
                                      ) : null}
                                    </div>
                                  </div>
                                </div>
                                
                                <div className="flex items-center justify-between sm:justify-end gap-5">
                                  <div className="text-left sm:text-right">
                                    <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mb-0.5">Uses</p>
                                    <p className={`text-xs font-bold ${isExpired ? 'text-slate-500' : 'text-slate-700'}`}>{coupon.uses} / {coupon.maxUses}</p>
                                  </div>
                                  
                                  <div className="h-8 w-px bg-slate-100 hidden sm:block"></div>
                                  
                                  <div className="flex items-center gap-2 shrink-0">
                                    <button 
                                      onClick={() => {
                                        navigator.clipboard.writeText(coupon.code);
                                        setCopiedCode(coupon.code);
                                        setTimeout(() => setCopiedCode(null), 2000);
                                      }}
                                      className="w-8 h-8 flex items-center justify-center rounded-lg bg-slate-50 border border-slate-200 text-slate-400 hover:text-brand-blue hover:bg-white transition-all shadow-sm"
                                      title="Copy Code"
                                    >
                                      {copiedCode === coupon.code ? <CheckCircle2 className="w-3.5 h-3.5 text-green-500" /> : <Copy className="w-3.5 h-3.5" />}
                                    </button>
                                    <button 
                                      disabled={isExpired}
                                      onClick={() => handleToggleCoupon(coupon.id, coupon.isActive)}
                                      className={`px-3 h-8 rounded-lg text-[9px] font-bold uppercase tracking-widest transition-all shadow-sm ${isExpired ? 'opacity-30 cursor-not-allowed bg-slate-100 text-slate-400 border border-slate-200' : coupon.isActive ? 'bg-white border border-slate-200 text-slate-500 hover:text-orange-600 hover:border-orange-200' : 'bg-white border border-slate-200 text-slate-500 hover:text-green-600 hover:border-green-200'}`}
                                    >
                                      {coupon.isActive ? "Disable" : "Enable"}
                                    </button>
                                    <button 
                                      onClick={() => requestDeleteCoupon(coupon.id)}
                                      className="w-8 h-8 rounded-lg bg-white border border-slate-200 flex items-center justify-center text-slate-400 hover:text-red-500 hover:border-red-200 transition-all shadow-sm"
                                      title="Delete"
                                    >
                                      <Trash2 className="w-3.5 h-3.5" />
                                    </button>
                                  </div>
                                </div>
                              </div>
                            );
                          })}
                          
                          {totalPages > 1 && (
                            <div className="flex items-center justify-between mt-auto pt-4">
                              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                                Page {couponPage} of {totalPages}
                              </p>
                              <div className="flex items-center gap-2">
                                <button 
                                  onClick={() => setCouponPage(p => Math.max(1, p - 1))} 
                                  disabled={couponPage === 1}
                                  className="w-8 h-8 rounded-lg flex items-center justify-center bg-white border border-slate-200 text-slate-600 hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed shadow-sm"
                                >
                                  <ChevronRight className="w-4 h-4 rotate-180" />
                                </button>
                                <button 
                                  onClick={() => setCouponPage(p => Math.min(totalPages, p + 1))} 
                                  disabled={couponPage === totalPages}
                                  className="w-8 h-8 rounded-lg flex items-center justify-center bg-white border border-slate-200 text-slate-600 hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed shadow-sm"
                                >
                                  <ChevronRight className="w-4 h-4" />
                                </button>
                              </div>
                            </div>
                          )}
                        </>
                      );
                    })()}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'DOCTORS' && (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h1 className="font-serif text-3xl font-bold text-slate-900">Doctors Config</h1>
                <p className="text-slate-500 mt-1 font-medium text-sm">Manage doctor profiles and their unique promo code prefixes.</p>
              </div>
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-12 gap-8">
              {/* Form Section */}
              <div className="xl:col-span-4">
                <div className="bg-white rounded-[2rem] shadow-[0_10px_40px_rgba(0,0,0,0.04)] border border-slate-100 p-6 sm:p-8 sticky top-8">
                  <div className="w-12 h-12 rounded-2xl bg-brand-blue/5 text-brand-blue flex items-center justify-center mb-6">
                    <UserPlus className="w-6 h-6" />
                  </div>
                  <h3 className="font-serif text-xl font-bold text-slate-900 mb-2">Register Doctor</h3>
                  <p className="text-slate-500 text-sm mb-8">Link a doctor's name to a specific prefix (e.g. DPHS).</p>
                  
                  <form onSubmit={handleCreateDoctor} className="space-y-5">
                    <div>
                      <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-widest mb-2 ml-1">Doctor Name</label>
                      <input 
                        type="text" 
                        required
                        value={newDoctor.name}
                        onChange={(e) => setNewDoctor({...newDoctor, name: e.target.value})}
                        className="w-full bg-slate-50/50 border border-slate-200 rounded-2xl px-5 py-4 text-sm font-bold text-slate-700 focus:ring-2 focus:ring-brand-blue/20 focus:border-brand-blue outline-none transition-all"
                        placeholder="e.g. Dr. A. Sharma"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-widest mb-2 ml-1">Code Prefix</label>
                      <input 
                        type="text" 
                        required
                        value={newDoctor.codePrefix}
                        onChange={(e) => setNewDoctor({...newDoctor, codePrefix: e.target.value.toUpperCase()})}
                        className="w-full bg-slate-50/50 border border-slate-200 rounded-2xl px-5 py-4 text-sm font-bold text-slate-700 focus:ring-2 focus:ring-brand-blue/20 focus:border-brand-blue outline-none transition-all uppercase placeholder:normal-case"
                        placeholder="e.g. DPHS"
                      />
                    </div>
                    
                    {doctorFormState.error && (
                      <div className="p-4 bg-red-50/80 text-red-600 text-xs font-bold rounded-xl border border-red-100 flex items-center gap-3">
                        <ShieldAlert className="w-5 h-5 shrink-0" />
                        {doctorFormState.error}
                      </div>
                    )}
                    {doctorFormState.success && (
                      <div className="p-4 bg-[#C9A048]/10 text-[#C9A048] text-xs font-bold rounded-xl border border-[#C9A048]/20 flex items-center gap-3">
                        <CheckCircle2 className="w-5 h-5 shrink-0" />
                        {doctorFormState.success}
                      </div>
                    )}

                    <button 
                      type="submit" 
                      disabled={doctorFormState.loading}
                      className="w-full bg-slate-900 text-white rounded-2xl py-4 text-sm font-bold shadow-lg shadow-slate-900/20 hover:bg-brand-blue transition-all duration-300 disabled:opacity-70 flex items-center justify-center gap-3 mt-6"
                    >
                      {doctorFormState.loading ? (
                        <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      ) : (
                        <Plus className="w-5 h-5" />
                      )}
                      Register Doctor
                    </button>
                  </form>
                </div>
              </div>

              {/* List Section */}
              <div className="xl:col-span-8">
                <div className="bg-white rounded-[2rem] shadow-[0_10px_40px_rgba(0,0,0,0.04)] border border-slate-100 overflow-hidden flex flex-col h-full min-h-[400px]">
                  <div className="p-6 sm:p-8 border-b border-slate-50 flex items-center justify-between bg-white sticky top-0 z-10">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-brand-blue/5 flex items-center justify-center">
                        <Stethoscope className="w-5 h-5 text-brand-blue" />
                      </div>
                      <h3 className="font-serif text-xl font-bold text-slate-900">Active Doctors</h3>
                    </div>
                    <div className="px-4 py-1.5 bg-slate-50 text-slate-500 text-xs font-bold uppercase tracking-widest rounded-full border border-slate-100">
                      {doctors.length} Registered
                    </div>
                  </div>
                  
                  <div className="divide-y divide-slate-50/80 p-2">
                    {doctors.map((doctor) => (
                      <div key={doctor.id} className="p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-slate-50/50 rounded-2xl transition-colors group">
                        <div className="flex items-center gap-4 sm:gap-5 min-w-0">
                          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-slate-100 to-slate-50 border border-slate-200 flex items-center justify-center shrink-0 shadow-sm relative overflow-hidden">
                            <span className="font-serif font-bold text-brand-blue text-xl leading-none relative z-10">
                              {doctor.name.charAt(0).toUpperCase()}
                            </span>
                          </div>
                          <div className="min-w-0">
                            <p className="font-bold text-slate-900 text-base flex items-center gap-2 truncate">
                              {doctor.name}
                            </p>
                            <div className="text-[11px] font-bold text-slate-500 mt-1 flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2">
                              <span className="truncate">Prefix: <strong className="text-brand-blue tracking-wider">{doctor.codePrefix}</strong></span>
                              <span className="text-slate-300 hidden sm:inline">•</span>
                              <span className="flex items-center gap-1.5 uppercase tracking-wider text-slate-400">
                                <Clock className="w-3 h-3 shrink-0" />
                                <span className="whitespace-nowrap">Added: {new Date(doctor.createdAt).toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' })}</span>
                              </span>
                            </div>
                          </div>
                        </div>
                        
                        <button 
                          onClick={() => requestDeleteDoctor(doctor.id)}
                          className="w-12 h-12 rounded-xl bg-white border border-slate-100 flex items-center justify-center text-slate-300 hover:text-red-500 hover:bg-red-50 hover:border-red-100 shadow-sm hover:shadow transition-all shrink-0"
                          title="Remove Doctor"
                        >
                          <Trash2 className="w-5 h-5" />
                        </button>
                      </div>
                    ))}
                    
                    {doctors.length === 0 && (
                      <div className="p-12 text-center text-slate-400 font-medium flex flex-col items-center">
                        <Stethoscope className="w-12 h-12 opacity-20 mb-4" />
                        <p>No doctors registered yet.</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

      </div>
      
      {/* Confirmation Modal */}
      <AnimatePresence>
        {confirmStatusModal && (
          <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm"
              onClick={() => !statusUpdating && setConfirmStatusModal(null)}
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative bg-white w-full max-w-md rounded-2xl shadow-2xl overflow-hidden z-10"
            >
              <div className="p-6 sm:p-8">
                <div className="w-12 h-12 bg-blue-50 text-brand-blue rounded-full flex items-center justify-center mb-5 border border-blue-100">
                  <Package className="w-6 h-6" />
                </div>
                <h3 className="font-serif text-2xl font-bold text-slate-900 mb-2">Change Fulfillment Status</h3>
                <p className="text-slate-500 text-sm font-medium leading-relaxed mb-6">
                  You are about to change the status of <strong className="text-slate-800">{confirmStatusModal.customerName}'s</strong> order to <strong className="text-slate-800">{confirmStatusModal.newStatus}</strong>. An automated email notification will be sent to the customer immediately.
                </p>
                <div className="flex gap-3 mt-8">
                  <button 
                    onClick={() => setConfirmStatusModal(null)} 
                    disabled={statusUpdating}
                    className="flex-1 px-4 py-3 rounded-xl font-bold text-sm bg-slate-100 text-slate-600 hover:bg-slate-200 transition-colors disabled:opacity-50"
                  >
                    Cancel
                  </button>
                  <button 
                    onClick={confirmUpdateStatus} 
                    disabled={statusUpdating}
                    className="flex-1 px-4 py-3 rounded-xl font-bold text-sm bg-brand-blue text-white hover:bg-brand-blue/90 shadow-lg shadow-brand-blue/20 transition-all disabled:opacity-70 flex items-center justify-center gap-2"
                  >
                    {statusUpdating ? (
                      <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    ) : (
                      <CheckCircle2 className="w-4 h-4" />
                    )}
                    {statusUpdating ? 'Updating...' : 'Confirm & Send'}
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Delete Confirmation Modal */}
      <AnimatePresence>
        {confirmDeleteModal && (
          <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm"
              onClick={() => setConfirmDeleteModal(null)}
            />
            <motion.div 
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              className="relative bg-white rounded-3xl p-8 max-w-sm w-full shadow-2xl border border-slate-100"
            >
              <div className="w-16 h-16 bg-red-50 rounded-2xl flex items-center justify-center mb-6 border border-red-100 mx-auto">
                <Trash2 className="w-8 h-8 text-red-500" />
              </div>
              <h3 className="font-serif text-2xl font-bold text-slate-900 mb-2 text-center">{confirmDeleteModal.title}</h3>
              <p className="text-slate-500 text-sm mb-8 text-center">{confirmDeleteModal.message}</p>
              
              <div className="flex gap-4">
                <button 
                  onClick={() => setConfirmDeleteModal(null)}
                  className="flex-1 py-3.5 rounded-2xl border border-slate-200 text-slate-600 font-bold text-[11px] uppercase tracking-widest hover:bg-slate-50 transition-colors"
                >
                  Cancel
                </button>
                <button 
                  onClick={executeDelete}
                  className="flex-1 py-3.5 rounded-2xl bg-red-500 text-white font-bold text-[11px] uppercase tracking-widest hover:bg-red-600 transition-colors shadow-lg shadow-red-500/30"
                >
                  Delete
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
