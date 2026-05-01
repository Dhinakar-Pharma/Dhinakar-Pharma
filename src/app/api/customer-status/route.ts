import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const { email } = await req.json();
    
    if (!email) {
      return NextResponse.json({ error: "Email required" }, { status: 400 });
    }
    
    // find any successful order for this email
    const order = await prisma.order.findFirst({
      where: {
        customerEmail: email,
        paymentStatus: "SUCCESS",
      }
    });

    if (order) {
      return NextResponse.json({ isReturningCustomer: true, discountPercentage: 15 });
    } else {
      return NextResponse.json({ isReturningCustomer: false, discountPercentage: 20 });
    }

  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
