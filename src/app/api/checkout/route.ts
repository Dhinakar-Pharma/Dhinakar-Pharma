import { NextResponse } from "next/server";
import Razorpay from "razorpay";
import { prisma } from "@/lib/prisma";

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID as string,
  key_secret: process.env.RAZORPAY_KEY_SECRET as string,
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { items, customerName, customerEmail, customerPhone, shippingAddress } = body;

    // Security check: We fetch the price directly from the database
    // so users can't manipulate the price from the frontend!
    const productIds = items.map((i: any) => i.productId);
    const products = await prisma.product.findMany({
      where: { id: { in: productIds } }
    });

    if (products.length !== items.length) {
      return NextResponse.json({ error: "One or more products not found" }, { status: 404 });
    }

    let totalAmount = 0;
    const orderItemsData = items.map((item: any) => {
      const product = products.find(p => p.id === item.productId);
      totalAmount += (product!.price * item.quantity);
      return {
        productId: product!.id,
        quantity: item.quantity,
        priceAtPurchase: product!.price
      };
    });

    // 1. Create DB Order first with the nested items
    const dbOrder = await prisma.order.create({
      data: {
        customerName,
        customerEmail: customerEmail || "",
        customerPhone,
        shippingAddress,
        totalAmount,
        paymentStatus: "PENDING",
        fulfillmentStatus: "PROCESSING",
        items: {
          create: orderItemsData
        }
      }
    });

    // 3. Create the Razorpay Order
    const options = {
      amount: totalAmount * 100, // Razorpay takes amount in paise (1 INR = 100 Paise)
      currency: "INR",
      receipt: dbOrder.id,
    };
    const rzpOrder = await razorpay.orders.create(options);

    // 4. Update our DB Order to store the Razorpay Order ID
    await prisma.order.update({
      where: { id: dbOrder.id },
      data: { razorpayOrderId: rzpOrder.id }
    });

    // 5. Create a Payment log record
    await prisma.payment.create({
      data: {
        orderId: dbOrder.id,
        amount: totalAmount,
        currency: "INR",
        status: "PENDING",
        gateway: "RAZORPAY",
        transactionId: rzpOrder.id
      }
    });

    // Send back the details to the frontend to open the Razorpay popup
    return NextResponse.json({
      dbOrderId: dbOrder.id,
      orderId: rzpOrder.id,
      amount: options.amount,
      currency: "INR",
    });

  } catch (error: any) {
    console.error(error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
