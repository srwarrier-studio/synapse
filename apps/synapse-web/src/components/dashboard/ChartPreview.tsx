import type { ChartType } from "../../domain/entities/widget";

interface ChartPreviewProps {
	type: ChartType;
	size?: number;
}

const colors = {
	primary: "#4C6EF5",
	secondary: "#7950F2",
	tertiary: "#F06595",
	quaternary: "#FF922B",
	positive: "#51CF66",
	negative: "#FF6B6B",
	neutral: "#868E96",
};

function KpiPreview() {
	return (
		<svg viewBox="0 0 80 50" fill="none">
			<text x="8" y="18" fontSize="10" fontWeight="600" fill={colors.primary}>₹84.75Cr</text>
			<text x="8" y="30" fontSize="6" fill={colors.neutral}>Revenue</text>
			<rect x="8" y="36" width="24" height="6" rx="3" fill={colors.positive} opacity="0.2"/>
			<text x="12" y="41" fontSize="5" fill={colors.positive}>+12.5%</text>
			<rect x="58" y="8" width="16" height="16" rx="4" fill={colors.primary} opacity="0.15"/>
		</svg>
	);
}

function LinePreview() {
	return (
		<svg viewBox="0 0 80 50" fill="none">
			<line x1="10" y1="45" x2="75" y2="45" stroke="#E9ECEF" strokeWidth="0.5"/>
			<line x1="10" y1="35" x2="75" y2="35" stroke="#E9ECEF" strokeWidth="0.5" strokeDasharray="2 2"/>
			<line x1="10" y1="25" x2="75" y2="25" stroke="#E9ECEF" strokeWidth="0.5" strokeDasharray="2 2"/>
			<polyline
				points="12,38 22,32 32,35 42,22 52,28 62,18 72,20"
				stroke={colors.primary}
				strokeWidth="1.5"
				fill="none"
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
			<circle cx="42" cy="22" r="2" fill={colors.primary}/>
		</svg>
	);
}

function BarPreview() {
	return (
		<svg viewBox="0 0 80 50" fill="none">
			<line x1="10" y1="45" x2="75" y2="45" stroke="#E9ECEF" strokeWidth="0.5"/>
			<rect x="14" y="28" width="8" height="17" rx="1" fill={colors.primary}/>
			<rect x="26" y="18" width="8" height="27" rx="1" fill={colors.secondary}/>
			<rect x="38" y="22" width="8" height="23" rx="1" fill={colors.tertiary}/>
			<rect x="50" y="12" width="8" height="33" rx="1" fill={colors.quaternary}/>
			<rect x="62" y="32" width="8" height="13" rx="1" fill={colors.primary} opacity="0.5"/>
		</svg>
	);
}

function PiePreview() {
	return (
		<svg viewBox="0 0 80 50" fill="none">
			<circle cx="40" cy="25" r="18" fill={colors.primary}/>
			<path d="M40 25 L40 7 A18 18 0 0 1 56 33 Z" fill={colors.secondary}/>
			<path d="M40 25 L56 33 A18 18 0 0 1 32 42 Z" fill={colors.tertiary}/>
			<path d="M40 25 L32 42 A18 18 0 0 1 28 14 Z" fill={colors.quaternary}/>
		</svg>
	);
}

function DonutPreview() {
	return (
		<svg viewBox="0 0 80 50" fill="none">
			<circle cx="40" cy="25" r="18" fill="none" stroke={colors.primary} strokeWidth="6"/>
			<circle cx="40" cy="25" r="18" fill="none" stroke={colors.secondary} strokeWidth="6" strokeDasharray="20 90" strokeDashoffset="-20"/>
			<circle cx="40" cy="25" r="18" fill="none" stroke={colors.tertiary} strokeWidth="6" strokeDasharray="15 95" strokeDashoffset="-40"/>
			<circle cx="40" cy="25" r="10" fill="white"/>
			<text x="40" y="27" fontSize="6" fontWeight="600" fill={colors.primary} textAnchor="middle">84.7Cr</text>
		</svg>
	);
}

