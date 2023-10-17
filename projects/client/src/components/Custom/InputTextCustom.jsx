import {
  FormControl,
  FormErrorMessage,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  VStack,
} from "@chakra-ui/react";
import { useState } from "react";
import { FiEye, FiEyeOff } from "react-icons/fi";

const additionalAttr = {
  color: "textPrimary",
  bgColor: "primary",
};

function setAttr(id, type, placeholder, icon, formik) {
  return { id, type, placeholder, icon, formik };
}

function rightElement(id, type, showPass, setShowPass) {
  if (type !== "password") return;

  function onClick() {
    setShowPass(!showPass);
    if (!showPass) document.getElementById(id).type = "text";
    else document.getElementById(id).type = "password";
  }

  const attr = {
    cursor: "pointer",
    onClick,
  };

  return (
    <InputRightElement {...additionalAttr}>
      {showPass ? <FiEye {...attr} /> : <FiEyeOff {...attr} />}
    </InputRightElement>
  );
}

function InputTextCustom({ id, type, placeholder, icon, formik }) {
  const [showPass, setShowPass] = useState(false);

  function handleOnChange(event) {
    const { target } = event;
    formik.setFieldValue(id, target.value);
  }

  const formControlAttr = {
    isInvalid: formik.errors[id] && formik.touched[id],
  };
  const inputGroupAttr = {
    border: "1px solid",
    borderRadius: "3rem",
    overflow: "hidden",
    borderColor: formik.errors[id] ? "errorPrimary" : "primary",
  };
  const inputAttr = {
    id,
    type,
    placeholder,
    border: "none",
    pl: "3rem",
    onChange: (event) => handleOnChange(event),
  };
  const formErrorAttr = {
    mt: "-3px",
  };

  return (
    <FormControl {...formControlAttr}>
      <VStack>
        <InputGroup {...inputGroupAttr}>
          <InputLeftElement {...additionalAttr}>{icon}</InputLeftElement>
          <Input {...inputAttr} />
          {rightElement(id, type, showPass, setShowPass)}
        </InputGroup>
        <FormErrorMessage {...formErrorAttr}>
          {formik.errors[id]}
        </FormErrorMessage>
      </VStack>
    </FormControl>
  );
}

export default InputTextCustom;
export { setAttr };
