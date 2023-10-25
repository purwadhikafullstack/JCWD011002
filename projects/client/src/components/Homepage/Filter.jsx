import { Flex, Icon, Select, Text } from "@chakra-ui/react";
import {
  LiaSortAlphaDownSolid as IcDESC,
  LiaSortAlphaUpSolid as IcASC,
} from "react-icons/lia";
import { useSearchParams } from "react-router-dom";

const container = {
  direction: "row",
  mt: "-16px",
  alignItems: "center",
  justifyContent: "flex-end",
  gap: "8px",
};

const orderBy = ["name", "price"];

function setOption(item) {
  return {
    children: item,
    value: item,
    style: {
      backgroundColor: "#2D2D2D",
    },
  };
}

function Filter() {
  const [searchParams, setSearchParams] = useSearchParams({
    order: "name",
    sort: "ASC",
  });
  const order = searchParams.get("order");
  const sort = searchParams.get("sort");

  function changeParams(field, value) {
    setSearchParams((prev) => {
      prev.set(field, value);
      return prev;
    });
  }

  const selectAttr = {
    textTransform: "capitalize",
    w: "150px",
    cursor: "pointer",
    onChange: (e) => changeParams("order", e.target.value),
  };

  const sortAttr = {
    as: sort === "ASC" ? IcASC : IcDESC,
    fontSize: "28px",
    cursor: "pointer",
    onClick: () => changeParams("sort", sort === "ASC" ? "DESC" : "ASC"),
  };

  return (
    <Flex {...container}>
      <Text>Order by</Text>
      <Select {...selectAttr}>
        {orderBy.map((item, index) => (
          <option {...setOption(item)} key={index} />
        ))}
      </Select>
      <Icon {...sortAttr} />
    </Flex>
  );
}

export default Filter;
