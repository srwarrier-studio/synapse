import {
	IconBuildingBank,
	IconCash,
	IconChartBar,
	IconDashboard,
	IconReportMoney,
	IconSettings,
	IconWallet,
} from "@tabler/icons-react";
import type { NavItem } from "../entities/navigation";

export const NAV_ITEMS: NavItem[] = [
	{ label: "Dashboard", icon: IconDashboard, to: "/dashboard" },
	{ label: "Financial Reports", icon: IconChartBar, to: "/dashboard/reports" },
	{ label: "Cash Flow", icon: IconCash, to: "/dashboard/cash-flow" },
	{ label: "Budget", icon: IconWallet, to: "/dashboard/budget" },
	{ label: "Treasury", icon: IconBuildingBank, to: "/dashboard/treasury" },
	{ label: "Payments", icon: IconReportMoney, to: "/dashboard/payments" },
	{ label: "Settings", icon: IconSettings, to: "/dashboard/settings" },
];
