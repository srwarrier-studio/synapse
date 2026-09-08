import { Card } from "@mantine/core";
import type { ReactNode } from "react";

interface LargeCardProps {
	children: ReactNode;
}

export function LargeCard({ children }: LargeCardProps) {
	return (
		<Card
			withBorder
			radius="md"
			p="md"
			style={{
				gridColumn: "span 12",
				gridRow: "span 12",
				display: "flex",
				flexDirection: "column",
				overflow: "hidden",
			}}
		>
			{children}
		</Card>
	);
}
