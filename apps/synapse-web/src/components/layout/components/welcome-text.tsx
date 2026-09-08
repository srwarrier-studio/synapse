import { Group, Text, Title } from "@mantine/core";

export function WelcomeText() {
	return (
		<Group gap="xs">
			<Text size="sm" fw={500} c="dimmed">
				Welcome to
			</Text>
			<Title order={4} fw={600} c="sami-green.7">
				Sami Synapses
			</Title>
		</Group>
	);
}