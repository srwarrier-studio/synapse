from contextlib import asynccontextmanager

from fastapi import FastAPI

from synapse_api.infrastructure.database import init_db
from synapse_api.presentation.app import create_app
from synapse_api.seed import seed


@asynccontextmanager
async def lifespan(app: FastAPI):
    await init_db()
    await seed()
    yield


app = create_app()
app.router.lifespan_context = lifespan

__all__ = ["app"]
