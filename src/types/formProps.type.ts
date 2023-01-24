import { FormikErrors, FormikTouched } from "formik";
export type FormProps = {
  errors: FormikErrors<{
    name: string;
    lastName: string;
    email: string;
    password: string;
  }>;
  touched: FormikTouched<{
    name: string;
    lastName: string;
    email: string;
    password: string;
  }>;
};
