export interface RegionConfig {
	label: string;
	color: string;
}

const REGION_OVERRIDES: Record<string, RegionConfig> = {
	INDIA: { label: "India", color: "synapse-blue.5" },
	NORTH_AMERICA: { label: "North America", color: "sami-green.5" },
	EUROPE: { label: "Europe", color: "violet.5" },
	SOUTHEAST_ASIA: { label: "Southeast Asia", color: "orange.7" },
	MIDDLE_EAST: { label: "Middle East", color: "red.5" },
	EAST_ASIA: { label: "East Asia", color: "cyan.5" },
	LATIN_AMERICA: { label: "Latin America", color: "pink.5" },
};

const FALLBACK_COLORS = [
	"synapse-blue.5",
	"sami-green.5",
	"orange.7",
	"red.5",
	"violet.5",
	"cyan.5",
	"pink.5",
	"lime.5",
];

const FALLBACK_CHART_COLORS = [
	"var(--mantine-color-synapse-blue-5)",
	"var(--mantine-color-sami-green-5)",
	"var(--mantine-color-orange-7)",
	"var(--mantine-color-red-5)",
	"var(--mantine-color-violet-5)",
	"var(--mantine-color-cyan-5)",
	"var(--mantine-color-pink-5)",
	"var(--mantine-color-lime-5)",
];

const fallbackIndex = new Map<string, number>();
let fallbackCounter = 0;

function getFallbackIndex(key: string): number {
	if (!fallbackIndex.has(key)) {
		fallbackIndex.set(key, fallbackCounter % FALLBACK_COLORS.length);
		fallbackCounter++;
	}
	return fallbackIndex.get(key)!;
}

export function getRegionLabel(region: string): string {
	return REGION_OVERRIDES[region]?.label || formatRegionKey(region);
}

export function getRegionColor(region: string): string {
	if (REGION_OVERRIDES[region]) return REGION_OVERRIDES[region].color;
	return FALLBACK_COLORS[getFallbackIndex(region)];
}

export function getRegionChartColor(region: string): string {
	if (REGION_OVERRIDES[region]) {
		const color = REGION_OVERRIDES[region].color;
		const colorMap: Record<string, string> = {
			"synapse-blue.5": "var(--mantine-color-synapse-blue-5)",
			"sami-green.5": "var(--mantine-color-sami-green-5)",
			"orange.7": "var(--mantine-color-orange-7)",
		};
		return colorMap[color] || color;
	}
	return FALLBACK_CHART_COLORS[getFallbackIndex(region)];
}

function formatRegionKey(key: string): string {
	return key
		.toLowerCase()
		.replace(/_/g, " ")
		.replace(/\b\w/g, (c) => c.toUpperCase());
}
