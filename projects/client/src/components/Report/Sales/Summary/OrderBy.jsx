// OrderBy.jsx
import React from "react";
import { Flex, Select } from "@chakra-ui/react";

const OrderBy = ({
  orderBy,
  setOrderBy,
  productId,
  setProductId,
  categoryId,
  setCategoryId,
}) => {
  const handleOrderChange = (e) => {
    setOrderBy(e.target.value);
  };

  const handleProductChange = (e) => {
    setProductId(e.target.value);
  };

  const handleCategoryChange = (e) => {
    setCategoryId(e.target.value);
  };

  return (
    <>
      {/* <Select
        ml={2}
        w={"20vw"}
        color={"black"}
        bg={"white"}
        placeholder="All Categories"
        value={categoryId}
        onChange={handleCategoryChange}
      >
        <option value="1">SSD</option>
        <option value="2">VGA</option>
        <option value="3">Monitor</option>
      </Select>
      <Select
        ml={2}
        w={"20vw"}
        color={"black"}
        bg={"white"}
        placeholder="All Product"
        value={productId}
        onChange={handleProductChange}
      >
        <option value="1">Seagate 1TB</option>
        <option value="2">RTX 3090</option>
        <option value="3">Samsung Curve Monitor</option>
        <option value="3">AMD Radeon Supra X</option>
      </Select> */}
      <Select
        ml={2}
        w={"15vw"}
        color={"black"}
        bg={"white"}
        placeholder="Sort By"
        value={orderBy}
        onChange={handleOrderChange}
      >
        <option value="date_asc">DATE : ASC</option>
        <option value="date_desc">DATE : DESC</option>
        <option value="total_asc">TOTAL : ASC</option>
        <option value="total_desc">TOTAL : DESC</option>
      </Select>
    </>
  );
};

export default OrderBy;
