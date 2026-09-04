import { useMemo } from "react";
import { Paper, Text, Group, Badge, Stack } from "@mantine/core";
import { Chart } from "react-charts";
import type { OrderStatus } from "../../domain/entities/dashboard";
import type { AxisOptions } from "react-charts";

interface OrderStatusChartProps {
	data: OrderStatus[];
}

type ChartDatum = {
	status: string;
	count: number;
};

const STATUS_COLORS: Record<string, string> = {
	DELIVERED: "sami-green.5",
	SHIPPED: "synapse-blue.5",
	PROCESSING: "orange.5",
	PENDING_APPROVAL: "yellow.5",
	CANCELLED: "red.5",
};

const STATUS_LABELS: Record<string, string> = {
	DELIVERED: "Delivered",
	SHIPPED: "Shipped",
	PROCESSING: "Processing",
	PENDING_APPROVAL: "Pending Approval",
	CANCELLED: "Cancelled",
};

export function OrderStatusChart({ data }: OrderStatusChartProps) {
	const chartData = useMemo(
		() => [
			{
				label: "Orders",
				data: data.map((d) => ({
					status: STATUS_LABELS[d.status] || d.status,
					count: d.count,
				})),
			},
		],
		[data],
	);

	const primaryAxis = useMemo(
		(): AxisOptions<ChartDatum> => ({
			getValue: (datum) => datum.status,
		}),
		[],
	);

	const secondaryAxes = useMemo(
		(): AxisOptions<ChartDatum>[] => [
			{
				getValue: (datum) => datum.count,
				elementType: "bar",
			},
		],
		[],
	);

	return (
		<Paper p="md" radius="sm">
			<Group justify="space-between" mb="md">
				<Text fw={600}>Order Status Distribution</Text>
				<Badge variant="light" color="gray" size="sm">
					{data.reduce((sum, d) => sum + d.count, 0).toLocaleString()} total
				</Badge>
			</Group>
			<div style={{ height: 250 }}>
				<Chart
					options={{
						data: chartData,
						primaryAxis,
						secondaryAxes,
					}}
				/>
			</div>
			<Stack gap="xs" mt="md">
				{data.map((item) => (
					<Group key={item.status} justify="space-between">
						<Group gap="xs">
							<div
								style={{
									width: 10,
									height: 10,
									borderRadius: 2,
									backgroundColor: `var(--mantine-color-${(STATUS_COLORS[item.status] || "gray.5").replace(".", "-")})`,
								}}
							/>
							<Text size="sm">{STATUS_LABELS[item.status] || item.status}</Text>
						</Group>
						<Group gap="xs">
							<Text size="sm" fw={500}>
								{item.count.toLocaleString()}
							</Text>
							<Text size="xs" c="dimmed">
								{item.percentage}%
							</Text>
						</Group>
					</Group>
				))}
			</Stack>
		</Paper>
	);
}
