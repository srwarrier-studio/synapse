from datetime import date
from decimal import Decimal

from ...domain.entities.common import Currency, Money, OrderStatus, Region
from ...domain.entities.sales import SalesItem, SalesOrder
from ...domain.interfaces.sales_repository import AbstractSalesRepository

PRODUCTS = [
    ("Ashwagandha 500mg", Decimal("24.99")),
    ("Turmeric Curcumin 1000mg", Decimal("29.99")),
    ("Omega-3 Fish Oil 1200mg", Decimal("34.99")),
    ("Probiotic 50B CFU", Decimal("39.99")),
    ("Vitamin D3+K2", Decimal("19.99")),
    ("Collagen Peptides", Decimal("44.99")),
    ("Green Tea Extract 500mg", Decimal("22.99")),
    ("CoQ10 200mg", Decimal("32.99")),
]

CUSTOMERS = [
    ("Apollo Hospitals", Region.INDIA),
    ("Guardian Healthcare", Region.INDIA),
    ("Max Pharma", Region.INDIA),
    ("Watsons Malaysia", Region.SOUTHEAST_ASIA),
    ("Guardian Singapore", Region.SOUTHEAST_ASIA),
    ("Al Futtaim Pharma", Region.MIDDLE_EAST),
    ("Aster Pharmacy", Region.MIDDLE_EAST),
    ("MedPharm Egypt", Region.MIDDLE_EAST),
]

CURRENCIES = {
    Region.INDIA: Currency.INR,
    Region.SOUTHEAST_ASIA: Currency.SGD,
    Region.MIDDLE_EAST: Currency.AED,
}

STATUSES = list(OrderStatus)


def _generate_orders() -> list[SalesOrder]:
    orders = []
    for i in range(1, 26):
        customer, region = CUSTOMERS[i % len(CUSTOMERS)]
        product, price = PRODUCTS[i % len(PRODUCTS)]
        qty = (i * 7) % 50 + 10
        currency = CURRENCIES[region]
        total = Money(amount=price * qty, currency=currency)
        item = SalesItem(
            product_name=product,
            quantity=qty,
            unit_price=Money(amount=price, currency=currency),
            total=total,
        )
        order = SalesOrder(
            id=f"SO-{1000 + i}",
            customer_name=customer,
            region=region,
            status=STATUSES[i % len(STATUSES)],
            date=date(2026, (i % 12) + 1, (i % 28) + 1),
            items=[item],
            total=total,
        )
        orders.append(order)
    return orders


_ORDERS = _generate_orders()


class MockSalesRepository(AbstractSalesRepository):
    async def list_orders(
        self,
        page: int = 1,
        limit: int = 20,
        region: str | None = None,
        status: str | None = None,
    ) -> tuple[list[SalesOrder], int]:
        filtered = _ORDERS
        if region:
            filtered = [o for o in filtered if o.region.value == region]
        if status:
            filtered = [o for o in filtered if o.status.value == status]
        total = len(filtered)
        start = (page - 1) * limit
        return filtered[start : start + limit], total

    async def get_order(self, order_id: str) -> SalesOrder | None:
        for o in _ORDERS:
            if o.id == order_id:
                return o
        return None
