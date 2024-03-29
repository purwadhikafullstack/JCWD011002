import React, { useEffect, useState } from "react";
import {
  Box,
  Flex,
  Input,
  InputGroup,
  InputRightElement,
  Select,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Stack,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverBody,
  PopoverFooter,
  PopoverArrow,
  PopoverCloseButton,
  ButtonGroup,
  Button,
  IconButton,
  Text,
} from "@chakra-ui/react";
import { Search2Icon, CalendarIcon, ChevronDownIcon } from "@chakra-ui/icons";
import axios from "axios";
import jwt_decode from "jwt-decode";

const OrderBy = ({
  orderBy,
  setOrderBy,
  productId,
  setProductId,
  transactionId,
  setTransactionId,
  warehouseFrom,
  setWarehouseFrom,
  warehouseTo,
  setWarehouseTo,
  id_status,
  setId_status,
  onDateRangeFilter,
}) => {
  const API_URL = process.env.REACT_APP_API_BASE_URL;
  const [dataWarehouse, setDataWarehouse] = useState([]);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const decode = jwt_decode(localStorage.getItem("token"));
  const role = decode.role;
  const [wh, setWh] = useState("");
  const [initialItems, setInitialItems] = useState([]);

  const fetchProduct = async () => {
    try {
      const response = await axios.get(`${API_URL}/product?limit=10000`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      const products = response.data.data.products;
      setInitialItems(
        products.map((product) => ({
          name: product.name,
          value: product.id,
        }))
      );
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchProduct();
  }, []);

  const [items, setItems] = useState(initialItems.slice(0, 5));
  const [filteredItems, setFilteredItems] = useState(initialItems);
  const [showLoadMore, setShowLoadMore] = useState(initialItems.length > 5);
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (e) => {
    const query = e.target.value;
    setSearchQuery(query);

    const filtered = initialItems.filter((item) =>
      item.name.toLowerCase().includes(query.toLowerCase())
    );

    setFilteredItems(filtered);
    setItems(filtered.slice(0, 5));
    setShowLoadMore(filtered.length > 5);
  };

  const handleLoadMore = () => {
    const remainingItems = filteredItems.slice(items.length, items.length + 5);
    setItems([...items, ...remainingItems]);
    setShowLoadMore(remainingItems.length > 0);
  };
  const handleClearSearch = () => {
    setSearchQuery("");
    setFilteredItems(initialItems);
    setItems(initialItems.slice(0, 5));
    setShowLoadMore(initialItems.length > 5);
    setProductId("");
  };

  const handleOrderChange = (e) => {
    setOrderBy(e.target.value);
  };

  const handleProductChange = (e) => {
    setProductId(e.target.value);
  };

  const handleSearchChange = (e) => {
    setTransactionId(e.target.value);
  };

  const handleWarehouseFrom = (e) => {
    const selectedValue = e.target.value;
    if (selectedValue === "all") {
      setWarehouseFrom("");
    } else {
      setWarehouseFrom(selectedValue);
    }
  };

  useEffect(() => {
    if (!warehouseFrom && dataWarehouse.length > 0) {
      setWarehouseFrom(dataWarehouse[0].id);
    }
  }, [dataWarehouse, setWarehouseFrom]);

  const handleWarehouseTo = (e) => {
    setWarehouseTo(e.target.value);
  };

  const handleStartDateChange = (e) => {
    const value = e.target.value;
    setStartDate(value);
  };

  const handleEndDateChange = (e) => {
    const value = e.target.value;
    setEndDate(value);
  };

  const handleStatusChange = (e) => {
    const value = e.target.value;
    setId_status(value);
  };

  const handleApplyDateFilter = () => {
    const formattedStartDate = startDate.replace("T", " ").substring(0, 16);
    const formattedEndDate = endDate.replace("T", " ").substring(0, 16);
    onDateRangeFilter(formattedStartDate, formattedEndDate);
  };

  const fetchWHAdmin = async () => {
    try {
      const response = await axios.get(`${API_URL}/admin/roles/warehouse`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setWh(response.data.data);
    } catch (error) {}
  };

  useEffect(() => {
    fetchWHAdmin();
  }, []);

  useEffect(() => {
    if (role === "admin warehouse" && wh) {
      setWarehouseFrom(wh.id_warehouse);
    } else {
      setWarehouseFrom("");
    }
  }, [role, wh, setWarehouseFrom]);

  const fetchWarehouse = async () => {
    try {
      const response = await axios.get(`${API_URL}/warehouse`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setDataWarehouse(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchWarehouse();
  }, []);

  function sliceProductName(productName, maxChar) {
    return productName.length > maxChar
      ? productName.slice(0, maxChar) + "..."
      : productName;
  }

  return (
    <>
      <Box>
        <Stack>
          <InputGroup>
            <Input
              value={transactionId}
              onChange={handleSearchChange}
              color={"black"}
              bg={"white"}
              placeholder="Search Invoice Number"
            />
            <InputRightElement>
              <Search2Icon color="primary" />
            </InputRightElement>
          </InputGroup>
        </Stack>
      </Box>
      {role === "admin warehouse" ? (
        <Select
          ml={2}
          w={"15vw"}
          color={"black"}
          bg={"white"}
          value={warehouseFrom}
          onChange={handleWarehouseFrom}
          disabled={true}
        >
          <option value={wh.id_warehouse}>{wh.warehouse_name}</option>
        </Select>
      ) : (
        <Select
          ml={2}
          w={"15vw"}
          color={"black"}
          bg={"white"}
          placeholder="All Warehouse From"
          value={warehouseFrom || "all"}
          onChange={handleWarehouseFrom}
        >
          {dataWarehouse.map((warehouse) => (
            <option key={warehouse.id} value={warehouse.id}>
              {warehouse.name}
            </option>
          ))}
        </Select>
      )}
      <Select
        ml={2}
        w={"15vw"}
        color={"black"}
        bg={"white"}
        placeholder="All Warehouse To"
        value={warehouseTo}
        onChange={handleWarehouseTo}
      >
        {dataWarehouse.map((wh) => (
          <option key={wh.id} value={wh.id}>
            {wh.name}
          </option>
        ))}
      </Select>
      <Select
        ml={2}
        w={"15vw"}
        color={"black"}
        bg={"white"}
        placeholder="Status"
        value={id_status}
        onChange={handleStatusChange}
      >
        <option value={7}>Pending</option>
        <option value={8}>Approved</option>
        <option value={9}>Rejected</option>
        <option value={10}>Added by Admin</option>
        <option value={11}>Reduced by Admin</option>
      </Select>
      <Menu closeOnBlur={true} closeOnSelect={false}>
        <MenuButton
          ml={2}
          w={"15vw"}
          bg={"white"}
          as={Button}
          fontWeight={"medium"}
          rightIcon={<ChevronDownIcon />}
        >
          Search Product
        </MenuButton>
        <MenuList
          w={"21vw"}
          position="absolute"
          top="0"
          left="0"
          right="0"
          color={"black"}
        >
          <Flex>
            <Stack>
              <InputGroup>
                <Input
                  color={"black"}
                  bg={"white"}
                  ml={3}
                  placeholder="Search Product"
                  value={searchQuery}
                  onChange={handleSearch}
                />
                <InputRightElement>
                  <Search2Icon color="primary" />
                </InputRightElement>
              </InputGroup>
            </Stack>
            <Button ml={2} mr={3} onClick={handleClearSearch}>
              Clear
            </Button>
          </Flex>
          {items.map((item) => (
            <MenuItem
              key={item.value}
              value={item.value}
              w={"20.8vw"}
              onClick={handleProductChange}
            >
              {sliceProductName(item.name, 23)}
            </MenuItem>
          ))}

          {showLoadMore && (
            <MenuItem
              textDecor={"underline"}
              align={"center"}
              onClick={handleLoadMore}
            >
              Load More...
            </MenuItem>
          )}
        </MenuList>
      </Menu>
      <Select
        ml={2}
        w={"15vw"}
        color={"black"}
        bg={"white"}
        value={orderBy}
        onChange={handleOrderChange}
      >
        <option value="desc">Sort By</option>
        <option value="asc">DATE : Oldest</option>
        <option value="desc">DATE : Newest</option>
      </Select>
      <Box>
        <Popover placement="top-start">
          <PopoverTrigger>
            <ButtonGroup ml={2} size="sm" isAttached variant="outline">
              <Button
                fontSize={"md"}
                w={"10vw"}
                h={10}
                borderRadius={6}
                bg={"white"}
                color={"black"}
                fontWeight={"medium"}
              >
                Date Filter
              </Button>
              <IconButton
                h={10}
                bg={"white"}
                borderRadius={6}
                color={"black"}
                icon={<CalendarIcon />}
              />
            </ButtonGroup>
          </PopoverTrigger>
          <PopoverContent color="black">
            <PopoverHeader fontWeight="semibold">
              Filter by Date Range
            </PopoverHeader>
            <PopoverArrow />
            <PopoverCloseButton />
            <PopoverBody>
              <Text>Start Date:</Text>
              <Input
                placeholder="Start Date"
                size="md"
                type="datetime-local"
                value={startDate}
                onChange={handleStartDateChange}
              />
              <Text mt={4}>End Date:</Text>
              <Input
                mb={1}
                placeholder="End Date"
                size="md"
                type="datetime-local"
                value={endDate}
                onChange={handleEndDateChange}
              />
            </PopoverBody>
            <PopoverFooter align={"right"}>
              <Button
                size={"sm"}
                border={"1px solid black"}
                variant={"outline"}
                onClick={handleApplyDateFilter}
              >
                Apply
              </Button>
            </PopoverFooter>
          </PopoverContent>
        </Popover>
      </Box>
    </>
  );
};

export default OrderBy;
