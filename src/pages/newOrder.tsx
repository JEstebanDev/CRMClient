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

const MUTATION_CREATE_ORDER = gql`
  mutation NewOrder($input: orderInput) {
    newOrder(input: $input) {
      id
      product {
        id
        quantity
      }
      status
      total
      client
      seller
    }
  }
`;

/*
{
  "input": {
    "status": "CANCELLED",
    "client": "63c74c7e1e754ce2765be401",
    "total": 23,
    "product": [
      {
        "id": "63c70b4632a158dd013b4459",
        "quantity": 2
      },
      {
        "id": "63c70d252dfb3ef693224e64",
        "quantity": 5
      }
    ]
  }
}
*/

export default function NewOrder() {
  const [NewOrder] = useMutation(MUTATION_CREATE_ORDER);
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
      ({ __typename, amount, name, price, ...itemProduct }) => itemProduct
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
