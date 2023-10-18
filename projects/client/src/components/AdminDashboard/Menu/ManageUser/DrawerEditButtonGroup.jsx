import { FiSave as IcSave } from "react-icons/fi";
import { GiCancel as IcCancel } from "react-icons/gi";
import { Button, Flex, useDisclosure } from "@chakra-ui/react";
import PopoverConfirmation from "../../../Utility/PopoverConfirmation";

const buttonContainer = {
  direction: "column",
  w: "full",
  gap: "8px",
};

function DrawerEditButtonGroup({ editToggle }) {
  const {
    isOpen: popIsOpen,
    onOpen: popOpen,
    onClose: popClose,
  } = useDisclosure();

  const saveButtonAttr = {
    children: "Save",
    variant: "success",
    leftIcon: <IcSave />,
    onClick: popOpen,
  };
  const cancelButtonAttr = {
    children: "Cancel",
    variant: "error",
    leftIcon: <IcCancel />,
    onClick: () => editToggle(false),
  };

  const confirmation = {
    trigger: <Button {...saveButtonAttr} />,
    confirm: () => {
      document.getElementById("save-button").click();
      editToggle(false);
    },
    isOpen: popIsOpen,
    onClose: popClose,
  };

  return (
    <Flex {...buttonContainer}>
      <PopoverConfirmation {...confirmation} />
      <Button {...cancelButtonAttr} />
    </Flex>
  );
}

export default DrawerEditButtonGroup;
