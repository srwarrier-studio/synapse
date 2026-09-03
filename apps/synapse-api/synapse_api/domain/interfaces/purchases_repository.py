from abc import ABC, abstractmethod

from ..entities.purchases import PurchaseOrder, VendorSummary


class AbstractPurchasesRepository(ABC):
    @abstractmethod
    async def list_orders(
        self,
        page: int = 1,
        limit: int = 20,
        vendor: str | None = None,
        status: str | None = None,
    ) -> tuple[list[PurchaseOrder], int]: ...

    @abstractmethod
    async def get_vendor_summary(self) -> list[VendorSummary]: ...
