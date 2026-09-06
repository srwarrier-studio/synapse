import { NavLink, Stack, Text, Badge } from "@mantine/core";
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
import { useAuth } from "../../hooks/useAuth";

interface NavItem {
	label: string;
	to: string;
	icon: typeof IconLayoutDashboard;
	end?: boolean;
	modules: string[];
}

const NAV_ITEMS: NavItem[] = [
	{ label: "Dashboard", to: "/dashboard", icon: IconLayoutDashboard, end: true, modules: ["dashboard"] },
	{ label: "Sales & Orders", to: "/dashboard/sales", icon: IconReceipt, modules: ["sales"] },
	{ label: "Purchases", to: "/dashboard/purchases", icon: IconTruck, modules: ["purchases"] },
	{ label: "Inventory", to: "/dashboard/inventory", icon: IconPackage, modules: ["inventory"] },
	{ label: "Manufacturing", to: "/dashboard/manufacturing", icon: IconBuildingFactory, modules: ["manufacturing"] },
	{ label: "Quality Control", to: "/dashboard/quality", icon: IconClipboardCheck, modules: ["quality"] },
	{ label: "R&D", to: "/dashboard/research", icon: IconFlask, modules: ["research"] },
	{ label: "Supply Chain", to: "/dashboard/supply-chain", icon: IconRoute, modules: ["supply-chain"] },
	{ label: "HR & Training", to: "/dashboard/hr", icon: IconUsers, modules: ["hr"] },
	{ label: "Reports", to: "/dashboard/reports", icon: IconReport, modules: ["reports"] },
];

const ROLE_LABELS: Record<string, string> = {
	admin: "Admin",
	management: "Management",
	finance: "Finance",
	operations: "Operations",
	sales: "Sales",
};

export function Navbar() {
	const location = useLocation();
	const { canAccess, user } = useAuth();

	const filteredItems = NAV_ITEMS.filter((item) =>
		item.modules.every((mod) => canAccess(mod)),
	);

	return (
		<Stack p="md" gap="xs" style={{ height: "100%", justifyContent: "space-between" }}>
			<div>
				<Text
					size="xs"
					fw={600}
					c="dimmed"
					tt="uppercase"
					style={{ letterSpacing: "0.1em" }}
					mb="sm"
				>
					Synapse
				</Text>
				{filteredItems.map((item) => {
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
						/>
					);
				})}
			</div>
			{user && (
				<Badge
					color="synapse-blue"
					variant="light"
					size="lg"
					radius="sm"
					fullWidth
					ta="center"
				>
					{ROLE_LABELS[user.role] || user.role}
				</Badge>
			)}
		</Stack>
	);
}
