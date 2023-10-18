import { Button, Flex, useToast } from "@chakra-ui/react";
import InputTextCustom, { setAttr } from "../Custom/InputTextCustom";
import { useFormik } from "formik";
import { FiMail } from "react-icons/fi";
import { registerSchema } from "../../helpers/FormikSchema";
import { useState } from "react";
import { forgotPassword } from "../../api/auth";

const container = {
  direction: "column",
  gap: "8px",
};

function FormForgotPassword({ onClose }) {
  const [isLoading, setIsLoading] = useState(false);
  const toast = useToast();
  const initialValues = {
    email: "",
  };

  async function handleSubmit(attributes) {
    setIsLoading(true);
    await forgotPassword(toast, attributes);
    setIsLoading(false);
    onClose();
  }

  const formik = useFormik({
    initialValues,
    validationSchema: registerSchema,
    onSubmit: (values) => handleSubmit(values),
  });

  const emailAttr = setAttr(
    "email",
    "email",
    "Email",
    <FiMail />,
    formik,
    "light"
  );
  const buttonAttr = {
    type: "submit",
    variant: "capsuleSuccess",
    isLoading,
  };

  return (
    <form onSubmit={formik.handleSubmit}>
      <Flex {...container}>
        <InputTextCustom {...emailAttr} />
        <Button {...buttonAttr}>Forgot Password</Button>
      </Flex>
    </form>
  );
}

export default FormForgotPassword;
