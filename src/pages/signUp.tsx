import React from "react";
import Layout from "./components/layout";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
export default function SignUp() {
  const SignupSchema = Yup.object().shape({
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
                validationSchema={SignupSchema}
                onSubmit={(values) => {
                  // same shape as initial values
                  console.log(values);
                }}
              >
                {({ errors, touched }) => (
                  <Form className="bg-slate-200 rounded-3xl shadow-md px-8 pt-6 pb-8 mb-4">
                    <div>
                      <label
                        htmlFor="name"
                        className="block text-slate-700 text-sm font-bold mb-2"
                      >
                        Name
                      </label>
                      <Field
                        name="name"
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-slate-700 leading-tight focus:shadow-outline"
                      />
                      {errors.name && touched.name ? (
                        <div>{errors.name}</div>
                      ) : null}

                      <label
                        htmlFor="lastName"
                        className="block text-slate-700 text-sm font-bold mb-2"
                      >
                        Last name
                      </label>
                      <Field
                        name="lastName"
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-slate-700 leading-tight focus:shadow-outline"
                      />
                      {errors.name && touched.lastName ? (
                        <div>{errors.lastName}</div>
                      ) : null}
                      <label
                        htmlFor="email"
                        className="block text-slate-700 text-sm font-bold mb-2"
                      >
                        Email
                      </label>
                      <Field
                        name="email"
                        type="email"
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-slate-700 leading-tight focus:shadow-outline"
                      />
                      {errors.email && touched.email ? (
                        <div>{errors.email}</div>
                      ) : null}
                      <label
                        htmlFor="password"
                        className="block text-slate-700 text-sm font-bold mb-2"
                      >
                        Password
                      </label>
                      <Field
                        name="password"
                        type="password"
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-slate-700 leading-tight focus:shadow-outline"
                      />
                      {errors.password && touched.password ? (
                        <div>{errors.password}</div>
                      ) : null}

                      <button
                        className="bg-slate-600 w-full mt-5 p-2 text-white hover:bg-slate-800"
                        type="submit"
                      >
                        Create account
                      </button>
                    </div>
                  </Form>
                )}
              </Formik>
            </div>
          </div>
        </>
      </Layout>
    </>
  );
}
