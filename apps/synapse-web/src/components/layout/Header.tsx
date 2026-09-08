import { Group } from "@mantine/core";
import { EditButton } from "./components/edit-button";
import { NotificationButton } from "./components/notification-button";
import { UserMenu } from "./components/user-menu";
import { WelcomeText } from "./components/welcome-text";

export function Header() {
	return (
		<Group h="100%" px="md" justify="space-between">
			<WelcomeText />
			<Group gap="md">
				<EditButton />
				<NotificationButton />
				<UserMenu />
			</Group>
		</Group>
	);
}
