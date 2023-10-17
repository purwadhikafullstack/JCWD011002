import { Button, useDisclosure } from "@chakra-ui/react";
import ModalPopup from "./ModalPopup";

function Login() {
  const { onOpen, onClose, isOpen } = useDisclosure();

  const modalPopupAttr = { isOpen, onClose };
  const buttonLoginAttr = {
    id: "btn-login-modal",
    variant: "success",
    onClick: onOpen,
  };

  return (
    <>
      <Button {...buttonLoginAttr}>Login</Button>
      <ModalPopup {...modalPopupAttr} />
    </>
  );
}

export default Login;
