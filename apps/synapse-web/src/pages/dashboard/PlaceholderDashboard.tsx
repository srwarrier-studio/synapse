import { Text } from "@mantine/core";
import {
	DashboardGrid,
	LargeCard,
	MediumCard,
	WideCard,
} from "../../components/cards";
import {
	KPICard,
	KPILabel,
	KPIValue,
	KPITrend,
	KPIStats,
	KPIStat,
} from "../../components/charts";
import { useEditMode } from "../../hooks/useEditMode";

export function PlaceholderDashboard() {
	const { isEditing } = useEditMode();

	return (
		<DashboardGrid draggable={isEditing}>
			<div key="kpi-1" data-grid={{ w: 3, h: 3 }}>
				<KPICard>
					<KPILabel>Sales</KPILabel>
					<KPIValue>Rs. 1,02,89,283</KPIValue>
					<KPITrend value={12} label="vs last month" />
					<KPIStats>
						<KPIStat label="Target" value="78%" progress={78} />
					</KPIStats>
				</KPICard>
			</div>

			<div key="kpi-2" data-grid={{ w: 3, h: 3 }}>
				<KPICard>
					<KPILabel>Orders</KPILabel>
					<KPIValue>1,284</KPIValue>
					<KPITrend value={8} label="vs last month" />
					<KPIStats>
						<KPIStat label="Forecast" value="1,600" progress={80} />
					</KPIStats>
				</KPICard>
			</div>

			<div key="kpi-3" data-grid={{ w: 3, h: 3 }}>
				<KPICard>
					<KPILabel>Net Profit</KPILabel>
					<KPIValue>Rs. 34,44,083</KPIValue>
					<KPITrend value={-5} label="vs last month" />
					<KPIStats>
						<KPIStat label="Margin" value="12.5%" />
					</KPIStats>
				</KPICard>
			</div>

			<div key="kpi-4" data-grid={{ w: 3, h: 3 }}>
				<KPICard>
					<KPILabel>Cash Position</KPILabel>
					<KPIValue>Rs. 45,20,000</KPIValue>
					<KPITrend value={8} label="vs last month" />
					<KPIStats>
						<KPIStat label="Runway" value="24 days" />
					</KPIStats>
				</KPICard>
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
