from dataclasses import dataclass

from synapse_api.domain.entities.department import Department
from synapse_api.domain.value_objects.department_id import DepartmentID
from synapse_api.domain.value_objects.role_id import RoleID


@dataclass
class Role:
    id: RoleID
    role_name: str
    department_id: DepartmentID
    read_only: bool
    department: Department
