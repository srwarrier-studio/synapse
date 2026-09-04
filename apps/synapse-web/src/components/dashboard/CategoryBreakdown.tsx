import { useMemo } from "react";
import { Paper, Text, Group, Badge, Stack } from "@mantine/core";
import { Chart } from "react-charts";
import type { CategoryBreakdown as CategoryBreakdownData } from "../../domain/entities/dashboard";
import type { AxisOptions } from "react-charts";

interface CategoryBreakdownProps {
	data: CategoryBreakdownData[];
}

type ChartDatum = {
	category: string;
	revenue: number;
};

const CATEGORY_COLORS: Record<string, string> = {
	Nutraceuticals: "synapse-blue.5",
	Probiotics: "sami-green.5",
	Cosmeceuticals: "violet.5",
	"Specialty Chemicals": "orange.5",
	Enzymes: "cyan.5",
};

export function CategoryBreakdown({ data }: CategoryBreakdownProps) {
	const chartData = useMemo(
		() => [
			{
				label: "Revenue",
				data: data.map((d) => ({
					category: d.category,
					revenue: d.revenue,
				})),
			},
		],
		[data],
	);

	const primaryAxis = useMemo(
		(): AxisOptions<ChartDatum> => ({
			getValue: (datum) => datum.category,
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

	return (
		<Paper p="md" radius="sm">
			<Group justify="space-between" mb="md">
				<Text fw={600}>Product Category Breakdown</Text>
				<Badge variant="light" color="gray" size="sm">
					{data.length} categories
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
					<Group key={item.category} justify="space-between">
						<Group gap="xs">
							<div
								style={{
									width: 10,
									height: 10,
									borderRadius: 2,
									backgroundColor: `var(--mantine-color-${(CATEGORY_COLORS[item.category] || "gray.5").replace(".", "-")})`,
								}}
							/>
							<Text size="sm">{item.category}</Text>
						</Group>
						<Group gap="xs">
							<Text size="sm" fw={500}>
								₹{(item.revenue / 1000000).toFixed(1)}M
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
