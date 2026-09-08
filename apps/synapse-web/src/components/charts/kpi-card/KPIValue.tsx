import { Text } from "@mantine/core";
import classes from "./KPICard.module.css";

interface KPIValueProps {
	children: string;
}

export function KPIValue({ children }: KPIValueProps) {
	return <Text className={classes.value}>{children}</Text>;
}
