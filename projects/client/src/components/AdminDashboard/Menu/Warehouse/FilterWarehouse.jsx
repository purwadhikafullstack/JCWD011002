import React, { useEffect, useState } from 'react'
import { Box, Flex, Input, Select, Button, Text, Menu } from '@chakra-ui/react'
import { BsSearch } from 'react-icons/bs'
import { getWarehouses } from '../../../../api/warehouse'
const FilterWarehouse = ({ searchInput, setSearchInput, search, setSearch, sort, setSort, name, setName, province, setProvince }) => {
  const [warehouse, setWarehouse] = useState([])
  const fetchWarehouse = async () => {
    const { data } = await getWarehouses()
    setWarehouse(data)
  }
  useEffect(() => {
    fetchWarehouse()
  }, [])
  const uniqueProvinces = [...new Set(warehouse.map(item => item.province))];

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
      <Box>
        <Flex flexDirection={{ base: 'column', md: 'row' }} alignItems={{ base: 'flex-start', md: 'center' }}
          justifyContent="space-between" mb="2" >

          <Input
            placeholder="Search..."
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
            value={province}
            onChange={(e) => setProvince(e.target.value)}
            mb={{ base: '2', md: '0' }}
            mr={{ base: '0', md: '2' }}
          >
            <option style={{ backgroundColor: 'white', color: 'black' }} value="">All Province</option>
            {uniqueProvinces?.map((item, index) => (
              <option style={{ backgroundColor: 'white', color: 'black' }} key={index} value={item}>{item}</option>
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
            <option style={{ backgroundColor: 'white', color: 'black' }} value="desc">Oldest</option>
          </Select>
          <Select
            // placeholder="Sort by"
            value={name}
            onChange={(e) => setName(e.target.value)}
            mb={{ base: '2', md: '0' }}
            mr={{ base: '0', md: '2' }}
          >
            <option style={{ backgroundColor: 'white', color: 'black' }} value="asc">A-Z</option>
            <option style={{ backgroundColor: 'white', color: 'black' }} value="desc">Z-A</option>
          </Select>


        </Flex>
      </Box>
    </>
  )
}

export default FilterWarehouse