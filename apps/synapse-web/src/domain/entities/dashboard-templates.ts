import type { WidgetCategory, ChartType } from "./widget";

export const WIDGET_CATEGORY_LABELS: Record<WidgetCategory, string> = {
	finance: "Finance",
	operations: "Operations",
	research: "Research & Development",
	manufacturing: "Manufacturing",
	quality: "Quality Control",
	sales: "Sales & Marketing",
	"supply-chain": "Supply Chain",
	hr: "Human Resources",
};

export interface WidgetTypeItem {
	id: string;
	type: string;
	label: string;
	category: WidgetCategory;
	chartType: ChartType;
	defaults: { w: number; h: number; minW: number; minH: number };
}

export const ALL_WIDGET_TYPES: WidgetTypeItem[] = [
	{ id: "fin-revenue", type: "kpi-revenue", label: "Revenue KPI", category: "finance", chartType: "kpi", defaults: { w: 3, h: 2, minW: 2, minH: 2 } },
	{ id: "fin-trend", type: "sales-trend", label: "Sales Trend", category: "finance", chartType: "line", defaults: { w: 6, h: 4, minW: 4, minH: 4 } },
	{ id: "fin-top", type: "top-products", label: "Top Products", category: "finance", chartType: "bar", defaults: { w: 6, h: 4, minW: 4, minH: 4 } },
	{ id: "fin-monthly", type: "monthly-revenue", label: "Monthly Revenue", category: "finance", chartType: "area", defaults: { w: 6, h: 4, minW: 4, minH: 4 } },
	{ id: "fin-regional", type: "regional-performance", label: "Regional Performance", category: "finance", chartType: "radar", defaults: { w: 6, h: 4, minW: 4, minH: 6 } },
	{ id: "fin-category", type: "category-breakdown", label: "Category Breakdown", category: "finance", chartType: "pie", defaults: { w: 6, h: 4, minW: 4, minH: 4 } },
	{ id: "ops-orders", type: "kpi-orders", label: "Orders KPI", category: "operations", chartType: "kpi", defaults: { w: 3, h: 2, minW: 2, minH: 2 } },
	{ id: "ops-fulfill", type: "kpi-fulfillment", label: "Fulfillment KPI", category: "operations", chartType: "gauge", defaults: { w: 3, h: 2, minW: 2, minH: 2 } },
	{ id: "ops-ship", type: "kpi-shipments", label: "Shipments KPI", category: "operations", chartType: "kpi", defaults: { w: 3, h: 2, minW: 2, minH: 2 } },
	{ id: "ops-status", type: "order-status", label: "Order Status", category: "operations", chartType: "donut", defaults: { w: 6, h: 4, minW: 4, minH: 4 } },
	{ id: "ops-recent", type: "recent-orders", label: "Recent Orders", category: "operations", chartType: "table", defaults: { w: 12, h: 8, minW: 6, minH: 6 } },
	{ id: "mfg-output", type: "kpi-revenue", label: "Manufacturing Output", category: "manufacturing", chartType: "bar", defaults: { w: 6, h: 4, minW: 4, minH: 4 } },
	{ id: "mfg-efficiency", type: "kpi-fulfillment", label: "Efficiency Gauge", category: "manufacturing", chartType: "gauge", defaults: { w: 4, h: 3, minW: 3, minH: 3 } },
	{ id: "mfg-downtime", type: "order-status", label: "Downtime Funnel", category: "manufacturing", chartType: "funnel", defaults: { w: 6, h: 4, minW: 4, minH: 4 } },
	{ id: "mfg-batch", type: "sales-trend", label: "Batch Pass Rate", category: "manufacturing", chartType: "line", defaults: { w: 6, h: 4, minW: 4, minH: 4 } },
	{ id: "qc-cert", type: "kpi-fulfillment", label: "Certification Status", category: "quality", chartType: "kpi", defaults: { w: 4, h: 2, minW: 3, minH: 2 } },
	{ id: "qc-audit", type: "order-status", label: "Audit Findings", category: "quality", chartType: "bar", defaults: { w: 6, h: 4, minW: 4, minH: 4 } },
	{ id: "qc-pass", type: "sales-trend", label: "Batch Pass Rate Trend", category: "quality", chartType: "line", defaults: { w: 6, h: 4, minW: 4, minH: 4 } },
	{ id: "sal-regional", type: "regional-performance", label: "Regional Sales", category: "sales", chartType: "bar", defaults: { w: 6, h: 4, minW: 4, minH: 4 } },
	{ id: "sal-product", type: "sales-trend", label: "Product Performance", category: "sales", chartType: "radar", defaults: { w: 6, h: 4, minW: 4, minH: 4 } },
	{ id: "sal-channel", type: "category-breakdown", label: "Channel Mix", category: "sales", chartType: "pie", defaults: { w: 6, h: 4, minW: 4, minH: 4 } },
	{ id: "sal-target", type: "kpi-revenue", label: "Target vs Actual", category: "sales", chartType: "bullet", defaults: { w: 6, h: 3, minW: 4, minH: 2 } },
	{ id: "sc-inventory", type: "monthly-revenue", label: "Inventory Levels", category: "supply-chain", chartType: "bar", defaults: { w: 6, h: 4, minW: 4, minH: 4 } },
	{ id: "sc-supplier", type: "recent-orders", label: "Supplier Performance", category: "supply-chain", chartType: "table", defaults: { w: 12, h: 6, minW: 6, minH: 4 } },
	{ id: "sc-logistics", type: "kpi-shipments", label: "Logistics Status", category: "supply-chain", chartType: "kpi", defaults: { w: 4, h: 2, minW: 3, minH: 2 } },
	{ id: "hr-headcount", type: "kpi-revenue", label: "Headcount", category: "hr", chartType: "kpi", defaults: { w: 4, h: 2, minW: 3, minH: 2 } },
	{ id: "hr-attrition", type: "sales-trend", label: "Attrition by Dept", category: "hr", chartType: "bar", defaults: { w: 6, h: 4, minW: 4, minH: 4 } },
	{ id: "hr-training", type: "kpi-fulfillment", label: "Training Completion", category: "hr", chartType: "progress", defaults: { w: 4, h: 2, minW: 3, minH: 2 } },
	{ id: "rd-patents", type: "kpi-revenue", label: "Patents Filed", category: "research", chartType: "kpi", defaults: { w: 4, h: 2, minW: 3, minH: 2 } },
	{ id: "rd-pipeline", type: "order-status", label: "R&D Pipeline", category: "research", chartType: "funnel", defaults: { w: 6, h: 4, minW: 4, minH: 4 } },
	{ id: "rd-pubs", type: "kpi-revenue", label: "Publications", category: "research", chartType: "kpi", defaults: { w: 4, h: 2, minW: 3, minH: 2 } },
];

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
			{ i: "mfg-kpi-1", x: 0, y: 0, w: 6, h: 2 },
			{ i: "mfg-kpi-2", x: 6, y: 0, w: 6, h: 2 },
			{ i: "mfg-chart-1", x: 0, y: 2, w: 6, h: 4 },
			{ i: "mfg-chart-2", x: 6, y: 2, w: 6, h: 6 },
			{ i: "mfg-table-1", x: 0, y: 8, w: 12, h: 8 },
		],
	},
];
