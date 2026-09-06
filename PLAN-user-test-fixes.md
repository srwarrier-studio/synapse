# Implementation Plan: User Test Feedback Fixes

## Context

User testing revealed three critical issues:
1. **Charts don't tell a story** — CFO wants: "Sales increased in June → click June → see curcumin +20%, turmeric cost -₹1000, 10T extra extract"
2. **Homepage UI is bland** — "Looks like a non-character UI", needs modern header with avatar, profile, visual identity
3. **No access control** — Operations shouldn't see sales, Finance shouldn't see WIP inventory

Phased approach: RBAC first (security), then UI (satisfaction), then insights (value).

---

## Phase 1: Role-Based Access Control

### Step 1.1 — Add Dependencies

**`apps/synapse-api/pyproject.toml`**
- Add `python-jose[cryptography]>=3.3.0` (JWT encoding/decoding)
- Add `passlib[bcrypt]>=1.7.4` (password hashing)
- Add `python-multipart>=0.0.9` (OAuth2 form parsing)

### Step 1.2 — Extend User Model

**`apps/synapse-api/synapse_api/infrastructure/database.py`**
- Add columns to `User` model:
  - `role = Column(String, nullable=False, default="viewer")` — values: `admin`, `management`, `finance`, `operations`, `sales`
  - `email = Column(String, nullable=True)`
  - `full_name = Column(String, nullable=True)`
  - `avatar_url = Column(String, nullable=True)`

### Step 1.3 — Update Seed Script

**`apps/synapse-api/synapse_api/seed.py`**
- Seed 5 users (one per role):
  - `admin / Admin@123` (role: admin)
  - `finance / Fin@123` (role: finance)
  - `ops / Ops@123` (role: operations)
  - `sales / Sales@123` (role: sales)
  - `management / Mgmt@123` (role: management)
- Use `passlib` to hash passwords before storing
- Add `email`, `full_name` for each

### Step 1.4 — Auth Module

**New: `apps/synapse-api/synapse_api/presentation/auth.py`**
- `SECRET_KEY` from env or hardcoded dev key
- `create_access_token(data: dict)` — creates JWT with `sub` (user_id), `role`, `exp` (24h)
- `get_current_user(token: str = Depends(oauth2_scheme))` — decodes JWT, fetches user from DB, returns `User`
- `require_role(*roles)` — dependency factory that checks `user.role in roles`

**`apps/synapse-api/synapse_api/presentation/schemas/auth.py`**
- Add `UserInfo(BaseModel)`: `id`, `username`, `role`, `full_name`, `avatar_url`, `email`
- Extend `LoginResponse` to include `user: UserInfo`

**`apps/synapse-api/synapse_api/presentation/routers/auth.py`**
- Replace `verify_password` with `passlib.hash.bcrypt`
- Generate real JWT via `create_access_token`
- Return `LoginResponse(access_token=token, user=UserInfo(...))`

### Step 1.5 — Add Auth Dependency to DI

**`apps/synapse-api/synapse_api/presentation/deps.py`**
- Add `oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/auth/login")`
- Add `get_current_user` dependency (imported from `auth.py`)

### Step 1.6 — Role-Gate Endpoints

**`apps/synapse-api/synapse_api/presentation/routers/dashboard.py`**
- Add `user: User = Depends(get_current_user)` to all endpoints
- Filter summary data by role:
  - `management` / `admin`: sees everything
  - `finance`: sees revenue, orders, financial KPIs only
  - `operations`: sees inventory, production, shipment KPIs only
  - `sales`: sees sales trends, regional performance, top products only

**`apps/synapse-api/synapse_api/presentation/routers/sales.py`**
- Add `user: User = Depends(require_role("admin", "management", "sales"))`

**`apps/synapse-api/synapse_api/presentation/routers/purchases.py`**
- Add `user: User = Depends(require_role("admin", "management", "finance", "operations"))`

**`apps/synapse-api/synapse_api/presentation/routers/inventory.py`**
- Add `user: User = Depends(require_role("admin", "management", "operations"))`

**`apps/synapse-api/synapse_api/presentation/routers/widget.py`**
- Add `user: User = Depends(get_current_user)`

### Step 1.7 — Frontend Auth Domain

**New: `apps/synapse-web/src/domain/entities/auth.ts`**
```ts
interface User {
  id: number;
  username: string;
  role: "admin" | "management" | "finance" | "operations" | "sales";
  fullName: string;
  avatarUrl: string | null;
  email: string;
}

interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
}
```

### Step 1.8 — Frontend Auth API

