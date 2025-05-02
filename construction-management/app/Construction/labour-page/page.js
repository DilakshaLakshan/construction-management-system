"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FaUserPlus, FaUserFriends, FaMoneyCheckAlt, FaArrowLeft } from "react-icons/fa";

export default function LabourPage() {
  const router = useRouter();

  const cards = [
    {
      title: "New Worker",
      desc: "Register new workers with personal details and rates",
      icon: FaUserPlus,
      bg: "bg-gradient-to-br from-blue-50 to-white",
      border: "border-blue-200",
      iconColor: "text-blue-600",
      action: () => router.push("/Construction/labour-form"),
    },
    {
      title: "Workers List",
      desc: "View and manage your entire workforce",
      icon: FaUserFriends,
      bg: "bg-gradient-to-br from-green-50 to-white",
      border: "border-green-200",
      iconColor: "text-green-600",
      action: () => router.push("/Construction/workers-list"),
    },
    {
      title: "Payroll",
      desc: "Process payments and view payroll history",
      icon: FaMoneyCheckAlt,
      bg: "bg-gradient-to-br from-yellow-50 to-white",
      border: "border-yellow-200",
      iconColor: "text-yellow-600",
      action: () => router.push("/Construction/payroll"),
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center py-12 px-6">
      <div className="w-full max-w-5xl">
        <Link href="/Construction/Cfront" className="inline-flex items-center space-x-2 mb-6">
          <button
            className="flex items-center px-4 py-2 bg-white text-blue-600 font-medium border border-blue-600 rounded-full hover:bg-blue-50 transition-colors"
          >
            <FaArrowLeft className="mr-2" />
            Back to Home
          </button>
        </Link>

        <h1 className="text-center text-5xl font-extrabold text-gray-900 mb-2">
          Labour Management
        </h1>
        <p className="text-center text-lg text-gray-600 mb-10">
          Efficiently manage your workforce with comprehensive tools for tracking workers and payroll.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
          {cards.map(({ title, desc, icon: Icon, bg, border, iconColor, action }) => (
            <div
              key={title}
              onClick={action}
              className={
                `${bg} ${border} border rounded-2xl p-8 cursor-pointer transform hover:-translate-y-2 hover:shadow-2xl transition-all duration-300 flex flex-col items-center text-center`
              }
            >
              <div className="p-4 rounded-full bg-white shadow-md mb-4">
                <Icon className={`${iconColor} text-3xl`} />
              </div>
              <h2 className="text-2xl font-semibold text-gray-800 mb-2">{title}</h2>
              <p className="text-gray-600 text-sm leading-relaxed">{desc}</p>
              <button
                onClick={action}
                className="mt-6 inline-flex items-center px-5 py-2 bg-blue-600 text-white text-sm font-medium rounded-full hover:bg-blue-700 transition-colors"
              >
                Go to {title}
              </button>
            </div>
          ))}
        </div>

        <div className="mt-16 border-t pt-6">
          <p className="text-center text-gray-500">
            Our labour management system helps you track work hours, process payroll, and manage your entire workforce efficiently.
          </p>
        </div>
      </div>
    </div>
  );
}
