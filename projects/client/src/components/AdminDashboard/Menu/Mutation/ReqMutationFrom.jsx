import { Table, Tbody, Td, Text, Th, Thead, Tr, useToast, Popover, PopoverTrigger, Button, PopoverContent, PopoverHeader, PopoverArrow, PopoverCloseButton, PopoverBody } from '@chakra-ui/react'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Pagination from '../Product/Pagination'
import { FilterWhFromMutation } from './FilterMutation'

const ReqMutationFrom = () => {
  const [data, setData] = useState([])
  const [sort, setSort] = useState('')
  const [search, setSearch] = useState('')
  const [searchInput, setSearchInput] = useState('')
  const [warehouse_to, setWarehouseTo] = useState('')
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
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
          warehouse_to
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
  }, [sort, warehouse_to, search, page])

  const handlePageChange = (newPage) => {
    setPage(newPage)
  }

  return (
    <>
      <FilterWhFromMutation sort={sort} setSort={setSort} search={search} setSearch={setSearch} warehouse_to={warehouse_to} setWarehouseTo={setWarehouseTo} searchInput={searchInput} setSearchInput={setSearchInput} />
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
              <Td display={"flex"} justifyContent={"space-between"} alignItems={"center"}><Text>{item.status.name}</Text>
                <Popover ml={4} placement='bottom-start'>
                  <PopoverTrigger>
                    <Button bg={"darkBlue"} color={"white"}>Change Status</Button>
                  </PopoverTrigger>
                  <PopoverContent bg={"darkBlue"} color={"white"}>
                    <PopoverHeader fontWeight='semibold'>Change Status Mutation</PopoverHeader>
                    <PopoverArrow />
                    <PopoverCloseButton />
                    <PopoverBody textAlign={"center"}>
                      <Button color={"white"} onClick={() => updateStatusMutation(item.id, 9)} type='submit' mr={4} bg={"red.500"}>Reject</Button>
                      <Button color={"white"} onClick={() => updateStatusMutation(item.id, 8)} type='submit' ml={4} bg={"green.500"}>Approve</Button>
                    </PopoverBody>
                  </PopoverContent>
                </Popover></Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
      {(!data || data.length) === 0 && <Text align={"center"} my={5}>No data request mutation to your warehouse</Text>}
      {data.length > 0 ? (
        <Pagination currentPage={page} totalPages={totalPages} onPageChange={handlePageChange} />
      ) : null}
    </>
  )
}

export default ReqMutationFrom