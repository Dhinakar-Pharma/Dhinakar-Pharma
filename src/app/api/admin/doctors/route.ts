import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const doctors = await prisma.doctor.findMany({
      orderBy: { createdAt: 'desc' }
    });
    return NextResponse.json(doctors);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch doctors" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const { name, codePrefix } = await req.json();
    if (!name || !codePrefix) {
      return NextResponse.json({ error: "Name and Code Prefix are required" }, { status: 400 });
    }
    
    // Check if prefix already exists
    const existing = await prisma.doctor.findUnique({
      where: { codePrefix: codePrefix.toUpperCase() }
    });
    
    if (existing) {
      return NextResponse.json({ error: "Prefix already exists" }, { status: 400 });
    }

    const doctor = await prisma.doctor.create({
      data: {
        name,
        codePrefix: codePrefix.toUpperCase()
      }
    });

    return NextResponse.json(doctor);
  } catch (error) {
    return NextResponse.json({ error: "Failed to create doctor" }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  try {
    const { id } = await req.json();
    if (!id) {
      return NextResponse.json({ error: "ID is required" }, { status: 400 });
    }

    await prisma.doctor.delete({
      where: { id }
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: "Failed to delete doctor" }, { status: 500 });
  }
}
