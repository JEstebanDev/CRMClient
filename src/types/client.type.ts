import { FormikErrors, FormikTouched } from "formik";

export interface GetAllClientType {
  getAllClients: Client[];
}

export interface Client {
  id: string;
  name: string;
  lastName: string;
  email: string;
  phone: string;
  company: string;
  seller: string;
}
export interface ClientType {
  name: string;
  lastName: string;
  phone: string;
  email: string;
  company: string;
}

export type NewClientProps = {
  errors: FormikErrors<{
    name: string;
    lastName: string;
    company: string;
    email: string;
    phone: string;
  }>;
  touched: FormikTouched<{
    name: string;
    lastName: string;
    company: string;
    email: string;
    phone: string;
  }>;
  edit: boolean;
};
