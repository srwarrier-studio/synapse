export type ChartType =
	| "kpi"
	| "line"
	| "bar"
	| "pie"
	| "donut"
	| "area"
	| "stacked-bar"
	| "grouped-bar"
	| "scatter"
	| "bubble"
	| "heatmap"
	| "gauge"
	| "progress"
	| "table"
	| "sparkline"
	| "funnel"
	| "radar"
	| "treemap"
	| "waterfall"
	| "bullet";

export type WidgetCategory =
	| "finance"
	| "operations"
	| "research"
	| "manufacturing"
	| "quality"
	| "sales"
	| "supply-chain"
	| "hr";

export interface KPIData {
	value: number | string;
	change?: number;
	changeLabel?: string;
	secondaryValue?: string;
}

export interface TimeSeriesDataPoint {
	date: string;
	value: number;
	series?: string;
}

export interface CategoryDataPoint {
	label: string;
	value: number;
	color?: string;
	percentage?: number;
}

export interface TableData {
	columns: Array<{ key: string; label: string; type?: "text" | "number" | "currency" | "date" | "status" }>;
	rows: Array<Record<string, unknown>>;
}

export interface GaugeData {
	value: number;
	min: number;
	max: number;
	target?: number;
	thresholds?: Array<{ value: number; color: string; label: string }>;
}

export interface FunnelData {
	stages: Array<{ label: string; value: number; color?: string }>;
}

export interface HeatmapData {
	xLabels: string[];
	yLabels: string[];
	values: number[][];
}

export interface RadarData {
	axes: Array<{ label: string; value: number; maxValue?: number }>;
	series?: Array<{ name: string; values: number[] }>;
}

export interface TreemapData {
	items: Array<{
		label: string;
		value: number;
		color?: string;
		children?: Array<{ label: string; value: number; color?: string }>;
	}>;
}

export interface WaterfallData {
	items: Array<{
		label: string;
		value: number;
		type: "positive" | "negative" | "total";
	}>;
}

export interface ScatterData {
	points: Array<{ x: number; y: number; label?: string; series?: string; size?: number }>;
}

export interface WidgetDataMap {
	kpi: KPIData;
	line: TimeSeriesDataPoint[];
	bar: CategoryDataPoint[];
	pie: CategoryDataPoint[];
	donut: CategoryDataPoint[];
	area: TimeSeriesDataPoint[];
	"stacked-bar": Array<{ label: string; series: string; value: number }>;
	"grouped-bar": Array<{ label: string; series: string; value: number }>;
	scatter: ScatterData;
	bubble: ScatterData;
	heatmap: HeatmapData;
	gauge: GaugeData;
	progress: { value: number; max: number; label?: string };
	table: TableData;
	sparkline: number[];
	funnel: FunnelData;
	radar: RadarData;
	treemap: TreemapData;
	waterfall: WaterfallData;
	bullet: { value: number; target: number; ranges: Array<{ min: number; max: number; color: string }> };
}
