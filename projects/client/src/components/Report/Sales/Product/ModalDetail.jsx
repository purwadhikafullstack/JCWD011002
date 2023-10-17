import React, { useEffect, useState } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  useDisclosure,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  Select,
  Flex,
} from "@chakra-ui/react";
import axios from "axios";
import jwt_decode from "jwt-decode";
import toRupiah from "@develoka/angka-rupiah-js";

const ModalDetail = ({ detail_product_sales, product_name }) => {
  const API_URL = process.env.REACT_APP_API_BASE_URL;
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [dataWarehouse, setDataWarehouse] = useState([]);
  const [filteredData, setFilteredData] = useState([...detail_product_sales]);
  const [selectedWarehouse, setSelectedWarehouse] = useState("");
  const [wh, setWh] = useState("");
  const decode = jwt_decode(localStorage.getItem("token"));
  const role = decode.role;

  const fetchWarehouse = async () => {
    try {
      const response = await axios.get(`${API_URL}/warehouse`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setDataWarehouse(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const getWarehouseName = (warehouseId) => {
    const warehouse = dataWarehouse.find((item) => item.id === warehouseId);
    return warehouse ? warehouse.name : "";
  };

  const filterByWarehouse = (warehouseId) => {
    setSelectedWarehouse(warehouseId);
    if (warehouseId === "all") {
      setFilteredData([...detail_product_sales]);
    } else {
      const filtered = detail_product_sales.filter(
        (sale) => sale.warehouse_id === parseInt(warehouseId)
      );
      setFilteredData(filtered);
    }
  };

  const sortData = (sortBy) => {
    const sorted = [...filteredData].sort((a, b) => {
      if (sortBy === "transaction_date asc") {
        return new Date(a.transaction_date) - new Date(b.transaction_date);
      }
      if (sortBy === "transaction_date desc") {
        return new Date(b.transaction_date) - new Date(a.transaction_date);
      }
      if (sortBy === "qty asc") {
        return a.qty - b.qty;
      }
      if (sortBy === "qty desc") {
        return b.qty - a.qty;
      }
      return 0;
    });
    setFilteredData(sorted);
  };

  const fetchWHAdmin = async () => {
    try {
      const response = await axios.get(`${API_URL}/admin/roles/warehouse`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      filterByWarehouse(response.data.data.id_warehouse);
      setWh(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchWHAdmin();
  }, []);

  useEffect(() => {
    fetchWarehouse();
    {
      role === "admin warehouse"
        ? filterByWarehouse(selectedWarehouse)
        : filterByWarehouse(1);
    }
    // filterByWarehouse(selectedWarehouse);
  }, []);

  return (
    <>
      <Button variant="edit" size="sm" onClick={onOpen}>
        Detail
      </Button>

      <Modal size={"3xl"} onClose={onClose} isOpen={isOpen} isCentered>
        <ModalOverlay />
        <ModalContent bgColor={"bgSecondary"}>
          <ModalHeader color={"white"} bg={"primary"} mb={2}>{product_name}</ModalHeader>
          <ModalCloseButton color={"white"} />
          <ModalBody>
            <Flex>
              {role === "admin warehouse" ? (
                <Select
                  bg={"white"}
                  color={"black"}
                  mb={2}
                  size={"sm"}
                  defaultValue={selectedWarehouse}
                  onChange={(e) => filterByWarehouse(e.target.value)}
                  disabled={true}
                >
                  <option value={wh.id_warehouse}>{wh.warehouse_name}</option>
                </Select>
              ) : (
                <Select
                  bg={"white"}
                  color={"black"}
                  mb={2}
                  size={"sm"}
                  defaultValue={"1"}
                  onChange={(e) => filterByWarehouse(e.target.value)}
                >
                  <option value="all">All Warehouse</option>
                  {dataWarehouse.map((warehouse) => (
                    <option key={warehouse.id} value={warehouse.id}>
                      {warehouse.name}
                    </option>
                  ))}
                </Select>
              )}
              <Select
                bg={"white"}
                color={"black"}
                mb={2}
                ml={2}
                size={"sm"}
                defaultValue="transaction_date desc"
                onChange={(e) => sortData(e.target.value)}
              >
                <option value={"transaction_date asc"}>DATE : ASC</option>
                <option value={"transaction_date desc"}>DATE : DESC</option>
                <option value={"qty asc"}>QTY : ASC</option>
                <option value={"qty desc"}>QTY : DESC</option>
              </Select>
            </Flex>
            <TableContainer>
              <Table
                size={"sm"}
                variant="striped"
                bgColor={"bgSecondary"}
                colorScheme="whiteAlpha"
              >
                <Thead bgColor={"primary"}>
                  <Tr>
                    <Th textAlign="center" color={"white"}>
                      NO
                    </Th>
                    <Th textAlign="center" color={"white"}>
                      INVOICE
                    </Th>
                    <Th textAlign="center" color={"white"}>
                      INVOICE DATE
                    </Th>
                    <Th textAlign="center" color={"white"}>
                      QTY
                    </Th>
                    <Th textAlign="center" color={"white"}>
                      SALE PRICE
                    </Th>
                    <Th textAlign="center" color={"white"}>
                      WH FROM
                    </Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {filteredData.map((detailSale, index) => (
                    <Tr key={detailSale.data_id}>
                      <Td textAlign="center" color={"white"}>
                        {index + 1}
                      </Td>
                      <Td textAlign="center" color={"white"}>
                        MWECG2/ID/TXN{detailSale.transaction_id}
                      </Td>
                      <Td textAlign="center" color={"white"}>
                        {detailSale.transaction_date}
                      </Td>
                      <Td textAlign="center" color={"white"}>
                        {detailSale.qty}
                      </Td>
                      <Td textAlign="center" color={"white"}>
                        {toRupiah(detailSale.price, {
                          dot: ".",
                          floatingPoint: 0,
                        })}
                      </Td>
                      <Td textAlign="right" color={"white"}>
                        {getWarehouseName(detailSale.warehouse_id)}
                      </Td>
                    </Tr>
                  ))}
                </Tbody>
              </Table>
            </TableContainer>
          </ModalBody>
          <ModalFooter w={"full"}>
            <Button w={"full"} colorScheme="red" borderRadius={0} onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ModalDetail;
