"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import { FaProjectDiagram, FaClipboardList, FaArrowLeft } from "react-icons/fa";

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white flex flex-col items-center py-12 px-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-4xl bg-white rounded-3xl shadow-2xl p-8"
      >
        <div className="flex items-center justify-between mb-8">
          <Link href="/Construction/Cfront" className="flex items-center text-blue-600 hover:text-blue-800">
            <FaArrowLeft className="mr-2 text-xl" />
            <span className="text-lg font-semibold">Back to Home</span>
          </Link>
          <h1 className="text-3xl font-extrabold text-gray-800">Project Management</h1>
        </div>

        <p className="text-gray-600 mb-10 text-center">
          Quickly create new projects or manage existing ones with our intuitive interface.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
          <Link href="/Construction/projectform">
            <motion.div
              whileHover={{ scale: 1.03 }}
              className="flex flex-col items-center p-6 bg-gradient-to-br from-blue-500 to-blue-600 text-white rounded-2xl shadow-lg hover:shadow-2xl transition"
            >
              <FaProjectDiagram className="text-5xl mb-4" />
              <h2 className="text-2xl font-semibold mb-2">Add Project</h2>
              <p className="text-sm opacity-90 text-center">
                Create a new project and track its details.
              </p>
            </motion.div>
          </Link>

          <Link href="/Construction/project">
            <motion.div
              whileHover={{ scale: 1.03 }}
              className="flex flex-col items-center p-6 bg-gradient-to-br from-green-500 to-green-600 text-white rounded-2xl shadow-lg hover:shadow-2xl transition"
            >
              <FaClipboardList className="text-5xl mb-4" />
              <h2 className="text-2xl font-semibold mb-2">Past Projects</h2>
              <p className="text-sm opacity-90 text-center">
                View or edit existing projects in your records.
              </p>
            </motion.div>
          </Link>
        </div>
      </motion.div>
    </div>
  );
}
