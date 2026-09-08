from fastapi import APIRouter, Depends

from synapse_api.domain.entities.user import User

from ..auth import get_current_user
from ..schemas.dashboard import (
    CategoryBreakdown,
    DashboardSummary,
    MonthlyRevenue,
    OrderStatus,
    RecentOrder,
    RegionalPerformance,
    SalesTrendPoint,
    TopProduct,
)

router = APIRouter(prefix="/api/dashboard", tags=["dashboard"])

MONTHS = [
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

REGIONS = [
    "INDIA",
    "NORTH_AMERICA",
    "EUROPE",
    "SOUTHEAST_ASIA",
    "MIDDLE_EAST",
    "EAST_ASIA",
    "LATIN_AMERICA",
]

SALES_BY_REGION = {
    "INDIA": [
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
    ],
    "NORTH_AMERICA": [
        640000,
        610000,
        720000,
        690000,
        750000,
        810000,
        780000,
        840000,
        880000,
        860000,
        920000,
        960000,
    ],
    "EUROPE": [
        520000,
        490000,
        580000,
        550000,
        610000,
        660000,
        630000,
        680000,
        720000,
        700000,
        750000,
        790000,
    ],
    "SOUTHEAST_ASIA": [
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
    ],
    "MIDDLE_EAST": [
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
    ],
    "EAST_ASIA": [
        280000,
        260000,
        310000,
        290000,
        330000,
        360000,
        340000,
        370000,
        390000,
        380000,
        410000,
        440000,
    ],
    "LATIN_AMERICA": [
        150000,
        140000,
        170000,
        160000,
        180000,
        200000,
        190000,
        210000,
        230000,
        220000,
        240000,
        260000,
    ],
}

PRODUCT_CATEGORIES = {
    "Nutraceuticals": {
        "revenue": 18500000,
        "products": [
            "Curcumin C3 Complex",
            "AprèsFlex (Boswellia)",
            "Forslean (Forskolin)",
            "Citrin (Garcinia)",
            "BioPerine (Black Pepper)",
        ],
    },
    "Probiotics": {
        "revenue": 8200000,
        "products": [
            "LactoSpore Probiotics",
            "Saberry (Amla)",
            "Holimel (Melatonin)",
        ],
    },
    "Cosmeceuticals": {
        "revenue": 9800000,
        "products": [
            "Saberry (Amla)",
            "Holimel (Melatonin)",
            "LactoSpore Probiotics",
        ],
    },
    "Specialty Chemicals": {
        "revenue": 6400000,
        "products": [
            "BioPerine (Black Pepper)",
            "Citrin (Garcinia)",
        ],
    },
    "Enzymes": {
        "revenue": 5350000,
        "products": [
            "LactoSpore Probiotics",
        ],
    },
}

ORDER_STATUSES = [
    ("DELIVERED", 7842, 61.0),
    ("SHIPPED", 2826, 22.0),
    ("PROCESSING", 1413, 11.0),
    ("PENDING_APPROVAL", 514, 4.0),
    ("CANCELLED", 252, 2.0),
]

RECENT_ORDERS = [
    RecentOrder(
        order_id="SSG-2024-12847",
        customer="NutriVita Labs, USA",
        product="Curcumin C3 Complex",
        amount=245000,
        status="SHIPPED",
        date="2024-12-15",
        region="NORTH_AMERICA",
    ),
    RecentOrder(
        order_id="SSG-2024-12846",
        customer="HerbaLife Europe GmbH",
        product="AprèsFlex (Boswellia)",
        amount=189000,
        status="PROCESSING",
        date="2024-12-14",
        region="EUROPE",
    ),
    RecentOrder(
        order_id="SSG-2024-12845",
        customer="BioExtracts India Pvt Ltd",
        product="Forslean (Forskolin)",
        amount=156000,
        status="DELIVERED",
        date="2024-12-13",
        region="INDIA",
    ),
    RecentOrder(
        order_id="SSG-2024-12844",
        customer="AsiaNutraceuticals Singapore",
        product="LactoSpore Probiotics",
        amount=134000,
        status="SHIPPED",
        date="2024-12-12",
        region="SOUTHEAST_ASIA",
    ),
    RecentOrder(
        order_id="SSG-2024-12843",
        customer="Gulf Health Supplements LLC",
        product="Citrin (Garcinia)",
        amount=98000,
        status="PENDING_APPROVAL",
        date="2024-12-11",
        region="MIDDLE_EAST",
    ),
    RecentOrder(
        order_id="SSG-2024-12842",
        customer="Tokyo Phytochemicals Co.",
        product="BioPerine (Black Pepper)",
        amount=112000,
        status="DELIVERED",
        date="2024-12-10",
        region="EAST_ASIA",
    ),
    RecentOrder(
        order_id="SSG-2024-12841",
        customer="BrazilNut Supplements SA",
        product="Saberry (Amla)",
        amount=87000,
        status="PROCESSING",
        date="2024-12-09",
        region="LATIN_AMERICA",
    ),
    RecentOrder(
        order_id="SSG-2024-12840",
        customer="Ayurveda Wellness Co., India",
        product="Holimel (Melatonin)",
        amount=67000,
        status="DELIVERED",
        date="2024-12-08",
        region="INDIA",
    ),
]


@router.get("/summary", response_model=DashboardSummary)
async def get_summary(user: User = Depends(get_current_user)):
    return DashboardSummary(
        revenue=48250000,
        orders=12847,
        fulfillment_rate=94.2,
        active_shipments=342,
        revenue_change=12.5,
        orders_change=8.3,
    )


@router.get("/sales-trend", response_model=list[SalesTrendPoint])
async def get_sales_trend(user: User = Depends(get_current_user)):
    points = []
    for i, month in enumerate(MONTHS):
        for region in REGIONS:
            points.append(
                SalesTrendPoint(
                    month=month,
                    region=region,
                    amount=SALES_BY_REGION[region][i],
                )
            )
    return points


@router.get("/top-products", response_model=list[TopProduct])
async def get_top_products(user: User = Depends(get_current_user)):
    return [
        TopProduct(name="Curcumin C3 Complex", revenue=8920000, units=45200),
        TopProduct(name="AprèsFlex (Boswellia)", revenue=7560000, units=38900),
        TopProduct(name="Forslean (Forskolin)", revenue=6340000, units=12400),
        TopProduct(name="LactoSpore Probiotics", revenue=5210000, units=89000),
        TopProduct(name="Citrin (Garcinia)", revenue=4450000, units=89000),
        TopProduct(name="BioPerine (Black Pepper)", revenue=3980000, units=67000),
        TopProduct(name="Saberry (Amla)", revenue=3120000, units=15600),
        TopProduct(name="Holimel (Melatonin)", revenue=2780000, units=42000),
    ]


@router.get("/regional-performance", response_model=list[RegionalPerformance])
async def get_regional_performance(user: User = Depends(get_current_user)):
    performance = []
    for region in REGIONS:
        amounts = SALES_BY_REGION[region]
        total = sum(amounts)
        latest = amounts[-1]
        previous = amounts[-2]
        growth = ((latest - previous) / previous) * 100 if previous > 0 else 0
        performance.append(
            RegionalPerformance(
                region=region,
                ytd_revenue=total,
                latest_month=latest,
                growth_rate=round(growth, 1),
            )
        )
    return performance


@router.get("/order-status", response_model=list[OrderStatus])
async def get_order_status(user: User = Depends(get_current_user)):
    return [
        OrderStatus(status=status, count=count, percentage=percentage)
        for status, count, percentage in ORDER_STATUSES
    ]


@router.get("/monthly-revenue", response_model=list[MonthlyRevenue])
async def get_monthly_revenue(user: User = Depends(get_current_user)):
    monthly = []
    for i, month in enumerate(MONTHS):
        total_revenue = sum(SALES_BY_REGION[region][i] for region in REGIONS)
        orders = int(total_revenue / 3750)
        monthly.append(
            MonthlyRevenue(month=month, revenue=total_revenue, orders=orders)
        )
    return monthly


@router.get("/category-breakdown", response_model=list[CategoryBreakdown])
async def get_category_breakdown(user: User = Depends(get_current_user)):
    total_revenue = sum(cat["revenue"] for cat in PRODUCT_CATEGORIES.values())
    breakdown = []
    for category, data in PRODUCT_CATEGORIES.items():
        percentage = (data["revenue"] / total_revenue) * 100
        breakdown.append(
            CategoryBreakdown(
                category=category,
                revenue=data["revenue"],
                percentage=round(percentage, 1),
                product_count=len(data["products"]),
            )
        )
    return breakdown


@router.get("/recent-orders", response_model=list[RecentOrder])
async def get_recent_orders(user: User = Depends(get_current_user)):
    return RECENT_ORDERS
