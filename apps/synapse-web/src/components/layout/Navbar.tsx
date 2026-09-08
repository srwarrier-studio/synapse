import { Center, Image, Stack } from "@mantine/core";
import { useLocation } from "@tanstack/react-router";
import { NAV_ITEMS } from "../../domain/constants/navitems";
import { MenuButton } from "./components/menu-button";

export function Navbar() {
	const location = useLocation();

	return (
		<Stack
			gap="sm"
			align="center"
			style={{ height: "100%", justifyContent: "space-between" }}
		>
			<Center p={10}>
				<Image src="logo.png" height={48} width={20} fit="contain" />
			</Center>
			<Stack gap="sm" align="center">
				{NAV_ITEMS.map((item) => (
					<MenuButton
						key={item.label}
						label={item.label}
						icon={item.icon}
						to={item.to}
						active={location.pathname === item.to}
					/>
				))}
			</Stack>
			<div />
		</Stack>
	);
}
