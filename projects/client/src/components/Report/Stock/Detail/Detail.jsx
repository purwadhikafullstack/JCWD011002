import React, { useEffect, useState } from "react";
import {
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
  Flex,
  Text,
  Tooltip,
} from "@chakra-ui/react";
import axios from "axios";
import OrderBy from "./OrderBy";
import Pagination from "../../Pagination";

const Detail = () => {
  const API_URL = process.env.REACT_APP_API_BASE_URL;
  const [data, setData] = useState([]);
  const [orderBy, setOrderBy] = useState("desc");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [productId, setProductId] = useState("");
  const [transactionId, setTransactionId] = useState("");
  const [warehouseFrom, setWarehouseFrom] = useState("");
  const [warehouseTo, setWarehouseTo] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [id_status, setId_status] = useState(0);

  const fetchDetail = async () => {
    try {
      const response = await axios.get(`${API_URL}/report/stock`, {
        params: {
          page: currentPage,
          pageSize: 10,
          orderBy,
          productId,
          id_status,
          transactionId,
          warehouseFrom,
          warehouseTo,
          startDate,
          endDate,
        },
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setData(response.data.data);
      setTotalPages(response.data.totalPages);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchDetail();
  }, [
    orderBy,
    currentPage,
    productId,
    id_status,
    transactionId,
    warehouseFrom,
    warehouseTo,
    startDate,
    endDate,
  ]);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  const handleDateRangeFilter = (start, end) => {
    setStartDate(start);
    setEndDate(end);
  };

  function sliceProductName(productName, maxChar) {
    return productName.length > maxChar
      ? productName.slice(0, maxChar) + "..."
      : productName;
  }

  return (
    <>
      <Flex>
        <OrderBy
          orderBy={orderBy}
          setOrderBy={setOrderBy}
          productId={productId}
          setProductId={setProductId}
          transactionId={transactionId}
          setTransactionId={setTransactionId}
          warehouseFrom={warehouseFrom}
          setWarehouseFrom={setWarehouseFrom}
          id_status={id_status}
          setId_status={setId_status}
          warehouseTo={warehouseTo}
          setWarehouseTo={setWarehouseTo}
          onDateRangeFilter={handleDateRangeFilter}
        />
      </Flex>
      <TableContainer mt={4}>
        <Table
          variant="striped"
          colorScheme="whiteAlpha"
          bgColor={"bgSecondary"}
        >
          <Thead bgColor={"primary"}>
            <Tr>
              <Th textAlign={"center"} color={"white"}>
                NO
              </Th>
              <Th textAlign={"center"} color={"white"}>
                FROM WAREHOUSE
              </Th>
              <Th textAlign={"center"} color={"white"}>
                TO WAREHOUSE
              </Th>
              <Th textAlign={"center"} color={"white"}>
                TO USER
              </Th>
              <Th textAlign={"center"} color={"white"}>
                PRODUCT
              </Th>
              <Th textAlign={"center"} color={"white"}>
                QTY
              </Th>
              <Th textAlign={"center"} color={"white"}>
                STATUS
              </Th>
              <Th textAlign={"center"} color={"white"}>
                INVOICE
              </Th>
              <Th textAlign={"center"} color={"white"}>
                INVOICE DATE
              </Th>
            </Tr>
          </Thead>
          {/* <Tbody> */}
            <Tbody>
              {data.map((item, index) => (
                <Tr key={item.id}>
                  <Td textAlign={"center"}>
                    {(currentPage - 1) * 10 + index + 1}
                  </Td>
                  {item.wh_from === null ? (
                    <Td textAlign={"center"}>-</Td>
                  ) : (
                    <Td>{item.wh_from}</Td>
                  )}
                  <Td textAlign={"center"}>{item.wh_to}</Td>
                  {item.txn_id === null ? (
                    <Td textAlign={"center"}>-</Td>
                  ) : (
                    <Td textAlign={"center"}>{item.id_user}</Td>
                  )}
                  <Tooltip bg={"white"} color={"black"} label={item.product}>
                    <Td textAlign={"center"}>
                      {sliceProductName(item.product, 22)}
                    </Td>
                  </Tooltip>
                  <Td textAlign={"center"}>{item.qty}</Td>
                  <Td textAlign={"center"}>{item.status}</Td>
                  <Td textAlign={"center"}>
                    {item.txn_id === null ? (
                      <Text>-</Text>
                    ) : (
                      <Text>MWECG2/ID/TXN{item.txn_id}</Text>
                    )}
                  </Td>
                  <Td textAlign={"center"}>{item.txn_date}</Td>
                </Tr>
              ))}
            </Tbody>
          {/* </Tbody> */}
        </Table>
      </TableContainer>
        <Pagination
          totalItems={data.length}
          itemsPerPage={10}
          onPageChange={handlePageChange}
          currentPage={currentPage}
          totalPages={totalPages}
        />
    </>
  );
};

export default Detail;