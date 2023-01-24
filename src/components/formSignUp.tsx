import React from "react";
import { Form, Field } from "formik";
import ErrorSpan from "./errorSpan";
import { FormProps } from "@/types/formProps.type";

export default function FormSignUp({ errors, touched }: FormProps) {
  return (
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
        {errors.name && touched.name ? <ErrorSpan name={errors.name} /> : null}

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
          <ErrorSpan name={errors.lastName} />
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
          <ErrorSpan name={errors.email} />
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
          <ErrorSpan name={errors.password} />
        ) : null}

        <button
          className="bg-slate-600 w-full mt-5 p-2 text-white hover:bg-slate-800"
          type="submit"
        >
          Create account
        </button>
      </div>
    </Form>
  );
}
