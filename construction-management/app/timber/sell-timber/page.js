"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function SellTimberForm() {
  const router = useRouter();

  // Initial form data
  const initialFormData = {
    timberType: "",
    quantity: 0,
    length: 0,
    width: 0,
    height: 0,
    sellingPrice: 0,
    discountRate: 0, // Discount rate in percentage
    buyerName: "",
    buyerContact: "",
    totalCost: 0,
    finalCost: 0, // Final cost after discount
  };

  const [formData, setFormData] = useState(initialFormData);
  const [errors, setErrors] = useState({});

  // Timber type options
  const timberTypeOptions = ["Teak", "Mahogany", "Oak", "Pine", "Cedar", "Spruce"];

  // Validate form data
  const validate = () => {
    let newErrors = {};
    if (!formData.timberType) newErrors.timberType = "Required";
    if (!formData.quantity || formData.quantity <= 0) newErrors.quantity = "Enter a valid quantity";
    if (!formData.length || formData.length <= 0) newErrors.length = "Enter a valid length";
    if (!formData.width || formData.width <= 0) newErrors.width = "Enter a valid width";
    if (!formData.height || formData.height <= 0) newErrors.height = "Enter a valid height";
    if (!formData.sellingPrice || formData.sellingPrice <= 0)
      newErrors.sellingPrice = "Enter a valid selling price";
    if (formData.discountRate < 0 || formData.discountRate > 100)
      newErrors.discountRate = "Discount rate must be between 0 and 100";
    if (!formData.buyerName) newErrors.buyerName = "Required";
    if (!formData.buyerContact || !/^\d{10}$/.test(formData.buyerContact))
      newErrors.buyerContact = "Enter a valid 10-digit contact number";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Calculate volume and total cost
  const calculateCosts = () => {
    const { length, width, height, quantity, sellingPrice, discountRate } = formData;

    // Calculate volume
    const volume = length * width * height * quantity;

    // Calculate total cost
    const totalCost = volume * sellingPrice;

    // Calculate final cost after discount
    const finalCost = totalCost - totalCost * (discountRate / 100);

    setFormData((prev) => ({
      ...prev,
      totalCost: totalCost.toFixed(2),
      finalCost: finalCost.toFixed(2),
    }));
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    // Simulate API call for selling timber
    console.log("Selling Timber Data:", formData);
    alert("Timber sold successfully!");

    // Redirect to sell-details page with query parameters
    const queryParams = new URLSearchParams(formData).toString();
    router.push(`/timber/sell-timber/sell-details?${queryParams}`);
  };

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Recalculate costs if relevant fields change
    if (["length", "width", "height", "quantity", "sellingPrice", "discountRate"].includes(name)) {
      calculateCosts();
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#191A19] p-6">
      <div className="max-w-4xl w-full bg-[#FFFFFF] shadow-xl rounded-lg border border-[#FF7420] p-8">
        <h2 className="text-2xl font-bold text-[#FF7420] border-b pb-4 mb-6">Sell Timber</h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Timber Type */}
          <div>
            <label className="block font-medium text-[#191A19]">Timber Type</label>
            <select
              name="timberType"
              value={formData.timberType}
              onChange={handleChange}
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

          {/* Quantity */}
          <div>
            <label className="block font-medium text-[#191A19]">Quantity</label>
            <input
              type="number"
              name="quantity"
              value={formData.quantity}
              onChange={handleChange}
              className="w-full p-2 border rounded-md text-[#191A19]"
            />
            {errors.quantity && <p className="text-red-500 text-sm">{errors.quantity}</p>}
          </div>

          {/* Dimensions */}
          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="block font-medium text-[#191A19]">Length (m)</label>
              <input
                type="number"
                name="length"
                value={formData.length}
                onChange={handleChange}
                className="w-full p-2 border rounded-md text-[#191A19]"
              />
              {errors.length && <p className="text-red-500 text-sm">{errors.length}</p>}
            </div>
            <div>
              <label className="block font-medium text-[#191A19]">Width (m)</label>
              <input
                type="number"
                name="width"
                value={formData.width}
                onChange={handleChange}
                className="w-full p-2 border rounded-md text-[#191A19]"
              />
              {errors.width && <p className="text-red-500 text-sm">{errors.width}</p>}
            </div>
            <div>
              <label className="block font-medium text-[#191A19]">Height (m)</label>
              <input
                type="number"
                name="height"
                value={formData.height}
                onChange={handleChange}
                className="w-full p-2 border rounded-md text-[#191A19]"
              />
              {errors.height && <p className="text-red-500 text-sm">{errors.height}</p>}
            </div>
          </div>

          {/* Selling Price */}
          <div>
            <label className="block font-medium text-[#191A19]">Selling Price (per m³)</label>
            <input
              type="number"
              name="sellingPrice"
              value={formData.sellingPrice}
              onChange={handleChange}
              className="w-full p-2 border rounded-md text-[#191A19]"
            />
            {errors.sellingPrice && <p className="text-red-500 text-sm">{errors.sellingPrice}</p>}
          </div>

          {/* Discount Rate */}
          <div>
            <label className="block font-medium text-[#191A19]">Discount Rate (%)</label>
            <input
              type="number"
              name="discountRate"
              value={formData.discountRate}
              onChange={handleChange}
              className="w-full p-2 border rounded-md text-[#191A19]"
            />
            {errors.discountRate && <p className="text-red-500 text-sm">{errors.discountRate}</p>}
          </div>

          {/* Buyer Details */}
          <div>
            <label className="block font-medium text-[#191A19]">Buyer Name</label>
            <input
              type="text"
              name="buyerName"
              value={formData.buyerName}
              onChange={handleChange}
              className="w-full p-2 border rounded-md text-[#191A19]"
            />
            {errors.buyerName && <p className="text-red-500 text-sm">{errors.buyerName}</p>}
          </div>

          <div>
            <label className="block font-medium text-[#191A19]">Buyer Contact Number</label>
            <input
              type="text"
              name="buyerContact"
              value={formData.buyerContact}
              onChange={handleChange}
              className="w-full p-2 border rounded-md text-[#191A19]"
            />
            {errors.buyerContact && <p className="text-red-500 text-sm">{errors.buyerContact}</p>}
          </div>

          {/* Total Cost */}
          <div>
            <label className="block font-medium text-[#191A19]">Total Cost</label>
            <input
              type="text"
              value={`Rupee ${formData.totalCost}`}
              readOnly
              className="w-full p-2 border rounded-md bg-gray-100 text-[#191A19]"
            />
          </div>

          {/* Final Cost */}
          <div>
            <label className="block font-medium text-[#191A19]">Final Cost (After Discount)</label>
            <input
              type="text"
              value={`Rupee ${formData.finalCost}`}
              readOnly
              className="w-full p-2 border rounded-md bg-gray-100 text-[#191A19]"
            />
          </div>

          {/* Submit Button */}
          <div className="flex justify-end">
            <button
              type="submit"
              className="px-4 py-2 bg-[#FF7420] text-white rounded-md hover:bg-[#FF7420]/90"
            >
              Sell Timber
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}