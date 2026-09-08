from sqlalchemy import Boolean, Column, ForeignKey, String, Table, UniqueConstraint

from synapse_api.infrastructure.persistence.sqlalchemy.core.db import mapper_registry
from synapse_api.infrastructure.persistence.sqlalchemy.types import (
    DepartmentIDType,
    RoleIDType,
)

role_table = Table(
    "roles",
    mapper_registry.metadata,
    Column("id", RoleIDType, primary_key=True),
    Column("role_name", String, nullable=False),
    Column("department_id", ForeignKey("departments.id"), nullable=False),
    UniqueConstraint("role_name", name="unique_role_name"),
)
