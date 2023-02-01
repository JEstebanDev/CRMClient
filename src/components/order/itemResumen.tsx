import OrderContext from "context/orderContext";
import React, { useContext, useEffect, useState } from "react";

export default function ItemResumen({ item }: any) {
  const { name, price } = item;
  const { modifyAmount, updateTotal }: any = useContext(OrderContext);
  const [amount, setAmount] = useState(0);

  useEffect(() => {
    updateAmount();
    updateTotal();
  }, [amount]);

  const updateAmount = () => {
    const newOrder = { ...item, quantity: Number(amount) };
    modifyAmount(newOrder);
  };
  return (
    <div className="md:flex md:justify-between md:items-center mt-5">
      <div className="md:w-10/12 mb-2 md:mb-0">
        <p className="text-sm">{name}</p>
        <p className="text-sm">${price}</p>
      </div>
      <input
        onChange={(e) => setAmount(e.target.value)}
        value={amount}
        type="number"
        placeholder="Amount"
        className="shadow apperance-none border rounded w-full py-2 px-3 text-slate-700 leading-tight focus:outline-none focus:shadow-outline md:ml-4"
      />
    </div>
  );
}
