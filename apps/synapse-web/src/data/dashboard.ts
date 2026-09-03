import type {
	DashboardSummary,
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
