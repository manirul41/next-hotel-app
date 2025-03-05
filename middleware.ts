// middleware.ts
import { auth } from "@/auth";
import { NextRequest, NextResponse } from "next/server";


export async function middleware(request: NextRequest) {
  const session = await auth();

  // Redirect unauthenticated users to the login page
  if (!session && request.nextUrl.pathname.startsWith("/manage-hotels")) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|auth).*)", "/manage-hotels/:path*"],
};