import { createFileRoute } from "@tanstack/react-router";
import Signup from "../../pages/Auth/Signup";

export const Route = createFileRoute("/auth/signup")({
  component: RouteComponent,
});

function RouteComponent() {
  return <Signup />;
}
