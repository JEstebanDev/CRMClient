import React from "react";
import { useQuery, gql } from "@apollo/client";
import ErrorSpan from "./errorSpan";
import { useRouter } from "next/router";

const GET_USER_BY_TOKEN = gql`
  query GetUserByToken {
    getUserByToken {
      name
      lastName
    }
  }
`;

export default function Header() {
  const { data, error } = useQuery(GET_USER_BY_TOKEN);
  const route = useRouter();
  if (error) {
    return <ErrorSpan name={error?.message} />;
  }

  const logOut = () => {
    localStorage.removeItem("token");
    route.push("/login");
  };

  return (
    <div className="flex justify-between">
      {data != null && (
        <>
          <p className="mr-2 ">
            Hi <strong>{data.getUserByToken.name}</strong>
          </p>
          <button
            type="button"
            className="bg-red-500 p-2 rounded-full text-white font-bold hover:bg-red-700"
            onClick={logOut}
          >
            Log out
          </button>
        </>
      )}
    </div>
  );
}
