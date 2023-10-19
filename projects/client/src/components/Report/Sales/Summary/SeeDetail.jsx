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
  Flex,
  Box,
  Text,
  Badge,
  Divider,
  Image,
  useDisclosure,
  Popover,
} from "@chakra-ui/react";
import { TbListDetails } from "react-icons/tb";
import { LiaShippingFastSolid } from "react-icons/lia";
import axios from "axios";
import jwt_decode from "jwt-decode";
import toRupiah from "@develoka/angka-rupiah-js";
import { BsBoxArrowInUpRight } from "react-icons/bs";

const SeeDetail = ({ transactionId }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const API_URL = process.env.REACT_APP_API_BASE_URL;
  const [transaction, setTransaction] = useState(null);
  const [datas, setDatas] = useState([]);

  const fetchDetail = async () => {
    try {
      const response = await axios.get(`${API_URL}/report/sales`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setDatas(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchDetail();
  }, []);

  const handleOpen = (e) => {
    e.stopPropagation();
    onOpen();
  };

  useEffect(() => {
    const foundTransaction = datas.find(
      (item) => item.transactionId === transactionId
    );
    setTransaction(foundTransaction);
  }, [datas, transactionId]);

  function formatToRupiah(number) {
    if (typeof number !== "number") {
      return "Invalid input";
    }
    const rupiah = new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(number);

    return rupiah;
  }

  return (
    <>
      <Button onClick={handleOpen} size={"sm"} variant={"edit"}>
        Detail&nbsp;
        <BsBoxArrowInUpRight size={18} />
      </Button>
      <Modal
        isCentered
        size={"xl"}
        onClose={onClose}
        isOpen={isOpen}
        scrollBehavior="outside"
        motionPreset="slideInBottom"
      >
        <ModalOverlay />
        <ModalContent bg={"primary"}>
          <ModalHeader color={"white"}>Transaction Detail</ModalHeader>
          <ModalCloseButton />
          <ModalBody bgColor={"bgSecondary"}>
            <Flex fontSize={"sm"} direction={"column"}>
              <Box mb={2} mt={2} color={"white"} bgColor={"bgSecondary"}>
                <Flex mt={1} justifyContent={"space-between"}>
                  <Text>No. Transaction</Text>
                  <Text>MWECG2/ID/TXN{transactionId}</Text>
                </Flex>
              </Box>
              <Text bg={"#3D3D3D"} h={2}>
                <Divider />
              </Text>
              <Flex mt={2} color={"white"} align={"center"}>
                <TbListDetails size={20} />
                <Text fontSize={"sm"} fontWeight={"bold"}>
                  &nbsp;Product Detail
                </Text>
              </Flex>
              {transaction?.products.map((item) => (
                <Box
                  mt={2}
                  key={item.id_product}
                  bg={"bgSecondary"}
                  color={"white"}
                >
                  <Flex align={"center"} justifyContent={"space-between"}>
                    <Flex>
                      <Image w={"4rem"} src={item.image} />
                      <Flex direction={"column"} justifyContent={"center"}>
                        <Text bg={"#34638A"} p={0.5} ml={3}>
                          ({item.category}) {item.name}
                        </Text>
                        <Text ml={3} fontSize={"xs"}>
                          {item.qty} x {formatToRupiah(item.price)}
                        </Text>
                        <Text ml={3} fontSize={"xs"}>
                          From: {item.warehouse_name}
                        </Text>
                      </Flex>
                    </Flex>
                    <Flex direction={"column"}>
                      <Text align={"right"} fontSize={"sm"}>
                        Subtotal
                      </Text>
                      <Text align={"right"} fontWeight={"bold"} fontSize={"sm"}>
                        {formatToRupiah(item.qty * item.price)}
                      </Text>
                    </Flex>
                  </Flex>
                </Box>
              ))}
              <Text mt={3} bg={"#3D3D3D"} h={2}>
                <Divider />
              </Text>
              <Box mb={2} mt={2} color={"white"} bgColor={"bgSecondary"}>
                <Flex align={"center"}>
                  <LiaShippingFastSolid size={20} />
                  <Text fontSize={"sm"} fontWeight={"bold"}>
                    &nbsp;Shipping Information
                  </Text>
                </Flex>
                <Flex display={"flex"}>
                  <Text>Courier&nbsp;&nbsp;:&nbsp;</Text>
                  <Text>{transaction?.shipping_method}</Text>
                </Flex>
                <Flex>
                  <Text>Address&nbsp;&nbsp;:&nbsp;</Text>
                  <Text>{transaction?.shipping_address}</Text>
                </Flex>
              </Box>
              <Text bg={"#3D3D3D"} h={2}>
                <Divider />
              </Text>
              <Box mb={2} mt={2} color={"white"} bgColor={"bgSecondary"}>
                <Flex justifyContent={"space-between"}>
                  <Text>Payment Method</Text>
                  <Text>{transaction?.payment_method}</Text>
                </Flex>
                <Flex mb={1} justifyContent={"space-between"}>
                  <Text>Shipping Cost</Text>
                  <Text fontWeight={"bold"}>
                    {formatToRupiah(transaction?.shipping_cost)}
                  </Text>
                </Flex>
                <Divider />
                <Flex mt={1} justifyContent={"space-between"}>
                  <Text>Total</Text>
                  <Text fontWeight={"bold"}>
                    {formatToRupiah(transaction?.total)}
                  </Text>
                </Flex>
              </Box>
            </Flex>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default SeeDetail;