function AreaPreview() {
	return (
		<svg viewBox="0 0 80 50" fill="none">
			<defs>
				<linearGradient id="areaGrad" x1="0" y1="0" x2="0" y2="1">
					<stop offset="0%" stopColor={colors.primary} stopOpacity="0.3"/>
					<stop offset="100%" stopColor={colors.primary} stopOpacity="0.05"/>
				</linearGradient>
			</defs>
			<path
				d="M12,40 L22,34 L32,36 L42,24 L52,28 L62,18 L72,22 L72,45 L12,45 Z"
				fill="url(#areaGrad)"
			/>
			<polyline
				points="12,40 22,34 32,36 42,24 52,28 62,18 72,22"
				stroke={colors.primary}
				strokeWidth="1.5"
				fill="none"
				strokeLinecap="round"
			/>
		</svg>
	);
}

function StackedBarPreview() {
	return (
		<svg viewBox="0 0 80 50" fill="none">
			<line x1="10" y1="45" x2="75" y2="45" stroke="#E9ECEF" strokeWidth="0.5"/>
			<rect x="14" y="28" width="8" height="17" rx="1" fill={colors.primary}/>
			<rect x="14" y="20" width="8" height="8" rx="1" fill={colors.secondary}/>
			<rect x="26" y="18" width="8" height="27" rx="1" fill={colors.primary}/>
			<rect x="26" y="10" width="8" height="8" rx="1" fill={colors.secondary}/>
			<rect x="38" y="22" width="8" height="23" rx="1" fill={colors.primary}/>
			<rect x="38" y="14" width="8" height="8" rx="1" fill={colors.secondary}/>
			<rect x="50" y="12" width="8" height="33" rx="1" fill={colors.primary}/>
			<rect x="50" y="4" width="8" height="8" rx="1" fill={colors.secondary}/>
			<rect x="62" y="32" width="8" height="13" rx="1" fill={colors.primary}/>
			<rect x="62" y="24" width="8" height="8" rx="1" fill={colors.secondary}/>
		</svg>
	);
}

function GroupedBarPreview() {
	return (
		<svg viewBox="0 0 80 50" fill="none">
			<line x1="10" y1="45" x2="75" y2="45" stroke="#E9ECEF" strokeWidth="0.5"/>
			<rect x="14" y="28" width="4" height="17" rx="1" fill={colors.primary}/>
			<rect x="19" y="22" width="4" height="23" rx="1" fill={colors.secondary}/>
			<rect x="30" y="18" width="4" height="27" rx="1" fill={colors.primary}/>
			<rect x="35" y="25" width="4" height="20" rx="1" fill={colors.secondary}/>
			<rect x="46" y="22" width="4" height="23" rx="1" fill={colors.primary}/>
			<rect x="51" y="15" width="4" height="30" rx="1" fill={colors.secondary}/>
			<rect x="62" y="32" width="4" height="13" rx="1" fill={colors.primary}/>
			<rect x="67" y="28" width="4" height="17" rx="1" fill={colors.secondary}/>
		</svg>
	);
}

function ScatterPreview() {
	return (
		<svg viewBox="0 0 80 50" fill="none">
			<line x1="10" y1="45" x2="75" y2="45" stroke="#E9ECEF" strokeWidth="0.5"/>
			<line x1="10" y1="5" x2="10" y2="45" stroke="#E9ECEF" strokeWidth="0.5"/>
			<circle cx="18" cy="38" r="2.5" fill={colors.primary} opacity="0.7"/>
			<circle cx="25" cy="30" r="2" fill={colors.primary} opacity="0.7"/>
			<circle cx="32" cy="35" r="3" fill={colors.secondary} opacity="0.7"/>
			<circle cx="40" cy="20" r="2" fill={colors.primary} opacity="0.7"/>
			<circle cx="48" cy="25" r="2.5" fill={colors.tertiary} opacity="0.7"/>
			<circle cx="55" cy="15" r="2" fill={colors.secondary} opacity="0.7"/>
			<circle cx="62" cy="22" r="3" fill={colors.primary} opacity="0.7"/>
			<circle cx="68" cy="12" r="2" fill={colors.tertiary} opacity="0.7"/>
		</svg>
	);
}

