import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";
import { AuthProvider } from "../hooks/useAuth";
import { getStoredAuth } from "../data/auth";
import { AppLayout } from "../components/layout/AppLayout";

export const Route = createFileRoute("/_authenticated")({
	beforeLoad: () => {
		const auth = getStoredAuth();
		if (!auth) {
			throw redirect({ to: "/" });
		}
	},
	component: AuthenticatedLayout,
});

function AuthenticatedLayout() {
	return (
		<AuthProvider>
			<AppLayout>
				<Outlet />
			</AppLayout>
		</AuthProvider>
	);
}
