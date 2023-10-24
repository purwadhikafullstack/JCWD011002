import React, { useState, useEffect } from "react";
import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuGroup,
  MenuDivider,
  Box,
  Spinner,
  Text,
  Button,
  Flex,
  useMediaQuery,
  Divider,
} from "@chakra-ui/react";
import { AiOutlineCaretDown } from "react-icons/ai";
import axios from "axios";
import CalcDistance from "./CalcDistance";
import toRupiah from "@develoka/angka-rupiah-js";
import { extendTheme } from "@chakra-ui/react";

const SelectShipping = () => {
  const API_URL = process.env.REACT_APP_API_BASE_URL;
  const [courierData, setCourierData] = useState([]);
  const [selectedService, setSelectedService] = useState(null);
  const [warehouseCityId, setWarehouseCityId] = useState(null);
  const [destinationCityId, setDestinationCityId] = useState(null);
  const warehouseCityName = localStorage.getItem("wh_city");
  const destinationCityName = localStorage.getItem("city_name");
  const [courier, setCourier] = useState(null);
  useEffect(() => {
    if (
      selectedService &&
      selectedService.cost &&
      selectedService.cost.length > 0
    ) {
      localStorage.setItem("shipping", selectedService.cost[0].value);
      localStorage.setItem("service", selectedService.code);
      localStorage.setItem("selectedCourier", JSON.stringify(selectedService));
    } else {
      console.log("Shipping information is not available.");
    }
    const selectedCourierJSON = localStorage.getItem("selectedCourier");

    if (selectedCourierJSON) {
      const selectedCourier = JSON.parse(selectedCourierJSON);
      setCourier(selectedCourier);
    }
  }, [selectedService]);
  const fetchShippingMethods = async (courier) => {
    try {
      const response = await axios.post(`${API_URL}/rajaongkir/cost`, {
        origin: warehouseCityId,
        destination: destinationCityId,
        weight: 1000,
        courier: courier,
      });
      if (response.data.rajaongkir.results) {
        return response.data.rajaongkir.results[0].costs.map((cost) => ({
          ...cost,
          code: courier,
        }));
      }
    } catch (error) {
      console.error(`Error fetching ${courier} courier data:`, error);
      return [];
    }
  };

  const fetchData = async () => {
    try {
      const response = await axios.get(`${API_URL}/rajaongkir/city`);

      const cities = response.data.rajaongkir.results;
      const warehouseCity = cities.find(
        (city) => city.city_name === warehouseCityName
      );
      const destinationCity = cities.find(
        (city) => city.city_name === destinationCityName
      );

      if (warehouseCity) {
        setWarehouseCityId(warehouseCity.city_id);
      } else {
        console.error("Warehouse city not found");
      }
      if (destinationCity) {
        setDestinationCityId(destinationCity.city_id);
      } else {
        console.error("Destination city not found");
      }
    } catch (error) {
      console.error("Error fetching city data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [warehouseCityName]);

  useEffect(() => {
    if (warehouseCityId && destinationCityId) {
      const fetchCourierData = async () => {
        const jneData = await fetchShippingMethods("jne");
        const posData = await fetchShippingMethods("pos");
        const tikiData = await fetchShippingMethods("tiki");
        const combinedData = [...jneData, ...posData, ...tikiData];

        setCourierData(combinedData);
      };

      fetchCourierData();
    }
  }, [warehouseCityId, destinationCityId]);

  const groupService = () => {
    const groupedServices = {};

    courierData.forEach((method) => {
      const courierCode = method.code;
      if (!groupedServices[courierCode]) {
        groupedServices[courierCode] = [];
      }
      groupedServices[courierCode].push(method);
    });
    return groupedServices;
  };

  const handleMenuItemSelect = (service) => {
    const selected = courierData.find((method) => method.service === service);
    setSelectedService(selected);
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
    <Flex direction={"column"}>
      <CalcDistance />
      <Menu>
        <MenuButton
          w={isMd ? "" : "225px"}
          size={isMd ? "sm" : "md"}
          as={Button}
          textAlign={"left"}
          borderRadius={isMd ? "2px" : "5px"}
          rightIcon={<AiOutlineCaretDown size={"20px"} />}
        >
          Shipping Methods
        </MenuButton>
        {Object.keys(groupService()).length === 0 ? (
          <MenuList display={"flex"} justifyContent={"center"} alignContent={"center"}>
            <Spinner mt={1} mb={1} size="md" color="black" />
          </MenuList>
        ) : (
          <MenuList>
            {Object.entries(groupService()).map(
              ([courier, methods], index, array) => (
                <React.Fragment key={courier}>
                  <MenuGroup
                    w={isMd ? "81vw" : ""}
                    color={"black"}
                    title={courier.toUpperCase()}
                  >
                    {methods.map((method) => (
                      <MenuItem
                        px={isMd ? 4 : 4}
                        py={isMd ? 1 : 1}
                        color={"black"}
                        fontSize={isMd ? "sm" : "md"}
                        key={method.service}
                        onClick={() => handleMenuItemSelect(method.service)}
                      >
                        {method.service} - {method.description}{" "}
                        {/* {method.cost[0].value} {method.cost[0].etd} */}
                      </MenuItem>
                    ))}
                  </MenuGroup>
                  {index !== array.length - 1 && <MenuDivider />}{" "}
                </React.Fragment>
              )
            )}
          </MenuList>
        )}
      </Menu>
      {isMd ? (
        <Flex
          justifyContent={"space-evenly"}
          fontSize={isMd ? "xs" : ""}
          mt={2}
        >
          {selectedService ? (
            <Flex alignItems={"center"} justifyContent={"space-between"}>
              <Text align fontSize={"md"} fontWeight={"bold"}>
                {selectedService.code.toUpperCase()}
              </Text>
              &nbsp;&nbsp;&nbsp;&nbsp;{"=>"}&nbsp;&nbsp;&nbsp;&nbsp;
              <Text>
                {selectedService.description}:{" "}
                {toRupiah(selectedService.cost[0].value, {
                  dot: ".",
                  floatingPoint: 0,
                })}
              </Text>
              &nbsp;&nbsp;&nbsp;{"=>"}&nbsp;&nbsp;&nbsp;
              <Text>{selectedService.cost[0].etd} Day Estd Delivery</Text>
            </Flex>
          ) : courier ? (
            <Flex alignItems={"center"} justifyContent={"space-between"}>
              <Text align fontSize={"md"} fontWeight={"bold"}>
                {courier.code.toUpperCase()}
              </Text>
              &nbsp;&nbsp;&nbsp;&nbsp;{"=>"}&nbsp;&nbsp;&nbsp;&nbsp;
              <Text>
                {courier.description}:{" "}
                {toRupiah(courier.cost[0].value, {
                  dot: ".",
                  floatingPoint: 0,
                })}
              </Text>
              &nbsp;&nbsp;&nbsp;{"=>"}&nbsp;&nbsp;&nbsp;
              <Text>{courier.cost[0].etd} Day Estd Delivery</Text>
            </Flex>
          ) : (
            <Text></Text>
          )}
        </Flex>
      ) : (
        <Box fontSize={isMd ? "sm" : ""} mt={2}>
          {selectedService ? (
            <>
              <Text fontWeight={"bold"}>
                {selectedService.code.toUpperCase()}
              </Text>
              <Text>
                {selectedService.description}:{" "}
                {toRupiah(selectedService.cost[0].value, {
                  dot: ".",
                  floatingPoint: 0,
                })}
              </Text>
              <Text mb={2}>
                {selectedService.cost[0].etd} Day Estimated Delivery
              </Text>
            </>
          ) : courier ? (
            <>
              <Text fontWeight={"bold"}>{courier.code.toUpperCase()}</Text>
              <Text>
                {courier.description}:{" "}
                {toRupiah(courier.cost[0].value, {
                  dot: ".",
                  floatingPoint: 0,
                })}
              </Text>{" "}
              <Text mb={2}>{courier.cost[0].etd} Day Estimated Delivery</Text>
            </>
          ) : (
            <Text></Text>
          )}
        </Box>
      )}
    </Flex>
  );
};

export default SelectShipping;