function BubblePreview() {
	return (
		<svg viewBox="0 0 80 50" fill="none">
			<line x1="10" y1="45" x2="75" y2="45" stroke="#E9ECEF" strokeWidth="0.5"/>
			<circle cx="20" cy="35" r="5" fill={colors.primary} opacity="0.5"/>
			<circle cx="35" cy="22" r="8" fill={colors.secondary} opacity="0.4"/>
			<circle cx="55" cy="18" r="6" fill={colors.tertiary} opacity="0.5"/>
			<circle cx="65" cy="30" r="4" fill={colors.quaternary} opacity="0.5"/>
		</svg>
	);
}

function HeatmapPreview() {
	return (
		<svg viewBox="0 0 80 50" fill="none">
			<rect x="12" y="6" width="10" height="8" rx="1" fill={colors.positive} opacity="0.8"/>
			<rect x="24" y="6" width="10" height="8" rx="1" fill={colors.positive} opacity="0.5"/>
			<rect x="36" y="6" width="10" height="8" rx="1" fill={colors.negative} opacity="0.6"/>
			<rect x="48" y="6" width="10" height="8" rx="1" fill={colors.positive} opacity="0.9"/>
			<rect x="60" y="6" width="10" height="8" rx="1" fill={colors.positive} opacity="0.3"/>
			<rect x="12" y="16" width="10" height="8" rx="1" fill={colors.positive} opacity="0.4"/>
			<rect x="24" y="16" width="10" height="8" rx="1" fill={colors.negative} opacity="0.7"/>
			<rect x="36" y="16" width="10" height="8" rx="1" fill={colors.positive} opacity="0.6"/>
			<rect x="48" y="16" width="10" height="8" rx="1" fill={colors.positive} opacity="0.5"/>
			<rect x="60" y="16" width="10" height="8" rx="1" fill={colors.positive} opacity="0.8"/>
			<rect x="12" y="26" width="10" height="8" rx="1" fill={colors.negative} opacity="0.5"/>
			<rect x="24" y="26" width="10" height="8" rx="1" fill={colors.positive} opacity="0.9"/>
			<rect x="36" y="26" width="10" height="8" rx="1" fill={colors.positive} opacity="0.4"/>
			<rect x="48" y="26" width="10" height="8" rx="1" fill={colors.positive} opacity="0.7"/>
			<rect x="60" y="26" width="10" height="8" rx="1" fill={colors.negative} opacity="0.4"/>
			<rect x="12" y="36" width="10" height="8" rx="1" fill={colors.positive} opacity="0.7"/>
			<rect x="24" y="36" width="10" height="8" rx="1" fill={colors.positive} opacity="0.6"/>
			<rect x="36" y="36" width="10" height="8" rx="1" fill={colors.positive} opacity="0.8"/>
			<rect x="48" y="36" width="10" height="8" rx="1" fill={colors.negative} opacity="0.6"/>
			<rect x="60" y="36" width="10" height="8" rx="1" fill={colors.positive} opacity="0.5"/>
		</svg>
	);
}

function GaugePreview() {
	return (
		<svg viewBox="0 0 80 50" fill="none">
			<path d="M15,40 A25,25 0 0,1 65,40" stroke="#E9ECEF" strokeWidth="4" fill="none" strokeLinecap="round"/>
			<path d="M15,40 A25,25 0 0,1 52,18" stroke={colors.positive} strokeWidth="4" fill="none" strokeLinecap="round"/>
			<circle cx="40" cy="40" r="3" fill={colors.primary}/>
			<text x="40" y="36" fontSize="7" fontWeight="600" fill={colors.primary} textAnchor="middle">87%</text>
		</svg>
	);
}

function ProgressPreview() {
	return (
		<svg viewBox="0 0 80 50" fill="none">
			<rect x="10" y="18" width="60" height="10" rx="5" fill="#E9ECEF"/>
			<rect x="10" y="18" width="47" height="10" rx="5" fill={colors.primary}/>
			<text x="40" y="40" fontSize="6" fill={colors.neutral} textAnchor="middle">78% complete</text>
		</svg>
	);
}

