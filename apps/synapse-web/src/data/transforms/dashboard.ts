import type {
	SalesTrendPoint,
	TopProduct,
	RegionalPerformance,
	OrderStatus,
	MonthlyRevenue,
	CategoryBreakdown,
	RecentOrder,
} from "../../domain/entities/dashboard";
import type {
	TimeSeriesDataPoint,
	CategoryDataPoint,
	TableData,
} from "../../domain/entities/widget";

export const STATUS_LABELS: Record<string, string> = {
	DELIVERED: "Delivered",
	SHIPPED: "Shipped",
	PROCESSING: "Processing",
	PENDING_APPROVAL: "Pending Approval",
	CANCELLED: "Cancelled",
};

export const STATUS_COLORS: Record<string, string> = {
	DELIVERED: "var(--mantine-color-sami-green-5)",
	SHIPPED: "var(--mantine-color-synapse-blue-5)",
	PROCESSING: "var(--mantine-color-orange-5)",
	PENDING_APPROVAL: "var(--mantine-color-yellow-5)",
	CANCELLED: "var(--mantine-color-red-5)",
};

export const CATEGORY_COLORS: Record<string, string> = {
	Nutraceuticals: "var(--mantine-color-synapse-blue-5)",
	Probiotics: "var(--mantine-color-sami-green-5)",
	Cosmeceuticals: "var(--mantine-color-violet-5)",
	"Specialty Chemicals": "var(--mantine-color-orange-5)",
	Enzymes: "var(--mantine-color-cyan-5)",
};

export function transformSalesTrend(data: SalesTrendPoint[]): TimeSeriesDataPoint[] {
	return data.map((point) => ({
		date: point.month,
		value: point.amount,
		series: point.region,
	}));
}

export function transformTopProducts(data: TopProduct[]): CategoryDataPoint[] {
	return data.map((product) => ({
		label: product.name,
		value: product.revenue,
	}));
}

export function transformMonthlyRevenue(data: MonthlyRevenue[]): CategoryDataPoint[] {
	return data.map((item) => ({
		label: item.month,
		value: item.revenue,
	}));
}

export function transformOrderStatus(data: OrderStatus[]): CategoryDataPoint[] {
	return data.map((item) => ({
		label: STATUS_LABELS[item.status] || item.status,
		value: item.count,
		color: STATUS_COLORS[item.status],
		percentage: item.percentage,
	}));
}

export function transformCategoryBreakdown(data: CategoryBreakdown[]): CategoryDataPoint[] {
	return data.map((item) => ({
		label: item.category,
		value: item.revenue,
		color: CATEGORY_COLORS[item.category],
		percentage: item.percentage,
	}));
}

export function transformRecentOrders(data: RecentOrder[]): TableData {
	return {
		columns: [
			{ key: "order_id", label: "Order ID" },
			{ key: "customer", label: "Customer" },
			{ key: "product", label: "Product" },
			{ key: "amount", label: "Amount", type: "currency" },
			{ key: "status", label: "Status", type: "status" },
			{ key: "region", label: "Region" },
			{ key: "date", label: "Date", type: "date" },
		],
		rows: data.map((order) => ({
			order_id: order.order_id,
			customer: order.customer,
			product: order.product,
			amount: order.amount,
			status: order.status,
			region: order.region,
			date: order.date,
		})),
	};
}

export function transformRegionalPerformance(data: RegionalPerformance[]): CategoryDataPoint[] {
	return data.map((r) => ({
		label: r.region,
		value: r.ytd_revenue,
		color: `var(--mantine-color-${r.region === "north" ? "synapse-blue" : r.region === "south" ? "sami-green" : r.region === "east" ? "orange" : "violet"}-5)`,
	}));
}
