import { Paper, Text, Group, Badge, Stack } from "@mantine/core";
import type { CategoryDataPoint } from "../../domain/entities/widget";
import type { ChartDataPoint, DataPointClickEvent } from "./chart-adapter";
import { useChartAdapter } from "./ChartProvider";

interface BarChartProps {
	data: CategoryDataPoint[];
	title?: string;
	valueLabel?: string;
	showLegend?: boolean;
	formatValue?: (value: number) => string;
	onDataPointClick?: (point: DataPointClickEvent) => void;
}

const defaultFormatValue = (v: number) => v.toLocaleString();

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
	formatValue = defaultFormatValue,
	onDataPointClick,
}: BarChartProps) {
	const chart = useChartAdapter();
	const chartData = transformData(data);

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
						{data.length} items
					</Badge>
				</Group>
			</Group>
			<div style={{ flex: 1, minHeight: 0 }}>
				{chart.renderBarChart({ data: chartData, onDataPointClick })}
			</div>
			{showLegend && (
				<Stack gap="xs" mt="md" style={{ flexShrink: 0 }}>
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
