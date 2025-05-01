"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import RegisterForm from "../../../components/auth/RegisterForm";

export default function RegisterPage() {
  const router = useRouter();
  
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
        <RegisterForm />
      </div>
    </div>
  );
}