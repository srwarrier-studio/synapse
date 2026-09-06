/* eslint-disable react/only-export-components */
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_authenticated/dashboard/inventory")({
	component: InventoryPage,
});

function InventoryPage() {
	return (
		<div>
			<h2>Inventory</h2>
			<p>Inventory page will be loaded in Capsule 4.</p>
		</div>
	);
}
