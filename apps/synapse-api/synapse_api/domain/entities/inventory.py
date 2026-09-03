from dataclasses import dataclass
from datetime import datetime

from .common import MovementType


@dataclass(frozen=True)
class StockLevel:
    material_name: str
    warehouse: str
    quantity: int
    unit: str
    reorder_point: int
    last_updated: datetime


@dataclass(frozen=True)
class MaterialMovement:
    id: str
    material_name: str
    movement_type: MovementType
    quantity: int
    warehouse: str
    date: datetime
    reference: str
