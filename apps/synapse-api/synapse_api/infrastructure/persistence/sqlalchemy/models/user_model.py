from sqlalchemy import (
    Boolean,
    Column,
    ForeignKey,
    String,
    Table,
    UniqueConstraint,
)

from synapse_api.infrastructure.persistence.sqlalchemy.core.db import (
    mapper_registry,
)
from synapse_api.infrastructure.persistence.sqlalchemy.types import (
    EmailIDType,
    UserIDType,
)

user_table = Table(
    "users",
    mapper_registry.metadata,
    Column("id", UserIDType, primary_key=True),
    Column("username", String, nullable=False),
    Column("password_hash", String, nullable=False),
    Column("is_active", Boolean, nullable=False, default=True),
    Column("role_id", ForeignKey("roles.id"), nullable=False),
    Column("email", EmailIDType, nullable=False),
    Column("full_name", String, nullable=False),
    Column("avatar_url", String, nullable=True),
    UniqueConstraint("username", name="unique_username"),
)
