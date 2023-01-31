import Layout from "@/components/layout";
import AssignClient from "@/components/order/assignClient";
import AssignProduct from "@/components/order/assignProduct";
import ResumeOrder from "@/components/order/resumeOrder";
import TotalOrder from "@/components/order/totalOrder";
import OrderContext from "context/orderContext";
import React, { useContext } from "react";

export default function NewOrder() {
  const order = useContext(OrderContext);
  return (
    <Layout>
      <>
        <h1 className="text-2xl text-slate-800 font-light">New Order</h1>
        <div className="flex justify-center mt-5">
          <div className="w-full max-w-lg">
            <AssignClient />
            <AssignProduct />
            <ResumeOrder />
            <TotalOrder />
          </div>
        </div>
      </>
    </Layout>
  );
}
