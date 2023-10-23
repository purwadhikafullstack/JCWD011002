import React, { useEffect, useState } from "react";
import { Flex, Box, Text } from "@chakra-ui/react";
import axios from "axios";
import { FaWarehouse } from "react-icons/fa";
import SeeDetail from "./SeeDetail";
import jwt_decode from "jwt-decode";

const Summary = () => {
  const API_URL = process.env.REACT_APP_API_BASE_URL;
  const [warehouse, setWarehouse] = useState([]);
  const [wh, setWh] = useState(null);
  const [idUser, setIdUser] = useState(null);

  const fetchData = async () => {
    try {
      const response = await axios.get(`${API_URL}/report/stock/summary`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setWarehouse(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchWHAdmin = async () => {
    try {
      const response = await axios.get(`${API_URL}/admin/roles/warehouse`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setIdUser(response.data.data.id_user);
      setWh(response.data.data);
    } catch (error) {}
  };

  useEffect(() => {
    fetchData();
    fetchWHAdmin();
  }, []);

  const filteredWarehouses = warehouse.filter((item) => {
    if (wh.id_warehouse === null) {
      return true;
    }
    return item.warehouse_name === wh.warehouse_name;
  });

  return (
    <>
      <Flex direction={"column"} gap={2} mr={2}>
        {filteredWarehouses?.map((item) => (
          <Flex
            key={item.id}
            w={"79vw"}
            p={"15px"}
            bg="bgSecondary"
            borderRadius="lg"
            boxShadow="sm"
            justifyContent={"space-between"}
            alignItems={"center"}
          >
            <Flex justifyContent={"flex-start"}>
              <Box
                display={"flex"}
                justifyContent={"center"}
                alignItems={"center"}
                bg={"#34638A"}
                h={"60px"}
                w={"60px"}
                borderRadius={"full"}
              >
                <FaWarehouse size={"22px"} />
              </Box>
              <Flex
                justifyContent={"center"}
                color={"white"}
                direction={"column"}
              >
                <Text
                  ml={4}
                  fontSize={"lg"}
                  align={"right"}
                  fontWeight={"bold"}
                >
                  {item.warehouse_name}
                </Text>
              </Flex>
            </Flex>
            <Box>
              <SeeDetail
                warehouse_name={item.warehouse_name}
                month={item.data}
              />
            </Box>
          </Flex>
        ))}
      </Flex>
    </>
  );
};

export default Summary;
