from dataclasses import dataclass
from decimal import Decimal
from enum import StrEnum


class Currency(StrEnum):
    INR = "INR"
    USD = "USD"
    SGD = "SGD"
    AED = "AED"


class Region(StrEnum):
    INDIA = "INDIA"
    SOUTHEAST_ASIA = "SOUTHEAST_ASIA"
    MIDDLE_EAST = "MIDDLE_EAST"


class OrderStatus(StrEnum):
    PROCESSING = "PROCESSING"
    SHIPPED = "SHIPPED"
    DELIVERED = "DELIVERED"
    CANCELLED = "CANCELLED"
    PENDING_APPROVAL = "PENDING_APPROVAL"


class MovementType(StrEnum):
    IN = "IN"
    OUT = "OUT"
    TRANSFER = "TRANSFER"


@dataclass(frozen=True)
class Money:
    amount: Decimal
    currency: Currency

    def to_dict(self) -> dict:
        return {"amount": float(self.amount), "currency": self.currency.value}
