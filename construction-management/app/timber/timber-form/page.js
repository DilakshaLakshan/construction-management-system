"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function TimberForm({ timberData, isEditing = false }) {
  const router = useRouter();

  // Initial form data
  const initialFormData = {
    timberType: "",
    receivedDate: "",
    costPerUnit: "",
    quantity: "",
    quality: "",
    length: "",
    width: "",
    height: "",
    receivingWay: "",
    company: "",
    characteristics: [],
    totalCost: "",
  };

  const [formData, setFormData] = useState(timberData || initialFormData);
  const [errors, setErrors] = useState({});

  // Options for dropdowns and checkboxes
  const timberTypeOptions = ["Teak", "Mahogany", "Oak", "Pine", "Cedar", "Spruce"];
  const receivingWayOptions = ["Truck", "Ship", "Train", "Air"];
  const companyOptions = ["Company A", "Company B", "Company C"];
  const characteristicOptions = [
    "Hardwood",
    "Softwood",
    "Pressure Treated",
    "Kiln Dried",
    "Engineered",
    "Laminated",
    "Composite",
    "Reclaimed",
    "FSC Certified",
    "Weather Resistant",
  ];

  // Validate form data
  const validate = () => {
    let newErrors = {};
    if (!formData.timberType) newErrors.timberType = "Required";
    if (!formData.receivedDate) newErrors.receivedDate = "Required";
    if (!formData.costPerUnit || formData.costPerUnit <= 0) newErrors.costPerUnit = "Enter a valid price";
    if (!formData.quantity || formData.quantity <= 0) newErrors.quantity = "Enter a valid quantity";
    if (!formData.quality) newErrors.quality = "Required";
    if (!formData.length || formData.length <= 0) newErrors.length = "Enter a valid length";
    if (!formData.width || formData.width <= 0) newErrors.width = "Enter a valid width";
    if (!formData.height || formData.height <= 0) newErrors.height = "Enter a valid height";
    if (!formData.receivingWay) newErrors.receivingWay = "Required";
    if (!formData.company) newErrors.company = "Required";
    if (formData.characteristics.length === 0) newErrors.characteristics = "Select at least one characteristic";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Auto-calculate total cost
  const calculateTotalCost = () => {
    const { length, width, height, quantity, costPerUnit } = formData;
    if (length && width && height && quantity && costPerUnit) {
      const volume = length * width * height * quantity; // Volume = Length × Width × Height × Quantity
      const totalCost = volume * costPerUnit; // Total Cost = Volume × Cost Per Unit
      setFormData((prev) => ({ ...prev, totalCost: totalCost.toFixed(2) }));
    }
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    // Simulate API call for add/update
    if (isEditing) {
      console.log("Updating timber:", formData);
      alert("Timber updated successfully!");
    } else {
      console.log("Adding timber:", formData);
      alert("Timber added successfully!");
    }

    // Redirect to timber details page
    const queryParams = new URLSearchParams(formData).toString();
    router.push(`/timber/timber-detail?${queryParams}`);
  };

  // Handle delete
  const handleDelete = () => {
    if (confirm("Are you sure you want to delete this timber?")) {
      console.log("Deleting timber:", formData);
      alert("Timber deleted successfully!");
      router.push("/timber");
    }
  };

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (["length", "width", "height", "quantity", "costPerUnit"].includes(name)) {
      calculateTotalCost();
    }
  };

  // Handle checkbox changes
  const handleCheckboxChange = (e) => {
    const { value, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      characteristics: checked
        ? [...prev.characteristics, value]
        : prev.characteristics.filter((item) => item !== value),
    }));
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#191A19] p-6">
      <div className="max-w-4xl w-full bg-[#FFFFFF] shadow-xl rounded-lg border border-[#FF7420] p-8">
        <h2 className="text-2xl font-bold text-[#FF7420] border-b pb-4 mb-6">
          {isEditing ? "Update Timber Details" : "Add New Timber"}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Timber Type */}
          <div>
            <label className="block font-medium text-[#191A19]">Timber Type</label>
            <select
              value={formData.timberType}
              onChange={(e) => setFormData({ ...formData, timberType: e.target.value })}
              className="w-full p-2 border rounded-md text-[#191A19]"
            >
              <option value="">Select Timber Type</option>
              {timberTypeOptions.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
            {errors.timberType && <p className="text-red-500 text-sm">{errors.timberType}</p>}
          </div>

          {/* Received Date */}
          <div>
            <label className="block font-medium text-[#191A19]">Received Date</label>
            <input
              type="date"
              value={formData.receivedDate}
              onChange={(e) => setFormData({ ...formData, receivedDate: e.target.value })}
              className="w-full p-2 border rounded-md text-[#191A19]"
            />
            {errors.receivedDate && <p className="text-red-500 text-sm">{errors.receivedDate}</p>}
          </div>

          {/* Dimensions */}
          <div className="grid grid-cols-3 gap-4">
            {["length", "width", "height"].map((field) => (
              <div key={field}>
                <label className="block font-medium text-[#191A19] capitalize">{field}</label>
                <input
                  type="number"
                  value={formData[field]}
                  onChange={(e) => {
                    setFormData({ ...formData, [field]: e.target.value });
                    calculateTotalCost();
                  }}
                  className="w-full p-2 border rounded-md text-[#191A19]"
                />
                {errors[field] && <p className="text-red-500 text-sm">{errors[field]}</p>}
              </div>
            ))}
          </div>

          {/* Cost Per Unit, Quantity, Total Cost */}
          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="block font-medium text-[#191A19]">Cost Per Unit</label>
              <input
                type="number"
                value={formData.costPerUnit}
                onChange={(e) => {
                  setFormData({ ...formData, costPerUnit: e.target.value });
                  calculateTotalCost();
                }}
                className="w-full p-2 border rounded-md text-[#191A19]"
              />
              {errors.costPerUnit && <p className="text-red-500 text-sm">{errors.costPerUnit}</p>}
            </div>

            <div>
              <label className="block font-medium text-[#191A19]">Quantity</label>
              <input
                type="number"
                value={formData.quantity}
                onChange={(e) => {
                  setFormData({ ...formData, quantity: e.target.value });
                  calculateTotalCost();
                }}
                className="w-full p-2 border rounded-md text-[#191A19]"
              />
              {errors.quantity && <p className="text-red-500 text-sm">{errors.quantity}</p>}
            </div>

            <div>
              <label className="block font-medium text-[#191A19]">Total Cost</label>
              <input
                type="text"
                value={formData.totalCost}
                readOnly
                className="w-full p-2 border rounded-md bg-gray-100 text-[#191A19]"
              />
            </div>
          </div>

          {/* Quality */}
          <div>
            <label className="block font-medium text-[#191A19]">Quality</label>
            <select
              value={formData.quality}
              onChange={(e) => setFormData({ ...formData, quality: e.target.value })}
              className="w-full p-2 border rounded-md text-[#191A19]"
            >
              <option value="">Select Quality</option>
              <option value="Premium">Premium</option>
              <option value="Standard">Standard</option>
              <option value="Economy">Economy</option>
            </select>
            {errors.quality && <p className="text-red-500 text-sm">{errors.quality}</p>}
          </div>

          {/* Receiving Way */}
          <div>
            <label className="block font-medium text-[#191A19]">Receiving Way</label>
            <select
              value={formData.receivingWay}
              onChange={(e) => setFormData({ ...formData, receivingWay: e.target.value })}
              className="w-full p-2 border rounded-md text-[#191A19]"
            >
              <option value="">Select Receiving Way</option>
              {receivingWayOptions.map((way) => (
                <option key={way} value={way}>
                  {way}
                </option>
              ))}
            </select>
            {errors.receivingWay && <p className="text-red-500 text-sm">{errors.receivingWay}</p>}
          </div>

          {/* Company */}
          <div>
            <label className="block font-medium text-[#191A19]">Company</label>
            <select
              value={formData.company}
              onChange={(e) => setFormData({ ...formData, company: e.target.value })}
              className="w-full p-2 border rounded-md text-[#191A19]"
            >
              <option value="">Select Company</option>
              {companyOptions.map((company) => (
                <option key={company} value={company}>
                  {company}
                </option>
              ))}
            </select>
            {errors.company && <p className="text-red-500 text-sm">{errors.company}</p>}
          </div>

          {/* Characteristics */}
          <div>
            <label className="block font-medium text-[#191A19]">Characteristics</label>
            <div className="grid grid-cols-2 gap-2">
              {characteristicOptions.map((characteristic) => (
                <div key={characteristic} className="flex items-center">
                  <input
                    type="checkbox"
                    id={characteristic}
                    value={characteristic}
                    checked={formData.characteristics.includes(characteristic)}
                    onChange={(e) => {
                      const { value, checked } = e.target;
                      setFormData((prev) => ({
                        ...prev,
                        characteristics: checked
                          ? [...prev.characteristics, value]
                          : prev.characteristics.filter((item) => item !== value),
                      }));
                    }}
                    className="mr-2"
                  />
                  <label htmlFor={characteristic} className="text-sm text-[#191A19]">
                    {characteristic}
                  </label>
                </div>
              ))}
            </div>
            {errors.characteristics && <p className="text-red-500 text-sm">{errors.characteristics}</p>}
          </div>

          {/* Form Actions */}
          <div className="flex justify-end space-x-4">
            {isEditing && (
              <button
                type="button"
                onClick={handleDelete}
                className="px-4 py-2 bg-[#FF7420] text-white rounded-md hover:bg-[#FF7420]/90"
              >
                Delete
              </button>
            )}
            <button
              type="submit"
              className="px-4 py-2 bg-[#FF7420] text-white rounded-md hover:bg-[#FF7420]/90"
            >
              {isEditing ? "Update" : "Submit"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}