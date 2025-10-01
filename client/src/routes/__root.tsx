import { createRootRoute, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";
import React from "react";
import ProgressBarAnimation from "../components/ProgressBarAnimation";
import { useCurrentUser } from "../features/auth/hooks";

const RootLayout = () => {
  const texts = [
    "Track your spending in real-time",
    "Get smart insights instantly",
    "Manage business & personal finances",
    "Visualize expenses with charts",
    "Stay on top of payments & reminders",
    "Grow your savings effortlessly",
    "Designed for both individuals & SMEs",
  ];

  const { isLoading } = useCurrentUser();

  const [index, setIndex] = React.useState(0);

  React.useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % texts.length);
    }, 2000); // change every 1s
    return () => clearInterval(interval);
  }, []);

  // console.log(user);
  if (isLoading)
    return (
      <div className="min-h-screen bg-white w-full flex flex-col  items-center justify-center">
        <ProgressBarAnimation />
        <p className="text-slate-950 text-lg font-semibold transition-opacity duration-500">
          {texts[index]}
        </p>
      </div>
    );

  return (
    <>
      <Outlet />
      <TanStackRouterDevtools />
    </>
  );
};

export const Route = createRootRoute({ component: RootLayout });
