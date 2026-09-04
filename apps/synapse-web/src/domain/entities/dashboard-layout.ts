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

export const WIDGET_DEFAULTS: Record<
	WidgetType,
	{ w: number; h: number; minW: number; minH: number }
> = {
	"kpi-revenue": { w: 3, h: 2, minW: 2, minH: 2 },
	"kpi-orders": { w: 3, h: 2, minW: 2, minH: 2 },
	"kpi-fulfillment": { w: 3, h: 2, minW: 2, minH: 2 },
	"kpi-shipments": { w: 3, h: 2, minW: 2, minH: 2 },
	"sales-trend": { w: 6, h: 4, minW: 4, minH: 4 },
	"top-products": { w: 6, h: 4, minW: 4, minH: 4 },
	"monthly-revenue": { w: 6, h: 4, minW: 4, minH: 4 },
	"order-status": { w: 6, h: 4, minW: 4, minH: 4 },
	"category-breakdown": { w: 6, h: 4, minW: 4, minH: 4 },
	"regional-performance": { w: 6, h: 4, minW: 4, minH: 6 },
	"recent-orders": { w: 12, h: 8, minW: 6, minH: 6 },
};

export const WIDGET_LABELS: Record<WidgetType, string> = {
	"kpi-revenue": "Revenue",
	"kpi-orders": "Orders",
	"kpi-fulfillment": "Fulfillment Rate",
	"kpi-shipments": "Active Shipments",
	"sales-trend": "Sales Trend",
	"top-products": "Top Products",
	"monthly-revenue": "Monthly Revenue",
	"order-status": "Order Status",
	"category-breakdown": "Category Breakdown",
	"regional-performance": "Regional Performance",
	"recent-orders": "Recent Orders",
};