**`apps/synapse-web/src/data/api-client.ts`**
- Modify `request<T>()` to read token from `localStorage` and attach `Authorization: Bearer <token>` header
- On 401 response, clear token and redirect to `/`

**New: `apps/synapse-web/src/data/auth.ts`**
- `login(username, password)` — POST `/auth/login`, store token + user in `localStorage`
- `logout()` — clear `localStorage`, redirect to `/`
- `getStoredAuth()` — read token + user from `localStorage`

### Step 1.9 — Frontend Auth Context

**New: `apps/synapse-web/src/hooks/useAuth.ts`**
- `AuthProvider` component wrapping children with `AuthContext`
- `useAuth()` hook returns `{ user, isAuthenticated, login, logout, hasRole, canAccess }`
- `canAccess(module: string)` — checks role against module access map:
  - `dashboard`: all roles
  - `sales`: admin, management, sales
  - `purchases`: admin, management, finance, operations
  - `inventory`: admin, management, operations
  - `reports`: admin, management, finance

### Step 1.10 — Frontend Route Guard

**`apps/synapse-web/src/routes/_authenticated.tsx`**
- Add `beforeLoad` hook:
  ```ts
  beforeLoad: ({ location }) => {
    const auth = getStoredAuth();
    if (!auth.isAuthenticated) {
      throw redirect({ to: "/", search: { redirect: location.href } });
    }
  }
  ```
- Wrap component in `<AuthProvider><AppLayout /></AuthProvider>`

**`apps/synapse-web/src/routes/index.tsx`** (login page)
- If already authenticated, redirect to `/dashboard`

### Step 1.11 — Role-Based Navbar

**`apps/synapse-web/src/components/layout/Navbar.tsx`**
- Import `useAuth` hook
- Filter `NAV_ITEMS` based on `canAccess(module)`:
  - Dashboard: all
  - Sales & Orders: admin, management, sales
  - Purchases: admin, management, finance, operations
  - Inventory: admin, management, operations
  - Manufacturing: admin, management, operations
  - Quality Control: admin, management, operations
  - R&D: admin, management
  - Supply Chain: admin, management, operations
  - HR & Training: admin, management
  - Reports: admin, management, finance

### Step 1.12 — Frontend Login Form Update

**`apps/synapse-web/src/pages/login/components/login-form.tsx`**
- Update to store user info from login response
- Store token in `localStorage`
- After login, call `window.location.href = "/dashboard"` to re-initialize auth state

---

## Phase 2: UI Modernization

### Step 2.1 — Redesigned Header

**`apps/synapse-web/src/components/layout/Header.tsx`**
- Left section: Synapse logo (icon + wordmark) with branded green accent
- Right section:
  - Notification bell `ActionIcon` with badge count
  - User `Avatar` component (shows initials from `user.fullName`, or image from `avatarUrl`)
  - `Menu` dropdown on avatar click: Profile, Settings, Role badge, Divider, Logout
- Background: white with subtle bottom border
- Height: 56px (reduce from 60px)

### Step 2.2 — Redesigned Navbar

**`apps/synapse-web/src/components/layout/Navbar.tsx`**
- Group nav items into sections:
  - **Overview**: Dashboard, Reports
  - **Commercial**: Sales & Orders, Purchases
  - **Operations**: Inventory, Manufacturing, Quality Control, Supply Chain
  - **Other**: R&D, HR & Training
- Section headers with uppercase label and subtle divider
- Active item: left accent bar (3px green), background highlight (`synapse-blue` at 8% opacity)
- Hover state: subtle background
- Add role badge at bottom showing current user's role
- Smooth transition on hover/active states

### Step 2.3 — AppLayout Refinements

**`apps/synapse-web/src/components/layout/AppLayout.tsx`**
- Pass `user` and `onLogout` props from auth context to `Header`
- Navbar gets `user` for role badge

### Step 2.4 — Theme Refinements

**`apps/synapse-web/src/theme.ts`**
- Add component overrides for:
  - `Paper`: subtle shadow `shadow-sm` by default, `shadow-md` on hover
  - `Card`: consistent padding, border radius 8px
  - `NavLink`: active state styling (left accent, bg tint)
  - `Avatar`: size and color variants
  - `Menu`: dropdown shadow and border
- Add `focusStyles` override for accessibility

**`apps/synapse-web/src/index.css`**
- Add smooth transitions: `* { transition: background-color 0.15s ease, border-color 0.15s ease; }`
- Add subtle gradient for header background
- Refine scrollbar styling

### Step 2.5 — Widget/Card Styling

