import React from "react";
import Layout from "../components/layout";
import { gql, useQuery } from "@apollo/client";
import TableClient from "@/components/client/tableClient";
import ErrorSpan from "@/components/errorSpan";
import Link from "next/link";

export const GET_ALL_CLIENT = gql`
  query getAllClients {
    getAllClients {
      id
      name
      lastName
      phone
      company
      email
      seller
    }
  }
`;

export default function Client() {
  const { data, error } = useQuery(GET_ALL_CLIENT);
  if (error) {
    return <ErrorSpan name={error?.message} />;
  }
  return (
    <Layout>
      <>
        <h1 className="text-2xl text-slate-800 font-light">Client</h1>
        <Link
          href="/newClient"
          className="bg-slate-800 text-white text-sm font-bold mt-3 p-2 inline-block rounded-full hover:bg-slate-600"
        >
          New Client
        </Link>
        {data != null && <TableClient {...data}></TableClient>}
      </>
    </Layout>
  );
}
