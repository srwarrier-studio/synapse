from .auth import router as auth_router
from .dashboard import router as dashboard_router
from .inventory import router as inventory_router
from .purchases import router as purchases_router
from .sales import router as sales_router
from .widget import router as widget_router

__all__ = [
    "auth_router",
    "dashboard_router",
    "sales_router",
    "purchases_router",
    "inventory_router",
    "widget_router",
]
