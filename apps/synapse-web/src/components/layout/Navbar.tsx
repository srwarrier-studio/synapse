import { NavLink, Stack, Text } from "@mantine/core";
import { Link, useLocation } from "@tanstack/react-router";
import {
	IconLayoutDashboard,
	IconTruck,
	IconPackage,
	IconFlask,
	IconClipboardCheck,
	IconUsers,
	IconBuildingFactory,
	IconRoute,
	IconReceipt,
	IconReport,
} from "@tabler/icons-react";

const NAV_ITEMS = [
	{ label: "Dashboard", to: "/dashboard", icon: IconLayoutDashboard, end: true },
	{ label: "Sales & Orders", to: "/dashboard/sales", icon: IconReceipt },
	{ label: "Purchases", to: "/dashboard/purchases", icon: IconTruck },
	{ label: "Inventory", to: "/dashboard/inventory", icon: IconPackage },
	{ label: "Manufacturing", to: "/dashboard/manufacturing", icon: IconBuildingFactory },
	{ label: "Quality Control", to: "/dashboard/quality", icon: IconClipboardCheck },
	{ label: "R&D", to: "/dashboard/research", icon: IconFlask },
	{ label: "Supply Chain", to: "/dashboard/supply-chain", icon: IconRoute },
	{ label: "HR & Training", to: "/dashboard/hr", icon: IconUsers },
	{ label: "Reports", to: "/dashboard/reports", icon: IconReport },
];

export function Navbar() {
	const location = useLocation();

	return (
		<Stack p="md" gap="xs">
			<Text size="xs" fw={600} c="dimmed" tt="uppercase" style={{ letterSpacing: "0.1em" }} mb="sm">
				Synapse
			</Text>
			{NAV_ITEMS.map((item) => {
				const Icon = item.icon;
				return (
					<NavLink
						key={item.to}
						component={Link}
						to={item.to}
						label={item.label}
						leftSection={<Icon size={18} />}
						active={
							item.to === "/dashboard"
								? location.pathname === "/dashboard"
								: location.pathname.startsWith(item.to)
						}
						variant="subtle"
						radius="sm"
					/>
				);
			})}
		</Stack>
	);
}
