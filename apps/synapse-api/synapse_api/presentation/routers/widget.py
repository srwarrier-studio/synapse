from fastapi import APIRouter, Depends

from synapse_api.domain.entities.user import User

from ...infrastructure.widget_resolver import widget_resolver
from ..auth import get_current_user
from ..schemas.widget import (
    DashboardDataRequest,
    DashboardDataResponse,
    WidgetConfig,
)

router = APIRouter(prefix="/widgets", tags=["widgets"])


@router.post("/data", response_model=DashboardDataResponse)
async def get_widget_data(
    request: DashboardDataRequest,
    user: User = Depends(get_current_user),
):
    """Synthesize data for multiple widgets in a single request."""
    result = {}
    for widget in request.widgets:
        data = widget_resolver.resolve(widget.dataKey, widget.params)
        result[widget.id] = data
    return DashboardDataResponse(data=result)


@router.post("/{widget_id}/data")
async def get_single_widget_data(
    widget_id: str,
    config: WidgetConfig,
    user: User = Depends(get_current_user),
):
    """Get data for a single widget."""
    data = widget_resolver.resolve(config.dataKey, config.params)
    return {"id": widget_id, "data": data}
