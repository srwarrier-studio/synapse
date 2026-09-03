"""Hello unit test module."""

from synapse_api.hello import hello


def test_hello():
    """Test the hello function."""
    assert hello() == "Hello synapse-api"
