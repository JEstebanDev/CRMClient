import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { Formik } from "formik";
import { useMutation, gql } from "@apollo/client";
import * as Yup from "yup";
import Swal from "sweetalert2";

import { NewUserType } from "@/types/user.type";

import Layout from "../components/layout";
import FormSignUp from "@/components/user/formSignUp";

const MUTATION_NEW_USER = gql`
  mutation NewUser($input: userInput) {
    newUser(input: $input) {
      id
      name
      lastName
      email
      password
    }
  }
`;

const signUpSchema = Yup.object().shape({
  name: Yup.string()
    .min(2, "Too Short!")
    .max(20, "Too Long!")
    .required("Required"),
  lastName: Yup.string()
    .min(2, "Too Short!")
    .max(20, "Too Long!")
    .required("Required"),
  email: Yup.string().email("Invalid email").required("Required"),
  password: Yup.string()
    .min(2, "Too Short!")
    .max(10, "Too Long!")
    .required("Required"),
});

export default function SignUp() {
  const [user, setUser] = useState();
  const [newUser] = useMutation(MUTATION_NEW_USER);
  const router = useRouter();

  const saveUser = async (dataUser: NewUserType) => {
    try {
      const { data } = await newUser({
        variables: {
          input: dataUser,
        },
      });
      setUser(data);
    } catch (error: any) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: error.message,
      });
    }
  };

  useEffect(() => {
    if (user != null) {
      Swal.fire({
        width: "300px",
        position: "top-end",
        icon: "success",
        title: "The user was create it",
        showConfirmButton: false,
        timer: 1000,
      });
      router.push("/login");
    }
  }, [user]);

  return (
    <>
      <Layout>
        <>
          <h1 className="text-center text-2xl text-white">Sign Up</h1>
          <div className="flex justify-center mt-4">
            <div className="w-full max-w-sm">
              <Formik
                initialValues={{
                  name: "",
                  lastName: "",
                  email: "",
                  password: "",
                }}
                validationSchema={signUpSchema}
                onSubmit={saveUser}
              >
                {({ errors, touched }) => (
                  <FormSignUp errors={errors} touched={touched}></FormSignUp>
                )}
              </Formik>
            </div>
          </div>
        </>
      </Layout>
    </>
  );
}
