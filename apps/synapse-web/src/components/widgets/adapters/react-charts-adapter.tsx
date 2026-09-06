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

function renderLineChart({ data, onDataPointClick }: LineChartProps) {
	const chartData = data.map((series) => ({
		label: series.label,
		data: series.data.map((point) => ({
			date: point.date,
			value: point.value,
		})),
	}));

	return <LineChartInner data={chartData} onDataPointClick={onDataPointClick} />;
}

function renderBarChart({ data, onDataPointClick }: BarChartProps) {
	const chartData = [
		{
			label: "Value",
			data: data.map((d) => ({
				label: d.label,
				value: d.value,
			})),
		},
	];

	return <BarChartInner data={chartData} onDataPointClick={onDataPointClick} />;
}

function renderPieChart({ data, onDataPointClick }: PieChartProps) {
	const chartData = [
		{
			label: "Value",
			data: data.map((d) => ({
				label: d.label,
				value: d.value,
			})),
		},
	];

	return <PieChartInner data={chartData} onDataPointClick={onDataPointClick} />;
}

function renderDonutChart({ data, onDataPointClick }: DonutChartProps) {
	const chartData = [
		{
			label: "Value",
			data: data.map((d) => ({
				label: d.label,
				value: d.value,
			})),
		},
	];

	return <DonutChartInner data={chartData} onDataPointClick={onDataPointClick} />;
}

function renderAreaChart({ data, onDataPointClick }: AreaChartProps) {
	const chartData = data.map((series) => ({
		label: series.label,
		data: series.data.map((point) => ({
			date: point.date,
			value: point.value,
		})),
	}));

	return <AreaChartInner data={chartData} onDataPointClick={onDataPointClick} />;
}

export const reactChartsAdapter: ChartAdapter = {
	renderLineChart,
	renderBarChart,
	renderPieChart,
	renderDonutChart,
	renderAreaChart,
};
