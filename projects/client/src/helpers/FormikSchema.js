import * as Yup from "yup";

const email = Yup.string().email("Invalid Format").required("Required");
const name = Yup.string().required("Required");
const username = Yup.string()
  .min(8, "Min 8 characters")
  .matches(/^(\w|\\_)[\w\d\\_]{7,}$/, 'only "_" allowed')
  .required("Required");
const phone = Yup.string()
  .matches(/^08(\d{8,11})$/, "Invalid format")
  .required("Required");
const password = Yup.string()
  .min(8, "Min 8 characters")
  .matches(/[A-Z]+/, "Min 1 uppercase")
  .matches(/\d+/, "Min 1 number")
  .matches(/\W+/, "Min 1 special character")
  .required("Required");
const confirmPassword = Yup.string()
  .oneOf([Yup.ref("password"), null], "Password must be same")
  .required("Required");

const registerSchema = Yup.object().shape({
  email,
});

const registrationSchema = Yup.object().shape({
  name,
  username,
  phone,
  password,
  confirmPassword,
});

const changePasswordSchema = Yup.object().shape({
  password,
  confirmPassword
})
const resetPasswordSchema = Yup.object().shape({
  password,
  confirmPassword,
});

export { registerSchema, registrationSchema, resetPasswordSchema, changePasswordSchema };
