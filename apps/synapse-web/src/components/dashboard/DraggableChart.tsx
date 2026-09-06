import { Paper, ActionIcon, Group, Text, Tooltip } from "@mantine/core";
import { IconGripVertical, IconX } from "@tabler/icons-react";
import type { ReactNode } from "react";

interface DraggableChartProps {
	id: string;
	title: string;
	onRemove?: (id: string) => void;
	isEditing?: boolean;
	children: ReactNode;
}

export function DraggableChart({
	id,
	title,
	onRemove,
	isEditing = false,
	children,
}: DraggableChartProps) {
	return (
		<Paper
			radius="sm"
			shadow={isEditing ? "xs" : "none"}
			h="100%"
			style={{
				display: "flex",
				flexDirection: "column",
				overflow: "hidden",
				border: isEditing ? "1px solid var(--mantine-color-default-border)" : "none",
				transition: "border 150ms ease, box-shadow 150ms ease",
			}}
		>
			{isEditing && (
				<Group
					className="drag-handle"
					justify="space-between"
					p="xs"
					gap="xs"
					style={{
						cursor: "grab",
						borderBottom: "1px solid var(--mantine-color-default-border)",
						flexShrink: 0,
						background: "var(--mantine-color-gray-0)",
					}}
				>
					<Group gap="xs">
						<IconGripVertical size={14} style={{ opacity: 0.5 }} />
						<Text size="sm" fw={500} truncate>
							{title}
						</Text>
					</Group>
					{onRemove && (
						<Tooltip label="Remove widget">
							<ActionIcon
								variant="subtle"
								color="gray"
								size="xs"
								onClick={(e) => {
									e.stopPropagation();
									onRemove(id);
								}}
							>
								<IconX size={12} />
							</ActionIcon>
						</Tooltip>
					)}
				</Group>
			)}
			<div style={{ flex: 1, overflow: "auto", padding: "var(--mantine-spacing-xs)" }}>
				{children}
			</div>
		</Paper>
	);
}
