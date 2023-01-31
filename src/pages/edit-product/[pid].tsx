import FormProduct from "@/components/formProduct";
import Layout from "@/components/layout";
import { productSchema } from "@/schemas/productSchema";
import { ProductType } from "@/types/product.type";
import { gql, useMutation, useQuery } from "@apollo/client";
import { Formik } from "formik";
import { useRouter } from "next/router";
import React from "react";
import Swal from "sweetalert2";

const QUERY_GET_PRODUCT_ID = gql`
  query GetProductById($id: ID!) {
    getProductById(ID: $id) {
      id
      name
      amount
      price
    }
  }
`;

const MUTATION_UPDATE_PRODUCT = gql`
  mutation UpdateProduct($id: ID!, $input: productInput) {
    updateProduct(id: $id, input: $input) {
      id
      name
      amount
      price
    }
  }
`;

export default function EditProduct() {
  //getIdFromURL rename to id
  const router = useRouter();
  //getDataFromGraphQL with id value
  console.log(router.query);
  const { data }: any = useQuery(QUERY_GET_PRODUCT_ID, {
    variables: {
      id: router.query.pid,
    },
  });

  const [UpdateProduct] = useMutation(MUTATION_UPDATE_PRODUCT);

  const editProduct = async (dataProduct: ProductType) => {
    try {
      const { data } = await UpdateProduct({
        variables: {
          updateClientId: router.query.pid,
          input: dataProduct,
        },
      });
      console.log(data);
      Swal.fire({
        icon: "success",
        title: "Perfect",
        text: "Product modified",
      });
      // router.push("/product");
    } catch (error: any) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: error.message,
      });
    }
  };
  const loadData = () => {
    const { name, amount, price } = data.getProductById;
    return (
      <>
        <Formik
          initialValues={{
            name,
            amount,
            price,
          }}
          validationSchema={productSchema}
          onSubmit={async (values, { resetForm }) => {
            await editProduct(values);
            resetForm();
          }}
        >
          {({ errors, touched }) => (
            <FormProduct errors={errors} touched={touched} edit={true} />
          )}
        </Formik>
      </>
    );
  };

  return (
    <Layout>
      <>
        <h1 className="text-2xl text-slate-800 font-light">Edit Product</h1>
        <div className="flex justify-center mt-4">
          <div className="w-full max-w-sm">{data != null && loadData()}</div>
        </div>
      </>
    </Layout>
  );
}
