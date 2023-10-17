import { Button, Flex, useToast, useDisclosure } from "@chakra-ui/react";
import { updateAdmin } from "../../../../api/admin";
import { useDispatch } from "react-redux";
import { setUserTrigger } from "../../../../storage/TriggerReducer";
import PopoverConfirmation from "./PopoverConfirmation";
import { FiEdit as IcEdit } from "react-icons/fi";

const buttonContainer = {
  direction: "column",
  w: "full",
  gap: "8px",
};

function DrawerBaseButtonGroup({ editToggle, user, onClose }) {
  const {
    isOpen: popIsOpen,
    onOpen: popOpen,
    onClose: popClose,
  } = useDisclosure();
  const toast = useToast();
  const dispatch = useDispatch();
  const { id, is_active } = user;

  async function handleActivation() {
    await updateAdmin(toast, id, { is_active: !is_active });
    onClose();
    dispatch(setUserTrigger());
  }

  const editButtonAttr = {
    variant: "edit",
    leftIcon: <IcEdit />,
    onClick: () => editToggle(true),
  };
  const activationButtonAttr = {
    variant: is_active ? "error" : "success",
    onClick: popOpen,
    children: is_active ? "Deactivate" : "Activate",
  };

  const confirmation = {
    trigger: <Button {...activationButtonAttr} />,
    confirm: handleActivation,
    isOpen: popIsOpen,
    onClose: popClose,
  };

  return (
    <Flex {...buttonContainer}>
      <Button {...editButtonAttr}>Edit</Button>
      <PopoverConfirmation {...confirmation} />
    </Flex>
  );
}

export default DrawerBaseButtonGroup;
