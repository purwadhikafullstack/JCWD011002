import React, { useEffect, useState } from "react";
import axios from "axios";
import { Divider, Flex, Text, useMediaQuery } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import toRupiah from "@develoka/angka-rupiah-js";
import { extendTheme } from "@chakra-ui/react";

const OrderSummary = ({ userId, cartLength }) => {
  const API_URL = process.env.REACT_APP_API_BASE_URL;
  const [total, setTotal] = useState(0);
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
    }, 1500);
    return () => clearInterval(intervalId);
  }, []);

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
      <Flex
        display={"flex"}
        direction={"column"}
        alignSelf={"flex-end"}
        bgColor={"bgSecondary"}
        color={"white"}
        px={6}
        py={6}
        w={isMd ? "100%" : "30vw"}
      >
        <Text fontWeight={"bold"} fontSize={isMd ? "lg" : "2xl"}>
          ORDER SUMMARY
        </Text>
        <Divider />
        <br />
        <Text fontSize={isMd ? "sm" : "md"}>
          Checkout ({cartLength} Product)
        </Text>
        <Text fontSize={isMd ? "sm" : "md"} fontWeight={"bold"}>
          Total: {toRupiah(total, { dot: ".", floatingPoint: 0 })}
        </Text>
        <br />
        <Link fontSize={isMd ? "sm" : "md"} to="/">
          Or continue shopping?
        </Link>
      </Flex>
    </>
  );
};

export default OrderSummary;
