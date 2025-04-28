import Image from "next/image";
import Link from "next/link";
import { UserButton } from '@stackframe/stack';

export default function About() {
  return (
    <div className="min-h-screen bg-[#191A19] text-[#FFFFFF]">
      {/* Header with User Button */}
      <div className="flex justify-end p-4">
        <UserButton />
      </div>

      {/* About Hero Section */}
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
            About <span className="text-[#FF7420]">Vithanage Group</span>
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-gray-300">
            Our story, mission, and commitment to excellence in construction and woodcraft.
          </p>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="py-12 px-4 md:px-8 lg:px-16">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6 text-white">Our Story</h2>
              <p className="text-gray-300 mb-4">
                Founded in 2005, Vithanage Group began as a small family-owned timber supplier in the heart of Sri Lanka. With a passion for quality materials and craftsmanship, we quickly expanded our services to include woodcraft and construction.
              </p>
              <p className="text-gray-300 mb-4">
                Over the years, we've grown into a comprehensive construction and timber solutions provider, serving clients across the country with the same dedication to quality that defined our humble beginnings.
              </p>
              <p className="text-gray-300">
                Today, we combine traditional craftsmanship with modern technology to deliver exceptional results for our clients, whether they need custom furniture, building materials, or complete construction services.
              </p>
            </div>
            <div className="bg-[#232423] border border-[#FF7420]/30 rounded-xl p-4 h-80 flex items-center justify-center">
              <div className="text-center text-gray-400">
                <p>Company History Image</p>
                <p className="text-sm mt-2">(Placeholder for company timeline or founders image)</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision Section */}
      <section className="py-12 px-4 md:px-8 lg:px-16 bg-[#191A19] bg-opacity-80">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12 text-white">Our Mission & Vision</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Mission */}
            <div className="bg-[#191A19] border border-[#FF7420] p-6 rounded-xl shadow-lg hover:shadow-[#FF7420]/20 transition-all">
              <div className="h-12 w-12 bg-[#FF7420] rounded-full flex items-center justify-center mb-4">
                <span className="text-white text-xl font-bold">M</span>
              </div>
              <h3 className="text-xl font-semibold mb-3 text-white">Our Mission</h3>
              <p className="text-gray-300">
                To provide high-quality construction, woodcraft, and timber solutions that exceed client expectations through innovation, craftsmanship, and sustainable practices. We aim to deliver projects on time and within budget while maintaining the highest standards of quality and safety.
              </p>
            </div>

            {/* Vision */}
            <div className="bg-[#191A19] border border-[#FF7420] p-6 rounded-xl shadow-lg hover:shadow-[#FF7420]/20 transition-all">
              <div className="h-12 w-12 bg-[#FF7420] rounded-full flex items-center justify-center mb-4">
                <span className="text-white text-xl font-bold">V</span>
              </div>
              <h3 className="text-xl font-semibold mb-3 text-white">Our Vision</h3>
              <p className="text-gray-300">
                To be the leading construction and timber solutions provider in Sri Lanka, recognized for our commitment to excellence, innovation, and sustainability. We envision a future where our work contributes to beautiful, functional, and environmentally responsible spaces for generations to come.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Our Values Section */}
      <section className="py-12 px-4 md:px-8 lg:px-16">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12 text-white">Our Core Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Value 1 */}
            <div className="bg-[#191A19] border border-[#FF7420]/30 p-6 rounded-xl shadow-lg">
              <h3 className="text-xl font-semibold mb-3 text-[#FF7420]">Quality</h3>
              <p className="text-gray-300">
                We never compromise on the quality of our materials, craftsmanship, or service. Excellence is our standard in everything we do.
              </p>
            </div>

            {/* Value 2 */}
            <div className="bg-[#191A19] border border-[#FF7420]/30 p-6 rounded-xl shadow-lg">
              <h3 className="text-xl font-semibold mb-3 text-[#FF7420]">Integrity</h3>
              <p className="text-gray-300">
                We conduct our business with honesty, transparency, and ethical practices, building trust with our clients, partners, and employees.
              </p>
            </div>

            {/* Value 3 */}
            <div className="bg-[#191A19] border border-[#FF7420]/30 p-6 rounded-xl shadow-lg">
              <h3 className="text-xl font-semibold mb-3 text-[#FF7420]">Innovation</h3>
              <p className="text-gray-300">
                We continuously seek new methods, technologies, and solutions to improve our services and deliver greater value to our clients.
              </p>
            </div>

            {/* Value 4 */}
            <div className="bg-[#191A19] border border-[#FF7420]/30 p-6 rounded-xl shadow-lg">
              <h3 className="text-xl font-semibold mb-3 text-[#FF7420]">Sustainability</h3>
              <p className="text-gray-300">
                We are committed to environmentally responsible practices in our sourcing, production, and construction methods.
              </p>
            </div>

            {/* Value 5 */}
            <div className="bg-[#191A19] border border-[#FF7420]/30 p-6 rounded-xl shadow-lg">
              <h3 className="text-xl font-semibold mb-3 text-[#FF7420]">Customer Focus</h3>
              <p className="text-gray-300">
                We prioritize understanding and meeting our clients' needs, ensuring their satisfaction with every project.
              </p>
            </div>

            {/* Value 6 */}
            <div className="bg-[#191A19] border border-[#FF7420]/30 p-6 rounded-xl shadow-lg">
              <h3 className="text-xl font-semibold mb-3 text-[#FF7420]">Teamwork</h3>
              <p className="text-gray-300">
                We value collaboration, respect, and the diverse skills and perspectives of our team members.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-12 px-4 md:px-8 lg:px-16 bg-[#191A19] bg-opacity-90">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12 text-white">Our Leadership Team</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Team Member 1 */}
            <div className="bg-[#191A19] border border-[#FF7420]/30 p-6 rounded-xl shadow-lg text-center">
              <div className="h-24 w-24 bg-[#FF7420]/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-[#FF7420] text-2xl font-bold">RV</span>
              </div>
              <h3 className="text-xl font-semibold mb-1 text-white">Rajith Vithanage</h3>
              <p className="text-[#FF7420] mb-3">Founder & CEO</p>
              <p className="text-gray-300 text-sm">
                With over 20 years of experience in construction and timber, Rajith leads our company with vision and expertise.
              </p>
            </div>

            {/* Team Member 2 */}
            <div className="bg-[#191A19] border border-[#FF7420]/30 p-6 rounded-xl shadow-lg text-center">
              <div className="h-24 w-24 bg-[#FF7420]/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-[#FF7420] text-2xl font-bold">SP</span>
              </div>
              <h3 className="text-xl font-semibold mb-1 text-white">Samantha Perera</h3>
              <p className="text-[#FF7420] mb-3">Operations Director</p>
              <p className="text-gray-300 text-sm">
                Samantha oversees our day-to-day operations, ensuring efficiency and excellence in all our projects.
              </p>
            </div>

            {/* Team Member 3 */}
            <div className="bg-[#191A19] border border-[#FF7420]/30 p-6 rounded-xl shadow-lg text-center">
              <div className="h-24 w-24 bg-[#FF7420]/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-[#FF7420] text-2xl font-bold">KF</span>
              </div>
              <h3 className="text-xl font-semibold mb-1 text-white">Kumara Fernando</h3>
              <p className="text-[#FF7420] mb-3">Head of Woodcraft</p>
              <p className="text-gray-300 text-sm">
                A master craftsman with an eye for detail, Kumara leads our woodcraft division with creativity and precision.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 md:px-8 lg:px-16 bg-[#FF7420]">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6 text-white">Ready to Work With Us?</h2>
          <p className="text-xl mb-8 text-white opacity-90">Let's discuss how we can bring your construction or woodcraft project to life.</p>
          <Link href="/contact" className="px-8 py-3 bg-white text-[#FF7420] rounded-lg hover:bg-opacity-90 transition-all transform hover:scale-105 font-medium inline-block shadow-lg">
            Get in Touch
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-4 md:px-8 lg:px-16 bg-[#191A19] text-white border-t border-[#FF7420]/30">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <h3 className="text-xl font-bold">Vithanage Group</h3>
              <p className="text-gray-400">Construction Management System</p>
            </div>
            <div className="flex space-x-4">
              <Link href="/" className="text-gray-300 hover:text-[#FF7420] transition-colors">Home</Link>
              <Link href="/services" className="text-gray-300 hover:text-[#FF7420] transition-colors">Services</Link>
              <Link href="/contact" className="text-gray-300 hover:text-[#FF7420] transition-colors">Contact</Link>
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
