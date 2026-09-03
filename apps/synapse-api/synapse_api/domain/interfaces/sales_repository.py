from abc import ABC, abstractmethod

from ..entities.sales import SalesOrder


class AbstractSalesRepository(ABC):
    @abstractmethod
    async def list_orders(
        self,
        page: int = 1,
        limit: int = 20,
        region: str | None = None,
        status: str | None = None,
    ) -> tuple[list[SalesOrder], int]: ...

    @abstractmethod
    async def get_order(self, order_id: str) -> SalesOrder | None: ...
