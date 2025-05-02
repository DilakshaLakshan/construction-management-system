"use client";
import Link from "next/link";
import { useState } from "react";
import { useMutation } from "convex/react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { FaArrowLeft } from "react-icons/fa";

export default function ProjectInfoForm() {
  const router = useRouter();
  const createProjectInfo = useMutation("projectInfo:createProjectInfo");

  const [formData, setFormData] = useState({
    jobType: "",
    jobName: "",
    jobAddress: "",
    projectStartDate: "",
    projectEndDate: "",
    contractorType: "",
    notes: "",
    ownerName: "",
    ownerCompany: "",
    ownerEmail: "",
    ownerPhone: "",
  });
  const [errors, setErrors] = useState({});
  const [showSuccess, setShowSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setErrors((prev) => ({ ...prev, [name]: "" }));
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const validate = () => {
    const errs = {};
    if (!formData.jobType) errs.jobType = "Required";
    if (!formData.jobName.trim()) errs.jobName = "Required";
    if (!formData.jobAddress.trim()) errs.jobAddress = "Required";
    if (!formData.projectStartDate) errs.projectStartDate = "Required";
    if (!formData.projectEndDate) errs.projectEndDate = "Required";
    if (
      formData.projectStartDate &&
      formData.projectEndDate &&
      new Date(formData.projectStartDate) > new Date(formData.projectEndDate)
    ) {
      errs.projectEndDate = "End date must come after start date";
    }
    if (!formData.contractorType) errs.contractorType = "Required";
    if (!formData.ownerName.trim()) errs.ownerName = "Required";
    if (!formData.ownerEmail.trim()) {
      errs.ownerEmail = "Required";
    } else if (!/\S+@\S+\.\S+/.test(formData.ownerEmail)) {
      errs.ownerEmail = "Invalid email";
    }
    if (!formData.ownerPhone.trim()) {
      errs.ownerPhone = "Required";
    } else if (!/^[0-9]{10}$/.test(formData.ownerPhone)) {
      errs.ownerPhone = "Invalid phone (use (555) 123-4567)";
    }
    return errs;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length) {
      setErrors(validationErrors);
      return;
    }
    try {
      await createProjectInfo(formData);
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);
      setFormData({
        jobType: "",
        jobName: "",
        jobAddress: "",
        projectStartDate: "",
        projectEndDate: "",
        contractorType: "",
        notes: "",
        ownerName: "",
        ownerCompany: "",
        ownerEmail: "",
        ownerPhone: "",
      });
      setErrors({});
    } catch (err) {
      console.error(err);
      alert("Failed to submit—please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6 flex justify-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-4xl bg-white rounded-2xl shadow-xl overflow-hidden"
      >
        {/* Header */}
        <div className="bg-blue-600 px-8 py-4 flex items-center justify-between">
          <Link
            href="/Construction/projectUi"
            className="text-white flex items-center hover:underline"
          >
            <FaArrowLeft className="mr-2" /> Back
          </Link>
          <h1 className="text-2xl font-bold text-white">Project Information</h1>
          <div className="w-6" />
        </div>

        {/* Success Notification */}
        <AnimatePresence>
          {showSuccess && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="fixed top-6 right-6 bg-green-500 text-white px-4 py-2 rounded shadow-lg"
            >
              Successfully submitted!
            </motion.div>
          )}
        </AnimatePresence>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-8 space-y-6">
          {/* Row 1 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-gray-700 font-medium mb-1">Job Type</label>
              <select
                name="jobType"
                value={formData.jobType}
                onChange={handleChange}
                required
                className={`w-full p-3 border rounded-lg focus:outline-none ${errors.jobType ? "border-red-500" : "border-gray-300"}`}
              >
                <option value="">Select type...</option>
                <option value="Site Visit">Site Visit</option>
                <option value="Bio Engineering">Bio Engineering</option>
                <option value="Ground Water">Ground Water</option>
                <option value="Geo Technical">Geo Technical</option>
                <option value="Ground Improvement">Ground Improvement</option>
                <option value="Hydro Blasting">Hydro Blasting</option>
                <option value="Trenchless">Trenchless</option>
                <option value="Survey & Mapping">Survey & Mapping</option>
                <option value="Earth Retention">Earth Retention</option>
                <option value="Piling">Piling</option>
              </select>
              {errors.jobType && <p className="text-red-500 text-sm mt-1">{errors.jobType}</p>}
            </div>
            <div>
              <label className="block text-gray-700 font-medium mb-1">Job Name</label>
              <input
                name="jobName"
                value={formData.jobName}
                onChange={handleChange}
                placeholder="e.g. New Office Build"
                required
                className={`w-full p-3 border rounded-lg focus:outline-none ${errors.jobName ? "border-red-500" : "border-gray-300"}`}
              />
              {errors.jobName && <p className="text-red-500 text-sm mt-1">{errors.jobName}</p>}
            </div>
          </div>

          {/* Row 2 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-gray-700 font-medium mb-1">Job Address</label>
              <input
                name="jobAddress"
                value={formData.jobAddress}
                onChange={handleChange}
                placeholder="123 Main St"
                required
                className={`w-full p-3 border rounded-lg focus:outline-none ${errors.jobAddress ? "border-red-500" : "border-gray-300"}`}
              />
              {errors.jobAddress && <p className="text-red-500 text-sm mt-1">{errors.jobAddress}</p>}
            </div>
            <div>
              <label className="block text-gray-700 font-medium mb-1">Contractor Tier</label>
              <select
                name="contractorType"
                value={formData.contractorType}
                onChange={handleChange}
                required
                className={`w-full p-3 border rounded-lg focus:outline-none ${errors.contractorType ? "border-red-500" : "border-gray-300"}`}
              >
                <option value="">Select tier...</option>
                <option value="Lower Tier">Lower Tier</option>
                <option value="Prime Contractor">Prime Contractor</option>
                <option value="Sub-Contractor">Sub-Contractor</option>
                <option value="Other">Other</option>
              </select>
              {errors.contractorType && <p className="text-red-500 text-sm mt-1">{errors.contractorType}</p>}
            </div>
          </div>

          {/* Row 3 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-gray-700 font-medium mb-1">Project Start Date</label>
              <input
                type="date"
                name="projectStartDate"
                value={formData.projectStartDate}
                onChange={handleChange}
                required
                className={`w-full p-3 border rounded-lg focus:outline-none ${errors.projectStartDate ? "border-red-500" : "border-gray-300"}`}
              />
              {errors.projectStartDate && <p className="text-red-500 text-sm mt-1">{errors.projectStartDate}</p>}
            </div>
            <div>
              <label className="block text-gray-700 font-medium mb-1">Project End Date</label>
              <input
                type="date"
                name="projectEndDate"
                value={formData.projectEndDate}
                onChange={handleChange}
                required
                className={`w-full p-3 border rounded-lg focus:outline-none ${errors.projectEndDate ? "border-red-500" : "border-gray-300"}`}
              />
              {errors.projectEndDate && <p className="text-red-500 text-sm mt-1">{errors.projectEndDate}</p>}
            </div>
          </div>

          {/* Notes */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">Additional Notes</label>
            <textarea
              name="notes"
              rows={3}
              value={formData.notes}
              onChange={handleChange}
              placeholder="Describe project details..."
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none"
            />
          </div>

          <hr className="my-6" />

          <h2 className="text-xl font-bold text-gray-800 mb-4">Client Details</h2>

          {/* Row 4 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-gray-700 font-medium mb-1">Name</label>
              <input
                name="ownerName"
                value={formData.ownerName}
                onChange={handleChange}
                required
                className={`w-full p-3 border rounded-lg focus:outline-none ${errors.ownerName ? "border-red-500" : "border-gray-300"}`}
              />
              {errors.ownerName && <p className="text-red-500 text-sm mt-1">{errors.ownerName}</p>}
            </div>
            <div>
              <label className="block text-gray-700 font-medium mb-1">Company</label>
              <input
                name="ownerCompany"
                value={formData.ownerCompany}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none"
              />
            </div>
          </div>

          {/* Row 5 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-gray-700 font-medium mb-1">Email</label>
              <input
                type="email"
                name="ownerEmail"
                value={formData.ownerEmail}
                onChange={handleChange}
                required
                className={`w-full p-3 border rounded-lg focus:outline-none ${errors.ownerEmail ? "border-red-500" : "border-gray-300"}`}
              />
              {errors.ownerEmail && <p className="text-red-500 text-sm mt-1">{errors.ownerEmail}</p>}
            </div>
            <div>
              <label className="block text-gray-700 font-medium mb-1">Phone</label>
              <input
                name="ownerPhone"
                value={formData.ownerPhone}
                onChange={handleChange}
                placeholder="(555) 123-4567"
                required
                className={`w-full p-3 border rounded-lg focus:outline-none ${errors.ownerPhone ? "border-red-500" : "border-gray-300"}`}
              />
              {errors.ownerPhone && <p className="text-red-500 text-sm mt-1">{errors.ownerPhone}</p>}
            </div>
          </div>

          {/* Submit */}
          <div className="flex justify-end">
            <button
              type="submit"
              className="bg-green-600 text-white px-6 py-2 rounded-md font-semibold hover:bg-green-700 transition"
            >
              Submit
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
}
