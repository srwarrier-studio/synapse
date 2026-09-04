import type { DashboardTemplate, WidgetType } from "./dashboard-layout";

function makeWidget(type: WidgetType, id: string) {
	return { id, type, title: "" };
}

export const dashboardTemplates: DashboardTemplate[] = [
	{
		id: "executive",
		name: "Executive Overview",
		description: "High-level KPIs and trends for leadership",
		icon: "IconBriefcase",
		widgets: [
			makeWidget("kpi-revenue", "exec-kpi-1"),
			makeWidget("kpi-orders", "exec-kpi-2"),
			makeWidget("kpi-fulfillment", "exec-kpi-3"),
			makeWidget("kpi-shipments", "exec-kpi-4"),
			makeWidget("sales-trend", "exec-chart-1"),
			makeWidget("monthly-revenue", "exec-chart-2"),
			makeWidget("regional-performance", "exec-chart-3"),
			makeWidget("recent-orders", "exec-table-1"),
		],
		GridLayout: [
			{ i: "exec-kpi-1", x: 0, y: 0, w: 3, h: 2 },
			{ i: "exec-kpi-2", x: 3, y: 0, w: 3, h: 2 },
			{ i: "exec-kpi-3", x: 6, y: 0, w: 3, h: 2 },
			{ i: "exec-kpi-4", x: 9, y: 0, w: 3, h: 2 },
			{ i: "exec-chart-1", x: 0, y: 2, w: 6, h: 4 },
			{ i: "exec-chart-2", x: 6, y: 2, w: 6, h: 4 },
			{ i: "exec-chart-3", x: 0, y: 6, w: 6, h: 6 },
			{ i: "exec-table-1", x: 0, y: 12, w: 12, h: 8 },
		],
	},
	{
		id: "operations",
		name: "Operations Dashboard",
		description: "Focus on orders, fulfillment, and logistics",
		icon: "IconTruck",
		widgets: [
			makeWidget("kpi-orders", "ops-kpi-1"),
			makeWidget("kpi-fulfillment", "ops-kpi-2"),
			makeWidget("kpi-shipments", "ops-kpi-3"),
			makeWidget("order-status", "ops-chart-1"),
			makeWidget("regional-performance", "ops-chart-2"),
			makeWidget("recent-orders", "ops-table-1"),
		],
		GridLayout: [
			{ i: "ops-kpi-1", x: 0, y: 0, w: 4, h: 2 },
			{ i: "ops-kpi-2", x: 4, y: 0, w: 4, h: 2 },
			{ i: "ops-kpi-3", x: 8, y: 0, w: 4, h: 2 },
			{ i: "ops-chart-1", x: 0, y: 2, w: 6, h: 4 },
			{ i: "ops-chart-2", x: 6, y: 2, w: 6, h: 6 },
			{ i: "ops-table-1", x: 0, y: 8, w: 12, h: 8 },
		],
	},
	{
		id: "sales",
		name: "Sales Analytics",
		description: "Revenue trends, top products, and categories",
		icon: "IconChartBar",
		widgets: [
			makeWidget("kpi-revenue", "sales-kpi-1"),
			makeWidget("kpi-orders", "sales-kpi-2"),
			makeWidget("sales-trend", "sales-chart-1"),
			makeWidget("top-products", "sales-chart-2"),
			makeWidget("category-breakdown", "sales-chart-3"),
			makeWidget("monthly-revenue", "sales-chart-4"),
		],
		GridLayout: [
			{ i: "sales-kpi-1", x: 0, y: 0, w: 6, h: 2 },
			{ i: "sales-kpi-2", x: 6, y: 0, w: 6, h: 2 },
			{ i: "sales-chart-1", x: 0, y: 2, w: 6, h: 4 },
			{ i: "sales-chart-2", x: 6, y: 2, w: 6, h: 4 },
			{ i: "sales-chart-3", x: 0, y: 6, w: 6, h: 4 },
			{ i: "sales-chart-4", x: 6, y: 6, w: 6, h: 4 },
		],
	},
];

export type WidgetCategory = "finance" | "operations" | "materials";

export const ALL_WIDGET_TYPES: {
	type: WidgetType;
	label: string;
	category: WidgetCategory;
	defaults: { w: number; h: number; minW: number; minH: number };
}[] = [
	{ type: "kpi-revenue", label: "Revenue KPI", category: "finance", defaults: { w: 3, h: 2, minW: 2, minH: 2 } },
	{ type: "sales-trend", label: "Sales Trend", category: "finance", defaults: { w: 6, h: 4, minW: 4, minH: 4 } },
	{ type: "top-products", label: "Top Products", category: "finance", defaults: { w: 6, h: 4, minW: 4, minH: 4 } },
	{ type: "monthly-revenue", label: "Monthly Revenue", category: "finance", defaults: { w: 6, h: 4, minW: 4, minH: 4 } },
	{ type: "regional-performance", label: "Regional Performance", category: "finance", defaults: { w: 6, h: 4, minW: 4, minH: 6 } },
	{ type: "kpi-orders", label: "Orders KPI", category: "operations", defaults: { w: 3, h: 2, minW: 2, minH: 2 } },
	{ type: "kpi-fulfillment", label: "Fulfillment KPI", category: "operations", defaults: { w: 3, h: 2, minW: 2, minH: 2 } },
	{ type: "kpi-shipments", label: "Shipments KPI", category: "operations", defaults: { w: 3, h: 2, minW: 2, minH: 2 } },
	{ type: "order-status", label: "Order Status", category: "operations", defaults: { w: 6, h: 4, minW: 4, minH: 4 } },
	{ type: "recent-orders", label: "Recent Orders", category: "operations", defaults: { w: 12, h: 8, minW: 6, minH: 6 } },
	{ type: "category-breakdown", label: "Category Breakdown", category: "materials", defaults: { w: 6, h: 4, minW: 4, minH: 4 } },
];

export const WIDGET_CATEGORY_LABELS: Record<WidgetCategory, string> = {
	finance: "Finance",
	operations: "Operations",
	materials: "Materials",
};
