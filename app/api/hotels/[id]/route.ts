import { NextResponse, NextRequest } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(request: NextRequest, { params }: any) {
  const { id } = await params
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

export async function PUT(request: NextRequest, { params } : any) {
  const { id } = params
  try {
    const { name, address, costPerNight, availableRooms, image, rating } = await request.json();

    const updatedHotel = await prisma.hotel.update({
      where: { id: parseInt(id) },
      data: {
        name,
        address,
        costPerNight,
        availableRooms,
        image,
        rating,
      },
    });

    return NextResponse.json({ hotel: updatedHotel }, { status: 200 });
  } catch (error) {
    console.error("Error updating hotel:", error);
    return NextResponse.json(
      { error: "Failed to update hotel" },
      { status: 500 }
    );
  }
}