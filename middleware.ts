import { auth } from "@/auth";
import { NextRequest, NextResponse } from "next/server";
import { jwtVerify } from "jose"; // Use jose for JWT verification

const secret = new TextEncoder().encode(process.env.JWT_SECRET);

export async function middleware(request: NextRequest) {
  const session = await auth();

  // Redirect unauthenticated users to the login page
  if (!session && request.nextUrl.pathname.startsWith("/manage-hotels")) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // Check for API routes
  if (request.nextUrl.pathname.startsWith("/api")) {
    const authHeader = request.headers.get("Authorization");

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const token = authHeader.split(" ")[1];

    try {
      // Verify the token using jose
      const { payload } = await jwtVerify(token, secret);

      // Check if token is expired
      if (payload.exp && payload.exp < Date.now() / 1000) {
        console.error("Token has expired");
        return NextResponse.json({ message: "Token has expired" }, { status: 403 });
      }

      // Forward user data
      request.headers.set("user", JSON.stringify(payload));
      return NextResponse.next();
    } catch (error) {
      console.error("Token verification failed:", error);
      return NextResponse.json({ message: "Invalid or expired token" }, { status: 403 });
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|auth).*)", // Exclude static files and auth routes
    "/manage-hotels/:path*", // Protect manage-hotels routes
    "/api/hotels/:path*", // Protect /api/hotels routes
  ],
};