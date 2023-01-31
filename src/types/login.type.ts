import { FormikErrors, FormikTouched } from "formik";
export type LoginProps = {
  errors: FormikErrors<{
    email: string;
    password: string;
  }>;
  touched: FormikTouched<{
    email: string;
    password: string;
  }>;
};

export type LoginType = {
  email: string;
  password: string;
};