function TablePreview() {
	return (
		<svg viewBox="0 0 80 50" fill="none">
			<rect x="8" y="6" width="64" height="8" rx="1" fill={colors.primary} opacity="0.15"/>
			<text x="12" y="12" fontSize="4" fontWeight="600" fill={colors.primary}>ID</text>
			<text x="28" y="12" fontSize="4" fontWeight="600" fill={colors.primary}>Name</text>
			<text x="52" y="12" fontSize="4" fontWeight="600" fill={colors.primary}>Status</text>
			<line x1="8" y1="16" x2="72" y2="16" stroke="#E9ECEF" strokeWidth="0.5"/>
			<text x="12" y="23" fontSize="4" fill={colors.neutral}>001</text>
			<text x="28" y="23" fontSize="4" fill={colors.neutral}>Product A</text>
			<rect x="52" y="19" width="14" height="5" rx="2.5" fill={colors.positive} opacity="0.2"/>
			<text x="56" y="23" fontSize="3" fill={colors.positive}>Active</text>
			<text x="12" y="30" fontSize="4" fill={colors.neutral}>002</text>
			<text x="28" y="30" fontSize="4" fill={colors.neutral}>Product B</text>
			<rect x="52" y="26" width="14" height="5" rx="2.5" fill={colors.quaternary} opacity="0.2"/>
			<text x="56" y="30" fontSize="3" fill={colors.quaternary}>Pending</text>
			<text x="12" y="37" fontSize="4" fill={colors.neutral}>003</text>
			<text x="28" y="37" fontSize="4" fill={colors.neutral}>Product C</text>
			<rect x="52" y="33" width="14" height="5" rx="2.5" fill={colors.positive} opacity="0.2"/>
			<text x="56" y="37" fontSize="3" fill={colors.positive}>Active</text>
		</svg>
	);
}

function SparklinePreview() {
	return (
		<svg viewBox="0 0 80 50" fill="none">
			<polyline
				points="8,35 16,28 24,32 32,18 40,22 48,12 56,16 64,10 72,14"
				stroke={colors.primary}
				strokeWidth="1.5"
				fill="none"
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
			<circle cx="72" cy="14" r="2" fill={colors.primary}/>
			<text x="8" y="46" fontSize="5" fill={colors.neutral}>12 months</text>
		</svg>
	);
}

function FunnelPreview() {
	return (
		<svg viewBox="0 0 80 50" fill="none">
			<path d="M10,8 L70,8 L62,18 L18,18 Z" fill={colors.primary} opacity="0.8"/>
			<path d="M18,20 L62,20 L56,28 L24,28 Z" fill={colors.secondary} opacity="0.8"/>
			<path d="M24,30 L56,30 L50,38 L30,38 Z" fill={colors.tertiary} opacity="0.8"/>
			<path d="M30,40 L50,40 L46,46 L34,46 Z" fill={colors.quaternary} opacity="0.8"/>
		</svg>
	);
}

function RadarPreview() {
	return (
		<svg viewBox="0 0 80 50" fill="none">
			<polygon points="40,8 60,20 55,40 25,40 20,20" stroke="#E9ECEF" strokeWidth="0.5" fill="none"/>
			<polygon points="40,14 52,22 48,34 32,34 28,22" stroke="#E9ECEF" strokeWidth="0.5" fill="none"/>
			<polygon points="40,20 44,24 42,28 38,28 36,24" stroke="#E9ECEF" strokeWidth="0.5" fill="none"/>
			<polygon
				points="40,12 56,22 50,38 30,38 24,22"
				stroke={colors.primary}
				strokeWidth="1"
				fill={colors.primary}
				fillOpacity="0.2"
			/>
			<circle cx="40" cy="12" r="1.5" fill={colors.primary}/>
			<circle cx="56" cy="22" r="1.5" fill={colors.primary}/>
			<circle cx="50" cy="38" r="1.5" fill={colors.primary}/>
			<circle cx="30" cy="38" r="1.5" fill={colors.primary}/>
			<circle cx="24" cy="22" r="1.5" fill={colors.primary}/>
		</svg>
	);
}

