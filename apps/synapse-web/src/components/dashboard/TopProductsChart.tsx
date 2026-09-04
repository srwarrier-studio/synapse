import { useMemo } from "react";
import { Paper, Text, Table, Group, Badge } from "@mantine/core";
import { Chart } from "react-charts";
import type { TopProduct } from "../../domain/entities/dashboard";
import type { AxisOptions } from "react-charts";

interface TopProductsChartProps {
	data: TopProduct[];
}

type ChartDatum = {
	product: string;
	revenue: number;
};

export function TopProductsChart({ data }: TopProductsChartProps) {
	const chartData = useMemo(
		() => [
			{
				label: "Revenue",
				data: data.slice(0, 6).map((p) => ({
					product: p.name,
					revenue: p.revenue,
				})),
			},
		],
		[data],
	);

	const primaryAxis = useMemo(
		(): AxisOptions<ChartDatum> => ({
			getValue: (datum) => datum.product,
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

	const rows = data.map((product) => (
		<Table.Tr key={product.name}>
			<Table.Td>{product.name}</Table.Td>
			<Table.Td style={{ textAlign: "right" }}>
				₹{product.revenue.toLocaleString()}
			</Table.Td>
			<Table.Td style={{ textAlign: "right" }}>
				{product.units.toLocaleString()}
			</Table.Td>
		</Table.Tr>
	));

	return (
		<Paper p="md" radius="sm">
			<Group justify="space-between" mb="md">
				<Text fw={600}>Top Products</Text>
				<Badge variant="light" color="gray" size="sm">
					{data.length} products
				</Badge>
			</Group>
			<div style={{ height: 250, marginBottom: "var(--mantine-spacing-lg)" }}>
				<Chart
					options={{
						data: chartData,
						primaryAxis,
						secondaryAxes,
					}}
				/>
			</div>
			<Table>
				<Table.Thead>
					<Table.Tr>
						<Table.Th>Product</Table.Th>
						<Table.Th style={{ textAlign: "right" }}>Revenue</Table.Th>
						<Table.Th style={{ textAlign: "right" }}>Units</Table.Th>
					</Table.Tr>
				</Table.Thead>
				<Table.Tbody>{rows}</Table.Tbody>
			</Table>
		</Paper>
	);
}
