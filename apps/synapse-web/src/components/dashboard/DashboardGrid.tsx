import ReactGridLayout, { useContainerWidth } from "react-grid-layout";
import type { Layout } from "react-grid-layout";
import "react-grid-layout/css/styles.css";
import "react-resizable/css/styles.css";
import type {
	DashboardWidget,
	GridLayoutItem,
} from "../../domain/entities/dashboard-layout";
import { WIDGET_LABELS, WIDGET_CONSTRAINTS } from "../../domain/entities/dashboard-layout";
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
import type {
	TimeSeriesDataPoint,
	CategoryDataPoint,
	TableData,
	KPIData,
} from "../../domain/entities/widget";
import { DraggableChart } from "./DraggableChart";
import {
	KPIWidget,
	TrendChart,
	BarChart,
	DataTable,
} from "../widgets";
import {
	IconCurrencyDollar,
	IconShoppingCart,
	IconTruck,
	IconPackage,
} from "@tabler/icons-react";

interface DashboardGridProps {
	widgets: DashboardWidget[];
	gridLayout: GridLayoutItem[];
	onLayoutChange: (layout: Layout) => void;
	onRemoveWidget?: (id: string) => void;
	isEditing?: boolean;
	summary?: DashboardSummary | null;
	salesTrend?: SalesTrendPoint[];
	topProducts?: TopProduct[];
	regionPerformance?: RegionalPerformance[];
	orderStatus?: OrderStatus[];
	monthlyRevenue?: MonthlyRevenue[];
	categoryBreakdown?: CategoryBreakdown[];
	recentOrders?: RecentOrder[];
}

function transformSalesTrend(data: SalesTrendPoint[]): TimeSeriesDataPoint[] {
	return data.map((point) => ({
		date: point.month,
		value: point.amount,
		series: point.region,
	}));
}

function transformTopProducts(data: TopProduct[]): CategoryDataPoint[] {
	return data.map((product) => ({
		label: product.name,
		value: product.revenue,
	}));
}

function transformMonthlyRevenue(data: MonthlyRevenue[]): CategoryDataPoint[] {
	return data.map((item) => ({
		label: item.month,
		value: item.revenue,
	}));
}

function transformOrderStatus(data: OrderStatus[]): CategoryDataPoint[] {
	const STATUS_LABELS: Record<string, string> = {
		DELIVERED: "Delivered",
		SHIPPED: "Shipped",
		PROCESSING: "Processing",
		PENDING_APPROVAL: "Pending Approval",
		CANCELLED: "Cancelled",
	};

	const STATUS_COLORS: Record<string, string> = {
		DELIVERED: "var(--mantine-color-sami-green-5)",
		SHIPPED: "var(--mantine-color-synapse-blue-5)",
		PROCESSING: "var(--mantine-color-orange-5)",
		PENDING_APPROVAL: "var(--mantine-color-yellow-5)",
		CANCELLED: "var(--mantine-color-red-5)",
	};

	return data.map((item) => ({
		label: STATUS_LABELS[item.status] || item.status,
		value: item.count,
		color: STATUS_COLORS[item.status],
		percentage: item.percentage,
	}));
}

function transformCategoryBreakdown(data: CategoryBreakdown[]): CategoryDataPoint[] {
	const CATEGORY_COLORS: Record<string, string> = {
		Nutraceuticals: "var(--mantine-color-synapse-blue-5)",
		Probiotics: "var(--mantine-color-sami-green-5)",
		Cosmeceuticals: "var(--mantine-color-violet-5)",
		"Specialty Chemicals": "var(--mantine-color-orange-5)",
		Enzymes: "var(--mantine-color-cyan-5)",
	};

	return data.map((item) => ({
		label: item.category,
		value: item.revenue,
		color: CATEGORY_COLORS[item.category],
		percentage: item.percentage,
	}));
}

