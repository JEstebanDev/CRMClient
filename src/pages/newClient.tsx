import Layout from "@/components/layout";
import React from "react";
import { useMutation, gql } from "@apollo/client";
import { Formik } from "formik";
import Swal from "sweetalert2";
import FormClient from "@/components/formClient";
import { ClientType } from "@/types/client.type";
import { GET_ALL_CLIENT } from "./client";
import { clientSchema } from "@/schemas/clientSchema";

const MUTATION_CREATE_CLIENT = gql`
  mutation newClient($input: clientInput) {
    newClient(input: $input) {
      name
      lastName
      company
      email
      phone
    }
  }
`;

export default function NewClient() {
  const [newClient] = useMutation(MUTATION_CREATE_CLIENT, {
    update(cache, { data: { newClient } }) {
      //get the cache object to update
      const { getAllClients }: any = cache.readQuery({
        query: GET_ALL_CLIENT,
      });
      //rewrite the cache (the cache should never be updated)
      cache.writeQuery({
        query: GET_ALL_CLIENT,
        data: { getAllClients: [...getAllClients, newClient] },
      });
    },
  });
  const createClient = async (dataClient: ClientType) => {
    try {
      const { data } = await newClient({
        variables: {
          input: dataClient,
        },
      });
      Swal.fire({
        icon: "success",
        title: "Perfect",
        text: "Client created",
      });
    } catch (error: any) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: error.message,
      });
    }
  };
  return (
    <Layout>
      <>
        <h1 className="text-2xl text-slate-800 font-light">New Client</h1>
        <div className="flex justify-center mt-4">
          <div className="w-full max-w-sm">
            <Formik
              initialValues={{
                name: "",
                lastName: "",
                company: "",
                email: "",
                phone: "",
              }}
              validationSchema={clientSchema}
              onSubmit={async (values, { resetForm }) => {
                await createClient(values);
                resetForm();
              }}
            >
              {({ errors, touched }) => (
                <FormClient errors={errors} touched={touched} />
              )}
            </Formik>
          </div>
        </div>
      </>
    </Layout>
  );
}
