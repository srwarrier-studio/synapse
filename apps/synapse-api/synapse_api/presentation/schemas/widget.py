from pydantic import BaseModel, Field
from typing import Any, Literal
from enum import Enum


class ChartType(str, Enum):
    KPI = "kpi"
    LINE = "line"
    BAR = "bar"
    PIE = "pie"
    DONUT = "donut"
    AREA = "area"
    STACKED_BAR = "stacked-bar"
    GROUPED_BAR = "grouped-bar"
    SCATTER = "scatter"
    BUBBLE = "bubble"
    HEATMAP = "heatmap"
    GAUGE = "gauge"
    PROGRESS = "progress"
    TABLE = "table"
    SPARKLINE = "sparkline"
    FUNNEL = "funnel"
    RADAR = "radar"
    TREEMAP = "treemap"
    WATERFALL = "waterfall"
    BULLET = "bullet"


class WidgetCategory(str, Enum):
    FINANCE = "finance"
    OPERATIONS = "operations"
    RESEARCH = "research"
    MANUFACTURING = "manufacturing"
    QUALITY = "quality"
    SALES = "sales"
    SUPPLY_CHAIN = "supply-chain"
    HR = "hr"


class WidgetConfig(BaseModel):
    id: str
    type: ChartType
    title: str
    category: WidgetCategory
    dataKey: str
    params: dict[str, Any] = Field(default_factory=dict)
    gridPosition: dict[str, int] = Field(
        default_factory=lambda: {"x": 0, "y": 0, "w": 6, "h": 4, "minW": 4, "minH": 3}
    )


class WidgetDataRequest(BaseModel):
    widgets: list[WidgetConfig]


class KPIData(BaseModel):
    value: int | float | str
    change: float | None = None
    changeLabel: str | None = None
    secondaryValue: str | None = None


class TimeSeriesDataPoint(BaseModel):
    date: str
    value: float
    series: str | None = None


class CategoryDataPoint(BaseModel):
    label: str
    value: float
    color: str | None = None
    percentage: float | None = None


class TableColumn(BaseModel):
    key: str
    label: str
    type: Literal["text", "number", "currency", "date", "status"] = "text"


class TableData(BaseModel):
    columns: list[TableColumn]
    rows: list[dict[str, Any]]


class GaugeData(BaseModel):
    value: float
    min: float
    max: float
    target: float | None = None
    thresholds: list[dict[str, Any]] | None = None


class FunnelStage(BaseModel):
    label: str
    value: float
    color: str | None = None


class FunnelData(BaseModel):
    stages: list[FunnelStage]


class HeatmapData(BaseModel):
    xLabels: list[str]
    yLabels: list[str]
    values: list[list[float]]


class RadarAxis(BaseModel):
    label: str
    value: float
    maxValue: float | None = None


class RadarData(BaseModel):
    axes: list[RadarAxis]
    series: list[dict[str, Any]] | None = None


class TreemapItem(BaseModel):
    label: str
    value: float
    color: str | None = None
    children: list[dict[str, Any]] | None = None


class TreemapData(BaseModel):
    items: list[TreemapItem]


class WaterfallItem(BaseModel):
    label: str
    value: float
    type: Literal["positive", "negative", "total"]


class WaterfallData(BaseModel):
    items: list[WaterfallItem]


class ScatterPoint(BaseModel):
    x: float
    y: float
    label: str | None = None
    series: str | None = None
    size: float | None = None


class ScatterData(BaseModel):
    points: list[ScatterPoint]


class BulletData(BaseModel):
    value: float
    target: float
    ranges: list[dict[str, Any]]


class ProgressData(BaseModel):
    value: float
    max: float
    label: str | None = None


class WidgetDataResponse(BaseModel):
    data: dict[str, Any]


class DashboardDataRequest(BaseModel):
    widgets: list[WidgetConfig]


class DashboardDataResponse(BaseModel):
    widgets: dict[str, Any]
