import {
	Avatar,
	Badge,
	Group,
	Menu,
	Text,
	UnstyledButton,
} from "@mantine/core";
import {
	IconLogout,
	IconSettings,
	IconUser,
} from "@tabler/icons-react";
import { useAuth } from "../../../hooks/useAuth";

const ROLE_COLORS: Record<string, string> = {
	admin: "red",
	management: "blue",
	finance: "green",
	operations: "orange",
	sales: "violet",
};

function getInitials(name: string | null, username: string): string {
	if (name) {
		return name
			.split(" ")
			.map((n) => n[0])
			.join("")
			.toUpperCase()
			.slice(0, 2);
	}
	return username.slice(0, 2).toUpperCase();
}

export function UserMenu() {
	const { user, logout } = useAuth();

	if (!user) return null;

	return (
		<Menu shadow="md" width={220} position="bottom-end">
			<Menu.Target>
				<UnstyledButton>
					<Group gap="xs">
						<Avatar
							size={32}
							radius="xl"
							color={ROLE_COLORS[user.role] || "blue"}
							src={user.avatarUrl}
						>
							{getInitials(user.fullName, user.username)}
						</Avatar>
						<div style={{ textAlign: "left" }}>
							<Text size="sm" fw={500} lineClamp={1}>
								{user.fullName || user.username}
							</Text>
							<Text size="xs" c="dimmed" lineClamp={1}>
								{user.email || user.username}
							</Text>
						</div>
					</Group>
				</UnstyledButton>
			</Menu.Target>

			<Menu.Dropdown>
				<Menu.Label>Account</Menu.Label>
				<Menu.Item leftSection={<IconUser size={16} />}>Profile</Menu.Item>
				<Menu.Item leftSection={<IconSettings size={16} />}>Settings</Menu.Item>

				<Menu.Divider />

				<Menu.Label>
					Group:{" "}
					<Badge
						size="xs"
						color={ROLE_COLORS[user.role] || "blue"}
						variant="light"
					>
						{user.role}
					</Badge>
				</Menu.Label>

				<Menu.Divider />

				<Menu.Item
					leftSection={<IconLogout size={16} />}
					color="red"
					onClick={logout}
				>
					Sign out
				</Menu.Item>
			</Menu.Dropdown>
		</Menu>
	);
}
