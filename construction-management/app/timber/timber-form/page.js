"use client";
import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export default function TimberForm({ timberData: propTimberData, isEditing = false }) {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Form data structure
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

  const [formData, setFormData] = useState(initialFormData);
  const [errors, setErrors] = useState({});

  // Options
  const timberTypeOptions = ["Teak", "Mahogany", "Oak", "Pine", "Cedar", "Spruce"];
  const receivingWayOptions = ["Truck", "Ship", "Train", "Air"];
  const companyOptions = ["Company A", "Company B", "Company C"];
  const characteristicOptions = [
    "Hardwood", "Softwood", "Pressure Treated", "Kiln Dried", 
    "Engineered", "Laminated", "Composite", "Reclaimed", 
    "FSC Certified", "Weather Resistant"
  ];

  // Initialize form data
  useEffect(() => {
    // Priority 1: Props data
    if (propTimberData) {
      setFormData({
        ...initialFormData,
        ...propTimberData,
        characteristics: Array.isArray(propTimberData.characteristics) 
          ? propTimberData.characteristics 
          : []
      });
      return;
    }

    // Priority 2: URL params
    const paramsData = {};
    searchParams.forEach((value, key) => {
      paramsData[key] = value;
    });

    if (Object.keys(paramsData).length > 0) {
      setFormData({
        ...initialFormData,
        ...paramsData,
        length: parseFloat(paramsData.length) || "",
        width: parseFloat(paramsData.width) || "",
        height: parseFloat(paramsData.height) || "",
        costPerUnit: parseFloat(paramsData.costPerUnit) || "",
        quantity: parseInt(paramsData.quantity) || "",
        totalCost: parseFloat(paramsData.totalCost) || "",
        characteristics: paramsData.characteristics?.split(',') || []
      });
    }
  }, [propTimberData, searchParams]);

  const validate = () => {
    const newErrors = {};
    if (!formData.timberType) newErrors.timberType = "Required";
    if (!formData.receivedDate) newErrors.receivedDate = "Required";
    if (!formData.costPerUnit || formData.costPerUnit <= 0) newErrors.costPerUnit = "Invalid price";
    if (!formData.quantity || formData.quantity <= 0) newErrors.quantity = "Invalid quantity";
    if (!formData.quality) newErrors.quality = "Required";
    if (!formData.length || formData.length <= 0) newErrors.length = "Invalid length";
    if (!formData.width || formData.width <= 0) newErrors.width = "Invalid width";
    if (!formData.height || formData.height <= 0) newErrors.height = "Invalid height";
    if (!formData.receivingWay) newErrors.receivingWay = "Required";
    if (!formData.company) newErrors.company = "Required";
    if (formData.characteristics.length === 0) newErrors.characteristics = "Select at least one";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const calculateTotalCost = () => {
    const { length, width, height, quantity, costPerUnit } = formData;
    if (length && width && height && quantity && costPerUnit) {
      const totalCost = length * width * height * quantity * costPerUnit;
      setFormData(prev => ({ ...prev, totalCost: totalCost.toFixed(2) }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    const action = isEditing ? "update" : "create";
    console.log(`${action} timber:`, formData);
    alert(`Timber ${action}d successfully!`);

    router.push(`/timber/timber-detail?${new URLSearchParams({
      ...formData,
      characteristics: formData.characteristics.join(',')
    }).toString()}`);
  };

  const handleDelete = () => {
    if (confirm("Delete this timber?")) {
      console.log("Deleting:", formData);
      alert("Deleted successfully!");
      router.push("/timber");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (["length", "width", "height", "quantity", "costPerUnit"].includes(name)) {
      calculateTotalCost();
    }
  };

  const handleCheckboxChange = (e) => {
    const { value, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      characteristics: checked
        ? [...prev.characteristics, value]
        : prev.characteristics.filter(item => item !== value)
    }));
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#191A19] p-6">
      <div className="max-w-4xl w-full bg-white shadow-xl rounded-lg border border-[#FF7420] p-8">
        <h2 className="text-2xl font-bold text-[#FF7420] border-b pb-4 mb-6">
          {isEditing ? "Update Timber" : "Add New Timber"}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Form fields */}
          <div>
            <label className="block font-medium text-[#191A19]">Timber Type</label>
            <select
              name="timberType"
              value={formData.timberType}
              onChange={handleChange}
              className="w-full p-2 border rounded-md"
            >
              <option value="">Select Timber Type</option>
              {timberTypeOptions.map(type => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
            {errors.timberType && <p className="text-red-500 text-sm">{errors.timberType}</p>}
          </div>

          {/* Date */}
          <div>
            <label className="block font-medium text-[#191A19]">Received Date</label>
            <input
              type="date"
              name="receivedDate"
              value={formData.receivedDate}
              onChange={handleChange}
              className="w-full p-2 border rounded-md"
            />
            {errors.receivedDate && <p className="text-red-500 text-sm">{errors.receivedDate}</p>}
          </div>

          {/* Dimensions */}
          <div className="grid grid-cols-3 gap-4">
            {['length', 'width', 'height'].map(dim => (
              <div key={dim}>
                <label className="block font-medium text-[#191A19] capitalize">{dim}</label>
                <input
                  type="number"
                  name={dim}
                  value={formData[dim]}
                  onChange={handleChange}
                  className="w-full p-2 border rounded-md"
                  step="0.01"
                />
                {errors[dim] && <p className="text-red-500 text-sm">{errors[dim]}</p>}
              </div>
            ))}
          </div>

          {/* Cost and Quantity */}
          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="block font-medium text-[#191A19]">Cost Per Unit</label>
              <input
                type="number"
                name="costPerUnit"
                value={formData.costPerUnit}
                onChange={handleChange}
                className="w-full p-2 border rounded-md"
                step="0.01"
              />
              {errors.costPerUnit && <p className="text-red-500 text-sm">{errors.costPerUnit}</p>}
            </div>

            <div>
              <label className="block font-medium text-[#191A19]">Quantity</label>
              <input
                type="number"
                name="quantity"
                value={formData.quantity}
                onChange={handleChange}
                className="w-full p-2 border rounded-md"
              />
              {errors.quantity && <p className="text-red-500 text-sm">{errors.quantity}</p>}
            </div>

            <div>
              <label className="block font-medium text-[#191A19]">Total Cost</label>
              <input
                type="text"
                value={`${formData.totalCost || '0'}`}
                readOnly
                className="w-full p-2 border rounded-md bg-gray-100"
              />
            </div>
          </div>

          {/* Quality */}
          <div>
            <label className="block font-medium text-[#191A19]">Quality</label>
            <select
              name="quality"
              value={formData.quality}
              onChange={handleChange}
              className="w-full p-2 border rounded-md"
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
              name="receivingWay"
              value={formData.receivingWay}
              onChange={handleChange}
              className="w-full p-2 border rounded-md"
            >
              <option value="">Select Receiving Way</option>
              {receivingWayOptions.map(way => (
                <option key={way} value={way}>{way}</option>
              ))}
            </select>
            {errors.receivingWay && <p className="text-red-500 text-sm">{errors.receivingWay}</p>}
          </div>

          {/* Company */}
          <div>
            <label className="block font-medium text-[#191A19]">Company</label>
            <select
              name="company"
              value={formData.company}
              onChange={handleChange}
              className="w-full p-2 border rounded-md"
            >
              <option value="">Select Company</option>
              {companyOptions.map(company => (
                <option key={company} value={company}>{company}</option>
              ))}
            </select>
            {errors.company && <p className="text-red-500 text-sm">{errors.company}</p>}
          </div>

          {/* Characteristics */}
          <div>
            <label className="block font-medium text-[#191A19]">Characteristics</label>
            <div className="grid grid-cols-2 gap-2">
              {characteristicOptions.map(char => (
                <div key={char} className="flex items-center">
                  <input
                    type="checkbox"
                    id={char}
                    value={char}
                    checked={formData.characteristics.includes(char)}
                    onChange={handleCheckboxChange}
                    className="mr-2"
                  />
                  <label htmlFor={char}>{char}</label>
                </div>
              ))}
            </div>
            {errors.characteristics && <p className="text-red-500 text-sm">{errors.characteristics}</p>}
          </div>

          {/* Actions */}
          <div className="flex justify-end space-x-4">
            {isEditing && (
              <button
                type="button"
                onClick={handleDelete}
                className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
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