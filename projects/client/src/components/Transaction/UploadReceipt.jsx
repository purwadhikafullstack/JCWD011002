import React, { useEffect, useState } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  FormControl,
  Input,
  useToast,
  Text,
  Flex,
} from "@chakra-ui/react";
import axios from "axios";
import jwt_decode from "jwt-decode";
import { LuCopy } from "react-icons/lu";

const UploadReceipt = ({ isOpen, onClose, onSave, txnid }) => {
  const [receipt, setReceipt] = useState(null);
  const [payment, setPayment] = useState("");
  const [identifier, setIdentifier] = useState("");
  const toast = useToast();
  const userId = jwt_decode(localStorage.getItem("token")).id;
  const API_URL = process.env.REACT_APP_API_BASE_URL;

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    setReceipt(file);
  };

  const handleSave = async () => {
    if (!receipt) {
      console.log("No image selected.");
      return;
    }

    const headers = {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
      "Content-Type": "multipart/form-data",
    };

    const formData = new FormData();
    formData.append("receipt", receipt);

    try {
      await axios.post(`${API_URL}/transaction/receipt/${txnid}`, formData, {
        headers,
      });
      toast({
        title: "Successfully upload receipt!",
        status: "success",
        duration: 4000,
        isClosable: true,
      });
      onSave(receipt);
      onClose();
    } catch (error) {
      toast({
        title: "Error upload receipt!",
        description: error.response.data.message,
        status: "error",
        duration: 4000,
        isClosable: true,
      });
      console.log("Error upload receipt:", error);
    }
  };

  const fetchPayment = async () => {
    try {
      const response = await axios.post(`${API_URL}/transaction/${userId}`, {
        transactionId: txnid,
      });
      setPayment(response.data.data.payment_method);
      setIdentifier(response.data.data.identifier);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchPayment();
  }, []);

  const initoast = () => {
    toast({
      title: "Copied!",
      status: "success",
      duration: 1000,
      isClosable: true,
    });
  };

  return (
    <Modal
      isCentered
      isOpen={isOpen}
      onClose={onClose}
      blockScrollOnMount={false}
    >
      <ModalOverlay />
      <ModalContent bg={"bgSecondary"} color={"white"}>
        <ModalHeader bg={"primary"}>Upload Receipt</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <FormControl>
            <Text mb={2} fontSize="sm">
              MWECG2/ID/TXN{txnid}
            </Text>
            <Text fontSize="sm">Payment Method: {payment}</Text>
            <Text mb={2} fontSize="xs">
              1. Open your mobile banking app <br /> 2. Select the m-Transfer{" "}
              <br />
              3. Enter the destination account number is:
              <Flex align={"center"}>
                <Text fontSize={"md"} mt={2} mb={2} fontWeight={"bold"}>
                  &nbsp;&nbsp;&nbsp;{identifier}&nbsp;
                </Text>
                <LuCopy
                  size={18}
                  cursor={"pointer"}
                  onClick={() => {
                    navigator.clipboard.writeText(identifier);
                    initoast();
                  }}
                />
                <Text fontSize={"11px"} ml={2}>
                  | PT. PURWADHIKA JAYAJAYAJAYA
                </Text>
              </Flex>
              4. Input amount of the transfer <br /> 5. Make sure the recipient
              name is correct <br /> 6. Confirm the transfer <br /> 7. Upload
              receipt here
            </Text>
            <Input
              mt={2}
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
            />
          </FormControl>
          {receipt && (
            <img
              src={URL.createObjectURL(receipt)}
              alt="Profile"
              style={{ maxWidth: "100%", marginTop: "1rem" }}
            />
          )}
        </ModalBody>
        <ModalFooter>
          <Button
            color={"white"}
            _hover={{ color: "black", bg: "white" }}
            variant="ghost"
            mr={3}
            onClick={onClose}
          >
            Cancel
          </Button>
          <Button variant={"success"} onClick={handleSave} disabled={!receipt}>
            Submit
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default UploadReceipt;
