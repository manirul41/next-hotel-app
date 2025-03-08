import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { auth } from "@/auth";

const prisma = new PrismaClient();

export async function POST(request: NextRequest) {
  try {
    const session = await auth();
    // console.log("first request222", session);
    if (!session) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const { name, address, costPerNight, availableRooms, image, rating } = await request.json();

    // Create the hotel in the database
    const hotel = await prisma.hotel.create({
      data: {
        name,
        address,
        costPerNight,
        availableRooms,
        image,
        rating,
        userId: parseInt(session?.user?.id ?? ''),
      },
    });

    return NextResponse.json({ hotel }, { status: 201 });
  } catch (error) {
    console.error("Error creating hotel:", error);
    return NextResponse.json(
      { error: "Failed to create hotel" },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const session = await auth();
    // console.log("first request", session);
    if (!session) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const hotels = await prisma.hotel.findMany({
      where: {
        userId: parseInt(session?.user?.id ?? ''), // Filter by user ID
      },
    });

    return NextResponse.json({ hotels }, { status: 200 });
  } catch (error) {
    console.error("Error fetching hotels:", error);
    return NextResponse.json(
      { error: "Failed to fetch hotels" },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  console.log("called")
  try {
    const session = await auth();
    if (!session) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const { id } = await request.json();

    const hotel = await prisma.hotel.findUnique({
      where: { id: parseInt(id) },
    });

    if (!hotel) {
      return NextResponse.json(
        { error: "Hotel not found" },
        { status: 404 }
      );
    }

    if (hotel.userId !== parseInt(session?.user?.id ?? "")) {
      return NextResponse.json(
        { error: "You are not authorized to delete this hotel" },
        { status: 403 }
      );
    }

    // Delete the hotel
    await prisma.hotel.delete({
      where: { id: parseInt(id) },
    });

    return NextResponse.json(
      { message: "Hotel deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error deleting hotel:", error);
    return NextResponse.json(
      { error: "Failed to delete hotel" },
      { status: 500 }
    );
  }
}