import React from 'react'
import { Table, TableContainer, Thead, Tbody, Tr, Th, Td, Button } from '@chakra-ui/react'
import { NotFound } from '../Mutation/MutationList'

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
              <Td style={{ whiteSpace: 'normal' }}>{warehouse.address}</Td>
              <Td>{warehouse.province}</Td>
              <Td>{warehouse.city_name}</Td>
              <Td>{warehouse.postal_code}</Td>
              <Td>
                <Button mr={2} bg={"primary"} color={"white"} _hover={{ bg: "editSecondary" }} onClick={() => openEditDrawer(warehouse)}>Edit</Button>
                <Button colorScheme='red' onClick={() => openDeleteModal(warehouse)}>delete</Button>
              </Td>
            </Tr>
          ))}
          {(!warehouses || warehouses.length) === 0 && <NotFound />}
        </Tbody>
      </Table>
    </TableContainer>
  )
}

export default WarehouseTable