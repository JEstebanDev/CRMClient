import Layout from "@/components/layout";
import Link from "next/link";
import React from "react";

export default function Order() {
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
      </>
    </Layout>
  );
}
