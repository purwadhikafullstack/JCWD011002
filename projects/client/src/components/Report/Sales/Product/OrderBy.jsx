import React, { useEffect, useState } from "react";
import {
  Input,
  Select,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuItemOption,
  MenuGroup,
  MenuOptionGroup,
  MenuDivider,
  Button,
  Stack,
  InputGroup,
  InputRightElement,
  Box,
  Flex,
  Text,
} from "@chakra-ui/react";
import axios from "axios";
import jwt_decode from "jwt-decode";
import { Search2Icon, ChevronDownIcon } from "@chakra-ui/icons";

const OrderBy = ({
  orderBy,
  setOrderBy,
  productId,
  setProductId,
  warehouseId,
  setWarehouseId,
}) => {
  const API_URL = process.env.REACT_APP_API_BASE_URL;
  const [dataWarehouse, setDataWarehouse] = useState([]);
  const decode = jwt_decode(localStorage.getItem("token"));
  const role = decode.role;
  const [wh, setWh] = useState("");

  const initialItems = [
    { name: "Seagate 1TB", value: "1" },
    { name: "RTX 3090", value: "2" },
    { name: "Samsung Curve Monitor", value: "3" },
    { name: "AMD Radeon Supra X", value: "4" },
    { name: "LG Monitor", value: "5" },
    { name: "AMD", value: "6" },
    { name: "BBBBBBBBB", value: "7" },
    { name: "CCCCCCCCC", value: "8" },
    { name: "DDDDDDDDDDD", value: "9" },
    { name: "CCCCCCCCCCCCC", value: "10" },
    { name: "DDDDDDDDDDDDC", value: "11" },
    { name: "AEEEEEEEEEEEEEEE", value: "12" },
    { name: "FFFFFFFFFFFF", value: "13" },
  ];

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

  const handleWarehouseChange = (e) => {
    const selectedValue = e.target.value;
    if (selectedValue === "all") {
      setWarehouseId("");
    } else {
      setWarehouseId(selectedValue);
    }
  };

  useEffect(() => {
    if (!warehouseId && dataWarehouse.length > 0) {
      setWarehouseId(dataWarehouse[0].id);
    }
  }, [dataWarehouse, setWarehouseId]);

  const handleProductChange = (e) => {
    const selectedProductId = e.target.value;
    setProductId(selectedProductId);
  };

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

  const fetchWHAdmin = async () => {
    try {
      const response = await axios.get(`${API_URL}/admin/roles/warehouse`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setWh(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchWarehouse();
  }, []);

  useEffect(() => {
    fetchWHAdmin();
    if (role === "admin warehouse" && wh.id_warehouse) {
      setWarehouseId(wh.id_warehouse);
    } else {
      setWarehouseId("");
    }
  }, [role, wh, setWarehouseId]);

  return (
    <>
      {/* {role === "admin warehouse" ? (
        <Select
          ml={2}
          mr={2}
          w={"20vw"}
          color={"black"}
          bg={"white"}
          value={warehouseId}
          onChange={handleWarehouseChange}
          disabled={true}
        >
          <option value={wh.id_warehouse}>{wh.warehouse_name}</option>
        </Select>
      ) : (
        <Select
          ml={2}
          mr={2}
          w={"20vw"}
          color={"black"}
          bg={"white"}
          value={warehouseId || "all"}
          onChange={handleWarehouseChange}
        >
          <option value="all">All Warehouse</option>
          {dataWarehouse.map((warehouse) => (
            <option key={warehouse.id} value={warehouse.id}>
              {warehouse.name}
            </option>
          ))}
        </Select>
      )} */}

      {/* <Menu closeOnBlur={true} closeOnSelect={false}>
        <MenuButton
          w={"20vw"}
          fontWeight={"medium"}
          bg={"white"}
          as={Button}
          rightIcon={<ChevronDownIcon />}
        >
          Search Product
        </MenuButton>
        <MenuList
          w={"17vw"}
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
              onClick={handleProductChange}
            >
              {item.name}
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
      </Menu> */}
      {/* <Menu closeOnSelect={false}>
        <MenuButton
          w={"20vw"}
          ml={2}
          bgColor={"white"}
          color={"black"}
          borderRadius="md"
          borderWidth="1px"
        >
          <Flex justifyContent={"space-between"}>
            <Text ml={3}>Order By</Text>
            <Text mr={3}>
              <ChevronDownIcon />
            </Text>
          </Flex>
        </MenuButton>
        <MenuList color={"black"} minWidth="240px">
          <MenuOptionGroup
            value={orderBy}
            onChange={handleOrderChange}
            defaultValue="created_at desc"
            title="Date"
            type="radio"
          >
            <MenuItemOption value="created_at asc">Ascending</MenuItemOption>
            <MenuItemOption value="created_at desc">Descending</MenuItemOption>
          </MenuOptionGroup>
          <MenuDivider />
          <MenuOptionGroup
            defaultValue="total_sales_monthly desc"
            title="Monthly Sales"
            type="radio"
          >
            <MenuItemOption value="total_sales_monthly asc">
              Ascending
            </MenuItemOption>
            <MenuItemOption value="total_sales_monthly desc">
              Descending
            </MenuItemOption>
          </MenuOptionGroup>
        </MenuList>
      </Menu> */}
      <Select
        ml={2}
        w={"15vw"}
        color={"black"}
        bg={"white"}
        placeholder="Sort By"
        value={orderBy}
        onChange={handleOrderChange}
      >
        <option value="total_sales_monthly asc">TOTAL : Lowest</option>
        <option value="total_sales_monthly desc">TOTAL : Highest</option>
        {/* <option value="created_at asc">MONTH : Oldest</option>
        <option value="created_at desc">MONTH : Newest</option> */}
      </Select>
    </>
  );
};

export default OrderBy;
