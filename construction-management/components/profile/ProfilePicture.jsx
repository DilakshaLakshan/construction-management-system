"use client";
import { useState } from "react";
import Image from "next/image";
import { useMutation } from "convex/react";
import { api } from "../../convex/_generated/api";
import { fileToBase64 } from "../../lib/utils";

export default function ProfilePicture({ userId, profilePicture, name, size = 128, editable = false }) {
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState("");
  
  const updateProfilePicture = useMutation(api.users.updateProfilePicture);
  const deleteProfilePicture = useMutation(api.users.deleteProfilePicture);
  
  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    
    // Validate file type
    if (!file.type.startsWith("image/")) {
      setError("Please select an image file");
      return;
    }
    
    // Validate file size (max 2MB)
    if (file.size > 2 * 1024 * 1024) {
      setError("Image size should be less than 2MB");
      return;
    }
    
    setIsUploading(true);
    setError("");
    
    try {
      // Convert file to base64
      const base64Image = await fileToBase64(file);
      
      // Update profile picture in database
      await updateProfilePicture({
        userId,
        profilePicture: base64Image,
      });
      
      // Force refresh to show new image
      window.location.reload();
    } catch (error) {
      setError("Failed to upload image. Please try again.");
      console.error("Error uploading profile picture:", error);
    } finally {
      setIsUploading(false);
    }
  };
  
  const handleDelete = async () => {
    if (!confirm("Are you sure you want to remove your profile picture?")) {
      return;
    }
    
    try {
      await deleteProfilePicture({ userId });
      // Force refresh to update UI
      window.location.reload();
    } catch (error) {
      setError("Failed to delete profile picture");
      console.error("Error deleting profile picture:", error);
    }
  };
  
  // Generate initials for avatar fallback
  const getInitials = () => {
    if (!name) return "?";
    return name
      .split(" ")
      .map(part => part[0])
      .join("")
      .toUpperCase()
      .substring(0, 2);
  };
  
  return (
    <div className="relative">
      {profilePicture ? (
        <div 
          className="relative rounded-full overflow-hidden"
          style={{ width: `${size}px`, height: `${size}px` }}
        >
          <Image
            src={profilePicture}
            alt={name || "Profile"}
            width={size}
            height={size}
            className="object-cover"
          />
        </div>
      ) : (
        <div 
          className="flex items-center justify-center bg-gray-200 text-gray-600 rounded-full"
          style={{ width: `${size}px`, height: `${size}px` }}
        >
          <span className="text-xl font-medium">{getInitials()}</span>
        </div>
      )}
      
      {editable && (
        <div className="mt-3 flex flex-col gap-2">
          <label className="cursor-pointer px-3 py-1.5 bg-[#FF7420] text-white text-sm rounded-lg hover:bg-[#FF7420]/90 transition-colors text-center">
            {isUploading ? "Uploading..." : "Change Picture"}
            <input 
              type="file" 
              accept="image/*" 
              className="hidden" 
              onChange={handleFileChange}
              disabled={isUploading}
            />
          </label>
          
          {profilePicture && (
            <button
              onClick={handleDelete}
              className="px-3 py-1.5 bg-gray-200 text-gray-700 text-sm rounded-lg hover:bg-gray-300 transition-colors"
            >
              Remove Picture
            </button>
          )}
          
          {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
        </div>
      )}
    </div>
  );
}