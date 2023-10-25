import { Table, Tbody, Td, Text, Tr, useToast, Flex, Spacer } from '@chakra-ui/react'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Pagination from '../Product/Pagination'
import { FilterWhFromMutation } from './FilterMutation'
import { NotFound } from './MutationList'
import TableHead from './TableHead'
import PopoverUpdateStatus from './PopoverUpdateStatus'
import { formatDate } from './TableBody'

const ReqMutationFrom = () => {
  const [data, setData] = useState([])
  const [sort, setSort] = useState('')
  const [search, setSearch] = useState('')
  const [searchInput, setSearchInput] = useState('')
  const [warehouse_to, setWarehouseTo] = useState('')
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [limit, setLimit] = useState(10)
  const toast = useToast()
  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  };
  const fetchData = async () => {
    try {
      const { data } = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/stock/pendingwhfrom`, {
        params: {
          sort,
          search: search || '',
          warehouse_to,
          page: search ? null : page,
          limit
        },
        headers
      })
      setData(data.data)
      setTotalPages(data.totalPages)
    } catch (error) {
      console.log(error)
    }
  }
  const updateStatusMutation = async (id, status) => {
    try {
      await axios.patch(`${process.env.REACT_APP_API_BASE_URL}/stock/${id}`, {
        id_status: status
      }, {
        headers
      })
      fetchData()
      toast({
        title: "Success",
        description: "Status mutation updated",
        status: "success",
        duration: 3000,
        isClosable: true
      })
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    fetchData()
  }, [sort, warehouse_to, search, page, limit])

  const handlePageChange = (newPage) => {
    setPage(newPage)
  }

  return (
    <Flex direction="column" w="full">
      <FilterWhFromMutation sort={sort} setSort={setSort} search={search} setSearch={setSearch} warehouse_to={warehouse_to} setWarehouseTo={setWarehouseTo} searchInput={searchInput} setSearchInput={setSearchInput} />
      <Table variant={"striped"} colorScheme="whiteAlpha"
        bgColor={"bgSecondary"}>
        <TableHead />
        <Tbody>
          {data?.length > 0 && data?.map((item, index) => (
            <Tr key={item.id}>
              <Td>{index + 1}</Td>
              <Td>{item.user?.name}</Td>
              <Td>{item._warehouse_from.name}</Td>
              <Td>{item._warehouse_to.name}</Td>
              <Td>{item.product.name}</Td>
              <Td>{item.qty}</Td>
              <Td display={"flex"} justifyContent={"space-between"} alignItems={"center"}><Text>{item.status.name}</Text>
                <PopoverUpdateStatus approve={() => updateStatusMutation(item.id, 8)} reject={() => updateStatusMutation(item.id, 9)} />
              </Td>
              <Td>{formatDate(item.updated_at)}</Td>
            </Tr>
          ))}
          {(!data || data.length) === 0 && <NotFound />}
        </Tbody>
      </Table>
      <Spacer />
      {data.length > 0 ? (
        <Pagination currentPage={page} totalPages={totalPages} onPageChange={handlePageChange} />
      ) : null}
    </Flex>
  )
}

export default ReqMutationFrom