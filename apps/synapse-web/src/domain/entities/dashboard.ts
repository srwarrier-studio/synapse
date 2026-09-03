export interface DashboardSummary {
  revenue: number;
  orders: number;
  fulfillment_rate: number;
  active_shipments: number;
  revenue_change: number;
  orders_change: number;
}

export interface SalesTrendPoint {
  month: string;
  region: string;
  amount: number;
}

export interface TopProduct {
  name: string;
  revenue: number;
  units: number;
}
