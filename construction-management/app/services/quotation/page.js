import Image from "next/image";
import Link from "next/link";
import { UserButton } from '@stackframe/stack';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "/components/ui/tabs.jsx";
import { Button } from "/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "/components/ui/card";

export default function QuotationPage() {
  return (
    <div className="min-h-screen bg-[#FFFFFF] text-[#191A19]">
      <div className="flex justify-between items-center p-4 border-b">
        <Link href="/" className="text-[#FF7420] font-bold text-xl">Vithanage Group</Link>
        <UserButton />
      </div>
      
      {/* Hero Section */}
      <section className="relative py-12 px-4 md:px-8 lg:px-16">
        <div className="absolute inset-0 z-0 opacity-5">
          <Image 
            src="/preencoded.jpg" 
            alt="Background Pattern" 
            fill 
            style={{objectFit: "cover"}}
            priority
          />
        </div>
        <div className="relative z-10 max-w-5xl mx-auto">
          <h1 className="text-3xl md:text-5xl font-bold mb-4 text-[#191A19]">
            Quotation Management for <span className="text-[#FF7420]">Wooden Designs</span>
          </h1>
          <p className="text-lg md:text-xl mb-6 text-gray-700 max-w-3xl">
            Create accurate and detailed quotations for custom wooden designs with our comprehensive management system.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-8 px-4 md:px-8 lg:px-16 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-lg p-6 sticky top-8">
              <h3 className="text-xl font-bold mb-4 text-[#191A19]">Quotation Tools</h3>
              <nav className="space-y-2">
                <Button variant="ghost" className="w-full justify-start text-left hover:bg-[#FF7420]/10 hover:text-[#FF7420]">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                  New Quotation
                </Button>
                <Button variant="ghost" className="w-full justify-start text-left hover:bg-[#FF7420]/10 hover:text-[#FF7420]">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                  </svg>
                  Templates
                </Button>
                <Button variant="ghost" className="w-full justify-start text-left hover:bg-[#FF7420]/10 hover:text-[#FF7420]">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  Reports
                </Button>
                <Button variant="ghost" className="w-full justify-start text-left hover:bg-[#FF7420]/10 hover:text-[#FF7420]">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  Settings
                </Button>
              </nav>
              
              <div className="mt-8 pt-6 border-t border-gray-200">
                <h4 className="font-medium mb-3 text-gray-700">Quick Actions</h4>
                <div className="space-y-2">
                  <Button className="w-full bg-[#FF7420] hover:bg-[#FF7420]/90">
                    Create New Quotation
                  </Button>
                  <Button variant="outline" className="w-full border-[#FF7420] text-[#FF7420] hover:bg-[#FF7420]/10">
                    Import Quotation
                  </Button>
                  <Button 
                    className="w-full bg-blue-600 hover:bg-blue-700 relative overflow-hidden group"
                  >
                    <span className="absolute inset-0 bg-yellow-300 opacity-20 animate-pulse"></span>
                    <div className="flex items-center justify-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                      Upload CAD for Auto-Cost
                    </div>
                  </Button>
                </div>
              </div>
            </div>
          </div>
          
          {/* Main Content */}
          <div className="lg:col-span-2">
            <Tabs defaultValue="features" className="w-full">
              <TabsList className="grid w-full grid-cols-2 bg-gray-100 rounded-xl p-1">
                
                <TabsTrigger 
                  value="recent" 
                  className="data-[state=active]:bg-[#FF7420] data-[state=active]:text-white rounded-lg py-3"
                >
                  Recent Quotations
                </TabsTrigger>
                <TabsTrigger 
                  value="validation" 
                  className="data-[state=active]:bg-[#FF7420] data-[state=active]:text-white rounded-lg py-3"
                >
                  Validation Tools
                </TabsTrigger>
              </TabsList>
              
              {/* Recent Quotations Tab Content */}
              <TabsContent value="recent" className="mt-6">
                <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                  <div className="p-4 border-b flex justify-between items-center">
                    <h3 className="font-bold text-lg">Recent Quotations</h3>
                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm" className="text-gray-600">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
                        </svg>
                        Filter
                      </Button>
                      <Button variant="outline" size="sm" className="text-gray-600">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                        </svg>
                        Export
                      </Button>
                    </div>
                  </div>
                  
                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            ID
                          </th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Client
                          </th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Project
                          </th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Amount
                          </th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Status
                          </th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Date
                          </th>
                          <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Actions
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        <tr>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                            Q-2023-001
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            Lakeside Resort
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            Custom Furniture Set
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            $12,450.00
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                              Approved
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            2023-05-12
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                            <div className="flex justify-end space-x-2">
                              <Button variant="ghost" size="sm" className="text-blue-600 hover:text-blue-900">
                                View
                              </Button>
                              <Button variant="ghost" size="sm" className="text-[#FF7420]">
                                Edit
                              </Button>
                            </div>
                          </td>
                        </tr>
                        <tr>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                            Q-2023-002
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            Mountain View Hotel
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            Reception Desk & Cabinets
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            $8,750.00
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800">
                              Pending
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            2023-05-18
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                            <div className="flex justify-end space-x-2">
                              <Button variant="ghost" size="sm" className="text-blue-600 hover:text-blue-900">
                                View
                              </Button>
                              <Button variant="ghost" size="sm" className="text-[#FF7420]">
                                Edit
                              </Button>
                            </div>
                          </td>
                        </tr>
                        <tr>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                            Q-2023-003
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            Greenview Residences
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            Kitchen Cabinetry
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            $15,200.00
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800">
                              Rejected
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            2023-05-20
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                            <div className="flex justify-end space-x-2">
                              <Button variant="ghost" size="sm" className="text-blue-600 hover:text-blue-900">
                                View
                              </Button>
                              <Button variant="ghost" size="sm" className="text-[#FF7420]">
                                Edit
                              </Button>
                            </div>
                          </td>
                        </tr>
                        <tr>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                            Q-2023-004
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            Oceanfront Villa
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            Custom Doors & Windows
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            $22,800.00
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                              Draft
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            2023-05-25
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                            <div className="flex justify-end space-x-2">
                              <Button variant="ghost" size="sm" className="text-blue-600 hover:text-blue-900">
                                View
                              </Button>
                              <Button variant="ghost" size="sm" className="text-[#FF7420]">
                                Edit
                              </Button>
                            </div>
                          </td>
                        </tr>
                        <tr>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                            Q-2023-005
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            City Center Office
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            Executive Furniture Set
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            $18,350.00
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                              Approved
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            2023-06-01
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                            <div className="flex justify-end space-x-2">
                              <Button variant="ghost" size="sm" className="text-blue-600 hover:text-blue-900">
                                View
                              </Button>
                              <Button variant="ghost" size="sm" className="text-[#FF7420]">
                                Edit
                              </Button>
                            </div>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  
                  <div className="px-6 py-4 border-t flex items-center justify-between">
                    <p className="text-sm text-gray-500">Showing 5 of 24 quotations</p>
                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm" disabled>
                        Previous
                      </Button>
                      <Button variant="outline" size="sm">
                        Next
                      </Button>
                    </div>
                  </div>
                </div>
              </TabsContent>
              
              {/* Validation Tools Tab Content */}
              <TabsContent value="validation" className="mt-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Validation Tool 1 */}
                  <Card>
                    <CardHeader>
                      <CardTitle>Cost Limit Validation</CardTitle>
                      <CardDescription>Ensure estimates are within acceptable ranges</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="p-4 bg-gray-50 rounded-lg">
                          <h4 className="font-medium text-sm text-gray-700 mb-2">Material Cost Limits</h4>
                          <div className="flex items-center">
                            <div className="w-full bg-gray-200 rounded-full h-2.5">
                              <div className="bg-green-600 h-2.5 rounded-full" style={{ width: '70%' }}></div>
                            </div>
                            <span className="ml-2 text-sm text-gray-600">70%</span>
                          </div>
                          <p className="mt-2 text-xs text-gray-500">Current material costs are within acceptable limits</p>
                        </div>
                        
                        <div className="p-4 bg-gray-50 rounded-lg">
                          <h4 className="font-medium text-sm text-gray-700 mb-2">Labor Cost Limits</h4>
                          <div className="flex items-center">
                            <div className="w-full bg-gray-200 rounded-full h-2.5">
                              <div className="bg-yellow-500 h-2.5 rounded-full" style={{ width: '85%' }}></div>
                            </div>
                            <span className="ml-2 text-sm text-gray-600">85%</span>
                          </div>
                          <p className="mt-2 text-xs text-gray-500">Labor costs are approaching upper limits</p>
                        </div>
                        
                        <div className="p-4 bg-gray-50 rounded-lg">
                          <h4 className="font-medium text-sm text-gray-700 mb-2">Profit Margin</h4>
                          <div className="flex items-center">
                            <div className="w-full bg-gray-200 rounded-full h-2.5">
                              <div className="bg-red-500 h-2.5 rounded-full" style={{ width: '15%' }}></div>
                            </div>
                            <span className="ml-2 text-sm text-gray-600">15%</span>
                          </div>
                          <p className="mt-2 text-xs text-gray-500">Profit margin is below recommended minimum (20%)</p>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button className="w-full bg-[#FF7420] hover:bg-[#FF7420]/90">
                        Run Validation Check
                      </Button>
                    </CardFooter>
                  </Card>
                  
                  {/* Validation Tool 2 */}
                  <Card>
                    <CardHeader>
                      <CardTitle>Material Quantity Validation</CardTitle>
                      <CardDescription>Verify material quantities against design specifications</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="flex justify-between items-center p-3 border border-gray-200 rounded-lg">
                          <div>
                            <h4 className="font-medium text-sm">Hardwood (Oak)</h4>
                            <p className="text-xs text-gray-500">Calculated: 125 sq.ft.</p>
                          </div>
                          <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">Verified</span>
                        </div>
                        
                        <div className="flex justify-between items-center p-3 border border-gray-200 rounded-lg">
                          <div>
                            <h4 className="font-medium text-sm">Plywood Sheets</h4>
                            <p className="text-xs text-gray-500">Calculated: 18 sheets</p>
                          </div>
                          <span className="px-2 py-1 bg-yellow-100 text-yellow-800 text-xs rounded-full">Review</span>
                        </div>
                        
                        <div className="flex justify-between items-center p-3 border border-gray-200 rounded-lg">
                          <div>
                            <h4 className="font-medium text-sm">Cabinet Hardware</h4>
                            <p className="text-xs text-gray-500">Calculated: 42 units</p>
                          </div>
                          <span className="px-2 py-1 bg-red-100 text-red-800 text-xs rounded-full">Mismatch</span>
                        </div>
                        
                        <div className="flex justify-between items-center p-3 border border-gray-200 rounded-lg">
                          <div>
                            <h4 className="font-medium text-sm">Finishing Materials</h4>
                            <p className="text-xs text-gray-500">Calculated: 8 gallons</p>
                          </div>
                          <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">Verified</span>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button className="w-full bg-[#FF7420] hover:bg-[#FF7420]/90">
                        Recalculate Quantities
                      </Button>
                    </CardFooter>
                  </Card>
                  
                  {/* Validation Tool 3 - Full Width */}
                  <Card className="md:col-span-2">
                    <CardHeader>
                      <CardTitle>Cost Breakdown Generator</CardTitle>
                      <CardDescription>Create detailed cost breakdowns for clients</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <h4 className="font-medium text-sm mb-3">Cost Categories</h4>
                            <div className="space-y-2">
                              <div className="flex items-center">
                                <input type="checkbox" id="materials" className="h-4 w-4 text-[#FF7420] rounded border-gray-300 focus:ring-[#FF7420]" defaultChecked />
                                <label htmlFor="materials" className="ml-2 text-sm text-gray-700">Materials</label>
                              </div>
                              <div className="flex items-center">
                                <input type="checkbox" id="labor" className="h-4 w-4 text-[#FF7420] rounded border-gray-300 focus:ring-[#FF7420]" defaultChecked />
                                <label htmlFor="labor" className="ml-2 text-sm text-gray-700">Labor</label>
                              </div>
                              <div className="flex items-center">
                                <input type="checkbox" id="design" className="h-4 w-4 text-[#FF7420] rounded border-gray-300 focus:ring-[#FF7420]" defaultChecked />
                                <label htmlFor="design" className="ml-2 text-sm text-gray-700">Design Fees</label>
                              </div>
                              <div className="flex items-center">
                                <input type="checkbox" id="overhead" className="h-4 w-4 text-[#FF7420] rounded border-gray-300 focus:ring-[#FF7420]" defaultChecked />
                                <label htmlFor="overhead" className="ml-2 text-sm text-gray-700">Overhead</label>
                              </div>
                              <div className="flex items-center">
                                <input type="checkbox" id="profit" className="h-4 w-4 text-[#FF7420] rounded border-gray-300 focus:ring-[#FF7420]" defaultChecked />
                                <label htmlFor="profit" className="ml-2 text-sm text-gray-700">Profit Margin</label>
                              </div>
                            </div>
                          </div>
                          
                          <div>
                            <h4 className="font-medium text-sm mb-3">Export Format</h4>
                            <div className="space-y-2">
                              <div className="flex items-center">
                                <input type="radio" id="pdf" name="format" className="h-4 w-4 text-[#FF7420] border-gray-300 focus:ring-[#FF7420]" defaultChecked />
                                <label htmlFor="pdf" className="ml-2 text-sm text-gray-700">PDF Document</label>
                                </div>
                              <div className="flex items-center">
                                <input type="radio" id="word" name="format" className="h-4 w-4 text-[#FF7420] border-gray-300 focus:ring-[#FF7420]" />
                                <label htmlFor="word" className="ml-2 text-sm text-gray-700">Word Document</label>
                              </div>
                              <div className="flex items-center">
                                <input type="radio" id="html" name="format" className="h-4 w-4 text-[#FF7420] border-gray-300 focus:ring-[#FF7420]" />
                                <label htmlFor="html" className="ml-2 text-sm text-gray-700">HTML (Email)</label>
                              </div>
                            </div>
                          </div>
                        </div>
                        
                        <div className="p-4 bg-gray-50 rounded-lg">
                          <h4 className="font-medium text-sm mb-3">Preview</h4>
                          <div className="aspect-video bg-white border border-gray-200 rounded-md flex items-center justify-center">
                            <p className="text-gray-400 text-sm">Cost breakdown preview will appear here</p>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter className="flex justify-between">
                      <Button variant="outline">
                        Preview
                      </Button>
                      <Button className="bg-[#FF7420] hover:bg-[#FF7420]/90">
                        Generate & Download
                      </Button>
                    </CardFooter>
                  </Card>
                  {/* CAD Auto-Cost Generator - New Feature */}
                  <Card className="md:col-span-2 border-2 border-blue-500 shadow-lg relative overflow-hidden">
                    <div className="absolute top-0 right-0 bg-blue-600 text-white px-3 py-1 text-xs font-bold">
                      NEW FEATURE
                    </div>
                    <CardHeader>
                      <CardTitle className="flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                        CAD Plan Auto-Cost Generator
                      </CardTitle>
                      <CardDescription>Upload CAD files to automatically generate accurate cost estimates</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="p-4 bg-blue-50 rounded-lg">
                          <h4 className="font-medium text-sm text-blue-700 mb-2">How It Works</h4>
                          <ol className="list-decimal list-inside text-sm text-gray-700 space-y-2">
                            <li>Upload your CAD design files (DWG, DXF, SKP)</li>
                            <li>Our system analyzes dimensions, materials, and components</li>
                            <li>Material quantities are automatically calculated</li>
                            <li>Costs are generated based on current material pricing</li>
                            <li>Review and adjust the generated quotation</li>
                          </ol>
                        </div>
                        
                        <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto text-gray-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                          </svg>
                          <p className="text-sm text-gray-500 mb-4">Drag and drop your CAD files here, or click to browse</p>
                          <input type="file" className="hidden" id="cad-file-upload" accept=".dwg,.dxf,.skp" />
                          <label htmlFor="cad-file-upload">
                            <Button className="bg-blue-600 hover:bg-blue-700">
                              Select CAD File
                            </Button>
                          </label>
                        </div>
                        
                        <div className="grid grid-cols-2 gap-4">
                          <div className="p-3 bg-gray-50 rounded-lg">
                            <h4 className="font-medium text-sm mb-2">Supported File Types</h4>
                            <div className="flex flex-wrap gap-2">
                              <span className="px-2 py-1 bg-gray-200 text-gray-700 text-xs rounded-full">DWG</span>
                              <span className="px-2 py-1 bg-gray-200 text-gray-700 text-xs rounded-full">DXF</span>
                              <span className="px-2 py-1 bg-gray-200 text-gray-700 text-xs rounded-full">SKP</span>
                              <span className="px-2 py-1 bg-gray-200 text-gray-700 text-xs rounded-full">RVT</span>
                            </div>
                          </div>
                          <div className="p-3 bg-gray-50 rounded-lg">
                            <h4 className="font-medium text-sm mb-2">Accuracy Rating</h4>
                            <div className="flex items-center">
                              <div className="w-full bg-gray-200 rounded-full h-2.5">
                                <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: '92%' }}></div>
                              </div>
                              <span className="ml-2 text-sm text-gray-600">92%</span>
                            </div>
                            <p className="mt-2 text-xs text-gray-500">Based on previous estimates</p>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button className="w-full bg-blue-600 hover:bg-blue-700 group relative">
                        <span className="absolute inset-0 bg-yellow-300 opacity-20 animate-pulse"></span>
                        Upload CAD & Generate Cost Estimate
                      </Button>
                    </CardFooter>
                  </Card>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-12 px-4 md:px-8 lg:px-16 bg-[#FF7420] mt-12">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-4 text-white">Ready to Streamline Your Quotation Process?</h2>
          <p className="text-lg mb-6 text-white/90">Our quotation management system helps you create accurate estimates and professional proposals.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button className="bg-white text-[#FF7420] hover:bg-gray-100">
              Create Your First Quotation
            </Button>
            
          </div>
        </div>
      </section>
      
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
