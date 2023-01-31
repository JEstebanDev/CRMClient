import OrderContext from "context/orderContext";
import React, { useContext } from "react";
import ItemResumen from "./itemResumen";

export default function ResumeOrder() {
  const { product }: any = useContext(OrderContext);
  return (
    <>
      <p className="mt-3 my-2 bg-white border-l-4 border-slate-800 text-slate-700 p-2 text-sm font-bold">
        Adjust the order
      </p>
      {product.length > 0 ? (
        product.map((item) => (
          <ItemResumen key={item.id} item={item}></ItemResumen>
        ))
      ) : (
        <p className="mt-5 text-sm">There are not products</p>
      )}
    </>
  );
}
