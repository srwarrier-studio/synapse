from pydantic import BaseModel


class MoneySchema(BaseModel):
    amount: float
    currency: str


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
