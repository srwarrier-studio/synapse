import { Paper, Text, Group, Badge } from "@mantine/core";
import type { GaugeData } from "../../domain/entities/widget";

interface GaugeWidgetProps {
	data: GaugeData;
	title?: string;
	formatValue?: (value: number) => string;
	height?: number;
}

export function GaugeWidget({
	data,
	title = "Gauge",
	formatValue = (v) => v.toLocaleString(),
	height = 120,
}: GaugeWidgetProps) {
	const { value, min, max, target, thresholds } = data;
	const percentage = ((value - min) / (max - min)) * 100;

	const getColor = () => {
		if (thresholds) {
			for (let i = thresholds.length - 1; i >= 0; i--) {
				if (value >= thresholds[i].value) {
					return thresholds[i].color;
				}
			}
		}
		return "var(--mantine-color-blue-5)";
	};

	const color = getColor();

	return (
		<Paper p="md" radius="sm">
			<Group justify="space-between" mb="md">
				<Text fw={600}>{title}</Text>
				<Badge variant="light" color="gray" size="sm">
					{formatValue(value)} / {formatValue(max)}
				</Badge>
			</Group>
			<div style={{ height, display: "flex", alignItems: "center", justifyContent: "center" }}>
				<svg width="100%" height={height} viewBox="0 0 200 100">
					<path
						d="M20,90 A80,80 0 0,1 180,90"
						fill="none"
						stroke="var(--mantine-color-gray-3)"
						strokeWidth="12"
						strokeLinecap="round"
					/>
					<path
						d="M20,90 A80,80 0 0,1 180,90"
						fill="none"
						stroke={color}
						strokeWidth="12"
						strokeLinecap="round"
						strokeDasharray={`${percentage * 2.51} 251`}
					/>
					{target !== undefined && (
						<>
							<line
								x1={20 + (target / max) * 160}
								y1={90 - Math.sin(((target / max) * Math.PI) / 2) * 80}
								x2={20 + (target / max) * 160}
								y2={90 - Math.sin(((target / max) * Math.PI) / 2) * 80 + 10}
								stroke="var(--mantine-color-dark-5)"
								strokeWidth="3"
							/>
						</>
					)}
					<text
						x="100"
						y="85"
						textAnchor="middle"
						fontSize="20"
						fontWeight="600"
						fill="var(--mantine-color-dark-7)"
					>
						{formatValue(value)}
					</text>
				</svg>
			</div>
		</Paper>
	);
}
