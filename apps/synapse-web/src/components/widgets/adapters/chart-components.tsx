import { Chart } from "react-charts";
import { useLineAxes, useCategoryAxes } from "./chart-hooks";
import type { LineDatum, CategoryDatum } from "./chart-hooks";

export function LineChartInner({
	data,
}: {
	data: Array<{ label: string; data: LineDatum[] }>;
}) {
	const { primaryAxis, secondaryAxes } = useLineAxes();

	return (
		<div style={{ width: "100%", height: "100%" }}>
			<Chart
				options={{
					data,
					primaryAxis,
					secondaryAxes,
				}}
			/>
		</div>
	);
}

export function BarChartInner({
	data,
}: {
	data: Array<{ label: string; data: CategoryDatum[] }>;
}) {
	const { primaryAxis, secondaryAxes } = useCategoryAxes("bar");

	return (
		<div style={{ width: "100%", height: "100%" }}>
			<Chart
				options={{
					data,
					primaryAxis,
					secondaryAxes,
				}}
			/>
		</div>
	);
}

export function PieChartInner({
	data,
}: {
	data: Array<{ label: string; data: CategoryDatum[] }>;
}) {
	const { primaryAxis, secondaryAxes } = useCategoryAxes();

	return (
		<div style={{ width: "100%", height: "100%" }}>
			<Chart
				options={{
					data,
					primaryAxis,
					secondaryAxes,
				}}
			/>
		</div>
	);
}

export function DonutChartInner({
	data,
}: {
	data: Array<{ label: string; data: CategoryDatum[] }>;
}) {
	const { primaryAxis, secondaryAxes } = useCategoryAxes();

	return (
		<div style={{ width: "100%", height: "100%", position: "relative" }}>
			<Chart
				options={{
					data,
					primaryAxis,
					secondaryAxes,
				}}
			/>
		</div>
	);
}

export function AreaChartInner({
	data,
}: {
	data: Array<{ label: string; data: LineDatum[] }>;
}) {
	const { primaryAxis, secondaryAxes } = useLineAxes();

	return (
		<div style={{ width: "100%", height: "100%" }}>
			<Chart
				options={{
					data,
					primaryAxis,
					secondaryAxes,
				}}
			/>
		</div>
	);
}
