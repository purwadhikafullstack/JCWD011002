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
  const [warehouseId, setWarehouseId] = useState("");
  const [productId, setProductId] = useState("");
  const [month, setMonth] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [itemsPerPage, setItemsPerPage] = useState(10);

  const API_URL = process.env.REACT_APP_API_BASE_URL;

  const fetchSales = async () => {
    try {
      setMonth([]);
      const response = await axios.get(
        `${API_URL}/report/sales/product/permonth`,
        {
          params: {
            page: currentPage,
            pageSize: 10000,
            orderBy,
            filterByMonth,
            filterByYear,
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
  }, [filterByMonth, filterByYear, orderBy, currentPage]);

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
                    w={"15vw"}
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
                    children=<Search2Icon />
                  />
                </InputGroup>
                <Divider w={"250%"} mt={2} />
                <Pagination
                  totalItems={
                    item.month_sales.filter((monthSale) =>
                      monthSale.product_name
                        .toLowerCase()
                        .includes(searchQuery.toLowerCase())
                    ).length
                  }
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
                  <TableCaption fontStyle={"italic"} fontSize={"sm"} color={"white"}>
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
                            <Td>
                              <Image
                                w={"35px"}
                                src={`${API_URL}/${monthSale.image}`}
                                alt={monthSale.product_name}
                              />
                            </Td>
                            <Td>{monthSale.product_name}</Td>
                            <Td>
                              <Text fontSize={"2xs"}>ALL QTY SOLD:</Text>
                              <Text>{monthSale.total_qty_sold_product}</Text>
                            </Td>
                            <Td>
                              <Text fontSize={"2xs"}>ALL TOTAL SALES:</Text>
                              <Text>
                                {toRupiah(monthSale.total_sales_product, {
                                  dot: ".",
                                  floatingPoint: 0,
                                })}
                              </Text>
                            </Td>
                            <Td>
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
