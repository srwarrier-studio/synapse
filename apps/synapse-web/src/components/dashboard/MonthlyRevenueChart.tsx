import { useMemo } from "react";
import { Paper, Text, Group, Badge } from "@mantine/core";
import { Chart } from "react-charts";
import type { MonthlyRevenue } from "../../domain/entities/dashboard";
import type { AxisOptions } from "react-charts";

interface MonthlyRevenueChartProps {
	data: MonthlyRevenue[];
}

type ChartDatum = {
	month: string;
	revenue: number;
};

export function MonthlyRevenueChart({ data }: MonthlyRevenueChartProps) {
	const chartData = useMemo(
		() => [
			{
				label: "Revenue",
				data: data.map((d) => ({
					month: d.month,
					revenue: d.revenue,
				})),
			},
		],
		[data],
	);

	const primaryAxis = useMemo(
		(): AxisOptions<ChartDatum> => ({
			getValue: (datum) => datum.month,
		}),
		[],
	);

	const secondaryAxes = useMemo(
		(): AxisOptions<ChartDatum>[] => [
			{
				getValue: (datum) => datum.revenue,
				elementType: "bar",
			},
		],
		[],
	);

	const totalRevenue = data.reduce((sum, d) => sum + d.revenue, 0);
	const totalOrders = data.reduce((sum, d) => sum + d.orders, 0);

	return (
		<Paper p="md" radius="sm">
			<Group justify="space-between" mb="md">
				<Text fw={600}>Monthly Revenue</Text>
				<Group gap="xs">
					<Badge variant="light" color="synapse-blue" size="sm">
						₹{(totalRevenue / 1000000).toFixed(1)}M total
					</Badge>
					<Badge variant="light" color="gray" size="sm">
						{totalOrders.toLocaleString()} orders
					</Badge>
				</Group>
			</Group>
			<div style={{ height: 300 }}>
				<Chart
					options={{
						data: chartData,
						primaryAxis,
						secondaryAxes,
					}}
				/>
			</div>
		</Paper>
	);
}
