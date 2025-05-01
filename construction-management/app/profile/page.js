"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import ProfileCard from "../../components/profile/ProfileCard";

export default function ProfilePage() {
  const router = useRouter();
  const [userId, setUserId] = useState(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    // Check if user is logged in
    const token = localStorage.getItem("authToken");
    if (!token) {
      router.push("/auth/login");
      return;
    }
    
    // Fetch user data
    const fetchUserData = async () => {
      try {
        const response = await fetch("/api/auth/validate", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ token }),
        });
        
        const data = await response.json();
        
        if (data.success && data.user) {
          setUserId(data.user.id);
        } else {
          // Invalid token
          localStorage.removeItem("authToken");
          router.push("/auth/login");
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
        router.push("/auth/login");
      } finally {
        setLoading(false);
      }
    };
    
    fetchUserData();
  }, [router]);
  
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#FF7420]"></div>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      {userId && <ProfileCard userId={userId} />}
    </div>
  );
}