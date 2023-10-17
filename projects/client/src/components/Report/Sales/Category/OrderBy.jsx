import React, { useEffect, useState } from "react";
import { Flex, Select } from "@chakra-ui/react";
import axios from "axios";
import jwt_decode from "jwt-decode";

const OrderBy = ({
  orderBy,
  setOrderBy,
  warehouseId,
  setWarehouseId,
  categoryId,
  setCategoryId,
}) => {
  const API_URL = process.env.REACT_APP_API_BASE_URL;
  const [dataWarehouse, setDataWarehouse] = useState([]);
  const [dataCategory, setDataCategory] = useState([]);
  const decode = jwt_decode(localStorage.getItem("token"));
  const role = decode.role;
  const [wh, setWh] = useState("");

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

  const handleCategoryChange = (e) => {
    setCategoryId(e.target.value);
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

  const fetchCategory = async () => {
    try {
      const response = await axios.get(`${API_URL}/product/category`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setDataCategory(response.data.data);
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
    fetchWHAdmin();
    if (role === "admin warehouse" && wh.id_warehouse) {
      setWarehouseId(wh.id_warehouse);
    } else {
      setWarehouseId("");
    }
  }, [role, wh, setWarehouseId]);

  useEffect(() => {
    fetchWarehouse();
    fetchCategory();
  }, []);

  return (
    <>
      {role === "admin warehouse" ? (
        <Select
          ml={2}
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
          w={"20vw"}
          color={"black"}
          bg={"white"}
          placeholder="All Warehouse"
          value={warehouseId || "all"}
          onChange={handleWarehouseChange}
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
        w={"20vw"}
        color={"black"}
        bg={"white"}
        placeholder="All Categories"
        value={categoryId}
        onChange={handleCategoryChange}
      >
        {dataCategory.map((category) => (
          <option key={category.id} value={category.id}>
            {category.name}
          </option>
        ))}
      </Select>
      <Select
        ml={2}
        w={"20vw"}
        color={"black"}
        bg={"white"}
        placeholder="Sort By"
        value={orderBy}
        onChange={handleOrderChange}
      >
        <option value="total_qty_sold asc">TOTAL SALES : Lowest</option>
        <option value="total_qty_sold desc">TOTAL SALES : Highest</option>
        <option value="month_year asc">MONTH : Oldest</option>
        <option value="month_year desc">MONTH : Newest</option>
      </Select>
    </>
  );
};

export default OrderBy;
