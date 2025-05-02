"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { FaArrowLeft, FaPlus, FaTrash } from "react-icons/fa";
import { motion } from "framer-motion";

export default function MaterialForm() {
  const router = useRouter();
  const addMaterials = useMutation(api.materials.addMaterials);

  const [clientName, setClientName] = useState("");
  const [siteName, setSiteName] = useState("");
  const [clientLocation, setClientLocation] = useState("");
  const [description, setDescription] = useState("");
  const [materials, setMaterials] = useState([]);
  const [totalCost, setTotalCost] = useState(0);
  const [payment, setPayment] = useState(false);

  const updateTotalCost = (items) => {
    setTotalCost(items.reduce((sum, m) => sum + m.quantity * m.unitPrice, 0));
  };

  const addRow = () =>
    setMaterials((prev) => [...prev, { name: "", quantity: 1, unitPrice: 0 }]);

  const updateRow = (i, key, val) => {
    const copy = [...materials];
    copy[i][key] = val;
    setMaterials(copy);
    updateTotalCost(copy);
  };

  const removeRow = (i) => {
    const copy = materials.filter((_, idx) => idx !== i);
    setMaterials(copy);
    updateTotalCost(copy);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // 1) Save to Convex
    await addMaterials({
      clientLocation,
      clientName,
      siteName,
      description,
      totalCost,
      payment,
      items: materials,
    });
    // 2) Redirect with matching param names
    const qp = new URLSearchParams({
      clientName,
      siteName,
      clientLocation,
      description,
      totalCost: totalCost.toString(),
      materials: JSON.stringify(materials),
    }).toString();
    router.push(`/Construction/quotation-details?${qp}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-white flex items-center justify-center p-8">
      <div className="w-full max-w-3xl bg-white shadow-2xl rounded-xl overflow-hidden">
        <div className="bg-indigo-600 p-6 flex items-center justify-between">
          <button
            onClick={() => router.push("/Construction/Cfront")}
            className="text-white flex items-center hover:underline"
          >
            <FaArrowLeft className="mr-2" /> Back
          </button>
          <h1 className="text-2xl font-bold text-white">Material Details</h1>
          <div className="w-6" />
        </div>
        <motion.form
          onSubmit={handleSubmit}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="p-8 space-y-6"
        >
          {/* Client Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              ["Client Name", clientName, setClientName],
              ["Site Name", siteName, setSiteName],
              ["Location", clientLocation, setClientLocation],
              ["Description", description, setDescription],
            ].map(([label, val, setter]) => (
              <div key={label}>
                <label className="block text-gray-700 font-medium mb-1">
                  {label}
                </label>
                <input
                  type="text"
                  value={val}
                  onChange={(e) => setter(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-400"
                  required
                />
              </div>
            ))}
          </div>

          {/* Materials */}
          <div className="space-y-4">
            <h2 className="text-lg font-semibold text-gray-800">Materials</h2>
            {materials.map((mat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: i * 0.1 }}
                className="grid grid-cols-1 sm:grid-cols-4 gap-4 items-center"
              >
                <input
                  type="text"
                  placeholder="Name"
                  value={mat.name}
                  onChange={(e) => updateRow(i, "name", e.target.value)}
                  className="p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-300"
                  required
                />
                <input
                  type="number"
                  placeholder="Qty"
                  value={mat.quantity}
                  onChange={(e) =>
                    updateRow(i, "quantity", Number(e.target.value))
                  }
                  className="p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-300"
                  min={1}
                  required
                />
                <input
                  type="number"
                  placeholder="Unit Price"
                  value={mat.unitPrice}
                  onChange={(e) =>
                    updateRow(i, "unitPrice", Number(e.target.value))
                  }
                  className="p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-300"
                  min={0}
                  required
                />
                <button
                  type="button"
                  onClick={() => removeRow(i)}
                  className="p-3 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
                >
                  <FaTrash />
                </button>
              </motion.div>
            ))}
            <button
              type="button"
              onClick={addRow}
              className="inline-flex items-center text-indigo-600 hover:text-indigo-800 font-medium mt-2"
            >
              <FaPlus className="mr-2" /> Add Material
            </button>
          </div>

          {/* Payment & Total */}
          <div className="flex items-center justify-between">
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={payment}
                onChange={(e) => setPayment(e.target.checked)}
                className="w-5 h-5 text-indigo-600 rounded focus:ring-2 focus:ring-indigo-400"
              />
              <span className="text-gray-700">Payment Received</span>
            </label>
            <div className="text-xl font-bold text-gray-800">
              Total: <span className="text-green-600">${totalCost.toFixed(2)}</span>
            </div>
          </div>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-4">
            <button
              type="submit"
              className="flex-1 bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 transition"
            >
              Submit
            </button>
            <button
              type="button"
              onClick={() => router.push("/Construction/materials-table")}
              className="flex-1 bg-gray-300 text-gray-700 py-3 rounded-lg font-semibold hover:bg-gray-400 transition"
            >
              View Past Materials
            </button>
          </div>
        </motion.form>
      </div>
    </div>
  );
}
