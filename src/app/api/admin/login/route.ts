import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json({ error: "Credentials required" }, { status: 400 });
    }

    const admin = await prisma.adminUser.findUnique({
      where: { email }
    });

    if (!admin) {
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
    }

    const isValid = await bcrypt.compare(password, admin.password);

    if (!isValid) {
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
    }

    const cookieStore = await cookies();
    cookieStore.set('admin_token', 'secure_admin_session', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 7 // 1 week
    });

    cookieStore.set('admin_username', admin.username, {
      httpOnly: false, // allows client side reading
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 7 // 1 week
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Login error:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
