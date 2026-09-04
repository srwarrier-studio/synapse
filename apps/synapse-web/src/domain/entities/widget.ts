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

export interface WidgetConfig {
	id: string;
	type: ChartType;
	title: string;
	category: WidgetCategory;
	dataKey: string;
	params?: Record<string, unknown>;
	gridPosition: {
		x: number;
		y: number;
		w: number;
		h: number;
		minW: number;
		minH: number;
	};
}

export interface WidgetDataRequest {
	widgets: Array<{
		id: string;
		type: ChartType;
		dataKey: string;
		params?: Record<string, unknown>;
	}>;
}

export interface WidgetDataResponse {
	data: Record<string, unknown>;
}

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

export const CHART_TYPE_LABELS: Record<ChartType, string> = {
	kpi: "KPI Card",
	line: "Line Chart",
	bar: "Bar Chart",
	pie: "Pie Chart",
	donut: "Donut Chart",
	area: "Area Chart",
	"stacked-bar": "Stacked Bar",
	"grouped-bar": "Grouped Bar",
	scatter: "Scatter Plot",
	bubble: "Bubble Chart",
	heatmap: "Heatmap",
	gauge: "Gauge",
	progress: "Progress Bar",
	table: "Data Table",
	sparkline: "Sparkline",
	funnel: "Funnel Chart",
	radar: "Radar Chart",
	treemap: "Treemap",
	waterfall: "Waterfall Chart",
	bullet: "Bullet Chart",
};

export const WIDGET_CATEGORY_LABELS: Record<WidgetCategory, string> = {
	finance: "Finance",
	operations: "Operations",
	research: "Research & Development",
	manufacturing: "Manufacturing",
	quality: "Quality Control",
	sales: "Sales & Marketing",
	"supply-chain": "Supply Chain",
	hr: "Human Resources",
};

export const CHART_TYPE_DEFAULTS: Record<ChartType, { w: number; h: number; minW: number; minH: number }> = {
	kpi: { w: 3, h: 2, minW: 2, minH: 2 },
	line: { w: 6, h: 4, minW: 4, minH: 3 },
	bar: { w: 6, h: 4, minW: 4, minH: 3 },
	pie: { w: 4, h: 4, minW: 3, minH: 3 },
	donut: { w: 4, h: 4, minW: 3, minH: 3 },
	area: { w: 6, h: 4, minW: 4, minH: 3 },
	"stacked-bar": { w: 6, h: 4, minW: 4, minH: 3 },
	"grouped-bar": { w: 6, h: 4, minW: 4, minH: 3 },
	scatter: { w: 6, h: 4, minW: 4, minH: 3 },
	bubble: { w: 6, h: 4, minW: 4, minH: 3 },
	heatmap: { w: 6, h: 4, minW: 4, minH: 3 },
	gauge: { w: 4, h: 3, minW: 3, minH: 3 },
	progress: { w: 4, h: 2, minW: 3, minH: 2 },
	table: { w: 12, h: 6, minW: 6, minH: 4 },
	sparkline: { w: 4, h: 2, minW: 3, minH: 2 },
	funnel: { w: 6, h: 4, minW: 4, minH: 3 },
	radar: { w: 6, h: 4, minW: 4, minH: 3 },
	treemap: { w: 6, h: 4, minW: 4, minH: 3 },
	waterfall: { w: 6, h: 4, minW: 4, minH: 3 },
	bullet: { w: 6, h: 3, minW: 4, minH: 2 },
};
