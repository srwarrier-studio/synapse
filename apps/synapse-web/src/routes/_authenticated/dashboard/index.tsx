import { createFileRoute } from "@tanstack/react-router";
import {
	Alert,
	Group,
	Stack,
	Title,
	Button,
	Drawer,
	SimpleGrid,
	Paper,
	Skeleton,
} from "@mantine/core";
import { useState } from "react";
import {
	IconAlertTriangle,
	IconLayoutSidebar,
	IconEdit,
	IconCheck,
} from "@tabler/icons-react";
import { DashboardGrid } from "../../../components/cards/DashboardGrid";
import { WidgetRenderer } from "../../../components/dashboard/WidgetRenderer";
import { DashboardSidebar } from "../../../components/dashboard/DashboardSidebar";
import { InsightPanel } from "../../../components/insights/InsightPanel";
import { useDashboard } from "../../../hooks/useDashboard";
import { useDashboardLayout } from "../../../hooks/useDashboardLayout";
import { useInsights } from "../../../hooks/useInsights";
import { WIDGET_CONSTRAINTS } from "../../../domain/constants/dashboard-layout";

export const Route = createFileRoute("/_authenticated/dashboard/")({
	component: DashboardIndex,
});

function LoadingSkeletons() {
	return (
		<Stack gap="md">
			<SimpleGrid cols={{ base: 1, sm: 2, lg: 4 }}>
				{Array.from({ length: 4 }).map((_, i) => (
					<Paper key={i} p="md" radius="md">
						<Skeleton height={14} width="40%" mb="sm" />
						<Skeleton height={28} width="60%" mb="xs" />
						<Skeleton height={12} width="30%" />
					</Paper>
				))}
			</SimpleGrid>
			<SimpleGrid cols={{ base: 1, lg: 2 }}>
				{Array.from({ length: 2 }).map((_, i) => (
					<Paper key={i} p="md" radius="md">
						<Skeleton height={16} width="35%" mb="md" />
						<Skeleton height={200} />
					</Paper>
				))}
			</SimpleGrid>
		</Stack>
	);
}

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

	const {
		widgets,
		gridLayout,
		onLayoutChange,
		addWidget,
		removeWidget,
		applyTemplate,
		resetLayout,
	} = useDashboardLayout();

	const { data: insightData, isLoading: insightLoading, error: insightError, fetchMonth, close: closeInsight } = useInsights();

	const [sidebarOpen, setSidebarOpen] = useState(false);
	const [isEditing, setIsEditing] = useState(false);

	function handleDrillDown(month: string, year: number) {
		fetchMonth(month, year);
	}

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

	return (
		<Stack gap="md" h="100%">
			<Group justify="space-between">
				<Title order={4}>Dashboard</Title>
				<Group gap="xs">
					{isEditing ? (
						<Button
							leftSection={<IconCheck size={16} />}
							variant="filled"
							size="sm"
							onClick={() => setIsEditing(false)}
						>
							Done
						</Button>
					) : (
						<Button
							leftSection={<IconEdit size={16} />}
							variant="light"
							size="sm"
							onClick={() => setIsEditing(true)}
						>
							Edit
						</Button>
					)}
					<Button
						leftSection={<IconLayoutSidebar size={16} />}
						variant="light"
						size="sm"
						onClick={() => setSidebarOpen(true)}
					>
						Add Views
					</Button>
				</Group>
			</Group>

			{isLoading ? (
				<LoadingSkeletons />
			) : (
				<DashboardGrid
					layout={gridLayout.map((item) => ({
						...item,
						static: !isEditing,
					}))}
					onLayoutChange={isEditing ? onLayoutChange : undefined}
					draggable={isEditing}
				>
					{widgets.map((widget) => {
						const constraints = WIDGET_CONSTRAINTS[widget.type];
						return (
							<div
								key={widget.id}
								data-grid={{
									w: constraints.defaultW,
									h: constraints.defaultH,
									minW: constraints.minW,
									minH: constraints.minH,
								}}
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
									onDrillDown={handleDrillDown}
								/>
							</div>
						);
					})}
				</DashboardGrid>
			)}

			<Drawer
				opened={sidebarOpen}
				onClose={() => setSidebarOpen(false)}
				title="Add Views"
				position="right"
				size="sm"
			>
				<DashboardSidebar
					onApplyTemplate={(templateId: string) => {
						applyTemplate(templateId);
						setSidebarOpen(false);
					}}
					onAddWidget={addWidget}
					onReset={() => {
						resetLayout();
						setSidebarOpen(false);
					}}
				/>
			</Drawer>

			<InsightPanel
				data={insightData}
				isLoading={insightLoading}
				error={insightError}
				onClose={closeInsight}
			/>
		</Stack>
	);
}
