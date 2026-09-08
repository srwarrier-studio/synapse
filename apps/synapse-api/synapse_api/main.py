from contextlib import asynccontextmanager

from fastapi import FastAPI

from synapse_api.infrastructure.persistence.scripts.init_script import seed
from synapse_api.infrastructure.persistence.sqlalchemy.core.mapper import map_columns
from synapse_api.presentation.app import create_app


@asynccontextmanager
async def lifespan(app: FastAPI):
    await seed()
    map_columns()
    yield


app = create_app()
app.router.lifespan_context = lifespan

__all__ = ["app"]
