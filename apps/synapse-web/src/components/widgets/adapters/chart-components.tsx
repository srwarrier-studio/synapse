import { Chart } from "react-charts";
import { useLineAxes, useCategoryAxes } from "./chart-hooks";
import type { LineDatum, CategoryDatum } from "./chart-hooks";
import type { DataPointClickEvent } from "../chart-adapter";

interface ChartClickHandler {
	onDataPointClick?: (point: DataPointClickEvent) => void;
}

export function LineChartInner({
	data,
	onDataPointClick,
}: {
	data: Array<{ label: string; data: LineDatum[] }>;
} & ChartClickHandler) {
	const { primaryAxis, secondaryAxes } = useLineAxes();

	return (
		<div style={{ width: "100%", height: "100%" }}>
			<Chart
				options={{
					data,
					primaryAxis,
					secondaryAxes,
					onClickDatum: onDataPointClick
						? (datum) => {
								if (datum) {
									onDataPointClick({
										label: datum.originalDatum.date,
										value: datum.originalDatum.value,
										series: datum.seriesLabel,
										date: datum.originalDatum.date,
									});
								}
							}
						: undefined,
				}}
			/>
		</div>
	);
}

export function BarChartInner({
	data,
	onDataPointClick,
}: {
	data: Array<{ label: string; data: CategoryDatum[] }>;
} & ChartClickHandler) {
	const { primaryAxis, secondaryAxes } = useCategoryAxes("bar");

	return (
		<div style={{ width: "100%", height: "100%" }}>
			<Chart
				options={{
					data,
					primaryAxis,
					secondaryAxes,
					onClickDatum: onDataPointClick
						? (datum) => {
								if (datum) {
									onDataPointClick({
										label: datum.originalDatum.label,
										value: datum.originalDatum.value,
									});
								}
							}
						: undefined,
				}}
			/>
		</div>
	);
}

export function PieChartInner({
	data,
	onDataPointClick,
}: {
	data: Array<{ label: string; data: CategoryDatum[] }>;
} & ChartClickHandler) {
	const { primaryAxis, secondaryAxes } = useCategoryAxes();

	return (
		<div style={{ width: "100%", height: "100%" }}>
			<Chart
				options={{
					data,
					primaryAxis,
					secondaryAxes,
					onClickDatum: onDataPointClick
						? (datum) => {
								if (datum) {
									onDataPointClick({
										label: datum.originalDatum.label,
										value: datum.originalDatum.value,
									});
								}
							}
						: undefined,
				}}
			/>
		</div>
	);
}

export function DonutChartInner({
	data,
	onDataPointClick,
}: {
	data: Array<{ label: string; data: CategoryDatum[] }>;
} & ChartClickHandler) {
	const { primaryAxis, secondaryAxes } = useCategoryAxes();

	return (
		<div style={{ width: "100%", height: "100%", position: "relative" }}>
			<Chart
				options={{
					data,
					primaryAxis,
					secondaryAxes,
					onClickDatum: onDataPointClick
						? (datum) => {
								if (datum) {
									onDataPointClick({
										label: datum.originalDatum.label,
										value: datum.originalDatum.value,
									});
								}
							}
						: undefined,
				}}
			/>
		</div>
	);
}

export function AreaChartInner({
	data,
	onDataPointClick,
}: {
	data: Array<{ label: string; data: LineDatum[] }>;
} & ChartClickHandler) {
	const { primaryAxis, secondaryAxes } = useLineAxes();

	return (
		<div style={{ width: "100%", height: "100%" }}>
			<Chart
				options={{
					data,
					primaryAxis,
					secondaryAxes,
					onClickDatum: onDataPointClick
						? (datum) => {
								if (datum) {
									onDataPointClick({
										label: datum.originalDatum.date,
										value: datum.originalDatum.value,
										series: datum.seriesLabel,
										date: datum.originalDatum.date,
									});
								}
							}
						: undefined,
				}}
			/>
		</div>
	);
}
