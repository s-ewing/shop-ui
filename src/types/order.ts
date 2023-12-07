import { Product } from "./product";

export enum OrderStatus {
  PENDING = "PENDING",
  PAID = "PAID",
  COMPLETED = "COMPLETED",
  CANCELED = "CANCELED",
}

export interface OrderItem {
  quantity: number;
  product: Product;
}

export interface Order {
  id: number;
  items: OrderItem[];
  orderStatus: OrderStatus;
  timePlaced: string;
  total: number;
}
