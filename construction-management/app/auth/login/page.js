"use client";
import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import LoginForm from "../../../components/auth/LoginForm";

export default function LoginPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const registered = searchParams.get("registered");
  
  // Check if user is already logged in
  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (token) {
      router.push("/profile");
    }
  }, [router]);
  
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="w-full max-w-md">
        {registered && (
          <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
            Registration successful! Please log in with your credentials.
          </div>
        )}
        <LoginForm />
      </div>
    </div>
  );
}