import { Paper, Text, SimpleGrid, Group, ThemeIcon } from "@mantine/core";
import { IconWorld } from "@tabler/icons-react";
import type { RegionalPerformance as RegionalPerformanceData } from "../../domain/entities/dashboard";
import { getRegionLabel, getRegionColor } from "../../domain/constants/dashboard";
import classes from "./RegionalPerformance.module.css";

interface RegionalPerformanceProps {
	data: RegionalPerformanceData[];
}

export function RegionalPerformance({ data }: RegionalPerformanceProps) {
	const regionCount = data.length;

	return (
		<Paper p="md" radius="sm">
			<Text fw={600} mb="md">
				Regional Performance
			</Text>
			<SimpleGrid cols={regionCount > 4 ? 4 : regionCount}>
				{data.map((region) => (
					<div key={region.region} className={classes.regionCard}>
						<Group gap="sm" mb="xs">
							<ThemeIcon
								size="sm"
								variant="light"
								color={getRegionColor(region.region)}
								radius="xl"
							>
								<IconWorld size={14} />
							</ThemeIcon>
							<Text size="sm" fw={500}>
								{getRegionLabel(region.region)}
							</Text>
						</Group>
						<Text className={classes.regionValue} fw={600}>
							₹{(region.ytd_revenue / 1000000).toFixed(1)}M
						</Text>
						<Text size="xs" c="dimmed">
							YTD Revenue
						</Text>
						<Group gap="xs" mt="xs">
							<Text
								size="xs"
								c={region.growth_rate >= 0 ? "sami-green" : "red"}
								fw={500}
							>
								{region.growth_rate >= 0 ? "+" : ""}
								{region.growth_rate}%
							</Text>
							<Text size="xs" c="dimmed">
								MoM
							</Text>
						</Group>
					</div>
				))}
			</SimpleGrid>
		</Paper>
	);
}
