import { Card } from "@mantine/core";
import type { ReactNode } from "react";
import classes from "./cards.module.css";

interface LargeCardProps {
	children: ReactNode;
}

export function LargeCard({ children }: LargeCardProps) {
	return (
		<Card withBorder className={classes.card} h="100%">
			{children}
		</Card>
	);
}
