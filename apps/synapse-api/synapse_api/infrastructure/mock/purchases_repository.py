from datetime import date
from decimal import Decimal

from ...domain.entities.common import Currency, Money, OrderStatus, Region
from ...domain.entities.purchases import PurchaseItem, PurchaseOrder, VendorSummary
from ...domain.interfaces.purchases_repository import AbstractPurchasesRepository

MATERIALS = [
    ("Ashwagandha Root Extract", Decimal("12.50")),
    ("Turmeric Curcumin Powder", Decimal("8.75")),
    ("Fish Oil Concentrate", Decimal("15.00")),
    ("Lactobacillus Blend", Decimal("22.00")),
    ("Cholecalciferol (D3)", Decimal("5.25")),
    ("Hydrolyzed Collagen", Decimal("18.50")),
    ("Green Tea Leaf Extract", Decimal("9.80")),
    ("Ubiquinone (CoQ10)", Decimal("28.00")),
]

VENDORS = [
    ("Herbalife Extracts India", Region.INDIA),
    ("Marine Biotech Labs", Region.SOUTHEAST_ASIA),
    ("NutriSource Global", Region.MIDDLE_EAST),
    ("Vitacorp International", Region.INDIA),
]

CURRENCIES = {
    Region.INDIA: Currency.INR,
    Region.SOUTHEAST_ASIA: Currency.SGD,
    Region.MIDDLE_EAST: Currency.AED,
}

STATUSES = list(OrderStatus)


def _generate_orders() -> list[PurchaseOrder]:
    orders = []
    for i in range(1, 16):
        vendor, region = VENDORS[i % len(VENDORS)]
        material, cost = MATERIALS[i % len(MATERIALS)]
        qty = (i * 13) % 100 + 50
        currency = CURRENCIES[region]
        total = Money(amount=cost * qty, currency=currency)
        item = PurchaseItem(
            material_name=material,
            quantity=qty,
            unit_cost=Money(amount=cost, currency=currency),
            total=total,
        )
        order = PurchaseOrder(
            id=f"PO-{2000 + i}",
            vendor_name=vendor,
            region=region,
            status=STATUSES[i % len(STATUSES)],
            date=date(2026, (i % 12) + 1, (i % 28) + 1),
            items=[item],
            total=total,
        )
        orders.append(order)
    return orders


def _generate_vendor_summary() -> list[VendorSummary]:
    return [
        VendorSummary(
            vendor_name="Herbalife Extracts India",
            total_orders=45,
            total_spend=Money(amount=Decimal("2450000"), currency=Currency.INR),
            on_time_rate=0.94,
        ),
        VendorSummary(
            vendor_name="Marine Biotech Labs",
            total_orders=32,
            total_spend=Money(amount=Decimal("180000"), currency=Currency.SGD),
            on_time_rate=0.88,
        ),
        VendorSummary(
            vendor_name="NutriSource Global",
            total_orders=28,
            total_spend=Money(amount=Decimal("520000"), currency=Currency.AED),
            on_time_rate=0.91,
        ),
        VendorSummary(
            vendor_name="Vitacorp International",
            total_orders=38,
            total_spend=Money(amount=Decimal("1980000"), currency=Currency.INR),
            on_time_rate=0.96,
        ),
    ]


_ORDERS = _generate_orders()
_VENDOR_SUMMARY = _generate_vendor_summary()


class MockPurchasesRepository(AbstractPurchasesRepository):
    async def list_orders(
        self,
        page: int = 1,
        limit: int = 20,
        vendor: str | None = None,
        status: str | None = None,
    ) -> tuple[list[PurchaseOrder], int]:
        filtered = _ORDERS
        if vendor:
            filtered = [o for o in filtered if vendor.lower() in o.vendor_name.lower()]
        if status:
            filtered = [o for o in filtered if o.status.value == status]
        total = len(filtered)
        start = (page - 1) * limit
        return filtered[start : start + limit], total

    async def get_vendor_summary(self) -> list[VendorSummary]:
        return _VENDOR_SUMMARY
