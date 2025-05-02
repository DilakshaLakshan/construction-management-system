"use client";
import { useState } from "react";
import { useRouter } from "next/navigation"; 

export default function ConstructionForm() {
  const router = useRouter(); 

  const [formData, setFormData] = useState({
    fullName: "",
    idNumber: "",
    address: "",
    dob: "",
    gender: "",
    contactNumber: "",
    email: "",
    qualifications: "",
    experience: "",
  });

  const [errors, setErrors] = useState({});

  const validate = () => { // Validation part
    let newErrors = {};
    if (!formData.fullName) newErrors.fullName = "Required";
    if (!formData.idNumber) newErrors.idNumber = "Required";
    if (!formData.address) newErrors.address = "Required";
    if (!formData.dob) newErrors.dob = "Required";
    if (!formData.gender) newErrors.gender = "Required";
    if (!formData.contactNumber.match(/^[0-9]{10}$/)) newErrors.contactNumber = "Enter a valid 10-digit phone number";
    if (!formData.email.includes("@")) newErrors.email = "Enter a valid email";
    if (!formData.qualifications) newErrors.qualifications = "Required";
    if (!formData.experience) newErrors.experience = "Required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    const queryParams = new URLSearchParams({
      fullName: formData.fullName,
      idNumber: formData.idNumber,
      address: formData.address,
      dob: formData.dob,
      gender: formData.gender,
      contactNumber: formData.contactNumber,
      email: formData.email,
      qualifications: formData.qualifications,
      experience: formData.experience,
    }).toString();

    router.push(`/Construction/user-profile?${queryParams}`);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-6">
      <div className="max-w-3xl w-full bg-white shadow-xl rounded-lg border border-gray-300 p-8">
        <div className="flex justify-between items-center border-b pb-4 mb-6">
          <h2 className="text-2xl font-bold text-gray-800">New Worker Registration</h2>
        </div>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-2 gap-4">

            <div>
              <label className="block font-medium text-gray-700">Full Name</label>
              <input
                type="text"
                value={formData.fullName}
                onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                className="w-full p-2 border rounded-md"
              />
              {errors.fullName && <p className="text-red-500 text-sm">{errors.fullName}</p>}
            </div>
            <div>
              <label className="block font-medium text-gray-700">ID Number</label>
              <input
                type="text"
                value={formData.idNumber}
                onChange={(e) => setFormData({ ...formData, idNumber: e.target.value })}
                className="w-full p-2 border rounded-md"
              />
              {errors.idNumber && <p className="text-red-500 text-sm">{errors.idNumber}</p>}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block font-medium text-gray-700">Address</label>
              <input
                type="text"
                value={formData.address}
                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                className="w-full p-2 border rounded-md"
              />
            </div>
            <div>
              <label className="block font-medium text-gray-700">Date of Birth</label>
              <input
                type="date"
                value={formData.dob}
                onChange={(e) => setFormData({ ...formData, dob: e.target.value })}
                className="w-full p-2 border rounded-md"
              />
            </div>
          </div>

          <div>
            <label className="block font-medium text-gray-700">Gender</label>
            <select
              value={formData.gender}
              onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
              className="w-full p-2 border rounded-md"
            >
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          </div>

          <div>
            <label className="block font-medium text-gray-700">Contact Number</label>
            <input
              type="text"
              value={formData.contactNumber}
              onChange={(e) => setFormData({ ...formData, contactNumber: e.target.value })}
              className="w-full p-2 border rounded-md"
            />
            {errors.contactNumber && <p className="text-red-500 text-sm">{errors.contactNumber}</p>}
          </div>

          <div>
            <label className="block font-medium text-gray-700">Email</label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full p-2 border rounded-md"
            />
            {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
          </div>
          <div>
            <label className="block font-medium text-gray-700">Qualifications</label>
            <input
              type="text"
              value={formData.qualifications}
              onChange={(e) => setFormData({ ...formData, qualifications: e.target.value })}
              className="w-full p-2 border rounded-md"
            />
          </div>

          <div>
            <label className="block font-medium text-gray-700">Experience</label>
            <input
              type="text"
              value={formData.experience}
              onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
              className="w-full p-2 border rounded-md"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-yellow-500 hover:bg-yellow-600 text-white font-semibold py-3 rounded-md text-lg transition"
          >
            Submit Form
          </button>
        </form>
      </div>
    </div>
  );
}
