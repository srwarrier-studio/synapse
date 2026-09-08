from fastapi import APIRouter, Depends, HTTPException

from synapse_api.domain.entities.user import User

from ...domain.interfaces import AbstractSalesRepository
from ..auth import require_role
from ..deps import get_sales_repo
from ..schemas.sales import SalesOrderListResponse, SalesOrderSchema

router = APIRouter(prefix="/api/sales", tags=["sales"])


def _to_schema(order) -> SalesOrderSchema:
    return SalesOrderSchema(
        id=order.id,
        customer_name=order.customer_name,
        region=order.region.value,
        status=order.status.value,
        date=order.date.isoformat(),
        items=[
            {
                "product_name": item.product_name,
                "quantity": item.quantity,
                "unit_price": float(item.unit_price.amount),
                "currency": item.unit_price.currency.value,
                "total": float(item.total.amount),
            }
            for item in order.items
        ],
        total=float(order.total.amount),
        currency=order.total.currency.value,
    )


@router.get("", response_model=SalesOrderListResponse)
async def list_sales(
    page: int = 1,
    limit: int = 20,
    region: str | None = None,
    status: str | None = None,
    repo: AbstractSalesRepository = Depends(get_sales_repo),
    user: User = Depends(require_role("management", "sales")),
):
    orders, total = await repo.list_orders(page, limit, region, status)
    return SalesOrderListResponse(
        items=[_to_schema(o) for o in orders],
        total=total,
        page=page,
    )


@router.get("/{order_id}", response_model=SalesOrderSchema)
async def get_sales(
    order_id: str,
    repo: AbstractSalesRepository = Depends(get_sales_repo),
    user: User = Depends(require_role("management", "sales")),
):
    order = await repo.get_order(order_id)
    if not order:
        raise HTTPException(status_code=404, detail="Sales order not found")
    return _to_schema(order)
