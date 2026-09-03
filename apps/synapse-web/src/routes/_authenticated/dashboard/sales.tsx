import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_authenticated/dashboard/sales")({
  component: SalesPage,
});

function SalesPage() {
  return (
    <div>
      <h2>Sales</h2>
      <p>Sales page will be loaded in Capsule 2.</p>
    </div>
  );
}
