"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useMutation } from "convex/react";
import { api } from "../../../convex/_generated/api";

export default function LogoutPage() {
  const router = useRouter();
  const logout = useMutation(api.auth.logout);
  
  useEffect(() => {
    const performLogout = async () => {
      try {
        const token = localStorage.getItem("authToken");
        if (token) {
          await logout({ token });
          localStorage.removeItem("authToken");
          document.cookie = "authToken=; path=/; max-age=0; SameSite=Lax";
        }
      } catch (error) {
        console.error("Error during logout:", error);
      } finally {
        router.push("/auth/login");
      }
    };
    
    performLogout();
  }, [logout, router]);
  
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md text-center">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Logging Out</h2>
        <p className="text-gray-600">Please wait while we log you out...</p>
        <div className="mt-4 flex justify-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#FF7420]"></div>
        </div>
      </div>
    </div>
  );
}