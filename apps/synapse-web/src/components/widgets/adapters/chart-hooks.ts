import type { AxisOptions } from "react-charts";

export type LineDatum = {
	date: string;
	value: number;
};

export type CategoryDatum = {
	label: string;
	value: number;
};

export function useLineAxes() {
	const primaryAxis: AxisOptions<LineDatum> = {
		getValue: (datum) => datum.date,
	};

	const secondaryAxes: AxisOptions<LineDatum>[] = [
		{
			getValue: (datum) => datum.value,
		},
	];

	return { primaryAxis, secondaryAxes };
}

export function useCategoryAxes(elementType?: "bar") {
	const primaryAxis: AxisOptions<CategoryDatum> = {
		getValue: (datum) => datum.label,
	};

	const secondaryAxes: AxisOptions<CategoryDatum>[] = [
		{
			getValue: (datum) => datum.value,
			elementType,
		},
	];

	return { primaryAxis, secondaryAxes };
}
