import React from "react";
import { Form, Field } from "formik";
import ErrorSpan from "../errorSpan";
import { LoginProps } from "@/types/login.type";

export default function FormLogin({ errors, touched }: LoginProps) {
  return (
    <Form
      action=""
      className="bg-slate-200 rounded-3xl shadow-md px-8 pt-6 pb-8 mb-4"
    >
      <div>
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
          placeholder="example@jestebandev.com"
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
          placeholder="password"
        />
        {errors.password && touched.password ? (
          <ErrorSpan name={errors.password} />
        ) : null}

        <input
          className="bg-slate-600 w-full mt-5 p-2 text-white hover:bg-slate-800"
          type="submit"
          value="Login"
        />
      </div>
    </Form>
  );
}
