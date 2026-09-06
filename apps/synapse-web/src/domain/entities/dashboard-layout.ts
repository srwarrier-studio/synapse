export interface GridLayoutItem {
	i: string;
	x: number;
	y: number;
	w: number;
	h: number;
	minW?: number;
	minH?: number;
	maxW?: number;
	maxH?: number;
	static?: boolean;
}

export type WidgetType =
	| "kpi-revenue"
	| "kpi-orders"
	| "kpi-fulfillment"
	| "kpi-shipments"
	| "sales-trend"
	| "top-products"
	| "monthly-revenue"
	| "order-status"
	| "category-breakdown"
	| "regional-performance"
	| "recent-orders";

export interface DashboardWidget {
	id: string;
	type: WidgetType;
	title: string;
}

export interface DashboardLayout {
	id: string;
	name: string;
	widgets: DashboardWidget[];
	GridLayout: GridLayoutItem[];
	createdAt: string;
	updatedAt: string;
}

export interface DashboardTemplate {
	id: string;
	name: string;
	description: string;
	icon: string;
	widgets: DashboardWidget[];
	GridLayout: GridLayoutItem[];
}
