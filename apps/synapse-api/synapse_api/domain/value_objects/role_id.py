from dataclasses import dataclass
from uuid import UUID, uuid4


@dataclass(frozen=True)
class RoleID:
    value: UUID

    @classmethod
    def new(cls):
        return cls(uuid4())

    @classmethod
    def from_str(cls, value: str):
        return cls(UUID(value))
