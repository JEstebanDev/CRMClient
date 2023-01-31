import * as Yup from "yup";
export const productSchema = Yup.object().shape({
  name: Yup.string()
    .min(2, "Too Short!")
    .max(10, "Too Long!")
    .required("Required"),
  amount: Yup.number()
    .integer()
    .min(1, "Must be more than 0 amount")
    .required("Required"),
  price: Yup.number()
    .integer()
    .min(1, "Must be more than 0 USD")
    .required("Required"),
});
