'use client';

import { useState, useEffect } from 'react';
import Link from "next/link";
import { UserButton } from '@stackframe/stack';
import ClientImage from "/components/ClientImage";
import { Button } from "/components/ui/button";
import { useRouter } from 'next/navigation';

export default function ManageEmployeesPage() {
  const router = useRouter();
  const [employees, setEmployees] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [currentEmployee, setCurrentEmployee] = useState(null);
  const [formData, setFormData] = useState({
    id: '',
    name: '',
    position: '',
    department: '',
    joinDate: '',
    baseSalary: '',
    allowances: '',
    deductions: '',
    email: '',
    phone: ''
  });

  // Mock data - in a real app, you would fetch this from your Convex database
  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setEmployees([
        {
          id: '1',
          name: 'John Smith',
          position: 'Senior Engineer',
          department: 'Construction',
          joinDate: '2021-05-15',
          baseSalary: 85000,
          allowances: 5000,
          deductions: 2500,
          email: 'john.smith@example.com',
          phone: '+94 77 123 4567'
        },
        {
          id: '2',
          name: 'Sarah Johnson',
          position: 'Project Manager',
          department: 'Management',
          joinDate: '2020-03-10',
          baseSalary: 95000,
          allowances: 7500,
          deductions: 3000,
          email: 'sarah.j@example.com',
          phone: '+94 76 234 5678'
        },
        {
          id: '3',
          name: 'Raj Patel',
          position: 'Architect',
          department: 'Design',
          joinDate: '2022-01-20',
          baseSalary: 78000,
          allowances: 4000,
          deductions: 2000,
          email: 'raj.p@example.com',
          phone: '+94 75 345 6789'
        },
        {
          id: '4',
          name: 'Amara Fernando',
          position: 'Site Supervisor',
          department: 'Operations',
          joinDate: '2021-08-05',
          baseSalary: 65000,
          allowances: 3500,
          deductions: 1800,
          email: 'amara.f@example.com',
          phone: '+94 71 456 7890'
        },
        {
          id: '5',
          name: 'David Lee',
          position: 'Quantity Surveyor',
          department: 'Finance',
          joinDate: '2022-04-12',
          baseSalary: 72000,
          allowances: 4200,
          deductions: 2100,
          email: 'david.l@example.com',
          phone: '+94 70 567 8901'
        }
      ]);
      setIsLoading(false);
    }, 1000);
  }, []);

  const filteredEmployees = employees.filter(employee => 
    employee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    employee.position.toLowerCase().includes(searchTerm.toLowerCase()) ||
    employee.department.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleAddEmployee = () => {
    // In a real app, you would call your Convex mutation here
    const newEmployee = {
      ...formData,
      id: Date.now().toString(),
    };
    
    setEmployees([...employees, newEmployee]);
    setShowAddModal(false);
    resetForm();
  };

  const handleEditEmployee = () => {
    // In a real app, you would call your Convex mutation here
    const updatedEmployees = employees.map(emp => 
      emp.id === formData.id ? formData : emp
    );
    
    setEmployees(updatedEmployees);
    setShowEditModal(false);
    resetForm();
  };

  const handleDeleteEmployee = (id) => {
    // In a real app, you would call your Convex mutation here
    if (confirm('Are you sure you want to delete this employee?')) {
      const updatedEmployees = employees.filter(emp => emp.id !== id);
      setEmployees(updatedEmployees);
    }
  };

  const openEditModal = (employee) => {
    setCurrentEmployee(employee);
    setFormData(employee);
    setShowEditModal(true);
  };

  const resetForm = () => {
    setFormData({
      id: '',
      name: '',
      position: '',
      department: '',
      joinDate: '',
      baseSalary: '',
      allowances: '',
      deductions: '',
      email: '',
      phone: ''
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <div className="flex items-center">
            <Link href="/services/financial" className="flex items-center text-gray-600 hover:text-[#FF7420]">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Back to Financial Services
            </Link>
          </div>
          <UserButton />
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          {/* Page Header */}
          <div className="px-6 py-8 border-b border-gray-200 bg-[#FF7420]/5">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Employee Management</h1>
                <p className="mt-1 text-sm text-gray-600">
                  Add, edit, and manage employee records and salary information
                </p>
              </div>
              <div className="mt-4 md:mt-0">
                <Button 
                  className="bg-[#FF7420] hover:bg-[#FF7420]/90"
                  onClick={() => setShowAddModal(true)}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                  Add New Employee
                </Button>
              </div>
            </div>
            
            {/* Search and Filter */}
            <div className="mt-6">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
                <input
                  type="text"
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-[#FF7420] focus:border-[#FF7420] sm:text-sm"
                  placeholder="Search employees by name, position, or department..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
          </div>

          {/* Employee Table */}
          <div className="overflow-x-auto">
            {isLoading ? (
              <div className="flex justify-center items-center py-20">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#FF7420]"></div>
              </div>
            ) : filteredEmployees.length === 0 ? (
              <div className="text-center py-20">
                <svg xmlns="http://www.w3.org/2000/svg" className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <h3 className="mt-2 text-sm font-medium text-gray-900">No employees found</h3>
                <p className="mt-1 text-sm text-gray-500">
                  {searchTerm ? "Try adjusting your search terms" : "Get started by adding a new employee"}
                </p>
                {!searchTerm && (
                  <div className="mt-6">
                    <Button 
                      className="bg-[#FF7420] hover:bg-[#FF7420]/90"
                      onClick={() => setShowAddModal(true)}
                    >
                      Add New Employee
                    </Button>
                  </div>
                )}
              </div>
            ) : (
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Employee
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Department
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Join Date
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Salary Details
                    </th>
                    <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredEmployees.map((employee) => (
                    <tr key={employee.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-10 w-10 bg-[#FF7420]/10 rounded-full flex items-center justify-center">
                            <span className="text-[#FF7420] font-medium">
                              {employee.name.split(' ').map(n => n[0]).join('')}
                            </span>
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">{employee.name}</div>
                            <div className="text-sm text-gray-500">{employee.position}</div>
                            <div className="text-xs text-gray-400">{employee.email}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                          {employee.department}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {new Date(employee.joinDate).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'short',
                          day: 'numeric'
                        })}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">Rs. {employee.baseSalary.toLocaleString()}</div>
                        <div className="text-xs text-gray-500">
                          Allowances: Rs. {employee.allowances.toLocaleString()} | 
                          Deductions: Rs. {employee.deductions.toLocaleString()}
                        </div>
                        <div className="text-xs font-medium text-gray-900">
                          Net: Rs. {(employee.baseSalary + employee.allowances - employee.deductions).toLocaleString()}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <button
                          onClick={() => openEditModal(employee)}
                          className="text-indigo-600 hover:text-indigo-900 mr-4"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDeleteEmployee(employee.id)}
                          className="text-red-600 hover:text-red-900"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                                      ))}
                                      </tbody>
                                    </table>
                                  )}
                                </div>
                                
                                {/* Pagination */}
                                <div className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
                                  <div className="flex-1 flex justify-between sm:hidden">
                                    <button className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
                                      Previous
                                    </button>
                                    <button className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
                                      Next
                                    </button>
                                  </div>
                                  <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
                                    <div>
                                      <p className="text-sm text-gray-700">
                                        Showing <span className="font-medium">1</span> to <span className="font-medium">{filteredEmployees.length}</span> of{' '}
                                        <span className="font-medium">{filteredEmployees.length}</span> results
                                      </p>
                                    </div>
                                    <div>
                                      <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                                        <button className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                                          <span className="sr-only">Previous</span>
                                          <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                            <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                                          </svg>
                                        </button>
                                        <button className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50">
                                          1
                                        </button>
                                        <button className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                                          <span className="sr-only">Next</span>
                                          <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                            <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                                          </svg>
                                        </button>
                                      </nav>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </main>
                      
                            {/* Add Employee Modal */}
                            {showAddModal && (
                              <div className="fixed inset-0 z-50 overflow-y-auto">
                                <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                                  <div className="fixed inset-0 transition-opacity" aria-hidden="true">
                                    <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
                                  </div>
                                  <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
                                  <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                                    <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                                      <div className="sm:flex sm:items-start">
                                        <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-[#FF7420]/10 sm:mx-0 sm:h-10 sm:w-10">
                                          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-[#FF7420]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                                          </svg>
                                        </div>
                                        <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full">
                                          <h3 className="text-lg leading-6 font-medium text-gray-900">Add New Employee</h3>
                                          <div className="mt-4 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-2">
                                            <div>
                                              <label htmlFor="name" className="block text-sm font-medium text-gray-700">Full Name</label>
                                              <input
                                                type="text"
                                                name="name"
                                                id="name"
                                                className="mt-1 focus:ring-[#FF7420] focus:border-[#FF7420] block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                                                value={formData.name}
                                                onChange={handleInputChange}
                                              />
                                            </div>
                                            <div>
                                              <label htmlFor="position" className="block text-sm font-medium text-gray-700">Position</label>
                                              <input
                                                type="text"
                                                name="position"
                                                id="position"
                                                className="mt-1 focus:ring-[#FF7420] focus:border-[#FF7420] block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                                                value={formData.position}
                                                onChange={handleInputChange}
                                              />
                                            </div>
                                            <div>
                                              <label htmlFor="department" className="block text-sm font-medium text-gray-700">Department</label>
                                              <select
                                                id="department"
                                                name="department"
                                                className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-[#FF7420] focus:border-[#FF7420] sm:text-sm rounded-md"
                                                value={formData.department}
                                                onChange={handleInputChange}
                                              >
                                                <option value="">Select department</option>
                                                <option value="Construction">Construction</option>
                                                <option value="Management">Management</option>
                                                <option value="Design">Design</option>
                                                <option value="Operations">Operations</option>
                                                <option value="Finance">Finance</option>
                                                <option value="HR">HR</option>
                                              </select>
                                            </div>
                                            <div>
                                              <label htmlFor="joinDate" className="block text-sm font-medium text-gray-700">Join Date</label>
                                              <input
                                                type="date"
                                                name="joinDate"
                                                id="joinDate"
                                                className="mt-1 focus:ring-[#FF7420] focus:border-[#FF7420] block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                                                value={formData.joinDate}
                                                onChange={handleInputChange}
                                              />
                                            </div>
                                            <div>
                                              <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                                              <input
                                                type="email"
                                                name="email"
                                                id="email"
                                                className="mt-1 focus:ring-[#FF7420] focus:border-[#FF7420] block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                                                value={formData.email}
                                                onChange={handleInputChange}
                                              />
                                            </div>
                                            <div>
                                              <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Phone</label>
                                              <input
                                                type="text"
                                                name="phone"
                                                id="phone"
                                                className="mt-1 focus:ring-[#FF7420] focus:border-[#FF7420] block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                                                value={formData.phone}
                                                onChange={handleInputChange}
                                              />
                                            </div>
                                            <div>
                                              <label htmlFor="baseSalary" className="block text-sm font-medium text-gray-700">Base Salary (Rs.)</label>
                                              <input
                                                type="number"
                                                name="baseSalary"
                                                id="baseSalary"
                                                className="mt-1 focus:ring-[#FF7420] focus:border-[#FF7420] block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                                                value={formData.baseSalary}
                                                onChange={handleInputChange}
                                              />
                                            </div>
                                            <div>
                                              <label htmlFor="allowances" className="block text-sm font-medium text-gray-700">Allowances (Rs.)</label>
                                              <input
                                                type="number"
                                                name="allowances"
                                                id="allowances"
                                                className="mt-1 focus:ring-[#FF7420] focus:border-[#FF7420] block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                                                value={formData.allowances}
                                                onChange={handleInputChange}
                                              />
                                            </div>
                                            <div>
                                              <label htmlFor="deductions" className="block text-sm font-medium text-gray-700">Deductions (Rs.)</label>
                                              <input
                                                type="number"
                                                name="deductions"
                                                id="deductions"
                                                className="mt-1 focus:ring-[#FF7420] focus:border-[#FF7420] block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                                                value={formData.deductions}
                                                onChange={handleInputChange}
                                              />
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                    <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                                      <button
                                        type="button"
                                        className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-[#FF7420] text-base font-medium text-white hover:bg-[#FF7420]/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#FF7420] sm:ml-3 sm:w-auto sm:text-sm"
                                        onClick={handleAddEmployee}
                                      >
                                        Add Employee
                                      </button>
                                      <button
                                        type="button"
                                        className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                                        onClick={() => setShowAddModal(false)}
                                      >
                                        Cancel
                                      </button>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            )}
                      
                            {/* Edit Employee Modal */}
                            {showEditModal && (
                              <div className="fixed inset-0 z-50 overflow-y-auto">
                                <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                                  <div className="fixed inset-0 transition-opacity" aria-hidden="true">
                                    <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
                                  </div>
                                  <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
                                  <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                                    <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                                      <div className="sm:flex sm:items-start">
                                        <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-blue-100 sm:mx-0 sm:h-10 sm:w-10">
                                          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                          </svg>
                                        </div>
                                        <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full">
                                          <h3 className="text-lg leading-6 font-medium text-gray-900">Edit Employee</h3>
                                          <div className="mt-4 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-2">
                      <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700">Full Name</label>
                        <input
                          type="text"
                          name="name"
                          id="name"
                          className="mt-1 focus:ring-[#FF7420] focus:border-[#FF7420] block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                          value={formData.name}
                          onChange={handleInputChange}
                        />
                      </div>
                      <div>
                        <label htmlFor="position" className="block text-sm font-medium text-gray-700">Position</label>
                        <input
                          type="text"
                          name="position"
                          id="position"
                          className="mt-1 focus:ring-[#FF7420] focus:border-[#FF7420] block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                          value={formData.position}
                          onChange={handleInputChange}
                        />
                      </div>
                      <div>
                        <label htmlFor="department" className="block text-sm font-medium text-gray-700">Department</label>
                        <select
                          id="department"
                          name="department"
                          className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-[#FF7420] focus:border-[#FF7420] sm:text-sm rounded-md"
                          value={formData.department}
                          onChange={handleInputChange}
                        >
                          <option value="">Select department</option>
                          <option value="Construction">Construction</option>
                          <option value="Management">Management</option>
                          <option value="Design">Design</option>
                          <option value="Operations">Operations</option>
                          <option value="Finance">Finance</option>
                          <option value="HR">HR</option>
                        </select>
                      </div>
                      <div>
                        <label htmlFor="joinDate" className="block text-sm font-medium text-gray-700">Join Date</label>
                        <input
                          type="date"
                          name="joinDate"
                          id="joinDate"
                          className="mt-1 focus:ring-[#FF7420] focus:border-[#FF7420] block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                          value={formData.joinDate}
                          onChange={handleInputChange}
                        />
                      </div>
                      <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                        <input
                          type="email"
                          name="email"
                          id="email"
                          className="mt-1 focus:ring-[#FF7420] focus:border-[#FF7420] block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                          value={formData.email}
                          onChange={handleInputChange}
                        />
                      </div>
                      <div>
                        <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Phone</label>
                        <input
                          type="text"
                          name="phone"
                          id="phone"
                          className="mt-1 focus:ring-[#FF7420] focus:border-[#FF7420] block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                          value={formData.phone}
                          onChange={handleInputChange}
                        />
                      </div>
                      <div>
                        <label htmlFor="baseSalary" className="block text-sm font-medium text-gray-700">Base Salary (Rs.)</label>
                        <input
                          type="number"
                          name="baseSalary"
                          id="baseSalary"
                          className="mt-1 focus:ring-[#FF7420] focus:border-[#FF7420] block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                          value={formData.baseSalary}
                          onChange={handleInputChange}
                        />
                      </div>
                      <div>
                        <label htmlFor="allowances" className="block text-sm font-medium text-gray-700">Allowances (Rs.)</label>
                        <input
                          type="number"
                          name="allowances"
                          id="allowances"
                          className="mt-1 focus:ring-[#FF7420] focus:border-[#FF7420] block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                          value={formData.allowances}
                          onChange={handleInputChange}
                        />
                      </div>
                      <div>
                        <label htmlFor="deductions" className="block text-sm font-medium text-gray-700">Deductions (Rs.)</label>
                        <input
                          type="number"
                          name="deductions"
                          id="deductions"
                          className="mt-1 focus:ring-[#FF7420] focus:border-[#FF7420] block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                          value={formData.deductions}
                          onChange={handleInputChange}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button
                  type="button"
                  className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm"
                  onClick={handleEditEmployee}
                >
                  Save Changes
                </button>
                <button
                  type="button"
                  className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                  onClick={() => setShowEditModal(false)}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Analytics Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          <div className="px-6 py-8 border-b border-gray-200">
            <h2 className="text-xl font-bold text-gray-900">Payroll Analytics</h2>
            <p className="mt-1 text-sm text-gray-600">
              Overview of salary distribution and department expenses
            </p>
          </div>
          
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-gray-50 rounded-lg p-6">
                <h3 className="text-lg font-medium text-gray-900 mb-2">Total Monthly Payroll</h3>
                <p className="text-3xl font-bold text-[#FF7420]">
                  Rs. {employees.reduce((sum, emp) => sum + (emp.baseSalary + emp.allowances - emp.deductions), 0).toLocaleString()}
                </p>
                <p className="text-sm text-gray-500 mt-2">
                  For {employees.length} active employees
                </p>
              </div>
              
              <div className="bg-gray-50 rounded-lg p-6">
                <h3 className="text-lg font-medium text-gray-900 mb-2">Average Salary</h3>
                <p className="text-3xl font-bold text-[#FF7420]">
                  Rs. {employees.length > 0 
                    ? Math.round(employees.reduce((sum, emp) => sum + emp.baseSalary, 0) / employees.length).toLocaleString() 
                    : 0}
                </p>
                <p className="text-sm text-gray-500 mt-2">
                  Base salary without allowances
                </p>
              </div>
              
              <div className="bg-gray-50 rounded-lg p-6">
                <h3 className="text-lg font-medium text-gray-900 mb-2">Departments</h3>
                <p className="text-3xl font-bold text-[#FF7420]">
                  {new Set(employees.map(emp => emp.department)).size}
                </p>
                <p className="text-sm text-gray-500 mt-2">
                  Active departments with employees
                </p>
              </div>
            </div>
            
            <div className="mt-8">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Department Salary Distribution</h3>
              <div className="h-64 bg-gray-50 rounded-lg p-4 flex items-center justify-center">
                <p className="text-gray-500">Interactive chart would be displayed here</p>
                {/* In a real application, you would integrate a chart library like Chart.js or Recharts */}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Actions */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-[#FF7420]/5 rounded-xl shadow-sm overflow-hidden">
          <div className="px-6 py-8">
            <h2 className="text-xl font-bold text-gray-900">Quick Actions</h2>
            <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
              <button
                className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow flex flex-col items-center justify-center"
                onClick={() => router.push('/services/financial/payroll-processing')}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-[#FF7420] mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
                <span className="text-gray-900 font-medium">Process Payroll</span>
              </button>
              
              <button
                className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow flex flex-col items-center justify-center"
                onClick={() => router.push('/services/financial/reports')}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-[#FF7420] mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                <span className="text-gray-900 font-medium">Generate Reports</span>
              </button>
              
              <button
                className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow flex flex-col items-center justify-center"
                onClick={() => router.push('/services/financial/tax-settings')}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-[#FF7420] mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span className="text-gray-900 font-medium">Tax Settings</span>
              </button>
              
              <button
                               className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow flex flex-col items-center justify-center"
                               onClick={() => router.push('/services/financial/salary-templates')}
                             >
                               <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-[#FF7420] mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" />
                               </svg>
                               <span className="text-gray-900 font-medium">Salary Templates</span>
                             </button>
                           </div>
                         </div>
                       </div>
                     </section>
               
                     {/* Footer */}
                     <footer className="bg-gray-800 text-white mt-12">
                       <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
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
               