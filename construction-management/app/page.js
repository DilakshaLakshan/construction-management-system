import Image from "next/image";
import Link from "next/link";
import { UserButton } from '@stackframe/stack';

export default function Home() {
  return (
    
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      <div className="flex justify-end p-4">
        <UserButton />
      </div>
      {/* Hero Section */}
      <section className="relative flex flex-col items-center justify-center py-20 px-4 md:px-8 lg:px-16 text-center">
        <div className="absolute inset-0 z-0 opacity-10">
          <Image 
            src="/preencoded.png" 
            alt="Background Pattern" 
            fill 
            style={{objectFit: "cover"}}
            priority
          />
        </div>
        <div className="relative z-10 max-w-5xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 text-gray-900 dark:text-white">
            Welcome to <span className="text-blue-600 dark:text-blue-400">Vithanage Group</span>
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-gray-700 dark:text-gray-300">
            A modern digital platform for construction, woodcraft, and timber sales.
            Manage products, track inventory, and handle customer inquiries with ease.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/quotations" className="px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium">
              Get Started
            </Link>
            <Link href="/about" className="px-8 py-3 bg-white text-blue-600 border border-blue-600 rounded-lg hover:bg-gray-50 transition-colors font-medium dark:bg-gray-800 dark:text-blue-400 dark:border-blue-400 dark:hover:bg-gray-700">
              Learn More
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4 md:px-8 lg:px-16 bg-white dark:bg-gray-800">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-900 dark:text-white">Core Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Feature 1 */}
            <div className="bg-gray-50 dark:bg-gray-700 p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow">
              <div className="h-12 w-12 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mb-4">
                <span className="text-blue-600 dark:text-blue-300 text-xl font-bold">1</span>
              </div>
              <h3 className="text-xl font-semibold mb-3 text-gray-900 dark:text-white">Smart Quotation System</h3>
              <p className="text-gray-600 dark:text-gray-300">Generate instant quotes for wooden and building designs. Automates cost estimation, reducing errors and delays.</p>
            </div>

            {/* Feature 2 */}
            <div className="bg-gray-50 dark:bg-gray-700 p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow">
              <div className="h-12 w-12 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mb-4">
                <span className="text-blue-600 dark:text-blue-300 text-xl font-bold">2</span>
              </div>
              <h3 className="text-xl font-semibold mb-3 text-gray-900 dark:text-white">Real-Time Cost Calculation</h3>
              <p className="text-gray-600 dark:text-gray-300">Automatically calculates timber costs based on quantity sold and current pricing. Ensures accurate pricing and profit tracking.</p>
            </div>

            {/* Feature 3 */}
            <div className="bg-gray-50 dark:bg-gray-700 p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow">
              <div className="h-12 w-12 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mb-4">
                <span className="text-blue-600 dark:text-blue-300 text-xl font-bold">3</span>
              </div>
              <h3 className="text-xl font-semibold mb-3 text-gray-900 dark:text-white">Smart Inventory Tracking</h3>
              <p className="text-gray-600 dark:text-gray-300">Tracks stock levels and sales in real time. Prevents miscalculations and improves efficiency.</p>
            </div>

            {/* Feature 4 */}
            <div className="bg-gray-50 dark:bg-gray-700 p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow">
              <div className="h-12 w-12 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mb-4">
                <span className="text-blue-600 dark:text-blue-300 text-xl font-bold">4</span>
              </div>
              <h3 className="text-xl font-semibold mb-3 text-gray-900 dark:text-white">Employee Salary Management</h3>
              <p className="text-gray-600 dark:text-gray-300">Balances employee records, salary calculations, and tax deductions. Reduces payroll errors and improves transparency.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 px-4 md:px-8 lg:px-16 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-4 text-gray-900 dark:text-white">Our Team</h2>
          <p className="text-center mb-12 text-gray-600 dark:text-gray-300">Group Number: Y3S2-WE-141</p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Team Member 1 */}
            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow">
              <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">W V D Lakshan</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">IT22560308</p>
              <p className="text-gray-600 dark:text-gray-300">Providing quotations for wooden designs. Obtaining and investigating cost estimates for wooden architectural designs.</p>
            </div>

            {/* Team Member 2 */}
            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow">
              <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">W A N D Perera</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">IT22072160</p>
              <p className="text-gray-600 dark:text-gray-300">Calculate the cost for the quantity sold from that timber. Managing timber sales and inventory.</p>
            </div>

            {/* Team Member 3 */}
            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow">
              <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">H M K B P B Rathninda</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">IT22275592</p>
              <p className="text-gray-600 dark:text-gray-300">Providing quotes for buildings. Obtaining and reviewing cost estimates for building designs.</p>
            </div>

            {/* Team Member 4 */}
            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow">
              <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">W.A.D.P Wanni Arachchi</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">IT22601056</p>
              <p className="text-gray-600 dark:text-gray-300">Balancing employee details and calculating salaries. Managing payroll and employee records.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Problems & Solutions Section */}
      <section className="py-16 px-4 md:px-8 lg:px-16 bg-white dark:bg-gray-800">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-900 dark:text-white">Problems We Solve</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-red-50 dark:bg-red-900/20 p-6 rounded-xl">
              <h3 className="text-xl font-semibold mb-4 text-red-600 dark:text-red-400">Current Challenges</h3>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <span className="h-6 w-6 bg-red-100 dark:bg-red-800 rounded-full flex items-center justify-center mr-3 mt-0.5">
                    <span className="text-red-600 dark:text-red-300 text-sm font-bold">1</span>
                  </span>
                  <p className="text-gray-700 dark:text-gray-300">Slow Quotation Process: Generating quotes for wooden and building designs takes time and is prone to errors.</p>
                </li>
                <li className="flex items-start">
                  <span className="h-6 w-6 bg-red-100 dark:bg-red-800 rounded-full flex items-center justify-center mr-3 mt-0.5">
                    <span className="text-red-600 dark:text-red-300 text-sm font-bold">2</span>
                  </span>
                  <p className="text-gray-700 dark:text-gray-300">Inaccurate Cost Estimation: Fluctuating material prices and outdated methods lead to pricing mistakes.</p>
                </li>
                <li className="flex items-start">
                  <span className="h-6 w-6 bg-red-100 dark:bg-red-800 rounded-full flex items-center justify-center mr-3 mt-0.5">
                    <span className="text-red-600 dark:text-red-300 text-sm font-bold">3</span>
                  </span>
                  <p className="text-gray-700 dark:text-gray-300">Poor Inventory Tracking: Manual stock management causes miscalculations and lack of real-time insights.</p>
                </li>
                <li className="flex items-start">
                  <span className="h-6 w-6 bg-red-100 dark:bg-red-800 rounded-full flex items-center justify-center mr-3 mt-0.5">
                    <span className="text-red-600 dark:text-red-300 text-sm font-bold">4</span>
                  </span>
                  <p className="text-gray-700 dark:text-gray-300">Payroll Issues: Manual salary calculations result in errors and inefficient employee record management.</p>
                </li>
              </ul>
            </div>
            <div className="bg-green-50 dark:bg-green-900/20 p-6 rounded-xl">
              <h3 className="text-xl font-semibold mb-4 text-green-600 dark:text-green-400">Our Solutions</h3>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <span className="h-6 w-6 bg-green-100 dark:bg-green-800 rounded-full flex items-center justify-center mr-3 mt-0.5">
                    <span className="text-green-600 dark:text-green-300 text-sm font-bold">1</span>
                  </span>
                  <p className="text-gray-700 dark:text-gray-300">Smart Quotation System: Generate instant quotes for wooden and building designs. Automates cost estimation.</p>
                </li>
                <li className="flex items-start">
                  <span className="h-6 w-6 bg-green-100 dark:bg-green-800 rounded-full flex items-center justify-center mr-3 mt-0.5">
                    <span className="text-green-600 dark:text-green-300 text-sm font-bold">2</span>
                  </span>
                  <p className="text-gray-700 dark:text-gray-300">Real-Time Cost Calculation: Automatically calculates timber costs based on quantity sold and current pricing.</p>
                </li>
                <li className="flex items-start">
                  <span className="h-6 w-6 bg-green-100 dark:bg-green-800 rounded-full flex items-center justify-center mr-3 mt-0.5">
                    <span className="text-green-600 dark:text-green-300 text-sm font-bold">3</span>
                  </span>
                  <p className="text-gray-700 dark:text-gray-300">Smart Inventory Tracking: Tracks stock levels and sales in real time. Prevents miscalculations.</p>
                </li>
                <li className="flex items-start">
                  <span className="h-6 w-6 bg-green-100 dark:bg-green-800 rounded-full flex items-center justify-center mr-3 mt-0.5">
                    <span className="text-green-600 dark:text-green-300 text-sm font-bold">4</span>
                  </span>
                  <p className="text-gray-700 dark:text-gray-300">Employee Salary Management: Balances employee records, salary calculations, and tax deductions.</p>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Technology Stack */}
      <section className="py-16 px-4 md:px-8 lg:px-16 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-900 dark:text-white">Technology Stack</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow-sm">
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Frontend</h3>
              <p className="text-gray-600 dark:text-gray-300">Next.js, React, Tailwind CSS</p>
            </div>
            <div className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow-sm">
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Backend</h3>
              <p className="text-gray-600 dark:text-gray-300">Node.js API routes, Convex</p>
            </div>
            <div className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow-sm">
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Database</h3>
              <p className="text-gray-600 dark:text-gray-300">Convex</p>
            </div>
            <div className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow-sm">
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Hosting</h3>
              <p className="text-gray-600 dark:text-gray-300">Vercel</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 md:px-8 lg:px-16 bg-blue-600 dark:bg-blue-800">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6 text-white">Ready to Transform Your Construction Business?</h2>
          <p className="text-xl mb-8 text-blue-100">Experience seamless business operations with smart analytics and automation.</p>
          <Link href="/contact" className="px-8 py-3 bg-white text-blue-600 rounded-lg hover:bg-gray-100 transition-colors font-medium inline-block">
            Contact Us
          </Link>
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
