import Layout from "@/components/layout";
import AssignClient from "@/components/order/assignClient";
import AssignProduct from "@/components/order/assignProduct";
import ResumeOrder from "@/components/order/resumeOrder";
import TotalOrder from "@/components/order/totalOrder";
import { InitialStateType } from "@/types/orderState.type";
import { gql, useMutation } from "@apollo/client";
import OrderContext from "context/orderContext";
import router from "next/router";
import React, { useContext, useEffect, useState } from "react";
import Swal from "sweetalert2";
import { QUERY_GET_ORDERS } from "./order";

const MUTATION_CREATE_ORDER = gql`
  mutation NewOrder($input: orderInput) {
    newOrder(input: $input) {
      id
      product {
        id
        name
        quantity
      }
      status
      total
      client {
        company
        lastName
        name
      }
      seller
    }
  }
`;

export default function NewOrder() {
  const [NewOrder] = useMutation(MUTATION_CREATE_ORDER, {
    update(cache) {
      const { getOrderBySeller }: any = cache.readQuery({
        query: QUERY_GET_ORDERS,
      });
      cache.writeQuery({
        query: QUERY_GET_ORDERS,
        data: {
          getOrderBySeller: [...getOrderBySeller, NewOrder],
        },
      });
    },
  });
  const { client, product, total }: InitialStateType = useContext(OrderContext);
  const [modifyClass, setModifyClass] = useState("");

  useEffect(() => {
    if (total <= 0 || client == null) {
      setModifyClass("opacity-50 cursor-not-allow");
    } else {
      setModifyClass("");
    }
  }, [client, total]);

  const createOrder = () => {
    const productOrder = product.map(
      ({ __typename, amount, price, ...itemProduct }) => itemProduct
    );

    Swal.fire({
      title: "Are you sure?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, create it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const { data } = await NewOrder({
            variables: {
              input: {
                status: "PENDING",
                client: client.id,
                total,
                product: productOrder,
              },
            },
          });
          Swal.fire("Created!", "Your order has been created.", "success");
          router.push("/order");
        } catch (error) {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: error.message,
          });
          console.log(error.message);
        }
      }
    });
  };
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
            <button
              type="button"
              onClick={createOrder}
              className={`bg-slate-800 w-full my-5 py-2 text-white font-bold hover:bg-slate-900  ${modifyClass}`}
            >
              Register Order
            </button>
          </div>
        </div>
      </>
    </Layout>
  );
}
