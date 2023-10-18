
import React, { useEffect, useState } from 'react';
import { Box, Select, Flex, Input, Button, InputGroup, InputRightElement } from '@chakra-ui/react';
import axios from 'axios';
import { BsSearch } from 'react-icons/bs';
const FilterProducts = ({
  searchInput,
  setSearchInput,
  categoryId,
  setCategoryId,
  price,
  setPrice,
  sort,
  setSort,
  name,
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
  const handlePriceChange = (e) => {
    setPrice(e.target.value);
  };
  const handleSortChange = (e) => {
    setSort(e.target.value);
  };
  const handleNameChange = (e) => {
    setName(e.target.value);
  }
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
  return (
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
          placeholder="Select Category"
          value={categoryId}
          onChange={handleCategoryChange}
          mb={{ base: '2', md: '0' }}
          mr={{ base: '0', md: '2' }}
        >
          <option value="">All Categories</option>
          {category.map((item) => (
            <option key={item.id} value={item.id}>{item.name}</option>
          ))}

        </Select>
        {/* <Select
          placeholder="Select Price"
          value={price}
          onChange={handlePriceChange}
          mb={{ base: '2', md: '0' }}
          mr={{ base: '0', md: '2' }}
        >
          <option value="">All Prices</option>
          <option value="asc">Lowest Price</option>
          <option value="desc">Highest Price</option>
        </Select> */}
        <Select
          placeholder="Sort by"
          value={sort}
          onChange={handleSortChange}
          mb={{ base: '2', md: '0' }}
          mr={{ base: '0', md: '2' }}
        >
          <option value="">Default</option>
          <option value="asc">Oldest</option>
          <option value="desc">Newest</option>
        </Select>
        <Select placeholder="Name" value={name} mr="2" onChange={handleNameChange}>
          <option value="asc">A-Z</option>
          <option value="desc">Z-A</option>
        </Select>
        <Select placeholder="Status" value={status} mr="2" onChange={handleStatusChange}>
          <option value="">All Status</option>
          <option value="1">Active</option>
          <option value="0">Inactive</option>
        </Select>
      </Flex>
    </Box>
  );
};

export default FilterProducts;
