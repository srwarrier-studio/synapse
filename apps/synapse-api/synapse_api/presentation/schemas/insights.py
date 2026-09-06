from pydantic import BaseModel


class InsightFactor(BaseModel):
    category: str
    name: str
    impact: str
    changePercent: float | None = None
    revenueImpact: int | None = None
    savings: int | None = None
    additionalVolume: str | None = None
    details: str


class MonthlyContributors(BaseModel):
    month: str
    year: int
    totalRevenue: int
    previousRevenue: int
    changePercent: float
    summary: str
    factors: list[InsightFactor]
