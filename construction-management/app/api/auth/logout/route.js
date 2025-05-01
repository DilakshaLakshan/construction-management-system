import { NextResponse } from "next/server";
import { ConvexHttpClient } from "convex/browser";

const convex = new ConvexHttpClient(process.env.NEXT_PUBLIC_CONVEX_URL);

export async function POST(request) {
  try {
    const { token } = await request.json();
    
    // Call Convex function
    await convex.mutation("auth:logout", { token });
    
    // Clear auth cookie
    const response = NextResponse.json({ success: true });
    response.cookies.set({
      name: "authToken",
      value: "",
      httpOnly: true,
      path: "/",
      maxAge: 0,
      sameSite: "lax",
    });
    
    return response;
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error.message || "Logout failed" },
      { status: 500 }
    );
  }
}