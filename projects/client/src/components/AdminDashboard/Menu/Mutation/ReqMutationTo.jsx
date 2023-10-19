import { Table, Tbody, Td, Text, Th, Thead, Tr } from '@chakra-ui/react'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Pagination from '../Product/Pagination'
import { FilterWhToMutation } from './FilterMutation'

const ReqMutationTo = () => {
  const [data, setData] = useState([])
  const [sort, setSort] = useState('')
  const [search, setSearch] = useState('')
  const [searchInput, setSearchInput] = useState('')
  const [warehouse_from, setWarehouseFrom] = useState('')
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const fetchData = async () => {
    try {
      const { data } = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/stock/pendingwhto`, {
        params: {
          sort,
          search: search || '',
          warehouse_from
        },
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`
        }
      })
      setData(data.data)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    fetchData()
  }, [sort, search, warehouse_from, page])

  const handlePageChange = (newPage) => {
    setPage(newPage)
  }
  return (
    <>
      <FilterWhToMutation sort={sort} setSort={setSort} search={search} setSearch={setSearch} warehouse_from={warehouse_from} setWarehouseFrom={setWarehouseFrom} searchInput={searchInput} setSearchInput={setSearchInput} />
      <Table variant={"striped"} colorScheme="whiteAlpha"
        bgColor={"bgSecondary"}>
        <Thead bg={"primary"}>
          <Tr>
            <Th color={"white"}>No</Th>
            <Th color={"white"}>User</Th>
            <Th color={"white"}>From Warehouse</Th>
            <Th color={"white"}>To Warehouse</Th>
            <Th color={"white"}>Product</Th>
            <Th color={"white"}>Qty</Th>
            <Th color={"white"}>Status</Th>
          </Tr>
        </Thead>
        <Tbody>
          {data?.map((item, index) => (
            <Tr key={item.id}>
              <Td>{index + 1}</Td>
              <Td>{item.user?.name}</Td>
              <Td>{item._warehouse_from.name}</Td>
              <Td>{item._warehouse_to.name}</Td>
              <Td>{item.product.name}</Td>
              <Td>{item.qty}</Td>
              <Td>{item.status.name}</Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
      {(!data || data.length) === 0 && <Text align={"center"} my={5}>No data request mutation from your warehouse</Text>}
      {data.length > 0 ? (
        <Pagination currentPage={page} totalPages={totalPages} onPageChange={handlePageChange} />
      ) : null}
    </>
  )
}

export default ReqMutationTo