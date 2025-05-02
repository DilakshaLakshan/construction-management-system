"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import ProfileCard from "../../components/profile/ProfileCard";
import { motion } from "framer-motion";
import { FiUser, FiSettings, FiLogOut, FiActivity, FiFileText, FiTruck } from "react-icons/fi";
import Image from "next/image";

export default function ProfilePage() {
  const router = useRouter();
  const [userId, setUserId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState(null);
  const [activeTab, setActiveTab] = useState("profile");
  
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
          setUserData(data.user);
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

  const handleLogout = async () => {
    try {
      const token = localStorage.getItem("authToken");
      if (token) {
        await fetch("/api/auth/logout", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ token }),
        });
        localStorage.removeItem("authToken");
      }
      router.push("/auth/login");
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  const navigateTo = (path) => {
    router.push(path);
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
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Header with user welcome */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white shadow-md"
      >
        <div className="container mx-auto px-4 py-6 flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">
              Welcome, {userData?.name || "User"}
            </h1>
            <p className="text-gray-600">{userData?.email}</p>
          </div>
          <button 
            onClick={handleLogout}
            className="flex items-center gap-2 px-4 py-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors"
          >
            <FiLogOut /> Logout
          </button>
        </div>
      </motion.div>
      
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Sidebar */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="w-full md:w-64 bg-white rounded-xl shadow-md overflow-hidden"
          >
            <div className="p-6 bg-gradient-to-r from-[#FF7420] to-[#FF9D5C] text-white">
              <h2 className="text-xl font-bold">Dashboard</h2>
            </div>
            <nav className="p-4">
              <ul className="space-y-2">
                <li>
                  <button 
                    onClick={() => setActiveTab("profile")}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                      activeTab === "profile" 
                        ? "bg-orange-50 text-[#FF7420]" 
                        : "text-gray-700 hover:bg-gray-100"
                    }`}
                  >
                    <FiUser /> Profile
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => setActiveTab("activity")}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                      activeTab === "activity" 
                        ? "bg-orange-50 text-[#FF7420]" 
                        : "text-gray-700 hover:bg-gray-100"
                    }`}
                  >
                    <FiActivity /> Activity
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => navigateTo("/timber")}
                    className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors"
                  >
                    <FiTruck /> Timber Management
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => navigateTo("/Construction")}
                    className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors"
                  >
                    <FiFileText /> Construction
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => setActiveTab("settings")}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                      activeTab === "settings" 
                        ? "bg-orange-50 text-[#FF7420]" 
                        : "text-gray-700 hover:bg-gray-100"
                    }`}
                  >
                    <FiSettings /> Settings
                  </button>
                </li>
              </ul>
            </nav>
          </motion.div>
          
          {/* Main Content */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="flex-1"
          >
            {activeTab === "profile" && (
              <div className="bg-white rounded-xl shadow-md overflow-hidden">
                {userId && <ProfileCard userId={userId} />}
              </div>
            )}
            
            {activeTab === "activity" && (
              <div className="bg-white rounded-xl shadow-md p-6">
                <h2 className="text-2xl font-bold text-gray-800 mb-6">Recent Activity</h2>
                <div className="space-y-4">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="border-l-4 border-[#FF7420] pl-4 py-2">
                      <p className="text-gray-700">
                        {i === 1 ? "Updated profile information" : 
                         i === 2 ? "Added new timber inventory" : 
                         "Created construction material quotation"}
                      </p>
                      <p className="text-sm text-gray-500">
                        {i === 1 ? "2 days ago" : 
                         i === 2 ? "1 week ago" : 
                         "2 weeks ago"}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}
            
            {activeTab === "settings" && (
              <div className="bg-white rounded-xl shadow-md p-6">
                <h2 className="text-2xl font-bold text-gray-800 mb-6">Account Settings</h2>
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-medium text-gray-700 mb-2">Notification Preferences</h3>
                    <div className="space-y-2">
                      <label className="flex items-center">
                        <input type="checkbox" className="form-checkbox h-5 w-5 text-[#FF7420]" defaultChecked />
                        <span className="ml-2 text-gray-700">Email notifications</span>
                      </label>
                      <label className="flex items-center">
                        <input type="checkbox" className="form-checkbox h-5 w-5 text-[#FF7420]" defaultChecked />
                        <span className="ml-2 text-gray-700">System notifications</span>
                      </label>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-medium text-gray-700 mb-2">Security</h3>
                    <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors">
                      Change Password
                    </button>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-medium text-gray-700 mb-2">Danger Zone</h3>
                    <button className="px-4 py-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors">
                      Delete Account
                    </button>
                  </div>
                </div>
              </div>
            )}
            
            {/* Quick Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
              <motion.div 
                whileHover={{ y: -5 }}
                className="bg-white p-6 rounded-xl shadow-md border-t-4 border-blue-500"
              >
                <h3 className="text-lg font-medium text-gray-700">Timber Inventory</h3>
                <p className="text-3xl font-bold text-gray-800 mt-2">24</p>
                <p className="text-sm text-gray-500 mt-1">items in stock</p>
              </motion.div>
              
              <motion.div 
                whileHover={{ y: -5 }}
                className="bg-white p-6 rounded-xl shadow-md border-t-4 border-green-500"
              >
                <h3 className="text-lg font-medium text-gray-700">Construction Projects</h3>
                <p className="text-3xl font-bold text-gray-800 mt-2">7</p>
                <p className="text-sm text-gray-500 mt-1">active projects</p>
              </motion.div>
              
              <motion.div 
                whileHover={{ y: -5 }}
                className="bg-white p-6 rounded-xl shadow-md border-t-4 border-purple-500"
              >
                <h3 className="text-lg font-medium text-gray-700">Labor Management</h3>
                <p className="text-3xl font-bold text-gray-800 mt-2">12</p>
                <p className="text-sm text-gray-500 mt-1">workers assigned</p>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
