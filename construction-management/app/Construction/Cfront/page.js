"use client";
import { useRouter } from "next/navigation";
import { FaTools, FaHardHat } from "react-icons/fa";

export default function FrontPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-6">
      <h1 className="text-4xl font-bold text-gray-800 mb-8">Construction Management System</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        
        <div
          className="bg-white shadow-lg rounded-lg p-6 border border-gray-300 flex flex-col items-center cursor-pointer hover:shadow-xl transition"
          onClick={() => router.push("/Construction/material-form")}
        >
          <FaTools className="text-6xl text-blue-600 mb-4" />
          <h2 className="text-2xl font-semibold text-gray-800">Materials Submission</h2>
          <p className="text-gray-600 text-center mt-2">Submit and manage construction materials efficiently.</p>
        </div>
        
        <div
          className="bg-white shadow-lg rounded-lg p-6 border border-gray-300 flex flex-col items-center cursor-pointer hover:shadow-xl transition"
          onClick={() => router.push("/Construction/labour-form")}
        >
          <FaHardHat className="text-6xl text-yellow-600 mb-4" />
          <h2 className="text-2xl font-semibold text-gray-800">Labour Management</h2>
          <p className="text-gray-600 text-center mt-2">Manage and assign construction workers effectively.</p>
        </div>
      </div>
    </div>
  );
}
