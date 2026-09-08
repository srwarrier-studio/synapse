import { Card } from "@mantine/core";
import type { ReactNode } from "react";

interface MediumCardProps {
	children: ReactNode;
}

export function MediumCard({ children }: MediumCardProps) {
	return (
		<Card
			withBorder
			radius="md"
			p="md"
			style={{
				gridColumn: "span 8",
				gridRow: "span 8",
				display: "flex",
				flexDirection: "column",
				overflow: "hidden",
			}}
		>
			{children}
		</Card>
	);
}
