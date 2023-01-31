import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import Layout from "@/components/layout";
import { gql, useMutation, useQuery } from "@apollo/client";
import { Formik } from "formik";
import { ClientType } from "@/types/client.type";
import Swal from "sweetalert2";
import FormClient from "@/components/formClient";
import { clientSchema } from "@/schemas/clientSchema";

const MUTATION_UPDATE_CLIENT = gql`
  mutation UpdateClient($updateClientId: ID!, $input: clientInput) {
    updateClient(id: $updateClientId, input: $input) {
      id
      lastName
      name
      phone
      seller
    }
  }
`;

const QUERY_GET_CLIENT_ID = gql`
  query GetClientById($id: ID!) {
    getClientById(ID: $id) {
      id
      lastName
      name
      phone
      email
      company
    }
  }
`;

export default function EditClient() {
  //getIdFromURL rename to id
  const router = useRouter();

  //getDataFromGraphQL with id value
  const { data }: any = useQuery(QUERY_GET_CLIENT_ID, {
    variables: {
      id: router.query.pid,
    },
  });

  const [UpdateClient] = useMutation(MUTATION_UPDATE_CLIENT);
  const editClient = async (dataClient: ClientType) => {
    try {
      const { data } = await UpdateClient({
        variables: {
          updateClientId: router.query.pid,
          input: dataClient,
        },
      });

      Swal.fire({
        icon: "success",
        title: "Perfect",
        text: "Client modified",
      });
      router.push("/client");
    } catch (error: any) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: error.message,
      });
    }
  };
  const loadData = () => {
    const { name, lastName, company, email, phone } = data.getClientById;
    return (
      <>
        <Formik
          initialValues={{
            name,
            lastName,
            phone,
            email,
            company,
          }}
          validationSchema={clientSchema}
          onSubmit={async (values, { resetForm }) => {
            await editClient(values);
            resetForm();
          }}
        >
          {({ errors, touched }) => (
            <FormClient errors={errors} touched={touched} />
          )}
        </Formik>
      </>
    );
  };

  return (
    <Layout>
      <>
        <h1 className="text-2xl text-slate-800 font-light">Edit Client</h1>
        <div className="flex justify-center mt-4">
          <div className="w-full max-w-sm">{data != null && loadData()}</div>
        </div>
      </>
    </Layout>
  );
}
