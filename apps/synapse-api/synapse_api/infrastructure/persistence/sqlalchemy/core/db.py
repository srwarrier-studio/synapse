from collections.abc import AsyncGenerator

from sqlalchemy.ext.asyncio import (
    AsyncSession,
    async_sessionmaker,
    create_async_engine,
)
from sqlalchemy.orm import registry

from synapse_api.core.config import settings

engine = create_async_engine(url=settings.DATABASE_URL)

async_session = async_sessionmaker(bind=engine)

mapper_registry = registry()


async def get_db() -> AsyncGenerator[AsyncSession]:
    async with async_session() as session:
        yield session
