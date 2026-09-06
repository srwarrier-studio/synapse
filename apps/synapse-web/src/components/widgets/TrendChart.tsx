import { useMemo } from "react";
import { Paper, Text, Group, Badge } from "@mantine/core";
import type { TimeSeriesDataPoint } from "../../domain/entities/widget";
import type { MultiSeriesData } from "./chart-adapter";
import { useChartAdapter } from "./ChartProvider";

interface TrendChartProps {
	data: TimeSeriesDataPoint[];
	title?: string;
	valueLabel?: string;
	seriesLabel?: string;
	height?: number;
}

function transformData(data: TimeSeriesDataPoint[], seriesLabel: string): MultiSeriesData[] {
	const seriesMap = new Map<string, Array<{ date: string; value: number }>>();

	for (const point of data) {
		const key = point.series || "default";
		if (!seriesMap.has(key)) {
			seriesMap.set(key, []);
		}
		seriesMap.get(key)!.push({
			date: point.date,
			value: point.value,
		});
	}

	return Array.from(seriesMap.entries()).map(([series, points]) => ({
		label: series === "default" ? seriesLabel : series,
		data: points,
	}));
}

export function TrendChart({
	data,
	title = "Trend",
	valueLabel,
	seriesLabel = "Value",
	height = 300,
}: TrendChartProps) {
	const chart = useChartAdapter();

	const chartData = useMemo(
		() => transformData(data, seriesLabel),
		[data, seriesLabel],
	);

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
						{data.length} points
					</Badge>
				</Group>
			</Group>
			{chart.renderLineChart({ data: chartData, height })}
		</Paper>
	);
}
