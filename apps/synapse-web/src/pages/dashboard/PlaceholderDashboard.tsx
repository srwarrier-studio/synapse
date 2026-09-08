import { Text } from "@mantine/core";
import {
	DashboardGrid,
	LargeCard,
	MediumCard,
	WideCard,
} from "../../components/cards";
import { KPICard } from "../../components/charts";
import { useEditMode } from "../../hooks/useEditMode";

export function PlaceholderDashboard() {
	const { isEditing } = useEditMode();

	return (
		<DashboardGrid draggable={isEditing}>
			<div key="kpi-1" data-grid={{ w: 3, h: 2 }}>
				<KPICard label="Revenue" value="$1.2M" change={12.5} changeLabel="vs last month" />
			</div>
			<div key="kpi-2" data-grid={{ w: 3, h: 2 }}>
				<KPICard label="Expenses" value="$840K" change={-3.2} changeLabel="vs last month" />
			</div>
			<div key="kpi-3" data-grid={{ w: 3, h: 2 }}>
				<KPICard label="Net Profit" value="$360K" change={8.1} changeLabel="vs last month" />
			</div>
			<div key="kpi-4" data-grid={{ w: 3, h: 2 }}>
				<KPICard label="Cash Flow" value="$290K" change={5.4} changeLabel="vs last month" />
			</div>

			<div key="trend" data-grid={{ w: 6, h: 3 }}>
				<WideCard>
					<Text size="sm" c="dimmed">
						Revenue Trend
					</Text>
				</WideCard>
			</div>
			<div key="breakdown" data-grid={{ w: 6, h: 3 }}>
				<WideCard>
					<Text size="sm" c="dimmed">
						Expense Breakdown
					</Text>
				</WideCard>
			</div>

			<div key="reports" data-grid={{ w: 6, h: 4 }}>
				<MediumCard>
					<Text size="sm" c="dimmed">
						Financial Reports
					</Text>
				</MediumCard>
			</div>
			<div key="budget" data-grid={{ w: 6, h: 4 }}>
				<MediumCard>
					<Text size="sm" c="dimmed">
						Budget vs Actual
					</Text>
				</MediumCard>
			</div>

			<div key="full" data-grid={{ w: 12, h: 5 }}>
				<LargeCard>
					<Text size="sm" c="dimmed">
						Full Width Content
					</Text>
				</LargeCard>
			</div>
		</DashboardGrid>
	);
}
