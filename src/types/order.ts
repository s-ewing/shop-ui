import { Product } from "./product";

enum OrderStatus {
  PENDING = "PENDING",
  PROCESSING = "PROCESSING",
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
}
