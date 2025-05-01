import { NextResponse } from "next/server";
import { ConvexHttpClient } from "convex/browser";

const convex = new ConvexHttpClient(process.env.NEXT_PUBLIC_CONVEX_URL);

export async function POST(request) {
  try {
    const { email, password } = await request.json();
    
    // Call Convex function
    const result = await convex.mutation("auth:login", { email, password });
    
    // Set cookie for server-side auth
    const response = NextResponse.json({ success: true, user: result.user });
    response.cookies.set({
      name: "authToken",
      value: result.token,
      httpOnly: true,
      path: "/",
      maxAge: 30 * 24 * 60 * 60, // 30 days
      sameSite: "lax",
    });
    
    return response;
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error.message || "Login failed" },
      { status: 401 }
    );
  }
}