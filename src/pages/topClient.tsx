import Layout from "@/components/layout";
import { TopClientData, TopClientType } from "@/types/topClient.type";
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
const QUERY_TOP_CLIENT = gql`
  query GetTopClient {
    getTopClient {
      total
      client {
        name
        company
        lastName
        phone
        email
        seller
      }
    }
  }
`;

export default function TopClient() {
  const { data, startPolling, stopPolling } = useQuery(QUERY_TOP_CLIENT);
  const clientGraf: TopClientType[] = [];

  useEffect(() => {
    startPolling(1000);
    return () => {
      stopPolling();
    };
  }, [startPolling, stopPolling]);

  if (data != null) {
    console.log(data);
    data.getTopClient.map((client: TopClientData, index: number) => {
      clientGraf[index] = {
        ...client.client[0],
        total: client.total,
      };
    });
  }

  return (
    <Layout>
      <>
        <h1 className="text-2xl text-slate-800 font-light">Top Clients</h1>
        <BarChart
          width={600}
          height={400}
          data={clientGraf}
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
