import { Badge, Group, Paper, Text, ThemeIcon } from "@mantine/core";
import {
	IconBuildingFactory,
	IconCoin,
	IconShoppingCart,
} from "@tabler/icons-react";
import type {
	InsightCategory,
	InsightFactor,
	InsightImpact,
} from "../../domain/entities/insight";

const CATEGORY_CONFIG: Record<
	InsightCategory,
	{ icon: typeof IconShoppingCart; color: string; label: string }
> = {
	product: {
		icon: IconShoppingCart,
		color: "blue",
		label: "Product",
	},
	cost: {
		icon: IconCoin,
		color: "green",
		label: "Cost",
	},
	production: {
		icon: IconBuildingFactory,
		color: "orange",
		label: "Production",
	},
};

const IMPACT_COLORS: Record<InsightImpact, string> = {
	high: "red",
	medium: "yellow",
	low: "gray",
};

interface FactorCardProps {
	factor: InsightFactor;
}

export function FactorCard({ factor }: FactorCardProps) {
	const config = CATEGORY_CONFIG[factor.category];
	const Icon = config.icon;
	const impactColor = IMPACT_COLORS[factor.impact];

	const isPositive = factor.changePercent
		? factor.changePercent > 0
		: factor.savings
			? true
			: factor.additionalVolume
				? !factor.additionalVolume.startsWith("-")
				: false;

	return (
		<Paper
			p="md"
			radius="md"
			style={{
				borderLeft: `4px solid ${isPositive
					? "var(--mantine-color-green-5)"
					: "var(--mantine-color-red-5)"
					}`,
			}}
		>
			<Group justify="space-between" align="flex-start" mb="xs">
				<Group gap="sm">
					<ThemeIcon size="lg" radius="md" color={config.color} variant="light">
						<Icon size={18} />
					</ThemeIcon>
					<div>
						<Text fw={600} size="sm">
							{factor.name}
						</Text>
						<Text size="xs" c="dimmed">
							{config.label}
						</Text>
					</div>
				</Group>
				<Group gap="xs">
					<Badge color={impactColor} size="sm" variant="light">
						{factor.impact}
					</Badge>
				</Group>
			</Group>

			<Group gap="md" mb="xs">
				{factor.changePercent !== undefined && (
					<Group gap="xs">
						<Text size="xs" c="dimmed">
							Change:
						</Text>
						<Text
							size="sm"
							fw={600}
							c={factor.changePercent >= 0 ? "green" : "red"}
						>
							{factor.changePercent >= 0 ? "+" : ""}
							{factor.changePercent}%
						</Text>
					</Group>
				)}
				{factor.revenueImpact !== undefined && (
					<Group gap="xs">
						<Text size="xs" c="dimmed">
							Revenue:
						</Text>
						<Text
							size="sm"
							fw={600}
							c={factor.revenueImpact >= 0 ? "green" : "red"}
						>
							{factor.revenueImpact >= 0 ? "+" : ""}₹
							{Math.abs(factor.revenueImpact).toLocaleString()}
						</Text>
					</Group>
				)}
				{factor.savings !== undefined && factor.savings !== null && (
					<Group gap="xs">
						<Text size="xs" c="dimmed">
							Savings:
						</Text>
						<Text size="sm" fw={600} c="green">
							₹{factor.savings.toLocaleString()}/ton
						</Text>
					</Group>
				)}
				{factor.additionalVolume && (
					<Group gap="xs">
						<Text size="xs" c="dimmed">
							Volume:
						</Text>
						<Text
							size="sm"
							fw={600}
							c={factor.additionalVolume.startsWith("-") ? "red" : "green"}
						>
							{factor.additionalVolume.startsWith("+") ? "" : ""}
							{factor.additionalVolume}
						</Text>
					</Group>
				)}
			</Group>

			<Text size="xs" c="dimmed">
				{factor.details}
			</Text>
		</Paper>
	);
}
