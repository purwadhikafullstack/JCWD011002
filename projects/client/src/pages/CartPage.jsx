import React, { useEffect, useState } from "react";
import axios from "axios";
import { DeleteIcon } from "@chakra-ui/icons";
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
  HStack,
  Input,
  Box,
  IconButton,
  Flex,
  useToast,
  useMediaQuery,
} from "@chakra-ui/react";
import OrderSummary from "../components/Order/OrderSummary";
import { Link } from "react-router-dom";
import ClearAlert from "../components/Order/ClearAlert";
import jwt_decode from "jwt-decode";
import toRupiah from "@develoka/angka-rupiah-js";
import { extendTheme } from "@chakra-ui/react";
import CartMobile from "../components/Order/CartMobile";

const CartPage = () => {
  const API_URL = process.env.REACT_APP_API_BASE_URL;
  const token = localStorage.getItem("token");
  const userId = jwt_decode(token).id;
  const toast = useToast();
  const [cart, setCart] = useState([]);
  const [cartLength, setCartLength] = useState(0);
  localStorage.setItem("service", "none");
  localStorage.setItem("selectedCourier", null);
  localStorage.setItem("shipping", 0);

  const viewCart = async () => {
    try {
      const response = await axios.get(`${API_URL}/order/cart/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setCart(response.data.data);
      setCartLength(response.data.data.length);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchDefault = async () => {
    try {
      const response = await axios.post(
        `${API_URL}/address/default`,
        {
          userId: userId,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      localStorage.setItem(
        "selectedAddress",
        JSON.stringify(response.data.data)
      );
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    viewCart();
    fetchDefault();
  }, []);

  const handleDelete = async (productId) => {
    try {
      const response = await axios.post(
        `${API_URL}/order/remove`,
        {
          userId: userId,
          productId: productId,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (response.status === 200) {
        viewCart();
        if (!toast.isActive("success")) {
          toast({
            id: "success",
            description: "Product removed!",
            status: "success",
            duration: 3000,
            isClosable: true,
          });
        }
      } else {
        console.error("Failed to delete from cart.");
      }
    } catch (error) {
      console.error("Error deleting from cart:", error);
    }
  };

  const handleSetQuantity = async (productId, newQuantity) => {
    try {
      const headers = {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      };

      if (newQuantity === 0) {
        await axios.post(
          `${API_URL}/order/remove`,
          {
            userId: userId,
            productId: productId,
          },
          {
            headers,
          }
        );
      } else {
        await axios.patch(
          `${API_URL}/order/set`,
          {
            userId: userId,
            productId: productId,
            quantity: newQuantity,
          },
          {
            headers,
          }
        );
      }
      viewCart();
    } catch (error) {
      if (!toast.isActive("error-toast")) {
        toast({
          id: "error-toast",
          description: error.response.data.message,
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      }
      console.error("Error updating item quantity:", error);
    }
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
      <Flex direction={isMd ? "column" : "row"} mt={4}>
        {isMd ? (
          <CartMobile />
        ) : (
          <TableContainer
            borderBottomRadius={"10px"}
            borderTopLeftRadius={"10px"}
            borderLeftRadius={"10px"}
          >
            <Text ml={2} fontSize={"3xl"} mt={4} mb={4}>
              SHOPPING CART
            </Text>
            <Table
              ml={2}
              mr={1}
              variant="simple"
              color={"white"}
              // w={"69vw"}
              bgColor="bgSecondary"
              w={"69vw"}
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
                  <Th p={0}>
                    <ClearAlert coba={viewCart} userId={userId} />
                  </Th>
                </Tr>
              </Thead>
              <Tbody>
                {cart.length === 0 ? (
                  <Tr>
                    <Td colSpan="6">
                      <Text>No Product in the Cart!</Text>
                      <Button
                        as={Link}
                        to={"/"}
                        mb={2}
                        mt={4}
                        variant={"success"}
                      >
                        Shop Now!
                      </Button>
                    </Td>
                  </Tr>
                ) : (
                  cart.map((item) =>
                    item.quantity > 0 ? (
                      <Tr key={item.productId}>
                        <Td textAlign={"center"}>
                          <Image
                            w={isMd ? "400px" : "50px"}
                            src={`${API_URL}/${item.image}`}
                          />
                        </Td>
                        <Td>{item.name}</Td>
                        <Td textAlign={"center"}>
                          {toRupiah(item.price, { dot: ".", floatingPoint: 0 })}
                        </Td>
                        <Td textAlign={"center"}>
                          <Box justifyContent={"center"} display={"flex"}>
                            <HStack textAlign={"center"} maxW="220px">
                              <Button
                                border={"1px solid #2D2D2D"}
                                borderRadius={"full"}
                                onClick={() =>
                                  handleSetQuantity(
                                    item.productId,
                                    item.quantity - 1
                                  )
                                }
                              >
                                -
                              </Button>
                              <Input
                                borderRadius={"full"}
                                textAlign={"center"}
                                type="number"
                                value={item.quantity}
                                onChange={(e) => {
                                  const newQuantity = parseInt(e.target.value);
                                  handleSetQuantity(
                                    item.productId,
                                    newQuantity
                                  );
                                }}
                              />
                              <Button
                                border={"1px solid #2D2D2D"}
                                borderRadius={"full"}
                                onClick={() =>
                                  handleSetQuantity(
                                    item.productId,
                                    item.quantity + 1
                                  )
                                }
                              >
                                +
                              </Button>
                            </HStack>
                          </Box>
                        </Td>
                        <Td textAlign={"center"}>
                          {toRupiah(item.subtotal, {
                            dot: ".",
                            floatingPoint: 0,
                          })}
                        </Td>
                        <Td textAlign={"center"}>
                          <IconButton
                            isRound={true}
                            variant="solid"
                            colorScheme="red"
                            aria-label="Delete"
                            fontSize="20px"
                            icon={<DeleteIcon />}
                            onClick={() => handleDelete(item.productId)}
                          />
                        </Td>
                      </Tr>
                    ) : null
                  )
                )}
              </Tbody>
            </Table>
          </TableContainer>
        )}
        <Box
          mt={isMd ? "1" : "77px"}
          ml={isMd ? "2" : "0"}
          w={isMd ? "96vw" : ""}
          mb={2}
        >
          <OrderSummary cartLength={cartLength} userId={userId} />
          {cart.length === 0 ? (
            <Button
              mt={1}
              as={Link}
              h={"50px"}
              display={"none"}
              to={"/checkout"}
              borderRadius={"none"}
              colorScheme="green"
            >
              Checkout
            </Button>
          ) : (
            <Button
              as={Link}
              mt={1}
              h={"50px"}
              w={"100%"}
              to={"/checkout"}
              borderRadius={"none"}
              colorScheme="green"
            >
              Checkout
            </Button>
          )}
        </Box>
      </Flex>
    </>
  );
};

export default CartPage;
