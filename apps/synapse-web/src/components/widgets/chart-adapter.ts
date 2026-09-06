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

export interface DataPointClickEvent {
	label: string;
	value: number;
	series?: string;
	date?: string;
}

export interface LineChartProps {
	data: MultiSeriesData[];
	onDataPointClick?: (point: DataPointClickEvent) => void;
}

export interface BarChartProps {
	data: ChartDataPoint[];
	stacked?: boolean;
	onDataPointClick?: (point: DataPointClickEvent) => void;
}

export interface PieChartProps {
	data: ChartDataPoint[];
	onDataPointClick?: (point: DataPointClickEvent) => void;
}

export interface DonutChartProps {
	data: ChartDataPoint[];
	centerValue?: string;
	onDataPointClick?: (point: DataPointClickEvent) => void;
}

export interface AreaChartProps {
	data: MultiSeriesData[];
	stacked?: boolean;
	onDataPointClick?: (point: DataPointClickEvent) => void;
}

export interface ChartAdapter {
	renderLineChart(props: LineChartProps): ReactNode;
	renderBarChart(props: BarChartProps): ReactNode;
	renderPieChart(props: PieChartProps): ReactNode;
	renderDonutChart(props: DonutChartProps): ReactNode;
	renderAreaChart(props: AreaChartProps): ReactNode;
}
