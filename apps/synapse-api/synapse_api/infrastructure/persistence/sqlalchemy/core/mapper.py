from sqlalchemy.orm import relationship

from synapse_api.domain.entities.department import Department
from synapse_api.domain.entities.role import Role
from synapse_api.domain.entities.user import User
from synapse_api.infrastructure.persistence.sqlalchemy.models import (
    department_table,
    role_table,
    user_table,
)

from .db import mapper_registry


def map_columns():
    mapper_registry.map_imperatively(
        User,
        user_table,
        properties={
            "role": relationship(
                Role,
                lazy="selectin",
            )
        },
    )
    mapper_registry.map_imperatively(
        Role,
        role_table,
        properties={
            "department": relationship(
                Department,
                lazy="selectin",
            )
        },
    )
    mapper_registry.map_imperatively(Department, department_table)
