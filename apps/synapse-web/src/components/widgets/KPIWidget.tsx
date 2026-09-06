import { Paper, Text, Group, ThemeIcon } from "@mantine/core";
import { IconTrendingUp, IconTrendingDown } from "@tabler/icons-react";
import type { KPIData } from "../../domain/entities/widget";

interface KPIWidgetProps {
	title: string;
	data: KPIData;
	icon: React.ReactNode;
	color: string;
	formatValue?: (value: number | string) => string;
}

const defaultFormatValue = (v: number | string) => String(v);

const COLOR_MAP: Record<string, string> = {
	"synapse-blue": "#0078d4",
	"sami-green": "#2e7d32",
	teal: "#0d9488",
	orange: "#f97316",
	violet: "#7c3aed",
	red: "#dc2626",
};

export function KPIWidget({
	title,
	data,
	icon,
	color,
	formatValue = defaultFormatValue,
}: KPIWidgetProps) {
	const { value, change, changeLabel, secondaryValue } = data;
	const isPositive = change !== undefined && change > 0;
	const borderColor = COLOR_MAP[color] || color;

	return (
		<Paper
			p="md"
			radius="md"
			bg="white"
			style={{ borderLeft: `4px solid ${borderColor}` }}
		>
			<Group justify="space-between" align="flex-start">
				<div>
					<Text
						size="sm"
						c="dimmed"
						style={{ textTransform: "uppercase", letterSpacing: "0.5px" }}
					>
						{title}
					</Text>
					<Text
						fw={700}
						style={{
							fontSize: "var(--mantine-font-size-xl)",
							lineHeight: 1.2,
							marginTop: "var(--mantine-spacing-xs)",
						}}
					>
						{formatValue(value)}
					</Text>
					{change !== undefined && (
						<Group gap="xs" mt="xs">
							<ThemeIcon
								size="sm"
								variant="light"
								color={isPositive ? "sami-green" : "red"}
								radius="xl"
							>
								{isPositive ? (
									<IconTrendingUp size={12} />
								) : (
									<IconTrendingDown size={12} />
								)}
							</ThemeIcon>
							<Text
								size="xs"
								c={isPositive ? "sami-green" : "red"}
								fw={600}
							>
								{isPositive ? "+" : ""}
								{change}%
							</Text>
							{changeLabel && (
								<Text size="xs" c="dimmed">
									{changeLabel}
								</Text>
							)}
						</Group>
					)}
					{secondaryValue && (
						<Text size="xs" c="dimmed" mt="xs">
							{secondaryValue}
						</Text>
					)}
				</div>
				<ThemeIcon size={40} radius="md" color={color} variant="light">
					{icon}
				</ThemeIcon>
			</Group>
		</Paper>
	);
}
