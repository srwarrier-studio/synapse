import type { WidgetType } from "../entities/dashboard-layout";

export interface WidgetConstraints {
	minW: number;
	minH: number;
	maxW: number;
	maxH: number;
	defaultW: number;
	defaultH: number;
}

export const WIDGET_CONSTRAINTS: Record<WidgetType, WidgetConstraints> = {
	"kpi-revenue":         { minW: 2, minH: 1, maxW: 4,  maxH: 2, defaultW: 3, defaultH: 1 },
	"kpi-orders":          { minW: 2, minH: 1, maxW: 4,  maxH: 2, defaultW: 3, defaultH: 1 },
	"kpi-fulfillment":     { minW: 2, minH: 1, maxW: 4,  maxH: 2, defaultW: 3, defaultH: 1 },
	"kpi-shipments":       { minW: 2, minH: 1, maxW: 4,  maxH: 2, defaultW: 3, defaultH: 1 },
	"sales-trend":         { minW: 4, minH: 2, maxW: 12, maxH: 6, defaultW: 6, defaultH: 3 },
	"top-products":        { minW: 4, minH: 2, maxW: 12, maxH: 6, defaultW: 6, defaultH: 3 },
	"monthly-revenue":     { minW: 4, minH: 2, maxW: 12, maxH: 6, defaultW: 6, defaultH: 3 },
	"order-status":        { minW: 4, minH: 2, maxW: 12, maxH: 6, defaultW: 6, defaultH: 3 },
	"category-breakdown":  { minW: 4, minH: 2, maxW: 12, maxH: 6, defaultW: 6, defaultH: 3 },
	"regional-performance":{ minW: 4, minH: 2, maxW: 12, maxH: 6, defaultW: 6, defaultH: 3 },
	"recent-orders":       { minW: 6, minH: 2, maxW: 12, maxH: 8, defaultW: 12, defaultH: 4 },
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
