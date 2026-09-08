import { Stack, Text } from "@mantine/core";
import classes from "./KPICard.module.css";

interface KPIStatProps {
	label: string;
	value: string;
	progress?: number;
}

export function KPIStat({ label, value, progress }: KPIStatProps) {
	return (
		<Stack gap={2} style={{ flex: 1 }}>
			<Text size="10px" fw={600} tt="uppercase" className={classes.label}>
				{label}
			</Text>
			{progress !== undefined ? (
				<>
					<Text size="sm" fw={700} className={classes.statValue}>
						{value}
					</Text>
					<div className={classes.progressTrack}>
						<div
							className={classes.progressFill}
							style={{ width: `${progress}%` }}
						/>
					</div>
				</>
			) : (
				<Text size="sm" fw={700} className={classes.statValue}>
					{value}
				</Text>
			)}
		</Stack>
	);
}
