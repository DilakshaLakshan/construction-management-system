import { NextResponse } from "next/server";

// Paths that don't require authentication
const publicPaths = [
  "/auth/login",
  "/auth/register",
  "/",
  "/Construction/Cfront",
  "/timber",
];

export function middleware(request) {
  const { pathname } = request.nextUrl;
  
  // Check if the path is public
  if (publicPaths.some(path => pathname.startsWith(path))) {
    return NextResponse.next();
  }
  
  // Check if user is authenticated
  const authToken = request.cookies.get("authToken")?.value;
  
  if (!authToken) {
    // Redirect to login page if not authenticated
    const url = new URL("/auth/login", request.url);
    url.searchParams.set("callbackUrl", pathname);
    return NextResponse.redirect(url);
  }
  
  return NextResponse.next();
}

export const config = {
  matcher: [
    // Add paths that require authentication
    "/profile/:path*",
    "/Construction/:path*",
    "/timber/:path*",
    // Exclude public paths and API routes
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
};