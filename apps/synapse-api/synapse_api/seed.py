import asyncio

from sqlalchemy import select

from synapse_api.infrastructure.database import Base, User, async_session, engine


async def seed():
    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.create_all)

    async with async_session() as db:
        result = await db.execute(select(User).where(User.username == "admin"))
        if result.scalar_one_or_none() is None:
            admin = User(username="admin", password_hash="Admin@123")
            db.add(admin)
            await db.commit()
            print("Seeded default admin user (admin / Admin@123)")
        else:
            print("Admin user already exists, skipping seed.")


if __name__ == "__main__":
    asyncio.run(seed())
