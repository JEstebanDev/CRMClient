import { GET_ALL_PRODUCT } from "@/pages/product";
import { DeleteProductType, GetAllProductType } from "@/types/product.type";
import { gql, useMutation } from "@apollo/client";
import Router from "next/router";
import React, { useState } from "react";
import Swal from "sweetalert2";

const DELETE_PRODUCT_ID = gql`
  mutation DeleteProductById($id: ID!) {
    deleteProductById(id: $id)
  }
`;

export default function TableProduct({ getAllProducts }: GetAllProductType) {
  const [idProduct, setIdProduct] = useState<string>();
  const [deleteProductById] = useMutation(DELETE_PRODUCT_ID, {
    update(cache) {
      const { getAllProducts }: any = cache.readQuery({
        query: GET_ALL_PRODUCT,
      });
      cache.writeQuery({
        query: GET_ALL_PRODUCT,
        data: {
          getAllProducts: getAllProducts.filter(
            (item: { id: any }) => item.id !== idProduct
          ),
        },
      });
    },
  });

  const deleteProduct = (id: string) => {
    setIdProduct(id);
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const { data } = await deleteProductById({
            variables: {
              id,
            },
          });
          Swal.fire("Deleted!", data.deleteProductById, "success");
        } catch (error) {
          console.log(error);
        }
      }
    });
  };

  const editProduct = (id: string) => {
    Router.push({
      pathname: "/edit-product/[id]",
      query: { id },
    });
  };

  return (
    <table className="table-auto shadow-md mt-10 w-full w-lg">
      <thead className="bg-slate-800">
        <tr className="text-white">
          <th className="w-1/5 py-2">Name</th>
          <th className="w-1/5 py-2">Amount</th>
          <th className="w-1/5 py-2">Price</th>
          <th className="w-1/5 py-2">Actions</th>
        </tr>
      </thead>
      <tbody className="bg-white">
        {getAllProducts.map((item) => (
          <tr key={item.id}>
            <td className="border px-4 py-2">{item.name}</td>
            <td className="border px-4 py-2">{item.amount}</td>
            <td className="border px-4 py-2">{item.price}</td>
            <td className="border px-4 py-2">
              <div className="flex">
                <button
                  type="button"
                  className="flex justify-center items-center bg-amber-300 p-2 rounded text-xs  mr-2"
                  onClick={() => editProduct(item.id)}
                >
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
                      d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
                    />
                  </svg>
                </button>
                <button
                  type="button"
                  className="flex justify-center items-center bg-red-400 p-2 rounded text-xs "
                  onClick={() => deleteProduct(item.id)}
                >
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
                      d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </button>
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
