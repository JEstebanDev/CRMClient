import { QUERY_GET_ORDERS } from "@/pages/order";
import { Product } from "@/types/order.type";
import { gql, useMutation } from "@apollo/client";
import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";

const MUTATION_UPDATE_ORDER = gql`
  mutation UpdateOrder($updateOrderId: ID!, $input: orderUpdateInput) {
    updateOrder(id: $updateOrderId, input: $input) {
      status
    }
  }
`;
const MUTATION_DELETE_ORDER = gql`
  mutation DeleteOrder($deleteOrderId: ID!) {
    deleteOrder(id: $deleteOrderId)
  }
`;

export default function OrderItem({ order }: any) {
  const { id, total, client, status, product } = order;
  const [statusOrderColor, setStatusOrderColor] = useState("");
  const [statusOrder, setStatusOrder] = useState(status);
  const [UpdateOrder] = useMutation(MUTATION_UPDATE_ORDER);
  const [DeleteOrder] = useMutation(MUTATION_DELETE_ORDER, {
    update(cache) {
      const { getOrderBySeller }: any = cache.readQuery({
        query: QUERY_GET_ORDERS,
      });
      cache.writeQuery({
        query: QUERY_GET_ORDERS,
        data: {
          getOrderBySeller: getOrderBySeller.filter((item) => item.id !== id),
        },
      });
    },
  });

  const changeStatusOrder = async (statusOrder: string) => {
    try {
      const { data } = await UpdateOrder({
        variables: {
          updateOrderId: id,
          input: {
            client: client.id,
            status: statusOrder,
          },
        },
      });
      setStatusOrder(data.updateOrder.status);
    } catch (error) {
      console.log(error.message);
    }
  };

  const actDeleteOrder = () => {
    Swal.fire({
      title: "Are you sure?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result: any) => {
      if (result.isConfirmed) {
        try {
          const { data } = await DeleteOrder({
            variables: {
              deleteOrderId: id,
            },
          });
          Swal.fire("Deleted!", data.deleteOrder, "success");
        } catch (error) {
          console.log(error.message);
        }
      }
    });
  };

  useEffect(() => {
    if (statusOrder == "COMPLETED") {
      setStatusOrderColor("bg-green-400 border-green-600");
    }
    if (statusOrder == "PENDING") {
      setStatusOrderColor("bg-orange-400 border-orange-600");
    }
    if (statusOrder == "CANCELLED") {
      setStatusOrderColor("bg-red-400 border-red-600");
    }
    if (statusOrder) {
      setStatusOrder(statusOrder);
    }
  }, [statusOrder]);

  return (
    <div className=" grid grid-cols-2 mt-4 bg-white rounded p-6 md:grid md:grid-col-2 md:gap-4 shadow:lg">
      <div>
        <p className="font-bold text-slate-800">Client information:</p>
        <ul className="max-w-md space-y-1 text-gray-500 list-disc list-inside dark:text-slate-400">
          <li className="flex items-center text-slate-600">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
              />
            </svg>
            {client.name} {client.lastName}
          </li>
          <li className="flex items-center text-slate-600">
            {" "}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"
              />
            </svg>
            {client.email}
          </li>
          <li className="flex items-center text-slate-600">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3.75 21h16.5M4.5 3h15M5.25 3v18m13.5-18v18M9 6.75h1.5m-1.5 3h1.5m-1.5 3h1.5m3-6H15m-1.5 3H15m-1.5 3H15M9 21v-3.375c0-.621.504-1.125 1.125-1.125h3.75c.621 0 1.125.504 1.125 1.125V21"
              />
            </svg>
            {client.company}
          </li>
          <li className="flex items-center text-slate-600">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z"
              />
            </svg>
            {client.phone}
          </li>
        </ul>
        <div>
          <div className="text-slate-800 mt-3 font-bold">Status order:</div>
          <select
            name="orderStatus"
            className={`mt-2 appearance-none ${statusOrderColor} border text-white p-2 text-center rounded leading-tight focus:outline-none focus:bg-slate-600 focus:border-slate-500 uppercase text-xs font-bold`}
            value={statusOrder}
            onChange={(e) => changeStatusOrder(e.target.value)}
          >
            <option value="COMPLETED">COMPLETED</option>
            <option value="PENDING">PENDING</option>
            <option value="CANCELLED">CANCELLED</option>
          </select>
        </div>
      </div>
      <div>
        <p className="font-bold text-slate-800">Resume Order:</p>
        {product.map((itemProduct: Product) => (
          <div key={itemProduct.id} className="mt-3">
            <p className="text-sm text-slate-600">
              Product: <strong>{itemProduct.name}</strong>
            </p>
            <p className="text-sm text-slate-600">
              Quantity:{itemProduct.quantity}
            </p>
          </div>
        ))}
        <div className="text-slate-800 mt-3 font-bold">
          Total:
          <span className="font-light"> $ {total}</span>
        </div>

        <button
          onClick={actDeleteOrder}
          className="flex items-center mt-4 bg-red-600 px-5 py-2  inline-block text-white rounded leading-tight uppercase text-xs font-bold"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6 mr-2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          Delete order
        </button>
      </div>
    </div>
  );
}
