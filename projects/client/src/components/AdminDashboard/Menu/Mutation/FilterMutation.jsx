import { Flex, Input, Button, Box, Select } from '@chakra-ui/react'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { BsSearch } from 'react-icons/bs'
import { getRole } from '../../../../helpers/Roles'

const role = getRole()
const fetchWarehouse = async () => {
  try {
    const { data } = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/warehouse`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    })
    return data.data
  } catch (error) {
    console.log(error)
  }
}

export const FilterAllMutation = ({ sort, setSort, search, setSearch, status, setStatus, warehouse_from, warehouse_to, setWarehouseFrom, setWarehouseTo, searchInput, setSearchInput }) => {
  const [data, setData] = useState([])
  const fetchData = async () => {
    const warehouse = await fetchWarehouse()
    setData(warehouse)
  }
  useEffect(() => {
    fetchData()
  }, [])

  const handleSearch = () => {
    setSearch(searchInput)
  }

  const handleEnterKey = (e) => {
    if (e.key === 'Enter') {
      handleSearch()
    }
  }
  if (searchInput.length <= 0) {
    setSearch(null)
  }
  return (
    <>
      <Box p="4" mb="4" borderWidth="1px" rounded="lg">
        <Flex flexDirection={{ base: 'column', md: 'row' }} alignItems={{ base: 'flex-start', md: 'center' }}
          justifyContent="space-between" mb="2" >
          <Input
            placeholder="Search products..."
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            onKeyDown={handleEnterKey}
          />
          <Button
            bg={"darkBlue"}
            color={"white"}
            height={"2.75rem"}
            px={2}
            onClick={handleSearch}
            mb={{ base: '2', md: '0' }}
            mr={{ base: '0', md: '2' }}
          ><BsSearch /></Button>
          <Select
            value={warehouse_from}
            onChange={(e) => setWarehouseFrom(e.target.value)}
            mb={{ base: '2', md: '0' }}
            mr={{ base: '0', md: '2' }}
          >
            <option style={{ backgroundColor: 'white', color: 'black' }} value="">All Warehouse To</option>
            {data.map((item) => (
              <option style={{ backgroundColor: 'white', color: 'black' }} key={item.id} value={item.id}>{item.name}</option>
            ))}

          </Select>
          <Select

            value={warehouse_to}
            onChange={(e) => setWarehouseTo(e.target.value)}
            mb={{ base: '2', md: '0' }}
            mr={{ base: '0', md: '2' }}
          >
            <option style={{ backgroundColor: 'white', color: 'black' }} value="">All Warehouse To</option>
            {data.map((item) => (
              <option style={{ backgroundColor: 'white', color: 'black' }} key={item.id} value={item.id}>{item.name}</option>
            ))}

          </Select>
          <Select
            // placeholder="Sort by"
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            mb={{ base: '2', md: '0' }}
            mr={{ base: '0', md: '2' }}
          >
            <option style={{ backgroundColor: 'white', color: 'black' }} value="">Newest</option>
            <option style={{ backgroundColor: 'white', color: 'black' }} value="oldest">Oldest</option>
          </Select>

          <Select value={status} mr="2" onChange={(e) => setStatus(e.target.value)}>
            <option style={{ backgroundColor: 'white', color: 'black' }} value="">All Status</option>
            {role === 'admin' && (
              <option style={{ backgroundColor: 'white', color: 'black' }} value="7">Pending</option>
            )}
            <option style={{ backgroundColor: 'white', color: 'black' }} value="8">Approve</option>
            <option style={{ backgroundColor: 'white', color: 'black' }} value="9">Reject</option>
          </Select>
        </Flex>
      </Box>
    </>
  )
}

export const FilterWhFromMutation = ({ sort, setSort, search, setSearch, searchInput, setSearchInput, warehouse_to, setWarehouseTo }) => {
  const [data, setData] = useState([])
  const fetchData = async () => {
    const warehouse = await fetchWarehouse()
    setData(warehouse)
  }
  useEffect(() => {
    fetchData()
  }, [])

  const handleSearch = () => {
    setSearch(searchInput)
  }

  const handleEnterKey = (e) => {
    if (e.key === 'Enter') {
      handleSearch()
    }
  }
  if (searchInput.length <= 0) {
    setSearch(null)
  }
  return (
    <>
      <Box p="4" mb="4" borderWidth="1px" rounded="lg" color={'white'}>
        <Flex flexDirection={{ base: 'column', md: 'row' }} alignItems={{ base: 'flex-start', md: 'center' }}
          justifyContent="space-between" mb="2" >
          {/* <InputGroup> */}

          <Input
            placeholder="Search products..."
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            onKeyDown={handleEnterKey}
          // mb={{ base: '2', md: '0' }}
          // mr={{ base: '0', md: '2' }}
          />
          {/* <InputRightElement width={'4.5rem'}>
            
          </InputRightElement> */}
          {/* </InputGroup> */}
          <Button
            bg={"darkBlue"}
            color={"white"}
            height={"2.75rem"}
            px={2}
            onClick={handleSearch}
            mb={{ base: '2', md: '0' }}
            mr={{ base: '0', md: '2' }}
          ><BsSearch /></Button>
          <Select
            // placeholder="Warehouse To"
            value={warehouse_to}
            onChange={(e) => setWarehouseTo(e.target.value)}
            mb={{ base: '2', md: '0' }}
            mr={{ base: '0', md: '2' }}
          >
            <option style={{ backgroundColor: 'white', color: 'black' }} value="">All Warehouse To</option>
            {data.map((item) => (
              <option style={{ backgroundColor: 'white', color: 'black' }} key={item.id} value={item.id}>{item.name}</option>
            ))}

          </Select>
          {/* <Select
            placeholder="Warehouse to"
            value={warehouse_to}
            onChange={(e) => setWarehouseTo(e.target.value)}
            mb={{ base: '2', md: '0' }}
            mr={{ base: '0', md: '2' }}
          >
            <option value="">All Warehouse</option>
            {data.map((item) => (
              <option key={item.id} value={item.id}>{item.name}</option>
            ))}

          </Select> */}
          <Select
            // placeholder="Sort by"
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            mb={{ base: '2', md: '0' }}
            mr={{ base: '0', md: '2' }}
          >
            <option style={{ backgroundColor: 'white', color: 'black' }} value="">Newest</option>
            <option style={{ backgroundColor: 'white', color: 'black' }} value="oldest">Oldest</option>
          </Select>
        </Flex>
      </Box>
    </>

  )
}
export const FilterWhToMutation = ({ sort, setSort, search, setSearch, searchInput, setSearchInput, warehouse_from, setWarehouseFrom }) => {
  const [data, setData] = useState([])
  const fetchData = async () => {
    const warehouse = await fetchWarehouse()
    setData(warehouse)
  }
  useEffect(() => {
    fetchData()
  }, [])

  const handleSearch = () => {
    setSearch(searchInput)
  }

  const handleEnterKey = (e) => {
    if (e.key === 'Enter') {
      handleSearch()
    }
  }
  if (searchInput.length <= 0) {
    setSearch(null)
  }
  return (
    <>
      <Box p="4" mb="4" borderWidth="1px" rounded="lg" color={'white'}>
        <Flex flexDirection={{ base: 'column', md: 'row' }} alignItems={{ base: 'flex-start', md: 'center' }}
          justifyContent="space-between" mb="2" >
          {/* <InputGroup> */}

          <Input
            placeholder="Search products..."
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            onKeyDown={handleEnterKey}
          // mb={{ base: '2', md: '0' }}
          // mr={{ base: '0', md: '2' }}
          />
          {/* <InputRightElement width={'4.5rem'}>
            
          </InputRightElement> */}
          {/* </InputGroup> */}
          <Button
            bg={"darkBlue"}
            color={"white"}
            height={"2.75rem"}
            px={2}
            onClick={handleSearch}
            mb={{ base: '2', md: '0' }}
            mr={{ base: '0', md: '2' }}
          ><BsSearch /></Button>
          <Select
            // placeholder="Warehouse From"
            value={warehouse_from}
            onChange={(e) => setWarehouseFrom(e.target.value)}
            mb={{ base: '2', md: '0' }}
            mr={{ base: '0', md: '2' }}
          >
            <option style={{ backgroundColor: 'white', color: 'black' }} value="">All Warehouse From</option>
            {data.map((item) => (
              <option style={{ backgroundColor: 'white', color: 'black' }} key={item.id} value={item.id}>{item.name}</option>
            ))}

          </Select>
          {/* <Select
            placeholder="Warehouse to"
            value={warehouse_to}
            onChange={(e) => setWarehouseTo(e.target.value)}
            mb={{ base: '2', md: '0' }}
            mr={{ base: '0', md: '2' }}
          >
            <option value="">All Warehouse</option>
            {data.map((item) => (
              <option key={item.id} value={item.id}>{item.name}</option>
            ))}

          </Select> */}
          <Select
            // placeholder="Sort by"
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            mb={{ base: '2', md: '0' }}
            mr={{ base: '0', md: '2' }}
          >
            <option style={{ backgroundColor: 'white', color: 'black' }} value="">Newest</option>
            <option style={{ backgroundColor: 'white', color: 'black' }} value="oldest">Oldest</option>
          </Select>
        </Flex>
      </Box>
    </>

  )
}

