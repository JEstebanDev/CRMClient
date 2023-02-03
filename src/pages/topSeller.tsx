import Layout from "@/components/layout";
import { TopSellerData, TopSellerType } from "@/types/topSeller.type";
import { gql, useQuery } from "@apollo/client";
import React, { useEffect } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

const QUERY_TOP_SELLER = gql`
  query GetTopSeller {
    getTopSeller {
      seller {
        name
        lastName
        email
      }
      total
    }
  }
`;

export default function TopSeller() {
  const { data, startPolling, stopPolling } = useQuery(QUERY_TOP_SELLER);
  const sellerGraf: TopSellerType[] = [];

  useEffect(() => {
    startPolling(1000);
    return () => {
      stopPolling();
    };
  }, [startPolling, stopPolling]);

  if (data != null) {
    data.getTopSeller.map((seller: TopSellerData, index: number) => {
      sellerGraf[index] = {
        ...seller.seller[0],
        total: seller.total,
      };
    });
  }

  return (
    <Layout>
      <>
        <h1 className="text-2xl text-slate-800 font-light">Top Sellers</h1>
        <BarChart
          width={600}
          height={400}
          data={sellerGraf}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="total" fill="#1E293B" />
        </BarChart>
      </>
    </Layout>
  );
}
