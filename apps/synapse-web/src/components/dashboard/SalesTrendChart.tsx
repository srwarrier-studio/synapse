import { useMemo } from "react";
import { Paper, Text, Group, Badge } from "@mantine/core";
import { Chart } from "react-charts";
import type { SalesTrendPoint } from "../../domain/entities/dashboard";
import type { AxisOptions } from "react-charts";
import {
	getRegionLabel,
	getRegionColor,
} from "../../domain/constants/dashboard";

interface SalesTrendChartProps {
	data: SalesTrendPoint[];
}

type ChartDatum = {
	month: string;
	amount: number;
};

export function SalesTrendChart({ data }: SalesTrendChartProps) {
	const { chartData, regions } = useMemo(() => {
		const regionMap = new Map<string, ChartDatum[]>();

		for (const point of data) {
			if (!regionMap.has(point.region)) {
				regionMap.set(point.region, []);
			}
			regionMap.get(point.region)!.push({
				month: point.month,
				amount: point.amount,
			});
		}

		const regions = Array.from(regionMap.keys());
		const chartData = regions.map((region) => ({
			label: getRegionLabel(region),
			data: regionMap.get(region)!,
		}));

		return { chartData, regions };
	}, [data]);

	const primaryAxis = useMemo(
		(): AxisOptions<ChartDatum> => ({
			getValue: (datum) => datum.month,
		}),
		[],
	);

	const secondaryAxes = useMemo(
		(): AxisOptions<ChartDatum>[] => [
			{
				getValue: (datum) => datum.amount,
			},
		],
		[],
	);

	return (
		<Paper p="md" radius="sm">
			<Group justify="space-between" mb="md">
				<Text fw={600}>Sales Trend by Region</Text>
				<Group gap="xs">
					{regions.map((region) => (
						<Badge
							key={region}
							variant="light"
							color={getRegionColor(region)}
							size="sm"
						>
							{getRegionLabel(region)}
						</Badge>
					))}
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
