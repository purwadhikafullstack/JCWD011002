import React, { useState } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Button,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  Flex,
  Input,
  ModalFooter,
} from "@chakra-ui/react";
import { BsBoxArrowInUpRight } from "react-icons/bs";
import Pagination from "../../Pagination";

const itemsPerPage = 20;

const SeeDetail = ({ mutation, month_name, year, warehouse_name }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const filteredMutation = mutation.filter((item) =>
    item.product_name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredMutation.slice(
    indexOfFirstItem,
    indexOfLastItem
  );

  const totalPages = Math.ceil(filteredMutation.length / itemsPerPage);

  const onPageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  return (
    <>
      <Button size={"xs"} variant={"edit"} onClick={onOpen}>
        Detail
      </Button>
      <Modal
        size={"5xl"}
        scrollBehavior={"inside"}
        onClose={onClose}
        isOpen={isOpen}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader bgColor={"primary"} color={"white"}>
            {warehouse_name} {"=>"} {month_name} {year}
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={8} color={"white"} bgColor={"bgSecondary"}>
            <Flex direction={"row"} alignItems={"center"} mb={2}>
              <Input
                size={"sm"}
                type={"text"}
                color={"black"}
                bg={"white"}
                placeholder="Search by Product"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </Flex>
            <TableContainer>
              <Table
                size="sm"
                variant="striped"
                colorScheme="whiteAlpha"
                bgColor={"bgSecondary"}
                mb={2}
              >
                <Thead bg={"primary"}>
                  <Tr>
                    <Th color={"white"} textAlign={"center"}>
                      PRODUCT
                    </Th>
                    <Th color={"white"} textAlign={"center"}>
                      OUTCOMING QTY
                    </Th>
                    <Th color={"white"} textAlign={"center"}>
                      INCOMING QTY
                    </Th>
                    <Th color={"white"} textAlign={"center"}>
                      FINAL QTY MUTATION
                    </Th>
                    <Th color={"white"} textAlign={"center"}>
                      LAST STOCK IN WH
                    </Th>
                  </Tr>
                </Thead>
                {currentItems.length === 0 ? (
                  <Tbody>
                    <Tr>
                      <Td py={6} colSpan={5} align={"center"} textAlign="center">
                        No Data
                      </Td>
                    </Tr>
                  </Tbody>
                ) : (
                  <Tbody>
                    {currentItems.map((item) => (
                      <Tr key={item.id_product}>
                        <Td>{item.product_name}</Td>
                        <Td textAlign={"center"}>{item.subtraction_qty}</Td>
                        <Td textAlign={"center"}>{item.addition_qty}</Td>
                        <Td textAlign={"center"}>{item.final_qty_mutation}</Td>
                        <Td textAlign={"center"}>
                          {item.last_stock_in_warehouse}
                        </Td>
                      </Tr>
                    ))}
                  </Tbody>
                )}
              </Table>
            </TableContainer>
            <Pagination
              totalItems={filteredMutation.length}
              itemsPerPage={itemsPerPage}
              onPageChange={onPageChange}
              currentPage={currentPage}
              totalPages={totalPages}
            />
          </ModalBody>
          <ModalFooter bg={"bgSecondary"} w={"full"}>
            <Button
              w={"full"}
              colorScheme="red"
              borderRadius={0}
              onClick={onClose}
            >
              Back
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default SeeDetail;
