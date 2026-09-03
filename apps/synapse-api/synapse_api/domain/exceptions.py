class DomainError(Exception):
    """Base domain error."""


class NotFoundError(DomainError):
    """Entity not found."""
