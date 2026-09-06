import asyncio

from sqlalchemy import select

from synapse_api.infrastructure.database import Base, User, async_session, engine
from synapse_api.presentation.auth import hash_password

SEED_USERS = [
    {
        "username": "admin",
        "password": "Admin@123",
        "role": "admin",
        "full_name": "System Admin",
        "email": "admin@sami.synapse",
    },
    {
        "username": "finance",
        "password": "Fin@123",
        "role": "finance",
        "full_name": "Finance Manager",
        "email": "finance@sami.synapse",
    },
    {
        "username": "ops",
        "password": "Ops@123",
        "role": "operations",
        "full_name": "Operations Head",
        "email": "ops@sami.synapse",
    },
    {
        "username": "sales",
        "password": "Sales@123",
        "role": "sales",
        "full_name": "Sales Director",
        "email": "sales@sami.synapse",
    },
    {
        "username": "management",
        "password": "Mgmt@123",
        "role": "management",
        "full_name": "CEO",
        "email": "management@sami.synapse",
    },
]


async def seed():
    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.create_all)

    async with async_session() as session:
        for user_data in SEED_USERS:
            result = await session.execute(
                select(User).where(User.username == user_data["username"])
            )
            existing = result.scalar_one_or_none()
            if existing is None:
                session.add(
                    User(
                        username=user_data["username"],
                        password_hash=hash_password(user_data["password"]),
                        role=user_data["role"],
                        full_name=user_data["full_name"],
                        email=user_data["email"],
                        is_active=True,
                    )
                )
        await session.commit()


if __name__ == "__main__":
    asyncio.run(seed())
