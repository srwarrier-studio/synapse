import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_authenticated/dashboard/reports")({
	component: ReportsPage,
});

function ReportsPage() {
	return (
		<div>
			<h2>Reports</h2>
			<p>Reports page will be loaded in Capsule 5.</p>
		</div>
	);
}
