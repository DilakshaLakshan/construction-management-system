"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function TimberHome() {
  const router = useRouter();
  const [timberList, setTimberList] = useState([]);
  const [feedbackList, setFeedbackList] = useState([]);
  const [formData, setFormData] = useState({
    buyerName: "",
    buyerContact: "",
    timberType: "",
    quantity: "",
    rating: 0,
    comment: "",
  });

  // Mock timber data (replace with API call)
  const fetchTimberData = () => {
    const mockData = [
      {
        id: 1,
        timberType: "Teak",
        quantity: 100,
        receivedDate: "2023-10-01",
        quality: "Premium",
        description:
          "Teak is known for its durability and natural resistance to decay. Our premium teak is sourced from sustainable forests and is ideal for high-end furniture and outdoor applications.",
      },
      {
        id: 2,
        timberType: "Mahogany",
        quantity: 50,
        receivedDate: "2023-10-05",
        quality: "Standard",
        description:
          "Mahogany is prized for its rich color and fine grain. Our standard mahogany is perfect for crafting elegant furniture and decorative items.",
      },
      {
        id: 3,
        timberType: "Oak",
        quantity: 75,
        receivedDate: "2023-10-10",
        quality: "Economy",
        description:
          "Oak is a strong and versatile wood. Our economy oak is cost-effective and suitable for construction, flooring, and general woodworking projects.",
      },
    ];
    setTimberList(mockData);
  };

  // Mock feedback data (replace with API call)
  const fetchFeedbackData = () => {
    const mockFeedback = [
      {
        id: 1,
        buyerName: "John Doe",
        buyerContact: "1234567890",
        timberType: "Teak",
        quantity: 10,
        rating: 5,
        comment: "Excellent quality timber! Highly recommended for outdoor furniture. The wood is durable and has a beautiful finish.",
      },
      {
        id: 2,
        buyerName: "Jane Smith",
        buyerContact: "9876543210",
        timberType: "Mahogany",
        quantity: 5,
        rating: 4,
        comment: "Good service and timely delivery. The mahogany has a rich color and is perfect for my furniture project.",
      },
      {
        id: 3,
        buyerName: "Alice Johnson",
        buyerContact: "5555555555",
        timberType: "Oak",
        quantity: 20,
        rating: 3,
        comment: "Decent quality, but delivery was delayed. The oak is strong and works well for my construction needs.",
      },
    ];
    setFeedbackList(mockFeedback);
  };

  useEffect(() => {
    fetchTimberData();
    fetchFeedbackData();
  }, []);

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle rating change
  const handleRatingChange = (rating) => {
    setFormData((prev) => ({ ...prev, rating }));
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    const newFeedback = {
      id: feedbackList.length + 1,
      ...formData,
    };
    setFeedbackList((prev) => [...prev, newFeedback]);
    setFormData({
      buyerName: "",
      buyerContact: "",
      timberType: "",
      quantity: "",
      rating: 0,
      comment: "",
    });
    alert("Thank you for your feedback!");
  };

  // Mock timber services data with images
  const timberServices = [
    {
      id: 1,
      title: "Premium Teak Furniture",
      description: "Crafted from the finest teak wood, our premium furniture is durable and perfect for outdoor use.",
      image: "/img/teak.jpeg", // Replace with actual image path
    },
    {
      id: 2,
      title: "Elegant Mahogany Decor",
      description: "Our mahogany products are known for their rich color and fine grain, ideal for decorative items.",
      image: "/img/mahogani.jpg", // Replace with actual image path
    },
    {
      id: 3,
      title: "Durable Oak Flooring",
      description: "Strong and versatile, our oak flooring is cost-effective and suitable for any construction project.",
      image: "/images/oak-flooring.jpg", // Replace with actual image path
    },
  ];

  return (
    <div className="min-h-screen bg-[#191A19] p-6">
      {/* Header Section */}
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-[#FF7420]">Timber Management System</h1>
        <p className="text-lg text-gray-300 mt-2">
          Manage your timber inventory efficiently. Add new timber, track sales, and monitor stock
          levels.
        </p>
      </div>

      {/* Action Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {/* Add Timber Card */}
        <div
          onClick={() => router.push("/timber/timber-form")}
          className="bg-[#FFFFFF] p-6 rounded-lg shadow-lg cursor-pointer hover:shadow-xl transition-shadow"
        >
          <h2 className="text-2xl font-bold text-[#FF7420] mb-2">Add New Timber</h2>
          <p className="text-gray-700">
            Add details of newly received timber to your inventory.
          </p>
        </div>

        {/* Sell Timber Card */}
        <div
          onClick={() => router.push("/timber/sell-timber")}
          className="bg-[#FFFFFF] p-6 rounded-lg shadow-lg cursor-pointer hover:shadow-xl transition-shadow"
        >
          <h2 className="text-2xl font-bold text-[#FF7420] mb-2">Sell Timber</h2>
          <p className="text-gray-700">Record timber sales and update your stock levels.</p>
        </div>
      </div>

      {/* Timber Services Section */}
      <div className="bg-[#FFFFFF] p-6 rounded-lg shadow-lg mb-8">
        <h2 className="text-2xl font-bold text-[#FF7420] mb-4">Our Timber Services</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {timberServices.map((service) => (
            <div key={service.id} className="border border-gray-200 rounded-lg overflow-hidden">
              <img
                src={service.image}
                alt={service.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h3 className="text-xl font-bold text-[#FF7420] mb-2">{service.title}</h3>
                <p className="text-gray-700">{service.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Timber List Section */}
      <div className="bg-[#FFFFFF] p-6 rounded-lg shadow-lg mb-8">
        <h2 className="text-2xl font-bold text-[#FF7420] mb-4">Timber Inventory</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white">
            <thead>
              <tr>
                <th className="py-2 px-4 border-b border-gray-200 bg-gray-50 text-left text-sm font-semibold text-gray-600 uppercase">
                  Timber Type
                </th>
                <th className="py-2 px-4 border-b border-gray-200 bg-gray-50 text-left text-sm font-semibold text-gray-600 uppercase">
                  Quantity
                </th>
                <th className="py-2 px-4 border-b border-gray-200 bg-gray-50 text-left text-sm font-semibold text-gray-600 uppercase">
                  Received Date
                </th>
                <th className="py-2 px-4 border-b border-gray-200 bg-gray-50 text-left text-sm font-semibold text-gray-600 uppercase">
                  Quality
                </th>
                <th className="py-2 px-4 border-b border-gray-200 bg-gray-50 text-left text-sm font-semibold text-gray-600 uppercase">
                  Description
                </th>
              </tr>
            </thead>
            <tbody>
              {timberList.map((timber) => (
                <tr key={timber.id} className="hover:bg-gray-50">
                  <td className="py-2 px-4 border-b border-gray-200 text-sm text-gray-700">
                    {timber.timberType}
                  </td>
                  <td className="py-2 px-4 border-b border-gray-200 text-sm text-gray-700">
                    {timber.quantity}
                  </td>
                  <td className="py-2 px-4 border-b border-gray-200 text-sm text-gray-700">
                    {timber.receivedDate}
                  </td>
                  <td className="py-2 px-4 border-b border-gray-200 text-sm text-gray-700">
                    {timber.quality}
                  </td>
                  <td className="py-2 px-4 border-b border-gray-200 text-sm text-gray-700">
                    {timber.description}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Feedback Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Feedback Form */}
        <div className="bg-[#FFFFFF] p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold text-[#FF7420] mb-4">Leave Feedback</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
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
            </div>
            <div>
              <label className="block font-medium text-[#191A19]">Contact Number</label>
              <input
                type="text"
                name="buyerContact"
                value={formData.buyerContact}
                onChange={handleChange}
                className="w-full p-2 border rounded-md text-[#191A19]"
                required
              />
            </div>
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
                <option value="Teak">Teak</option>
                <option value="Mahogany">Mahogany</option>
                <option value="Oak">Oak</option>
              </select>
            </div>
            <div>
              <label className="block font-medium text-[#191A19]">Quantity</label>
              <input
                type="number"
                name="quantity"
                value={formData.quantity}
                onChange={handleChange}
                className="w-full p-2 border rounded-md text-[#191A19]"
                required
              />
            </div>
            <div>
              <label className="block font-medium text-[#191A19]">Rating</label>
              <div className="flex space-x-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => handleRatingChange(star)}
                    className={`text-2xl ${formData.rating >= star ? "text-[#FF7420]" : "text-gray-300"}`}
                  >
                    ★
                  </button>
                ))}
              </div>
            </div>
            <div>
              <label className="block font-medium text-[#191A19]">Comment</label>
              <textarea
                name="comment"
                value={formData.comment}
                onChange={handleChange}
                className="w-full p-2 border rounded-md text-[#191A19]"
                rows="3"
                required
              />
            </div>
            <button
              type="submit"
              className="px-4 py-2 bg-[#FF7420] text-white rounded-md hover:bg-[#FF7420]/90"
            >
              Submit Feedback
            </button>
          </form>
        </div>

        {/* Buyer Feedback List */}
        <div className="bg-[#FFFFFF] p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold text-[#FF7420] mb-4">Buyer Feedback</h2>
          <div className="space-y-4">
            {feedbackList.map((feedback) => (
              <div key={feedback.id} className="border-b border-gray-200 pb-4">
                <div className="flex justify-between">
                  <span className="font-medium text-[#191A19]">Buyer Name:</span>
                  <span className="text-[#191A19]">{feedback.buyerName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium text-[#191A19]">Contact:</span>
                  <span className="text-[#191A19]">{feedback.buyerContact}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium text-[#191A19]">Timber Type:</span>
                  <span className="text-[#191A19]">{feedback.timberType}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium text-[#191A19]">Quantity:</span>
                  <span className="text-[#191A19]">{feedback.quantity}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium text-[#191A19]">Rating:</span>
                  <span className="text-[#191A19]">{feedback.rating}/5</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium text-[#191A19]">Comment:</span>
                  <span className="text-[#191A19]">{feedback.comment}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}