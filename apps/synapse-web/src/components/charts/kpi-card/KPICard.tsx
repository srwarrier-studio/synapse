import type { ReactNode } from "react";
import classes from "./KPICard.module.css";

interface KPICardProps {
	children: ReactNode;
}

export function KPICard({ children }: KPICardProps) {
	return <div className={classes.card}>{children}</div>;
}