**`apps/synapse-web/src/components/widgets/KPIWidget.tsx`**
- Add subtle hover lift effect (translateY(-1px) + shadow increase)
- Larger number font size
- Color-coded left border (4px accent)

**`apps/synapse-web/src/components/widgets/TrendChart.tsx`**
- Add hover state on Paper
- Better header layout with icon

**`apps/synapse-web/src/components/widgets/BarChart.tsx`**
- Add hover state on Paper

### Step 2.6 — Loading States

**`apps/synapse-web/src/routes/_authenticated/dashboard/index.tsx`**
- Replace `<div>Loading...</div>` with Mantine `Skeleton` components
- Show skeleton cards matching widget layout

---

## Phase 3: Insights Engine

### Step 3.1 — Backend Insight Data

**New: `apps/synapse-api/synapse_api/presentation/routers/insights.py`**
- `GET /api/insights/monthly-contributors?month=Jun&year=2024`
- Returns:
  ```json
  {
    "month": "Jun",
    "year": 2024,
    "totalRevenue": 4780000,
    "previousRevenue": 4320000,
    "changePercent": 10.6,
    "summary": "Sales increased 10.6% driven by strong Curcumin demand, lower raw material costs, and increased production capacity.",
    "factors": [
      {
        "category": "product",
        "name": "Curcumin C3 Complex",
        "impact": "high",
        "changePercent": 20.0,
        "revenueImpact": 320000,
        "details": "Strong demand from North America and Europe"
      },
      {
        "category": "cost",
        "name": "Turmeric (Curcuma longa)",
        "impact": "medium",
        "savings": 1000,
        "details": "Raw material cost ₹1,000/ton lower than May due to harvest season"
      },
      {
        "category": "production",
        "name": "Extract Production Volume",
        "impact": "high",
        "changePercent": 15.0,
        "additionalVolume": "10 tonnes",
        "details": "New extraction line operational from June 1"
      }
    ]
  }
  ```
- Hardcode rich mock data for all 12 months with realistic factors

**New: `apps/synapse-api/synapse_api/presentation/schemas/insights.py`**
- `InsightFactor`: category, name, impact, changePercent, revenueImpact, savings, additionalVolume, details
- `MonthlyContributors`: month, year, totalRevenue, previousRevenue, changePercent, summary, factors[]
- `MonthlyComparison`: current vs previous side-by-side with product/cost/production breakdown

### Step 3.2 — Register Insight Router

**`apps/synapse-api/synapse_api/presentation/routers/__init__.py`**
- Add `from .insights import router as insights_router`

**`apps/synapse-api/synapse_api/presentation/app.py`**
- Mount `insights_router`

### Step 3.3 — Frontend Insight Types

**New: `apps/synapse-web/src/domain/entities/insight.ts`**
```ts
interface InsightFactor {
  category: "product" | "cost" | "production";
  name: string;
  impact: "high" | "medium" | "low";
  changePercent?: number;
  revenueImpact?: number;
  savings?: number;
  additionalVolume?: string;
  details: string;
}

interface MonthlyContributors {
  month: string;
  year: number;
  totalRevenue: number;
  previousRevenue: number;
  changePercent: number;
  summary: string;
  factors: InsightFactor[];
}
```

### Step 3.4 — Frontend Insight Data

**New: `apps/synapse-web/src/data/insights.ts`**
- `fetchMonthlyContributors(month: string, year: number)` — GET `/api/insights/monthly-contributors?month=...&year=...`

### Step 3.5 — Frontend Insight Hook

**New: `apps/synapse-web/src/hooks/useInsights.ts`**
- `useInsights()` — returns `{ data, isLoading, error, fetchMonth }` where `fetchMonth(month, year)` triggers the fetch

### Step 3.6 — Chart Adapter Click Support

**`apps/synapse-web/src/components/widgets/chart-adapter.ts`**
- Add to `LineChartProps`: `onDataPointClick?: (point: { date: string; value: number; series?: string }) => void`
- Add to `BarChartProps`: `onDataPointClick?: (point: { label: string; value: number }) => void`

**`apps/synapse-web/src/components/widgets/adapters/chart-hooks.ts`**
- Add `getDatum` callback to axis options for click handling

**`apps/synapse-web/src/components/widgets/adapters/react-charts-adapter.tsx`**
- Pass `onDataPointClick` through to `Chart` options (react-charts supports `onHover` and click via `getSeriesID`)

**`apps/synapse-web/src/components/widgets/adapters/chart-components.tsx`**
- Add `onClick` prop to `LineChartInner`, `BarChartInner`
- Wire to react-charts element click handler

