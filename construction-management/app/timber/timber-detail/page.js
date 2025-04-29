"use client";
import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import jsPDF from "jspdf";

export default function TimberDetails() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [timberData, setTimberData] = useState(null);

  
  // Fetch timber data from query parameters or API
  useEffect(() => {
    const queryData = {};
    searchParams.forEach((value, key) => {
      queryData[key] = value;
    });

    // If query data is available, set it as timberData
    if (Object.keys(queryData).length > 0) {
      setTimberData(queryData);
    } else {
      // Fetch timber data from API (if needed)
      const timberId = searchParams.get("id");
      if (timberId) {
        fetch(`/api/timber/${timberId}`)
          .then((response) => response.json())
          .then((data) => setTimberData(data))
          .catch((error) => console.error("Error fetching timber data:", error));
      }
    }
  }, [searchParams]);

  // Handle Update
  const handleUpdate = () => {
    if (timberData) {
      router.push(`/timber/timber-form?${new URLSearchParams(timberData).toString()}`);
    }
  };

  // Handle Delete
  const handleDelete = () => {
    if (confirm("Are you sure you want to delete this timber?")) {
      // Simulate API call for deletion
      console.log("Deleting timber:", timberData);
      alert("Timber deleted successfully!");
      router.push("/timber");
    }
  };

  // Handle Download PDF
  const handleDownloadPDF = () => {
    if (timberData) {
      const doc = new jsPDF();
      doc.setFontSize(16);
      doc.text("Timber Details", 10, 10);
      doc.setFontSize(12);

      let y = 20;
      Object.entries(timberData).forEach(([key, value]) => {
        if (Array.isArray(value)) {
          doc.text(`${key}: ${value.join(", ")}`, 10, y);
        } else {
          doc.text(`${key}: ${value}`, 10, y);
        }
        y += 10;
      });

      doc.save("timber-details.pdf");
    }
  };

  if (!timberData) {
    return <div className="min-h-screen flex items-center justify-center bg-[#191A19]">Loading...</div>;
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#191A19] p-6">
      <div className="max-w-4xl w-full bg-[#FFFFFF] shadow-xl rounded-lg border border-[#FF7420] p-8">
        <h2 className="text-2xl font-bold text-[#FF7420] border-b pb-4 mb-6">Timber Details</h2>

        {/* Display Timber Details in a Table */}
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white">
            <thead>
              <tr>
                <th className="py-2 px-4 border-b border-gray-200 bg-gray-50 text-left text-sm font-semibold text-gray-600 uppercase">
                  Attribute
                </th>
                <th className="py-2 px-4 border-b border-gray-200 bg-gray-50 text-left text-sm font-semibold text-gray-600 uppercase">
                  Value
                </th>
              </tr>
            </thead>
            <tbody>
              {Object.entries(timberData).map(([key, value]) => (
                <tr key={key} className="hover:bg-gray-50">
                  <td className="py-2 px-4 border-b border-gray-200 text-sm text-gray-700 capitalize">
                    {key}
                  </td>
                  <td className="py-2 px-4 border-b border-gray-200 text-sm text-gray-900">
                    {Array.isArray(value) ? value.join(", ") : value}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-end space-x-4 mt-8">
          <button
            onClick={handleUpdate}
            className="px-4 py-2 bg-[#FF7420] text-white rounded-md hover:bg-[#FF7420]/90 transition duration-300"
          >
            Update
          </button>
          <button
            onClick={handleDelete}
            className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition duration-300"
          >
            Delete
          </button>
          <button
            onClick={handleDownloadPDF}
            className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition duration-300"
          >
            Download PDF
          </button>
        </div>
      </div>
    </div>
  );
}