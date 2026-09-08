import { ActionIcon } from "@mantine/core";
import { IconBell } from "@tabler/icons-react";

export function NotificationButton() {
	return (
		<ActionIcon variant="subtle" color="gray" size="lg" radius="md">
			<IconBell size={20} />
		</ActionIcon>
	);
}
