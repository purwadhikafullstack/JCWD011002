import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  Text,
  Image,
  Button,
  Box,
  Flex,
  useToast,
  Select,
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  AlertDialogCloseButton,
  useDisclosure,
  useMediaQuery,
} from "@chakra-ui/react";
import { AiOutlineCaretDown } from "react-icons/ai";
import jwt_decode from "jwt-decode";
import SelectAddress from "../components/Order/SelectAddress";
import SelectShipping from "../components/Order/SelectShipping";
import toRupiah from "@develoka/angka-rupiah-js";
import { useNavigate } from "react-router-dom";
import { extendTheme } from "@chakra-ui/react";
import CheckoutMobile from "../components/Order/CheckoutMobile";
import LoadingBar from "../components/Utility/LoadingBar";

const Checkout = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = React.useRef();
  const API_URL = process.env.REACT_APP_API_BASE_URL;
  const navigate = useNavigate();
  const toast = useToast();
  const token = localStorage.getItem("token");
  const userId = jwt_decode(token).id;
  const [cart, setCart] = useState([]);
  const [total, setTotal] = useState(0);
  const service = localStorage.getItem("service").toUpperCase();
  const myLatitude = localStorage.getItem("myLatitude");
  const myLongitude = localStorage.getItem("myLongitude");
  const [shipping, setShipping] = useState(
    parseInt(localStorage.getItem("shipping")) || 0
  );
  const grand = total + parseInt(shipping);
  const [payment, setPayment] = useState([]);
  const [selectedPayment, setSelectedPayment] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [dataAddress, setDataAddress] = useState([]);

  const handlePaymentMethodChange = (event) => {
    const selectedMethodId = event.target.value;
    const selectedMethod = payment.find(
      (method) => method.id === parseInt(selectedMethodId)
    );
    setSelectedPayment(selectedMethod);
  };

  const getShippingLS = () => {
    const updatedShipping = parseInt(localStorage.getItem("shipping")) || 0;
    setShipping(updatedShipping);
  };
  useEffect(() => {
    const intervalId = setInterval(getShippingLS, 200);
    return () => {
      clearInterval(intervalId);
    };
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        await fetchAddress();
        viewCart();
        getTotal();
        getPayment();
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  const fetchAddress = async () => {
    try {
      const response = await axios.get(`${API_URL}/address`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setDataAddress(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const viewCart = async () => {
    const response = await axios.get(`${API_URL}/order/cart/${userId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    setCart(response.data.data);
  };
  const getTotal = async () => {
    const response = await axios.get(`${API_URL}/order/${userId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    setTotal(response.data.data.total);
  };

  const emptyAddress = `{
    "name": "",
    "province": "",
    "city_name": "Please Add New Address!",
    "postal_code": "",
    "full_address": "Address Not Found"
  }`;

  const noDefault = `{
    "name": "",
    "province": "",
    "city_name": "Please Select Address!",
    "postal_code": "",
    "full_address": "No Default"
  }`;

  let add = localStorage.getItem("selectedAddress");
  if (dataAddress.length === 0) {
    localStorage.setItem("selectedAddress", emptyAddress);
  } else if (add === "undefined") {
    localStorage.setItem("selectedAddress", noDefault);
  } else {
    localStorage.getItem("selectedAddress");
  }

  const address = JSON.parse(localStorage.getItem("selectedAddress"));
  const { province, city_name, full_address, postal_code } = address;
  const formattedAddress = `${city_name}, ${province}, ${full_address}, ${postal_code}`;
  const checkout = async () => {
    setIsLoading(true);
    try {
      const response = await axios.post(
        `${API_URL}/transaction`,
        {
          userId: userId,
          payment: selectedPayment ? selectedPayment.id : null,
          shipping: service,
          total: grand,
          myLatitude,
          myLongitude,
          shipping_cost: shipping,
          shipping_address: formattedAddress,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      toast({
        title: "Thanks for your purchase!",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      setSelectedPayment(null);
      localStorage.setItem("shipping", 0);
      localStorage.setItem("service", "none");
      localStorage.setItem("selectedCourier", null);
      localStorage.removeItem("wh_city");
      setTotal(0);
      viewCart();
      navigate("/profile/transaction");
      setIsLoading(false);
    } catch (error) {
      toast({
        description: error.response.data.message,
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const handleCheckout = () => {
    const selectedCourier = localStorage.getItem("selectedCourier");
    if (selectedPayment === null) {
      if (!toast.isActive("payment")) {
        toast({
          id: "payment",
          description: "Please select a payment method",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      }
    } else if (selectedCourier === "null") {
      if (!toast.isActive("error-toast")) {
        toast({
          id: "error-toast",
          description: "Please select a courier service",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      }
      return;
    } else {
      checkout();
    }
  };

  const getPayment = async () => {
    const response = await axios.get(`${API_URL}/transaction/payments`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    setPayment(response.data.data);
  };

  const handleExplore = () => {
    navigate("/");
  };

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
      {isMd ? (
        <CheckoutMobile />
      ) : (
        <Flex mb={64} direction={"column"} alignItems={"center"}>
          <Text fontSize={"3xl"} mt={8} mb={4}>
            Checkout
          </Text>
          <Box mb={1} w={"100vw"} px={6} py={6} bgColor={"secondary"}>
            <SelectAddress />
          </Box>
          <TableContainer>
            <Table
              variant="unstyled"
              color={"white"}
              bgColor={"bgSecondary"}
              border={"1px solid gray"}
              w={"100vw"}
            >
              <Thead>
                <Tr>
                  <Th></Th>
                  <Th color={"white"}>Product</Th>
                  <Th color={"white"} textAlign={"center"}>
                    Price
                  </Th>
                  <Th color={"white"} textAlign={"center"}>
                    Quantity
                  </Th>
                  <Th color={"white"} textAlign={"center"}>
                    Subtotal
                  </Th>
                </Tr>
              </Thead>
              <Tbody>
                {cart.length === 0 ? (
                  <Tr>
                    <Td colSpan="6">
                      <Text>No Product in the Cart!</Text>
                    </Td>
                  </Tr>
                ) : (
                  cart.map((item) =>
                    item.quantity > 0 ? (
                      <Tr key={item.productId}>
                        <Td>
                          <Image w={"50px"} src={`${API_URL}/${item.image}`} />
                        </Td>
                        <Td>{item.name}</Td>
                        <Td textAlign={"center"}>
                          {toRupiah(item.price, { dot: ".", floatingPoint: 0 })}
                        </Td>
                        <Td textAlign={"center"}>{item.quantity}</Td>
                        <Td textAlign={"center"}>
                          {toRupiah(item.subtotal, {
                            dot: ".",
                            floatingPoint: 0,
                          })}
                        </Td>
                      </Tr>
                    ) : null
                  )
                )}
              </Tbody>
            </Table>
          </TableContainer>
          <Flex>
            <Box
              px={6}
              py={6}
              color={"white"}
              mt={1}
              // h={"15vh"}
              w={"70vw"}
              bgColor="bgSecondary"
            >
              <Flex justifyContent={"space-between"}>
                <SelectShipping />
                <Box align="right">
                  <Select
                    bgColor={"#EDF2F7"}
                    color={"black"}
                    fontWeight={"bold"}
                    w={"210px"}
                    icon={<AiOutlineCaretDown />}
                    placeholder="Payment Methods"
                    onChange={handlePaymentMethodChange}
                    value={selectedPayment ? selectedPayment.id : ""}
                  >
                    {payment.map((item) => (
                      <option key={item.id} value={item.id}>
                        {item.name}
                      </option>
                    ))}
                  </Select>
                  {selectedPayment && (
                    <Box key={selectedPayment.id}>
                      <Text align={"right"} mt={2}>
                        {/* Payment: {selectedPayment.name} */}
                      </Text>
                      Upload proof of payment <br /> on the transaction page
                    </Box>
                  )}
                </Box>
              </Flex>
            </Box>
            <Box
              px={6}
              py={6}
              color={"white"}
              borderLeft={"1px solid gray"}
              mt={1}
              w={"30vw"}
              bgColor="bgSecondary"
            >
              <Flex justifyContent={"space-between"}>
                <Text mt={1}>Subtotal Product:</Text>
                <Text>{toRupiah(total, { dot: ".", floatingPoint: 0 })}</Text>
              </Flex>
              <Flex justifyContent={"space-between"}>
                <Text mt={1}>Shipping Cost:</Text>
                <Text>
                  {toRupiah(shipping, { dot: ".", floatingPoint: 0 })}
                </Text>
              </Flex>
              <Flex justifyContent={"space-between"}>
                <Text mt={1}>Tax:</Text>
                <Text>Rp0</Text>
              </Flex>
              <Flex justifyContent={"space-between"}>
                <Text fontWeight={"bold"} fontSize={"xl"} mt={4}>
                  Grand Total:
                </Text>
                <Text fontWeight={"bold"} fontSize={"xl"} mt={4}>
                  {toRupiah(grand, { dot: ".", floatingPoint: 0 })}
                </Text>
              </Flex>
            </Box>
          </Flex>
          <Flex>
            <Box mt={1} w={"70vw"}></Box>
            <Box
              color={"#34638a"}
              mt={1}
              mb={8}
              w={"30vw"}
              bgColor="textSecondary"
            >
              <Button
                onClick={onOpen}
                w={"100%"}
                h={"50px"}
                borderRadius={"none"}
                variant={"success"}
                // isLoading={isLoading}
              >
                Place Order
              </Button>
            </Box>
          </Flex>
          <>
            <AlertDialog
              motionPreset="slideInBottom"
              leastDestructiveRef={cancelRef}
              onClose={onClose}
              isOpen={isOpen}
              isCentered
            >
              <AlertDialogOverlay />

              <AlertDialogContent bg={"bgSecondary"} color={"white"}>
                <AlertDialogHeader
                  bg={"primary"}
                  border={"none"}
                  color={"white"}
                >
                  Place Order?
                </AlertDialogHeader>
                <AlertDialogCloseButton />
                <AlertDialogBody>
                  Are you sure you want to place an order? or explore more
                  incredible items that could be yours today?
                </AlertDialogBody>
                <AlertDialogFooter>
                  <Button onClick={handleExplore}>Explore</Button>
                  <Button
                    ml={2}
                    isLoading={isLoading}
                    onClick={handleCheckout}
                    colorScheme="green"
                  >
                    Place Order
                  </Button>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </>
        </Flex>
      )}
      {isLoading && <LoadingBar />}
    </>
  );
};

export default Checkout;
