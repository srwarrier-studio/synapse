export type InsightCategory = "product" | "cost" | "production";
export type InsightImpact = "high" | "medium" | "low";

export interface InsightFactor {
	category: InsightCategory;
	name: string;
	impact: InsightImpact;
	changePercent?: number;
	revenueImpact?: number;
	savings?: number;
	additionalVolume?: string;
	details: string;
}

export interface MonthlyContributors {
	month: string;
	year: number;
	totalRevenue: number;
	previousRevenue: number;
	changePercent: number;
	summary: string;
	factors: InsightFactor[];
}
