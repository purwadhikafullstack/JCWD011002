import React, { useEffect, useState } from "react";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  Flex,
  Image,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Box,
  Button,
  Modal,
  Text,
  Input,
  Divider,
  InputGroup,
  InputRightAddon,
  TableCaption,
  Tooltip,
} from "@chakra-ui/react";
import axios from "axios";
import Pagination from "../../Pagination";
import FilterBy from "../../FilterBy";
import OrderBy from "./OrderBy";
import toRupiah from "@develoka/angka-rupiah-js";
import ModalDetail from "./ModalDetail";
import { Search2Icon } from "@chakra-ui/icons";

const Product = () => {
  const [product, setProduct] = useState([]);
  const [filterByMonth, setFilterByMonth] = useState("");
  const [filterByYear, setFilterByYear] = useState("");
  const [orderBy, setOrderBy] = useState("month_year DESC");
  const [currentPage, setCurrentPage] = useState(1);
  const [warehouseId, setWarehouseId] = useState(0);
  const [productId, setProductId] = useState("");
  const [month, setMonth] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const itemsPerPage = 10;
  const API_URL = process.env.REACT_APP_API_BASE_URL;

  const fetchWHAdmin = async () => {
    try {
      const response = await axios.get(`${API_URL}/admin/roles/warehouse`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      if (response.data.data.id_warehouse > 0) {
        setWarehouseId(response.data.data.id_warehouse);
      } else {
        setWarehouseId(0);
      }
    } catch (error) {}
  };

  useEffect(() => {
    fetchWHAdmin();
  }, []);

  const fetchSales = async () => {
    try {
      setMonth([]);
      const response = await axios.get(
        `${API_URL}/report/sales/product/permonth`,
        {
          params: {
            orderBy,
            filterByMonth,
            filterByYear,
            warehouseId,
          },
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setMonth(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchSales();
  }, [filterByMonth, filterByYear, orderBy, warehouseId]);

  const totalItems = month
    .map((item) =>
      item.month_sales.filter((monthSale) =>
        monthSale.product_name.toLowerCase().includes(searchQuery.toLowerCase())
      )
    )
    .flat().length;

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  function getMonthName(month) {
    const monthNames = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    return monthNames[month - 1] || "";
  }

  function sliceProductName(productName, maxChar) {
    return productName.length > maxChar
      ? productName.slice(0, maxChar) + "..."
      : productName;
  }

  return (
    <>
      <Flex>
        <FilterBy
          filterByMonth={filterByMonth}
          setFilterByMonth={setFilterByMonth}
          filterByYear={filterByYear}
          setFilterByYear={setFilterByYear}
        />
        <OrderBy
          orderBy={orderBy}
          setOrderBy={setOrderBy}
          warehouseId={warehouseId}
          setWarehouseId={setWarehouseId}
          productId={productId}
          setProductId={setProductId}
        />
      </Flex>
      <Accordion mt={3} allowToggle>
        {month.map((item) => (
          <AccordionItem borderRadius={"10px"} key={item.month_id}>
            <h2>
              <AccordionButton
                borderTopRadius={"10px"}
                _expanded={{ bg: "#34638A", color: "white" }}
              >
                <Box as="span" flex="1" textAlign="left">
                  {getMonthName(item.month)} {item.year}
                  {" => "}
                  {toRupiah(item.total_sales_monthly, {
                    dot: ".",
                    floatingPoint: 0,
                  })}
                </Box>
                <AccordionIcon />
              </AccordionButton>
            </h2>
            <AccordionPanel bg={"#393939"} pb={4}>
              <Flex
                gap={4}
                mb={3}
                alignItems={"center"}
                justifyContent={"center"}
              >
                <InputGroup size="sm">
                  <Input
                    mt={2}
                    w={"20vw"}
                    size={"sm"}
                    type={"text"}
                    color={"black"}
                    bg={"white"}
                    value={searchQuery}
                    placeholder="Search Product"
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                  <InputRightAddon
                    mt={2}
                    color={"primary"}
                    children={<Search2Icon />}
                  />
                </InputGroup>
                <Divider w={"230%"} mt={2} />
                <Pagination
                  totalItems={totalItems}
                  itemsPerPage={itemsPerPage}
                  onPageChange={handlePageChange}
                  currentPage={currentPage}
                />
              </Flex>
              <TableContainer>
                <Table
                  size={"xs"}
                  variant="striped"
                  bgColor={"bgSecondary"}
                  colorScheme="whiteAlpha"
                >
                  <TableCaption
                    fontStyle={"italic"}
                    fontSize={"sm"}
                    color={"white"}
                  >
                    Click Detail to see details of each warehouse
                  </TableCaption>
                  {item.month_sales
                    .filter((monthSale) =>
                      monthSale.product_name
                        .toLowerCase()
                        .includes(searchQuery.toLowerCase())
                    )
                    .slice(
                      (currentPage - 1) * itemsPerPage,
                      currentPage * itemsPerPage
                    ).length === 0 ? (
                    <Tbody>
                      <Tr>
                        <Td textAlign={"center"} colSpan={5}>
                          No Data
                        </Td>
                      </Tr>
                    </Tbody>
                  ) : (
                    <Tbody>
                      {item.month_sales
                        .filter((monthSale) =>
                          monthSale.product_name
                            .toLowerCase()
                            .includes(searchQuery.toLowerCase())
                        )
                        .slice(
                          (currentPage - 1) * itemsPerPage,
                          currentPage * itemsPerPage
                        )
                        .map((monthSale) => (
                          <Tr key={monthSale.product_id}>
                            <Td w={"3vw"}>
                              <Image
                                w={"35px"}
                                src={`${API_URL}/${monthSale.image}`}
                                alt={monthSale.product_name}
                              />
                            </Td>
                            <Tooltip
                              bg={"white"}
                              color={"black"}
                              label={monthSale.product_name}
                            >
                              <Td w={"50vw"}>
                                {sliceProductName(monthSale.product_name, 85)}
                              </Td>
                            </Tooltip>
                            <Td w={"10vw"}>
                              <Text fontSize={"2xs"}>ALL QTY SOLD:</Text>
                              <Text>{monthSale.total_qty_sold_product}</Text>
                            </Td>
                            <Td w={"10vw"}>
                              <Text fontSize={"2xs"}>ALL TOTAL SALES:</Text>
                              <Text>
                                {toRupiah(monthSale.total_sales_product, {
                                  dot: ".",
                                  floatingPoint: 0,
                                })}
                              </Text>
                            </Td>
                            <Td textAlign="right">
                              <ModalDetail
                                detail_product_sales={
                                  monthSale.detail_product_sales
                                }
                                product_name={monthSale.product_name}
                              />
                            </Td>
                          </Tr>
                        ))}
                    </Tbody>
                  )}
                </Table>
              </TableContainer>
            </AccordionPanel>
          </AccordionItem>
        ))}
      </Accordion>
    </>
  );
};

export default Product;
