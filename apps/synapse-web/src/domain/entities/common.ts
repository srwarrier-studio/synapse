export type Currency = "INR" | "USD" | "SGD" | "AED";

export type Region = "INDIA" | "SOUTHEAST_ASIA" | "MIDDLE_EAST";

export type OrderStatus =
  | "PROCESSING"
  | "SHIPPED"
  | "DELIVERED"
  | "CANCELLED"
  | "PENDING_APPROVAL";

export interface Money {
  amount: number;
  currency: Currency;
}
