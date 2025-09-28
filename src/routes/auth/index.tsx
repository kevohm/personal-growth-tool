import { createFileRoute } from "@tanstack/react-router";
import Login from "../../pages/Auth/Login";

export const Route = createFileRoute("/auth/")({
  component: RouteComponent,
});

function RouteComponent() {
  return <Login />;
}
