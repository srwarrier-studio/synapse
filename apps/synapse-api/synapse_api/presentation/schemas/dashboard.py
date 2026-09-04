from pydantic import BaseModel


class DashboardSummary(BaseModel):
    revenue: float
    orders: int
    fulfillment_rate: float
    active_shipments: int
    revenue_change: float
    orders_change: float


class SalesTrendPoint(BaseModel):
    month: str
    region: str
    amount: float


class TopProduct(BaseModel):
    name: str
    revenue: float
    units: int


class RegionalPerformance(BaseModel):
    region: str
    ytd_revenue: float
    latest_month: float
    growth_rate: float


class OrderStatus(BaseModel):
    status: str
    count: int
    percentage: float


class MonthlyRevenue(BaseModel):
    month: str
    revenue: float
    orders: int


class CategoryBreakdown(BaseModel):
    category: str
    revenue: float
    percentage: float
    product_count: int


class RecentOrder(BaseModel):
    order_id: str
    customer: str
    product: str
    amount: float
    status: str
    date: str
    region: str
