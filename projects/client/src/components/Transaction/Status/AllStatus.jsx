import React, { useEffect, useState } from "react";
import axios from "axios";
import jwt_decode from "jwt-decode";
import { Box, Divider, Flex, Image, Popover, Text, Tooltip } from "@chakra-ui/react";
import { Badge } from "@chakra-ui/react";
import Pagination from "../Pagination";
import SearchBar from "../SearchBar";
import FilterBy from "../FilterBy";
import toRupiah from "@develoka/angka-rupiah-js";
import SeeDetailTxn from "../SeeDetailTxn";
import ViewReceipt from "../ViewReceipt";
import { BsBoxArrowInUpRight } from "react-icons/bs";
import { extendTheme, useMediaQuery } from "@chakra-ui/react";

const AllStatus = () => {
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
        `${API_URL}/transaction/${userId}/?sortBy=${filterBy}&page=${currentPage}&pageSize=10&searchProductName=${searchQuery}&startDate=${startDate}&endDate=${endDate}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
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

  function sliceProductName(productName, maxChar) {
    return productName.length > maxChar
      ? productName.slice(0, maxChar) + "..."
      : productName;
  }

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

              {item.status === "Dibatalkan" ? (
                <Badge alignSelf={"center"} colorScheme="red">
                  Cancelled
                </Badge>
              ) : (
                <Badge alignSelf={"center"} colorScheme="green">
                  {item.status === "Menunggu Pembayaran" ? (
                    <Text>To Pay</Text>
                  ) : item.status === "Menunggu Konfirmasi Pembayaran" ? (
                    <Text>To Confirm</Text>
                  ) : item.status === "Diproses" ? (
                    <Text>Processed</Text>
                  ) : item.status === "Dikirim" ? (
                    <Text>Shipped</Text>
                  ) : item.status === "Pesanan Dikonfirmasi" ? (
                    <Text>Completed</Text>
                  ) : item.status === "Dibatalkan" ? (
                    <Text>Cancelled</Text>
                  ) : (
                    <></>
                  )}
                </Badge>
              )}
              {isMd ? (
                <></>
              ) : (
                <Text fontSize={isMd ? "sm" : "md"}>
                  &nbsp;MWECG2/ID/TXN{item.transactionId}
                </Text>
              )}
            </Flex>
            {item.status === "Dibatalkan" ||
            item.status === "Menunggu Pembayaran" ? (
              <></>
            ) : (
              <ViewReceipt transactionId={item.transactionId} />
            )}
          </Flex>
          <Divider mt={2} mb={2} />
          <Flex align={"center"} justifyContent={"space-between"}>
            <Flex>
              <Image
                borderRadius={"5px"}
                w={isMd ? "60px" : "75px"}
                src={`${API_URL}/${item.product_image}`}
              />
              <Flex direction={"column"}>
                <Tooltip bg={"white"} color={"black"} label={item.product_name}>
                  <Text
                    ml={4}
                    fontSize={isMd ? "sm" : "md"}
                    fontWeight={"bold"}
                  >
                    {sliceProductName(item.product_name, isMd ? 15 : 65)}
                  </Text>
                </Tooltip>
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
              <Text fontSize={isMd ? "md" : "xl"} fontWeight={"bold"}>
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
  );
};

export default AllStatus;
