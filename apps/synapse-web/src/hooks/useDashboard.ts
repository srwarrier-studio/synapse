import { useState, useEffect } from "react";
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
import {
	fetchDashboardSummary,
	fetchSalesTrend,
	fetchTopProducts,
	fetchRegionalPerformance,
	fetchOrderStatus,
	fetchMonthlyRevenue,
	fetchCategoryBreakdown,
	fetchRecentOrders,
} from "../data/dashboard";

interface DashboardState {
	summary: DashboardSummary | null;
	salesTrend: SalesTrendPoint[];
	topProducts: TopProduct[];
	regionPerformance: RegionalPerformance[];
	orderStatus: OrderStatus[];
	monthlyRevenue: MonthlyRevenue[];
	categoryBreakdown: CategoryBreakdown[];
	recentOrders: RecentOrder[];
	isLoading: boolean;
	error: string | null;
}

export function useDashboard(): DashboardState {
	const [state, setState] = useState<DashboardState>({
		summary: null,
		salesTrend: [],
		topProducts: [],
		regionPerformance: [],
		orderStatus: [],
		monthlyRevenue: [],
		categoryBreakdown: [],
		recentOrders: [],
		isLoading: true,
		error: null,
	});

	useEffect(() => {
		let cancelled = false;

		async function load() {
			try {
				const [
					summary,
					salesTrend,
					topProducts,
					regionPerformance,
					orderStatus,
					monthlyRevenue,
					categoryBreakdown,
					recentOrders,
				] = await Promise.all([
					fetchDashboardSummary(),
					fetchSalesTrend(),
					fetchTopProducts(),
					fetchRegionalPerformance(),
					fetchOrderStatus(),
					fetchMonthlyRevenue(),
					fetchCategoryBreakdown(),
					fetchRecentOrders(),
				]);

				if (!cancelled) {
					setState({
						summary,
						salesTrend,
						topProducts,
						regionPerformance,
						orderStatus,
						monthlyRevenue,
						categoryBreakdown,
						recentOrders,
						isLoading: false,
						error: null,
					});
				}
			} catch (err) {
				if (!cancelled) {
					setState((prev) => ({
						...prev,
						isLoading: false,
						error: err instanceof Error ? err.message : "Failed to load dashboard",
					}));
				}
			}
		}

		load();

		return () => {
			cancelled = true;
		};
	}, []);

	return state;
}
