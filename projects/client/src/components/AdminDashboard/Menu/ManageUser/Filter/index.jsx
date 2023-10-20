import { Flex } from "@chakra-ui/react";
import Searchbar from "./Searchbar";
import FilterWarehouse from "../../ManageOrder/Filter/FilterWarehouse";
import FilterSort from "../../ManageOrder/Filter/FilterSort";
import FilterRole from "./FilterRole";

const container = {
  direction: "row",
  gap: "8px",
  alignItems: "center",
  alignSelf: "flex-end",
};

function Filter() {
  return (
    <Flex {...container}>
      <FilterRole />
      <FilterWarehouse />
      <Searchbar />
      <FilterSort />
    </Flex>
  );
}

export default Filter;
