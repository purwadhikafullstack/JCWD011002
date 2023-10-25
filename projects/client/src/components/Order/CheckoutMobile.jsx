import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";
import {
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
  Divider,
} from "@chakra-ui/react";
import { AiOutlineCaretDown } from "react-icons/ai";
import jwt_decode from "jwt-decode";
import SelectAddress from "./SelectAddress";
import SelectShipping from "./SelectShipping";
import toRupiah from "@develoka/angka-rupiah-js";
import { useNavigate } from "react-router-dom";
import { extendTheme } from "@chakra-ui/react";

const CheckoutMobile = () => {
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

  // const emptyAddress = `{
  //   "name": "",
  //   "province": "",
  //   "city_name": "Please Add New Address!",
  //   "postal_code": "",
  //   "full_address": "Address Not Found"
  // }`;

  // const noDefault = `{
  //   "name": "",
  //   "province": "",
  //   "city_name": "Please Select Address!",
  //   "postal_code": "",
  //   "full_address": "No Default"
  // }`;

  // let add = localStorage.getItem("selectedAddress");
  // if (dataAddress.length === 0) {
  //   localStorage.setItem("selectedAddress", emptyAddress);
  // } else if (add === "undefined") {
  //   localStorage.setItem("selectedAddress", noDefault);
  // } else {
  //   localStorage.getItem("selectedAddress");
  // }

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
      <Flex direction={"column"} mb={"79px"} alignItems={"center"}>
        <Text fontSize={isMd ? "2xl" : "3xl"} mt={4} mb={4}>
          Checkout
        </Text>
        <Box mb={1} w={"100vw"} px={6} py={6} bgColor={"secondary"}>
          <SelectAddress />
        </Box>

        <Box w={"100vw"}>
          {cart.map((item) => (
            <>
              <Box px={5} bg={"bgSecondary"} color={"white"}>
                <Flex align={"center"} justifyContent={"space-between"}>
                  <Flex>
                    <Image
                      h={"50px"}
                      w={"50px"}
                      mt={1}
                      mb={1}
                      ml={1}
                      src={`${API_URL}/${item.image}`}
                      alt="iamge"
                    />
                    <Flex direction={"column"} justifyContent={"center"}>
                      <Text mt={1} fontSize={"sm"} fontWeight={"bold"} ml={3}>
                        {item.name.length > 18
                          ? `${item.name.slice(0, 30)}...`
                          : item.name}
                      </Text>
                      <Text ml={3} fontSize={"xs"}>
                        {item.quantity} x{" "}
                        {toRupiah(item.price, { dot: ".", floatingPoint: 0 })}
                      </Text>
                      <Text ml={3} fontSize={"xs"}>
                      </Text>
                      <Box ml={3} mb={1} mt={1}></Box>
                    </Flex>
                  </Flex>
                  <Flex direction={"column"}>
                    <Text mr={2} align={"right"} fontSize={"sm"}>
                      {toRupiah(item.subtotal, {
                        dot: ".",
                        floatingPoint: 0,
                      })}
                    </Text>
                  </Flex>
                </Flex>
              </Box>
            </>
          ))}
        </Box>
        <Flex mt={1} direction={"column"}>
          <Box
            px={6}
            py={6}
            color={"white"}
            w={"100vw"}
            bgColor="bgSecondary"
          >
            <Flex direction={"column"} justifyContent={"space-between"}>
              <SelectShipping />
              <Divider mb={2} mt={2} />
              <Box>
                <Select
                  size={"sm"}
                  bgColor={"#EDF2F7"}
                  color={"black"}
                  fontWeight={"bold"}
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
                  <Box align={"left"} fontSize={"sm"} key={selectedPayment.id}>
                    <Text mt={2}>{/* Payment: {selectedPayment.name} */}</Text>
                    Upload proof of payment on the transaction page
                  </Box>
                )}
              </Box>
            </Flex>
          </Box>
          <Box
            px={6}
            py={6}
            color={"white"}
            fontSize={"sm"}
            mt={1}
            w={"100vw"}
            bgColor="bgSecondary"
          >
            <Flex justifyContent={"space-between"}>
              <Text mt={1}>Subtotal Product:</Text>
              <Text>{toRupiah(total, { dot: ".", floatingPoint: 0 })}</Text>
            </Flex>
            <Flex justifyContent={"space-between"}>
              <Text mt={1}>Shipping Cost:</Text>
              <Text>{toRupiah(shipping, { dot: ".", floatingPoint: 0 })}</Text>
            </Flex>
            <Flex justifyContent={"space-between"}>
              <Text mt={1}>Tax:</Text>
              <Text>Rp0</Text>
            </Flex>
            <Flex justifyContent={"space-between"}>
              <Text fontWeight={"bold"} fontSize={"lg"} mt={4}>
                Grand Total:
              </Text>
              <Text fontWeight={"bold"} fontSize={"lg"} mt={4}>
                {toRupiah(grand, { dot: ".", floatingPoint: 0 })}
              </Text>
            </Flex>
          </Box>
        </Flex>
        <Flex direction={"column"}>
          <Box mt={1} w={"100vw"}></Box>
          <Box color={"#34638a"} mt={1} mb={8} bgColor="textSecondary">
            <Button
              onClick={onOpen}
              w={"100%"}
              h={"50px"}
              borderRadius={"none"}
              variant={"success"}
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
                fontSize={"md"}
              >
                Place Order?
              </AlertDialogHeader>
              <AlertDialogCloseButton />
              <AlertDialogBody fontSize={"sm"}>
                Are you sure you want to place an order? or explore more
                incredible items that could be yours today?
              </AlertDialogBody>
              <AlertDialogFooter>
                <Button size={"sm"} onClick={handleExplore}>
                  Explore
                </Button>
                <Button
                  size={"sm"}
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
    </>
  );
};

export default CheckoutMobile;
