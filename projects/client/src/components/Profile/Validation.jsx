import React from "react";
import * as Yup from "yup";
const passwordValidationSchema = Yup.object().shape({
  current_password: Yup.string()
    .required('Current Password is required'),

  new_password: Yup.string()
    .min(8, 'Password must be at least 8 characters long')
    .matches(
      /^(?=.*[A-Z])(?=.*[!@#$%^&*])(?=.*[0-9])/,
      'Password must contain at least one uppercase letter, symbol and number'
    )
    .required('New Password is required'),

  confirm_password: Yup.string()
    .oneOf([Yup.ref('new_password'), null], 'Passwords not match')
    .required('Confirm Password is required'),
});

const updateProfileSchema = Yup.object().shape({
  name: Yup.string()
    .min(3, 'Min 3 characters'),

  username: Yup.string()
    .min(8, 'Min 8 characters'),

  phone: Yup.string()
    .matches(/^08(\d{8,11})$/, "Invalid format")
    .min(11, "Min 11 characters"),

  email: Yup.string()
    .email("Invalid Format")

})

export { passwordValidationSchema, updateProfileSchema };