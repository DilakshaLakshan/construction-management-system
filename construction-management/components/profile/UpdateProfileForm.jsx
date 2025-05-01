"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useMutation, useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";
import ProfilePicture from "./ProfilePicture";

export default function UpdateProfileForm({ userId }) {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    address: "",
    company: "",
    bio: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  
  // Get current profile data
  const profile = useQuery(api.users.getProfile, { userId });
  const updateProfile = useMutation(api.users.updateProfile);
  
  // Populate form with existing data when profile is loaded
  useEffect(() => {
    if (profile) {
      setFormData({
        name: profile.name || "",
        phone: profile.phone || "",
        address: profile.address || "",
        company: profile.company || "",
        bio: profile.bio || "",
      });
    }
  }, [profile]);
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);
    
    try {
      await updateProfile({
        userId,
        ...formData,
      });
      
      setSuccess("Profile updated successfully!");
      
      // Redirect back to profile page after a short delay
      setTimeout(() => {
        router.push("/profile");
      }, 1500);
    } catch (error) {
      setError(error.message || "Failed to update profile. Please try again.");
    } finally {
      setLoading(false);
    }
  };
  
  if (!profile) {
    return (
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-3xl animate-pulse">
        <div className="h-8 bg-gray-200 rounded w-1/3 mb-6"></div>
        <div className="space-y-4">
          <div className="h-10 bg-gray-200 rounded"></div>
          <div className="h-10 bg-gray-200 rounded"></div>
          <div className="h-10 bg-gray-200 rounded"></div>
          <div className="h-10 bg-gray-200 rounded"></div>
          <div className="h-32 bg-gray-200 rounded"></div>
        </div>
      </div>
    );
  }
  
  return (
    <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-3xl">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Edit Profile</h2>
      
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}
      
      {success && (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
          {success}
        </div>
      )}
      
      <div className="flex justify-center mb-8">
        <ProfilePicture 
          userId={userId} 
          profilePicture={profile.profilePicture} 
          name={profile.name} 
          size={128} 
          editable={true} 
        />
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="name" className="block text-gray-700 font-medium mb-1">
            Full Name
          </label>
          <input
            id="name"
            name="name"
            type="text"
            value={formData.name}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF7420]"
            required
          />
        </div>
        
        <div>
          <label htmlFor="phone" className="block text-gray-700 font-medium mb-1">
            Phone Number
          </label>
          <input
            id="phone"
            name="phone"
            type="tel"
            value={formData.phone}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF7420]"
          />
        </div>
        
        <div>
          <label htmlFor="address" className="block text-gray-700 font-medium mb-1">
            Address
          </label>
          <input
            id="address"
            name="address"
            type="text"
            value={formData.address}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF7420]"
          />
        </div>
        
        <div>
          <label htmlFor="company" className="block text-gray-700 font-medium mb-1">
            Company
          </label>
          <input
            id="company"
            name="company"
            type="text"
            value={formData.company}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF7420]"
          />
        </div>
        
        <div>
          <label htmlFor="bio" className="block text-gray-700 font-medium mb-1">
            Bio
          </label>
          <textarea
            id="bio"
            name="bio"
            value={formData.bio}
            onChange={handleChange}
            rows={4}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF7420]"
          />
        </div>
        
        <div className="flex gap-3">
          <button
            type="submit"
            disabled={loading}
            className="px-6 py-2 bg-[#FF7420] text-white rounded-lg hover:bg-[#FF7420]/90 transition-colors"
          >
            {loading ? "Saving..." : "Save Changes"}
          </button>
          
          <button
            type="button"
            onClick={() => router.push("/profile")}
            className="px-6 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-colors"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}