function TreemapPreview() {
	return (
		<svg viewBox="0 0 80 50" fill="none">
			<rect x="8" y="6" width="30" height="20" rx="2" fill={colors.primary} opacity="0.8"/>
			<rect x="40" y="6" width="32" height="10" rx="2" fill={colors.secondary} opacity="0.8"/>
			<rect x="40" y="18" width="16" height="8" rx="2" fill={colors.tertiary} opacity="0.8"/>
			<rect x="58" y="18" width="14" height="8" rx="2" fill={colors.quaternary} opacity="0.8"/>
			<rect x="8" y="28" width="20" height="16" rx="2" fill={colors.positive} opacity="0.6"/>
			<rect x="30" y="28" width="22" height="16" rx="2" fill={colors.primary} opacity="0.5"/>
			<rect x="54" y="28" width="18" height="16" rx="2" fill={colors.secondary} opacity="0.5"/>
			<text x="18" y="18" fontSize="5" fontWeight="600" fill="white">32%</text>
			<text x="50" y="14" fontSize="4" fontWeight="600" fill="white">22%</text>
		</svg>
	);
}

function WaterfallPreview() {
	return (
		<svg viewBox="0 0 80 50" fill="none">
			<line x1="10" y1="45" x2="75" y2="45" stroke="#E9ECEF" strokeWidth="0.5"/>
			<rect x="12" y="30" width="8" height="15" rx="1" fill={colors.primary}/>
			<line x1="20" y1="30" x2="24" y2="30" stroke={colors.neutral} strokeWidth="0.5" strokeDasharray="2 1"/>
			<rect x="24" y="18" width="8" height="12" rx="1" fill={colors.positive}/>
			<line x1="32" y1="18" x2="36" y2="18" stroke={colors.neutral} strokeWidth="0.5" strokeDasharray="2 1"/>
			<rect x="36" y="24" width="8" height="8" rx="1" fill={colors.negative}/>
			<line x1="44" y1="32" x2="48" y2="32" stroke={colors.neutral} strokeWidth="0.5" strokeDasharray="2 1"/>
			<rect x="48" y="14" width="8" height="18" rx="1" fill={colors.positive}/>
			<line x1="56" y1="14" x2="60" y2="14" stroke={colors.neutral} strokeWidth="0.5" strokeDasharray="2 1"/>
			<rect x="60" y="10" width="8" height="35" rx="1" fill={colors.primary} opacity="0.6"/>
		</svg>
	);
}

function BulletPreview() {
	return (
		<svg viewBox="0 0 80 50" fill="none">
			<rect x="10" y="20" width="60" height="10" rx="2" fill="#E9ECEF"/>
			<rect x="10" y="20" width="20" height="10" rx="2" fill={colors.negative} opacity="0.5"/>
			<rect x="10" y="20" width="40" height="10" rx="2" fill={colors.quaternary} opacity="0.3"/>
			<rect x="10" y="20" width="50" height="10" rx="2" fill={colors.positive} opacity="0.2"/>
			<line x1="55" y1="16" x2="55" y2="34" stroke={colors.primary} strokeWidth="2"/>
			<rect x="53" y="14" width="4" height="4" rx="1" fill={colors.primary}/>
			<text x="40" y="42" fontSize="5" fill={colors.neutral} textAnchor="middle">Target: 900Cr</text>
		</svg>
	);
}

const previewMap: Record<ChartType, React.FC> = {
	kpi: KpiPreview,
	line: LinePreview,
	bar: BarPreview,
	pie: PiePreview,
	donut: DonutPreview,
	area: AreaPreview,
	"stacked-bar": StackedBarPreview,
	"grouped-bar": GroupedBarPreview,
	scatter: ScatterPreview,
	bubble: BubblePreview,
	heatmap: HeatmapPreview,
	gauge: GaugePreview,
	progress: ProgressPreview,
	table: TablePreview,
	sparkline: SparklinePreview,
	funnel: FunnelPreview,
	radar: RadarPreview,
	treemap: TreemapPreview,
	waterfall: WaterfallPreview,
	bullet: BulletPreview,
};

export function ChartPreview({ type, size = 60 }: ChartPreviewProps) {
	const PreviewComponent = previewMap[type];
	return (
		<div
			style={{
				width: size,
				height: size * 0.625,
				borderRadius: 4,
				overflow: "hidden",
				background: "var(--mantine-color-gray-0)",
				border: "1px solid var(--mantine-color-default-border)",
				flexShrink: 0,
			}}
		>
			<PreviewComponent />
		</div>
	);
}
