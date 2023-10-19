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
import { extendTheme, useMediaQuery } from "@chakra-ui/react";

const SeeDetailTxn = ({ transactionId }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const API_URL = process.env.REACT_APP_API_BASE_URL;
  const userId = jwt_decode(localStorage.getItem("token")).id;
  const [datas, setDatas] = useState([]);
  const fetchDetail = async () => {
    try {
      const response = await axios.get(
        `${API_URL}/transaction/detail/${transactionId}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
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
  const breakpoints = {
    sm: "320px",
    md: "768px",
    lg: "960px",
    xl: "1200px",
    "2xl": "1536px",
  };

  const theme = extendTheme({ breakpoints });
  const [isMd] = useMediaQuery("(max-width: " + theme.breakpoints.md + ")");

  return (
    <>
      <Flex cursor={"pointer"} onClick={handleOpen} align={"center"}>
        <Text fontSize={isMd ? "sm" : "md"}>See Detail&nbsp;</Text>
        <BsBoxArrowInUpRight size={20} />
      </Flex>
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
                {datas.status === "Dibatalkan" ? (
                  <Badge alignSelf={"center"} colorScheme="red">
                    Dibatalkan
                  </Badge>
                ) : (
                  <Badge alignSelf={"center"} colorScheme="green">
                    {datas.status}
                  </Badge>
                )}
                <Flex mt={1} justifyContent={"space-between"}>
                  <Text>No. Transaction</Text>
                  <Text>MWECG2/ID/TXN{transactionId}</Text>
                </Flex>
                <Flex justifyContent={"space-between"}>
                  <Text>Date</Text>
                  <Text>{datas.created_at}</Text>
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
              {datas.transaction_products?.map((item) => (
                <Box
                  mt={1}
                  key={item.id_product}
                  bg={"bgSecondary"}
                  color={"white"}
                >
                  <Flex align={"center"} justifyContent={"space-between"}>
                    <Flex>
                      <Image w={"4rem"} src={`${API_URL}/${item.image}`} />
                      <Flex direction={"column"} justifyContent={"center"}>
                        <Text ml={3}>{item.name}</Text>
                        <Text ml={3} fontSize={"xs"}>
                          {item.qty} x {formatToRupiah(item.price)}
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
                  <Text>{datas.shipping_method}</Text>
                </Flex>
                <Flex>
                  <Text>Address&nbsp;&nbsp;:&nbsp;</Text>
                  <Text>{datas.shipping_address}</Text>
                </Flex>
              </Box>
              <Text bg={"#3D3D3D"} h={2}>
                <Divider />
              </Text>
              <Box mb={2} mt={2} color={"white"} bgColor={"bgSecondary"}>
                <Flex justifyContent={"space-between"}>
                  <Text>Payment Method</Text>
                  <Text>{datas.payment_method}</Text>
                </Flex>
                <Flex mb={1} justifyContent={"space-between"}>
                  <Text>Shipping Cost</Text>
                  <Text>{formatToRupiah(datas.shipping_cost)}</Text>
                </Flex>
                <Divider />
                <Flex mt={1} justifyContent={"space-between"}>
                  <Text>Total</Text>
                  <Text>{formatToRupiah(datas.total)}</Text>
                </Flex>
              </Box>
            </Flex>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default SeeDetailTxn;
