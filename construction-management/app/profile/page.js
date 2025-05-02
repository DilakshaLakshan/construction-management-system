"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import ProfileCard from "../../components/profile/ProfileCard";
import { motion } from "framer-motion";
import { FiUser, FiSettings, FiLogOut, FiActivity, FiFileText, FiTruck, FiEdit, FiBarChart2, FiCalendar } from "react-icons/fi";
import Image from "next/image";
import { Button } from "../../components/ui/button";

export default function ProfilePage() {
  const router = useRouter();
  const [userId, setUserId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState(null);
  const [activeTab, setActiveTab] = useState("profile");
  const [isEditing, setIsEditing] = useState(false);
  const [editableUserData, setEditableUserData] = useState(null);
  
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
          setEditableUserData(data.user);
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
  
  const handleEditProfile = () => {
    setIsEditing(true);
  };
  
  const handleSaveProfile = async () => {
    try {
      // Simulate API call to update profile
      const token = localStorage.getItem("authToken");
      const response = await fetch("/api/auth/update-profile", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(editableUserData),
      });
      
      const data = await response.json();
      
      if (data.success) {
        setUserData(editableUserData);
        setIsEditing(false);
        // Show success notification
        alert("Profile updated successfully!");
      } else {
        // Show error notification
        alert("Failed to update profile: " + data.message);
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      alert("An error occurred while updating your profile");
    }
  };
  
  const handleCancelEdit = () => {
    setEditableUserData(userData);
    setIsEditing(false);
  };
  
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditableUserData(prev => ({
      ...prev,
      [name]: value
    }));
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
          <div className="flex items-center gap-3">
            <button 
              onClick={() => navigateTo("/")}
              className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
            >
              Home
            </button>
            <button 
              onClick={handleLogout}
              className="flex items-center gap-2 px-4 py-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors"
            >
              <FiLogOut /> Logout
            </button>
          </div>
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
                    onClick={() => setActiveTab("analytics")}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                      activeTab === "analytics" 
                        ? "bg-orange-50 text-[#FF7420]" 
                        : "text-gray-700 hover:bg-gray-100"
                    }`}
                  >
                    <FiBarChart2 /> Analytics
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => setActiveTab("schedule")}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                      activeTab === "schedule" 
                        ? "bg-orange-50 text-[#FF7420]" 
                        : "text-gray-700 hover:bg-gray-100"
                    }`}
                  >
                    <FiCalendar /> Schedule
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
                    onClick={() => navigateTo("/Construction/Cfront")}
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
                <div className="p-6 flex justify-between items-center border-b">
                  <h2 className="text-2xl font-bold text-gray-800">Profile Information</h2>
                  {!isEditing ? (
                    <Button 
                      variant="outline" 
                      onClick={handleEditProfile}
                      className="flex items-center gap-2"
                    >
                      <FiEdit size={16} /> Edit Profile
                    </Button>
                  ) : (
                    <div className="flex gap-2">
                      <Button 
                        variant="outline" 
                        onClick={handleCancelEdit}
                      >
                        Cancel
                      </Button>
                      <Button 
                        variant="default" 
                        onClick={handleSaveProfile}
                      >
                        Save Changes
                      </Button>
                    </div>
                  )}
                </div>
                
                {isEditing ? (
                  <div className="p-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                        <input
                          type="text"
                          name="name"
                          value={editableUserData?.name || ""}
                          onChange={handleInputChange}
                          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#FF7420]"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                        <input
                          type="email"
                          name="email"
                          value={editableUserData?.email || ""}
                          onChange={handleInputChange}
                          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#FF7420]"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                        <input
                          type="tel"
                          name="phone"
                          value={editableUserData?.phone || ""}
                          onChange={handleInputChange}
                          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#FF7420]"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Job Title</label>
                        <input
                          type="text"
                          name="jobTitle"
                          value={editableUserData?.jobTitle || ""}
                          onChange={handleInputChange}
                          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#FF7420]"
                        />
                      </div>
                      <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
                        <input
                          type="text"
                          name="address"
                          value={editableUserData?.address || ""}
                          onChange={handleInputChange}
                          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#FF7420]"
                        />
                      </div>
                      <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-gray-700 mb-1">Bio</label>
                        <textarea
                          name="bio"
                          value={editableUserData?.bio || ""}
                          onChange={handleInputChange}
                          rows={4}
                          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#FF7420]"
                        />
                      </div>
                    </div>
                  </div>
                ) : (
                  userId && <ProfileCard userId={userId} />
                )}
              </div>
            )}
            
            {activeTab === "activity" && (
              <div className="bg-white rounded-xl shadow-md p-6">
                <h2 className="text-2xl font-bold text-gray-800 mb-6">Recent Activity</h2>
                <div className="space-y-4">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <div key={i} className="border-l-4 border-[#FF7420] pl-4 py-2">
                      <p className="text-gray-700">
                        {i === 1 ? "Updated profile information" : 
                         i === 2 ? "Added new timber inventory" : 
                         i === 3 ? "Created construction material quotation" :
                         i === 4 ? "Completed labor assignment" :
                         "Generated timber sales report"}
                      </p>
                      <p className="text-sm text-gray-500">
                        {i === 1 ? "2 days ago" : 
                         i === 2 ? "1 week ago" : 
                         i === 3 ? "2 weeks ago" :
                         i === 4 ? "3 weeks ago" :
                         "1 month ago"}
                      </p>
                    </div>
                  ))}
                </div>
                <div className="mt-6 text-center">
                  <Button variant="outline">View All Activity</Button>
                </div>
              </div>
            )}
            
            {activeTab === "analytics" && (
              <div className="bg-white rounded-xl shadow-md p-6">
                <h2 className="text-2xl font-bold text-gray-800 mb-6">Performance Analytics</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <h3 className="text-blue-700 font-medium">Timber Sales</h3>
                    <p className="text-3xl font-bold">$24,500</p>
                    <p className="text-sm text-blue-600">↑ 12% from last month</p>
                  </div>
                  <div className="bg-green-50 p-4 rounded-lg">
                    <h3 className="text-green-700 font-medium">Construction Projects</h3>
                    <p className="text-3xl font-bold">7</p>
                    <p className="text-sm text-green-600">↑ 2 new this month</p>
                  </div>
                  <div className="bg-purple-50 p-4 rounded-lg">
                    <h3 className="text-purple-700 font-medium">Labor Efficiency</h3>
                    <p className="text-3xl font-bold">92%</p>
                    <p className="text-sm text-purple-600">↑ 5% improvement</p>
                  </div>
                </div>
                
                <div className="border rounded-lg p-4 mb-6">
                  <h3 className="text-lg font-medium text-gray-700 mb-4">Monthly Performance</h3>
                  <div className="h-64 bg-gray-100 rounded flex items-center justify-center">
                    <p className="text-gray-500">Chart visualization would appear here</p>
                  </div>
                </div>
                
                <div className="text-center">
                  <Button variant="default">Download Full Report</Button>
                </div>
              </div>
            )}
            
            {activeTab === "schedule" && (
              <div className="bg-white rounded-xl shadow-md p-6">
                <h2 className="text-2xl font-bold text-gray-800 mb-6">Project Schedule</h2>
                
                <div className="mb-6">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-medium">Upcoming Deadlines</h3>
                    <Button variant="outline" size="sm">Add Event</Button>
                  </div>
                  
                  <div className="space-y-3">
                    {[
                      { title: "Timber Delivery", date: "May 15, 2023", priority: "high" },
                      { title: "Site Inspection", date: "May 18, 2023", priority: "medium" },
                      { title: "Client Meeting", date: "May 20, 2023", priority: "low" },
                      { title: "Project Completion", date: "June 10, 2023", priority: "high" }
                    ].map((event, i) => (
                      <div key={i} className="flex items-center p-3 border rounded-lg">
                        <div className={`w-3 h-3 rounded-full mr-3 ${
                          event.priority === "high" ? "bg-red-500" :
                          event.priority === "medium" ? "bg-yellow-500" : "bg-green-500"
                        }`}></div>
                        <div className="flex-1">
                          <p className="font-medium">{event.title}</p>
                          <p className="text-sm text-gray-500">{event.date}</p>
                        </div>
                        <Button variant="ghost" size="sm">Details</Button>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="border rounded-lg p-4">
                  <h3 className="text-lg font-medium text-gray-700 mb-4">Monthly Calendar</h3>
                  <div className="h-64 bg-gray-100 rounded flex items-center justify-center">
                    <p className="text-gray-500">Calendar view would appear here</p>
                  </div>
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
                      <label className="flex items-center">
                        <input type="checkbox" className="form-checkbox h-5 w-5 text-[#FF7420]" />
                        <span className="ml-2 text-gray-700">SMS notifications</span>
                      </label>
                                            <label className="flex items-center">
                        <input type="checkbox" className="form-checkbox h-5 w-5 text-[#FF7420]" />
                        <span className="ml-2 text-gray-700">SMS notifications</span>
                      </label>
                      <label className="flex items-center">
                        <input type="checkbox" className="form-checkbox h-5 w-5 text-[#FF7420]" defaultChecked />
                        <span className="ml-2 text-gray-700">Weekly report emails</span>
                      </label>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-medium text-gray-700 mb-2">Security</h3>
                    <div className="space-y-4">
                      <div>
                        <Button variant="outline" className="w-full sm:w-auto">
                          Change Password
                        </Button>
                      </div>
                      <div>
                        <h4 className="text-sm font-medium text-gray-600 mb-2">Two-Factor Authentication</h4>
                        <div className="flex items-center">
                          <div className="flex-1">
                            <p className="text-sm text-gray-500">Add an extra layer of security to your account</p>
                          </div>
                          <label className="relative inline-flex items-center cursor-pointer">
                            <input type="checkbox" className="sr-only peer" />
                            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#FF7420]"></div>
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-medium text-gray-700 mb-2">Appearance</h3>
                    <div className="space-y-2">
                      <label className="flex items-center">
                        <input type="radio" name="theme" className="form-radio h-5 w-5 text-[#FF7420]" defaultChecked />
                        <span className="ml-2 text-gray-700">Light Mode</span>
                      </label>
                      <label className="flex items-center">
                        <input type="radio" name="theme" className="form-radio h-5 w-5 text-[#FF7420]" />
                        <span className="ml-2 text-gray-700">Dark Mode</span>
                      </label>
                      <label className="flex items-center">
                        <input type="radio" name="theme" className="form-radio h-5 w-5 text-[#FF7420]" />
                        <span className="ml-2 text-gray-700">System Default</span>
                      </label>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-medium text-gray-700 mb-2">Language</h3>
                    <select className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#FF7420]">
                      <option value="en">English</option>
                      <option value="si">Sinhala</option>
                      <option value="ta">Tamil</option>
                      <option value="fr">French</option>
                      <option value="es">Spanish</option>
                    </select>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-medium text-gray-700 mb-2">Data Export</h3>
                    <Button variant="outline">
                      Export All Data
                    </Button>
                    <p className="text-sm text-gray-500 mt-1">Download all your personal data in a CSV format</p>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-medium text-red-600 mb-2">Danger Zone</h3>
                    <div className="p-4 border border-red-200 bg-red-50 rounded-lg">
                      <p className="text-sm text-red-600 mb-3">
                        Once you delete your account, there is no going back. Please be certain.
                      </p>
                      <Button variant="destructive">
                        Delete Account
                      </Button>
                    </div>
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
                <div className="mt-4">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="w-full"
                    onClick={() => navigateTo("/timber")}
                  >
                    View Details
                  </Button>
                </div>
              </motion.div>
              
              <motion.div 
                whileHover={{ y: -5 }}
                className="bg-white p-6 rounded-xl shadow-md border-t-4 border-green-500"
              >
                <h3 className="text-lg font-medium text-gray-700">Construction Projects</h3>
                <p className="text-3xl font-bold text-gray-800 mt-2">7</p>
                <p className="text-sm text-gray-500 mt-1">active projects</p>
                <div className="mt-4">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="w-full"
                    onClick={() => navigateTo("/Construction/Cfront")}
                  >
                    Manage Projects
                  </Button>
                </div>
              </motion.div>
              
              <motion.div 
                whileHover={{ y: -5 }}
                className="bg-white p-6 rounded-xl shadow-md border-t-4 border-purple-500"
              >
                <h3 className="text-lg font-medium text-gray-700">Labor Management</h3>
                <p className="text-3xl font-bold text-gray-800 mt-2">12</p>
                <p className="text-sm text-gray-500 mt-1">workers assigned</p>
                <div className="mt-4">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="w-full"
                    onClick={() => navigateTo("/Construction/labour-form")}
                  >
                    Manage Labor
                  </Button>
                </div>
              </motion.div>
            </div>
            
            {/* Recent Transactions */}
            {(activeTab === "profile" || activeTab === "activity") && (
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.6 }}
                className="mt-6 bg-white p-6 rounded-xl shadow-md"
              >
                <h3 className="text-xl font-bold text-gray-800 mb-4">Recent Transactions</h3>
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Date
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Type
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Description
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Amount
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Status
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {[
                        { date: "2023-05-10", type: "Timber Sale", description: "Mahogany timber sale", amount: "$3,200", status: "Completed" },
                        { date: "2023-05-08", type: "Material Purchase", description: "Construction materials", amount: "$1,850", status: "Completed" },
                        { date: "2023-05-05", type: "Labor Payment", description: "Weekly labor payment", amount: "$2,400", status: "Completed" },
                        { date: "2023-05-01", type: "Timber Purchase", description: "Teak timber stock", amount: "$5,600", status: "Pending" }
                      ].map((transaction, i) => (
                        <tr key={i} className="hover:bg-gray-50">
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {transaction.date}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                            {transaction.type}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {transaction.description}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-medium">
                            {transaction.amount}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                              transaction.status === "Completed" 
                                ? "bg-green-100 text-green-800" 
                                : "bg-yellow-100 text-yellow-800"
                            }`}>
                              {transaction.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <div className="mt-4 text-right">
                  <Button variant="link">View All Transactions</Button>
                </div>
              </motion.div>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
}
