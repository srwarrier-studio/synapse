import { Card } from "@mantine/core";
import type { ReactNode } from "react";
import classes from "./cards.module.css";

interface SmallCardProps {
	children: ReactNode;
}

export function SmallCard({ children }: SmallCardProps) {
	return (
		<Card withBorder className={classes.card} h="100%">
			{children}
		</Card>
	);
}
