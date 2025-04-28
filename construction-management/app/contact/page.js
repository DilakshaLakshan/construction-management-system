import Image from "next/image";
import Link from "next/link";
import { UserButton } from '@stackframe/stack';

export default function Contact() {
  return (
    <div className="min-h-screen bg-[#191A19] text-[#FFFFFF]">
      {/* Header with User Button */}
      <div className="flex justify-end p-4">
        <UserButton />
      </div>

      {/* Contact Hero Section */}
      <section className="relative flex flex-col items-center justify-center py-16 px-4 md:px-8 lg:px-16 text-center">
        <div className="absolute inset-0 z-0 opacity-10">
          <Image 
            src="/preencoded.jpg" 
            alt="Background Pattern" 
            fill 
            style={{objectFit: "cover"}}
            priority
          />
        </div>
        <div className="relative z-10 max-w-5xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 text-white">
            Contact <span className="text-[#FF7420]">Vithanage Group</span>
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-gray-300">
            Get in touch with our team for inquiries, quotes, or support.
          </p>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="py-12 px-4 md:px-8 lg:px-16">
        <div className="max-w-4xl mx-auto bg-[#191A19] border border-[#FF7420]/30 rounded-xl p-8 shadow-lg">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* Contact Information */}
            <div>
              <h2 className="text-2xl font-bold mb-6 text-white">Contact Information</h2>
              <div className="space-y-6">
                <div>
                  <h3 className="text-[#FF7420] font-semibold mb-2">Address</h3>
                  <p className="text-gray-300">123 Construction Avenue, Colombo, Sri Lanka</p>
                </div>
                <div>
                  <h3 className="text-[#FF7420] font-semibold mb-2">Phone</h3>
                  <p className="text-gray-300">+94 11 234 5678</p>
                </div>
                <div>
                  <h3 className="text-[#FF7420] font-semibold mb-2">Email</h3>
                  <p className="text-gray-300">info@vithanagegroup.com</p>
                </div>
                <div>
                  <h3 className="text-[#FF7420] font-semibold mb-2">Working Hours</h3>
                  <p className="text-gray-300">Monday - Friday: 8:00 AM - 6:00 PM</p>
                  <p className="text-gray-300">Saturday: 8:00 AM - 1:00 PM</p>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div>
              <h2 className="text-2xl font-bold mb-6 text-white">Send us a Message</h2>
              <form className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-gray-300 mb-2">Full Name</label>
                  <input 
                    type="text" 
                    id="name" 
                    className="w-full bg-[#232423] border border-[#FF7420]/30 rounded-lg p-3 text-white focus:outline-none focus:border-[#FF7420]"
                    placeholder="Your name"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-gray-300 mb-2">Email Address</label>
                  <input 
                    type="email" 
                    id="email" 
                    className="w-full bg-[#232423] border border-[#FF7420]/30 rounded-lg p-3 text-white focus:outline-none focus:border-[#FF7420]"
                    placeholder="Your email"
                  />
                </div>
                <div>
                  <label htmlFor="subject" className="block text-gray-300 mb-2">Subject</label>
                  <input 
                    type="text" 
                    id="subject" 
                    className="w-full bg-[#232423] border border-[#FF7420]/30 rounded-lg p-3 text-white focus:outline-none focus:border-[#FF7420]"
                    placeholder="Subject"
                  />
                </div>
                <div>
                  <label htmlFor="message" className="block text-gray-300 mb-2">Message</label>
                  <textarea 
                    id="message" 
                    rows="5" 
                    className="w-full bg-[#232423] border border-[#FF7420]/30 rounded-lg p-3 text-white focus:outline-none focus:border-[#FF7420]"
                    placeholder="Your message"
                  ></textarea>
                </div>
                <button 
                  type="submit" 
                  className="px-6 py-3 bg-[#FF7420] text-white rounded-lg hover:bg-opacity-90 transition-all transform hover:scale-105 font-medium shadow-lg"
                >
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-12 px-4 md:px-8 lg:px-16">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl font-bold mb-6 text-white text-center">Find Us</h2>
          <div className="bg-[#232423] border border-[#FF7420]/30 rounded-xl p-4 h-80 flex items-center justify-center">
            <p className="text-gray-400">Map will be displayed here</p>
            {/* You would typically integrate Google Maps or another map service here */}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-4 md:px-8 lg:px-16 bg-[#191A19] text-white border-t border-[#FF7420]/30 mt-12">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <h3 className="text-xl font-bold">Vithanage Group</h3>
              <p className="text-gray-400">Construction Management System</p>
            </div>
            <div className="flex space-x-4">
              <Link href="/about" className="text-gray-300 hover:text-[#FF7420] transition-colors">About</Link>
              <Link href="/services" className="text-gray-300 hover:text-[#FF7420] transition-colors">Services</Link>
              <Link href="/" className="text-gray-300 hover:text-[#FF7420] transition-colors">Home</Link>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-gray-800 text-center text-gray-400">
            <p>© {new Date().getFullYear()} Vithanage Group. All rights reserved.</p>
            <p className="mt-2 text-sm">Group Number: Y3S2-WE-141</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
