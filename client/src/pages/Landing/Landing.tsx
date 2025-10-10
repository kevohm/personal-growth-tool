"use client";

import Lottie from "lottie-react";
import {
  ArrowRight,
  BarChart3,
  ChevronRight,
  DollarSign,
  Repeat,
  Shield,
  TrendingUp,
} from "lucide-react";
import type React from "react";
import { useState } from "react";
import moneyAnimation from "../../assets/money.json";
import { Link } from "@tanstack/react-router";

const features = [
  {
    title: "Track Every Transaction",
    description:
      "Manually record your income and expenses to always know where your money goes.",
    icon: <Repeat className="w-8 h-8 text-green-600" />,
  },
  {
    title: "Insightful Analytics",
    description:
      "Visualize your spending, earnings, and savings over time with clear charts and reports.",
    icon: <BarChart3 className="w-8 h-8 text-green-600" />,
  },
  {
    title: "Simple & Private",
    description:
      "All your data stays in your account. MonyTrack+ does not store or move money, ensuring your privacy and trust.",
    icon: <Shield className="w-8 h-8 text-green-600" />,
  },
];

const stats = [
  { value: "3k+", label: "Users managing finances smarter" },
  { value: "180K", label: "Tracked transactions" },
  { value: "24%", label: "Improved savings" },
];

