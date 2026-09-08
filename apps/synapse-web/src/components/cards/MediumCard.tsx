import { Card } from "@mantine/core";
import type { ReactNode } from "react";
import classes from "./cards.module.css";

interface MediumCardProps {
	children: ReactNode;
}

export function MediumCard({ children }: MediumCardProps) {
	return (
		<Card withBorder className={classes.card} h="100%">
			{children}
		</Card>
	);
}
