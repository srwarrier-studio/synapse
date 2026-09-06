from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from .routers import (
    auth_router,
    dashboard_router,
    insights_router,
    inventory_router,
    purchases_router,
    sales_router,
    widget_router,
)


def create_app() -> FastAPI:
    app = FastAPI(
        title="Synapse API",
        version="1.0.0",
        description="Enterprise Dashboard & Observability API",
    )

    app.add_middleware(
        CORSMiddleware,
        allow_origins=["http://localhost:5173", "http://localhost:4200", "http://localhost:44312"],
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"],
    )

    app.include_router(auth_router)
    app.include_router(dashboard_router)
    app.include_router(insights_router)
    app.include_router(sales_router)
    app.include_router(purchases_router)
    app.include_router(inventory_router)
    app.include_router(widget_router)

    @app.get("/health")
    async def healthcheck():
        return {"status": "ok"}

    return app


app = create_app()
