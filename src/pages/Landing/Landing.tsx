import React from "react";
import {
  DollarSign,
  BarChart3,
  Calendar,
  PieChart,
  Users,
  CreditCard,
} from "lucide-react";

const features = [
  {
    title: "Daily Spend Tracking",
    description: "Enter your expenses and instantly see how much you’re using per day.",
    icon: <Calendar className="w-6 h-6 text-blue-600" />,
  },
  {
    title: "Smart Insights",
    description: "Visualize where your money goes with charts and spending summaries.",
    icon: <BarChart3 className="w-6 h-6 text-purple-600" />,
  },
  {
    title: "Category Breakdown",
    description: "Track expenses across food, travel, utilities, and more.",
    icon: <PieChart className="w-6 h-6 text-pink-600" />,
  },
  {
    title: "SME Business Mode",
    description: "Manage company finances, track suppliers, and monitor growth.",
    icon: <Users className="w-6 h-6 text-green-600" />,
  },
  {
    title: "Expense Reminders",
    description: "Get alerts when daily spending crosses your set budget.",
    icon: <DollarSign className="w-6 h-6 text-yellow-600" />,
  },
  {
    title: "Payment Tracking",
    description: "Record payments and view credit/debit balance in one place.",
    icon: <CreditCard className="w-6 h-6 text-red-600" />,
  },
];

const Landing: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-500 to-blue-600 text-white flex flex-col items-center">
      {/* Header */}
      <header className="w-full max-w-6xl flex justify-between items-center p-6">
        <h1 className="text-2xl font-bold">MonyTrack+</h1>
        <div className="flex items-center gap-4">
          <button className="bg-white text-blue-600 px-4 py-2 rounded-lg font-semibold hover:shadow">
            Login
          </button>
          <button className="bg-green-500 px-4 py-2 rounded-lg font-semibold hover:bg-green-600">
            Sign Up
          </button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="text-center max-w-3xl mt-12">
        <h2 className="text-4xl font-bold mb-4">
          Track Your Spending, Grow Your Business 🚀
        </h2>
        <p className="text-lg text-blue-100">
          Whether you’re an individual or SME, MonyTrack+ helps you understand
          where your money goes — daily, monthly, or yearly.
        </p>
        <button className="mt-6 bg-white text-blue-600 px-6 py-3 rounded-lg font-bold shadow hover:bg-gray-100">
          Get Started Free
        </button>
      </section>

      {/* Features Grid */}
      <section className="bg-white text-gray-800 w-full mt-16 rounded-t-3xl shadow-lg p-10 max-w-6xl">
        <h3 className="text-2xl font-bold text-center mb-8">
          Features Designed For You
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, idx) => (
            <div
              key={idx}
              className="bg-gray-50 rounded-lg p-6 shadow-sm hover:shadow-md transition"
            >
              <div className="mb-4">{feature.icon}</div>
              <h4 className="text-lg font-semibold mb-2">{feature.title}</h4>
              <p className="text-gray-600 text-sm">{feature.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="mt-10 mb-6 text-sm text-blue-100">
        © {new Date().getFullYear()} MonyTrack+. All rights reserved.
      </footer>
    </div>
  );
};

export default Landing;
