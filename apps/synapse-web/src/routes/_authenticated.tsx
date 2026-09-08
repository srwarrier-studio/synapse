import { Center } from "@mantine/core";
import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";
import { AppLayout } from "../components/layout/AppLayout";
import { getStoredAuth } from "../data/auth";
import { AuthProvider } from "../hooks/useAuth";

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
