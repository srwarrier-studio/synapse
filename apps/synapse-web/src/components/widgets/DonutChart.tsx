import { useMemo } from "react";
import { Paper, Text, Group, Badge, Stack } from "@mantine/core";
import type { CategoryDataPoint } from "../../domain/entities/widget";
import type { ChartDataPoint } from "./chart-adapter";
import { useChartAdapter } from "./ChartProvider";

interface DonutChartProps {
	data: CategoryDataPoint[];
	title?: string;
	showLegend?: boolean;
	centerValue?: string;
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

export function DonutChart({
	data,
	title = "Donut Chart",
	showLegend = true,
	centerValue,
	formatValue = (v) => v.toLocaleString(),
	height = 300,
}: DonutChartProps) {
	const chart = useChartAdapter();

	const chartData = useMemo(() => transformData(data), [data]);

	return (
		<Paper p="md" radius="sm">
			<Group justify="space-between" mb="md">
				<Text fw={600}>{title}</Text>
				<Group gap="xs">
					{centerValue && (
						<Badge variant="light" color="synapse-blue" size="sm">
							{centerValue}
						</Badge>
					)}
					<Badge variant="light" color="gray" size="sm">
						{data.length} items
					</Badge>
				</Group>
			</Group>
			{chart.renderDonutChart({ data: chartData, height, centerValue })}
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
		</Paper>
	);
}
