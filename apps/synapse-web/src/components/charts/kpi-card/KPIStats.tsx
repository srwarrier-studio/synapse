import type { ReactNode } from "react";
import classes from "./KPICard.module.css";

interface KPIStatsProps {
	children: ReactNode;
}

export function KPIStats({ children }: KPIStatsProps) {
	return <div className={classes.stats}>{children}</div>;
}
