import { Flex, Spacer, Table } from '@chakra-ui/react'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Pagination from '../Product/Pagination'
import { FilterWhToMutation } from './FilterMutation'
import TableHead from './TableHead'
import TableBody from './TableBody'

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
    <Flex direction={"column"}>
      <FilterWhToMutation sort={sort} setSort={setSort} search={search} setSearch={setSearch} warehouse_from={warehouse_from} setWarehouseFrom={setWarehouseFrom} searchInput={searchInput} setSearchInput={setSearchInput} />
      <Table variant={"striped"} colorScheme="whiteAlpha"
        bgColor={"bgSecondary"}>
        <TableHead />
        <TableBody data={data} />
      </Table>
      <Spacer />
      {data.length > 0 ? (
        <Pagination currentPage={page} totalPages={totalPages} onPageChange={handlePageChange} />
      ) : null}
    </Flex>
  )
}

export default ReqMutationTo