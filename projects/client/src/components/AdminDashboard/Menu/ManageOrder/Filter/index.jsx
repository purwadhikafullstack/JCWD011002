import { Flex } from "@chakra-ui/react";
import FilterWarehouse from "./FilterWarehouse";
import Searchbar from "./Searchbar";
import FilterDate from "./FilterDate";
import FilterSort from "./FilterSort";
import { getRole } from "../../../../../helpers/Roles";

const container = {
  direction: "row",
  gap: "8px",
  alignItems: "center",
  alignSelf: "flex-end",
};

function Filter() {
  const role = getRole();
  return (
    <Flex {...container}>
      {role === "admin" && <FilterWarehouse />}
      <FilterDate />
      <Searchbar />
      <FilterSort />
    </Flex>
  );
}

export default Filter;
