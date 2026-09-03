import { Button, Container, Stack } from "@mantine/core";
import { Link, createFileRoute } from "@tanstack/react-router";
import { AuthenticationTitle } from "../pages/login";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  return (
    <Stack>
      <AuthenticationTitle />
      <Container size={420}>
        <Button
          component={Link}
          to="/dashboard"
          variant="outline"
          fullWidth
          radius="md"
        >
          Go to Dashboard
        </Button>
      </Container>
    </Stack>
  );
}