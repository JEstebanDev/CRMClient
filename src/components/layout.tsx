import React, { useEffect } from "react";
import router from "next/router";
import Head from "next/head";
import { useRouter } from "next/router";
import Header from "./header";
import SideBar from "./sideBar";

type Props = {
  children: JSX.Element;
};

export default function Layout({ children }: Props) {
  // Hook de routing
  const { route } = useRouter();
  useEffect(() => {
    return () => {
      if (localStorage.getItem("key") != null) {
        router.push("/login");
      }
    };
  }, []);
  return (
    <>
      <Head>
        <title>CRM - Administration clients</title>
        <script src="https://cdn.tailwindcss.com"></script>
      </Head>

      {route === "/login" || route === "/signUp" ? (
        <div className="bg-slate-800 min-h-screen flex flex-col justify-center">
          <div>{children}</div>
        </div>
      ) : (
        <div className="bg-slate-200 min-h-screen">
          <div className="sm:flex min-h-screen">
            <SideBar />
            <main className="sm:w-2/3 xl:w-4/5 sm:min-h-screen p-5">
              <Header />
              {children}
            </main>
          </div>
        </div>
      )}
    </>
  );
}
