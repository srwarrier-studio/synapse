from pydantic import BaseModel


class StockLevelSchema(BaseModel):
    material_name: str
    warehouse: str
    quantity: int
    unit: str
    reorder_point: int
    is_low: bool
    last_updated: str


class MaterialMovementSchema(BaseModel):
    id: str
    material_name: str
    movement_type: str
    quantity: int
    warehouse: str
    date: str
    reference: str


class StockLevelListResponse(BaseModel):
    items: list[StockLevelSchema]
    total: int


class MovementListResponse(BaseModel):
    items: list[MaterialMovementSchema]
    total: int
