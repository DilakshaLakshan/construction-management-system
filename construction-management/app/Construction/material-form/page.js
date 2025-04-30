"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function MaterialForm() {
  const [clientName, setClientName] = useState("");
  const [SiteName, setSiteName] = useState("");
  const [clientlocation, setclientLocation] = useState("");
  const [description, setDescription] = useState("");
  const [materials, setMaterials] = useState([]);
  const [totalCost, setTotalCost] = useState(0);
  const router = useRouter();

      const updateTotalCost = (updatedMaterials) => {
        const total = updatedMaterials.reduce(
          (sum, mat) => sum + mat.quantity * mat.unitPrice,
          0
        );
        setTotalCost(total);
      };

      const addMaterial = () => {
        setMaterials([...materials, { name: "", quantity: 1, unitPrice: 0 }]);
      };

      const updateMaterial = (index, key, value) => {
        const updatedMaterials = [...materials];
        updatedMaterials[index][key] = value;
        setMaterials(updatedMaterials);
        updateTotalCost(updatedMaterials);
      };

      const removeMaterial = (index) => {
        const updatedMaterials = materials.filter((_, i) => i !== index);
        setMaterials(updatedMaterials);
        updateTotalCost(updatedMaterials);
      };

      const generateQuotation = (e) => {
        e.preventDefault();
        const queryParams = new URLSearchParams({
          clientName,
          SiteName,
          clientlocation,
          description,
          totalCost: totalCost.toString(),
          materials: JSON.stringify(materials),
        }).toString();
  
          router.push(`/Construction/quotation-details?${queryParams}`);
        };
  

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-6">
      <div className="max-w-2xl w-full bg-white shadow-lg rounded-lg p-6">
        <h2 className="text-2xl font-bold text-gray-800 text-center mb-6">Material Details Form</h2>

        <form onSubmit={generateQuotation} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-700 font-medium">Client Name</label>

              <input
                type="text"
                value={clientName}
                onChange={(e) => setClientName(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md"
                required
              />
            </div>
            
            <div>
              <label className="block text-gray-700 font-medium">Site Name</label>

              <input
                type="text"
                value={SiteName}
                onChange={(e) => setSiteName(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md"
                required
              />
            </div>
            <div>
              <label className="block text-gray-700 font-medium">Client Location</label>

              <input
                type="text"
                value={clientlocation}
                onChange={(e) => setclientLocation(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md"
                required
              />
            </div>
            <div>
              <label className="block text-gray-700 font-medium">Description</label>

              <input
                type="text"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md"
                required
              />
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-700">Materials</h3>
            {materials.map((material, index) => (
              <div key={index} className="grid grid-cols-4 gap-2 items-center mt-2">

                <input
                  type="text"
                  placeholder="Material Name"
                  value={material.name}
                  onChange={(e) => updateMaterial(index, "name", e.target.value)}
                  className="p-2 border border-gray-300 rounded-md"
                  required
                />

                <input
                  type="number"
                  placeholder="Quantity"
                  value={material.quantity}
                  onChange={(e) => updateMaterial(index, "quantity", Number(e.target.value))}
                  className="p-2 border border-gray-300 rounded-md"
                  required
                />
                <input
                  type="number"
                  placeholder="Unit Price ($)"
                  value={material.unitPrice}
                  onChange={(e) => updateMaterial(index, "unitPrice", Number(e.target.value))}
                  className="p-2 border border-gray-300 rounded-md"
                  required
                />
                <button
                  type="button"
                  onClick={() => removeMaterial(index)}
                  className="bg-red-500 text-white px-3 py-2 rounded-md hover:bg-red-600"
                >Delete</button>
              </div>
            ))}

            <button
              type="button"
              onClick={addMaterial}
              className="mt-2 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
            >
              ➕ Add Material
            </button>
          </div>

          <div className="text-xl font-semibold text-gray-800">
            Total Cost: <span className="text-green-600">{totalCost.toFixed(2)}/=</span>
          </div>

          <button
            type="submit"
            className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-3 rounded-md text-lg"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}