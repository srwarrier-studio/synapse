import { Text } from "@mantine/core";
import {
	LargeCard,
	MediumCard,
	SmallCard,
	WideCard,
} from "../../components/cards";
import { DashboardGrid } from "../../components/dashboard/DashboardGrid";

export function PlaceholderDashboard() {
	return (
		<DashboardGrid>
			<SmallCard>
				<Text size="sm" c="dimmed">
					Revenue
				</Text>
			</SmallCard>
			<SmallCard>
				<Text size="sm" c="dimmed">
					Expenses
				</Text>
			</SmallCard>
			<SmallCard>
				<Text size="sm" c="dimmed">
					Profit
				</Text>
			</SmallCard>
			<SmallCard>
				<Text size="sm" c="dimmed">
					Cash Flow
				</Text>
			</SmallCard>

			<WideCard>
				<Text size="sm" c="dimmed">
					Revenue Trend
				</Text>
			</WideCard>
			<WideCard>
				<Text size="sm" c="dimmed">
					Expense Breakdown
				</Text>
			</WideCard>

			<MediumCard>
				<Text size="sm" c="dimmed">
					Financial Reports
				</Text>
			</MediumCard>
			<MediumCard>
				<Text size="sm" c="dimmed">
					Budget vs Actual
				</Text>
			</MediumCard>

			<LargeCard>
				<Text size="sm" c="dimmed">
					Full Width Content
				</Text>
			</LargeCard>
		</DashboardGrid>
	);
}
