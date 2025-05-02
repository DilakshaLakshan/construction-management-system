"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useQuery, useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { motion } from "framer-motion";
import { FaArrowLeft, FaEdit, FaTrash, FaDownload } from "react-icons/fa";

export default function UserProfile() {
  const router = useRouter();
  const workers = useQuery(api.worker.getWorkers);
  const deleteWorker = useMutation(api.worker.deleteWorker);

  const [latestWorker, setLatestWorker] = useState(null);

  useEffect(() => {
    if (workers && workers.length) {
      const [latest] = [...workers].sort((a, b) => b._creationTime - a._creationTime);
      setLatestWorker(latest);
    }
  }, [workers]);

  const handleDelete = async () => {
    if (confirm("Are you sure you want to delete this profile?")) {
      await deleteWorker({ id: latestWorker._id });
      router.push("/Construction/labour-page");
    }
  };

  const handleUpdate = () => {
    const queryParams = new URLSearchParams(latestWorker).toString();
    router.push(`/Construction/updateprofile?${queryParams}`);
  };

  const generatePDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(18);
    doc.text("User Profile", 20, 20);
    let y = 30;
    Object.entries(latestWorker || {}).forEach(([key, value]) => {
      if (key === "_id" || key === "_creationTime") return;
      doc.setFontSize(12);
      doc.text(`${key.replace(/([A-Z])/g, ' $1')}: ${value}`, 20, y);
      y += 10;
    });
    doc.save("User_Profile.pdf");
  };

  if (!latestWorker) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <p className="text-lg text-gray-500">Loading profile...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center p-6">
      <div className="w-full max-w-3xl bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
        {/* Back Button */}
        <div className="p-4">
          <Link href="/Construnction/Cfront" className="inline-flex items-center text-gray-700 hover:text-gray-900">
            <FaArrowLeft className="mr-2" /> Back to Home
          </Link>
        </div>

        {/* Profile Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="p-8"
        >
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Labour Profile</h1>
          <p className="text-gray-600 mb-6">Here are the latest worker details captured in the system.</p>
          <div className="space-y-4">
            {Object.entries(latestWorker).map(([key, value]) => (
              key !== "_id" && key !== "_creationTime" && (
                <div key={key} className="flex justify-between">
                  <span className="font-medium text-gray-700 capitalize">{key.replace(/([A-Z])/g, ' $1')}:</span>
                  <span className="text-gray-800">{value}</span>
                </div>
              )
            ))}
          </div>

          {/* Actions */}
          <div className="mt-8 flex space-x-4 justify-end">
            <button
              onClick={handleUpdate}
              className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
            >
              <FaEdit className="mr-2" /> Update
            </button>
            <button
              onClick={handleDelete}
              className="inline-flex items-center px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
            >
              <FaTrash className="mr-2" /> Delete
            </button>
            <button
              onClick={generatePDF}
              className="inline-flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
            >
              <FaDownload className="mr-2" /> Download PDF
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
