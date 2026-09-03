export interface StockLevel {
	material_name: string;
	warehouse: string;
	quantity: number;
	unit: string;
	reorder_point: number;
	is_low: boolean;
	last_updated: string;
}

export interface MaterialMovement {
	id: string;
	material_name: string;
	movement_type: "IN" | "OUT" | "TRANSFER";
	quantity: number;
	warehouse: string;
	date: string;
	reference: string;
}

export interface StockLevelListResponse {
	items: StockLevel[];
	total: number;
}

export interface MovementListResponse {
	items: MaterialMovement[];
	total: number;
}
