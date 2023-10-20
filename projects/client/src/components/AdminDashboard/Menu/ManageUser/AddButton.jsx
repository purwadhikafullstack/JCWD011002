import { Button, Flex, Text, useDisclosure } from "@chakra-ui/react";
import { FiPlus as IcAddUser } from "react-icons/fi";
import DrawerAddAdmin from "./DrawerAddAdmin";

const container = {
  gap: "4px",
};

function buttonChildren() {
  return (
    <Flex {...container}>
      <IcAddUser fontSize={"18px"} />
      <Text>Create Admin</Text>
    </Flex>
  );
}

function AddButton() {
  const { onOpen, isOpen, onClose } = useDisclosure();

  const addAttr = {
    children: buttonChildren(),
    variant: "edit",
    fontSize: "16px",
    w: "fit-content",
    px: "12px",
    onClick: onOpen,
  };

  const drawerAttr = { isOpen, onClose };
  return (
    <Flex>
      <Button {...addAttr} />
      <DrawerAddAdmin {...drawerAttr} />
    </Flex>
  );
}

export default AddButton;
