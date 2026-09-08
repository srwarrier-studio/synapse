import { ActionIcon, Tooltip } from "@mantine/core";
import type { IconDashboard } from "@tabler/icons-react";
import { useNavigate } from "@tanstack/react-router";

export interface NavItem {
    label: string;
    icon: typeof IconDashboard;
    to: string;
}

interface MenuButtonProps extends NavItem {
    active?: boolean;
}

export function MenuButton({ label, icon: Icon, to, active }: MenuButtonProps) {
	const navigate = useNavigate();

	return (
		<Tooltip
			key={label}
			label={label}
			position="right"
			transitionProps={{ transition: "pop", duration: 150 }}
		>
			<ActionIcon
				variant={active ? "light" : "subtle"}
				color={active ? "blue" : "gray"}
				size="lg"
				radius="xl"
				style={{ borderRadius: "50%" }}
				onClick={() => navigate({ to })}
			>
				<Icon size={20} stroke={1.5} />
			</ActionIcon>
		</Tooltip>
	);
}