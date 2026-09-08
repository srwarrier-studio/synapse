import { useRef, useState, useEffect } from "react";
import { ResponsiveGridLayout } from "react-grid-layout";
import type { Layout } from "react-grid-layout";
import type { ReactNode } from "react";

const BREAKPOINTS = { lg: 1200, md: 996, sm: 768, xs: 480 };
const COLS = { lg: 12, md: 12, sm: 6, xs: 4 };
const ROW_HEIGHT = 80;
const MARGIN: [number, number] = [8, 8];

interface DashboardGridProps {
	children: ReactNode;
	layout?: Layout[];
	onLayoutChange?: (layout: Layout[]) => void;
	draggable?: boolean;
}

export function DashboardGrid({
	children,
	layout,
	onLayoutChange,
	draggable = false,
}: DashboardGridProps) {
	const containerRef = useRef<HTMLDivElement>(null);
	const [width, setWidth] = useState(0);

	useEffect(() => {
		if (!containerRef.current) return;
		const observer = new ResizeObserver((entries) => {
			for (const entry of entries) {
				setWidth(entry.contentRect.width);
			}
		});
		observer.observe(containerRef.current);
		return () => observer.disconnect();
	}, []);

	const generateLayout = (): Layout[] => {
		const childArray = Array.isArray(children) ? children : [children];
		let y = 0;
		return childArray.map((child, i) => {
			const key = (child as React.ReactElement).key || String(i);
			const el = child as React.ReactElement<{ "data-grid"?: { w: number; h: number } }>;
			const grid = el.props?.["data-grid"];
			const w = grid?.w ?? 4;
			const h = grid?.h ?? 4;
			const item = { i: String(key), x: (i * w) % 12, y, w, h };
			if (item.x + w > 12) {
				y += h;
				item.x = 0;
				item.y = y;
			}
			return item;
		});
	};

	const layoutItems = layout ?? generateLayout();

	return (
		<div ref={containerRef}>
			{width > 0 && (
				<ResponsiveGridLayout
					className="layout"
					width={width}
					breakpoints={BREAKPOINTS}
					cols={COLS}
					rowHeight={ROW_HEIGHT}
					margin={MARGIN}
					layout={layoutItems}
					onLayoutChange={onLayoutChange}
					isDraggable={draggable}
					isResizable={draggable}
					useCSSTransforms
				>
					{children}
				</ResponsiveGridLayout>
			)}
		</div>
	);
}
