import type {
	CategoryBreakdown,
	DashboardSummary,
	MonthlyRevenue,
	OrderStatus,
	RecentOrder,
	RegionalPerformance,
	SalesTrendPoint,
	TopProduct,
} from "../domain/entities/dashboard";
import { request } from "./api-client";

export function fetchDashboardSummary(): Promise<DashboardSummary> {
	return request("/api/dashboard/summary");
}

export function fetchSalesTrend(): Promise<SalesTrendPoint[]> {
	return request("/api/dashboard/sales-trend");
}

export function fetchTopProducts(): Promise<TopProduct[]> {
	return request("/api/dashboard/top-products");
}

export function fetchRegionalPerformance(): Promise<RegionalPerformance[]> {
	return request("/api/dashboard/regional-performance");
}

export function fetchOrderStatus(): Promise<OrderStatus[]> {
	return request("/api/dashboard/order-status");
}

export function fetchMonthlyRevenue(): Promise<MonthlyRevenue[]> {
	return request("/api/dashboard/monthly-revenue");
}

export function fetchCategoryBreakdown(): Promise<CategoryBreakdown[]> {
	return request("/api/dashboard/category-breakdown");
}

export function fetchRecentOrders(): Promise<RecentOrder[]> {
	return request("/api/dashboard/recent-orders");
}
