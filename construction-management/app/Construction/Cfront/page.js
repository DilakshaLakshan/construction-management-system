"use client";
import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { FaTools, FaHardHat, FaProjectDiagram } from "react-icons/fa";
import { FiBell, FiSearch } from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";

const sliderImages = [
  "/Construction/images/slider1.jpg",
  "/Construction/images/a.jpg",
  "/Construction/images/sli.jpg",
];

const insights = [
  { label: "Active Projects", value: 12, change: "8%", up: true },
  { label: "Pending Tasks", value: 24, change: "5%", up: false },
  { label: "Material Orders", value: 37, change: "12%", up: true },
  { label: "Team Members", value: 48, change: "3%", up: true },
];

const tools = [
  {
    icon: FaTools,
    title: "Materials Management",
    desc: "Track, order, and manage construction materials with real-time inventory updates",
    href: "/Construction/material-form",
  },
  {
    icon: FaHardHat,
    title: "Labor Management",
    desc: "Schedule workers, track hours, and manage team assignments efficiently",
    href: "/Construction/labour-page",
  },
  {
    icon: FaProjectDiagram,
    title: "Project Management",
    desc: "Monitor project timelines, budgets, and milestones in one central location",
    href: "/Construction/projectUi",
  },
];

export default function ConstructionFrontPage() {
  const router = useRouter();
  const [currentIndex, setCurrentIndex] = useState(0);

  // Navigation items with explicit routes
  const navItems = [
    { label: "Dashboard", href: "/Construction/Cfront" },
    { label: "Projects", href: "/Construction/projectUi" },
    { label: "Materials", href: "/Construction/material-form" },
    { label: "Labor", href: "/Construction/labour-page" },
    { label: "Reports", href: "/Construction/report" },
  ];

  // Slider auto-advance
  useEffect(() => {
    const timer = setInterval(
      () => setCurrentIndex((i) => (i + 1) % sliderImages.length),
      6000
    );
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="min-h-screen bg-[#1f2937] text-gray-100 flex flex-col">
      {/* Header */}
      <motion.header
        initial={{ y: -60, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="fixed top-0 w-full z-50 backdrop-blur-sm bg-opacity-50 bg-[#111827] border-b border-gray-700"
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between px-8 py-4">
          {/* Logo */}
          <Link
            href="/Construction/Cfront"
            className="flex items-center space-x-3"
          >
            <div className="w-10 h-10 bg-indigo-600 flex items-center justify-center rounded-lg">
              <span className="text-xl font-bold text-white">AD</span>
            </div>
            <span className="text-xl font-semibold text-white">
               Admin
            </span>
          </Link>

          {/* Nav Links */}
          <nav className="hidden lg:flex space-x-8">
            {navItems.map(({ label, href }) => (
              <Link
                key={label}
                href={href}
                className="relative group text-gray-300 hover:text-white px-2 py-1 transition"
              >
                {label}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-indigo-500 group-hover:w-full transition-all" />
              </Link>
            ))}
          </nav>

          {/* Search, Notifications, Avatar */}
          <div className="flex items-center space-x-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Search..."
                className="pl-10 pr-4 py-1 rounded-full bg-gray-800 text-gray-300 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
              <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
            </div>
            <button className="relative p-2 rounded-full hover:bg-gray-700 transition">
              <FiBell className="text-xl text-gray-300" />
              <span className="absolute top-1 right-1 inline-block w-2 h-2 bg-red-500 rounded-full" />
            </button>
          </div>
        </div>
      </motion.header>

      {/* Spacer */}
      <div className="h-20" />

      {/* Hero Slider */}
      <div className="relative w-full h-[65vh]">
        <AnimatePresence initial={false} mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
            className="absolute inset-0"
          >
            <Image
              src={sliderImages[currentIndex]}
              alt={`Slide ${currentIndex + 1}`}
              fill
              className="object-cover brightness-75"
            />
          </motion.div>
        </AnimatePresence>
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="relative z-10 flex flex-col items-start justify-center h-full px-6 md:px-16 max-w-2xl"
        >
          <h1 className="text-5xl md:text-6xl font-extrabold text-white">
            Modernize Your Construction Management
          </h1>
          <p className="mt-4 text-xl text-gray-300">
            Powerful tools to streamline projects, materials, and labor in one
            dark-themed dashboard.
          </p>
          <div className="mt-6 flex space-x-4">
            <button
              onClick={() => router.push("/Construction/projectUi")}
              className="bg-indigo-500 hover:bg-indigo-600 px-6 py-3 rounded-lg font-semibold transition"
            >
              Get Started
            </button>
            <button
              onClick={() => router.push("/Construction/material-form")}
              className="bg-gray-700 hover:bg-gray-600 px-6 py-3 rounded-lg font-semibold transition"
            >
              Materials
            </button>
          </div>
        </motion.div>
      </div>

      {/* Insights Section */}
      <section className="py-16 bg-[#111827]">
        <div className="max-w-7xl mx-auto px-8">
          <h2 className="text-3xl font-bold text-gray-100 mb-6">
            Project Insights
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {insights.map(({ label, value, change, up }) => (
              <div
                key={label}
                className="bg-[#1f2937] p-6 rounded-lg shadow-lg"
              >
                <p className="text-gray-400 text-sm">{label}</p>
                <div className="mt-2 flex items-baseline space-x-2">
                  <span className="text-3xl font-bold text-white">
                    {value}
                  </span>
                  <span
                    className={`${
                      up ? "text-green-400" : "text-red-400"
                    } text-sm font-semibold`}
                  >
                    {change}
                    {up ? " ↑" : " ↓"}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Tools Section */}
      <section className="py-16 bg-[#1f2937]">
        <div className="max-w-7xl mx-auto px-8 flex items-center justify-between mb-6">
          <h2 className="text-3xl font-bold text-gray-100">
            Management Tools
          </h2>
          
        </div>
        <div className="max-w-7xl mx-auto px-8 grid grid-cols-1 md:grid-cols-3 gap-8">
          {tools.map(({ icon: Icon, title, desc, href }) => (
            <motion.div
              key={title}
              whileHover={{ y: -5 }}
              transition={{ stiffness: 300 }}
              onClick={() => router.push(href)}
              className="bg-[#1f2937] p-8 rounded-lg shadow-lg cursor-pointer border border-gray-700 flex flex-col h-full"
            >
              <Icon className="text-4xl text-indigo-400 mb-4" />
              <h3 className="text-xl font-semibold text-gray-100 mb-2">
                {title}
              </h3>
              <p className="text-gray-400 flex-grow">{desc}</p>
              <span className="mt-6 text-indigo-400 font-medium hover:underline">
                Learn More →
              </span>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#111827] py-8 mt-auto">
        <div className="max-w-7xl mx-auto px-8 text-center text-gray-500 text-sm">
          &copy; {new Date().getFullYear()} SoilTech. All rights reserved.
        </div>
      </footer>
    </div>
  );
}
