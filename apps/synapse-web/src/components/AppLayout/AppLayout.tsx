import { AppShell } from "@mantine/core";
import type { ReactNode } from "react";
import { Header } from "@/components/AppLayout/Header/Header";
import { Navbar } from "@/components/AppLayout/Navbar/Navbar";
import { EditModeProvider } from "@/hooks/useEditMode";

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
