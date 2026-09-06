import { request } from "./api-client";
import type { MonthlyContributors } from "../domain/entities/insight";

export async function fetchMonthlyContributors(
	month: string,
	year: number,
): Promise<MonthlyContributors> {
	const params = new URLSearchParams({ month, year: String(year) });
	return request<MonthlyContributors>(
		`/api/insights/monthly-contributors?${params}`,
	);
}
