<!-- nx configuration start-->
<!-- Leave the start & end comments to automatically receive updates. -->

## General Guidelines for working with Nx

- For navigating/exploring the workspace, invoke the `nx-workspace` skill first - it has patterns for querying projects, targets, and dependencies
- When running tasks (for example build, lint, test, e2e, etc.), always prefer running the task through `nx` (i.e. `nx run`, `nx run-many`, `nx affected`) instead of using the underlying tooling directly
- Prefix nx commands with the workspace's package manager (e.g., `pnpm nx build`, `npm exec nx test`) - avoids using globally installed CLI
- You have access to the Nx MCP server and its tools, use them to help the user
- For Nx plugin best practices, check `node_modules/@nx/<plugin>/PLUGIN.md`. Not all plugins have this file - proceed without it if unavailable.
- NEVER guess CLI flags - always check nx_docs or `--help` first when unsure

## Scaffolding & Generators

- For scaffolding tasks (creating apps, libs, project structure, setup), ALWAYS invoke the `nx-generate` skill FIRST before exploring or calling MCP tools

## When to use nx_docs

- USE for: advanced config options, unfamiliar flags, migration guides, plugin configuration, edge cases
- DON'T USE for: basic generator syntax (`nx g @nx/react:app`), standard commands, things you already know
- The `nx-generate` skill handles generator discovery internally - don't call nx_docs just to look up generator syntax

<!-- nx configuration end-->

---

# Enterprise Software Development Rules

## Core Principles

### 1. Clean Architecture (Uncle Bob)

```
┌─────────────────────────────────────────────────┐
│                  Presentation                    │
│            (Routers, Controllers, UI)            │
├─────────────────────────────────────────────────┤
│                Application Layer                 │
│           (Use Cases, Services, Hooks)           │
├─────────────────────────────────────────────────┤
│                  Domain Layer                    │
│         (Entities, Interfaces, Rules)            │
├─────────────────────────────────────────────────┤
│                Infrastructure                    │
│       (DB, External APIs, Frameworks)            │
└─────────────────────────────────────────────────┘
```

- Dependencies point INWARD only (Infrastructure → Domain ← Application ← Presentation)
- Domain layer has ZERO external dependencies
- Use dependency injection at boundaries

### 2. SOLID Principles

| Principle | Rule | Example |
|-----------|------|---------|
| **S**ingle Responsibility | One class/module does ONE thing | `UserAuthenticator` handles auth only, not user profile |
| **O**pen/Closed | Extend via interfaces, don't modify | New payment method = new class implementing `IPaymentGateway` |
| **L**iskov Substitution | Subtypes must be substitutable | `MockUserRepo` must work exactly like `PostgresUserRepo` |
| **I**nterface Segregation | Small, focused interfaces | `IReadableUserRepo` + `IWritableUserRepo` not `IUserRepo` |
| **D**ependency Inversion | Depend on abstractions | `OrderService` depends on `IOrderRepo`, not `SqlOrderRepo` |

### 3. Separation of Concerns

- **Business Logic** lives in domain entities and services
- **Data Access** lives in infrastructure repositories
- **HTTP/Protocol** concerns live in presentation layer
- **Never mix**: SQL queries in routes, HTML in business logic, API calls in domain entities

---

## Backend Rules (`synapse-api`)

### Layer Structure

```
synapse_api/
├── domain/                    # PURE - No framework dependencies
│   ├── entities/              # Business objects (dataclasses or Pydantic)
│   ├── interfaces/            # Abstract base classes (ports)
│   └── exceptions.py          # Domain-specific exceptions
├── application/               # Use cases (optional for complex flows)
├── infrastructure/            # Frameworks & external concerns
│   ├── database.py            # SQLAlchemy models, migrations
│   ├── mock/                  # Mock implementations for testing
│   └── repositories/          # Concrete repository implementations
├── presentation/              # HTTP layer
│   ├── app.py                 # FastAPI app factory
│   ├── routers/               # Endpoint handlers (thin!)
│   ├── schemas/               # Request/Response models (Pydantic)
│   └── deps.py                # Dependency injection
└── main.py                    # Entry point
```

### Rules for Backend

1. **Domain entities** must be pure Python (no SQLAlchemy, no FastAPI imports)
2. **Interfaces (ports)** define contracts in `domain/interfaces/`
3. **Routers** must be thin: validate → call service → return response
4. **Never put business logic in routers** - extract to domain services
5. **Use dependency injection** via FastAPI's `Depends()`
6. **All database access** goes through repository interfaces
7. **HTTP status codes** must be semantic (400=bad input, 401=unauth, 404=not found)
8. **Use domain exceptions**, catch them in routers, map to HTTP errors

### Code Style - Backend

```python
# GOOD: Thin router
@router.post("/orders", response_model=OrderResponse, status_code=201)
async def create_order(body: CreateOrderRequest, db: AsyncSession = Depends(get_db)):
    order = OrderService(db).create_order(body)
    return order

# BAD: Business logic in router
@router.post("/orders")
async def create_order(body: CreateOrderRequest, db: AsyncSession = Depends(get_db)):
    if body.quantity <= 0:
        raise HTTPException(400)
    # ... validation logic ...
    # ... database queries ...
    # ... email sending ...
```

