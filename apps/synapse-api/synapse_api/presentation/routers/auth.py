from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.orm import joinedload

from synapse_api.domain.entities.role import Role
from synapse_api.domain.entities.user import User
from synapse_api.infrastructure.persistence.sqlalchemy.core.db import get_db

from ..auth import create_access_token, verify_password
from ..schemas.auth import LoginRequest, LoginResponse, UserInfo

router = APIRouter(prefix="/auth", tags=["auth"])


@router.post("/login", response_model=LoginResponse)
async def login(body: LoginRequest, db: AsyncSession = Depends(get_db)):
    result = await db.execute(
        select(User)
        .options(joinedload(User.role).joinedload(Role.department))
        .where(User.username == body.username)
    )
    user = result.scalar_one_or_none()

    if user is None or not verify_password(body.password, user.password_hash):
        raise HTTPException(status_code=401, detail="Invalid username or password")

    if not user.is_active:
        raise HTTPException(status_code=403, detail="Account is disabled")

    # Fixed: Only pass primitives (strings/ints) to the JWT data payload
    token = create_access_token(data={"sub": str(user.id), "role": user.role.role_name})

    return LoginResponse(
        access_token=token,
        user=UserInfo(
            id=user.id.value.hex if hasattr(user.id, "value") else str(user.id),
            username=user.username,
            role=user.role.role_name,
            full_name=user.full_name,
            avatar_url=user.avatar_url,
            email=user.email.value if hasattr(user.email, "value") else user.email,
        ),
    )
