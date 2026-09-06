import { useMemo } from "react";
import { Chart } from "react-charts";
import type { AxisOptions } from "react-charts";
import type {
	ChartAdapter,
	LineChartProps,
	BarChartProps,
	PieChartProps,
	DonutChartProps,
	AreaChartProps,
	TimeSeriesPoint,
	ChartDataPoint,
} from "../chart-adapter";

type LineDatum = {
	date: string;
	value: number;
};

type CategoryDatum = {
	label: string;
	value: number;
};

function useLineAxes() {
	const primaryAxis = useMemo(
		(): AxisOptions<LineDatum> => ({
			getValue: (datum) => datum.date,
		}),
		[],
	);

	const secondaryAxes = useMemo(
		(): AxisOptions<LineDatum>[] => [
			{
				getValue: (datum) => datum.value,
			},
		],
		[],
	);

	return { primaryAxis, secondaryAxes };
}

function useCategoryAxes(elementType?: "bar") {
	const primaryAxis = useMemo(
		(): AxisOptions<CategoryDatum> => ({
			getValue: (datum) => datum.label,
		}),
		[],
	);

	const secondaryAxes = useMemo(
		(): AxisOptions<CategoryDatum>[] => [
			{
				getValue: (datum) => datum.value,
				elementType,
			},
		],
		[elementType],
	);

	return { primaryAxis, secondaryAxes };
}

function renderLineChart({ data, height }: LineChartProps) {
	const chartData = data.map((series) => ({
		label: series.label,
		data: series.data.map((point) => ({
			date: point.date,
			value: point.value,
		})),
	}));

	return <LineChartInner data={chartData} height={height} />;
}

function LineChartInner({
	data,
	height,
}: {
	data: Array<{ label: string; data: LineDatum[] }>;
	height: number;
}) {
	const { primaryAxis, secondaryAxes } = useLineAxes();

	return (
		<div style={{ height }}>
			<Chart
				options={{
					data,
					primaryAxis,
					secondaryAxes,
				}}
			/>
		</div>
	);
}

function renderBarChart({ data, height }: BarChartProps) {
	const chartData = [
		{
			label: "Value",
			data: data.map((d) => ({
				label: d.label,
				value: d.value,
			})),
		},
	];

	return <BarChartInner data={chartData} height={height} />;
}

function BarChartInner({
	data,
	height,
}: {
	data: Array<{ label: string; data: CategoryDatum[] }>;
	height: number;
}) {
	const { primaryAxis, secondaryAxes } = useCategoryAxes("bar");

	return (
		<div style={{ height }}>
			<Chart
				options={{
					data,
					primaryAxis,
					secondaryAxes,
				}}
			/>
		</div>
	);
}

function renderPieChart({ data, height }: PieChartProps) {
	const chartData = [
		{
			label: "Value",
			data: data.map((d) => ({
				label: d.label,
				value: d.value,
			})),
		},
	];

	return <PieChartInner data={chartData} height={height} />;
}

function PieChartInner({
	data,
	height,
}: {
	data: Array<{ label: string; data: CategoryDatum[] }>;
	height: number;
}) {
	const { primaryAxis, secondaryAxes } = useCategoryAxes();

	return (
		<div style={{ height }}>
			<Chart
				options={{
					data,
					primaryAxis,
					secondaryAxes,
				}}
			/>
		</div>
	);
}

function renderDonutChart({ data, height }: DonutChartProps) {
	const chartData = [
		{
			label: "Value",
			data: data.map((d) => ({
				label: d.label,
				value: d.value,
			})),
		},
	];

	return <DonutChartInner data={chartData} height={height} />;
}

function DonutChartInner({
	data,
	height,
}: {
	data: Array<{ label: string; data: CategoryDatum[] }>;
	height: number;
}) {
	const { primaryAxis, secondaryAxes } = useCategoryAxes();

	return (
		<div style={{ height, position: "relative" }}>
			<Chart
				options={{
					data,
					primaryAxis,
					secondaryAxes,
				}}
			/>
		</div>
	);
}

function renderAreaChart({ data, height }: AreaChartProps) {
	const chartData = data.map((series) => ({
		label: series.label,
		data: series.data.map((point) => ({
			date: point.date,
			value: point.value,
		})),
	}));

	return <AreaChartInner data={chartData} height={height} />;
}

function AreaChartInner({
	data,
	height,
}: {
	data: Array<{ label: string; data: LineDatum[] }>;
	height: number;
}) {
	const { primaryAxis, secondaryAxes } = useLineAxes();

	return (
		<div style={{ height }}>
			<Chart
				options={{
					data,
					primaryAxis,
					secondaryAxes,
				}}
			/>
		</div>
	);
}

export const reactChartsAdapter: ChartAdapter = {
	renderLineChart,
	renderBarChart,
	renderPieChart,
	renderDonutChart,
	renderAreaChart,
};
