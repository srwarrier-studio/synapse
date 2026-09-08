import type { ReactNode } from "react";

const COLUMNS = 12;
const ROW_HEIGHT = 80;

interface DashboardGridProps {
	children: ReactNode;
}

export function DashboardGrid({ children }: DashboardGridProps) {
	return (
		<div
			style={{
				display: "grid",
				gridTemplateColumns: `repeat(${COLUMNS}, 1fr)`,
				gridAutoRows: `${ROW_HEIGHT}px`,
				gap: "md",
				alignItems: "start",
			}}
		>
			{children}
		</div>
	);
}
