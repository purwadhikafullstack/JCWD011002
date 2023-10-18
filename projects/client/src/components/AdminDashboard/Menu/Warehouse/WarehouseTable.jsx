import { Table, TableContainer, Thead, Tbody, Tr, Th, Td, Button } from '@chakra-ui/react'
import React from 'react'

const WarehouseTable = ({ warehouses, openEditDrawer, openDeleteModal }) => {
  return (
    <TableContainer>
      <Table variant={"striped"} colorScheme="whiteAlpha"
        bgColor={"bgSecondary"}>
        <Thead bg={"primary"}>
          <Tr>
            <Th color={"white"}>No</Th>
            <Th color={"white"}>Warehouse</Th>
            <Th color={"white"}>Address</Th>
            <Th color={"white"}>Province</Th>
            <Th color={"white"}>City</Th>
            <Th color={"white"}>Postal Code</Th>
            <Th color={"white"}>Action</Th>
          </Tr>
        </Thead>
        <Tbody>
          {warehouses.map((warehouse, index) => (
            <Tr key={warehouse.id}>
              <Td>{index + 1}</Td>
              <Td>{warehouse.name}</Td>
              <Td>{warehouse.address}</Td>
              <Td>{warehouse.province}</Td>
              <Td>{warehouse.city_name}</Td>
              <Td>{warehouse.postal_code}</Td>
              <Td>
                <Button mr={2} bg={"darkBlue"} color={"white"} onClick={() => openEditDrawer(warehouse)}>Edit</Button>
                <Button bg={"red"} color={"white"} onClick={() => openDeleteModal(warehouse)}>delete</Button>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </TableContainer>
  )
}

export default WarehouseTable