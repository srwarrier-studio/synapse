from fastapi import APIRouter

from ..schemas.dashboard import DashboardSummary, SalesTrendPoint, TopProduct

router = APIRouter(prefix="/api/dashboard", tags=["dashboard"])


@router.get("/summary", response_model=DashboardSummary)
async def get_summary():
    return DashboardSummary(
        revenue=12450000,
        orders=1847,
        fulfillment_rate=94.2,
        active_shipments=23,
        revenue_change=12.5,
        orders_change=8.3,
    )


@router.get("/sales-trend", response_model=list[SalesTrendPoint])
async def get_sales_trend():
    months = [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
    ]
    regions = ["INDIA", "SOUTHEAST_ASIA", "MIDDLE_EAST"]
    india = [
        820000,
        780000,
        910000,
        870000,
        950000,
        1020000,
        980000,
        1050000,
        1100000,
        1080000,
        1150000,
        1200000,
    ]
    sea = [
        340000,
        310000,
        380000,
        360000,
        400000,
        420000,
        390000,
        440000,
        460000,
        450000,
        480000,
        500000,
    ]
    mena = [
        210000,
        190000,
        240000,
        220000,
        260000,
        280000,
        250000,
        290000,
        310000,
        300000,
        330000,
        350000,
    ]
    base = {"INDIA": india, "SOUTHEAST_ASIA": sea, "MIDDLE_EAST": mena}
    points = []
    for i, month in enumerate(months):
        for region in regions:
            points.append(
                SalesTrendPoint(month=month, region=region, amount=base[region][i])
            )
    return points


@router.get("/top-products", response_model=list[TopProduct])
async def get_top_products():
    return [
        TopProduct(name="Collagen Peptides", revenue=2890000, units=64200),
        TopProduct(name="Turmeric Curcumin 1000mg", revenue=2340000, units=78000),
        TopProduct(name="Omega-3 Fish Oil 1200mg", revenue=1980000, units=56600),
        TopProduct(name="Probiotic 50B CFU", revenue=1760000, units=44000),
        TopProduct(name="CoQ10 200mg", revenue=1520000, units=47500),
    ]
