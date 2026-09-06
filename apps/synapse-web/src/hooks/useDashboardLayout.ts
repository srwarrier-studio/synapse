import { useState, useEffect } from "react";
import type { Layout } from "react-grid-layout";
import type {
	DashboardLayout,
	DashboardWidget,
	GridLayoutItem,
	WidgetType,
} from "../domain/entities/dashboard-layout";
import { WIDGET_CONSTRAINTS } from "../domain/constants/dashboard-layout";
import { dashboardTemplates } from "../domain/entities/dashboard-templates";

const STORAGE_KEY = "synapse-dashboard-layout:v1";
const STORAGE_KEY_LEGACY = "synapse-dashboard-layout";

function generateId(): string {
	return `widget-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
}

function loadLayout(): DashboardLayout | null {
	try {
		const raw = localStorage.getItem(STORAGE_KEY);
		if (raw) return JSON.parse(raw) as DashboardLayout;

		const legacy = localStorage.getItem(STORAGE_KEY_LEGACY);
		if (legacy) {
			const parsed = JSON.parse(legacy) as DashboardLayout;
			localStorage.setItem(STORAGE_KEY, legacy);
			localStorage.removeItem(STORAGE_KEY_LEGACY);
			return parsed;
		}

		return null;
	} catch {
		return null;
	}
}

function saveLayout(layout: DashboardLayout): void {
	localStorage.setItem(STORAGE_KEY, JSON.stringify(layout));
}

export function useDashboardLayout() {
	const [layout, setLayout] = useState<DashboardLayout>(() => {
		const saved = loadLayout();
		if (saved) return saved;
		const defaultTemplate = dashboardTemplates[0];
		return {
			id: "default",
			name: defaultTemplate.name,
			widgets: defaultTemplate.widgets.map((w) => ({ ...w })),
			GridLayout: defaultTemplate.GridLayout.map((g) => ({ ...g })),
			createdAt: new Date().toISOString(),
			updatedAt: new Date().toISOString(),
		};
	});

	useEffect(() => {
		saveLayout(layout);
	}, [layout]);

	const onLayoutChange = (newGridLayout: Layout) => {
		setLayout((prev) => ({
			...prev,
			GridLayout: [...newGridLayout] as GridLayoutItem[],
			updatedAt: new Date().toISOString(),
		}));
	};

	const addWidget = (type: WidgetType) => {
		const id = generateId();
		const constraints = WIDGET_CONSTRAINTS[type];
		const newWidget: DashboardWidget = {
			id,
			type,
			title: "",
		};
		setLayout((prev) => {
			const maxY = prev.GridLayout.reduce(
				(max, item) => Math.max(max, item.y + item.h),
				0,
			);
			const newGridItem: GridLayoutItem = {
				i: id,
				x: 0,
				y: maxY,
				w: constraints.defaultW,
				h: constraints.defaultH,
				minW: constraints.minW,
				minH: constraints.minH,
				maxW: constraints.maxW,
				maxH: constraints.maxH,
			};
			return {
				...prev,
				widgets: [...prev.widgets, newWidget],
				GridLayout: [...prev.GridLayout, newGridItem],
				updatedAt: new Date().toISOString(),
			};
		});
	};

	const removeWidget = (widgetId: string) => {
		setLayout((prev) => ({
			...prev,
			widgets: prev.widgets.filter((w) => w.id !== widgetId),
			GridLayout: prev.GridLayout.filter((item) => item.i !== widgetId),
			updatedAt: new Date().toISOString(),
		}));
	};

	const applyTemplate = (templateId: string) => {
		const template = dashboardTemplates.find((t) => t.id === templateId);
		if (!template) return;
		setLayout({
			id: templateId,
			name: template.name,
			widgets: template.widgets.map((w) => ({ ...w })),
			GridLayout: template.GridLayout.map((g) => ({ ...g })),
			createdAt: new Date().toISOString(),
			updatedAt: new Date().toISOString(),
		});
	};

	const resetLayout = () => {
		const defaultTemplate = dashboardTemplates[0];
		setLayout({
			id: "default",
			name: defaultTemplate.name,
			widgets: defaultTemplate.widgets.map((w) => ({ ...w })),
			GridLayout: defaultTemplate.GridLayout.map((g) => ({ ...g })),
			createdAt: new Date().toISOString(),
			updatedAt: new Date().toISOString(),
		});
	};

	return {
		layout,
		widgets: layout.widgets,
		gridLayout: layout.GridLayout,
		onLayoutChange,
		addWidget,
		removeWidget,
		applyTemplate,
		resetLayout,
	};
}
