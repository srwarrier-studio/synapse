import type { OrderStatus, Region } from "./common";

export interface SalesItem {
  product_name: string;
  quantity: number;
  unit_price: number;
  currency: string;
  total: number;
}

export interface SalesOrder {
  id: string;
  customer_name: string;
  region: Region;
  status: OrderStatus;
  date: string;
  items: SalesItem[];
  total: number;
  currency: string;
}

export interface SalesOrderListResponse {
  items: SalesOrder[];
  total: number;
  page: number;
}
