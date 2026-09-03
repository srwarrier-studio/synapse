from fastapi import APIRouter, Depends

from ...domain.interfaces import AbstractPurchasesRepository
from ..deps import get_purchases_repo
from ..schemas.purchases import (
    PurchaseOrderListResponse,
    PurchaseOrderSchema,
    VendorSummarySchema,
)

router = APIRouter(prefix="/api/purchases", tags=["purchases"])


def _to_schema(order) -> PurchaseOrderSchema:
    return PurchaseOrderSchema(
        id=order.id,
        vendor_name=order.vendor_name,
        region=order.region.value,
        status=order.status.value,
        date=order.date.isoformat(),
        items=[
            {
                "material_name": item.material_name,
                "quantity": item.quantity,
                "unit_cost": float(item.unit_cost.amount),
                "currency": item.unit_cost.currency.value,
                "total": float(item.total.amount),
            }
            for item in order.items
        ],
        total=float(order.total.amount),
        currency=order.total.currency.value,
    )


@router.get("", response_model=PurchaseOrderListResponse)
async def list_purchases(
    page: int = 1,
    limit: int = 20,
    vendor: str | None = None,
    status: str | None = None,
    repo: AbstractPurchasesRepository = Depends(get_purchases_repo),
):
    orders, total = await repo.list_orders(page, limit, vendor, status)
    return PurchaseOrderListResponse(
        items=[_to_schema(o) for o in orders],
        total=total,
        page=page,
    )


@router.get("/summary", response_model=list[VendorSummarySchema])
async def get_vendor_summary(
    repo: AbstractPurchasesRepository = Depends(get_purchases_repo),
):
    summary = await repo.get_vendor_summary()
    return [
        VendorSummarySchema(
            vendor_name=v.vendor_name,
            total_orders=v.total_orders,
            total_spend=float(v.total_spend.amount),
            currency=v.total_spend.currency.value,
            on_time_rate=v.on_time_rate,
        )
        for v in summary
    ]
