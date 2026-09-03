import { Group, Title } from "@mantine/core";

export function Header() {
  return (
    <Group h="100%" px="md" justify="space-between">
      <Title order={4} c="sami-green.7">
        Sami Synapse
      </Title>
      <Group>
        <span style={{ fontSize: 14, color: "#666" }}>Corporate Office — India</span>
      </Group>
    </Group>
  );
}
