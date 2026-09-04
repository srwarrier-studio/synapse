import {
	Stack,
	Group,
	Text,
	UnstyledButton,
	Divider,
	ScrollArea,
	Tooltip,
	ActionIcon,
	Collapse,
} from "@mantine/core";
import { useState } from "react";
import {
	IconBriefcase,
	IconTruck,
	IconChartBar,
	IconPackages,
	IconPlus,
	IconRotate,
	IconChevronRight,
} from "@tabler/icons-react";
import type { WidgetType } from "../../domain/entities/dashboard-layout";
import {
	ALL_WIDGET_TYPES,
	WIDGET_CATEGORY_LABELS,
	type WidgetCategory,
} from "../../domain/entities/dashboard-templates";
import { dashboardTemplates } from "../../domain/entities/dashboard-templates";

const ICON_MAP: Record<string, typeof IconBriefcase> = {
	IconBriefcase,
	IconTruck,
	IconChartBar,
};

const CATEGORY_ICONS: Record<WidgetCategory, typeof IconBriefcase> = {
	finance: IconChartBar,
	operations: IconTruck,
	materials: IconPackages,
};

interface DashboardSidebarProps {
	onApplyTemplate: (templateId: string) => void;
	onAddWidget: (type: WidgetType) => void;
	onReset: () => void;
}

export function DashboardSidebar({
	onApplyTemplate,
	onAddWidget,
	onReset,
}: DashboardSidebarProps) {
	const [openCategories, setOpenCategories] = useState<Record<string, boolean>>({
		finance: true,
		operations: true,
		materials: true,
	});

	const toggleCategory = (cat: string) => {
		setOpenCategories((prev) => ({ ...prev, [cat]: !prev[cat] }));
	};

	const categories = Object.keys(WIDGET_CATEGORY_LABELS) as WidgetCategory[];

	return (
		<ScrollArea h="100%">
			<Stack gap="md" p="md">
				<Group justify="space-between">
					<Text fw={600} size="sm">
						Templates
					</Text>
					<Tooltip label="Reset to default">
						<ActionIcon variant="subtle" color="gray" size="sm" onClick={onReset}>
							<IconRotate size={14} />
						</ActionIcon>
					</Tooltip>
				</Group>

				<Stack gap="xs">
					{dashboardTemplates.map((template) => {
						const Icon = ICON_MAP[template.icon] || IconChartBar;
						return (
							<UnstyledButton
								key={template.id}
								onClick={() => onApplyTemplate(template.id)}
								p="sm"
								style={(theme) => ({
									border: `1px solid ${theme.colors.defaultColor}`,
									borderRadius: theme.radius.sm,
									"&:hover": {
										backgroundColor: theme.colors.gray[0],
									},
								})}
							>
								<Group gap="sm">
									<Icon size={18} />
									<Stack gap={2}>
										<Text size="sm" fw={500}>
											{template.name}
										</Text>
										<Text size="xs" c="dimmed">
											{template.description}
										</Text>
									</Stack>
								</Group>
							</UnstyledButton>
						);
					})}
				</Stack>

				<Divider />

				<Text fw={600} size="sm">
					Add Widget
				</Text>

				{categories.map((cat) => {
					const widgets = ALL_WIDGET_TYPES.filter((w) => w.category === cat);
					const CatIcon = CATEGORY_ICONS[cat];
					const isOpen = openCategories[cat] ?? true;

					return (
						<Stack key={cat} gap={4}>
							<UnstyledButton onClick={() => toggleCategory(cat)}>
								<Group gap="xs" justify="space-between">
									<Group gap="xs">
										<CatIcon size={14} />
										<Text size="sm" fw={500}>
											{WIDGET_CATEGORY_LABELS[cat]}
										</Text>
										<Text size="xs" c="dimmed">
											({widgets.length})
										</Text>
									</Group>
									<IconChevronRight
										size={14}
										style={{
											transform: isOpen ? "rotate(90deg)" : "none",
											transition: "transform 150ms ease",
										}}
									/>
								</Group>
							</UnstyledButton>
							<Collapse expanded={isOpen}>
								<Stack gap="xs" pl="md">
									{widgets.map((widget) => (
										<UnstyledButton
											key={widget.type}
											onClick={() => onAddWidget(widget.type)}
											p="sm"
											style={(theme) => ({
												border: `1px solid ${theme.colors.defaultColor}`,
												borderRadius: theme.radius.sm,
												"&:hover": {
													backgroundColor: theme.colors.gray[0],
												},
											})}
										>
											<Group gap="sm">
												<IconPlus size={14} />
												<Text size="sm">{widget.label}</Text>
											</Group>
										</UnstyledButton>
									))}
								</Stack>
							</Collapse>
						</Stack>
					);
				})}
			</Stack>
		</ScrollArea>
	);
}
