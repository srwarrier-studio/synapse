import { Card } from "@mantine/core";
import type { ReactNode } from "react";
import classes from "./cards.module.css";

interface WideCardProps {
	children: ReactNode;
}

export function WideCard({ children }: WideCardProps) {
	return (
		<Card withBorder className={classes.card} h="100%">
			{children}
		</Card>
	);
}
