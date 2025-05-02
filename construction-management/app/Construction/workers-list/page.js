"use client";
import Link from "next/link";
import { useQuery, useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useRouter } from "next/navigation";
import jsPDF from "jspdf";
import { FaArrowLeft, FaFilePdf, FaEdit, FaTrash } from "react-icons/fa";

export default function WorkersList() {
  const router = useRouter();
  const workers = useQuery(api.worker.getWorkers);
  const deleteWorker = useMutation(api.worker.deleteWorker);

  if (!workers) {
    return <p className="text-center mt-10 text-gray-500">Loading...</p>;
  }

  const handleDownloadPDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(18);
    doc.text("All Workers Report", 20, 20);
    let y = 30;
    workers.forEach((w, i) => {
      doc.setFontSize(14);
      doc.text(`Worker ${i + 1}`, 20, y);
      y += 8;
      doc.setFontSize(12);
      [
        [`Name`, w.fullName],
        [`ID`, w.idNumber],
        [`Address`, w.address],
        [`DOB`, w.dob],
        [`Gender`, w.gender],
        [`Contact`, w.contactNumber],
        [`Email`, w.email],
        [`Qualifications`, w.qualifications],
        [`Experience`, w.experience],
      ].forEach(([label, value]) => {
        doc.text(`${label}: ${value}`, 25, y);
        y += 6;
      });
      y += 10;
      if (y > 270) {
        doc.addPage();
        y = 20;
      }
    });
    doc.save("Workers_Report.pdf");
  };

  const handleDelete = async (id) => {
    if (confirm("Are you sure you want to delete this worker?")) {
      await deleteWorker({ id });
    }
  };

  const handleUpdate = (w) => {
    const params = new URLSearchParams({
      id: w._id.toString(),
      fullName: w.fullName,
      idNumber: w.idNumber,
      address: w.address,
      dob: w.dob,
      gender: w.gender,
      contactNumber: w.contactNumber,
      email: w.email,
      qualifications: w.qualifications,
      experience: w.experience,
    }).toString();
    router.push(`/Construction/updateworker?${params}`);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        <Link href="/Construction/labour-page" className="inline-flex items-center mb-6 px-4 py-2 bg-white border border-blue-600 text-blue-600 rounded-full shadow-sm hover:bg-blue-50 transition-colors">
          <FaArrowLeft className="mr-2" />
          <span className="font-semibold">Back</span>
        </Link>

        <div className="bg-white shadow-lg rounded-lg overflow-hidden">
          <div className="flex justify-between items-center bg-gray-100 px-6 py-4 border-b">
            <h2 className="text-2xl font-semibold text-gray-800">Workers List</h2>
            <button
              onClick={handleDownloadPDF}
              className="inline-flex items-center bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors"
            >
              <FaFilePdf className="mr-2" /> Export PDF
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full table-auto">
              <thead className="bg-gray-100">
                <tr>
                  {[
                    'Name', 'ID', 'Address', 'DOB', 'Gender', 'Contact', 'Email', 'Qualifications', 'Experience', 'Actions'
                  ].map((th) => (
                    <th
                      key={th}
                      className="px-6 py-3 text-left text-sm font-medium text-gray-600 uppercase tracking-wider sticky top-0 z-10"
                    >
                      {th}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {workers.map((w, idx) => (
                  <tr key={w._id} className={`${idx % 2 === 0 ? 'bg-white' : 'bg-gray-50'} hover:bg-gray-100 transition-colors`}
                  >
                    <td className="px-6 py-4 text-sm text-gray-700">{w.fullName}</td>
                    <td className="px-6 py-4 text-sm text-gray-700">{w.idNumber}</td>
                    <td className="px-6 py-4 text-sm text-gray-700">{w.address}</td>
                    <td className="px-6 py-4 text-sm text-gray-700">{w.dob}</td>
                    <td className="px-6 py-4 text-sm text-gray-700">{w.gender}</td>
                    <td className="px-6 py-4 text-sm text-gray-700">{w.contactNumber}</td>
                    <td className="px-6 py-4 text-sm text-gray-700">{w.email}</td>
                    <td className="px-6 py-4 text-sm text-gray-700">{w.qualifications}</td>
                    <td className="px-6 py-4 text-sm text-gray-700">{w.experience}</td>
                    <td className="px-6 py-4 text-sm font-medium flex space-x-2">
                      <button
                        onClick={() => handleUpdate(w)}
                        className="p-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
                      >
                        <FaEdit />
                      </button>
                      <button
                        onClick={() => handleDelete(w._id)}
                        className="p-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors"
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
