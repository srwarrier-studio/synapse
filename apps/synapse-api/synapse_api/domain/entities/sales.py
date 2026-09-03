from dataclasses import dataclass, field
from datetime import date

from .common import Money, OrderStatus, Region


@dataclass(frozen=True)
class SalesItem:
    product_name: str
    quantity: int
    unit_price: Money
    total: Money


@dataclass(frozen=True)
class SalesOrder:
    id: str
    customer_name: str
    region: Region
    status: OrderStatus
    date: date
    items: list[SalesItem] = field(default_factory=list)
    total: Money = field(default_factory=lambda: Money(amount=0, currency="INR"))
