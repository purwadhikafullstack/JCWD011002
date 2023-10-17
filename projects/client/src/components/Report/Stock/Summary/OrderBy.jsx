import React from "react";
import { Flex, Select } from "@chakra-ui/react";

const OrderBy = ({ orderBy, setOrderBy }) => {
  const handleOrderChange = (e) => {
    setOrderBy(e.target.value);
  };

  return (
    <>
      <Select
        ml={2}
        w={"15vw"}
        color={"black"}
        bg={"white"}
        placeholder="Sort By"
        value={orderBy}
        onChange={handleOrderChange}
      >
        <option value="asc">ASC</option>
        <option value="desc">DESC</option>
      </Select>
    </>
  );
};

export default OrderBy;
