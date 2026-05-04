import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const { orderId, email } = await req.json();

    if (!orderId || !email) {
      return NextResponse.json({ error: "Order ID and Email are required" }, { status: 400 });
    }

    const order = await prisma.order.findFirst({
      where: {
        id: orderId.trim(),
        customerEmail: {
          equals: email.trim(),
          mode: 'insensitive' // case-insensitive match
        },
        paymentStatus: "SUCCESS"
      },
      include: {
        items: {
          include: {
            product: {
              select: { name: true, images: true }
            }
          }
        }
      }
    });

    if (!order) {
      return NextResponse.json({ error: "Order not found or access denied." }, { status: 404 });
    }

    return NextResponse.json(order);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
