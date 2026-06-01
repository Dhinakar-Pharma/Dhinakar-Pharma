import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { prisma } from "@/lib/prisma";

async function verifyAdmin() {
  const cookieStore = await cookies();
  const token = cookieStore.get('admin_token');
  return token && token.value === 'secure_admin_session';
}

export async function GET() {
  if (!(await verifyAdmin())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  try {
    const coupons = await prisma.coupon.findMany({ orderBy: { createdAt: 'desc' } });
    return NextResponse.json(coupons);
  } catch (error) {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  if (!(await verifyAdmin())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  try {
    const { name, discountPercentage, maxUses } = await req.json();
    if (!name || discountPercentage == null) {
      return NextResponse.json({ error: "Name and discount percentage required" }, { status: 400 });
    }
    
    // Auto-generate code: take first word of name, remove spaces, uppercase, add random 4 chars
    const baseName = name.split(' ')[0].replace(/[^a-zA-Z0-9]/g, '').toUpperCase();
    const randomSuffix = Math.random().toString(36).substring(2, 6).toUpperCase();
    const generatedCode = `${baseName}-${randomSuffix}`;
    
    const coupon = await prisma.coupon.create({
      data: {
        name,
        code: generatedCode,
        discountPercentage: Number(discountPercentage),
        maxUses: maxUses ? Number(maxUses) : 1,
        uses: 0,
        isActive: true
      }
    });
    return NextResponse.json(coupon);
  } catch (error) {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

export async function PATCH(req: Request) {
  if (!(await verifyAdmin())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  try {
    const { id, isActive } = await req.json();
    const coupon = await prisma.coupon.update({
      where: { id },
      data: { isActive }
    });
    return NextResponse.json(coupon);
  } catch (error) {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  if (!(await verifyAdmin())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  try {
    const { id } = await req.json();
    await prisma.coupon.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
