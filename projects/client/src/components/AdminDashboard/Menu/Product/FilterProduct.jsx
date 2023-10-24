
import React, { useEffect, useState } from 'react';
import { Box, Select, Flex, Input, Button } from '@chakra-ui/react';
import axios from 'axios';
import { BsSearch } from 'react-icons/bs';
const FilterProducts = ({
  searchInput,
  setSearchInput,
  categoryId,
  setCategoryId,
  setPrice,
  sort,
  setSort,
  setName,
  status,
  setStatus,
  fetchProducts,
  search,
  setSearch
}) => {

  const handleCategoryChange = (e) => {
    setCategoryId(e.target.value);
  };
  const handleSortChange = (e) => {
    setSort(e.target.value);
  };
  const handleStatusChange = (e) => {
    setStatus(e.target.value);
  }
  const [category, setCategory] = useState([]);
  const categories = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API_BASE_URL}/product/category`,
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        }
      )
      setCategory(data.data);
    } catch (error) {
      console.log(error);
    }
  }

  const handleSearch = () => {
    setSearch(searchInput)
  }

  const handleEnterKey = (e) => {
    if (e.key === "Enter") {
      handleSearch()
    }
  }

  if (searchInput.length <= 0) {
    setSearch(null)
  }


  useEffect(() => {
    categories();
  }, []);

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
    <Box py="4">
      <Flex flexDirection={{ base: 'column', md: 'row' }} alignItems={{ base: 'flex-start', md: 'center' }}
        justifyContent="space-between" mb="2" >
        {/* <InputGroup> */}

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
          value={categoryId}
          onChange={handleCategoryChange}
          mb={{ base: '2', md: '0' }}
          mr={{ base: '0', md: '2' }}
        >
          <option {...optionAttr} value="">All Categories</option>
          {category.map((item) => (
            <option  {...optionAttr} key={item.id} value={item.id}>{item.name}</option>
          ))}

        </Select>
        <Select
          value={sort}
          onChange={handleSortChange}
          mb={{ base: '2', md: '0' }}
          mr={{ base: '0', md: '2' }}
        >
          <option {...optionAttr} value="desc">Newest</option>
          <option {...optionAttr} value="asc">Oldest</option>
          <option {...optionAttr} value="a-z">A-Z</option>
          <option {...optionAttr} value="z-a">Z-A</option>
        </Select>
        <Select value={status} mr="2" onChange={handleStatusChange}>
          <option {...optionAttr} value="">All Status</option>
          <option {...optionAttr} value="1">Active</option>
          <option {...optionAttr} value="0">Inactive</option>
        </Select>
      </Flex>
    </Box>
  );
};

export default FilterProducts;
