import type { ReactNode } from "react";

export interface ChartDataPoint {
	label: string;
	value: number;
	color?: string;
}

export interface TimeSeriesPoint {
	date: string;
	value: number;
	series?: string;
}

export interface MultiSeriesData {
	label: string;
	data: TimeSeriesPoint[];
}

export interface LineChartProps {
	data: MultiSeriesData[];
	height: number;
}

export interface BarChartProps {
	data: ChartDataPoint[];
	height: number;
	stacked?: boolean;
}

export interface PieChartProps {
	data: ChartDataPoint[];
	height: number;
}

export interface DonutChartProps {
	data: ChartDataPoint[];
	height: number;
	centerValue?: string;
}

export interface AreaChartProps {
	data: MultiSeriesData[];
	height: number;
	stacked?: boolean;
}

export interface ChartAdapter {
	renderLineChart(props: LineChartProps): ReactNode;
	renderBarChart(props: BarChartProps): ReactNode;
	renderPieChart(props: PieChartProps): ReactNode;
	renderDonutChart(props: DonutChartProps): ReactNode;
	renderAreaChart(props: AreaChartProps): ReactNode;
}
