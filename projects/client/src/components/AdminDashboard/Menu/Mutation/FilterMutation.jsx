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

const optionAttr = {
  style: {
    backgroundColor: '#2D2D2D',
    color: 'white'
  }
}
const btnSearchAttr = {
  bg: 'primary',
  color: 'white',
  height: '2.75rem',
  px: '2',
  _hover: {
    bg: 'editSecondary'
  }
}
export const FilterAllMutation = ({ sort, setSort, search, setSearch, status, setStatus, warehouse_from, warehouse_to, setWarehouseFrom, setWarehouseTo, searchInput, setSearchInput, month, setMonth, year, setYear }) => {
  const [data, setData] = useState([])
  const currentMonth = new Date().getMonth() + 1
  const currentYear = new Date().getFullYear()

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

  const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
  const years = [2021, 2022, 2023, 2024]
  return (
    <>
      <Box py="4">
        <Flex flexDirection={{ base: 'column', md: 'row' }} alignItems={{ base: 'flex-start', md: 'center' }}
          justifyContent="space-between" mb="2" >
          <Input
            placeholder="Search products..."
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            onKeyDown={handleEnterKey}
          />
          <Button
            {...btnSearchAttr}
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
            <option {...optionAttr} value="">All Warehouse To</option>
            {data.map((item) => (
              <option {...optionAttr} key={item.id} value={item.id}>{item.name}</option>
            ))}

          </Select>
          <Select

            value={warehouse_to}
            onChange={(e) => setWarehouseTo(e.target.value)}
            mb={{ base: '2', md: '0' }}
            mr={{ base: '0', md: '2' }}
          >
            <option {...optionAttr} value="">All Warehouse To</option>
            {data.map((item) => (
              <option {...optionAttr} key={item.id} value={item.id}>{item.name}</option>
            ))}

          </Select>
          <Select
            // placeholder="Sort by"
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            mb={{ base: '2', md: '0' }}
            mr={{ base: '0', md: '2' }}
          >
            <option {...optionAttr} value="">Newest</option>
            <option {...optionAttr} value="oldest">Oldest</option>
          </Select>

          <Select value={status} mr="2" onChange={(e) => setStatus(e.target.value)}>
            <option {...optionAttr} value="">All Status</option>
            {role === 'admin' && (
              <option {...optionAttr} value="7">Pending</option>
            )}
            <option {...optionAttr} value="8">Approve</option>
            <option {...optionAttr} value="9">Reject</option>
          </Select>
          <Select value={month || currentMonth} mr="2" onChange={(e) => setMonth(e.target.value)}>
            <option {...optionAttr} value="">All Month</option>
            {months.map((item, index) => (
              <option {...optionAttr} key={item} value={index + 1}>{item}</option>
            ))}
          </Select>
          <Select value={year || currentYear} mr="2" onChange={(e) => setYear(e.target.value)}>
            <option {...optionAttr} value="">All Year</option>
            {years.map((item, index) => (
              <option {...optionAttr} key={item} value={item}>{item}</option>
            ))}
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
      <Box py="4">
        <Flex flexDirection={{ base: 'column', md: 'row' }} alignItems={{ base: 'flex-start', md: 'center' }}
          justifyContent="space-between" mb="2" >
          <Input
            placeholder="Search products..."
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            onKeyDown={handleEnterKey}
          />
          <Button
            {...btnSearchAttr}
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
            <option {...optionAttr} value="">All Warehouse To</option>
            {data.map((item) => (
              <option {...optionAttr} key={item.id} value={item.id}>{item.name}</option>
            ))}
          </Select>
          <Select
            // placeholder="Sort by"
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            mb={{ base: '2', md: '0' }}
            mr={{ base: '0', md: '2' }}
          >
            <option {...optionAttr} value="">Newest</option>
            <option {...optionAttr} value="oldest">Oldest</option>
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
      <Box py="4">
        <Flex flexDirection={{ base: 'column', md: 'row' }} alignItems={{ base: 'flex-start', md: 'center' }}
          justifyContent="space-between" mb="2" >

          <Input
            placeholder="Search products..."
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            onKeyDown={handleEnterKey}
          />
          <Button
            {...btnSearchAttr}
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
            <option {...optionAttr} value="">All Warehouse From</option>
            {data.map((item) => (
              <option {...optionAttr} key={item.id} value={item.id}>{item.name}</option>
            ))}

          </Select>
          <Select
            // placeholder="Sort by"
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            mb={{ base: '2', md: '0' }}
            mr={{ base: '0', md: '2' }}
          >
            <option {...optionAttr} value="">Newest</option>
            <option {...optionAttr} value="oldest">Oldest</option>
          </Select>
        </Flex>
      </Box>
    </>

  )
}

