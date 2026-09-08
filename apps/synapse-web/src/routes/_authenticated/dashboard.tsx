import { createFileRoute, Outlet } from "@tanstack/react-router";
import { PlaceholderDashboard } from "../../pages/dashboard/PlaceholderDashboard";

export const Route = createFileRoute("/_authenticated/dashboard")({
	component: () => <PlaceholderDashboard />,
});
