import OrderContext from "context/orderContext";
import React, { useContext } from "react";

export default function TotalOrder() {
  const { total }: any = useContext(OrderContext);
  return (
    <div className="flex items-center mt-5 justify-between bg-white p-3 border-solid border-2 border-slate-500">
      <h2 className="text-slate-800 text-lg">Total:</h2>
      <p className="text-slate-800 mt-0">${total}</p>
    </div>
  );
}
