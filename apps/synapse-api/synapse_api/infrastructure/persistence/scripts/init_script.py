import asyncio
from pathlib import Path

from sqlalchemy import select, text

from synapse_api.domain.entities.user import User
from synapse_api.infrastructure.persistence.sqlalchemy.core.db import (
    async_session,
)
from synapse_api.infrastructure.persistence.sqlalchemy.models import user_table


async def seed():
    async with async_session() as session:
        admin_user = await session.execute(
            select(user_table).where(user_table.c.username == "admin")
        )
        if not admin_user.one():
            for file in Path("synapse_api/infrastructure/persistence/seed").iterdir():
                await session.execute(text(file.read_text()))
            await session.commit()


if __name__ == "__main__":
    asyncio.run(seed())
