import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(request: NextRequest, { params }: any) {
    const { id } = await params;
  try {
    const hotel = await prisma.hotel.findUnique({
      where: { id: parseInt(id) },
    });

    if (!hotel) {
      return NextResponse.json({ error: "Hotel not found" }, { status: 404 });
    }

    return NextResponse.json({ hotel }, { status: 200 });
  } catch (error) {
    console.error("Error fetching hotel:", error);
    return NextResponse.json(
      { error: "Failed to fetch hotel" },
      { status: 500 }
    );
  }
}