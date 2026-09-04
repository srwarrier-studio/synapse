import { createFileRoute } from "@tanstack/react-router";
import { Alert, Group, Stack, Title, Button, Drawer } from "@mantine/core";
import { useState } from "react";
import {
	IconAlertTriangle,
	IconLayoutSidebar,
	IconEdit,
	IconCheck,
} from "@tabler/icons-react";
import { DashboardGrid, DashboardSidebar } from "../../../components/dashboard";
import { useDashboard } from "../../../hooks/useDashboard";
import { useDashboardLayout } from "../../../hooks/useDashboardLayout";

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

	const {
		widgets,
		gridLayout,
		onLayoutChange,
		addWidget,
		removeWidget,
		applyTemplate,
		resetLayout,
	} = useDashboardLayout();

	const [sidebarOpen, setSidebarOpen] = useState(false);
	const [isEditing, setIsEditing] = useState(false);

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
				<div>Loading...</div>
			) : (
				<DashboardGrid
					widgets={widgets}
					gridLayout={gridLayout}
					onLayoutChange={onLayoutChange}
					onRemoveWidget={isEditing ? removeWidget : undefined}
					isEditing={isEditing}
					summary={summary}
					salesTrend={salesTrend}
					topProducts={topProducts}
					regionPerformance={regionPerformance}
					orderStatus={orderStatus}
					monthlyRevenue={monthlyRevenue}
					categoryBreakdown={categoryBreakdown}
					recentOrders={recentOrders}
				/>
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
		</Stack>
	);
}
