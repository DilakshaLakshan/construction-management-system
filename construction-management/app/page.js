"use client";
import Image from "next/image";
import Link from "next/link";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "/components/ui/tabs.jsx";
import ClientImage from "/components/ClientImage";
import { useEffect, useState } from "react";
import { FiUser } from "react-icons/fi";

export default function Home() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user is logged in
    const token = localStorage.getItem("authToken");
    if (token) {
      // Validate the token
      const validateToken = async () => {
        try {
          const response = await fetch("/api/auth/validate", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ token }),
          });
          
          const data = await response.json();
          setIsLoggedIn(data.success);
        } catch (error) {
          console.error("Error validating token:", error);
          setIsLoggedIn(false);
        } finally {
          setLoading(false);
        }
      };
      
      validateToken();
    } else {
      setIsLoggedIn(false);
      setLoading(false);
    }
  }, []);
  return (
    <div className="min-h-screen bg-[#FFFFFF] text-[#191A19]">
      <div className="flex justify-end p-4">
        <div className="flex gap-4">
          {loading ? (
            <div className="animate-pulse h-10 w-20 bg-gray-200 rounded-lg"></div>
          ) : isLoggedIn ? (
            <Link 
              href="/profile" 
              className="flex items-center justify-center w-10 h-10 bg-[#FF7420] text-white rounded-full hover:bg-[#FF7420]/90 transition-colors"
            >
              <FiUser size={20} />
            </Link>
          ) : (
            <>
              <Link 
                href="/auth/login" 
                className="px-4 py-2 bg-[#FF7420] text-white rounded-lg hover:bg-[#FF7420]/90 transition-colors"
              >
                Login
              </Link>
              <Link 
                href="/auth/register" 
                className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-colors"
              >
                Register
              </Link>
            </>
          )}
        </div>
      </div>
      
      {/* Hero Section */}
      <section className="relative flex flex-col items-center justify-center py-16 px-4 md:px-8 lg:px-16 text-center">
        <div className="absolute inset-0 z-0 opacity-10">
        <ClientImage 
            src="/preencoded.jpg" 
            alt="Background Pattern" 
            fill={true} 
            style={{objectFit: "cover"}}
            priority={true}
            fallbackSrc="/fallback-image.png" // Provide a fallback image
          />
        </div>
        <div className="relative z-10 max-w-5xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 text-[#191A19]">
            Welcome to <span className="text-[#FF7420]">Vithanage Group</span>
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-gray-700">
            A modern digital platform for construction, woodcraft, and timber sales.
          </p>
        </div>
      </section>

      {/* Tabs Section */}
      <section className="py-8 px-4 md:px-8 lg:px-16 max-w-7xl mx-auto">
        <Tabs defaultValue="services" className="w-full">
          <TabsList className="grid w-full grid-cols-3 bg-gray-100 rounded-xl p-1">
            <TabsTrigger 
              value="services" 
              className="data-[state=active]:bg-[#FF7420] data-[state=active]:text-white rounded-lg py-3"
            >
              Our Services
            </TabsTrigger>
            <TabsTrigger 
              value="projects" 
              className="data-[state=active]:bg-[#FF7420] data-[state=active]:text-white rounded-lg py-3"
            >
              Projects
            </TabsTrigger>
            <TabsTrigger 
              value="team" 
              className="data-[state=active]:bg-[#FF7420] data-[state=active]:text-white rounded-lg py-3"
            >
              Our Team
            </TabsTrigger>
          </TabsList>
          
          {/* Services Tab Content */}
          <TabsContent value="services" className="mt-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* Service 1 */}
              <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow border-t-4 border-[#FF7420] group hover:-translate-y-2 transition-transform duration-300">
                <div className="h-16 w-16 bg-[#FF7420]/10 rounded-full flex items-center justify-center mb-6 group-hover:bg-[#FF7420]/20 transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-[#FF7420]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-3 text-[#191A19]">Construction Management</h3>
                <p className="text-gray-600 mb-4">Comprehensive construction project management with real-time tracking, resource allocation, and timeline management.</p>
                <Link href="/Construction/Cfront" className="text-[#FF7420] font-medium hover:underline inline-flex items-center">
                  Learn more
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>

              {/* Service 2 */}
              <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow border-t-4 border-[#FF7420] group hover:-translate-y-2 transition-transform duration-300">
                <div className="h-16 w-16 bg-[#FF7420]/10 rounded-full flex items-center justify-center mb-6 group-hover:bg-[#FF7420]/20 transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-[#FF7420]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-3 text-[#191A19]">Quotation System</h3>
                <p className="text-gray-600 mb-4">Automated quotation generation for wooden designs and construction projects with accurate cost estimation.</p>
                <Link href="/services/quotation" className="text-[#FF7420] font-medium hover:underline inline-flex items-center">
                  Learn more
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>

              {/* Service 3 */}
              <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow border-t-4 border-[#FF7420] group hover:-translate-y-2 transition-transform duration-300">
                <div className="h-16 w-16 bg-[#FF7420]/10 rounded-full flex items-center justify-center mb-6 group-hover:bg-[#FF7420]/20 transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-[#FF7420]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 8v8m-4-5v5m-4-2v2m-2 4h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-3 text-[#191A19]">Inventory Management</h3>
                <p className="text-gray-600 mb-4">Real-time inventory tracking for timber and construction materials with automated alerts and reporting.</p>
                <Link href="\timber" className="text-[#FF7420] font-medium hover:underline inline-flex items-center">
                  Learn more
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>

              {/* Service 4 */}
              <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow border-t-4 border-[#FF7420] group hover:-translate-y-2 transition-transform duration-300">
                <div className="h-16 w-16 bg-[#FF7420]/10 rounded-full flex items-center justify-center mb-6 group-hover:bg-[#FF7420]/20 transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-[#FF7420]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-3 text-[#191A19]">Payroll Management</h3>
                <p className="text-gray-600 mb-4">Comprehensive employee salary management with automated tax calculations and payment processing.</p>
                <Link href="/services/payroll" className="text-[#FF7420] font-medium hover:underline inline-flex items-center">
                  Learn more
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>

              {/* Service 5 */}
              <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow border-t-4 border-[#FF7420] group hover:-translate-y-2 transition-transform duration-300">
                <div className="h-16 w-16 bg-[#FF7420]/10 rounded-full flex items-center justify-center mb-6 group-hover:bg-[#FF7420]/20 transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-[#FF7420]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-3 text-[#191A19]">Analytics Dashboard</h3>
                <p className="text-gray-600 mb-4">Comprehensive business analytics with customizable reports and real-time performance tracking.</p>
                <Link href="/services/analytics" className="text-[#FF7420] font-medium hover:underline inline-flex items-center">
                  Learn more
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>

              {/* Service 6 */}
              <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow border-t-4 border-[#FF7420] group hover:-translate-y-2 transition-transform duration-300">
                <div className="h-16 w-16 bg-[#FF7420]/10 rounded-full flex items-center justify-center mb-6 group-hover:bg-[#FF7420]/20 transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-[#FF7420]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-3 text-[#191A19]">Financial Management</h3>
                <p className="text-gray-600 mb-4">Complete financial tracking with expense management, invoicing, and budget forecasting tools.</p>
                <Link href="/services/financial" className="text-[#FF7420] font-medium hover:underline inline-flex items-center">
                  Learn more
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
            </div>
          </TabsContent>
          
          {/* Projects Tab Content */}
          <TabsContent value="projects" className="mt-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* Project 1 */}
              <div className="group relative overflow-hidden rounded-xl shadow-lg">
                <div className="relative h-64 w-full overflow-hidden">
                <ClientImage 
            src="/preencoded.jpg" 
            alt="Background Pattern" 
            fill={true} 
            style={{objectFit: "cover"}}
            priority={true}
            fallbackSrc="/fallback-image.png" // Provide a fallback image
          />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <span className="inline-block px-3 py-1 text-xs font-semibold bg-[#FF7420] text-white rounded-full mb-2">Residential</span>
                  <h3 className="text-xl font-bold text-white mb-2">Luxury Villa Project</h3>
                  <p className="text-gray-200 text-sm mb-3">A modern luxury villa with custom woodwork and premium finishes.</p>
                  <Link href="/projects/luxury-villa" className="text-white font-medium hover:text-[#FF7420] transition-colors inline-flex items-center">
                    View Project
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </Link>
                </div>
              </div>

              {/* Project 2 */}
              <div className="group relative overflow-hidden rounded-xl shadow-lg">
                <div className="relative h-64 w-full overflow-hidden">
                <ClientImage 
            src="/preencoded.jpg" 
            alt="Background Pattern" 
            fill={true} 
            style={{objectFit: "cover"}}
            priority={true}
            fallbackSrc="/fallback-image.png" // Provide a fallback image
          />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <span className="inline-block px-3 py-1 text-xs font-semibold bg-[#FF7420] text-white rounded-full mb-2">Commercial</span>
                  <h3 className="text-xl font-bold text-white mb-2">Office Complex</h3>
                  <p className="text-gray-200 text-sm mb-3">A state-of-the-art office complex with sustainable design elements.</p>
                  <Link href="/projects/office-complex" className="text-white font-medium hover:text-[#FF7420] transition-colors inline-flex items-center">
                    View Project
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </Link>
                </div>
              </div>

              {/* Project 3 */}
              <div className="group relative overflow-hidden rounded-xl shadow-lg">
                <div className="relative h-64 w-full overflow-hidden">
                <ClientImage 
            src="/preencoded.jpg" 
            alt="Background Pattern" 
            fill={true} 
            style={{objectFit: "cover"}}
            priority={true}
            fallbackSrc="/fallback-image.png" // Provide a fallback image
          />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <span className="inline-block px-3 py-1 text-xs font-semibold bg-[#FF7420] text-white rounded-full mb-2">Woodcraft</span>
                  <h3 className="text-xl font-bold text-white mb-2">Custom Furniture Collection</h3>
                  <p className="text-gray-200 text-sm mb-3">Handcrafted premium furniture collection for luxury hotels.</p>
                  <Link href="/projects/furniture-collection" className="text-white font-medium hover:text-[#FF7420] transition-colors inline-flex items-center">
                    View Project
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </Link>
                </div>
              </div>

              {/* Project 4 */}
              <div className="group relative overflow-hidden rounded-xl shadow-lg">
                <div className="relative h-64 w-full overflow-hidden">
                <ClientImage 
            src="/preencoded.jpg" 
            alt="Background Pattern" 
            fill={true} 
            style={{objectFit: "cover"}}
            priority={true}
            fallbackSrc="/fallback-image.png" // Provide a fallback image
          />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <span className="inline-block px-3 py-1 text-xs font-semibold bg-[#FF7420] text-white rounded-full mb-2">Residential</span>
                  <h3 className="text-xl font-bold text-white mb-2">Apartment Complex</h3>
                  <p className="text-gray-200 text-sm mb-3">Modern apartment complex with integrated smart home technology.</p>
                  <Link href="/projects/apartment-complex" className="text-white font-medium hover:text-[#FF7420] transition-colors inline-flex items-center">
                    View Project
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </Link>
                </div>
              </div>

              {/* Project 5 */}
              <div className="group relative overflow-hidden rounded-xl shadow-lg">
                <div className="relative h-64 w-full overflow-hidden">
                <ClientImage 
            src="/preencoded.jpg" 
            alt="Background Pattern" 
            fill={true} 
            style={{objectFit: "cover"}}
            priority={true}
            fallbackSrc="/fallback-image.png" // Provide a fallback image
          />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <span className="inline-block px-3 py-1 text-xs font-semibold bg-[#FF7420] text-white rounded-full mb-2">Timber</span>
                  <h3 className="text-xl font-bold text-white mb-2">Sustainable Timber Supply</h3>
                  <p className="text-gray-200 text-sm mb-3">Eco-friendly timber sourcing and processing for construction projects.</p>
                  <Link href="/projects/timber-supply" className="text-white font-medium hover:text-[#FF7420] transition-colors inline-flex items-center">
                    View Project
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </Link>
                </div>
              </div>

              {/* Project 6 */}
              <div className="group relative overflow-hidden rounded-xl shadow-lg">
                <div className="relative h-64 w-full overflow-hidden">
                <ClientImage 
            src="/preencoded.jpg" 
            alt="Background Pattern" 
            fill={true} 
            style={{objectFit: "cover"}}
            priority={true}
            fallbackSrc="/fallback-image.png" // Provide a fallback image
          />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <span className="inline-block px-3 py-1 text-xs font-semibold bg-[#FF7420] text-white rounded-full mb-2">Renovation</span>
                  <h3 className="text-xl font-bold text-white mb-2">Luxury Hotel Renovation</h3>
                  <p className="text-gray-200 text-sm mb-3">Complete renovation of a historic hotel with modern amenities.</p>
                  <Link href="/projects/hotel-renovation" className="text-white font-medium hover:text-[#FF7420] transition-colors inline-flex items-center">
                    View Project
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </Link>
                </div>
              </div>
            </div>
          </TabsContent>
          
          {/* Team Tab Content */}
          <TabsContent value="team" className="mt-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {/* Team Member 1 */}
              <div className="bg-white rounded-xl shadow-lg overflow-hidden group">
                <div className="relative h-64 w-full overflow-hidden">
                <ClientImage 
            src="/preencoded.jpg" 
            alt="Background Pattern" 
            fill={true} 
            style={{objectFit: "cover"}}
            priority={true}
            fallbackSrc="/fallback-image.png" // Provide a fallback image
          />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-1 text-[#191A19]">W V D Lakshan</h3>
                  <p className="text-[#FF7420] font-medium mb-3">IT22560308</p>
                  <p className="text-gray-600 mb-4">Providing quotations for wooden designs. Obtaining and investigating cost estimates for wooden architectural designs.</p>
                  <div className="flex space-x-3">
                    <a href="#" className="text-gray-500 hover:text-[#FF7420]">
                      <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                      </svg>
                    </a>
                    <a href="#" className="text-gray-500 hover:text-[#FF7420]">
                      <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                      </svg>
                    </a>
                    <a href="#" className="text-gray-500 hover:text-[#FF7420]">
                      <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                      </svg>
                    </a>
                    <a href="#" className="text-gray-500 hover:text-[#FF7420]">
                      <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path fillRule="evenodd" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10c5.51 0 10-4.48 10-10S17.51 2 12 2zm6.605 4.61a8.502 8.502 0 011.93 5.314c-.281-.054-3.101-.629-5.943-.271-.065-.141-.12-.293-.184-.445a25.416 25.416 0 00-.564-1.236c3.145-1.28 4.577-3.124 4.761-3.362zM12 3.475c2.17 0 4.154.813 5.662 2.148-.152.216-1.443 1.941-4.48 3.08-1.399-2.57-2.95-4.675-3.189-5A8.687 8.687 0 0112 3.475zm-3.633.803a53.896 53.896 0 013.167 4.935c-3.992 1.063-7.517 1.04-7.896 1.04a8.581 8.581 0 014.729-5.975zM3.453 12.01v-.26c.37.01 4.512.065 8.775-1.215.25.477.477.965.694 1.453-.109.033-.228.065-.336.098-4.404 1.42-6.747 5.303-6.942 5.629a8.522 8.522 0 01-2.19-5.705zM12 20.547a8.482 8.482 0 01-5.239-1.8c.152-.315 1.888-3.656 6.703-5.337.022-.01.033-.01.054-.022a35.318 35.318 0 011.823 6.475 8.4 8.4 0 01-3.341.684zm4.761-1.465c-.086-.52-.542-3.015-1.659-6.084 2.679-.423 5.022.271 5.314.369a8.468 8.468 0 01-3.655 5.715z" clipRule="evenodd" />
                      </svg>
                    </a>
                  </div>
                </div>
              </div>

              {/* Team Member 2 */}
              <div className="bg-white rounded-xl shadow-lg overflow-hidden group">
                <div className="relative h-64 w-full overflow-hidden">
                <ClientImage 
            src="/preencoded.jpg" 
            alt="Background Pattern" 
            fill={true} 
            style={{objectFit: "cover"}}
            priority={true}
            fallbackSrc="/fallback-image.png" // Provide a fallback image
          />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-1 text-[#191A19]">W A N D Perera</h3>
                  <p className="text-[#FF7420] font-medium mb-3">IT22072160</p>
                  <p className="text-gray-600 mb-4">Calculate the cost for the quantity sold from that timber. Managing timber sales and inventory.</p>
                  <div className="flex space-x-3">
                    <a href="#" className="text-gray-500 hover:text-[#FF7420]">
                      <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                      </svg>
                    </a>
                    <a href="#" className="text-gray-500 hover:text-[#FF7420]">
                      <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                      </svg>
                    </a>
                    <a href="#" className="text-gray-500 hover:text-[#FF7420]">
                      <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                      </svg>
                    </a>
                    <a href="#" className="text-gray-500 hover:text-[#FF7420]">
                      <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path fillRule="evenodd" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10c5.51 0 10-4.48 10-10S17.51 2 12 2zm6.605 4.61a8.502 8.502 0 011.93 5.314c-.281-.054-3.101-.629-5.943-.271-.065-.141-.12-.293-.184-.445a25.416 25.416 0 00-.564-1.236c3.145-1.28 4.577-3.124 4.761-3.362zM12 3.475c2.17 0 4.154.813 5.662 2.148-.152.216-1.443 1.941-4.48 3.08-1.399-2.57-2.95-4.675-3.189-5A8.687 8.687 0 0112 3.475zm-3.633.803a53.896 53.896 0 013.167 4.935c-3.992 1.063-7.517 1.04-7.896 1.04a8.581 8.581 0 014.729-5.975zM3.453 12.01v-.26c.37.01 4.512.065 8.775-1.215.25.477.477.965.694 1.453-.109.033-.228.065-.336.098-4.404 1.42-6.747 5.303-6.942 5.629a8.522 8.522 0 01-2.19-5.705zM12 20.547a8.482 8.482 0 01-5.239-1.8c.152-.315 1.888-3.656 6.703-5.337.022-.01.033-.01.054-.022a35.318 35.318 0 011.823 6.475 8.4 8.4 0 01-3.341.684zm4.761-1.465c-.086-.52-.542-3.015-1.659-6.084 2.679-.423 5.022.271 5.314.369a8.468 8.468 0 01-3.655 5.715z" clipRule="evenodd" />
                      </svg>
                    </a>
                  </div>
                </div>
              </div>

              {/* Team Member 3 */}
              <div className="bg-white rounded-xl shadow-lg overflow-hidden group">
                <div className="relative h-64 w-full overflow-hidden">
                <ClientImage 
            src="/preencoded.jpg" 
            alt="Background Pattern" 
            fill={true} 
            style={{objectFit: "cover"}}
            priority={true}
            fallbackSrc="/fallback-image.png" // Provide a fallback image
          />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-1 text-[#191A19]">H M K B P B Rathninda</h3>
                  <p className="text-[#FF7420] font-medium mb-3">IT22275592</p>
                  <p className="text-gray-600 mb-4">Providing quotes for buildings. Obtaining and reviewing cost estimates for building designs.</p>
                  <div className="flex space-x-3">
                    <a href="#" className="text-gray-500 hover:text-[#FF7420]">
                      <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                      </svg>
                    </a>
                    <a href="#" className="text-gray-500 hover:text-[#FF7420]">
                      <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                      </svg>
                    </a>
                    <a href="#" className="text-gray-500 hover:text-[#FF7420]">
                      <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                      </svg>
                    </a>
                    <a href="#" className="text-gray-500 hover:text-[#FF7420]">
                      <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path fillRule="evenodd" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10c5.51 0 10-4.48 10-10S17.51 2 12 2zm6.605 4.61a8.502 8.502 0 011.93 5.314c-.281-.054-3.101-.629-5.943-.271-.065-.141-.12-.293-.184-.445a25.416 25.416 0 00-.564-1.236c3.145-1.28 4.577-3.124 4.761-3.362zM12 3.475c2.17 0 4.154.813 5.662 2.148-.152.216-1.443 1.941-4.48 3.08-1.399-2.57-2.95-4.675-3.189-5A8.687 8.687 0 0112 3.475zm-3.633.803a53.896 53.896 0 013.167 4.935c-3.992 1.063-7.517 1.04-7.896 1.04a8.581 8.581 0 014.729-5.975zM3.453 12.01v-.26c.37.01 4.512.065 8.775-1.215.25.477.477.965.694 1.453-.109.033-.228.065-.336.098-4.404 1.42-6.747 5.303-6.942 5.629a8.522 8.522 0 01-2.19-5.705zM12 20.547a8.482 8.482 0 01-5.239-1.8c.152-.315 1.888-3.656 6.703-5.337.022-.01.033-.01.054-.022a35.318 35.318 0 011.823 6.475 8.4 8.4 0 01-3.341.684zm4.761-1.465c-.086-.52-.542-3.015-1.659-6.084 2.679-.423 5.022.271 5.314.369a8.468 8.468 0 01-3.655 5.715z" clipRule="evenodd" />
                      </svg>
                    </a>
                  </div>
                </div>
              </div>

              {/* Team Member 4 */}
              <div className="bg-white rounded-xl shadow-lg overflow-hidden group">
                <div className="relative h-64 w-full overflow-hidden">
                <ClientImage 
            src="/preencoded.jpg" 
            alt="Background Pattern" 
            fill={true} 
            style={{objectFit: "cover"}}
            priority={true}
            fallbackSrc="/fallback-image.png" // Provide a fallback image
          />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-1 text-[#191A19]">W.A.D.P Wanni Arachchi</h3>
                  <p className="text-[#FF7420] font-medium mb-3">IT22601056</p>
                  <p className="text-gray-600 mb-4">Balancing employee details and calculating salaries. Managing payroll and employee records.</p>
                  <div className="flex space-x-3">
                    <a href="#" className="text-gray-500 hover:text-[#FF7420]">
                      <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                      </svg>
                    </a>
                    <a href="#" className="text-gray-500 hover:text-[#FF7420]">
                      <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                      </svg>
                    </a>
                    <a href="#" className="text-gray-500 hover:text-[#FF7420]">
                      <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                      </svg>
                    </a>
                    <a href="#" className="text-gray-500 hover:text-[#FF7420]">
                      <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path fillRule="evenodd" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10c5.51 0 10-4.48 10-10S17.51 2 12 2zm6.605 4.61a8.502 8.502 0 011.93 5.314c-.281-.054-3.101-.629-5.943-.271-.065-.141-.12-.293-.184-.445a25.416 25.416 0 00-.564-1.236c3.145-1.28 4.577-3.124 4.761-3.362zM12 3.475c2.17 0 4.154.813 5.662 2.148-.152.216-1.443 1.941-4.48 3.08-1.399-2.57-2.95-4.675-3.189-5A8.687 8.687 0 0112 3.475zm-3.633.803a53.896 53.896 0 013.167 4.935c-3.992 1.063-7.517 1.04-7.896 1.04a8.581 8.581 0 014.729-5.975zM3.453 12.01v-.26c.37.01 4.512.065 8.775-1.215.25.477.477.965.694 1.453-.109.033-.228.065-.336.098-4.404 1.42-6.747 5.303-6.942 5.629a8.522 8.522 0 01-2.19-5.705zM12 20.547a8.482 8.482 0 01-5.239-1.8c.152-.315 1.888-3.656 6.703-5.337.022-.01.033-.01.054-.022a35.318 35.318 0 011.823 6.475 8.4 8.4 0 01-3.341.684zm4.761-1.465c-.086-.52-.542-3.015-1.659-6.084 2.679-.423 5.022.271 5.314.369a8.468 8.468 0 01-3.655 5.715z" clipRule="evenodd" />
                      </svg>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 md:px-8 lg:px-16 bg-[#FF7420]">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6 text-white">Ready to Transform Your Construction Business?</h2>
          <p className="text-xl mb-8 text-white/90">Experience seamless business operations with smart analytics and automation.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/quotations" className="px-8 py-3 bg-white text-[#FF7420] rounded-lg hover:bg-gray-100 transition-colors font-medium">
              Get Started
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
