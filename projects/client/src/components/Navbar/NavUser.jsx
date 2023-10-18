import React, { useEffect, useState } from "react";
import {
  Box,
  Flex,
  Avatar,
  HStack,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  useDisclosure,
  Text,
  Image,
} from "@chakra-ui/react";
import { RiShoppingCartLine } from "react-icons/ri";
import { CgProfile } from "react-icons/cg";
import Login from "../Login";
import Searchbar from "./Searchbar";
import { useLocation, useNavigate } from "react-router-dom";
import "../../App.css";
import CartHover from "./CartHover";
import axios from "axios";
import jwt_decode from "jwt-decode";
import LogoutAlert from "./LogoutAlert";

export default function Simple() {
  const navigate = useNavigate();
  const location = useLocation();
  const profilePath = location.pathname === "/profile" || location.pathname === "/profile/address" || location.pathname === "/profile/transaction";
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isCartOpen, setCartOpen] = useState(false);

  const [cartLength, setCartLength] = useState(0);
  const API_URL = process.env.REACT_APP_API_BASE_URL;

  useEffect(() => {
    viewCart();
  });

  const token = localStorage.getItem("token");
  let userId = "";
  let role = "";
  if (token) {
    userId = jwt_decode(localStorage.getItem("token")).id;
    role = jwt_decode(localStorage.getItem("token")).role;
  }

  const viewCart = async () => {
    try {
      const response = await axios.get(`${API_URL}/order/cart/${userId}`);
      setCartLength(response.data.data.length);
    } catch (error) {
      console.log(error);
    }
  };

  const handleCartHover = () => {
    setCartOpen(true);
  };

  const handleCartLeave = () => {
    setCartOpen(false);
  };

  const isLogin = localStorage.getItem("token");

  return (
    <>
      <Box
        bg={"primary"}
        boxShadow={"lg"}
        px={4}
        pos={"fixed"}
        top={0}
        w={"full"}
        zIndex={100}
      >
        <Flex h={16} alignItems={"center"} justifyContent={"space-between"}>
          <HStack spacing={8} alignItems={"center"}>
            {profilePath ? (
              <Image src="/logo.png" h="36px" position={{ base: "absolute", md: "static" }} left={16} onClick={() => navigate("/")} />
            ) : (
              <Image src="/logo.png" h="36px" onClick={() => navigate("/")} />
            )}
          </HStack>
          {role === "user" && !profilePath && (
            <Searchbar />
          )}
          <Flex alignItems={"center"}>
            {isLogin ? (
              <>
                <Button
                  onClick={() => navigate("/cart")}
                  mr={4}
                  bg={"transparent"}
                  _hover={{ bg: "transparent" }}
                  onMouseEnter={handleCartHover}
                  onMouseLeave={handleCartLeave}
                >
                  {role === "user" ? (
                    <Box>
                      <div class="cart">
                        <span class="count">{cartLength}</span>
                        <i class="material-icons">
                          <RiShoppingCartLine />
                        </i>
                      </div>
                    </Box>
                  ) : (
                    <></>
                  )}
                </Button>
                <Menu>
                  <MenuButton
                    as={Button}
                    rounded={"full"}
                    variant={"link"}
                    cursor={"pointer"}
                    minW={0}
                  >
                    <Avatar size={"sm"} />
                  </MenuButton>
                  <MenuList
                    border={"0.5px solid gray"}
                    borderRadius={"none"}
                    bgColor={"bgSecondary"}
                    color={"white"}
                  >
                    <MenuItem
                      bgColor={"bgSecondary"}
                      color={"white"}
                      onClick={() => navigate("/profile")}
                    >
                      <CgProfile size={20} />
                      <Text mt={0.5}>&nbsp;Profile</Text>
                    </MenuItem>
                    <MenuDivider />
                    <LogoutAlert />
                  </MenuList>
                </Menu>
              </>
            ) : (
              <Login />
            )}
          </Flex>
        </Flex>

        {isCartOpen && (
          <Box
            display={role === "user" ? "block" : "none"}
            position="absolute"
            border={"0.5px solid gray"}
            top="50"
            right="0"
            bg="bgSecondary"
            color={"white"}
            boxShadow="lg"
            p={4}
            zIndex={999}
            onMouseEnter={handleCartHover}
            onMouseLeave={handleCartLeave}
          >
            <CartHover />
          </Box>
        )}
      </Box>
    </>
  );
}
