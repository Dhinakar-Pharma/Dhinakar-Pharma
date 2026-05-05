import { NextResponse } from "next/server";
import crypto from "crypto";
import { prisma } from "@/lib/prisma";
import { sendOrderReceiptEmail } from "@/lib/email";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature, dbOrderId } = body;

    const secret = (process.env.RAZORPAY_KEY_SECRET as string)?.trim();

    console.log("--- VERIFYING PAYMENT ---");
    console.log("Order ID:", razorpay_order_id);
    console.log("Payment ID:", razorpay_payment_id);
    console.log("Secret length:", secret?.length);

    // Securely verify the signature from Razorpay
    const generated_signature = crypto
      .createHmac("sha256", secret)
      .update(razorpay_order_id + "|" + razorpay_payment_id)
      .digest("hex");

    console.log("Expected Sig:", generated_signature);
    console.log("Received Sig:", razorpay_signature);

    if (generated_signature === razorpay_signature) {
      // 1. Payment is authentic! Update Order to SUCCESS
      const order = await prisma.order.update({
        where: { id: dbOrderId },
        data: { paymentStatus: "SUCCESS" }
      });

      // 2. Update Payment log to SUCCESS
      await prisma.payment.updateMany({
        where: { orderId: dbOrderId, transactionId: razorpay_order_id },
        data: { 
          status: "SUCCESS",
          transactionId: razorpay_payment_id // Swap to the actual final payment receipt ID
        }
      });

      // 3. Send Email Receipt automatically
      await sendOrderReceiptEmail(order);

      return NextResponse.json({ success: true });
    } else {
      console.error("Signature Mismatch!");
      
      // Fake or Invalid payment signature! Security catch.
      await prisma.payment.updateMany({
        where: { orderId: dbOrderId, transactionId: razorpay_order_id },
        data: { status: "FAILED", errorMessage: "Signature verification failed" }
      });
      await prisma.order.update({
        where: { id: dbOrderId },
        data: { paymentStatus: "FAILED" }
      });

      return NextResponse.json({ success: false, error: "Signature Mismatch", details: { expected: generated_signature, received: razorpay_signature } });
    }

  } catch (error: any) {
    console.error("Verify Route Error:", error);
    return NextResponse.json({ success: false, error: error.message });
  }
}
