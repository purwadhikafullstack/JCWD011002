import { Flex, Spacer, Table, TableContainer, Tbody, Td, Th, Thead, Tr } from '@chakra-ui/react'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Pagination from '../Product/Pagination'
import { FilterAllMutation } from './FilterMutation'
import { NotFound } from './MutationList'
import TableHead from './TableHead'
import TableBody from './TableBody'

const AllMutation = () => {
  const [data, setData] = useState([])
  const [sort, setSort] = useState("newest")
  const [status, setStatus] = useState('')
  const [warehouse_from, setWarehouseFrom] = useState('')
  const [warehouse_to, setWarehouseTo] = useState('')
  const [search, setSearch] = useState('')
  const [searchInput, setSearchInput] = useState('')
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10)
  const [totalPages, setTotalPages] = useState(1)

  const handlePageChange = (newPage) => {
    setPage(newPage)
  }
  const fetchData = async () => {
    try {
      const { data } = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/stock`, {
        params: {
          sort,
          status,
          warehouse_from,
          warehouse_to,
          search: search || '',
          page,
          limit
        },
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`
        }
      })
      setData(data.data)
      setTotalPages(data.totalPages)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    fetchData()
  }, [sort, status, warehouse_from, warehouse_to, search, page, limit])


  return (
    <Flex direction={"column"} w={"full"}>
      <FilterAllMutation sort={sort} setSort={setSort} search={search} setSearch={setSearch} status={status} setStatus={setStatus} warehouse_from={warehouse_from} setWarehouseFrom={setWarehouseFrom} warehouse_to={warehouse_to} setWarehouseTo={setWarehouseTo} searchInput={searchInput} setSearchInput={setSearchInput} />
      <TableContainer>
        <Table variant={"striped"} colorScheme="whiteAlpha"
          bgColor={"bgSecondary"}>
          <TableHead />
          <TableBody data={data} />
        </Table>
      </TableContainer>
      <Spacer />
      {data.length > 0 ? (
        <Pagination currentPage={page} totalPages={totalPages} onPageChange={handlePageChange} />
      ) : null}
    </Flex>
  )
}

export default AllMutation