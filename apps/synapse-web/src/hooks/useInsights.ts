import { useState, useCallback } from "react";
import type { MonthlyContributors } from "../domain/entities/insight";
import { fetchMonthlyContributors } from "../data/insights";

interface UseInsightsReturn {
	data: MonthlyContributors | null;
	isLoading: boolean;
	error: string | null;
	fetchMonth: (month: string, year: number) => Promise<void>;
	close: () => void;
}

export function useInsights(): UseInsightsReturn {
	const [data, setData] = useState<MonthlyContributors | null>(null);
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);

	const fetchMonth = useCallback(async (month: string, year: number) => {
		setIsLoading(true);
		setError(null);
		try {
			const result = await fetchMonthlyContributors(month, year);
			setData(result);
		} catch (err) {
			setError(err instanceof Error ? err.message : "Failed to load insights");
		} finally {
			setIsLoading(false);
		}
	}, []);

	const close = useCallback(() => {
		setData(null);
		setError(null);
	}, []);

	return { data, isLoading, error, fetchMonth, close };
}
