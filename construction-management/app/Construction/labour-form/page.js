"use client";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { FaArrowLeft } from "react-icons/fa";

export default function ConstructionForm() {
  const router = useRouter();
  const addWorker = useMutation(api.worker.addWorker);

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

  const validate = () => {
    const newErrors = {};
    if (!formData.fullName) newErrors.fullName = "Full Name is required";
    if (!formData.idNumber) newErrors.idNumber = "ID Number is required";
    if (!formData.address) newErrors.address = "Address is required";
    if (!formData.dob) newErrors.dob = "Date of Birth is required";
    if (!formData.gender) newErrors.gender = "Please select a gender";
    if (!/^[0-9]{10}$/.test(formData.contactNumber)) newErrors.contactNumber = "Enter a valid 10-digit phone number";
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(formData.email)) newErrors.email = "Enter a valid email address";
    if (!formData.qualifications) newErrors.qualifications = "Qualifications are required";
    if (!formData.experience) newErrors.experience = "Experience details are required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async e => {
    e.preventDefault();
    if (!validate()) return;
    await addWorker(formData);
    router.push("/Construction/user-profile");
  };

  const handleChange = e => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-100 to-white flex items-center justify-center py-12 px-4">
      <div className="w-full max-w-3xl bg-white shadow-xl rounded-2xl border border-gray-200 p-8">
        <Link href="/Construction/labour-page" className="inline-flex items-center mb-6">
          <button className="flex items-center text-gray-700 hover:text-gray-900 px-3 py-1 bg-white border border-gray-300 rounded-full shadow-sm hover:shadow-md transition">
            <FaArrowLeft className="mr-2" /> Back
          </button>
        </Link>
        <h2 className="text-3xl font-extrabold text-gray-900 mb-4 text-center">New Worker Registration</h2>
        <p className="text-center text-gray-600 mb-8">Complete the form below to add a new worker to your roster.</p>
        <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-6">
          {[
            { label: 'Full Name', name: 'fullName', type: 'text' },
            { label: 'ID Number', name: 'idNumber', type: 'text' },
            { label: 'Address', name: 'address', type: 'text' },
            { label: 'Date of Birth', name: 'dob', type: 'date' },
            { label: 'Gender', name: 'gender', type: 'select', options: ['Male','Female','Other'] },
            { label: 'Contact Number', name: 'contactNumber', type: 'text' },
            { label: 'Email', name: 'email', type: 'email' },
            { label: 'Qualifications', name: 'qualifications', type: 'text' },
            { label: 'Experience', name: 'experience', type: 'text' },
          ].map(field => (
            <div key={field.name} className="flex flex-col">
              <label className="mb-2 font-medium text-gray-700">{field.label}</label>
              {field.type === 'select' ? (
                <select
                  name={field.name}
                  value={formData[field.name]}
                  onChange={handleChange}
                  className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Select {field.label}</option>
                  {field.options.map(opt => <option key={opt} value={opt}>{opt}</option>)}
                </select>
              ) : (
                <input
                  name={field.name}
                  type={field.type}
                  value={formData[field.name]}
                  onChange={handleChange}
                  className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              )}
              {errors[field.name] && <span className="mt-1 text-sm text-red-500">{errors[field.name]}</span>}
            </div>
          ))}

          <button
            type="submit"
            className="mt-4 w-full py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-all"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}
