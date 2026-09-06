import ReactGridLayout, { useContainerWidth } from "react-grid-layout";
import type { Layout } from "react-grid-layout";
import "react-grid-layout/css/styles.css";
import "react-resizable/css/styles.css";
import type {
	DashboardWidget,
	GridLayoutItem,
} from "../../domain/entities/dashboard-layout";
import { WIDGET_LABELS, WIDGET_CONSTRAINTS } from "../../domain/constants/dashboard-layout";
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
import { WidgetRenderer } from "./WidgetRenderer";

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

export function DashboardGrid({
	widgets,
	gridLayout,
	onLayoutChange,
	onRemoveWidget,
	isEditing = false,
	summary,
	salesTrend = [],
	topProducts = [],
	regionPerformance = [],
	orderStatus = [],
	monthlyRevenue = [],
	categoryBreakdown = [],
	recentOrders = [],
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
								<WidgetRenderer
									widget={widget}
									summary={summary}
									salesTrend={salesTrend}
									topProducts={topProducts}
									regionPerformance={regionPerformance}
									orderStatus={orderStatus}
									monthlyRevenue={monthlyRevenue}
									categoryBreakdown={categoryBreakdown}
									recentOrders={recentOrders}
								/>
							</DraggableChart>
						</div>
					))}
				</ReactGridLayout>
			)}
		</div>
	);
}
