/* eslint-disable react/only-export-components */
import { createFileRoute } from "@tanstack/react-router";
import { AuthenticationTitle } from "../pages/login";

export const Route = createFileRoute("/")({
	component: Index,
});

function Index() {
	return <AuthenticationTitle />;
}
