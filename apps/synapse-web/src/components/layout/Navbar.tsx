import { NavLink, Stack, Title } from "@mantine/core";
import { Link, useLocation } from "@tanstack/react-router";

const NAV_ITEMS = [
  { label: "Dashboard", to: "/dashboard" },
  { label: "Sales", to: "/dashboard/sales" },
  { label: "Purchases", to: "/dashboard/purchases" },
  { label: "Inventory", to: "/dashboard/inventory" },
  { label: "Reports", to: "/dashboard/reports" },
];

export function Navbar() {
  const location = useLocation();

  return (
    <Stack p="md" gap="xs">
      <Title order={5} c="dimmed" mb="sm">
        Navigation
      </Title>
      {NAV_ITEMS.map((item) => (
        <NavLink
          key={item.to}
          component={Link}
          to={item.to}
          label={item.label}
          active={
            item.to === "/dashboard"
              ? location.pathname === "/dashboard"
              : location.pathname.startsWith(item.to)
          }
          variant="subtle"
          radius="sm"
        />
      ))}
    </Stack>
  );
}
