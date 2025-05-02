"use client";
import Link from "next/link";
import { useQuery, useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useRouter } from "next/navigation";
import jsPDF from "jspdf";
import { FaArrowLeft, FaFilePdf, FaEdit, FaTrash } from "react-icons/fa";
import { motion } from "framer-motion";

export default function MaterialsTable() {
  const router = useRouter();
  const allMaterials = useQuery(api.materials.getMaterials);
  const deleteMaterials = useMutation(api.materials.deleteMaterials);

  if (!allMaterials) {
    return <p className="text-center mt-10 text-gray-500">Loading...</p>;
  }

  const handleDownloadPDF = () => {
    const doc = new jsPDF({ unit: "pt" });
    doc.setFontSize(18);
    doc.text("All Materials Report", 40, 40);
    let y = 80;

    allMaterials.forEach((record, idx) => {
      doc.setFontSize(14);
      doc.text(`Record ${idx + 1}`, 40, y);
      y += 20;

      const lines = [
        `Client Name: ${record.clientName}`,
        `Site Name: ${record.siteName}`,
        `Location: ${record.clientLocation}`,
        `Description: ${record.description}`,
        `Payment: ${record.payment ? "Done" : "Pending"}`,
        `Total Cost: $${record.totalCost?.toFixed(2)}`,
        "Materials:",
      ];

      lines.forEach(line => {
        doc.setFontSize(12);
        doc.text(line, 50, y);
        y += 16;
      });

      (record.items || []).forEach((item, i) => {
        doc.text(
          `  ${i + 1}. ${item.name} - Qty: ${item.quantity}, $${item.unitPrice}`,
          60,
          y
        );
        y += 14;
        if (y > 750) { doc.addPage(); y = 40; }
      });

      y += 30;
      if (y > 750) { doc.addPage(); y = 40; }
    });

    doc.save("AllMaterials.pdf");
  };

  const handleDelete = async (id) => {
    if (confirm("Delete this record?")) {
      await deleteMaterials({ id });
    }
  };

  const handleUpdate = (rec) => {
    const qp = new URLSearchParams({
      id: rec._id.toString(),
      clientName: rec.clientName,
      siteName: rec.siteName,
      clientLocation: rec.clientLocation,
      description: rec.description,
      totalCost: rec.totalCost?.toString() || "0",
      materials: JSON.stringify(rec.items || []),
      payment: rec.payment ? "true" : "false",
    }).toString();
    router.push(`/Construction/materials-update?${qp}`);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-start justify-center py-10 px-4">
      <div className="w-full max-w-6xl bg-white shadow-2xl rounded-lg overflow-hidden">
        {/* Header Bar */}
        <div className="bg-indigo-600 px-6 py-4 flex items-center justify-between">
          <button
            onClick={() => router.push('/Construction/Cfront')}
            className="inline-flex items-center text-white hover:underline"
          >
            <FaArrowLeft className="mr-2" /> Back to Dashboard
          </button>
          <h1 className="text-white text-2xl font-bold">All Materials</h1>
          <button
            onClick={handleDownloadPDF}
            className="inline-flex items-center bg-white text-indigo-600 px-4 py-2 rounded-lg hover:bg-indigo-50 transition"
          >
            <FaFilePdf className="mr-2" /> Export PDF
          </button>
        </div>

        {/* Table */}
        <div className="p-6">
          <div className="overflow-x-auto">
            <table className="min-w-full table-auto bg-white divide-y divide-gray-200">
              <thead>
                <tr className="bg-gray-100 sticky top-0">
                  {[
                    'Client Name',
                    'Site Name',
                    'Location',
                    'Description',
                    'Total',
                    'Materials',
                    'Payment',
                    'Actions'
                  ].map(col => (
                    <th
                      key={col}
                      className="px-6 py-3 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider"
                    >
                      {col}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {allMaterials.map((rec, i) => (
                  <tr
                    key={rec._id}
                    className={i % 2 === 0 ? 'bg-white' : 'bg-gray-50'}
                  >
                    <td className="px-6 py-4 text-sm text-gray-800">{rec.clientName}</td>
                    <td className="px-6 py-4 text-sm text-gray-800">{rec.siteName}</td>
                    <td className="px-6 py-4 text-sm text-gray-800">{rec.clientLocation}</td>
                    <td className="px-6 py-4 text-sm text-gray-800">{rec.description}</td>
                    <td className="px-6 py-4 text-sm font-semibold text-green-600">
                      ${rec.totalCost?.toFixed(2)}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-800">
                      {(rec.items || []).length > 0 ? (
                        <ul className="list-disc list-inside space-y-1">
                          {rec.items.map((it, idx) => (
                            <li key={idx}>
                              <span className="font-medium">{it.name}</span> ({it.quantity} × ${it.unitPrice})
                            </li>
                          ))}
                        </ul>
                      ) : (
                        <span className="text-gray-500">None</span>
                      )}
                    </td>
                    <td className="px-6 py-4 text-sm font-semibold">
                      <span className={rec.payment ? 'text-green-600' : 'text-red-500'}>
                        {rec.payment ? 'Done' : 'Pending'}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm space-x-2">
                      <button
                        onClick={() => handleUpdate(rec)}
                        className="inline-flex items-center px-3 py-1 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
                      >
                        <FaEdit />
                      </button>
                      <button
                        onClick={() => handleDelete(rec._id)}
                        className="inline-flex items-center px-3 py-1 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
                      >
                        <FaTrash />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
