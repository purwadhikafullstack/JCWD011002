import {
  Flex,
  Image,
  Divider,
  Text,
  AbsoluteCenter,
  Box,
  Spinner,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import axios from "axios";
import jwt_decode from "jwt-decode";
import toRupiah from "@develoka/angka-rupiah-js";

const CartHover = () => {
  const [cart, setCart] = useState([]);
  const [cartLength, setCartLength] = useState(0);
  const [total, setTotal] = useState(0);
  const API_URL = process.env.REACT_APP_API_BASE_URL;
  const userId = jwt_decode(localStorage.getItem("token")).id;
  const [showSpinner, setShowSpinner] = useState(true);

  const viewCart = async () => {
    try {
      const response = await axios.get(`${API_URL}/order/cart/${userId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setCart(response.data.data);
      setCartLength(response.data.data.length);
    } catch (error) {
      console.log(error);
    }
  };

  const getCartTotal = async () => {
    const response = await axios.get(`${API_URL}/order/${userId}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    setTotal(response.data.data.total);
  };
  useEffect(() => {
    const intervalId = setInterval(() => {
      getCartTotal();
      viewCart();
      setShowSpinner(false);
    }, 1500);
    return () => clearInterval(intervalId);
  }, []);

  return (
    <>
      {cartLength === 0 ? (
        <Box display={"flex"} justifyContent={"center"} w={"350px"}>
          {showSpinner ? <Spinner color="blue.500" /> : <Text>Cart Empty</Text>}
        </Box>
      ) : (
        <Flex justifyContent={"space-between"}>
          <Text fontSize={"sm"} fontWeight={"bold"}>
            {cartLength} Items
          </Text>
          <Text fontSize={"sm"} fontWeight={"bold"}>
            {toRupiah(total, { dot: ".", floatingPoint: 0 })}
          </Text>
        </Flex>
      )}
      {cartLength === 0 ? <></> : <Divider mt={1} />}
      {cart.map((item) => (
        <Flex justifyContent={"space-between"} alignItems="center">
          <Flex
            key={item.productId}
            mt={2}
            justifyContent={"space-between"}
            alignItems="center"
          >
            <Image width="50px" src={`${API_URL}/${item.image}`} />
            <Flex direction="column">
              <Text fontWeight={"bold"} fontSize={"sm"} ml={4}>
                {item.name.length > 30
                  ? `${item.name.slice(0, 30)}...`
                  : item.name}
              </Text>
              <Text fontSize={"xs"} ml={4}>
                {item.quantity} item
              </Text>
            </Flex>
          </Flex>
          <Text fontSize={"sm"} fontWeight={"bold"} ml={8}>
            {toRupiah(item.subtotal, { dot: ".", floatingPoint: 0 })}
          </Text>
        </Flex>
      ))}
    </>
  );
};

export default CartHover;
