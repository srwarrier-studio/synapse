from dataclasses import dataclass

from synapse_api.domain.value_objects.department_id import DepartmentID


@dataclass
class Department:
    id: DepartmentID
    name: str
