import ReactGridLayout, { useContainerWidth } from "react-grid-layout";
import type { Layout } from "react-grid-layout";
import "react-grid-layout/css/styles.css";
import "react-resizable/css/styles.css";
import type {
	DashboardWidget,
	GridLayoutItem,
} from "../../domain/entities/dashboard-layout";
import { WIDGET_LABELS } from "../../domain/entities/dashboard-layout";
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
import { DraggableChart } from "./DraggableChart";
import {
	KPICard,
	SalesTrendChart,
	TopProductsChart,
	RegionalPerformance as RegionalPerformanceChart,
	OrderStatusChart,
	MonthlyRevenueChart,
	CategoryBreakdown as CategoryBreakdownChart,
	RecentOrdersTable,
} from "./index";
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
		case "kpi-revenue":
			return (
				<KPICard
					title="Revenue"
					value={`₹${(summary?.revenue ?? 0).toLocaleString()}`}
					change={summary?.revenue_change}
					icon={<IconCurrencyDollar size={20} />}
					color="synapse-blue"
				/>
			);
		case "kpi-orders":
			return (
				<KPICard
					title="Orders"
					value={(summary?.orders ?? 0).toLocaleString()}
					change={summary?.orders_change}
					icon={<IconShoppingCart size={20} />}
					color="sami-green"
				/>
			);
		case "kpi-fulfillment":
			return (
				<KPICard
					title="Fulfillment Rate"
					value={`${summary?.fulfillment_rate ?? 0}%`}
					icon={<IconTruck size={20} />}
					color="teal"
				/>
			);
		case "kpi-shipments":
			return (
				<KPICard
					title="Active Shipments"
					value={(summary?.active_shipments ?? 0).toLocaleString()}
					icon={<IconPackage size={20} />}
					color="orange"
				/>
			);
		case "sales-trend":
			return <SalesTrendChart data={salesTrend} />;
		case "top-products":
			return <TopProductsChart data={topProducts} />;
		case "monthly-revenue":
			return <MonthlyRevenueChart data={monthlyRevenue} />;
		case "order-status":
			return <OrderStatusChart data={orderStatus} />;
		case "category-breakdown":
			return <CategoryBreakdownChart data={categoryBreakdown} />;
		case "regional-performance":
			return <RegionalPerformanceChart data={regionPerformance} />;
		case "recent-orders":
			return <RecentOrdersTable data={recentOrders} />;
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

	const layout = gridLayout.map((item) => ({ ...item }));

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
