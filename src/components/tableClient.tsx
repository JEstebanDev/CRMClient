import React from "react";
import { GetAllClientType } from "@/types/client.type";

export default function TableClient({ getAllClients }: GetAllClientType) {
  return (
    <table className="table-auto shadow-md mt-10 w-full w-lg">
      <thead className="bg-slate-800">
        <tr className="text-white">
          <th className="w-1/5 py-2">Name</th>
          <th className="w-1/5 py-2">Company</th>
          <th className="w-1/5 py-2">Email</th>
          <th className="w-1/5 py-2">Phone</th>
        </tr>
      </thead>
      <tbody className="bg-white">
        {getAllClients.map((item) => (
          <tr key={item.id}>
            <td className="border px-4 py-2">{`${item.name} ${item.lastName}`}</td>
            <td className="border px-4 py-2">{item.company}</td>
            <td className="border px-4 py-2">{item.email}</td>
            <td className="border px-4 py-2">{item.phone}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
