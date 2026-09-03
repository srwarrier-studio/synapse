import type {
  PurchaseOrderListResponse,
  VendorSummary,
} from "../domain/entities/purchases";
import { request } from "./api-client";

export function fetchPurchaseOrders(
  page = 1,
  limit = 20,
  vendor?: string,
  status?: string,
): Promise<PurchaseOrderListResponse> {
  const params = new URLSearchParams({ page: String(page), limit: String(limit) });
  if (vendor) params.set("vendor", vendor);
  if (status) params.set("status", status);
  return request(`/api/purchases?${params}`);
}

export function fetchVendorSummary(): Promise<VendorSummary[]> {
  return request("/api/purchases/summary");
}
