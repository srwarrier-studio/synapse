# CFO Dashboard — Sami Sabinsa Group

## Context

### Company
- **Name**: Sami Sabinsa Group (Nutraceuticals)
- **Divisions**: Sami Sabinsa (Parent), Sami Neutra, Sami Organica
- **Revenue**: ₹500-1000 Cr range
- **Product Categories**: Capsules, Powder, Extracts, Cosmetics
- **Channels**: Domestic, Export
- **Fiscal Year**: April to March

### Users
- **Primary**: CFO
- **Secondary**: Finance Controller, Deputy
- **Meeting Cadence**: 3x per week (weekly)

### Current State
- SAP data → Excel exports → Pivots → Static MIS reports
- CFO says: "MIS as a ritual but not helpful, can't assess anything"
- Pain points: Margin pressure, inventory write-offs, cash flow visibility

### Target State
- Real-time dashboard for company health assessment
- Interactive + Presentation mode (full-screen for meetings)
- Mock first (FastAPI), then SAP OData integration

---

## Dashboard Design

### Row 1: Pulse Check (KPI Cards)

| Card | Metric | Shows | Decision |
|------|--------|-------|----------|
| Revenue | Total sales (₹ Cr) | vs Target %, vs Last Month | Are we on track? |
| Gross Margin | Margin % | vs Target, trend | Are we profitable? |
| Cash Position | Cash in hand/bank | Runway days | Can we survive? |
| Outstanding | Receivables (₹ Cr) | Aging (>90 days) | Cash blockage? |

### Row 2: Trends (2 Charts)

| Chart | Type | Data | Insight |
|-------|------|------|---------|
| Revenue Trend | Line chart | 12 months, Domestic vs Export | Growth trajectory |
| Division Split | Donut chart | 3 divisions revenue share | Which division leads? |

### Row 3: Deep Dive (2 Wide Cards)

| Card | Type | Data | Insight |
|------|------|------|---------|
| Inventory Aging | Stacked bar | 0-30d, 31-60d, >60d by division | Dead stock risk |
| Receivables Aging | Stacked bar | 0-30d, 31-60d, >60d by division | Collection efficiency |

### Row 4: Expense Control (1 Full Width)

| Card | Type | Data | Insight |
|------|------|------|---------|
| Budget vs Actual | Horizontal bar | Cost center wise, with variance | Overspending areas |

### Row 5: Division Performance (3 Cards)

| Card | Type | Data | Insight |
|------|------|------|---------|
| Sami Sabinsa | Mini P&L | Revenue, Cost, Profit | Parent company health |
| Sami Neutra | Mini P&L | Revenue, Cost, Profit | Division health |
| Sami Organica | Mini P&L | Revenue, Cost, Profit | Division health |

---

## Data Model (CDS Views for SAP Consultant)

### 1. Sales Overview — `Z_CFO_SALES_V`

```json
{
  "fiscal_year": "2024-25",
  "fiscal_period": "04",
  "period_date": "2024-04",
  "division": "Sami Sabinsa | Sami Neutra | Sami Organica",
  "channel": "Domestic | Export",
  "product_category": "Capsules | Powder | Extracts | Cosmetics",
  "revenue": 12500000,
  "cogs": 7250000,
  "gross_margin": 5250000,
  "gross_margin_pct": 42.0,
  "target_revenue": 13500000,
  "target_achievement_pct": 92.6
}
```

### 2. Receivables — `Z_CFO_RECEIVABLES_V`

```json
{
  "customer_code": "CUST001",
  "customer_name": "ABC Pharma",
  "division": "Sami Sabinsa",
  "channel": "Domestic",
  "invoice_number": "INV-2024-001",
  "invoice_date": "2024-04-15",
  "due_date": "2024-05-15",
  "invoice_amount": 2500000,
  "outstanding_amount": 2500000,
  "age_days": 45,
  "age_bucket": "0-30 | 31-60 | 61-90 | >90"
}
```

### 3. Inventory — `Z_CFO_INVENTORY_V`

```json
{
  "material_code": "MAT001",
  "material_name": "Ashwagandha Capsules",
  "division": "Sami Neutra",
  "product_category": "Capsules",
  "stock_quantity": 50000,
  "stock_value": 1250000,
  "age_days": 25,
  "age_bucket": "0-30 | 31-60 | 61-90 | >90",
  "shelf_life_days": 730,
  "expiry_date": "2026-04-15"
}
```

### 4. Cash Flow — `Z_CFO_CASHFLOW_V`

```json
{
  "transaction_date": "2024-04-15",
  "cash_inflow": 5000000,
  "cash_outflow": 3500000,
  "closing_balance": 18000000,
  "inflow_category": "Customer Payment | Loan | Other",
  "outflow_category": "Vendor Payment | Salary | Overhead | Tax"
}
```

### 5. Expenses — `Z_CFO_EXPENSES_V`

```json
{
  "fiscal_year": "2024-25",
  "fiscal_period": "04",
  "cost_center": "CC001",
  "cost_center_name": "Manufacturing",
  "expense_category": "Raw Material | Salary | Marketing | Overhead",
  "budget_amount": 5000000,
  "actual_amount": 4800000,
  "variance": 200000,
  "variance_pct": 4.0
}
```

### 6. Division P&L — `Z_CFO_PROFITABILITY_V`

```json
{
  "fiscal_year": "2024-25",
  "fiscal_period": "04",
  "division": "Sami Sabinsa",
  "revenue": 50000000,
  "direct_cost": 29000000,
  "gross_profit": 21000000,
  "overhead": 8000000,
  "ebitda": 13000000,
  "ebitda_pct": 26.0,
  "net_profit": 9000000,
  "net_profit_pct": 18.0
}
```

---

## API Response Structure (FastAPI Mock → Later SAP OData)

