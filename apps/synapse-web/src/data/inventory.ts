import type {
  MovementListResponse,
  StockLevelListResponse,
} from "../domain/entities/inventory";
import { request } from "./api-client";

export function fetchStockLevels(
  warehouse?: string,
  lowStock = false,
): Promise<StockLevelListResponse> {
  const params = new URLSearchParams();
  if (warehouse) params.set("warehouse", warehouse);
  if (lowStock) params.set("low_stock", "true");
  const qs = params.toString();
  return request(`/api/inventory${qs ? `?${qs}` : ""}`);
}

export function fetchMovements(
  dateFrom?: string,
  dateTo?: string,
  movementType?: string,
): Promise<MovementListResponse> {
  const params = new URLSearchParams();
  if (dateFrom) params.set("date_from", dateFrom);
  if (dateTo) params.set("date_to", dateTo);
  if (movementType) params.set("movement_type", movementType);
  const qs = params.toString();
  return request(`/api/inventory/movements${qs ? `?${qs}` : ""}`);
}
