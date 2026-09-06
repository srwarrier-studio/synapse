/* eslint-disable react/only-export-components */
import { MantineProvider } from "@mantine/core";
import { createRootRoute, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";
import { theme } from "../theme";

export const Route = createRootRoute({
	component: () => (
		<MantineProvider theme={theme}>
			<Outlet />
			<TanStackRouterDevtools />
		</MantineProvider>
	),
});
