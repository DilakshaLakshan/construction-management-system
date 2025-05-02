"use client";
import { useSearchParams, useRouter } from "next/navigation";
import { useState } from "react";

export default function QuotationDetails() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const [clientName, setClientName] = useState(searchParams.get("clientName") || "");
  const [siteName, setSiteName] = useState(searchParams.get("siteName") || "");
  const [clientLocation, setClientLocation] = useState(searchParams.get("clientLocation") || "");
  const [description, setDescription] = useState(searchParams.get("description") || "");
  const [totalCost, setTotalCost] = useState(searchParams.get("totalCost") || "0");
  const [materials, setMaterials] = useState(JSON.parse(searchParams.get("materials") || "[]"));

  const handleUpdate = () => {
    const queryParams = new URLSearchParams({
      clientName,
      siteName,
      clientLocation,
      description,
      totalCost: totalCost.toString(),
      materials: JSON.stringify(materials),
    }).toString();

    router.push(`/Construction/material-form?${queryParams}`);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
      <div className="max-w-3xl w-full bg-white shadow-lg rounded-lg p-8 border border-gray-300">
        <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">Materials Details</h2>
        <div className="space-y-4 text-lg">
          <p><span className="font-semibold">Client Name:</span> {clientName}</p>
          <p><span className="font-semibold">Site Name:</span> {siteName}</p>
          <p><span className="font-semibold">Client Location:</span> {clientLocation}</p>
          <p><span className="font-semibold">Description:</span> {description}</p>
          <p><span className="font-semibold">Total Cost:</span> <span className="text-green-600 font-bold">${parseFloat(totalCost).toFixed(2)}</span></p>
        </div>

        <h3 className="text-2xl font-semibold mt-6 mb-4 border-b pb-2">Materials</h3>
        <ul className="list-disc ml-6 space-y-2">
          {materials.map((mat, idx) => (
            <li key={idx} className="text-lg">
              <span className="font-semibold">{mat.name}</span> - Quantity: {mat.quantity}, Unit Price: 
              <span className="text-blue-600 font-semibold">${mat.unitPrice}</span>
            </li>
          ))}
        </ul>

        <button 
          onClick={handleUpdate} 
          className="w-full mt-6 bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 rounded-md text-lg">
          Update Details
        </button>
      </div>
    </div>
  );
}