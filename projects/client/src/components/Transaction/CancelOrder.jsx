import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  AlertDialogCloseButton,
  Badge,
  useDisclosure,
  Button,
  useToast,
} from "@chakra-ui/react";
import React from "react";
import jwt_decode from "jwt-decode";
import axios from "axios";
function CancelOrder({ transactionId }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = React.useRef();
  const toast = useToast();
  const userId = jwt_decode(localStorage.getItem("token")).id;
  const API_URL = process.env.REACT_APP_API_BASE_URL;
  const handleCancel = async () => {
    try {
      const response = await axios.post(
        `${API_URL}/transaction/cancel`,
        {
          userId: userId,
          transactionId: transactionId,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      toast({
        title: "Order has been cancelled",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      onClose();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Badge
        mt={"0.5"}
        _hover={{ bgColor: "white" }}
        onClick={onOpen}
        alignSelf={"center"}
        colorScheme="red"
        cursor={"pointer"}
      >
        Cancel
      </Badge>
      <AlertDialog
        motionPreset="slideInBottom"
        leastDestructiveRef={cancelRef}
        onClose={onClose}
        isOpen={isOpen}
        isCentered
      >
        <AlertDialogOverlay />

        <AlertDialogContent bg={"bgSecondary"} color={"white"}>
          <AlertDialogHeader bg={"primary"}>Cancel Order</AlertDialogHeader>
          <AlertDialogCloseButton />
          <AlertDialogBody>
            Are you sure you want to cancel this order?
          </AlertDialogBody>
          <AlertDialogFooter>
            <Button ref={cancelRef} onClick={onClose}>
              No
            </Button>
            <Button colorScheme="red" ml={3} onClick={handleCancel}>
              Yes
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}

export default CancelOrder;
