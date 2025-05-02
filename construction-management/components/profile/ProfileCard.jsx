"use client";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useMutation, useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";
import { formatDate } from "../../lib/utils";
import ProfilePicture from "./ProfilePicture";

export default function ProfileCard({ userId }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  
  // Get user profile data
  const profile = useQuery(api.users.getProfile, { userId });
  const logout = useMutation(api.auth.logout);
  
  const handleLogout = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("authToken");
      if (token) {
        await logout({ token });
        localStorage.removeItem("authToken");
        document.cookie = "authToken=; path=/; max-age=0; SameSite=Lax";
      }
      router.push("/auth/login");
    } catch (error) {
      console.error("Error logging out:", error);
    } finally {
      setLoading(false);
    }
  };
  
  if (!profile) {
    return (
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-3xl animate-pulse">
        <div className="flex flex-col items-center space-y-4">
          <div className="w-32 h-32 bg-gray-200 rounded-full"></div>
          <div className="h-8 bg-gray-200 rounded w-1/2"></div>
          <div className="h-4 bg-gray-200 rounded w-1/3"></div>
        </div>
        <div className="mt-8 space-y-4">
          <div className="h-6 bg-gray-200 rounded"></div>
          <div className="h-6 bg-gray-200 rounded"></div>
          <div className="h-6 bg-gray-200 rounded"></div>
        </div>
      </div>
    );
  }
  
  return (
    <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-3xl">
      <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
        <div className="flex flex-col items-center">
          <ProfilePicture 
            userId={userId} 
            profilePicture={profile.profilePicture} 
            name={profile.name} 
            size={128} 
          />
          
          <div className="mt-4 flex flex-col items-center">
            <h1 className="text-2xl font-bold text-gray-800">{profile.name}</h1>
            <p className="text-gray-500">{profile.email}</p>
            {profile.role && <span className="mt-1 px-3 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded-full">{profile.role}</span>}
          </div>
        </div>
        
        <div className="flex-1 w-full">
          <div className="space-y-4">
            {profile.phone && (
              <div>
                <h3 className="text-sm font-medium text-gray-500">Phone</h3>
                <p className="text-gray-800">{profile.phone}</p>
              </div>
            )}
            
            {profile.address && (
              <div>
                <h3 className="text-sm font-medium text-gray-500">Address</h3>
                <p className="text-gray-800">{profile.address}</p>
              </div>
            )}
            
            {profile.company && (
              <div>
                <h3 className="text-sm font-medium text-gray-500">Company</h3>
                <p className="text-gray-800">{profile.company}</p>
              </div>
            )}
            
            {profile.bio && (
              <div>
                <h3 className="text-sm font-medium text-gray-500">Bio</h3>
                <p className="text-gray-800">{profile.bio}</p>
              </div>
            )}
            
            <div>
              <h3 className="text-sm font-medium text-gray-500">Member Since</h3>
              <p className="text-gray-800">{formatDate(profile.createdAt)}</p>
            </div>
          </div>
          
          <div className="mt-8 flex flex-wrap gap-3">
            <Link 
              href="/profile/edit" 
              className="px-4 py-2 bg-[#FF7420] text-white rounded-lg hover:bg-[#FF7420]/90 transition-colors"
            >
              Edit Profile
            </Link>
            
            <button
              onClick={handleLogout}
              disabled={loading}
              className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-colors"
            >
              {loading ? "Logging out..." : "Logout"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}