from sqlalchemy import Column, String, Table, UniqueConstraint

from synapse_api.infrastructure.persistence.sqlalchemy.core.db import mapper_registry
from synapse_api.infrastructure.persistence.sqlalchemy.types import DepartmentIDType

department_table = Table(
    "departments",
    mapper_registry.metadata,
    Column("id", DepartmentIDType, primary_key=True),
    Column("name", String, nullable=False),
    UniqueConstraint("name", name="unique_department_name"),
)
