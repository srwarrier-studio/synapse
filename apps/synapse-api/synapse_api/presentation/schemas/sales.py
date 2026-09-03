from pydantic import BaseModel


class SalesItemSchema(BaseModel):
    product_name: str
    quantity: int
    unit_price: float
    currency: str
    total: float


class SalesOrderSchema(BaseModel):
    id: str
    customer_name: str
    region: str
    status: str
    date: str
    items: list[SalesItemSchema]
    total: float
    currency: str


class SalesOrderListResponse(BaseModel):
    items: list[SalesOrderSchema]
    total: int
    page: int
