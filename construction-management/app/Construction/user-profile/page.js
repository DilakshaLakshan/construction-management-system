"use client";
import { useSearchParams, useRouter } from "next/navigation";
import jsPDF from "jspdf";
import { useState } from "react";

export default function UserProfile() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const userProfile = {
    fullName: searchParams.get("fullName") || "N/A",
    idNumber: searchParams.get("idNumber") || "N/A",
    address: searchParams.get("address") || "N/A",
    dob: searchParams.get("dob") || "N/A",
    gender: searchParams.get("gender") || "N/A",
    contactNumber: searchParams.get("contactNumber") || "N/A",
    email: searchParams.get("email") || "N/A",
    qualifications: searchParams.get("qualifications") || "N/A",
    experience: searchParams.get("experience") || "N/A",
  };

  //update
  const handleUpdate = () => {
    const queryParams = new URLSearchParams(userProfile).toString();
    router.push(`/Construction/labour-form?${queryParams}`);
  };

  //delete
  const handleDelete = () => {
    if (confirm("Are you sure you want to delete this profile?")) {
      alert("User profile deleted successfully!");
      router.push("/");
    }
  };

  //pdf
  const generatePDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(18);
    doc.text("User Profile", 20, 20);

    let y = 30;
    Object.entries(userProfile).forEach(([key, value]) => {
      doc.setFontSize(12);
      doc.text(`${key.replace(/([A-Z])/g, " $1")}: ${value}`, 20, y);
      y += 10;
    });

    doc.save("User_Profile.pdf");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-6">
      <div className="max-w-4xl w-full bg-white shadow-xl rounded-lg border border-gray-300 p-8">
        
        <div className="flex border-b mb-6">
          <button className="text-blue-600 px-4 py-2 font-semibold border-b-2 border-blue-600">
            General
          </button>
        </div>

        <div className="grid grid-cols-3 gap-6">
          <div className="col-span-2">
            <h2 className="text-xl font-semibold text-gray-700 border-b pb-2 mb-4">Labour Profile</h2>
            <div className="space-y-3">
                
              {Object.entries(userProfile).map(([key, value]) => (
                <p key={key} className="text-gray-700 flex justify-between">
                  <span className="font-medium capitalize">{key.replace(/([A-Z])/g, " $1")}:</span> 
                  <span>{value}</span>
                </p>
              ))}
            </div>
          </div>

          <div className="text-center">
            <h2 className="text-xl font-semibold text-gray-700 border-b pb-2 mb-4">Avatar</h2>
            <div className="w-32 h-32 mx-auto mb-3">
              <img
                src="/default-avatar.png" 
                alt="Profile Picture"
                className="w-full h-full rounded-full border"
              />
            </div>
            <button className="bg-blue-500 text-white px-4 py-2 rounded-md text-sm hover:bg-blue-600">
              Change Profile Picture
            </button>
          </div>
        </div>

        <div className="flex justify-between mt-6">
          <button
            onClick={handleUpdate}
            className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-4 py-2 rounded-md"
          >
            Update
          </button>

          <button
            onClick={handleDelete}
            className="bg-red-500 hover:bg-red-600 text-white font-semibold px-4 py-2 rounded-md"
          >
            Delete
          </button>

          <button
            onClick={generatePDF}
            className="bg-green-500 hover:bg-green-600 text-white font-semibold px-4 py-2 rounded-md"
          >
            Download PDF
          </button>
        </div>

      </div>
    </div>
  );
}
