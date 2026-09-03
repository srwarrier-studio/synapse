from ..domain.interfaces import (
    AbstractInventoryRepository,
    AbstractPurchasesRepository,
    AbstractSalesRepository,
)
from ..infrastructure.mock import (
    MockInventoryRepository,
    MockPurchasesRepository,
    MockSalesRepository,
)

_sales_repo = MockSalesRepository()
_purchases_repo = MockPurchasesRepository()
_inventory_repo = MockInventoryRepository()


def get_sales_repo() -> AbstractSalesRepository:
    return _sales_repo


def get_purchases_repo() -> AbstractPurchasesRepository:
    return _purchases_repo


def get_inventory_repo() -> AbstractInventoryRepository:
    return _inventory_repo
