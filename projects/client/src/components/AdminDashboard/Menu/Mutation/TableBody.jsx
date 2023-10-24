import { Tbody, Tr, Td } from '@chakra-ui/react'
import React from 'react'
import { NotFound } from './MutationList'

export const formatDate = (date) => {
  const updatedAtDate = new Date(date);
  const year = updatedAtDate.getFullYear();
  const month = updatedAtDate.getMonth() + 1;
  const day = updatedAtDate.getDate();
  return `${year}-${month < 10 ? '0' : ''}${month}-${day < 10 ? '0' : ''}${day}`;
}
const TableBody = ({ data }) => {

  return (
    <Tbody>
      {data?.length > 0 && data?.map((item, index) => {
        return (
          <Tr key={item.id} >
            <Td>{index + 1}</Td>
            <Td>{item.user?.name}</Td>
            <Td>{item._warehouse_from.name}</Td>
            <Td>{item._warehouse_to.name}</Td>
            <Td>{item.product.name}</Td>
            <Td>{item.qty}</Td>
            <Td>{item.status.name}</Td>
            <Td>{formatDate(item.updated_at)}</Td>
          </Tr>
        )
      })
      }
      {(!data || data.length) === 0 && <NotFound />}
    </Tbody>
  )
}

export default TableBody