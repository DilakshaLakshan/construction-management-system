"use client";
import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export default function SellTimberForm() {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Initial form data structure matching your details page
  const initialFormData = {
    timberType: "",
    receivedDate: "",
    length: 0,
    width: 0,
    height: 0,
    costPerUnit: 0,
    quantity: 0,
    totalCost: 0,
    quality: "",
    receivingWay: "",
    company: "",
    characteristics: "",
    sellingPrice: 0,
    discountRate: 0,
    buyerName: "",
    buyerContact: "",
    finalCost: 0
  };

  const [formData, setFormData] = useState(initialFormData);
  const [errors, setErrors] = useState({});
  const [isUpdateMode, setIsUpdateMode] = useState(false);

  // Options for dropdowns
  const timberTypeOptions = ["Teak", "Mahogany", "Oak", "Pine", "Cedar", "Spruce"];
  const qualityOptions = ["Premium", "Standard", "Low"];
  const receivingWayOptions = ["Ship", "Truck", "Train", "Air"];

  // Load data from query params when component mounts
  useEffect(() => {
    if (searchParams.toString()) {
      const paramsData = {};
      searchParams.forEach((value, key) => {
        paramsData[key] = value;
      });

      setIsUpdateMode(true);
      
      // Convert and set form data from URL params
      setFormData({
        timberType: paramsData.timberType || "",
        receivedDate: paramsData.receivedDate || "",
        length: Number(paramsData.length) || 0,
        width: Number(paramsData.width) || 0,
        height: Number(paramsData.height) || 0,
        costPerUnit: Number(paramsData.costPerUnit) || 0,
        quantity: Number(paramsData.quantity) || 0,
        totalCost: Number(paramsData.totalCost) || 0,
        quality: paramsData.quality || "",
        receivingWay: paramsData.receivingWay || "",
        company: paramsData.company || "",
        characteristics: paramsData.characteristics || "",
        sellingPrice: Number(paramsData.sellingPrice) || 0,
        discountRate: Number(paramsData.discountRate) || 0,
        buyerName: paramsData.buyerName || "",
        buyerContact: paramsData.buyerContact || "",
        finalCost: Number(paramsData.finalCost) || 0
      });
    }
  }, [searchParams]);

  // Validate form data
  const validate = () => {
    let newErrors = {};
    if (!formData.timberType) newErrors.timberType = "Required";
    if (!formData.receivedDate) newErrors.receivedDate = "Required";
    if (!formData.quantity || formData.quantity <= 0) newErrors.quantity = "Enter valid quantity";
    if (!formData.length || formData.length <= 0) newErrors.length = "Enter valid length";
    if (!formData.width || formData.width <= 0) newErrors.width = "Enter valid width";
    if (!formData.height || formData.height <= 0) newErrors.height = "Enter valid height";
    if (!formData.quality) newErrors.quality = "Required";
    if (!formData.receivingWay) newErrors.receivingWay = "Required";
    if (!formData.company) newErrors.company = "Required";
    if (!formData.sellingPrice || formData.sellingPrice <= 0) newErrors.sellingPrice = "Enter valid price";
    if (formData.discountRate < 0 || formData.discountRate > 100) newErrors.discountRate = "Must be 0-100";
    if (!formData.buyerName) newErrors.buyerName = "Required";
    if (!formData.buyerContact || !/^\d{10}$/.test(formData.buyerContact)) newErrors.buyerContact = "Enter valid 10-digit number";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Calculate costs when relevant fields change
  useEffect(() => {
    const volume = formData.length * formData.width * formData.height * formData.quantity;
    const totalCost = volume * formData.sellingPrice;
    const finalCost = totalCost - (totalCost * (formData.discountRate / 100));
    
    setFormData(prev => ({
      ...prev,
      totalCost: parseFloat(totalCost.toFixed(2)),
      finalCost: parseFloat(finalCost.toFixed(2))
    }));
  }, [formData.length, formData.width, formData.height, formData.quantity, formData.sellingPrice, formData.discountRate]);

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    if (isUpdateMode) {
      console.log("Updating timber:", formData);
      alert("Timber details updated successfully!");
    } else {
      console.log("Selling new timber:", formData);
      alert("Timber sold successfully!");
    }

    // Redirect to details page with updated data
    const queryParams = new URLSearchParams();
    for (const [key, value] of Object.entries(formData)) {
      queryParams.append(key, value.toString());
    }
    router.push(`/timber/sell-timber/sell-details?${queryParams.toString()}`);
  };

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#191A19] p-6">
      <div className="max-w-4xl w-full bg-[#FFFFFF] shadow-xl rounded-lg border border-[#FF7420] p-8">
        <h2 className="text-2xl font-bold text-[#FF7420] border-b pb-4 mb-6">
          {isUpdateMode ? "Update Timber Details" : "Sell New Timber"}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Timber Type */}
          <div>
            <label className="block font-medium text-[#191A19]">Timber Type</label>
            <select
              name="timberType"
              value={formData.timberType}
              onChange={handleChange}
              className="w-full p-2 border rounded-md text-[#191A19]"
              required
            >
              <option value="">Select Timber Type</option>
              {timberTypeOptions.map(type => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
            {errors.timberType && <p className="text-red-500 text-sm">{errors.timberType}</p>}
          </div>

          {/* Received Date */}
          <div>
            <label className="block font-medium text-[#191A19]">Received Date</label>
            <input
              type="date"
              name="receivedDate"
              value={formData.receivedDate}
              onChange={handleChange}
              className="w-full p-2 border rounded-md text-[#191A19]"
              required
            />
            {errors.receivedDate && <p className="text-red-500 text-sm">{errors.receivedDate}</p>}
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
                min="0"
                step="0.01"
                required
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
                min="0"
                step="0.01"
                required
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
                min="0"
                step="0.01"
                required
              />
              {errors.height && <p className="text-red-500 text-sm">{errors.height}</p>}
            </div>
          </div>

          {/* Cost and Quantity */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block font-medium text-[#191A19]">Cost Per Unit</label>
              <input
                type="number"
                name="costPerUnit"
                value={formData.costPerUnit}
                onChange={handleChange}
                className="w-full p-2 border rounded-md text-[#191A19]"
                min="0"
                step="0.01"
              />
            </div>
            <div>
              <label className="block font-medium text-[#191A19]">Quantity</label>
              <input
                type="number"
                name="quantity"
                value={formData.quantity}
                onChange={handleChange}
                className="w-full p-2 border rounded-md text-[#191A19]"
                min="1"
                required
              />
              {errors.quantity && <p className="text-red-500 text-sm">{errors.quantity}</p>}
            </div>
          </div>

          {/* Quality */}
          <div>
            <label className="block font-medium text-[#191A19]">Quality</label>
            <select
              name="quality"
              value={formData.quality}
              onChange={handleChange}
              className="w-full p-2 border rounded-md text-[#191A19]"
              required
            >
              <option value="">Select Quality</option>
              {qualityOptions.map(quality => (
                <option key={quality} value={quality}>{quality}</option>
              ))}
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
              className="w-full p-2 border rounded-md text-[#191A19]"
              required
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
            <input
              type="text"
              name="company"
              value={formData.company}
              onChange={handleChange}
              className="w-full p-2 border rounded-md text-[#191A19]"
              required
            />
            {errors.company && <p className="text-red-500 text-sm">{errors.company}</p>}
          </div>

          {/* Characteristics */}
          <div>
            <label className="block font-medium text-[#191A19]">Characteristics</label>
            <input
              type="text"
              name="characteristics"
              value={formData.characteristics}
              onChange={handleChange}
              className="w-full p-2 border rounded-md text-[#191A19]"
            />
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
              min="0"
              step="0.01"
              required
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
              min="0"
              max="100"
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
              required
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
              required
              pattern="\d{10}"
            />
            {errors.buyerContact && <p className="text-red-500 text-sm">{errors.buyerContact}</p>}
          </div>

          {/* Calculated Costs */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block font-medium text-[#191A19]">Total Cost</label>
              <input
                type="text"
                value={`Rupee ${formData.totalCost.toFixed(2)}`}
                readOnly
                className="w-full p-2 border rounded-md bg-gray-100 text-[#191A19]"
              />
            </div>
            <div>
              <label className="block font-medium text-[#191A19]">Final Cost (After Discount)</label>
              <input
                type="text"
                value={`Rupee ${formData.finalCost.toFixed(2)}`}
                readOnly
                className="w-full p-2 border rounded-md bg-gray-100 text-[#191A19]"
              />
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex justify-end">
            <button
              type="submit"
              className="px-4 py-2 bg-[#FF7420] text-white rounded-md hover:bg-[#FF7420]/90"
            >
              {isUpdateMode ? "Update Timber" : "Sell Timber"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}