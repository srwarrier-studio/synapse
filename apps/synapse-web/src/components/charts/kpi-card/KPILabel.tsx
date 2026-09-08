import { Text } from "@mantine/core";
import type { ReactNode } from "react";
import classes from "./KPICard.module.css";

interface KPILabelProps {
	children: ReactNode;
}

export function KPILabel({ children }: KPILabelProps) {
	return (
		<Text size="xs" fw={700} tt="uppercase" lts="0.08em" className={classes.label}>
			{children}
		</Text>
	);
}
