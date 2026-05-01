import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function POST(req: Request) {
  try {
    const { username, password } = await req.json();
    const expectedUser = process.env.ADMIN_USERNAME || 'admin';
    const expectedPwd = process.env.ADMIN_PASSWORD || 'pharma123';

    if (username === expectedUser && password === expectedPwd) {
      const cookieStore = await cookies();
      cookieStore.set('admin_token', 'secure_admin_session', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: 60 * 60 * 24 * 7 // 1 week
      });
      return NextResponse.json({ success: true });
    }

    return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
  } catch (error) {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
