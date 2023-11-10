import { Order } from "./order";

interface Address {
  streetAddress: string;
  city: string;
  state: string;
  zipCode: string;
}

export interface User {
  name: string;
  email: string;
  address: Address;
  orders: Order[];
  jwt: string;
}
