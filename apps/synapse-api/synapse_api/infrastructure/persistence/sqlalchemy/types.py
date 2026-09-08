from typing import Any
from uuid import UUID as GenericUUID

from sqlalchemy import UUID, Dialect, String
from sqlalchemy.types import TypeDecorator

from synapse_api.domain.value_objects.department_id import DepartmentID
from synapse_api.domain.value_objects.email_id import EmailID
from synapse_api.domain.value_objects.role_id import RoleID
from synapse_api.domain.value_objects.user_id import UserID


class RoleIDType(TypeDecorator):
    impl = UUID
    cache_ok = True

    def process_bind_param(self, value: RoleID, dialect: Dialect) -> Any:
        return value.value

    def process_result_value(self, value: GenericUUID, dialect: Dialect) -> Any | None:
        return RoleID(value)


class UserIDType(TypeDecorator):
    impl = UUID
    cache_ok = True

    def process_bind_param(self, value: UserID, dialect: Dialect) -> Any:
        return value.value

    def process_result_value(self, value: GenericUUID, dialect: Dialect) -> Any | None:
        return UserID(value)


class EmailIDType(TypeDecorator):
    impl = String

    def process_bind_param(self, value: EmailID, dialect: Dialect) -> Any:
        return value.value

    def process_result_value(self, value: str, dialect: Dialect) -> Any | None:
        return EmailID(value)


class DepartmentIDType(TypeDecorator):
    impl = String

    def process_bind_param(self, value: DepartmentID, dialect: Dialect) -> Any:
        return value.value

    def process_result_value(self, value: GenericUUID, dialect: Dialect) -> Any | None:
        return DepartmentID(value)