### Endpoint: `GET /api/v1/dashboard/summary`

```json
{
  "period": "2024-04",
  "fiscal_year": "2024-25",
  "kpi": {
    "revenue": {
      "value": 142000000,
      "target": 155000000,
      "target_achievement_pct": 91.6,
      "previous_month": 131000000,
      "yoy_change_pct": 8.4
    },
    "gross_margin": {
      "value_pct": 42.0,
      "target_pct": 45.0,
      "previous_month_pct": 43.5
    },
    "cash_position": {
      "value": 180000000,
      "runway_days": 45,
      "previous_month": 165000000
    },
    "receivables": {
      "total": 320000000,
      "overdue": 85000000,
      "overdue_pct": 26.6,
      "previous_month": 340000000
    }
  },
  "revenue_trend": [
    { "month": "2023-05", "domestic": 95000000, "export": 35000000 },
    { "month": "2023-06", "domestic": 98000000, "export": 38000000 }
  ],
  "division_split": [
    { "division": "Sami Sabinsa", "revenue": 65000000, "share_pct": 45.8 },
    { "division": "Sami Neutra", "revenue": 48000000, "share_pct": 33.8 },
    { "division": "Sami Organica", "revenue": 29000000, "share_pct": 20.4 }
  ],
  "inventory_aging": {
    "by_division": [
      {
        "division": "Sami Sabinsa",
        "buckets": [
          { "age": "0-30 days", "value": 45000000 },
          { "age": "31-60 days", "value": 25000000 },
          { "age": ">60 days", "value": 12000000 }
        ]
      }
    ]
  },
  "receivables_aging": {
    "by_division": [
      {
        "division": "Sami Sabinsa",
        "buckets": [
          { "age": "0-30 days", "value": 120000000 },
          { "age": "31-60 days", "value": 85000000 },
          { "age": ">60 days", "value": 45000000 }
        ]
      }
    ]
  },
  "expense_variance": {
    "by_cost_center": [
      {
        "cost_center": "Manufacturing",
        "budget": 50000000,
        "actual": 48000000,
        "variance_pct": 4.0
      }
    ]
  },
  "division_performance": [
    {
      "division": "Sami Sabinsa",
      "revenue": 65000000,
      "gross_profit": 27300000,
      "gross_margin_pct": 42.0,
      "ebitda": 13000000,
      "ebitda_pct": 20.0
    }
  ]
}
```

---

## Tech Stack

| Layer | Technology | Purpose |
|-------|------------|---------|
| Frontend | React + Mantine + TanStack Router | Dashboard UI |
| Backend | FastAPI (Python) | API layer, mock data now, SAP later |
| Data | SAP CDS Views → OData | Live data (Phase 2) |
| State | React Query | Data fetching, caching |

---

## Development Phases

### Phase 1: Mock Dashboard (Current)
- [ ] Finalize dashboard layout with CFO
- [ ] Create mock data in FastAPI
- [ ] Build all dashboard components
- [ ] Add presentation mode (full-screen)
- [ ] CFO sign-off

### Phase 2: SAP Integration
- [ ] Create PRD for SAP consultants (CDS views + OData endpoints)
- [ ] Build OData connector in FastAPI
- [ ] Replace mock data with live SAP data
- [ ] Add data refresh scheduling

### Phase 3: Enhancements
- [ ] Export to PDF/Excel
- [ ] Email reports
- [ ] Mobile view
- [ ] Role-based access (CFC sees different view)

---

## Component Architecture

```
src/
├── components/
│   ├── cards/              # Layout cards (Small, Wide, Medium, Large)
│   ├── charts/             # Chart components
│   │   └── kpi-card/       # Composable KPI card
│   │       ├── KPICard.tsx
│   │       ├── KPILabel.tsx
│   │       ├── KPIValue.tsx
│   │       ├── KPITrend.tsx
│   │       ├── KPIStats.tsx
│   │       └── KPIStat.tsx
│   ├── layout/             # App shell, Header, Navbar
│   └── dashboard/          # Dashboard-specific components
├── hooks/                  # Custom hooks
├── data/                   # API client, mock data
├── pages/                  # Route pages
│   └── dashboard/
│       └── index.tsx       # Main dashboard page
└── routes/                 # TanStack Router routes
```

---

## Mock Data Files (FastAPI)

| File | Content |
|------|---------|
| `mock/sales.py` | 12 months × 3 divisions × domestic/export |
| `mock/cashflow.py` | Daily cash position for 30 days |
| `mock/inventory.py` | Stock by category, division, aging |
| `mock/receivables.py` | Outstanding by customer, age buckets |
| `mock/expenses.py` | Cost center data with budget vs actual |
| `mock/divisions.py` | Division-wise P&L |

---

## Key Decisions Made

1. **Composable KPI cards** — Not monolithic, mix-and-match components
2. **CSS Modules** — Not inline styles, maintainable
3. **react-grid-layout** — Drag-and-drop in edit mode
4. **Edit mode** — Toggle via header button, locks layout when done
5. **Color coding** — Green (on-track), Amber (warning), Red (behind)
6. **Fiscal year** — April to March (Indian standard)
7. **Currency** — Indian Rupees (₹) with Cr/Lakhs formatting

---

## Notes for Future AI Agents

1. **Read this PLAN.md first** — Understand context before coding
2. **Don't overcomplicate** — CFO wants simple, at-a-glance view
3. **Mock data first** — Realistic numbers, then SAP integration
4. **Components are composable** — Don't create monolithic components
5. **Follow clean architecture** — Domain, data, components separation
6. **Test with CFO workflow** — Weekly meetings, presentation mode
7. **Indian numbering** — Use Lakhs/Crores, not millions/billions
8. **Fiscal year** — April to March, not calendar year
