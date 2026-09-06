import { useMemo } from "react";
import { Paper, Text, Group, Badge, Stack } from "@mantine/core";
import type { CategoryDataPoint } from "../../domain/entities/widget";
import type { ChartDataPoint } from "./chart-adapter";
import { useChartAdapter } from "./ChartProvider";

interface BarChartProps {
	data: CategoryDataPoint[];
	title?: string;
	valueLabel?: string;
	showLegend?: boolean;
	showTable?: boolean;
	tableColumns?: Array<{ key: string; label: string }>;
	formatValue?: (value: number) => string;
	height?: number;
}

function transformData(data: CategoryDataPoint[]): ChartDataPoint[] {
	return data.map((d) => ({
		label: d.label,
		value: d.value,
		color: d.color,
		percentage: d.percentage,
	}));
}

export function BarChart({
	data,
	title = "Bar Chart",
	valueLabel,
	showLegend = false,
	showTable = false,
	tableColumns,
	formatValue = (v) => v.toLocaleString(),
	height = 250,
}: BarChartProps) {
	const chart = useChartAdapter();

	const chartData = useMemo(() => transformData(data), [data]);

	return (
		<Paper p="md" radius="sm">
			<Group justify="space-between" mb="md">
				<Text fw={600}>{title}</Text>
				<Group gap="xs">
					{valueLabel && (
						<Badge variant="light" color="synapse-blue" size="sm">
							{valueLabel}
						</Badge>
					)}
					<Badge variant="light" color="gray" size="sm">
						{data.length} items
					</Badge>
				</Group>
			</Group>
			{chart.renderBarChart({ data: chartData, height })}
			{showLegend && (
				<Stack gap="xs" mt="md">
					{data.map((item) => (
						<Group key={item.label} justify="space-between">
							<Group gap="xs">
								{item.color && (
									<div
										style={{
											width: 10,
											height: 10,
											borderRadius: 2,
											backgroundColor: item.color,
										}}
									/>
								)}
								<Text size="sm">{item.label}</Text>
							</Group>
							<Group gap="xs">
								<Text size="sm" fw={500}>
									{formatValue(item.value)}
								</Text>
								{item.percentage !== undefined && (
									<Text size="xs" c="dimmed">
										{item.percentage}%
									</Text>
								)}
							</Group>
						</Group>
					))}
				</Stack>
			)}
			{showTable && tableColumns && (
				<Group gap="xs" mt="md" justify="flex-end">
					<Badge variant="light" color="gray" size="sm">
						Total: {formatValue(data.reduce((sum, d) => sum + d.value, 0))}
					</Badge>
				</Group>
			)}
		</Paper>
	);
}
