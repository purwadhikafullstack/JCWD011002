import React from "react";
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  AlertDialogCloseButton,
  MenuItem,
  Text,
  Button,
  useDisclosure,
} from "@chakra-ui/react";
import { RiLogoutCircleLine } from "react-icons/ri";
import { useNavigate } from "react-router-dom";

const LogoutAlert = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = React.useRef();

  const handleLogout = () => {
    localStorage.removeItem("token");
    document.location.href = "/";
  };

  return (
    <>
      {/* <Button onClick={onOpen}>Discard</Button> */}
      <MenuItem bgColor={"bgSecondary"} color={"white"} onClick={onOpen}>
        <RiLogoutCircleLine size={20} />
        <Text mt={0.5}>&nbsp;Log Out</Text>
      </MenuItem>
      <AlertDialog
        motionPreset="slideInBottom"
        leastDestructiveRef={cancelRef}
        onClose={onClose}
        isOpen={isOpen}
        isCentered
      >
        <AlertDialogOverlay />

        <AlertDialogContent bg={"bgSecondary"} color={"white"}>
          <AlertDialogHeader bg={"primary"}>Log Out?</AlertDialogHeader>
          <AlertDialogCloseButton />
          <AlertDialogBody>Are you sure you want to log out?</AlertDialogBody>
          <AlertDialogFooter>
            <Button ref={cancelRef} onClick={onClose}>
              No
            </Button>
            <Button onClick={handleLogout} colorScheme="red" ml={3}>
              Yes
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};
export default LogoutAlert;
