"use client";
import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { FiSave, FiDownload, FiList, FiPlus, FiTrash2, FiEdit, FiUpload, FiFile } from "react-icons/fi";
import jsPDF from "jspdf";
import { useMutation, useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";

export default function QuotationsPage() {
  const router = useRouter();
  const fileInputRef = useRef(null);
  const [isLoggedIn, setIsLoggedIn] = useState(true); // Default to true for development
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("create");
  const [quotations, setQuotations] = useState([]);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [cadFile, setCadFile] = useState(null);
  const [cadData, setCadData] = useState(null);
  const [isEditMode, setIsEditMode] = useState(false);
  const [currentQuotationId, setCurrentQuotationId] = useState(null);
  
  // Form state
  const [formData, setFormData] = useState({
    clientName: "",
    clientEmail: "",
    clientPhone: "",
    projectName: "",
    projectLocation: "",
    projectType: "construction", // Default value
    startDate: "",
    estimatedCompletionDate: "",
    description: "",
    items: [{ description: "", quantity: 1, unitPrice: 0, total: 0 }],
    subtotal: 0,
    taxRate: 15, // Default tax rate
    taxAmount: 0,
    discount: 0,
    total: 0,
    notes: "",
    terms: "Payment due within 30 days of issue.",
    cadFileUrl: "",
    cadFileName: "",
    cadExtractedQuantities: {}
  });

  // Validation state
  const [errors, setErrors] = useState({});

  // Fetch saved quotations
  const fetchQuotations = useQuery(api.quotations?.list) || [];

  // Mutations
  const saveQuotation = useMutation(api.quotations?.create);
  const updateQuotationMutation = useMutation(api.quotations?.update);
  const deleteQuotation = useMutation(api.quotations?.deleteQuotation);
  const updateStatus = useMutation(api.quotations?.updateStatus);

  // Check if user is logged in
  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (token) {
      // Validate the token
      const validateToken = async () => {
        try {
          // Mock validation for now
          setIsLoggedIn(true);
        } catch (error) {
          console.error("Error validating token:", error);
          setIsLoggedIn(false);
        } finally {
          setLoading(false);
        }
      };
      
      validateToken();
    } else {
      setIsLoggedIn(true); // For development, set to true
      setLoading(false);
    }
  }, []);

  // Load quotations when component mounts
  useEffect(() => {
    if (fetchQuotations) {
      setQuotations(fetchQuotations);
    }
  }, [fetchQuotations]);

  // Calculate totals whenever items, tax rate, or discount changes
  useEffect(() => {
    calculateTotals();
  }, [formData.items, formData.taxRate, formData.discount]);

  // Calculate subtotal, tax, and total
  const calculateTotals = () => {
    const subtotal = formData.items.reduce((sum, item) => sum + (item.quantity * item.unitPrice), 0);
    const taxAmount = (subtotal * formData.taxRate) / 100;
    const total = subtotal + taxAmount - formData.discount;

    setFormData(prev => ({
      ...prev,
      subtotal,
      taxAmount,
      total
    }));
  };

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Handle numeric input changes with validation
  const handleNumericChange = (e) => {
    const { name, value } = e.target;
    const numericValue = parseFloat(value) || 0;
    
    setFormData(prev => ({
      ...prev,
      [name]: numericValue
    }));
  };

  // Handle item changes
  const handleItemChange = (index, field, value) => {
    const updatedItems = [...formData.items];
    
    if (field === 'quantity' || field === 'unitPrice') {
      value = parseFloat(value) || 0;
      updatedItems[index][field] = value;
      updatedItems[index].total = updatedItems[index].quantity * updatedItems[index].unitPrice;
    } else {
      updatedItems[index][field] = value;
    }
    
    setFormData(prev => ({
      ...prev,
      items: updatedItems
    }));
  };

  // Add new item
  const addItem = () => {
    setFormData(prev => ({
      ...prev,
      items: [...prev.items, { description: "", quantity: 1, unitPrice: 0, total: 0 }]
    }));
  };

  // Remove item
  const removeItem = (index) => {
    const updatedItems = formData.items.filter((_, i) => i !== index);
    setFormData(prev => ({
      ...prev,
      items: updatedItems
    }));
  };

  // Validate form
  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.clientName.trim()) newErrors.clientName = "Client name is required";
    if (!formData.projectName.trim()) newErrors.projectName = "Project name is required";
    if (!formData.projectLocation.trim()) newErrors.projectLocation = "Project location is required";
    if (!formData.startDate) newErrors.startDate = "Start date is required";
    if (!formData.estimatedCompletionDate) newErrors.estimatedCompletionDate = "Estimated completion date is required";
    
    // Validate items
    if (formData.items.length === 0) {
      newErrors.items = "At least one item is required";
    } else {
      formData.items.forEach((item, index) => {
        if (!item.description.trim()) {
          newErrors[`item_${index}_description`] = "Description is required";
        }
      });
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Reset form
  const resetForm = () => {
    setFormData({
      clientName: "",
      clientEmail: "",
      clientPhone: "",
      projectName: "",
      projectLocation: "",
      projectType: "construction",
      startDate: "",
      estimatedCompletionDate: "",
      description: "",
      items: [{ description: "", quantity: 1, unitPrice: 0, total: 0 }],
      subtotal: 0,
      taxRate: 15,
      taxAmount: 0,
      discount: 0,
      total: 0,
      notes: "",
      terms: "Payment due within 30 days of issue.",
      cadFileUrl: "",
      cadFileName: "",
      cadExtractedQuantities: {}
    });
    setIsEditMode(false);
    setCurrentQuotationId(null);
    setCadFile(null);
    setCadData(null);
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    try {
      // Create a copy of the form data without any internal fields
      const { _creationTime, _id, createdAt, ...quotationData } = formData;
      
      if (isEditMode && currentQuotationId) {
        // Update existing quotation - don't include createdAt
        await updateQuotationMutation({
          id: currentQuotationId,
          ...quotationData
        });
        setSuccessMessage("Quotation updated successfully!");
      } else {
        // Save new quotation - include createdAt
        await saveQuotation({
          ...quotationData,
          createdAt: new Date().toISOString(),
          status: "pending"
        });
        setSuccessMessage("Quotation created successfully!");
      }
      
      // Show success message
      setShowSuccessMessage(true);
      setTimeout(() => setShowSuccessMessage(false), 3000);
      
      // Reset form and navigate to list
      resetForm();
      setActiveTab("list");
    } catch (error) {
      console.error("Error saving quotation:", error);
      alert("Failed to save quotation. Please try again.");
    }
  };

  // Handle quotation edit
  const handleEdit = (quotation) => {
    setIsEditMode(true);
    setCurrentQuotationId(quotation._id);
    
    // Convert the quotation data to match form structure
    const editData = {
      ...quotation,
      // Ensure items have the correct structure
      items: quotation.items || [{ description: "", quantity: 1, unitPrice: 0, total: 0 }]
    };
    
    setFormData(editData);
    setActiveTab("create");
  };

  // Handle quotation delete
  const handleDelete = async (id) => {
    if (confirm("Are you sure you want to delete this quotation?")) {
      try {
        await deleteQuotation({ id });
        setQuotations(quotations.filter(q => q._id !== id));
        setSuccessMessage("Quotation deleted successfully!");
        setShowSuccessMessage(true);
        setTimeout(() => setShowSuccessMessage(false), 3000);
      } catch (error) {
        console.error("Error deleting quotation:", error);
        alert("Failed to delete quotation. Please try again.");
      }
    }
  };

  // Handle status update
  const handleStatusUpdate = async (id, newStatus) => {
    try {
      await updateStatus({ id, status: newStatus });
      
      // Update local state
      setQuotations(quotations.map(q => 
        q._id === id ? { ...q, status: newStatus } : q
      ));
      
      setSuccessMessage(`Quotation status updated to ${newStatus}!`);
      setShowSuccessMessage(true);
      setTimeout(() => setShowSuccessMessage(false), 3000);
    } catch (error) {
      console.error("Error updating status:", error);
      alert("Failed to update status. Please try again.");
    }
  };

  // Generate PDF
  const generatePDF = () => {
    const doc = new jsPDF();
    
    // Add company logo/header
    doc.setFontSize(20);
    doc.setTextColor(255, 116, 32); // #FF7420
    doc.text("Vithanage Group", 105, 20, { align: "center" });
    
    doc.setFontSize(14);
    doc.setTextColor(25, 26, 25); // #191A19
    doc.text("QUOTATION", 105, 30, { align: "center" });
    
    // Add quotation details
    doc.setFontSize(10);
    doc.text(`Date: ${new Date().toLocaleDateString()}`, 20, 40);
    doc.text(`Quotation #: Q-${Math.floor(Math.random() * 10000)}`, 20, 45);
    
    // Client information
    doc.setFontSize(12);
    doc.text("Client Information:", 20, 55);
    doc.setFontSize(10);
    doc.text(`Name: ${formData.clientName}`, 20, 60);
    doc.text(`Email: ${formData.clientEmail}`, 20, 65);
    doc.text(`Phone: ${formData.clientPhone}`, 20, 70);
    
    // Project information
    doc.setFontSize(12);
    doc.text("Project Details:", 120, 55);
    doc.setFontSize(10);
    doc.text(`Project: ${formData.projectName}`, 120, 60);
    doc.text(`Location: ${formData.projectLocation}`, 120, 65);
    doc.text(`Type: ${formData.projectType}`, 120, 70);
    doc.text(`Start Date: ${formData.startDate}`, 120, 75);
    doc.text(`Est. Completion: ${formData.estimatedCompletionDate}`, 120, 80);
    
    // Items table
    doc.setFontSize(12);
    doc.text("Items:", 20, 90);
    
    // Table headers
    doc.setFillColor(240, 240, 240);
    doc.rect(20, 95, 170, 7, "F");
    doc.setFontSize(9);
    doc.text("Description", 22, 100);
    doc.text("Quantity", 100, 100);
    doc.text("Unit Price", 125, 100);
    doc.text("Total", 170, 100, { align: "right" });
    
    // Table rows
    let y = 105;
    formData.items.forEach((item, index) => {
      doc.text(item.description, 22, y);
      doc.text(item.quantity.toString(), 100, y);
      doc.text(`${item.unitPrice.toFixed(2)}`, 125, y);
      doc.text(`${(item.quantity * item.unitPrice).toFixed(2)}`, 170, y, { align: "right" });
      y += 7;
    });
    
    // Summary
    y += 5;
    doc.line(20, y, 190, y);
    y += 5;
    
    doc.text("Subtotal:", 140, y);
    doc.text(`${formData.subtotal.toFixed(2)}`, 170, y, { align: "right" });
    y += 7;
    
    doc.text(`Tax (${formData.taxRate}%):`, 140, y);
    doc.text(`${formData.taxAmount.toFixed(2)}`, 170, y, { align: "right" });
    y += 7;
    
    if (formData.discount > 0) {
      doc.text("Discount:", 140, y);
      doc.text(`${formData.discount.toFixed(2)}`, 170, y, { align: "right" });
      y += 7;
    }
    
    doc.setFontSize(11);
    doc.setFont(undefined, "bold");
    doc.text("Total:", 140, y);
    doc.text(`${formData.total.toFixed(2)}`, 170, y, { align: "right" });
    
    // Notes and terms
    y += 15;
    doc.setFontSize(10);
    doc.setFont(undefined, "normal");
    doc.text("Notes:", 20, y);
    doc.text(formData.notes || "No additional notes.", 20, y + 5);
    
    y += 15;
    doc.text("Terms & Conditions:", 20, y);
    doc.text(formData.terms, 20, y + 5);
    
    // CAD file information if available
    if (formData.cadFileName) {
      y += 15;
      doc.text("CAD File:", 20, y);
      doc.text(`Filename: ${formData.cadFileName}`, 20, y + 5);
    }
    
    // Save PDF
    doc.save(`Quotation_${formData.projectName.replace(/\s+/g, '_')}.pdf`);
  };

  // Handle CAD file upload
  const handleCadFileUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    
    // Check if file is a CAD file (DWG, DXF, etc.)
    const validExtensions = ['.dwg', '.dxf', '.dwf', '.ifc'];
    const fileExtension = file.name.substring(file.name.lastIndexOf('.')).toLowerCase();
    
    if (!validExtensions.includes(fileExtension)) {
      alert("Please upload a valid CAD file (DWG, DXF, DWF, or IFC)");
      return;
    }
    
    setCadFile(file);
    
    // Mock CAD file parsing - in a real app, you'd use a CAD parsing library
    // or send the file to a backend service for processing
    mockParseCadFile(file);
    
    // Update form data with CAD file info
    setFormData(prev => ({
      ...prev,
      cadFileName: file.name,
      cadFileUrl: URL.createObjectURL(file)
    }));
  };
  
  // Mock function to parse CAD file and extract quantities
  const mockParseCadFile = (file) => {
    // In a real application, you would use a CAD parsing library or API
    // This is just a mock to simulate the functionality
    
    // Simulate processing time
    setTimeout(() => {
      // Mock extracted data
      const mockExtractedData = {
        walls: Math.floor(Math.random() * 50) + 10,
        doors: Math.floor(Math.random() * 15) + 5,
        windows: Math.floor(Math.random() * 20) + 8,
        floors: Math.floor(Math.random() * 5) + 1,
        beams: Math.floor(Math.random() * 30) + 15,
        columns: Math.floor(Math.random() * 20) + 10,
        area: (Math.random() * 500 + 100).toFixed(2)
      };
      
      setCadData(mockExtractedData);
      
      // Update form data with extracted quantities
      setFormData(prev => ({
        ...prev,
        cadExtractedQuantities: mockExtractedData
      }));
      
      // Optionally, add items based on extracted quantities
      const newItems = [...formData.items];
      
      if (mockExtractedData.walls && !newItems.some(item => item.description.includes("Wall"))) {
        newItems.push({
          description: "Wall construction (per linear meter)",
          quantity: mockExtractedData.walls,
          unitPrice: 85,
          total: mockExtractedData.walls * 85
        });
      }
      
      if (mockExtractedData.doors && !newItems.some(item => item.description.includes("Door"))) {
        newItems.push({
          description: "Door installation (standard size)",
          quantity: mockExtractedData.doors,
          unitPrice: 150,
          total: mockExtractedData.doors * 150
        });
      }
      
      if (mockExtractedData.windows && !newItems.some(item => item.description.includes("Window"))) {
        newItems.push({
          description: "Window installation (standard size)",
          quantity: mockExtractedData.windows,
          unitPrice: 200,
          total: mockExtractedData.windows * 200
        });
      }
      
      setFormData(prev => ({
        ...prev,
        items: newItems
      }));
      
      setSuccessMessage("CAD file processed successfully!");
      setShowSuccessMessage(true);
      setTimeout(() => setShowSuccessMessage(false), 3000);
      
    }, 1500);
  };

  // If loading, show loading spinner
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#FF7420]"></div>
      </div>
    );
  }

  // If not logged in, redirect to login
  if (!isLoggedIn) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100 p-6">
        <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Authentication Required</h2>
          <p className="text-gray-600 mb-6">Please log in to access the quotation system.</p>
          <button 
            onClick={() => router.push("/auth/login")}
            className="px-4 py-2 bg-[#FF7420] text-white rounded-lg hover:bg-[#FF7420]/90 transition-colors"
          >
            Go to Login
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <div className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex justify-between items-center">
            <h1 className="text-3xl font-bold text-gray-800">Quotation System</h1>
            <div className="flex space-x-4">
              <button 
                onClick={() => {
                  setActiveTab("create");
                  if (!isEditMode) resetForm();
                }}
                className={`px-4 py-2 rounded-lg transition-colors ${
                  activeTab === "create" 
                    ? "bg-[#FF7420] text-white" 
                    : "bg-gray-200 text-gray-800 hover:bg-gray-300"
                }`}
              >
                <FiPlus className="inline mr-2" />
                {isEditMode ? "Edit Quotation" : "Create Quotation"}
              </button>
              <button 
                onClick={() => setActiveTab("list")}
                className={`px-4 py-2 rounded-lg transition-colors ${
                  activeTab === "list" 
                    ? "bg-[#FF7420] text-white" 
                    : "bg-gray-200 text-gray-800 hover:bg-gray-300"
                }`}
              >
                <FiList className="inline mr-2" />
                View Quotations
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Success Message */}
      {showSuccessMessage && (
        <motion.div 
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          className="fixed top-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg z-50"
        >
          {successMessage}
        </motion.div>
      )}

            {/* Main Content */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === "create" ? (
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">
              {isEditMode ? "Edit Quotation" : "Create New Quotation"}
            </h2>
            
            <form onSubmit={handleSubmit}>
              {/* Client Information */}
              <div className="mb-8">
                <h3 className="text-xl font-semibold text-gray-700 mb-4 pb-2 border-b">Client Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <label className="block text-gray-700 mb-2">Client Name *</label>
                    <input
                      type="text"
                      name="clientName"
                      value={formData.clientName}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF7420] ${
                        errors.clientName ? "border-red-500" : "border-gray-300"
                      }`}
                    />
                    {errors.clientName && <p className="text-red-500 text-sm mt-1">{errors.clientName}</p>}
                  </div>
                  <div>
                    <label className="block text-gray-700 mb-2">Email</label>
                    <input
                      type="email"
                      name="clientEmail"
                      value={formData.clientEmail}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF7420]"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 mb-2">Phone</label>
                    <input
                      type="text"
                      name="clientPhone"
                      value={formData.clientPhone}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF7420]"
                    />
                  </div>
                </div>
              </div>
              
              {/* Project Information */}
              <div className="mb-8">
                <h3 className="text-xl font-semibold text-gray-700 mb-4 pb-2 border-b">Project Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
                  <div>
                    <label className="block text-gray-700 mb-2">Project Name *</label>
                    <input
                      type="text"
                      name="projectName"
                      value={formData.projectName}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF7420] ${
                        errors.projectName ? "border-red-500" : "border-gray-300"
                      }`}
                    />
                    {errors.projectName && <p className="text-red-500 text-sm mt-1">{errors.projectName}</p>}
                  </div>
                  <div>
                    <label className="block text-gray-700 mb-2">Project Location *</label>
                    <input
                      type="text"
                      name="projectLocation"
                      value={formData.projectLocation}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF7420] ${
                        errors.projectLocation ? "border-red-500" : "border-gray-300"
                      }`}
                    />
                    {errors.projectLocation && <p className="text-red-500 text-sm mt-1">{errors.projectLocation}</p>}
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-4">
                  <div>
                    <label className="block text-gray-700 mb-2">Project Type</label>
                    <select
                      name="projectType"
                      value={formData.projectType}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF7420]"
                    >
                      <option value="construction">Construction</option>
                      <option value="renovation">Renovation</option>
                      <option value="woodwork">Woodwork</option>
                      <option value="timber">Timber Supply</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-gray-700 mb-2">Start Date *</label>
                    <input
                      type="date"
                      name="startDate"
                      value={formData.startDate}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF7420] ${
                        errors.startDate ? "border-red-500" : "border-gray-300"
                      }`}
                    />
                    {errors.startDate && <p className="text-red-500 text-sm mt-1">{errors.startDate}</p>}
                  </div>
                  <div>
                    <label className="block text-gray-700 mb-2">Estimated Completion *</label>
                    <input
                      type="date"
                      name="estimatedCompletionDate"
                      value={formData.estimatedCompletionDate}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF7420] ${
                        errors.estimatedCompletionDate ? "border-red-500" : "border-gray-300"
                      }`}
                    />
                    {errors.estimatedCompletionDate && <p className="text-red-500 text-sm mt-1">{errors.estimatedCompletionDate}</p>}
                  </div>
                </div>
                
                <div>
                  <label className="block text-gray-700 mb-2">Project Description</label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    rows="3"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF7420]"
                  ></textarea>
                </div>
              </div>

              {/* CAD File Upload */}
              <div className="mb-8">
                <h3 className="text-xl font-semibold text-gray-700 mb-4 pb-2 border-b">CAD File Upload</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <p className="text-gray-600 mb-3">
                      Upload a CAD file (DWG, DXF, DWF, or IFC) to automatically extract quantities for your quotation.
                    </p>
                    <div className="flex items-center space-x-4">
                      <button
                        type="button"
                        onClick={() => fileInputRef.current.click()}
                        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center"
                      >
                        <FiUpload className="mr-2" /> Upload CAD File
                      </button>
                      <input
                        ref={fileInputRef}
                        type="file"
                        accept=".dwg,.dxf,.dwf,.ifc"
                        onChange={handleCadFileUpload}
                        className="hidden"
                      />
                      {formData.cadFileName && (
                        <span className="text-sm text-gray-600 flex items-center">
                          <FiFile className="mr-1" /> {formData.cadFileName}
                        </span>
                      )}
                    </div>
                  </div>
                  
                  {cadData && (
                    <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                      <h4 className="font-medium text-gray-800 mb-2">Extracted Quantities</h4>
                      <div className="grid grid-cols-2 gap-2">
                        {Object.entries(cadData).map(([key, value]) => (
                          <div key={key} className="flex justify-between">
                            <span className="text-gray-600 capitalize">{key}:</span>
                            <span className="font-medium">{value}</span>
                          </div>
                        ))}
                      </div>
                      <div className="mt-3 pt-3 border-t border-gray-200">
                        <p className="text-sm text-gray-500">
                          These quantities have been automatically added to your quotation items.
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
              
              {/* Items */}
              <div className="mb-8">
                <h3 className="text-xl font-semibold text-gray-700 mb-4 pb-2 border-b">Items</h3>
                
                {errors.items && <p className="text-red-500 text-sm mb-2">{errors.items}</p>}
                
                <div className="overflow-x-auto">
                  <table className="w-full mb-4">
                    <thead>
                      <tr className="bg-gray-100">
                        <th className="px-4 py-2 text-left">Description</th>
                        <th className="px-4 py-2 text-right">Quantity</th>
                        <th className="px-4 py-2 text-right">Unit Price ($)</th>
                        <th className="px-4 py-2 text-right">Total ($)</th>
                        <th className="px-4 py-2 text-center">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {formData.items.map((item, index) => (
                        <tr key={index} className="border-b">
                          <td className="px-4 py-2">
                            <input
                              type="text"
                              value={item.description}
                              onChange={(e) => handleItemChange(index, 'description', e.target.value)}
                              className={`w-full px-3 py-1 border rounded focus:outline-none focus:ring-1 focus:ring-[#FF7420] ${
                                errors[`item_${index}_description`] ? "border-red-500" : "border-gray-300"
                              }`}
                              placeholder="Item description"
                            />
                            {errors[`item_${index}_description`] && (
                              <p className="text-red-500 text-xs mt-1">{errors[`item_${index}_description`]}</p>
                            )}
                          </td>
                          <td className="px-4 py-2">
                            <input
                              type="number"
                              min="1"
                              value={item.quantity}
                              onChange={(e) => handleItemChange(index, 'quantity', e.target.value)}
                              className="w-full px-3 py-1 border border-gray-300 rounded text-right focus:outline-none focus:ring-1 focus:ring-[#FF7420]"
                            />
                          </td>
                          <td className="px-4 py-2">
                            <input
                              type="number"
                              min="0"
                              step="0.01"
                              value={item.unitPrice}
                              onChange={(e) => handleItemChange(index, 'unitPrice', e.target.value)}
                              className="w-full px-3 py-1 border border-gray-300 rounded text-right focus:outline-none focus:ring-1 focus:ring-[#FF7420]"
                            />
                          </td>
                          <td className="px-4 py-2 text-right">
                            ${(item.quantity * item.unitPrice).toFixed(2)}
                          </td>
                          <td className="px-4 py-2 text-center">
                            <button
                              type="button"
                              onClick={() => removeItem(index)}
                              className="text-red-500 hover:text-red-700"
                              disabled={formData.items.length === 1}
                            >
                              <FiTrash2 />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                
                <button
                  type="button"
                  onClick={addItem}
                  className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-colors flex items-center"
                >
                  <FiPlus className="mr-2" /> Add Item
                </button>
              </div>
              
              {/* Summary */}
              <div className="mb-8">
                <h3 className="text-xl font-semibold text-gray-700 mb-4 pb-2 border-b">Summary</h3>
                <div className="flex flex-col items-end">
                  <div className="w-full md:w-1/3 space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-700">Subtotal:</span>
                      <span>${formData.subtotal.toFixed(2)}</span>
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <span className="text-gray-700">Tax Rate (%):</span>
                      <input
                        type="number"
                        min="0"
                        max="100"
                        name="taxRate"
                        value={formData.taxRate}
                        onChange={handleNumericChange}
                        className="w-20 px-2 py-1 border border-gray-300 rounded text-right focus:outline-none focus:ring-1 focus:ring-[#FF7420]"
                      />
                    </div>
                    
                    <div className="flex justify-between">
                      <span className="text-gray-700">Tax Amount:</span>
                      <span>${formData.taxAmount.toFixed(2)}</span>
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <span className="text-gray-700">Discount ($):</span>
                      <input
                        type="number"
                        min="0"
                        name="discount"
                        value={formData.discount}
                        onChange={handleNumericChange}
                        className="w-20 px-2 py-1 border border-gray-300 rounded text-right focus:outline-none focus:ring-1 focus:ring-[#FF7420]"
                      />
                    </div>
                    
                    <div className="flex justify-between font-bold text-lg pt-2 border-t">
                      <span>Total:</span>
                      <span>${formData.total.toFixed(2)}</span>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Notes & Terms */}
              <div className="mb-8">
                <h3 className="text-xl font-semibold text-gray-700 mb-4 pb-2 border-b">Additional Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-gray-700 mb-2">Notes</label>
                    <textarea
                      name="notes"
                      value={formData.notes}
                      onChange={handleInputChange}
                      rows="4"
                      placeholder="Additional notes or special instructions..."
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF7420]"
                    ></textarea>
                  </div>
                  <div>
                    <label className="block text-gray-700 mb-2">Terms & Conditions</label>
                    <textarea
                      name="terms"
                      value={formData.terms}
                      onChange={handleInputChange}
                      rows="4"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF7420]"
                    ></textarea>
                  </div>
                </div>
              </div>
              
              {/* Action Buttons */}
              <div className="flex justify-end space-x-4">
                {isEditMode && (
                  <button
                    type="button"
                    onClick={resetForm}
                    className="px-6 py-3 bg-gray-300 text-gray-800 rounded-lg hover:bg-gray-400 transition-colors"
                  >
                    Cancel Edit
                  </button>
                )}
                <button
                  type="button"
                  onClick={generatePDF}
                  className="px-6 py-3 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-colors flex items-center"
                >
                  <FiDownload className="mr-2" /> Download PDF
                </button>
                <button
                  type="submit"
                  className="px-6 py-3 bg-[#FF7420] text-white rounded-lg hover:bg-[#FF7420]/90 transition-colors flex items-center"
                >
                  <FiSave className="mr-2" /> {isEditMode ? "Update Quotation" : "Save Quotation"}
                </button>
              </div>
            </form>
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Quotation List</h2>
            
            {quotations.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-gray-500 mb-4">No quotations found</p>
                <button
                  onClick={() => setActiveTab("create")}
                  className="px-4 py-2 bg-[#FF7420] text-white rounded-lg hover:bg-[#FF7420]/90 transition-colors"
                >
                  Create Your First Quotation
                </button>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="bg-gray-100">
                      <th className="px-4 py-2 text-left">Date</th>
                      <th className="px-4 py-2 text-left">Client</th>
                      <th className="px-4 py-2 text-left">Project</th>
                      <th className="px-4 py-2 text-right">Total</th>
                      <th className="px-4 py-2 text-center">Status</th>
                      <th className="px-4 py-2 text-center">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {quotations.map((quotation) => (
                      <tr key={quotation._id} className="border-b hover:bg-gray-50">
                        <td className="px-4 py-3 text-left">
                          {new Date(quotation.createdAt).toLocaleDateString()}
                        </td>
                        <td className="px-4 py-3 text-left">{quotation.clientName}</td>
                        <td className="px-4 py-3 text-left">{quotation.projectName}</td>
                        <td className="px-4 py-3 text-right">${quotation.total.toFixed(2)}</td>
                        <td className="px-4 py-3 text-center">
                          <div className="relative inline-block">
                            <select
                              value={quotation.status}
                              onChange={(e) => handleStatusUpdate(quotation._id, e.target.value)}
                              className={`px-2 py-1 rounded-full text-xs appearance-none cursor-pointer pr-6 ${
                                quotation.status === 'approved' 
                                  ? 'bg-green-100 text-green-800' 
                                  : quotation.status === 'rejected' 
                                    ? 'bg-red-100 text-red-800' 
                                    : 'bg-yellow-100 text-yellow-800'
                              }`}
                            >
                              <option value="pending">Pending</option>
                              <option value="approved">Approved</option>
                              <option value="rejected">Rejected</option>
                            </select>
                            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                              <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                                <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/>
                              </svg>
                            </div>
                          </div>
                        </td>
                        <td className="px-4 py-3 text-center">
                          <div className="flex justify-center space-x-3">
                            <button
                              onClick={() => handleEdit(quotation)}
                              className="text-blue-500 hover:text-blue-700"
                              title="Edit"
                            >
                              <FiEdit size={18} />
                            </button>
                            <button
                                                            onClick={() => handleDelete(quotation._id)}
                                                            className="text-red-500 hover:text-red-700"
                                                            title="Delete"
                                                          >
                                                            <FiTrash2 size={18} />
                                                          </button>
                                                          <button
                                                            onClick={() => {
                                                              handleEdit(quotation);
                                                              setTimeout(() => generatePDF(), 100);
                                                            }}
                                                            className="text-green-500 hover:text-green-700"
                                                            title="Download PDF"
                                                          >
                                                            <FiDownload size={18} />
                                                          </button>
                                                        </div>
                                                      </td>
                                                    </tr>
                                                  ))}
                                                </tbody>
                                              </table>
                                            </div>
                                          )}
                                          
                                          {/* Pagination - can be implemented if needed */}
                                          {quotations.length > 0 && (
                                            <div className="mt-6 flex justify-between items-center">
                                              <div className="text-sm text-gray-500">
                                                Showing {quotations.length} quotations
                                              </div>
                                              <div className="flex space-x-2">
                                                <button className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300 text-gray-700">
                                                  Previous
                                                </button>
                                                <button className="px-3 py-1 bg-[#FF7420] rounded text-white">
                                                  1
                                                </button>
                                                <button className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300 text-gray-700">
                                                  Next
                                                </button>
                                              </div>
                                            </div>
                                          )}
                                        </div>
                                      )}
                                    </div>
                                    
                                    {/* CAD File Viewer Modal - can be implemented if needed */}
                                    {/* This would be a modal that shows the CAD file preview */}
                                    
                                    {/* Footer */}
                                    <div className="bg-white shadow-md mt-8">
                                      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                                        <div className="flex justify-between items-center">
                                          <p className="text-gray-500 text-sm">
                                            © {new Date().getFullYear()} Vithanage Group. All rights reserved.
                                          </p>
                                          <div className="text-sm text-gray-500">
                                            Construction Management System
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                );
                              }
                              