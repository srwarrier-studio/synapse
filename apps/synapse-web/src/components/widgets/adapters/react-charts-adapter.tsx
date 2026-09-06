import type {
	ChartAdapter,
	LineChartProps,
	BarChartProps,
	PieChartProps,
	DonutChartProps,
	AreaChartProps,
} from "../chart-adapter";
import {
	LineChartInner,
	BarChartInner,
	PieChartInner,
	DonutChartInner,
	AreaChartInner,
} from "./chart-components";

function renderLineChart({ data }: LineChartProps) {
	const chartData = data.map((series) => ({
		label: series.label,
		data: series.data.map((point) => ({
			date: point.date,
			value: point.value,
		})),
	}));

	return <LineChartInner data={chartData} />;
}

function renderBarChart({ data }: BarChartProps) {
	const chartData = [
		{
			label: "Value",
			data: data.map((d) => ({
				label: d.label,
				value: d.value,
			})),
		},
	];

	return <BarChartInner data={chartData} />;
}

function renderPieChart({ data }: PieChartProps) {
	const chartData = [
		{
			label: "Value",
			data: data.map((d) => ({
				label: d.label,
				value: d.value,
			})),
		},
	];

	return <PieChartInner data={chartData} />;
}

function renderDonutChart({ data }: DonutChartProps) {
	const chartData = [
		{
			label: "Value",
			data: data.map((d) => ({
				label: d.label,
				value: d.value,
			})),
		},
	];

	return <DonutChartInner data={chartData} />;
}

function renderAreaChart({ data }: AreaChartProps) {
	const chartData = data.map((series) => ({
		label: series.label,
		data: series.data.map((point) => ({
			date: point.date,
			value: point.value,
		})),
	}));

	return <AreaChartInner data={chartData} />;
}

export const reactChartsAdapter: ChartAdapter = {
	renderLineChart,
	renderBarChart,
	renderPieChart,
	renderDonutChart,
	renderAreaChart,
};
