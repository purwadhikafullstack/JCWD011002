import React from 'react'
import { Box, Flex, Input, Select, Button } from '@chakra-ui/react'
import { BsSearch } from 'react-icons/bs'
const FilterCategory = ({ searchInput, setSearchInput, search, setSearch, sort, setSort, name, setName }) => {
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
            {...btnSearchAttr}
            onClick={handleSearch}
            mb={{ base: '2', md: '0' }}
            mr={{ base: '0', md: '2' }}
          ><BsSearch /></Button>

          <Select
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            mb={{ base: '2', md: '0' }}
            mr={{ base: '0', md: '2' }}
          >
            <option {...optionAttr} value="asc">Newest</option >
            <option {...optionAttr} value="desc">Oldest</option>
            <option {...optionAttr} value="a-z">A-Z</option>
            <option {...optionAttr} value="z-a">Z-A</option>
          </Select>


        </Flex>
      </Box>
    </>
  )
}

export default FilterCategory