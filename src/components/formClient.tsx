import { NewClientProps } from "@/types/client.type";
import { Form, Field } from "formik";
import React from "react";
import ErrorSpan from "./errorSpan";

export default function FormClient({ errors, touched, edit }: NewClientProps) {
  return (
    <Form
      action=""
      className="bg-slate-100 rounded-3xl shadow-md px-8 pt-6 pb-8 mb-4"
    >
      <div>
        <label
          htmlFor="name"
          className="block text-slate-700 text-sm font-bold mb-2"
        >
          Name
        </label>
        <Field
          name="name"
          type="text"
          className="shadow appearance-none border rounded w-full py-2 px-3 text-slate-700 leading-tight focus:shadow-outline"
          placeholder="Juan"
        />
        {errors.name && touched.name ? <ErrorSpan name={errors.name} /> : null}

        <label
          htmlFor="lastName"
          className="block text-slate-700 text-sm font-bold mb-2"
        >
          Last Name
        </label>
        <Field
          name="lastName"
          type="text"
          className="shadow appearance-none border rounded w-full py-2 px-3 text-slate-700 leading-tight focus:shadow-outline"
          placeholder="Esteban"
        />
        {errors.lastName && touched.lastName ? (
          <ErrorSpan name={errors.lastName} />
        ) : null}

        <label
          htmlFor="phone"
          className="block text-slate-700 text-sm font-bold mb-2"
        >
          Phone
        </label>
        <Field
          name="phone"
          type="phone"
          className="shadow appearance-none border rounded w-full py-2 px-3 text-slate-700 leading-tight focus:shadow-outline"
          placeholder="23123"
        />
        {errors.phone && touched.phone ? (
          <ErrorSpan name={errors.phone} />
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
          placeholder="example@jestebandev.com"
        />
        {errors.email && touched.email ? (
          <ErrorSpan name={errors.email} />
        ) : null}

        <label
          htmlFor="company"
          className="block text-slate-700 text-sm font-bold mb-2"
        >
          Company
        </label>

        <Field
          name="company"
          type="text"
          className="shadow appearance-none border rounded w-full py-2 px-3 text-slate-700 leading-tight focus:shadow-outline"
          placeholder="Company SAS"
        />
        {errors.company && touched.company ? (
          <ErrorSpan name={errors.company} />
        ) : null}

        <input
          className="bg-slate-600 w-full mt-5 p-2 text-white hover:bg-slate-800"
          type="submit"
          value={edit ? "Edit Client" : "Create Client"}
        />
      </div>
    </Form>
  );
}
