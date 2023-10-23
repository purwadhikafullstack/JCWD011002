import { Button, Flex, useToast, useDisclosure } from "@chakra-ui/react";
import { updateAdmin } from "../../../../api/admin";
import { useDispatch } from "react-redux";
import { setUserTrigger } from "../../../../storage/TriggerReducer";
import PopoverConfirmation from "../../../Utility/PopoverConfirmation";
import { FiEdit as IcEdit } from "react-icons/fi";
import { useState } from "react";
import LoadingBar from "../../../Utility/LoadingBar";

const buttonContainer = {
  direction: "column",
  w: "full",
  gap: "8px",
};

function DrawerBaseButtonGroup({ editToggle, user, onClose }) {
  const [isLoading, setIsLoading] = useState(false);
  const {
    isOpen: popIsOpen,
    onOpen: popOpen,
    onClose: popClose,
  } = useDisclosure();
  const toast = useToast();
  const dispatch = useDispatch();
  const { id, is_active } = user;

  async function handleActivation() {
    setIsLoading(true);
    await updateAdmin(toast, id, { is_active: !is_active });
    dispatch(setUserTrigger());
    setIsLoading(false);
    onClose();
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
    <>
      <Flex {...buttonContainer}>
        <Button {...editButtonAttr}>Edit</Button>
        <PopoverConfirmation {...confirmation} />
      </Flex>
      {isLoading && <LoadingBar />}
    </>
  );
}

export default DrawerBaseButtonGroup;
