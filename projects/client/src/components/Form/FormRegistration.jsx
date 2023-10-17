import { Button, Flex, useToast } from "@chakra-ui/react";
import { FiUser, FiUnlock, FiPhone } from "react-icons/fi";
import InputTextCustom, { setAttr } from "../Custom/InputTextCustom";
import { useFormik } from "formik";
import { useState } from "react";
import { registrationSchema } from "../../helpers/FormikSchema";
import { registration } from "../../api/auth";

const container = {
  direction: "column",
  gap: { sm: "4px", md: "8px", lg: "16px" },
  w: "40vw",
};

const initialValues = {
  name: "",
  username: "",
  phone: "",
  password: "",
  confirmPassword: "",
};

function getToken() {
  const url = window.location.href.split("/");
  return url.pop();
}

function FormRegistration() {
  const [isLoading, setIsLoading] = useState(false);
  const toast = useToast();

  async function handleSubmit(values) {
    setIsLoading(true);
    const attributes = { ...values };
    delete attributes["confirmPassword"];
    await registration(toast, getToken(), attributes);
    setIsLoading(false);
  }

  const formik = useFormik({
    initialValues,
    validationSchema: registrationSchema,
    onSubmit: (values) => handleSubmit(values),
  });

  const nameAttr = setAttr("name", "text", "Name", <FiUser />, formik);
  const usernameAttr = setAttr(
    "username",
    "text",
    "Username",
    <FiUser />,
    formik
  );
  const phoneAttr = setAttr("phone", "tel", "Phone", <FiPhone />, formik);
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
        <InputTextCustom {...nameAttr} />
        <InputTextCustom {...usernameAttr} />
        <InputTextCustom {...phoneAttr} />
        <InputTextCustom {...passwordAttr} />
        <InputTextCustom {...confirmPasswordAttr} />
        <Button {...buttonAttr}>Register</Button>
      </Flex>
    </form>
  );
}

export default FormRegistration;
