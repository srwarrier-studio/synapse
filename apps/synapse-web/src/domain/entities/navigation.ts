import type { IconDashboard } from "@tabler/icons-react";

export interface NavItem {
	label: string;
	icon: typeof IconDashboard;
	to: string;
}
