from datetime import datetime

from ...domain.entities.common import MovementType
from ...domain.entities.inventory import MaterialMovement, StockLevel
from ...domain.interfaces.inventory_repository import AbstractInventoryRepository

MATERIALS = [
    "Ashwagandha Root Extract",
    "Turmeric Curcumin Powder",
    "Fish Oil Concentrate",
    "Lactobacillus Blend",
    "Cholecalciferol (D3)",
    "Hydrolyzed Collagen",
    "Green Tea Leaf Extract",
    "Ubiquinone (CoQ10)",
]

WAREHOUSES = ["Mumbai", "Delhi NCR", "Chennai", "Singapore", "Dubai"]


def _generate_stock_levels() -> list[StockLevel]:
    levels = []
    for i, material in enumerate(MATERIALS):
        for j, warehouse in enumerate(WAREHOUSES):
            qty = ((i + 1) * (j + 1) * 37) % 500 + 50
            reorder = 100
            levels.append(
                StockLevel(
                    material_name=material,
                    warehouse=warehouse,
                    quantity=qty,
                    unit="kg",
                    reorder_point=reorder,
                    last_updated=datetime(2026, 8, 15, 10, 30),
                )
            )
    return levels


def _generate_movements() -> list[MaterialMovement]:
    movements = []
    refs = ["PO-2001", "PO-2005", "MO-3001", "MO-3002", "TR-4001"]
    types = [
        MovementType.IN,
        MovementType.IN,
        MovementType.OUT,
        MovementType.OUT,
        MovementType.TRANSFER,
    ]
    for i in range(10):
        movement = MaterialMovement(
            id=f"MVT-{5000 + i}",
            material_name=MATERIALS[i % len(MATERIALS)],
            movement_type=types[i % len(types)],
            quantity=((i + 1) * 23) % 200 + 10,
            warehouse=WAREHOUSES[i % len(WAREHOUSES)],
            date=datetime(2026, 8, (i % 28) + 1, 9 + i, 0),
            reference=refs[i % len(refs)],
        )
        movements.append(movement)
    return movements


_STOCK_LEVELS = _generate_stock_levels()
_MOVEMENTS = _generate_movements()


class MockInventoryRepository(AbstractInventoryRepository):
    async def list_stock_levels(
        self,
        warehouse: str | None = None,
        low_stock: bool = False,
    ) -> tuple[list[StockLevel], int]:
        filtered = _STOCK_LEVELS
        if warehouse:
            filtered = [s for s in filtered if s.warehouse == warehouse]
        if low_stock:
            filtered = [s for s in filtered if s.quantity <= s.reorder_point]
        return filtered, len(filtered)

    async def list_movements(
        self,
        date_from: str | None = None,
        date_to: str | None = None,
        movement_type: str | None = None,
    ) -> tuple[list[MaterialMovement], int]:
        filtered = _MOVEMENTS
        if date_from:
            d = datetime.fromisoformat(date_from)
            filtered = [m for m in filtered if m.date >= d]
        if date_to:
            d = datetime.fromisoformat(date_to)
            filtered = [m for m in filtered if m.date <= d]
        if movement_type:
            filtered = [m for m in filtered if m.movement_type.value == movement_type]
        return filtered, len(filtered)
