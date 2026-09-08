import { Card } from "@mantine/core";
import type { ReactNode } from "react";

interface SmallCardProps {
	children: ReactNode;
}

export function SmallCard({ children }: SmallCardProps) {
	return (
		<Card
			withBorder
			radius="md"
			p="md"
			style={{
				gridColumn: "span 4",
				gridRow: "span 4",
				display: "flex",
				flexDirection: "column",
				overflow: "hidden",
			}}
		>
			{children}
		</Card>
	);
}
