from contextlib import asynccontextmanager

from fastapi import FastAPI

from .infrastructure.database import init_db
from .presentation.app import create_app


@asynccontextmanager
async def lifespan(app: FastAPI):
    await init_db()
    yield


app = create_app()
app.router.lifespan_context = lifespan

__all__ = ["app"]
