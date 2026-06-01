import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";

// Helper to verify admin token
async function verifyAdmin() {
  const cookieStore = await cookies();
  const token = cookieStore.get('admin_token');
  return token && token.value === 'secure_admin_session';
}

export async function GET() {
  if (!(await verifyAdmin())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  
  try {
    const admins = await prisma.adminUser.findMany({
      select: { id: true, email: true, username: true, createdAt: true },
      orderBy: { createdAt: 'desc' }
    });
    return NextResponse.json(admins);
  } catch (error) {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  if (!(await verifyAdmin())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const { email, username, password } = await req.json();

    if (!email || !username || !password || username.length < 3 || password.length < 6) {
      return NextResponse.json({ error: "Email, Username (min 3), and Password (min 6) required" }, { status: 400 });
    }
    
    const usernameRegex = /^[a-zA-Z0-9_]+$/;
    if (!usernameRegex.test(username)) {
      return NextResponse.json({ error: "Username can only contain letters, numbers, and underscores" }, { status: 400 });
    }

    const existingAdminUser = await prisma.adminUser.findUnique({ where: { username } });
    if (existingAdminUser) {
      return NextResponse.json({ error: "Username already taken" }, { status: 400 });
    }

    const existingAdminEmail = await prisma.adminUser.findUnique({ where: { email } });
    if (existingAdminEmail) {
      return NextResponse.json({ error: "Email already taken" }, { status: 400 });
    }

    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);

    const newAdmin = await prisma.adminUser.create({
      data: {
        email,
        username,
        password: passwordHash
      },
      select: { id: true, email: true, username: true, createdAt: true }
    });

    return NextResponse.json(newAdmin);
  } catch (error) {
    console.error("Error creating admin:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  if (!(await verifyAdmin())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  try {
    const { id } = await req.json();
    
    // Prevent deleting the very last admin
    const count = await prisma.adminUser.count();
    if (count <= 1) {
      return NextResponse.json({ error: "Cannot delete the last admin" }, { status: 400 });
    }

    await prisma.adminUser.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
