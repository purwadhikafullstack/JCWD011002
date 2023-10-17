import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverBody,
  PopoverArrow,
  PopoverCloseButton,
  Text,
  Button,
  useToast,
} from "@chakra-ui/react";
const ClearAlert = ({ coba, userId }) => {
  const API_URL = process.env.REACT_APP_API_BASE_URL;
  const toast = useToast();
  const clearCart = async () => {
    try {
      const response = await axios.delete(`${API_URL}/order/${userId}`);
      coba();
      toast({
        title: "Cart Cleared!",
        status: "success",
      });
    } catch (error) {
      console.error("Error clearing cart:", error);
    }
  };
  return (
    <>
      <Popover  isLazy>
        <PopoverTrigger>
          <Button borderRadius={"none"} w={"full"} variant={"error"}>
            Clear
          </Button>
        </PopoverTrigger>
        <PopoverContent>
          <PopoverHeader
            bg={"textSecondary"}
            color={"primary"}
            fontWeight="bold"
          >
            Clear Cart
          </PopoverHeader>
          <PopoverArrow />
          <PopoverCloseButton />
          <PopoverBody bgColor={"textSecondary"} color={"primary"}>
            <Text fontWeight={"semibold"}>
              Are you sure want to clear your cart?
            </Text>
            <Button
              mt={2}
              mb={1}
              variant={"error"}
              size="sm"
              onClick={clearCart}
            >
              Clear
            </Button>
          </PopoverBody>
        </PopoverContent>
      </Popover>
    </>
  );
};

export default ClearAlert;
