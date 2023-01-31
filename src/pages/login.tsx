import React, { useState } from "react";
import { useMutation, gql } from "@apollo/client";
import * as Yup from "yup";
import { Formik } from "formik";

import Layout from "../components/layout";
import { useRouter } from "next/router";
import FormLogin from "@/components/user/formLogin";
import { LoginType } from "@/types/login.type";
import Swal from "sweetalert2";

const MUTATION_AUTH = gql`
  mutation AuthenticUser($input: authUserInput) {
    authenticUser(input: $input) {
      token
    }
  }
`;

const loginSchema = Yup.object().shape({
  email: Yup.string()
    .min(2, "Too Short!")
    .max(20, "Too Long!")
    .email("Invalid email")
    .required("Required"),
  password: Yup.string()
    .min(2, "Too Short!")
    .max(10, "Too Long!")
    .required("Required"),
});

export default function Login() {
  const [authenticUser] = useMutation(MUTATION_AUTH);
  const router = useRouter();

  const loginUser = async (dataLogin: LoginType) => {
    try {
      const { data } = await authenticUser({
        variables: {
          input: dataLogin,
        },
      });
      Swal.fire({
        width: "300px",
        position: "top-end",
        icon: "success",
        title: "Login successfully",
        showConfirmButton: false,
        timer: 1000,
      });
      localStorage.setItem("token", data.authenticUser.token);
      router.push("/client");
    } catch (error: any) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: error.message,
      });
    }
  };
  return (
    <>
      <Layout>
        <>
          <h1 className="text-center text-2xl text-white">Login</h1>
          <div className="flex justify-center mt-4">
            <div className="w-full max-w-sm">
              <Formik
                initialValues={{
                  email: "",
                  password: "",
                }}
                validationSchema={loginSchema}
                onSubmit={loginUser}
              >
                {({ errors, touched }) => (
                  <FormLogin errors={errors} touched={touched} />
                )}
              </Formik>
            </div>
          </div>
        </>
      </Layout>
    </>
  );
}
