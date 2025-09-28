import { createRootRoute, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";
import { useCurrentUser } from "../features/auth/hooks";
import ProgressBarAnimation from "../components/ProgressBarAnimation";

const RootLayout = () => {
  const { data: user, isLoading } = useCurrentUser();
  console.log(user)
  if (isLoading) return <div className="h-screen w-full flex items-center justify-center">
    <ProgressBarAnimation/>
  </div>

  return <>
    <Outlet />
    <TanStackRouterDevtools />
  </>
}

export const Route = createRootRoute({ component: RootLayout });
