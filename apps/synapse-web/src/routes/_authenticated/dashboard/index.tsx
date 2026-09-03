import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_authenticated/dashboard/")({
	component: DashboardIndex,
});

function DashboardIndex() {
	return (
		<div>
			<h2>Dashboard</h2>
			<p>Dashboard content will be loaded in Capsule 1.</p>
		</div>
	);
}
