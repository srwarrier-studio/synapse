import { AppShell } from "@mantine/core";
import type { ReactNode } from "react";
import { EditModeProvider } from "../../hooks/useEditMode";
import { Header } from "./Header";
import { Navbar } from "./Navbar";

interface AppLayoutProps {
	children: ReactNode;
}

export function AppLayout({ children }: AppLayoutProps) {
	return (
		<EditModeProvider>
			<AppShell
				header={{ height: 56 }}
				navbar={{ width: 72, breakpoint: "md" }}
				padding="md"
				withBorder={false}
				layout="alt"
			>
				<AppShell.Header>
					<Header />
				</AppShell.Header>
				<AppShell.Navbar>
					<Navbar />
				</AppShell.Navbar>
				<AppShell.Main>{children}</AppShell.Main>
			</AppShell>
		</EditModeProvider>
	);
}
