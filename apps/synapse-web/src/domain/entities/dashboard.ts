export interface DashboardSummary {
	revenue: number;
	orders: number;
	fulfillment_rate: number;
	active_shipments: number;
	revenue_change: number;
	orders_change: number;
}

export interface SalesTrendPoint {
	month: string;
	region: string;
	amount: number;
}

export interface TopProduct {
	name: string;
	revenue: number;
	units: number;
}

export interface RegionalPerformance {
	region: string;
	ytd_revenue: number;
	latest_month: number;
	growth_rate: number;
}

export interface OrderStatus {
	status: string;
	count: number;
	percentage: number;
}

export interface MonthlyRevenue {
	month: string;
	revenue: number;
	orders: number;
}

export interface CategoryBreakdown {
	category: string;
	revenue: number;
	percentage: number;
	product_count: number;
}

export interface RecentOrder {
	order_id: string;
	customer: string;
	product: string;
	amount: number;
	status: string;
	date: string;
	region: string;
}
