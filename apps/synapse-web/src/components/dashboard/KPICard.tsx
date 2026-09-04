import { Paper, Text, Group, ThemeIcon } from "@mantine/core";
import { IconTrendingUp, IconTrendingDown } from "@tabler/icons-react";
import classes from "./KPICard.module.css";

interface KPICardProps {
	title: string;
	value: string;
	change?: number;
	icon: React.ReactNode;
	color: string;
}

export function KPICard({ title, value, change, icon, color }: KPICardProps) {
	const isPositive = change && change > 0;

	return (
		<Paper className={classes.card} p="md" radius="sm">
			<Group justify="space-between" align="flex-start">
				<div>
					<Text className={classes.title} size="sm" c="dimmed">
						{title}
					</Text>
					<Text className={classes.value} fw={600}>
						{value}
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
								fw={500}
							>
								{isPositive ? "+" : ""}
								{change}%
							</Text>
							<Text size="xs" c="dimmed">
								vs last month
							</Text>
						</Group>
					)}
				</div>
				<ThemeIcon size={40} radius="sm" color={color} variant="light">
					{icon}
				</ThemeIcon>
			</Group>
		</Paper>
	);
}
