import { NextResponse } from "next/server";
import { ConvexHttpClient } from "convex/browser";

const convex = new ConvexHttpClient(process.env.NEXT_PUBLIC_CONVEX_URL);

export async function POST(request) {
  try {
    const { name, email, password } = await request.json();
    
    // Call Convex function
    const result = await convex.mutation("auth:register", { name, email, password });
    
    return NextResponse.json({ success: true, userId: result.userId });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error.message || "Registration failed" },
      { status: 400 }
    );
  }
}