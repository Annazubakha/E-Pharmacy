import * as yup from "yup";

export const cartSchema = yup.object().shape({
  name: yup.string().required("Name is required."),
  email: yup
    .string()
    .matches(
      /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/,
      "Email is invalid."
    )
    .required("Email is required"),
  address: yup
    .string()
    .required("Address is required.")
    .min(7, "Address must be at least 7 characters."),
  phone: yup
    .string()
    .required("Phone is required.")
    .matches(/^\+?\d{12}$/, "Number format +380961234567"),
  paymentMethod: yup.string().required("Payment Method is required."),
  products: yup
    .array()
    .of(
      yup.object().shape({
        productId: yup.string().required(),
        quantity: yup.number().required().min(1),
      })
    )
    .required(),
  totalAmount: yup.number().required(),
});
