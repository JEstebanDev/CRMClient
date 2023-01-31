import { GET_ALL_CLIENT } from "@/pages/client";
import { Client } from "@/types/client.type";
import { useQuery } from "@apollo/client";
import OrderContext from "context/orderContext";
import React, { useContext } from "react";
import Select from "react-select";

export default function AssignClient() {
  const { data } = useQuery(GET_ALL_CLIENT);
  const { addClient }: any = useContext(OrderContext);

  return (
    <>
      <p className="mt-3 my-2 bg-white border-l-4 border-slate-800 text-slate-700 p-2 text-sm font-bold">
        Assign a client to the order
      </p>
      <Select
        className="mt-3"
        options={data != null && data.getAllClients}
        onChange={(client) => addClient(client)}
        getOptionLabel={(client: Client) => client.name}
        getOptionValue={(client: Client) => client.id}
      />
    </>
  );
}
