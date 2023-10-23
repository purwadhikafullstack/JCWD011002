import {
  Box,
  Button,
  Flex,
  HStack,
  Image,
  Input,
  Text,
  useToast,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { DeleteIcon, ArrowBackIcon } from "@chakra-ui/icons";
import jwt_decode from "jwt-decode";
import toRupiah from "@develoka/angka-rupiah-js";
import { Link } from "react-router-dom";

const CartMobile = () => {
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

  return (
    <>
      <Box display={"flex"} direction={"row"} alignItems={"center"} ml={2}>
        <Link to={"/"}>
          <ArrowBackIcon cursor={"pointer"} />
        </Link>
        &nbsp;
        <Text mt={0.5}>Cart</Text>
      </Box>
      {cart.map((item) => (
        <>
          <Box ml={2} mr={2} mt={2} bg={"bgSecondary"} color={"white"}>
            <Flex align={"center"} justifyContent={"space-between"}>
              <Flex>
                <Image
                  w={"75px"}
                  mt={1}
                  ml={1}
                  src={`${API_URL}/${item.image}`}
                  alt="iamge"
                />
                <Flex direction={"column"} justifyContent={"center"}>
                  <Text mt={1} fontSize={"sm"} fontWeight={"bold"} ml={3}>
                    {item.name.length > 18
                      ? `${item.name.slice(0, 18)}...`
                      : item.name}
                  </Text>
                  <Text ml={3} fontSize={"xs"}>
                    {toRupiah(item.price, { dot: ".", floatingPoint: 0 })}
                  </Text>
                  <Text ml={3} fontSize={"xs"}>
                    {/* From: aaaaaaa */}
                  </Text>
                  <Box ml={3} mb={2} mt={1}>
                    <HStack textAlign={"center"} w="200px">
                      <Button
                        size={"xs"}
                        border={"1px solid #2D2D2D"}
                        borderRadius={"full"}
                        onClick={() =>
                          handleSetQuantity(item.productId, item.quantity - 1)
                        }
                      >
                        -
                      </Button>
                      <Input
                        w={"60px"}
                        h={"20px"}
                        fontSize={"xs"}
                        borderRadius={"full"}
                        textAlign={"center"}
                        type="number"
                        value={item.quantity}
                        onChange={(e) => {
                          const newQuantity = parseInt(e.target.value);
                          handleSetQuantity(item.productId, newQuantity);
                        }}
                      />
                      <Button
                        size={"xs"}
                        border={"1px solid #2D2D2D"}
                        borderRadius={"full"}
                        onClick={() =>
                          handleSetQuantity(item.productId, item.quantity + 1)
                        }
                      >
                        +
                      </Button>
                    </HStack>
                  </Box>
                </Flex>
              </Flex>
              <Flex direction={"column"}>
                <Text mr={2} align={"right"} fontSize={"sm"}>
                  {toRupiah(item.subtotal, {
                    dot: ".",
                    floatingPoint: 0,
                  })}
                </Text>
                {/* <Text align={"right"} fontWeight={"bold"} fontSize={"sm"}>
            aaaaaaaa
          </Text> */}
              </Flex>
              <Box
                display={"flex"}
                justifyContent={"center"}
                alignItems={"center"}
                bg={"#E53E3E"}
                minW={"2rem"}
                maxW={"2rem"}
                h={"5rem"}
                onClick={() => handleDelete(item.productId)}
              >
                <DeleteIcon />
              </Box>
            </Flex>
          </Box>
        </>
      ))}
    </>
  );
};

export default CartMobile;