---

## Frontend Rules (`synapse-web`)

### Layer Structure

```
src/
├── domain/                    # PURE - No React, no API calls
│   └── entities/              # TypeScript interfaces, types
├── data/                      # Data fetching & external services
│   ├── api-client.ts          # HTTP client wrapper
│   └── repositories/          # API-specific data access
├── hooks/                     # Custom React hooks (business logic)
├── components/                # Reusable UI components
│   ├── layout/                # App shell, navigation
│   └── ui/                    # Generic components (Button, Input)
├── pages/                     # Route-specific features
│   └── feature-name/
│       ├── index.tsx          # Page component
│       ├── components/        # Feature-specific components
│       └── hooks/             # Feature-specific hooks
├── routes/                    # TanStack Router file-based routes
├── theme.ts                   # Mantine theme (design tokens)
└── index.css                  # Global styles & CSS variables
```

### Rules for Frontend

1. **Domain entities** are pure TypeScript interfaces/types
2. **No API calls in components** - use hooks or data layer
3. **Components must be modular**: max 120 lines, single responsibility
4. **No god components** - if >150 lines, split it
5. **All styles from theme** - components must not hardcode colors/sizes
6. **Hooks contain logic**, components contain UI
7. **Props must be typed** - no `any`, use interfaces
8. **No inline business logic** in components - extract to hooks or utils

### Code Style - Frontend

```tsx
// GOOD: Thin component with hook
export function UserCard({ userId }: UserCardProps) {
  const { user, isLoading } = useUser(userId);
  
  if (isLoading) return <Skeleton />;
  return <Card>{user.name}</Card>;
}

// BAD: God component with logic
export function UserCard({ userId }: UserCardProps) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    fetch(`/api/users/${userId}`)
      .then(res => res.json())
      .then(data => { setUser(data); setLoading(false); });
  }, [userId]);
  
  if (loading) return <div>Loading...</div>;
  
  // ... 200 more lines of UI and logic
}
```

---

## Forbidden Patterns

### Backend Anti-Patterns

| ❌ Don't | ✅ Do Instead |
|----------|--------------|
| SQL queries in routers | Use repository pattern |
| Business logic in endpoints | Extract to domain services |
| Direct DB access in domain | Use interfaces/ports |
| `HTTPException` in domain | Raise domain exceptions |
| Hardcoded config values | Use environment variables |
| Single god-service class | One service per bounded context |

### Frontend Anti-Patterns

| ❌ Don't | ✅ Do Instead |
|----------|--------------|
| `any` type | Explicit interfaces |
| Logic in components | Extract to hooks |
| Hardcoded colors | Use theme tokens |
| God components (>150 lines) | Split into smaller components |
| API calls in components | Use data layer |
| CSS-in-JS with styles object | Use CSS modules or theme |
| `useEffect` for data fetching | Use React Query / TanStack Query |

---

## Testing Rules

### Unit Tests

- Domain entities: test business rules in isolation
- Services: mock dependencies, test use cases
- Components: test rendering and user interactions

### Integration Tests

- Test full request/response cycle
- Test database queries with real SQLite
- Test API endpoints end-to-end

### Test File Location

```
tests/
├── unit/
│   ├── domain/
│   │   └── test_order.py
│   └── application/
│       └── test_order_service.py
├── integration/
│   └── test_order_api.py
└── conftest.py
```

---

## File Naming Conventions

### Backend

| Type | Convention | Example |
|------|------------|---------|
| Entity | `snake_case.py` | `sales_order.py` |
| Interface | `abstract_<name>.py` | `abstract_sales_repository.py` |
| Router | `<feature>.py` | `sales.py` |
| Schema | `<feature>.py` | `sales.py` |

### Frontend

| Type | Convention | Example |
|------|------------|---------|
| Component | `PascalCase.tsx` | `UserCard.tsx` |
| Hook | `use<PascalCase>.ts` | `useUser.ts` |
| Page | `index.tsx` (in folder) | `pages/login/index.tsx` |
| Utils | `camelCase.ts` | `formatDate.ts` |
| CSS Module | `style.module.css` | `style.module.css` |

---

## Git Rules

1. **Never commit**: `.db`, `.env`, `node_modules`, `__pycache__`, `dist`
2. **Commit messages**: imperative mood ("Add user endpoint" not "Added")
3. **One logical change per commit** - don't mix features with refactors
4. **Run lint and typecheck before committing**

---

## Code Quality Checklist

Before submitting code, verify:

- [ ] No `any` types (TypeScript)
- [ ] No hardcoded colors (use theme)
- [ ] No business logic in presentation layer
- [ ] No God components (>150 lines)
- [ ] All functions do ONE thing
- [ ] Dependencies point inward only
- [ ] Tests for new business logic
- [ ] Lint passes (`nx lint`)
- [ ] Type check passes (`tsc --noEmit`)
