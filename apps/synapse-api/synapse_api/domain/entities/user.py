from dataclasses import dataclass

from synapse_api.domain.entities.role import Role
from synapse_api.domain.value_objects.email_id import EmailID
from synapse_api.domain.value_objects.role_id import RoleID
from synapse_api.domain.value_objects.user_id import UserID


@dataclass
class User:
    id: UserID
    username: str
    password_hash: str
    is_active: bool
    email: EmailID
    full_name: str
    role: Role | None = None
    avatar_url: str | None = None
    role_id: RoleID | None = None
