"use client";
<<<<<<< HEAD
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
=======
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
>>>>>>> fe2f38cc82e65fda7db2bee98c04649d8a64badf
  };

  const [formData, setFormData] = useState(initialFormData);
  const [errors, setErrors] = useState({});
<<<<<<< HEAD

  // Timber type options
  const timberTypeOptions = ["Teak", "Mahogany", "Oak", "Pine", "Cedar", "Spruce"];
=======
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
>>>>>>> fe2f38cc82e65fda7db2bee98c04649d8a64badf

  // Validate form data
  const validate = () => {
    let newErrors = {};
    if (!formData.timberType) newErrors.timberType = "Required";
<<<<<<< HEAD
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
=======
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
>>>>>>> fe2f38cc82e65fda7db2bee98c04649d8a64badf

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

<<<<<<< HEAD
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
=======
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
>>>>>>> fe2f38cc82e65fda7db2bee98c04649d8a64badf

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

<<<<<<< HEAD
    // Simulate API call for selling timber
    console.log("Selling Timber Data:", formData);
    alert("Timber sold successfully!");

    // Redirect to sell-details page with query parameters
    const queryParams = new URLSearchParams(formData).toString();
    router.push(`/timber/sell-timber/sell-details?${queryParams}`);
=======
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
>>>>>>> fe2f38cc82e65fda7db2bee98c04649d8a64badf
  };

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
<<<<<<< HEAD
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Recalculate costs if relevant fields change
    if (["length", "width", "height", "quantity", "sellingPrice", "discountRate"].includes(name)) {
      calculateCosts();
    }
=======
    setFormData(prev => ({ ...prev, [name]: value }));
>>>>>>> fe2f38cc82e65fda7db2bee98c04649d8a64badf
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#191A19] p-6">
      <div className="max-w-4xl w-full bg-[#FFFFFF] shadow-xl rounded-lg border border-[#FF7420] p-8">
<<<<<<< HEAD
        <h2 className="text-2xl font-bold text-[#FF7420] border-b pb-4 mb-6">Sell Timber</h2>
=======
        <h2 className="text-2xl font-bold text-[#FF7420] border-b pb-4 mb-6">
          {isUpdateMode ? "Update Timber Details" : "Sell New Timber"}
        </h2>
>>>>>>> fe2f38cc82e65fda7db2bee98c04649d8a64badf

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Timber Type */}
          <div>
            <label className="block font-medium text-[#191A19]">Timber Type</label>
            <select
              name="timberType"
              value={formData.timberType}
              onChange={handleChange}
              className="w-full p-2 border rounded-md text-[#191A19]"
<<<<<<< HEAD
            >
              <option value="">Select Timber Type</option>
              {timberTypeOptions.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
=======
              required
            >
              <option value="">Select Timber Type</option>
              {timberTypeOptions.map(type => (
                <option key={type} value={type}>{type}</option>
>>>>>>> fe2f38cc82e65fda7db2bee98c04649d8a64badf
              ))}
            </select>
            {errors.timberType && <p className="text-red-500 text-sm">{errors.timberType}</p>}
          </div>

<<<<<<< HEAD
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
=======
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
>>>>>>> fe2f38cc82e65fda7db2bee98c04649d8a64badf
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
<<<<<<< HEAD
=======
                min="0"
                step="0.01"
                required
>>>>>>> fe2f38cc82e65fda7db2bee98c04649d8a64badf
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
<<<<<<< HEAD
=======
                min="0"
                step="0.01"
                required
>>>>>>> fe2f38cc82e65fda7db2bee98c04649d8a64badf
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
<<<<<<< HEAD
=======
                min="0"
                step="0.01"
                required
>>>>>>> fe2f38cc82e65fda7db2bee98c04649d8a64badf
              />
              {errors.height && <p className="text-red-500 text-sm">{errors.height}</p>}
            </div>
          </div>

<<<<<<< HEAD
=======
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

>>>>>>> fe2f38cc82e65fda7db2bee98c04649d8a64badf
          {/* Selling Price */}
          <div>
            <label className="block font-medium text-[#191A19]">Selling Price (per m³)</label>
            <input
              type="number"
              name="sellingPrice"
              value={formData.sellingPrice}
              onChange={handleChange}
              className="w-full p-2 border rounded-md text-[#191A19]"
<<<<<<< HEAD
=======
              min="0"
              step="0.01"
              required
>>>>>>> fe2f38cc82e65fda7db2bee98c04649d8a64badf
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
<<<<<<< HEAD
=======
              min="0"
              max="100"
>>>>>>> fe2f38cc82e65fda7db2bee98c04649d8a64badf
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
<<<<<<< HEAD
=======
              required
>>>>>>> fe2f38cc82e65fda7db2bee98c04649d8a64badf
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
<<<<<<< HEAD
=======
              required
              pattern="\d{10}"
>>>>>>> fe2f38cc82e65fda7db2bee98c04649d8a64badf
            />
            {errors.buyerContact && <p className="text-red-500 text-sm">{errors.buyerContact}</p>}
          </div>

<<<<<<< HEAD
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
=======
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
>>>>>>> fe2f38cc82e65fda7db2bee98c04649d8a64badf
          </div>

          {/* Submit Button */}
          <div className="flex justify-end">
            <button
              type="submit"
              className="px-4 py-2 bg-[#FF7420] text-white rounded-md hover:bg-[#FF7420]/90"
            >
<<<<<<< HEAD
              Sell Timber
=======
              {isUpdateMode ? "Update Timber" : "Sell Timber"}
>>>>>>> fe2f38cc82e65fda7db2bee98c04649d8a64badf
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}