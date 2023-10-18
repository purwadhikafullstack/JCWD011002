import React, { useEffect, useState } from "react";
import axios from "axios";
import jwt_decode from "jwt-decode";
import {
  Box,
  Divider,
  Flex,
  Image,
  Text,
} from "@chakra-ui/react";
import { Badge } from "@chakra-ui/react";
import Pagination from "../Pagination";
import SearchBar from "../SearchBar";
import FilterBy from "../FilterBy";
import toRupiah from "@develoka/angka-rupiah-js";
import SeeDetailTxn from "../SeeDetailTxn";
import ViewReceipt from "../ViewReceipt";
import { extendTheme, useMediaQuery } from "@chakra-ui/react";
import ButtonConfirm from "../ButtonConfirm";

const Shipped = () => {
  const API_URL = process.env.REACT_APP_API_BASE_URL;
  const userId = jwt_decode(localStorage.getItem("token")).id;
  const [data, setData] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterBy, setFilterBy] = useState("desc");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const fetchData = async () => {
    try {
      const response = await axios.get(
        `${API_URL}/transaction/${userId}/?sortBy=${filterBy}&page=${currentPage}&pageSize=10&filterStatus=4&searchProductName=${searchQuery}&startDate=${startDate}&endDate=${endDate}`
      );
      setData(response.data.data);
      setTotalPages(response.data.total_page);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [currentPage, filterBy, searchQuery, startDate, endDate]);

  const handleDateRangeFilter = (start, end) => {
    setStartDate(start);
    setEndDate(end);
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
      {data.length === 0 ? (
        <Text
          align={"center"}
          fontSize={isMd ? "sm" : "md"}
          fontWeight={"bold"}
        >
          No Transaction Found
        </Text>
      ) : (
        <>
          <Flex
            direction={isMd ? "column" : "row"}
            justifyContent={"space-between"}
            mb={2}
          >
            <SearchBar onSearch={setSearchQuery} />
            <FilterBy
              onFilterChange={setFilterBy}
              onDateRangeFilter={handleDateRangeFilter}
            />
          </Flex>
          {data.map((item) => (
            <Box
              key={item.transactionId}
              mb={2}
              bg={"bgSecondary"}
              p={4}
              w={isMd ? "100vw" : "70vw"}
              color={"white"}
            >
              <Flex justifyContent={"space-between"}>
                <Flex>
                  <Text fontSize={isMd ? "sm" : "md"} fontWeight={"bold"}>
                    {item.txn_date}&nbsp;
                  </Text>
                  <Badge alignSelf={"center"} colorScheme="green">
                    {item.status === "Dikirim" ? "Shipped" : ""}
                  </Badge>
                  {isMd ? (
                    <></>
                  ) : (
                    <Text fontSize={isMd ? "sm" : "md"}>
                      &nbsp;MWECG2/ID/TXN{item.transactionId}
                    </Text>
                  )}
                </Flex>
                <Flex>
                  <ViewReceipt transactionId={item.transactionId} />
                  <ButtonConfirm id_transaction={item.transactionId} />
                </Flex>
              </Flex>
              <Divider mt={2} mb={2} />
              <Flex align={"center"} justifyContent={"space-between"}>
                <Flex>
                  <Image
                    w={isMd ? "60px" : "75px"}
                    borderRadius={"5px"}
                    src={`${API_URL}/${item.product_image}`}
                  />
                  <Flex direction={"column"}>
                    <Text
                      ml={4}
                      fontSize={isMd ? "sm" : "md"}
                      fontWeight={"bold"}
                    >
                      {item.product_name}
                    </Text>
                    {item.numProducts > 1 ? (
                      <Text ml={4} fontSize={"sm"}>
                        + {item.numProducts} other
                      </Text>
                    ) : (
                      <></>
                    )}
                  </Flex>
                </Flex>
                <Flex direction={"column"}>
                  <Text fontSize={"sm"}>Total:</Text>
                  <Text fontWeight={"bold"} fontSize={isMd ? "md" : "xl"}>
                    {toRupiah(item.total, { dot: ".", floatingPoint: 0 })}
                  </Text>
                  <SeeDetailTxn transactionId={item.transactionId} />
                </Flex>
              </Flex>
            </Box>
          ))}
          <Pagination
            totalItems={totalPages * 10}
            itemsPerPage={10}
            onPageChange={setCurrentPage}
            currentPage={currentPage}
          />
        </>
      )}
    </>
  );
};

export default Shipped;
