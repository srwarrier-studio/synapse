import { ActionIcon } from "@mantine/core";
import { IconEdit, IconCheck } from "@tabler/icons-react";
import { useEditMode } from "../../../hooks/useEditMode";

export function EditButton() {
	const { isEditing, toggle } = useEditMode();

	return (
		<ActionIcon
			variant={isEditing ? "filled" : "subtle"}
			color={isEditing ? "blue" : "gray"}
			size="lg"
			radius="md"
			onClick={toggle}
		>
			{isEditing ? <IconCheck size={20} /> : <IconEdit size={20} />}
		</ActionIcon>
	);
}
