"use client";

import { useEffect, useState } from "react";
import { Package, CheckCircle2, Clock, MapPin, User, Stethoscope, Printer, Download, Search, LayoutDashboard, Pill, ChevronRight, TrendingUp, Plus, Trash2, Image as ImageIcon, BarChart3, IndianRupee } from "lucide-react";

export default function AdminDashboard() {
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

  useEffect(() => {
    Promise.all([fetchOrders(), fetchProducts()]).finally(() => setLoading(false));
  }, []);

  const updateStatus = async (orderId: string, status: string) => {
    try {
      const res = await fetch("/api/admin/orders", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ orderId, fulfillmentStatus: status })
      });
      if (res.ok) fetchOrders();
    } catch (error) {
      console.error(error);
    }
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

  if (loading) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center bg-slate-50">
        <div className="w-10 h-10 border-4 border-brand-blue border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex bg-slate-50 overflow-hidden max-w-[100vw]">
      {/* Sidebar */}
      <div className="w-64 bg-white border-r border-slate-200 hidden lg:flex flex-col py-8 px-4 h-[calc(100vh-80px)] sticky top-0 shrink-0">
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
        </nav>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 py-8 px-4 sm:px-8 w-full max-w-full overflow-x-hidden">
        
        {/* MOBILE TABS */}
        <div className="flex lg:hidden gap-2 mb-6 overflow-x-auto pb-2">
          <button onClick={() => setActiveTab('ANALYTICS')} className={`px-4 py-2 rounded-lg font-bold text-sm whitespace-nowrap ${activeTab === 'ANALYTICS' ? 'bg-brand-blue text-white' : 'bg-white text-slate-500 border border-slate-200'}`}>Analytics</button>
          <button onClick={() => setActiveTab('ORDERS')} className={`px-4 py-2 rounded-lg font-bold text-sm whitespace-nowrap ${activeTab === 'ORDERS' ? 'bg-brand-blue text-white' : 'bg-white text-slate-500 border border-slate-200'}`}>Orders</button>
          <button onClick={() => setActiveTab('PRODUCTS')} className={`px-4 py-2 rounded-lg font-bold text-sm whitespace-nowrap ${activeTab === 'PRODUCTS' ? 'bg-brand-blue text-white' : 'bg-white text-slate-500 border border-slate-200'}`}>Inventory</button>
          <button onClick={() => setActiveTab('ABANDONED_CARTS')} className={`px-4 py-2 rounded-lg font-bold text-sm whitespace-nowrap ${activeTab === 'ABANDONED_CARTS' ? 'bg-brand-blue text-white' : 'bg-white text-slate-500 border border-slate-200'}`}>Failed Orders</button>
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
                    {successfulOrders.map((order) => (
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
                              onChange={(e) => updateStatus(order.id, e.target.value)}
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
                    {abandonedOrders.map((order) => (
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
                      {products.map(product => (
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
              </>
            )}
          </div>
        )}

      </div>
    </div>
  );
}
