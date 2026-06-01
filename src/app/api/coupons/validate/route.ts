import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const { code } = await req.json();
    if (!code) {
      return NextResponse.json({ error: "No code provided" }, { status: 400 });
    }

    const formattedCode = code.toUpperCase().trim();
    
    const coupon = await prisma.coupon.findUnique({
      where: { code: formattedCode }
    });

    if (!coupon) {
      return NextResponse.json({ error: "Invalid promo code" }, { status: 404 });
    }

    if (!coupon.isActive) {
      return NextResponse.json({ error: "This promo code is no longer active" }, { status: 400 });
    }

    if (coupon.uses >= coupon.maxUses) {
      return NextResponse.json({ error: "This promo code has reached its usage limit" }, { status: 400 });
    }

    return NextResponse.json({
      success: true,
      code: coupon.code,
      discountPercentage: coupon.discountPercentage
    });

  } catch (error) {
    console.error("Error validating coupon:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
