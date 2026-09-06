from typing import Any
import random
from datetime import datetime, timedelta


class WidgetDataResolver:
    """Resolves data for widgets based on their dataKey and params."""

    def __init__(self):
        self._resolvers: dict[str, callable] = {
            "finance.revenue": self._resolve_finance_revenue,
            "finance.revenue_trend": self._resolve_finance_revenue_trend,
            "finance.top_products": self._resolve_finance_top_products,
            "finance.monthly_revenue": self._resolve_finance_monthly_revenue,
            "finance.category_breakdown": self._resolve_finance_category_breakdown,
            "finance.regional_performance": self._resolve_finance_regional_performance,
            "operations.orders": self._resolve_operations_orders,
            "operations.fulfillment": self._resolve_operations_fulfillment,
            "operations.shipments": self._resolve_operations_shipments,
            "operations.order_status": self._resolve_operations_order_status,
            "operations.recent_orders": self._resolve_operations_recent_orders,
            "operations.production_output": self._resolve_operations_production_output,
            "manufacturing.output_by_unit": self._resolve_manufacturing_output,
            "manufacturing.efficiency": self._resolve_manufacturing_efficiency,
            "manufacturing.downtime": self._resolve_manufacturing_downtime,
            "quality.batch_pass_rate": self._resolve_quality_batch_pass_rate,
            "quality.certification_status": self._resolve_quality_certification_status,
            "quality.audit_findings": self._resolve_quality_audit_findings,
            "sales.regional_sales": self._resolve_sales_regional,
            "sales.product_performance": self._resolve_sales_product_performance,
            "sales.channel_mix": self._resolve_sales_channel_mix,
            "sales.target_vs_actual": self._resolve_sales_target_vs_actual,
            "supply_chain.inventory_levels": self._resolve_supply_chain_inventory,
            "supply_chain.supplier_performance": self._resolve_supply_chain_supplier,
            "supply_chain.logistics": self._resolve_supply_chain_logistics,
            "hr.headcount": self._resolve_hr_headcount,
            "hr.attrition": self._resolve_hr_attrition,
            "hr.training_completion": self._resolve_hr_training,
            "research.active_patents": self._resolve_research_patents,
            "research.rnd_projects": self._resolve_research_projects,
            "research.publications": self._resolve_research_publications,
        }

    def resolve(self, data_key: str, params: dict[str, Any] | None = None) -> Any:
        resolver = self._resolvers.get(data_key)
        if resolver:
            return resolver(params or {})
        return self._generate_generic_data(data_key, params or {})

    def _resolve_finance_revenue(self, params: dict) -> dict:
        return {
            "value": 847_500_000,
            "change": 12.5,
            "changeLabel": "vs last quarter",
            "secondaryValue": "₹84.75 Cr",
        }

    def _resolve_finance_revenue_trend(self, params: dict) -> list[dict]:
        months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
        return [
            {"date": m, "value": random.randint(60_000_000, 90_000_000), "series": "Revenue"}
            for m in months
        ]

    def _resolve_finance_top_products(self, params: dict) -> list[dict]:
        products = [
            {"label": "Curcumin C3 Complex", "value": 28_500_000, "percentage": 22},
            {"label": "BioPerine", "value": 21_200_000, "percentage": 16},
            {"label": "Saberry", "value": 15_800_000, "percentage": 12},
            {"label": "ForsLean", "value": 12_400_000, "percentage": 9},
            {"label": "Ashwagandha KSM-66", "value": 10_100_000, "percentage": 8},
            {"label": "Others", "value": 42_000_000, "percentage": 33},
        ]
        return products

    def _resolve_finance_monthly_revenue(self, params: dict) -> list[dict]:
        months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
        return [
            {"label": m, "value": random.randint(60_000_000, 90_000_000)}
            for m in months
        ]

    def _resolve_finance_category_breakdown(self, params: dict) -> list[dict]:
        return [
            {"label": "Nutraceuticals", "value": 42_000_000, "percentage": 32, "color": "#4C6EF5"},
            {"label": "Cosmeceuticals", "value": 28_500_000, "percentage": 22, "color": "#7950F2"},
            {"label": "Probiotics", "value": 19_800_000, "percentage": 15, "color": "#F06595"},
            {"label": "Enzymes", "value": 15_200_000, "percentage": 12, "color": "#FF6B6B"},
            {"label": "Specialty Chemicals", "value": 12_400_000, "percentage": 9, "color": "#FF922B"},
            {"label": "Others", "value": 13_100_000, "percentage": 10, "color": "#868E96"},
        ]

    def _resolve_finance_regional_performance(self, params: dict) -> list[dict]:
        return [
            {"label": "India", "value": 35_000_000, "color": "#4C6EF5", "extra": {"growth": 15.2}},
            {"label": "USA", "value": 28_000_000, "color": "#7950F2", "extra": {"growth": 8.7}},
            {"label": "Europe", "value": 18_000_000, "color": "#F06595", "extra": {"growth": 12.1}},
            {"label": "Japan", "value": 12_000_000, "color": "#FF6B6B", "extra": {"growth": 6.3}},
            {"label": "Brazil", "value": 8_000_000, "color": "#FF922B", "extra": {"growth": 22.5}},
            {"label": "Rest of World", "value": 15_000_000, "color": "#868E96", "extra": {"growth": 9.8}},
        ]

    def _resolve_operations_orders(self, params: dict) -> dict:
        return {
            "value": 1_247,
            "change": 8.3,
            "changeLabel": "vs last month",
        }

    def _resolve_operations_fulfillment(self, params: dict) -> dict:
        return {
            "value": "94.2%",
            "change": 2.1,
            "changeLabel": "vs target 92%",
        }

    def _resolve_operations_shipments(self, params: dict) -> dict:
        return {
            "value": 342,
            "change": -3.2,
            "changeLabel": "pending dispatch",
        }

    def _resolve_operations_order_status(self, params: dict) -> list[dict]:
        return [
            {"label": "Delivered", "value": 856, "percentage": 68.6, "color": "#51CF66"},
            {"label": "In Transit", "value": 234, "percentage": 18.8, "color": "#339AF0"},
            {"label": "Processing", "value": 98, "percentage": 7.9, "color": "#FF922B"},
            {"label": "Pending", "value": 45, "percentage": 3.6, "color": "#FFD43B"},
            {"label": "Cancelled", "value": 14, "percentage": 1.1, "color": "#FF6B6B"},
        ]

    def _resolve_operations_recent_orders(self, params: dict) -> dict:
        return {
            "columns": [
                {"key": "order_id", "label": "Order ID", "type": "text"},
                {"key": "customer", "label": "Customer", "type": "text"},
                {"key": "product", "label": "Product", "type": "text"},
                {"key": "amount", "label": "Amount", "type": "currency"},
                {"key": "status", "label": "Status", "type": "status"},
                {"key": "region", "label": "Region", "type": "text"},
                {"key": "date", "label": "Date", "type": "date"},
            ],
            "rows": [
                {"order_id": "ORD-2024-1247", "customer": "NutriCorp Inc", "product": "Curcumin C3 Complex", "amount": 45_000, "status": "Delivered", "region": "USA", "date": "2024-03-15"},
                {"order_id": "ORD-2024-1246", "customer": "EuroPharma GmbH", "product": "BioPerine", "amount": 32_500, "status": "In Transit", "region": "Europe", "date": "2024-03-14"},
                {"order_id": "ORD-2024-1245", "customer": "Tokyo Health Co", "product": "Saberry", "amount": 28_000, "status": "Processing", "region": "Japan", "date": "2024-03-14"},
                {"order_id": "ORD-2024-1244", "customer": "Brasil Nutri Ltda", "product": "ForsLean", "amount": 18_500, "status": "Delivered", "region": "Brazil", "date": "2024-03-13"},
                {"order_id": "ORD-2024-1243", "customer": "India Wellness Pvt", "product": "Ashwagandha KSM-66", "amount": 52_000, "status": "Delivered", "region": "India", "date": "2024-03-12"},
            ],
        }

    def _resolve_operations_production_output(self, params: dict) -> dict:
        return {
            "value": "12,450 kg",
            "change": 5.7,
            "changeLabel": "vs last week",
        }

    def _resolve_manufacturing_output(self, params: dict) -> list[dict]:
        units = ["Bangalore Unit 1", "Bangalore Unit 2", "Mysore", "New Jersey", "Salt Lake City"]
        return [
            {"label": u, "value": random.randint(800, 2500), "series": "Output (kg)"}
            for u in units
        ]

    def _resolve_manufacturing_efficiency(self, params: dict) -> dict:
        return {
            "value": 87.3,
            "min": 0,
            "max": 100,
            "target": 90,
            "thresholds": [
                {"value": 60, "color": "#FF6B6B", "label": "Poor"},
                {"value": 80, "color": "#FFD43B", "label": "Good"},
                {"value": 100, "color": "#51CF66", "label": "Excellent"},
            ],
        }

    def _resolve_manufacturing_downtime(self, params: dict) -> dict:
        return {
            "stages": [
                {"label": "Scheduled", "value": 48, "color": "#868E96"},
                {"label": "Unplanned", "value": 12, "color": "#FF6B6B"},
                {"label": "Maintenance", "value": 8, "color": "#FF922B"},
                {"label": "Changeover", "value": 15, "color": "#FFD43B"},
                {"label": "Running", "value": 337, "color": "#51CF66"},
            ],
        }

    def _resolve_quality_batch_pass_rate(self, params: dict) -> list[dict]:
        months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun"]
        return [
            {"date": m, "value": random.uniform(95, 99.5), "series": "Pass Rate %"}
            for m in months
        ]

    def _resolve_quality_certification_status(self, params: dict) -> dict:
        return {
            "value": "12/12",
            "change": 0,
            "changeLabel": "all units certified",
        }

    def _resolve_quality_audit_findings(self, params: dict) -> list[dict]:
        return [
            {"label": "Critical", "value": 0, "color": "#FF6B66"},
            {"label": "Major", "value": 3, "color": "#FF922B"},
            {"label": "Minor", "value": 12, "color": "#FFD43B"},
            {"label": "Observations", "value": 28, "color": "#868E96"},
        ]

    def _resolve_sales_regional(self, params: dict) -> list[dict]:
        regions = ["North America", "Europe", "Asia Pacific", "Latin America", "Middle East", "Africa"]
        return [
            {"label": r, "value": random.randint(5_000_000, 35_000_000)}
            for r in regions
        ]

    def _resolve_sales_product_performance(self, params: dict) -> dict:
        return {
            "axes": [
                {"label": "Revenue", "value": 85, "maxValue": 100},
                {"label": "Volume", "value": 72, "maxValue": 100},
                {"label": "Growth", "value": 68, "maxValue": 100},
                {"label": "Margin", "value": 78, "maxValue": 100},
                {"label": "Market Share", "value": 45, "maxValue": 100},
                {"label": "Brand Index", "value": 62, "maxValue": 100},
            ],
        }

    def _resolve_sales_channel_mix(self, params: dict) -> list[dict]:
        return [
            {"label": "Direct Sales", "value": 42, "percentage": 42, "color": "#4C6EF5"},
            {"label": "Distributors", "value": 28, "percentage": 28, "color": "#7950F2"},
            {"label": "Online", "value": 18, "percentage": 18, "color": "#F06595"},
            {"label": "OEM/Contract", "value": 12, "percentage": 12, "color": "#FF922B"},
        ]

    def _resolve_sales_target_vs_actual(self, params: dict) -> dict:
        return {
            "value": 847_500_000,
            "target": 900_000_000,
            "ranges": [
                {"min": 0, "max": 600_000_000, "color": "#FF6B6B"},
                {"min": 600_000_000, "max": 800_000_000, "color": "#FFD43B"},
                {"min": 800_000_000, "max": 1_000_000_000, "color": "#51CF66"},
            ],
        }

    def _resolve_supply_chain_inventory(self, params: dict) -> list[dict]:
        categories = ["Raw Materials", "Work in Progress", "Finished Goods", "Packaging", "Spare Parts"]
        return [
            {"label": c, "value": random.randint(500_000, 5_000_000), "series": "Inventory Value"}
            for c in categories
        ]

    def _resolve_supply_chain_supplier(self, params: dict) -> dict:
        return {
            "columns": [
                {"key": "supplier", "label": "Supplier", "type": "text"},
                {"key": "on_time", "label": "On-Time %", "type": "number"},
                {"key": "quality", "label": "Quality Score", "type": "number"},
                {"key": "lead_time", "label": "Avg Lead Time", "type": "text"},
                {"key": "status", "label": "Status", "type": "status"},
            ],
            "rows": [
                {"supplier": "Green Earth Botanicals", "on_time": 98.5, "quality": 97.2, "lead_time": "14 days", "status": "Preferred"},
                {"supplier": "Himalayan Herbs Pvt Ltd", "on_time": 94.2, "quality": 95.8, "lead_time": "21 days", "status": "Approved"},
                {"supplier": "Kerala Spices Co-op", "on_time": 91.7, "quality": 98.1, "lead_time": "18 days", "status": "Approved"},
                {"supplier": "SynthChem Industries", "on_time": 88.3, "quality": 92.4, "lead_time": "28 days", "status": "Conditional"},
            ],
        }

    def _resolve_supply_chain_logistics(self, params: dict) -> dict:
        return {
            "value": 342,
            "change": -3.2,
            "changeLabel": "shipments in transit",
        }

    def _resolve_hr_headcount(self, params: dict) -> dict:
        return {
            "value": 1_847,
            "change": 4.2,
            "changeLabel": "vs last quarter",
        }

    def _resolve_hr_attrition(self, params: dict) -> list[dict]:
        departments = ["R&D", "Manufacturing", "Sales", "Quality", "Admin", "Supply Chain"]
        return [
            {"label": d, "value": random.uniform(3, 15), "series": "Attrition %"}
            for d in departments
        ]

    def _resolve_hr_training(self, params: dict) -> dict:
        return {
            "value": 78,
            "max": 100,
            "label": "Training completion rate",
        }

    def _resolve_research_patents(self, params: dict) -> dict:
        return {
            "value": 512,
            "change": 8,
            "changeLabel": "filed this year",
        }

    def _resolve_research_projects(self, params: dict) -> list[dict]:
        stages = [
            {"label": "Discovery", "value": 18, "color": "#4C6EF5"},
            {"label": "Pre-Clinical", "value": 12, "color": "#7950F2"},
            {"label": "Clinical", "value": 6, "color": "#F06595"},
            {"label": "Validation", "value": 8, "color": "#FF922B"},
            {"label": "Scale-Up", "value": 4, "color": "#51CF66"},
        ]
        return {"stages": stages}

    def _resolve_research_publications(self, params: dict) -> dict:
        return {
            "value": 47,
            "change": 12,
            "changeLabel": "published this year",
        }

    def _generate_generic_data(self, data_key: str, params: dict) -> Any:
        """Fallback: generate plausible mock data for any unrecognized dataKey."""
        chart_type = params.get("chart_type", "bar")
        if chart_type in ("kpi", "gauge", "progress"):
            return {"value": random.randint(50, 100), "change": random.uniform(-10, 15)}
        elif chart_type in ("line", "area", "sparkline"):
            return [{"date": f"2024-{m:02d}", "value": random.randint(100, 1000)} for m in range(1, 13)]
        elif chart_type in ("pie", "donut", "funnel"):
            return [{"label": f"Category {i}", "value": random.randint(10, 100)} for i in range(1, 6)]
        elif chart_type == "table":
            return {
                "columns": [{"key": "name", "label": "Name"}, {"key": "value", "label": "Value"}],
                "rows": [{"name": f"Item {i}", "value": random.randint(100, 1000)} for i in range(1, 6)],
            }
        else:
            return [{"label": f"Item {i}", "value": random.randint(10, 100)} for i in range(1, 6)]


widget_resolver = WidgetDataResolver()
