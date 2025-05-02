"use client";
import { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";

export default function ProfileUpdate() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const updateWorker = useMutation(api.worker.updateWorker);

  const id = searchParams.get("_id");
  const [fullName, setFullName] = useState("");
  const [idNumber, setIdNumber] = useState("");
  const [address, setAddress] = useState("");
  const [dob, setDob] = useState("");
  const [gender, setGender] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [email, setEmail] = useState("");
  const [qualifications, setQualifications] = useState("");
  const [experience, setExperience] = useState("");

  useEffect(() => {
    if (id) {
      setFullName(searchParams.get("fullName") || "");
      setIdNumber(searchParams.get("idNumber") || "");
      setAddress(searchParams.get("address") || "");
      setDob(searchParams.get("dob") || "");
      setGender(searchParams.get("gender") || "");
      setContactNumber(searchParams.get("contactNumber") || "");
      setEmail(searchParams.get("email") || "");
      setQualifications(searchParams.get("qualifications") || "");
      setExperience(searchParams.get("experience") || "");
    }
  }, [searchParams, id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!id) return;
    await updateWorker({
      id,
      fullName,
      idNumber,
      address,
      dob,
      gender,
      contactNumber,
      email,
      qualifications,
      experience,
    });
    router.push("/");
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
      <div className="max-w-3xl w-full bg-white p-8 rounded-md shadow">
        <h2 className="text-2xl font-bold mb-6">Update Profile</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block font-medium">Full Name</label>
            <input
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="w-full mt-1 p-2 border rounded" required
            />
          </div>
          <div>
            <label className="block font-medium">ID Number</label>
            <input
              value={idNumber}
              onChange={(e) => setIdNumber(e.target.value)}
              className="w-full mt-1 p-2 border rounded" required
            />
          </div>
          <div>
            <label className="block font-medium">Address</label>
            <input
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="w-full mt-1 p-2 border rounded"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block font-medium">Date of Birth</label>
              <input
                type="date"
                value={dob}
                onChange={(e) => setDob(e.target.value)}
                className="w-full mt-1 p-2 border rounded"
              />
            </div>
            <div>
              <label className="block font-medium">Gender</label>
              <select
                value={gender}
                onChange={(e) => setGender(e.target.value)}
                className="w-full mt-1 p-2 border rounded"
              >
                <option value="">Select</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </div>
          </div>
          <div>
            <label className="block font-medium">Contact Number</label>
            <input
              value={contactNumber}
              onChange={(e) => setContactNumber(e.target.value)}
              className="w-full mt-1 p-2 border rounded"
            />
          </div>
          <div>
            <label className="block font-medium">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full mt-1 p-2 border rounded"
            />
          </div>
          <div>
            <label className="block font-medium">Qualifications</label>
            <textarea
              value={qualifications}
              onChange={(e) => setQualifications(e.target.value)}
              className="w-full mt-1 p-2 border rounded" rows={3}
            />
          </div>
          <div>
            <label className="block font-medium">Experience</label>
            <textarea
              value={experience}
              onChange={(e) => setExperience(e.target.value)}
              className="w-full mt-1 p-2 border rounded" rows={3}
            />
          </div>
          <div className="flex justify-end space-x-2">
            <button
              type="button"
              onClick={() => router.push("/")}
              className="px-4 py-2 border rounded"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