const Landing: React.FC = () => {
  const [email, setEmail] = useState("");

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="bg-white sticky top-0 left-0 border-b z-50 border-slate-200">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-green-600 rounded-lg flex items-center justify-center">
              <DollarSign className="w-5 h-5 text-white" />
            </div>
            <h1 className="text-xl font-bold text-slate-900">MonyTrack+</h1>
          </div>
          <div className="flex items-center gap-4">
              <Link to="/auth" className="text-slate-700 font-medium hover:text-slate-900">
              Login
            </Link>
            <Link
              to="/auth/signup"
              className="bg-green-600 text-white px-5 py-2 rounded-lg font-medium hover:bg-green-700 transition"
            >
              Get Started
            </Link>
           
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-6 py-20 grid md:grid-cols-2 gap-12 items-center">
        <div>
          <h2 className="text-4xl sm:text-5xl font-bold text-slate-900 mb-6 leading-tight">
            Track your money, simplify your finances.
          </h2>
          <p className="text-lg text-slate-600 mb-8 leading-relaxed">
            MonyTrack+ helps you record income, expenses, and savings, all in
            one simple app. No banking, no transfers, just clear money tracking
            for anyone.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 mb-8">
            <input
              type="email"
              placeholder="Your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-1 px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            />
             <Link
              to="/auth/signup"
              className="bg-green-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-green-700 transition flex items-center gap-2"
            >
              Get Started
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6 text-sm text-slate-500 font-medium">
            <span>Trusted by:</span>
            <div className="flex flex-wrap gap-4">
              <span className="text-slate-700 font-semibold">Klarna</span>
              <span className="text-slate-700 font-semibold">Coinbase</span>
              <span className="text-slate-700 font-semibold">Instacart</span>
            </div>
          </div>
        </div>
        <div className="relative flex justify-center">
          <Lottie
            animationData={moneyAnimation}
            loop
            className="max-w-xs sm:max-w-md"
          />
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-4">
            <span className="text-sm text-green-600 font-semibold uppercase tracking-wide">
              For All Users
            </span>
          </div>
          <h3 className="text-3xl sm:text-4xl font-bold text-slate-900 text-center mb-4">
            Experience that grows with your tracking
          </h3>
          <p className="text-slate-600 text-center max-w-2xl mx-auto mb-16">
            Organize your financial data and understand your money better with
            clear insights.
          </p>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-8">
            {features.map((feature, idx) => (
              <div key={idx} className="text-center">
                <div className="flex justify-center mb-4">
                  <div className="w-16 h-16 bg-slate-50 rounded-xl flex items-center justify-center border border-slate-200">
                    {feature.icon}
                  </div>
                </div>
                <h4 className="text-xl font-bold text-slate-900 mb-2">
                  {feature.title}
                </h4>
                <p className="text-slate-600 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats & Analytics Section */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        <div className="text-center mb-8">
          <span className="text-sm text-green-600 font-semibold uppercase tracking-wide">
            Why Users Love Us
          </span>
        </div>
        <h3 className="text-3xl sm:text-4xl font-bold text-slate-900 text-center mb-12">
          Track smarter, not harder
        </h3>

        <div className="grid sm:grid-cols-2 gap-8 mb-12">
          <div className="bg-slate-100 rounded-2xl p-8 text-center">
            <div className="text-5xl sm:text-6xl font-bold text-green-600 mb-4">
              3k+
            </div>
            <p className="text-lg sm:text-xl text-slate-900 font-medium">
              Individuals already managing their finances smarter
            </p>
          </div>
          <div className="bg-white rounded-2xl p-8 border border-slate-200">
            <h4 className="text-xl font-bold text-slate-900 mb-2">
              Clear Analytics
            </h4>
            <p className="text-slate-600 mb-6">
              Track spending, income, and savings over time with visual insights
              that help you understand your money habits.
            </p>
            <div className="flex gap-4 justify-center">
              <div className="w-12 h-12 bg-green-600 rounded-full flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-white" />
              </div>
              <div className="w-12 h-12 bg-slate-900 rounded-full flex items-center justify-center">
                <BarChart3 className="w-6 h-6 text-white" />
              </div>
            </div>
          </div>
        </div>

        {/* Growth Chart */}
        <div className="grid sm:grid-cols-2 gap-8">
          <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200">
            <h4 className="text-xl font-bold text-slate-900 mb-2">
              Clear Financial Insights
            </h4>
            <p className="text-slate-600">
              Visualize your spending, income, and savings trends over time.
              Understand your finances without handling real money.
            </p>
          </div>
          <div className="bg-slate-100 rounded-2xl p-6 sm:p-8 relative overflow-hidden">
            <div className="flex justify-between items-start mb-4">
              <div>
                <div className="text-sm text-slate-600 mb-1">
                  Tracked Balance
                </div>
                <div className="text-2xl sm:text-3xl font-bold text-slate-900">
                  $1,676,580
                </div>
              </div>
              <button className="text-sm text-green-600 font-medium flex items-center gap-1 cursor-not-allowed">
                Analytics <ChevronRight className="w-4 h-4" />
              </button>
            </div>
            <div className="h-32 flex items-end gap-2">
              {[40, 45, 50, 55, 65, 75, 85, 90].map((height, i) => (
                <div
                  key={i}
                  className="flex-1 bg-green-200 rounded-t"
                  style={{ height: `${height}%` }}
                />
              ))}
            </div>
            <p className="text-sm text-slate-500 mt-2">
              This chart shows your tracked income and expenses over time for
              better financial planning.
            </p>
          </div>
        </div>
      </section>

      {/* Steps Section */}
      <section className="bg-slate-900 text-white py-20">
        <div className="max-w-7xl mx-auto px-6">
          <h3 className="text-3xl sm:text-4xl font-bold mb-12 text-center">
            Organize your money and understand it better
          </h3>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="text-5xl font-bold mb-4 text-slate-400">1</div>
              <h4 className="text-xl font-bold mb-2">Create your account</h4>
              <p className="text-slate-400">
                Start by creating a personal account. Your data stays private
                and secure.
              </p>
            </div>
            <div className="text-center">
              <div className="text-5xl font-bold mb-4 text-slate-400">2</div>
              <h4 className="text-xl font-bold mb-2">
                Enter income & expenses
              </h4>
              <p className="text-slate-400">
                Record your earnings and spending manually. Track money flow
                without sharing real funds.
              </p>
            </div>
            <div className="text-center">
              <div className="text-5xl font-bold mb-4 text-slate-400">3</div>
              <h4 className="text-xl font-bold mb-2">Visualize & analyze</h4>
              <p className="text-slate-400">
                Use charts and reports to see your spending, earnings, and
                savings trends over time.
              </p>
            </div>
          </div>
        </div>
      </section>
      {/* Social Proof & Stats Section */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        <div className="text-center mb-4">
          <span className="text-sm text-green-600 font-semibold uppercase tracking-wide">
            Trusted By
          </span>
        </div>
        <h3 className="text-4xl font-bold text-slate-900 text-center mb-4">
          People love using MonyTrack+
        </h3>
        <p className="text-slate-600 text-center max-w-2xl mx-auto mb-16">
          Thousands of individuals are tracking their income, expenses, and
          savings effectively with our simple, private app.
        </p>

        {/* User Stats */}
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-8 mb-16">
          {stats.map((stat, idx) => (
            <div key={idx} className="text-center">
              <div className="text-5xl font-bold text-slate-900 mb-2">
                {stat.value}
              </div>
              <p className="text-slate-600">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Final CTA */}
      <section className="bg-slate-900 text-white rounded-3xl max-w-7xl mx-auto mb-20 px-6 sm:px-8 lg:px-12">
        <div className="py-16 sm:py-20 text-center">
          <h3 className="text-3xl sm:text-4xl font-bold mb-4 sm:mb-6">
            Ready to start tracking your finances?
          </h3>
          <p className="text-slate-400 mb-6 sm:mb-8 max-w-xl sm:max-w-2xl mx-auto text-base sm:text-lg leading-relaxed">
            MonyTrack+ lets you track income, expenses, and savings securely and
            privately. Understand your money better, without storing or moving
            it.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center">
            <Link
              to="/auth/signup"
              className="bg-green-600 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-lg font-medium hover:bg-green-700 transition w-full sm:w-auto"
            >
              Get Started Now
            </Link>
            <a
              href="/#features"
              className="bg-transparent border border-white text-white px-6 sm:px-8 py-3 sm:py-4 rounded-lg font-medium hover:bg-white/10 transition flex items-center justify-center gap-2 w-full sm:w-auto"
            >
              Learn More <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-6 pb-12">
          <div className="pt-8 flex justify-between items-center">
            <p className="text-sm text-slate-600">
              © {new Date().getFullYear()} MonyTrack+. All rights reserved.
            </p>
            <div className="flex gap-4">
              <a href="#" className="text-slate-600 hover:text-slate-900">
                Twitter
              </a>
              <a href="#" className="text-slate-600 hover:text-slate-900">
                LinkedIn
              </a>
              <a href="#" className="text-slate-600 hover:text-slate-900">
                Facebook
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
