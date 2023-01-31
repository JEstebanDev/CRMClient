import { FormikErrors, FormikTouched } from "formik";

export interface GetAllProductType {
  getAllProducts: Product[];
}

export interface Product {
  id: string;
  name: string;
  price: number;
  amount: number;
}

export interface ProductType {
  name: string;
  price: number;
  amount: number;
}
export interface DeleteProductType {
  data: Data;
}

export interface Data {
  deleteProductById: string;
}

export type NewProductProps = {
  errors: FormikErrors<{
    name: string;
    amount: number;
    price: number;
  }>;
  touched: FormikTouched<{
    name: string;
    amount: number;
    price: number;
  }>;
  edit: boolean;
};
