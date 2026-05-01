import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";

export default async function PrintOrder({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  const order = await prisma.order.findUnique({
    where: { id },
    include: { items: { include: { product: true } } }
  });

  if (!order) return notFound();

  return (
    <div className="bg-white text-slate-900 p-12 max-w-[210mm] mx-auto min-h-screen">
      {/* Header */}
      <div className="flex justify-between items-start border-b-2 border-slate-200 pb-8 mb-8">
        <div className="flex flex-col gap-4">
          <div className="h-16 flex items-center">
             <h1 className="text-3xl font-serif font-bold text-[#1B3F8B]">DHINAKAR</h1>
             <span className="text-3xl font-serif text-[#1B3F8B] ml-2 font-light">PHARMA</span>
          </div>
          <div className="text-sm text-slate-500 leading-relaxed">
            <p>123 Medical Innovation District</p>
            <p>Healthcare City, 400001</p>
            <p>support@dhinakarpharma.com</p>
            <p>+91 1800 123 4567</p>
          </div>
        </div>
        <div className="text-right">
          <h2 className="text-4xl font-serif font-bold text-slate-800 tracking-tight uppercase">Tax Invoice</h2>
          <p className="font-bold text-lg font-mono text-slate-600 mt-3">#{order.id.slice(-8).toUpperCase()}</p>
          <p className="text-sm mt-1 text-slate-500 font-medium">Date: {new Date(order.createdAt).toLocaleDateString('en-IN', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
        </div>
      </div>

      {/* Customer Info & Medical Details */}
      <div className="grid grid-cols-2 gap-12 mb-10 bg-slate-50 p-6 rounded-2xl border border-slate-100">
        <div>
          <h3 className="font-bold text-[11px] uppercase tracking-widest text-slate-400 mb-3">Billed & Shipped To</h3>
          <p className="font-bold text-lg text-slate-800">{order.customerName}</p>
          <p className="text-sm text-slate-600 mt-1 leading-relaxed max-w-[80%]">{order.shippingAddress}</p>
          <p className="text-sm text-slate-600 mt-2">{order.customerPhone}</p>
          <p className="text-sm text-slate-600">{order.customerEmail}</p>
        </div>
        <div>
          <h3 className="font-bold text-[11px] uppercase tracking-widest text-slate-400 mb-3">Order Details</h3>
          <div className="space-y-3">
            <div>
              <p className="text-xs text-slate-500">Prescribing Doctor</p>
              <p className="font-bold text-sm text-slate-800">{order.prescribingDoctor || "N/A"}</p>
            </div>
            <div>
              <p className="text-xs text-slate-500">Payment Status</p>
              <p className="font-bold text-sm text-green-700 bg-green-100 w-fit px-2 py-0.5 rounded uppercase tracking-wider">{order.paymentStatus}</p>
            </div>
            <div>
              <p className="text-xs text-slate-500">Transaction ID</p>
              <p className="font-mono text-sm text-slate-800">{order.razorpayOrderId || "N/A"}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Items Table */}
      <table className="w-full text-left border-collapse mb-8">
        <thead>
          <tr className="border-y border-slate-200 text-[11px] uppercase tracking-widest font-bold text-slate-500 bg-slate-50">
            <th className="py-4 px-4">Item Description</th>
            <th className="py-4 px-4 text-center">Qty</th>
            <th className="py-4 px-4 text-right">Unit Price</th>
            <th className="py-4 px-4 text-right">Total Amount</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100">
          {order.items.map((item: any) => (
            <tr key={item.id}>
              <td className="py-5 px-4">
                <p className="font-bold text-slate-800 text-sm">{item.product.name}</p>
              </td>
              <td className="py-5 px-4 text-center font-bold text-slate-700">{item.quantity}</td>
              <td className="py-5 px-4 text-right text-sm text-slate-600">₹{item.priceAtPurchase.toFixed(2)}</td>
              <td className="py-5 px-4 text-right font-bold text-slate-800">₹{(item.priceAtPurchase * item.quantity).toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Totals */}
      <div className="flex justify-end border-t-2 border-slate-200 pt-6 mb-12">
        <div className="w-1/2">
          <div className="flex justify-between items-center py-2 text-sm text-slate-600">
            <span>Subtotal</span>
            <span>₹{order.totalAmount.toFixed(2)}</span>
          </div>
          <div className="flex justify-between items-center py-2 text-sm text-slate-600">
            <span>Shipping</span>
            <span>Free</span>
          </div>
          <div className="flex justify-between items-center py-4 mt-2 border-t border-slate-200">
            <span className="font-bold text-lg text-slate-800">Total Paid</span>
            <span className="font-bold text-2xl text-[#1B3F8B]">₹{order.totalAmount.toFixed(2)}</span>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="text-center border-t border-slate-200 pt-8 text-xs text-slate-400">
        <p className="font-bold uppercase tracking-widest text-slate-500 mb-1">Thank you for your business.</p>
        <p>This is a computer-generated invoice and does not require a physical signature.</p>
      </div>

      {/* Auto-print script */}
      <script dangerouslySetInnerHTML={{ __html: 'window.onload = function() { window.print(); }' }} />
    </div>
  );
}
