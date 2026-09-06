import {
	Group,
	Title,
	Avatar,
	Menu,
	ActionIcon,
	Badge,
	UnstyledButton,
	Text,
} from "@mantine/core";
import {
	IconLogout,
	IconUser,
	IconSettings,
	IconBell,
} from "@tabler/icons-react";
import { useAuth } from "../../hooks/useAuth";

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

const ROLE_COLORS: Record<string, string> = {
	admin: "red",
	management: "blue",
	finance: "green",
	operations: "orange",
	sales: "violet",
};

export function Header() {
	const { user, logout } = useAuth();

	return (
		<Group h="100%" px="md" justify="space-between">
			<Group gap="sm">
				<Title order={4} c="sami-green.7">
					Sami Synapse
				</Title>
				<Badge variant="light" color="gray" size="sm">
					Corporate Office — India
				</Badge>
			</Group>

			<Group gap="md">
				<ActionIcon variant="subtle" color="gray" size="lg" radius="md">
					<IconBell size={20} />
				</ActionIcon>

				{user && (
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
							<Menu.Item leftSection={<IconUser size={16} />}>
								Profile
							</Menu.Item>
							<Menu.Item leftSection={<IconSettings size={16} />}>
								Settings
							</Menu.Item>

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
				)}
			</Group>
		</Group>
	);
}
