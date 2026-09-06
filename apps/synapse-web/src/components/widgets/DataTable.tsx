import { Paper, Text, Group, Badge, Table } from "@mantine/core";
import type { TableData } from "../../domain/entities/widget";

interface DataTableProps {
	data: TableData;
	title?: string;
	formatCell?: (key: string, value: unknown) => string;
	height?: number;
}

const STATUS_COLORS: Record<string, string> = {
	DELIVERED: "sami-green",
	SHIPPED: "synapse-blue",
	PROCESSING: "orange",
	PENDING_APPROVAL: "yellow",
	CANCELLED: "red",
	Active: "sami-green",
	Pending: "yellow",
	Inactive: "red",
};

function formatCellValue(_key: string, value: unknown, type?: string): string {
	if (value === null || value === undefined) return "-";

	switch (type) {
		case "currency":
			return `₹${Number(value).toLocaleString()}`;
		case "number":
			return Number(value).toLocaleString();
		case "date":
			return new Date(String(value)).toLocaleDateString();
		default:
			return String(value);
	}
}

function getCellColor(_key: string, value: unknown): string | undefined {
	const strValue = String(value);
	return STATUS_COLORS[strValue];
}

export function DataTable({ data, title, formatCell }: DataTableProps) {
	const { columns, rows } = data;

	return (
		<Paper p="md" radius="sm">
			{title && (
				<Group justify="space-between" mb="md">
					<Text fw={600}>{title}</Text>
					<Badge variant="light" color="gray" size="sm">
						{rows.length} rows
					</Badge>
				</Group>
			)}
			<Table>
				<Table.Thead>
					<Table.Tr>
						{columns.map((col) => (
							<Table.Th key={col.key}>{col.label}</Table.Th>
						))}
					</Table.Tr>
				</Table.Thead>
				<Table.Tbody>
					{rows.map((row, rowIndex) => (
						<Table.Tr key={rowIndex}>
							{columns.map((col) => {
								const value = row[col.key];
								const displayValue = formatCell
									? formatCell(col.key, value)
									: formatCellValue(col.key, value, col.type);
								const color = getCellColor(col.key, value);

								return (
									<Table.Td key={col.key}>
										{color ? (
											<Badge variant="light" color={color} size="sm">
												{displayValue}
											</Badge>
										) : (
											<Text size="sm">{displayValue}</Text>
										)}
									</Table.Td>
								);
							})}
						</Table.Tr>
					))}
				</Table.Tbody>
			</Table>
		</Paper>
	);
}
