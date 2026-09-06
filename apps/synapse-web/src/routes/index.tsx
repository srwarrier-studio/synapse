/* eslint-disable react/only-export-components */
import { createFileRoute, redirect } from "@tanstack/react-router";
import { AuthenticationTitle } from "../pages/login";
import { getStoredAuth } from "../data/auth";

export const Route = createFileRoute("/")({
	beforeLoad: () => {
		const auth = getStoredAuth();
		if (auth) {
			throw redirect({ to: "/dashboard" });
		}
	},
	component: Index,
});

function Index() {
	return <AuthenticationTitle />;
}
