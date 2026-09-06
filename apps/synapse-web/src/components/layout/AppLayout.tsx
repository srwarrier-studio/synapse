import { AppShell } from "@mantine/core";
import type { ReactNode } from "react";
import { Header } from "./Header";
import { Navbar } from "./Navbar";

interface AppLayoutProps {
	children: ReactNode;
}

export function AppLayout({ children }: AppLayoutProps) {
	return (
		<AppShell
			header={{ height: 56 }}
			navbar={{ width: 260, breakpoint: "md" }}
			padding="md"
		>
			<AppShell.Header>
				<Header />
			</AppShell.Header>
			<AppShell.Navbar>
				<Navbar />
			</AppShell.Navbar>
			<AppShell.Main>{children}</AppShell.Main>
		</AppShell>
	);
}
