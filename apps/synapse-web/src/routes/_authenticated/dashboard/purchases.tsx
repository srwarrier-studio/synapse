import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_authenticated/dashboard/purchases")({
  component: PurchasesPage,
});

function PurchasesPage() {
  return (
    <div>
      <h2>Purchases</h2>
      <p>Purchases page will be loaded in Capsule 3.</p>
    </div>
  );
}
