import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { SignJWT } from "jose";

const prisma = new PrismaClient();
const accessSecret = new TextEncoder().encode(process.env.JWT_SECRET);
const refreshSecret = new TextEncoder().encode(process.env.REFRESH_SECRET);

// 🔹 Generate a new access token
const generateAccessToken = async (user: any) => {
  return await new SignJWT({ id: user.id, email: user.email })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("15m") // Set your desired expiry time
    .sign(accessSecret);
};

// 🔹 Generate a new refresh token
const generateRefreshToken = async (user: any) => {
  return await new SignJWT({ id: user.id })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("7d") // Refresh token expiry time
    .sign(refreshSecret);
};

export async function POST(request: NextRequest) {
  try {
    const { refreshToken } = await request.json();
    if (!refreshToken) {
      return NextResponse.json(
        { error: "No refresh token provided" },
        { status: 400 }
      );
    }

    // 🔹 Find the user with this refresh token
    const user = await prisma.user.findUnique({
      where: { id: 2, refreshToken },
    });

    if (!user) {
      return NextResponse.json(
        { error: "Invalid refresh token" },
        { status: 403 }
      );
    }

    // 🔹 Generate new tokens
    const newAccessToken = await generateAccessToken(user);
    const newRefreshToken = await generateRefreshToken(user);

    // 🔹 Update refresh token in database
    await prisma.user.update({
      where: { id: user.id },
      data: { refreshToken: newRefreshToken },
    });

    return NextResponse.json(
      { accessToken: newAccessToken, refreshToken: newRefreshToken },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error refreshing token:", error);
    return NextResponse.json(
      { error: "Invalid or expired token" },
      { status: 403 }
    );
  }
}
