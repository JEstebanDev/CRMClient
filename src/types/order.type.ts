import { Client } from "./client.type";

export interface GetOrderBySellerType {
  getOrderBySeller: OrderType[];
}
export interface OrderType {
  total: number;
  id: string;
  seller: string;
  product: Product[];
  client: Client;
  status: string;
}

export interface Product {
  quantity: number;
  name: string;
  id: string;
}
