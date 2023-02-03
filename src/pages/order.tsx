import React from "react";
import { gql, useQuery } from "@apollo/client";
import Link from "next/link";
import Layout from "@/components/layout";
import { GetOrderBySellerType, OrderType } from "@/types/order.type";
import OrderItem from "@/components/order/OrderItem";

export const QUERY_GET_ORDERS = gql`
  query getOrderBySeller {
    getOrderBySeller {
      total
      id
      seller
      product {
        quantity
        name
        id
      }
      status
      client {
        id
        lastName
        email
        company
        name
        phone
      }
    }
  }
`;

export default function Order() {
  const { data, loading } = useQuery(QUERY_GET_ORDERS);

  if (loading) return "Loading";
  const { getOrderBySeller }: GetOrderBySellerType = data;
  return (
    <Layout>
      <>
        <h1 className="text-2xl text-slate-800 font-light">Order</h1>
        <Link
          href="/newOrder"
          className="bg-slate-800 text-white text-sm font-bold mt-3 p-2 inline-block rounded-full hover:bg-slate-600"
        >
          New Order
        </Link>
        {loading ? (
          <p className="mt-5 text-center text-2xl"> there are not orders</p>
        ) : (
          getOrderBySeller.map((order: OrderType) => (
            <OrderItem key={order.id} order={order}></OrderItem>
          ))
        )}
      </>
    </Layout>
  );
}
