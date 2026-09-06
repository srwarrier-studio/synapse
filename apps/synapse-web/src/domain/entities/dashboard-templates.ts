import type { DashboardTemplate, WidgetType } from "./dashboard-layout";
import { WIDGET_CONSTRAINTS } from "./dashboard-layout";
import type { WidgetCategory } from "./widget";
import { WIDGET_CATEGORY_LABELS } from "./widget";

export interface WidgetTypeConfig {
	id: WidgetType;
	label: string;
	category: WidgetCategory;
	chartType: string;
}

export const ALL_WIDGET_TYPES: WidgetTypeConfig[] = [
	{ id: "kpi-revenue", label: "Revenue", category: "finance", chartType: "kpi" },
	{ id: "kpi-orders", label: "Orders", category: "sales", chartType: "kpi" },
	{ id: "kpi-fulfillment", label: "Fulfillment Rate", category: "operations", chartType: "kpi" },
	{ id: "kpi-shipments", label: "Active Shipments", category: "operations", chartType: "kpi" },
	{ id: "sales-trend", label: "Sales Trend", category: "sales", chartType: "line" },
	{ id: "top-products", label: "Top Products", category: "sales", chartType: "bar" },
	{ id: "monthly-revenue", label: "Monthly Revenue", category: "finance", chartType: "bar" },
	{ id: "order-status", label: "Order Status", category: "operations", chartType: "bar" },
	{ id: "category-breakdown", label: "Category Breakdown", category: "sales", chartType: "bar" },
	{ id: "regional-performance", label: "Regional Performance", category: "sales", chartType: "bar" },
	{ id: "recent-orders", label: "Recent Orders", category: "operations", chartType: "table" },
];

export const WIDGET_CATEGORIES: Record<WidgetCategory, WidgetTypeConfig[]> = Object.entries(
	WIDGET_CATEGORY_LABELS
).reduce(
	(acc, [key]) => {
		acc[key as WidgetCategory] = ALL_WIDGET_TYPES.filter(
			(w) => w.category === key
		);
		return acc;
	},
	{} as Record<WidgetCategory, WidgetTypeConfig[]>
);

function makeWidget(type: WidgetType, id: string) {
	return { id, type, title: "" };
}

function makeGridItem(type: WidgetType, id: string, x: number, y: number, w?: number, h?: number) {
	const constraints = WIDGET_CONSTRAINTS[type];
	return {
		i: id,
		x,
		y,
		w: w ?? constraints.defaultW,
		h: h ?? constraints.defaultH,
		minW: constraints.minW,
		minH: constraints.minH,
		maxW: constraints.maxW,
		maxH: constraints.maxH,
	};
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
			makeGridItem("kpi-revenue", "exec-kpi-1", 0, 0),
			makeGridItem("kpi-orders", "exec-kpi-2", 3, 0),
			makeGridItem("kpi-fulfillment", "exec-kpi-3", 6, 0),
			makeGridItem("kpi-shipments", "exec-kpi-4", 9, 0),
			makeGridItem("sales-trend", "exec-chart-1", 0, 2),
			makeGridItem("monthly-revenue", "exec-chart-2", 6, 2),
			makeGridItem("regional-performance", "exec-chart-3", 0, 4),
			makeGridItem("recent-orders", "exec-table-1", 0, 6),
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
			makeGridItem("kpi-orders", "ops-kpi-1", 0, 0),
			makeGridItem("kpi-fulfillment", "ops-kpi-2", 3, 0),
			makeGridItem("kpi-shipments", "ops-kpi-3", 6, 0),
			makeGridItem("order-status", "ops-chart-1", 0, 2),
			makeGridItem("regional-performance", "ops-chart-2", 6, 2),
			makeGridItem("recent-orders", "ops-table-1", 0, 4),
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
			makeGridItem("kpi-revenue", "sales-kpi-1", 0, 0),
			makeGridItem("kpi-orders", "sales-kpi-2", 6, 0),
			makeGridItem("sales-trend", "sales-chart-1", 0, 2),
			makeGridItem("top-products", "sales-chart-2", 6, 2),
			makeGridItem("category-breakdown", "sales-chart-3", 0, 4),
			makeGridItem("monthly-revenue", "sales-chart-4", 6, 4),
		],
	},
	{
		id: "manufacturing",
		name: "Manufacturing Overview",
		description: "Production output, efficiency, and downtime",
		icon: "IconBuildingFactory",
		widgets: [
			makeWidget("kpi-shipments", "mfg-kpi-1"),
			makeWidget("kpi-fulfillment", "mfg-kpi-2"),
			makeWidget("order-status", "mfg-chart-1"),
			makeWidget("regional-performance", "mfg-chart-2"),
			makeWidget("recent-orders", "mfg-table-1"),
		],
		GridLayout: [
			makeGridItem("kpi-shipments", "mfg-kpi-1", 0, 0),
			makeGridItem("kpi-fulfillment", "mfg-kpi-2", 6, 0),
			makeGridItem("order-status", "mfg-chart-1", 0, 2),
			makeGridItem("regional-performance", "mfg-chart-2", 6, 2),
			makeGridItem("recent-orders", "mfg-table-1", 0, 4),
		],
	},
];
