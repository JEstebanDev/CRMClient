import Layout from "@/components/layout";
import TableProduct from "@/components/product/tableProduct";
import { gql, useQuery } from "@apollo/client";
import Link from "next/link";
import React from "react";

export const GET_ALL_PRODUCT = gql`
  query getAllProduct {
    getAllProducts {
      id
      name
      price
      amount
    }
  }
`;
export default function product() {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { data } = useQuery(GET_ALL_PRODUCT);
  return (
    <div>
      <Layout>
        <>
          <h1 className="text-2xl text-slate-800 font-light">Product</h1>
          <Link
            href="/newProduct"
            className="bg-slate-800 text-white text-sm font-bold mt-3 p-2 inline-block rounded-full hover:bg-slate-600"
          >
            New Product
          </Link>
          {data != null && <TableProduct {...data}></TableProduct>}
        </>
      </Layout>
    </div>
  );
}
