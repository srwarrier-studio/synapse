from pydantic import BaseModel


class PurchaseItemSchema(BaseModel):
    material_name: str
    quantity: int
    unit_cost: float
    currency: str
    total: float


class PurchaseOrderSchema(BaseModel):
    id: str
    vendor_name: str
    region: str
    status: str
    date: str
    items: list[PurchaseItemSchema]
    total: float
    currency: str


class VendorSummarySchema(BaseModel):
    vendor_name: str
    total_orders: int
    total_spend: float
    currency: str
    on_time_rate: float


class PurchaseOrderListResponse(BaseModel):
    items: list[PurchaseOrderSchema]
    total: int
    page: int
