import { Table, TableContainer, Thead, Tbody, Tr, Th, Td, Button, Img, } from '@chakra-ui/react'
import React from 'react'

const ProductTable = ({products, handleDetailStock, handleDetailClick}) => {
  return (
    <TableContainer>
          <Table variant={"striped"} colorScheme="whiteAlpha"
            bgColor={"bgSecondary"}>
            <Thead bg={"primary"}>
              <Tr>
                <Th color={"white"}>No</Th>
                <Th color={"white"}>Image</Th>
                <Th color={"white"}>Name</Th>
                <Th color={"white"}>Category</Th>
                <Th color={"white"}>Status</Th>
                <Th color={"white"}>Stock</Th>
                <Th color={"white"}>Action</Th>
              </Tr>
            </Thead>
            <Tbody>

              {products?.map((product, index) => (
                <Tr key={product?.id}>
                  <Td>{index + 1}</Td>
                  <Td><Img src={`${process.env.REACT_APP_API_BASE_URL}/${product?.image}`} boxSize={"70px"} objectFit={"cover"} borderRadius={"5px"} /></Td>
                  <Td>{product?.name}</Td>
                  <Td>{product?.category?.name}</Td>
                  <Td>{product?.is_active ? "Active" : "Inactive"}</Td>
                  <Td>{product?.product_warehouses?.map((warehouse) => warehouse?.stock).reduce((a, b) => a + b, 0)}
                    <Button ml={4} bg={"darkBlue"} color={"white"} onClick={() => handleDetailStock(product.id)}>edit stock</Button>
                  </Td>
                  <Td><Button bg={"darkBlue"} color={"white"} onClick={() => handleDetailClick(product.id)}>Detail</Button></Td>
                </Tr>

              ))}
            </Tbody>
          </Table>
        </TableContainer>
  )
}

export default ProductTable