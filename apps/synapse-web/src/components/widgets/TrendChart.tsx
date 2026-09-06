import { Paper, Text, Group, Badge, Stack } from "@mantine/core";
import type { TimeSeriesDataPoint } from "../../domain/entities/widget";
import type { DataPointClickEvent, MultiSeriesData } from "./chart-adapter";
import { useChartAdapter } from "./ChartProvider";

const REGION_COLORS: Record<string, string> = {
	North: "var(--mantine-color-synapse-blue-5)",
	South: "var(--mantine-color-sami-green-5)",
	East: "var(--mantine-color-orange-5)",
	West: "var(--mantine-color-violet-5)",
};

const SERIES_COLORS = [
	"var(--mantine-color-synapse-blue-5)",
	"var(--mantine-color-sami-green-5)",
	"var(--mantine-color-orange-5)",
	"var(--mantine-color-violet-5)",
	"var(--mantine-color-cyan-5)",
	"var(--mantine-color-pink-5)",
];

interface TrendChartProps {
	data: TimeSeriesDataPoint[];
	title?: string;
	valueLabel?: string;
	seriesLabel?: string;
	showLegend?: boolean;
	onDataPointClick?: (point: DataPointClickEvent) => void;
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

function getSeriesColor(label: string, index: number): string {
	return REGION_COLORS[label] || SERIES_COLORS[index % SERIES_COLORS.length];
}

export function TrendChart({
	data,
	title = "Trend",
	valueLabel,
	seriesLabel = "Value",
	showLegend = false,
	onDataPointClick,
}: TrendChartProps) {
	const chart = useChartAdapter();
	const chartData = transformData(data, seriesLabel);

	return (
		<Paper p="md" radius="md" h="100%" style={{ display: "flex", flexDirection: "column", cursor: onDataPointClick ? "pointer" : "default" }}>
			<Group justify="space-between" mb="md" style={{ flexShrink: 0 }}>
				<Text fw={600}>{title}</Text>
				<Group gap="xs">
					{valueLabel && (
						<Badge variant="light" color="synapse-blue" size="sm">
							{valueLabel}
						</Badge>
					)}
					<Badge variant="light" color="gray" size="sm">
						{chartData.length} series
					</Badge>
				</Group>
			</Group>
			<div style={{ flex: 1, minHeight: 0 }}>
				{chart.renderLineChart({ data: chartData, onDataPointClick })}
			</div>
			{showLegend && chartData.length > 1 && (
				<Stack gap="xs" mt="md" style={{ flexShrink: 0 }}>
					<Group gap="lg">
						{chartData.map((series, index) => (
							<Group key={series.label} gap="xs">
								<div
									style={{
										width: 10,
										height: 10,
										borderRadius: 2,
										backgroundColor: getSeriesColor(series.label, index),
									}}
								/>
								<Text size="sm">{series.label}</Text>
							</Group>
						))}
					</Group>
				</Stack>
			)}
		</Paper>
	);
}
