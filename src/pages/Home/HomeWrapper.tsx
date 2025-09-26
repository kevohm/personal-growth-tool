"use client";

import { Link, Outlet } from "@tanstack/react-router";
import * as React from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  HomeIcon,
  BarChartIcon,
  PieChartIcon,
  BackpackIcon,
  ExitIcon,
  HamburgerMenuIcon,
  Cross1Icon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from "@radix-ui/react-icons";

const HomeWrapper = () => {
  const [collapsed, setCollapsed] = React.useState(false);
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const links = [
    { title: "Dashboard", href: "/home", icon: HomeIcon },
    { title: "Expenses", href: "/home/expenses", icon: PieChartIcon },
    { title: "Earnings", href: "/home/earnings", icon: BarChartIcon },
    { title: "Savings", href: "/home/savings", icon: BackpackIcon },
  ];

  return (
    <div className="h-screen w-full flex bg-gray-50">
      {/* Mobile Top Bar */}
      <div className="md:hidden absolute top-0 left-0 w-full backdrop-blur-lg  flex items-center justify-between p-4 bg-white/50 border-b border-gray-200">
        <div className="font-bold text-green-600 text-lg">MonyTrack+</div>
        <button onClick={() => setMobileOpen(true)}>
            <HamburgerMenuIcon className="h-6 w-6" />
        </button>
      </div>

      {/* Desktop Sidebar */}
      <motion.aside
        animate={{ width: collapsed ? 72 : 256 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className="hidden md:flex flex-col bg-white border-r border-gray-200"
      >
        {/* Logo + Collapse toggle */}
        <div className="flex items-center justify-between px-4 py-4">
          {!collapsed && (
            <div className="font-bold text-green-600 text-xl">MonyTrack+</div>
          )}
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="p-1 rounded hover:bg-gray-100"
          >
            {collapsed ? (
              <ChevronRightIcon className="h-5 w-5" />
            ) : (
              <ChevronLeftIcon className="h-5 w-5" />
            )}
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-2 py-4 space-y-1">
          {links.map((link, index) => {
            const Icon = link.icon;
            return (
              <Link
                key={`${link}-${index}`}
                to={link.href}
                activeProps={{
                  className:
                    "bg-green-50 text-green-600 border-green-200 font-medium",
                }}
                className="flex items-center gap-3 px-4 py-2 rounded-lg text-gray-600 hover:bg-green-50 hover:text-green-600 transition-colors duration-200 border border-transparent"
              >
                <Icon className="h-5 w-5" />
                {!collapsed && (
                  <motion.span
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="text-sm"
                  >
                    {link.title}
                  </motion.span>
                )}
              </Link>
            );
          })}
        </nav>

        {/* Logout */}
        <div className="px-2 py-4 border-t border-gray-100">
          <button className="w-full flex items-center gap-3 px-4 py-2 rounded-lg text-gray-600 hover:bg-red-50 hover:text-red-600 transition-colors duration-200">
            <ExitIcon className="h-5 w-5" />
            {!collapsed && (
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="text-sm"
              >
                Logout
              </motion.span>
            )}
          </button>
        </div>
      </motion.aside>

      {/* Mobile Sidebar (Overlay) */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ x: -300 }}
              animate={{ x: 0 }}
              exit={{ x: -300 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="fixed inset-y-0 left-0 w-64 bg-white shadow-lg flex flex-col z-50"
            >
              <div className="flex items-center justify-between px-4 py-4 border-b border-gray-200">
                <div className="font-bold text-green-600 text-lg">MonyTrack+</div>
                <button onClick={() => setMobileOpen(false)}>
                  <Cross1Icon className="h-6 w-6" />
                </button>
              </div>

              <nav className="flex-1 px-2 py-4 space-y-1">
                {links.map((link, index) => {
                  const Icon = link.icon;
                  return (
                    <Link
                      key={`${link}-${index}`}
                      to={link.href}
                      onClick={() => setMobileOpen(false)}
                      activeProps={{
                        className:
                          "bg-green-50 text-green-600 border-green-200 font-medium",
                      }}
                      className="flex items-center gap-3 px-4 py-2 rounded-lg text-gray-600 hover:bg-green-50 hover:text-green-600 transition-colors duration-200 border border-transparent"
                    >
                      <Icon className="h-5 w-5" />
                      <span className="text-sm">{link.title}</span>
                    </Link>
                  );
                })}
              </nav>

              <div className="px-2 py-4 border-t border-gray-100">
                <button
                  onClick={() => setMobileOpen(false)}
                  className="w-full flex items-center gap-3 px-4 py-2 rounded-lg text-gray-600 hover:bg-red-50 hover:text-red-600 transition-colors duration-200"
                >
                  <ExitIcon className="h-5 w-5" />
                  <span className="text-sm">Logout</span>
                </button>
              </div>
            </motion.div>

            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 bg-black z-40"
              onClick={() => setMobileOpen(false)}
            />
          </>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <main className="flex-1 md:p-6 pt-16 overflow-y-auto">
        <Outlet />
      </main>
    </div>
  );
};

export default HomeWrapper;
