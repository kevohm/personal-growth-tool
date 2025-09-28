import { createRootRoute, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";
import { useCurrentUser } from "../features/auth/hooks";

const RootLayout = () => {
  const { data: user, isLoading } = useCurrentUser();
  console.log(user)
  if (isLoading) return <div className="h-screen flex w-full items-center justify-center">
    <p>Loading...</p>
  </div>

  return <>
    <Outlet />
    <TanStackRouterDevtools />
  </>
}

export const Route = createRootRoute({ component: RootLayout });
