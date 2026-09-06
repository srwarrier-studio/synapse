import type { DashboardWidget } from "../../domain/entities/dashboard-layout";
import { WIDGET_LABELS } from "../../domain/constants/dashboard-layout";
import type {
	SalesTrendPoint,
	TopProduct,
	RegionalPerformance,
	OrderStatus,
	MonthlyRevenue,
	CategoryBreakdown,
	RecentOrder,
	DashboardSummary,
} from "../../domain/entities/dashboard";
import type { KPIData } from "../../domain/entities/widget";
import type { DataPointClickEvent } from "../widgets/chart-adapter";
import {
	transformSalesTrend,
	transformTopProducts,
	transformMonthlyRevenue,
	transformOrderStatus,
	transformCategoryBreakdown,
	transformRecentOrders,
	transformRegionalPerformance,
} from "../../data/transforms/dashboard";
import { KPIWidget } from "../widgets/KPIWidget";
import { TrendChart } from "../widgets/TrendChart";
import { BarChart } from "../widgets/BarChart";
import { DataTable } from "../widgets/DataTable";
import {
	IconCurrencyDollar,
	IconShoppingCart,
	IconTruck,
	IconPackage,
} from "@tabler/icons-react";

interface WidgetRendererProps {
	widget: DashboardWidget;
	summary?: DashboardSummary | null;
	salesTrend: SalesTrendPoint[];
	topProducts: TopProduct[];
	regionPerformance: RegionalPerformance[];
	orderStatus: OrderStatus[];
	monthlyRevenue: MonthlyRevenue[];
	categoryBreakdown: CategoryBreakdown[];
	recentOrders: RecentOrder[];
	onDrillDown?: (month: string, year: number) => void;
}

function KpiRevenue({ summary }: { summary?: DashboardSummary | null }) {
	const data: KPIData = {
		value: summary?.revenue ?? 0,
		change: summary?.revenue_change,
		changeLabel: "vs last month",
	};
	return (
		<KPIWidget
			title="Revenue"
			data={data}
			icon={<IconCurrencyDollar size={20} />}
			color="synapse-blue"
			formatValue={(v) => `₹${Number(v).toLocaleString()}`}
		/>
	);
}

function KpiOrders({ summary }: { summary?: DashboardSummary | null }) {
	const data: KPIData = {
		value: summary?.orders ?? 0,
		change: summary?.orders_change,
		changeLabel: "vs last month",
	};
	return (
		<KPIWidget
			title="Orders"
			data={data}
			icon={<IconShoppingCart size={20} />}
			color="sami-green"
		/>
	);
}

function KpiFulfillment({ summary }: { summary?: DashboardSummary | null }) {
	const data: KPIData = {
		value: `${summary?.fulfillment_rate ?? 0}%`,
	};
	return (
		<KPIWidget
			title="Fulfillment Rate"
			data={data}
			icon={<IconTruck size={20} />}
			color="teal"
		/>
	);
}

function KpiShipments({ summary }: { summary?: DashboardSummary | null }) {
	const data: KPIData = {
		value: summary?.active_shipments ?? 0,
	};
	return (
		<KPIWidget
			title="Active Shipments"
			data={data}
			icon={<IconPackage size={20} />}
			color="orange"
		/>
	);
}

function SalesTrendWidget({ salesTrend }: { salesTrend: SalesTrendPoint[] }) {
	return (
		<TrendChart
			data={transformSalesTrend(salesTrend)}
			title="Sales Trend by Region"
			valueLabel={`₹${(salesTrend.reduce((sum, d) => sum + d.amount, 0) / 1000000).toFixed(1)}M total`}
			seriesLabel="Region"
			showLegend
		/>
	);
}

function TopProductsWidget({ topProducts }: { topProducts: TopProduct[] }) {
	return (
		<BarChart
			data={transformTopProducts(topProducts)}
			title="Top Products"
			valueLabel={`${topProducts.length} products`}
			formatValue={(v) => `₹${v.toLocaleString()}`}
		/>
	);
}

