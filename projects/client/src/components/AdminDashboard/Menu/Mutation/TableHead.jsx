import { Thead, Tr, Th } from '@chakra-ui/react'
import React from 'react'

const TableHead = () => {
  const head = ["No", "User", "From Warehouse", "To Warehouse", "Product", "Qty", "Status"]
  const thAttr = {
    color: "white"
  }

  return (
    <Thead bg={"primary"}>
      <Tr>
        {head.map((item, index) => (
          <Th key={index} {...thAttr}>{item}</Th>
        ))}
      </Tr>
    </Thead>
  )
}

export default TableHead