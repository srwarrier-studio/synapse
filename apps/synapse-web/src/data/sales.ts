import type { SalesOrderListResponse } from "../domain/entities/sales";
import { request } from "./api-client";

export function fetchSalesOrders(
  page = 1,
  limit = 20,
  region?: string,
  status?: string,
): Promise<SalesOrderListResponse> {
  const params = new URLSearchParams({ page: String(page), limit: String(limit) });
  if (region) params.set("region", region);
  if (status) params.set("status", status);
  return request(`/api/sales?${params}`);
}
