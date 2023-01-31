import { NewProductProps } from "@/types/product.type";
import { Field, Form } from "formik";
import React from "react";
import ErrorSpan from "../errorSpan";

export default function FormProduct({
  errors,
  touched,
  edit,
}: NewProductProps) {
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
          placeholder="Bread"
        />
        {errors.name && touched.name ? <ErrorSpan name={errors.name} /> : null}

        <label
          htmlFor="amount"
          className="block text-slate-700 text-sm font-bold mb-2"
        >
          Amount
        </label>
        <Field
          name="amount"
          type="number"
          className="shadow appearance-none border rounded w-full py-2 px-3 text-slate-700 leading-tight focus:shadow-outline"
          placeholder="3"
        />
        {errors.amount && touched.amount ? (
          <ErrorSpan name={errors.amount} />
        ) : null}

        <label
          htmlFor="price"
          className="block text-slate-700 text-sm font-bold mb-2"
        >
          Price
        </label>
        <Field
          name="price"
          type="number"
          className="shadow appearance-none border rounded w-full py-2 px-3 text-slate-700 leading-tight focus:shadow-outline"
          placeholder="13"
        />
        {errors.price && touched.price ? (
          <ErrorSpan name={errors.price} />
        ) : null}

        <input
          className="bg-slate-600 w-full mt-5 p-2 text-white hover:bg-slate-800"
          type="submit"
          value={edit ? "Edit Product" : "Create Product"}
        />
      </div>
    </Form>
  );
}