### Step 3.7 — Insight Panel Component

**New: `apps/synapse-web/src/components/insights/InsightPanel.tsx`**
- Mantine `Drawer` (slides from right, size="lg")
- Header: month/year title, revenue change badge, close button
- Summary section: narrative text
- Factors grouped by category (Product, Cost, Production)
- Each group has section header with icon

**New: `apps/synapse-web/src/components/insights/FactorCard.tsx`**
- Mantine `Card` with:
  - Left color bar (green for positive, red for negative, blue for neutral)
  - Category icon (IconShoppingCart for product, IconCoin for cost, IconBuildingFactory for production)
  - Name, impact badge (high/medium/low), change percentage
  - Expandable details section
  - Animated entry (Mantine `Transition` or CSS animation)

**New: `apps/synapse-web/src/components/insights/index.ts`**
- Barrel exports

### Step 3.8 — Wire Drill-Down to Charts

**`apps/synapse-web/src/components/widgets/TrendChart.tsx`**
- Add `onDataPointClick` prop
- Pass through to `chart.renderLineChart({ data, onDataPointClick })`

**`apps/synapse-web/src/components/widgets/BarChart.tsx`**
- Add `onDataPointClick` prop
- Pass through to `chart.renderBarChart({ data, onDataPointClick })`

**`apps/synapse-web/src/components/dashboard/WidgetRenderer.tsx`**
- Add `onDrillDown?: (month: string, year: number) => void` prop
- Pass to `SalesTrendWidget` and `MonthlyRevenueWidget`

**`apps/synapse-web/src/routes/_authenticated/dashboard/index.tsx`**
- Add state: `const [drillDownMonth, setDrillDownMonth] = useState<{ month: string; year: number } | null>(null)`
- Pass `onDrillDown` callback to `DashboardGrid`
- Render `<InsightPanel month={drillDownMonth} onClose={() => setDrillDownMonth(null)} />`

### Step 3.9 — Narrative Summary Widget

**New: `apps/synapse-web/src/components/widgets/InsightSummary.tsx`**
- Paper with gradient background (subtle blue-to-green)
- Shows: "Sales are up 12.5% YTD. June was the strongest month (+10.6%), driven by Curcumin demand and lower turmeric costs."
- Each claim is a clickable link that opens the InsightPanel for that month
- Auto-generates from monthly revenue data + top factors

**Add to `WidgetType`**: `"insight-summary"`

**Add to `WidgetRenderer`**: case for `insight-summary` → `<InsightSummary />`

---

## Execution Order

| # | Step | Files Modified | Est. |
|---|------|---------------|------|
| 1 | Add deps to pyproject.toml | 1 file | S |
| 2 | Extend User model | 1 file | S |
| 3 | Update seed script | 1 file | S |
| 4 | Create auth module (JWT + deps) | 1 new file | M |
| 5 | Update auth schemas + router | 2 files | M |
| 6 | Add auth to deps.py | 1 file | S |
| 7 | Role-gate dashboard endpoint | 1 file | M |
| 8 | Role-gate sales/purchases/inventory | 3 files | M |
| 9 | Frontend auth domain + data + hook | 3 new files | M |
| 10 | Update api-client for auth headers | 1 file | S |
| 11 | Route guard in _authenticated.tsx | 1 file | S |
| 12 | Role-based navbar | 1 file | S |
| 13 | Login form update | 1 file | S |
| 14 | Header redesign | 1 file | M |
| 15 | Navbar redesign | 1 file | M |
| 16 | AppLayout refinements | 1 file | S |
| 17 | Theme + global styles | 2 files | M |
| 18 | Widget/card styling | 4 files | M |
| 19 | Loading skeletons | 1 file | S |
| 20 | Backend insight endpoints + schema | 2 new files | M |
| 21 | Frontend insight types + data + hook | 3 new files | M |
| 22 | Chart adapter click support | 4 files | M |
| 23 | InsightPanel + FactorCard | 2 new files | M |
| 24 | Wire drill-down to charts | 4 files | M |
| 25 | InsightSummary widget | 1 new file + 2 modified | M |

## Verification

After each phase:
1. **Phase 1**: Login with different roles → verify correct nav → verify 403 for unauthorized endpoints
2. **Phase 2**: Visual inspection → header with avatar → navbar sections → animations
3. **Phase 3**: Click chart data point → InsightPanel opens → factors display → narrative renders

Run after each phase:
- `cd apps/synapse-api && uv run ruff check .`
- `cd apps/synapse-web && npx nx lint synapse-web`
- `cd apps/synapse-web && npx nx build synapse-web`
