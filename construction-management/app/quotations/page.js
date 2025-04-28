"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { UserButton } from '@stackframe/stack';
import { motion } from "framer-motion";

// File type icons
const fileIcons = {
  "dwg": "/icons/dwg-icon.svg",
  "dxf": "/icons/dxf-icon.svg",
  "skp": "/icons/skp-icon.svg",
  "default": "/icons/cad-icon.svg"
};

export default function Quotations() {
  const [dragActive, setDragActive] = useState(false);
  const [files, setFiles] = useState([]);
  const [isCalculating, setIsCalculating] = useState(false);
  const [quotationResult, setQuotationResult] = useState(null);
  const [currentView, setCurrentView] = useState("upload"); // upload, preview, result
  const [materialOptions, setMaterialOptions] = useState({
    woodType: "teak",
    finishType: "standard",
    hardwareGrade: "standard"
  });
  
  const fileInputRef = useRef(null);

  // Handle drag events
  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  // Handle drop event
  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFiles(e.dataTransfer.files);
    }
  };

  // Handle file input change
  const handleChange = (e) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      handleFiles(e.target.files);
    }
  };

  // Process the files
  const handleFiles = (fileList) => {
    const newFiles = Array.from(fileList).map(file => {
      // Get file extension
      const extension = file.name.split('.').pop().toLowerCase();
      const isValidFile = ["dwg", "dxf", "skp", "pdf"].includes(extension);
      
      return {
        file,
        name: file.name,
        size: file.size,
        type: file.type,
        extension,
        icon: fileIcons[extension] || fileIcons.default,
        isValid: isValidFile,
        uploadProgress: 0,
        status: isValidFile ? "ready" : "invalid"
      };
    });
    
    setFiles([...files, ...newFiles]);
    
    // Automatically move to preview if valid files are uploaded
    if (newFiles.some(file => file.isValid)) {
      setCurrentView("preview");
    }
  };

  // Remove a file
  const removeFile = (index) => {
    const newFiles = [...files];
    newFiles.splice(index, 1);
    setFiles(newFiles);
    
    // Go back to upload view if no files remain
    if (newFiles.length === 0) {
      setCurrentView("upload");
      setQuotationResult(null);
    }
  };

  // Trigger file input click
  const onButtonClick = () => {
    fileInputRef.current.click();
  };

  // Calculate quotation
  const calculateQuotation = () => {
    setIsCalculating(true);
    
    // Simulate calculation process
    setTimeout(() => {
      // Mock calculation result
      const result = {
        totalCost: 1250000,
        breakdown: {
          materials: 750000,
          labor: 350000,
          overhead: 150000
        },
        timeline: {
          estimatedDays: 45,
          phases: [
            { name: "Planning", days: 5 },
            { name: "Foundation", days: 10 },
            { name: "Structure", days: 15 },
            { name: "Finishing", days: 15 }
          ]
        },
        materials: {
          wood: {
            type: materialOptions.woodType,
            quantity: "120 cubic feet",
            cost: 450000
          },
          hardware: {
            type: materialOptions.hardwareGrade,
            cost: 150000
          },
          finish: {
            type: materialOptions.finishType,
            cost: 150000
          }
        }
      };
      
      setQuotationResult(result);
      setIsCalculating(false);
      setCurrentView("result");
    }, 3000);
  };

  // Format currency
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-LK', { 
      style: 'currency', 
      currency: 'LKR',
      maximumFractionDigits: 0
    }).format(amount);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#FFFFFF] to-[#F8F9FA] text-[#191A19]">
      {/* Header with User Button */}
      <div className="flex justify-between items-center p-4 md:p-6">
        <Link href="/" className="text-xl font-bold text-[#191A19] flex items-center">
          <span className="text-[#FF7420]">Vithanage</span> Quotations
        </Link>
        <UserButton />
      </div>
      
      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-8 md:px-8 lg:px-16">
        {/* Page Title */}
        <div className="text-center mb-12">
          <motion.h1 
            className="text-4xl md:text-5xl font-bold mb-4 text-[#191A19]"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Instant <span className="text-[#FF7420]">CAD</span> Quotations
          </motion.h1>
          <motion.p 
            className="text-xl text-gray-600 max-w-3xl mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Upload your CAD files and get accurate cost estimates for your construction and woodworking projects in minutes.
          </motion.p>
        </div>
        
        {/* Progress Steps */}
        <div className="mb-12">
          <div className="flex justify-center">
            <div className="flex items-center w-full max-w-3xl">
              {["upload", "preview", "result"].map((step, index) => (
                <div key={step} className="flex-1 relative">
                  <div 
                    className={`w-10 h-10 mx-auto rounded-full flex items-center justify-center z-10 relative
                      ${currentView === step ? 'bg-[#FF7420] text-white' : 
                        (["upload", "preview"].includes(step) && currentView === "result") || 
                        (step === "upload" && currentView === "preview") 
                          ? 'bg-[#FF7420] text-white' : 'bg-gray-200 text-gray-500'}`}
                  >
                    {index + 1}
                  </div>
                  {index < 2 && (
                    <div 
                      className={`absolute top-5 w-full h-0.5 left-1/2 
                        ${(index === 0 && (currentView === "preview" || currentView === "result")) || 
                          (index === 1 && currentView === "result") 
                            ? 'bg-[#FF7420]' : 'bg-gray-200'}`}
                    ></div>
                  )}
                  <div className="text-center mt-2 text-sm font-medium">
                    {step === "upload" && "Upload Files"}
                    {step === "preview" && "Configure"}
                    {step === "result" && "Get Quote"}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        {/* Content based on current view */}
        <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8 mb-12">
          {/* Upload View */}
          {currentView === "upload" && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4 }}
            >
              <div 
                className={`border-2 border-dashed rounded-xl p-8 text-center ${
                  dragActive ? 'border-[#FF7420] bg-[#FF7420]/5' : 'border-gray-300 bg-gray-50'
                }`}
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
              >
                <input
                  ref={fileInputRef}
                  type="file"
                  multiple
                  onChange={handleChange}
                  accept=".dwg,.dxf,.skp,.pdf"
                  className="hidden"
                />
                
                <div className="flex flex-col items-center justify-center py-6">
                  <div className="mb-4">
                    <svg className="w-16 h-16 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path>
                    </svg>
                  </div>
                  <p className="mb-2 text-lg font-medium text-gray-700">
                    Drag & drop your CAD files here
                  </p>
                  <p className="mb-4 text-sm text-gray-500">
                    Supported formats: .DWG, .DXF, .SKP, .PDF
                  </p>
                  <button
                    onClick={onButtonClick}
                    className="px-6 py-3 bg-[#FF7420] text-white rounded-lg hover:bg-[#E56A1E] transition-colors font-medium"
                  >
                    Browse Files
                  </button>
                </div>
              </div>
              
              <div className="mt-8">
                <h3 className="text-lg font-medium mb-4">Why upload CAD files?</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <div className="text-[#FF7420] mb-2">
                      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
                      </svg>
                    </div>
                    <h4 className="font-medium mb-1">Instant Quotes</h4>
                    <p className="text-sm text-gray-600">Get accurate cost estimates in minutes, not days.</p>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <div className="text-[#FF7420] mb-2">
                      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"></path>
                      </svg>
                    </div>
                    <h4 className="font-medium mb-1">Detailed Breakdown</h4>
                    <p className="text-sm text-gray-600">See material, labor, and overhead costs separately.</p>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <div className="text-[#FF7420] mb-2">
                      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                      </svg>
                    </div>
                    <h4 className="font-medium mb-1">Timeline Estimates</h4>
                    <p className="text-sm text-gray-600">Get projected timelines for your project completion.</p>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
          
          {/* Preview View */}
          {currentView === "preview" && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4 }}
            >
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* File List */}
                <div className="lg:col-span-1">
                  <h3 className="text-xl font-medium mb-4">Uploaded Files</h3>
                  <div className="space-y-3 mb-6">
                    {files.map((file, index) => (
                      <div 
                        key={index} 
                        className={`flex items-center p-3 rounded-lg border ${
                          file.isValid ? 'border-gray-200' : 'border-red-200 bg-red-50'
                        }`}
                      >
                                             <div className="w-10 h-10 flex-shrink-0 mr-3">
                          <Image 
                            src={file.icon || fileIcons.default} 
                            alt={file.extension} 
                            width={40} 
                            height={40}
                            className="object-contain"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-gray-900 truncate">
                            {file.name}
                          </p>
                          <p className="text-xs text-gray-500">
                            {(file.size / 1024 / 1024).toFixed(2)} MB
                          </p>
                          {!file.isValid && (
                            <p className="text-xs text-red-500">
                              Unsupported file format
                            </p>
                          )}
                        </div>
                        <button 
                          onClick={() => removeFile(index)}
                          className="ml-2 text-gray-400 hover:text-red-500"
                        >
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                          </svg>
                        </button>
                      </div>
                    ))}
                  </div>
                  
                  <button
                    onClick={onButtonClick}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors text-sm font-medium flex items-center justify-center"
                  >
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
                    </svg>
                    Add More Files
                  </button>
                </div>
                
                {/* Material Options */}
                <div className="lg:col-span-2">
                  <h3 className="text-xl font-medium mb-4">Project Specifications</h3>
                  
                  <div className="space-y-6">
                    {/* Wood Type */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Wood Type
                      </label>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                        {[
                          { id: 'teak', name: 'Teak', price: 'Premium', desc: 'Durable, water-resistant' },
                          { id: 'mahogany', name: 'Mahogany', price: 'High', desc: 'Rich color, fine grain' },
                          { id: 'oak', name: 'Oak', price: 'Standard', desc: 'Strong, versatile' }
                        ].map((wood) => (
                          <div 
                            key={wood.id}
                            onClick={() => setMaterialOptions({...materialOptions, woodType: wood.id})}
                            className={`border rounded-lg p-4 cursor-pointer transition-all ${
                              materialOptions.woodType === wood.id 
                                ? 'border-[#FF7420] bg-[#FF7420]/5 ring-1 ring-[#FF7420]' 
                                : 'border-gray-200 hover:border-gray-300'
                            }`}
                          >
                            <div className="flex items-center justify-between mb-2">
                              <span className="font-medium">{wood.name}</span>
                              {materialOptions.woodType === wood.id && (
                                <svg className="w-5 h-5 text-[#FF7420]" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
                                </svg>
                              )}
                            </div>
                            <div className="text-xs text-gray-500">
                              <p>Price: {wood.price}</p>
                              <p>{wood.desc}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    {/* Finish Type */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Finish Type
                      </label>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                        {[
                          { id: 'standard', name: 'Standard', price: 'Basic', desc: 'Clear coat finish' },
                          { id: 'premium', name: 'Premium', price: 'Medium', desc: 'Stain + clear coat' },
                          { id: 'luxury', name: 'Luxury', price: 'High', desc: 'Multiple coats, hand-rubbed' }
                        ].map((finish) => (
                          <div 
                            key={finish.id}
                            onClick={() => setMaterialOptions({...materialOptions, finishType: finish.id})}
                            className={`border rounded-lg p-4 cursor-pointer transition-all ${
                              materialOptions.finishType === finish.id 
                                ? 'border-[#FF7420] bg-[#FF7420]/5 ring-1 ring-[#FF7420]' 
                                : 'border-gray-200 hover:border-gray-300'
                            }`}
                          >
                            <div className="flex items-center justify-between mb-2">
                              <span className="font-medium">{finish.name}</span>
                              {materialOptions.finishType === finish.id && (
                                <svg className="w-5 h-5 text-[#FF7420]" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
                                </svg>
                              )}
                            </div>
                            <div className="text-xs text-gray-500">
                              <p>Price: {finish.price}</p>
                              <p>{finish.desc}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    {/* Hardware Grade */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Hardware Grade
                      </label>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                        {[
                          { id: 'standard', name: 'Standard', price: 'Basic', desc: 'Functional, basic quality' },
                          { id: 'premium', name: 'Premium', price: 'Medium', desc: 'Better durability, aesthetics' },
                          { id: 'luxury', name: 'Luxury', price: 'High', desc: 'Top quality, designer hardware' }
                        ].map((hardware) => (
                          <div 
                            key={hardware.id}
                            onClick={() => setMaterialOptions({...materialOptions, hardwareGrade: hardware.id})}
                            className={`border rounded-lg p-4 cursor-pointer transition-all ${
                              materialOptions.hardwareGrade === hardware.id 
                                ? 'border-[#FF7420] bg-[#FF7420]/5 ring-1 ring-[#FF7420]' 
                                : 'border-gray-200 hover:border-gray-300'
                            }`}
                          >
                            <div className="flex items-center justify-between mb-2">
                              <span className="font-medium">{hardware.name}</span>
                              {materialOptions.hardwareGrade === hardware.id && (
                                <svg className="w-5 h-5 text-[#FF7420]" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
                                </svg>
                              )}
                            </div>
                            <div className="text-xs text-gray-500">
                              <p>Price: {hardware.price}</p>
                              <p>{hardware.desc}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="mt-8 flex justify-between">
                <button
                  onClick={() => setCurrentView("upload")}
                  className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors font-medium"
                >
                  Back
                </button>
                <button
                  onClick={calculateQuotation}
                  disabled={files.filter(f => f.isValid).length === 0 || isCalculating}
                  className={`px-6 py-2 bg-[#FF7420] text-white rounded-lg transition-colors font-medium flex items-center ${
                    files.filter(f => f.isValid).length === 0 || isCalculating
                      ? 'opacity-50 cursor-not-allowed'
                      : 'hover:bg-[#E56A1E]'
                  }`}
                >
                  {isCalculating ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Calculating...
                    </>
                  ) : (
                    'Calculate Quotation'
                  )}
                </button>
              </div>
            </motion.div>
          )}
          
          {/* Result View */}
          {currentView === "result" && quotationResult && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4 }}
            >
              <div className="text-center mb-8">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
                  <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                </div>
                <h3 className="text-2xl font-bold mb-2">Quotation Ready!</h3>
                <p className="text-gray-600">
                  We've analyzed your CAD files and prepared a detailed quotation
                </p>
              </div>
              
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Summary Card */}
                <div className="lg:col-span-1 bg-gradient-to-br from-[#FF7420] to-[#FF5722] text-white rounded-xl p-6 shadow-lg">
                  <h3 className="text-xl font-bold mb-4">Quotation Summary</h3>
                  <div className="space-y-4">
                    <div>
                      <p className="text-white/80 text-sm">Total Estimated Cost</p>
                      <p className="text-3xl font-bold">{formatCurrency(quotationResult.totalCost)}</p>
                    </div>
                    <div>
                      <p className="text-white/80 text-sm">Estimated Timeline</p>
                      <p className="text-xl font-semibold">{quotationResult.timeline.estimatedDays} days</p>
                    </div>
                    <div className="pt-4 border-t border-white/20">
                      <p className="text-white/80 text-sm mb-2">Cost Breakdown</p>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span>Materials</span>
                          <span>{formatCurrency(quotationResult.breakdown.materials)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Labor</span>
                          <span>{formatCurrency(quotationResult.breakdown.labor)}</span>
                          </div>
                        <div className="flex justify-between">
                          <span>Overhead</span>
                          <span>{formatCurrency(quotationResult.breakdown.overhead)}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-6 pt-4 border-t border-white/20">
                    <button className="w-full py-2 bg-white text-[#FF7420] rounded-lg font-medium hover:bg-white/90 transition-colors">
                      Download PDF Quote
                    </button>
                  </div>
                </div>
                
                {/* Details */}
                <div className="lg:col-span-2 space-y-6">
                  {/* Timeline */}
                  <div className="bg-white rounded-xl p-6 shadow-md border border-gray-100">
                    <h3 className="text-lg font-bold mb-4">Project Timeline</h3>
                    <div className="space-y-4">
                      {quotationResult.timeline.phases.map((phase, index) => (
                        <div key={index} className="relative">
                          <div className="flex items-center mb-2">
                            <div className="w-8 h-8 bg-[#FF7420]/10 rounded-full flex items-center justify-center text-[#FF7420] font-medium text-sm mr-3">
                              {index + 1}
                            </div>
                            <div className="flex-1">
                              <h4 className="font-medium">{phase.name}</h4>
                              <p className="text-sm text-gray-500">{phase.days} days</p>
                            </div>
                          </div>
                          {index < quotationResult.timeline.phases.length - 1 && (
                            <div className="absolute left-4 top-8 bottom-0 w-0.5 bg-gray-200"></div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  {/* Materials Breakdown */}
                  <div className="bg-white rounded-xl p-6 shadow-md border border-gray-100">
                    <h3 className="text-lg font-bold mb-4">Materials Breakdown</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="bg-gray-50 p-4 rounded-lg">
                        <h4 className="font-medium text-[#FF7420] mb-1">Wood</h4>
                        <p className="text-sm mb-1">Type: {quotationResult.materials.wood.type}</p>
                        <p className="text-sm mb-1">Quantity: {quotationResult.materials.wood.quantity}</p>
                        <p className="text-sm font-medium">{formatCurrency(quotationResult.materials.wood.cost)}</p>
                      </div>
                      <div className="bg-gray-50 p-4 rounded-lg">
                        <h4 className="font-medium text-[#FF7420] mb-1">Hardware</h4>
                        <p className="text-sm mb-1">Grade: {quotationResult.materials.hardware.type}</p>
                        <p className="text-sm mb-3">Includes fasteners, hinges, handles</p>
                        <p className="text-sm font-medium">{formatCurrency(quotationResult.materials.hardware.cost)}</p>
                      </div>
                      <div className="bg-gray-50 p-4 rounded-lg">
                        <h4 className="font-medium text-[#FF7420] mb-1">Finish</h4>
                        <p className="text-sm mb-1">Type: {quotationResult.materials.finish.type}</p>
                        <p className="text-sm mb-3">Includes stain, sealant, polish</p>
                        <p className="text-sm font-medium">{formatCurrency(quotationResult.materials.finish.cost)}</p>
                      </div>
                    </div>
                  </div>
                  
                  {/* Next Steps */}
                  <div className="bg-[#191A19] text-white rounded-xl p-6 shadow-md">
                    <h3 className="text-lg font-bold mb-4">Next Steps</h3>
                    <ul className="space-y-3">
                      <li className="flex items-start">
                        <svg className="w-5 h-5 text-[#FF7420] mr-2 mt-0.5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
                        </svg>
                        <span>Download your detailed quotation</span>
                      </li>
                      <li className="flex items-start">
                        <svg className="w-5 h-5 text-[#FF7420] mr-2 mt-0.5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
                        </svg>
                        <span>Schedule a consultation with our experts</span>
                      </li>
                      <li className="flex items-start">
                        <svg className="w-5 h-5 text-[#FF7420] mr-2 mt-0.5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
                        </svg>
                        <span>Finalize project details and sign contract</span>
                      </li>
                    </ul>
                    <div className="mt-4 pt-4 border-t border-white/10 flex space-x-4">
                      <Link href="/contact" className="px-4 py-2 bg-[#FF7420] text-white rounded-lg font-medium hover:bg-[#E56A1E] transition-colors">
                        Contact Us
                      </Link>
                      <button className="px-4 py-2 border border-white/20 text-white rounded-lg font-medium hover:bg-white/10 transition-colors">
                        Schedule Consultation
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="mt-8 flex justify-between">
                <button
                  onClick={() => setCurrentView("preview")}
                  className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors font-medium"
                >
                  Back to Configuration
                </button>
                <button
                  onClick={() => {
                    setFiles([]);
                    setQuotationResult(null);
                    setCurrentView("upload");
                  }}
                  className="px-6 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition-colors font-medium"
                >
                  Start New Quote
                </button>
              </div>
            </motion.div>
          )}
        </div>
        
        {/* Testimonials */}
        <section className="py-12">
          <h2 className="text-2xl font-bold mb-8 text-center">What Our Clients Say</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-xl shadow-md">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-[#FF7420]/20 rounded-full flex items-center justify-center text-[#FF7420] font-bold mr-3">
                  SL
                </div>
                <div>
                  <h4 className="font-medium">Samantha Liyanarachchi</h4>
                  <p className="text-sm text-gray-500">Architect, SL Designs</p>
                </div>
              </div>
              <p className="text-gray-600">
                "The instant quotation system saved me hours of back-and-forth with contractors. The estimates were accurate and the breakdown helped me optimize my design costs."
              </p>
              <div className="mt-4 flex text-[#FF7420]">
                {[1, 2, 3, 4, 5].map((star) => (
                  <svg key={star} className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                  </svg>
                ))}
              </div>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-md">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-[#FF7420]/20 rounded-full flex items-center justify-center text-[#FF7420] font-bold mr-3">
                  RP
                </div>
                <div>
                  <h4 className="font-medium">Rajitha Perera</h4>
                  <p className="text-sm text-gray-500">Interior Designer</p>
                </div>
              </div>
              <p className="text-gray-600">
                "As an interior designer, I need quick estimates for custom furniture. This tool gives me accurate quotes that I can immediately share with clients. Highly recommended!"
              </p>
              <div className="mt-4 flex text-[#FF7420]">
                {[1, 2, 3, 4, 5].map((star) => (
                  <svg key={star} className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                  </svg>
                ))}
              </div>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-md">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-[#FF7420]/20 rounded-full flex items-center justify-center text-[#FF7420] font-bold mr-3">
                  KF
                </div>
                <div>
                  <h4 className="font-medium">Kamal Fernando</h4>
                  <p className="text-sm text-gray-500">Property Developer</p>
                </div>
              </div>
              <p className="text-gray-600">
                "The detailed breakdown of materials, labor, and timeline has been invaluable for our multi-unit development projects. It's made budgeting much more precise."
              </p>
              <div className="mt-4 flex text-[#FF7420]">
                {[1, 2, 3, 4, 5].map((star, idx) => (
                  <svg key={star} className={`w-5 h-5 ${idx === 4 ? 'text-gray-300' : ''}`} fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                  </svg>
                ))}
              </div>
            </div>
          </div>
        </section>
        
        {/* FAQ Section */}
        <section className="py-12">
          <h2 className="text-2xl font-bold mb-8 text-center">Frequently Asked Questions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            <div className="bg-white p-6 rounded-xl shadow-md">
              <h3 className="font-bold text-lg mb-2">What CAD file formats do you support?</h3>
              <p className="text-gray-600">We support industry-standard formats including .DWG, .DXF, .SKP (SketchUp), and PDF drawings. If you have a different format, please contact us.</p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-md">
              <h3 className="font-bold text-lg mb-2">How accurate are the quotations?</h3>
              <p className="text-gray-600">Our quotations are typically within 5-10% of the final cost, depending on project complexity. We use advanced algorithms to analyze your CAD files for precise material calculations.</p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-md">
              <h3 className="font-bold text-lg mb-2">Can I modify my quotation after receiving it?</h3>
              <p className="text-gray-600">Yes! You can adjust material selections, quantities, and other parameters. Each change will update your quote in real-time.</p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-md">
              <h3 className="font-bold text-lg mb-2">Is my CAD file data secure?</h3>
              <p className="text-gray-600">Absolutely. We use enterprise-grade encryption for all uploaded files. Your designs and project details are never shared with third parties without your explicit permission.</p>
            </div>
          </div>
        </section>
      </main>
      
      {/* Footer */}
      <footer className="py-8 px-4 md:px-8 lg:px-16 bg-gray-800 text-white">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <h3 className="text-xl font-bold">Vithanage Group</h3>
              <p className="text-gray-400">Construction Management System</p>
            </div>
            <div className="flex space-x-4">
              <Link href="/about" className="text-gray-300 hover:text-white transition-colors">About</Link>
              <Link href="/services" className="text-gray-300 hover:text-white transition-colors">Services</Link>
              <Link href="/contact" className="text-gray-300 hover:text-white transition-colors">Contact</Link>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-gray-700 text-center text-gray-400">
            <p>© {new Date().getFullYear()} Vithanage Group. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
