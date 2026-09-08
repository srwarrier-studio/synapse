import { Group, Stack, Text } from "@mantine/core";
import { IconTrendingUp, IconTrendingDown } from "@tabler/icons-react";
import { SmallCard } from "../cards";

interface KPICardProps {
	label: string;
	value: string;
	change?: number;
	changeLabel?: string;
}

export function KPICard({ label, value, change, changeLabel }: KPICardProps) {
	const isPositive = change && change > 0;
	const isNegative = change && change < 0;

	return (
		<SmallCard>
			<Stack gap="xs" justify="space-between" h="100%">
				<Text size="sm" c="dimmed">
					{label}
				</Text>
				<Text fw={700} fz="lg">
					{value}
				</Text>
				{change !== undefined && (
					<Group gap={4}>
						{isPositive ? (
							<IconTrendingUp size={14} color="var(--mantine-color-green-6)" />
						) : (
							<IconTrendingDown size={14} color="var(--mantine-color-red-6)" />
						)}
						<Text
							size="xs"
							c={isPositive ? "green.6" : isNegative ? "red.6" : "dimmed"}
							fw={500}
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
			</Stack>
		</SmallCard>
	);
}