function MonthlyRevenueWidget({
	monthlyRevenue,
	onDrillDown,
}: {
	monthlyRevenue: MonthlyRevenue[];
	onDrillDown?: (month: string, year: number) => void;
}) {
	function handleClick(point: DataPointClickEvent) {
		if (onDrillDown) {
			onDrillDown(point.label, 2024);
		}
	}

	return (
		<BarChart
			data={transformMonthlyRevenue(monthlyRevenue)}
			title="Monthly Revenue"
			valueLabel={`₹${(monthlyRevenue.reduce((sum, d) => sum + d.revenue, 0) / 1000000).toFixed(1)}M total — Click a month for insights`}
			formatValue={(v) => `₹${v.toLocaleString()}`}
			onDataPointClick={onDrillDown ? handleClick : undefined}
		/>
	);
}

function OrderStatusWidget({ orderStatus }: { orderStatus: OrderStatus[] }) {
	return (
		<BarChart
			data={transformOrderStatus(orderStatus)}
			title="Order Status Distribution"
			valueLabel={`${orderStatus.reduce((sum, d) => sum + d.count, 0).toLocaleString()} total`}
			showLegend
			formatValue={(v) => v.toLocaleString()}
		/>
	);
}

function CategoryBreakdownWidget({ categoryBreakdown }: { categoryBreakdown: CategoryBreakdown[] }) {
	return (
		<BarChart
			data={transformCategoryBreakdown(categoryBreakdown)}
			title="Product Category Breakdown"
			valueLabel={`${categoryBreakdown.length} categories`}
			showLegend
			formatValue={(v) => `₹${(v / 1000000).toFixed(1)}M`}
		/>
	);
}

function RegionalPerformanceWidget({ regionPerformance }: { regionPerformance: RegionalPerformance[] }) {
	return (
		<BarChart
			data={transformRegionalPerformance(regionPerformance)}
			title="Regional Performance"
			formatValue={(v) => `₹${(v / 1000000).toFixed(1)}M`}
		/>
	);
}

function RecentOrdersWidget({ recentOrders }: { recentOrders: RecentOrder[] }) {
	return (
		<DataTable
			data={transformRecentOrders(recentOrders)}
			title="Recent Orders"
		/>
	);
}

export function WidgetRenderer({
	widget,
	summary,
	salesTrend,
	topProducts,
	regionPerformance,
	orderStatus,
	monthlyRevenue,
	categoryBreakdown,
	recentOrders,
	onDrillDown,
}: WidgetRendererProps) {
	switch (widget.type) {
		case "kpi-revenue":
			return <KpiRevenue summary={summary} />;
		case "kpi-orders":
			return <KpiOrders summary={summary} />;
		case "kpi-fulfillment":
			return <KpiFulfillment summary={summary} />;
		case "kpi-shipments":
			return <KpiShipments summary={summary} />;
		case "sales-trend":
			return <SalesTrendWidget salesTrend={salesTrend} />;
		case "top-products":
			return <TopProductsWidget topProducts={topProducts} />;
		case "monthly-revenue":
			return (
				<MonthlyRevenueWidget
					monthlyRevenue={monthlyRevenue}
					onDrillDown={onDrillDown}
				/>
			);
		case "order-status":
			return <OrderStatusWidget orderStatus={orderStatus} />;
		case "category-breakdown":
			return <CategoryBreakdownWidget categoryBreakdown={categoryBreakdown} />;
		case "regional-performance":
			return <RegionalPerformanceWidget regionPerformance={regionPerformance} />;
		case "recent-orders":
			return <RecentOrdersWidget recentOrders={recentOrders} />;
		default:
			return <div>Unknown widget: {WIDGET_LABELS[widget.type]}</div>;
	}
}
