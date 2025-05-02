"use client";
import Link from "next/link";
import { useSearchParams, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FaArrowLeft, FaEdit } from "react-icons/fa";

export default function QuotationDetails() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const [clientName, setClientName] = useState("");
  const [siteName, setSiteName] = useState("");
  const [clientLocation, setClientLocation] = useState("");
  const [description, setDescription] = useState("");
  const [totalCost, setTotalCost] = useState(0);
  const [materials, setMaterials] = useState([]);

  useEffect(() => {
    setClientName(searchParams.get("clientName") || "");
    setSiteName(searchParams.get("siteName") || "");
    setClientLocation(searchParams.get("clientlocation") || "");
    setDescription(searchParams.get("description") || "");
    setTotalCost(parseFloat(searchParams.get("totalCost") || "0"));
    try {
      const mats = JSON.parse(searchParams.get("materials") || "[]");
      setMaterials(mats);
    } catch {
      setMaterials([]);
    }
  }, [searchParams]);

  const handleUpdate = () => {
    const params = new URLSearchParams({
      clientName,
      siteName,
      clientlocation: clientLocation,
      description,
      totalCost: totalCost.toString(),
      materials: JSON.stringify(materials),
    }).toString();
    router.push(`/Construction/material-form?${params}`);
  };

  const handleBack = () => router.push("/Construction/Cfront");

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-white flex items-center justify-center p-8">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-3xl bg-white shadow-2xl rounded-2xl overflow-hidden"
      >
        {/* Header */}
        <div className="flex items-center justify-between bg-blue-600 px-6 py-4">
          <button
            onClick={handleBack}
            className="flex items-center text-white hover:underline"
          >
            <FaArrowLeft className="mr-2 text-lg" /> Back to Dashboard
          </button>
          <motion.h2
            initial={{ x: 50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-2xl font-bold text-white"
          >
            Quotation Details
          </motion.h2>
          <div className="w-6" />
        </div>

        <div className="p-8 space-y-8">
          {/* Basic Info */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {[
              { label: "Client Name", value: clientName },
              { label: "Site Name", value: siteName },
              { label: "Location", value: clientLocation },
              { label: "Description", value: description },
            ].map(({ label, value }) => (
              <div key={label} className="bg-gray-50 p-4 rounded-lg shadow-sm">
                <p className="text-sm text-gray-500 uppercase tracking-wide">
                  {label}
                </p>
                <p className="mt-1 text-gray-800 font-medium">{value}</p>
              </div>
            ))}
            <div className="bg-green-50 p-4 rounded-lg shadow-sm col-span-full sm:col-auto">
              <p className="text-sm text-gray-500 uppercase tracking-wide">
                Total Cost
              </p>
              <p className="mt-1 text-green-600 text-xl font-bold">
                ${totalCost.toFixed(2)}
              </p>
            </div>
          </div>

          {/* Materials Table */}
          <div>
            <h3 className="text-xl font-semibold text-gray-800 mb-4">
              Materials Breakdown
            </h3>
            <div className="overflow-x-auto">
              <table className="min-w-full table-auto border-collapse">
                <thead>
                  <tr className="bg-gray-100">
                    {[
                      "#",
                      "Material",
                      "Qty",
                      "Unit Price",
                      "Total"
                    ].map((th) => (
                      <th
                        key={th}
                        className="px-4 py-2 text-left text-sm font-medium text-gray-600 uppercase"
                      >
                        {th}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {materials.map((m, i) => (
                    <tr
                      key={i}
                      className={i % 2 === 0 ? "bg-white" : "bg-gray-50"}
                    >
                      <td className="px-4 py-2 text-sm text-gray-700">{i + 1}</td>
                      <td className="px-4 py-2 text-sm text-gray-700">{m.name}</td>
                      <td className="px-4 py-2 text-sm text-gray-700">{m.quantity}</td>
                      <td className="px-4 py-2 text-sm text-gray-700">
                        ${m.unitPrice.toFixed(2)}
                      </td>
                      <td className="px-4 py-2 text-sm text-gray-800 font-medium">
                        ${(m.quantity * m.unitPrice).toFixed(2)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <button
              onClick={handleBack}
              className="flex-1 flex items-center justify-center bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
            >
              <FaEdit className="mr-2" /> Submit
            </button>
            <button
              onClick={handleBack}
              className="flex-1 bg-gray-300 text-gray-700 py-3 rounded-lg font-semibold hover:bg-gray-400 transition-colors"
            >
              Cancel
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
