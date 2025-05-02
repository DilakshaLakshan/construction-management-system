"use client";
import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { FiUser, FiCamera, FiSave, FiArrowLeft, FiTrash2 } from "react-icons/fi";
import Image from "next/image";
import { useMutation, useQuery } from "convex/react";
import { api } from "../../../convex/_generated/api";

export default function ProfileEditPage() {
  const router = useRouter();
  const fileInputRef = useRef(null);
  const [userId, setUserId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [profileImage, setProfileImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  
  // Form state
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    company: "",
    bio: ""
  });
  
  // Convex mutations
  const updateProfile = useMutation(api.users.updateProfile);
  const updateProfilePicture = useMutation(api.users.updateProfilePicture);
  const deleteProfilePicture = useMutation(api.users.deleteProfilePicture);
  
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
          setFormData({
            name: data.user.name || "",
            email: data.user.email || "",
            phone: data.user.phone || "",
            address: data.user.address || "",
            company: data.user.company || "",
            bio: data.user.bio || ""
          });
          
          if (data.user.profilePicture) {
            setImagePreview(data.user.profilePicture);
          }
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

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfileImage(file);
      
      // Create preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveImage = async () => {
    if (confirm("Are you sure you want to remove your profile picture?")) {
      try {
        await deleteProfilePicture({ userId });
        setProfileImage(null);
        setImagePreview(null);
      } catch (error) {
        console.error("Error removing profile picture:", error);
        alert("Failed to remove profile picture");
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    
    try {
      // Update profile information
      await updateProfile({
        userId,
        name: formData.name,
        phone: formData.phone,
        address: formData.address,
        company: formData.company,
        bio: formData.bio
      });
      
      // Update profile picture if changed
      if (profileImage) {
        // In a real app, you would upload the image to a storage service
        // and then save the URL. For this example, we'll use the base64 string
        await updateProfilePicture({
          userId,
          profilePicture: imagePreview
        });
      }
      
      alert("Profile updated successfully!");
      router.push("/profile");
    } catch (error) {
      console.error("Error updating profile:", error);
      alert("Failed to update profile");
    } finally {
      setSaving(false);
    }
  };
  
  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="w-24 h-24 relative">
          <div className="absolute inset-0 rounded-full border-t-4 border-[#FF7420] animate-spin"></div>
          <div className="absolute inset-2 rounded-full bg-white flex items-center justify-center">
            <Image 
              src="/logo.png" 
              alt="Logo" 
              width={40} 
              height={40}
              className="opacity-70"
            />
          </div>
        </div>
        <p className="mt-4 text-gray-600 font-medium">Loading your profile...</p>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-8">
      <div className="container mx-auto px-4">
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-6"
        >
          <button 
            onClick={() => router.push("/profile")}
            className="flex items-center gap-2 text-gray-600 hover:text-[#FF7420] transition-colors"
          >
            <FiArrowLeft /> Back to Profile
          </button>
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="bg-white rounded-xl shadow-md overflow-hidden"
        >
          <div className="p-6 bg-gradient-to-r from-[#FF7420] to-[#FF9D5C] text-white">
            <h1 className="text-2xl font-bold">Edit Profile</h1>
            <p className="text-white/80">Update your personal information</p>
          </div>
          
          <form onSubmit={handleSubmit} className="p-6">
            {/* Profile Picture */}
            <div className="flex flex-col items-center mb-8">
              <div className="relative mb-4">
                <div className="w-32 h-32 rounded-full overflow-hidden bg-gray-200 border-4 border-white shadow-md">
                  {imagePreview ? (
                    <Image 
                      src={imagePreview} 
                      alt="Profile" 
                      width={128} 
                      height={128}
                      className="object-cover w-full h-full"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-gray-100">
                      <FiUser className="text-gray-400 text-4xl" />
                    </div>
                  )}
                </div>
                <button 
                  type="button"
                  onClick={() => fileInputRef.current.click()}
                  className="absolute bottom-0 right-0 bg-[#FF7420] text-white p-2 rounded-full shadow-md hover:bg-[#FF9D5C] transition-colors"
                >
                  <FiCamera />
                </button>
              </div>
              <input 
                type="file" 
                ref={fileInputRef}
                onChange={handleFileChange}
                accept="image/*"
                className="hidden"
              />
              {imagePreview && (
                <button 
                  type="button"
                  onClick={handleRemoveImage}
                  className="text-red-500 text-sm flex items-center gap-1 hover:text-red-700 transition-colors"
                >
                  <FiTrash2 size={14} /> Remove photo
                </button>
              )}
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Basic Information */}
              <div className="space-y-4">
                <h2 className="text-xl font-semibold text-gray-800 border-b pb-2">Basic Information</h2>
                
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF7420] focus:border-transparent"
                    required
                  />
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-100"
                    disabled
                  />
                  <p className="text-xs text-gray-500 mt-1">Email cannot be changed</p>
                </div>
                
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF7420] focus:border-transparent"
                  />
                </div>
              </div>
              
              {/* Additional Information */}
              <div className="space-y-4">
                <h2 className="text-xl font-semibold text-gray-800 border-b pb-2">Additional Information</h2>
                
                <div>
                  <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">Address</label>
                  <input
                    type="text"
                    id="address"
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF7420] focus:border-transparent"
                  />
                </div>
                
                <div>
                  <label htmlFor="company" className="block text-sm font-medium text-gray-700 mb-1">Company</label>
                  <input
                    type="text"
                    id="company"
                    name="company"
                    value={formData.company}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF7420] focus:border-transparent"
                  />
                </div>
                
                <div>
                  <label htmlFor="bio" className="block text-sm font-medium text-gray-700 mb-1">Bio</label>
                  <textarea
                    id="bio"
                    name="bio"
                    value={formData.bio}
                    onChange={handleInputChange}
                    rows={4}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF7420] focus:border-transparent"
                    placeholder="Tell us about yourself..."
                  />
                </div>
              </div>
            </div>
            
            <div className="mt-8 flex justify-end">
              <button
                type="button"
                onClick={() => router.push("/profile")}
                className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 mr-4 hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={saving}
                className="px-6 py-2 bg-[#FF7420] text-white rounded-lg hover:bg-[#FF9D5C] transition-colors flex items-center gap-2 disabled:opacity-70"
              >
                {saving ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Saving...
                  </>
                ) : (
                  <>
                    <FiSave /> Save Changes
                  </>
                )}
              </button>
            </div>
          </form>
        </motion.div>
        
        {/* Advanced Settings */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-8 bg-white rounded-xl shadow-md overflow-hidden"
        >
          <div className="p-6 bg-gradient-to-r from-gray-700 to-gray-900 text-white">
            <h2 className="text-xl font-bold">Advanced Settings</h2>
            <p className="text-white/80">Manage your account preferences and security</p>
          </div>
          
          <div className="p-6 space-y-8">
            {/* Notification Preferences */}
            <div>
              <h3 className="text-lg font-medium text-gray-800 mb-4 border-b pb-2">Notification Preferences</h3>
              <div className="space-y-3">
                <label className="flex items-center">
                  <input type="checkbox" className="form-checkbox h-5 w-5 text-[#FF7420] rounded" defaultChecked />
                  <span className="ml-2 text-gray-700">Email notifications for project updates</span>
                </label>
                <label className="flex items-center">
                  <input type="checkbox" className="form-checkbox h-5 w-5 text-[#FF7420] rounded" defaultChecked />
                  <span className="ml-2 text-gray-700">Email notifications for timber inventory changes</span>
                </label>
                <label className="flex items-center">
                  <input type="checkbox" className="form-checkbox h-5 w-5 text-[#FF7420] rounded" defaultChecked />
                  <span className="ml-2 text-gray-700">Email notifications for construction updates</span>
                </label>
                <label className="flex items-center">
                  <input type="checkbox" className="form-checkbox h-5 w-5 text-[#FF7420] rounded" />
                  <span className="ml-2 text-gray-700">Marketing emails and newsletters</span>
                </label>
              </div>
            </div>
            
            {/* Security Settings */}
            <div>
              <h3 className="text-lg font-medium text-gray-800 mb-4 border-b pb-2">Security Settings</h3>
              <div className="space-y-4">
                <div>
                  <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors flex items-center gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                    </svg>
                    Change Password
                  </button>
                </div>
                
                <div>
                  <label className="flex items-center">
                    <input type="checkbox" className="form-checkbox h-5 w-5 text-[#FF7420] rounded" defaultChecked />
                    <span className="ml-2 text-gray-700">Enable two-factor authentication</span>
                  </label>
                </div>
                
                <div>
                  <p className="text-sm text-gray-600 mb-2">Last login: Yesterday at 2:30 PM</p>
                  <button className="text-blue-600 text-sm hover:text-blue-800 transition-colors">
                    View login history
                  </button>
                </div>
              </div>
            </div>
            
            {/* Account Management */}
            <div>
              <h3 className="text-lg font-medium text-gray-800 mb-4 border-b pb-2">Account Management</h3>
              <div className="space-y-4">
                <div>
                  <button className="px-4 py-2 bg-yellow-50 text-yellow-700 rounded-lg hover:bg-yellow-100 transition-colors flex items-center gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                    Deactivate Account
                  </button>
                  <p className="text-xs text-gray-500 mt-1">Temporarily disable your account</p>
                </div>
                
                <div>
                  <button className="px-4 py-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors flex items-center gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                    Delete Account
                  </button>
                  <p className="text-xs text-gray-500 mt-1">Permanently delete your account and all data</p>
                </div>
              </div>
            </div>
            
            {/* Data Export */}
            <div>
              <h3 className="text-lg font-medium text-gray-800 mb-4 border-b pb-2">Data & Privacy</h3>
              <div className="space-y-4">
                <div>
                  <button className="px-4 py-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors flex items-center gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                    Export My Data
                  </button>
                  <p className="text-xs text-gray-500 mt-1">Download all your personal data</p>
                </div>
                
                <div>
                  <button className="text-blue-600 text-sm hover:text-blue-800 transition-colors">
                    View Privacy Policy
                  </button>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}