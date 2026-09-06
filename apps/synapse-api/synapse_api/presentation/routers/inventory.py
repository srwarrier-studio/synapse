from fastapi import APIRouter, Depends

from ...domain.interfaces import AbstractInventoryRepository
from ...infrastructure.database import User
from ..auth import require_role
from ..deps import get_inventory_repo
from ..schemas.inventory import (
    MaterialMovementSchema,
    MovementListResponse,
    StockLevelListResponse,
    StockLevelSchema,
)

router = APIRouter(prefix="/api/inventory", tags=["inventory"])


def _stock_to_schema(s) -> StockLevelSchema:
    return StockLevelSchema(
        material_name=s.material_name,
        warehouse=s.warehouse,
        quantity=s.quantity,
        unit=s.unit,
        reorder_point=s.reorder_point,
        is_low=s.quantity <= s.reorder_point,
        last_updated=s.last_updated.isoformat(),
    )


def _movement_to_schema(m) -> MaterialMovementSchema:
    return MaterialMovementSchema(
        id=m.id,
        material_name=m.material_name,
        movement_type=m.movement_type.value,
        quantity=m.quantity,
        warehouse=m.warehouse,
        date=m.date.isoformat(),
        reference=m.reference,
    )


@router.get("", response_model=StockLevelListResponse)
async def list_stock(
    warehouse: str | None = None,
    low_stock: bool = False,
    repo: AbstractInventoryRepository = Depends(get_inventory_repo),
    user: User = Depends(require_role("management", "operations")),
):
    levels, total = await repo.list_stock_levels(warehouse, low_stock)
    return StockLevelListResponse(
        items=[_stock_to_schema(s) for s in levels],
        total=total,
    )


@router.get("/movements", response_model=MovementListResponse)
async def list_movements(
    date_from: str | None = None,
    date_to: str | None = None,
    movement_type: str | None = None,
    repo: AbstractInventoryRepository = Depends(get_inventory_repo),
    user: User = Depends(require_role("management", "operations")),
):
    movements, total = await repo.list_movements(date_from, date_to, movement_type)
    return MovementListResponse(
        items=[_movement_to_schema(m) for m in movements],
        total=total,
    )
