import { AppShell } from "@mantine/core";
import { Outlet } from "@tanstack/react-router";
import { Header } from "./Header";
import { Navbar } from "./Navbar";

export function AppLayout() {
  return (
    <AppShell
      header={{ height: 60 }}
      navbar={{ width: 260, breakpoint: "md" }}
      padding="md"
    >
      <AppShell.Header>
        <Header />
      </AppShell.Header>
      <AppShell.Navbar>
        <Navbar />
      </AppShell.Navbar>
      <AppShell.Main>
        <Outlet />
      </AppShell.Main>
    </AppShell>
  );
}
