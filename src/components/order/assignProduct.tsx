import { GET_ALL_PRODUCT } from "@/pages/product";
import { Product } from "@/types/product.type";
import { useQuery } from "@apollo/client";
import OrderContext from "context/orderContext";
import React, { useContext } from "react";
import Select from "react-select";

export default function AssignProduct() {
  const { data } = useQuery(GET_ALL_PRODUCT);
  const { addProduct }: any = useContext(OrderContext);
  return (
    <>
      <p className="mt-3 my-2 bg-white border-l-4 border-slate-800 text-slate-700 p-2 text-sm font-bold">
        Assign products to the order
      </p>
      <Select
        className="mt-3"
        options={data != null && data.getAllProducts}
        isMulti={true}
        onChange={(product) => addProduct(product)}
        getOptionLabel={(product: Product) =>
          `${product.name} - ${product.amount} available`
        }
        getOptionValue={(product: Product) => product.id}
      />
    </>
  );
}
