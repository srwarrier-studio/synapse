from .dashboard import router as dashboard_router
from .inventory import router as inventory_router
from .purchases import router as purchases_router
from .sales import router as sales_router

__all__ = [
    "dashboard_router",
    "sales_router",
    "purchases_router",
    "inventory_router",
]
