from dataclasses import dataclass, field
from datetime import date
from decimal import Decimal

from .common import Currency, Money, OrderStatus, Region


@dataclass(frozen=True)
class PurchaseItem:
    material_name: str
    quantity: int
    unit_cost: Money
    total: Money


@dataclass(frozen=True)
class PurchaseOrder:
    id: str
    vendor_name: str
    region: Region
    status: OrderStatus
    date: date
    items: list[PurchaseItem] = field(default_factory=list)
    total: Money = field(
        default_factory=lambda: Money(amount=Decimal(0), currency=Currency("INR"))
    )


@dataclass(frozen=True)
class VendorSummary:
    vendor_name: str
    total_orders: int
    total_spend: Money
    on_time_rate: float
