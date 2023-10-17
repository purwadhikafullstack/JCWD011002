import { Button, Flex, useToast } from "@chakra-ui/react";
import InputTextCustom, { setAttr } from "../Custom/InputTextCustom";
import { FiUnlock } from "react-icons/fi";
import { useFormik } from "formik";
import { useState } from "react";
import { resetPassword } from "../../api/auth";
import { resetPasswordSchema } from "../../helpers/FormikSchema";

const container = {
  direction: "column",
  gap: { sm: "4px", md: "8px", lg: "16px" },
  w: "40vw",
};

const initialValues = {
  password: "",
  confirmPassword: "",
};

function getToken() {
  const url = window.location.href.split("/");
  return url.pop();
}

function FormResetPassword() {
  const [isLoading, setIsLoading] = useState(false);
  const toast = useToast();

  async function handleSubmit(values) {
    setIsLoading(true);
    const attributes = { ...values };
    delete attributes["confirmPassword"];
    await resetPassword(toast, getToken(), attributes);
    setIsLoading(false);
  }

  const formik = useFormik({
    initialValues,
    validationSchema: resetPasswordSchema,
    onSubmit: (values) => handleSubmit(values),
  });

  const passwordAttr = setAttr(
    "password",
    "password",
    "Password",
    <FiUnlock />,
    formik
  );
  const confirmPasswordAttr = setAttr(
    "confirmPassword",
    "password",
    "Confirm Password",
    <FiUnlock />,
    formik
  );

  const buttonAttr = {
    type: "submit",
    variant: "capsuleSuccess",
    mt: "8px",
    isLoading,
  };
  return (
    <form onSubmit={formik.handleSubmit}>
      <Flex {...container}>
        <InputTextCustom {...passwordAttr} />
        <InputTextCustom {...confirmPasswordAttr} />
        <Button {...buttonAttr}>Reset</Button>
      </Flex>
    </form>
  );
}

export default FormResetPassword;
