import { Paper, Text, Group, Badge } from "@mantine/core";

interface SparklineWidgetProps {
	data: number[];
	title?: string;
	value?: number;
	change?: number;
	formatValue?: (value: number) => string;
	height?: number;
}

export function SparklineWidget({
	data,
	title = "Sparkline",
	value,
	change,
	formatValue = (v) => v.toLocaleString(),
	height = 60,
}: SparklineWidgetProps) {
	const max = Math.max(...data);
	const min = Math.min(...data);
	const range = max - min || 1;

	const points = data
		.map((v, i) => {
			const x = (i / (data.length - 1)) * 100;
			const y = height - ((v - min) / range) * (height - 10) - 5;
			return `${x},${y}`;
		})
		.join(" ");

	const isPositive = change !== undefined && change > 0;

	return (
		<Paper p="md" radius="sm">
			<Group justify="space-between" mb="xs">
				<Text fw={600} size="sm">
					{title}
				</Text>
				{change !== undefined && (
					<Badge
						variant="light"
						color={isPositive ? "sami-green" : "red"}
						size="sm"
					>
						{isPositive ? "+" : ""}
						{change}%
					</Badge>
				)}
			</Group>
			<svg
				width="100%"
				height={height}
				viewBox={`0 0 100 ${height}`}
				preserveAspectRatio="none"
			>
				<polyline
					points={points}
					fill="none"
					stroke="var(--mantine-color-blue-5)"
					strokeWidth="2"
					strokeLinecap="round"
					strokeLinejoin="round"
				/>
			</svg>
			{value !== undefined && (
				<Text fw={600} mt="xs">
					{formatValue(value)}
				</Text>
			)}
		</Paper>
	);
}
