import { MantineProvider } from "@mantine/core";
import { createRootRoute, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";
import { theme } from "../theme";

const RootLayout = () => (
	<MantineProvider theme={theme}>
		<Outlet />
		<TanStackRouterDevtools />
	</MantineProvider>
);

export const Route = createRootRoute({ component: RootLayout });
