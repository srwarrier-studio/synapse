import { Card } from "@mantine/core";
import type { ReactNode } from "react";

interface WideCardProps {
	children: ReactNode;
}

export function WideCard({ children }: WideCardProps) {
	return (
		<Card
			withBorder
			radius="md"
			p="md"
			style={{
				gridColumn: "span 6",
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
