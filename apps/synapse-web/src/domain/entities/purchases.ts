import type { OrderStatus, Region } from "./common";

export interface PurchaseItem {
	material_name: string;
	quantity: number;
	unit_cost: number;
	currency: string;
	total: number;
}

export interface PurchaseOrder {
	id: string;
	vendor_name: string;
	region: Region;
	status: OrderStatus;
	date: string;
	items: PurchaseItem[];
	total: number;
	currency: string;
}

export interface VendorSummary {
	vendor_name: string;
	total_orders: number;
	total_spend: number;
	currency: string;
	on_time_rate: number;
}

export interface PurchaseOrderListResponse {
	items: PurchaseOrder[];
	total: number;
	page: number;
}
