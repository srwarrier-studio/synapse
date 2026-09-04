import { createFileRoute } from "@tanstack/react-router";
import { Alert, SimpleGrid, Skeleton, Stack, Title } from "@mantine/core";
import {
	IconCurrencyDollar,
	IconShoppingCart,
	IconTruck,
	IconPackage,
	IconAlertTriangle,
} from "@tabler/icons-react";
import {
	KPICard,
	SalesTrendChart,
	TopProductsChart,
	RegionalPerformance,
	OrderStatusChart,
	MonthlyRevenueChart,
	CategoryBreakdown,
	RecentOrdersTable,
} from "../../../components/dashboard";
import { useDashboard } from "../../../hooks/useDashboard";

export const Route = createFileRoute("/_authenticated/dashboard/")({
	component: DashboardIndex,
});

function DashboardIndex() {
	const {
		summary,
		salesTrend,
		topProducts,
		regionPerformance,
		orderStatus,
		monthlyRevenue,
		categoryBreakdown,
		recentOrders,
		isLoading,
		error,
	} = useDashboard();

	if (error) {
		return (
			<Stack gap="md">
				<Title order={4}>Dashboard</Title>
				<Alert color="red" icon={<IconAlertTriangle size={16} />}>
					{error}
				</Alert>
			</Stack>
		);
	}

	if (isLoading) {
		return (
			<Stack gap="md">
				<Title order={4}>Dashboard</Title>
				<SimpleGrid cols={4}>
					{Array.from({ length: 4 }).map((_, i) => (
						<Skeleton key={i} height={120} radius="sm" />
					))}
				</SimpleGrid>
				<SimpleGrid cols={2}>
					<Skeleton height={350} radius="sm" />
					<Skeleton height={350} radius="sm" />
				</SimpleGrid>
				<SimpleGrid cols={2}>
					<Skeleton height={300} radius="sm" />
					<Skeleton height={300} radius="sm" />
				</SimpleGrid>
			</Stack>
		);
	}

	return (
		<Stack gap="md">
			<Title order={4}>Dashboard</Title>

			<SimpleGrid cols={4}>
				<KPICard
					title="Revenue"
					value={`₹${(summary?.revenue ?? 0).toLocaleString()}`}
					change={summary?.revenue_change}
					icon={<IconCurrencyDollar size={20} />}
					color="synapse-blue"
				/>
				<KPICard
					title="Orders"
					value={(summary?.orders ?? 0).toLocaleString()}
					change={summary?.orders_change}
					icon={<IconShoppingCart size={20} />}
					color="sami-green"
				/>
				<KPICard
					title="Fulfillment Rate"
					value={`${summary?.fulfillment_rate ?? 0}%`}
					icon={<IconTruck size={20} />}
					color="teal"
				/>
				<KPICard
					title="Active Shipments"
					value={(summary?.active_shipments ?? 0).toLocaleString()}
					icon={<IconPackage size={20} />}
					color="orange"
				/>
			</SimpleGrid>

			<SimpleGrid cols={2}>
				<SalesTrendChart data={salesTrend} />
				<TopProductsChart data={topProducts} />
			</SimpleGrid>

			<SimpleGrid cols={2}>
				<MonthlyRevenueChart data={monthlyRevenue} />
				<OrderStatusChart data={orderStatus} />
			</SimpleGrid>

			<SimpleGrid cols={2}>
				<CategoryBreakdown data={categoryBreakdown} />
				<RegionalPerformance data={regionPerformance} />
			</SimpleGrid>

			<RecentOrdersTable data={recentOrders} />
		</Stack>
	);
}
