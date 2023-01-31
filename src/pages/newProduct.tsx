import FormProduct from "@/components/product/formProduct";
import Layout from "@/components/layout";
import { productSchema } from "@/schemas/productSchema";
import { ProductType } from "@/types/product.type";
import { gql, useMutation, useQuery } from "@apollo/client";
import { Formik } from "formik";
import Route from "next/router";
import React from "react";
import Swal from "sweetalert2";
import { GET_ALL_PRODUCT } from "./product";

const MUTATION_NEW_PRODUCT = gql`
  mutation newProduct($input: productInput) {
    newProduct(input: $input) {
      name
      amount
      price
    }
  }
`;

export default function NewProduct() {
  const [newProduct] = useMutation(MUTATION_NEW_PRODUCT, {
    update(cache) {
      const { getAllProducts }: any = cache.readQuery({
        query: GET_ALL_PRODUCT,
      });
      cache.writeQuery({
        query: GET_ALL_PRODUCT,
        data: { getAllProducts: [...getAllProducts, newProduct] },
      });
    },
  });

  const createProduct = async (dataProduct: ProductType) => {
    try {
      await newProduct({
        variables: {
          input: dataProduct,
        },
      });
      Swal.fire({
        icon: "success",
        title: "Perfect",
        text: "Product created",
      });
      Route.push("/product");
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
        <h1 className="text-2xl text-slate-800 font-light">New Product</h1>
        <div className="flex justify-center mt-4">
          <div className="w-full max-w-sm">
            <Formik
              initialValues={{
                name: "",
                amount: 0,
                price: 0,
              }}
              validationSchema={productSchema}
              onSubmit={async (values, { resetForm }) => {
                createProduct(values);
                resetForm();
              }}
            >
              {({ errors, touched }) => (
                <FormProduct errors={errors} touched={touched} edit={false} />
              )}
            </Formik>
          </div>
        </div>
      </>
    </Layout>
  );
}
