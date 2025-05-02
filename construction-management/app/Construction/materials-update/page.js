"use client";
import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";

export default function UpdateMaterialsPage() {
  const router = useRouter();
  const searchParams = useSearchParams();


  const updateMaterials = useMutation(api.materials.updateMaterials);

 
  const [docId, setDocId] = useState(null);

  const [clientName, setClientName] = useState("");
  const [siteName, setSiteName] = useState("");
  const [clientLocation, setClientLocation] = useState("");
  const [description, setDescription] = useState("");
  const [totalCost, setTotalCost] = useState(0);
  const [payment, setPayment] = useState(false);
  const [materials, setMaterials] = useState([]);

 
  useEffect(() => {
    const id = searchParams.get("id");
    if (id) {
      setDocId(id);
    }

    setClientName(searchParams.get("clientName") || "");
    setSiteName(searchParams.get("SiteName") || "");
    setClientLocation(searchParams.get("clientlocation") || "");
    setDescription(searchParams.get("description") || "");
    setTotalCost(Number(searchParams.get("totalCost")) || 0);

  
    const paymentParam = searchParams.get("payment");
    if (paymentParam === "true") {
      setPayment(true);
    } else {
      setPayment(false);
    }

 
    const materialsJSON = searchParams.get("materials");
    if (materialsJSON) {
      try {
        setMaterials(JSON.parse(materialsJSON));
      } catch (error) {
        console.error("Invalid materials JSON:", error);
      }
    }
  }, [searchParams]);


  const updateTotalCost = (updatedMaterials) => {
    let newTotal = updatedMaterials.reduce(
      (sum, mat) => sum + mat.quantity * mat.unitPrice,
      0
    );
    setTotalCost(newTotal);
  };

 
  const addMaterial = () => {
    setMaterials((prev) => [...prev, { name: "", quantity: 1, unitPrice: 0 }]);
  };


  const handleMaterialChange = (index, key, value) => {
    let newList = [...materials];
    newList[index][key] = value;
    setMaterials(newList);
    updateTotalCost(newList);
  };

  
  const handleRemoveMaterial = (index) => {
    let newList = materials.filter((_, i) => i !== index);
    setMaterials(newList);
    updateTotalCost(newList);
  };

  
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!docId) {
      alert("No document ID found — cannot update.");
      return;
    }

    await updateMaterials({
      id: docId,
      clientName,
      siteName,
      clientLocation,
      description,
      totalCost,
      payment,
      items: materials,
    });


    router.push("/Construction/materials-table");
  };

  return (
    <div className="min-h-screen flex flex-col items-center bg-gray-100 p-6">
      <div className="max-w-2xl w-full bg-white shadow-lg rounded-lg p-6">
        <h2 className="text-2xl font-bold text-gray-800 text-center mb-6">
          Update Materials
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-700 font-medium">
                Client Name
              </label>
              <input
                type="text"
                value={clientName}
                onChange={(e) => setClientName(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md"
                required
              />
            </div>

            <div>
              <label className="block text-gray-700 font-medium">
                Site Name
              </label>
              <input
                type="text"
                value={siteName}
                onChange={(e) => setSiteName(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md"
                required
              />
            </div>

            <div>
              <label className="block text-gray-700 font-medium">
                Client Location
              </label>
              <input
                type="text"
                value={clientLocation}
                onChange={(e) => setClientLocation(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md"
                required
              />
            </div>

            <div>
              <label className="block text-gray-700 font-medium">
                Description
              </label>
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
            {materials.map((mat, index) => (
              <div
                key={index}
                className="grid grid-cols-4 gap-2 items-center mt-2"
              >
                <input
                  type="text"
                  placeholder="Material Name"
                  value={mat.name}
                  onChange={(e) => handleMaterialChange(index, "name", e.target.value)}
                  className="p-2 border border-gray-300 rounded-md"
                  required
                />
                <input
                  type="number"
                  placeholder="Quantity"
                  value={mat.quantity}
                  onChange={(e) => handleMaterialChange(index, "quantity", Number(e.target.value))}
                  className="p-2 border border-gray-300 rounded-md"
                  required
                />
                <input
                  type="number"
                  placeholder="Unit Price ($)"
                  value={mat.unitPrice}
                  onChange={(e) => handleMaterialChange(index, "unitPrice", Number(e.target.value))}
                  className="p-2 border border-gray-300 rounded-md"
                  required
                />
                <button
                  type="button"
                  onClick={() => handleRemoveMaterial(index)}
                  className="bg-red-500 text-white px-3 py-2 rounded-md hover:bg-red-600"
                >
                  Delete
                </button>
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

       
          <div className="flex items-center mt-4">
            <label className="text-gray-700 font-medium mr-2">
              Payment Done?
            </label>

            <input
              type="checkbox"
              checked={payment}
              onChange={(e) => setPayment(e.target.checked)}
              className="w-5 h-5 text-blue-600 border-gray-300 rounded"
            />
          </div>

          
          <div className="text-xl font-semibold text-gray-800 mt-2">
            Total Cost:{" "}
            <span className="text-green-600">{totalCost.toFixed(2)}/=</span>
          </div>

          
          <div className="flex mt-4 justify-end">
            <button
              type="submit"
              className="bg-green-500 hover:bg-green-600 text-white font-semibold py-3 px-6 rounded-md text-lg"
            >
              Update
            </button>

            
          </div>
        </form>
      </div>
    </div>
  );
}
