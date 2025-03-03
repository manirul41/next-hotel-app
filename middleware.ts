// middleware.ts
import { auth } from "./auth";
import { NextResponse } from "next/server";

export default auth((req) => {
//   if (!req.auth) {
//     // Redirect to login if not authenticated
//     return NextResponse.redirect(new URL("/login", req.url));
//   }
});

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|auth).*)"],
};