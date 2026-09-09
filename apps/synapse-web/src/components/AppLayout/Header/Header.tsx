import { Group } from "@mantine/core";
import { EditButton } from "./EditButton";
import { NotificationButton } from "./NotificationButton";
import { UserMenu } from "./UserMenu";
import { WelcomeText } from "./WelcomeText";

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
