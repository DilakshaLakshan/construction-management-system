"use client";
import { useState } from "react";
import { useQuery, useMutation } from "convex/react";
import { jsPDF } from "jspdf";
import { FaFilePdf, FaEdit, FaTrash } from "react-icons/fa";
import Link from "next/link";
import { motion } from "framer-motion";

export default function PastProjectsPage() {
  const projects = useQuery("projectInfo:getProjectInfos");
  const updateProjectInfo = useMutation("projectInfo:updateProjectInfo");
  const deleteProjectInfo = useMutation("projectInfo:deleteProjectInfo");

  const [editingId, setEditingId] = useState(null);
  const [editFormData, setEditFormData] = useState({});

  const handleEditClick = (project) => {
    setEditingId(project._id);
    setEditFormData({ ...project });
  };

  const handleCancelClick = () => {
    setEditingId(null);
    setEditFormData({});
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleUpdateSubmit = async (e) => {
    e.preventDefault();
    const { _id, _creationTime, ...validFields } = editFormData;
    try {
      await updateProjectInfo({ id: editingId, ...validFields });
      setEditingId(null);
      setEditFormData({});
    } catch (error) {
      console.error(error);
      alert("Error updating project");
    }
  };

  const handleDelete = async (id) => {
    if (confirm("Are you sure you want to delete this project?")) {
      try {
        await deleteProjectInfo({ id });
      } catch (error) {
        console.error(error);
        alert("Error deleting project");
      }
    }
  };

  const handleExportPDF = () => {
    const doc = new jsPDF({ unit: 'pt' });
    doc.setFontSize(18);
    doc.text('Past Projects Report', 40, 40);
    let y = 80;

    (projects || []).forEach((p, i) => {
      doc.setFontSize(14);
      doc.text(`${i + 1}. ${p.jobName}`, 40, y);
      y += 20;
      [
        ['Type', p.jobType],
        ['Address', p.jobAddress],
        ['Start', p.projectStartDate],
        ['End', p.projectEndDate],
        ['Tier', p.contractorType],
        ['Owner', p.ownerName],
        ['Email', p.ownerEmail],
        ['Phone', p.ownerPhone],
      ].forEach(([label, value]) => {
        doc.setFontSize(12);
        doc.text(`${label}: ${value}`, 60, y);
        y += 16;
      });
      y += 10;
      if (y > 700) { doc.addPage(); y = 40; }
    });

    doc.save('PastProjects.pdf');
  };

  if (!projects) return <div className="text-center mt-10">Loading...</div>;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-white p-8">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
        className="max-w-7xl mx-auto bg-white shadow-2xl rounded-lg overflow-hidden"
      >
        <div className="flex justify-between items-center bg-indigo-600 px-6 py-4">
          <Link href="/Construction/projectUi" className="text-white font-semibold hover:underline">
            &#8592; Dashboard
          </Link>
          <h2 className="text-white text-2xl font-bold">Past Projects</h2>
          <button
            onClick={handleExportPDF}
            className="flex items-center bg-white text-indigo-600 px-4 py-2 rounded-lg hover:bg-indigo-50 transition"
          >
            <FaFilePdf className="mr-2" /> Export PDF
          </button>
        </div>

        <div className="overflow-x-auto p-6">
          <table className="min-w-full table-auto divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                {['Job Name','Type','Address','Start','End','Tier','Owner','Email','Phone','Actions'].map(th => (
                  <th key={th} className="px-6 py-3 text-left text-sm font-medium text-gray-600 uppercase tracking-wider">
                    {th}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {projects.map((p) => (
                <tr key={p._id} className="hover:bg-gray-50 transition-colors">
                  {editingId === p._id ? (
                    <>  
                      <td className="px-4 py-2"><input name="jobName" value={editFormData.jobName} onChange={handleInputChange} className="border p-1 rounded w-full"/></td>
                      <td className="px-4 py-2"><input name="jobType" value={editFormData.jobType} onChange={handleInputChange} className="border p-1 rounded w-full"/></td>
                      <td className="px-4 py-2"><input name="jobAddress" value={editFormData.jobAddress} onChange={handleInputChange} className="border p-1 rounded w-full"/></td>
                      <td className="px-4 py-2"><input type="date" name="projectStartDate" value={editFormData.projectStartDate} onChange={handleInputChange} className="border p-1 rounded w-full"/></td>
                      <td className="px-4 py-2"><input type="date" name="projectEndDate" value={editFormData.projectEndDate} onChange={handleInputChange} className="border p-1 rounded w-full"/></td>
                      <td className="px-4 py-2"><input name="contractorType" value={editFormData.contractorType} onChange={handleInputChange} className="border p-1 rounded w-full"/></td>
                      <td className="px-4 py-2"><input name="ownerName" value={editFormData.ownerName} onChange={handleInputChange} className="border p-1 rounded w-full"/></td>
                      <td className="px-4 py-2"><input type="email" name="ownerEmail" value={editFormData.ownerEmail} onChange={handleInputChange} className="border p-1 rounded w-full"/></td>
                      <td className="px-4 py-2"><input name="ownerPhone" value={editFormData.ownerPhone} onChange={handleInputChange} className="border p-1 rounded w-full"/></td>
                      <td className="px-4 py-2 flex space-x-2">
                        <button onClick={handleUpdateSubmit} className="bg-green-500 text-white px-2 py-1 rounded hover:bg-green-600"><FaEdit/></button>
                        <button onClick={handleCancelClick} className="bg-gray-500 text-white px-2 py-1 rounded hover:bg-gray-600"><FaTrash/></button>
                      </td>
                    </>
                  ) : (
                    <>
                      <td className="px-6 py-4 text-sm text-gray-700">{p.jobName}</td>
                      <td className="px-6 py-4 text-sm text-gray-700">{p.jobType}</td>
                      <td className="px-6 py-4 text-sm text-gray-700">{p.jobAddress}</td>
                      <td className="px-6 py-4 text-sm text-gray-700">{p.projectStartDate}</td>
                      <td className="px-6 py-4 text-sm text-gray-700">{p.projectEndDate}</td>
                      <td className="px-6 py-4 text-sm text-gray-700">{p.contractorType}</td>
                      <td className="px-6 py-4 text-sm text-gray-700">{p.ownerName}</td>
                      <td className="px-6 py-4 text-sm text-gray-700">{p.ownerEmail}</td>
                      <td className="px-6 py-4 text-sm text-gray-700">{p.ownerPhone}</td>
                      <td className="px-6 py-4 flex space-x-2">
                        <button onClick={() => handleEditClick(p)} className="bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600"><FaEdit/></button>
                        <button onClick={() => handleDelete(p._id)} className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"><FaTrash/></button>
                      </td>
                    </>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>
    </div>
  );
}
