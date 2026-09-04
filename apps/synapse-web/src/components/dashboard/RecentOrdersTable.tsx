import { Paper, Text, Table, Group, Badge } from "@mantine/core";
import type { RecentOrder } from "../../domain/entities/dashboard";
import { getRegionLabel, getRegionColor } from "../../domain/constants/dashboard";

interface RecentOrdersTableProps {
	data: RecentOrder[];
}

const STATUS_COLORS: Record<string, string> = {
	DELIVERED: "sami-green",
	SHIPPED: "synapse-blue",
	PROCESSING: "orange",
	PENDING_APPROVAL: "yellow",
	CANCELLED: "red",
};

const STATUS_LABELS: Record<string, string> = {
	DELIVERED: "Delivered",
	SHIPPED: "Shipped",
	PROCESSING: "Processing",
	PENDING_APPROVAL: "Pending",
	CANCELLED: "Cancelled",
};

export function RecentOrdersTable({ data }: RecentOrdersTableProps) {
	const rows = data.map((order) => (
		<Table.Tr key={order.order_id}>
			<Table.Td>
				<Text size="sm" fw={500}>
					{order.order_id}
				</Text>
			</Table.Td>
			<Table.Td>
				<Text size="sm">{order.customer}</Text>
			</Table.Td>
			<Table.Td>
				<Text size="sm">{order.product}</Text>
			</Table.Td>
			<Table.Td style={{ textAlign: "right" }}>
				<Text size="sm" fw={500}>
					₹{order.amount.toLocaleString()}
				</Text>
			</Table.Td>
			<Table.Td>
				<Badge
					variant="light"
					color={STATUS_COLORS[order.status] || "gray"}
					size="sm"
				>
					{STATUS_LABELS[order.status] || order.status}
				</Badge>
			</Table.Td>
			<Table.Td>
				<Badge
					variant="light"
					color={getRegionColor(order.region)}
					size="sm"
				>
					{getRegionLabel(order.region)}
				</Badge>
			</Table.Td>
			<Table.Td>
				<Text size="xs" c="dimmed">
					{order.date}
				</Text>
			</Table.Td>
		</Table.Tr>
	));

	return (
		<Paper p="md" radius="sm">
			<Group justify="space-between" mb="md">
				<Text fw={600}>Recent Orders</Text>
				<Badge variant="light" color="gray" size="sm">
					{data.length} orders
				</Badge>
			</Group>
			<Table>
				<Table.Thead>
					<Table.Tr>
						<Table.Th>Order ID</Table.Th>
						<Table.Th>Customer</Table.Th>
						<Table.Th>Product</Table.Th>
						<Table.Th style={{ textAlign: "right" }}>Amount</Table.Th>
						<Table.Th>Status</Table.Th>
						<Table.Th>Region</Table.Th>
						<Table.Th>Date</Table.Th>
					</Table.Tr>
				</Table.Thead>
				<Table.Tbody>{rows}</Table.Tbody>
			</Table>
		</Paper>
	);
}
