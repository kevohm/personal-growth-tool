import { createFileRoute, redirect } from "@tanstack/react-router";
import { getCurrentUser } from "../features/auth/api";
import HomeWrapper from "../pages/Home/HomeWrapper";

export const Route = createFileRoute("/_home")({
  loader: async () => {
    const user = await getCurrentUser();
    if (!user) {
      throw redirect({ to: "/auth" });
    }
    return user;
  },
  component: RouteComponent,
});

function RouteComponent() {
  return <HomeWrapper />;
}
