from abc import ABC, abstractmethod

from ..entities.inventory import MaterialMovement, StockLevel


class AbstractInventoryRepository(ABC):
    @abstractmethod
    async def list_stock_levels(
        self,
        warehouse: str | None = None,
        low_stock: bool = False,
    ) -> tuple[list[StockLevel], int]: ...

    @abstractmethod
    async def list_movements(
        self,
        date_from: str | None = None,
        date_to: str | None = None,
        movement_type: str | None = None,
    ) -> tuple[list[MaterialMovement], int]: ...
