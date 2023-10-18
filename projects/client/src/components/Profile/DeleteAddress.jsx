import React, { useRef } from "react";
import { BsTrash3 } from "react-icons/bs";
import axios from "axios";
import {
  Button,
  AlertDialog,
  AlertDialogOverlay,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogBody,
  AlertDialogFooter,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";

function DeleteAddress({ addressData, fetchAddressUser }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = useRef();
  const toast = useToast();
  const handleDelete = async () => {
    const headers = {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`
      },
    }
    try {
      const response = await axios.delete(
        `${process.env.REACT_APP_API_BASE_URL}/address/${addressData.id}`, headers);
      if (response.status === 200) {
        onClose();
        toast({
          title: "Address Deleted",
          description: "The address has been successfully deleted.",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
        fetchAddressUser();
      } else {
        console.error("Failed to delete address");
      }
    } catch (error) {
      console.error("Error deleting address:", error);
    }
  };

  return (
    <>
      <BsTrash3 onClick={onOpen} size={25} cursor={"pointer"} color={"red"} />
      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent bg={"darkBlue"} color={"white"}>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Delete Address
            </AlertDialogHeader>

            <AlertDialogBody>
              Are you sure? You can't undo this action afterwards.
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onClose}>
                Cancel
              </Button>
              <Button colorScheme="red" onClick={handleDelete} ml={3}>
                Delete
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  );
}

export default DeleteAddress;
