import {
	Drawer,
	Stack,
	Group,
	Title,
	Text,
	Badge,
	Loader,
	Alert,
	SimpleGrid,
} from "@mantine/core";
import { IconAlertTriangle } from "@tabler/icons-react";
import type { MonthlyContributors } from "../../domain/entities/insight";
import { FactorCard } from "./FactorCard";

interface InsightPanelProps {
	data: MonthlyContributors | null;
	isLoading: boolean;
	error: string | null;
	onClose: () => void;
}

function formatRevenue(value: number): string {
	if (value >= 1_000_000) {
		return `₹${(value / 1_000_000).toFixed(1)}M`;
	}
	return `₹${(value / 1_000).toFixed(0)}K`;
}

export function InsightPanel({
	data,
	isLoading,
	error,
	onClose,
}: InsightPanelProps) {
	return (
		<Drawer
			opened={data !== null || isLoading}
			onClose={onClose}
			title="Monthly Insights"
			position="right"
			size="lg"
			overlayProps={{ opacity: 0.3 }}
		>
			{isLoading && (
				<Group justify="center" py="xl">
					<Loader size="md" />
					<Text c="dimmed">Loading insights...</Text>
				</Group>
			)}

			{error && (
				<Alert color="red" icon={<IconAlertTriangle size={16} />}>
					{error}
				</Alert>
			)}

			{data && !isLoading && (
				<Stack gap="lg">
					<Group justify="space-between" align="center">
						<div>
							<Title order={3}>
								{data.month} {data.year}
							</Title>
							<Group gap="xs" mt="xs">
								<Badge
									color={data.changePercent >= 0 ? "green" : "red"}
									size="lg"
									variant="light"
								>
									{data.changePercent >= 0 ? "+" : ""}
									{data.changePercent}%
								</Badge>
								<Text size="sm" c="dimmed">
									{formatRevenue(data.previousRevenue)} →{" "}
									{formatRevenue(data.totalRevenue)}
								</Text>
							</Group>
						</div>
					</Group>

					<Alert color="blue" variant="light" title="Summary">
						<Text size="sm">{data.summary}</Text>
					</Alert>

					<div>
						<Text fw={600} size="sm" mb="md">
							Contributing Factors
						</Text>
						<SimpleGrid cols={1} spacing="md">
							{data.factors.map((factor, idx) => (
								<FactorCard key={idx} factor={factor} />
							))}
						</SimpleGrid>
					</div>
				</Stack>
			)}
		</Drawer>
	);
}
