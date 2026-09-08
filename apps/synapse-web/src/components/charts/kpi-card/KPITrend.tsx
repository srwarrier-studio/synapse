import { Group, Text } from "@mantine/core";
import { IconTrendingDown, IconTrendingUp } from "@tabler/icons-react";
import classes from "./KPICard.module.css";

interface KPITrendProps {
	value: number;
	label?: string;
}

export function KPITrend({ value, label }: KPITrendProps) {
	const isPositive = value >= 0;

	return (
		<Group gap={4} align="center" justify="center" className={classes.trend}>
			{isPositive ? (
				<IconTrendingUp size={14} className={classes.trendUp} />
			) : (
				<IconTrendingDown size={14} className={classes.trendDown} />
			)}
			<Text
				size="sm"
				fw={600}
				className={isPositive ? classes.trendUp : classes.trendDown}
			>
				{isPositive ? "+" : ""}
				{value}%
			</Text>
			{label && (
				<Text size="xs" className={classes.subtext}>
					{label}
				</Text>
			)}
		</Group>
	);
}
