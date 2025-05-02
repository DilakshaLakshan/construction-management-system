"use client";
import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useQuery, useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";

export default function UpdateWorkerForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  // Get the worker id from the URL query string.
  const workerId = searchParams.get("id");

  // Query for the worker using the provided id.
  const worker = useQuery(api.worker.getWorkerById, { id: workerId });
  const updateWorker = useMutation(api.worker.updateWorker);

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

  // Once worker data is available, pre-populate our form.
  useEffect(() => {
    if (worker) {
      setFormData({
        fullName: worker.fullName || "",
        idNumber: worker.idNumber || "",
        address: worker.address || "",
        dob: worker.dob || "",
        gender: worker.gender || "",
        contactNumber: worker.contactNumber || "",
        email: worker.email || "",
        qualifications: worker.qualifications || "",
        experience: worker.experience || "",
      });
    }
  }, [worker]);

  const validate = () => {
    const newErrors = {};
    if (!formData.fullName) newErrors.fullName = "Required";
    if (!formData.idNumber) newErrors.idNumber = "Required";
    if (!formData.address) newErrors.address = "Required";
    if (!formData.dob) newErrors.dob = "Required";
    if (!formData.gender) newErrors.gender = "Required";
    if (!/^[0-9]{10}$/.test(formData.contactNumber))
      newErrors.contactNumber = "Enter a valid 10-digit phone number";
    if (!formData.email.includes("@"))
      newErrors.email = "Enter a valid email";
    if (!formData.qualifications) newErrors.qualifications = "Required";
    if (!formData.experience) newErrors.experience = "Required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validate()) return;

    // Call the update mutation using the workerId and the updated form data.
    await updateWorker({ id: workerId, ...formData });
    // Navigate back to the user profile after updating.
    router.push("/Construction/user-profile");
  };

  if (!worker) return <p className="text-center mt-10">Loading worker data...</p>;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-6">
      <div className="max-w-3xl w-full bg-white shadow-xl rounded-lg border border-gray-300 p-8">
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-800">Update Worker Profile</h2>
        </div>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block font-medium text-gray-700">Full Name</label>
            <input
              type="text"
              value={formData.fullName}
              onChange={(e) =>
                setFormData({ ...formData, fullName: e.target.value })
              }
              className="w-full p-2 border rounded-md"
            />
            {errors.fullName && (
              <p className="text-red-500 text-sm">{errors.fullName}</p>
            )}
          </div>

          <div>
            <label className="block font-medium text-gray-700">ID Number</label>
            <input
              type="text"
              value={formData.idNumber}
              onChange={(e) =>
                setFormData({ ...formData, idNumber: e.target.value })
              }
              className="w-full p-2 border rounded-md"
            />
            {errors.idNumber && (
              <p className="text-red-500 text-sm">{errors.idNumber}</p>
            )}
          </div>

          <div>
            <label className="block font-medium text-gray-700">Address</label>
            <input
              type="text"
              value={formData.address}
              onChange={(e) =>
                setFormData({ ...formData, address: e.target.value })
              }
              className="w-full p-2 border rounded-md"
            />
            {errors.address && (
              <p className="text-red-500 text-sm">{errors.address}</p>
            )}
          </div>

          <div>
            <label className="block font-medium text-gray-700">Date of Birth</label>
            <input
              type="date"
              value={formData.dob}
              onChange={(e) =>
                setFormData({ ...formData, dob: e.target.value })
              }
              className="w-full p-2 border rounded-md"
            />
            {errors.dob && (
              <p className="text-red-500 text-sm">{errors.dob}</p>
            )}
          </div>

          <div>
            <label className="block font-medium text-gray-700">Gender</label>
            <select
              value={formData.gender}
              onChange={(e) =>
                setFormData({ ...formData, gender: e.target.value })
              }
              className="w-full p-2 border rounded-md"
            >
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
            {errors.gender && (
              <p className="text-red-500 text-sm">{errors.gender}</p>
            )}
          </div>

          <div>
            <label className="block font-medium text-gray-700">Contact Number</label>
            <input
              type="text"
              value={formData.contactNumber}
              onChange={(e) =>
                setFormData({ ...formData, contactNumber: e.target.value })
              }
              className="w-full p-2 border rounded-md"
            />
            {errors.contactNumber && (
              <p className="text-red-500 text-sm">{errors.contactNumber}</p>
            )}
          </div>

          <div>
            <label className="block font-medium text-gray-700">Email</label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              className="w-full p-2 border rounded-md"
            />
            {errors.email && (
              <p className="text-red-500 text-sm">{errors.email}</p>
            )}
          </div>

          <div>
            <label className="block font-medium text-gray-700">Qualifications</label>
            <input
              type="text"
              value={formData.qualifications}
              onChange={(e) =>
                setFormData({ ...formData, qualifications: e.target.value })
              }
              className="w-full p-2 border rounded-md"
            />
            {errors.qualifications && (
              <p className="text-red-500 text-sm">{errors.qualifications}</p>
            )}
          </div>

          <div>
            <label className="block font-medium text-gray-700">Experience</label>
            <input
              type="text"
              value={formData.experience}
              onChange={(e) =>
                setFormData({ ...formData, experience: e.target.value })
              }
              className="w-full p-2 border rounded-md"
            />
            {errors.experience && (
              <p className="text-red-500 text-sm">{errors.experience}</p>
            )}
          </div>

          <button
            type="submit"
            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 rounded-md text-lg transition"
          >
            Update Profile
          </button>
        </form>
      </div>
    </div>
  );
}