function transformRecentOrders(data: RecentOrder[]): TableData {
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

function renderWidget(
	widget: DashboardWidget,
	summary?: DashboardSummary | null,
	salesTrend: SalesTrendPoint[] = [],
	topProducts: TopProduct[] = [],
	regionPerformance: RegionalPerformance[] = [],
	orderStatus: OrderStatus[] = [],
	monthlyRevenue: MonthlyRevenue[] = [],
	categoryBreakdown: CategoryBreakdown[] = [],
	recentOrders: RecentOrder[] = [],
) {
	switch (widget.type) {
		case "kpi-revenue": {
			const kpiData: KPIData = {
				value: summary?.revenue ?? 0,
				change: summary?.revenue_change,
				changeLabel: "vs last month",
			};
			return (
				<KPIWidget
					title="Revenue"
					data={kpiData}
					icon={<IconCurrencyDollar size={20} />}
					color="synapse-blue"
					formatValue={(v) => `₹${Number(v).toLocaleString()}`}
				/>
			);
		}
		case "kpi-orders": {
			const kpiData: KPIData = {
				value: summary?.orders ?? 0,
				change: summary?.orders_change,
				changeLabel: "vs last month",
			};
			return (
				<KPIWidget
					title="Orders"
					data={kpiData}
					icon={<IconShoppingCart size={20} />}
					color="sami-green"
				/>
			);
		}
		case "kpi-fulfillment": {
			const kpiData: KPIData = {
				value: `${summary?.fulfillment_rate ?? 0}%`,
			};
			return (
				<KPIWidget
					title="Fulfillment Rate"
					data={kpiData}
					icon={<IconTruck size={20} />}
					color="teal"
				/>
			);
		}
		case "kpi-shipments": {
			const kpiData: KPIData = {
				value: summary?.active_shipments ?? 0,
			};
			return (
				<KPIWidget
					title="Active Shipments"
					data={kpiData}
					icon={<IconPackage size={20} />}
					color="orange"
				/>
			);
		}
		case "sales-trend":
			return (
				<TrendChart
					data={transformSalesTrend(salesTrend)}
					title="Sales Trend by Region"
					valueLabel={`₹${(salesTrend.reduce((sum, d) => sum + d.amount, 0) / 1000000).toFixed(1)}M total`}
					seriesLabel="Region"
				/>
			);
		case "top-products":
			return (
				<BarChart
					data={transformTopProducts(topProducts)}
					title="Top Products"
					valueLabel={`${topProducts.length} products`}
					formatValue={(v) => `₹${v.toLocaleString()}`}
				/>
			);
		case "monthly-revenue":
			return (
				<BarChart
					data={transformMonthlyRevenue(monthlyRevenue)}
					title="Monthly Revenue"
					valueLabel={`₹${(monthlyRevenue.reduce((sum, d) => sum + d.revenue, 0) / 1000000).toFixed(1)}M total`}
					formatValue={(v) => `₹${v.toLocaleString()}`}
				/>
			);
		case "order-status":
			return (
				<BarChart
					data={transformOrderStatus(orderStatus)}
					title="Order Status Distribution"
					valueLabel={`${orderStatus.reduce((sum, d) => sum + d.count, 0).toLocaleString()} total`}
					showLegend
					formatValue={(v) => v.toLocaleString()}
				/>
			);
		case "category-breakdown":
			return (
				<BarChart
					data={transformCategoryBreakdown(categoryBreakdown)}
					title="Product Category Breakdown"
					valueLabel={`${categoryBreakdown.length} categories`}
					showLegend
					formatValue={(v) => `₹${(v / 1000000).toFixed(1)}M`}
				/>
			);
		case "regional-performance":
			return (
				<BarChart
					data={regionPerformance.map((r) => ({
						label: r.region,
						value: r.ytd_revenue,
						color: `var(--mantine-color-${r.region === "north" ? "synapse-blue" : r.region === "south" ? "sami-green" : r.region === "east" ? "orange" : "violet"}-5)`,
					}))}
					title="Regional Performance"
					formatValue={(v) => `₹${(v / 1000000).toFixed(1)}M`}
				/>
			);
		case "recent-orders":
			return (
				<DataTable
					data={transformRecentOrders(recentOrders)}
					title="Recent Orders"
				/>
			);
		default:
			return <div>Unknown widget: {WIDGET_LABELS[widget.type]}</div>;
	}
}

export function DashboardGrid({
	widgets,
	gridLayout,
	onLayoutChange,
	onRemoveWidget,
	isEditing = false,
	summary,
	salesTrend,
	topProducts,
	regionPerformance,
	orderStatus,
	monthlyRevenue,
	categoryBreakdown,
	recentOrders,
}: DashboardGridProps) {
	const { width, containerRef, mounted } = useContainerWidth();

	const layout = gridLayout.map((item) => {
		const widget = widgets.find((w) => w.id === item.i);
		const constraints = widget ? WIDGET_CONSTRAINTS[widget.type] : undefined;
		return {
			...item,
			minW: constraints?.minW,
			minH: constraints?.minH,
			maxW: constraints?.maxW,
			maxH: constraints?.maxH,
		};
	});

	return (
		<div
			ref={containerRef}
			className={`dashboard-view${isEditing ? " dashboard-editing" : ""}`}
			style={{
				minHeight: 400,
				borderRadius: isEditing ? "var(--mantine-radius-sm)" : undefined,
				outline: isEditing ? "2px dashed var(--mantine-color-default-border)" : undefined,
				outlineOffset: isEditing ? "4px" : undefined,
				transition: "outline 150ms ease",
			}}
		>
			{mounted && (
				<ReactGridLayout
					layout={layout}
					width={width}
					gridConfig={{ cols: 12, rowHeight: 50, margin: [16, 16] }}
					dragConfig={{
						enabled: isEditing,
						handle: ".drag-handle",
					}}
					resizeConfig={{
						enabled: isEditing,
						handles: ["se"],
					}}
					onLayoutChange={onLayoutChange}
				>
					{widgets.map((widget) => (
						<div key={widget.id} style={{ height: "100%" }}>
							<DraggableChart
								id={widget.id}
								title={WIDGET_LABELS[widget.type] || widget.type}
								onRemove={onRemoveWidget}
								isEditing={isEditing}
							>
								{renderWidget(
									widget,
									summary,
									salesTrend,
									topProducts,
									regionPerformance,
									orderStatus,
									monthlyRevenue,
									categoryBreakdown,
									recentOrders,
								)}
							</DraggableChart>
						</div>
					))}
				</ReactGridLayout>
			)}
		</div>
	);
}
