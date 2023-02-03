import Link from "next/link";
import React from "react";
import { useRouter } from "next/router";

export default function SideBar() {
  //next router
  const { route } = useRouter();
  return (
    <aside className="bg-gray-800 sm:w-1/4 xl:w-1/5 sm:min-h-screen p-5 rounded-r-3xl">
      <div>
        <p className="text-white text-2xl font-black">CRM Client</p>
      </div>
      <hr />
      <nav className="mt-5 list-none">
        <li className={route == "/client" ? "bg-slate-500 p-3" : "p-3"}>
          <Link href="/client" className="text-slate-300 mb-2 block">
            Client
          </Link>
        </li>
        <li className={route == "/product" ? "bg-slate-500 p-3" : "p-3"}>
          <Link href="/product" className="text-slate-300 mb-2 block">
            Product
          </Link>
        </li>
        <li className={route == "/order" ? "bg-slate-500 p-3" : "p-3"}>
          <Link href="/order" className="text-slate-300 mb-2 block">
            Order
          </Link>
        </li>
      </nav>
      <div className="sm:mt-10">
        <p className="text-white text-2x my-4 font-white">Other options</p>
      </div>
      <nav className="mt-5 list-none">
        <li className={route == "/topSeller" ? "bg-slate-500 p-3" : "p-3"}>
          <Link href="/topSeller" className="text-slate-300 mb-2 block">
            Top Seller
          </Link>{" "}
        </li>
        <li className={route == "/topClient" ? "bg-slate-500 p-3" : "p-3"}>
          <Link href="/topClient" className="text-slate-300 mb-2 block">
            Top Client
          </Link>{" "}
        </li>
      </nav>
    </aside>
  );
}
