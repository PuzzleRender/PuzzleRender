import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const publicPaths = ["/signin", "/signup", "/api/auth"];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (publicPaths.includes(pathname)) {
    return NextResponse.next();
  }
  const token = request.cookies.get("token")?.value;

  if (!token) {
    const signInUrl = new URL("/signin", request.url);
    return NextResponse.redirect(signInUrl);
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/account/:path*", "/puzzles/:path*"],
};
