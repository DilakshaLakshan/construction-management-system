import Link from "next/link";
import { UserButton } from '@stackframe/stack';
import ClientImage from "/components/ClientImage";
import { Button } from "/components/ui/button";

export default function FinancialServicePage() {
  return (
    <div className="min-h-screen bg-[#FFFFFF] text-[#191A19]">
      <div className="flex justify-end p-4">
        <UserButton />
      </div>
      
      {/* Header Section */}
      <section className="relative py-16 px-4 md:px-8 lg:px-16">
        <div className="absolute inset-0 z-0 opacity-10">
          <ClientImage 
            src="/preencoded.jpg" 
            alt="Background Pattern" 
            fill={true} 
            style={{objectFit: "cover"}}
            priority={true}
            fallbackSrc="/fallback-image.png"
          />
        </div>
        <div className="relative z-10 max-w-5xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-[#191A19]">
            Employee Salary & Payroll Management
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-gray-700">
            Comprehensive payroll solutions for efficient employee compensation management
          </p>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-12 px-4 md:px-8 lg:px-16 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white p-8 rounded-xl shadow-md border-t-4 border-[#FF7420]">
              <div className="h-16 w-16 bg-[#FF7420]/10 rounded-full flex items-center justify-center mb-6">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-[#FF7420]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-4">Employee Management</h3>
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-start">
                  <svg className="h-5 w-5 text-[#FF7420] mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Add new employee records and salary details
                </li>
                <li className="flex items-start">
                  <svg className="h-5 w-5 text-[#FF7420] mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Modify salary structures and deductions
                </li>
                <li className="flex items-start">
                  <svg className="h-5 w-5 text-[#FF7420] mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Remove inactive employees from the system
                </li>
              </ul>
                <div className="mt-6">
                  <Link href="/services/financial/manage-employees">
                    <Button className="bg-[#FF7420] hover:bg-[#FF7420]/90">
                    Manage Employees
                   </Button>
                  </Link>
                </div>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-md border-t-4 border-[#FF7420]">
              <div className="h-16 w-16 bg-[#FF7420]/10 rounded-full flex items-center justify-center mb-6">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-[#FF7420]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-4">Payroll Processing</h3>
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-start">
                  <svg className="h-5 w-5 text-[#FF7420] mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Ensure salary calculations follow company policies
                </li>
                <li className="flex items-start">
                  <svg className="h-5 w-5 text-[#FF7420] mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Generate monthly salary reports
                </li>
                <li className="flex items-start">
                  <svg className="h-5 w-5 text-[#FF7420] mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Automated tax calculations and deductions
                </li>
              </ul>
              <div className="mt-6">
                <Button className="bg-[#FF7420] hover:bg-[#FF7420]/90">
                  Process Payroll
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Dashboard Preview Section */}
      <section className="py-16 px-4 md:px-8 lg:px-16">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Payroll Management Dashboard</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our intuitive dashboard provides a comprehensive view of your payroll operations
            </p>
          </div>
          
          <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            <div className="relative h-[400px] w-full">
              <ClientImage 
                src="/preencoded.jpg" 
                alt="Payroll Dashboard Preview" 
                fill={true} 
                style={{objectFit: "cover"}}
                fallbackSrc="/fallback-image.png"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Key Benefits Section */}
      <section className="py-16 px-4 md:px-8 lg:px-16 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Key Benefits</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our payroll management system offers numerous advantages for your business
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow">
              <div className="h-12 w-12 bg-[#FF7420]/10 rounded-full flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-[#FF7420]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-lg font-bold mb-2">Time Efficiency</h3>
              <p className="text-gray-600">
                Automate payroll calculations and save valuable time for your HR department
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow">
              <div className="h-12 w-12 bg-[#FF7420]/10 rounded-full flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-[#FF7420]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="text-lg font-bold mb-2">Accuracy & Compliance</h3>
              <p className="text-gray-600">
                Ensure accurate calculations and compliance with tax regulations
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow">
              <div className="h-12 w-12 bg-[#FF7420]/10 rounded-full flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-[#FF7420]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <h3 className="text-lg font-bold mb-2">Detailed Reporting</h3>
              <p className="text-gray-600">
                Generate comprehensive reports for financial planning and auditing
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 md:px-8 lg:px-16 bg-[#FF7420]">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6 text-white">Ready to Streamline Your Payroll Process?</h2>
          <p className="text-xl mb-8 text-white/90">Get started with our comprehensive payroll management system today.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/demo" className="px-8 py-3 bg-white text-[#FF7420] rounded-lg hover:bg-gray-100 transition-colors font-medium">
              Request Demo
            </Link>
            <Link href="/contact" className="px-8 py-3 bg-[#191A19] text-white rounded-lg hover:bg-gray-800 transition-colors font-medium">
              Contact Us
            </Link>
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
